import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner, toast } from "@/components/ui/sonner";
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
import MandateApplication from "./pages/MandateApplication";
import LandingPage from "./pages/LandingPage";

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
  const userId = user?.id;

  useEffect(() => {

    loadUser();
  }, []);

  useEffect(() => {
    const socket = new WebSocket(`ws://localhost:8088/ws/notifications?userId=${userId}`);

    socket.onmessage = (event) => {
      const message = event.data;
      console.log("Received message:", message);
      toast.success(message);
    };

    return () => socket.close();
  }, [userId]);



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
  <Route
    path="/login"
    element={user ? <Navigate to="/home" replace /> : <AuthPage />}
  />

  <Route path="/" element={<LandingPage />} />

  {/* Main Layout Routes */}
  <Route path="/" element={<MainLayout />}>
    {/* HomePage moved to /home */}
    <Route path="home" element={<HomePage />} />

    <Route
      path="kyc"
      element={
        <RequireAuth>
          <KycUpload />
        </RequireAuth>
      }
    />

    <Route
      path="dashboard"
      element={
        <RequireKyc>
          <Dashboard />
        </RequireKyc>
      }
    />

    <Route
      path="loans"
      element={
        <RequireKyc>
          <LoanOffers />
        </RequireKyc>
      }
    />

    <Route
      path="loans/apply/:loanId"
      element={
        <RequireKyc>
          <LoanApplication />
        </RequireKyc>
      }
    />

    <Route
      path="loans/applications"
      element={
        <RequireKyc>
          <LoanApplicationsPage />
        </RequireKyc>
      }
    />

    <Route
      path="mandate/:id"
      element={
        <RequireKyc>
          <MandateSetup />
        </RequireKyc>
      }
    />

    <Route
      path="mandate/apply/:bankId/:loanId"
      element={
        <RequireKyc>
          <MandateApplication />
        </RequireKyc>
      }
    />

    <Route
      path="notifications"
      element={
        <RequireKyc>
          <NotificationsPage />
        </RequireKyc>
      }
    />

    <Route
      path="settings"
      element={
        <RequireKyc>
          <Settings />
        </RequireKyc>
      }
    />
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