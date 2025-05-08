
import React, { useEffect, useState } from 'react';
import { useBillings, usePatients } from '../services/api';
import Layout from '../components/Layout';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '../components/ui/alert-dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/table';
import { toast } from "@/components/ui/sonner";
import { Trash2 } from 'lucide-react';

const Billing: React.FC = () => {
  const { billings, loading, error, fetchBillings, deleteBilling } = useBillings();
  const { patients } = usePatients();
  const [deleteId, setDeleteId] = useState<number | null>(null);
  
  useEffect(() => {
    fetchBillings();
  }, []);
  
  const handleDeleteBilling = async () => {
    if (deleteId === null) return;
    
    const success = await deleteBilling(deleteId);
    
    if (success) {
      toast.success('Billing record deleted successfully');
    } else {
      toast.error('Failed to delete billing record');
    }
    
    setDeleteId(null);
  };
  
  return (
    <Layout>
      <div className="mb-8">
        <h1 className="text-2xl lg:text-3xl font-bold text-gray-800">Billing Management</h1>
        <p className="text-gray-500 mt-1">View and manage patient billing records</p>
      </div>
      
      <div className="space-y-6">
        {loading ? (
          <div className="text-center py-12">
            <div className="text-lg">Loading billing records...</div>
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <div className="text-lg text-red-500">Error: {error}</div>
            <button 
              onClick={fetchBillings}
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
                  <TableHead>Amount</TableHead>
                  <TableHead>Payment Date</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {billings.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-6">
                      No billing records found
                    </TableCell>
                  </TableRow>
                ) : (
                  billings.map((billing) => (
                    <TableRow key={billing.billing_id}>
                      <TableCell>{billing.billing_id}</TableCell>
                      <TableCell>{billing.patientName}</TableCell>
                      <TableCell>${billing.amount}</TableCell>
                      <TableCell>
                        {new Date(billing.payment_date).toLocaleDateString()}
                      </TableCell>
                      <TableCell className="text-right">
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <button
                              onClick={() => setDeleteId(billing.billing_id)}
                              className="text-red-600 hover:text-red-800 p-1"
                            >
                              <Trash2 className="h-5 w-5" />
                            </button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Confirm Deletion</AlertDialogTitle>
                              <AlertDialogDescription>
                                Are you sure you want to delete this billing record? This action cannot be undone.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel onClick={() => setDeleteId(null)}>Cancel</AlertDialogCancel>
                              <AlertDialogAction onClick={handleDeleteBilling} className="bg-red-600 hover:bg-red-700">
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

export default Billing;
