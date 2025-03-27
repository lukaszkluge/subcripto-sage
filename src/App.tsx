
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import { useEffect } from "react";

const queryClient = new QueryClient();

const App = () => {
  // Check for upcoming renewals on app startup
  useEffect(() => {
    // Check if there are any notifications to display on startup
    const subscriptions = localStorage.getItem('subscriptions');
    if (subscriptions) {
      try {
        const parsedSubscriptions = JSON.parse(subscriptions).map((sub: any) => ({
          ...sub,
          nextBillingDate: new Date(sub.nextBillingDate),
          startDate: new Date(sub.startDate)
        }));
        
        const today = new Date();
        parsedSubscriptions.forEach((sub: any) => {
          const daysUntilRenewal = Math.ceil(
            (new Date(sub.nextBillingDate).getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
          );
          
          if (daysUntilRenewal <= sub.notifyDaysBefore) {
            console.log(`${sub.name} will renew in ${daysUntilRenewal} days`);
          }
        });
      } catch (error) {
        console.error('Error checking subscriptions on startup:', error);
      }
    }
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/add" element={<Dashboard />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
