import React, { useState } from 'react';
import { PageId } from '../types';
import { 
  Scale, 
  FileCheck2, 
  Users2, 
  Tv, 
  Globe2, 
  Award, 
  ArrowRight,
  ExternalLink,
  ChevronRight
} from 'lucide-react';

interface AdvocacyPageProps {
  onNavigate: (page: PageId) => void;
}

export const AdvocacyPage: React.FC<AdvocacyPageProps> = ({ onNavigate }) => {
  const [selectedPillar, setSelectedPillar] = useState(0);

  const pillars = [
    {
      id: 'parliamentary',
      icon: Scale,
      title: 'Parliamentary Submissions & Law Reform',
      tagline: 'Translating human rights treaties into binding national statutes',
      description: 'SAMIN drafts and presents comprehensive evidence-based submissions to national portfolio committees on home affairs, justice, and labour. We scrutinize pending immigration amendments, ensuring alignment with the SADC Protocol on the Facilitation of Movement of Persons and the AU Free Movement Protocol.',
      deliverables: [
        'Submission on the Draft White Paper on Citizenship, Immigration and Refugee Protection',
        'Model municipal by-law frameworks for informal trader regularisation',
        'Bi-annual human rights compliance audit of regional border facilities'
      ]
    },
    {
      id: 'litigation',
      icon: FileCheck2,
      title: 'Strategic Litigation & Constitutional Defense',
      tagline: 'Setting binding legal precedents through high-impact jurisprudence',
      description: 'In collaboration with pro-bono university law clinics and public interest litigation centers, SAMIN coordinates landmark court challenges. Our legal docket focuses on unconstitutional administrative detentions, access to pediatric healthcare, and birth certificate registration for children born to refugee parents.',
      deliverables: [
        'Constitutional Court interventions on right to basic education for undocumented learners',
        'Appellate interdicts against unlawful administrative deportations without tribunal review',
        'Network of 18 rapid-response volunteer paralegals across major metropolitan hubs'
      ]
    },
    {
      id: 'community',
      icon: Users2,
      title: 'Inter-Community Peace & Solidarity Forums',
      tagline: 'Building organic neighborhood resilience against xenophobic incitement',
      description: 'Prejudice thrives in the absence of authentic contact. SAMIN facilitates monthly community dialogue circles that bring together local civic ratepayer associations, informal trader leadership, faith-based leaders, and migrant representatives to address grievances cooperatively.',
      deliverables: [
        'Active municipal peace pacts signed in Gauteng, KwaZulu-Natal, and Western Cape',
        'Youth sports and cultural exchange tournaments fostering cross-border fraternity',
        'Early-warning civic hotlines to defuse municipal rumors before violence escalates'
      ]
    },
    {
      id: 'media',
      icon: Tv,
      title: 'Media Advocacy & Ethical Journalism Training',
      tagline: 'Dismantling toxic rhetoric through dignified, human-centered narratives',
      description: 'Sensational headlines catalyze real-world violence. SAMIN conducts dedicated workshops for regional print, broadcast, and digital journalists, providing ethical reporting guidelines, correct statistical context, and access to authentic migrant source voices.',
      deliverables: [
        'Southern Africa Ethical Migration Reporting Guide published in English and French',
        'Fact-checking partnership exposing viral anti-migrant social media disinformation',
        'Annual media awards honoring nuanced, investigative reporting on regional mobility'
      ]
    },
    {
      id: 'coalition',
      icon: Globe2,
      title: 'Regional Coalition & SADC Civil Society Solidarity',
      tagline: 'Uniting grassroots voices across 11 Southern African nations',
      description: 'Migration is inherently transnational and cannot be resolved by isolated domestic actions. SAMIN convenes civil society partners from South Africa, Zimbabwe, Mozambique, DR Congo, Zambia, Botswana, and Malawi to speak with one unified, authoritative voice at regional summits.',
      deliverables: [
        'SAMIN Annual Policy Conference and ministerial communique series',
        'Cross-border referral mechanisms for vulnerable families and unaccompanied minors',
        'Joint advocacy delegations to the SADC Parliamentary Forum and African Union Organs'
      ]
    }
  ];

  return (
    <div className="w-full bg-[#F2F2F2] text-[#051650] pt-24 pb-20">
      
      {/* Hero */}
      <section className="sm-advocacy-hero max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-16 text-center">
        <span className="text-xs uppercase tracking-widest text-[#051650] font-bold">
          Strategic Action · Regional Impact
        </span>
        <h1 className="text-4xl sm:text-6xl font-serif-heading font-bold tracking-tight text-[#051650] mt-3 mb-6 text-balance">
          Advocacy Measures for Migrants
        </h1>
        <p className="text-base sm:text-lg text-stone-600 max-w-3xl mx-auto leading-relaxed text-balance">
          SAMIN deploys a multi-tiered advocacy strategy: intervening at high-level SADC ministerial summits while simultaneously defending human rights in courtroom docks and urban community halls.
        </p>
      </section>

      {/* Interactive Pillar Explorer */}
      <section className="sm-advocacy-pillars max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Pillar Selector Sidebar */}
          <div className="lg:col-span-5 space-y-3">
            <h3 className="text-xs uppercase font-bold tracking-widest text-stone-500 mb-4 px-2">
              The 5 Advocacy Pillars
            </h3>
            {pillars.map((p, idx) => {
              const Icon = p.icon;
              const isSelected = selectedPillar === idx;
              return (
                <button
                  key={p.id}
                  onClick={() => setSelectedPillar(idx)}
                  className={`w-full text-left p-4 rounded-xl border transition-all flex items-center justify-between cursor-pointer ${
                    isSelected
                      ? 'bg-[#051650] text-white border-[#051650] shadow-md'
                      : 'bg-white text-stone-800 border-stone-200 hover:border-stone-300 hover:bg-stone-50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${isSelected ? 'bg-white/10 text-[#FAC775]' : 'bg-stone-100 text-[#051650]'}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold font-serif-heading">{p.title}</h4>
                      <p className={`text-[11px] truncate max-w-[220px] sm:max-w-xs ${isSelected ? 'text-stone-300' : 'text-stone-500'}`}>
                        {p.tagline}
                      </p>
                    </div>
                  </div>
                  <ChevronRight className={`w-4 h-4 shrink-0 ${isSelected ? 'text-[#FAC775]' : 'text-stone-400'}`} />
                </button>
              );
            })}
          </div>

          {/* Pillar Detail Pane */}
          <div className="lg:col-span-7 bg-white rounded-2xl border border-stone-200 p-8 sm:p-10 shadow-sm min-h-[440px] flex flex-col justify-between">
            {(() => {
              const p = pillars[selectedPillar];
              const Icon = p.icon;
              return (
                <div className="space-y-6">
                  <div className="flex items-center gap-3">
                    <div className="p-3 rounded-xl bg-[#051650] text-[#FAC775]">
                      <Icon className="w-6 h-6" />
                    </div>
                    <div>
                      <span className="text-xs font-mono font-semibold text-[#0A2275]">
                        Pillar 0{selectedPillar + 1}
                      </span>
                      <h2 className="text-2xl sm:text-3xl font-bold font-serif-heading text-[#051650]">
                        {p.title}
                      </h2>
                    </div>
                  </div>

                  <p className="text-sm text-[#0A2275] font-medium italic">
                    "{p.tagline}"
                  </p>

                  <p className="text-sm text-stone-600 leading-relaxed">
                    {p.description}
                  </p>

                  <div className="pt-4 border-t border-stone-100 space-y-3">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-[#051650]">
                      Concrete Deliverables & Key Outcomes:
                    </h4>
                    <ul className="space-y-2">
                      {p.deliverables.map((item, dIdx) => (
                        <li key={dIdx} className="flex items-start gap-2 text-xs text-stone-700">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#FAC775] mt-1.5 shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })()}

            <div className="pt-8 border-t border-stone-100 flex flex-wrap items-center justify-between gap-4">
              <span className="text-xs text-stone-500">
                Want to collaborate on this pillar?
              </span>
              <button
                onClick={() => onNavigate('contact')}
                className="px-5 py-2 rounded-full text-xs font-semibold bg-[#FAC775] text-[#051650] hover:bg-[#f5b952] transition-colors cursor-pointer"
              >
                Connect with Secretariat
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* The Boksburg Declaration Banner */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="bg-[#020b2b] text-white p-8 sm:p-12 rounded-3xl border border-[#FAC775]/20 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-3 max-w-xl">
            <span className="text-xs font-bold uppercase tracking-widest text-[#FAC775]">
              Regional Consensus
            </span>
            <h3 className="text-2xl sm:text-3xl font-serif-heading font-bold text-white">
              The Boksburg Declaration Roadmap
            </h3>
            <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
              Adopted in October 2025 during the 6th Annual Policy Conference, this historic framework binds participating civil society networks to a five-year monitoring mechanism on regional free movement and human rights protection.
            </p>
          </div>

          <button
            onClick={() => onNavigate('policy-brief')}
            className="shrink-0 px-6 py-3 rounded-full text-xs sm:text-sm font-semibold bg-[#FAC775] text-[#051650] hover:bg-[#f5b952] transition-colors cursor-pointer flex items-center gap-2"
          >
            <span>Download Policy Brief</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>

    </div>
  );
};
