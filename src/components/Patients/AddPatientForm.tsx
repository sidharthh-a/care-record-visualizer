
import React, { useState } from 'react';
import { Patient } from '../../types';

interface AddPatientFormProps {
  onAdd: (patient: Patient) => Promise<boolean>;
}

const AddPatientForm: React.FC<AddPatientFormProps> = ({ onAdd }) => {
  const [patient, setPatient] = useState<Patient>({
    name: '',
    date_of_birth: '',
    gender: 'Male',
    contact_details: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setPatient(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const success = await onAdd(patient);
    
    if (success) {
      setPatient({
        name: '',
        date_of_birth: '',
        gender: 'Male',
        contact_details: ''
      });
    }
    
    setIsSubmitting(false);
  };
  
  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
      <h2 className="text-xl font-semibold mb-6">Add New Patient</h2>
      
      <div className="form-group">
        <label htmlFor="name" className="text-sm font-medium text-gray-700">Full Name</label>
        <input
          id="name"
          name="name"
          type="text"
          value={patient.name}
          onChange={handleChange}
          className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-medical-blue focus:border-transparent"
          required
        />
      </div>
      
      <div className="form-group">
        <label htmlFor="date_of_birth" className="text-sm font-medium text-gray-700">Date of Birth</label>
        <input
          id="date_of_birth"
          name="date_of_birth"
          type="date"
          value={patient.date_of_birth}
          onChange={handleChange}
          className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-medical-blue focus:border-transparent"
          required
        />
      </div>
      
      <div className="form-group">
        <label htmlFor="gender" className="text-sm font-medium text-gray-700">Gender</label>
        <select
          id="gender"
          name="gender"
          value={patient.gender}
          onChange={handleChange}
          className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-medical-blue focus:border-transparent"
          required
        >
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>
      </div>
      
      <div className="form-group">
        <label htmlFor="contact_details" className="text-sm font-medium text-gray-700">Contact Details</label>
        <input
          id="contact_details"
          name="contact_details"
          type="text"
          value={patient.contact_details}
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
        {isSubmitting ? 'Adding...' : 'Add Patient'}
      </button>
    </form>
  );
};

export default AddPatientForm;
