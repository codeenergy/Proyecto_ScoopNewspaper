
import React, { useState } from 'react';
import { ExternalLink, ShoppingBag, Star, Play, ArrowRight } from 'lucide-react';
import { Language } from '../types';
import { TRANSLATIONS } from '../constants';
import { VideoModal } from './VideoModal';
import { MysteryLoot } from './MysteryLoot';
import { AnimatePresence, motion } from 'framer-motion';

interface PartnerSidebarProps {
    language: Language;
    isOpen: boolean;
}

export const PartnerSidebar: React.FC<PartnerSidebarProps> = ({ language, isOpen }) => {
  const t = TRANSLATIONS[language];
  const [showVideo, setShowVideo] = useState(false);

  const products = [
    { id: 1, name: "Zenith Watch X1", price: "$299", img: "https://picsum.photos/seed/watch/600/400", url: "#", desc: "Time reimagined. The Zenith X1 features a holographic display and 50-year battery life." },
    { id: 2, name: "Neo-Sneakers", price: "$149", img: "https://picsum.photos/seed/shoe/600/400", url: "#", desc: "Self-lacing, gravity-defying comfort for the urban explorer." },
    { id: 3, name: "Holo-Glasses", price: "$399", img: "https://picsum.photos/seed/glasses/600/400", url: "#", desc: "Augmented reality overlay for your daily life. Never get lost again." },
    { id: 4, name: "Quantum Chip", price: "$999", img: "https://picsum.photos/seed/chip/600/400", url: "#", desc: "Upgrade your personal computer to quantum speeds. Processing power unlimited." },
    { id: 5, name: "SpaceX Ticket", price: "$50k", img: "https://picsum.photos/seed/rocket/600/400", url: "#", desc: "One way ticket to Mars Colony Alpha. The adventure of a lifetime." },
  ];

  const [activeProduct, setActiveProduct] = useState(products[0]);

  return (
    <>
      {/* Desktop: Animate Width. Mobile: Fixed Overlay */}
      <AnimatePresence mode="wait">
        {isOpen && (
          <motion.aside 
            initial={{ width: 0, opacity: 0, x: 20 }}
            animate={{ 
                width: window.innerWidth < 1024 ? "100%" : 320, 
                opacity: 1, 
                x: 0 
            }}
            exit={{ width: 0, opacity: 0, x: 50 }}
            transition={{ type: "spring", bounce: 0, duration: 0.4 }}
            className="fixed lg:relative right-0 top-14 lg:top-0 bottom-0 z-40 h-[calc(100vh-3.5rem)] lg:h-full bg-[#0d0d0d]/90 backdrop-blur-xl border-l border-white/10 overflow-hidden shrink-0 flex flex-col"
          >
            {/* Inner container for width stability during animation */}
            <div className="w-full h-full flex flex-col min-w-[320px]">
                
                {/* Section 1: Interactive Product/Video Preview */}
                <div className="p-5 border-b border-white/5 shrink-0 bg-white/5">
                    <div className="flex justify-between items-center mb-3">
                        <span className="text-[10px] text-blue-400 font-black uppercase tracking-[0.2em]">{t.sponsored}</span>
                        <a 
                            href={activeProduct.url} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="text-gray-400 hover:text-white transition-colors"
                            title="Buy Now"
                        >
                            <ExternalLink size={14} />
                        </a>
                    </div>
                    
                    <div 
                        onClick={() => setShowVideo(true)}
                        className="relative w-full aspect-video rounded-xl overflow-hidden group cursor-pointer border border-white/10 hover:border-blue-500/50 transition-all shadow-lg hover:shadow-blue-900/20"
                    >
                        <motion.img 
                            key={activeProduct.id}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 0.7 }}
                            src={activeProduct.img} 
                            alt="Ad" 
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                        />
                        
                        {/* Play Overlay */}
                        <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/40 transition-colors">
                            <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/30 group-hover:scale-110 transition-transform">
                                <Play size={20} className="text-white fill-white ml-1" />
                            </div>
                        </div>
                        
                        <div className="absolute bottom-0 left-0 w-full p-3 bg-gradient-to-t from-black via-black/80 to-transparent">
                            <p className="text-white text-sm font-bold leading-tight">{activeProduct.name}</p>
                            <p className="text-gray-400 text-[10px] truncate">{activeProduct.desc}</p>
                        </div>
                    </div>
                </div>

                {/* Section 2: Partner Products (Scrollable List) */}
                <div className="flex-1 p-5 overflow-hidden flex flex-col min-h-0">
                    <div className="flex items-center justify-between mb-4 text-gray-300 border-b border-white/5 pb-2 shrink-0">
                        <div className="flex items-center gap-2">
                            <ShoppingBag size={14} className="text-purple-400" />
                            <h3 className="text-xs font-bold uppercase tracking-wider">{t.partner}</h3>
                        </div>
                        <span className="text-[10px] text-gray-500">Select to View</span>
                    </div>

                    {/* Scrollable Container */}
                    <div className="flex-1 overflow-y-auto custom-scrollbar pr-1 space-y-3">
                        {products.map((product) => (
                        <div 
                            key={product.id} 
                            onClick={() => setActiveProduct(product)}
                            className={`block group border rounded-xl p-3 transition-all relative overflow-hidden cursor-pointer ${activeProduct.id === product.id ? 'bg-white/10 border-blue-500/50 ring-1 ring-blue-500/20' : 'bg-white/5 border-white/5 hover:border-white/20'}`}
                        >
                            <div className="flex gap-3">
                                <img src={product.img} alt={product.name} className="w-14 h-14 rounded-lg object-cover bg-gray-800" />
                                <div className="flex flex-col justify-center flex-1">
                                    <h4 className={`text-sm font-medium leading-tight transition-colors ${activeProduct.id === product.id ? 'text-white' : 'text-gray-300'}`}>{product.name}</h4>
                                    <div className="flex text-yellow-500 my-1">
                                        {[...Array(5)].map((_, i) => <Star key={i} size={8} fill="currentColor" />)}
                                    </div>
                                    <div className="flex justify-between items-center mt-1">
                                        <span className="text-blue-400 font-bold text-xs">{product.price}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        ))}
                         
                         {/* Mystery Loot Crate Component */}
                         <MysteryLoot />
                    </div>
                </div>

                {/* Section 3: Newsletter */}
                <div className="p-5 border-t border-white/10 bg-gradient-to-b from-blue-900/10 to-blue-900/20 shrink-0">
                    <h4 className="text-white text-sm font-bold mb-1">{t.subscribe}</h4>
                    <p className="text-gray-400 text-[10px] mb-3">Get the daily scoop delivered to your inbox.</p>
                    <div className="flex gap-2">
                        <input type="email" placeholder="Email address" className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500 transition-colors placeholder-gray-600" />
                        <button className="bg-blue-600 text-white text-xs px-3 py-1 rounded-lg hover:bg-blue-500 font-bold transition-colors">
                            <ArrowRight size={14} />
                        </button>
                    </div>
                </div>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>
      
      <AnimatePresence>
        {showVideo && (
            <VideoModal 
                onClose={() => setShowVideo(false)} 
                product={activeProduct}
            />
        )}
      </AnimatePresence>
    </>
  );
};
