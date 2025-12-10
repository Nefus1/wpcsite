import React, { useState, useEffect } from 'react';
import { Mail, Phone, MapPin, CheckCircle2 } from 'lucide-react';

interface ContactFormProps {
  initialMessage?: string;
}

const ContactForm: React.FC<ContactFormProps> = ({ initialMessage = '' }) => {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    caseType: '',
    message: ''
  });

  useEffect(() => {
    if (initialMessage) {
      setFormData(prev => ({ ...prev, message: initialMessage }));
    }
  }, [initialMessage]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    // Simulate API call
    setTimeout(() => {
      setStatus('success');
      setFormData({ firstName: '', lastName: '', email: '', caseType: '', message: '' });
    }, 1500);
  };

  return (
    <section id="contact" className="py-24 bg-slate-50 relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col lg:flex-row">
          
          {/* Info Side */}
          <div className="lg:w-2/5 bg-brand-900 p-12 text-white relative flex flex-col justify-between">
            <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
            
            <div className="relative z-10">
              <h3 className="font-serif text-3xl font-bold mb-6 text-white">Get in Touch</h3>
              <p className="text-slate-300 mb-12">
                Facing a legal challenge? Contact us today for a confidential consultation. We operate across Southern California.
              </p>
              
              <div className="space-y-8">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-brand-800 rounded-lg text-brand-gold">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <h5 className="font-semibold text-lg text-white">Phone</h5>
                    <p className="text-slate-400 mt-1">(909) 555-0123</p>
                    <p className="text-xs text-slate-500 mt-1">Mon-Fri, 8am-6pm PST</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-brand-800 rounded-lg text-brand-gold">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <h5 className="font-semibold text-lg text-white">Email</h5>
                    <p className="text-slate-400 mt-1">intake@wpcounsel.com</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-brand-800 rounded-lg text-brand-gold">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <h5 className="font-semibold text-lg text-white">Main Office</h5>
                    <p className="text-slate-400 mt-1">
                      123 Business Center Dr,<br/>
                      Irvine, CA 92618
                    </p>
                    <p className="text-xs text-brand-gold mt-2 font-medium">Serving IE • LA • OC</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative z-10 mt-12">
               <div className="h-px bg-brand-700 w-full mb-6"></div>
               <p className="text-xs text-slate-500">
                 By contacting us, you agree to our privacy policy. This form does not establish an attorney-client relationship.
               </p>
            </div>
          </div>

          {/* Form Side */}
          <div className="lg:w-3/5 p-12 bg-white">
            {status === 'success' ? (
              <div className="h-full flex flex-col items-center justify-center text-center animate-fade-in-up">
                <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="text-3xl font-serif font-bold text-brand-900 mb-4">Message Sent</h3>
                <p className="text-slate-600 max-w-md">
                  Thank you for reaching out to Western Pacific Counsel. Our intake team will review your information and get back to you within 24 hours.
                </p>
                <button 
                  onClick={() => setStatus('idle')}
                  className="mt-8 px-6 py-2 text-brand-gold font-semibold hover:underline"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <h3 className="text-2xl font-bold text-brand-900 mb-2">Free Case Evaluation</h3>
                  <p className="text-slate-500 mb-8">Fill out the form below to get started.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-brand-900">First Name</label>
                    <input 
                      type="text" 
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      required 
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-brand-gold focus:ring-1 focus:ring-brand-gold outline-none transition-all bg-slate-50" 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-brand-900">Last Name</label>
                    <input 
                      type="text" 
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      required 
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-brand-gold focus:ring-1 focus:ring-brand-gold outline-none transition-all bg-slate-50" 
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-brand-900">Email Address</label>
                  <input 
                    type="email" 
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required 
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-brand-gold focus:ring-1 focus:ring-brand-gold outline-none transition-all bg-slate-50" 
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-brand-900">Case Type</label>
                  <select 
                    name="caseType"
                    value={formData.caseType}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-brand-gold focus:ring-1 focus:ring-brand-gold outline-none transition-all bg-slate-50 text-slate-700"
                  >
                    <option value="">Select a practice area...</option>
                    <option value="pi">Personal Injury</option>
                    <option value="employment">Employment Law</option>
                    <option value="estate">Estate Planning</option>
                    <option value="business">Business Litigation</option>
                    <option value="realestate">Real Estate</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-brand-900">Message</label>
                  <textarea 
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={4} 
                    required 
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-brand-gold focus:ring-1 focus:ring-brand-gold outline-none transition-all bg-slate-50 resize-none"
                  ></textarea>
                </div>

                <button 
                  type="submit" 
                  disabled={status === 'submitting'}
                  className="w-full py-4 bg-brand-900 text-white font-bold rounded-xl hover:bg-brand-800 transition-all flex items-center justify-center gap-2 shadow-lg hover:shadow-xl disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {status === 'submitting' ? 'Sending...' : 'Submit Request'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;