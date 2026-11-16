import React, { useState, useEffect } from 'react';
import { ShieldCheck, X } from 'lucide-react';

export const CookieBanner: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('samin_cookie_consent');
    if (!consent) {
      const timer = setTimeout(() => setIsVisible(true), 1200);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('samin_cookie_consent', 'accepted');
    setIsVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem('samin_cookie_consent', 'essential_only');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div
      role="region"
      aria-label="Privacy and Cookie Notice"
      className="fixed bottom-4 left-4 right-4 sm:left-6 sm:right-auto sm:max-w-md z-50 bg-[#051650] text-white p-5 rounded-2xl shadow-2xl border border-[#FAC775]/30 animate-in fade-in slide-in-from-bottom-4 duration-300"
    >
      <div className="flex items-start gap-3">
        <div className="p-2 rounded-lg bg-white/10 shrink-0 text-[#FAC775]">
          <ShieldCheck className="w-5 h-5" />
        </div>
        <div className="space-y-2 flex-1">
          <h4 className="text-sm font-semibold tracking-wide text-white font-serif-heading">
            Privacy & Research Ethics
          </h4>
          <p className="text-xs text-stone-300 leading-relaxed">
            SAMIN respects your digital autonomy. We only utilize privacy-focused, anonymous analytics to measure regional engagement with our policy briefs and casework resources.
          </p>
          <div className="flex items-center gap-2 pt-1">
            <button
              onClick={handleAccept}
              className="px-4 py-1.5 rounded-full text-xs font-semibold bg-[#FAC775] text-[#051650] hover:bg-[#f5b952] transition-colors cursor-pointer"
            >
              Accept All
            </button>
            <button
              onClick={handleDecline}
              className="px-3 py-1.5 rounded-full text-xs font-medium text-stone-300 hover:text-white border border-white/20 transition-colors cursor-pointer"
            >
              Essential Only
            </button>
          </div>
        </div>
        <button
          onClick={handleDecline}
          aria-label="Dismiss cookie notice"
          className="text-stone-400 hover:text-white transition-colors p-1"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
