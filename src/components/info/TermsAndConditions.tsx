import React from 'react';
import { motion } from 'framer-motion';
import { FileText, Shield, Scale, AlertCircle, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface TermsAndConditionsProps {
  onBack: () => void;
}

export const TermsAndConditions: React.FC<TermsAndConditionsProps> = ({ onBack }) => {
  const sections = [
    {
      icon: <FileText className="w-6 h-6 text-cyan-600" />,
      title: "Agreement to Terms",
      content: "By accessing or using PharmaLens, you agree to be bound by these Terms and Conditions. If you do not agree, please do not use our services."
    },
    {
      icon: <Shield className="w-6 h-6 text-cyan-600" />,
      title: "Service Description",
      content: "PharmaLens is an information platform that connects users with licensed pharmacies. We do not provide medical advice or dispense medication ourselves."
    },
    {
      icon: <Scale className="w-6 h-6 text-cyan-600" />,
      title: "User Responsibilities",
      content: "Users must provide accurate information and comply with local laws regarding the purchase of prescription medications."
    },
    {
      icon: <AlertCircle className="w-6 h-6 text-cyan-600" />,
      title: "Limitation of Liability",
      content: "PharmaLens is not responsible for the quality, safety, or legality of medications provided by third-party pharmacies."
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
        <h1 className="text-4xl font-bold text-slate-900 mb-6">Terms and Conditions</h1>
        <p className="text-xl text-slate-600 mb-12">
          Please read these terms carefully before using our platform. Last updated: May 2024.
        </p>

        <div className="space-y-6 mb-12">
          {sections.map((section, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex gap-6 p-6 bg-slate-50 rounded-2xl border border-slate-100"
            >
              <div className="bg-white p-3 rounded-xl shadow-sm h-fit">
                {section.icon}
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">{section.title}</h3>
                <p className="text-slate-600 leading-relaxed">{section.content}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="prose prose-slate max-w-none text-slate-600 bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Detailed Terms</h2>
          <p className="mb-4">
            Our platform serves as a bridge between healthcare seekers and providers. We strive for transparency and accuracy in all medicine listings, but the ultimate responsibility for medication dispensing lies with the licensed professional at the pharmacy.
          </p>
          <p className="mb-4">
            You agree not to use the platform for any unlawful purpose or in any way that could damage, disable, or impair our services.
          </p>
          <p>
            For any legal inquiries, please contact our legal department at legal@pharmalens.com.
          </p>
        </div>
      </motion.div>
    </div>
  );
};