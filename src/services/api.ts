
import { useState } from 'react';
import { 
  Patient, 
  Doctor, 
  Appointment, 
  Billing, 
  DiagnosticTestResult,
  Insurance, 
  MedicalHistory, 
  Medication,
  ApiResponse
} from '../types';

// This will be replaced with your actual MySQL database connection
// For now, we'll use some mock data and simulate API calls
const mockData = {
  patients: [
    { patient_id: 1, name: 'John Doe', date_of_birth: '1980-05-15', gender: 'Male', contact_details: 'john@example.com | 555-1234' },
    { patient_id: 2, name: 'Jane Smith', date_of_birth: '1992-09-22', gender: 'Female', contact_details: 'jane@example.com | 555-5678' },
    { patient_id: 3, name: 'Robert Johnson', date_of_birth: '1975-03-10', gender: 'Male', contact_details: 'robert@example.com | 555-9876' },
  ] as Patient[],
  
  doctors: [
    { doctor_id: 1, name: 'Dr. Sarah Wilson', specialization: 'Cardiology', contact_details: 'sarah@hospital.com | 555-1111' },
    { doctor_id: 2, name: 'Dr. Michael Brown', specialization: 'Neurology', contact_details: 'michael@hospital.com | 555-2222' },
    { doctor_id: 3, name: 'Dr. Emily Davis', specialization: 'Pediatrics', contact_details: 'emily@hospital.com | 555-3333' },
  ] as Doctor[],
  
  appointments: [
    { appointment_id: 1, patient_id: 1, doctor_id: 1, appointment_date: '2023-11-20T10:30:00', reason: 'Annual checkup' },
    { appointment_id: 2, patient_id: 2, doctor_id: 3, appointment_date: '2023-11-21T14:00:00', reason: 'Flu symptoms' },
    { appointment_id: 3, patient_id: 3, doctor_id: 2, appointment_date: '2023-11-22T09:15:00', reason: 'Follow-up visit' },
  ] as Appointment[],
  
  billings: [
    { billing_id: 1, patient_id: 1, amount: 150.00, payment_date: '2023-11-20' },
    { billing_id: 2, patient_id: 2, amount: 200.00, payment_date: '2023-11-21' },
  ] as Billing[],
  
  diagnosticTestResults: [
    { diagnostic_test_result_id: 1, patient_id: 1, result: 'Normal', date_taken: '2023-11-18' },
    { diagnostic_test_result_id: 2, patient_id: 3, result: 'Abnormal', date_taken: '2023-11-19' },
  ] as DiagnosticTestResult[],
  
  insurance: [
    { insurance_id: 1, patient_id: 1, provider_name: 'BlueShield', policy_number: 'BS12345', coverage_details: 'Full coverage' },
    { insurance_id: 2, patient_id: 2, provider_name: 'HealthPlus', policy_number: 'HP67890', coverage_details: 'Partial coverage' },
  ] as Insurance[],
  
  medicalHistories: [
    { medical_history_id: 1, patient_id: 1, medical_conditions: 'Hypertension', allergies: 'Penicillin', surgeries: 'Appendectomy 2015', treatments: 'Blood pressure medication' },
    { medical_history_id: 2, patient_id: 3, medical_conditions: 'Diabetes Type 2', allergies: 'None', surgeries: 'None', treatments: 'Insulin therapy' },
  ] as MedicalHistory[],
  
  medications: [
    { medication_id: 1, patient_id: 1, name: 'Lisinopril', dosage: '10mg', frequency: 'Once daily', duration: 'Ongoing' },
    { medication_id: 2, patient_id: 3, name: 'Metformin', dosage: '500mg', frequency: 'Twice daily', duration: '6 months' },
  ] as Medication[]
};

// Simulated delay to mimic API call
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Generic fetch function
async function fetchData<T>(endpoint: string): Promise<ApiResponse<T>> {
  // Simulate API call
  await delay(500);
  
  const dataMap: Record<string, any> = {
    'patients': mockData.patients,
    'doctors': mockData.doctors,
    'appointments': mockData.appointments,
    'billings': mockData.billings,
    'diagnosticTestResults': mockData.diagnosticTestResults,
    'insurance': mockData.insurance,
    'medicalHistories': mockData.medicalHistories,
    'medications': mockData.medications
  };
  
  const data = dataMap[endpoint];
  
  if (data) {
    // If the endpoint is appointments, join with patient and doctor names
    if (endpoint === 'appointments') {
      const enrichedData = data.map((appointment: Appointment) => {
        const patient = mockData.patients.find(p => p.patient_id === appointment.patient_id);
        const doctor = mockData.doctors.find(d => d.doctor_id === appointment.doctor_id);
        return {
          ...appointment,
          patientName: patient?.name || 'Unknown',
          doctorName: doctor?.name || 'Unknown'
        };
      });
      return { data: enrichedData };
    }
    
    return { data };
  }
  
  return { error: 'Data not found' };
}

// Generic add function
async function addData<T>(endpoint: string, item: T): Promise<ApiResponse<T>> {
  // Simulate API call
  await delay(500);
  
  try {
    if (endpoint === 'patients') {
      const newId = mockData.patients.length ? Math.max(...mockData.patients.map(p => p.patient_id || 0)) + 1 : 1;
      const newPatient = { ...(item as object), patient_id: newId } as Patient;
      mockData.patients.push(newPatient);
      return { data: newPatient as unknown as T, message: 'Patient added successfully' };
    } 
    else if (endpoint === 'doctors') {
      const newId = mockData.doctors.length ? Math.max(...mockData.doctors.map(d => d.doctor_id || 0)) + 1 : 1;
      const newDoctor = { ...(item as object), doctor_id: newId } as Doctor;
      mockData.doctors.push(newDoctor);
      return { data: newDoctor as unknown as T, message: 'Doctor added successfully' };
    }
    else if (endpoint === 'appointments') {
      const newId = mockData.appointments.length ? Math.max(...mockData.appointments.map(a => a.appointment_id || 0)) + 1 : 1;
      const newAppointment = { ...(item as object), appointment_id: newId } as Appointment;
      mockData.appointments.push(newAppointment);
      return { data: newAppointment as unknown as T, message: 'Appointment added successfully' };
    }
    
    return { error: 'Endpoint not supported for adding data' };
  } catch (error) {
    return { error: `Failed to add data: ${error}` };
  }
}

// Generic delete function
async function deleteData(endpoint: string, id: number): Promise<ApiResponse<null>> {
  // Simulate API call
  await delay(500);
  
  try {
    if (endpoint === 'patients') {
      const index = mockData.patients.findIndex(p => p.patient_id === id);
      if (index !== -1) {
        mockData.patients.splice(index, 1);
        return { message: 'Patient deleted successfully' };
      }
    } 
    else if (endpoint === 'doctors') {
      const index = mockData.doctors.findIndex(d => d.doctor_id === id);
      if (index !== -1) {
        mockData.doctors.splice(index, 1);
        return { message: 'Doctor deleted successfully' };
      }
    }
    else if (endpoint === 'appointments') {
      const index = mockData.appointments.findIndex(a => a.appointment_id === id);
      if (index !== -1) {
        mockData.appointments.splice(index, 1);
        return { message: 'Appointment deleted successfully' };
      }
    }
    
    return { error: 'Item not found' };
  } catch (error) {
    return { error: `Failed to delete data: ${error}` };
  }
}

// Get dashboard stats
async function getDashboardStats(): Promise<ApiResponse<any>> {
  // Simulate API call
  await delay(500);
  
  try {
    const today = new Date().toISOString().split('T')[0];
    
    const todayAppointments = mockData.appointments.filter(a => 
      a.appointment_date.includes(today)
    );
    
    // Enrich appointments with patient and doctor names
    const upcomingAppointments = mockData.appointments
      .map(appointment => {
        const patient = mockData.patients.find(p => p.patient_id === appointment.patient_id);
        const doctor = mockData.doctors.find(d => d.doctor_id === appointment.doctor_id);
        return {
          ...appointment,
          patientName: patient?.name || 'Unknown',
          doctorName: doctor?.name || 'Unknown'
        };
      })
      .filter(a => new Date(a.appointment_date) >= new Date())
      .sort((a, b) => new Date(a.appointment_date).getTime() - new Date(b.appointment_date).getTime())
      .slice(0, 5);
    
    // Get most recently added patients
    const recentPatients = [...mockData.patients]
      .sort((a, b) => (b.patient_id || 0) - (a.patient_id || 0))
      .slice(0, 5);
    
    const stats = {
      totalPatients: mockData.patients.length,
      totalDoctors: mockData.doctors.length,
      totalAppointments: mockData.appointments.length,
      todayAppointments: todayAppointments.length,
      recentPatients,
      upcomingAppointments
    };
    
    return { data: stats };
  } catch (error) {
    return { error: `Failed to get dashboard stats: ${error}` };
  }
}

// Hooks for data operations
export function usePatients() {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const fetchPatients = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetchData<Patient[]>('patients');
      if (response.error) {
        setError(response.error);
      } else if (response.data) {
        setPatients(response.data);
      }
    } catch (err) {
      setError('Failed to fetch patients');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  
  const addPatient = async (patient: Patient) => {
    try {
      const response = await addData<Patient>('patients', patient);
      if (response.error) {
        setError(response.error);
        return false;
      } else {
        await fetchPatients();
        return true;
      }
    } catch (err) {
      setError('Failed to add patient');
      console.error(err);
      return false;
    }
  };
  
  const deletePatient = async (patientId: number) => {
    try {
      const response = await deleteData('patients', patientId);
      if (response.error) {
        setError(response.error);
        return false;
      } else {
        await fetchPatients();
        return true;
      }
    } catch (err) {
      setError('Failed to delete patient');
      console.error(err);
      return false;
    }
  };
  
  return { patients, loading, error, fetchPatients, addPatient, deletePatient };
}

export function useDoctors() {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const fetchDoctors = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetchData<Doctor[]>('doctors');
      if (response.error) {
        setError(response.error);
      } else if (response.data) {
        setDoctors(response.data);
      }
    } catch (err) {
      setError('Failed to fetch doctors');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  
  const addDoctor = async (doctor: Doctor) => {
    try {
      const response = await addData<Doctor>('doctors', doctor);
      if (response.error) {
        setError(response.error);
        return false;
      } else {
        await fetchDoctors();
        return true;
      }
    } catch (err) {
      setError('Failed to add doctor');
      console.error(err);
      return false;
    }
  };
  
  const deleteDoctor = async (doctorId: number) => {
    try {
      const response = await deleteData('doctors', doctorId);
      if (response.error) {
        setError(response.error);
        return false;
      } else {
        await fetchDoctors();
        return true;
      }
    } catch (err) {
      setError('Failed to delete doctor');
      console.error(err);
      return false;
    }
  };
  
  return { doctors, loading, error, fetchDoctors, addDoctor, deleteDoctor };
}

export function useAppointments() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const fetchAppointments = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetchData<Appointment[]>('appointments');
      if (response.error) {
        setError(response.error);
      } else if (response.data) {
        setAppointments(response.data);
      }
    } catch (err) {
      setError('Failed to fetch appointments');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  
  const addAppointment = async (appointment: Appointment) => {
    try {
      const response = await addData<Appointment>('appointments', appointment);
      if (response.error) {
        setError(response.error);
        return false;
      } else {
        await fetchAppointments();
        return true;
      }
    } catch (err) {
      setError('Failed to add appointment');
      console.error(err);
      return false;
    }
  };
  
  const deleteAppointment = async (appointmentId: number) => {
    try {
      const response = await deleteData('appointments', appointmentId);
      if (response.error) {
        setError(response.error);
        return false;
      } else {
        await fetchAppointments();
        return true;
      }
    } catch (err) {
      setError('Failed to delete appointment');
      console.error(err);
      return false;
    }
  };
  
  return { appointments, loading, error, fetchAppointments, addAppointment, deleteAppointment };
}

export function useDashboardStats() {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const fetchStats = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await getDashboardStats();
      if (response.error) {
        setError(response.error);
      } else if (response.data) {
        setStats(response.data);
      }
    } catch (err) {
      setError('Failed to fetch dashboard stats');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  
  return { stats, loading, error, fetchStats };
}
