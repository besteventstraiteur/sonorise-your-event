import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Index from "./pages/Index";
import Services from "./pages/Services";
import Location from "./pages/Location";
import Boutique from "./pages/Boutique";
import APropos from "./pages/APropos";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import Cart from "./pages/Cart";
import { CartProvider } from "./context/CartContext";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminCalendar from "./pages/admin/AdminCalendar";
import AdminCustomers from "./pages/admin/AdminCustomers";
import AdminOrders from "./pages/admin/AdminOrders";
import AdminInventory from "./pages/admin/AdminInventory";
import CustomerAccount from "./pages/customer/CustomerAccount";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import AdminRoute from "./components/auth/AdminRoute";
import ChatBubble from "./components/chat/ChatBubble";
import Login from "./pages/Login";
import Devis from "./pages/Devis";
import MentionsLegales from "./pages/MentionsLegales";
import PolitiqueConfidentialite from "./pages/PolitiqueConfidentialite";
import CGV from "./pages/CGV";
import SiteCustomizer from "./pages/admin/SiteCustomizer";
import Gallery from "./pages/Gallery";
import DJProfessionnel from "./pages/services/DJProfessionnel";
import AnimationEvenementielle from "./pages/services/AnimationEvenementielle";
import Artistes from "./pages/services/Artistes";
import Sonorisation from "./pages/services/Sonorisation";
import Catalogue from "./pages/Catalogue";
import FAQ from "./pages/FAQ";
import AdminBrochures from "./pages/admin/AdminBrochures";
import AdminSav from "./pages/admin/AdminSav";
import AdminOverview from "./pages/admin/AdminOverview";
import Avis from "./pages/Avis";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <CartProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Layout>
              <Routes>
                {/* Routes publiques */}
                <Route path="/" element={<Index />} />
                <Route path="/services" element={<Services />} />
                <Route path="/avis" element={<Avis />} />
                <Route path="/location" element={<Location />} />
                <Route path="/boutique" element={<Boutique />} />
                <Route path="/a-propos" element={<APropos />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/panier" element={<Cart />} />
                <Route path="/login" element={<Login />} />
                <Route path="/devis" element={<Devis />} />
                <Route path="/faq" element={<FAQ />} />
                
                <Route path="/services/dj" element={<DJProfessionnel />} />
                <Route path="/services/animation-evenementielle" element={<AnimationEvenementielle />} />
                <Route path="/services/artistes" element={<Artistes />} />
                <Route path="/services/sonorisation" element={<Sonorisation />} />
                
                <Route path="/mentions-legales" element={<MentionsLegales />} />
                <Route path="/politique-confidentialite" element={<PolitiqueConfidentialite />} />
                <Route path="/cgv" element={<CGV />} />
                
                {/* Routes client protégées */}
                <Route path="/mon-compte/*" element={
                  <ProtectedRoute>
                    <CustomerAccount />
                  </ProtectedRoute>
                } />
                
                {/* Routes admin protégées */}
                <Route path="/admin" element={
                  <AdminRoute>
                    <AdminDashboard />
                  </AdminRoute>
                }>
                  <Route index element={<AdminOverview />} />
                  <Route path="clients" element={<AdminCustomers />} />
                  <Route path="commandes" element={<AdminOrders />} />
                  <Route path="calendrier" element={<AdminCalendar />} />
                  <Route path="stock" element={<AdminInventory />} />
                  <Route path="sav" element={<AdminSav />} />
                  <Route path="brochures" element={<AdminBrochures />} />
                </Route>
                
                {/* Route séparée pour le customizer qui a une mise en page différente */}
                <Route path="/admin/customizer" element={
                  <AdminRoute>
                    <SiteCustomizer />
                  </AdminRoute>
                } />
                
                <Route path="/catalogue" element={<Catalogue />} />
                <Route path="/galerie" element={<Gallery />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Layout>
          </BrowserRouter>
        </TooltipProvider>
      </CartProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
