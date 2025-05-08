
import React, { useState, useEffect } from 'react';
import { Appointment, Patient, Doctor } from '../../types';

interface AddAppointmentFormProps {
  onAdd: (appointment: Appointment) => Promise<boolean>;
  patients: Patient[];
  doctors: Doctor[];
}

const AddAppointmentForm: React.FC<AddAppointmentFormProps> = ({ onAdd, patients, doctors }) => {
  const [appointment, setAppointment] = useState<Appointment>({
    patient_id: 0,
    doctor_id: 0,
    appointment_date: '',
    reason: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  useEffect(() => {
    if (patients.length > 0 && appointment.patient_id === 0) {
      setAppointment(prev => ({ ...prev, patient_id: patients[0].patient_id || 0 }));
    }
    if (doctors.length > 0 && appointment.doctor_id === 0) {
      setAppointment(prev => ({ ...prev, doctor_id: doctors[0].doctor_id || 0 }));
    }
  }, [patients, doctors, appointment.patient_id, appointment.doctor_id]);
  
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setAppointment(prev => ({ 
      ...prev, 
      [name]: name === 'patient_id' || name === 'doctor_id' ? parseInt(value) : value 
    }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const success = await onAdd(appointment);
    
    if (success) {
      setAppointment({
        patient_id: patients[0]?.patient_id || 0,
        doctor_id: doctors[0]?.doctor_id || 0,
        appointment_date: '',
        reason: ''
      });
    }
    
    setIsSubmitting(false);
  };
  
  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
      <h2 className="text-xl font-semibold mb-6">Add New Appointment</h2>
      
      <div className="form-group">
        <label htmlFor="patient_id" className="text-sm font-medium text-gray-700">Patient</label>
        <select
          id="patient_id"
          name="patient_id"
          value={appointment.patient_id}
          onChange={handleChange}
          className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-medical-blue focus:border-transparent"
          required
        >
          <option value="">Select a patient</option>
          {patients.map(patient => (
            <option key={patient.patient_id} value={patient.patient_id}>
              {patient.name}
            </option>
          ))}
        </select>
      </div>
      
      <div className="form-group">
        <label htmlFor="doctor_id" className="text-sm font-medium text-gray-700">Doctor</label>
        <select
          id="doctor_id"
          name="doctor_id"
          value={appointment.doctor_id}
          onChange={handleChange}
          className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-medical-blue focus:border-transparent"
          required
        >
          <option value="">Select a doctor</option>
          {doctors.map(doctor => (
            <option key={doctor.doctor_id} value={doctor.doctor_id}>
              {doctor.name} - {doctor.specialization}
            </option>
          ))}
        </select>
      </div>
      
      <div className="form-group">
        <label htmlFor="appointment_date" className="text-sm font-medium text-gray-700">Date & Time</label>
        <input
          id="appointment_date"
          name="appointment_date"
          type="datetime-local"
          value={appointment.appointment_date}
          onChange={handleChange}
          className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-medical-blue focus:border-transparent"
          required
        />
      </div>
      
      <div className="form-group">
        <label htmlFor="reason" className="text-sm font-medium text-gray-700">Reason</label>
        <textarea
          id="reason"
          name="reason"
          value={appointment.reason}
          onChange={handleChange}
          rows={3}
          className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-medical-blue focus:border-transparent"
          required
        />
      </div>
      
      <button
        type="submit"
        disabled={isSubmitting}
        className="mt-4 px-4 py-2 bg-medical-blue text-white rounded-md hover:bg-medical-blue/80 focus:outline-none focus:ring-2 focus:ring-medical-blue focus:ring-offset-2 disabled:opacity-50"
      >
        {isSubmitting ? 'Adding...' : 'Add Appointment'}
      </button>
    </form>
  );
};

export default AddAppointmentForm;
