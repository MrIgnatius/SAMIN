import React, { useState } from 'react';
import { PageId } from '../types';
import { 
  FileWarning, 
  Ban, 
  Coins, 
  HeartHandshake, 
  ShieldAlert, 
  AlertCircle, 
  CheckCircle, 
  ArrowRight,
  ChevronDown
} from 'lucide-react';

interface ChallengesPageProps {
  onNavigate: (page: PageId) => void;
}

export const ChallengesPage: React.FC<ChallengesPageProps> = ({ onNavigate }) => {
  const [activeFaq, setActiveFaq] = useState<number | null>(0);

  const challenges = [
    {
      icon: FileWarning,
      tag: 'Administrative Barriers',
      title: 'Documentation Backlogs & Permit Expirations',
      description: 'Asylum seekers and long-term migrants frequently face systemic administrative backlogs in national departments of home affairs. Online portal outages, multi-year processing delays, and limited appointment slots leave lawful individuals vulnerable to sudden undocumented status without personal fault.',
      impact: 'Renders individuals vulnerable to unlawful arrests, prevents bank account maintenance, and blocks formal lease contracts.',
      remedy: 'Automated multi-year visa extensions, digital registry modernization, and regional biometric portability.'
    },
    {
      icon: Ban,
      tag: 'Social Exclusion',
      title: 'Xenophobic Scapegoating & Community Flashpoints',
      description: 'Migrants are routinely scapegoated for broader structural socio-economic deficits such as municipal service failures and youth unemployment. Sensationalized reporting and populist political rhetoric spark periodic violence and targeted extortion of informal spaza shops and artisan traders.',
      impact: 'Severe psychological trauma, loss of livelihoods, physical insecurity, and destruction of neighborhood social cohesion.',
      remedy: 'Inter-community mediation circles, ethical media monitoring, and active enforcement of hate crime legislation.'
    },
    {
      icon: Coins,
      tag: 'Economic Inequity',
      title: 'Financial Exclusion & Unbanked Livelihoods',
      description: 'Restrictive Know-Your-Customer (KYC) requirements implemented by commercial banks prevent holders of temporary asylum permits or informal work permits from opening transactional accounts. This forces billions of rands into high-risk informal cash economies and informal remittance couriers.',
      impact: 'High risk of cash robberies, inability to obtain business credit or insurance, and lost municipal tax revenue.',
      remedy: 'Tier-1 digital wallet exemptions, recognition of asylum documentation by financial regulators, and mobile banking corridors.'
    },
    {
      icon: HeartHandshake,
      tag: 'Public Services',
      title: 'Barriers to Healthcare & Primary Education',
      description: 'Despite constitutional protections guaranteeing basic education to every child and emergency medical treatment to all persons, local frontline hospital clerks and school principals regularly demand proof of citizenship, demanding upfront payments or turning children away from school gates.',
      impact: 'Denial of pediatric vaccinations, maternal care disruptions, and generational illiteracy among migrant youth.',
      remedy: 'Clear ministerial directives issued to clinic and school administrators, backed by direct paralegal school entry monitoring.'
    },
    {
      icon: ShieldAlert,
      tag: 'Due Process',
      title: 'Arbitrary Border Detentions & Deportations',
      description: 'Civil society monitors regularly document instances of administrative detention that exceed statutory time limits, inadequate access to legal representation at transit detention centers, and deportations executed before asylum appeal tribunals have concluded their review.',
      impact: 'Separation of families, detention of unaccompanied minors, and violations of the customary international law principle of non-refoulement.',
      remedy: 'Independent oversight access for human rights monitors, judicial review before expulsion, and community detention alternatives.'
    }
  ];

  const caseStudies = [
    {
      title: 'The Struggle for School Admission in Gauteng',
      context: 'Over 80 children of asylum seekers turned away over expired parent documentation.',
      action: 'SAMIN legal partners intervened with the provincial department of education, securing immediate admission directives based on constitutional jurisprudence.',
      outcome: '100% of the affected students were enrolled within three weeks of the strategic letter of demand.'
    },
    {
      title: 'Arbitrary Arrests During Municipal Raids',
      context: 'A joint municipal raid in an informal market resulted in the detention of 24 documented Congolese and Zimbabwean traders whose digital permit receipts were dismissed.',
      action: 'SAMIN volunteer paralegals provided physical documentation verification and filed emergency bail applications.',
      outcome: 'All 24 traders were released without charge, and municipal officers received compliance training on digital visa receipts.'
    }
  ];

  return (
    <div className="w-full bg-[#F2F2F2] text-[#051650] pt-24 pb-20">
      
      {/* Page Header */}
      <section className="sm-challenges-hero max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-16 text-center">
        <span className="text-xs uppercase tracking-widest text-[#051650] font-bold">
          Systemic Realities · Southern Africa
        </span>
        <h1 className="text-4xl sm:text-6xl font-serif-heading font-bold tracking-tight text-[#051650] mt-3 mb-6 text-balance">
          The Structural Challenges Facing Migrants
        </h1>
        <p className="text-base sm:text-lg text-stone-600 max-w-3xl mx-auto leading-relaxed text-balance">
          Refugees and migrants in Southern Africa encounter intersecting administrative, economic, and social hurdles that prevent them from fully contributing to their host communities. Understanding these barriers is the first step toward building systemic reform.
        </p>
      </section>

      {/* Main Challenges Stack */}
      <section className="sm-challenges-list max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
        <div className="space-y-8">
          {challenges.map((c, i) => {
            const Icon = c.icon;
            return (
              <div 
                key={i} 
                className="bg-white rounded-2xl border border-stone-200 p-8 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
                  
                  {/* Left Column: Title and Description */}
                  <div className="lg:w-7/12 space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2.5 rounded-xl bg-[#051650]/5 text-[#051650]">
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="text-xs font-semibold uppercase tracking-wider text-stone-500">
                        {c.tag}
                      </span>
                    </div>

                    <h3 className="text-2xl font-bold font-serif-heading text-[#051650]">
                      {c.title}
                    </h3>

                    <p className="text-sm text-stone-600 leading-relaxed">
                      {c.description}
                    </p>
                  </div>

                  {/* Right Column: Impact & SAMIN Remedy */}
                  <div className="lg:w-5/12 bg-stone-50 rounded-xl p-6 border border-stone-200 space-y-4">
                    <div>
                      <h4 className="text-xs uppercase font-bold tracking-wider text-red-900 flex items-center gap-1.5 mb-1.5">
                        <AlertCircle className="w-3.5 h-3.5 text-red-600" />
                        <span>Human Impact</span>
                      </h4>
                      <p className="text-xs text-stone-600 leading-relaxed">
                        {c.impact}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-stone-200">
                      <h4 className="text-xs uppercase font-bold tracking-wider text-[#051650] flex items-center gap-1.5 mb-1.5">
                        <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Policy Remedy Advocated</span>
                      </h4>
                      <p className="text-xs text-stone-700 font-medium leading-relaxed">
                        {c.remedy}
                      </p>
                    </div>
                  </div>

                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Real Groundwork Interventions (Case Studies) */}
      <section className="sm-challenges-cases max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
        <div className="mb-10 text-center max-w-2xl mx-auto">
          <span className="text-xs uppercase tracking-widest text-[#051650] font-bold">
            Frontline Documentation
          </span>
          <h2 className="text-3xl font-serif-heading font-bold text-[#051650] mt-1">
            Grassroots Intervention Case Studies
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {caseStudies.map((cs, idx) => (
            <div key={idx} className="bg-white rounded-2xl border border-stone-200 p-8 shadow-sm flex flex-col justify-between">
              <div className="space-y-4">
                <span className="text-xs font-mono text-[#0A2275] font-semibold">
                  Case 0{idx + 1}
                </span>
                <h3 className="text-xl font-bold font-serif-heading text-[#051650]">
                  {cs.title}
                </h3>
                <div className="space-y-2 text-xs text-stone-600">
                  <p><strong className="text-stone-800">The Context:</strong> {cs.context}</p>
                  <p><strong className="text-stone-800">SAMIN Legal Action:</strong> {cs.action}</p>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-stone-100 bg-[#FAC775]/10 rounded-xl p-3.5 border border-[#FAC775]/30">
                <p className="text-xs font-semibold text-[#051650]">
                  Resolution: {cs.outcome}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action to Advocacy Measures */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center bg-[#051650] text-white p-12 rounded-3xl shadow-xl">
        <h2 className="text-2xl sm:text-4xl font-serif-heading font-bold mb-4">
          Challenges Require Strategic Advocacy
        </h2>
        <p className="text-stone-300 text-sm max-w-xl mx-auto mb-8 leading-relaxed">
          Discover how SAMIN converts these systemic challenges into concrete policy submissions, court victories, and community peace pacts.
        </p>
        <button
          onClick={() => onNavigate('advocacy')}
          className="px-8 py-3.5 rounded-full text-xs sm:text-sm font-semibold bg-[#FAC775] text-[#051650] hover:bg-[#f5b952] transition-colors inline-flex items-center gap-2 cursor-pointer shadow-md"
        >
          <span>Explore SAMIN Advocacy Measures</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </section>

    </div>
  );
};
