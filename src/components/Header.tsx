import React, { useState, useEffect } from 'react';
import { Newspaper, Menu, RefreshCw, Play, X, Globe, Search, Layers, BookOpen } from 'lucide-react';
import { APP_NAME, TRANSLATIONS, WEATHER_API_KEY, LANGUAGES, COUNTRIES } from '../constants';
import { Language, Article, FilterState, Category, Country } from '../types';

interface HeaderProps {
  language: Language;
  isSidebarOpen: boolean;
  onToggleSidebar: () => void;
  articles: Article[];
  onRefresh: () => void;
  onOpenVideoSupporters?: () => void;
  onLanguageChange?: (lang: Language) => void;
  filterState?: FilterState;
  setFilterState?: React.Dispatch<React.SetStateAction<FilterState>>;
}

export const Header: React.FC<HeaderProps> = ({
  language,
  isSidebarOpen,
  onToggleSidebar,
  articles,
  onRefresh,
  onOpenVideoSupporters,
  onLanguageChange,
  filterState,
  setFilterState
}) => {
  const [weather, setWeather] = useState<{ temp: number; condition: string } | null>(null);
  const [weatherDetails, setWeatherDetails] = useState<any>(null);
  const [forecast, setForecast] = useState<any[]>([]);
  const [showWeatherModal, setShowWeatherModal] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [selectedBreakingNews, setSelectedBreakingNews] = useState<Article | null>(null);
  const [currentNewsIndex, setCurrentNewsIndex] = useState(0);
  const t = TRANSLATIONS[language];

  const categories = ['All', Category.WORLD, Category.TECH, Category.BUSINESS, Category.SCIENCE, Category.ARTS, Category.SPORTS];
  const languages: { code: Language; name: string }[] = [
    { code: 'en', name: 'English' },
    { code: 'es', name: 'Español' },
    { code: 'fr', name: 'Français' },
    { code: 'ar', name: 'العربية' }
  ];

  useEffect(() => {
    const city = t.weatherCity || 'London';

    // Fetch current weather
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${WEATHER_API_KEY}`)
      .then(res => res.json())
      .then(data => {
        if (data.main && data.weather) {
          setWeather({
            temp: Math.round(data.main.temp),
            condition: data.weather[0].main
          });
          setWeatherDetails(data);
        }
      })
      .catch(() => setWeather({ temp: 18, condition: 'Clear' }));

    // Fetch 5-day forecast
    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${WEATHER_API_KEY}`)
      .then(res => res.json())
      .then(data => {
        if (data.list) {
          // Get one forecast per day (at 12:00)
          const dailyForecast = data.list.filter((_: any, index: number) => index % 8 === 0).slice(0, 5);
          setForecast(dailyForecast);
        }
      })
      .catch(() => setForecast([]));
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
              <button
                onClick={() => setShowWeatherModal(true)}
                className="hidden sm:flex items-center gap-2 text-sm text-gray-300 hover:text-white hover:bg-white/10 px-3 py-2 rounded-lg transition-all cursor-pointer"
                title="View weather details"
              >
                <span>{getWeatherEmoji(weather.condition)}</span>
                <span>{weather.temp}°C</span>
              </button>
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

            {/* Support Direct Link */}
            <a
              href="https://otieu.com/4/10325584"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 rounded-lg transition-all text-white text-sm font-semibold"
              title="Direct Support Link"
            >
              <Play className="w-4 h-4" />
              <span className="hidden lg:inline">Support</span>
            </a>

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

      {/* Mobile Menu - Filtros */}
      {showMobileMenu && filterState && setFilterState && (
        <div className="fixed inset-0 bg-black/80 z-50 lg:hidden" onClick={() => setShowMobileMenu(false)}>
          <div
            className="absolute right-0 top-0 h-full w-80 bg-gradient-to-br from-gray-900 to-black border-l border-white/20 shadow-2xl overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-white/10 sticky top-0 bg-black/90 backdrop-blur z-10">
              <h3 className="text-white font-bold flex items-center gap-2">
                <Menu className="w-5 h-5" />
                {t.filters || 'Filters'}
              </h3>
              <button
                onClick={() => setShowMobileMenu(false)}
                className="text-gray-400 hover:text-white transition-colors p-2 hover:bg-white/10 rounded-full"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 space-y-6">
              {/* Search */}
              <div>
                <label className="text-gray-400 text-xs font-semibold mb-2 block flex items-center gap-2">
                  <Search className="w-4 h-4" />
                  {t.search || 'Search'}
                </label>
                <input
                  type="text"
                  placeholder={t.search}
                  value={filterState.searchQuery}
                  onChange={(e) => setFilterState(prev => ({ ...prev, searchQuery: e.target.value }))}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-sm text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                />
              </div>

              {/* Category */}
              <div>
                <label className="text-gray-400 text-xs font-semibold mb-2 block">
                  {t.category || 'Category'}
                </label>
                <select
                  value={filterState.category}
                  onChange={(e) => setFilterState(prev => ({ ...prev, category: e.target.value as any }))}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                >
                  {categories.map(cat => (
                    <option key={cat} value={cat} className="bg-gray-900">{cat}</option>
                  ))}
                </select>
              </div>

              {/* Language */}
              <div>
                <label className="text-gray-400 text-xs font-semibold mb-2 block flex items-center gap-2">
                  <Globe className="w-4 h-4" />
                  {t.language || 'Language'}
                </label>
                <select
                  value={filterState.language}
                  onChange={(e) => {
                    const newLang = e.target.value as Language;
                    setFilterState(prev => ({ ...prev, language: newLang }));
                    onLanguageChange?.(newLang);
                  }}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                >
                  {languages.map(lang => (
                    <option key={lang.code} value={lang.code} className="bg-gray-900">{lang.name}</option>
                  ))}
                </select>
              </div>

              {/* Country */}
              <div>
                <label className="text-gray-400 text-xs font-semibold mb-2 block">
                  {t.country || 'Country'}
                </label>
                <select
                  value={filterState.country}
                  onChange={(e) => setFilterState(prev => ({ ...prev, country: e.target.value as Country }))}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                >
                  {COUNTRIES.map(country => (
                    <option key={country.code} value={country.code} className="bg-gray-900">
                      {country.flag} {country.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* View Mode Toggle */}
              <div>
                <label className="text-gray-400 text-xs font-semibold mb-2 block">
                  {t.viewMode || 'View Mode'}
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setFilterState(prev => ({ ...prev, viewMode: '3d' }))}
                    className={`px-4 py-3 rounded-lg text-sm flex items-center justify-center gap-2 transition-all ${
                      filterState.viewMode === '3d'
                        ? 'bg-blue-500 text-white'
                        : 'bg-white/5 text-gray-400 hover:bg-white/10 border border-white/10'
                    }`}
                  >
                    <Layers className="w-4 h-4" />
                    {t.view3d || '3D'}
                  </button>
                  <button
                    onClick={() => setFilterState(prev => ({ ...prev, viewMode: 'feed' }))}
                    className={`px-4 py-3 rounded-lg text-sm flex items-center justify-center gap-2 transition-all ${
                      filterState.viewMode === 'feed'
                        ? 'bg-blue-500 text-white'
                        : 'bg-white/5 text-gray-400 hover:bg-white/10 border border-white/10'
                    }`}
                  >
                    <BookOpen className="w-4 h-4" />
                    {t.viewFeed || 'Feed'}
                  </button>
                </div>
              </div>

              {/* Video & Supporters Button for Mobile */}
              {onOpenVideoSupporters && (
                <button
                  onClick={() => {
                    setShowMobileMenu(false);
                    onOpenVideoSupporters();
                  }}
                  className="w-full px-4 py-3 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 rounded-lg transition-all text-white font-semibold flex items-center justify-center gap-2"
                >
                  <Play className="w-4 h-4" />
                  Video & Supporters
                </button>
              )}

              {/* Support Direct Link for Mobile */}
              <a
                href="https://otieu.com/4/10325584"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setShowMobileMenu(false)}
                className="w-full px-4 py-3 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 rounded-lg transition-all text-white font-semibold flex items-center justify-center gap-2"
              >
                <Play className="w-4 h-4" />
                Support Direct
              </a>

              {/* Close Button */}
              <button
                onClick={() => setShowMobileMenu(false)}
                className="w-full mt-4 px-4 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors font-semibold"
              >
                {t.apply || 'Apply Filters'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Weather Details Modal */}
      {showWeatherModal && weatherDetails && (
        <div
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
          onClick={() => setShowWeatherModal(false)}
        >
          <div
            className="bg-gradient-to-br from-blue-900 to-black border border-blue-500/50 rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-white/10 sticky top-0 bg-black/90 backdrop-blur z-10">
              <div className="flex items-center gap-3">
                <span className="text-4xl">{getWeatherEmoji(weatherDetails.weather[0].main)}</span>
                <div>
                  <h2 className="text-2xl font-bold text-white">{weatherDetails.name}</h2>
                  <p className="text-sm text-gray-400">{weatherDetails.sys.country}</p>
                </div>
              </div>
              <button
                onClick={() => setShowWeatherModal(false)}
                className="text-gray-400 hover:text-white transition-colors p-2 hover:bg-white/10 rounded-full"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Current Weather */}
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                {/* Temperature Card */}
                <div className="bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-lg p-6 border border-blue-500/30">
                  <h3 className="text-sm text-gray-400 mb-2">Temperature</h3>
                  <div className="flex items-end gap-2">
                    <span className="text-6xl font-bold text-white">{Math.round(weatherDetails.main.temp)}°</span>
                    <div className="pb-2 text-gray-300">
                      <div className="text-xs">Feels like {Math.round(weatherDetails.main.feels_like)}°C</div>
                      <div className="text-xs">Min {Math.round(weatherDetails.main.temp_min)}° / Max {Math.round(weatherDetails.main.temp_max)}°</div>
                    </div>
                  </div>
                  <p className="text-lg text-blue-300 mt-2 capitalize">{weatherDetails.weather[0].description}</p>
                </div>

                {/* Details Grid */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                    <div className="text-sm text-gray-400 mb-1">Humidity</div>
                    <div className="text-2xl font-bold text-white">💧 {weatherDetails.main.humidity}%</div>
                  </div>
                  <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                    <div className="text-sm text-gray-400 mb-1">Pressure</div>
                    <div className="text-2xl font-bold text-white">🔽 {weatherDetails.main.pressure} hPa</div>
                  </div>
                  <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                    <div className="text-sm text-gray-400 mb-1">Wind Speed</div>
                    <div className="text-2xl font-bold text-white">💨 {Math.round(weatherDetails.wind.speed * 3.6)} km/h</div>
                  </div>
                  <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                    <div className="text-sm text-gray-400 mb-1">Visibility</div>
                    <div className="text-2xl font-bold text-white">👁️ {(weatherDetails.visibility / 1000).toFixed(1)} km</div>
                  </div>
                </div>
              </div>

              {/* 5-Day Forecast */}
              {forecast.length > 0 && (
                <div className="mt-6">
                  <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                    📅 5-Day Forecast
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                    {forecast.map((day: any, index: number) => (
                      <div
                        key={index}
                        className="bg-white/5 rounded-lg p-4 border border-white/10 text-center hover:bg-white/10 transition-colors"
                      >
                        <div className="text-sm text-gray-400 mb-2">
                          {new Date(day.dt * 1000).toLocaleDateString(language, { weekday: 'short', month: 'short', day: 'numeric' })}
                        </div>
                        <div className="text-3xl mb-2">{getWeatherEmoji(day.weather[0].main)}</div>
                        <div className="text-lg font-bold text-white">{Math.round(day.main.temp)}°C</div>
                        <div className="text-xs text-gray-400 capitalize mt-1">{day.weather[0].description}</div>
                        <div className="text-xs text-blue-300 mt-2">💧 {day.main.humidity}%</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Additional Info */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                <div className="bg-white/5 rounded-lg p-3 border border-white/10">
                  <div className="text-xs text-gray-400">Sunrise</div>
                  <div className="text-sm font-semibold text-yellow-400">
                    🌅 {new Date(weatherDetails.sys.sunrise * 1000).toLocaleTimeString(language, { hour: '2-digit', minute: '2-digit' })}
                  </div>
                </div>
                <div className="bg-white/5 rounded-lg p-3 border border-white/10">
                  <div className="text-xs text-gray-400">Sunset</div>
                  <div className="text-sm font-semibold text-orange-400">
                    🌇 {new Date(weatherDetails.sys.sunset * 1000).toLocaleTimeString(language, { hour: '2-digit', minute: '2-digit' })}
                  </div>
                </div>
                {weatherDetails.clouds && (
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">
                    <div className="text-xs text-gray-400">Cloudiness</div>
                    <div className="text-sm font-semibold text-white">☁️ {weatherDetails.clouds.all}%</div>
                  </div>
                )}
                {weatherDetails.wind?.deg !== undefined && (
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">
                    <div className="text-xs text-gray-400">Wind Direction</div>
                    <div className="text-sm font-semibold text-white">🧭 {weatherDetails.wind.deg}°</div>
                  </div>
                )}
              </div>
            </div>

            {/* Close Button */}
            <div className="p-4 border-t border-white/10 text-center">
              <button
                onClick={() => setShowWeatherModal(false)}
                className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
              >
                Close
              </button>
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
