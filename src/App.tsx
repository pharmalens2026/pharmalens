import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate, Navigate } from "react-router-dom";
import { Toaster } from "sonner";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { HomeScreen } from "@/components/home/HomeScreen";
import { SearchResultsScreen } from "@/components/search/SearchResultsScreen";
import { MedicineDetailScreen } from "@/components/medicine/MedicineDetailScreen";
import { PharmacyLogin } from "@/components/pharmacy/PharmacyLogin";
import { PharmacySignUp } from "@/components/pharmacy/signup/PharmacySignUp";
import { PharmacyDashboard } from "@/components/pharmacy/PharmacyDashboard";
import { AdminDashboard } from "@/components/admin/AdminDashboard";
import { InventoryManager } from "@/components/pharmacy/InventoryManager";
import { PharmacyProfileEdit } from "@/components/pharmacy/PharmacyProfileEdit";
import { WholesalerSignUp } from "@/components/wholesaler/signup/WholesalerSignUp";
import { WholesalerDashboard } from "@/components/wholesaler/WholesalerDashboard";
import { WholesalerInventory } from "@/components/wholesaler/WholesalerInventory";
import { WholesalerLeads } from "@/components/wholesaler/WholesalerLeads";
import { HowItWorks } from "@/components/info/HowItWorks";
import { ForPharmacies } from "@/components/info/ForPharmacies";
import { PrivacyPolicy } from "@/components/info/PrivacyPolicy";
import { FAQ } from "@/components/info/FAQ";
import { TermsAndConditions } from "@/components/info/TermsAndConditions";

// Export UserRole type for other components
export type UserRole = "pharmacy" | "admin" | "wholesaler" | null;

function AppContent() {
  const navigate = useNavigate();
  const [userRole, setUserRole] = useState<UserRole>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedMedicineId, setSelectedMedicineId] = useState<string | null>(null);

  // Load Google Maps Script
  useEffect(() => {
    if (typeof window.google === 'undefined') {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places`;
      script.async = true;
      script.defer = true;
      document.head.appendChild(script);
    }
  }, []);

  const handleLoginSuccess = (role: UserRole) => {
    setUserRole(role);
    if (role === "admin") {
      navigate("/admin/dashboard");
    } else if (role === "wholesaler") {
      navigate("/wholesaler/dashboard");
    } else {
      navigate("/pharmacy/dashboard");
    }
  };

  const handleLogout = () => {
    setUserRole(null);
    navigate("/");
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    navigate("/search");
  };

  const handleSelectMedicine = (medicine: any) => {
    setSelectedMedicineId(medicine.id);
    navigate(`/medicine/${medicine.id}`);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Header 
        userRole={userRole}
        onLogoClick={() => navigate("/")}
        onLoginClick={() => navigate("/pharmacy/login")}
        onSignUpClick={() => navigate("/pharmacy/signup")}
        onDashboardClick={() => {
          if (userRole === "admin") navigate("/admin/dashboard");
          else if (userRole === "wholesaler") navigate("/wholesaler/dashboard");
          else if (userRole === "pharmacy") navigate("/pharmacy/dashboard");
        }}
      />
      
      <main className="flex-1 pt-20">
        <Routes>
          <Route path="/" element={
            <HomeScreen 
              onSearch={handleSearch}
              onSelectMedicine={handleSelectMedicine}
              onPharmacyAction={() => navigate("/pharmacy/signup")}
            />
          } />
          <Route path="/search" element={
            <SearchResultsScreen 
              query={searchQuery}
              onBack={() => navigate(-1)}
              onSelectPharmacy={(p) => navigate(`/pharmacy/${p.id}`)}
            />
          } />
          <Route path="/medicine/:id" element={
            <MedicineDetailScreen 
              medicineId={selectedMedicineId || "1"} 
              onBack={() => navigate(-1)}
            />
          } />
          <Route path="/pharmacy/login" element={
            <PharmacyLogin 
              onLoginSuccess={(role) => handleLoginSuccess(role as UserRole)}
              onSignUpClick={() => navigate("/pharmacy/signup")}
            />
          } />
          <Route path="/pharmacy/signup" element={
            <PharmacySignUp 
              onSignUpComplete={() => {
                setUserRole("pharmacy");
                navigate("/pharmacy/dashboard");
              }}
              onBackToLogin={() => navigate("/pharmacy/login")}
            />
          } />
          <Route path="/wholesaler/signup" element={
            <WholesalerSignUp 
              onSignUpComplete={() => {
                setUserRole("wholesaler");
                navigate("/wholesaler/dashboard");
              }}
              onBackToLogin={() => navigate("/pharmacy/login")}
            />
          } />
          <Route path="/pharmacy/dashboard" element={
            userRole === "pharmacy" ? (
              <PharmacyDashboard 
                onLogout={handleLogout}
                onManageInventory={() => navigate("/pharmacy/inventory")}
                onEditProfile={() => navigate("/pharmacy/profile")}
              />
            ) : <Navigate to="/pharmacy/login" />
          } />
          <Route path="/wholesaler/dashboard" element={
            userRole === "wholesaler" ? (
              <WholesalerDashboard 
                onLogout={handleLogout}
                onManageInventory={() => navigate("/wholesaler/inventory")}
                onViewLeads={() => navigate("/wholesaler/leads")}
              />
            ) : <Navigate to="/pharmacy/login" />
          } />
          <Route path="/wholesaler/inventory" element={
            userRole === "wholesaler" ? (
              <WholesalerInventory onBack={() => navigate("/wholesaler/dashboard")} />
            ) : <Navigate to="/pharmacy/login" />
          } />
          <Route path="/wholesaler/leads" element={
            userRole === "wholesaler" ? (
              <WholesalerLeads onBack={() => navigate("/wholesaler/dashboard")} />
            ) : <Navigate to="/pharmacy/login" />
          } />
          <Route path="/pharmacy/inventory" element={
            userRole === "pharmacy" ? (
              <InventoryManager onBack={() => navigate("/pharmacy/dashboard")} />
            ) : <Navigate to="/pharmacy/login" />
          } />
          <Route path="/pharmacy/profile" element={
            userRole === "pharmacy" ? (
              <PharmacyProfileEdit onBack={() => navigate("/pharmacy/dashboard")} />
            ) : <Navigate to="/pharmacy/login" />
          } />
          <Route path="/admin/dashboard" element={
            userRole === "admin" ? (
              <AdminDashboard onLogout={handleLogout} />
            ) : <Navigate to="/pharmacy/login" />
          } />
          
          {/* Info Pages */}
          <Route path="/how-it-works" element={<HowItWorks onBack={() => navigate("/")} />} />
          <Route path="/for-pharmacies" element={
            <ForPharmacies 
              onBack={() => navigate("/")} 
              onSignUp={() => navigate("/pharmacy/signup")} 
            />
          } />
          <Route path="/privacy" element={<PrivacyPolicy onBack={() => navigate("/")} />} />
          <Route path="/terms" element={<TermsAndConditions onBack={() => navigate("/")} />} />
          <Route path="/faq" element={
            <FAQ 
              onBack={() => navigate("/")} 
              onJoinAsPharmacy={() => navigate("/pharmacy/signup")} 
            />
          } />
          
          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </main>

      <Footer />
      
      <Toaster position="top-center" richColors />
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}