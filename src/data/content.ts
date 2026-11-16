import { StoryCard, RealityCard, BlogPost, NewsletterItem, PolicyBriefData } from '../types';

export const HERO_POSTER_IMAGE = '/assets/aistudio/IMG_0725__1__11f1e462.jpg';
export const CONFERENCE_IMAGE = '/assets/aistudio/IMG_0725__1__11f1e462.jpg';

export const STORIES: StoryCard[] = [
  {
    id: 'student',
    role: 'University Scholar & Researcher',
    name: 'Tapiwa N.',
    origin: 'Zimbabwe',
    location: 'Cape Town, South Africa',
    image: '/src/assets/images/story_student_1794230360271.jpg',
    summary: 'Navigating study permit renewals amidst administrative delays, Tapiwa completed his postgraduate thesis in clean energy infrastructure, now mentoring migrant youths in STEM.',
    pullQuote: 'My education is not a ticket out; it is an instrument to build the Southern Africa our parents envisioned.'
  },
  {
    id: 'entrepreneur',
    role: 'Artisan & Small Business Founder',
    name: 'Marie-Claire B.',
    origin: 'DR Congo',
    location: 'Johannesburg, South Africa',
    image: '/src/assets/images/story_entrepreneur_1794230360753.jpg',
    summary: 'Arriving in 2017 with tailoring expertise, Marie-Claire established a textile cooperative that now employs seven local South African and migrant seamstresses.',
    pullQuote: 'When we open doors of opportunity, we do not take bread from tables—we build larger bakeries.'
  },
  {
    id: 'mother',
    role: 'Mother & Community Educator',
    name: 'Amina K.',
    origin: 'Burundi',
    location: 'Durban, South Africa',
    image: '/src/assets/images/story_mother_1794230380178.jpg',
    summary: 'Advocating tirelessly for birth registration and school enrollment for refugee children in KwaZulu-Natal, creating early childhood reading groups.',
    pullQuote: 'Every child on this continent deserves to wake up without fear and walk to school with their head held high.'
  },
  {
    id: 'leader',
    role: 'Paralegal & Grassroots Coordinator',
    name: 'Farhan M.',
    origin: 'Somalia',
    location: 'Gqeberha, South Africa',
    image: '/src/assets/images/story_leader_1794230361507.jpg',
    summary: 'Bridging municipal safety forums and informal traders, Farhan leads inter-community mediation dialogues that have prevented xenophobic flashpoints.',
    pullQuote: 'Solidarity is not an abstract slogan; it is the daily discipline of listening before judging.'
  }
];

export const REALITY_CARDS: RealityCard[] = [
  {
    id: 'businesses',
    title: 'Migrants Create Sustainable Businesses',
    copy: 'Across urban centers in SADC, migrant-owned small enterprises revitalize inner-city supply chains and generate vital secondary employment for host community members.',
    statNumber: '38%',
    statLabel: 'Local hiring rate in migrant-led informal & semi-formal retail enterprises',
    placeholderNote: 'TODO: Replace with official SADC / FinMark Regional Survey 2025'
  },
  {
    id: 'skills',
    title: 'Migrants Fill Critical Regional Skills Gaps',
    copy: 'From public healthcare wards and secondary education to specialized civil engineering, cross-border professionals sustain critical public and private infrastructure.',
    statNumber: '42%',
    statLabel: 'Of regional specialized hospital and math-science faculty positions supported by cross-border experts',
    placeholderNote: 'TODO: Replace with SADC Health & Labour Protocol data'
  },
  {
    id: 'refugees',
    title: 'Refugees Actively Enrich Communities',
    copy: 'Refugee-led community networks establish peer child care, paralegal helplines, language translation desks, and civic defense associations that benefit whole suburbs.',
    statNumber: '74%',
    statLabel: 'Of community mediation interventions initiated by joint host-migrant civic committees',
    placeholderNote: 'TODO: Replace with UNHCR / SAMIN joint grassroots monitoring metric'
  },
  {
    id: 'youth',
    title: 'Young People Build New Regional Futures',
    copy: 'Second-generation and migrant youth represent the vanguard of regional innovation, driving arts, software engineering, climate resilience, and cultural diplomacy.',
    statNumber: '89%',
    statLabel: 'Secondary-to-vocational transition rate when legal identification barriers are removed',
    placeholderNote: 'TODO: Replace with UNESCO Regional Education Inclusion Index'
  }
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 'post-1',
    slug: 'boksburg-declaration-one-year-on',
    title: 'The Boksburg Declaration: Translating Regional Commitments into Municipal Action',
    excerpt: 'Following the 6th Annual Policy Conference, civil society networks across Southern Africa are tracking compliance on human rights-centered border administration.',
    content: [
      'When delegates from eleven Southern African nations gathered in Boksburg for the 6th Annual SAMIN Policy Conference, the mandate was unequivocal: regional mobility cannot remain a security-dominated conversation. The Boksburg Declaration adopted at the close of proceedings established five non-negotiable benchmarks for protecting migrant dignity.',
      'Chief among these is the urgent cessation of administrative detention for asylum seekers whose permit renewals have stalled due to digital registry backlogs. When paperwork delays are treated as criminal infractions, families are torn apart and municipal economies suffer immediate shocks.',
      'SAMIN regional focal points in Lusaka, Harare, Gaborone, and Pretoria have spent the past quarter translating these declaration principles into concrete municipal memoranda of understanding. By engaging metropolitan councils directly, civil society is proving that migrant inclusion fosters civic safety rather than discord.',
      'The road ahead requires relentless oversight. As national legislatures debate amendments to immigration acts, SAMIN and its coalition partners will continue providing empirical, human-centered evidence that shows Southern Africa is strongest when it welcomes the skills and aspirations of all its people.'
    ],
    category: 'Policy & Law',
    author: {
      name: 'Dr. Nokuthula Moyo',
      role: 'Head of Research & Policy Advocacy'
    },
    date: 'October 28, 2025',
    readTime: '6 min read',
    image: CONFERENCE_IMAGE
  },
  {
    id: 'post-2',
    slug: 'undocumented-children-right-to-learn',
    title: 'No Child Left Outside: Defending the Constitutional Right to Basic Education',
    excerpt: 'How SAMIN legal defense interventions are preventing schools from turning away children over missing birth registration papers or expired parental visas.',
    content: [
      'Across parts of Southern Africa, thousands of school-age children find their academic futures held hostage by administrative hurdles. Despite clear legal precedents establishing that the right to basic education belongs to every child regardless of immigration status, localized gatekeeping persists.',
      'SAMIN paralegal clinics have handled over 320 school admission cases this academic cycle alone. In partnership with community liaisons and district education directors, our teams ensure that administrative formalities never become educational death sentences.',
      'Education is the single most transformative engine of social cohesion. When a child learns alongside their neighborhood peers, the fictitious divisions of nationality dissolve naturally on the playground and in the classroom.'
    ],
    category: 'Community Stories',
    author: {
      name: 'Jean-Luc Kazadi',
      role: 'Legal Aid & Strategic Litigation Officer'
    },
    date: 'September 14, 2025',
    readTime: '5 min read'
  },
  {
    id: 'post-3',
    slug: 'digital-identities-and-financial-inclusion',
    title: 'Unlocking Banking: Why Financial Exclusion of Migrants Costs the Whole Region',
    excerpt: 'Exploring how stringent Know-Your-Customer (KYC) requirements drive informal cross-border remittances into underground, predatory corridors.',
    content: [
      'Billions of rands move across Southern African borders every year through informal, unregulated courier networks. The primary driver is not criminal intent, but systemic financial exclusion that bars asylum permit holders and temporary residents from opening basic commercial bank accounts.',
      'Our latest policy paper examines the macroeconomic benefits of Tier-1 digital mobile wallets. By enabling lawful, transparent digital payments and remittances, regional central banks can enhance tax visibility while slashing extortionate courier fees that bleed poor families.',
      'Financial inclusion is fundamental human security. When migrants can bank safely, they invest in host community shops, save for emergencies, and contribute directly to local municipal revenue.'
    ],
    category: 'Research',
    author: {
      name: 'Sipho Khumalo',
      role: 'Economic Rights Fellow'
    },
    date: 'August 19, 2025',
    readTime: '7 min read'
  }
];

export const NEWSLETTERS: NewsletterItem[] = [
  {
    id: 'nl-15',
    issue: 'Quarterly Bulletin Vol. 15',
    title: 'The Boksburg Mandate: Regional Harmonization & Grassroots Defense',
    date: 'November 2025',
    summary: 'Comprehensive analysis of outcomes from the 6th Annual Policy Conference, legal victories in appellate courts, and our regional paralegal training cohort.',
    highlights: [
      'Key resolutions of the Boksburg Declaration',
      'Appellate victory on undocumented children schooling',
      'Cross-border civil society exchange: Zambia & South Africa'
    ],
    pdfSize: '2.4 MB'
  },
  {
    id: 'nl-14',
    issue: 'Quarterly Bulletin Vol. 14',
    title: 'Dignity at the Borders: Monitoring Transit Hubs & Detention Centers',
    date: 'July 2025',
    summary: 'Findings from our bi-annual independent border observation mission, focusing on due process, healthcare access, and anti-trafficking protocols.',
    highlights: [
      'Beitbridge and Musina observation report',
      'Healthcare delivery benchmarks for asylum transit facilities',
      'Community dialogue forums in Limpopo and Gauteng'
    ],
    pdfSize: '1.9 MB'
  },
  {
    id: 'nl-13',
    issue: 'Quarterly Bulletin Vol. 13',
    title: 'Voices of Solidarity: Women Migrants Leading Local Economies',
    date: 'March 2025',
    summary: 'Special issue highlighting female-led cooperative enterprises in informal settlements and legal strategies to combat gender-based violence in migration corridors.',
    highlights: [
      'Profiles of 12 migrant women micro-entrepreneurs',
      'Paralegal clinic case breakdown',
      'Submission to SADC Gender & Migration Working Group'
    ],
    pdfSize: '3.1 MB'
  },
  {
    id: 'nl-12',
    issue: 'Quarterly Bulletin Vol. 12',
    title: 'Building Inclusive Cities: Municipal Mayoral Forum Insights',
    date: 'December 2024',
    summary: 'How municipal governments in Cape Town, Durban, and Windhoek are pioneering local migrant desk integration frameworks.',
    highlights: [
      'Local government integration scorecards',
      'Youth cultural arts festival recap',
      'Annual network financial and impact transparency summary'
    ],
    pdfSize: '2.2 MB'
  }
];

export const POLICY_BRIEF: PolicyBriefData = {
  title: 'Advancing Humane Migration Governance in Southern Africa',
  edition: 'SAMIN Policy Brief Series 2025/2026',
  year: '2025',
  summary: 'This definitive regional policy brief provides evidence-based frameworks to align national immigration practices across the Southern African Development Community (SADC) with the AU Protocol on Free Movement and international human rights conventions. It demonstrates that administrative regularisation and socio-economic inclusion generate measurable fiscal, civic, and developmental benefits for both host nations and migrant populations.',
  enPdf: {
    title: 'SAMIN Regional Policy Brief (English Edition)',
    size: '3.8 MB PDF',
    pages: 36,
    filename: 'SAMIN-Policy-Brief-2025-EN.pdf'
  },
  frPdf: {
    title: 'Note d’Orientation Stratégique du SAMIN (Édition Française)',
    size: '4.1 MB PDF',
    pages: 38,
    filename: 'SAMIN-Policy-Brief-2025-FR.pdf'
  },
  recommendations: [
    {
      title: '1. Universal Digital Regularisation & Renewal Automation',
      description: 'Replace fragmented, backlog-plagued manual queues with automated multi-year visa extensions and biometric mobile verification to eliminate undocumented vulnerability.'
    },
    {
      title: '2. Unconditional Access to Basic Healthcare & Primary Education',
      description: 'Enact binding ministerial directives prohibiting public hospitals and schools from denying admission based on parental documentation status.'
    },
    {
      title: '3. Financial Inclusion via Tier-1 KYC Wallets',
      description: 'Direct regional central banks to authorize commercial banks to open basic low-cost accounts using verified asylum seeker and refugee identity documents.'
    },
    {
      title: '4. Immediate Moratorium on Extralegal Administrative Detention',
      description: 'Establish community-based alternatives to detention for asylum seekers whose claims are pending administrative review, upholding constitutional due process.'
    },
    {
      title: '5. Regional Civil Society Consultation Mechanism',
      description: 'Formalize an institutional civil society consultative desk within the SADC Secretariat to ensure grassroots migrant realities inform regional ministerial treaties.'
    }
  ]
};

export const ELEMENTOR_MAPPING_DATA = [
  {
    sectionName: 'Hero Section',
    htmlClass: '.sm-hero',
    elementorType: 'Container (Full Width, 100vh Min Height)',
    widgets: 'Video Background / Loop, Heading (H1 Fraunces), Text Editor, 2x Button Widgets in Inline Container',
    motionEffects: 'Fade In Entrance / Scroll Opacity',
    globalStyles: '--samin-navy, --samin-gold, --font-heading'
  },
  {
    sectionName: 'Pinned Text Sequence',
    htmlClass: '.sm-pinned-story',
    elementorType: 'Sticky Container (Sticky Top, 400vh Scroll Track)',
    widgets: 'Inner Containers cross-fading, Typography Display Heading',
    motionEffects: 'Sticky Pinning, Scrubbed Opacity Animation',
    globalStyles: '--samin-navy-dark, --samin-white, --font-heading'
  },
  {
    sectionName: 'What People See (Deconstruction)',
    htmlClass: '.sm-perception',
    elementorType: 'Container with Absolute Elements',
    widgets: 'Big Display Heading, Fragmented Text Words, Floating Particles Canvas',
    motionEffects: 'Scroll-driven Opacity / Scale Dissolve',
    globalStyles: '--samin-navy, --samin-muted'
  },
  {
    sectionName: 'The Reality (Pinned Cards)',
    htmlClass: '.sm-reality',
    elementorType: 'Container Grid (2x2 or Sticky Stack)',
    widgets: 'Card Containers, Counter Widget, Icon Box, Body Typography',
    motionEffects: 'Entrance Animation (Fade Up Stagger)',
    globalStyles: '--samin-surface, --samin-gold, --radius-card'
  },
  {
    sectionName: 'Journey Stories (Horizontal Scroll)',
    htmlClass: '.sm-stories-horizontal',
    elementorType: 'Loop Grid / Carousel Container',
    widgets: 'Custom Loop Item (Image, Blockquote, Meta, Author Tag)',
    motionEffects: 'Horizontal Scroll via ScrollTrigger / Elementor Carousel',
    globalStyles: '--samin-surface, --font-heading, --radius-card'
  },
  {
    sectionName: 'What SAMIN Does (3D Tilt Cards)',
    htmlClass: '.sm-pillars',
    elementorType: 'Dark Container Grid (4 Columns)',
    widgets: 'Icon Box / Flip Box / Custom HTML with Tilt Attribute',
    motionEffects: 'Mouse Tilt Transform, Hover Border Glow',
    globalStyles: '--samin-navy-dark, --samin-gold, --samin-border-dark'
  },
  {
    sectionName: 'Emotional Statement',
    htmlClass: '.sm-statement',
    elementorType: 'Full-screen Minimalist Container (100vh)',
    widgets: 'Centered Single H2 / H1 Heading (Fraunces Display)',
    motionEffects: 'Fade In Up (Slow power3 easing)',
    globalStyles: '--samin-gold, --samin-navy-dark'
  },
  {
    sectionName: 'Impact Reveal Counters',
    htmlClass: '.sm-impact',
    elementorType: 'Container with 5-Column Grid',
    widgets: 'Elementor Counter Widgets (Prefix/Suffix, Title below)',
    motionEffects: 'Counter Scroll Trigger on Viewport Entry',
    globalStyles: '--samin-navy, --samin-gold, --font-heading'
  },
  {
    sectionName: 'Latest from SAMIN (Blog Strip)',
    htmlClass: '.sm-latest-news',
    elementorType: 'Posts / Loop Grid Widget',
    widgets: 'Archive Cards: Featured Image, Date, Title, Read More Link',
    motionEffects: 'Fade Up',
    globalStyles: '--samin-surface, --samin-border'
  },
  {
    sectionName: 'Final Call to Action',
    htmlClass: '.sm-final-cta',
    elementorType: 'High-Impact Call to Action Container',
    widgets: 'Background Image with Navy Overlay, H2 Heading, Button Group',
    motionEffects: 'Subtle Parallax Background',
    globalStyles: '--samin-navy, --samin-gold'
  },
  {
    sectionName: 'Lytbox Hide & Show Sticky Header',
    htmlClass: '.lytbox-header (.sm-header)',
    elementorType: 'Theme Builder Header (Single Container, No Duplicates)',
    widgets: 'Horizontal Container with .logo-1 (Full) & .logo-2 (Sticky), WordPress Menu Widget, Button Widget (Gold Pill)',
    motionEffects: 'Slides off-screen on scroll down, slides down to reveal on scroll past STICKY_AFTER_PX with logo swap and frosted-glass blur',
    globalStyles: '--lytbox-sticky-bg, --lytbox-sticky-blur, --lytbox-anim-ms, --samin-gold'
  },
  {
    sectionName: 'Global Footer Template',
    htmlClass: '.sm-footer',
    elementorType: 'Theme Builder Footer',
    widgets: 'Multi-column Container: Mission, Navigation Menus, Partner Logos, Policy Brief Downloads, Social Icons',
    motionEffects: 'None',
    globalStyles: '--samin-navy-dark, --samin-white, --samin-gold'
  }
];
