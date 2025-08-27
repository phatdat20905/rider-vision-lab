import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppLayout } from "@/components/layout/app-layout";
import Welcome from "./pages/Welcome";
import Dashboard from "./pages/Dashboard";
import Camera from "./pages/Camera";
import VideoUpload from "./pages/VideoUpload";
import Profile from "./pages/Profile";
import Vehicles from "./pages/Vehicles";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminUsers from "./pages/admin/AdminUsers";  
import AdminMonitor from "./pages/admin/AdminMonitor";
import AdminSettings from "./pages/admin/AdminSettings";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/welcome" element={<Welcome />} />
          <Route path="/" element={
            <AppLayout>
              <Dashboard />
            </AppLayout>
          } />
          <Route path="/camera" element={
            <AppLayout>
              <Camera />
            </AppLayout>
          } />
          <Route path="/video" element={
            <AppLayout>
              <VideoUpload />
            </AppLayout>
          } />
          <Route path="/profile" element={
            <AppLayout>
              <Profile />
            </AppLayout>
          } />
          <Route path="/vehicles" element={
            <AppLayout>
              <Vehicles />
            </AppLayout>
          } />
          <Route path="/admin" element={
            <AppLayout>
              <AdminDashboard />
            </AppLayout>
          } />
          <Route path="/admin/users" element={
            <AppLayout>
              <AdminUsers />
            </AppLayout>
          } />
          <Route path="/admin/monitor" element={
            <AppLayout>
              <AdminMonitor />
            </AppLayout>
          } />
          <Route path="/admin/settings" element={
            <AppLayout>
              <AdminSettings />
            </AppLayout>
          } />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
