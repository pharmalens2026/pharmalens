import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Building2, ShieldCheck, CreditCard, ChevronRight, Check, Package, MapPin, Truck, ArrowLeft, Star, TrendingUp, Zap, Shield, Globe, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { WHOLESALER_REGISTRATION_FEE, WHOLESALER_SUBSCRIPTION_PLANS } from "@/data/mockData";
import { toast } from "sonner";

interface WholesalerSignUpProps {
  onSignUpComplete: () => void;
  onBackToLogin: () => void;
}

export function WholesalerSignUp({ onSignUpComplete, onBackToLogin }: WholesalerSignUpProps) {
  const [step, setStep] = useState(1);
  const [isPaying, setIsPaying] = useState(false);
  const [formData, setFormData] = useState({
    companyName: "",
    email: "",
    phone: "",
    licenseNumber: "",
    address: "",
  });
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

  const handleRegister = () => {
    if (step === 1) {
      if (!formData.companyName || !formData.email || !formData.licenseNumber) {
        toast.error("Please fill in all mandatory fields");
        return;
      }
      setStep(2);
    } else if (step === 2) {
      setIsPaying(true);
      // Simulate Paystack/M-Pesa payment
      setTimeout(() => {
        setIsPaying(false);
        toast.success(`Registration fee of KES ${WHOLESALER_REGISTRATION_FEE.toLocaleString()} received! Verification in progress.`);
        setStep(3);
      }, 2000);
    } else if (step === 3) {
      if (!selectedPlan) {
        toast.error("Please select a supply package to activate your dashboard");
        return;
      }
      toast.success("B2B Marketplace access granted! Welcome to the supply network.");
      onSignUpComplete();
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] py-12 px-4 flex items-center justify-center">
      <div className="w-full max-w-6xl">
        {/* Navigation */}
        <div className="flex items-center justify-between mb-12">
          <Button 
            variant="ghost" 
            className="gap-2 font-black text-slate-600 hover:text-purple-600 hover:bg-purple-50 rounded-2xl"
            onClick={step === 1 ? onBackToLogin : () => setStep(step - 1)}
          >
            <ArrowLeft className="h-5 w-5" />
            {step === 1 ? "Back to Portal" : "Previous Step"}
          </Button>
          
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-5 w-5 text-purple-600" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Secure B2B Onboarding</span>
          </div>
        </div>

        {/* Progress Tracker */}
        <div className="flex items-center justify-center gap-4 mb-16 max-w-2xl mx-auto">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex-1 group">
              <div className={`h-2.5 rounded-full mb-3 transition-all duration-700 ${
                step === s ? "bg-purple-600 shadow-[0_0_20px_rgba(147,51,234,0.4)]" : 
                step > s ? "bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.3)]" : "bg-slate-200"
              }`} />
              <div className="flex items-center gap-2">
                <span className={`text-[10px] font-black uppercase tracking-[0.2em] ${step >= s ? "text-slate-900" : "text-slate-400"}`}>
                  {s === 1 ? "Profile" : s === 2 ? "Registration" : "Market Access"}
                </span>
                {step > s && <Check className="h-3 w-3 text-emerald-600 font-black" />}
              </div>
            </div>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start"
            >
              <div className="lg:col-span-5 space-y-8">
                <div>
                  <h1 className="text-5xl font-black text-slate-900 mb-6 leading-[1.1] tracking-tight">
                    Scale Your <span className="text-purple-600">Pharma Supply</span> Business.
                  </h1>
                  <p className="text-slate-500 text-lg font-medium leading-relaxed">
                    Join Kenya's premier B2B pharmaceutical network. Connect directly with over 5,000 verified retail pharmacies and hospitals.
                  </p>
                </div>

                <div className="space-y-4">
                  {[
                    { icon: Globe, title: "National Coverage", desc: "Reach pharmacies in all 47 counties instantly." },
                    { icon: Zap, title: "Real-time Leads", desc: "Get notified when pharmacies search for your stock." },
                    { icon: ShieldCheck, title: "Verified Network", desc: "Every retail buyer is PPB-licensed and verified." }
                  ].map((item, i) => (
                    <div key={i} className="flex gap-4 p-5 bg-white rounded-[24px] border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                      <div className="h-12 w-12 bg-purple-50 rounded-2xl flex items-center justify-center text-purple-600 shrink-0">
                        <item.icon className="h-6 w-6" />
                      </div>
                      <div>
                        <h4 className="font-black text-slate-900 text-sm mb-1">{item.title}</h4>
                        <p className="text-xs text-slate-500 font-medium leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="lg:col-span-7">
                <Card className="rounded-[40px] shadow-2xl shadow-purple-900/5 border-slate-100 overflow-hidden">
                  <CardContent className="p-10 space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-2">
                        <Label className="text-xs font-black uppercase tracking-widest text-slate-400">Official Company Name</Label>
                        <Input 
                          placeholder="e.g. MedLink Distributors Ltd"
                          className="h-14 rounded-2xl bg-slate-50 border-slate-200 focus:ring-purple-500 font-bold"
                          value={formData.companyName}
                          onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-xs font-black uppercase tracking-widest text-slate-400">KPPB License Number</Label>
                        <Input 
                          placeholder="WHL/2024/XXXX"
                          className="h-14 rounded-2xl bg-slate-50 border-slate-200 focus:ring-purple-500 font-bold"
                          value={formData.licenseNumber}
                          onChange={(e) => setFormData({ ...formData, licenseNumber: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-xs font-black uppercase tracking-widest text-slate-400">Commercial Email</Label>
                        <Input 
                          type="email"
                          placeholder="sales@medlink.co.ke"
                          className="h-14 rounded-2xl bg-slate-50 border-slate-200 focus:ring-purple-500 font-bold"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-xs font-black uppercase tracking-widest text-slate-400">Primary Contact Phone</Label>
                        <Input 
                          placeholder="07XX XXX XXX"
                          className="h-14 rounded-2xl bg-slate-50 border-slate-200 focus:ring-purple-500 font-bold"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label className="text-xs font-black uppercase tracking-widest text-slate-400">Warehouse Address</Label>
                      <Input 
                        placeholder="e.g. Unit 4, Mombasa Road Warehouse Complex"
                        className="h-14 rounded-2xl bg-slate-50 border-slate-200 focus:ring-purple-500 font-bold"
                        value={formData.address}
                        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      />
                    </div>

                    <div className="bg-amber-50 p-6 rounded-[28px] border border-amber-100 flex items-start gap-4">
                      <Info className="h-6 w-6 text-amber-600 shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-black text-amber-900 text-sm uppercase tracking-wider mb-1">Compliance Check Required</h4>
                        <p className="text-xs text-amber-700 font-bold leading-relaxed">
                          Your KPPB license will be cross-referenced with the national registry. Please ensure all details are accurate.
                        </p>
                      </div>
                    </div>

                    <Button 
                      className="w-full h-16 bg-purple-600 hover:bg-purple-700 font-black text-xl shadow-2xl shadow-purple-900/20 rounded-[20px] transition-all hover:scale-[1.01]" 
                      onClick={handleRegister}
                    >
                      Verify & Continue <ChevronRight className="ml-2 h-6 w-6" />
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              className="text-center max-w-2xl mx-auto"
            >
              <div className="w-24 h-24 bg-purple-100 rounded-[32px] flex items-center justify-center mx-auto mb-10 shadow-inner relative">
                <CreditCard className="h-10 w-10 text-purple-600" />
                <div className="absolute -top-2 -right-2 bg-emerald-500 text-white p-1.5 rounded-full shadow-lg">
                  <Check className="h-4 w-4 stroke-[4]" />
                </div>
              </div>
              <h2 className="text-4xl font-black text-slate-900 mb-4 tracking-tight">One-Time Onboarding Fee</h2>
              <p className="text-slate-500 text-lg font-medium mb-12">
                This covers your platform configuration, SEO-optimized B2B catalog setup, and PPB license verification.
              </p>
              
              <Card className="mb-12 rounded-[48px] shadow-2xl shadow-purple-900/10 border-purple-100 overflow-hidden bg-white relative">
                <div className="absolute top-0 right-0 p-8">
                  <Badge className="bg-purple-50 text-purple-600 border-none font-black text-[10px] px-3 py-1">NON-RECURRING</Badge>
                </div>
                <CardContent className="p-12">
                  <div className="text-[64px] font-black text-slate-900 mb-2 tracking-tighter leading-none">
                    <span className="text-2xl mr-2 text-purple-600">KES</span>
                    {WHOLESALER_REGISTRATION_FEE.toLocaleString()}
                  </div>
                  <p className="text-xs font-black text-slate-400 uppercase tracking-[0.3em] mb-12">Registration & Setup</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Button 
                      disabled={isPaying}
                      className="h-16 bg-[#3bb75e] hover:bg-[#2e9d4d] font-black text-lg gap-3 rounded-2xl shadow-xl shadow-emerald-900/10"
                      onClick={handleRegister}
                    >
                      {isPaying ? "Processing..." : <><Globe className="h-5 w-5" /> Pay with M-Pesa</>}
                    </Button>
                    <Button 
                      disabled={isPaying}
                      variant="outline" 
                      className="h-16 font-black text-lg gap-3 rounded-2xl border-slate-200 hover:bg-slate-50 shadow-sm"
                      onClick={handleRegister}
                    >
                      {isPaying ? "Processing..." : <><Shield className="h-5 w-5 text-purple-600" /> Pay with Card</>}
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <p className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center justify-center gap-2">
                <ShieldCheck className="h-4 w-4 text-emerald-500" />
                Secure Checkout Powered by Paystack Kenya
              </p>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-16"
            >
              <div className="text-center">
                <h2 className="text-5xl font-black text-slate-900 mb-6 tracking-tight">Select Your Supply Tier</h2>
                <p className="text-slate-500 text-lg font-medium max-w-2xl mx-auto leading-relaxed">
                  Choose how you want to be discovered. High-tier plans get priority in lead routing and exclusive access to 'Instant VIP' pharmacy requests.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 px-4">
                {WHOLESALER_SUBSCRIPTION_PLANS.map((plan) => (
                  <Card 
                    key={plan.id}
                    className={`relative cursor-pointer transition-all duration-500 rounded-[44px] border-4 group ${
                      selectedPlan === plan.id 
                      ? "border-purple-600 shadow-[0_40px_80px_-20px_rgba(147,51,234,0.25)] scale-[1.02] bg-white" 
                      : "border-slate-100 hover:border-purple-200 hover:shadow-2xl bg-white"
                    }`}
                    onClick={() => setSelectedPlan(plan.id)}
                  >
                    {selectedPlan === plan.id && (
                      <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-purple-600 text-white px-8 py-2 rounded-full text-xs font-black uppercase tracking-widest shadow-xl">
                        Active Selection
                      </div>
                    )}
                    
                    <CardHeader className="p-10 pb-4 text-center">
                      <div className={`w-16 h-16 rounded-[24px] mx-auto mb-8 flex items-center justify-center transition-all ${
                        plan.id === 'platinum' ? 'bg-cyan-50 text-cyan-600 group-hover:bg-cyan-600 group-hover:text-white' : 
                        plan.id === 'gold' ? 'bg-amber-50 text-amber-600 group-hover:bg-amber-600 group-hover:text-white' : 
                        'bg-slate-50 text-slate-600 group-hover:bg-slate-900 group-hover:text-white'
                      }`}>
                        {plan.id === 'platinum' ? <Zap className="h-8 w-8" /> : plan.id === 'gold' ? <Star className="h-8 w-8" /> : <Shield className="h-8 w-8" />}
                      </div>
                      
                      <div className="space-y-1 mb-8">
                        <Badge variant="outline" className={`border-none text-[11px] font-black uppercase tracking-[0.25em] px-4 py-1.5 rounded-full ${
                          plan.id === 'platinum' ? 'bg-cyan-50 text-cyan-700' : 
                          plan.id === 'gold' ? 'bg-amber-50 text-amber-700' : 
                          'bg-slate-50 text-slate-700'
                        }`}>
                          {plan.name}
                        </Badge>
                        <div className="text-4xl font-black text-slate-900 pt-4 leading-none">{plan.price}</div>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest pt-2">Subscription per Month</p>
                      </div>
                    </CardHeader>

                    <CardContent className="p-10 pt-6 space-y-5">
                      <div className="h-px bg-slate-100 w-full mb-8" />
                      {plan.features.map((f, i) => (
                        <div key={i} className="flex items-start gap-3">
                          <div className={`mt-0.5 h-5 w-5 rounded-full flex items-center justify-center shrink-0 ${
                            typeof f.value === 'boolean' && f.value ? "bg-emerald-100 text-emerald-600" : 
                            typeof f.value === 'string' ? "bg-purple-100 text-purple-600" :
                            "bg-slate-50 text-slate-300"
                          }`}>
                            <Check className="h-3 w-3" strokeWidth={4} />
                          </div>
                          <div className="flex-1">
                            <span className={`text-sm font-bold ${f.value ? "text-slate-700" : "text-slate-400"}`}>
                              {f.name}: <span className="text-slate-900 font-black">{typeof f.value === 'string' ? f.value : f.value ? "Full Access" : "Not Included"}</span>
                            </span>
                          </div>
                        </div>
                      ))}

                      <Button 
                        className={`w-full h-14 mt-10 rounded-2xl font-black text-lg transition-all ${
                          selectedPlan === plan.id 
                          ? "bg-purple-600 hover:bg-purple-700 text-white shadow-xl shadow-purple-900/10" 
                          : "bg-slate-50 text-slate-600 hover:bg-slate-100"
                        }`}
                      >
                        {selectedPlan === plan.id ? "Selected Plan" : "Select Tier"}
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="flex flex-col items-center gap-8 max-w-xl mx-auto">
                <div className="flex items-center gap-4 p-6 bg-white rounded-[32px] border border-slate-100 shadow-sm w-full">
                  <div className="h-10 w-10 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-600">
                    <TrendingUp className="h-6 w-6" />
                  </div>
                  <p className="text-xs text-slate-500 font-bold leading-relaxed italic">
                    "Platinum members see a 3x higher conversion rate due to instant VIP lead routing."
                  </p>
                </div>

                <Button 
                  className="w-full h-20 bg-purple-600 hover:bg-purple-700 text-2xl font-black shadow-[0_25px_50px_-12px_rgba(147,51,234,0.3)] rounded-[24px] transition-all hover:scale-[1.02] active:scale-95" 
                  onClick={handleRegister}
                >
                  Confirm & Launch Dashboard
                </Button>
                
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest text-center px-12 leading-loose">
                  By activating, you agree to our B2B Terms of Supply and Professional Conduct Policy.
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}