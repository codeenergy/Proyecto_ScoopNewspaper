
import React, { useEffect, useState } from 'react';
import { CloudSun, Menu, PanelRight, RefreshCw } from 'lucide-react';
import { WEATHER_API_KEY, TRANSLATIONS } from '../constants';
import { Language, Article } from '../types';

interface WeatherData {
  temp: number;
  city: string;
  loading: boolean;
}

interface HeaderProps {
  language: Language;
  isSidebarOpen: boolean;
  onToggleSidebar: () => void;
  articles: Article[];
  onRefresh: () => void;
}

export const Header: React.FC<HeaderProps> = ({ language, isSidebarOpen, onToggleSidebar, articles, onRefresh }) => {
  const [weather, setWeather] = useState<WeatherData>({ temp: 0, city: 'Loading...', loading: true });
  const t = TRANSLATIONS[language];
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    const fetchWeather = async (lat: number, lon: number) => {
        if (!WEATHER_API_KEY) return;
        try {
            const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${WEATHER_API_KEY}`);
            const data = await res.json();
            if (data.main) {
                setWeather({
                    temp: Math.round(data.main.temp),
                    city: data.name,
                    loading: false
                });
            }
        } catch (e) {
            console.error("Weather fetch failed", e);
            setWeather({ temp: 22, city: t.weatherCity, loading: false });
        }
    };

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => fetchWeather(position.coords.latitude, position.coords.longitude),
            () => fetchWeather(51.5074, -0.1278) // Default to London
        );
    } else {
        fetchWeather(51.5074, -0.1278);
    }
  }, [t.weatherCity]);

  const handleLogoClick = () => {
    setIsRefreshing(true);
    onRefresh();
    setTimeout(() => setIsRefreshing(false), 1000);
  };

  return (
    <header className="w-full h-14 bg-black/80 backdrop-blur-md border-b border-white/10 flex items-center justify-between px-4 z-50 relative shrink-0">
      
      {/* Left: Brand */}
      <div className="flex items-center gap-3">
        <div className="md:hidden text-white" onClick={onToggleSidebar}>
            <Menu size={20} />
        </div>
        <div 
          className="flex items-center gap-2 cursor-pointer group select-none" 
          onClick={handleLogoClick}
          title="Click to Refresh Edition"
        >
          <div className={`text-2xl leading-none filter drop-shadow-lg transition-transform ${isRefreshing ? 'animate-spin' : 'group-hover:scale-110'}`}>
            📰
          </div>
          <span className="font-serif font-bold text-lg text-white tracking-wide hidden md:block group-hover:text-blue-400 transition-colors">
            Scoop<span className="text-blue-400 group-hover:text-white transition-colors">Newspaper</span>
          </span>
        </div>
      </div>

      {/* Center: Ticker */}
      <div className="flex-1 mx-4 md:mx-8 overflow-hidden relative h-8 flex items-center bg-white/5 rounded-full border border-white/5">
        <div className="absolute left-0 top-0 bottom-0 bg-blue-600 px-2 flex items-center text-[10px] font-bold text-white uppercase tracking-wider z-10 shadow-lg">
          {t.breaking}
        </div>
        <div className="whitespace-nowrap animate-[marquee_30s_linear_infinite] text-xs text-gray-300 flex items-center gap-8 pl-20 hover:pause" dir="ltr">
          {articles.length > 0 ? (
            // Repeat articles twice to ensure smooth infinite scroll visual
            [...articles, ...articles].map((article, i) => (
              <React.Fragment key={i}>
                <span className="font-medium">
                   {i % 2 === 0 ? '🚀' : '⚡'} {article.headline}
                </span>
                <span className="opacity-30">•</span>
              </React.Fragment>
            ))
          ) : (
             <span>Fetching latest global updates...</span>
          )}
        </div>
      </div>

      {/* Right: Meta Info & Toggle */}
      <div className="flex items-center gap-4 text-gray-400 text-xs font-mono">
        <div className="hidden md:flex items-center gap-2">
          {weather.loading ? (
             <span className="animate-pulse">...</span>
          ) : (
            <>
             <CloudSun size={14} className="text-yellow-500" />
             <span>{weather.temp}°C {weather.city}</span>
            </>
          )}
        </div>
        
        <button 
          onClick={onToggleSidebar}
          className={`p-2 rounded-lg transition-all duration-300 ${isSidebarOpen ? 'text-blue-400 bg-blue-500/10' : 'text-gray-400 hover:text-white hover:bg-white/10'}`}
          title={isSidebarOpen ? "Hide Sidebar" : "Show Sponsored"}
        >
            <PanelRight size={18} />
        </button>
      </div>
      
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); } /* Move -50% because we doubled the content */
        }
        .hover\\:pause:hover {
          animation-play-state: paused;
        }
      `}</style>
    </header>
  );
};
