import React from 'react';
import { PageId } from '../types';
import { FileText, Mail, Phone, MapPin, Globe, ExternalLink, ShieldCheck, Heart } from 'lucide-react';

interface FooterProps {
  onNavigate: (page: PageId) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="sm-footer bg-[#020b2b] text-white pt-16 pb-12 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-white/10">
          
          {/* Column 1 & 2: Brand & Mission */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-[#FAC775] flex items-center justify-center text-[#051650] font-bold text-sm tracking-tighter">
                S
              </div>
              <span className="text-2xl font-bold tracking-tight font-serif-heading text-white">
                SAMIN
              </span>
            </div>
            <p className="text-stone-300 text-sm leading-relaxed max-w-sm">
              Southern Africa Migration Network (SAMIN) is a regional civil society network founded in 2019. We advocate for the human dignity, legal protection, and socio-economic inclusion of refugees, asylum seekers, and migrants across Southern Africa.
            </p>
            <div className="pt-2 flex items-center gap-2 text-xs text-[#FAC775]">
              <ShieldCheck className="w-4 h-4 text-[#FAC775] shrink-0" />
              <span>Advancing the African Union Free Movement Agenda</span>
            </div>
          </div>

          {/* Column 3: Navigation */}
          <div>
            <h4 className="text-xs uppercase tracking-widest font-semibold text-[#FAC775] mb-4">
              Explore Network
            </h4>
            <ul className="space-y-2.5 text-sm text-stone-300">
              <li>
                <button
                  onClick={() => onNavigate('home')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Home (The Journey)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('challenges')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Challenges of Migrants
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('advocacy')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Advocacy Measures
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('about')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  About SAMIN
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('blog')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Policy Blog & Stories
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('newsletters')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Quarterly Newsletters
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Policy Brief Downloads */}
          <div>
            <h4 className="text-xs uppercase tracking-widest font-semibold text-[#FAC775] mb-4">
              Policy Briefs
            </h4>
            <div className="space-y-3 text-xs">
              <button
                onClick={() => onNavigate('policy-brief')}
                className="w-full text-left p-2.5 rounded-lg bg-white/5 border border-white/10 hover:border-[#FAC775]/50 transition-colors cursor-pointer group"
              >
                <div className="flex items-center justify-between text-white font-medium mb-1">
                  <span className="flex items-center gap-1.5">
                    <FileText className="w-3.5 h-3.5 text-[#FAC775]" />
                    <span>Policy Brief (English)</span>
                  </span>
                  <span className="text-[10px] text-stone-400">3.8 MB</span>
                </div>
                <p className="text-[11px] text-stone-400">
                  Advancing Humane Migration Governance in SADC
                </p>
              </button>

              <button
                onClick={() => onNavigate('policy-brief')}
                className="w-full text-left p-2.5 rounded-lg bg-white/5 border border-white/10 hover:border-[#FAC775]/50 transition-colors cursor-pointer group"
              >
                <div className="flex items-center justify-between text-white font-medium mb-1">
                  <span className="flex items-center gap-1.5">
                    <FileText className="w-3.5 h-3.5 text-[#FAC775]" />
                    <span>Note Stratégique (Français)</span>
                  </span>
                  <span className="text-[10px] text-stone-400">4.1 MB</span>
                </div>
                <p className="text-[11px] text-stone-400">
                  Gouvernance Humaniste des Migrations en Afrique Australe
                </p>
              </button>
            </div>
          </div>

          {/* Column 5: Secretariat & Contact */}
          <div>
            <h4 className="text-xs uppercase tracking-widest font-semibold text-[#FAC775] mb-4">
              Regional Secretariat
            </h4>
            <div className="space-y-3 text-xs text-stone-300">
              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#FAC775] shrink-0 mt-0.5" />
                <span>6 Spin Street, IDASA Building, Cape Town, 8001, South Africa</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#FAC775] shrink-0" />
                <a href="tel:+27214616551" className="hover:text-white transition-colors">
                  +27 21 461 6551
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#FAC775] shrink-0" />
                <a href="mailto:secretariat@samin.org.za" className="hover:text-white transition-colors">
                  secretariat@samin.org.za
                </a>
              </div>
              <div className="pt-2">
                <button
                  onClick={() => onNavigate('contact')}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#FAC775] text-[#051650] font-semibold text-xs hover:bg-[#f5b952] transition-colors cursor-pointer"
                >
                  <span>Open Contact Desk</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Partners & Solidarity Acknowledgement */}
        <div className="py-8 border-b border-white/10 flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-stone-400">
          <div className="flex items-center gap-2 text-stone-300">
            <span className="text-[11px] uppercase tracking-wider text-stone-400">Institutional Partners:</span>
          </div>
          <div className="flex flex-wrap items-center gap-6 sm:gap-10">
            {/* Bread for the World */}
            <div className="flex items-center gap-2 px-3 py-1.5 rounded bg-white/5 border border-white/10">
              <div className="w-2 h-2 rounded-full bg-[#FAC775]" />
              <span className="font-serif text-white tracking-wide font-medium">Bread for the World</span>
              <span className="text-[10px] text-stone-400">(Brot für die Welt)</span>
            </div>
            {/* Terre Solidaire */}
            <div className="flex items-center gap-2 px-3 py-1.5 rounded bg-white/5 border border-white/10">
              <div className="w-2 h-2 rounded-full bg-[#FAC775]" />
              <span className="font-serif text-white tracking-wide font-medium">CCFD-Terre Solidaire</span>
              <span className="text-[10px] text-stone-400">(France)</span>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Accessibility */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-400">
          <p>© 2019–2026 Southern Africa Migration Network (SAMIN). Registered Non-Profit Network.</p>
          <div className="flex items-center gap-4 text-stone-400">
            <span>Dignity · Solidarity · Human Rights</span>
            <span>·</span>
            <span>Cape Town & Regional Focal Points</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
