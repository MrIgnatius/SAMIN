import React, { useState } from 'react';
import { PageId, NewsletterItem } from '../types';
import { NEWSLETTERS } from '../data/content';
import { 
  Mail, 
  Download, 
  FileText, 
  Calendar, 
  CheckCircle2, 
  Sparkles, 
  ArrowRight,
  Eye,
  X
} from 'lucide-react';

interface NewslettersPageProps {
  onNavigate: (page: PageId) => void;
}

export const NewslettersPage: React.FC<NewslettersPageProps> = ({ onNavigate }) => {
  const [emailInput, setEmailInput] = useState('');
  const [topicPreference, setTopicPreference] = useState('All Regional Updates');
  const [subscribed, setSubscribed] = useState(false);
  const [previewNewsletter, setPreviewNewsletter] = useState<NewsletterItem | null>(null);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailInput) return;
    setSubscribed(true);
    setEmailInput('');
  };

  return (
    <div className="w-full bg-[#F2F2F2] text-[#051650] pt-24 pb-20">
      
      {/* Header */}
      <section className="sm-newsletter-hero max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-16 text-center">
        <span className="text-xs uppercase tracking-widest text-[#051650] font-bold">
          Publications & Bulletins
        </span>
        <h1 className="text-4xl sm:text-6xl font-serif-heading font-bold tracking-tight text-[#051650] mt-3 mb-6">
          SAMIN Quarterly Newsletters
        </h1>
        <p className="text-base sm:text-lg text-stone-600 max-w-2xl mx-auto leading-relaxed">
          Stay informed on strategic litigation updates, cross-border paralegal casework, and multilateral SADC policy shifts delivered quarterly to your desk.
        </p>
      </section>

      {/* Subscription Card */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="bg-[#051650] text-white rounded-3xl p-8 sm:p-10 shadow-lg border border-[#FAC775]/20">
          <div className="max-w-2xl mx-auto text-center space-y-4">
            <div className="w-10 h-10 rounded-full bg-[#FAC775]/20 text-[#FAC775] flex items-center justify-center mx-auto">
              <Mail className="w-5 h-5" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif-heading font-bold text-white">
              Subscribe to Quarterly Regional Dispatches
            </h2>
            <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
              Receive concise policy briefs, legal alerts, and grassroots accounts directly from our regional monitoring desks. No spam, ever.
            </p>

            {subscribed ? (
              <div className="p-4 bg-emerald-950/60 border border-emerald-500/40 rounded-xl text-emerald-200 text-xs flex items-center justify-center gap-2 animate-in fade-in">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Thank you. Your address has been subscribed to the regional civil society dispatch.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="pt-2 flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
                <input
                  type="email"
                  required
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  placeholder="Enter your professional or personal email..."
                  className="flex-1 px-4 py-3 rounded-full bg-white text-stone-900 text-xs placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-[#FAC775]"
                />
                <button
                  type="submit"
                  className="px-6 py-3 rounded-full text-xs font-semibold bg-[#FAC775] text-[#051650] hover:bg-[#f5b952] transition-colors cursor-pointer whitespace-nowrap shadow-md"
                >
                  Subscribe Free
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Archive Grid */}
      <section className="sm-newsletter-archive max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8 pb-3 border-b border-stone-200">
          <h3 className="text-xs uppercase font-bold tracking-widest text-[#051650]">
            Quarterly Archive Editions
          </h3>
          <span className="text-xs text-stone-500 font-mono">
            {NEWSLETTERS.length} Editions Available
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {NEWSLETTERS.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl border border-stone-200 p-8 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-mono font-semibold text-[#0A2275] bg-stone-100 px-2.5 py-1 rounded">
                    {item.issue}
                  </span>
                  <span className="text-stone-500 flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-stone-400" />
                    <span>{item.date}</span>
                  </span>
                </div>

                <h3 className="text-xl font-bold font-serif-heading text-[#051650] leading-snug">
                  {item.title}
                </h3>

                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                  {item.summary}
                </p>

                <div className="pt-2">
                  <p className="text-[11px] uppercase font-bold tracking-wider text-stone-400 mb-2">
                    In This Edition:
                  </p>
                  <ul className="space-y-1.5">
                    {item.highlights.map((h, hIdx) => (
                      <li key={hIdx} className="text-xs text-stone-700 flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#FAC775] mt-1.5 shrink-0" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-6 mt-6 border-t border-stone-100 flex items-center justify-between gap-4">
                <button
                  onClick={() => setPreviewNewsletter(item)}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#051650] hover:text-[#0A2275] cursor-pointer"
                >
                  <Eye className="w-3.5 h-3.5 text-[#FAC775]" />
                  <span>Preview Contents</span>
                </button>

                <button
                  onClick={() => {
                    alert(`Downloading ${item.title} (${item.pdfSize}). In production this serves the archived PDF from /assets/newsletters/`);
                  }}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-stone-100 hover:bg-stone-200 text-[#051650] text-xs font-medium transition-colors cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>PDF ({item.pdfSize})</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Preview Modal */}
      {previewNewsletter && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-xl w-full p-8 shadow-2xl border border-stone-200 space-y-6">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-xs font-mono text-[#0A2275] font-semibold">{previewNewsletter.issue}</span>
                <h3 className="text-2xl font-bold font-serif-heading text-[#051650] mt-1">
                  {previewNewsletter.title}
                </h3>
              </div>
              <button
                onClick={() => setPreviewNewsletter(null)}
                aria-label="Close modal"
                className="text-stone-400 hover:text-stone-700 p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
              {previewNewsletter.summary}
            </p>

            <div className="p-4 bg-stone-50 rounded-xl border border-stone-200 space-y-2">
              <h4 className="text-xs uppercase font-bold tracking-wider text-[#051650]">
                Editorial Summary & Topics
              </h4>
              <ul className="space-y-1.5">
                {previewNewsletter.highlights.map((h, i) => (
                  <li key={i} className="text-xs text-stone-700 flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#FAC775] mt-1.5 shrink-0" />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-stone-100">
              <span className="text-xs text-stone-500 font-mono">Archive Size: {previewNewsletter.pdfSize}</span>
              <button
                onClick={() => {
                  alert(`Downloading ${previewNewsletter.title}...`);
                  setPreviewNewsletter(null);
                }}
                className="px-5 py-2 rounded-full text-xs font-semibold bg-[#FAC775] text-[#051650] hover:bg-[#f5b952] transition-colors cursor-pointer flex items-center gap-1.5"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download Archive Edition</span>
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
