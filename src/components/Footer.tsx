import React, { useState } from 'react';
import { TRANSLATIONS, APP_NAME } from '../constants';
import { Language } from '../types';
import { Mail, X } from 'lucide-react';

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
          title: 'Sobre Nosotros',
          content: `${APP_NAME} es una plataforma innovadora de noticias que combina tecnología 3D con inteligencia artificial para ofrecer una experiencia de lectura única e inmersiva. Nuestro objetivo es revolucionar la forma en que consumes las noticias, haciendo que la información sea más accesible, visual y atractiva.`
        };
      case 'privacy':
        return {
          title: t.privacy,
          content: 'En ScoopNewspaper respetamos tu privacidad. No vendemos ni compartimos tus datos personales. Utilizamos cookies solo para mejorar tu experiencia de navegación. Todos los datos se procesan de acuerdo con el GDPR y regulaciones internacionales de protección de datos.'
        };
      case 'terms':
        return {
          title: t.terms,
          content: 'Al usar ScoopNewspaper, aceptas nuestros términos de servicio. El contenido se proporciona "tal cual" con fines informativos. Nos reservamos el derecho de modificar estos términos en cualquier momento. El uso continuado del servicio constituye la aceptación de dichos cambios.'
        };
      case 'cookies':
        return {
          title: 'Política de Cookies',
          content: 'Utilizamos cookies esenciales para el funcionamiento del sitio y cookies analíticas para mejorar tu experiencia. Puedes configurar o rechazar cookies en cualquier momento desde la configuración de tu navegador sin afectar la funcionalidad básica del sitio.'
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
      <footer className="relative z-20 glass-panel border-t border-white/10 py-2 px-4">
        <div className="max-w-7xl mx-auto">

          {/* Compact Single Row Layout */}
          <div className="flex flex-wrap items-center justify-between gap-3 text-xs">

            {/* Left: Copyright */}
            <div className="text-gray-400">
              © {new Date().getFullYear()} {APP_NAME}
            </div>

            {/* Center: Links */}
            <div className="flex flex-wrap gap-4">
              <button onClick={() => openModal('about')} className="text-gray-400 hover:text-blue-400 transition-colors">
                Sobre Nosotros
              </button>
              <span className="text-gray-600">|</span>
              <button onClick={() => openModal('privacy')} className="text-gray-400 hover:text-blue-400 transition-colors">
                {t.privacy}
              </button>
              <button onClick={() => openModal('terms')} className="text-gray-400 hover:text-blue-400 transition-colors">
                {t.terms}
              </button>
              <button onClick={() => openModal('cookies')} className="text-gray-400 hover:text-blue-400 transition-colors">
                Cookies
              </button>
            </div>

            {/* Right: Contact & Credits */}
            <div className="flex items-center gap-4">
              <a
                href="mailto:contact@scoopnewspaper.com"
                className="text-gray-400 hover:text-blue-400 transition-colors flex items-center gap-1"
              >
                <Mail className="w-4 h-4" />
                <span className="text-xs">contact@scoopnewspaper.com</span>
              </a>
              <span className="text-gray-600">|</span>
              <a
                href="https://codeenergy.org"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-blue-400 transition-colors text-xs"
              >
                Developed & Designed by <span className="font-semibold text-blue-400">Code Energy</span>
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
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
