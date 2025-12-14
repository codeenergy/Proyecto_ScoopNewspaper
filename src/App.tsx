import React, { useState, useEffect, useCallback } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Controls } from './components/Controls';
import { Newspaper3D } from './components/Newspaper3D';
import { NewsFeed } from './components/NewsFeed';
import { VideoSupporters } from './components/VideoSupporters';
import { AdManager } from './components/AdManager';
import { fetchNews } from './services/geminiService';
import { FilterState, NewsState } from './types';
import { REFRESH_INTERVAL_MS } from './constants';

const App: React.FC = () => {
  const [newsState, setNewsState] = useState<NewsState>({
    articles: [],
    isLoading: true,
    error: null,
    lastUpdated: Date.now()
  });

  const [filterState, setFilterState] = useState<FilterState>({
    category: 'All',
    searchQuery: '',
    viewMode: '3d',
    language: 'en',
    country: 'global'
  });

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showVideoSupporters, setShowVideoSupporters] = useState(false);

  // Fetch Data Logic
  const loadNews = useCallback(async () => {
    setNewsState(prev => ({ ...prev, isLoading: true }));
    try {
      const articles = await fetchNews(
        filterState.category,
        filterState.searchQuery,
        filterState.language,
        filterState.country
      );
      setNewsState({
        articles,
        isLoading: false,
        error: null,
        lastUpdated: Date.now()
      });
    } catch (err) {
      console.error('Error loading news:', err);
      setNewsState(prev => ({
        ...prev,
        isLoading: false,
        error: 'Failed to load news'
      }));
    }
  }, [filterState.category, filterState.searchQuery, filterState.language, filterState.country]);

  // Initial Load & Auto Refresh
  useEffect(() => {
    loadNews();
    const interval = setInterval(loadNews, REFRESH_INTERVAL_MS);
    return () => clearInterval(interval);
  }, [loadNews]);

  return (
    <div className="flex flex-col h-screen bg-[#111] overflow-hidden font-sans">

      {/* Background */}
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-gray-800 via-black to-black opacity-80 z-0 pointer-events-none" />
      <div className="fixed inset-0 opacity-20 pointer-events-none z-0" style={{
        backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px)',
        backgroundSize: '40px 40px'
      }} />

      {/* Header */}
      <Header
        language={filterState.language}
        isSidebarOpen={isSidebarOpen}
        onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
        articles={newsState.articles}
        onRefresh={loadNews}
        onOpenVideoSupporters={() => setShowVideoSupporters(true)}
        onLanguageChange={(lang) => setFilterState(prev => ({ ...prev, language: lang }))}
        filterState={filterState}
        setFilterState={setFilterState}
      />

      {/* Main Content Area */}
      <div className="flex flex-1 overflow-hidden relative z-10">

        {/* Main Content */}
        <main className="flex-1 relative flex flex-col min-w-0">

          {/* Controls - Hidden on mobile (lg:block) */}
          <div className="hidden lg:block">
            <Controls filterState={filterState} setFilterState={setFilterState} />
          </div>

          {/* Content Area */}
          <div className="flex-1 relative overflow-hidden">
            {filterState.viewMode === '3d' ? (
              <Newspaper3D
                articles={newsState.articles}
                isLoading={newsState.isLoading}
                category={filterState.category}
                onRefresh={loadNews}
                language={filterState.language}
              />
            ) : (
              <NewsFeed
                articles={newsState.articles}
                isLoading={newsState.isLoading}
                language={filterState.language}
              />
            )}
          </div>
        </main>

      </div>

      {/* Footer */}
      <Footer language={filterState.language} />

      {/* Monetag Ads Manager - Controlled Integration */}
      <AdManager enabled={true} />

      {/* Video & Supporters Modal */}
      {showVideoSupporters && (
        <VideoSupporters onClose={() => setShowVideoSupporters(false)} />
      )}

    </div>
  );
};

export default App;
