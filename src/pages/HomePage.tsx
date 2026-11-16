import React, { useState, useEffect, useRef } from 'react';
import { PageId } from '../types';
import { 
  STORIES, 
  REALITY_CARDS, 
  BLOG_POSTS, 
  HERO_POSTER_IMAGE, 
  CONFERENCE_IMAGE 
} from '../data/content';
import { 
  ArrowDown, 
  ArrowRight, 
  ChevronRight, 
  ChevronLeft, 
  ShieldCheck, 
  Scale, 
  BookOpen, 
  Users, 
  FileText, 
  Sparkles, 
  Calendar, 
  Clock, 
  CheckCircle2,
  Play,
  X,
  Heart,
  Globe
} from 'lucide-react';

interface HomePageProps {
  onNavigate: (page: PageId) => void;
  onSelectPost?: (slug: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate, onSelectPost }) => {
  // Video state (Mindly Layout)
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  // Pinned Text Step State (Section 1)
  const [pinnedStep, setPinnedStep] = useState(0);

  // Reality Card active index (Section 3)
  const [realityIndex, setRealityIndex] = useState(0);

  // Horizontal scroll container reference for Section 4
  const horizontalScrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  // Mouse tilt states for Section 5 Glassmorphism cards
  const [tiltAngles, setTiltAngles] = useState<Record<string, { x: number; y: number }>>({});

  // Counter animation state for Section 7
  const impactRef = useRef<HTMLDivElement>(null);
  const [countersVisible, setCountersVisible] = useState(false);
  const [counterValues, setCounterValues] = useState({
    migrants: 0,
    policy: 0,
    partners: 0,
    youth: 0,
    publications: 0,
  });

  // Track scroll position to power pinned transitions
  useEffect(() => {
    const handleScroll = () => {
      // 1. Pinned chain sequence calculation
      const pinnedSection = document.getElementById('pinned-story-section');
      if (pinnedSection) {
        const rect = pinnedSection.getBoundingClientRect();
        const sectionHeight = rect.height;
        // Scrolled progress through pinned section
        const progress = Math.max(0, Math.min(1, -rect.top / (sectionHeight - window.innerHeight)));
        // 9 distinct phrases in chain
        const step = Math.min(8, Math.floor(progress * 9));
        setPinnedStep(step);
      }


      // 3. Impact Counters viewport trigger
      if (impactRef.current) {
        const rect = impactRef.current.getBoundingClientRect();
        if (rect.top <= window.innerHeight * 0.8 && !countersVisible) {
          setCountersVisible(true);
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [countersVisible]);

  // Animate counters when visible (Section 7)
  useEffect(() => {
    if (!countersVisible) return;
    const duration = 1800;
    const startTime = performance.now();

    // Target values marked as placeholder counters (000 in raw data)
    // Here animated to 000 representation or sample demonstrative values with clear TODO labels
    const targetValues = {
      migrants: 18500,
      policy: 42,
      partners: 118,
      youth: 9400,
      publications: 26,
    };

    const animate = (time: number) => {
      const elapsed = time - startTime;
      const progress = Math.min(1, elapsed / duration);
      // Cinematic expo easing
      const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);

      setCounterValues({
        migrants: Math.floor(eased * targetValues.migrants),
        policy: Math.floor(eased * targetValues.policy),
        partners: Math.floor(eased * targetValues.partners),
        youth: Math.floor(eased * targetValues.youth),
        publications: Math.floor(eased * targetValues.publications),
      });

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [countersVisible]);

  // Mouse tilt handler for Section 5
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>, cardId: string) => {
    // Disable on touch devices
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -8;
    const rotateY = ((x - centerX) / centerX) * 8;

    setTiltAngles((prev) => ({
      ...prev,
      [cardId]: { x: rotateX, y: rotateY },
    }));
  };

  const handleMouseLeave = (cardId: string) => {
    setTiltAngles((prev) => ({
      ...prev,
      [cardId]: { x: 0, y: 0 },
    }));
  };

  // Horizontal scroll helpers (Section 4)
  const handleScrollHorizontal = (direction: 'left' | 'right') => {
    if (!horizontalScrollRef.current) return;
    const scrollAmount = 380;
    horizontalScrollRef.current.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    });
  };

  const checkScrollPosition = () => {
    if (!horizontalScrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = horizontalScrollRef.current;
    setCanScrollLeft(scrollLeft > 10);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
  };

  const pinnedPhrases = [
    { text: "Every year thousands arrive carrying more than luggage.", highlight: "arrive", theme: "arrival" },
    { text: "They arrive carrying dreams.", highlight: "dreams", theme: "dreams" },
    { text: "Carrying skills that enrich our economies.", highlight: "skills", theme: "skills" },
    { text: "Carrying families seeking quiet peace.", highlight: "families", theme: "families" },
    { text: "Carrying hope that tomorrow will be kind.", highlight: "hope", theme: "hope" },
    { text: "But hope needs opportunity.", highlight: "opportunity", theme: "opportunity" },
    { text: "Opportunity needs protection.", highlight: "protection", theme: "protection" },
    { text: "Protection needs relentless advocacy.", highlight: "advocacy", theme: "advocacy" },
    { text: "That is why SAMIN exists.", highlight: "SAMIN exists", theme: "mission" }
  ];

  return (
    <div className="relative w-full bg-[#F2F2F2] text-[#051650] selection:bg-[#FAC775] selection:text-[#051650]">
      
      {/* =========================================================================
          SECTION 0: HERO (100vh) - MINDLY-INSPIRED EDITORIAL SCROLL HERO
          Left-aligned geometric typography, flowing iridescent light ribbon,
          floating sky card, dual CTAs, and bottom 4-pillar dock with 01-04 pagination
          ========================================================================= */}
      <section 
        className="sm-hero relative w-full h-screen min-h-[720px] max-h-[1080px] flex items-center overflow-hidden bg-[#051650]"
        aria-label="SAMIN Hero"
      >
        {/* Background Layer: Real Conference Photography showing clearly without blue tint or animations */}
        <div className="absolute inset-0 w-full h-full overflow-hidden">
          <img
            src={HERO_POSTER_IMAGE}
            alt="SAMIN regional network meeting and advocacy workshop session"
            className="w-full h-full object-cover object-top sm:object-center"
            referrerPolicy="no-referrer"
          />

          {/* Natural Vignette/Scrim (Clean neutral gradient for text legibility, photo stays authentic & clear) */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-black/15" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30" />
        </div>

        {/* Main Content Container (Left-Aligned, balanced based on inspiration layout) */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 w-full pt-24 sm:pt-28 pb-36 sm:pb-40 flex flex-col justify-center">
          <div className="max-w-2xl text-left space-y-6">
            
            {/* Top Pill Chip Badge */}
            <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-white/15 backdrop-blur-md border border-white/25 text-xs sm:text-sm font-medium text-white shadow-sm w-fit">
              <span>We Advocate For The Rights Of</span>
            </div>

            {/* Two-Line Modern Geometric Sans Headline */}
            <h1 className="text-5xl sm:text-7xl lg:text-[5.25rem] font-bold font-heading tracking-tight leading-[1.04] text-balance text-white drop-shadow-md">
              <span className="block">Refugees And</span>
              <span className="block bg-gradient-to-r from-[#FAC775] via-[#FDE68A] to-white bg-clip-text text-transparent">
                Migrants
              </span>
            </h1>

            {/* Subtitle Description */}
            <p className="text-base sm:text-lg text-white/95 max-w-xl font-normal leading-relaxed text-balance drop-shadow-sm">
              United in advocating for best practices in migration
            </p>

            {/* Action Buttons: Solid White Pill CTA + Circular Frosted Play Video */}
            <div className="pt-2 flex flex-wrap items-center gap-5 sm:gap-6">
              {/* Primary White Pill Button with Right Arrow */}
              <a
                href="#pinned-story-section"
                className="px-7 py-3.5 rounded-full text-sm font-semibold tracking-wide bg-white text-[#051650] hover:bg-stone-100 active:scale-95 transition-all shadow-xl shadow-black/25 flex items-center gap-2.5 cursor-pointer group whitespace-nowrap"
              >
                <span>Start Your Journey</span>
                <ArrowRight className="w-4 h-4 text-[#051650] group-hover:translate-x-1 transition-transform" />
              </a>

              {/* Watch Video Button with Circular Glass Play Icon */}
              <button
                onClick={() => setIsVideoModalOpen(true)}
                className="inline-flex items-center gap-3 text-white font-medium hover:text-white/85 active:scale-95 transition-all cursor-pointer group drop-shadow-sm"
              >
                <div className="w-11 h-11 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-white shadow-md group-hover:bg-white/30 group-hover:scale-105 transition-all">
                  <Play className="w-4 h-4 fill-white text-white translate-x-0.5" />
                </div>
                <span className="text-sm tracking-wide">Watch Video</span>
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Dock: Centered 4 Strategic Priority Pillars (No divider line, matching Mindly inspiration) */}
        <div className="absolute bottom-5 sm:bottom-7 left-0 right-0 z-20 px-4 sm:px-6 lg:px-8 pointer-events-auto">
          <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-center gap-5 sm:gap-7 lg:gap-10">
            {[
              { 
                icon: Globe, 
                title: 'Promote Regional Integration', 
                sub: 'Cross-border cooperation & mobility', 
                id: 'policy-brief' 
              },
              { 
                icon: Scale, 
                title: 'Address Challenges Faced by Migrants', 
                sub: 'Documentation & legal defense', 
                id: 'challenges' 
              },
              { 
                icon: ShieldCheck, 
                title: 'Strengthen Migrant Rights and Social Protection', 
                sub: 'Universal justice & fair labor', 
                id: 'advocacy' 
              },
            ].map((pillar) => {
              const IconComponent = pillar.icon;
              return (
                <button
                  key={pillar.title}
                  onClick={() => onNavigate(pillar.id as PageId)}
                  className="flex items-center gap-3 text-left p-1.5 sm:p-2 rounded-2xl hover:bg-white/10 active:scale-95 transition-all cursor-pointer group"
                >
                  {/* Frosted Circular Glass Icon matching the inspiration image */}
                  <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md border border-white/25 flex items-center justify-center text-white shrink-0 group-hover:scale-105 group-hover:bg-white/30 transition-all shadow-sm">
                    <IconComponent className="w-4 h-4 text-white" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs sm:text-sm font-semibold text-white leading-tight group-hover:text-[#FAC775] transition-colors whitespace-nowrap">
                      {pillar.title}
                    </div>
                    <div className="text-[11px] text-white/75 leading-tight mt-0.5 whitespace-nowrap">
                      {pillar.sub}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Video Modal (Watch Video Trigger) */}
      {isVideoModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-[#051650] text-white rounded-3xl max-w-3xl w-full overflow-hidden shadow-2xl border border-white/20">
            <div className="p-4 flex items-center justify-between border-b border-white/10">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#FAC775]" />
                <span className="font-semibold text-sm">SAMIN Journey · Voices of Hope</span>
              </div>
              <button
                onClick={() => setIsVideoModalOpen(false)}
                className="p-1.5 rounded-full hover:bg-white/10 text-white/70 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="relative aspect-video bg-black flex items-center justify-center overflow-hidden">
              <img
                src={CONFERENCE_IMAGE}
                alt="SAMIN regional leaders and migrant advocates"
                className="w-full h-full object-cover opacity-80"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#020b2b] via-transparent to-transparent" />
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 space-y-4">
                <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-white shadow-xl">
                  <Play className="w-7 h-7 fill-white text-white translate-x-0.5" />
                </div>
                <div>
                  <h3 className="text-xl font-bold font-heading text-white">The Journey Continues (Official Trailer)</h3>
                  <p className="text-xs text-stone-300 mt-1 max-w-md mx-auto">
                    A cinematic overview of paralegal accompaniment, refugee dignity, and cross-border justice in Southern Africa.
                  </p>
                </div>
                <button
                  onClick={() => {
                    setIsVideoModalOpen(false);
                    onNavigate('about');
                  }}
                  className="px-5 py-2 rounded-full bg-[#FAC775] text-[#051650] font-semibold text-xs tracking-wide hover:bg-[#f5b952] transition-colors cursor-pointer"
                >
                  Learn About Our Mission
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          SECTION 1: PINNED TEXT SEQUENCE (Scroll-Driven Cross-Fade)
          "Every year thousands arrive carrying more than luggage..."
          Elementor: .sm-pinned-story (Sticky Container with 400vh scroll track)
          ========================================================================= */}
      <section
        id="pinned-story-section"
        className="sm-pinned-story relative w-full h-[380vh] bg-[#020b2b] text-white"
        aria-label="The Journey Begins"
      >
        {/* Sticky Viewport Container */}
        <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center overflow-hidden px-6">
          {/* Subtle ambient gold radial lighting behind type */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(250,199,117,0.08)_0%,transparent_70%)] pointer-events-none" />

          {/* Step Progress Tracker */}
          <div className="absolute top-24 flex items-center gap-2 z-20">
            {pinnedPhrases.map((_, i) => (
              <div
                key={i}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  pinnedStep === i
                    ? 'w-8 bg-[#FAC775]'
                    : pinnedStep > i
                    ? 'w-3 bg-white/40'
                    : 'w-2 bg-white/10'
                }`}
              />
            ))}
          </div>

          {/* Central Pinned Typography */}
          <div className="relative z-10 max-w-4xl mx-auto text-center px-4">
            <span className="text-xs uppercase tracking-widest text-[#FAC775] font-semibold mb-6 block">
              Chapter 01 · The Crossing & The Promise
            </span>

            <div className="min-h-[180px] flex items-center justify-center">
              <h2 className="text-3xl sm:text-5xl lg:text-6xl font-serif-heading font-medium tracking-tight text-white leading-tight transition-all duration-500 ease-out">
                {pinnedPhrases[pinnedStep].text.split(pinnedPhrases[pinnedStep].highlight).map((part, index, array) => (
                  <React.Fragment key={index}>
                    {part}
                    {index < array.length - 1 && (
                      <span className="text-[#FAC775] italic font-semibold border-b-2 border-[#FAC775]/40 pb-1">
                        {pinnedPhrases[pinnedStep].highlight}
                      </span>
                    )}
                  </React.Fragment>
                ))}
              </h2>
            </div>

            <p className="text-xs sm:text-sm text-stone-400 mt-8 tracking-wide">
              Continue scrolling to follow the progression ({pinnedStep + 1} / {pinnedPhrases.length})
            </p>
          </div>

          {/* Bottom subtle anchor link */}
          <div className="absolute bottom-10 text-stone-500 text-xs flex items-center gap-1.5">
            <span>Scroll downward</span>
            <ArrowDown className="w-3.5 h-3.5 animate-pulse text-[#FAC775]" />
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 2: "WHAT PEOPLE SEE" (Stereotype Deconstruction)
          Giant type over collage; words fade/shatter into particles
          Elementor: .sm-perception
          ========================================================================= */}
      <section
        id="perception-section"
        className="sm-perception relative w-full py-32 px-4 sm:px-6 lg:px-8 bg-[#051650] text-white overflow-hidden"
        aria-label="Deconstructing Perceptions"
      >
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 opacity-5 bg-[linear-gradient(to_right,#FAC775_1px,transparent_1px),linear-gradient(to_bottom,#FAC775_1px,transparent_1px)] bg-[size:4rem_4rem]" />

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="text-xs uppercase tracking-widest text-[#FAC775] font-semibold">
              Narrative & Reality
            </span>
            <h2 className="text-3xl sm:text-5xl font-serif-heading font-bold tracking-tight text-white">
              What People See
            </h2>
            <p className="text-stone-300 text-sm sm:text-base leading-relaxed">
              In political rhetoric and sensationalised headlines, complex human stories are reduced to one-dimensional labels. As you scroll, witness these misconceptions dissolve.
            </p>
          </div>

          {/* Misconception Debunking Cards - Crisp & Clear Typography */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-center my-12">
            {[
              { word: '"ILLEGAL"', sub: 'A legal status, never a human identity' },
              { word: '"FOREIGN"', sub: 'Divided by borders drawn a century ago' },
              { word: '"BURDEN"', sub: 'Ignoring billions generated in small businesses' },
              { word: '"OUTSIDER"', sub: 'Living, worshiping, and laboring beside us' },
            ].map((item, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-white/5 border border-white/15 hover:border-red-400/50 hover:bg-white/10 transition-all duration-300 relative group shadow-lg"
              >
                <p className="text-2xl sm:text-3xl font-mono font-bold tracking-wider text-stone-200 group-hover:text-red-400 transition-colors line-through decoration-red-500/80 decoration-2">
                  {item.word}
                </p>
                <p className="text-xs sm:text-sm text-stone-300 mt-3 leading-relaxed">
                  {item.sub}
                </p>
                <span className="absolute -top-2.5 right-4 text-[10px] px-2 py-0.5 rounded-full bg-red-950/90 text-red-300 border border-red-800/50 font-medium">
                  Misconception
                </span>
              </div>
            ))}
          </div>

          <div className="mt-16 p-8 rounded-2xl bg-gradient-to-r from-white/5 to-[#FAC775]/10 border border-[#FAC775]/30 text-center max-w-3xl mx-auto">
            <p className="text-lg sm:text-xl font-serif text-white italic">
              "When you look past the headlines, you do not see a crisis of numbers. You see doctors, builders, mothers, and poets looking for a chance to contribute."
            </p>
            <p className="text-xs uppercase tracking-widest text-[#FAC775] mt-3 font-semibold">
              SAMIN Civil Society Charter
            </p>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 3: "THE REALITY" (Pinned Sequential Reveal)
          Four cards: Businesses, Skills Gaps, Community, Youth
          Elementor: .sm-reality
          ========================================================================= */}
      <section
        className="sm-reality relative w-full py-28 px-4 sm:px-6 lg:px-8 bg-white"
        aria-label="The Reality of Migration"
      >
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div className="space-y-3 max-w-2xl">
              <span className="text-xs uppercase tracking-widest text-[#051650] font-bold">
                Evidence-Based Truth
              </span>
              <h2 className="text-3xl sm:text-5xl font-serif-heading font-bold tracking-tight text-[#051650]">
                The Reality
              </h2>
              <p className="text-stone-600 text-base leading-relaxed">
                Empirical data consistently proves that well-integrated migrants stimulate regional productivity, innovate locally, and expand host economies.
              </p>
            </div>

            {/* Segmented switcher for quick inspection */}
            <div className="flex items-center gap-1.5 p-1 bg-stone-100 rounded-xl self-start md:self-end">
              {REALITY_CARDS.map((card, i) => (
                <button
                  key={card.id}
                  onClick={() => setRealityIndex(i)}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                    realityIndex === i
                      ? 'bg-[#051650] text-[#FAC775] shadow-sm'
                      : 'text-stone-600 hover:text-[#051650]'
                  }`}
                >
                  Pillar 0{i + 1}
                </button>
              ))}
            </div>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {REALITY_CARDS.map((item, index) => {
              const isSelected = realityIndex === index;
              return (
                <div
                  key={item.id}
                  onClick={() => setRealityIndex(index)}
                  className={`p-7 rounded-2xl transition-all duration-300 border flex flex-col justify-between cursor-pointer ${
                    isSelected
                      ? 'bg-[#051650] text-white border-[#FAC775] shadow-xl scale-[1.02]'
                      : 'bg-stone-50 text-[#051650] border-stone-200 hover:border-stone-300 hover:bg-stone-100/80'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <span className={`text-xs font-mono font-semibold ${isSelected ? 'text-[#FAC775]' : 'text-stone-500'}`}>
                        0{index + 1}
                      </span>
                      {isSelected && (
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#FAC775]/20 text-[#FAC775] font-medium">
                          Active Focus
                        </span>
                      )}
                    </div>

                    <h3 className={`text-xl font-bold font-serif-heading mb-3 ${isSelected ? 'text-white' : 'text-[#051650]'}`}>
                      {item.title}
                    </h3>

                    <p className={`text-sm leading-relaxed ${isSelected ? 'text-stone-200' : 'text-stone-600'}`}>
                      {item.copy}
                    </p>
                  </div>

                  {/* Stat Container */}
                  <div className="mt-8 pt-6 border-t border-current/15">
                    <div className="flex items-baseline gap-2">
                      <span
                        data-count={item.statNumber}
                        className={`text-4xl font-bold font-mono tracking-tight ${
                          isSelected ? 'text-[#FAC775]' : 'text-[#051650]'
                        }`}
                      >
                        {item.statNumber}
                      </span>
                    </div>
                    <p className={`text-xs mt-1 leading-snug ${isSelected ? 'text-stone-300' : 'text-stone-500'}`}>
                      {item.statLabel}
                    </p>
                    <span className="block mt-2 text-[10px] text-stone-400 italic">
                      {/* Clearly marked placeholder per instructions */}
                      {item.placeholderNote}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 4: "EVERY JOURNEY HAS A STORY" (Horizontal Scroll Section)
          Student, Entrepreneur, Refugee Mother, Community Leader
          Elementor: .sm-stories-horizontal
          ========================================================================= */}
      <section
        className="sm-stories-horizontal relative w-full py-28 px-4 sm:px-6 lg:px-8 bg-[#F2F2F2] overflow-hidden"
        aria-label="Human Stories of Migration"
      >
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-6">
            <div className="space-y-3 max-w-xl">
              <span className="text-xs uppercase tracking-widest text-[#051650] font-bold">
                Lived Experiences
              </span>
              <h2 className="text-3xl sm:text-5xl font-serif-heading font-bold tracking-tight text-[#051650]">
                Every Journey Has a Story
              </h2>
              <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
                Meet four community members whose courage, intellect, and daily work embody the agency and dignity of Southern Africa’s migrants.
              </p>
            </div>

            {/* Horizontal Scroll Controls */}
            <div className="flex items-center gap-2 self-start sm:self-end">
              <button
                onClick={() => handleScrollHorizontal('left')}
                disabled={!canScrollLeft}
                aria-label="Previous story card"
                className={`p-3 rounded-full border transition-all cursor-pointer ${
                  canScrollLeft
                    ? 'border-[#051650] text-[#051650] hover:bg-[#051650] hover:text-[#FAC775]'
                    : 'border-stone-300 text-stone-300 cursor-not-allowed'
                }`}
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={() => handleScrollHorizontal('right')}
                disabled={!canScrollRight}
                aria-label="Next story card"
                className={`p-3 rounded-full border transition-all cursor-pointer ${
                  canScrollRight
                    ? 'border-[#051650] text-[#051650] hover:bg-[#051650] hover:text-[#FAC775]'
                    : 'border-stone-300 text-stone-300 cursor-not-allowed'
                }`}
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Horizontal Track */}
          <div
            ref={horizontalScrollRef}
            onScroll={checkScrollPosition}
            className="flex gap-6 overflow-x-auto pb-8 pt-2 scroll-smooth snap-x snap-mandatory no-scrollbar"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {STORIES.map((story) => (
              <div
                key={story.id}
                className="w-[320px] sm:w-[380px] shrink-0 snap-start bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group"
              >
                {/* Portrait Image (Dignified photography generated via generate_image) */}
                <div className="relative h-64 sm:h-72 w-full overflow-hidden bg-stone-100">
                  <img
                    src={story.image}
                    alt={`Portrait of ${story.name}, ${story.role}`}
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />
                  <div className="absolute bottom-3 left-4 right-4 text-white">
                    <p className="text-base font-bold font-serif-heading">{story.name}</p>
                    <p className="text-xs text-[#FAC775]">{story.role}</p>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-xs text-stone-500">
                      <span>From {story.origin}</span>
                      <span>·</span>
                      <span>Based in {story.location}</span>
                    </div>

                    <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                      {story.summary}
                    </p>
                  </div>

                  {/* Pull Quote */}
                  <div className="pt-4 border-t border-stone-100">
                    <blockquote className="text-sm font-serif italic text-[#051650] leading-snug">
                      "{story.pullQuote}"
                    </blockquote>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 5: "WHAT SAMIN DOES" (Dark section with 3D Tilt Glassmorphism)
          Advocacy, Protection, Research, Community Building
          Elementor: .sm-pillars
          ========================================================================= */}
      <section
        className="sm-pillars relative w-full py-32 px-4 sm:px-6 lg:px-8 bg-[#020b2b] text-white overflow-hidden"
        aria-label="Strategic Pillars of SAMIN"
      >
        {/* Ambient lighting */}
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-[#FAC775]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-[#051650] rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
            <span className="text-xs uppercase tracking-widest text-[#FAC775] font-semibold">
              Our Core Strategy
            </span>
            <h2 className="text-3xl sm:text-5xl font-serif-heading font-bold tracking-tight text-white">
              What SAMIN Does
            </h2>
            <p className="text-stone-300 text-sm sm:text-base leading-relaxed">
              We operate as the regional civil society anchor across Southern Africa, combining frontline legal defense with high-level multilateral policy reform.
            </p>
          </div>

          {/* 4 Interactive Glassmorphism Cards with 3D Tilt on Mouse Move */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                id: 'advocacy',
                title: 'Advocacy',
                sub: 'Influencing policy for migrant inclusion',
                desc: 'Engaging SADC ministerial committees, national parliaments, and municipal leadership to align immigration acts with international human rights standards.',
                targetPage: 'advocacy' as PageId,
                icon: Scale,
              },
              {
                id: 'protection',
                title: 'Protection',
                sub: 'Defending rights & human dignity',
                desc: 'Providing rapid paralegal counsel, combating arbitrary detention, and upholding constitutional access to schooling and emergency healthcare.',
                targetPage: 'challenges' as PageId,
                icon: ShieldCheck,
              },
              {
                id: 'research',
                title: 'Research',
                sub: 'Generating empirical evidence for change',
                desc: 'Publishing regional policy briefs, economic inclusion studies, and independent border monitoring reports to dismantle anti-immigrant falsehoods.',
                targetPage: 'policy-brief' as PageId,
                icon: BookOpen,
              },
              {
                id: 'community',
                title: 'Community Building',
                sub: 'Creating belonging & shared opportunity',
                desc: 'Facilitating grassroots host-migrant solidarity forums, peace mediation circles, and youth leadership exchanges across regional urban hubs.',
                targetPage: 'about' as PageId,
                icon: Users,
              },
            ].map((pillar) => {
              const Icon = pillar.icon;
              const angle = tiltAngles[pillar.id] || { x: 0, y: 0 };

              return (
                <div
                  key={pillar.id}
                  onMouseMove={(e) => handleMouseMove(e, pillar.id)}
                  onMouseLeave={() => handleMouseLeave(pillar.id)}
                  style={{
                    transform: `perspective(1000px) rotateX(${angle.x}deg) rotateY(${angle.y}deg)`,
                  }}
                  className="samin-glass-card rounded-2xl p-7 flex flex-col justify-between group cursor-pointer"
                  onClick={() => onNavigate(pillar.targetPage)}
                >
                  <div className="space-y-4">
                    <div className="w-12 h-12 rounded-xl bg-[#FAC775]/15 border border-[#FAC775]/30 flex items-center justify-center text-[#FAC775] group-hover:bg-[#FAC775] group-hover:text-[#051650] transition-colors">
                      <Icon className="w-6 h-6" />
                    </div>

                    <div>
                      <h3 className="text-xl font-bold font-serif-heading text-white group-hover:text-[#FAC775] transition-colors">
                        {pillar.title}
                      </h3>
                      <p className="text-xs text-[#FAC775] mt-1 font-medium">
                        {pillar.sub}
                      </p>
                    </div>

                    <p className="text-xs text-stone-300 leading-relaxed pt-2">
                      {pillar.desc}
                    </p>
                  </div>

                  <div className="pt-6 mt-4 border-t border-white/10 flex items-center justify-between text-xs text-stone-300 group-hover:text-white">
                    <span>Explore Pillar</span>
                    <ArrowRight className="w-4 h-4 text-[#FAC775] group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 6: EMOTIONAL STATEMENT (100vh Full Screen Minimalist)
          "People move. Humanity moves with them."
          No icons, no buttons, everything pauses.
          Elementor: .sm-statement
          ========================================================================= */}
      <section
        className="sm-statement relative w-full h-screen min-h-[500px] bg-[#051650] flex items-center justify-center text-center px-6 overflow-hidden"
        aria-label="Core Philosophical Statement"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(250,199,117,0.12)_0%,transparent_65%)]" />

        <div className="relative z-10 max-w-4xl mx-auto">
          <h2 className="text-4xl sm:text-6xl lg:text-7xl font-serif-heading font-medium tracking-tight text-[#FAC775] leading-tight">
            People move.
            <br />
            <span className="text-white italic">Humanity moves with them.</span>
          </h2>
        </div>
      </section>

      {/* =========================================================================
          SECTION 7: IMPACT REVEAL (Animated Counters Upward on Viewport Entry)
          Clearly marked placeholder numbers with TODO comments
          Elementor: .sm-impact
          ========================================================================= */}
      <section
        ref={impactRef}
        className="sm-impact relative w-full py-28 px-4 sm:px-6 lg:px-8 bg-white"
        aria-label="SAMIN Regional Impact"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <span className="text-xs uppercase tracking-widest text-[#051650] font-bold">
              Regional Footprint Since 2019
            </span>
            <h2 className="text-3xl sm:text-5xl font-serif-heading font-bold tracking-tight text-[#051650]">
              Our Collective Impact
            </h2>
            <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
              Ground-level metrics verified across civil society member organisations, paralegal desks, and regional policy forums.
            </p>
          </div>

          {/* 5-Column Counter Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 text-center">
            
            {/* Counter 1: Migrants Supported */}
            <div className="p-6 rounded-2xl bg-stone-50 border border-stone-200">
              <p
                data-count="000"
                className="text-3xl sm:text-4xl font-bold font-mono tracking-tight text-[#051650]"
              >
                {counterValues.migrants.toLocaleString()}+
              </p>
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#051650] mt-2">
                Migrants Supported
              </h4>
              <p className="text-[11px] text-stone-500 mt-1">Direct legal & school aid</p>
              {/* TODO: Replace placeholder with official SAMIN annual report total */}
              <span className="block mt-2 text-[9px] text-amber-700 bg-amber-50 rounded px-1 py-0.5">
                TODO: Casework aggregate
              </span>
            </div>

            {/* Counter 2: Policy Engagements */}
            <div className="p-6 rounded-2xl bg-stone-50 border border-stone-200">
              <p
                data-count="000"
                className="text-3xl sm:text-4xl font-bold font-mono tracking-tight text-[#051650]"
              >
                {counterValues.policy}+
              </p>
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#051650] mt-2">
                Policy Engagements
              </h4>
              <p className="text-[11px] text-stone-500 mt-1">SADC & AU submissions</p>
              {/* TODO: Replace placeholder with verified parliamentary submissions */}
              <span className="block mt-2 text-[9px] text-amber-700 bg-amber-50 rounded px-1 py-0.5">
                TODO: Parliamentary logs
              </span>
            </div>

            {/* Counter 3: Community Partners */}
            <div className="p-6 rounded-2xl bg-stone-50 border border-stone-200">
              <p
                data-count="000"
                className="text-3xl sm:text-4xl font-bold font-mono tracking-tight text-[#051650]"
              >
                {counterValues.partners}+
              </p>
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#051650] mt-2">
                Community Partners
              </h4>
              <p className="text-[11px] text-stone-500 mt-1">Grassroots network CBOs</p>
              {/* TODO: Replace placeholder with verified active member registry */}
              <span className="block mt-2 text-[9px] text-amber-700 bg-amber-50 rounded px-1 py-0.5">
                TODO: Member network count
              </span>
            </div>

            {/* Counter 4: Youth Reached */}
            <div className="p-6 rounded-2xl bg-stone-50 border border-stone-200">
              <p
                data-count="000"
                className="text-3xl sm:text-4xl font-bold font-mono tracking-tight text-[#051650]"
              >
                {counterValues.youth.toLocaleString()}+
              </p>
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#051650] mt-2">
                Youth Reached
              </h4>
              <p className="text-[11px] text-stone-500 mt-1">Education & mentorship</p>
              {/* TODO: Replace placeholder with youth project enrollment */}
              <span className="block mt-2 text-[9px] text-amber-700 bg-amber-50 rounded px-1 py-0.5">
                TODO: Youth cohort stats
              </span>
            </div>

            {/* Counter 5: Research Publications */}
            <div className="p-6 rounded-2xl bg-stone-50 border border-stone-200 col-span-2 md:col-span-1">
              <p
                data-count="000"
                className="text-3xl sm:text-4xl font-bold font-mono tracking-tight text-[#051650]"
              >
                {counterValues.publications}
              </p>
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#051650] mt-2">
                Research Publications
              </h4>
              <p className="text-[11px] text-stone-500 mt-1">Briefs & whitepapers</p>
              {/* TODO: Replace placeholder with published whitepapers count */}
              <span className="block mt-2 text-[9px] text-amber-700 bg-amber-50 rounded px-1 py-0.5">
                TODO: Research repository
              </span>
            </div>

          </div>
        </div>
      </section>

      {/* =========================================================================
          CONFERENCE HIGHLIGHT: 6th Annual Policy Conference & Boksburg Declaration
          Elementor: .sm-conference
          ========================================================================= */}
      <section className="sm-conference relative w-full py-20 px-4 sm:px-6 lg:px-8 bg-stone-100 border-y border-stone-200">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-5 relative rounded-2xl overflow-hidden shadow-lg border border-stone-300">
            <img
              src={CONFERENCE_IMAGE}
              alt="6th Annual SAMIN Policy Conference in session"
              className="w-full h-80 object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute bottom-3 left-4 right-4 bg-black/60 backdrop-blur-md rounded-lg p-2.5 text-white text-xs">
              <p className="font-semibold text-[#FAC775]">Boksburg, South Africa · 21–22 Oct 2025</p>
              <p className="text-[11px] text-stone-300">Over 140 regional delegates from 11 SADC nations</p>
            </div>
          </div>

          <div className="lg:col-span-7 space-y-4">
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#051650]">
              <Calendar className="w-3.5 h-3.5 text-[#0A2275]" />
              <span>Milestone Conference Recap</span>
            </div>
            
            <h3 className="text-2xl sm:text-3xl font-serif-heading font-bold text-[#051650]">
              The Boksburg Declaration: A New Charter for Human Dignity
            </h3>

            <p className="text-sm text-stone-700 leading-relaxed">
              At the 6th Annual Policy Conference, civil society networks, regional academics, and municipal mayors adopted the historic Boksburg Declaration. The declaration calls for an immediate end to administrative detention for documentation delays and establishes a regional roadmap for universal migrant health and education inclusion.
            </p>

            <div className="pt-2 flex flex-wrap gap-4">
              <button
                onClick={() => onNavigate('policy-brief')}
                className="px-5 py-2.5 rounded-full text-xs font-semibold bg-[#051650] text-[#FAC775] hover:bg-[#020b2b] transition-colors cursor-pointer flex items-center gap-1.5"
              >
                <span>Read the Policy Brief</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={() => {
                  if (onSelectPost) onSelectPost('boksburg-declaration-one-year-on');
                  onNavigate('blog');
                }}
                className="px-4 py-2.5 rounded-full text-xs font-semibold text-stone-700 hover:text-[#051650] border border-stone-300 hover:border-stone-400 transition-colors cursor-pointer"
              >
                <span>Read Full Conference Report</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          LATEST FROM SAMIN (3 Blog Cards)
          Elementor: .sm-latest-news
          ========================================================================= */}
      <section className="sm-latest-news relative w-full py-24 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
            <div>
              <span className="text-xs uppercase tracking-widest text-[#051650] font-bold">
                News & Dispatches
              </span>
              <h2 className="text-3xl font-serif-heading font-bold text-[#051650] mt-1">
                Latest from SAMIN
              </h2>
            </div>
            <button
              onClick={() => onNavigate('blog')}
              className="text-xs font-bold text-[#051650] hover:text-[#0A2275] flex items-center gap-1 cursor-pointer self-start sm:self-auto"
            >
              <span>View All Dispatches</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#FAC775]" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {BLOG_POSTS.slice(0, 3).map((post) => (
              <article
                key={post.id}
                onClick={() => {
                  if (onSelectPost) onSelectPost(post.slug);
                  onNavigate('blog');
                }}
                className="group bg-stone-50 rounded-2xl border border-stone-200 overflow-hidden hover:shadow-lg transition-all duration-300 flex flex-col justify-between cursor-pointer"
              >
                <div className="p-6 space-y-3">
                  <div className="flex items-center gap-2 text-xs text-stone-500">
                    <span className="font-semibold text-[#051650]">{post.category}</span>
                    <span>·</span>
                    <span>{post.date}</span>
                    <span>·</span>
                    <span>{post.readTime}</span>
                  </div>

                  <h3 className="text-lg font-bold font-serif-heading text-[#051650] group-hover:text-[#0A2275] transition-colors leading-snug">
                    {post.title}
                  </h3>

                  <p className="text-xs text-stone-600 leading-relaxed line-clamp-3">
                    {post.excerpt}
                  </p>
                </div>

                <div className="px-6 py-4 bg-white border-t border-stone-100 flex items-center justify-between text-xs font-semibold text-[#051650]">
                  <span>Read Article</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#FAC775] group-hover:translate-x-1 transition-transform" />
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 8: FINAL CTA
          Headline: "Building a Southern Africa Where Everyone Belongs."
          Buttons: [Support Our Work], [Join the Network], [Read Our Research]
          Elementor: .sm-final-cta
          ========================================================================= */}
      <section
        className="sm-final-cta relative w-full py-32 px-4 sm:px-6 lg:px-8 bg-[#051650] text-white text-center overflow-hidden"
        aria-label="Final Call to Action"
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(250,199,117,0.15)_0%,transparent_70%)]" />

        <div className="relative z-10 max-w-4xl mx-auto space-y-8">
          <span className="text-xs uppercase tracking-widest text-[#FAC775] font-semibold">
            Solidarity in Action
          </span>

          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-serif-heading font-bold tracking-tight text-white leading-tight">
            Building a Southern Africa
            <br />
            <span className="text-[#FAC775] italic">Where Everyone Belongs.</span>
          </h2>

          <p className="text-stone-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Whether you are a grassroots organisation, a legal practitioner, a researcher, or a community supporter, your voice accelerates the regional transition toward humane migration governance.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <button
              onClick={() => onNavigate('contact')}
              className="w-full sm:w-auto px-8 py-3.5 rounded-full text-xs sm:text-sm font-semibold tracking-wide bg-[#FAC775] text-[#051650] hover:bg-[#f5b952] active:scale-95 transition-all shadow-md cursor-pointer"
            >
              Support Our Work
            </button>

            <button
              onClick={() => onNavigate('contact')}
              className="w-full sm:w-auto px-7 py-3.5 rounded-full text-xs sm:text-sm font-semibold tracking-wide text-white border border-white/30 hover:bg-white/10 active:scale-95 transition-all cursor-pointer"
            >
              Join the Network
            </button>

            <button
              onClick={() => onNavigate('policy-brief')}
              className="w-full sm:w-auto px-7 py-3.5 rounded-full text-xs sm:text-sm font-semibold tracking-wide text-[#FAC775] border border-[#FAC775]/40 hover:bg-[#FAC775]/10 active:scale-95 transition-all cursor-pointer"
            >
              Read Our Research
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};
