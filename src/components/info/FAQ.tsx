import React from 'react';
import { motion } from 'framer-motion';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { ArrowLeft, HelpCircle } from "lucide-react";

interface FAQProps {
  onBack: () => void;
  onJoinAsPharmacy: () => void;
}

export const FAQ: React.FC<FAQProps> = ({ onBack, onJoinAsPharmacy }) => {
  const faqs = [
    {
      question: "Is the platform a pharmacy?",
      answer: "No. We are an intelligence and search network. We do not sell or dispense medication ourselves; we connect you with licensed, third-party pharmacies."
    },
    {
      question: "How do I know the prices are accurate?",
      answer: "Prices are updated regularly by the participating pharmacies. However, we always recommend confirming the final price with the pharmacist via our direct messaging tool, WhatsApp or call."
    },
    {
      question: "Do I need a prescription?",
      answer: "For prescription-only medications, you will be required to present a valid prescription from a registered medical practitioner at the pharmacy before the medication can be dispensed."
    },
    {
      question: "Is there a fee to use the search service?",
      answer: "For users searching for medicine, the platform is free to use. We believe everyone deserves transparent access to healthcare information."
    },
    {
      question: "How can my pharmacy join the network?",
      answer: 'Simply click on the "Join As a Pharmacy" button on the home page, fill in your license details, and our team will reach out to verify your pharmacy.'
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
        <div className="flex items-center gap-4 mb-6">
          <div className="bg-cyan-100 p-3 rounded-2xl">
            <HelpCircle className="w-8 h-8 text-cyan-600" />
          </div>
          <h1 className="text-4xl font-bold text-slate-900">Frequently Asked Questions</h1>
        </div>
        
        <p className="text-xl text-slate-600 mb-12">
          Find answers to common questions about using PharmaLens for your healthcare needs.
        </p>

        <Accordion type="single" collapsible className="w-full space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem 
              key={index} 
              value={`item-${index}`}
              className="bg-white border border-slate-100 rounded-2xl px-6 shadow-sm overflow-hidden"
            >
              <AccordionTrigger className="text-left font-bold text-slate-900 hover:text-cyan-600 py-6">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-slate-600 pb-6 text-lg leading-relaxed">
                {faq.answer}
                {faq.question.includes("How can my pharmacy join") && (
                  <div className="mt-4">
                    <Button 
                      onClick={onJoinAsPharmacy}
                      className="bg-cyan-600 hover:bg-cyan-700"
                    >
                      Join As a Pharmacy
                    </Button>
                  </div>
                )}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        <div className="mt-16 bg-slate-50 rounded-3xl p-8 border border-slate-200 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">Still have questions?</h3>
            <p className="text-slate-600">We're here to help you find the information you need.</p>
          </div>
          <Button 
            variant="outline"
            className="border-cyan-200 text-cyan-600 hover:bg-cyan-50"
            onClick={() => window.open('https://wa.me/254724795895')}
          >
            Chat with Support
          </Button>
        </div>
      </motion.div>
    </div>
  );
};