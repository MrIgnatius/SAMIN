import React, { useState } from 'react';
import { PageId } from './types';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { CookieBanner } from './components/CookieBanner';
import { ElementorGuideModal } from './components/ElementorGuideModal';

import { HomePage } from './pages/HomePage';
import { ChallengesPage } from './pages/ChallengesPage';
import { AdvocacyPage } from './pages/AdvocacyPage';
import { AboutPage } from './pages/AboutPage';
import { BlogPage } from './pages/BlogPage';
import { NewslettersPage } from './pages/NewslettersPage';
import { PolicyBriefPage } from './pages/PolicyBriefPage';
import { ContactPage } from './pages/ContactPage';
import { Layers } from 'lucide-react';

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageId>('home');
  const [selectedBlogSlug, setSelectedBlogSlug] = useState<string | null>(null);
  const [isElementorModalOpen, setIsElementorModalOpen] = useState(false);

  const handleNavigate = (page: PageId) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectPost = (slug: string | null) => {
    setSelectedBlogSlug(slug);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F2F2F2] text-[#051650] font-sans relative">
      
      {/* Global Shared Header */}
      <Header
        currentPage={currentPage}
        onNavigate={handleNavigate}
        onOpenElementorGuide={() => setIsElementorModalOpen(true)}
      />

      {/* Main Content Area: Renders the active page */}
      <main className="flex-1 w-full" id="main-content">
        {currentPage === 'home' && (
          <HomePage
            onNavigate={handleNavigate}
            onSelectPost={handleSelectPost}
          />
        )}

        {currentPage === 'challenges' && (
          <ChallengesPage onNavigate={handleNavigate} />
        )}

        {currentPage === 'advocacy' && (
          <AdvocacyPage onNavigate={handleNavigate} />
        )}

        {currentPage === 'about' && (
          <AboutPage onNavigate={handleNavigate} />
        )}

        {currentPage === 'blog' && (
          <BlogPage
            onNavigate={handleNavigate}
            selectedSlug={selectedBlogSlug}
            onSelectPost={handleSelectPost}
          />
        )}

        {currentPage === 'newsletters' && (
          <NewslettersPage onNavigate={handleNavigate} />
        )}

        {currentPage === 'policy-brief' && (
          <PolicyBriefPage onNavigate={handleNavigate} />
        )}

        {currentPage === 'contact' && (
          <ContactPage onNavigate={handleNavigate} />
        )}
      </main>

      {/* Global Shared Footer */}
      <Footer onNavigate={handleNavigate} />

      {/* Global Cookie Banner */}
      <CookieBanner />

      {/* Elementor Conversion Blueprint Modal */}
      <ElementorGuideModal
        isOpen={isElementorModalOpen}
        onClose={() => setIsElementorModalOpen(false)}
      />

      {/* Floating Blueprint Quick-Action Badge */}
      <button
        onClick={() => setIsElementorModalOpen(true)}
        title="Open Elementor Theme Conversion Blueprint"
        className="fixed bottom-6 right-6 z-40 bg-[#051650] text-[#FAC775] border border-[#FAC775]/40 p-3 rounded-full shadow-2xl hover:bg-[#020b2b] hover:scale-105 active:scale-95 transition-all flex items-center gap-2 cursor-pointer group"
      >
        <Layers className="w-5 h-5 text-[#FAC775]" />
        <span className="hidden sm:inline text-xs font-semibold pr-1">
          Elementor Blueprint
        </span>
      </button>

    </div>
  );
}
