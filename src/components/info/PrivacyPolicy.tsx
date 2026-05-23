import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, EyeOff, Lock, UserCog, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface PrivacyPolicyProps {
  onBack: () => void;
}

export const PrivacyPolicy: React.FC<PrivacyPolicyProps> = ({ onBack }) => {
  const policies = [
    {
      icon: <ShieldCheck className="w-6 h-6 text-cyan-600" />,
      title: "Data Collection",
      description: "We collect minimal information required to facilitate connections, such as your search queries and general location."
    },
    {
      icon: <EyeOff className="w-6 h-6 text-cyan-600" />,
      title: "No Sale of Data",
      description: "We never sell your personal health information to third-party advertisers."
    },
    {
      icon: <Lock className="w-6 h-6 text-cyan-600" />,
      title: "Security",
      description: "We use industry-standard encryption to ensure that your communication with pharmacies remains private and secure."
    },
    {
      icon: <UserCog className="w-6 h-6 text-cyan-600" />,
      title: "User Control",
      description: "You have the right to access, update, or delete your account information at any time through your profile settings."
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
        <h1 className="text-4xl font-bold text-slate-900 mb-6">Privacy Policy</h1>
        <p className="text-xl text-slate-600 mb-12">
          We value your trust and are committed to protecting your personal and health-related data.
        </p>

        <div className="space-y-6 mb-12">
          {policies.map((policy, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex gap-6 p-6 bg-slate-50 rounded-2xl border border-slate-100"
            >
              <div className="bg-white p-3 rounded-xl shadow-sm h-fit">
                {policy.icon}
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">{policy.title}</h3>
                <p className="text-slate-600 leading-relaxed">{policy.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="prose prose-slate max-w-none text-slate-600">
          <p className="mb-4">
            At PharmaLens, we believe that health data is among the most sensitive information a person can share. That's why we've built our platform with privacy as a core principle. Our goal is to provide transparency and accessibility without compromising your personal safety.
          </p>
          <p>
            If you have any questions about our privacy practices or how your data is handled, please reach out to our support team at support@pharmalens.com.
          </p>
        </div>
      </motion.div>
    </div>
  );
};