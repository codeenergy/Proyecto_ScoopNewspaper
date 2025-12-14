import React, { useEffect } from 'react';

interface AdManagerProps {
  enabled?: boolean;
}

export const AdManager: React.FC<AdManagerProps> = ({ enabled = true }) => {
  useEffect(() => {
    if (!enabled) return;

    // Load Push Notifications script
    const pushScript = document.createElement('script');
    pushScript.src = 'https://3nbf4.com/act/files/tag.min.js?z=10325585';
    pushScript.setAttribute('data-cfasync', 'false');
    pushScript.async = true;
    document.body.appendChild(pushScript);

    // Load Vignette Banner script - Correct implementation
    const vignetteScript = document.createElement('script');
    vignetteScript.dataset.zone = '10325588';
    vignetteScript.src = 'https://gizokraijaw.net/vignette.min.js';
    vignetteScript.async = true;

    // Append to the end of body or documentElement
    const target = document.body || document.documentElement;
    target.appendChild(vignetteScript);

    console.log('Monetag ads loaded:', {
      push: pushScript.src,
      vignette: vignetteScript.src,
      vignetteZone: vignetteScript.dataset.zone
    });

    return () => {
      // Cleanup on unmount
      if (pushScript.parentNode) {
        pushScript.parentNode.removeChild(pushScript);
      }
      if (vignetteScript.parentNode) {
        vignetteScript.parentNode.removeChild(vignetteScript);
      }
    };
  }, [enabled]);

  // No UI needed - ads load automatically
  return null;
};
