import React from 'react';
import { PageId } from '../types';
import { CONFERENCE_IMAGE } from '../data/content';
import { 
  Building2, 
  Target, 
  Compass, 
  Users, 
  MapPin, 
  Calendar, 
  ShieldCheck, 
  HeartHandshake, 
  ArrowRight 
} from 'lucide-react';

interface AboutPageProps {
  onNavigate: (page: PageId) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
  const milestones = [
    {
      year: '2019',
      title: 'Foundation in Cape Town',
      description: 'Established by civil society delegates from South Africa, Zimbabwe, and the DRC in response to rising regional xenophobia and fragmented border regulations.'
    },
    {
      year: '2021',
      title: 'Emergency Pandemic Defense Network',
      description: 'Mobilised essential food relief, emergency healthcare access, and legal interdicts preventing evictions of unbanked migrant families during COVID-19 lockdowns.'
    },
    {
      year: '2023',
      title: 'Regional Paralegal Cohort Launch',
      description: 'Accredited over 60 grassroots community paralegals across transit nodes in Musina, Beitbridge, Johannesburg, Durban, and Cape Town.'
    },
    {
      year: '2025',
      title: 'The Boksburg Declaration',
      description: 'Convened the 6th Annual Policy Conference (21–22 Oct 2025), securing unanimous consensus on the SADC Civil Society Free Movement Roadmap.'
    }
  ];

  const values = [
    {
      icon: ShieldCheck,
      title: 'Inviolable Human Dignity',
      desc: 'We uphold the principle that human rights do not expire at border posts, and no human being can be defined by an administrative label.'
    },
    {
      icon: HeartHandshake,
      title: 'Pan-African Solidarity',
      desc: 'We reject artificial colonial divisions, recognizing our shared cultural, economic, and historical destiny across the Southern African region.'
    },
    {
      icon: Target,
      title: 'Evidence-Based Advocacy',
      desc: 'We counter populist xenophobic falsehoods with rigorous macroeconomic research, empirical field audits, and documented jurisprudence.'
    },
    {
      icon: Users,
      title: 'Grassroots Leadership',
      desc: 'SAMIN serves as a supportive guide and facilitator—migrant communities themselves lead our strategic priorities and campaign design.'
    }
  ];

  return (
    <div className="w-full bg-[#F2F2F2] text-[#051650] pt-24 pb-20">
      
      {/* Hero */}
      <section className="sm-about-hero max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-16 text-center">
        <span className="text-xs uppercase tracking-widest text-[#051650] font-bold">
          Our Story & Purpose · Founded 2019
        </span>
        <h1 className="text-4xl sm:text-6xl font-serif-heading font-bold tracking-tight text-[#051650] mt-3 mb-6 text-balance">
          About SAMIN
        </h1>
        <p className="text-base sm:text-lg text-stone-600 max-w-3xl mx-auto leading-relaxed text-balance">
          Southern Africa Migration Network (SAMIN) unites grassroots community organizations, human rights lawyers, researchers, and faith-based movements into an unstoppable regional coalition for migrant inclusion.
        </p>
      </section>

      {/* Featured Narrative & Visual */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
        <div className="bg-white rounded-3xl border border-stone-200 overflow-hidden shadow-sm grid grid-cols-1 lg:grid-cols-12">
          
          <div className="lg:col-span-7 p-8 sm:p-12 space-y-6 flex flex-col justify-center">
            <span className="text-xs font-mono text-[#0A2275] font-semibold">
              The Guiding Philosophy
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif-heading font-bold text-[#051650]">
              The Guide in the Story, Not the Hero
            </h2>
            <p className="text-sm text-stone-700 leading-relaxed">
              At SAMIN, we operate from a fundamental truth: the true heroes of Southern Africa’s migration story are the individuals who wake up before dawn to open small businesses, care for neighbors’ children, study under lamplight, and rebuild their lives far from home.
            </p>
            <p className="text-sm text-stone-700 leading-relaxed">
              SAMIN is the trusted guide. Founded in 2019, our network provides the legal defense, the policy bridge to regional governments, and the solidarity platforms that allow migrant agency to flourish unhindered.
            </p>
            <div className="pt-2 flex items-center gap-6 text-xs text-stone-600 border-t border-stone-100">
              <div>
                <p className="font-bold text-lg text-[#051650] font-mono">11</p>
                <p>SADC Nations Represented</p>
              </div>
              <div className="h-8 w-px bg-stone-200" />
              <div>
                <p className="font-bold text-lg text-[#051650] font-mono">2019</p>
                <p>Year of Regional Charter</p>
              </div>
              <div className="h-8 w-px bg-stone-200" />
              <div>
                <p className="font-bold text-lg text-[#051650] font-mono">Cape Town</p>
                <p>Secretariat Headquarters</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 relative bg-stone-100">
            <img
              src={CONFERENCE_IMAGE}
              alt="SAMIN delegates in discussion at regional conference"
              className="w-full h-full object-cover min-h-[320px]"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#051650]/80 via-transparent to-transparent flex items-end p-6">
              <p className="text-xs text-white italic">
                Delegates at the 6th Annual Policy Conference, Boksburg.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* Core Values Grid */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="text-xs uppercase tracking-widest text-[#051650] font-bold">
            Ethical Anchors
          </span>
          <h2 className="text-3xl font-serif-heading font-bold text-[#051650]">
            Our Core Values
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((v, i) => {
            const Icon = v.icon;
            return (
              <div key={i} className="bg-white rounded-2xl border border-stone-200 p-6 shadow-sm flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="w-10 h-10 rounded-xl bg-[#051650]/5 flex items-center justify-center text-[#051650]">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-bold font-serif-heading text-[#051650]">
                    {v.title}
                  </h3>
                  <p className="text-xs text-stone-600 leading-relaxed">
                    {v.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Historical Milestones */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="text-xs uppercase tracking-widest text-[#051650] font-bold">
            Historical Trajectory
          </span>
          <h2 className="text-3xl font-serif-heading font-bold text-[#051650]">
            Milestones of Resilience
          </h2>
        </div>

        <div className="relative border-l-2 border-[#FAC775] ml-4 sm:ml-32 space-y-12 pl-6 sm:pl-10">
          {milestones.map((m, idx) => (
            <div key={idx} className="relative group">
              {/* Year Marker on Left for Desktop */}
              <div className="sm:absolute sm:-left-40 sm:top-0 sm:w-28 sm:text-right mb-2 sm:mb-0">
                <span className="text-lg font-bold font-mono text-[#051650] bg-stone-100 sm:bg-transparent px-2.5 py-1 rounded">
                  {m.year}
                </span>
              </div>

              {/* Node Bullet */}
              <div className="absolute -left-[31px] sm:-left-[47px] top-1.5 w-4 h-4 rounded-full bg-[#051650] border-2 border-[#FAC775]" />

              <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-sm">
                <h3 className="text-lg font-bold font-serif-heading text-[#051650] mb-2">
                  {m.title}
                </h3>
                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                  {m.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Secretariat & Regional Governance */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="bg-[#051650] text-white rounded-3xl p-8 sm:p-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="space-y-4">
              <span className="text-xs uppercase tracking-widest text-[#FAC775] font-bold">
                Governance & Operations
              </span>
              <h3 className="text-2xl sm:text-3xl font-serif-heading font-bold text-white">
                The Cape Town Regional Secretariat
              </h3>
              <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
                Operating out of the historic IDASA Building in Cape Town, the SAMIN Secretariat coordinates regional policy research, liaises with institutional partners, and manages emergency legal aid distribution across SADC.
              </p>
              <div className="pt-2 text-xs text-stone-300 space-y-1.5">
                <p>📍 6 Spin Street, IDASA Building, Cape Town, South Africa</p>
                <p>✉️ secretariat@samin.org.za · 📞 +27 21 461 6551</p>
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-4">
              <h4 className="text-xs uppercase font-bold tracking-widest text-[#FAC775]">
                Institutional Supporters
              </h4>
              <p className="text-xs text-stone-300 leading-relaxed">
                Our advocacy operations are made possible through strategic partnerships with international human rights foundations and bilateral development organizations:
              </p>
              <div className="space-y-2 pt-1">
                <div className="p-3 rounded-lg bg-white/10 flex items-center justify-between text-xs">
                  <span className="font-semibold text-white">Bread for the World (Brot für die Welt)</span>
                  <span className="text-stone-400 text-[10px]">Germany</span>
                </div>
                <div className="p-3 rounded-lg bg-white/10 flex items-center justify-between text-xs">
                  <span className="font-semibold text-white">CCFD-Terre Solidaire</span>
                  <span className="text-stone-400 text-[10px]">France</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};
