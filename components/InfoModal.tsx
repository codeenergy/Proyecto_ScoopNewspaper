
import React from 'react';
import { X } from 'lucide-react';
import { motion } from 'framer-motion';

interface InfoModalProps {
  title: string;
  content: React.ReactNode;
  onClose: () => void;
}

export const InfoModal: React.FC<InfoModalProps> = ({ title, content, onClose }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="relative w-full max-w-lg max-h-[80vh] overflow-y-auto bg-[#1a1a1a] rounded-2xl border border-white/10 shadow-2xl custom-scrollbar flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 flex justify-between items-center p-4 border-b border-white/10 bg-[#1a1a1a]/95 backdrop-blur-md z-10">
          <h2 className="text-xl font-serif font-bold text-white tracking-wide">{title}</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/10 rounded-full text-gray-400 hover:text-white transition-colors"
          >
            <X size={20} />
          </button>
        </div>
        <div className="p-6 text-gray-300 leading-relaxed font-sans text-sm space-y-4">
          {content}
        </div>
        <div className="p-4 border-t border-white/10 bg-[#1a1a1a] sticky bottom-0 z-10 text-center">
            <button onClick={onClose} className="text-xs font-bold uppercase tracking-widest text-blue-400 hover:text-blue-300 transition-colors">
                Close
            </button>
        </div>
      </motion.div>
    </motion.div>
  );
};
