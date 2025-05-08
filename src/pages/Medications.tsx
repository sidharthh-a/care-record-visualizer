
import React, { useEffect, useState } from 'react';
import { useMedications } from '../services/api';
import Layout from '../components/Layout';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '../components/ui/alert-dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/table';
import { toast } from "@/components/ui/sonner";
import { Trash2 } from 'lucide-react';

const Medications: React.FC = () => {
  const { medications, loading, error, fetchMedications, deleteMedication } = useMedications();
  const [deleteId, setDeleteId] = useState<number | null>(null);
  
  useEffect(() => {
    fetchMedications();
  }, []);
  
  const handleDeleteMedication = async () => {
    if (deleteId === null) return;
    
    const success = await deleteMedication(deleteId);
    
    if (success) {
      toast.success('Medication deleted successfully');
    } else {
      toast.error('Failed to delete medication');
    }
    
    setDeleteId(null);
  };
  
  return (
    <Layout>
      <div className="mb-8">
        <h1 className="text-2xl lg:text-3xl font-bold text-gray-800">Medications</h1>
        <p className="text-gray-500 mt-1">View and manage patient medications</p>
      </div>
      
      <div className="space-y-6">
        {loading ? (
          <div className="text-center py-12">
            <div className="text-lg">Loading medications...</div>
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <div className="text-lg text-red-500">Error: {error}</div>
            <button 
              onClick={fetchMedications}
              className="mt-4 px-4 py-2 bg-medical-blue text-white rounded-md"
            >
              Try Again
            </button>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Patient</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Dosage</TableHead>
                  <TableHead>Frequency</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {medications.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-6">
                      No medications found
                    </TableCell>
                  </TableRow>
                ) : (
                  medications.map((medication) => (
                    <TableRow key={medication.medication_id}>
                      <TableCell>{medication.medication_id}</TableCell>
                      <TableCell>{medication.patientName}</TableCell>
                      <TableCell>{medication.name}</TableCell>
                      <TableCell>{medication.dosage}</TableCell>
                      <TableCell>{medication.frequency}</TableCell>
                      <TableCell className="text-right">
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <button
                              onClick={() => setDeleteId(medication.medication_id)}
                              className="text-red-600 hover:text-red-800 p-1"
                            >
                              <Trash2 className="h-5 w-5" />
                            </button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Confirm Deletion</AlertDialogTitle>
                              <AlertDialogDescription>
                                Are you sure you want to delete this medication? This action cannot be undone.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel onClick={() => setDeleteId(null)}>Cancel</AlertDialogCancel>
                              <AlertDialogAction onClick={handleDeleteMedication} className="bg-red-600 hover:bg-red-700">
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
        )}
      </div>
    </Layout>
  );
};

export default Medications;
