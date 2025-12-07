import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Vision from "./pages/Vision";
import Examples from "./pages/Examples";
import Changelog from "./pages/Changelog";
import NotFound from "./pages/NotFound";
import { ExternalRedirect } from "./components/ExternalRedirect";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/vision" element={<Vision />} />
          <Route path="/examples" element={<Examples />} />
          <Route path="/changelog" element={<Changelog />} />
          <Route path="/docs" element={<ExternalRedirect to="https://docs.lumos-lang.org" />} />
          <Route path="/github" element={<ExternalRedirect to="https://github.com/getlumos" />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
