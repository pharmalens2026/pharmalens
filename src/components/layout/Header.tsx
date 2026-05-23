import { Building2, ShieldCheck, UserPlus, MessageCircle, LayoutDashboard, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { UserRole } from "@/App";
import { useNavigate } from "react-router-dom";

interface HeaderProps {
  onLogoClick: () => void;
  onLoginClick: () => void;
  onSignUpClick: () => void;
  onDashboardClick: () => void;
  userRole: UserRole;
}

export function Header({ onLogoClick, onLoginClick, onSignUpClick, onDashboardClick, userRole }: HeaderProps) {
  const navigate = useNavigate();
  const isLoggedIn = userRole !== null;

  return (
    <header className="fixed top-0 z-50 w-full border-b bg-white/95 backdrop-blur-md shadow-sm">
      <div className="container flex h-24 items-center justify-between px-4 mx-auto">
        <div 
          className="flex items-center gap-2 cursor-pointer transition-transform hover:scale-105"
          onClick={onLogoClick}
        >
          <img 
            src="https://storage.googleapis.com/dala-prod-public-storage/attachments/2d47a74f-8ac7-4ef9-a5a1-a26288c06914/1776959523109_PharmaLens_Logo.png" 
            alt="Pharmalens Logo" 
            className="h-16 md:h-20 w-auto object-contain transition-all"
          />
        </div>
        
        <div className="hidden md:flex items-center gap-8 text-sm font-semibold text-slate-700">
          <button onClick={onLogoClick} className="hover:text-cyan-600 transition-colors cursor-pointer font-black uppercase tracking-widest text-[10px]">Find Medicine</button>
          
          {!isLoggedIn && (
            <>
              <button onClick={onSignUpClick} className="text-cyan-600 hover:text-cyan-700 transition-colors cursor-pointer font-black uppercase tracking-widest text-[10px]">Join as Pharmacy</button>
              <button onClick={() => navigate('/wholesaler/signup')} className="text-purple-600 hover:text-purple-700 transition-colors cursor-pointer font-black uppercase tracking-widest text-[10px]">Join as Wholesaler</button>
            </>
          )}
        </div>

        <div className="flex items-center gap-2">
          <Button 
            variant="ghost" 
            className="rounded-full h-11 px-3 text-emerald-600 hover:bg-emerald-50 hover:text-emerald-700 transition-all font-bold gap-2 hidden lg:flex"
            onClick={() => window.open('https://wa.me/254724795895')}
          >
            <MessageCircle className="h-5 w-5" />
            <span>WhatsApp Support</span>
          </Button>

          {isLoggedIn ? (
            <div className="flex items-center gap-2">
              <Button 
                variant="outline" 
                className={`rounded-full gap-2 h-11 px-6 font-semibold transition-all ${
                  userRole === 'wholesaler' ? 'border-purple-200 text-purple-700 bg-purple-50' : 'border-slate-200 text-slate-700 bg-slate-50'
                }`}
                onClick={onDashboardClick}
              >
                {userRole === "admin" ? (
                  <>
                    <ShieldCheck className="h-5 w-5 text-cyan-600" />
                    <span className="hidden sm:inline">Admin Panel</span>
                  </>
                ) : userRole === "wholesaler" ? (
                  <>
                    <Truck className="h-5 w-5 text-purple-600" />
                    <span className="hidden sm:inline font-black uppercase tracking-widest text-[10px]">Wholesaler Panel</span>
                  </>
                ) : (
                  <>
                    <LayoutDashboard className="h-5 w-5 text-cyan-600" />
                    <span className="hidden sm:inline">Pharmacy Dashboard</span>
                  </>
                )}
              </Button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Button 
                variant="ghost" 
                className="rounded-full h-11 px-4 font-semibold text-slate-600 hover:text-cyan-600 hover:bg-cyan-50 hidden sm:flex"
                onClick={onLoginClick}
              >
                Login
              </Button>
              <Button 
                variant="default" 
                className="rounded-full gap-2 h-11 px-6 bg-cyan-600 hover:bg-cyan-700 font-semibold shadow-md shadow-cyan-100"
                onClick={onSignUpClick}
              >
                <UserPlus className="h-5 w-5" />
                <span className="hidden sm:inline">Sign Up</span>
              </Button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}