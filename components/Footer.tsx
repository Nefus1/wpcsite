import React from 'react';
import { Gavel, Linkedin, Twitter, Facebook } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-brand-900 border-t border-brand-800 pt-16 pb-8">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-2 mb-6">
              <Gavel className="w-8 h-8 text-brand-gold" />
              <div>
                 <h2 className="font-serif text-xl font-bold text-white tracking-wide">WESTERN PACIFIC</h2>
                 <p className="text-[10px] text-brand-gold uppercase tracking-[0.2em]">Counsel</p>
              </div>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed mb-6">
              Premier legal representation for Southern California. We combine modern legal tech with traditional advocacy to win for our clients.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-slate-400 hover:text-white transition-colors"><Linkedin className="w-5 h-5" /></a>
              <a href="#" className="text-slate-400 hover:text-white transition-colors"><Twitter className="w-5 h-5" /></a>
              <a href="#" className="text-slate-400 hover:text-white transition-colors"><Facebook className="w-5 h-5" /></a>
            </div>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6">Locations</h4>
            <ul className="space-y-3 text-slate-400 text-sm">
              <li>Inland Empire (Riverside)</li>
              <li>Orange County (Irvine)</li>
              <li>Los Angeles (Downtown)</li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6">Practice Areas</h4>
            <ul className="space-y-3 text-slate-400 text-sm">
              <li><a href="#" className="hover:text-brand-gold">Personal Injury</a></li>
              <li><a href="#" className="hover:text-brand-gold">Employment Law</a></li>
              <li><a href="#" className="hover:text-brand-gold">Business Litigation</a></li>
              <li><a href="#" className="hover:text-brand-gold">Real Estate</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6">Legal</h4>
            <ul className="space-y-3 text-slate-400 text-sm">
              <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white">Terms of Service</a></li>
              <li><a href="#" className="hover:text-white">Disclaimer</a></li>
              <li><a href="#" className="hover:text-white">Attorney Advertising</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-brand-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} Western Pacific Counsel. All rights reserved.</p>
          <p>Designed for the Modern Era.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;