
import React, { useEffect } from 'react';
import { usePatients } from '../services/api';
import Layout from '../components/Layout';
import AddPatientForm from '../components/Patients/AddPatientForm';
import PatientList from '../components/Patients/PatientList';
import { toast } from "@/components/ui/sonner";

const Patients: React.FC = () => {
  const { patients, loading, error, fetchPatients, addPatient, deletePatient } = usePatients();
  
  useEffect(() => {
    fetchPatients();
  }, []);
  
  const handleAddPatient = async (patientData: any) => {
    const success = await addPatient(patientData);
    
    if (success) {
      toast.success('Patient added successfully');
      return true;
    } else {
      toast.error('Failed to add patient');
      return false;
    }
  };
  
  const handleDeletePatient = async (patientId: number) => {
    const success = await deletePatient(patientId);
      
    if (success) {
      toast.success('Patient deleted successfully');
    } else {
      toast.error('Failed to delete patient');
    }
  };
  
  return (
    <Layout>
      <div className="mb-8">
        <h1 className="text-2xl lg:text-3xl font-bold text-gray-800">Patient Management</h1>
        <p className="text-gray-500 mt-1">Add, view and manage patient records</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <AddPatientForm onAdd={handleAddPatient} />
        </div>
        
        <div className="lg:col-span-2">
          {loading ? (
            <div className="text-center py-12">
              <div className="text-lg">Loading patients...</div>
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <div className="text-lg text-red-500">Error: {error}</div>
              <button 
                onClick={fetchPatients}
                className="mt-4 px-4 py-2 bg-medical-blue text-white rounded-md"
              >
                Try Again
              </button>
            </div>
          ) : (
            <PatientList patients={patients} onDelete={handleDeletePatient} />
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Patients;
