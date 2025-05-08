
import React from 'react';
import { Patient } from '../../types';
import { Trash2 } from 'lucide-react';

interface PatientListProps {
  patients: Patient[];
  onDelete: (id: number) => void;
}

const PatientList: React.FC<PatientListProps> = ({ patients, onDelete }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="data-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Date of Birth</th>
              <th>Gender</th>
              <th>Contact Details</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {patients.map((patient) => (
              <tr key={patient.patient_id}>
                <td>{patient.patient_id}</td>
                <td className="font-medium">{patient.name}</td>
                <td>{new Date(patient.date_of_birth).toLocaleDateString()}</td>
                <td>{patient.gender}</td>
                <td>{patient.contact_details}</td>
                <td>
                  <button
                    onClick={() => patient.patient_id && onDelete(patient.patient_id)}
                    className="p-1 text-red-600 hover:text-red-800 transition-colors"
                    aria-label="Delete patient"
                  >
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PatientList;
