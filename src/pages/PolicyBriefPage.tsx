import React, { useState } from 'react';
import { PageId } from '../types';
import { POLICY_BRIEF } from '../data/content';
import { 
  FileText, 
  Download, 
  BookOpen, 
  CheckCircle, 
  Share2, 
  Globe2, 
  ShieldCheck, 
  ArrowRight,
  ExternalLink 
} from 'lucide-react';

interface PolicyBriefPageProps {
  onNavigate: (page: PageId) => void;
}

export const PolicyBriefPage: React.FC<PolicyBriefPageProps> = ({ onNavigate }) => {
  const [downloadNotice, setDownloadNotice] = useState<string | null>(null);

  const handleDownload = (lang: 'EN' | 'FR') => {
    const file = lang === 'EN' ? POLICY_BRIEF.enPdf : POLICY_BRIEF.frPdf;
    setDownloadNotice(`Downloading ${file.filename} (${file.size})...`);
    setTimeout(() => setDownloadNotice(null), 3500);
  };

  return (
    <div className="w-full bg-[#F2F2F2] text-[#051650] pt-24 pb-20">
      
      {/* Header */}
      <section className="sm-policy-hero max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-16 text-center">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#051650]/5 border border-[#051650]/15 text-xs text-[#051650] font-semibold mb-4">
          <BookOpen className="w-3.5 h-3.5 text-[#0A2275]" />
          <span>Regional Whitepaper Series · 2025/2026</span>
        </div>
        <h1 className="text-4xl sm:text-6xl font-serif-heading font-bold tracking-tight text-[#051650] mt-1 mb-6 text-balance">
          {POLICY_BRIEF.title}
        </h1>
        <p className="text-base sm:text-lg text-stone-600 max-w-3xl mx-auto leading-relaxed text-balance">
          The definitive regional policy brief by the Southern Africa Migration Network, proposing five structural interventions to align SADC national migration policies with international human rights standards and regional economic development.
        </p>
      </section>

      {/* Download Alert Notification if triggered */}
      {downloadNotice && (
        <div className="max-w-2xl mx-auto px-4 mb-8">
          <div className="p-4 bg-emerald-50 border border-emerald-300 rounded-2xl text-emerald-900 text-xs flex items-center justify-between shadow-sm animate-in fade-in">
            <span className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{downloadNotice}</span>
            </span>
            <span className="text-[10px] text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">PDF Started</span>
          </div>
        </div>
      )}

      {/* Dual Language Download Cards (EN / FR) */}
      <section className="sm-policy-downloads max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Card 1: English Edition */}
          <div className="bg-white rounded-3xl border border-stone-200 p-8 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#051650] bg-stone-100 px-3 py-1 rounded-full">
                  English Edition · EN
                </span>
                <span className="text-xs text-stone-400 font-mono">
                  {POLICY_BRIEF.enPdf.pages} Pages
                </span>
              </div>

              <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 flex items-center gap-4">
                <div className="w-12 h-14 bg-[#051650] text-[#FAC775] rounded-lg flex flex-col items-center justify-center font-mono font-bold text-xs shadow-sm">
                  <span>PDF</span>
                  <span className="text-[9px] text-stone-300">EN</span>
                </div>
                <div>
                  <h3 className="text-base font-bold font-serif-heading text-[#051650]">
                    {POLICY_BRIEF.enPdf.title}
                  </h3>
                  <p className="text-xs text-stone-500 mt-0.5 font-mono">
                    {POLICY_BRIEF.enPdf.size} · Updated October 2025
                  </p>
                </div>
              </div>

              <p className="text-xs text-stone-600 leading-relaxed">
                Contains full empirical analysis of SADC border regularisation backlogs, economic multiplier calculations for host cities, and five actionable legislative amendments.
              </p>
            </div>

            <div className="pt-6 mt-6 border-t border-stone-100">
              <button
                onClick={() => handleDownload('EN')}
                className="w-full py-3 rounded-full text-xs font-semibold bg-[#FAC775] text-[#051650] hover:bg-[#f5b952] active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm"
              >
                <Download className="w-4 h-4" />
                <span>Download English Brief (PDF)</span>
              </button>
            </div>
          </div>

          {/* Card 2: French Edition */}
          <div className="bg-white rounded-3xl border border-stone-200 p-8 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#0A2275] bg-stone-100 px-3 py-1 rounded-full">
                  Édition Française · FR
                </span>
                <span className="text-xs text-stone-400 font-mono">
                  {POLICY_BRIEF.frPdf.pages} Pages
                </span>
              </div>

              <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 flex items-center gap-4">
                <div className="w-12 h-14 bg-[#0A2275] text-[#FAC775] rounded-lg flex flex-col items-center justify-center font-mono font-bold text-xs shadow-sm">
                  <span>PDF</span>
                  <span className="text-[9px] text-stone-300">FR</span>
                </div>
                <div>
                  <h3 className="text-base font-bold font-serif-heading text-[#051650]">
                    {POLICY_BRIEF.frPdf.title}
                  </h3>
                  <p className="text-xs text-stone-500 mt-0.5 font-mono">
                    {POLICY_BRIEF.frPdf.size} · Mise à jour Octobre 2025
                  </p>
                </div>
              </div>

              <p className="text-xs text-stone-600 leading-relaxed">
                Traduction intégrale pour les décideurs politiques francophones en RDC, à Madagascar et dans l'espace régional pour l'harmonisation des droits des migrants.
              </p>
            </div>

            <div className="pt-6 mt-6 border-t border-stone-100">
              <button
                onClick={() => handleDownload('FR')}
                className="w-full py-3 rounded-full text-xs font-semibold bg-[#051650] text-[#FAC775] hover:bg-[#020b2b] active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm"
              >
                <Download className="w-4 h-4" />
                <span>Télécharger la Note Stratégique (PDF)</span>
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* Executive Summary & Policy Overview */}
      <section className="sm-policy-summary max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-stone-200 shadow-sm space-y-6">
          <div className="space-y-2">
            <span className="text-xs uppercase font-bold tracking-widest text-[#051650]">
              Executive Overview
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif-heading font-bold text-[#051650]">
              The Case for Regional Inclusion
            </h2>
          </div>

          <p className="text-sm sm:text-base text-stone-700 leading-relaxed">
            {POLICY_BRIEF.summary}
          </p>

          <div className="p-6 rounded-2xl bg-stone-50 border border-stone-200">
            <h3 className="text-xs uppercase font-bold tracking-wider text-[#051650] mb-2">
              Recommended Citation
            </h3>
            <p className="text-xs font-mono text-stone-600 leading-relaxed">
              Southern Africa Migration Network (SAMIN). (2025). <em>Advancing Humane Migration Governance in Southern Africa: Policy Recommendations for the SADC Region</em>. Cape Town: SAMIN Secretariat. ISBN: 978-0-620-94182-1.
            </p>
          </div>
        </div>
      </section>

      {/* 5 Actionable Recommendations */}
      <section className="sm-policy-recommendations max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
        <div className="mb-10 text-center max-w-2xl mx-auto">
          <span className="text-xs uppercase tracking-widest text-[#051650] font-bold">
            Concrete Pathways
          </span>
          <h2 className="text-3xl font-serif-heading font-bold text-[#051650] mt-1">
            5 Actionable Recommendations for SADC
          </h2>
        </div>

        <div className="space-y-4">
          {POLICY_BRIEF.recommendations.map((rec, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl border border-stone-200 p-6 sm:p-7 shadow-sm hover:border-[#FAC775] transition-colors"
            >
              <h3 className="text-base sm:text-lg font-bold font-serif-heading text-[#051650] mb-2">
                {rec.title}
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                {rec.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Engagement Call */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center bg-[#051650] text-white p-12 rounded-3xl">
        <h2 className="text-2xl sm:text-3xl font-serif-heading font-bold mb-3">
          Present This Research to Your Institution
        </h2>
        <p className="text-xs sm:text-sm text-stone-300 max-w-xl mx-auto mb-8 leading-relaxed">
          The SAMIN research secretariat provides tailored parliamentary briefings, academic guest lectures, and municipal technical advisories across the SADC region.
        </p>
        <button
          onClick={() => onNavigate('contact')}
          className="px-8 py-3 rounded-full text-xs sm:text-sm font-semibold bg-[#FAC775] text-[#051650] hover:bg-[#f5b952] transition-colors cursor-pointer"
        >
          Request Secretariat Briefing
        </button>
      </section>

    </div>
  );
};
