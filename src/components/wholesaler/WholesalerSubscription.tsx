import React, { useState } from 'react';
import {
  Zap,
  ShieldCheck,
  BarChart3,
  Users,
  ArrowRight,
  Check,
  Globe,
  TrendingUp,
  Award,
  Search
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';
import { toast } from 'sonner';

interface WholesalerSubscriptionProps {
  onSelect: (plan: string) => void;
}

export const WHOLESALER_PLANS = [
  {
    id: 'silver',
    name: 'Silver Supply',
    price: 'KES 49,999',
    period: 'Quarterly',
    color: 'slate',
    icon: ShieldCheck,
    description: 'Perfect for established local wholesalers looking to reach more pharmacies.',
    features: [
      { name: 'Priority B2B Listing', included: true },
      { name: 'Standard Lead Access', included: true },
      { name: 'Basic Inventory Analytics', included: true },
      { name: 'Email Support', included: true },
      { name: 'Featured Wholesaler Tag', included: false },
      { name: 'Instant Lead Notifications', included: false },
      { name: 'Advanced Demand Prediction', included: false },
    ]
  },
  {
    id: 'gold',
    name: 'Gold Distribution',
    price: 'KES 74,999',
    period: 'Quarterly',
    color: 'amber',
    icon: Award,
    popular: true,
    description: 'Accelerate your distribution with premium visibility and high-priority leads.',
    features: [
      { name: 'Priority B2B Listing', included: true },
      { name: 'High-Priority Lead Access', included: true },
      { name: 'Advanced Sales Analytics', included: true },
      { name: 'Priority Support', included: true },
      { name: 'Featured Wholesaler Tag', included: true },
      { name: 'Standard Notification Delay', included: '5 mins' },
      { name: 'Advanced Demand Prediction', included: false },
    ]
  },
  {
    id: 'platinum',
    name: 'Platinum Market Leader',
    price: 'KES 99,999',
    period: 'Quarterly',
    color: 'cyan',
    icon: Zap,
    description: 'The ultimate distribution power. Dominate the market with instant VIP leads and AI insights.',
    features: [
      { name: 'Top-of-Search Placement', included: true },
      { name: 'Instant VIP Lead Access', included: true },
      { name: 'Advanced AI Market Insights', included: true },
      { name: '24/7 Dedicated Account Mgr', included: true },
      { name: 'Featured Wholesaler Tag', included: true },
      { name: 'Zero-Delay Notifications', included: true },
      { name: 'Advanced Demand Prediction', included: true },
    ]
  }
];

export function WholesalerSubscription({ onSelect }: WholesalerSubscriptionProps) {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

  const handleSelect = (planId: string) => {
    setSelectedPlan(planId);
    toast.success(`Selected ${planId} plan. Redirecting to payment...`);
    setTimeout(() => onSelect(planId), 1500);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-12 pb-12">
      <div className="text-center space-y-4">
        <h2 className="text-4xl font-bold text-slate-900 tracking-tight">Choose Your Growth Engine</h2>
        <p className="text-slate-500 text-lg max-w-2xl mx-auto">
          Scale your wholesale business with targeted B2B distribution packages tailored for Kenyan suppliers.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {WHOLESALER_PLANS.map((plan, idx) => (
          <motion.div
            key={plan.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="relative h-full"
          >
            {plan.popular && (
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
                <Badge className="bg-amber-500 hover:bg-amber-600 text-white border-none px-4 py-1 text-xs font-bold shadow-lg">
                  MOST POPULAR
                </Badge>
              </div>
            )}

            <Card className={`h-full flex flex-col border-2 transition-all duration-300 ${plan.popular ? 'border-amber-500 shadow-xl shadow-amber-900/5' : 'border-slate-100 hover:border-slate-300'}`}>
              <CardHeader className="p-8 text-center border-b">
                <div className={`h-16 w-16 mx-auto mb-6 rounded-2xl flex items-center justify-center ${
                  plan.color === 'cyan' ? 'bg-cyan-100 text-cyan-600' : 
                  plan.color === 'amber' ? 'bg-amber-100 text-amber-600' : 'bg-slate-100 text-slate-600'
                }`}>
                  <plan.icon size={32} />
                </div>
                <CardTitle className="text-2xl font-bold text-slate-900">{plan.name}</CardTitle>
                <CardDescription className="mt-2">{plan.description}</CardDescription>
                <div className="mt-6">
                  <span className="text-4xl font-bold text-slate-900">{plan.price}</span>
                  <span className="text-slate-400 font-medium text-sm ml-1">/ {plan.period}</span>
                </div>
              </CardHeader>
              <CardContent className="flex-1 p-8">
                <ul className="space-y-4">
                  {plan.features.map((feature, fIdx) => (
                    <li key={fIdx} className="flex items-start gap-3">
                      {feature.included ? (
                        <div className="h-5 w-5 bg-emerald-100 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                          <Check size={12} className="text-emerald-600" strokeWidth={3} />
                        </div>
                      ) : (
                        <div className="h-5 w-5 bg-slate-50 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                          <div className="h-1.5 w-1.5 rounded-full bg-slate-300" />
                        </div>
                      )}
                      <span className={`text-sm ${feature.included ? 'text-slate-700 font-medium' : 'text-slate-400'}`}>
                        {feature.name}
                        {typeof feature.included === 'string' && (
                          <span className="ml-2 font-bold text-cyan-600">({feature.included})</span>
                        )}
                      </span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <div className="p-8 pt-0">
                <Button 
                  className={`w-full h-12 font-bold transition-all ${plan.color === 'cyan' ? 'bg-cyan-600 hover:bg-cyan-700' : plan.color === 'amber' ? 'bg-amber-600 hover:bg-amber-700' : 'bg-slate-900 hover:bg-slate-800'}`}
                  onClick={() => handleSelect(plan.id)}
                >
                  Select {plan.name} <ArrowRight size={18} className="ml-2" />
                </Button>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-12 border-t">
        <div className="flex items-start gap-4">
          <div className="h-10 w-10 bg-cyan-50 rounded-lg flex items-center justify-center text-cyan-600 shrink-0">
            <Users size={20} />
          </div>
          <div className="space-y-1">
            <p className="text-sm font-bold text-slate-900">Market Reach</p>
            <p className="text-xs text-slate-500">Access over 1,200+ registered pharmacies across Kenya instantly.</p>
          </div>
        </div>
        <div className="flex items-start gap-4">
          <div className="h-10 w-10 bg-cyan-50 rounded-lg flex items-center justify-center text-cyan-600 shrink-0">
            <TrendingUp size={20} />
          </div>
          <div className="space-y-1">
            <p className="text-sm font-bold text-slate-900">Data Driven</p>
            <p className="text-xs text-slate-500">Real-time insights into medicine demand intensity by region.</p>
          </div>
        </div>
        <div className="flex items-start gap-4">
          <div className="h-10 w-10 bg-cyan-50 rounded-lg flex items-center justify-center text-cyan-600 shrink-0">
            <BarChart3 size={20} />
          </div>
          <div className="space-y-1">
            <p className="text-sm font-bold text-slate-900">Optimized Logistics</p>
            <p className="text-xs text-slate-500">Reduce delivery costs by grouping orders from nearby pharmacies.</p>
          </div>
        </div>
      </div>
    </div>
  );
}