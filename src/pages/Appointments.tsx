
import React, { useEffect } from 'react';
import { useAppointments, usePatients, useDoctors } from '../services/api';
import Layout from '../components/Layout';
import AddAppointmentForm from '../components/Appointments/AddAppointmentForm';
import AppointmentList from '../components/Appointments/AppointmentList';
import { toast } from "@/components/ui/sonner";

const Appointments: React.FC = () => {
  const { appointments, loading: loadingAppointments, error: appointmentsError, fetchAppointments, addAppointment, deleteAppointment } = useAppointments();
  const { patients, loading: loadingPatients, error: patientsError, fetchPatients } = usePatients();
  const { doctors, loading: loadingDoctors, error: doctorsError, fetchDoctors } = useDoctors();
  
  useEffect(() => {
    fetchAppointments();
    fetchPatients();
    fetchDoctors();
  }, []);
  
  const handleAddAppointment = async (appointmentData: any) => {
    const success = await addAppointment(appointmentData);
    
    if (success) {
      toast.success('Appointment added successfully');
      return true;
    } else {
      toast.error('Failed to add appointment');
      return false;
    }
  };
  
  const handleDeleteAppointment = async (appointmentId: number) => {
    const success = await deleteAppointment(appointmentId);
      
    if (success) {
      toast.success('Appointment deleted successfully');
    } else {
      toast.error('Failed to delete appointment');
    }
  };
  
  const loading = loadingAppointments || loadingPatients || loadingDoctors;
  const error = appointmentsError || patientsError || doctorsError;
  
  return (
    <Layout>
      <div className="mb-8">
        <h1 className="text-2xl lg:text-3xl font-bold text-gray-800">Appointment Management</h1>
        <p className="text-gray-500 mt-1">Add, view and manage appointments</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <AddAppointmentForm 
            onAdd={handleAddAppointment} 
            patients={patients} 
            doctors={doctors}
          />
        </div>
        
        <div className="lg:col-span-2">
          {loading ? (
            <div className="text-center py-12">
              <div className="text-lg">Loading appointments...</div>
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <div className="text-lg text-red-500">Error: {error}</div>
              <button 
                onClick={fetchAppointments}
                className="mt-4 px-4 py-2 bg-medical-blue text-white rounded-md"
              >
                Try Again
              </button>
            </div>
          ) : (
            <AppointmentList appointments={appointments} onDelete={handleDeleteAppointment} />
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Appointments;
