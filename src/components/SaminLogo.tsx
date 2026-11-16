import React from 'react';

/**
 * ============================================================================
 * SAMIN BRAND LOGO & AFRICA EMBLEM
 * ============================================================================
 * Design Prompt & Brand Anatomy:
 * "Minimalist, high-end vector logo emblem for SAMIN (Southern Africa Migration Network).
 * A stylized, continuous-line silhouette of the African continent crafted in deep imperial
 * navy (#051650) and warm African gold (#D4AF37). Interconnecting thin migration corridor
 * lines curve through Southern and Pan-African transit routes, meeting at a luminous
 * four-pointed star beacon at the center representing hope and human dignity. Clean
 * geometric lines, luxury editorial aesthetic, flat 2D vector, pure white or transparent
 * background, no text inside the mark, suitable for precision SVG stroke animation
 * and high-contrast wordmark lockup."
 *
 * Characteristics:
 * - 0.25s Zero-Layout-Shift Hover Swap: w-44 h-11 (176px x 44px) locked bounding box
 * - State A: Editorial Serif Wordmark ("SAMIN | Migration Network")
 * - State B: Africa Continent Contour + Migration Corridors + Transit Nodes + Beacon Star
 * - Focus-visible gold ring: ring-[#D4AF37] ring-offset-2
 * ============================================================================
 */

export interface SaminAfricaMarkProps {
  className?: string;
  size?: number;
  theme?: 'dark' | 'light' | 'sticky';
  idSuffix?: string;
}

/**
 * Standalone African Continent Contour + Transit Corridors + Hope Beacon Star
 * Can be rendered at any dimension (e.g. 36px in header up to 110px in preloader).
 */
export const SaminAfricaMark: React.FC<SaminAfricaMarkProps> = ({
  className = '',
  size = 36,
  theme = 'dark',
  idSuffix = 'default',
}) => {
  const isLight = theme === 'light';
  const isSticky = theme === 'sticky';

  // Palette based on theme:
  // Dark Hero: Warm Gold (#D4AF37) with Gold gradient (#F5D061 -> #AA7C11), White star (#FFFFFF)
  // Scrolled Light: Deep Imperial Navy (#051650) with Gold accent nodes (#D4AF37), Gold star (#D4AF37)
  // Sticky Frosted Glass: Warm African Gold (#FAC775 / #D4AF37), White star (#FFFFFF)
  const contourStroke = isLight ? '#051650' : isSticky ? '#FAC775' : `url(#samin-gold-grad-${idSuffix})`;
  const corridorStroke = isLight ? 'rgba(5, 22, 80, 0.45)' : isSticky ? 'rgba(250, 199, 117, 0.7)' : 'rgba(212, 175, 55, 0.75)';
  const nodeFill = isLight ? '#D4AF37' : isSticky ? '#FAC775' : '#F5D061';
  const nodeStroke = isLight ? '#051650' : '#051650';
  const beaconFill = isLight ? '#D4AF37' : '#FFFFFF';

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`shrink-0 transition-transform duration-300 ${className}`}
      aria-hidden="true"
    >
      <defs>
        {/* Luxury African Gold Linear Gradient */}
        <linearGradient
          id={`samin-gold-grad-${idSuffix}`}
          x1="15%"
          y1="10%"
          x2="85%"
          y2="95%"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="#F5D061" />
          <stop offset="50%" stopColor="#D4AF37" />
          <stop offset="100%" stopColor="#AA7C11" />
        </linearGradient>

        {/* Luminous beacon star halo glow filter */}
        <filter id={`beacon-glow-${idSuffix}`} x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="1.2" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>

      {/* 1. Stylized African Continent Contour (Vector stroke with round caps/joins) */}
      <path
        d="M 50 12
           C 58 12, 65 14, 72 20
           C 76 24, 76 32, 80 38
           C 85 43, 88 48, 85 53
           C 80 59, 74 67, 68 76
           C 64 82, 57 91, 50 94
           C 44 91, 39 82, 38 72
           C 37 66, 35 58, 30 54
           C 23 54, 15 48, 14 38
           C 13 28, 22 18, 34 14
           C 40 12, 45 12, 50 12 Z"
        stroke={contourStroke}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />

      {/* 2. Migration Corridors (Network Arcs) - Interconnecting dashed arterial paths */}
      {/* Eastern / Coastal Corridor */}
      <path
        d="M 78 42 C 74 54, 66 66, 56 82"
        stroke={corridorStroke}
        strokeWidth="1.6"
        strokeDasharray="2.5 3"
        strokeLinecap="round"
        fill="none"
      />

      {/* Pan-African Central Corridor */}
      <path
        d="M 50 22 C 54 38, 52 54, 50 88"
        stroke={corridorStroke}
        strokeWidth="1.6"
        strokeDasharray="2.5 3"
        strokeLinecap="round"
        fill="none"
      />

      {/* Western Transit Axis */}
      <path
        d="M 26 42 C 34 52, 40 66, 48 84"
        stroke={corridorStroke}
        strokeWidth="1.6"
        strokeDasharray="2.5 3"
        strokeLinecap="round"
        fill="none"
      />

      {/* Southern Trans-Regional Cross-Axis */}
      <path
        d="M 40 76 C 48 73, 56 73, 66 76"
        stroke={corridorStroke}
        strokeWidth="1.6"
        strokeDasharray="2.5 3"
        strokeLinecap="round"
        fill="none"
      />

      {/* 3. Transit Nodes (Precision circular node points at key regional desks) */}
      {/* South Hub - Cape Town / Johannesburg Area */}
      <circle cx="50" cy="88" r="2.8" fill={nodeFill} stroke={nodeStroke} strokeWidth="1" />
      {/* East Coast Port - Maputo / Beira */}
      <circle cx="64" cy="76" r="2.2" fill={nodeFill} stroke={nodeStroke} strokeWidth="0.8" />
      {/* Central Transit Desk - Harare / Lusaka */}
      <circle cx="52" cy="68" r="2.4" fill={nodeFill} stroke={nodeStroke} strokeWidth="0.8" />
      {/* Western Transit Hub - Windhoek / Luanda */}
      <circle cx="40" cy="74" r="2.2" fill={nodeFill} stroke={nodeStroke} strokeWidth="0.8" />
      {/* Great Lakes Corridor Desk */}
      <circle cx="52" cy="46" r="2.2" fill={nodeFill} stroke={nodeStroke} strokeWidth="0.8" />
      {/* Horn Transit Node */}
      <circle cx="76" cy="42" r="2.2" fill={nodeFill} stroke={nodeStroke} strokeWidth="0.8" />
      {/* West Transit Node */}
      <circle cx="26" cy="42" r="2.2" fill={nodeFill} stroke={nodeStroke} strokeWidth="0.8" />

      {/* 4. Central Beacon of Hope (Four-Point Radiant Star) */}
      {/* Beacon Halo Ring */}
      <circle
        cx="52"
        cy="58"
        r="7.5"
        fill="none"
        stroke={beaconFill}
        strokeWidth="0.75"
        strokeOpacity="0.4"
        strokeDasharray="1.5 2"
      />

      {/* Four-Point Geometric Star nestled at the regional heart */}
      <path
        d="M 52 51.5
           Q 52 58 58.5 58
           Q 52 58 52 64.5
           Q 52 58 45.5 58
           Q 52 58 52 51.5 Z"
        fill={beaconFill}
        fillOpacity="0.95"
        filter={`url(#beacon-glow-${idSuffix})`}
      />
    </svg>
  );
};

export interface SaminLogoProps {
  /**
   * Visual theme:
   * - 'dark': Transparent hero state (pure white serif text, gold emblem, slate light kicker)
   * - 'light': White scrolled state (deep imperial navy text, stone divider, gold star)
   * - 'sticky': Frosted glass sticky state (crisp white text, warm gold accents)
   */
  theme?: 'dark' | 'light' | 'sticky';
  onClick?: () => void;
  className?: string;
  idSuffix?: string;
}

/**
 * Header SAMIN Logo Component with 0.25s Zero-Layout-Shift Hover Swap
 *
 * Anatomy:
 * - Locked interactive container: w-44 h-11 (176px x 44px)
 * - State A (Default): Serif Wordmark "SAMIN | Migration Network"
 * - State B (Hover / Focus): Africa Map Emblem + "SAMIN Southern Africa"
 * - Accessibility: keyboard Tab focus ring (#D4AF37), aria-label="SAMIN home"
 */
export const SaminLogo: React.FC<SaminLogoProps> = ({
  theme = 'dark',
  onClick,
  className = '',
  idSuffix = 'main',
}) => {
  const isLight = theme === 'light';
  const isSticky = theme === 'sticky';

  // Color Tokens according to design specs:
  // Wordmark Text ("SAMIN"):
  //   Dark Hero: Pure White (#FFFFFF), Sora/heading font, tracking-wider
  //   Scrolled Light: Deep Imperial Navy (#051650), tracking-wider
  //   Sticky: Pure White (#FFFFFF)
  const wordmarkTextColor = isLight ? 'text-[#051650]' : 'text-white';

  // Sub-Kicker Text & Hairline Divider:
  //   Dark Hero: Slate Light (#CBD5E1) with white hairline divider
  //   Scrolled Light: Neutral Slate (#64748B) with stone hairline divider
  //   Sticky: Warm Gold (#FAC775) with gold hairline divider
  const kickerTextColor = isLight
    ? 'text-[#64748B]'
    : isSticky
    ? 'text-[#FAC775]'
    : 'text-[#CBD5E1]';

  const dividerBgColor = isLight
    ? 'bg-[#051650]/20'
    : isSticky
    ? 'bg-[#FAC775]/40'
    : 'bg-white/30';

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label="SAMIN home"
      className={`group relative w-44 h-11 shrink-0 rounded-lg select-none text-left cursor-pointer
        focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37] focus-visible:ring-offset-2
        transition-colors duration-200 ${className}`}
    >
      {/* =====================================================================
          STATE A: DEFAULT EDITORIAL WORDMARK (SAMIN | Migration Network)
          Opacity: 1, translateY(0) -> on :hover / :focus-visible slides up & fades
          ===================================================================== */}
      <div
        className="absolute inset-0 flex items-center transition-all duration-[250ms] ease-out
          opacity-100 translate-y-0
          group-hover:opacity-0 group-hover:-translate-y-1
          group-focus-visible:opacity-0 group-focus-visible:-translate-y-1"
      >
        <div className="flex items-center w-full">
          {/* Typography Wordmark "SAMIN" */}
          <span
            className={`text-xl font-bold font-heading tracking-wider leading-none ${wordmarkTextColor} transition-colors`}
          >
            SAMIN
          </span>

          {/* Hairline Divider */}
          <span
            className={`h-4 w-px mx-2.5 ${dividerBgColor} transition-colors shrink-0`}
            aria-hidden="true"
          />

          {/* Sub-Kicker Text */}
          <div className="flex flex-col">
            <span
              className={`text-[9.5px] uppercase tracking-widest font-semibold leading-tight ${kickerTextColor} transition-colors`}
            >
              Migration
            </span>
            <span
              className={`text-[8px] uppercase tracking-wider font-medium opacity-80 leading-none ${kickerTextColor} transition-colors`}
            >
              Network
            </span>
          </div>
        </div>
      </div>

      {/* =====================================================================
          STATE B: HOVER / FOCUS EMBLEM LOCKUP (Africa Emblem + SAMIN Southern Africa)
          Opacity: 0, translateY(1) -> on :hover / :focus-visible slides in & reveals
          ===================================================================== */}
      <div
        className="absolute inset-0 flex items-center gap-2.5 transition-all duration-[250ms] ease-out
          opacity-0 translate-y-1
          group-hover:opacity-100 group-hover:translate-y-0
          group-focus-visible:opacity-100 group-focus-visible:translate-y-0"
      >
        {/* Stylized African Continent Contour + Hope Star */}
        <SaminAfricaMark
          size={34}
          theme={theme}
          idSuffix={idSuffix}
          className="group-hover:scale-105 group-focus-visible:scale-105"
        />

        {/* Lockup Typography */}
        <div className="flex flex-col">
          <div className="flex items-center gap-1.5">
            <span
              className={`text-[17px] font-bold font-heading tracking-wider leading-none ${wordmarkTextColor}`}
            >
              SAMIN
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] animate-pulse" />
          </div>
          <span
            className={`text-[8.5px] uppercase tracking-widest font-medium leading-tight mt-0.5 ${kickerTextColor}`}
          >
            Southern Africa
          </span>
        </div>
      </div>
    </button>
  );
};

export default SaminLogo;
