
export interface Article {
  headline: string;
  subheadline: string;
  author: string;
  date: string;
  content: string;
  summary?: string; // For the Gen Z Card view
  imageUrl: string;
  category: string;
  location?: string;
  sourceUrl?: string; // Link to original article
  sourceName?: string; // Name of the news source (BBC, NYT, etc)
}

export enum Category {
  WORLD = 'World',
  TECH = 'Technology',
  BUSINESS = 'Business',
  SCIENCE = 'Science',
  ARTS = 'Arts',
  SPORTS = 'Sports'
}

export type Language = 'en' | 'es' | 'fr' | 'ar';

export type Country = 'global' | 'us' | 'gb' | 'fr' | 'ae' | 'mx' | 'ar';

export interface NewsState {
  articles: Article[];
  isLoading: boolean;
  error: string | null;
  lastUpdated: number;
}

export interface FilterState {
  category: Category | 'All';
  searchQuery: string;
  viewMode: '3d' | 'feed';
  language: Language;
  country: Country;
}
