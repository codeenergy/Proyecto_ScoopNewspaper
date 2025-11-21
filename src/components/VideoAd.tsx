import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

interface VideoAdProps {
  onClose: () => void;
}

export const VideoAd: React.FC<VideoAdProps> = ({ onClose }) => {
  const [countdown, setCountdown] = useState(5);
  const [canClose, setCanClose] = useState(false);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setCanClose(true);
    }
  }, [countdown]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm animate-fadeIn"
      onClick={(e) => {
        if (canClose && e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div className="relative bg-gray-900 rounded-lg overflow-hidden max-w-2xl w-full mx-4 animate-scaleIn">

        {/* Close Button */}
        {canClose && (
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 bg-black/50 hover:bg-black/70 rounded-full text-white z-10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        )}

        {/* Countdown */}
        {!canClose && (
          <div className="absolute top-4 right-4 px-3 py-1 bg-black/70 rounded-full text-white text-sm z-10">
            Ad closes in {countdown}s
          </div>
        )}

        {/* Ad Content */}
        <div className="aspect-video bg-gradient-to-br from-blue-600 to-purple-600 flex flex-col items-center justify-center p-8 text-white text-center">
          <div className="text-6xl mb-4">🎯</div>
          <h2 className="text-3xl font-bold mb-2">Premium Ad Space</h2>
          <p className="text-lg opacity-90 mb-6">
            Advertise your product to engaged readers
          </p>
          <button className="px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors">
            Learn More
          </button>
        </div>

      </div>
    </div>
  );
};
