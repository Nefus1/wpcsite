import React, { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Services from './components/Services';
import Team from './components/Team';
import ContactForm from './components/ContactForm';
import Footer from './components/Footer';
import AIConsultant from './components/AIConsultant';
import { Section } from './types';

function App() {
  const [formMessage, setFormMessage] = useState('');

  const scrollToSection = (section: Section) => {
    const element = document.getElementById(section === Section.HOME ? 'root' : section);
    if (element) {
      // Offset for sticky header
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: section === Section.HOME ? 0 : offsetPosition,
        behavior: "smooth"
      });
    }
  };

  const handleTransferChat = (summary: string) => {
    setFormMessage(summary);
    scrollToSection(Section.CONTACT);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-brand-900">
      <Header scrollToSection={scrollToSection} />
      
      <main>
        <div id="home">
          <Hero scrollToSection={scrollToSection} />
        </div>
        
        <Services />
        
        {/* Modern "Why Us" Break Section */}
        <section className="py-20 bg-brand-gold text-brand-900 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-12 opacity-10">
            <svg width="200" height="200" viewBox="0 0 24 24" fill="currentColor">
               <path d="M12 2L2 22H22L12 2ZM12 6L18 18H6L12 6Z"/>
            </svg>
          </div>
          <div className="container mx-auto px-6 relative z-10 text-center">
             <h2 className="text-3xl md:text-5xl font-serif font-bold mb-6">"Justice is not a concept. It's a result."</h2>
             <p className="text-lg font-medium opacity-80 max-w-2xl mx-auto">
               We don't just bill hours. We solve problems. Serving clients in Riverside, San Bernardino, Orange, and Los Angeles Counties with unyielding dedication.
             </p>
          </div>
        </section>

        <Team />
        
        <ContactForm initialMessage={formMessage} />
      </main>

      <Footer />
      
      <AIConsultant onTransferToForm={handleTransferChat} />
    </div>
  );
}

export default App;