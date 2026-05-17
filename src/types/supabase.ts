export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  __InternalSupabase: { PostgrestVersion: "14.5" };
  public: {
    Tables: {
      audit_log: {
        Row: {
          action: string;
          actor_id: string | null;
          after: Json | null;
          at: string;
          before: Json | null;
          id: string;
          reservation_id: string | null;
        };
        Insert: {
          action: string;
          actor_id?: string | null;
          after?: Json | null;
          at?: string;
          before?: Json | null;
          id?: string;
          reservation_id?: string | null;
        };
        Update: Partial<Database["public"]["Tables"]["audit_log"]["Insert"]>;
        Relationships: [];
      };
      capacites: {
        Row: {
          couverts_max: number;
          jour: Database["public"]["Enums"]["jour_kind"];
          maison_slug: string;
          service: Database["public"]["Enums"]["service_kind"];
          updated_at: string;
        };
        Insert: Database["public"]["Tables"]["capacites"]["Row"];
        Update: Partial<Database["public"]["Tables"]["capacites"]["Row"]>;
        Relationships: [];
      };
      capacites_overrides: {
        Row: {
          couverts_max: number;
          date: string;
          maison_slug: string;
          raison: string | null;
          service: Database["public"]["Enums"]["service_kind"];
          updated_at: string;
        };
        Insert: Database["public"]["Tables"]["capacites_overrides"]["Row"];
        Update: Partial<Database["public"]["Tables"]["capacites_overrides"]["Row"]>;
        Relationships: [];
      };
      creneaux_bloques: {
        Row: {
          created_at: string;
          created_by: string | null;
          date: string;
          heure_debut: string;
          heure_fin: string;
          id: string;
          maison_slug: string;
          raison: string | null;
        };
        Insert: {
          created_at?: string;
          created_by?: string | null;
          date: string;
          heure_debut: string;
          heure_fin: string;
          id?: string;
          maison_slug: string;
          raison?: string | null;
        };
        Update: Partial<Database["public"]["Tables"]["creneaux_bloques"]["Insert"]>;
        Relationships: [];
      };
      reservations: {
        Row: {
          cancellation_token: string;
          cancelled_at: string | null;
          convives: number;
          created_at: string;
          date: string;
          demandes: string;
          email: string;
          heure: string;
          id: string;
          maison_slug: string;
          montant_garantie_cents: number | null;
          nom: string;
          noshow_marked_at: string | null;
          noshow_marked_by: string | null;
          notes_staff: string | null;
          occasion: string;
          reminder_sent_at: string | null;
          requiert_garantie: boolean;
          service: Database["public"]["Enums"]["service_kind"];
          source: string;
          statut: Database["public"]["Enums"]["reservation_statut"];
          stripe_charge_id: string | null;
          stripe_customer_id: string | null;
          stripe_payment_intent_id: string | null;
          stripe_payment_method_id: string | null;
          stripe_setup_intent_id: string | null;
          telephone: string;
          updated_at: string;
        };
        Insert: {
          cancellation_token?: string;
          cancelled_at?: string | null;
          convives: number;
          created_at?: string;
          date: string;
          demandes?: string;
          email: string;
          heure: string;
          id?: string;
          maison_slug: string;
          montant_garantie_cents?: number | null;
          nom: string;
          noshow_marked_at?: string | null;
          noshow_marked_by?: string | null;
          notes_staff?: string | null;
          occasion?: string;
          reminder_sent_at?: string | null;
          requiert_garantie?: boolean;
          service: Database["public"]["Enums"]["service_kind"];
          source?: string;
          statut?: Database["public"]["Enums"]["reservation_statut"];
          stripe_charge_id?: string | null;
          stripe_customer_id?: string | null;
          stripe_payment_intent_id?: string | null;
          stripe_payment_method_id?: string | null;
          stripe_setup_intent_id?: string | null;
          telephone: string;
          updated_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["reservations"]["Insert"]>;
        Relationships: [];
      };
      staff_users: {
        Row: {
          created_at: string;
          maison_slugs: string[];
          role: Database["public"]["Enums"]["staff_role"];
          user_id: string;
        };
        Insert: {
          created_at?: string;
          maison_slugs?: string[];
          role?: Database["public"]["Enums"]["staff_role"];
          user_id: string;
        };
        Update: Partial<Database["public"]["Tables"]["staff_users"]["Insert"]>;
        Relationships: [];
      };
      stripe_events_processed: {
        Row: { at: string; event_id: string };
        Insert: { at?: string; event_id: string };
        Update: Partial<Database["public"]["Tables"]["stripe_events_processed"]["Insert"]>;
        Relationships: [];
      };
    };
    Views: { [_ in never]: never };
    Functions: { is_staff: { Args: never; Returns: boolean } };
    Enums: {
      jour_kind:
        | "lundi"
        | "mardi"
        | "mercredi"
        | "jeudi"
        | "vendredi"
        | "samedi"
        | "dimanche";
      reservation_statut:
        | "pending_card"
        | "confirmed"
        | "cancelled_by_client"
        | "cancelled_by_staff"
        | "noshow"
        | "honored"
        | "expired";
      service_kind: "dejeuner" | "diner";
      staff_role: "admin" | "manager" | "host";
    };
    CompositeTypes: { [_ in never]: never };
  };
};
