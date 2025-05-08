
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
