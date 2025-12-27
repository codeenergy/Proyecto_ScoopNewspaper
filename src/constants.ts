
import { Article, Category, Language } from './types';

export const APP_NAME = "ScoopNewspaper";
export const REFRESH_INTERVAL_MS = 10 * 60 * 1000; // 10 minutes
export const WEATHER_API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY || '';

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
    cookies: "Cookies Policy",
    close: "Close",
    rights: "All rights reserved.",
    developedBy: "Developed & Designed by",
    // Modal Content
    aboutTitle: "About Us",
    aboutContent: `${APP_NAME} is an innovative news platform that combines 3D technology with artificial intelligence to offer a unique and immersive reading experience. Our goal is to revolutionize the way you consume news, making information more accessible, visual and engaging.`,
    privacyContent: "At ScoopNewspaper we respect your privacy. We do not sell or share your personal data. We use cookies only to improve your browsing experience. All data is processed in accordance with GDPR and international data protection regulations.",
    termsContent: "By using ScoopNewspaper, you accept our terms of service. Content is provided 'as is' for informational purposes. We reserve the right to modify these terms at any time. Continued use of the service constitutes acceptance of such changes.",
    cookiesContent: "We use essential cookies for site operation and analytical cookies to improve your experience. You can configure or reject cookies at any time from your browser settings without affecting basic site functionality."
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
    cookies: "Política de Cookies",
    close: "Cerrar",
    rights: "Todos los derechos reservados.",
    developedBy: "Desarrollado y Diseñado por",
    // Modal Content
    aboutTitle: "Sobre Nosotros",
    aboutContent: `${APP_NAME} es una plataforma innovadora de noticias que combina tecnología 3D con inteligencia artificial para ofrecer una experiencia de lectura única e inmersiva. Nuestro objetivo es revolucionar la forma en que consumes las noticias, haciendo que la información sea más accesible, visual y atractiva.`,
    privacyContent: "En ScoopNewspaper respetamos tu privacidad. No vendemos ni compartimos tus datos personales. Utilizamos cookies solo para mejorar tu experiencia de navegación. Todos los datos se procesan de acuerdo con el GDPR y regulaciones internacionales de protección de datos.",
    termsContent: "Al usar ScoopNewspaper, aceptas nuestros términos de servicio. El contenido se proporciona 'tal cual' con fines informativos. Nos reservamos el derecho de modificar estos términos en cualquier momento. El uso continuado del servicio constituye la aceptación de dichos cambios.",
    cookiesContent: "Utilizamos cookies esenciales para el funcionamiento del sitio y cookies analíticas para mejorar tu experiencia. Puedes configurar o rechazar cookies en cualquier momento desde la configuración de tu navegador sin afectar la funcionalidad básica del sitio."
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
    cookies: "Politique de Cookies",
    close: "Fermer",
    rights: "Tous droits réservés.",
    developedBy: "Développé et Conçu par",
    // Modal Content
    aboutTitle: "À Propos",
    aboutContent: `${APP_NAME} est une plateforme d'actualités innovante qui combine la technologie 3D avec l'intelligence artificielle pour offrir une expérience de lecture unique et immersive. Notre objectif est de révolutionner la façon dont vous consommez les actualités, en rendant l'information plus accessible, visuelle et attrayante.`,
    privacyContent: "Chez ScoopNewspaper, nous respectons votre vie privée. Nous ne vendons ni ne partageons vos données personnelles. Nous utilisons des cookies uniquement pour améliorer votre expérience de navigation. Toutes les données sont traitées conformément au RGPD et aux réglementations internationales sur la protection des données.",
    termsContent: "En utilisant ScoopNewspaper, vous acceptez nos conditions d'utilisation. Le contenu est fourni 'tel quel' à des fins d'information. Nous nous réservons le droit de modifier ces conditions à tout moment. L'utilisation continue du service constitue l'acceptation de ces modifications.",
    cookiesContent: "Nous utilisons des cookies essentiels pour le fonctionnement du site et des cookies analytiques pour améliorer votre expérience. Vous pouvez configurer ou refuser les cookies à tout moment depuis les paramètres de votre navigateur sans affecter les fonctionnalités de base du site."
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
    cookies: "سياسة ملفات تعريف الارتباط",
    close: "إغلاق",
    rights: "جميع الحقوق محفوظة.",
    developedBy: "تم التطوير والتصميم بواسطة",
    // Modal Content
    aboutTitle: "من نحن",
    aboutContent: `${APP_NAME} هي منصة أخبار مبتكرة تجمع بين تقنية 3D والذكاء الاصطناعي لتقديم تجربة قراءة فريدة وغامرة. هدفنا هو إحداث ثورة في الطريقة التي تستهلك بها الأخبار، مما يجعل المعلومات أكثر سهولة وبصرية وجاذبية.`,
    privacyContent: "في ScoopNewspaper نحن نحترم خصوصيتك. نحن لا نبيع أو نشارك بياناتك الشخصية. نحن نستخدم ملفات تعريف الارتباط فقط لتحسين تجربة التصفح الخاصة بك. تتم معالجة جميع البيانات وفقًا للائحة العامة لحماية البيانات واللوائح الدولية لحماية البيانات.",
    termsContent: "باستخدام ScoopNewspaper، فإنك توافق على شروط الخدمة الخاصة بنا. يتم توفير المحتوى 'كما هو' لأغراض إعلامية. نحتفظ بالحق في تعديل هذه الشروط في أي وقت. يشكل الاستخدام المستمر للخدمة قبولاً لهذه التغييرات.",
    cookiesContent: "نحن نستخدم ملفات تعريف الارتباط الأساسية لتشغيل الموقع وملفات تعريف الارتباط التحليلية لتحسين تجربتك. يمكنك تكوين أو رفض ملفات تعريف الارتباط في أي وقت من إعدادات المتصفح الخاص بك دون التأثير على الوظائف الأساسية للموقع."
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
