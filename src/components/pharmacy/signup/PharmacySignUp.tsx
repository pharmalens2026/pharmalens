import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, CreditCard, ArrowRight, ArrowLeft, Check, ShieldCheck, FileText, CalendarClock, Star, BarChart3, TrendingUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { SUBSCRIPTION_PLANS, REGISTRATION_FEE, SUBSCRIPTION_GRACE_PERIOD_MONTHS } from "@/data/mockData";

interface PharmacySignUpProps {
  onSignUpComplete: (pharmacyData: any) => void;
  onBackToLogin: () => void;
}

export const PharmacySignUp = ({ onSignUpComplete, onBackToLogin }: PharmacySignUpProps) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    licenses: {
      pharmacy: null as File | null,
      poisonsBoard: null as File | null,
    },
    subscriptionId: "",
    registrationPaid: false
  });

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'pharmacy' | 'poisonsBoard') => {
    if (e.target.files && e.target.files[0]) {
      setFormData((prev) => ({
        ...prev,
        licenses: { ...prev.licenses, [type]: e.target.files![0] }
      }));
      toast.success(`${type === 'pharmacy' ? 'Pharmacy' : 'Poisons Board'} license uploaded`);
    }
  };

  const handlePaymentSubmit = () => {
    toast.promise(new Promise(resolve => setTimeout(resolve, 2000)), {
      loading: 'Processing registration fee payment...',
      success: 'Registration fee paid successfully!',
      error: 'Payment failed. Please try again.',
    });
    setTimeout(() => {
      setFormData(prev => ({ ...prev, registrationPaid: true }));
      nextStep();
    }, 2500);
  };

  const handlePlanSelect = (planId: string) => {
    setFormData((prev) => ({ ...prev, subscriptionId: planId }));
    
    const planName = SUBSCRIPTION_PLANS.find(p => p.id === planId)?.name;
    toast.success(`${planName} plan selected. Subscription starts in ${SUBSCRIPTION_GRACE_PERIOD_MONTHS} months.`);
    
    // Calculate subscription start date (3 months from now)
    const now = new Date();
    const startDate = new Date(now.setMonth(now.getMonth() + SUBSCRIPTION_GRACE_PERIOD_MONTHS));
    
    setTimeout(() => {
      onSignUpComplete({
        ...formData,
        subscriptionId: planId,
        registrationDate: new Date().toISOString().split('T')[0],
        subscriptionStartDate: startDate.toISOString().split('T')[0]
      });
    }, 1000);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-8 flex flex-col items-center gap-4">
        <h2 className="text-2xl font-bold text-slate-900">Pharmacy Registration</h2>
        <div className="flex items-center gap-2">
          {[1, 2, 3].map((s) => (
            <div
              key={s}
              className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-colors ${
                step === s ? "bg-cyan-600 text-white" : step > s ? "bg-cyan-100 text-cyan-600" : "bg-slate-100 text-slate-400"
              }`}
            >
              {step > s ? <Check size={20} /> : s}
            </div>
          ))}
        </div>
        <Button variant="ghost" onClick={onBackToLogin} className="text-slate-500">
          Already have an account? Login
        </Button>
      </div>

      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.div
            key="step1"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Step 1: Account & Verification</CardTitle>
                <CardDescription>Provide your pharmacy details and upload regulatory licenses.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Pharmacy Name</Label>
                    <Input id="name" name="name" placeholder="e.g. City Central Pharmacy" value={formData.name} onChange={handleInputChange} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input id="email" name="email" type="email" placeholder="pharmacy@example.com" value={formData.email} onChange={handleInputChange} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" name="phone" placeholder="+254 ..." value={formData.phone} onChange={handleInputChange} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input id="password" name="password" type="password" placeholder="••••••••" value={formData.password} onChange={handleInputChange} />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t">
                  <div className="border-2 border-dashed border-slate-200 rounded-xl p-6 text-center hover:border-cyan-300 transition-colors bg-slate-50">
                    <div className="w-10 h-10 bg-cyan-100 text-cyan-600 rounded-full flex items-center justify-center mx-auto mb-3">
                      <ShieldCheck size={20} />
                    </div>
                    <h3 className="font-semibold text-sm mb-1">Pharmacy License</h3>
                    <input type="file" id="pharmacy-license" className="hidden" onChange={(e) => handleFileChange(e, 'pharmacy')} />
                    <Button variant="outline" size="sm" asChild>
                      <label htmlFor="pharmacy-license" className="cursor-pointer">
                        {formData.licenses.pharmacy ? "Selected" : "Upload"}
                      </label>
                    </Button>
                    {formData.licenses.pharmacy && <p className="mt-1 text-[10px] text-cyan-600 truncate">{formData.licenses.pharmacy.name}</p>}
                  </div>

                  <div className="border-2 border-dashed border-slate-200 rounded-xl p-6 text-center hover:border-cyan-300 transition-colors bg-slate-50">
                    <div className="w-10 h-10 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-3">
                      <FileText size={20} />
                    </div>
                    <h3 className="font-semibold text-sm mb-1">Poisons Board License</h3>
                    <input type="file" id="poisons-license" className="hidden" onChange={(e) => handleFileChange(e, 'poisonsBoard')} />
                    <Button variant="outline" size="sm" asChild>
                      <label htmlFor="poisons-license" className="cursor-pointer">
                        {formData.licenses.poisonsBoard ? "Selected" : "Upload"}
                      </label>
                    </Button>
                    {formData.licenses.poisonsBoard && <p className="mt-1 text-[10px] text-emerald-600 truncate">{formData.licenses.poisonsBoard.name}</p>}
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button onClick={nextStep} disabled={!formData.name || !formData.email || !formData.licenses.pharmacy || !formData.licenses.poisonsBoard} className="bg-cyan-600 hover:bg-cyan-700 font-bold">
                  Next: Pay Registration Fee <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div
            key="step2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            <Card className="max-w-md mx-auto">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-cyan-100 text-cyan-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CreditCard size={32} />
                </div>
                <CardTitle>Mandatory Registration Fee</CardTitle>
                <CardDescription>
                  Pay a one-time registration fee of <strong>KES {REGISTRATION_FEE.toLocaleString()}</strong> to activate your pharmacy account.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="bg-emerald-50 p-4 rounded-xl border border-emerald-100">
                  <div className="flex justify-between items-center">
                    <span className="text-emerald-700 font-medium">Fee Amount</span>
                    <span className="text-2xl font-black text-emerald-700">KES {REGISTRATION_FEE.toLocaleString()}</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <Label>Payment Method</Label>
                  <Button variant="outline" className="w-full flex justify-between h-14 border-cyan-200 bg-cyan-50">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-emerald-600 rounded-md flex items-center justify-center text-white font-bold">M</div>
                      <div className="text-left">
                        <div className="font-bold">M-Pesa</div>
                        <div className="text-xs text-slate-500">Lipa na M-Pesa Online</div>
                      </div>
                    </div>
                    <CheckCircle2 className="text-emerald-600" size={20} />
                  </Button>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="mpesa-number">M-Pesa Phone Number</Label>
                  <Input id="mpesa-number" placeholder="07XX XXX XXX" defaultValue={formData.phone} />
                </div>
              </CardContent>
              <CardFooter className="flex flex-col gap-3">
                <Button className="w-full bg-emerald-600 hover:bg-emerald-700 h-12 text-lg font-bold shadow-lg shadow-emerald-200" onClick={handlePaymentSubmit}>
                  Pay Fee & Continue
                </Button>
                <Button variant="ghost" className="w-full text-slate-500" onClick={prevStep}>
                  <ArrowLeft className="mr-2 h-4 w-4" /> Back to Details
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div
            key="step3"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-slate-900 mb-2">Our Packages</h2>
              <div className="flex items-center justify-center gap-2 mb-4">
                <div className="bg-cyan-100 text-cyan-700 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                  <CalendarClock size={12} />
                  3-MONTH GRACE PERIOD INCLUDED
                </div>
              </div>
              <p className="text-slate-500">Select a monthly subscription plan. Your first payment will be due 3 months after registration.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {SUBSCRIPTION_PLANS.map((plan) => (
                <Card key={plan.id} className={`relative overflow-hidden flex flex-col ${formData.subscriptionId === plan.id ? 'ring-2 ring-cyan-600 border-cyan-600' : ''}`}>
                  {plan.id === 'premium' && (
                    <div className="absolute top-0 right-0">
                      <div className="bg-cyan-600 text-white text-[10px] font-bold px-3 py-1 rounded-bl-lg uppercase tracking-wider">Best Value</div>
                    </div>
                  )}
                  {plan.id === 'growth' && (
                    <div className="absolute top-0 right-0">
                      <div className="bg-amber-500 text-white text-[10px] font-bold px-3 py-1 rounded-bl-lg uppercase tracking-wider">Most Popular</div>
                    </div>
                  )}
                  <CardHeader>
                    <CardTitle className="text-2xl">{plan.name}</CardTitle>
                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl font-bold">{plan.price}</span>
                      <span className="text-sm text-slate-500">/month</span>
                    </div>
                    <p className="text-xs text-emerald-600 font-medium mt-1">Starts after 3 months</p>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <ul className="space-y-3">
                      {plan.features.map((feature, i) => {
                        const isPremiumFeature = ["Comprehensive Analytics", "Featured Pharmacy Status", "Priority Search Ranking"].includes(feature.name);
                        return (
                          <li key={i} className={`flex items-start gap-2 text-sm ${isPremiumFeature ? 'text-slate-900 font-semibold' : 'text-slate-600'}`}>
                            {isPremiumFeature ? (
                              <Star className="mt-1 h-4 w-4 shrink-0 text-amber-500 fill-amber-500" />
                            ) : (
                              <Check className={`mt-1 h-4 w-4 shrink-0 ${feature.name === 'Verified Pharmacy Status' ? 'text-cyan-500' : 'text-emerald-500'}`} />
                            )}
                            <span>
                              {feature.name}: <span className="text-slate-500 font-normal">{typeof feature.value === 'boolean' ? (feature.value ? 'Yes' : 'No') : feature.value}</span>
                            </span>
                          </li>
                        );
                      })}
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <Button 
                      className="w-full bg-cyan-600 hover:bg-cyan-700 font-bold"
                      onClick={() => handlePlanSelect(plan.id)}
                    >
                      Activate {plan.name}
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};