import React, { useState, useEffect, useRef } from 'react';
import { PageId } from '../types';
import { Menu, X, ArrowRight, Sliders, Sparkles, Check, Copy, ChevronDown, Mail, BookOpen } from 'lucide-react';
import { SaminLogo } from './SaminLogo';

interface HeaderProps {
  currentPage: PageId;
  onNavigate: (page: PageId) => void;
  onOpenElementorGuide?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentPage,
  onNavigate,
  onOpenElementorGuide,
}) => {
  // Lytbox Configuration State
  const [stickyAfterPx, setStickyAfterPx] = useState(450); // Default threshold for smooth preview
  const [animMs, setAnimMs] = useState(200); // 200ms animation
  const [isIslandMode, setIsIslandMode] = useState(true); // Floating island mode as shown in Screenshot 1
  const [isSnippetsModalOpen, setIsSnippetsModalOpen] = useState(false);
  const [copiedSnippet, setCopiedSnippet] = useState<string | null>(null);

  // Resources dropdown state
  const [isResourcesOpen, setIsResourcesOpen] = useState(false);
  const [mobileResourcesOpen, setMobileResourcesOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Live status tracking
  const [scrollY, setScrollY] = useState(0);
  const [isSticky, setIsSticky] = useState(false);
  const [isRevealed, setIsRevealed] = useState(false);
  const [noTrans, setNoTrans] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const headerRef = useRef<HTMLElement>(null);
  const isStickyRef = useRef(false);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsResourcesOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Synchronize CSS variable --lytbox-anim-ms
  useEffect(() => {
    document.documentElement.style.setProperty('--lytbox-anim-ms', `${animMs}ms`);
  }, [animMs]);

  // Lytbox Engine: Scroll listener adhering strictly to the tutorial mechanism
  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      setScrollY(currentY);

      if (currentY >= stickyAfterPx) {
        // Trigger makeSticky
        if (!isStickyRef.current) {
          isStickyRef.current = true;
          setIsSticky(true);

          // Step 1: Apply sticky state off-screen WITHOUT transition
          setNoTrans(true);
          setIsRevealed(false);

          // Step 2: Next frame via requestAnimationFrame, enable transition and slide down
          requestAnimationFrame(() => {
            requestAnimationFrame(() => {
              setNoTrans(false);
              setIsRevealed(true);
            });
          });
        }
      } else {
        // Trigger removeSticky
        if (isStickyRef.current) {
          isStickyRef.current = false;

          // Slide up (hide)
          setIsRevealed(false);

          // Return to normal flow after animMs
          window.setTimeout(() => {
            setIsSticky(false);
          }, animMs);
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [stickyAfterPx, animMs]);

  const primaryNavItems: { id: PageId; label: string }[] = [
    { id: 'challenges', label: 'Challenges' },
    { id: 'advocacy', label: 'Advocacy' },
    { id: 'about', label: 'About' },
    { id: 'blog', label: 'Blog' },
  ];

  const isResourcesActive = currentPage === 'newsletters' || currentPage === 'policy-brief';

  const handleNavClick = (pageId: PageId) => {
    onNavigate(pageId);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCopyCode = (code: string, key: string) => {
    navigator.clipboard.writeText(code);
    setCopiedSnippet(key);
    setTimeout(() => setCopiedSnippet(null), 2000);
  };

  // Fluent Snippets Raw Code for user export
  const fluentJsSnippet = `/**
 * Lytbox Hide & Show Sticky Header JS
 * Fluent Snippets / Elementor
 */
(() => {
  // ===== EDIT THESE =====
  const STICKY_AFTER_PX = ${stickyAfterPx}; // when sticky behavior starts
  const ANIM_MS = ${animMs}; // animation speed (matches CSS var)
  const OVERLAY_MODE = true; // TRUE if header overlays hero
  // =======================

  const header = document.querySelector('.lytbox-header');
  if (!header) return;

  document.documentElement.style.setProperty('--lytbox-anim-ms', \`\${ANIM_MS}ms\`);

  // Spacer prevents page jump when header becomes fixed
  const spacer = document.createElement('div');
  spacer.className = 'lytbox-header-spacer';
  spacer.style.height = '0px';
  spacer.style.pointerEvents = 'none';
  header.insertAdjacentElement('afterend', spacer);

  let isSticky = false;

  const setSpacer = (px) => {
    spacer.style.height = OVERLAY_MODE ? '0px' : \`\${px}px\`;
  };

  const makeSticky = () => {
    if (isSticky) return;
    isSticky = true;

    if (!OVERLAY_MODE) setSpacer(header.offsetHeight);

    // Step 1: apply sticky state off-screen WITHOUT transition
    header.classList.add('lytbox-is-sticky', 'lytbox-no-trans');
    header.classList.remove('lytbox-show');

    // Force style flush (prevents first-time pop-in)
    void header.offsetHeight;

    // Step 2: next frame, enable transition + slide in
    requestAnimationFrame(() => {
      header.classList.remove('lytbox-no-trans');
      header.classList.add('lytbox-show');
    });
  };

  const removeSticky = () => {
    if (!isSticky) return;
    isSticky = false;

    // slide up (hide)
    header.classList.remove('lytbox-show');

    window.setTimeout(() => {
      // return to normal flow
      header.classList.remove('lytbox-is-sticky');

      // kill spacer
      setSpacer(0);
    }, ANIM_MS);
  };

  const onScroll = () => {
    if (window.scrollY >= STICKY_AFTER_PX) makeSticky();
    else removeSticky();
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', () => {
    if (isSticky && !OVERLAY_MODE) setSpacer(header.offsetHeight);
  });

  onScroll();
})();`;

  const fluentCssSnippet = `:root {
  /* From https://css.glass */
  --lytbox-sticky-bg: rgba(0, 76, 199, 0.58);
  --lytbox-sticky-blur: 10.3px;
  --lytbox-sticky-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  --lytbox-sticky-border: rgba(0, 76, 199, 0.34);
}

.lytbox-no-trans {
  transition: none !important;
}

/* Sticky behavior */
.lytbox-header.lytbox-is-sticky {
  position: fixed !important;
  top: 0;
  left: 0;
  right: 0;
  z-index: 9999;
  transform: translateY(-110%);
  transition: transform var(--lytbox-anim-ms, 200ms) cubic-bezier(0.16, 1, 0.3, 1);
  will-change: transform;
  /* From https://css.glass */
  background: rgba(0, 76, 199, 0.58);
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(10.3px);
  -webkit-backdrop-filter: blur(10.3px);
  border: 1px solid rgba(0, 76, 199, 0.34);
}

.lytbox-header.lytbox-is-sticky.lytbox-show {
  transform: translateY(0);
}

/* Floating Island Style Option (Screenshot 1: fully rounded pill island) */
.lytbox-header.lytbox-is-sticky.lytbox-island-mode {
  top: 14px;
  left: 16px;
  right: 16px;
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
  /* Capsule Pill Rounded - Screenshot 1 */
  border-radius: 9999px;
  background: rgba(0, 76, 199, 0.58);
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1), 0 10px 25px -5px rgba(0, 76, 199, 0.25);
  backdrop-filter: blur(10.3px);
  -webkit-backdrop-filter: blur(10.3px);
  border: 1px solid rgba(0, 76, 199, 0.34);
}
 
/* Logo Swap Mechanism (Step 2: 2:27 - 5:34) */
.lytbox-header .logo-1 {
  display: flex !important;
}
.lytbox-header .logo-2 {
  display: none !important;
}

.lytbox-header.lytbox-is-sticky .logo-1 {
  display: none !important;
}
.lytbox-header.lytbox-is-sticky .logo-2 {
  display: flex !important;
}`;

  return (
    <>
      {/* =========================================================================
          LYTBOX REVEAL HEADER (Single Header Container for 100% Clean SEO)
          - CSS Classes: 'lytbox-header' & '.sm-header'
          - Automatic slide-off and reveal past STICKY_AFTER_PX
          - Logo swap: logo-1 (normal) -> logo-2 (sticky frosted glass)
          ========================================================================= */}
      <header
        ref={headerRef}
        role="banner"
        aria-label="Main Site Header"
        className={`lytbox-header sm-header z-50 w-full ${
          isSticky ? 'lytbox-is-sticky' : 'absolute top-0 left-0 right-0'
        } ${isRevealed ? 'lytbox-show' : ''} ${
          noTrans ? 'lytbox-no-trans' : ''
        } ${isIslandMode && isSticky ? 'lytbox-island-mode rounded-full' : ''} ${
          !isSticky
            ? currentPage === 'home'
              ? 'bg-transparent pt-6 sm:pt-7 pb-4 text-white'
              : 'bg-white shadow-sm border-b border-stone-200 py-4 text-[#051650]'
            : isIslandMode
            ? 'py-2 px-6 sm:px-8 text-white'
            : 'py-3.5 text-white'
        }`}
      >
        <div className={`mx-auto flex items-center justify-between gap-6 ${
          isIslandMode && isSticky ? 'max-w-7xl px-2 sm:px-4' : 'max-w-7xl px-6 sm:px-8 lg:px-12'
        }`}>
          
          {/* =====================================================================
              LAYOUT ITEM 1: LOGO (FAR LEFT)
              ===================================================================== */}
          <div className="flex items-center shrink-0">
            {/* LOGO-1: Initial Editorial Header Logo (Visible at top) */}
            <div className="logo-1 items-center">
              <SaminLogo
                theme={!isSticky && currentPage !== 'home' ? 'light' : 'dark'}
                onClick={() => handleNavClick('home')}
                idSuffix="top"
              />
            </div>

            {/* LOGO-2: Sticky Frosted Glass Header Logo (Visible when sticky) */}
            <div className="logo-2 items-center">
              <SaminLogo
                theme="sticky"
                onClick={() => handleNavClick('home')}
                idSuffix="sticky"
              />
            </div>
          </div>

          {/* =====================================================================
              LAYOUT ITEM 2: NAVIGATION (CENTER) - Challenges, Advocacy, About, Blog, Resources
              Matching attached image with underline active indicator
              ===================================================================== */}
          <nav
            aria-label="Main Navigation"
            className="hidden lg:flex items-center gap-8 lg:gap-10 text-sm font-medium"
          >
            {primaryNavItems.map((item) => {
              const isActive = currentPage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`transition-colors whitespace-nowrap cursor-pointer relative py-1 focus:outline-none ${
                    !isSticky && currentPage !== 'home'
                      ? isActive
                        ? 'text-[#051650] font-semibold'
                        : 'text-stone-600 hover:text-[#051650]'
                      : isActive
                      ? 'text-white font-semibold'
                      : 'text-white/80 hover:text-white'
                  }`}
                >
                  <span>{item.label}</span>
                  {isActive && (
                    <span
                      className={`absolute -bottom-2.5 left-1/2 -translate-x-1/2 w-6 h-[2px] rounded-full transition-all ${
                        !isSticky && currentPage !== 'home'
                          ? 'bg-[#051650]'
                          : isSticky
                          ? 'bg-[#FAC775]'
                          : 'bg-white'
                      }`}
                    />
                  )}
                </button>
              );
            })}

            {/* Resources Dropdown with Chevron Arrow */}
            <div
              ref={dropdownRef}
              className="relative"
              onMouseEnter={() => setIsResourcesOpen(true)}
              onMouseLeave={() => setIsResourcesOpen(false)}
            >
              <button
                onClick={() => setIsResourcesOpen(!isResourcesOpen)}
                className={`flex items-center gap-1.5 transition-colors whitespace-nowrap cursor-pointer relative py-1 focus:outline-none ${
                  !isSticky && (currentPage as string) !== 'home'
                    ? isResourcesActive
                      ? 'text-[#051650] font-semibold'
                      : 'text-stone-600 hover:text-[#051650]'
                    : isResourcesActive
                    ? 'text-white font-semibold'
                    : 'text-white/80 hover:text-white'
                }`}
                aria-expanded={isResourcesOpen}
                aria-haspopup="true"
              >
                <span>Resources</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${
                    isResourcesOpen ? 'rotate-180' : ''
                  }`}
                />
                {isResourcesActive && (
                  <span
                    className={`absolute -bottom-2.5 left-1/2 -translate-x-1/2 w-6 h-[2px] rounded-full transition-all ${
                      !isSticky ? 'bg-[#051650]' : 'bg-[#FAC775]'
                    }`}
                  />
                )}
              </button>

              {/* Dropdown Menu Panel (Newsletters & SAMIN Policy Brief) */}
              {isResourcesOpen && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 pt-3 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                  <div
                    className={`w-72 rounded-2xl p-2 shadow-2xl backdrop-blur-xl border ${
                      !isSticky && (currentPage as string) !== 'home'
                        ? 'bg-white/95 border-stone-200 text-[#051650]'
                        : 'bg-[#051650]/95 border-white/15 text-white'
                    }`}
                  >
                    {/* Item 1: Newsletters */}
                    <button
                      onClick={() => {
                        handleNavClick('newsletters');
                        setIsResourcesOpen(false);
                      }}
                      className={`w-full text-left p-3 rounded-xl flex items-start gap-3 transition-colors cursor-pointer ${
                        currentPage === 'newsletters'
                          ? 'bg-white/15 text-[#FAC775]'
                          : !isSticky && (currentPage as string) !== 'home'
                          ? 'hover:bg-stone-100 text-stone-700 hover:text-[#051650]'
                          : 'hover:bg-white/10 text-stone-200 hover:text-white'
                      }`}
                    >
                      <div className="p-2 rounded-lg bg-[#FAC775]/20 text-[#FAC775] shrink-0 mt-0.5">
                        <Mail className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="font-semibold text-sm">Newsletters</div>
                        <div
                          className={`text-xs ${
                            !isSticky && (currentPage as string) !== 'home'
                              ? 'text-stone-500'
                              : 'text-stone-300/80'
                          }`}
                        >
                          Quarterly archive & regional updates
                        </div>
                      </div>
                    </button>

                    {/* Item 2: SAMIN Policy Brief */}
                    <button
                      onClick={() => {
                        handleNavClick('policy-brief');
                        setIsResourcesOpen(false);
                      }}
                      className={`w-full text-left p-3 rounded-xl flex items-start gap-3 transition-colors cursor-pointer ${
                        currentPage === 'policy-brief'
                          ? 'bg-white/15 text-[#FAC775]'
                          : !isSticky && (currentPage as string) !== 'home'
                          ? 'hover:bg-stone-100 text-stone-700 hover:text-[#051650]'
                          : 'hover:bg-white/10 text-stone-200 hover:text-white'
                      }`}
                    >
                      <div className="p-2 rounded-lg bg-[#FAC775]/20 text-[#FAC775] shrink-0 mt-0.5">
                        <BookOpen className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="font-semibold text-sm">SAMIN Policy Brief</div>
                        <div
                          className={`text-xs ${
                            !isSticky && (currentPage as string) !== 'home'
                              ? 'text-stone-500'
                              : 'text-stone-300/80'
                          }`}
                        >
                          Bilingual regional policy releases (EN & FR)
                        </div>
                      </div>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </nav>

          {/* =====================================================================
              LAYOUT ITEM 3: CALL TO ACTION (FAR RIGHT)
              "Get Started ->" replaced with "Contact Us ->" white pill button, no search button
              ===================================================================== */}
          <div className="flex items-center gap-3 shrink-0">


            {/* Primary Action Button: "Contact Us ->" Pill Button */}
            <button
              onClick={() => handleNavClick('contact')}
              className={`px-5 sm:px-6 py-2.5 rounded-full text-xs sm:text-sm font-semibold tracking-wide flex items-center gap-2 shadow-md active:scale-95 transition-all cursor-pointer whitespace-nowrap ${
                !isSticky && currentPage !== 'home'
                  ? 'bg-[#051650] text-white hover:bg-[#020b2b]'
                  : 'bg-white text-[#051650] hover:bg-stone-100 hover:shadow-lg'
              }`}
            >
              <span>Contact Us</span>
              <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#051650]" />
            </button>

            {/* Subtle Header FX Settings Icon (Unobtrusive) */}
            <button
              onClick={() => setIsSnippetsModalOpen(true)}
              title="Inspect Header FX & Lytbox Settings"
              className={`p-2 rounded-full transition-colors cursor-pointer ${
                !isSticky && currentPage !== 'home'
                  ? 'text-stone-400 hover:text-[#051650] hover:bg-stone-100'
                  : 'text-white/50 hover:text-white hover:bg-white/10'
              }`}
              aria-label="Configure Header FX"
            >
              <Sliders className="w-3.5 h-3.5" />
            </button>

            {/* Mobile Menu Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`lg:hidden p-2 rounded-lg cursor-pointer focus:outline-none ${
                !isSticky && currentPage !== 'home'
                  ? 'text-[#051650] hover:bg-stone-100'
                  : 'text-white hover:bg-white/10'
              }`}
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#051650] text-white border-t border-white/10 px-5 pt-3 pb-6 shadow-2xl mt-3 rounded-2xl mx-3 animate-in slide-in-from-top-2 duration-200">
            <div className="flex flex-col gap-2 pt-2">
              {primaryNavItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`text-left py-2 px-3 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                    currentPage === item.id
                      ? 'bg-white/10 text-[#FAC775] font-semibold border-l-2 border-[#FAC775]'
                      : 'text-stone-300 hover:bg-white/5'
                  }`}
                >
                  {item.label}
                </button>
              ))}

              {/* Mobile Resources Accordion */}
              <div className="border-t border-white/10 pt-2 mt-1">
                <button
                  onClick={() => setMobileResourcesOpen(!mobileResourcesOpen)}
                  className="w-full flex items-center justify-between py-2 px-3 rounded-lg text-sm font-medium text-stone-200 hover:bg-white/5"
                >
                  <span className={isResourcesActive ? 'text-[#FAC775] font-semibold' : ''}>Resources</span>
                  <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${mobileResourcesOpen ? 'rotate-180' : ''}`} />
                </button>

                {mobileResourcesOpen && (
                  <div className="pl-4 pr-2 py-1 space-y-1 bg-white/5 rounded-xl mt-1">
                    <button
                      onClick={() => handleNavClick('newsletters')}
                      className={`w-full text-left py-2 px-2.5 rounded-lg text-xs font-medium flex items-center gap-2 ${
                        currentPage === 'newsletters' ? 'text-[#FAC775] font-semibold' : 'text-stone-300'
                      }`}
                    >
                      <Mail className="w-3.5 h-3.5 text-[#FAC775]" />
                      <span>Newsletters</span>
                    </button>
                    <button
                      onClick={() => handleNavClick('policy-brief')}
                      className={`w-full text-left py-2 px-2.5 rounded-lg text-xs font-medium flex items-center gap-2 ${
                        currentPage === 'policy-brief' ? 'text-[#FAC775] font-semibold' : 'text-stone-300'
                      }`}
                    >
                      <BookOpen className="w-3.5 h-3.5 text-[#FAC775]" />
                      <span>SAMIN Policy Brief</span>
                    </button>
                  </div>
                )}
              </div>

              {/* Mobile CTA: Contact Us Button */}
              <div className="pt-3 border-t border-white/10 flex flex-col gap-2">
                <button
                  onClick={() => handleNavClick('contact')}
                  className="w-full py-2.5 rounded-full bg-white text-[#051650] font-semibold text-sm flex items-center justify-center gap-2 shadow-md cursor-pointer"
                >
                  <span>Contact Us</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => {
                    setIsSnippetsModalOpen(true);
                    setMobileMenuOpen(false);
                  }}
                  className="flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-xs font-medium text-stone-300 bg-white/5 border border-white/10"
                >
                  <Sliders className="w-3.5 h-3.5 text-[#FAC775]" />
                  <span>Configure Header FX & View Code</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* =========================================================================
          LYTBOX FLUENT SNIPPETS & LIVE CONTROLS MODAL
          Allows user to test scroll distance, animation speed, island mode,
          and copy the exact JavaScript & CSS for Fluent Snippets!
          ========================================================================= */}
      {isSnippetsModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-hidden shadow-2xl border border-stone-200 flex flex-col text-stone-900">
            
            {/* Modal Header */}
            <div className="p-6 bg-[#051650] text-white flex items-center justify-between border-b border-[#FAC775]/20">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-[#FAC775]/20 text-[#FAC775]">
                  <Sliders className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold font-serif-heading text-white">
                    Lytbox Hide-and-Show Sticky Header Controls
                  </h3>
                  <p className="text-xs text-stone-300">
                    Fluent Snippets JS & CSS code, logo-1/logo-2 swap, and live scroll threshold
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsSnippetsModalOpen(false)}
                className="text-stone-300 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto space-y-6 text-xs flex-1">
              
              {/* Live Status Telemetry Ribbon */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-stone-50 p-4 rounded-2xl border border-stone-200">
                <div>
                  <span className="text-[10px] uppercase font-bold text-stone-400">Current Scroll Y</span>
                  <p className="text-base font-mono font-bold text-[#051650] mt-0.5">{Math.round(scrollY)}px</p>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-stone-400">Trigger Threshold</span>
                  <p className="text-base font-mono font-bold text-[#051650] mt-0.5">{stickyAfterPx}px</p>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-stone-400">Header State</span>
                  <p className="text-base font-bold mt-0.5 flex items-center gap-1.5">
                    <span className={`w-2 h-2 rounded-full ${isSticky ? 'bg-emerald-500' : 'bg-stone-400'}`} />
                    <span className={isSticky ? 'text-emerald-700' : 'text-stone-600'}>
                      {isSticky ? 'Sticky Revealed' : 'Normal Flow'}
                    </span>
                  </p>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-stone-400">Active Logo Class</span>
                  <p className="text-base font-mono font-bold text-[#051650] mt-0.5">
                    {isSticky ? '.logo-2 (Sticky)' : '.logo-1 (Top)'}
                  </p>
                </div>
              </div>

              {/* Interactive Tuners */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 p-4 rounded-2xl border border-stone-200 bg-white">
                <div>
                  <label className="block font-bold text-[#051650] mb-1">
                    Scroll Distance (`STICKY_AFTER_PX`)
                  </label>
                  <p className="text-[11px] text-stone-500 mb-2">
                    Pixels scrolled before header slides back down.
                  </p>
                  <div className="flex items-center gap-2">
                    <input
                      type="range"
                      min="150"
                      max="1200"
                      step="50"
                      value={stickyAfterPx}
                      onChange={(e) => setStickyAfterPx(Number(e.target.value))}
                      className="w-full accent-[#051650]"
                    />
                    <span className="font-mono font-bold text-[#051650] shrink-0 w-12 text-right">
                      {stickyAfterPx}px
                    </span>
                  </div>
                  <div className="flex gap-1.5 mt-2">
                    <button
                      onClick={() => setStickyAfterPx(350)}
                      className="px-2 py-0.5 rounded bg-stone-100 hover:bg-stone-200 text-[10px] font-medium"
                    >
                      350px (Quick)
                    </button>
                    <button
                      onClick={() => setStickyAfterPx(600)}
                      className="px-2 py-0.5 rounded bg-stone-100 hover:bg-stone-200 text-[10px] font-medium"
                    >
                      600px (Medium)
                    </button>
                    <button
                      onClick={() => setStickyAfterPx(1000)}
                      className="px-2 py-0.5 rounded bg-stone-100 hover:bg-stone-200 text-[10px] font-medium"
                    >
                      1000px (Lytbox Default)
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-[#051650] mb-1">
                    Animation Speed (`ANIM_MS`)
                  </label>
                  <p className="text-[11px] text-stone-500 mb-2">
                    Slide-in and slide-up transition duration.
                  </p>
                  <div className="flex items-center gap-2">
                    <input
                      type="range"
                      min="100"
                      max="450"
                      step="20"
                      value={animMs}
                      onChange={(e) => setAnimMs(Number(e.target.value))}
                      className="w-full accent-[#051650]"
                    />
                    <span className="font-mono font-bold text-[#051650] shrink-0 w-12 text-right">
                      {animMs}ms
                    </span>
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-[#051650] mb-1">
                    Sticky Style Variant
                  </label>
                  <p className="text-[11px] text-stone-500 mb-2">
                    As shown in Lytbox Screenshot 1 vs Screenshot 2:
                  </p>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setIsIslandMode(true)}
                      className={`flex-1 py-1.5 px-2.5 rounded-lg border text-[11px] font-semibold transition-all ${
                        isIslandMode
                          ? 'bg-[#051650] text-[#FAC775] border-[#051650]'
                          : 'bg-stone-50 text-stone-600 border-stone-200 hover:bg-stone-100'
                      }`}
                    >
                      Floating Island
                    </button>
                    <button
                      onClick={() => setIsIslandMode(false)}
                      className={`flex-1 py-1.5 px-2.5 rounded-lg border text-[11px] font-semibold transition-all ${
                        !isIslandMode
                          ? 'bg-[#051650] text-[#FAC775] border-[#051650]'
                          : 'bg-stone-50 text-stone-600 border-stone-200 hover:bg-stone-100'
                      }`}
                    >
                      Full Width Bar
                    </button>
                  </div>
                </div>
              </div>

              {/* The Two-Part Mechanism Breakdown */}
              <div className="p-4 bg-amber-50/70 border border-amber-200 rounded-2xl space-y-2">
                <h4 className="font-bold text-[#051650] flex items-center gap-1.5 text-xs">
                  <Sparkles className="w-4 h-4 text-amber-700" />
                  <span>How The Mechanism Operates (Lytbox Tutorial Steps)</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-[11px] text-stone-700">
                  <div className="bg-white/80 p-2.5 rounded-xl border border-amber-100">
                    <p className="font-bold text-[#051650] mb-1">1. The Hide / Reveal Foundation</p>
                    <p>
                      Header slides off the top with normal page scroll. When reaching <code>{stickyAfterPx}px</code>, it primes off-screen at <code>-110%</code>, then slides down revealing itself with frosted glass.
                    </p>
                  </div>
                  <div className="bg-white/80 p-2.5 rounded-xl border border-amber-100">
                    <p className="font-bold text-[#051650] mb-1">2. The Logo Swap (.logo-1 &amp; .logo-2)</p>
                    <p>
                      While the header is off-screen, <code>.logo-1</code> is hidden and <code>.logo-2</code> is shown. Because the swap happens off-screen, visitors experience zero visual pop-in or layout shift.
                    </p>
                  </div>
                </div>
              </div>

              {/* Code Export Tabs */}
              <div className="space-y-4">
                {/* JavaScript Snippet for Fluent Snippets */}
                <div className="border border-stone-200 rounded-2xl overflow-hidden">
                  <div className="bg-stone-100 px-4 py-2.5 flex items-center justify-between border-b border-stone-200">
                    <span className="font-bold text-[#051650] flex items-center gap-1.5">
                      <span>Fluent Snippets: JavaScript Snippet</span>
                      <span className="text-[10px] font-normal text-stone-500">(Add as JS snippet, runs in Footer)</span>
                    </span>
                    <button
                      onClick={() => handleCopyCode(fluentJsSnippet, 'js')}
                      className="flex items-center gap-1 px-2.5 py-1 rounded bg-[#051650] text-[#FAC775] text-[11px] font-semibold hover:bg-[#020b2b] transition-colors cursor-pointer"
                    >
                      {copiedSnippet === 'js' ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                          <span>Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copy JS Code</span>
                        </>
                      )}
                    </button>
                  </div>
                  <pre className="bg-[#020b2b] text-[#FAC775] p-4 text-[11px] font-mono overflow-x-auto max-h-56 leading-relaxed">
                    {fluentJsSnippet}
                  </pre>
                </div>

                {/* CSS Snippet for Fluent Snippets / Elementor */}
                <div className="border border-stone-200 rounded-2xl overflow-hidden">
                  <div className="bg-stone-100 px-4 py-2.5 flex items-center justify-between border-b border-stone-200">
                    <span className="font-bold text-[#051650] flex items-center gap-1.5">
                      <span>Fluent Snippets: CSS Snippet</span>
                      <span className="text-[10px] font-normal text-stone-500">(Add as CSS snippet or in Site Settings &gt; Custom CSS)</span>
                    </span>
                    <button
                      onClick={() => handleCopyCode(fluentCssSnippet, 'css')}
                      className="flex items-center gap-1 px-2.5 py-1 rounded bg-[#051650] text-[#FAC775] text-[11px] font-semibold hover:bg-[#020b2b] transition-colors cursor-pointer"
                    >
                      {copiedSnippet === 'css' ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                          <span>Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copy CSS Code</span>
                        </>
                      )}
                    </button>
                  </div>
                  <pre className="bg-[#020b2b] text-[#FAC775] p-4 text-[11px] font-mono overflow-x-auto max-h-56 leading-relaxed">
                    {fluentCssSnippet}
                  </pre>
                </div>
              </div>

            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-stone-50 border-t border-stone-200 flex items-center justify-between">
              <span className="text-[11px] text-stone-500">
                Class applied on main container: <code className="font-bold text-[#051650]">.lytbox-header</code>
              </span>
              <button
                onClick={() => setIsSnippetsModalOpen(false)}
                className="px-5 py-2 rounded-xl bg-[#051650] text-[#FAC775] font-semibold hover:bg-[#020b2b] transition-colors cursor-pointer text-xs"
              >
                Close &amp; Test Live
              </button>
            </div>

          </div>
        </div>
      )}
    </>
  );
};
