
import React, { useState } from 'react';
import { Doctor } from '../../types';

interface AddDoctorFormProps {
  onAdd: (doctor: Doctor) => Promise<boolean>;
}

const AddDoctorForm: React.FC<AddDoctorFormProps> = ({ onAdd }) => {
  const [doctor, setDoctor] = useState<Doctor>({
    name: '',
    specialization: '',
    contact_details: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setDoctor(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const success = await onAdd(doctor);
    
    if (success) {
      setDoctor({
        name: '',
        specialization: '',
        contact_details: ''
      });
    }
    
    setIsSubmitting(false);
  };
  
  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
      <h2 className="text-xl font-semibold mb-6">Add New Doctor</h2>
      
      <div className="form-group">
        <label htmlFor="name" className="text-sm font-medium text-gray-700">Full Name</label>
        <input
          id="name"
          name="name"
          type="text"
          value={doctor.name}
          onChange={handleChange}
          className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-medical-blue focus:border-transparent"
          required
        />
      </div>
      
      <div className="form-group">
        <label htmlFor="specialization" className="text-sm font-medium text-gray-700">Specialization</label>
        <input
          id="specialization"
          name="specialization"
          type="text"
          value={doctor.specialization}
          onChange={handleChange}
          className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-medical-blue focus:border-transparent"
          required
        />
      </div>
      
      <div className="form-group">
        <label htmlFor="contact_details" className="text-sm font-medium text-gray-700">Contact Details</label>
        <input
          id="contact_details"
          name="contact_details"
          type="text"
          value={doctor.contact_details}
          onChange={handleChange}
          className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-medical-blue focus:border-transparent"
          placeholder="Email | Phone"
          required
        />
      </div>
      
      <button
        type="submit"
        disabled={isSubmitting}
        className="mt-4 px-4 py-2 bg-medical-blue text-white rounded-md hover:bg-medical-blue/80 focus:outline-none focus:ring-2 focus:ring-medical-blue focus:ring-offset-2 disabled:opacity-50"
      >
        {isSubmitting ? 'Adding...' : 'Add Doctor'}
      </button>
    </form>
  );
};

export default AddDoctorForm;
