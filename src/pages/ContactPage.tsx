import React, { useState } from 'react';
import { PageId } from '../types';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Send, 
  CheckCircle2, 
  ShieldAlert, 
  Globe, 
  ExternalLink 
} from 'lucide-react';

interface ContactPageProps {
  onNavigate: (page: PageId) => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({ onNavigate }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    subject: 'General Inquiry',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [referenceCode, setReferenceCode] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    // Generate realistic reference code
    const ref = `SAMIN-${Math.floor(100000 + Math.random() * 900000)}`;
    setReferenceCode(ref);
    setSubmitted(true);
  };

  const handleReset = () => {
    setFormData({
      name: '',
      phone: '',
      email: '',
      subject: 'General Inquiry',
      message: '',
    });
    setSubmitted(false);
  };

  return (
    <div className="w-full bg-[#F2F2F2] text-[#051650] pt-24 pb-20">
      
      {/* Header */}
      <section className="sm-contact-hero max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-16 text-center">
        <span className="text-xs uppercase tracking-widest text-[#051650] font-bold">
          Regional Secretariat & Contact Desk
        </span>
        <h1 className="text-4xl sm:text-6xl font-serif-heading font-bold tracking-tight text-[#051650] mt-3 mb-6">
          Contact SAMIN
        </h1>
        <p className="text-base sm:text-lg text-stone-600 max-w-2xl mx-auto leading-relaxed">
          Reach our Cape Town regional secretariat for policy inquiries, legal defense referrals, media commentary, or civil society coalition membership.
        </p>
      </section>

      {/* Main Grid: Form + Office Information */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Left Column: Interactive Contact Form */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-8 sm:p-10 border border-stone-200 shadow-sm">
            <h3 className="text-2xl font-serif-heading font-bold text-[#051650] mb-2">
              Send a Secure Message
            </h3>
            <p className="text-xs text-stone-500 mb-8">
              All communications are handled with strict institutional confidentiality by the secretariat.
            </p>

            {submitted ? (
              <div className="bg-[#051650] text-white p-8 rounded-2xl space-y-4 text-center animate-in fade-in duration-300">
                <div className="w-12 h-12 rounded-full bg-[#FAC775]/20 text-[#FAC775] flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h4 className="text-xl font-bold font-serif-heading text-white">
                  Message Dispatched Successfully
                </h4>
                <p className="text-xs text-stone-300 max-w-sm mx-auto leading-relaxed">
                  Thank you, {formData.name}. Your inquiry has been routed to the relevant secretariat desk. A duty officer will review your message within 24 business hours.
                </p>
                <div className="p-3 bg-white/10 rounded-xl max-w-xs mx-auto text-xs font-mono text-[#FAC775]">
                  Reference ID: {referenceCode}
                </div>
                <button
                  onClick={handleReset}
                  className="mt-4 px-6 py-2 rounded-full text-xs font-semibold bg-[#FAC775] text-[#051650] hover:bg-[#f5b952] transition-colors cursor-pointer"
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1.5">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Tendai Mthembu"
                      className="w-full px-4 py-3 rounded-xl bg-stone-50 border border-stone-200 text-xs text-stone-900 focus:outline-none focus:border-[#051650] focus:bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1.5">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="e.g. +27 71 234 5678"
                      className="w-full px-4 py-3 rounded-xl bg-stone-50 border border-stone-200 text-xs text-stone-900 focus:outline-none focus:border-[#051650] focus:bg-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1.5">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="name@organization.org"
                      className="w-full px-4 py-3 rounded-xl bg-stone-50 border border-stone-200 text-xs text-stone-900 focus:outline-none focus:border-[#051650] focus:bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1.5">
                      Inquiry Subject *
                    </label>
                    <select
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-stone-50 border border-stone-200 text-xs text-stone-900 focus:outline-none focus:border-[#051650] focus:bg-white"
                    >
                      <option value="General Inquiry">General Secretariat Inquiry</option>
                      <option value="Legal Aid Referral">Legal Aid & Documentation Support</option>
                      <option value="Policy Collaboration">Policy Research & SADC Reform</option>
                      <option value="Media & Press">Media & Press Interview Request</option>
                      <option value="Coalition Membership">Join SAMIN Regional Coalition</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1.5">
                    Message *
                  </label>
                  <textarea
                    required
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Please describe your inquiry, case context, or collaboration proposal in detail..."
                    className="w-full px-4 py-3 rounded-xl bg-stone-50 border border-stone-200 text-xs text-stone-900 focus:outline-none focus:border-[#051650] focus:bg-white resize-y"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full sm:w-auto px-8 py-3.5 rounded-full text-xs font-semibold bg-[#FAC775] text-[#051650] hover:bg-[#f5b952] active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm"
                  >
                    <span>Submit Inquiry</span>
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Right Column: Head Office & Official Coordinates */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Cape Town Head Office Card */}
            <div className="bg-[#051650] text-white rounded-3xl p-8 border border-stone-300 shadow-sm space-y-6">
              <span className="text-xs font-bold uppercase tracking-widest text-[#FAC775]">
                Head Office
              </span>
              <h3 className="text-2xl font-serif-heading font-bold text-white">
                Cape Town Regional Secretariat
              </h3>

              <div className="space-y-4 text-xs text-stone-200">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-[#FAC775] shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-white">Physical Address:</p>
                    <p className="text-stone-300 mt-0.5">
                      6 Spin Street, IDASA Building,
                      <br />
                      Cape Town, 8001,
                      <br />
                      South Africa
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-[#FAC775] shrink-0" />
                  <div>
                    <p className="font-semibold text-white">Telephone:</p>
                    <a href="tel:+27214616551" className="text-stone-300 hover:text-white transition-colors">
                      +27 21 461 6551
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-[#FAC775] shrink-0" />
                  <div>
                    <p className="font-semibold text-white">Official Secretariat Email:</p>
                    <a href="mailto:secretariat@samin.org.za" className="text-stone-300 hover:text-white transition-colors">
                      secretariat@samin.org.za
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Clock className="w-4 h-4 text-[#FAC775] shrink-0" />
                  <div>
                    <p className="font-semibold text-white">Secretariat Hours:</p>
                    <p className="text-stone-300">Monday – Friday: 08:30 – 16:30 (SAST)</p>
                  </div>
                </div>
              </div>

              {/* Social Channels */}
              <div className="pt-4 border-t border-white/10 space-y-2">
                <p className="text-[11px] uppercase tracking-wider text-stone-400 font-semibold">
                  Official Channels:
                </p>
                <div className="flex flex-wrap gap-2 text-xs">
                  <a
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noreferrer"
                    className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
                  >
                    LinkedIn
                  </a>
                  <a
                    href="https://twitter.com"
                    target="_blank"
                    rel="noreferrer"
                    className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
                  >
                    X / Twitter
                  </a>
                  <a
                    href="https://facebook.com"
                    target="_blank"
                    rel="noreferrer"
                    className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
                  >
                    Facebook
                  </a>
                  <a
                    href="https://youtube.com"
                    target="_blank"
                    rel="noreferrer"
                    className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
                  >
                    YouTube
                  </a>
                </div>
              </div>
            </div>

            {/* Emergency Hotline Notice */}
            <div className="bg-amber-50 rounded-2xl p-6 border border-amber-200 text-xs text-amber-950 space-y-2">
              <h4 className="font-bold flex items-center gap-1.5 text-amber-900">
                <ShieldAlert className="w-4 h-4 text-amber-700" />
                <span>Emergency Legal Assistance Protocol</span>
              </h4>
              <p className="leading-relaxed text-amber-800">
                If you or a community member are facing imminent unlawful administrative deportation or arbitrary detention, flag your inquiry subject as <strong>Legal Aid Referral</strong> for prioritized expedited dispatch to our regional duty attorneys.
              </p>
            </div>

          </div>

        </div>
      </section>

    </div>
  );
};
