import React from 'react';
import { Gift, TrendingUp, Zap } from 'lucide-react';
import { Language } from '../types';
import { TRANSLATIONS } from '../constants';

interface PartnerSidebarProps {
  language: Language;
  isOpen: boolean;
}

export const PartnerSidebar: React.FC<PartnerSidebarProps> = ({ language, isOpen }) => {
  const t = TRANSLATIONS[language];

  if (!isOpen) return null;

  const offers = [
    {
      icon: <Gift className="w-5 h-5" />,
      title: 'Premium Subscription',
      description: '50% off for new members',
      cta: 'Claim Offer',
      color: 'blue'
    },
    {
      icon: <TrendingUp className="w-5 h-5" />,
      title: 'Market Insights',
      description: 'Real-time stock alerts',
      cta: 'Learn More',
      color: 'green'
    },
    {
      icon: <Zap className="w-5 h-5" />,
      title: 'Breaking News Alerts',
      description: 'Never miss important updates',
      cta: 'Enable Now',
      color: 'yellow'
    }
  ];

  return (
    <aside className="w-80 bg-gradient-to-b from-gray-900 to-black border-l border-white/10 overflow-y-auto hidden lg:block animate-fadeIn">
      <div className="p-6">

        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-bold text-white">{t.partner}</h3>
          <span className="text-xs px-2 py-1 bg-yellow-500/20 text-yellow-400 rounded-full">
            {t.sponsored}
          </span>
        </div>

        {/* Offers */}
        <div className="space-y-4">
          {offers.map((offer, index) => (
            <div
              key={index}
              className="glass-panel rounded-lg p-4 hover:border-blue-500/50 transition-colors cursor-pointer"
            >
              <div className={`inline-flex p-2 rounded-lg bg-${offer.color}-500/20 text-${offer.color}-400 mb-3`}>
                {offer.icon}
              </div>
              <h4 className="font-semibold text-white mb-1">{offer.title}</h4>
              <p className="text-sm text-gray-400 mb-3">{offer.description}</p>
              <button className="w-full px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg text-sm font-medium transition-colors">
                {offer.cta}
              </button>
            </div>
          ))}
        </div>

        {/* Banner Ad */}
        <div className="mt-6 glass-panel rounded-lg p-6 text-center">
          <div className="text-4xl mb-3">📰</div>
          <h4 className="font-bold text-white mb-2">Ad Space Available</h4>
          <p className="text-xs text-gray-400 mb-4">
            Reach thousands of engaged readers
          </p>
          <button className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white rounded-lg text-sm font-medium transition-all">
            Learn More
          </button>
        </div>

      </div>
    </aside>
  );
};
