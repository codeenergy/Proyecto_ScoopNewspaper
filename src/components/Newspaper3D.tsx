import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Loader, X, Share2, Facebook, Twitter, Linkedin, Mail, ExternalLink } from 'lucide-react';
import { Article, Language } from '../types';
import { TRANSLATIONS } from '../constants';

interface Newspaper3DProps {
  articles: Article[];
  isLoading: boolean;
  category: string;
  onRefresh: () => void;
  language: Language;
}

export const Newspaper3D: React.FC<Newspaper3DProps> = ({
  articles,
  isLoading,
  category: _category,
  onRefresh,
  language
}) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const articlesPerPage = 2;
  const totalPages = Math.ceil(articles.length / articlesPerPage);
  const t = TRANSLATIONS[language];

  const shareArticle = (article: Article, platform: string) => {
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent(article.headline);
    const shareUrls: Record<string, string> = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
      twitter: `https://twitter.com/intent/tweet?text=${text}&url=${url}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${url}`,
      email: `mailto:?subject=${text}&body=${url}`
    };
    if (shareUrls[platform]) {
      window.open(shareUrls[platform], '_blank', 'width=600,height=400');
    }
  };

  const nextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-full">
        <Loader className="w-12 h-12 text-blue-400 animate-spin mb-4" />
        <p className="text-gray-400 text-lg">{t.loading}</p>
      </div>
    );
  }

  if (articles.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full">
        <p className="text-gray-400 text-lg mb-4">{t.endEdition}</p>
        <button
          onClick={onRefresh}
          className="px-6 py-2 bg-blue-500 hover:bg-blue-600 rounded-lg text-white transition-colors"
        >
          {t.checkBack}
        </button>
      </div>
    );
  }

  const currentArticles = articles.slice(
    currentPage * articlesPerPage,
    (currentPage + 1) * articlesPerPage
  );

  return (
    <div className="relative h-full flex items-center justify-center p-8">

      {/* Newspaper Container */}
      <div className="relative w-full max-w-6xl h-full perspective-[2000px]">

        <div
          key={currentPage}
          className="relative w-full h-full bg-[#fdfbf7] rounded-lg shadow-2xl overflow-hidden animate-fadeIn"
          style={{
            transformStyle: 'preserve-3d',
            boxShadow: '0 0 0 2px #8b7355, 0 0 0 4px #6b5345, 8px 8px 20px rgba(0,0,0,0.5)',
            border: '3px solid #8b7355'
          }}
        >

          {/* Page Content */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-8 h-full overflow-y-auto article-scroll">
            {currentArticles.map((article, index) => (
              <div key={index} className="flex flex-col">

                {/* Image */}
                <div className="w-full h-48 bg-gray-200 rounded-lg overflow-hidden mb-4">
                  <img
                    src={article.imageUrl}
                    alt={article.headline}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Category Badge */}
                <div className="mb-2">
                  <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 text-xs font-semibold rounded-full">
                    {article.category}
                  </span>
                </div>

                {/* Headline */}
                <h2 className="font-serif font-bold text-2xl md:text-3xl text-[#1a1a1a] leading-tight mb-2">
                  {article.headline}
                </h2>

                {/* Subheadline */}
                <p className="text-gray-600 italic mb-3 text-sm">
                  {article.subheadline}
                </p>

                {/* Source Badge */}
                {article.sourceName && (
                  <div className="mb-2">
                    <span className="inline-block px-2 py-1 bg-green-100 text-green-800 text-xs font-semibold rounded">
                      {article.sourceName}
                    </span>
                  </div>
                )}

                {/* Meta */}
                <div className="flex items-center gap-3 text-xs text-gray-500 mb-4">
                  <span>{article.author}</span>
                  <span>•</span>
                  <span>{article.date}</span>
                </div>

                {/* Content Preview */}
                <p className="text-gray-800 leading-relaxed text-sm line-clamp-4">
                  {article.content}
                </p>

                {/* Buttons */}
                <div className="mt-4 flex gap-2 flex-wrap">
                  <button
                    onClick={() => setSelectedArticle(article)}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors text-sm font-semibold"
                  >
                    {language === 'es' ? 'Leer más' : language === 'fr' ? 'Lire plus' : language === 'ar' ? 'اقرأ المزيد' : 'Read More'}
                  </button>
                  {article.sourceUrl && (
                    <a
                      href={article.sourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg transition-colors text-sm font-semibold flex items-center gap-1"
                    >
                      <ExternalLink className="w-3 h-3" />
                      {language === 'es' ? 'Ver original' : language === 'fr' ? 'Voir source' : language === 'ar' ? 'المصدر' : 'Source'}
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Page Number */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-gray-400 text-sm font-serif">
            {t.page} {currentPage + 1} / {totalPages}
          </div>

        </div>
      </div>

      {/* Navigation Buttons */}
      {currentPage > 0 && (
        <button
          onClick={prevPage}
          className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-blue-500/90 hover:bg-blue-600 text-white rounded-full shadow-lg transition-colors z-10"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
      )}

      {currentPage < totalPages - 1 && (
        <button
          onClick={nextPage}
          className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-blue-500/90 hover:bg-blue-600 text-white rounded-full shadow-lg transition-colors z-10"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      )}

      {/* Article Modal */}
      {selectedArticle && (
        <div
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedArticle(null)}
        >
          <div
            className="bg-gradient-to-br from-gray-900 to-black border border-white/20 rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-white/10 sticky top-0 bg-black/90 backdrop-blur z-10">
              <h2 className="text-xl font-bold text-white">
                {language === 'es' ? 'Artículo Completo' : language === 'fr' ? 'Article Complet' : language === 'ar' ? 'المقال الكامل' : 'Full Article'}
              </h2>
              <button
                onClick={() => setSelectedArticle(null)}
                className="text-gray-400 hover:text-white transition-colors p-2 hover:bg-white/10 rounded-full"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Article Content */}
            <div className="p-6">
              {/* Image */}
              <div className="w-full h-64 md:h-96 bg-gray-800 rounded-lg overflow-hidden mb-6">
                <img
                  src={selectedArticle.imageUrl}
                  alt={selectedArticle.headline}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Category */}
              <span className="inline-block px-3 py-1 bg-blue-500/20 text-blue-400 text-xs font-semibold rounded-full mb-4">
                {selectedArticle.category}
              </span>

              {/* Headline */}
              <h1 className="font-serif font-bold text-3xl md:text-4xl text-white mb-3">
                {selectedArticle.headline}
              </h1>

              {/* Subheadline */}
              <p className="text-gray-300 italic text-lg mb-4">
                {selectedArticle.subheadline}
              </p>

              {/* Source */}
              {selectedArticle.sourceName && (
                <div className="flex items-center gap-2 mb-4">
                  <span className="px-3 py-1 bg-green-500/20 text-green-400 text-sm font-semibold rounded">
                    {selectedArticle.sourceName}
                  </span>
                  {selectedArticle.sourceUrl && (
                    <a
                      href={selectedArticle.sourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 px-3 py-1 bg-white/10 hover:bg-white/20 text-white text-sm rounded transition-colors"
                    >
                      <ExternalLink className="w-3 h-3" />
                      {language === 'es' ? 'Ver artículo original' : language === 'fr' ? 'Voir article original' : language === 'ar' ? 'عرض المقال الأصلي' : 'View original article'}
                    </a>
                  )}
                </div>
              )}

              {/* Meta */}
              <div className="flex items-center gap-3 text-sm text-gray-400 mb-6 pb-6 border-b border-white/10">
                <span className="font-semibold">{selectedArticle.author}</span>
                <span>•</span>
                <span>{selectedArticle.date}</span>
              </div>

              {/* Content */}
              <div className="text-gray-300 leading-relaxed text-base mb-6">
                {selectedArticle.content}
              </div>

              {/* Summary */}
              {selectedArticle.summary && (
                <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg mb-6">
                  <p className="text-sm text-blue-300 italic">
                    {selectedArticle.summary}
                  </p>
                </div>
              )}

              {/* Share Section */}
              <div className="border-t border-white/10 pt-6">
                <h3 className="text-white font-semibold mb-3 flex items-center gap-2">
                  <Share2 className="w-5 h-5" />
                  {language === 'es' ? 'Compartir' : language === 'fr' ? 'Partager' : language === 'ar' ? 'مشاركة' : 'Share'}
                </h3>
                <div className="flex items-center gap-3 flex-wrap">
                  <button
                    onClick={() => shareArticle(selectedArticle, 'facebook')}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                  >
                    <Facebook className="w-4 h-4" />
                    Facebook
                  </button>
                  <button
                    onClick={() => shareArticle(selectedArticle, 'twitter')}
                    className="flex items-center gap-2 px-4 py-2 bg-sky-500 hover:bg-sky-600 text-white rounded-lg transition-colors"
                  >
                    <Twitter className="w-4 h-4" />
                    Twitter
                  </button>
                  <button
                    onClick={() => shareArticle(selectedArticle, 'linkedin')}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-700 hover:bg-blue-800 text-white rounded-lg transition-colors"
                  >
                    <Linkedin className="w-4 h-4" />
                    LinkedIn
                  </button>
                  <button
                    onClick={() => shareArticle(selectedArticle, 'email')}
                    className="flex items-center gap-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors"
                  >
                    <Mail className="w-4 h-4" />
                    Email
                  </button>
                </div>
              </div>
            </div>

            {/* Close Button */}
            <div className="p-4 border-t border-white/10 text-center">
              <button
                onClick={() => setSelectedArticle(null)}
                className="px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
              >
                {language === 'es' ? 'Cerrar' : language === 'fr' ? 'Fermer' : language === 'ar' ? 'إغلاق' : 'Close'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
