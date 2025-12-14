import React, { useEffect, useState } from 'react';
import { X } from 'lucide-react';

interface AdManagerProps {
  enabled?: boolean;
}

export const AdManager: React.FC<AdManagerProps> = ({ enabled = true }) => {
  const [showVignette, setShowVignette] = useState(false);
  const [vignetteLoaded, setVignetteLoaded] = useState(false);

  useEffect(() => {
    if (!enabled) return;

    // Load Push Notifications script
    const pushScript = document.createElement('script');
    pushScript.src = 'https://3nbf4.com/act/files/tag.min.js?z=10325585';
    pushScript.setAttribute('data-cfasync', 'false');
    pushScript.async = true;
    document.body.appendChild(pushScript);

    // Load Vignette Banner script - Solo se carga, no se ejecuta automáticamente
    const vignetteScript = document.createElement('script');
    vignetteScript.textContent = `
      (function(s){
        s.dataset.zone='10325588';
        s.src='https://gizokraijaw.net/vignette.min.js';
        s.onload = function() {
          window.monetagVignetteLoaded = true;
        };
      })([document.documentElement, document.body].filter(Boolean).pop().appendChild(document.createElement('script')))
    `;
    document.body.appendChild(vignetteScript);

    // Check if vignette is loaded
    const checkVignetteInterval = setInterval(() => {
      if ((window as any).monetagVignetteLoaded) {
        setVignetteLoaded(true);
        clearInterval(checkVignetteInterval);
      }
    }, 100);

    return () => {
      // Cleanup
      clearInterval(checkVignetteInterval);
      if (pushScript.parentNode) {
        pushScript.parentNode.removeChild(pushScript);
      }
      if (vignetteScript.parentNode) {
        vignetteScript.parentNode.removeChild(vignetteScript);
      }
    };
  }, [enabled]);

  const handleDirectLink = () => {
    // Open direct link in new tab
    window.open('https://otieu.com/4/10325584', '_blank', 'noopener,noreferrer');
  };

  const triggerVignette = () => {
    // This allows controlled vignette display
    if (vignetteLoaded && (window as any).monetagVignette) {
      (window as any).monetagVignette.show();
    }
    setShowVignette(false);
  };

  if (!enabled) return null;

  return (
    <>
      {/* Controlled Vignette Trigger - Hidden by default */}
      {showVignette && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 max-w-sm relative">
            <button
              onClick={() => setShowVignette(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
            >
              <X className="w-5 h-5" />
            </button>
            <p className="text-gray-800 mb-4">Support us by viewing an ad?</p>
            <button
              onClick={triggerVignette}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
            >
              Continue
            </button>
          </div>
        </div>
      )}

      {/* Direct Link Ad - Can be triggered manually */}
      <div id="monetag-direct-link" className="hidden" onClick={handleDirectLink}></div>
    </>
  );
};

// Export utility function to trigger vignette from other components
export const triggerVignetteAd = () => {
  if ((window as any).monetagVignette) {
    (window as any).monetagVignette.show();
  }
};
