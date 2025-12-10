import React, { useState, useEffect } from 'react';
import { Menu, X, Gavel } from 'lucide-react';
import { Section } from '../types';

interface HeaderProps {
  scrollToSection: (section: Section) => void;
}

const Header: React.FC<HeaderProps> = ({ scrollToSection }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Home', value: Section.HOME },
    { label: 'Practice Areas', value: Section.PRACTICE_AREAS },
    { label: 'Attorneys', value: Section.ATTORNEYS },
    { label: 'Contact', value: Section.CONTACT },
  ];

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled ? 'bg-brand-900/90 backdrop-blur-md shadow-lg py-3' : 'bg-transparent py-6'
      }`}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <div 
          onClick={() => scrollToSection(Section.HOME)} 
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="bg-brand-gold p-2 rounded-lg group-hover:bg-white transition-colors">
            <Gavel className="w-6 h-6 text-brand-900" />
          </div>
          <div className="leading-tight">
            <h1 className="font-serif text-xl font-bold text-white tracking-wide">WESTERN PACIFIC</h1>
            <p className="text-[10px] text-brand-gold uppercase tracking-[0.2em]">Counsel</p>
          </div>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <button
              key={item.label}
              onClick={() => scrollToSection(item.value)}
              className="text-sm font-medium text-slate-300 hover:text-white transition-colors uppercase tracking-wider relative group"
            >
              {item.label}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-brand-gold transition-all duration-300 group-hover:w-full"></span>
            </button>
          ))}
          <button 
            onClick={() => scrollToSection(Section.CONTACT)}
            className="px-5 py-2 bg-brand-gold text-brand-900 text-sm font-bold rounded-md hover:bg-yellow-500 transition-all shadow-md hover:shadow-lg"
          >
            Client Intake
          </button>
        </nav>

        {/* Mobile Menu Toggle */}
        <button 
          className="md:hidden text-white"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Nav */}
      <div className={`md:hidden absolute top-full left-0 right-0 bg-brand-900 border-t border-brand-800 transition-all duration-300 overflow-hidden ${mobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="flex flex-col p-6 space-y-4">
          {navItems.map((item) => (
            <button
              key={item.label}
              onClick={() => {
                scrollToSection(item.value);
                setMobileMenuOpen(false);
              }}
              className="text-left text-slate-300 hover:text-brand-gold text-lg font-medium"
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>
    </header>
  );
};

export default Header;