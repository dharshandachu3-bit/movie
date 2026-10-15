import React from 'react';
import { Home, Sparkles, Users, LayoutGrid, BarChart3, Settings, LogOut, Film, Award, X, Bot } from 'lucide-react';
import { ActiveTab, UserProfile } from '../types';

interface SidebarProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  currentUser: UserProfile;
  isOpenMobile: boolean;
  onCloseMobile: () => void;
  onOpenProjectInfo: () => void;
  onResetTasteProfile: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  setActiveTab,
  currentUser,
  isOpenMobile,
  onCloseMobile,
  onOpenProjectInfo,
  onResetTasteProfile,
}) => {
  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'recommendations', label: 'Recommendations', icon: Sparkles },
    { id: 'chat', label: 'MovieChat AI', icon: Bot },
    { id: 'clusters', label: 'User Clusters', icon: Users },
    { id: 'browse', label: 'Browse Movies', icon: LayoutGrid },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
  ];

  const content = (
    <div className="flex flex-col h-full justify-between p-4 bg-[#070b1a]/95 border-r border-white/10 select-none">
      
      {/* Top Brand & Profile */}
      <div className="space-y-6">
        
        {/* Brand */}
        <div className="flex items-center justify-between">
          <div 
            onClick={() => {
              setActiveTab('home');
              onCloseMobile();
            }}
            className="flex items-center gap-2.5 cursor-pointer group"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-violet-600 via-fuchsia-600 to-pink-500 p-0.5 shadow-md shadow-violet-500/20">
              <div className="w-full h-full bg-[#090d1a] rounded-[10px] flex items-center justify-center">
                <Film className="w-4 h-4 text-violet-400 group-hover:text-pink-400 transition-colors" />
              </div>
            </div>
            <span className="text-lg font-bold font-display tracking-tight text-white">
              Cine<span className="text-violet-400">Vibe</span>
            </span>
          </div>

          {/* Close for mobile */}
          <button
            onClick={onCloseMobile}
            className="lg:hidden p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/5"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* User Profile Card matching mockup */}
        <div className="p-3 rounded-xl bg-white/5 border border-white/5 flex items-center gap-3">
          <div className="relative">
            <img
              src={currentUser.avatar}
              alt={currentUser.name}
              className="w-10 h-10 rounded-full object-cover ring-2 ring-violet-500/40"
            />
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-400 ring-2 ring-slate-900" />
          </div>
          <div className="overflow-hidden">
            <div className="text-sm font-bold text-white truncate flex items-center gap-1">
              <span>{currentUser.name}</span>
            </div>
            <div className="text-[11px] text-violet-300 truncate">
              {currentUser.role}
            </div>
          </div>
        </div>

        {/* Nav Items */}
        <nav className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;

            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id as ActiveTab);
                  onCloseMobile();
                }}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all duration-150 ${
                  isActive
                    ? 'bg-violet-600/30 text-white border border-violet-500/40 shadow-sm'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-violet-400' : 'text-slate-400'}`} />
                <span>{item.label}</span>
              </button>
            );
          })}

          <button
            onClick={() => {
              onOpenProjectInfo();
              onCloseMobile();
            }}
            className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold text-fuchsia-300 hover:bg-fuchsia-950/40 transition-colors"
          >
            <Award className="w-4 h-4 text-fuchsia-400" />
            <span>CO3 | L3 Academic Info</span>
          </button>
        </nav>

      </div>

      {/* Bottom Footer Actions */}
      <div className="pt-4 border-t border-white/5 space-y-1">
        <button
          onClick={onResetTasteProfile}
          className="w-full flex items-center gap-3 px-3.5 py-2 rounded-xl text-xs font-medium text-slate-400 hover:text-rose-300 hover:bg-rose-950/20 transition-colors"
          title="Reset Ratings and Profile"
        >
          <LogOut className="w-4 h-4" />
          <span>Reset Taste Profile</span>
        </button>
      </div>

    </div>
  );

  return (
    <>
      {/* Desktop Sidebar (hidden on mobile) */}
      <aside className="hidden lg:block w-64 flex-shrink-0 sticky top-16 h-[calc(100vh-4rem)]">
        {content}
      </aside>

      {/* Mobile Drawer */}
      {isOpenMobile && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="fixed inset-0 bg-black/70 backdrop-blur-sm"
            onClick={onCloseMobile}
          />
          <div className="fixed inset-y-0 left-0 w-72 max-w-full">
            {content}
          </div>
        </div>
      )}
    </>
  );
};
