import React, { useState, useEffect, useRef } from 'react';
import { Mail, Phone, MapPin, CheckCircle2, Sparkles } from 'lucide-react';

interface ContactFormProps {
  initialMessage?: string;
}

const ContactForm: React.FC<ContactFormProps> = ({ initialMessage = '' }) => {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');
  const [isAiPrefilled, setIsAiPrefilled] = useState(false);
  const messageRef = useRef<HTMLTextAreaElement>(null);

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
      setIsAiPrefilled(true);
      
      // Highlight the pre-filled field briefly
      if (messageRef.current) {
        messageRef.current.focus();
        setTimeout(() => setIsAiPrefilled(false), 3000);
      }
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
    <section id="contact" className="py-24 bg-slate-100 relative overflow-hidden">
      {/* Background patterns */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-brand-gold/5 -skew-x-12 transform origin-top-right"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="bg-white rounded-[2rem] shadow-2xl overflow-hidden flex flex-col lg:flex-row border border-slate-200">
          
          {/* Info Side */}
          <div className="lg:w-2/5 bg-brand-900 p-12 text-white relative flex flex-col justify-between">
            <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
            
            <div className="relative z-10">
              <h3 className="font-serif text-4xl font-bold mb-6 text-white leading-tight">Start Your <br/><span className="text-brand-gold">Consultation</span></h3>
              <p className="text-slate-300 mb-12 text-lg font-light">
                Facing a legal challenge? Contact us today for a confidential consultation. We operate across Southern California with relentless dedication.
              </p>
              
              <div className="space-y-8">
                <div className="flex items-start gap-5">
                  <div className="p-3.5 bg-brand-800/80 rounded-2xl text-brand-gold border border-brand-700 shadow-lg">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <h5 className="font-bold text-lg text-white">Direct Line</h5>
                    <p className="text-slate-400 mt-1 text-lg">(909) 555-0123</p>
                    <p className="text-xs text-brand-gold/60 mt-1 font-bold uppercase tracking-wider">Mon-Fri, 8am-6pm PST</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-5">
                  <div className="p-3.5 bg-brand-800/80 rounded-2xl text-brand-gold border border-brand-700 shadow-lg">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <h5 className="font-bold text-lg text-white">Direct Email</h5>
                    <p className="text-slate-400 mt-1 text-lg">intake@wpcounsel.com</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-5">
                  <div className="p-3.5 bg-brand-800/80 rounded-2xl text-brand-gold border border-brand-700 shadow-lg">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <h5 className="font-bold text-lg text-white">Main Office</h5>
                    <p className="text-slate-400 mt-1 text-lg leading-relaxed">
                      123 Business Center Dr,<br/>
                      Irvine, CA 92618
                    </p>
                    <p className="text-xs text-brand-gold mt-2 font-bold uppercase tracking-widest">Serving IE • LA • OC</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative z-10 mt-16 pt-8 border-t border-brand-800">
               <p className="text-xs text-slate-500 italic leading-relaxed">
                 * Submission of this form does not establish an attorney-client relationship. Information provided is subject to our privacy policy.
               </p>
            </div>
          </div>

          {/* Form Side */}
          <div className="lg:w-3/5 p-12 bg-white">
            {status === 'success' ? (
              <div className="h-full flex flex-col items-center justify-center text-center animate-fade-in-up">
                <div className="w-24 h-24 bg-green-50 text-green-600 rounded-full flex items-center justify-center mb-8 shadow-xl shadow-green-100">
                  <CheckCircle2 className="w-12 h-12" />
                </div>
                <h3 className="text-4xl font-serif font-bold text-brand-900 mb-4">Request Received</h3>
                <p className="text-slate-600 text-lg max-w-md leading-relaxed">
                  Thank you for trusting Western Pacific Counsel. Our specialized intake team is reviewing your case now. Expect a call within 24 business hours.
                </p>
                <button 
                  onClick={() => setStatus('idle')}
                  className="mt-10 px-8 py-3 bg-brand-900 text-white font-bold rounded-xl hover:bg-brand-800 transition-all shadow-lg"
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8">
                <div>
                  <div className="inline-block px-3 py-1 rounded-full bg-slate-100 text-brand-gold text-xs font-bold uppercase tracking-widest mb-4">Secured Intake Form</div>
                  <h3 className="text-3xl font-bold text-brand-900 mb-2">Free Case Evaluation</h3>
                  <p className="text-slate-500">Provide your details and we will contact you shortly.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-brand-900 uppercase tracking-widest">First Name</label>
                    <input 
                      type="text" 
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      required 
                      className="w-full px-5 py-4 rounded-2xl border border-slate-200 focus:border-brand-gold focus:ring-4 focus:ring-brand-gold/10 outline-none transition-all bg-slate-50 font-medium" 
                      placeholder="Jane"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-brand-900 uppercase tracking-widest">Last Name</label>
                    <input 
                      type="text" 
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      required 
                      className="w-full px-5 py-4 rounded-2xl border border-slate-200 focus:border-brand-gold focus:ring-4 focus:ring-brand-gold/10 outline-none transition-all bg-slate-50 font-medium" 
                      placeholder="Doe"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-brand-900 uppercase tracking-widest">Email Address</label>
                    <input 
                      type="email" 
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required 
                      className="w-full px-5 py-4 rounded-2xl border border-slate-200 focus:border-brand-gold focus:ring-4 focus:ring-brand-gold/10 outline-none transition-all bg-slate-50 font-medium" 
                      placeholder="jane@example.com"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-brand-900 uppercase tracking-widest">Practice Area</label>
                    <select 
                      name="caseType"
                      value={formData.caseType}
                      onChange={handleInputChange}
                      className="w-full px-5 py-4 rounded-2xl border border-slate-200 focus:border-brand-gold focus:ring-4 focus:ring-brand-gold/10 outline-none transition-all bg-slate-50 text-slate-700 font-medium"
                    >
                      <option value="">Select a category...</option>
                      <option value="pi">Personal Injury</option>
                      <option value="employment">Employment Law</option>
                      <option value="estate">Estate Planning</option>
                      <option value="business">Business Litigation</option>
                      <option value="other">General Inquiry</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2 relative">
                  <label className="text-xs font-bold text-brand-900 uppercase tracking-widest flex items-center justify-between">
                    Case Summary
                    {isAiPrefilled && (
                      <span className="flex items-center gap-1 text-brand-gold animate-pulse normal-case font-bold">
                        <Sparkles className="w-3 h-3" />
                        Summarized by AI
                      </span>
                    )}
                  </label>
                  <textarea 
                    ref={messageRef}
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={6} 
                    required 
                    className={`w-full px-5 py-4 rounded-2xl border outline-none transition-all bg-slate-50 resize-none font-medium ${
                      isAiPrefilled 
                        ? 'border-brand-gold ring-4 ring-brand-gold/10' 
                        : 'border-slate-200 focus:border-brand-gold focus:ring-4 focus:ring-brand-gold/10'
                    }`}
                    placeholder="Tell us about your legal matter..."
                  ></textarea>
                </div>

                <button 
                  type="submit" 
                  disabled={status === 'submitting'}
                  className="w-full py-5 bg-brand-900 text-white font-bold text-lg rounded-2xl hover:bg-brand-800 transition-all flex items-center justify-center gap-3 shadow-xl hover:shadow-brand-900/20 active:scale-[0.99] disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {status === 'submitting' ? 'Processing Secure Intake...' : 'Submit Case Evaluation'}
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