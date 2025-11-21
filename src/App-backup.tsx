
import React, { useState, useEffect, useCallback } from 'react';
import { Newspaper3D } from './components/Newspaper3D';
import { NewsFeed } from './components/NewsFeed';
import { Controls } from './components/Controls';
import { VideoAd } from './components/VideoAd';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { PartnerSidebar } from './components/PartnerSidebar';
import { fetchNews } from './services/geminiService';
import { FilterState, NewsState } from './types';
import { REFRESH_INTERVAL_MS } from './constants';
//import { AnimatePresence } from 'framer-motion';

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

  const [showAd, setShowAd] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // Close sidebar by default on mobile
  useEffect(() => {
    if (window.innerWidth < 1024) {
      setIsSidebarOpen(false);
    }
  }, []);

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

  // Show Ad after a delay
  useEffect(() => {
    const timer = setTimeout(() => setShowAd(true), 30000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex flex-col h-screen bg-[#111] overflow-hidden font-sans" dir={filterState.language === 'ar' ? 'rtl' : 'ltr'}>

      {/* Background Ambiance - Fixed behind everything */}
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-gray-800 via-black to-black opacity-80 z-0 pointer-events-none" />
      <div className="fixed inset-0 opacity-20 pointer-events-none z-0" style={{
          backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px)',
          backgroundSize: '40px 40px'
      }} />

      {/* Top Header */}
      <Header
        language={filterState.language}
        isSidebarOpen={isSidebarOpen}
        onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
        articles={newsState.articles}
        onRefresh={loadNews}
      />

      {/* Main Content Area */}
      <div className="flex flex-1 overflow-hidden relative z-10">

        {/* Left Stage: Content */}
        <main className="flex-1 relative flex flex-col min-w-0">
          <Controls filterState={filterState} setFilterState={setFilterState} />
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

        {/* Right Stage: Partner/Ads Sidebar */}
        <PartnerSidebar language={filterState.language} isOpen={isSidebarOpen} />

      </div>

      {/* Bottom Footer */}
      <Footer language={filterState.language} />

      {/* Floating Video Ad Overlay (Still kept for high impact ads) */}
   {/* <AnimatePresence>
        {showAd && <VideoAd onClose={() => setShowAd(false)} />}
     </AnimatePresence>*/}

    </div>
  );
};

export default App;
