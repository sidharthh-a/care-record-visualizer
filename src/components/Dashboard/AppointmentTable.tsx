
import React from 'react';
import { Appointment } from '../../types';

interface AppointmentTableProps {
  appointments: Appointment[];
}

const AppointmentTable: React.FC<AppointmentTableProps> = ({ appointments }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
      <div className="p-4 border-b border-gray-100">
        <h3 className="font-semibold text-lg">Upcoming Appointments</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="data-table">
          <thead>
            <tr>
              <th>Date & Time</th>
              <th>Patient</th>
              <th>Doctor</th>
              <th>Reason</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((appointment) => (
              <tr key={appointment.appointment_id}>
                <td className="font-medium">
                  {new Date(appointment.appointment_date).toLocaleString()}
                </td>
                <td>{appointment.patientName}</td>
                <td>{appointment.doctorName}</td>
                <td>{appointment.reason}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AppointmentTable;
