import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { motion, AnimatePresence } from "framer-motion";
import { Smartphone, Lock, ArrowRight, ShieldCheck, Mail, Key } from "lucide-react";
import { toast } from "sonner";

interface PharmacyLoginProps {
  onLoginSuccess: (role: "pharmacy" | "admin") => void;
  onSignUpClick?: () => void;
}

export const PharmacyLogin = ({ onLoginSuccess, onSignUpClick }: PharmacyLoginProps) => {
  const [loginType, setLoginType] = useState<"pharmacy" | "admin">("pharmacy");
  const [step, setStep] = useState<"phone" | "otp">("phone");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  
  // Admin fields
  const [adminEmail, setAdminEmail] = useState("");
  const [adminPassword, setAdminPassword] = useState("");
  
  const [isLoading, setIsLoading] = useState(false);

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone) {
      toast.error("Please enter your phone number");
      return;
    }
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setStep("otp");
      setIsLoading(false);
      toast.success("Verification code sent to " + phone);
    }, 800);
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.length !== 4) {
      toast.error("Please enter a valid 4-digit code");
      return;
    }
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      onLoginSuccess("pharmacy");
    }, 800);
  };

  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!adminEmail || !adminPassword) {
      toast.error("Please fill in all admin credentials");
      return;
    }
    setIsLoading(true);
    // Simulate Admin Login
    setTimeout(() => {
      setIsLoading(false);
      onLoginSuccess("admin");
    }, 1000);
  };

  const toggleLoginType = () => {
    setLoginType(loginType === "pharmacy" ? "admin" : "pharmacy");
    setStep("phone"); // reset step
  };

  return (
    <div className="container mx-auto px-4 py-12 flex flex-col items-center justify-center min-h-[70vh]">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <Card className="border-slate-200 shadow-xl overflow-hidden mb-6">
          <div className={`h-2 w-full ${loginType === 'admin' ? 'bg-slate-800' : 'bg-cyan-600'}`} />
          <CardHeader className="text-center pt-8">
            <CardTitle className="text-2xl font-bold">
              {loginType === "pharmacy" ? "Pharmacy Portal" : "Super Admin Login"}
            </CardTitle>
            <CardDescription>
              {loginType === "pharmacy" 
                ? (step === "phone" ? "Enter your registered phone number to access your dashboard" : "Enter the 4-digit verification code sent to your phone")
                : "Secure access for Pharmalens administrators only"}
            </CardDescription>
          </CardHeader>
          
          <CardContent className="pt-4">
            <AnimatePresence mode="wait">
              {loginType === "pharmacy" ? (
                <motion.form 
                  key="pharmacy-form"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  onSubmit={step === "phone" ? handleSendOtp : handleVerifyOtp} 
                  className="space-y-4"
                >
                  {step === "phone" ? (
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <div className="relative">
                        <Smartphone className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                        <Input
                          id="phone"
                          type="tel"
                          placeholder="e.g. 0712 345 678"
                          className="pl-10"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          disabled={isLoading}
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <Label htmlFor="otp">Verification Code</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                        <Input
                          id="otp"
                          type="text"
                          placeholder="4-digit code"
                          className="pl-10 text-center tracking-[1em] font-bold text-lg"
                          maxLength={4}
                          value={otp}
                          onChange={(e) => setOtp(e.target.value)}
                          disabled={isLoading}
                        />
                      </div>
                      <button 
                        type="button"
                        onClick={() => setStep("phone")}
                        className="text-xs text-cyan-600 hover:underline"
                      >
                        Change phone number
                      </button>
                    </div>
                  )}

                  <Button 
                    type="submit" 
                    className="w-full bg-cyan-600 hover:bg-cyan-700 h-11"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <span className="flex items-center gap-2">
                        <span className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Processing...
                      </span>
                    ) : (
                      step === "phone" ? "Send Verification Code" : "Verify & Login"
                    )}
                  </Button>
                </motion.form>
              ) : (
                <motion.form 
                  key="admin-form"
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  onSubmit={handleAdminLogin} 
                  className="space-y-4"
                >
                  <div className="space-y-2">
                    <Label htmlFor="email">Admin Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                      <Input
                        id="email"
                        type="email"
                        placeholder="admin@pharmalens.com"
                        className="pl-10"
                        value={adminEmail}
                        onChange={(e) => setAdminEmail(e.target.value)}
                        disabled={isLoading}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">Security Password</Label>
                    <div className="relative">
                      <Key className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                      <Input
                        id="password"
                        type="password"
                        placeholder="\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022"
                        className="pl-10"
                        value={adminPassword}
                        onChange={(e) => setAdminPassword(e.target.value)}
                        disabled={isLoading}
                      />
                    </div>
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full bg-slate-800 hover:bg-slate-900 text-white h-11"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <span className="flex items-center gap-2">
                        <span className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Authenticating...
                      </span>
                    ) : (
                      <span className="flex items-center gap-2 justify-center">
                        <ShieldCheck className="h-4 w-4" />
                        Admin Authorization
                      </span>
                    )}
                  </Button>
                </motion.form>
              )}
            </AnimatePresence>
          </CardContent>
          
          <CardFooter className="flex flex-col gap-4 border-t bg-slate-50/50 p-6">
            <div className="flex flex-col gap-2 w-full">
              <button 
                type="button"
                onClick={toggleLoginType}
                className="text-sm text-slate-500 hover:text-cyan-600 transition-colors flex items-center justify-center gap-2 py-2"
              >
                {loginType === "pharmacy" ? (
                  <>
                    <ShieldCheck className="h-4 w-4" />
                    Login as Super Admin
                  </>
                ) : (
                  <>
                    <Smartphone className="h-4 w-4" />
                    Back to Pharmacy Login
                  </>
                )}
              </button>
              
              {loginType === "pharmacy" && (
                <>
                  <div className="text-sm text-center text-slate-500 mt-2">
                    Not registered yet? <button onClick={onSignUpClick} className="text-cyan-600 font-semibold hover:underline">Sign up here</button>
                  </div>
                  <Button 
                    variant="outline" 
                    className="w-full border-cyan-200 text-cyan-700 hover:bg-cyan-50"
                    onClick={onSignUpClick}
                  >
                    Register your Pharmacy <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </>
              )}
            </div>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
};