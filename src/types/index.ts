
// Database model types
export interface Patient {
  patient_id?: number;
  name: string;
  date_of_birth: string;
  gender: string;
  contact_details: string;
}

export interface Doctor {
  doctor_id?: number;
  name: string;
  specialization: string;
  contact_details: string;
}

export interface Appointment {
  appointment_id?: number;
  patient_id: number;
  doctor_id: number;
  appointment_date: string;
  reason: string;
  // For UI display
  patientName?: string;
  doctorName?: string;
}

export interface Billing {
  billing_id?: number;
  patient_id: number;
  amount: number;
  payment_date: string;
  // For UI display
  patientName?: string;
}

export interface DiagnosticTestResult {
  diagnostic_test_result_id?: number;
  patient_id: number;
  result: string;
  date_taken: string;
  // For UI display
  patientName?: string;
}

export interface Insurance {
  insurance_id?: number;
  patient_id: number;
  provider_name: string;
  policy_number: string;
  coverage_details: string;
  // For UI display
  patientName?: string;
}

export interface MedicalHistory {
  medical_history_id?: number;
  patient_id: number;
  medical_conditions: string;
  allergies: string;
  surgeries: string;
  treatments: string;
  // For UI display
  patientName?: string;
}

export interface Medication {
  medication_id?: number;
  patient_id: number;
  name: string;
  dosage: string;
  frequency: string;
  duration: string;
  // For UI display
  patientName?: string;
}

// Dashboard stats type
export interface DashboardStats {
  totalPatients: number;
  totalDoctors: number;
  totalAppointments: number;
  todayAppointments: number;
  recentPatients: Patient[];
  upcomingAppointments: Appointment[];
}

// API response type
export interface ApiResponse<T> {
  data?: T;
  error?: string;
  message?: string;
}
