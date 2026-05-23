import React, { useState } from 'react';
import {
  Building2,
  ShieldCheck,
  CreditCard,
  ArrowRight,
  ChevronLeft,
  CheckCircle2,
  Upload,
  FileText,
  Globe,
  Phone,
  Mail,
  MapPin,
  Lock
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';

interface WholesalerRegistrationProps {
  onComplete: () => void;
  onBackToLogin: () => void;
}

export function WholesalerRegistration({ onComplete, onBackToLogin }: WholesalerRegistrationProps) {
  const [step, setStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const totalSteps = 3;

  const handleNext = () => {
    if (step < totalSteps) setStep(step + 1);
    else onComplete();
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
    else onBackToLogin();
  };

  const handlePayment = () => {
    setIsProcessing(true);
    toast.loading('Connecting to secure payment gateway...');
    
    // Simulate payment delay
    setTimeout(() => {
      toast.dismiss();
      toast.success('Registration fee of KES 19,999 processed successfully!');
      setIsProcessing(false);
      handleNext();
    }, 2500);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6">
      <div className="max-w-xl w-full space-y-8">
        <div className="flex flex-col items-center text-center">
          <div className="h-16 w-16 bg-cyan-600 rounded-2xl flex items-center justify-center text-white mb-4 shadow-xl shadow-cyan-200">
            <Building2 size={32} />
          </div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Wholesaler Onboarding</h1>
          <p className="text-slate-500 mt-2">Join Kenya's leading B2B pharmaceutical supply network.</p>
        </div>

        <div className="space-y-4">
          <div className="flex justify-between items-center text-sm font-medium text-slate-400 px-1">
            <span>Step {step} of {totalSteps}</span>
            <span className="text-cyan-600 font-bold">{Math.round((step / totalSteps) * 100)}% Complete</span>
          </div>
          <Progress value={(step / totalSteps) * 100} className="h-2 bg-slate-200" />
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="border-none shadow-2xl shadow-slate-200/50 overflow-hidden">
              <CardContent className="p-8">
                {step === 1 && (
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <h2 className="text-xl font-bold text-slate-900">Business Foundation</h2>
                      <p className="text-sm text-slate-500">Tell us about your wholesale operations.</p>
                    </div>
                    <div className="grid grid-cols-1 gap-4">
                      <div className="space-y-2">
                        <Label>Registered Business Name *</Label>
                        <Input placeholder="e.g. Global Meds Kenya Ltd" />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>KRA PIN (Tax ID) *</Label>
                          <Input placeholder="P051XXXXXX" />
                        </div>
                        <div className="space-y-2">
                          <Label>PPB License Number *</Label>
                          <Input placeholder="PPB/W/2024/0000" />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label>Official Business Email *</Label>
                        <Input type="email" placeholder="distribution@company.co.ke" />
                      </div>
                      <div className="space-y-2">
                        <Label>Operational HQ Location *</Label>
                        <div className="relative">
                          <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                          <Input className="pl-10" placeholder="Nairobi, Industrial Area" />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {step === 2 && (
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <h2 className="text-xl font-bold text-slate-900">Regulatory Compliance</h2>
                      <p className="text-sm text-slate-500">Upload valid certificates from the Pharmacy & Poisons Board.</p>
                    </div>
                    <div className="space-y-4">
                      <div className="border-2 border-dashed border-slate-200 rounded-2xl p-10 flex flex-col items-center justify-center space-y-4 hover:border-cyan-400 hover:bg-cyan-50/30 transition-all cursor-pointer group">
                        <div className="h-14 w-14 bg-slate-50 rounded-full flex items-center justify-center text-slate-400 group-hover:bg-cyan-100 group-hover:text-cyan-600 transition-colors shadow-sm">
                          <Upload size={28} />
                        </div>
                        <div className="text-center">
                          <p className="text-sm font-bold text-slate-900">Wholesale Dealer's License</p>
                          <p className="text-xs text-slate-500 mt-1">Drag & drop your PDF or JPG here</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3 p-5 bg-emerald-50 rounded-2xl border border-emerald-100">
                        <ShieldCheck className="text-emerald-600 shrink-0" size={24} />
                        <div className="space-y-1">
                          <p className="text-xs font-bold text-emerald-900 uppercase tracking-tight">Verification Process</p>
                          <p className="text-xs text-emerald-800 leading-relaxed">
                            Our regulatory team will audit your submission within 48 business hours. You can start listing products immediately after fee payment.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {step === 3 && (
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <h2 className="text-xl font-bold text-slate-900">B2B Activation Fee</h2>
                      <p className="text-sm text-slate-500">One-time registration to access Kenya's largest pharmacy network.</p>
                    </div>
                    
                    <div className="p-8 bg-slate-900 rounded-3xl text-white space-y-8 relative overflow-hidden">
                      <div className="absolute -right-10 -top-10 h-40 w-40 bg-cyan-500/20 rounded-full blur-3xl"></div>
                      
                      <div className="flex justify-between items-start relative z-10">
                        <div>
                          <p className="text-[10px] font-bold text-cyan-400 uppercase tracking-[0.2em] mb-2">Registration Total</p>
                          <div className="flex items-baseline gap-1">
                            <span className="text-sm font-medium text-slate-400">KES</span>
                            <span className="text-5xl font-black tracking-tighter">19,999</span>
                          </div>
                        </div>
                        <div className="h-14 w-14 bg-white/10 rounded-2xl flex items-center justify-center border border-white/10">
                          <Lock size={28} className="text-cyan-400" />
                        </div>
                      </div>

                      <div className="space-y-4 pt-6 border-t border-white/10 relative z-10">
                        {[ 
                          'Verified Supplier Badge', 
                          'Access to 1,200+ Pharmacies', 
                          'Real-time B2B Lead Routing', 
                          'Bulk Inventory Management Tools' 
                        ].map((feature, i) => (
                          <div key={i} className="flex items-center gap-3">
                            <div className="h-5 w-5 bg-emerald-500/20 rounded-full flex items-center justify-center">
                              <CheckCircle2 size={14} className="text-emerald-400" />
                            </div>
                            <span className="text-xs text-slate-300">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-4">
                      <Button 
                        className="w-full h-14 bg-cyan-600 hover:bg-cyan-700 text-lg font-black gap-2 shadow-xl shadow-cyan-200 transition-all active:scale-[0.98]"
                        onClick={handlePayment}
                        disabled={isProcessing}
                      >
                        {isProcessing ? 'Processing...' : 'Pay Registration Fee'}
                        {!isProcessing && <ArrowRight size={20} />}
                      </Button>
                      <div className="flex items-center justify-center gap-4">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/M-PESA_LOGO-01.svg/1200px-M-PESA_LOGO-01.svg.png" alt="MPesa" className="h-4 opacity-50 grayscale hover:grayscale-0 transition-all" />
                        <div className="h-4 w-px bg-slate-200"></div>
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Secure B2B Payment</span>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
              <div className="px-8 py-6 bg-slate-50 border-t flex items-center justify-between">
                <Button 
                  variant="ghost" 
                  className="text-slate-500 font-bold hover:bg-slate-100 px-4"
                  onClick={handleBack}
                  disabled={isProcessing}
                >
                  <ChevronLeft size={18} className="mr-2" /> Back
                </Button>
                {step < 3 && (
                  <Button 
                    className="bg-slate-900 hover:bg-slate-800 px-8 font-bold"
                    onClick={handleNext}
                  >
                    Continue
                  </Button>
                )}
              </div>
            </Card>
          </motion.div>
        </AnimatePresence>

        <div className="flex items-center justify-center gap-8 text-[11px] font-bold text-slate-400 uppercase tracking-widest">
          <button className="hover:text-cyan-600 transition-colors">Terms</button>
          <button className="hover:text-cyan-600 transition-colors">Privacy</button>
          <button className="hover:text-cyan-600 transition-colors">Support</button>
        </div>
      </div>
    </div>
  );
}