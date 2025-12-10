import React from 'react';
import { Attorney } from '../types';

const attorneys: Attorney[] = [
  {
    id: '1',
    name: 'James R. Sterling',
    role: 'Founding Partner',
    bio: 'With over 25 years of litigation experience in Los Angeles and Orange County, James specializes in high-stakes corporate law and complex civil litigation.',
    imageUrl: 'https://picsum.photos/seed/lawyer1/400/500'
  },
  {
    id: '2',
    name: 'Elena Rodriguez',
    role: 'Senior Associate',
    bio: 'A rising star in the Inland Empire legal community, Elena leads our Personal Injury division with a track record of multi-million dollar settlements.',
    imageUrl: 'https://picsum.photos/seed/lawyer2/400/500'
  },
  {
    id: '3',
    name: 'Marcus Chen',
    role: 'Partner',
    bio: 'Specializing in Estate Planning and Wealth Management, Marcus helps families and business owners secure their future assets with precision.',
    imageUrl: 'https://picsum.photos/seed/lawyer3/400/500'
  }
];

const Team: React.FC = () => {
  return (
    <section id="attorneys" className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-brand-gold font-bold tracking-widest text-sm uppercase mb-3">The Team</h2>
          <h3 className="font-serif text-3xl md:text-5xl text-brand-900 font-bold">Meet Your Counsel</h3>
          <p className="mt-4 text-slate-600 max-w-2xl mx-auto">
            Experienced attorneys dedicated to providing aggressive representation and strategic advice across Southern California.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {attorneys.map((attorney) => (
            <div key={attorney.id} className="group">
              <div className="relative overflow-hidden rounded-2xl mb-6 shadow-xl aspect-[4/5]">
                <img 
                  src={attorney.imageUrl} 
                  alt={attorney.name} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 filter grayscale group-hover:grayscale-0"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-900/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                  <p className="text-white text-sm leading-relaxed translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-100">
                    "{attorney.bio}"
                  </p>
                </div>
              </div>
              <div className="text-center">
                <h4 className="text-2xl font-serif font-bold text-brand-900">{attorney.name}</h4>
                <p className="text-brand-gold font-medium uppercase tracking-wider text-sm mt-1">{attorney.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Team;