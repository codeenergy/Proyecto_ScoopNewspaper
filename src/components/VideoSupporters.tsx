import React, { useState } from 'react';
import { X, ShoppingCart, ExternalLink, ChevronLeft, ChevronRight, Play } from 'lucide-react';

interface VideoSupportersProps {
  onClose: () => void;
}

const PRODUCTS = [
  {
    id: 1,
    name: 'Premium Laptop Pro',
    description: 'High-performance laptop for professionals',
    price: '$1,299',
    image: 'https://picsum.photos/seed/laptop/800/600',
    buyLink: 'https://amazon.com',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    gradient: 'from-blue-500 to-cyan-600'
  },
  {
    id: 2,
    name: 'Wireless Headphones',
    description: 'Noise-cancelling premium audio',
    price: '$299',
    image: 'https://picsum.photos/seed/headphones/800/600',
    buyLink: 'https://amazon.com',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    gradient: 'from-purple-500 to-pink-600'
  },
  {
    id: 3,
    name: 'Smart Watch Ultra',
    description: 'Advanced fitness and health tracking',
    price: '$449',
    image: 'https://picsum.photos/seed/watch/800/600',
    buyLink: 'https://amazon.com',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    gradient: 'from-green-500 to-teal-600'
  },
  {
    id: 4,
    name: '4K Camera Pro',
    description: 'Professional photography equipment',
    price: '$1,899',
    image: 'https://picsum.photos/seed/camera/800/600',
    buyLink: 'https://amazon.com',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    gradient: 'from-orange-500 to-red-600'
  },
  {
    id: 5,
    name: 'Gaming Console X',
    description: 'Next-gen gaming experience',
    price: '$499',
    image: 'https://picsum.photos/seed/console/800/600',
    buyLink: 'https://amazon.com',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    gradient: 'from-indigo-500 to-purple-600'
  },
  {
    id: 6,
    name: 'Smart Home Hub',
    description: 'Control your entire home',
    price: '$199',
    image: 'https://picsum.photos/seed/smarthome/800/600',
    buyLink: 'https://amazon.com',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    gradient: 'from-cyan-500 to-blue-600'
  }
];

export const VideoSupporters: React.FC<VideoSupportersProps> = ({ onClose }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showVideo, setShowVideo] = useState(false);

  const currentProduct = PRODUCTS[currentIndex];

  const nextProduct = () => {
    setShowVideo(false);
    setCurrentIndex((prev) => (prev + 1) % PRODUCTS.length);
  };

  const prevProduct = () => {
    setShowVideo(false);
    setCurrentIndex((prev) => (prev - 1 + PRODUCTS.length) % PRODUCTS.length);
  };

  return (
    <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div
        className="bg-gradient-to-br from-gray-900 to-black border border-white/20 rounded-xl max-w-5xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-white/10 sticky top-0 bg-black/90 backdrop-blur z-10">
          <h2 className="text-2xl font-bold text-white">
            Featured Products
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors p-2 hover:bg-white/10 rounded-full"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Product Carousel */}
        <div className="p-6">
          <div className="relative">
            {/* Main Product Display */}
            <div className="glass-panel rounded-xl overflow-hidden">
              {/* Product Image/Video */}
              <div className="relative h-96 overflow-hidden bg-gray-800">
                {showVideo ? (
                  <iframe
                    src={currentProduct.videoUrl}
                    className="w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                ) : (
                  <>
                    <img
                      src={currentProduct.image}
                      alt={currentProduct.name}
                      className="w-full h-full object-cover"
                    />
                    <div className={`absolute inset-0 bg-gradient-to-t ${currentProduct.gradient} opacity-20`} />

                    {/* Play Button Overlay */}
                    <button
                      onClick={() => setShowVideo(true)}
                      className="absolute inset-0 flex items-center justify-center group"
                    >
                      <div className="w-20 h-20 bg-blue-500/90 hover:bg-blue-600 rounded-full flex items-center justify-center transition-all group-hover:scale-110">
                        <Play className="w-10 h-10 text-white ml-1" fill="white" />
                      </div>
                    </button>
                  </>
                )}
              </div>

              {/* Product Info */}
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-white font-bold text-3xl mb-2">{currentProduct.name}</h3>
                    <p className="text-gray-400 text-lg">{currentProduct.description}</p>
                  </div>
                  <span className="text-4xl font-bold text-blue-400 ml-4">{currentProduct.price}</span>
                </div>

                <div className="flex items-center gap-4">
                  <a
                    href={currentProduct.buyLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-lg transition-all font-semibold text-lg"
                  >
                    <ShoppingCart className="w-5 h-5" />
                    Buy Now
                  </a>

                  {showVideo && (
                    <button
                      onClick={() => setShowVideo(false)}
                      className="px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-all font-semibold text-lg"
                    >
                      Show Image
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Navigation Arrows */}
            <button
              onClick={prevProduct}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 p-3 bg-blue-500/90 hover:bg-blue-600 text-white rounded-full shadow-lg transition-all"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <button
              onClick={nextProduct}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 p-3 bg-blue-500/90 hover:bg-blue-600 text-white rounded-full shadow-lg transition-all"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Product Indicators */}
            <div className="flex items-center justify-center gap-2 mt-6">
              {PRODUCTS.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setShowVideo(false);
                    setCurrentIndex(index);
                  }}
                  className={`w-3 h-3 rounded-full transition-all ${
                    index === currentIndex
                      ? 'bg-blue-500 w-8'
                      : 'bg-gray-600 hover:bg-gray-500'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Supporters Section */}
        <div className="p-6 border-t border-white/10">
          <h3 className="text-xl font-bold text-white mb-4 text-center">Our Partners</h3>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {/* Code Energy */}
            <a
              href="https://codeenergy.org"
              target="_blank"
              rel="noopener noreferrer"
              className="glass-panel p-3 rounded-lg hover:border-blue-500/50 transition-all group text-center"
            >
              <div className="w-12 h-12 mx-auto mb-1 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
                CE
              </div>
              <h4 className="text-white font-semibold text-xs mb-1">Code Energy</h4>
              <ExternalLink className="w-3 h-3 text-blue-400 mx-auto group-hover:scale-110 transition-transform" />
            </a>

            {/* Google Gemini */}
            <div className="glass-panel p-3 rounded-lg text-center">
              <div className="w-12 h-12 mx-auto mb-1 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
                AI
              </div>
              <h4 className="text-white font-semibold text-xs">Gemini</h4>
            </div>

            {/* NewsAPI */}
            <div className="glass-panel p-3 rounded-lg text-center">
              <div className="w-12 h-12 mx-auto mb-1 bg-gradient-to-br from-green-500 to-teal-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
                NA
              </div>
              <h4 className="text-white font-semibold text-xs">NewsAPI</h4>
            </div>

            {/* React */}
            <div className="glass-panel p-3 rounded-lg text-center">
              <div className="w-12 h-12 mx-auto mb-1 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
                ⚛️
              </div>
              <h4 className="text-white font-semibold text-xs">React</h4>
            </div>

            {/* Vite */}
            <div className="glass-panel p-3 rounded-lg text-center">
              <div className="w-12 h-12 mx-auto mb-1 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
                ⚡
              </div>
              <h4 className="text-white font-semibold text-xs">Vite</h4>
            </div>

            {/* You */}
            <div className="glass-panel p-3 rounded-lg text-center">
              <div className="w-12 h-12 mx-auto mb-1 bg-gradient-to-br from-pink-500 to-rose-600 rounded-full flex items-center justify-center text-white text-lg">
                ❤️
              </div>
              <h4 className="text-white font-semibold text-xs">You!</h4>
            </div>
          </div>
        </div>

        {/* Close Button */}
        <div className="p-4 border-t border-white/10 text-center">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
