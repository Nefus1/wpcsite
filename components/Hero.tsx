import React from 'react';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { Section } from '../types';

interface HeroProps {
  scrollToSection: (section: Section) => void;
}

const Hero: React.FC<HeroProps> = ({ scrollToSection }) => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://picsum.photos/seed/legalarchitecture/1920/1080"
          alt="Modern Law Office Architecture"
          className="w-full h-full object-cover"
        />
        {/* Gradient Overlay for Text Readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-brand-900 via-brand-900/90 to-brand-900/40"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-brand-900 via-transparent to-transparent"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10 pt-20">
        <div className="max-w-4xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-800/50 border border-brand-700 backdrop-blur-sm mb-6 animate-fade-in-up">
            <span className="w-2 h-2 rounded-full bg-brand-gold"></span>
            <span className="text-sm font-medium text-slate-300 uppercase tracking-wider">Serving IE • LA • OC</span>
          </div>
          
          <h1 className="font-serif text-5xl md:text-7xl font-bold text-white mb-6 leading-tight drop-shadow-lg">
            Defending Your Legacy <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-gold to-yellow-200">
              Securing Your Future.
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-slate-300 mb-10 max-w-2xl font-light leading-relaxed">
            Western Pacific Counsel brings top-tier legal expertise to Southern California. Modern, aggressive, and dedicated to your success.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <button 
              onClick={() => scrollToSection(Section.CONTACT)}
              className="px-8 py-4 bg-brand-gold hover:bg-yellow-500 text-brand-900 font-bold rounded-lg transition-all transform hover:translate-y-[-2px] hover:shadow-lg flex items-center justify-center gap-2"
            >
              Free Case Evaluation
              <ArrowRight className="w-5 h-5" />
            </button>
            <button 
              onClick={() => scrollToSection(Section.PRACTICE_AREAS)}
              className="px-8 py-4 bg-transparent border border-white/20 hover:bg-white/10 text-white font-semibold rounded-lg backdrop-blur-sm transition-all flex items-center justify-center"
            >
              View Practice Areas
            </button>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce text-slate-400">
        <ChevronDown className="w-8 h-8" />
      </div>
    </section>
  );
};

export default Hero;