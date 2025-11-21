
import React, { useState, useEffect } from 'react';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { Article, Language } from '../types';
import { RefreshCw, ChevronLeft, ChevronRight } from 'lucide-react';
import { TRANSLATIONS } from '../constants';

interface Newspaper3DProps {
  articles: Article[];
  category: string;
  isLoading: boolean;
  onRefresh: () => void;
  language: Language;
}

const formatDate = (dateStr: string, lang: Language) => {
  const date = new Date(dateStr);
  return date.toLocaleDateString(lang, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
};

export const Newspaper3D: React.FC<Newspaper3DProps> = ({ articles, category, isLoading, onRefresh, language }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const t = TRANSLATIONS[language];
  const isRTL = language === 'ar';

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const rotateX = useTransform(y, [-100, 100], [10, -10]);
  const rotateY = useTransform(x, [-100, 100], isRTL ? [10, -10] : [-10, 10]);
  
  const springConfig = { damping: 20, stiffness: 100 };
  const springRotateX = useSpring(rotateX, springConfig);
  const springRotateY = useSpring(rotateY, springConfig);

  const handleDragEnd = () => {
    setIsDragging(false);
    x.set(0);
    y.set(0);
  };

  const pagesPerView = isMobile ? 1 : 2;
  const totalPages = Math.ceil(articles.length / pagesPerView) * pagesPerView;

  const nextPage = () => {
    if (currentPage < totalPages - (pagesPerView === 1 ? 0 : 1)) {
      setCurrentPage(prev => prev + pagesPerView);
    }
  };

  const prevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(prev => prev - pagesPerView);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') isRTL ? prevPage() : nextPage();
      if (e.key === 'ArrowLeft') isRTL ? nextPage() : prevPage();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentPage, totalPages, isRTL]);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-white/70">
        <RefreshCw className="w-12 h-12 animate-spin mb-4 text-blue-400" />
        <p className="text-lg font-serif animate-pulse tracking-widest uppercase text-xs">{t.loading}</p>
      </div>
    );
  }

  return (
    <div className="relative w-full h-full flex items-center justify-center perspective-container p-4 overflow-hidden" dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Interaction Layer */}
      <motion.div
        className="absolute inset-0 z-0 cursor-grab active:cursor-grabbing"
        drag
        dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
        dragElastic={0.2}
        onDragStart={() => setIsDragging(true)}
        onDragEnd={handleDragEnd}
        style={{ x, y }}
      />

      {/* 3D Wrapper */}
      <motion.div
        className={`relative w-full ${isMobile ? 'max-w-md aspect-[0.7/1]' : 'max-w-6xl aspect-[1.6/1]'}`}
        style={{
          rotateX: springRotateX,
          rotateY: springRotateY,
          transformStyle: "preserve-3d",
          perspective: "1500px",
        }}
      >
        {/* Book Thickness / Spine Effects */}
        <div className="relative w-full h-full" style={{ transformStyle: "preserve-3d" }}>
          
          {/* Back Cover (Thickness Simulation) */}
          <div 
            className="absolute inset-0 bg-[#d4c5a9] rounded-sm shadow-2xl"
            style={{ 
              transform: 'translateZ(-10px) scale(0.995)', 
              boxShadow: '0 20px 40px rgba(0,0,0,0.5)' 
            }} 
          />

           {/* Additional Pages Stack Effect */}
           <div className="absolute inset-0 bg-white rounded-sm border border-gray-300" style={{ transform: 'translateZ(-2px) translateY(2px)' }}></div>
           <div className="absolute inset-0 bg-white rounded-sm border border-gray-300" style={{ transform: 'translateZ(-4px) translateY(4px)' }}></div>
           <div className="absolute inset-0 bg-white rounded-sm border border-gray-300" style={{ transform: 'translateZ(-6px) translateY(6px)' }}></div>
          
          {/* Main Content Layer */}
          {isMobile ? (
             <div 
                className="absolute inset-0 w-full h-full bg-paper overflow-hidden shadow-[0_0_15px_rgba(0,0,0,0.3)] rounded-sm border-t border-b border-r border-gray-300" 
                style={{ 
                    transformStyle: "preserve-3d",
                    // Mobile Spine
                    borderLeft: isRTL ? 'none' : '12px solid #2c2c2c',
                    borderRight: isRTL ? '12px solid #2c2c2c' : 'none',
                }}
             >
                <PageContent 
                    article={articles[currentPage]} 
                    pageNumber={currentPage + 1} 
                    isLeft={true}
                    category={category}
                    onRefresh={onRefresh}
                    language={language}
                    isMobile={true}
                />
                <div className="absolute inset-y-0 left-0 w-4 bg-gradient-to-r from-black/40 to-transparent pointer-events-none mix-blend-multiply" />
             </div>
          ) : (
            <div className="absolute inset-0 flex w-full h-full rounded-sm overflow-hidden shadow-xl" style={{ transformStyle: "preserve-3d" }}>
              {/* Left Page */}
              <div 
                className={`relative w-1/2 h-full bg-paper z-10 ${isRTL ? 'border-l' : 'border-r'} border-gray-300/30 origin-${isRTL ? 'left' : 'right'}`}
                style={{
                    // Spine Effect on Left Page
                    borderLeft: isRTL ? 'none' : '16px solid #1a1a1a',
                    borderRight: isRTL ? '16px solid #1a1a1a' : '1px solid #e5e7eb'
                }}
              >
                <PageContent 
                    article={articles[currentPage]} 
                    pageNumber={currentPage + 1} 
                    isLeft={true}
                    category={category}
                    onRefresh={onRefresh}
                    language={language}
                />
                {/* Shadow Gradient near spine */}
                <div className={`absolute ${isRTL ? 'left-0' : 'right-0'} top-0 bottom-0 w-12 bg-gradient-to-${isRTL ? 'r' : 'l'} from-black/10 to-transparent pointer-events-none mix-blend-multiply`} />
                {/* Spine gradient inner */}
                <div className={`absolute ${isRTL ? 'right-0' : 'left-0'} top-0 bottom-0 w-4 bg-gradient-to-${isRTL ? 'l' : 'r'} from-black/20 to-transparent pointer-events-none`} />
              </div>

              {/* Right Page */}
              <div className="relative w-1/2 h-full bg-[#fdfbf7] border-r border-t border-b border-gray-200" style={{ perspective: '2000px' }}>
                  <FlippingSheet 
                    frontContent={
                      <PageContent 
                        article={articles[currentPage + 1]} 
                        pageNumber={currentPage + 2} 
                        isLeft={false}
                        category={category}
                        language={language}
                      />
                    }
                    isRTL={isRTL}
                    triggerFlip={currentPage}
                  />
              </div>
            </div>
          )}
        </div>
      </motion.div>
      
      {/* Navigation Controls - Lowered and styled */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-50 flex gap-6 items-center bg-black/60 backdrop-blur-xl px-6 py-3 rounded-full border border-white/10 shadow-2xl">
        <button 
          onClick={isRTL ? nextPage : prevPage} 
          disabled={currentPage === 0}
          className="text-white disabled:opacity-30 hover:text-blue-400 transition-colors"
        >
          {isRTL ? <ChevronRight size={28} /> : <ChevronLeft size={28} />}
        </button>
        
        <span className="text-white font-mono text-xs tracking-widest min-w-[100px] text-center">
           {t.page} {currentPage + 1} {isMobile ? '' : `- ${currentPage + 2}`} / {totalPages}
        </span>
        
        <button 
          onClick={isRTL ? prevPage : nextPage}
          disabled={currentPage >= articles.length - pagesPerView}
          className="text-white disabled:opacity-30 hover:text-blue-400 transition-colors"
        >
          {isRTL ? <ChevronLeft size={28} /> : <ChevronRight size={28} />}
        </button>
      </div>
    </div>
  );
};

const PageContent = ({ article, pageNumber, isLeft, category, onRefresh, language, isMobile }: { article?: Article, pageNumber: number, isLeft: boolean, category?: string, onRefresh?: () => void, language: Language, isMobile?: boolean }) => {
  
  const t = TRANSLATIONS[language];
  const isRTL = language === 'ar';

  if (!article) {
      return (
        <div className="w-full h-full bg-[#fdfbf7] p-8 flex flex-col items-center justify-center border-l border-gray-200">
            <h2 className="font-serif text-3xl text-gray-400 mb-4 italic">{t.endEdition}</h2>
            <p className="text-gray-500 font-sans text-sm">{t.checkBack}</p>
        </div>
      )
  }

  const isFrontPage = pageNumber === 1;

  return (
    <div className={`w-full h-full bg-[#fdfbf7] text-[#1a1a1a] p-6 md:p-10 lg:p-12 flex flex-col overflow-hidden ${isMobile ? 'text-center' : (isLeft ? (isRTL ? 'text-right items-start' : 'text-right items-end') : (isRTL ? 'text-left items-end' : 'text-left items-start'))}`}>
      
      {isFrontPage && (
        <div className="w-full border-b-4 border-black mb-6 pb-4 text-center shrink-0">
            <div className="flex justify-between items-center border-b border-gray-400 pb-1 mb-2">
                 <span className="text-[9px] md:text-[10px] font-sans font-bold tracking-widest text-gray-500 uppercase">{formatDate(new Date().toISOString(), language)}</span>
                 <span className="text-[9px] md:text-[10px] font-sans font-bold tracking-widest text-gray-500 uppercase flex items-center gap-1 cursor-pointer hover:text-blue-600 transition-colors" onClick={onRefresh}>
                    <RefreshCw size={10} /> {category || 'Global'} Edition
                 </span>
            </div>
            <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter uppercase scale-y-90 leading-[0.8]">The Scoop</h1>
        </div>
      )}

      {!isFrontPage && (
         <div className="w-full border-b border-gray-300 mb-6 pb-2 flex justify-between items-end shrink-0">
            <span className="font-sans text-[10px] text-gray-400 uppercase tracking-widest">{article.category}</span>
            <span className="font-serif text-xl font-bold text-gray-300">{pageNumber}</span>
         </div>
      )}

      {/* ADDED PADDING BOTTOM TO PREVENT TEXT FROM BEING HIDDEN BY CONTROLS */}
      <div className="flex-1 w-full flex flex-col article-scroll overflow-y-auto px-1 pb-24">
        
        <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ delay: 0.2 }}
            className="mb-6"
        >
            <h2 className={`font-serif font-bold leading-[0.95] mb-4 text-ink ${isFrontPage ? 'text-3xl md:text-5xl' : 'text-2xl md:text-4xl'}`}>
                {article.headline}
            </h2>
            <p className={`font-serif italic text-lg md:text-xl text-gray-600 leading-tight ${isRTL ? 'border-r-4 pr-4 mr-1' : 'border-l-4 pl-4 ml-1'} border-black/80`}>
                {article.subheadline}
            </p>
        </motion.div>

        <motion.div 
            className="w-full mb-6 relative group overflow-hidden"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
        >
            <img 
                src={article.imageUrl} 
                alt="Article" 
                className="w-full h-48 md:h-64 object-cover shadow-sm filter grayscale contrast-125 hover:grayscale-0 transition-all duration-1000"
            />
            <div className={`absolute bottom-0 ${isRTL ? 'right-0' : 'left-0'} bg-white text-black text-[9px] px-2 py-1 font-sans font-bold uppercase tracking-widest`}>
                {article.location}
            </div>
        </motion.div>

        <div className={`w-full gap-6 text-justify font-serif text-base md:text-lg leading-relaxed text-gray-900 ${isFrontPage && !isMobile ? 'columns-1 md:columns-2' : 'columns-1'}`}>
            <p>
                <span className={`font-sans font-bold text-[10px] uppercase ${isRTL ? 'ml-2' : 'mr-2'} text-black tracking-widest mb-2 block border-b border-gray-200 w-fit pb-1`}>
                    By {article.author}
                </span>
                <span className="drop-cap float-left text-5xl font-black mr-2 mt-[-8px] font-serif">{article.content.charAt(0)}</span>
                {article.content.substring(1)}
            </p>
            {isFrontPage && (
                <p className="mt-4 text-gray-500 text-sm italic border-t border-gray-200 pt-2">
                    [{t.continued} {pageNumber + 2}...]
                </p>
            )}
        </div>
      </div>
    </div>
  );
};

const FlippingSheet = ({ frontContent, isRTL, triggerFlip }: { frontContent: React.ReactNode, isRTL: boolean, triggerFlip: number }) => {
    return (
        <motion.div
            key={triggerFlip}
            initial={{ rotateY: isRTL ? 5 : -5, opacity: 0 }}
            animate={{ rotateY: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }} // Smooth spring-like easing
            className={`w-full h-full bg-[#fdfbf7] shadow-xl ${isRTL ? 'origin-right border-r' : 'origin-left border-l'} border-gray-300/50`}
            style={{ transformStyle: 'preserve-3d' }}
        >
             <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/paper-fibers.png')] opacity-40 pointer-events-none z-20 mix-blend-multiply" />
             {frontContent}
        </motion.div>
    );
}
