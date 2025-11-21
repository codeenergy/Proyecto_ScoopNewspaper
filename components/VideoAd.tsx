import React from 'react';
import { X, ExternalLink } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface VideoAdProps {
  onClose: () => void;
}

export const VideoAd: React.FC<VideoAdProps> = ({ onClose }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 20, scale: 0.9 }}
      className="absolute bottom-4 right-4 z-50 w-80 md:w-96 h-auto rounded-2xl overflow-hidden shadow-2xl border border-white/20"
      style={{
        background: 'rgba(20, 20, 30, 0.6)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
      }}
    >
      {/* Header */}
      <div className="flex justify-between items-center p-3 border-b border-white/10 bg-white/5">
        <span className="text-xs font-bold text-blue-300 uppercase tracking-wider flex items-center gap-1">
          <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></span>
          Sponsored
        </span>
        <button 
          onClick={onClose}
          className="text-white/50 hover:text-white hover:bg-white/10 rounded-full p-1 transition-colors"
        >
          <X size={16} />
        </button>
      </div>

      {/* Content */}
      <div className="relative h-48 bg-black group cursor-pointer overflow-hidden">
         {/* Fake Video Background */}
         <div className="absolute inset-0 bg-gradient-to-tr from-purple-900 to-blue-900 opacity-80" />
         <img 
            src="https://picsum.photos/seed/futurecar/600/400" 
            alt="Ad Content" 
            className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-700"
         />
         
         {/* Overlay UI */}
         <div className="absolute inset-0 flex flex-col justify-center items-center text-center p-4">
            <h3 className="text-xl font-bold text-white mb-1 drop-shadow-lg">AeroBlade X1</h3>
            <p className="text-xs text-gray-200 mb-4 max-w-[80%] leading-tight">The future of electric mobility is here. Experience zero gravity.</p>
            
            <button className="bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold py-2 px-4 rounded-full flex items-center gap-2 shadow-lg transition-all hover:shadow-blue-500/50">
              Pre-order Now <ExternalLink size={12} />
            </button>
         </div>

         {/* Progress Bar */}
         <div className="absolute bottom-0 left-0 h-1 bg-blue-500/30 w-full">
            <motion.div 
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 10, ease: "linear" }}
              className="h-full bg-blue-400"
            />
         </div>
      </div>
    </motion.div>
  );
};