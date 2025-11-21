import React, { useState } from 'react';
import { X, Play, ShoppingCart } from 'lucide-react';
import { motion } from 'framer-motion';

interface VideoModalProps {
  onClose: () => void;
  product: {
      name: string;
      desc: string;
      img: string;
      price: string;
      url: string;
  };
}

export const VideoModal: React.FC<VideoModalProps> = ({ onClose, product }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-md p-4"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-4xl bg-[#111] rounded-2xl overflow-hidden shadow-2xl border border-white/20 flex flex-col md:flex-row"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 bg-black/50 hover:bg-white/20 rounded-full text-white transition-colors backdrop-blur-sm"
        >
          <X size={24} />
        </button>

        {/* Visual Side */}
        <div className="w-full md:w-2/3 relative bg-black aspect-video md:aspect-auto group">
             {isPlaying ? (
                 <iframe 
                    width="100%" 
                    height="100%" 
                    src="https://www.youtube.com/embed/LXb3EKWsInQ?autoplay=1&controls=0&rel=0" 
                    title="Product Video" 
                    frameBorder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowFullScreen
                    className="absolute inset-0 w-full h-full"
                 ></iframe>
             ) : (
                <>
                    <img src={product.img} alt={product.name} className="w-full h-full object-cover opacity-80" />
                    
                    {/* Play Overlay */}
                    <div 
                        className="absolute inset-0 flex items-center justify-center cursor-pointer"
                        onClick={() => setIsPlaying(true)}
                    >
                        <div className="w-20 h-20 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/30 animate-pulse group-hover:scale-110 transition-transform">
                            <Play size={40} className="text-white fill-white ml-1" />
                        </div>
                    </div>

                    <div className="absolute bottom-0 left-0 w-full h-1 bg-gray-800">
                        <div className="h-full bg-blue-500 w-1/3"></div>
                    </div>
                </>
             )}
        </div>

        {/* Details Side */}
        <div className="w-full md:w-1/3 p-6 flex flex-col justify-center bg-[#1a1a1a]">
            <div className="mb-2">
                <span className="text-blue-400 text-xs font-bold uppercase tracking-widest">Featured Product</span>
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">{product.name}</h2>
            <div className="text-3xl font-light text-white mb-4">{product.price}</div>
            <p className="text-gray-400 text-sm mb-8 leading-relaxed">{product.desc}</p>
            
            <a 
                href={product.url} 
                target="_blank"
                className="w-full bg-blue-600 hover:bg-blue-500 text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-all shadow-lg shadow-blue-900/20"
            >
                <ShoppingCart size={18} />
                Buy Now
            </a>
            
            <div className="mt-6 pt-6 border-t border-white/10 flex justify-between text-xs text-gray-500">
                <span>Secure Checkout</span>
                <span>30-Day Returns</span>
            </div>
        </div>

      </div>
    </motion.div>
  );
};