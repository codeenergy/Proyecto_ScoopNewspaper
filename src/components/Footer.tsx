import React, { useState } from 'react';
import { TRANSLATIONS, APP_NAME } from '../constants';
import { Language } from '../types';
import { Mail, X, Play } from 'lucide-react';

interface FooterProps {
  language: Language;
}

type ModalContent = 'about' | 'privacy' | 'terms' | 'cookies' | null;

export const Footer: React.FC<FooterProps> = ({ language }) => {
  const t = TRANSLATIONS[language];
  const [modalContent, setModalContent] = useState<ModalContent>(null);

  const getModalContent = (type: ModalContent) => {
    switch (type) {
      case 'about':
        return {
          title: t.aboutTitle,
          content: t.aboutContent
        };
      case 'privacy':
        return {
          title: t.privacy,
          content: t.privacyContent
        };
      case 'terms':
        return {
          title: t.terms,
          content: t.termsContent
        };
      case 'cookies':
        return {
          title: t.cookies,
          content: t.cookiesContent
        };
      default:
        return { title: '', content: '' };
    }
  };

  const openModal = (type: ModalContent) => {
    setModalContent(type);
  };

  const closeModal = () => {
    setModalContent(null);
  };

  const currentModal = modalContent ? getModalContent(modalContent) : null;

  return (
    <>
      <footer className="relative z-20 glass-panel border-t border-white/10 py-3 px-4">
        <div className="max-w-7xl mx-auto">

          {/* Responsive Layout - Column on mobile, Row on desktop */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3 text-xs">

            {/* Top Row on Mobile: Copyright & Links */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
              {/* Copyright */}
              <div className="text-gray-400 text-center sm:text-left">
                © {new Date().getFullYear()} {APP_NAME}
              </div>

              {/* Links */}
              <div className="flex flex-wrap justify-center sm:justify-start gap-3 sm:gap-4">
                <button onClick={() => openModal('about')} className="text-gray-400 hover:text-blue-400 transition-colors">
                  {t.about}
                </button>
                <span className="text-gray-600 hidden sm:inline">|</span>
                <button onClick={() => openModal('privacy')} className="text-gray-400 hover:text-blue-400 transition-colors">
                  {t.privacy}
                </button>
                <button onClick={() => openModal('terms')} className="text-gray-400 hover:text-blue-400 transition-colors">
                  {t.terms}
                </button>
                <button onClick={() => openModal('cookies')} className="text-gray-400 hover:text-blue-400 transition-colors">
                  {t.cookies}
                </button>
              </div>
            </div>

            {/* Bottom Row on Mobile: Support, Contact & Credits */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
              {/* Support Button */}
              <a
                href="https://otieu.com/4/10363114"
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 rounded-lg transition-all text-white text-xs font-semibold flex items-center justify-center gap-1 w-full sm:w-auto"
              >
                <Play className="w-3 h-3" />
                Support
              </a>

              {/* Contact Email */}
              <a
                href="mailto:contact@scoopnewspaper.com"
                className="text-gray-400 hover:text-blue-400 transition-colors flex items-center justify-center sm:justify-start gap-1"
              >
                <Mail className="w-4 h-4 flex-shrink-0" />
                <span className="text-xs truncate max-w-[200px] sm:max-w-none">contact@scoopnewspaper.com</span>
              </a>

              <span className="text-gray-600 hidden sm:inline">|</span>

              {/* Credits */}
              <a
                href="https://codeenergy.org"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-blue-400 transition-colors text-xs text-center sm:text-left"
              >
                {t.developedBy} <span className="font-semibold text-blue-400">Code Energy</span>
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* Modal Overlay */}
      {modalContent && currentModal && (
        <div
          className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4 animate-fadeIn"
          onClick={closeModal}
        >
          <div
            className="bg-gradient-to-br from-gray-900 to-black border border-white/20 rounded-xl max-w-2xl w-full p-6 shadow-2xl animate-scaleIn"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between mb-4 border-b border-white/10 pb-3">
              <h2 className="text-2xl font-bold text-white">{currentModal.title}</h2>
              <button
                onClick={closeModal}
                className="text-gray-400 hover:text-white transition-colors p-1 hover:bg-white/10 rounded-full"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="text-gray-300 leading-relaxed">
              {currentModal.content}
            </div>

            {/* Modal Footer */}
            <div className="mt-6 flex justify-end">
              <button
                onClick={closeModal}
                className="px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
              >
                {t.close}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
