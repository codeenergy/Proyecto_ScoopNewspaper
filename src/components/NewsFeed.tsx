import React, { useState } from 'react';
import { Loader, X, Share2, Facebook, Twitter, Linkedin, Mail, ExternalLink } from 'lucide-react';
import { Article, Language } from '../types';
import { TRANSLATIONS } from '../constants';

interface NewsFeedProps {
  articles: Article[];
  isLoading: boolean;
  language: Language;
}

export const NewsFeed: React.FC<NewsFeedProps> = ({ articles, isLoading, language }) => {
  const t = TRANSLATIONS[language];
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);

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

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-full">
        <Loader className="w-12 h-12 text-blue-400 animate-spin mb-4" />
        <p className="text-gray-400 text-lg">{t.loading}</p>
      </div>
    );
  }

  return (
    <>
      <div className="h-full overflow-y-auto px-4 py-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((article, index) => (
              <div
                key={index}
                className="glass-panel rounded-lg overflow-hidden hover:border-blue-500/50 transition-colors flex flex-col"
              >
                {/* Image */}
                <div className="w-full h-48 bg-gray-800 overflow-hidden flex-shrink-0">
                  <img
                    src={article.imageUrl}
                    alt={article.headline}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Content */}
                <div className="p-4 flex flex-col flex-1">
                  {/* Category & Source */}
                  <div className="flex items-center gap-2 mb-2 flex-wrap">
                    <span className="inline-block px-3 py-1 bg-blue-500/20 text-blue-400 text-xs font-semibold rounded-full">
                      {article.category}
                    </span>
                    {article.sourceName && (
                      <span className="inline-block px-2 py-1 bg-green-500/20 text-green-400 text-xs font-semibold rounded">
                        {article.sourceName}
                      </span>
                    )}
                  </div>

                  {/* Headline */}
                  <h2 className="font-serif font-bold text-lg text-white mb-2 line-clamp-2">
                    {article.headline}
                  </h2>

                  {/* Subheadline */}
                  <p className="text-gray-300 italic mb-3 text-sm line-clamp-2">
                    {article.subheadline}
                  </p>

                  {/* Meta */}
                  <div className="flex items-center gap-2 text-xs text-gray-400 mb-3">
                    <span>{article.author}</span>
                    <span>•</span>
                    <span>{article.date}</span>
                  </div>

                  {/* Content */}
                  <p className="text-gray-300 leading-relaxed text-sm line-clamp-3 flex-1">
                    {article.content}
                  </p>

                  {/* Summary */}
                  {article.summary && (
                    <div className="mt-3 p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                      <p className="text-xs text-blue-300 italic line-clamp-2">
                        💡 {article.summary}
                      </p>
                    </div>
                  )}

                  {/* Actions */}
                  <div className="mt-4 flex items-center gap-2 flex-wrap">
                    {/* Read More Button */}
                    <button
                      onClick={() => setSelectedArticle(article)}
                      className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors font-semibold text-sm"
                    >
                      {language === 'es' ? 'Leer más' : language === 'fr' ? 'Lire plus' : language === 'ar' ? 'اقرأ المزيد' : 'Read More'}
                    </button>

                    {/* Source Button */}
                    {article.sourceUrl && (
                      <a
                        href={article.sourceUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 px-4 py-2 bg-green-500/20 hover:bg-green-500/30 text-green-400 rounded-lg transition-colors text-sm font-medium"
                      >
                        <ExternalLink className="w-3 h-3" />
                        {language === 'es' ? 'Fuente' : language === 'fr' ? 'Source' : language === 'ar' ? 'المصدر' : 'Source'}
                      </a>
                    )}

                    {/* Share Button */}
                    <button
                      onClick={() => setSelectedArticle(article)}
                      className="flex items-center gap-2 px-3 py-2 bg-white/5 hover:bg-white/10 text-gray-300 rounded-lg transition-colors"
                      title="Share article"
                    >
                      <Share2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

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
              <h2 className="text-xl font-bold text-white">Article Details</h2>
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

              {/* Meta */}
              <div className="flex items-center gap-3 text-sm text-gray-400 mb-6 pb-6 border-b border-white/10">
                <span className="font-semibold">{selectedArticle.author}</span>
                <span>•</span>
                <span>{selectedArticle.date}</span>
                {selectedArticle.location && (
                  <>
                    <span>•</span>
                    <span>{selectedArticle.location}</span>
                  </>
                )}
              </div>

              {/* Content */}
              <div className="text-gray-300 leading-relaxed text-base mb-6">
                {selectedArticle.content}
              </div>

              {/* Summary */}
              {selectedArticle.summary && (
                <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg mb-6">
                  <p className="text-sm text-blue-300 italic">
                    💡 {selectedArticle.summary}
                  </p>
                </div>
              )}

              {/* Share Section */}
              <div className="border-t border-white/10 pt-6">
                <h3 className="text-white font-semibold mb-3 flex items-center gap-2">
                  <Share2 className="w-5 h-5" />
                  Share this article
                </h3>
                <div className="flex items-center gap-3">
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
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
