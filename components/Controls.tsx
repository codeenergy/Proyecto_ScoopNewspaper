
import React from 'react';
import { Search, Filter, BookOpen, Layers, ChevronDown, Globe, MapPin, LayoutGrid } from 'lucide-react';
import { Category, FilterState, Language, Country } from '../types';
import { TRANSLATIONS, COUNTRIES } from '../constants';

interface ControlsProps {
  filterState: FilterState;
  setFilterState: React.Dispatch<React.SetStateAction<FilterState>>;
}

export const Controls: React.FC<ControlsProps> = ({ filterState, setFilterState }) => {
  
  const t = TRANSLATIONS[filterState.language];

  return (
    <div className="w-full z-40 p-4 pointer-events-none relative flex justify-center mt-2">
      <div className="pointer-events-auto flex flex-col lg:flex-row items-center gap-2 lg:gap-4 bg-black/60 backdrop-blur-xl border border-white/10 p-2 rounded-2xl shadow-2xl ring-1 ring-white/5 transition-all hover:bg-black/70">
        
        {/* Section 1: Region & Language */}
        <div className="flex items-center gap-2 bg-white/5 rounded-xl p-1.5 border border-white/5">
             {/* Language */}
             <div className="relative group">
                <div className="flex items-center gap-2 px-3 py-1.5 hover:bg-white/10 rounded-lg transition-all cursor-pointer">
                    <Globe size={14} className="text-blue-400" />
                    <select 
                        value={filterState.language}
                        onChange={(e) => setFilterState(prev => ({ ...prev, language: e.target.value as Language }))}
                        className="bg-transparent appearance-none focus:outline-none uppercase font-bold text-xs text-gray-200 cursor-pointer w-8"
                    >
                        <option value="en" className="bg-[#1a1a1a] text-gray-200">EN</option>
                        <option value="es" className="bg-[#1a1a1a] text-gray-200">ES</option>
                        <option value="fr" className="bg-[#1a1a1a] text-gray-200">FR</option>
                        <option value="ar" className="bg-[#1a1a1a] text-gray-200">AR</option>
                    </select>
                    <ChevronDown size={10} className="text-gray-500" />
                </div>
            </div>
            
            <div className="w-px h-4 bg-white/10"></div>

            {/* Country */}
            <div className="relative group">
                 <div className="flex items-center gap-2 px-3 py-1.5 hover:bg-white/10 rounded-lg transition-all cursor-pointer">
                    <MapPin size={14} className="text-red-400" />
                    <select 
                        value={filterState.country}
                        onChange={(e) => setFilterState(prev => ({ ...prev, country: e.target.value as Country }))}
                        className="bg-transparent appearance-none focus:outline-none font-bold text-xs text-gray-200 cursor-pointer max-w-[100px] truncate"
                    >
                        {COUNTRIES.map(c => (
                            <option key={c.code} value={c.code} className="bg-[#1a1a1a] text-gray-200">{c.flag} {c.name}</option>
                        ))}
                    </select>
                    <ChevronDown size={10} className="text-gray-500" />
                </div>
            </div>
        </div>

        {/* Section 2: Content Filters */}
        <div className="flex items-center gap-2 bg-white/5 rounded-xl p-1.5 border border-white/5 w-full md:w-auto justify-center">
          
          {/* Category */}
          <div className="relative flex items-center px-3 py-1.5 hover:bg-white/10 rounded-lg transition-colors cursor-pointer">
            <LayoutGrid size={14} className="text-purple-400 mr-2" />
            <select 
              value={filterState.category}
              onChange={(e) => setFilterState(prev => ({ ...prev, category: e.target.value as Category | 'All' }))}
              className="bg-transparent text-white text-xs font-medium focus:outline-none cursor-pointer appearance-none pr-4"
            >
              <option value="All" className="bg-[#1a1a1a] text-gray-200">{t.allSections}</option>
              {Object.values(Category).map((cat) => (
                <option key={cat} value={cat} className="bg-[#1a1a1a] text-gray-200">{cat}</option>
              ))}
            </select>
            <ChevronDown size={10} className="text-gray-500 absolute right-2 pointer-events-none" />
          </div>

          <div className="w-px h-4 bg-white/10"></div>

          {/* Search */}
          <div className="flex items-center px-3 group">
            <Search size={14} className="text-gray-400 group-focus-within:text-blue-400 transition-colors mr-2" />
            <input 
              type="text"
              placeholder={t.search}
              value={filterState.searchQuery}
              onChange={(e) => setFilterState(prev => ({ ...prev, searchQuery: e.target.value }))}
              className="bg-transparent text-white text-xs font-medium focus:outline-none w-24 md:w-40 placeholder-gray-600 transition-all focus:w-48"
            />
          </div>
        </div>

        {/* Section 3: View Mode Toggle */}
        <div className="flex p-1 bg-black/40 rounded-xl border border-white/5 relative">
            <button 
                onClick={() => setFilterState(prev => ({...prev, viewMode: '3d'}))}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all ${filterState.viewMode === '3d' ? 'bg-gradient-to-br from-blue-600 to-blue-700 text-white shadow-lg shadow-blue-900/40' : 'text-gray-500 hover:text-gray-300 hover:bg-white/5'}`}
            >
                <BookOpen size={12} /> 
                <span className="hidden sm:inline">{t.view3d}</span>
            </button>
            <button 
                onClick={() => setFilterState(prev => ({...prev, viewMode: 'feed'}))}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all ${filterState.viewMode === 'feed' ? 'bg-gradient-to-br from-purple-600 to-purple-700 text-white shadow-lg shadow-purple-900/40' : 'text-gray-500 hover:text-gray-300 hover:bg-white/5'}`}
            >
                <Layers size={12} /> 
                <span className="hidden sm:inline">{t.viewFeed}</span>
            </button>
        </div>

      </div>
    </div>
  );
};
