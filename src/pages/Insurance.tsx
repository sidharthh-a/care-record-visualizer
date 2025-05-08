
import React, { useEffect, useState } from 'react';
import { useInsurances } from '../services/api';
import Layout from '../components/Layout';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '../components/ui/alert-dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/table';
import { toast } from "@/components/ui/sonner";
import { Trash2 } from 'lucide-react';

const Insurance: React.FC = () => {
  const { insurances, loading, error, fetchInsurances, deleteInsurance } = useInsurances();
  const [deleteId, setDeleteId] = useState<number | null>(null);
  
  useEffect(() => {
    fetchInsurances();
  }, []);
  
  const handleDeleteInsurance = async () => {
    if (deleteId === null) return;
    
    const success = await deleteInsurance(deleteId);
    
    if (success) {
      toast.success('Insurance record deleted successfully');
    } else {
      toast.error('Failed to delete insurance record');
    }
    
    setDeleteId(null);
  };
  
  return (
    <Layout>
      <div className="mb-8">
        <h1 className="text-2xl lg:text-3xl font-bold text-gray-800">Insurance Management</h1>
        <p className="text-gray-500 mt-1">View and manage patient insurance policies</p>
      </div>
      
      <div className="space-y-6">
        {loading ? (
          <div className="text-center py-12">
            <div className="text-lg">Loading insurance records...</div>
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <div className="text-lg text-red-500">Error: {error}</div>
            <button 
              onClick={fetchInsurances}
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
                  <TableHead>Provider</TableHead>
                  <TableHead>Policy Number</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {insurances.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-6">
                      No insurance records found
                    </TableCell>
                  </TableRow>
                ) : (
                  insurances.map((insurance) => (
                    <TableRow key={insurance.insurance_id}>
                      <TableCell>{insurance.insurance_id}</TableCell>
                      <TableCell>{insurance.patientName}</TableCell>
                      <TableCell>{insurance.provider_name}</TableCell>
                      <TableCell>{insurance.policy_number}</TableCell>
                      <TableCell className="text-right">
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <button
                              onClick={() => setDeleteId(insurance.insurance_id)}
                              className="text-red-600 hover:text-red-800 p-1"
                            >
                              <Trash2 className="h-5 w-5" />
                            </button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Confirm Deletion</AlertDialogTitle>
                              <AlertDialogDescription>
                                Are you sure you want to delete this insurance record? This action cannot be undone.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel onClick={() => setDeleteId(null)}>Cancel</AlertDialogCancel>
                              <AlertDialogAction onClick={handleDeleteInsurance} className="bg-red-600 hover:bg-red-700">
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

export default Insurance;
