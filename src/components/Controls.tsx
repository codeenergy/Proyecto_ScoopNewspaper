import React from 'react';
import { Search, Globe, Layers, BookOpen } from 'lucide-react';
import { Category, FilterState, Language, Country } from '../types';
import { TRANSLATIONS, COUNTRIES } from '../constants';

interface ControlsProps {
  filterState: FilterState;
  setFilterState: React.Dispatch<React.SetStateAction<FilterState>>;
}

const categories = ['All', Category.WORLD, Category.TECH, Category.BUSINESS, Category.SCIENCE, Category.ARTS, Category.SPORTS];
const languages: { code: Language; name: string }[] = [
  { code: 'en', name: 'English' },
  { code: 'es', name: 'Español' },
  { code: 'fr', name: 'Français' },
  { code: 'ar', name: 'العربية' }
];

export const Controls: React.FC<ControlsProps> = ({ filterState, setFilterState }) => {
  const t = TRANSLATIONS[filterState.language];

  return (
    <div className="relative z-10 glass-panel border-b border-white/10 p-4">
      <div className="flex flex-wrap gap-3 items-center">

        {/* Search */}
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder={t.search}
            value={filterState.searchQuery}
            onChange={(e) => setFilterState(prev => ({ ...prev, searchQuery: e.target.value }))}
            className="w-full pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
          />
        </div>

        {/* Category */}
        <select
          value={filterState.category}
          onChange={(e) => setFilterState(prev => ({ ...prev, category: e.target.value as any }))}
          className="px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50"
        >
          {categories.map(cat => (
            <option key={cat} value={cat} className="bg-gray-900">{cat}</option>
          ))}
        </select>

        {/* Language */}
        <select
          value={filterState.language}
          onChange={(e) => setFilterState(prev => ({ ...prev, language: e.target.value as Language }))}
          className="px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50"
        >
          {languages.map(lang => (
            <option key={lang.code} value={lang.code} className="bg-gray-900">{lang.name}</option>
          ))}
        </select>

        {/* Country */}
        <select
          value={filterState.country}
          onChange={(e) => setFilterState(prev => ({ ...prev, country: e.target.value as Country }))}
          className="px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50"
        >
          {COUNTRIES.map(country => (
            <option key={country.code} value={country.code} className="bg-gray-900">
              {country.flag} {country.name}
            </option>
          ))}
        </select>

        {/* View Toggle */}
        <div className="flex gap-1 bg-white/5 p-1 rounded-lg border border-white/10">
          <button
            onClick={() => setFilterState(prev => ({ ...prev, viewMode: '3d' }))}
            className={`px-3 py-1.5 rounded text-sm flex items-center gap-1.5 transition-colors ${
              filterState.viewMode === '3d'
                ? 'bg-blue-500 text-white'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <Layers className="w-4 h-4" />
            {t.view3d}
          </button>
          <button
            onClick={() => setFilterState(prev => ({ ...prev, viewMode: 'feed' }))}
            className={`px-3 py-1.5 rounded text-sm flex items-center gap-1.5 transition-colors ${
              filterState.viewMode === 'feed'
                ? 'bg-blue-500 text-white'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            {t.viewFeed}
          </button>
        </div>
      </div>
    </div>
  );
};
