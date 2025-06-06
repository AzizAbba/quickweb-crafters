
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/context/AuthContext";
import { DataProvider } from "@/context/DataContext";

// Pages
import Index from "./pages/Index";
import ServicePage from "./pages/ServicePage";
import PricingPage from "./pages/PricingPage";
import ContactPage from "./pages/ContactPage";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";
import AdminDashboard from "./pages/AdminDashboard";
import NotFound from "./pages/NotFound";
import OrderPage from "./pages/OrderPage";
import AboutUsPage from "./pages/AboutUsPage";
import PrivacyPolicyPage from "./pages/PrivacyPolicyPage";
import TermsOfServicePage from "./pages/TermsOfServicePage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

const App = () => {
  // Get the base URL from the data attribute set in main.tsx
  const baseUrl = document.documentElement.getAttribute('data-base-url') || '/';
  
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter basename={baseUrl}>
        <TooltipProvider>
          <AuthProvider>
            <DataProvider>
              <Toaster />
              <Sonner />
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/services" element={<ServicePage />} />
                <Route path="/pricing" element={<PricingPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/signin" element={<SignInPage />} />
                <Route path="/signup" element={<SignUpPage />} />
                <Route path="/forgot-password" element={<ForgotPasswordPage />} />
                <Route path="/admin/*" element={<AdminDashboard />} />
                <Route path="/order" element={<OrderPage />} />
                <Route path="/order/:type" element={<OrderPage />} />
                <Route path="/about" element={<AboutUsPage />} />
                <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
                <Route path="/terms-of-service" element={<TermsOfServicePage />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </DataProvider>
          </AuthProvider>
        </TooltipProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default App;
