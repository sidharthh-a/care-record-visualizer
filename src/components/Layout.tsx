
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Home, 
  User, 
  Users, 
  Calendar, 
  CreditCard, 
  FileText, 
  Shield, 
  Pill, 
  ClipboardList, 
  Menu, 
  X
} from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  
  const navigationItems = [
    { name: 'Dashboard', path: '/', icon: Home },
    { name: 'Patients', path: '/patients', icon: User },
    { name: 'Doctors', path: '/doctors', icon: Users },
    { name: 'Appointments', path: '/appointments', icon: Calendar },
    { name: 'Billing', path: '/billing', icon: CreditCard },
    { name: 'Medical History', path: '/medical-history', icon: FileText },
    { name: 'Insurance', path: '/insurance', icon: Shield },
    { name: 'Medications', path: '/medications', icon: Pill },
    { name: 'Diagnostic Tests', path: '/diagnostic-tests', icon: ClipboardList },
  ];
  
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Mobile menu button */}
      <div className="fixed top-4 left-4 z-40 lg:hidden">
        <button 
          onClick={toggleSidebar}
          className="p-2 bg-white rounded-md shadow-sm border border-gray-200"
        >
          {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>
      
      {/* Sidebar */}
      <aside 
        className={`fixed inset-y-0 left-0 z-30 w-64 bg-white shadow-md transform transition-transform lg:translate-x-0 lg:static lg:inset-auto lg:h-screen ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="h-full flex flex-col">
          {/* App logo and title */}
          <div className="flex items-center justify-center py-6 border-b">
            <div className="h-8 w-8 rounded-md bg-medical-blue flex items-center justify-center">
              <FileText size={18} className="text-white" />
            </div>
            <span className="ml-3 text-xl font-semibold text-gray-800">MedRecord</span>
          </div>
          
          {/* Navigation links */}
          <nav className="flex-1 py-4 px-3">
            <ul className="space-y-1">
              {navigationItems.map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className={`sidebar-link ${
                      location.pathname === item.path ? 'active' : ''
                    }`}
                    onClick={() => setSidebarOpen(false)}
                  >
                    <item.icon size={18} />
                    <span>{item.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          
          {/* Footer */}
          <div className="p-4 border-t text-xs text-gray-500">
            <p>© 2023 MedRecord System</p>
          </div>
        </div>
      </aside>
      
      {/* Main content */}
      <div className="flex-1">
        <div className="p-6 lg:p-8">
          {children}
        </div>
      </div>
      
      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default Layout;
