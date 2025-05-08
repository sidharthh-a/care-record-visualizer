
import React, { useEffect } from 'react';
import { useDashboardStats } from '../services/api';
import Layout from '../components/Layout';
import StatCard from '../components/Dashboard/StatCard';
import PatientTable from '../components/Dashboard/PatientTable';
import AppointmentTable from '../components/Dashboard/AppointmentTable';
import { User, Users, Calendar, Clock } from 'lucide-react';
import { toast } from "@/components/ui/sonner";

const Dashboard: React.FC = () => {
  const { stats, loading, error, fetchStats } = useDashboardStats();
  
  useEffect(() => {
    fetchStats();
  }, []);
  
  useEffect(() => {
    if (error) {
      toast.error("Failed to load dashboard data", {
        description: error
      });
    }
  }, [error]);
  
  return (
    <Layout>
      <div className="mb-8">
        <h1 className="text-2xl lg:text-3xl font-bold text-gray-800">Dashboard</h1>
        <p className="text-gray-500 mt-1">Welcome to the Medical Records Dashboard</p>
      </div>
      
      {loading ? (
        <div className="text-center py-12">
          <div className="text-lg">Loading dashboard data...</div>
        </div>
      ) : error ? (
        <div className="text-center py-12">
          <div className="text-lg text-red-500">Error: {error}</div>
          <button 
            onClick={fetchStats}
            className="mt-4 px-4 py-2 bg-medical-blue text-white rounded-md"
          >
            Try Again
          </button>
        </div>
      ) : (
        <>
          {/* Stats cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatCard 
              title="Total Patients" 
              value={stats?.totalPatients || 0} 
              icon={<User size={20} className="text-white" />}
              color="bg-medical-blue"
            />
            <StatCard 
              title="Total Doctors" 
              value={stats?.totalDoctors || 0} 
              icon={<Users size={20} className="text-white" />}
              color="bg-medical-teal"
            />
            <StatCard 
              title="Total Appointments" 
              value={stats?.totalAppointments || 0} 
              icon={<Calendar size={20} className="text-white" />}
              color="bg-indigo-500"
            />
            <StatCard 
              title="Today's Appointments" 
              value={stats?.todayAppointments || 0} 
              icon={<Clock size={20} className="text-white" />}
              color="bg-amber-500"
            />
          </div>
          
          {/* Tables */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <PatientTable patients={stats?.recentPatients || []} />
            <AppointmentTable appointments={stats?.upcomingAppointments || []} />
          </div>
        </>
      )}
    </Layout>
  );
};

export default Dashboard;
