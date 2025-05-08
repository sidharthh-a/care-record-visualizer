
import React, { useEffect } from 'react';
import { useDoctors } from '../services/api';
import Layout from '../components/Layout';
import AddDoctorForm from '../components/Doctors/AddDoctorForm';
import DoctorList from '../components/Doctors/DoctorList';
import { toast } from "@/components/ui/sonner";

const Doctors: React.FC = () => {
  const { doctors, loading, error, fetchDoctors, addDoctor, deleteDoctor } = useDoctors();
  
  useEffect(() => {
    fetchDoctors();
  }, []);
  
  const handleAddDoctor = async (doctorData: any) => {
    const success = await addDoctor(doctorData);
    
    if (success) {
      toast.success('Doctor added successfully');
      return true;
    } else {
      toast.error('Failed to add doctor');
      return false;
    }
  };
  
  const handleDeleteDoctor = async (doctorId: number) => {
    const success = await deleteDoctor(doctorId);
      
    if (success) {
      toast.success('Doctor deleted successfully');
    } else {
      toast.error('Failed to delete doctor');
    }
  };
  
  return (
    <Layout>
      <div className="mb-8">
        <h1 className="text-2xl lg:text-3xl font-bold text-gray-800">Doctor Management</h1>
        <p className="text-gray-500 mt-1">Add, view and manage doctor records</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <AddDoctorForm onAdd={handleAddDoctor} />
        </div>
        
        <div className="lg:col-span-2">
          {loading ? (
            <div className="text-center py-12">
              <div className="text-lg">Loading doctors...</div>
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <div className="text-lg text-red-500">Error: {error}</div>
              <button 
                onClick={fetchDoctors}
                className="mt-4 px-4 py-2 bg-medical-blue text-white rounded-md"
              >
                Try Again
              </button>
            </div>
          ) : (
            <DoctorList doctors={doctors} onDelete={handleDeleteDoctor} />
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Doctors;
