# SAMIN — Southern Africa Migration Network
## Elementor Theme Conversion & Architectural Blueprint

This standalone prototype provides an award-level (Awwwards-style) cinematic scroll experience and complete 8-page website for **SAMIN (Southern Africa Migration Network)**, founded in 2019 to advocate for the rights and dignity of refugees and migrants across Southern Africa.

The codebase is built with direct conversion to a custom **WordPress + Elementor Pro** theme in mind.

---

## 1. Directory & Theme File Structure

```text
├── index.html                   # Master entry point with Fraunces & DM Sans preloads
├── src/
│   ├── assets/
│   │   └── images/              # High-fidelity photography (Hero, Portraits, Conference)
│   ├── components/
│   │   ├── Header.tsx           # Maps to: Elementor Theme Builder Header Template
│   │   ├── Footer.tsx           # Maps to: Elementor Theme Builder Footer Template
│   │   ├── CookieBanner.tsx     # Maps to: Elementor Global Popup / Consent Banner
│   │   └── ElementorGuideModal.tsx # Interactive on-screen blueprint inspector
│   ├── data/
│   │   └── content.ts           # Centralised data, story cards, dispatches, & briefs
│   ├── pages/
│   │   ├── HomePage.tsx         # The 9-section cinematic scroll experience
│   │   ├── ChallengesPage.tsx   # Systemic barriers & casework interventions
│   │   ├── AdvocacyPage.tsx     # 5-Pillar advocacy explorer & Boksburg roadmap
│   │   ├── AboutPage.tsx        # SAMIN history (2019–2026), values & Secretariat
│   │   ├── BlogPage.tsx         # Archive loop grid + single post editorial template
│   │   ├── NewslettersPage.tsx  # Quarterly bulletin archive & subscription form
│   │   ├── PolicyBriefPage.tsx  # EN / FR policy brief download cards & recommendations
│   │   └── ContactPage.tsx      # Validated inquiry form & Cape Town HQ coordinates
│   ├── index.css                # Elementor CSS custom properties & utility styles
│   └── types.ts                 # Data models and page IDs
└── README_ELEMENTOR_MAPPING.md  # Conversion reference guide
```

---

## 2. Section-to-Elementor Mapping Table

Each section uses a self-contained semantic `<section class="sm-...">` container that corresponds 1:1 with an Elementor Flexbox Container or Theme Builder component:

| Section Name | HTML Class | Elementor Pro Container Type | Recommended Widgets & Elements | Motion & ScrollTrigger Settings |
| :--- | :--- | :--- | :--- | :--- |
| **0. Hero** | `.sm-hero` | Full Width Container (`100vh`, Min Height) | Video Background / Poster Image, Heading (H1 Fraunces), Text Editor, 2x Button Widgets | Fade In, Ken Burns background scale, overlay scrim |
| **1. Pinned Text Sequence** | `.sm-pinned-story` | Sticky Container (`top: 0`, Track Height `380vh`) | Inner Containers with cross-fading typography, Progress bar indicator | Sticky Pinning with scrubbed opacity cross-fades |
| **2. What People See** | `.sm-perception` | Container (Grid / Relative positioning) | Big Display Heading, Text Editor cards, particle dissolve canvas | Scroll-triggered opacity drop and scale dissipation |
| **3. The Reality** | `.sm-reality` | 4-Column Grid Container | Card Containers, Elementor Counter widget, Icon Box | Staggered entrance animation (`fade-up`, 150ms delay) |
| **4. Every Journey Has a Story** | `.sm-stories-horizontal` | Loop Carousel / Nested Carousel | Custom Loop Item (Featured Image, Blockquote, Meta, Author Tag) | Horizontal Scroll or Elementor Swiper Carousel |
| **5. What SAMIN Does** | `.sm-pillars` | Dark Container (4 Columns) | Icon Box / Flip Box / Custom HTML with 3D Tilt data attributes | 3D Perspective Tilt on mouse move (disabled on mobile) |
| **6. Emotional Statement** | `.sm-statement` | Full-screen Minimalist Container (`100vh`) | Centered Single H2 Heading (Fraunces Display Serif) | Slow `power3.out` fade in |
| **7. Impact Reveal** | `.sm-impact` | 5-Column Counter Container | 5x Elementor Counter Widgets with suffix `+` and prefix | ScrollTrigger counter animation upon viewport entry |
| **Conference Highlight** | `.sm-conference` | 2-Column Split Container | Image Widget (Conference), Heading, Body, 2x Button Widgets | Subtle entrance fade |
| **Latest from SAMIN** | `.sm-latest-news` | Posts Widget / Loop Grid | Query: 3 latest posts from category 'Policy & Law' | Standard archive card hover lift |
| **8. Final CTA** | `.sm-final-cta` | High-Impact Dark Container | Radial gradient backdrop, Heading, Button Group (3 items) | Subtle parallax |
| **Global Header (Lytbox)** | `.lytbox-header` (`.sm-header`) | Theme Builder Header (Single Container, No Duplicates) | Horizontal container: `.logo-1` (Full) & `.logo-2` (Sticky), WP Menu Widget, Button Widget (Gold Pill) | Slides off-screen on scroll down, slides down to reveal past `STICKY_AFTER_PX` with logo swap and frosted-glass blur |
| **Global Footer** | `.sm-footer` | Theme Builder Footer | 5-Column responsive container, Partner accreditation, Icon list | Static |

---

## 3. Elementor Global Styles (:root CSS Variables)

In **Elementor > Site Settings > Global Colors & Global Fonts**, map the following tokens:

```css
:root {
  /* Global Colors */
  --samin-navy: #051650;        /* Primary Accent & Dark BG */
  --samin-navy-dark: #020b2b;   /* Deep Section BG */
  --samin-gold: #FAC775;        /* Brand Gold Accent */
  --samin-gold-hover: #f5b952;  /* Button Hover State */
  --samin-bg: #F2F2F2;          /* Canvas Off-white */
  --samin-surface: #FFFFFF;     /* Card Canvas */
  --samin-muted: #536280;       /* Secondary text */
  --samin-border: rgba(5, 22, 80, 0.12);

  /* Global Typography */
  --font-heading: 'Fraunces', Georgia, serif;
  --font-body: 'DM Sans', system-ui, sans-serif;

  /* Theme Radii */
  --radius-button: 9999px;
  --radius-card: 16px;
}
```

---

## 4. List of Placeholders to Replace Before Production

All placeholder content has been deliberately tagged in the markup to facilitate verification by the SAMIN Secretariat:

1. **Impact Counters (`.sm-impact` Section 7)**:
   - `Migrants Supported`: Currently marked with `data-count="000"` (`18,500+` demonstrative preview). *TODO: Replace with official annual casework report total.*
   - `Policy Engagements`: Marked with `data-count="000"`. *TODO: Replace with official parliamentary logs.*
   - `Community Partners`: Marked with `data-count="000"`. *TODO: Replace with verified active partner registry.*
   - `Youth Reached`: Marked with `data-count="000"`. *TODO: Replace with youth cohort educational statistics.*
   - `Research Publications`: Marked with `data-count="000"`. *TODO: Replace with published repository count.*

2. **Hero Video Asset (`.sm-hero` Section 0)**:
   - High-fidelity cinematic poster image is provided in `/src/assets/images/samin_hero_journey_1794230359724.jpg`. *TODO: Upload final MP4 looping video to WordPress Media Library or Vimeo Pro and set as Container background video.*

3. **Journey Story Quotations (`.sm-stories-horizontal` Section 4)**:
   - Contains authentic composite portraits for Student, Entrepreneur, Refugee Mother, and Community Leader. *TODO: Obtain signed media consent forms for published individual profiles.*

4. **Policy Brief Downloads (`.sm-policy-downloads`)**:
   - English and French download buttons link to triggerable download actions. *TODO: Replace with final uploaded `.pdf` documents in WordPress `wp-content/uploads/`.*

5. **Institutional Partners (`.sm-footer`)**:
   - Partner accreditation includes **Bread for the World (Brot für die Welt)** and **CCFD-Terre Solidaire (France)** with text and SVG emblems. *TODO: Link to official partner grant disclosure pages if required.*

---

## 5. Lytbox Hide-and-Show Sticky Header Setup (Fluent Snippets + Elementor)

This header implements the **Lytbox Academy Hide & Show Sticky Header** with **Logo Swap** and **Frosted Glass**.

### Why This Is 100% SEO Friendly:
- **No Duplicate Headers**: Unlike clumsy tutorials that create two separate header templates in Elementor (which creates duplicate `<header>` tags, duplicate `<h1>`/logo anchors, and duplicate `<nav>` landmarks that hurt SEO crawlability), Lytbox uses **one single header container**.
- **Clean Semantic DOM**: Googlebot, Bingbot, and screen readers encounter a single accessible `<header role="banner">` with one unified `<nav aria-label="Main Navigation">`.

### Step-by-Step Implementation in Elementor:

1. **Step 1: Build the Header Container**
   - Create a horizontal Flexbox Container in Elementor Theme Builder.
   - Insert three items in row:
     - **Logo Inner Container**: Place two Image widgets inside:
       - Give the top logo widget the CSS class: `logo-1`
       - Give the sticky revealed logo widget the CSS class: `logo-2`
     - **Menu Widget**: WordPress Menu or Nav Menu widget.
     - **Button Widget**: Primary CTA (e.g. "Contact Us" pill).

2. **Step 2: Add Container Class**
   - In the outer container's **Advanced > Layout > CSS Classes**, enter:
     `lytbox-header`

3. **Step 3: Add JavaScript in Fluent Snippets**
   - Install **FluentSnippets** (or WPCode).
   - Create a new PHP/JS snippet named `Header Scroll Effect JS`, set Location to **Footer / End of Body**:
   ```javascript
   (() => {
     // ===== EDIT THESE =====
     const STICKY_AFTER_PX = 450; // when sticky behavior starts (e.g. 450 or 1000)
     const ANIM_MS = 200; // animation speed (matches CSS var)
     const OVERLAY_MODE = true; // TRUE if header overlays hero
     // =======================

     const header = document.querySelector('.lytbox-header');
     if (!header) return;

     document.documentElement.style.setProperty('--lytbox-anim-ms', `${ANIM_MS}ms`);

     const spacer = document.createElement('div');
     spacer.className = 'lytbox-header-spacer';
     spacer.style.height = '0px';
     spacer.style.pointerEvents = 'none';
     header.insertAdjacentElement('afterend', spacer);

     let isSticky = false;

     const setSpacer = (px) => {
       spacer.style.height = OVERLAY_MODE ? '0px' : `${px}px`;
     };

     const makeSticky = () => {
       if (isSticky) return;
       isSticky = true;

       if (!OVERLAY_MODE) setSpacer(header.offsetHeight);

       // Apply off-screen without transition to hide logo switch
       header.classList.add('lytbox-is-sticky', 'lytbox-no-trans');
       header.classList.remove('lytbox-show');

       void header.offsetHeight; // style flush

       requestAnimationFrame(() => {
         header.classList.remove('lytbox-no-trans');
         header.classList.add('lytbox-show');
       });
     };

     const removeSticky = () => {
       if (!isSticky) return;
       isSticky = false;

       header.classList.remove('lytbox-show');

       window.setTimeout(() => {
         header.classList.remove('lytbox-is-sticky');
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
   })();
   ```

4. **Step 4: Add CSS in Fluent Snippets or Elementor Site Settings**
   ```css
   :root {
     /* From https://css.glass */
     --lytbox-sticky-bg: rgba(0, 76, 199, 0.58);
     --lytbox-sticky-blur: 10.3px;
     --lytbox-sticky-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
     --lytbox-sticky-border: rgba(0, 76, 199, 0.34);
   }

   .lytbox-no-trans {
     transition: none !important;
   }

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

   /* Logo Swap Mechanism */
   .lytbox-header .logo-1 { display: flex !important; }
   .lytbox-header .logo-2 { display: none !important; }

   .lytbox-header.lytbox-is-sticky .logo-1 { display: none !important; }
   .lytbox-header.lytbox-is-sticky .logo-2 { display: flex !important; }
   ```

