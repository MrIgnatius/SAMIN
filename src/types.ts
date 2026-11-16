export type PageId = 
  | 'home' 
  | 'challenges' 
  | 'advocacy' 
  | 'about' 
  | 'blog' 
  | 'newsletters' 
  | 'policy-brief' 
  | 'contact';

export interface StoryCard {
  id: string;
  role: string;
  name: string;
  origin: string;
  location: string;
  image: string;
  summary: string;
  pullQuote: string;
}

export interface RealityCard {
  id: string;
  title: string;
  copy: string;
  statNumber: string;
  statLabel: string;
  placeholderNote: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string[];
  category: 'Policy & Law' | 'Community Stories' | 'Research' | 'Regional Updates';
  author: {
    name: string;
    role: string;
  };
  date: string;
  readTime: string;
  image?: string;
}

export interface NewsletterItem {
  id: string;
  issue: string;
  title: string;
  date: string;
  summary: string;
  highlights: string[];
  pdfSize: string;
}

export interface PolicyBriefData {
  title: string;
  edition: string;
  year: string;
  summary: string;
  enPdf: {
    title: string;
    size: string;
    pages: number;
    filename: string;
  };
  frPdf: {
    title: string;
    size: string;
    pages: number;
    filename: string;
  };
  recommendations: {
    title: string;
    description: string;
  }[];
}
