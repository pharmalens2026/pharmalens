import React from 'react';
import { motion } from 'framer-motion';
import { Search, BarChart3, MessageSquare, Truck, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface HowItWorksProps {
  onBack: () => void;
}

export const HowItWorks: React.FC<HowItWorksProps> = ({ onBack }) => {
  const steps = [
    {
      icon: <Search className="w-8 h-8 text-cyan-600" />,
      title: "Search",
      description: "Enter the name of the medication or health product you need in our search bar."
    },
    {
      icon: <BarChart3 className="w-8 h-8 text-cyan-600" />,
      title: "Compare",
      description: "Instantly view a list of licensed pharmacies near you that have the item in stock, along with real-time pricing."
    },
    {
      icon: <MessageSquare className="w-8 h-8 text-cyan-600" />,
      title: "Connect",
      description: "Choose your preferred pharmacy based on price, proximity, or ratings. You can message the pharmacy directly or generate a lead to reserve your medication."
    },
    {
      icon: <Truck className="w-8 h-8 text-cyan-600" />,
      title: "Collect or Deliver",
      description: "Complete your purchase through the pharmacy's verified checkout process for pickup or home delivery."
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
        <h1 className="text-4xl font-bold text-slate-900 mb-6">How It Works</h1>
        <p className="text-xl text-slate-600 mb-12">
          Our platform bridges the gap between patients and pharmacies, ensuring you find the right medicine at the right price without the guesswork.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow"
            >
              <div className="bg-cyan-50 w-16 h-16 rounded-xl flex items-center justify-center mb-6">
                {step.icon}
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">{step.title}</h3>
              <p className="text-slate-600 leading-relaxed">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};