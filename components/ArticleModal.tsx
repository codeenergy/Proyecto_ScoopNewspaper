
import React from 'react';
import { X, Clock, MapPin, User, Share2, Bookmark, ChevronLeft } from 'lucide-react';
import { motion } from 'framer-motion';
import { Article } from '../types';

interface ArticleModalProps {
  article: Article;
  onClose: () => void;
  onShare: () => void;
}

export const ArticleModal: React.FC<ArticleModalProps> = ({ article, onClose, onShare }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[50] flex justify-center bg-black/90 backdrop-blur-sm overflow-y-auto custom-scrollbar"
      onClick={onClose}
    >
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        // Explicitly forcing white background and black text via style to override any global dark mode issues
        className="relative w-full max-w-4xl min-h-screen shadow-2xl cursor-auto flex flex-col"
        style={{ backgroundColor: '#f4f1ea', color: '#1a1a1a' }} 
        onClick={(e) => e.stopPropagation()}
      >
        {/* Sticky Navigation Bar */}
        <div 
            className="sticky top-0 z-30 flex justify-between items-center px-4 md:px-8 py-4 border-b border-[#dcd6c8] shadow-sm transition-all"
            style={{ backgroundColor: 'rgba(244, 241, 234, 0.95)', backdropFilter: 'blur(10px)' }}
        >
            <button 
                onClick={onClose} 
                className="flex items-center gap-2 text-black hover:text-blue-600 transition-colors font-sans font-bold text-xs tracking-widest uppercase group"
            >
                <div className="p-2 bg-black/5 group-hover:bg-blue-600/10 rounded-full transition-colors">
                   <ChevronLeft size={16} className="text-black group-hover:text-blue-600" />
                </div>
                <span className="hidden md:inline">Back to Feed</span>
            </button>
            
            <div className="flex gap-3">
                <button onClick={onShare} className="p-2 hover:bg-black/5 rounded-full text-black transition-colors" title="Share">
                    <Share2 size={18} />
                </button>
                <button className="p-2 hover:bg-black/5 rounded-full text-black transition-colors" title="Save">
                    <Bookmark size={18} />
                </button>
            </div>
        </div>

        {/* Article Content Container */}
        <div className="flex-1 flex flex-col">
            
            {/* Header Section */}
            <div className="px-6 md:px-12 lg:px-20 pt-10 pb-6 text-center">
                 <div className="flex justify-center items-center gap-2 mb-6">
                    <span className="px-3 py-1 bg-blue-100 text-blue-900 text-[10px] font-bold uppercase tracking-widest rounded-full border border-blue-200">
                        {article.category}
                    </span>
                    <span className="text-gray-400 text-[10px] font-bold uppercase tracking-widest">•</span>
                     <span className="text-gray-500 text-[10px] font-bold uppercase tracking-widest">
                        {article.date}
                    </span>
                 </div>

                 <h1 className="font-serif text-3xl md:text-5xl lg:text-6xl font-black text-black leading-tight mb-6 tracking-tight">
                    {article.headline}
                 </h1>

                 <p className="font-serif text-lg md:text-2xl text-gray-700 italic max-w-2xl mx-auto leading-relaxed">
                    {article.subheadline}
                 </p>
            </div>

            {/* Hero Image */}
            <div className="w-full aspect-[16/9] md:aspect-[21/9] overflow-hidden mb-10 relative group">
                <img 
                    src={article.imageUrl} 
                    alt={article.headline} 
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-[2s]" 
                />
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent text-white text-xs text-right font-sans opacity-0 group-hover:opacity-100 transition-opacity">
                    Image via Gemini Source
                </div>
            </div>

            {/* Metadata Bar */}
            <div className="flex justify-center border-b border-[#dcd6c8] pb-8 mb-10 mx-6 md:mx-20">
                <div className="flex flex-wrap justify-center gap-6 md:gap-12">
                     <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-[#e8e4da] flex items-center justify-center text-gray-700">
                             <User size={18} />
                        </div>
                        <div className="flex flex-col text-left">
                            <span className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Written By</span>
                            <span className="text-sm font-serif font-bold text-black">{article.author}</span>
                        </div>
                     </div>

                     <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-[#e8e4da] flex items-center justify-center text-gray-700">
                             <MapPin size={18} />
                        </div>
                        <div className="flex flex-col text-left">
                            <span className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Location</span>
                            <span className="text-sm font-serif font-bold text-black">{article.location}</span>
                        </div>
                     </div>

                     <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-[#e8e4da] flex items-center justify-center text-gray-700">
                             <Clock size={18} />
                        </div>
                        <div className="flex flex-col text-left">
                            <span className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Read Time</span>
                            <span className="text-sm font-serif font-bold text-black">4 Min Read</span>
                        </div>
                     </div>
                </div>
            </div>

            {/* Main Text Body */}
            <div className="px-6 md:px-0 w-full max-w-[680px] mx-auto font-serif text-lg md:text-[1.15rem] text-gray-900 leading-[1.8] space-y-8 pb-20 article-scroll">
                 <div>
                     <span className="float-left text-7xl font-black mr-3 mt-[-18px] font-serif text-black leading-[0.8]">
                        {article.content.charAt(0)}
                     </span>
                     <p>
                        {article.content.substring(1)}
                     </p>
                 </div>
                 
                 {/* Filler content to make it look like a real article */}
                 <p>
                    The implications of this event are far-reaching. Experts suggest that this could mark a turning point in how we approach this specific sector. "It's unprecedented," says Dr. Emily Carter, a leading analyst in the field.
                 </p>
                 
                 <blockquote className="border-l-4 border-blue-600 pl-6 py-4 my-10 text-2xl font-bold italic text-black bg-white/50 rounded-r-lg shadow-sm">
                    "We haven't seen shifts of this magnitude in decades. The landscape is changing faster than we can adapt."
                 </blockquote>

                 <p>
                    As the situation develops, stakeholders are advised to remain vigilant. Market indicators point towards a volatile period ahead, but with volatility comes opportunity. The question now is not if change will happen, but how quickly we can adapt to it.
                 </p>

                 <h3 className="text-2xl font-bold text-black mt-10 pt-6 border-t border-[#dcd6c8]">Looking Ahead</h3>
                 
                 <p>
                    Moving forward, the focus will likely shift towards sustainability and long-term viability. Initial reports are promising, but the real test will be in the implementation phase.
                 </p>
                 
                 <div className="my-10 p-8 bg-[#e8e4da] rounded-xl border border-[#dcd6c8]">
                    <h4 className="font-sans font-bold text-sm uppercase tracking-widest mb-4 text-gray-600 border-b border-gray-400 pb-2 inline-block">Key Takeaways</h4>
                    <ul className="list-disc list-inside space-y-3 text-base md:text-lg text-gray-900 marker:text-blue-600">
                        <li>Major breakthrough in the industry sector affecting global markets.</li>
                        <li>Analysts predict a 20% increase in adoption by next quarter.</li>
                        <li>Long-term sustainability remains the primary goal for all stakeholders.</li>
                    </ul>
                 </div>

                 <p>
                    We will continue to monitor this story and provide updates as they become available. For now, the world watches and waits.
                 </p>

                 <div className="mt-16 pt-10 border-t border-[#dcd6c8] flex flex-col items-center">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="h-px w-12 bg-gray-300"></div>
                        <div className="text-2xl">📰</div>
                        <div className="h-px w-12 bg-gray-300"></div>
                    </div>
                    <p className="text-[10px] font-sans text-gray-500 uppercase tracking-[0.2em]">
                        ScoopNewspaper Original
                    </p>
                 </div>
            </div>

        </div>
      </motion.div>
    </motion.div>
  );
};
