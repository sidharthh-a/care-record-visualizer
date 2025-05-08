
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import Patients from "./pages/Patients";
import Doctors from "./pages/Doctors";
import Appointments from "./pages/Appointments";
import PlaceholderPage from "./pages/PlaceholderPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/patients" element={<Patients />} />
          <Route path="/doctors" element={<Doctors />} />
          <Route path="/appointments" element={<Appointments />} />
          <Route path="/billing" element={
            <PlaceholderPage 
              title="Billing Management" 
              description="Manage patient billing records and payments" 
            />
          } />
          <Route path="/medical-history" element={
            <PlaceholderPage 
              title="Medical History" 
              description="View and manage patients' medical history" 
            />
          } />
          <Route path="/insurance" element={
            <PlaceholderPage 
              title="Insurance Management" 
              description="Manage patient insurance policies and claims" 
            />
          } />
          <Route path="/medications" element={
            <PlaceholderPage 
              title="Medications" 
              description="Manage patient medications and prescriptions" 
            />
          } />
          <Route path="/diagnostic-tests" element={
            <PlaceholderPage 
              title="Diagnostic Tests" 
              description="Track and manage patient diagnostic tests and results" 
            />
          } />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
