import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Loader } from 'lucide-react';
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
  category,
  onRefresh,
  language
}) => {
  const [currentPage, setCurrentPage] = useState(0);
  const articlesPerPage = 2;
  const totalPages = Math.ceil(articles.length / articlesPerPage);
  const t = TRANSLATIONS[language];

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

                {/* Meta */}
                <div className="flex items-center gap-3 text-xs text-gray-500 mb-4">
                  <span>{article.author}</span>
                  <span>•</span>
                  <span>{article.date}</span>
                  {article.location && (
                    <>
                      <span>•</span>
                      <span>{article.location}</span>
                    </>
                  )}
                </div>

                {/* Content */}
                <p className="text-gray-800 leading-relaxed text-sm">
                  {article.content}
                </p>
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
    </div>
  );
};
