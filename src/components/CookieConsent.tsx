import React, { useState, useEffect } from 'react';
import { X, Cookie } from 'lucide-react';

/**
 * Cookie Consent Banner - GDPR Compliant
 *
 * Este componente muestra un banner de consentimiento de cookies
 * requerido por GDPR para sitios que usan Google AdSense y Analytics
 */
export const CookieConsent: React.FC = () => {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    // Verificar si el usuario ya aceptó las cookies
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      // Mostrar banner después de 1 segundo
      setTimeout(() => setShowBanner(true), 1000);
    }
  }, []);

  const handleAccept = () => {
    // Guardar consentimiento en localStorage
    localStorage.setItem('cookie-consent', 'accepted');
    localStorage.setItem('cookie-consent-date', new Date().toISOString());
    setShowBanner(false);

    // Opcional: Cargar Google Analytics aquí si no está cargado
    // loadGoogleAnalytics();
  };

  const handleDecline = () => {
    // Guardar rechazo en localStorage
    localStorage.setItem('cookie-consent', 'declined');
    localStorage.setItem('cookie-consent-date', new Date().toISOString());
    setShowBanner(false);

    // Opcional: Desactivar cookies no esenciales
    // disableNonEssentialCookies();
  };

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 animate-fadeIn">
      <div className="max-w-6xl mx-auto bg-gradient-to-br from-gray-900 to-black border border-blue-500/30 rounded-xl shadow-2xl backdrop-blur-lg">
        <div className="p-6">
          <div className="flex items-start gap-4">
            {/* Icon */}
            <div className="flex-shrink-0">
              <Cookie className="w-8 h-8 text-blue-400" />
            </div>

            {/* Content */}
            <div className="flex-1">
              <h3 className="text-white font-bold text-lg mb-2">
                🍪 We Value Your Privacy
              </h3>
              <p className="text-gray-300 text-sm mb-4">
                We use cookies and similar technologies to improve your experience,
                analyze site traffic, and show you personalized ads. By clicking
                "Accept All", you consent to our use of cookies.
              </p>
              <p className="text-gray-400 text-xs mb-4">
                This site uses <strong>Google AdSense</strong> and <strong>Google Analytics</strong>.
                These services use cookies to deliver and improve ads, and to analyze traffic.{' '}
                <a
                  href="/privacy-policy"
                  target="_blank"
                  className="text-blue-400 hover:text-blue-300 underline"
                >
                  Learn more
                </a>
              </p>

              {/* Buttons */}
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={handleAccept}
                  className="px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors font-semibold text-sm"
                >
                  Accept All
                </button>
                <button
                  onClick={handleDecline}
                  className="px-6 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors font-semibold text-sm"
                >
                  Decline
                </button>
                <a
                  href="/privacy-policy"
                  target="_blank"
                  className="px-6 py-2 bg-white/5 hover:bg-white/10 text-gray-300 rounded-lg transition-colors font-semibold text-sm flex items-center"
                >
                  Manage Preferences
                </a>
              </div>
            </div>

            {/* Close button */}
            <button
              onClick={handleDecline}
              className="flex-shrink-0 text-gray-400 hover:text-white transition-colors p-2 hover:bg-white/10 rounded-full"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

/**
 * Versión simple del Cookie Consent (más compacto)
 */
export const SimpleCookieConsent: React.FC = () => {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      setTimeout(() => setShowBanner(true), 1000);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookie-consent', 'accepted');
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:max-w-md z-50 animate-fadeIn">
      <div className="bg-gray-900 border border-blue-500/30 rounded-lg shadow-2xl p-4">
        <div className="flex items-start gap-3">
          <Cookie className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
          <div className="flex-1">
            <p className="text-white text-sm mb-3">
              We use cookies to enhance your experience. By continuing, you agree to our use of cookies.{' '}
              <a href="/privacy-policy" className="text-blue-400 hover:underline">
                Learn more
              </a>
            </p>
            <div className="flex gap-2">
              <button
                onClick={handleAccept}
                className="flex-1 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors text-sm font-semibold"
              >
                Accept
              </button>
              <button
                onClick={() => setShowBanner(false)}
                className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors text-sm"
              >
                Decline
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

/**
 * Hook para verificar si el usuario aceptó cookies
 */
export const useCookieConsent = () => {
  const [hasConsent, setHasConsent] = useState<boolean | null>(null);

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent');
    setHasConsent(consent === 'accepted');
  }, []);

  return hasConsent;
};
