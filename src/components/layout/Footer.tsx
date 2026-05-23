import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Phone, MapPin, Twitter, Facebook, Linkedin, Instagram, ArrowRight, Truck } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const Footer: React.FC = () => {
  const navigate = useNavigate();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-slate-200 pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand Section */}
          <div className="space-y-6">
            <div 
              className="flex items-center gap-2 cursor-pointer"
              onClick={() => navigate('/')}
            >
              <img 
                src="https://storage.googleapis.com/dala-prod-public-storage/attachments/2d47a74f-8ac7-4ef9-a5a1-a26288c06914/1776959523109_PharmaLens_Logo.png" 
                alt="PharmaLens Logo" 
                className="h-12 w-auto object-contain"
              />
            </div>
            <p className="text-slate-600 leading-relaxed">
              Connecting licensed pharmacies with verified wholesalers for transparent, reliable, and accessible healthcare distribution.
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className="p-2 bg-slate-50 rounded-full text-slate-400 hover:text-cyan-600 hover:bg-cyan-50 transition-all">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="p-2 bg-slate-50 rounded-full text-slate-400 hover:text-cyan-600 hover:bg-cyan-50 transition-all">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="p-2 bg-slate-50 rounded-full text-slate-400 hover:text-cyan-600 hover:bg-cyan-50 transition-all">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className="p-2 bg-slate-50 rounded-full text-slate-400 hover:text-cyan-600 hover:bg-cyan-50 transition-all">
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-slate-900 font-bold mb-6">Partnerships</h3>
            <ul className="space-y-4">
              <li><Link to="/for-pharmacies" className="text-slate-600 hover:text-cyan-600 transition-colors">Join as Pharmacy</Link></li>
              <li><Link to="/wholesaler/signup" className="text-cyan-600 font-bold hover:text-cyan-700 transition-colors flex items-center gap-2">
                <Truck size={16} /> Wholesaler Registration
              </Link></li>
              <li><Link to="/pharmacy/login" className="text-slate-600 hover:text-cyan-600 transition-colors">Partner Login</Link></li>
              <li><Link to="/how-it-works" className="text-slate-600 hover:text-cyan-600 transition-colors">How It Works</Link></li>
            </ul>
          </div>

          {/* Legal & Support */}
          <div>
            <h3 className="text-slate-900 font-bold mb-6">Legal & Support</h3>
            <ul className="space-y-4">
              <li><Link to="/faq" className="text-slate-600 hover:text-cyan-600 transition-colors">FAQs</Link></li>
              <li><Link to="/privacy" className="text-slate-600 hover:text-cyan-600 transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms" className="text-slate-600 hover:text-cyan-600 transition-colors">Terms & Conditions</Link></li>
              <li><button onClick={() => window.open('https://wa.me/254724795895')} className="text-slate-600 hover:text-cyan-600 transition-colors">Help Center</button></li>
            </ul>
          </div>

          {/* Contact Section */}
          <div>
            <h3 className="text-slate-900 font-bold mb-6">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-cyan-600 shrink-0 mt-0.5" />
                <span className="text-slate-600">+254 724 795 895</span>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-cyan-600 shrink-0 mt-0.5" />
                <span className="text-slate-600">support@pharmalens.com</span>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-cyan-600 shrink-0 mt-0.5" />
                <span className="text-slate-600">Nairobi, Kenya</span>
              </li>
            </ul>
            <div className="mt-8">
              <p className="text-sm font-semibold text-slate-900 mb-3">B2B Newsletter</p>
              <div className="flex gap-2">
                <input 
                  type="email" 
                  placeholder="Business email" 
                  className="bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm w-full focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 transition-all"
                />
                <Button size="sm" className="bg-cyan-600 hover:bg-cyan-700">
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-100 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-500 text-sm">
            © {currentYear} PharmaLens B2B Network. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-sm text-slate-500">
            <Link to="/privacy" className="hover:text-cyan-600 transition-colors">Privacy</Link>
            <Link to="/terms" className="hover:text-cyan-600 transition-colors">Terms</Link>
            <Link to="/faq" className="hover:text-cyan-600 transition-colors">FAQ</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};