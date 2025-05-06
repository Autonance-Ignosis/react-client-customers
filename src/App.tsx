import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/layout/ThemeProvider";
import { useEffect } from "react";
import axios from "axios";

// Layouts
import { MainLayout } from "@/components/layout/MainLayout";

// Pages
import AuthPage from "@/pages/AuthPage";
import HomePage from "@/pages/HomePage";
import Dashboard from "@/pages/Dashboard";
import LoanApplication from "@/pages/LoanApplication";
import KycUpload from "@/pages/KycUpload";
import MandateSetup from "@/pages/MandateSetup";
import NotificationsPage from "@/pages/NotificationsPage";
import Settings from "@/pages/Settings";
import NotFound from "@/pages/NotFound";
import { useDispatch, useSelector } from "react-redux";
import LoanOffers from "./pages/LoanOffers";
import LoanApplicationsPage from "./pages/LoanApplications";

const queryClient = new QueryClient();

// Protected route components
const RequireAuth = ({ children }) => {
  const { user } = useSelector((state: any) => state.user) || {};

  console.log("User in RequireAuth:", user);

  if (!user) {
    // Redirect to login if user is not authenticated
    return <Navigate to="/" replace />;
  }

  return children;
};

const RequireKyc = ({ children }) => {
  const { user } = useSelector((state: any) => state.user) || {};

  console.log("User in RequireKyc:", user);
  const isKycVerified = user?.kycStatus == "VERIFIED" || false;

  if (!user) {
    // Redirect to login if user is not authenticated
    return <Navigate to="/" replace />;
  }

  if (!isKycVerified) {
    // Redirect to KYC page if KYC is not verified
    return <Navigate to="/kyc" replace />;
  }

  return children;
};

const App = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state: any) => state.user) || {};

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    try {
      const { data } = await axios.get("http://localhost:8080/api/user/me", {
        withCredentials: true,
        headers: {
          Accept: "application/json",
        },
      });

      if (data) {
        dispatch({ type: "SET_USER", payload: data });
      }
    } catch (error) {
      console.error(error);
      dispatch({ type: "SET_USER", payload: null });
    }
  };

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="system">
        <TooltipProvider>
          <Toaster />
          <Sonner position="top-right" />
          <BrowserRouter>
            <Routes>
              {/* Public Routes */}
              <Route path="/login" element={
                user ? <Navigate to="/" replace /> : <AuthPage />
              } />

              {/* Main Layout Routes */}
              <Route path="/" element={<MainLayout />}>
                {/* Home is accessible to all */}
                <Route index element={<HomePage />} />

                {/* KYC Upload - Only for authenticated users who need to complete KYC */}
                <Route path="/kyc" element={
                  <RequireAuth>
                    <KycUpload />
                  </RequireAuth>
                } />

                {/* Routes requiring both authentication and KYC verification */}
                <Route path="/dashboard" element={
                  <RequireKyc>
                    <Dashboard />
                  </RequireKyc>
                } />

                <Route path="/loans" element={
                  <RequireKyc>
                    <LoanOffers />
                  </RequireKyc>
                } />

                <Route path="/loans/apply/:loanId" element={
                  <RequireKyc>
                    <LoanApplication />
                  </RequireKyc>
                } />

                <Route path="/loans/applications" element={
                  <RequireKyc>
                    <LoanApplicationsPage />

                  </RequireKyc>
                } />

                <Route path="/mandate" element={
                  <RequireKyc>
                    <MandateSetup />
                  </RequireKyc>
                } />

                <Route path="/notifications" element={
                  <RequireKyc>
                    <NotificationsPage />
                  </RequireKyc>
                } />

                <Route path="/settings" element={
                  <RequireKyc>
                    <Settings />
                  </RequireKyc>
                } />
              </Route>

              {/* Catch-all route */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;