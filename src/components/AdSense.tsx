import React, { useEffect } from 'react';

interface AdSenseProps {
  adSlot: string;
  adFormat?: 'auto' | 'fluid' | 'rectangle' | 'horizontal' | 'vertical';
  fullWidthResponsive?: boolean;
  style?: React.CSSProperties;
  className?: string;
}

/**
 * Componente reutilizable para Google AdSense
 *
 * @example
 * <AdSense
 *   adSlot="1234567890"
 *   adFormat="auto"
 *   style={{ minHeight: '250px' }}
 * />
 */
export const AdSense: React.FC<AdSenseProps> = ({
  adSlot,
  adFormat = 'auto',
  fullWidthResponsive = true,
  style,
  className = ''
}) => {
  useEffect(() => {
    try {
      // @ts-ignore
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {
      console.error('AdSense error:', e);
    }
  }, []);

  return (
    <div className={`ad-container ${className}`} style={style}>
      <ins
        className="adsbygoogle"
        style={{ display: 'block', textAlign: 'center' }}
        data-ad-client="ca-pub-XXXXXXXXXX" // ⚠️ REEMPLAZAR con tu ID de AdSense
        data-ad-slot={adSlot}
        data-ad-format={adFormat}
        data-full-width-responsive={fullWidthResponsive.toString()}
      />
    </div>
  );
};

/**
 * Banner superior - Leaderboard (728x90)
 */
export const AdSenseLeaderboard: React.FC<{ adSlot: string }> = ({ adSlot }) => {
  return (
    <AdSense
      adSlot={adSlot}
      adFormat="horizontal"
      style={{
        minHeight: '90px',
        marginBottom: '1rem',
        display: 'flex',
        justifyContent: 'center'
      }}
      className="hidden md:block"
    />
  );
};

/**
 * Rectangle - Sidebar (300x250)
 */
export const AdSenseRectangle: React.FC<{ adSlot: string }> = ({ adSlot }) => {
  return (
    <AdSense
      adSlot={adSlot}
      adFormat="rectangle"
      style={{
        minHeight: '250px',
        minWidth: '300px',
        marginBottom: '1rem'
      }}
    />
  );
};

/**
 * In-Feed Native Ad - Se mezcla con el contenido
 */
export const AdSenseInFeed: React.FC<{ adSlot: string }> = ({ adSlot }) => {
  return (
    <AdSense
      adSlot={adSlot}
      adFormat="fluid"
      style={{
        minHeight: '250px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
      className="glass-panel rounded-lg overflow-hidden"
    />
  );
};

/**
 * In-Article Ad - Dentro de artículos
 */
export const AdSenseInArticle: React.FC<{ adSlot: string }> = ({ adSlot }) => {
  return (
    <AdSense
      adSlot={adSlot}
      adFormat="fluid"
      style={{
        minHeight: '200px',
        margin: '2rem 0'
      }}
    />
  );
};
