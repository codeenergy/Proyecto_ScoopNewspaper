
import React from 'react';
import { X, Link, Twitter, Facebook, Linkedin, Mail, Send } from 'lucide-react';
import { motion } from 'framer-motion';
import { Article } from '../types';

interface ShareModalProps {
  article: Article;
  onClose: () => void;
}

export const ShareModal: React.FC<ShareModalProps> = ({ article, onClose }) => {
  const shareUrl = window.location.href;
  const shareText = `${article.headline} - Read more on ScoopNewspaper`;

  const handleCopy = () => {
    navigator.clipboard.writeText(`${shareText} ${shareUrl}`);
    // Visual feedback could be added here
  };

  const socialApps = [
    { name: 'Twitter', icon: <Twitter size={20} />, color: 'bg-sky-500', action: () => window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`, '_blank') },
    { name: 'Facebook', icon: <Facebook size={20} />, color: 'bg-blue-600', action: () => window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`, '_blank') },
    { name: 'LinkedIn', icon: <Linkedin size={20} />, color: 'bg-blue-700', action: () => window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`, '_blank') },
    { name: 'WhatsApp', icon: <div className="font-bold text-xs">WA</div>, color: 'bg-green-500', action: () => window.open(`https://wa.me/?text=${encodeURIComponent(shareText + ' ' + shareUrl)}`, '_blank') },
    { name: 'Email', icon: <Mail size={20} />, color: 'bg-gray-600', action: () => window.location.href = `mailto:?subject=${encodeURIComponent(article.headline)}&body=${encodeURIComponent(shareText + ' ' + shareUrl)}` },
    { name: 'Copy Link', icon: <Link size={20} />, color: 'bg-zinc-700', action: handleCopy },
  ];

  const recentContacts = [
    { name: 'Alex M.', img: 'https://picsum.photos/seed/alex/100/100' },
    { name: 'Sarah J.', img: 'https://picsum.photos/seed/sarah/100/100' },
    { name: 'David K.', img: 'https://picsum.photos/seed/david/100/100' },
    { name: 'Mom', img: 'https://picsum.photos/seed/mom/100/100' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[60] flex items-end md:items-center justify-center bg-black/80 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        exit={{ y: "100%" }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        className="w-full max-w-md bg-[#1a1a1a] rounded-t-2xl md:rounded-2xl border border-white/10 shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b border-white/10 bg-[#222]">
          <h3 className="text-white font-bold">Share to...</h3>
          <button onClick={onClose} className="p-1 text-gray-400 hover:text-white rounded-full hover:bg-white/10 transition-colors">
            <X size={20} />
          </button>
        </div>

        <div className="p-6 space-y-6">
          
          {/* Article Preview */}
          <div className="flex gap-3 bg-white/5 p-3 rounded-xl border border-white/5">
            <img src={article.imageUrl} alt="thumb" className="w-16 h-16 rounded-lg object-cover" />
            <div className="flex flex-col justify-center">
                <h4 className="text-white text-sm font-bold line-clamp-2">{article.headline}</h4>
                <span className="text-gray-500 text-xs mt-1">scoopnewspaper.com</span>
            </div>
          </div>

          {/* Quick Send (Mock Contacts) */}
          <div>
            <p className="text-gray-400 text-xs font-bold uppercase tracking-wider mb-3">Quick Send</p>
            <div className="flex gap-4 overflow-x-auto pb-2 no-scrollbar">
                {recentContacts.map((contact, i) => (
                    <div key={i} className="flex flex-col items-center gap-2 min-w-[60px] cursor-pointer group">
                        <div className="relative">
                            <img src={contact.img} alt={contact.name} className="w-12 h-12 rounded-full border-2 border-transparent group-hover:border-blue-500 transition-colors" />
                            <div className="absolute bottom-0 right-0 bg-blue-500 rounded-full p-0.5 border border-[#1a1a1a]">
                                <Send size={8} className="text-white" />
                            </div>
                        </div>
                        <span className="text-gray-300 text-[10px] text-center leading-tight">{contact.name}</span>
                    </div>
                ))}
            </div>
          </div>

          {/* Apps Grid */}
          <div className="grid grid-cols-4 gap-4">
            {socialApps.map((app) => (
              <button 
                key={app.name}
                onClick={() => { app.action(); onClose(); }}
                className="flex flex-col items-center gap-2 group"
              >
                <div className={`${app.color} w-12 h-12 rounded-2xl flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform`}>
                    {app.icon}
                </div>
                <span className="text-xs text-gray-400 group-hover:text-white transition-colors">{app.name}</span>
              </button>
            ))}
          </div>

        </div>
      </motion.div>
    </motion.div>
  );
};
