
import { Article, Category, Language } from './types';

export const APP_NAME = "ScoopNewspaper";
export const REFRESH_INTERVAL_MS = 10 * 60 * 1000; // 10 minutes
export const NEWS_API_KEY = "39d3f89262e248a8914a5d1a397a71ec";
export const WEATHER_API_KEY = "18e874860c7306c232e96c78c4e12ba7";

export const LANGUAGES = [
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'ar', name: 'العربية', flag: '🇸🇦' },
];

export const COUNTRIES = [
  { code: 'global', name: 'Global', flag: '🌍' },

  // Europe
  { code: 'es', name: 'España', flag: '🇪🇸' },
  { code: 'gb', name: 'UK', flag: '🇬🇧' },
  { code: 'fr', name: 'France', flag: '🇫🇷' },
  { code: 'de', name: 'Germany', flag: '🇩🇪' },
  { code: 'it', name: 'Italy', flag: '🇮🇹' },
  { code: 'pt', name: 'Portugal', flag: '🇵🇹' },

  // Americas
  { code: 'us', name: 'USA', flag: '🇺🇸' },
  { code: 'mx', name: 'México', flag: '🇲🇽' },
  { code: 'ar', name: 'Argentina', flag: '🇦🇷' },
  { code: 'br', name: 'Brasil', flag: '🇧🇷' },
  { code: 'co', name: 'Colombia', flag: '🇨🇴' },
  { code: 'cl', name: 'Chile', flag: '🇨🇱' },

  // Asia
  { code: 'cn', name: 'China', flag: '🇨🇳' },
  { code: 'jp', name: 'Japan', flag: '🇯🇵' },
  { code: 'in', name: 'India', flag: '🇮🇳' },
  { code: 'kr', name: 'South Korea', flag: '🇰🇷' },
  { code: 'sg', name: 'Singapore', flag: '🇸🇬' },
  { code: 'ae', name: 'UAE', flag: '🇦🇪' },

  // Africa
  { code: 'za', name: 'South Africa', flag: '🇿🇦' },
  { code: 'eg', name: 'Egypt', flag: '🇪🇬' },
  { code: 'ng', name: 'Nigeria', flag: '🇳🇬' },
  { code: 'ma', name: 'Morocco', flag: '🇲🇦' },
];

export const TRANSLATIONS: Record<Language, any> = {
  en: {
    loading: "Printing the latest edition...",
    breaking: "Breaking",
    search: "Search...",
    allSections: "All Sections",
    sponsored: "Sponsored",
    view3d: "3D Paper",
    viewFeed: "Feed",
    page: "Page",
    endEdition: "End of Edition",
    checkBack: "Check back later.",
    continued: "Continued on Page",
    weatherCity: "London",
    subscribe: "Subscribe",
    partner: "Partner Exclusive",
    offers: "View All Offers",
    about: "About Us",
    contact: "Contact",
    privacy: "Privacy Policy",
    terms: "Terms of Service",
    rights: "All rights reserved."
  },
  es: {
    loading: "Imprimiendo la última edición...",
    breaking: "Última Hora",
    search: "Buscar...",
    allSections: "Todas las Secciones",
    sponsored: "Patrocinado",
    view3d: "Diario 3D",
    viewFeed: "Muro",
    page: "Página",
    endEdition: "Fin de la Edición",
    checkBack: "Vuelve más tarde.",
    continued: "Continúa en la pág.",
    weatherCity: "Madrid",
    subscribe: "Suscribirse",
    partner: "Exclusivo Socios",
    offers: "Ver Ofertas",
    about: "Sobre Nosotros",
    contact: "Contacto",
    privacy: "Política de Privacidad",
    terms: "Términos de Servicio",
    rights: "Todos los derechos reservados."
  },
  fr: {
    loading: "Impression de la dernière édition...",
    breaking: "À la Une",
    search: "Rechercher...",
    allSections: "Toutes Rubriques",
    sponsored: "Sponsorisé",
    view3d: "Journal 3D",
    viewFeed: "Fil Actu",
    page: "Page",
    endEdition: "Fin de l'édition",
    checkBack: "Revenez plus tard.",
    continued: "Suite à la page",
    weatherCity: "Paris",
    subscribe: "S'abonner",
    partner: "Partenaire Exclusif",
    offers: "Voir les offres",
    about: "À Propos",
    contact: "Contact",
    privacy: "Confidentialité",
    terms: "Conditions d'utilisation",
    rights: "Tous droits réservés."
  },
  ar: {
    loading: "جاري طباعة العدد الأخير...",
    breaking: "عاجل",
    search: "بحث...",
    allSections: "كل الأقسام",
    sponsored: "ممول",
    view3d: "صحيفة 3D",
    viewFeed: "آخر الأخبار",
    page: "صفحة",
    endEdition: "نهاية العدد",
    checkBack: "عد لاحقاً للمزيد.",
    continued: "تتمة في صفحة",
    weatherCity: "دبي",
    subscribe: "اشتراك",
    partner: "حصري للشركاء",
    offers: "عرض الكل",
    about: "من نحن",
    contact: "اتصل بنا",
    privacy: "الخصوصية",
    terms: "شروط الخدمة",
    rights: "جميع الحقوق محفوظة."
  }
};

export const MOCK_ARTICLES: Article[] = [
  {
    headline: "Global Summit Reaches Historic Accord on Climate Action",
    subheadline: "Nations agree to accelerate renewable energy adoption by 2030.",
    author: "Elena Fisher",
    date: "2023-10-24",
    content: "In a landmark decision today, representatives from over 190 countries signed the 'Green Horizon Treaty'. The agreement outlines ambitious targets for reducing carbon emissions and investing in sustainable infrastructure. Critics argue the timeline is aggressive, but proponents say it's necessary for survival.",
    summary: "190+ nations signed the 'Green Horizon Treaty' to cut carbon emissions by 2030. It's aggressive, but necessary. 🌍 #ClimateChange #Future",
    imageUrl: "https://picsum.photos/seed/climate/800/600",
    category: Category.WORLD,
    location: "Geneva"
  },
  {
    headline: "Quantum Computing Breakthrough Announced",
    subheadline: "New processor capable of solving complex problems in seconds.",
    author: "Dr. Alan Smithee",
    date: "2023-10-24",
    content: "Tech giant Nebula Corp revealed their latest quantum processor, the Q-Core X. Unlike its predecessors, this chip operates at room temperature, paving the way for consumer-grade quantum devices. Analysts predict this could revolutionize cryptography and drug discovery within the decade.",
    summary: "Quantum computers just got real! The new Q-Core X works at room temp. Goodbye passwords, hello future! 💻 #Tech #Quantum",
    imageUrl: "https://picsum.photos/seed/quantum/800/600",
    category: Category.TECH,
    location: "San Francisco"
  },
  {
    headline: "Markets Rally as Inflation Shows Signs of Cooling",
    subheadline: "Major indices hit record highs following quarterly reports.",
    author: "Marcus Thorne",
    date: "2023-10-24",
    content: "Wall Street saw a surge of optimism this morning as the latest consumer price index data came in lower than expected. Tech and energy sectors led the charge, with investors growing confident that the central bank may pause interest rate hikes.",
    summary: "Stocks are up! 📈 Inflation is cooling down and Wall Street is celebrating. Good news for your wallet? #Finance #Money",
    imageUrl: "https://picsum.photos/seed/market/800/600",
    category: Category.BUSINESS,
    location: "New York"
  },
  {
    headline: "Mars Colony Project Enters Phase Two",
    subheadline: "First permanent habitat modules successfully landed.",
    author: "Sarah Jenkins",
    date: "2023-10-24",
    content: "The International Space Coalition confirmed the successful touchdown of the 'Ares IV' payload. These modules will serve as the living quarters for the first human expedition slated for 2028. The automated systems represent a triumph of engineering and international cooperation.",
    summary: "Humans are one step closer to Mars! 🚀 Habitat modules just landed. Packing my bags for 2028. #Space #Mars",
    imageUrl: "https://picsum.photos/seed/mars/800/600",
    category: Category.SCIENCE,
    location: "Houston"
  },
  {
    headline: "Local Artist Wins Prestigious Venice Biennale",
    subheadline: "Abstract installation pieces capture the imagination of judges.",
    author: "Jean Luc",
    date: "2023-10-24",
    content: "Rising star Isabella Rossini took home the Golden Lion today for her immersive installation 'Echoes of Silence'. The piece, which utilizes sound waves to sculpt mist, has been described as 'hauntingly beautiful' by art critics worldwide.",
    summary: "Isabella Rossini just won the Venice Biennale with sound-sculpted mist. Art is evolving. 🎨 #Art #Venice",
    imageUrl: "https://picsum.photos/seed/art/800/600",
    category: Category.ARTS,
    location: "Venice"
  }
];
