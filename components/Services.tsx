import React from 'react';
import { Scale, Briefcase, Scroll, Shield, Users, Building, ChevronRight } from 'lucide-react';
import { Service } from '../types';

const services: Service[] = [
  {
    id: 'pi',
    title: 'Personal Injury',
    description: 'Relentless advocacy for those injured by negligence. From auto accidents to catastrophic injuries, we secure the compensation you deserve.',
    icon: 'Shield'
  },
  {
    id: 'employment',
    title: 'Employment Law',
    description: 'Protecting workers across California. Wrongful termination, discrimination, wage theft, and harassment cases handled with discretion and power.',
    icon: 'Users'
  },
  {
    id: 'estate',
    title: 'Estate Planning',
    description: 'Securing your legacy for generations. Trusts, wills, and comprehensive estate strategies tailored to high-net-worth individuals.',
    icon: 'Scroll'
  },
  {
    id: 'business',
    title: 'Business Litigation',
    description: 'Strategic counsel for complex commercial disputes. Contract breaches, partnership disputes, and intellectual property defense.',
    icon: 'Briefcase'
  },
  {
    id: 'realestate',
    title: 'Real Estate Law',
    description: 'Navigating the complex Southern California property market. Disputes, transactions, and zoning issues resolved efficiently.',
    icon: 'Building'
  },
  {
    id: 'defense',
    title: 'Civil Defense',
    description: 'Protecting businesses and individuals from frivolous lawsuits with aggressive and calculated defense strategies.',
    icon: 'Scale'
  }
];

const IconMap: Record<string, React.FC<any>> = {
  Scale, Briefcase, Scroll, Shield, Users, Building
};

const Services: React.FC = () => {
  return (
    <section id="practice-areas" className="py-24 bg-brand-900 relative">
      {/* Decorative Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_70%)] pointer-events-none"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-brand-gold font-bold tracking-widest text-sm uppercase mb-3">Our Expertise</h2>
          <h3 className="font-serif text-3xl md:text-5xl text-white font-bold">Practice Areas</h3>
          <div className="w-24 h-1 bg-brand-gold mx-auto mt-6 rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => {
            const Icon = IconMap[service.icon];
            return (
              <div 
                key={service.id}
                className="group relative p-8 rounded-2xl bg-brand-800 border border-brand-700 hover:border-brand-gold/50 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-brand-gold/5 rounded-bl-full -mr-8 -mt-8 transition-all group-hover:bg-brand-gold/10"></div>
                
                <div className="w-14 h-14 bg-brand-900 rounded-xl flex items-center justify-center border border-brand-700 mb-6 text-brand-gold group-hover:scale-110 transition-transform duration-300">
                  <Icon className="w-7 h-7" />
                </div>
                
                <h4 className="text-2xl font-serif font-bold text-white mb-4">{service.title}</h4>
                <p className="text-slate-400 mb-6 leading-relaxed">
                  {service.description}
                </p>
                
                <a href="#contact" className="inline-flex items-center text-brand-gold font-semibold text-sm group-hover:gap-2 transition-all">
                  Consult an Attorney <ChevronRight className="w-4 h-4 ml-1" />
                </a>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;