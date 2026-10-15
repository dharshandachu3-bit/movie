import React, { useState } from 'react';
import { Film, Search, Sparkles, User, Bookmark, ChevronDown, Check, Layers, BarChart3, Info, ChevronLeft, ChevronRight } from 'lucide-react';
import { ActiveTab, UserProfile } from '../types';
import { PRESET_PERSONAS } from '../data/clustersData';

interface NavbarProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  currentUser: UserProfile;
  setCurrentUser: (user: UserProfile) => void;
  watchlistCount: number;
  onOpenSearch: () => void;
  onOpenProjectInfo: () => void;
  canGoBack?: boolean;
  canGoForward?: boolean;
  onGoBack?: () => void;
  onGoForward?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  currentUser,
  setCurrentUser,
  watchlistCount,
  onOpenSearch,
  onOpenProjectInfo,
  canGoBack = false,
  canGoForward = false,
  onGoBack,
  onGoForward,
}) => {
  const [showPersonaMenu, setShowPersonaMenu] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full glass-panel border-b border-white/10 bg-[#060813]/85 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        
        {/* Left: Brand Logo & Navigation Controls */}
        <div className="flex items-center gap-3">
          <div 
            onClick={() => setActiveTab('home')}
            className="flex items-center gap-2.5 cursor-pointer group select-none"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-violet-600 via-fuchsia-600 to-pink-500 p-0.5 shadow-lg shadow-violet-500/25 group-hover:shadow-violet-500/40 transition-all duration-300">
              <div className="w-full h-full bg-[#090d1a] rounded-[10px] flex items-center justify-center">
                <Film className="w-5 h-5 text-violet-400 group-hover:text-pink-400 transition-colors" />
              </div>
            </div>
            <div>
              <span className="text-xl font-bold font-display tracking-tight bg-gradient-to-r from-white via-slate-100 to-violet-300 bg-clip-text text-transparent">
                Cine<span className="text-violet-400">Vibe</span>
              </span>
              <span className="hidden sm:inline-block ml-2 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider bg-violet-950/70 text-violet-300 border border-violet-800/40 rounded-full">
                AI Recs
              </span>
            </div>
          </div>

          {/* Back & Forward Navigation Buttons */}
          <div className="flex items-center gap-0.5 bg-slate-900/90 border border-white/10 rounded-full p-1 shadow-sm">
            <button
              onClick={onGoBack}
              disabled={!canGoBack}
              className={`p-1.5 rounded-full transition-all ${
                canGoBack
                  ? 'text-slate-200 hover:text-white hover:bg-white/10 active:scale-95 cursor-pointer'
                  : 'text-slate-600 cursor-not-allowed opacity-30'
              }`}
              title={canGoBack ? 'Go Back (Alt + ←)' : 'No previous page in history'}
              aria-label="Go Back"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={onGoForward}
              disabled={!canGoForward}
              className={`p-1.5 rounded-full transition-all ${
                canGoForward
                  ? 'text-slate-200 hover:text-white hover:bg-white/10 active:scale-95 cursor-pointer'
                  : 'text-slate-600 cursor-not-allowed opacity-30'
              }`}
              title={canGoForward ? 'Go Forward (Alt + →)' : 'No forward page in history'}
              aria-label="Go Forward"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Center Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 lg:gap-2">
          {[
            { id: 'home', label: 'Home' },
            { id: 'recommendations', label: 'Discover' },
            { id: 'chat', label: 'MovieChat ✦' },
            { id: 'clusters', label: 'Clusters' },
            { id: 'browse', label: 'Browse' },
            { id: 'analytics', label: 'Analytics' },
          ].map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id as ActiveTab)}
                className={`px-3.5 py-1.5 text-sm font-medium rounded-lg transition-all duration-200 ${
                  isActive
                    ? 'text-white bg-white/10 shadow-sm border border-white/10'
                    : 'text-slate-400 hover:text-slate-100 hover:bg-white/5'
                }`}
              >
                {item.label}
              </button>
            );
          })}

          <button
            onClick={onOpenProjectInfo}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg text-fuchsia-300 bg-fuchsia-950/40 border border-fuchsia-800/30 hover:bg-fuchsia-900/40 transition-all ml-1"
            title="Academic Project Overview (CO3 | L3)"
          >
            <Sparkles className="w-3.5 h-3.5 text-fuchsia-400" />
            <span>CO3 | L3 Specs</span>
          </button>
        </nav>

        {/* Right Section Actions */}
        <div className="flex items-center gap-2.5">
          {/* Quick Search */}
          <button
            onClick={onOpenSearch}
            className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-white/5 transition-colors"
            title="Search Movies"
            aria-label="Search Movies"
          >
            <Search className="w-4 h-4" />
          </button>

          {/* Watchlist Quick Access */}
          <button
            onClick={() => setActiveTab('browse')}
            className="relative p-2 text-slate-400 hover:text-white rounded-lg hover:bg-white/5 transition-colors"
            title="Saved Watchlist"
            aria-label="Saved Watchlist"
          >
            <Bookmark className="w-4 h-4" />
            {watchlistCount > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 text-[10px] font-bold bg-pink-500 text-white rounded-full flex items-center justify-center">
                {watchlistCount}
              </span>
            )}
          </button>

          {/* Persona Switcher Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowPersonaMenu(!showPersonaMenu)}
              className="flex items-center gap-2 pl-2 pr-3 py-1 rounded-full bg-slate-900/80 border border-slate-700/60 hover:border-violet-500/50 transition-all"
            >
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                className="w-7 h-7 rounded-full object-cover ring-1 ring-violet-500/50"
              />
              <span className="text-xs font-medium text-slate-200 hidden sm:inline-block max-w-[90px] truncate">
                {currentUser.name}
              </span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </button>

            {/* Dropdown Menu */}
            {showPersonaMenu && (
              <div 
                className="absolute right-0 mt-2 w-64 glass-panel-glow rounded-xl p-2 z-50 shadow-2xl border border-violet-500/30 animate-in fade-in zoom-in-95 duration-150"
                onMouseLeave={() => setShowPersonaMenu(false)}
              >
                <div className="px-3 py-2 border-b border-white/10 mb-1">
                  <div className="text-xs font-semibold text-slate-200">Switch User Persona</div>
                  <div className="text-[11px] text-slate-400">Experience ML recommendations through different user profiles</div>
                </div>

                <div className="space-y-1">
                  {PRESET_PERSONAS.map((persona) => {
                    const isSelected = persona.id === currentUser.id;
                    return (
                      <button
                        key={persona.id}
                        onClick={() => {
                          setCurrentUser(persona);
                          setShowPersonaMenu(false);
                        }}
                        className={`w-full flex items-center justify-between p-2 rounded-lg text-left text-xs transition-colors ${
                          isSelected ? 'bg-violet-600/30 text-white border border-violet-500/30' : 'hover:bg-white/5 text-slate-300'
                        }`}
                      >
                        <div className="flex items-center gap-2.5 overflow-hidden">
                          <img
                            src={persona.avatar}
                            alt={persona.name}
                            className="w-7 h-7 rounded-full object-cover flex-shrink-0"
                          />
                          <div className="truncate">
                            <div className="font-medium truncate">{persona.name}</div>
                            <div className="text-[10px] text-slate-400 truncate">{persona.role}</div>
                          </div>
                        </div>
                        {isSelected && <Check className="w-4 h-4 text-violet-400 flex-shrink-0" />}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
