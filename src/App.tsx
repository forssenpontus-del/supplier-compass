import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { WeightsProvider } from "@/lib/weights-context";
import AppLayout from "./layouts/AppLayout";
import Landing from "./pages/Landing";
import Quiz from "./pages/Quiz";
import Overview from "./pages/Overview";
import VendorDetail from "./pages/VendorDetail";
import Weights from "./pages/Weights";
import Methodology from "./pages/Methodology";
import About from "./pages/About";
import NotFound from "./pages/NotFound.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <WeightsProvider>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/quiz" element={<Quiz />} />
            <Route element={<AppLayout />}>
              <Route path="/dashboard" element={<Overview />} />
              <Route path="/vendor/:id" element={<VendorDetail />} />
              <Route path="/weights" element={<Weights />} />
              <Route path="/methodology" element={<Methodology />} />
              <Route path="/about" element={<About />} />
            </Route>
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </WeightsProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
