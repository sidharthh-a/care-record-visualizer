
import React from 'react';
import { Doctor } from '../../types';
import { Trash2 } from 'lucide-react';

interface DoctorListProps {
  doctors: Doctor[];
  onDelete: (id: number) => void;
}

const DoctorList: React.FC<DoctorListProps> = ({ doctors, onDelete }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="data-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Specialization</th>
              <th>Contact Details</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {doctors.map((doctor) => (
              <tr key={doctor.doctor_id}>
                <td>{doctor.doctor_id}</td>
                <td className="font-medium">{doctor.name}</td>
                <td>{doctor.specialization}</td>
                <td>{doctor.contact_details}</td>
                <td>
                  <button
                    onClick={() => doctor.doctor_id && onDelete(doctor.doctor_id)}
                    className="p-1 text-red-600 hover:text-red-800 transition-colors"
                    aria-label="Delete doctor"
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

export default DoctorList;
