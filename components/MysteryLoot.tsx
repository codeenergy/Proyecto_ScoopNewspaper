
import React, { useState } from 'react';
import { Box, Lock, Unlock, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const MysteryLoot: React.FC = () => {
  const [lootState, setLootState] = useState<'locked' | 'decrypting' | 'unlocked'>('locked');
  const [discountCode, setDiscountCode] = useState('');

  const handleLootClick = () => {
    if (lootState === 'locked') {
        setLootState('decrypting');
        // Simulate decryption
        setTimeout(() => {
            const codes = ['CYBER-2077', 'NEON-50', 'FUTURE-X', 'ZENITH-FREE'];
            setDiscountCode(codes[Math.floor(Math.random() * codes.length)]);
            setLootState('unlocked');
        }, 2000);
    } else if (lootState === 'unlocked') {
        // Reset on click again
        setLootState('locked');
    }
  };

  return (
    <motion.div 
        onClick={handleLootClick}
        className="mt-2 relative w-full h-16 rounded-xl overflow-hidden cursor-pointer border border-purple-500/30 shadow-lg shadow-purple-900/20 group"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
    >
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#1a1a2e] via-[#16213e] to-[#1a1a2e] animate-pulse"></div>
        <div className="absolute inset-0 opacity-30 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
        
        {/* Content Layer */}
        <div className="absolute inset-0 flex items-center justify-center">
            <AnimatePresence mode="wait">
                {lootState === 'locked' && (
                    <motion.div 
                        key="locked"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="flex items-center gap-3"
                    >
                        <Box className="text-purple-400 animate-bounce" size={20} />
                        <div className="flex flex-col">
                            <span className="text-xs font-bold text-white tracking-wider uppercase">Mystery Loot</span>
                            <span className="text-[9px] text-purple-300">Tap to decrypt reward</span>
                        </div>
                        <Lock size={14} className="text-gray-500 ml-2" />
                    </motion.div>
                )}

                {lootState === 'decrypting' && (
                    <motion.div 
                        key="decrypting"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex items-center gap-2 text-green-400 font-mono text-xs"
                    >
                        <Zap size={16} className="animate-spin" />
                        <span>DECRYPTING...</span>
                    </motion.div>
                )}

                {lootState === 'unlocked' && (
                    <motion.div 
                        key="unlocked"
                        initial={{ opacity: 0, scale: 1.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="flex flex-col items-center"
                    >
                        <span className="text-[9px] text-gray-400 uppercase tracking-widest">Code Decrypted</span>
                        <div className="flex items-center gap-2 bg-white/10 px-3 py-1 rounded-lg border border-white/20 mt-1">
                            <span className="text-lg font-mono font-bold text-white tracking-widest shadow-glow">{discountCode}</span>
                            <Unlock size={12} className="text-green-400" />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>

        {/* Glitch Effect Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-purple-500/10 to-transparent pointer-events-none"></div>
    </motion.div>
  );
};
