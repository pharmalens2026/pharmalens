import React from 'react';
import { motion } from 'framer-motion';
import { Globe, TrendingUp, Zap, LayoutDashboard, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ForPharmaciesProps {
  onBack: () => void;
  onSignUp: () => void;
}

export const ForPharmacies: React.FC<ForPharmaciesProps> = ({ onBack, onSignUp }) => {
  const benefits = [
    {
      icon: <Globe className="w-8 h-8 text-cyan-600" />,
      title: "Expanded Reach",
      description: "List your inventory on our network to reach thousands of customers searching for medicine in your area every day."
    },
    {
      icon: <TrendingUp className="w-8 h-8 text-cyan-600" />,
      title: "Lead Generation",
      description: "Receive verified inquiries and orders directly to your dashboard, reducing idle time and increasing turnover."
    },
    {
      icon: <LayoutDashboard className="w-8 h-8 text-cyan-600" />,
      title: "Market Intelligence",
      description: "Gain insights into local demand and price trends to help you optimize your stock and pricing strategies."
    },
    {
      icon: <Zap className="w-8 h-8 text-cyan-600" />,
      title: "Simple Integration",
      description: "Our easy-to-use interface allows you to update stock levels and prices in real-time with minimal technical effort."
    }
  ];

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <Button 
        variant="ghost" 
        onClick={onBack}
        className="mb-8 hover:bg-cyan-50 text-cyan-600"
      >
        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
      </Button>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl font-bold text-slate-900 mb-6">For Pharmacies</h1>
        <p className="text-xl text-slate-600 mb-12">
          Empower your business with data-driven tools and increased visibility. We help local pharmacies compete in the digital age.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow"
            >
              <div className="bg-cyan-50 w-16 h-16 rounded-xl flex items-center justify-center mb-6">
                {benefit.icon}
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">{benefit.title}</h3>
              <p className="text-slate-600 leading-relaxed">{benefit.description}</p>
            </motion.div>
          ))}
        </div>

        <div className="bg-cyan-600 rounded-3xl p-12 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Ready to grow your pharmacy?</h2>
          <p className="text-cyan-100 mb-8 max-w-2xl mx-auto">
            Join the PharmaLens network today and start reaching more patients in your community.
          </p>
          <Button 
            size="lg" 
            onClick={onSignUp}
            className="bg-white text-cyan-600 hover:bg-cyan-50 font-bold px-8 py-6 text-lg rounded-xl"
          >
            Join As a Pharmacy
          </Button>
        </div>
      </motion.div>
    </div>
  );
};