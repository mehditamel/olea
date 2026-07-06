-- Réservation atomique d'un créneau : vérification de capacité + insertion
-- sous verrou consultatif par (maison, date, service), afin d'éliminer la
-- fenêtre TOCTOU où deux requêtes concurrentes réservent les mêmes places.
--
-- La fonction reproduit la logique de src/lib/reservation/capacity.ts :
--   - override par date prioritaire, sinon capacité hebdomadaire par jour ;
--   - couverts_max NULL = capacité illimitée ;
--   - seuls les statuts actifs (pending_card, confirmed) comptent.
--
-- Retour JSONB :
--   { "ok": true,  "reservation": <row> }
--   { "ok": false, "reste": <int>, "max": <int> }   -- capacité insuffisante

create or replace function public.reserver_creneau(
  p_maison text,
  p_date date,
  p_heure text,
  p_service public.service_kind,
  p_convives int,
  p_nom text,
  p_email text,
  p_telephone text,
  p_occasion text,
  p_demandes text,
  p_statut public.reservation_statut,
  p_requiert_garantie boolean,
  p_montant_garantie_cents int,
  p_source text
) returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  v_jour public.jour_kind;
  v_max int;
  v_deja int;
  v_reste int;
  v_row public.reservations;
begin
  -- Sérialise les insertions concurrentes sur le même créneau, le temps de la
  -- transaction. Le verrou est libéré automatiquement au COMMIT/ROLLBACK.
  perform pg_advisory_xact_lock(
    hashtext(p_maison || '|' || p_date::text || '|' || p_service::text)
  );

  -- Jour de la semaine (français) depuis la date calendaire.
  -- extract(dow) : 0 = dimanche … 6 = samedi.
  v_jour := (array[
    'dimanche','lundi','mardi','mercredi','jeudi','vendredi','samedi'
  ])[extract(dow from p_date)::int + 1]::public.jour_kind;

  -- Capacité applicable : override par date prioritaire.
  select couverts_max into v_max
  from public.capacites_overrides
  where maison_slug = p_maison and date = p_date and service = p_service;

  if v_max is null then
    select couverts_max into v_max
    from public.capacites
    where maison_slug = p_maison and service = p_service and jour = v_jour;
  end if;

  if v_max is not null then
    select coalesce(sum(convives), 0) into v_deja
    from public.reservations
    where maison_slug = p_maison
      and date = p_date
      and service = p_service
      and statut in ('pending_card', 'confirmed');

    v_reste := v_max - v_deja;
    if p_convives > v_reste then
      return jsonb_build_object('ok', false, 'reste', v_reste, 'max', v_max);
    end if;
  end if;

  insert into public.reservations (
    maison_slug, date, heure, service, convives, nom, email, telephone,
    occasion, demandes, statut, requiert_garantie, montant_garantie_cents, source
  ) values (
    p_maison, p_date, p_heure, p_service, p_convives, p_nom, p_email, p_telephone,
    p_occasion, p_demandes, p_statut, p_requiert_garantie, p_montant_garantie_cents,
    p_source
  ) returning * into v_row;

  return jsonb_build_object('ok', true, 'reservation', to_jsonb(v_row));
end;
$$;

-- La fonction n'est appelée que par le service role (backend). On ne l'expose
-- pas aux rôles anon/authenticated.
revoke all on function public.reserver_creneau(
  text, date, text, public.service_kind, int, text, text, text, text, text,
  public.reservation_statut, boolean, int, text
) from public, anon, authenticated;
