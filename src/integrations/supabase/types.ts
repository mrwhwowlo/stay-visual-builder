export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      admin_users: {
        Row: {
          created_at: string
          id: string
          role: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      bookings: {
        Row: {
          check_in: string
          check_out: string
          created_at: string
          guest_email: string
          guest_name: string
          guests: number
          id: string
          property_id: string
          status: string | null
          total_price: number
          updated_at: string
          user_id: string | null
        }
        Insert: {
          check_in: string
          check_out: string
          created_at?: string
          guest_email: string
          guest_name: string
          guests?: number
          id?: string
          property_id: string
          status?: string | null
          total_price: number
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          check_in?: string
          check_out?: string
          created_at?: string
          guest_email?: string
          guest_name?: string
          guests?: number
          id?: string
          property_id?: string
          status?: string | null
          total_price?: number
          updated_at?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "bookings_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: false
            referencedRelation: "properties"
            referencedColumns: ["id"]
          },
        ]
      }
      listing_availability: {
        Row: {
          created_at: string
          date: string
          id: string
          is_available: boolean
          price_override: number | null
          property_id: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          date: string
          id?: string
          is_available?: boolean
          price_override?: number | null
          property_id: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          date?: string
          id?: string
          is_available?: boolean
          price_override?: number | null
          property_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "listing_availability_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: false
            referencedRelation: "properties"
            referencedColumns: ["id"]
          },
        ]
      }
      properties: {
        Row: {
          amenities: Json | null
          bathrooms: number
          bedrooms: number
          created_at: string
          description: string | null
          host_avatar: string | null
          host_is_superhost: boolean | null
          host_joined_year: string | null
          host_name: string | null
          id: string
          images: Json | null
          is_active: boolean | null
          latitude: number | null
          location: string
          longitude: number | null
          max_guests: number
          price_per_night: number
          slug: string | null
          title: string
          updated_at: string
        }
        Insert: {
          amenities?: Json | null
          bathrooms?: number
          bedrooms?: number
          created_at?: string
          description?: string | null
          host_avatar?: string | null
          host_is_superhost?: boolean | null
          host_joined_year?: string | null
          host_name?: string | null
          id?: string
          images?: Json | null
          is_active?: boolean | null
          latitude?: number | null
          location: string
          longitude?: number | null
          max_guests?: number
          price_per_night: number
          slug?: string | null
          title: string
          updated_at?: string
        }
        Update: {
          amenities?: Json | null
          bathrooms?: number
          bedrooms?: number
          created_at?: string
          description?: string | null
          host_avatar?: string | null
          host_is_superhost?: boolean | null
          host_joined_year?: string | null
          host_name?: string | null
          id?: string
          images?: Json | null
          is_active?: boolean | null
          latitude?: number | null
          location?: string
          longitude?: number | null
          max_guests?: number
          price_per_night?: number
          slug?: string | null
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      property_statistics: {
        Row: {
          average_rating: number | null
          bookings_count: number
          created_at: string
          id: string
          last_booking_date: string | null
          property_id: string
          revenue_total: number
          total_reviews: number
          updated_at: string
          views_count: number
        }
        Insert: {
          average_rating?: number | null
          bookings_count?: number
          created_at?: string
          id?: string
          last_booking_date?: string | null
          property_id: string
          revenue_total?: number
          total_reviews?: number
          updated_at?: string
          views_count?: number
        }
        Update: {
          average_rating?: number | null
          bookings_count?: number
          created_at?: string
          id?: string
          last_booking_date?: string | null
          property_id?: string
          revenue_total?: number
          total_reviews?: number
          updated_at?: string
          views_count?: number
        }
        Relationships: [
          {
            foreignKeyName: "property_statistics_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: true
            referencedRelation: "properties"
            referencedColumns: ["id"]
          },
        ]
      }
      reviews: {
        Row: {
          comment: string
          created_at: string
          date: string
          id: string
          is_active: boolean
          property_id: string
          rating: number
          updated_at: string
          user_avatar: string | null
          user_name: string
        }
        Insert: {
          comment: string
          created_at?: string
          date?: string
          id?: string
          is_active?: boolean
          property_id: string
          rating: number
          updated_at?: string
          user_avatar?: string | null
          user_name: string
        }
        Update: {
          comment?: string
          created_at?: string
          date?: string
          id?: string
          is_active?: boolean
          property_id?: string
          rating?: number
          updated_at?: string
          user_avatar?: string | null
          user_name?: string
        }
        Relationships: [
          {
            foreignKeyName: "reviews_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: false
            referencedRelation: "properties"
            referencedColumns: ["id"]
          },
        ]
      }
      site_content: {
        Row: {
          content: string
          content_type: string | null
          created_at: string | null
          id: string
          key: string
          updated_at: string | null
        }
        Insert: {
          content: string
          content_type?: string | null
          created_at?: string | null
          id?: string
          key: string
          updated_at?: string | null
        }
        Update: {
          content?: string
          content_type?: string | null
          created_at?: string | null
          id?: string
          key?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      user_activity: {
        Row: {
          activity_type: string
          created_at: string | null
          details: Json | null
          id: string
          ip_address: unknown | null
          user_agent: string | null
          user_id: string | null
        }
        Insert: {
          activity_type: string
          created_at?: string | null
          details?: Json | null
          id?: string
          ip_address?: unknown | null
          user_agent?: string | null
          user_id?: string | null
        }
        Update: {
          activity_type?: string
          created_at?: string | null
          details?: Json | null
          id?: string
          ip_address?: unknown | null
          user_agent?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      generate_property_slug: {
        Args: { title: string }
        Returns: string
      }
      is_admin: {
        Args: { user_uuid: string }
        Returns: boolean
      }
      update_property_statistics: {
        Args: { property_uuid: string }
        Returns: undefined
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
