
import React from 'react';
import { Appointment } from '../../types';
import { Trash2 } from 'lucide-react';

interface AppointmentListProps {
  appointments: Appointment[];
  onDelete: (id: number) => void;
}

const AppointmentList: React.FC<AppointmentListProps> = ({ appointments, onDelete }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="data-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Date & Time</th>
              <th>Patient</th>
              <th>Doctor</th>
              <th>Reason</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((appointment) => (
              <tr key={appointment.appointment_id}>
                <td>{appointment.appointment_id}</td>
                <td className="font-medium">
                  {new Date(appointment.appointment_date).toLocaleString()}
                </td>
                <td>{appointment.patientName}</td>
                <td>{appointment.doctorName}</td>
                <td>{appointment.reason}</td>
                <td>
                  <button
                    onClick={() => appointment.appointment_id && onDelete(appointment.appointment_id)}
                    className="p-1 text-red-600 hover:text-red-800 transition-colors"
                    aria-label="Delete appointment"
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

export default AppointmentList;
