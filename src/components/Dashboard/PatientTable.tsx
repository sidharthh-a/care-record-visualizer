
import React from 'react';
import { Patient } from '../../types';

interface PatientTableProps {
  patients: Patient[];
}

const PatientTable: React.FC<PatientTableProps> = ({ patients }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
      <div className="p-4 border-b border-gray-100">
        <h3 className="font-semibold text-lg">Recent Patients</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="data-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Gender</th>
              <th>Date of Birth</th>
              <th>Contact</th>
            </tr>
          </thead>
          <tbody>
            {patients.map((patient) => (
              <tr key={patient.patient_id}>
                <td className="font-medium">{patient.name}</td>
                <td>{patient.gender}</td>
                <td>{new Date(patient.date_of_birth).toLocaleDateString()}</td>
                <td>{patient.contact_details}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PatientTable;
