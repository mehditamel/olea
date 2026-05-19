type MapsInput = {
  nom: string;
  adresse: string;
  codePostal: string;
  ville: string;
  coordonnees: { lat: number; lng: number };
};

export function googleMapsUrl(maison: MapsInput): string {
  const q = encodeURIComponent(
    `Maison Oléa ${maison.nom}, ${maison.adresse}, ${maison.codePostal} ${maison.ville}`,
  );
  return `https://www.google.com/maps/search/?api=1&query=${q}`;
}

export function osmEmbedUrl(maison: MapsInput): string {
  const { lat, lng } = maison.coordonnees;
  const dLat = 0.003;
  const dLng = 0.005;
  const bbox = `${lng - dLng},${lat - dLat},${lng + dLng},${lat + dLat}`;
  return `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${lat},${lng}`;
}
