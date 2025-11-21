import React, { useState, useEffect } from 'react';
import { Newspaper, Menu, RefreshCw, Play, X, Globe } from 'lucide-react';
import { APP_NAME, TRANSLATIONS, WEATHER_API_KEY, LANGUAGES } from '../constants';
import { Language, Article } from '../types';

interface HeaderProps {
  language: Language;
  isSidebarOpen: boolean;
  onToggleSidebar: () => void;
  articles: Article[];
  onRefresh: () => void;
  onOpenVideoSupporters?: () => void;
  onLanguageChange?: (lang: Language) => void;
}

export const Header: React.FC<HeaderProps> = ({
  language,
  isSidebarOpen,
  onToggleSidebar,
  articles,
  onRefresh,
  onOpenVideoSupporters,
  onLanguageChange
}) => {
  const [weather, setWeather] = useState<{ temp: number; condition: string } | null>(null);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [selectedBreakingNews, setSelectedBreakingNews] = useState<Article | null>(null);
  const [currentNewsIndex, setCurrentNewsIndex] = useState(0);
  const t = TRANSLATIONS[language];

  useEffect(() => {
    const city = t.weatherCity || 'London';
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${WEATHER_API_KEY}`)
      .then(res => res.json())
      .then(data => {
        if (data.main && data.weather) {
          setWeather({
            temp: Math.round(data.main.temp),
            condition: data.weather[0].main
          });
        }
      })
      .catch(() => setWeather({ temp: 18, condition: 'Clear' }));
  }, [language]);

  const getCategoryIcon = (category: string) => {
    const icons: Record<string, string> = {
      'World': '🌍',
      'Politics': '🏛️',
      'Business': '💼',
      'Tech': '💻',
      'Science': '🔬',
      'Health': '⚕️',
      'Sports': '⚽',
      'Entertainment': '🎬',
      'Arts': '🎨',
      'Opinion': '💭'
    };
    return icons[category] || '📰';
  };

  const getWeatherEmoji = (condition: string) => {
    const map: Record<string, string> = {
      'Clear': '☀️',
      'Clouds': '☁️',
      'Rain': '🌧️',
      'Snow': '❄️',
      'Thunderstorm': '⛈️'
    };
    return map[condition] || '🌤️';
  };

  // Get top 10 articles for breaking news ticker
  const topArticles = articles.slice(0, 10);

  return (
    <>
      <header className="relative z-20 glass-panel border-b border-white/10">
        <div className="flex items-center justify-between px-4 py-3">

          {/* Logo & Title */}
          <div className="flex items-center gap-3">
            <Newspaper className="w-6 h-6 text-blue-400" />
            <h1 className="text-xl font-serif font-bold text-white tracking-tight">
              {APP_NAME}
            </h1>
            <span className="hidden md:inline text-xs text-gray-400 font-sans">
              {new Date().toLocaleDateString(language, {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </span>
          </div>

          {/* Weather & Controls */}
          <div className="flex items-center gap-2">
            {weather && (
              <div className="hidden sm:flex items-center gap-2 text-sm text-gray-300">
                <span>{getWeatherEmoji(weather.condition)}</span>
                <span>{weather.temp}°C</span>
              </div>
            )}

            {/* Video & Supporters Button */}
            {onOpenVideoSupporters && (
              <button
                onClick={onOpenVideoSupporters}
                className="hidden md:flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 rounded-lg transition-all text-white text-sm font-semibold"
              >
                <Play className="w-4 h-4" />
                <span className="hidden lg:inline">Video & Supporters</span>
              </button>
            )}

            <button
              onClick={onRefresh}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors"
              title="Refresh news"
            >
              <RefreshCw className="w-5 h-5 text-gray-300" />
            </button>

            <button
              onClick={() => setShowMobileMenu(!showMobileMenu)}
              className="lg:hidden p-2 hover:bg-white/10 rounded-lg transition-colors"
            >
              <Menu className="w-5 h-5 text-gray-300" />
            </button>
          </div>
        </div>

        {/* Breaking News Ticker */}
        {topArticles.length > 0 && (
          <div className="border-t border-white/10 bg-red-600/10 backdrop-blur overflow-hidden">
            <div className="flex items-center px-4 py-2">
              <div className="flex items-center gap-2 mr-3 flex-shrink-0">
                <span className="bg-red-600 text-white text-xs font-bold px-2 py-1 rounded">
                  {t.breaking || 'BREAKING'}
                </span>
              </div>
              <div className="flex-1 overflow-hidden relative">
                <div className="breaking-news-scroll flex items-center gap-8">
                  {/* Duplicate articles for seamless loop */}
                  {[...topArticles, ...topArticles].map((article, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedBreakingNews(article)}
                      className="flex items-center gap-2 text-white hover:text-blue-400 transition-colors text-sm font-medium whitespace-nowrap flex-shrink-0"
                    >
                      <span className="text-base">{getCategoryIcon(article.category)}</span>
                      <span>{article.headline}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Mobile Menu */}
      {showMobileMenu && (
        <div className="fixed inset-0 bg-black/80 z-50 lg:hidden" onClick={() => setShowMobileMenu(false)}>
          <div
            className="absolute right-0 top-0 h-full w-64 bg-gradient-to-br from-gray-900 to-black border-l border-white/20 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-white/10">
              <h3 className="text-white font-bold flex items-center gap-2">
                <Globe className="w-5 h-5" />
                Language
              </h3>
              <button
                onClick={() => setShowMobileMenu(false)}
                className="text-gray-400 hover:text-white transition-colors p-2 hover:bg-white/10 rounded-full"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Language Options */}
            <div className="p-4">
              {LANGUAGES.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => {
                    onLanguageChange?.(lang.code as Language);
                    setShowMobileMenu(false);
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all mb-2 ${
                    language === lang.code
                      ? 'bg-blue-500 text-white'
                      : 'bg-white/5 text-gray-300 hover:bg-white/10'
                  }`}
                >
                  <span className="text-2xl">{lang.flag}</span>
                  <span className="font-medium">{lang.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Breaking News Modal */}
      {selectedBreakingNews && (
        <div
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedBreakingNews(null)}
        >
          <div
            className="bg-gradient-to-br from-gray-900 to-black border border-red-500/50 rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-white/10 sticky top-0 bg-black/90 backdrop-blur z-10">
              <div className="flex items-center gap-2">
                <span className="bg-red-600 text-white text-xs font-bold px-2 py-1 rounded">
                  {t.breaking || 'BREAKING'}
                </span>
                <h2 className="text-xl font-bold text-white">Breaking News</h2>
              </div>
              <button
                onClick={() => setSelectedBreakingNews(null)}
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
                  src={selectedBreakingNews.imageUrl}
                  alt={selectedBreakingNews.headline}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Category */}
              <span className="inline-block px-3 py-1 bg-red-500/20 text-red-400 text-xs font-semibold rounded-full mb-4">
                {selectedBreakingNews.category}
              </span>

              {/* Headline */}
              <h1 className="font-serif font-bold text-3xl md:text-4xl text-white mb-3">
                {selectedBreakingNews.headline}
              </h1>

              {/* Subheadline */}
              <p className="text-gray-300 italic text-lg mb-4">
                {selectedBreakingNews.subheadline}
              </p>

              {/* Meta */}
              <div className="flex items-center gap-3 text-sm text-gray-400 mb-6 pb-6 border-b border-white/10">
                <span className="font-semibold">{selectedBreakingNews.author}</span>
                <span>•</span>
                <span>{selectedBreakingNews.date}</span>
                {selectedBreakingNews.location && (
                  <>
                    <span>•</span>
                    <span>{selectedBreakingNews.location}</span>
                  </>
                )}
              </div>

              {/* Content */}
              <div className="text-gray-300 leading-relaxed text-base mb-6">
                {selectedBreakingNews.content}
              </div>

              {/* Summary */}
              {selectedBreakingNews.summary && (
                <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg mb-6">
                  <p className="text-sm text-red-300 italic">
                    💡 {selectedBreakingNews.summary}
                  </p>
                </div>
              )}
            </div>

            {/* Close Button */}
            <div className="p-4 border-t border-white/10 text-center">
              <button
                onClick={() => setSelectedBreakingNews(null)}
                className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
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
