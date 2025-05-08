
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
import { supabase } from "@/integrations/supabase/client";

// Function to fetch dashboard statistics from Supabase
async function getDashboardStats(): Promise<ApiResponse<any>> {
  try {
    // Get total counts
    const { count: totalPatients } = await supabase
      .from('patient')
      .select('*', { count: 'exact', head: true });

    const { count: totalDoctors } = await supabase
      .from('doctor')
      .select('*', { count: 'exact', head: true });

    const { count: totalAppointments } = await supabase
      .from('appointment')
      .select('*', { count: 'exact', head: true });

    // Get today's appointments
    const today = new Date().toISOString().split('T')[0];
    const { count: todayAppointments } = await supabase
      .from('appointment')
      .select('*', { count: 'exact', head: true })
      .like('appointment_date', `${today}%`);

    // Get recent patients
    const { data: recentPatients, error: patientsError } = await supabase
      .from('patient')
      .select('*')
      .order('patient_id', { ascending: false })
      .limit(5);

    if (patientsError) {
      console.error('Error fetching recent patients:', patientsError);
      return { error: 'Failed to fetch recent patients' };
    }

    // Get upcoming appointments with patient and doctor names
    const { data: upcomingAppointmentsRaw, error: appointmentsError } = await supabase
      .from('appointment')
      .select('*, patient:patient_id(name), doctor:doctor_id(name)')
      .gte('appointment_date', new Date().toISOString())
      .order('appointment_date', { ascending: true })
      .limit(5);

    if (appointmentsError) {
      console.error('Error fetching upcoming appointments:', appointmentsError);
      return { error: 'Failed to fetch upcoming appointments' };
    }

    // Format appointments for the UI
    const upcomingAppointments = upcomingAppointmentsRaw.map(appt => ({
      appointment_id: appt.appointment_id,
      patient_id: appt.patient_id,
      doctor_id: appt.doctor_id,
      appointment_date: appt.appointment_date,
      reason: appt.reason,
      patientName: appt.patient?.name || 'Unknown',
      doctorName: appt.doctor?.name || 'Unknown'
    }));

    const stats = {
      totalPatients: totalPatients || 0,
      totalDoctors: totalDoctors || 0,
      totalAppointments: totalAppointments || 0,
      todayAppointments: todayAppointments || 0,
      recentPatients: recentPatients || [],
      upcomingAppointments: upcomingAppointments || []
    };

    return { data: stats };
  } catch (error) {
    console.error('Error in getDashboardStats:', error);
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
      const { data, error } = await supabase.from('patient').select('*');
      
      if (error) {
        setError(error.message);
        console.error('Error fetching patients:', error);
      } else {
        setPatients(data as Patient[]);
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
      const { error } = await supabase.from('patient').insert(patient);
      
      if (error) {
        setError(error.message);
        console.error('Error adding patient:', error);
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
      const { error } = await supabase.from('patient').delete().eq('patient_id', patientId);
      
      if (error) {
        setError(error.message);
        console.error('Error deleting patient:', error);
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
      const { data, error } = await supabase.from('doctor').select('*');
      
      if (error) {
        setError(error.message);
        console.error('Error fetching doctors:', error);
      } else {
        setDoctors(data as Doctor[]);
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
      const { error } = await supabase.from('doctor').insert(doctor);
      
      if (error) {
        setError(error.message);
        console.error('Error adding doctor:', error);
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
      const { error } = await supabase.from('doctor').delete().eq('doctor_id', doctorId);
      
      if (error) {
        setError(error.message);
        console.error('Error deleting doctor:', error);
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
      const { data, error } = await supabase
        .from('appointment')
        .select('*, patient:patient_id(name), doctor:doctor_id(name)');
      
      if (error) {
        setError(error.message);
        console.error('Error fetching appointments:', error);
      } else {
        const formattedAppointments = data.map(appt => ({
          appointment_id: appt.appointment_id,
          patient_id: appt.patient_id,
          doctor_id: appt.doctor_id,
          appointment_date: appt.appointment_date,
          reason: appt.reason,
          patientName: appt.patient?.name || 'Unknown',
          doctorName: appt.doctor?.name || 'Unknown'
        }));
        
        setAppointments(formattedAppointments);
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
      const { error } = await supabase.from('appointment').insert({
        patient_id: appointment.patient_id,
        doctor_id: appointment.doctor_id,
        appointment_date: appointment.appointment_date,
        reason: appointment.reason
      });
      
      if (error) {
        setError(error.message);
        console.error('Error adding appointment:', error);
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
      const { error } = await supabase.from('appointment').delete().eq('appointment_id', appointmentId);
      
      if (error) {
        setError(error.message);
        console.error('Error deleting appointment:', error);
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

export function useBillings() {
  const [billings, setBillings] = useState<Billing[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const fetchBillings = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const { data, error } = await supabase
        .from('billing')
        .select('*, patient:patient_id(name)');
      
      if (error) {
        setError(error.message);
        console.error('Error fetching billings:', error);
      } else {
        const formattedBillings = data.map(billing => ({
          billing_id: billing.billing_id,
          patient_id: billing.patient_id,
          amount: billing.amount,
          payment_date: billing.payment_date,
          patientName: billing.patient?.name || 'Unknown'
        }));
        
        setBillings(formattedBillings);
      }
    } catch (err) {
      setError('Failed to fetch billings');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  
  const addBilling = async (billing: Billing) => {
    try {
      const { error } = await supabase.from('billing').insert({
        patient_id: billing.patient_id,
        amount: billing.amount,
        payment_date: billing.payment_date
      });
      
      if (error) {
        setError(error.message);
        console.error('Error adding billing:', error);
        return false;
      } else {
        await fetchBillings();
        return true;
      }
    } catch (err) {
      setError('Failed to add billing');
      console.error(err);
      return false;
    }
  };
  
  const deleteBilling = async (billingId: number) => {
    try {
      const { error } = await supabase.from('billing').delete().eq('billing_id', billingId);
      
      if (error) {
        setError(error.message);
        console.error('Error deleting billing:', error);
        return false;
      } else {
        await fetchBillings();
        return true;
      }
    } catch (err) {
      setError('Failed to delete billing');
      console.error(err);
      return false;
    }
  };
  
  return { billings, loading, error, fetchBillings, addBilling, deleteBilling };
}

export function useMedicalHistories() {
  const [medicalHistories, setMedicalHistories] = useState<MedicalHistory[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const fetchMedicalHistories = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const { data, error } = await supabase
        .from('medical_history')
        .select('*, patient:patient_id(name)');
      
      if (error) {
        setError(error.message);
        console.error('Error fetching medical histories:', error);
      } else {
        const formattedHistories = data.map(history => ({
          medical_history_id: history.medical_history_id,
          patient_id: history.patient_id,
          medical_conditions: history.medical_conditions,
          allergies: history.allergies,
          surgeries: history.surgeries,
          treatments: history.treatments,
          patientName: history.patient?.name || 'Unknown'
        }));
        
        setMedicalHistories(formattedHistories);
      }
    } catch (err) {
      setError('Failed to fetch medical histories');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  
  const addMedicalHistory = async (history: MedicalHistory) => {
    try {
      const { error } = await supabase.from('medical_history').insert({
        patient_id: history.patient_id,
        medical_conditions: history.medical_conditions,
        allergies: history.allergies,
        surgeries: history.surgeries,
        treatments: history.treatments
      });
      
      if (error) {
        setError(error.message);
        console.error('Error adding medical history:', error);
        return false;
      } else {
        await fetchMedicalHistories();
        return true;
      }
    } catch (err) {
      setError('Failed to add medical history');
      console.error(err);
      return false;
    }
  };
  
  const deleteMedicalHistory = async (historyId: number) => {
    try {
      const { error } = await supabase.from('medical_history').delete().eq('medical_history_id', historyId);
      
      if (error) {
        setError(error.message);
        console.error('Error deleting medical history:', error);
        return false;
      } else {
        await fetchMedicalHistories();
        return true;
      }
    } catch (err) {
      setError('Failed to delete medical history');
      console.error(err);
      return false;
    }
  };
  
  return { medicalHistories, loading, error, fetchMedicalHistories, addMedicalHistory, deleteMedicalHistory };
}

export function useInsurances() {
  const [insurances, setInsurances] = useState<Insurance[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const fetchInsurances = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const { data, error } = await supabase
        .from('insurance')
        .select('*, patient:patient_id(name)');
      
      if (error) {
        setError(error.message);
        console.error('Error fetching insurances:', error);
      } else {
        const formattedInsurances = data.map(insurance => ({
          insurance_id: insurance.insurance_id,
          patient_id: insurance.patient_id,
          provider_name: insurance.provider_name,
          policy_number: insurance.policy_number,
          coverage_details: insurance.coverage_details,
          patientName: insurance.patient?.name || 'Unknown'
        }));
        
        setInsurances(formattedInsurances);
      }
    } catch (err) {
      setError('Failed to fetch insurances');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  
  const addInsurance = async (insurance: Insurance) => {
    try {
      const { error } = await supabase.from('insurance').insert({
        patient_id: insurance.patient_id,
        provider_name: insurance.provider_name,
        policy_number: insurance.policy_number,
        coverage_details: insurance.coverage_details
      });
      
      if (error) {
        setError(error.message);
        console.error('Error adding insurance:', error);
        return false;
      } else {
        await fetchInsurances();
        return true;
      }
    } catch (err) {
      setError('Failed to add insurance');
      console.error(err);
      return false;
    }
  };
  
  const deleteInsurance = async (insuranceId: number) => {
    try {
      const { error } = await supabase.from('insurance').delete().eq('insurance_id', insuranceId);
      
      if (error) {
        setError(error.message);
        console.error('Error deleting insurance:', error);
        return false;
      } else {
        await fetchInsurances();
        return true;
      }
    } catch (err) {
      setError('Failed to delete insurance');
      console.error(err);
      return false;
    }
  };
  
  return { insurances, loading, error, fetchInsurances, addInsurance, deleteInsurance };
}

export function useMedications() {
  const [medications, setMedications] = useState<Medication[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const fetchMedications = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const { data, error } = await supabase
        .from('medication')
        .select('*, patient:patient_id(name)');
      
      if (error) {
        setError(error.message);
        console.error('Error fetching medications:', error);
      } else {
        const formattedMedications = data.map(medication => ({
          medication_id: medication.medication_id,
          patient_id: medication.patient_id,
          name: medication.name,
          dosage: medication.dosage,
          frequency: medication.frequency,
          duration: medication.duration,
          patientName: medication.patient?.name || 'Unknown'
        }));
        
        setMedications(formattedMedications);
      }
    } catch (err) {
      setError('Failed to fetch medications');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  
  const addMedication = async (medication: Medication) => {
    try {
      const { error } = await supabase.from('medication').insert({
        patient_id: medication.patient_id,
        name: medication.name,
        dosage: medication.dosage,
        frequency: medication.frequency,
        duration: medication.duration
      });
      
      if (error) {
        setError(error.message);
        console.error('Error adding medication:', error);
        return false;
      } else {
        await fetchMedications();
        return true;
      }
    } catch (err) {
      setError('Failed to add medication');
      console.error(err);
      return false;
    }
  };
  
  const deleteMedication = async (medicationId: number) => {
    try {
      const { error } = await supabase.from('medication').delete().eq('medication_id', medicationId);
      
      if (error) {
        setError(error.message);
        console.error('Error deleting medication:', error);
        return false;
      } else {
        await fetchMedications();
        return true;
      }
    } catch (err) {
      setError('Failed to delete medication');
      console.error(err);
      return false;
    }
  };
  
  return { medications, loading, error, fetchMedications, addMedication, deleteMedication };
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
