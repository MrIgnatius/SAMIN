import React, { useState } from 'react';
import { ELEMENTOR_MAPPING_DATA } from '../data/content';
import { X, Layers, Code, Check, Copy, ExternalLink, Sparkles } from 'lucide-react';

interface ElementorGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ElementorGuideModal: React.FC<ElementorGuideModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'mapping' | 'variables' | 'placeholders'>('mapping');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const cssVariablesSnippet = `:root {
  /* Elementor Global Colors */
  --samin-navy: #051650;        /* Primary Accent & Dark BG */
  --samin-navy-dark: #020b2b;   /* Deep Section BG */
  --samin-gold: #FAC775;         /* Brand Accent & CTA */
  --samin-gold-hover: #f5b952;   /* Hover State */
  --samin-bg: #F2F2F2;          /* Canvas Off-white */
  --samin-surface: #FFFFFF;     /* Card Canvas */
  --samin-muted: #536280;       /* Subtext & Secondary */

  /* Elementor Global Typography */
  --font-heading: 'Fraunces', Georgia, serif;
  --font-body: 'DM Sans', sans-serif;

  /* Elementor Theme Radii */
  --radius-button: 9999px;
  --radius-card: 16px;
}`;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl border border-stone-200 flex flex-col">
        {/* Modal Header */}
        <div className="p-6 bg-[#051650] text-white flex items-center justify-between border-b border-[#FAC775]/20">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-[#FAC775]/20 text-[#FAC775]">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold font-serif-heading text-white">
                SAMIN to Elementor Theme Conversion Blueprint
              </h3>
              <p className="text-xs text-stone-300">
                Container mapping, Elementor Theme Builder templates, and CSS Global Styles
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Close dialog"
            className="text-stone-300 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-stone-200 bg-stone-50 px-6 gap-2">
          <button
            onClick={() => setActiveTab('mapping')}
            className={`py-3 px-4 text-xs font-semibold border-b-2 transition-all cursor-pointer ${
              activeTab === 'mapping'
                ? 'border-[#051650] text-[#051650]'
                : 'border-transparent text-stone-600 hover:text-stone-900'
            }`}
          >
            Section-to-Elementor Mapping ({ELEMENTOR_MAPPING_DATA.length})
          </button>
          <button
            onClick={() => setActiveTab('variables')}
            className={`py-3 px-4 text-xs font-semibold border-b-2 transition-all cursor-pointer ${
              activeTab === 'variables'
                ? 'border-[#051650] text-[#051650]'
                : 'border-transparent text-stone-600 hover:text-stone-900'
            }`}
          >
            Global Styles & Variables
          </button>
          <button
            onClick={() => setActiveTab('placeholders')}
            className={`py-3 px-4 text-xs font-semibold border-b-2 transition-all cursor-pointer ${
              activeTab === 'placeholders'
                ? 'border-[#051650] text-[#051650]'
                : 'border-transparent text-stone-600 hover:text-stone-900'
            }`}
          >
            Placeholders to Replace
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6 text-sm text-stone-800 flex-1">
          {activeTab === 'mapping' && (
            <div className="space-y-4">
              <div className="p-3 bg-amber-50 rounded-lg border border-amber-200 text-xs text-amber-900">
                <strong>Architectural Note:</strong> Every section is marked with a unique semantic class (`.sm-hero`, `.sm-pinned-story`, etc.) matching Elementor Flexbox Containers. CSS variables are defined in `:root` for 1:1 mapping with Elementor Site Settings &gt; Global Colors &amp; Fonts.
              </div>

              <div className="overflow-x-auto border border-stone-200 rounded-xl">
                <table className="min-w-full divide-y divide-stone-200 text-left text-xs">
                  <thead className="bg-stone-50 text-stone-600 font-semibold uppercase tracking-wider">
                    <tr>
                      <th className="py-3 px-4">Section Name</th>
                      <th className="py-3 px-4">HTML Class</th>
                      <th className="py-3 px-4">Elementor Structure</th>
                      <th className="py-3 px-4">Motion & Scroll Trigger</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-100 bg-white">
                    {ELEMENTOR_MAPPING_DATA.map((row, idx) => (
                      <tr key={idx} className="hover:bg-stone-50/80 transition-colors">
                        <td className="py-3 px-4 font-semibold text-[#051650]">
                          {row.sectionName}
                        </td>
                        <td className="py-3 px-4 font-mono text-[11px] text-[#0A2275]">
                          <code>{row.htmlClass}</code>
                        </td>
                        <td className="py-3 px-4 text-stone-700">
                          <p className="font-medium">{row.elementorType}</p>
                          <p className="text-[11px] text-stone-500 mt-0.5">{row.widgets}</p>
                        </td>
                        <td className="py-3 px-4 text-stone-600">
                          <span className="inline-block px-2 py-0.5 rounded bg-stone-100 text-stone-800 font-mono text-[10px]">
                            {row.motionEffects}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'variables' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <p className="text-xs text-stone-600">
                  Paste these into your Elementor custom CSS or Child Theme stylesheet:
                </p>
                <button
                  onClick={() => handleCopy(cssVariablesSnippet, 'css-var')}
                  className="flex items-center gap-1.5 px-3 py-1 rounded bg-[#051650] text-[#FAC775] text-xs font-semibold hover:bg-[#020b2b] transition-colors cursor-pointer"
                >
                  {copiedKey === 'css-var' ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy CSS Variables</span>
                    </>
                  )}
                </button>
              </div>

              <pre className="bg-[#020b2b] text-[#FAC775] p-4 rounded-xl text-xs font-mono overflow-x-auto leading-relaxed border border-stone-800">
                {cssVariablesSnippet}
              </pre>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs pt-2">
                <div className="p-3 rounded-lg border border-stone-200 bg-stone-50">
                  <h4 className="font-bold text-[#051650] mb-1">Elementor Global Typography</h4>
                  <p className="text-stone-600 text-[11px]">Primary: Fraunces (Weight 600/700, Optical size 9–144)</p>
                  <p className="text-stone-600 text-[11px]">Secondary: DM Sans (Weight 400/500/600)</p>
                </div>
                <div className="p-3 rounded-lg border border-stone-200 bg-stone-50">
                  <h4 className="font-bold text-[#051650] mb-1">Theme Builder Templates</h4>
                  <p className="text-stone-600 text-[11px]">Header: Transparent to solid white on scroll</p>
                  <p className="text-stone-600 text-[11px]">Footer: 5-column responsive container with partner logos</p>
                  <p className="text-stone-600 text-[11px]">Single Post: Editorial typography with drop cap</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'placeholders' && (
            <div className="space-y-4">
              <div className="p-3 bg-blue-50 rounded-lg border border-blue-200 text-xs text-blue-900">
                Every placeholder has been marked with explicit `data-count="000"` and clear TODO notes in the markup so that production statistics and assets can be verified by the secretariat before deployment.
              </div>

              <div className="space-y-3 text-xs">
                <div className="p-3 rounded-lg border border-stone-200">
                  <h4 className="font-bold text-[#051650]">1. Animated Impact Counters (Section 7)</h4>
                  <ul className="list-disc pl-5 mt-1 space-y-1 text-stone-600">
                    <li><code>Migrants Supported</code>: Marked with `000` (TODO: Insert regional casework metric from annual report)</li>
                    <li><code>Policy Engagements</code>: Marked with `000` (TODO: SADC and AU parliamentary submissions)</li>
                    <li><code>Community Partners</code>: Marked with `000` (TODO: Registered grassroots networks)</li>
                    <li><code>Youth Reached</code>: Marked with `000` (TODO: Regional education and vocational beneficiaries)</li>
                    <li><code>Research Publications</code>: Marked with `000` (TODO: Whitepapers & briefs published)</li>
                  </ul>
                </div>

                <div className="p-3 rounded-lg border border-stone-200">
                  <h4 className="font-bold text-[#051650]">2. Media & Video Backgrounds</h4>
                  <ul className="list-disc pl-5 mt-1 space-y-1 text-stone-600">
                    <li>Hero section video loop: Rendered with fallback poster and high-res imagery (`/src/assets/images/...`)</li>
                    <li>Journey portraits: 4 authentic documentary portraits generated with dignified representations</li>
                  </ul>
                </div>

                <div className="p-3 rounded-lg border border-stone-200">
                  <h4 className="font-bold text-[#051650]">3. Secretarial Contact & Registration</h4>
                  <ul className="list-disc pl-5 mt-1 space-y-1 text-stone-600">
                    <li>Cape Town Secretariat: 6 Spin Street, IDASA Building, Cape Town, 8001</li>
                    <li>Phone: +27 21 461 6551 | Email: secretariat@samin.org.za</li>
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-stone-50 border-t border-stone-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-lg bg-[#051650] text-[#FAC775] text-xs font-semibold hover:bg-[#020b2b] transition-colors cursor-pointer"
          >
            Close Blueprint
          </button>
        </div>
      </div>
    </div>
  );
};
