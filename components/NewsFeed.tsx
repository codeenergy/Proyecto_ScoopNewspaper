
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Article, Language } from '../types';
import { Share2, Bookmark } from 'lucide-react';
import { TRANSLATIONS } from '../constants';
import { ShareModal } from './ShareModal';
import { ArticleModal } from './ArticleModal';

interface NewsFeedProps {
  articles: Article[];
  isLoading: boolean;
  language: Language;
}

export const NewsFeed: React.FC<NewsFeedProps> = ({ articles, isLoading, language }) => {
  
  const isRTL = language === 'ar';
  const t = TRANSLATIONS[language];
  const [bookmarked, setBookmarked] = useState<Set<number>>(new Set());
  const [activeShareArticle, setActiveShareArticle] = useState<Article | null>(null);
  const [activeReadArticle, setActiveReadArticle] = useState<Article | null>(null);

  const toggleBookmark = (index: number) => {
    const newSet = new Set(bookmarked);
    if (newSet.has(index)) {
      newSet.delete(index);
    } else {
      newSet.add(index);
    }
    setBookmarked(newSet);
  };

  if (isLoading) {
    return (
      <div className="w-full h-full flex items-center justify-center">
         <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <>
      <div className="w-full h-full overflow-y-auto p-4 md:p-8 custom-scrollbar" dir={isRTL ? 'rtl' : 'ltr'}>
        {/* Responsive Grid: 1 col mobile, 2 cols tablet, 3 cols desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 pb-20">
          {articles.map((article, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => setActiveReadArticle(article)}
              className="bg-gray-900/60 backdrop-blur-md rounded-3xl border border-white/10 overflow-hidden shadow-2xl flex flex-col h-fit hover:border-white/20 transition-all duration-300 hover:scale-[1.02] group cursor-pointer"
            >
              {/* Card Header */}
              <div className="p-4 flex items-center gap-3 border-b border-white/5">
                <div className="w-10 h-10 shrink-0 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-xs shadow-lg">
                    {article.category.slice(0, 2).toUpperCase()}
                </div>
                <div className="flex-1 min-w-0">
                    <h3 className="text-white text-sm font-bold truncate">{article.author}</h3>
                    <p className="text-gray-400 text-xs truncate">{article.location} • {article.date}</p>
                </div>
                <button 
                    onClick={(e) => {
                        e.stopPropagation();
                        toggleBookmark(index);
                    }}
                    className={`p-2 rounded-full transition-colors z-10 relative ${bookmarked.has(index) ? 'text-yellow-400 bg-yellow-400/10' : 'text-gray-500 hover:text-white hover:bg-white/10'}`}
                  >
                    <Bookmark size={18} fill={bookmarked.has(index) ? "currentColor" : "none"} />
                </button>
              </div>

              {/* Image */}
              <div className="relative aspect-[16/9] w-full bg-black overflow-hidden">
                <img src={article.imageUrl} alt={article.headline} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-60" />
              </div>

              {/* Content */}
              <div className="p-5 flex flex-col gap-3 relative flex-1">
                <div className="absolute -top-6 right-4 z-10">
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveShareArticle(article);
                      }}
                      className="bg-blue-600 hover:bg-blue-500 text-white p-3 rounded-full shadow-lg shadow-blue-900/50 transition-all hover:scale-110 flex items-center justify-center"
                      title="Share"
                    >
                      <Share2 size={20} />
                    </button>
                </div>

                <h2 className="text-xl font-bold text-white leading-tight mt-2 group-hover:text-blue-400 transition-colors">{article.headline}</h2>
                
                <div className="bg-white/5 border border-white/5 rounded-xl p-4 flex-1">
                    <p className="text-gray-300 text-sm font-medium leading-relaxed">
                      {article.summary || article.subheadline}
                    </p>
                </div>
                
                <div className="mt-2 text-blue-400 text-xs font-bold uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-2 group-hover:translate-y-0">
                    Read Full Article &rarr;
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Modals */}
      <AnimatePresence>
        {activeShareArticle && (
            <ShareModal 
                article={activeShareArticle} 
                onClose={() => setActiveShareArticle(null)} 
            />
        )}
        {activeReadArticle && (
            <ArticleModal 
                article={activeReadArticle} 
                onClose={() => setActiveReadArticle(null)}
                onShare={() => {
                    // Close read modal if you want, or just stack them. Stacking is fine for now.
                    setActiveShareArticle(activeReadArticle);
                }} 
            />
        )}
      </AnimatePresence>
    </>
  );
};
