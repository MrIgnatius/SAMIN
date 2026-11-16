import React, { useState } from 'react';
import { PageId, BlogPost } from '../types';
import { BLOG_POSTS } from '../data/content';
import { 
  Search, 
  ArrowLeft, 
  ArrowRight, 
  Clock, 
  Calendar, 
  Share2, 
  Bookmark, 
  Check, 
  BookOpen 
} from 'lucide-react';

interface BlogPageProps {
  onNavigate: (page: PageId) => void;
  selectedSlug?: string | null;
  onSelectPost?: (slug: string | null) => void;
}

export const BlogPage: React.FC<BlogPageProps> = ({
  onNavigate,
  selectedSlug: initialSlug,
  onSelectPost,
}) => {
  const [activeSlug, setActiveSlug] = useState<string | null>(initialSlug || null);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [copied, setCopied] = useState(false);

  const categories = ['All', 'Policy & Law', 'Community Stories', 'Research', 'Regional Updates'];

  // Handle post selection
  const handleOpenPost = (slug: string) => {
    setActiveSlug(slug);
    if (onSelectPost) onSelectPost(slug);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToIndex = () => {
    setActiveSlug(null);
    if (onSelectPost) onSelectPost(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // Filtered posts
  const filteredPosts = BLOG_POSTS.filter((post) => {
    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
    const matchesSearch = 
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // If a single post is active, render the single-post template
  if (activeSlug) {
    const post = BLOG_POSTS.find((p) => p.slug === activeSlug) || BLOG_POSTS[0];
    const relatedPosts = BLOG_POSTS.filter((p) => p.slug !== post.slug).slice(0, 2);

    return (
      <article className="sm-single-post w-full bg-[#F2F2F2] text-[#051650] pt-28 pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Back button */}
          <button
            onClick={handleBackToIndex}
            className="inline-flex items-center gap-2 text-xs font-semibold text-[#051650] hover:text-[#0A2275] mb-8 cursor-pointer group"
          >
            <ArrowLeft className="w-4 h-4 text-[#FAC775] group-hover:-translate-x-1 transition-transform" />
            <span>Back to All Dispatches</span>
          </button>

          {/* Editorial Article Header */}
          <header className="space-y-4 mb-8">
            <div className="flex items-center gap-3 text-xs text-stone-500 font-medium">
              <span className="text-[#051650] font-semibold uppercase tracking-wider">{post.category}</span>
              <span>·</span>
              <span>{post.date}</span>
              <span>·</span>
              <span>{post.readTime}</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-serif-heading font-bold text-[#051650] leading-tight text-balance">
              {post.title}
            </h1>

            <p className="text-base sm:text-lg text-stone-600 font-serif italic leading-relaxed text-balance">
              {post.excerpt}
            </p>

            {/* Author Byline */}
            <div className="pt-4 pb-2 border-t border-b border-stone-200 flex items-center justify-between text-xs">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-[#051650] text-[#FAC775] font-serif font-bold flex items-center justify-center text-sm">
                  {post.author.name[0]}
                </div>
                <div>
                  <p className="font-bold text-[#051650]">{post.author.name}</p>
                  <p className="text-stone-500">{post.author.role}</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleShare}
                  aria-label="Share article"
                  className="p-2 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-700 transition-colors flex items-center gap-1.5 cursor-pointer text-xs"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Share2 className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Link Copied' : 'Share'}</span>
                </button>
              </div>
            </div>
          </header>

          {/* Featured Image if present */}
          {post.image && (
            <div className="mb-10 rounded-2xl overflow-hidden shadow-sm border border-stone-200 max-h-[440px]">
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <p className="text-[11px] text-stone-500 italic p-2.5 bg-stone-100 text-center">
                Fig 1. Civil society stakeholders deliberating at the regional policy assembly.
              </p>
            </div>
          )}

          {/* Body Content with Drop Cap & Editorial Typography */}
          <div className="bg-white rounded-3xl p-8 sm:p-12 border border-stone-200 shadow-sm space-y-6 text-stone-800 leading-relaxed text-base">
            {post.content.map((paragraph, idx) => {
              // Apply drop cap to first paragraph
              if (idx === 0) {
                return (
                  <p key={idx} className="first-letter:text-5xl first-letter:font-serif first-letter:font-bold first-letter:float-left first-letter:mr-3 first-letter:mt-1 first-letter:text-[#051650] leading-relaxed">
                    {paragraph}
                  </p>
                );
              }

              // Intersperse a pull quote before the 3rd paragraph
              if (idx === 2) {
                return (
                  <React.Fragment key={idx}>
                    <blockquote className="my-8 py-6 px-8 bg-stone-50 rounded-2xl border-y border-stone-200 text-lg sm:text-xl font-serif italic text-[#051650] leading-snug text-center">
                      "When paperwork delays are treated as criminal infractions, families are torn apart and municipal economies suffer immediate shocks."
                    </blockquote>
                    <p className="leading-relaxed">{paragraph}</p>
                  </React.Fragment>
                );
              }

              return (
                <p key={idx} className="leading-relaxed">
                  {paragraph}
                </p>
              );
            })}
          </div>

          {/* Related Articles Strip */}
          <div className="mt-16 pt-10 border-t border-stone-200">
            <h3 className="text-xl font-serif-heading font-bold text-[#051650] mb-6">
              Related Dispatches
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {relatedPosts.map((rel) => (
                <div
                  key={rel.id}
                  onClick={() => handleOpenPost(rel.slug)}
                  className="bg-white p-6 rounded-2xl border border-stone-200 hover:shadow-md transition-shadow cursor-pointer flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <span className="text-[11px] text-stone-500 font-semibold">{rel.category}</span>
                    <h4 className="font-serif-heading font-bold text-[#051650] text-base hover:text-[#0A2275]">
                      {rel.title}
                    </h4>
                  </div>
                  <span className="text-xs font-semibold text-[#FAC775] mt-4 flex items-center gap-1">
                    Read Story <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </article>
    );
  }

  // Blog Archive Index View
  return (
    <div className="sm-blog-archive w-full bg-[#F2F2F2] text-[#051650] pt-24 pb-20">
      
      {/* Header */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-12 text-center">
        <span className="text-xs uppercase tracking-widest text-[#051650] font-bold">
          Knowledge & Perspectives
        </span>
        <h1 className="text-4xl sm:text-6xl font-serif-heading font-bold tracking-tight text-[#051650] mt-3 mb-6">
          Policy Blog & Field Dispatches
        </h1>
        <p className="text-base sm:text-lg text-stone-600 max-w-2xl mx-auto leading-relaxed">
          Critical analysis, grassroots dispatches, and legal commentaries produced by the SAMIN research collective and regional civil society partners.
        </p>

        {/* Search Bar */}
        <div className="max-w-md mx-auto mt-8 relative">
          <Search className="w-4 h-4 text-stone-400 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search analysis, topics, or authors..."
            className="w-full pl-11 pr-4 py-3 bg-white rounded-full border border-stone-300 text-xs text-stone-800 placeholder:text-stone-400 focus:outline-none focus:border-[#051650] shadow-sm"
          />
        </div>
      </section>

      {/* Category Filter Tabs */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="flex flex-wrap items-center justify-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-[#051650] text-[#FAC775] shadow-sm'
                  : 'bg-white text-stone-600 border border-stone-200 hover:border-stone-300 hover:text-stone-900'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Post Grid (Structured like WordPress Archive Loop) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {filteredPosts.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-3xl border border-stone-200 max-w-xl mx-auto p-8">
            <BookOpen className="w-8 h-8 text-stone-400 mx-auto mb-3" />
            <h3 className="text-lg font-bold font-serif-heading text-[#051650]">No articles found</h3>
            <p className="text-xs text-stone-500 mt-1">Try clearing your search term or selecting another category.</p>
            <button
              onClick={() => { setSelectedCategory('All'); setSearchQuery(''); }}
              className="mt-4 px-4 py-1.5 rounded-full text-xs font-semibold bg-[#051650] text-white cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post) => (
              <article
                key={post.id}
                onClick={() => handleOpenPost(post.slug)}
                className="group bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between cursor-pointer"
              >
                <div>
                  {post.image && (
                    <div className="h-48 w-full overflow-hidden bg-stone-100">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                  )}

                  <div className="p-6 space-y-3">
                    <div className="flex items-center gap-2 text-xs text-stone-500">
                      <span className="font-semibold text-[#051650]">{post.category}</span>
                      <span>·</span>
                      <span>{post.date}</span>
                    </div>

                    <h3 className="text-xl font-bold font-serif-heading text-[#051650] group-hover:text-[#0A2275] transition-colors leading-snug">
                      {post.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-stone-600 leading-relaxed line-clamp-3">
                      {post.excerpt}
                    </p>
                  </div>
                </div>

                <div className="px-6 py-4 bg-stone-50 border-t border-stone-100 flex items-center justify-between text-xs">
                  <div className="text-stone-500">
                    <span>By {post.author.name}</span>
                  </div>
                  <span className="font-semibold text-[#051650] group-hover:text-[#FAC775] flex items-center gap-1">
                    Read Post <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

    </div>
  );
};
