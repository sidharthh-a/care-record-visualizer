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
      appointment: {
        Row: {
          appointment_date: string | null
          appointment_id: number
          doctor_id: number | null
          patient_id: number | null
          reason: string | null
        }
        Insert: {
          appointment_date?: string | null
          appointment_id?: number
          doctor_id?: number | null
          patient_id?: number | null
          reason?: string | null
        }
        Update: {
          appointment_date?: string | null
          appointment_id?: number
          doctor_id?: number | null
          patient_id?: number | null
          reason?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "appointment_doctor_id_fkey"
            columns: ["doctor_id"]
            isOneToOne: false
            referencedRelation: "doctor"
            referencedColumns: ["doctor_id"]
          },
          {
            foreignKeyName: "appointment_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "patient"
            referencedColumns: ["patient_id"]
          },
        ]
      }
      billing: {
        Row: {
          amount: number | null
          billing_id: number
          patient_id: number | null
          payment_date: string | null
        }
        Insert: {
          amount?: number | null
          billing_id?: number
          patient_id?: number | null
          payment_date?: string | null
        }
        Update: {
          amount?: number | null
          billing_id?: number
          patient_id?: number | null
          payment_date?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "billing_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "patient"
            referencedColumns: ["patient_id"]
          },
        ]
      }
      diagnostic_test_result: {
        Row: {
          date_taken: string | null
          diagnostic_test_result_id: number
          patient_id: number | null
          result: string | null
        }
        Insert: {
          date_taken?: string | null
          diagnostic_test_result_id?: number
          patient_id?: number | null
          result?: string | null
        }
        Update: {
          date_taken?: string | null
          diagnostic_test_result_id?: number
          patient_id?: number | null
          result?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "diagnostic_test_result_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "patient"
            referencedColumns: ["patient_id"]
          },
        ]
      }
      doctor: {
        Row: {
          contact_details: string | null
          doctor_id: number
          name: string | null
          specialization: string | null
        }
        Insert: {
          contact_details?: string | null
          doctor_id?: number
          name?: string | null
          specialization?: string | null
        }
        Update: {
          contact_details?: string | null
          doctor_id?: number
          name?: string | null
          specialization?: string | null
        }
        Relationships: []
      }
      insurance: {
        Row: {
          coverage_details: string | null
          insurance_id: number
          patient_id: number | null
          policy_number: string | null
          provider_name: string | null
        }
        Insert: {
          coverage_details?: string | null
          insurance_id?: number
          patient_id?: number | null
          policy_number?: string | null
          provider_name?: string | null
        }
        Update: {
          coverage_details?: string | null
          insurance_id?: number
          patient_id?: number | null
          policy_number?: string | null
          provider_name?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "insurance_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "patient"
            referencedColumns: ["patient_id"]
          },
        ]
      }
      medical_history: {
        Row: {
          allergies: string | null
          medical_conditions: string | null
          medical_history_id: number
          patient_id: number | null
          surgeries: string | null
          treatments: string | null
        }
        Insert: {
          allergies?: string | null
          medical_conditions?: string | null
          medical_history_id?: number
          patient_id?: number | null
          surgeries?: string | null
          treatments?: string | null
        }
        Update: {
          allergies?: string | null
          medical_conditions?: string | null
          medical_history_id?: number
          patient_id?: number | null
          surgeries?: string | null
          treatments?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "medical_history_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "patient"
            referencedColumns: ["patient_id"]
          },
        ]
      }
      medication: {
        Row: {
          dosage: string | null
          duration: string | null
          frequency: string | null
          medication_id: number
          name: string | null
          patient_id: number | null
        }
        Insert: {
          dosage?: string | null
          duration?: string | null
          frequency?: string | null
          medication_id?: number
          name?: string | null
          patient_id?: number | null
        }
        Update: {
          dosage?: string | null
          duration?: string | null
          frequency?: string | null
          medication_id?: number
          name?: string | null
          patient_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "medication_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "patient"
            referencedColumns: ["patient_id"]
          },
        ]
      }
      patient: {
        Row: {
          contact_details: string | null
          date_of_birth: string | null
          gender: string | null
          name: string | null
          patient_id: number
        }
        Insert: {
          contact_details?: string | null
          date_of_birth?: string | null
          gender?: string | null
          name?: string | null
          patient_id?: number
        }
        Update: {
          contact_details?: string | null
          date_of_birth?: string | null
          gender?: string | null
          name?: string | null
          patient_id?: number
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
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
