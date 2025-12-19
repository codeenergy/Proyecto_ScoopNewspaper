import React, { useState } from 'react';
import { X, ShoppingCart, ExternalLink, ChevronLeft, ChevronRight, Play } from 'lucide-react';

interface VideoSupportersProps {
  onClose: () => void;
}

const PRODUCTS = [
  {
    id: 1,
    name: '230+ Recetas de Postres',
    description: 'Aprende a preparar postres deliciosos sin horno, con coberturas exquisitas y más',
    price: 'Curso Online',
    image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=800&h=600&fit=crop',
    buyLink: 'https://go.hotmart.com/E103121102Q?dp=1',
    videoUrl: 'https://www.youtube.com/embed/VKHFZhLX5i8',
    gradient: 'from-pink-500 to-rose-600'
  },
  {
    id: 2,
    name: 'Libertad Financiera',
    description: 'Deja tu empleo sin consecuencias financieras. Guía completa de 213 páginas',
    price: 'eBook Premium',
    image: 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=800&h=600&fit=crop',
    buyLink: 'https://go.hotmart.com/A101639222W?dp=1',
    videoUrl: 'https://www.youtube.com/embed/mOhzl98NqIw',
    gradient: 'from-green-500 to-emerald-600'
  },
  {
    id: 3,
    name: 'Diseña con Resina Epoxi',
    description: 'Crea joyería, llaveros y accesorios únicos. De principiante a experto',
    price: 'Acceso de por vida',
    image: 'https://images.unsplash.com/photo-1611955167811-4711904bb9f8?w=800&h=600&fit=crop',
    buyLink: 'https://go.hotmart.com/K101644464P?dp=1',
    videoUrl: 'https://www.youtube.com/embed/JnStWI4Vf7A',
    gradient: 'from-purple-500 to-pink-600'
  },
  {
    id: 4,
    name: 'Velas Artesanales Pro',
    description: 'Domina el arte de crear velas decorativas. Incluye lista de proveedores',
    price: 'Curso Certificado',
    image: 'https://images.unsplash.com/photo-1602874801006-ec07446vs9e3c?w=800&h=600&fit=crop',
    buyLink: 'https://go.hotmart.com/E103136583X?dp=1',
    videoUrl: 'https://www.youtube.com/embed/xFEp87KxEK0',
    gradient: 'from-amber-500 to-orange-600'
  },
  {
    id: 5,
    name: 'Extensiones V-Light',
    description: 'Certificación profesional en extensiones de cabello. Duración hasta 4 meses',
    price: 'Programa Completo',
    image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&h=600&fit=crop',
    buyLink: 'https://go.hotmart.com/Q101638891S?dp=1',
    videoUrl: 'https://www.youtube.com/embed/rCcPF0cRSFI',
    gradient: 'from-violet-500 to-purple-600'
  },
  {
    id: 6,
    name: 'Master en Decoración con Globos',
    description: 'Convierte tu tiempo libre en ingresos. 3 niveles + certificación oficial',
    price: 'Mentorías en Vivo',
    image: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=800&h=600&fit=crop',
    buyLink: 'https://go.hotmart.com/T101431344N?dp=1',
    videoUrl: 'https://www.youtube.com/embed/3aLy0mAYUYo',
    gradient: 'from-blue-500 to-cyan-600'
  },
  {
    id: 7,
    name: 'Moldes de Silicona Caseros',
    description: 'Aprende a elaborar tus propios moldes desde casa. Ahorra dinero',
    price: 'Guía Práctica',
    image: 'https://images.unsplash.com/photo-1452860606245-08befc0ff44b?w=800&h=600&fit=crop',
    buyLink: 'https://go.hotmart.com/I101639218Q?dp=1',
    videoUrl: 'https://www.youtube.com/embed/OY8l4wcABMk',
    gradient: 'from-teal-500 to-green-600'
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
