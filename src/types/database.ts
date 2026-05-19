export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      addon: {
        Row: {
          aggiornato_il: string | null
          attivo: boolean | null
          categoria: string
          costo_base: number
          costo_minimo: number | null
          creato_il: string | null
          descrizione: string | null
          descrizione_breve: string | null
          fornitore_note: string | null
          foto_url: string | null
          galleria_urls: string[] | null
          icona: string | null
          id: number
          modello_prezzo: string
          nome: string
          ordine: number | null
          popolare: boolean | null
          richiede_conferma: boolean | null
          slug: string | null
          tipi_evento_compatibili: string[] | null
        }
        Insert: {
          aggiornato_il?: string | null
          attivo?: boolean | null
          categoria: string
          costo_base: number
          costo_minimo?: number | null
          creato_il?: string | null
          descrizione?: string | null
          descrizione_breve?: string | null
          fornitore_note?: string | null
          foto_url?: string | null
          galleria_urls?: string[] | null
          icona?: string | null
          id?: number
          modello_prezzo: string
          nome: string
          ordine?: number | null
          popolare?: boolean | null
          richiede_conferma?: boolean | null
          slug?: string | null
          tipi_evento_compatibili?: string[] | null
        }
        Update: {
          aggiornato_il?: string | null
          attivo?: boolean | null
          categoria?: string
          costo_base?: number
          costo_minimo?: number | null
          creato_il?: string | null
          descrizione?: string | null
          descrizione_breve?: string | null
          fornitore_note?: string | null
          foto_url?: string | null
          galleria_urls?: string[] | null
          icona?: string | null
          id?: number
          modello_prezzo?: string
          nome?: string
          ordine?: number | null
          popolare?: boolean | null
          richiede_conferma?: boolean | null
          slug?: string | null
          tipi_evento_compatibili?: string[] | null
        }
        Relationships: []
      }
      config_pricing: {
        Row: {
          aggiornato_da: string | null
          aggiornato_il: string | null
          categoria: string | null
          chiave: string
          descrizione: string
          modificabile: boolean | null
          unita: string | null
          valore: number
        }
        Insert: {
          aggiornato_da?: string | null
          aggiornato_il?: string | null
          categoria?: string | null
          chiave: string
          descrizione: string
          modificabile?: boolean | null
          unita?: string | null
          valore: number
        }
        Update: {
          aggiornato_da?: string | null
          aggiornato_il?: string | null
          categoria?: string | null
          chiave?: string
          descrizione?: string
          modificabile?: boolean | null
          unita?: string | null
          valore?: number
        }
        Relationships: []
      }
      lead_eventi: {
        Row: {
          creato_il: string | null
          descrizione: string | null
          id: number
          lead_id: number
          metadata: Json | null
          tipo_evento: string
          utente: string | null
        }
        Insert: {
          creato_il?: string | null
          descrizione?: string | null
          id?: number
          lead_id: number
          metadata?: Json | null
          tipo_evento: string
          utente?: string | null
        }
        Update: {
          creato_il?: string | null
          descrizione?: string | null
          id?: number
          lead_id?: number
          metadata?: Json | null
          tipo_evento?: string
          utente?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "lead_eventi_lead_id_fkey"
            columns: ["lead_id"]
            isOneToOne: false
            referencedRelation: "leads"
            referencedColumns: ["id"]
          },
        ]
      }
      leads: {
        Row: {
          addon_ids: number[] | null
          allestimento: boolean | null
          breakdown_calcolo: Json | null
          budget_max: number | null
          budget_min: number | null
          catering: string | null
          catering_livello: string | null
          created_at: string | null
          data_alternativa: string | null
          data_preferita: string | null
          dj: boolean | null
          email: string
          fotografo: boolean | null
          id: number
          location: string | null
          nome: string
          note_interne: string | null
          num_persone: number | null
          pacchetto_dj_id: number | null
          punteggio: number | null
          sala_id: number | null
          source: string | null
          stato: string | null
          telefono: string | null
          tipo_evento: string | null
          tipo_richiesta: string | null
          updated_at: string | null
          utm_campaign: string | null
          utm_medium: string | null
          utm_source: string | null
        }
        Insert: {
          addon_ids?: number[] | null
          allestimento?: boolean | null
          breakdown_calcolo?: Json | null
          budget_max?: number | null
          budget_min?: number | null
          catering?: string | null
          catering_livello?: string | null
          created_at?: string | null
          data_alternativa?: string | null
          data_preferita?: string | null
          dj?: boolean | null
          email: string
          fotografo?: boolean | null
          id?: number
          location?: string | null
          nome: string
          note_interne?: string | null
          num_persone?: number | null
          pacchetto_dj_id?: number | null
          punteggio?: number | null
          sala_id?: number | null
          source?: string | null
          stato?: string | null
          telefono?: string | null
          tipo_evento?: string | null
          tipo_richiesta?: string | null
          updated_at?: string | null
          utm_campaign?: string | null
          utm_medium?: string | null
          utm_source?: string | null
        }
        Update: {
          addon_ids?: number[] | null
          allestimento?: boolean | null
          breakdown_calcolo?: Json | null
          budget_max?: number | null
          budget_min?: number | null
          catering?: string | null
          catering_livello?: string | null
          created_at?: string | null
          data_alternativa?: string | null
          data_preferita?: string | null
          dj?: boolean | null
          email?: string
          fotografo?: boolean | null
          id?: number
          location?: string | null
          nome?: string
          note_interne?: string | null
          num_persone?: number | null
          pacchetto_dj_id?: number | null
          punteggio?: number | null
          sala_id?: number | null
          source?: string | null
          stato?: string | null
          telefono?: string | null
          tipo_evento?: string | null
          tipo_richiesta?: string | null
          updated_at?: string | null
          utm_campaign?: string | null
          utm_medium?: string | null
          utm_source?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "leads_sala_id_fkey"
            columns: ["sala_id"]
            isOneToOne: false
            referencedRelation: "sale"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "leads_sala_id_fkey"
            columns: ["sala_id"]
            isOneToOne: false
            referencedRelation: "sale_pubbliche"
            referencedColumns: ["id"]
          },
        ]
      }
      pacchetti_dj: {
        Row: {
          aggiornato_il: string | null
          attivo: boolean | null
          costo: number
          costo_note: string | null
          creato_il: string | null
          descrizione: string | null
          descrizione_breve: string | null
          foto_url: string | null
          galleria_urls: string[] | null
          id: number
          in_evidenza: boolean | null
          nome: string
          ordine: number | null
          ore_extra_costo: number | null
          ore_incluse: number
          servizi_inclusi: string[] | null
          slug: string | null
        }
        Insert: {
          aggiornato_il?: string | null
          attivo?: boolean | null
          costo: number
          costo_note?: string | null
          creato_il?: string | null
          descrizione?: string | null
          descrizione_breve?: string | null
          foto_url?: string | null
          galleria_urls?: string[] | null
          id?: number
          in_evidenza?: boolean | null
          nome: string
          ordine?: number | null
          ore_extra_costo?: number | null
          ore_incluse: number
          servizi_inclusi?: string[] | null
          slug?: string | null
        }
        Update: {
          aggiornato_il?: string | null
          attivo?: boolean | null
          costo?: number
          costo_note?: string | null
          creato_il?: string | null
          descrizione?: string | null
          descrizione_breve?: string | null
          foto_url?: string | null
          galleria_urls?: string[] | null
          id?: number
          in_evidenza?: boolean | null
          nome?: string
          ordine?: number | null
          ore_extra_costo?: number | null
          ore_incluse?: number
          servizi_inclusi?: string[] | null
          slug?: string | null
        }
        Relationships: []
      }
      province_stato: {
        Row: {
          attiva: boolean | null
          data_apertura_prevista: string | null
          num_sale: number | null
          ordine_visualizzazione: number | null
          provincia: string
        }
        Insert: {
          attiva?: boolean | null
          data_apertura_prevista?: string | null
          num_sale?: number | null
          ordine_visualizzazione?: number | null
          provincia: string
        }
        Update: {
          attiva?: boolean | null
          data_apertura_prevista?: string | null
          num_sale?: number | null
          ordine_visualizzazione?: number | null
          provincia?: string
        }
        Relationships: []
      }
      sale: {
        Row: {
          aggiornato_il: string | null
          atmosfera: string[] | null
          attiva: boolean | null
          cap: string | null
          caparra: number | null
          capienza: number | null
          capienza_esterna: number | null
          capienza_interna: number | null
          capienza_totale: number | null
          categoria: string
          citta: string
          commissione_concordata: number | null
          contatto_proprietario_email: string | null
          contatto_proprietario_nome: string | null
          contatto_proprietario_telefono: string | null
          creato_il: string | null
          descrizione: string | null
          email: string | null
          foto_copertina_url: string | null
          galleria_urls: string[] | null
          gestione_rifiuti: string | null
          ha_aria_condizionata: boolean | null
          ha_cucina: boolean | null
          ha_freezer: boolean | null
          ha_frigo: boolean | null
          ha_giardino: boolean | null
          ha_guardaroba: boolean | null
          ha_impianto_audio: boolean | null
          ha_impianto_luci: boolean | null
          ha_parcheggio: boolean | null
          ha_riscaldamento: boolean | null
          id: number
          immagine_url: string | null
          in_evidenza: boolean | null
          indirizzo: string
          lat: number | null
          lng: number | null
          meta_description: string | null
          meta_title: string | null
          mq: number | null
          nome: string
          note_interne: string | null
          num_bagni: number | null
          num_eventi_realizzati: number | null
          num_richieste: number | null
          num_visualizzazioni: number | null
          orario_apertura: string | null
          orario_chiusura: string | null
          ore_evento_max: number | null
          prezzo_a: number | null
          prezzo_base: number | null
          prezzo_da: number | null
          prezzo_giornata: number | null
          prezzo_note: string | null
          prezzo_ora: number | null
          priorita_ordine: number | null
          provincia: string | null
          pubblicata: boolean | null
          pulizie_incluse: boolean | null
          servizi: string[] | null
          sito_web: string | null
          slug: string | null
          telefono: string | null
          tipi_evento_adatti: string[] | null
          tipo_sala: string | null
        }
        Insert: {
          aggiornato_il?: string | null
          atmosfera?: string[] | null
          attiva?: boolean | null
          cap?: string | null
          caparra?: number | null
          capienza?: number | null
          capienza_esterna?: number | null
          capienza_interna?: number | null
          capienza_totale?: number | null
          categoria: string
          citta: string
          commissione_concordata?: number | null
          contatto_proprietario_email?: string | null
          contatto_proprietario_nome?: string | null
          contatto_proprietario_telefono?: string | null
          creato_il?: string | null
          descrizione?: string | null
          email?: string | null
          foto_copertina_url?: string | null
          galleria_urls?: string[] | null
          gestione_rifiuti?: string | null
          ha_aria_condizionata?: boolean | null
          ha_cucina?: boolean | null
          ha_freezer?: boolean | null
          ha_frigo?: boolean | null
          ha_giardino?: boolean | null
          ha_guardaroba?: boolean | null
          ha_impianto_audio?: boolean | null
          ha_impianto_luci?: boolean | null
          ha_parcheggio?: boolean | null
          ha_riscaldamento?: boolean | null
          id?: number
          immagine_url?: string | null
          in_evidenza?: boolean | null
          indirizzo: string
          lat?: number | null
          lng?: number | null
          meta_description?: string | null
          meta_title?: string | null
          mq?: number | null
          nome: string
          note_interne?: string | null
          num_bagni?: number | null
          num_eventi_realizzati?: number | null
          num_richieste?: number | null
          num_visualizzazioni?: number | null
          orario_apertura?: string | null
          orario_chiusura?: string | null
          ore_evento_max?: number | null
          prezzo_a?: number | null
          prezzo_base?: number | null
          prezzo_da?: number | null
          prezzo_giornata?: number | null
          prezzo_note?: string | null
          prezzo_ora?: number | null
          priorita_ordine?: number | null
          provincia?: string | null
          pubblicata?: boolean | null
          pulizie_incluse?: boolean | null
          servizi?: string[] | null
          sito_web?: string | null
          slug?: string | null
          telefono?: string | null
          tipi_evento_adatti?: string[] | null
          tipo_sala?: string | null
        }
        Update: {
          aggiornato_il?: string | null
          atmosfera?: string[] | null
          attiva?: boolean | null
          cap?: string | null
          caparra?: number | null
          capienza?: number | null
          capienza_esterna?: number | null
          capienza_interna?: number | null
          capienza_totale?: number | null
          categoria?: string
          citta?: string
          commissione_concordata?: number | null
          contatto_proprietario_email?: string | null
          contatto_proprietario_nome?: string | null
          contatto_proprietario_telefono?: string | null
          creato_il?: string | null
          descrizione?: string | null
          email?: string | null
          foto_copertina_url?: string | null
          galleria_urls?: string[] | null
          gestione_rifiuti?: string | null
          ha_aria_condizionata?: boolean | null
          ha_cucina?: boolean | null
          ha_freezer?: boolean | null
          ha_frigo?: boolean | null
          ha_giardino?: boolean | null
          ha_guardaroba?: boolean | null
          ha_impianto_audio?: boolean | null
          ha_impianto_luci?: boolean | null
          ha_parcheggio?: boolean | null
          ha_riscaldamento?: boolean | null
          id?: number
          immagine_url?: string | null
          in_evidenza?: boolean | null
          indirizzo?: string
          lat?: number | null
          lng?: number | null
          meta_description?: string | null
          meta_title?: string | null
          mq?: number | null
          nome?: string
          note_interne?: string | null
          num_bagni?: number | null
          num_eventi_realizzati?: number | null
          num_richieste?: number | null
          num_visualizzazioni?: number | null
          orario_apertura?: string | null
          orario_chiusura?: string | null
          ore_evento_max?: number | null
          prezzo_a?: number | null
          prezzo_base?: number | null
          prezzo_da?: number | null
          prezzo_giornata?: number | null
          prezzo_note?: string | null
          prezzo_ora?: number | null
          priorita_ordine?: number | null
          provincia?: string | null
          pubblicata?: boolean | null
          pulizie_incluse?: boolean | null
          servizi?: string[] | null
          sito_web?: string | null
          slug?: string | null
          telefono?: string | null
          tipi_evento_adatti?: string[] | null
          tipo_sala?: string | null
        }
        Relationships: []
      }
      testi_legali: {
        Row: {
          aggiornato_il: string | null
          attivo: boolean | null
          chiave: string
          posizione: string | null
          testo: string
          titolo: string | null
        }
        Insert: {
          aggiornato_il?: string | null
          attivo?: boolean | null
          chiave: string
          posizione?: string | null
          testo: string
          titolo?: string | null
        }
        Update: {
          aggiornato_il?: string | null
          attivo?: boolean | null
          chiave?: string
          posizione?: string | null
          testo?: string
          titolo?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      addon_pubblici: {
        Row: {
          categoria: string | null
          costo_base: number | null
          costo_minimo: number | null
          descrizione: string | null
          descrizione_breve: string | null
          foto_url: string | null
          galleria_urls: string[] | null
          icona: string | null
          id: number | null
          modello_prezzo: string | null
          nome: string | null
          ordine: number | null
          popolare: boolean | null
          richiede_conferma: boolean | null
          slug: string | null
          tipi_evento_compatibili: string[] | null
        }
        Insert: {
          categoria?: string | null
          costo_base?: number | null
          costo_minimo?: number | null
          descrizione?: string | null
          descrizione_breve?: string | null
          foto_url?: string | null
          galleria_urls?: string[] | null
          icona?: string | null
          id?: number | null
          modello_prezzo?: string | null
          nome?: string | null
          ordine?: number | null
          popolare?: boolean | null
          richiede_conferma?: boolean | null
          slug?: string | null
          tipi_evento_compatibili?: string[] | null
        }
        Update: {
          categoria?: string | null
          costo_base?: number | null
          costo_minimo?: number | null
          descrizione?: string | null
          descrizione_breve?: string | null
          foto_url?: string | null
          galleria_urls?: string[] | null
          icona?: string | null
          id?: number | null
          modello_prezzo?: string | null
          nome?: string | null
          ordine?: number | null
          popolare?: boolean | null
          richiede_conferma?: boolean | null
          slug?: string | null
          tipi_evento_compatibili?: string[] | null
        }
        Relationships: []
      }
      config_pricing_pubblico: {
        Row: {
          categoria: string | null
          chiave: string | null
          unita: string | null
          valore: number | null
        }
        Insert: {
          categoria?: string | null
          chiave?: string | null
          unita?: string | null
          valore?: number | null
        }
        Update: {
          categoria?: string | null
          chiave?: string | null
          unita?: string | null
          valore?: number | null
        }
        Relationships: []
      }
      pacchetti_dj_pubblici: {
        Row: {
          costo: number | null
          costo_note: string | null
          descrizione: string | null
          descrizione_breve: string | null
          foto_url: string | null
          galleria_urls: string[] | null
          id: number | null
          in_evidenza: boolean | null
          nome: string | null
          ordine: number | null
          ore_extra_costo: number | null
          ore_incluse: number | null
          servizi_inclusi: string[] | null
          slug: string | null
        }
        Insert: {
          costo?: number | null
          costo_note?: string | null
          descrizione?: string | null
          descrizione_breve?: string | null
          foto_url?: string | null
          galleria_urls?: string[] | null
          id?: number | null
          in_evidenza?: boolean | null
          nome?: string | null
          ordine?: number | null
          ore_extra_costo?: number | null
          ore_incluse?: number | null
          servizi_inclusi?: string[] | null
          slug?: string | null
        }
        Update: {
          costo?: number | null
          costo_note?: string | null
          descrizione?: string | null
          descrizione_breve?: string | null
          foto_url?: string | null
          galleria_urls?: string[] | null
          id?: number | null
          in_evidenza?: boolean | null
          nome?: string | null
          ordine?: number | null
          ore_extra_costo?: number | null
          ore_incluse?: number | null
          servizi_inclusi?: string[] | null
          slug?: string | null
        }
        Relationships: []
      }
      sale_pubbliche: {
        Row: {
          atmosfera: string[] | null
          capienza_esterna: number | null
          capienza_interna: number | null
          capienza_totale: number | null
          citta: string | null
          descrizione: string | null
          foto_copertina_url: string | null
          galleria_urls: string[] | null
          gestione_rifiuti: string | null
          ha_aria_condizionata: boolean | null
          ha_cucina: boolean | null
          ha_freezer: boolean | null
          ha_frigo: boolean | null
          ha_giardino: boolean | null
          ha_guardaroba: boolean | null
          ha_impianto_audio: boolean | null
          ha_impianto_luci: boolean | null
          ha_parcheggio: boolean | null
          ha_riscaldamento: boolean | null
          id: number | null
          in_evidenza: boolean | null
          indirizzo: string | null
          lat: number | null
          lng: number | null
          meta_description: string | null
          meta_title: string | null
          nome: string | null
          num_bagni: number | null
          orario_apertura: string | null
          orario_chiusura: string | null
          ore_evento_max: number | null
          prezzo_a: number | null
          prezzo_base: number | null
          prezzo_da: number | null
          prezzo_note: string | null
          priorita_ordine: number | null
          provincia: string | null
          pulizie_incluse: boolean | null
          slug: string | null
          tipi_evento_adatti: string[] | null
          tipo_sala: string | null
        }
        Insert: {
          atmosfera?: string[] | null
          capienza_esterna?: number | null
          capienza_interna?: number | null
          capienza_totale?: number | null
          citta?: string | null
          descrizione?: string | null
          foto_copertina_url?: string | null
          galleria_urls?: string[] | null
          gestione_rifiuti?: string | null
          ha_aria_condizionata?: boolean | null
          ha_cucina?: boolean | null
          ha_freezer?: boolean | null
          ha_frigo?: boolean | null
          ha_giardino?: boolean | null
          ha_guardaroba?: boolean | null
          ha_impianto_audio?: boolean | null
          ha_impianto_luci?: boolean | null
          ha_parcheggio?: boolean | null
          ha_riscaldamento?: boolean | null
          id?: number | null
          in_evidenza?: boolean | null
          indirizzo?: string | null
          lat?: number | null
          lng?: number | null
          meta_description?: string | null
          meta_title?: string | null
          nome?: string | null
          num_bagni?: number | null
          orario_apertura?: string | null
          orario_chiusura?: string | null
          ore_evento_max?: number | null
          prezzo_a?: number | null
          prezzo_base?: number | null
          prezzo_da?: number | null
          prezzo_note?: string | null
          priorita_ordine?: number | null
          provincia?: string | null
          pulizie_incluse?: boolean | null
          slug?: string | null
          tipi_evento_adatti?: string[] | null
          tipo_sala?: string | null
        }
        Update: {
          atmosfera?: string[] | null
          capienza_esterna?: number | null
          capienza_interna?: number | null
          capienza_totale?: number | null
          citta?: string | null
          descrizione?: string | null
          foto_copertina_url?: string | null
          galleria_urls?: string[] | null
          gestione_rifiuti?: string | null
          ha_aria_condizionata?: boolean | null
          ha_cucina?: boolean | null
          ha_freezer?: boolean | null
          ha_frigo?: boolean | null
          ha_giardino?: boolean | null
          ha_guardaroba?: boolean | null
          ha_impianto_audio?: boolean | null
          ha_impianto_luci?: boolean | null
          ha_parcheggio?: boolean | null
          ha_riscaldamento?: boolean | null
          id?: number | null
          in_evidenza?: boolean | null
          indirizzo?: string | null
          lat?: number | null
          lng?: number | null
          meta_description?: string | null
          meta_title?: string | null
          nome?: string | null
          num_bagni?: number | null
          orario_apertura?: string | null
          orario_chiusura?: string | null
          ore_evento_max?: number | null
          prezzo_a?: number | null
          prezzo_base?: number | null
          prezzo_da?: number | null
          prezzo_note?: string | null
          priorita_ordine?: number | null
          provincia?: string | null
          pulizie_incluse?: boolean | null
          slug?: string | null
          tipi_evento_adatti?: string[] | null
          tipo_sala?: string | null
        }
        Relationships: []
      }
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const