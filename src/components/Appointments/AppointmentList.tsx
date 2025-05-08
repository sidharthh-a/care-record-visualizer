
import React from 'react';
import { Appointment } from '../../types';
import { Trash2 } from 'lucide-react';
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface AppointmentListProps {
  appointments: Appointment[];
  onDelete: (id: number) => void;
}

const AppointmentList: React.FC<AppointmentListProps> = ({ appointments, onDelete }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Date & Time</TableHead>
              <TableHead>Patient</TableHead>
              <TableHead>Doctor</TableHead>
              <TableHead>Reason</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {appointments.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-4 text-gray-500">
                  No appointments found
                </TableCell>
              </TableRow>
            ) : (
              appointments.map((appointment) => (
                <TableRow key={appointment.appointment_id}>
                  <TableCell>{appointment.appointment_id}</TableCell>
                  <TableCell className="font-medium">
                    {new Date(appointment.appointment_date).toLocaleString()}
                  </TableCell>
                  <TableCell>{appointment.patientName}</TableCell>
                  <TableCell>{appointment.doctorName}</TableCell>
                  <TableCell>{appointment.reason}</TableCell>
                  <TableCell>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <button
                          className="p-1 text-red-600 hover:text-red-800 transition-colors"
                          aria-label="Delete appointment"
                        >
                          <Trash2 size={18} />
                        </button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Delete Appointment</AlertDialogTitle>
                          <AlertDialogDescription>
                            Are you sure you want to delete this appointment? This action cannot be undone.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction 
                            onClick={() => appointment.appointment_id && onDelete(appointment.appointment_id)}
                            className="bg-red-600 hover:bg-red-700"
                          >
                            Delete
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default AppointmentList;
