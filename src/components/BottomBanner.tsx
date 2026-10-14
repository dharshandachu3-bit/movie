import React from 'react';
import { Film, Users, Sparkles, Heart, Crown, Smile } from 'lucide-react';

interface BottomBannerProps {
  onExplore: () => void;
}

export const BottomBanner: React.FC<BottomBannerProps> = ({ onExplore }) => {
  return (
    <div className="mt-12 rounded-2xl glass-panel-glow border border-violet-500/30 overflow-hidden relative p-6 sm:p-10 bg-gradient-to-r from-violet-950/40 via-[#0a0f24] to-pink-950/30 shadow-2xl">
      {/* Background neon ambient */}
      <div className="absolute top-0 right-1/4 w-72 h-72 bg-violet-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/3 w-64 h-64 bg-pink-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
        
        {/* Left Side: Tagline & Community Illustration */}
        <div className="lg:col-span-6 space-y-4 text-center lg:text-left">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-500/15 border border-pink-500/30 text-pink-300 text-xs font-bold">
            <Heart className="w-3.5 h-3.5 fill-pink-400 text-pink-400" />
            <span>Community of 1,200+ Cinephiles</span>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold font-display text-white leading-tight">
            Different People. <br />
            <span className="bg-gradient-to-r from-pink-400 via-fuchsia-400 to-violet-400 bg-clip-text text-transparent">
              Different Vibes.
            </span> <br />
            Same Love for Movies.
          </h2>

          <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto lg:mx-0 leading-relaxed">
            Whether you dissect Denis Villeneuve's sound design or unwind with 90s comfort comedies, CineVibe groups you with people who share your exact cinematic DNA.
          </p>

          <div className="pt-2 flex items-center justify-center lg:justify-start gap-4">
            <button
              onClick={onExplore}
              className="px-6 py-2.5 rounded-full text-xs font-bold text-white bg-gradient-to-r from-violet-600 to-pink-600 hover:from-violet-500 hover:to-pink-500 shadow-lg shadow-violet-600/30 transition-all cursor-pointer"
            >
              Join Your Tribe
            </button>
            <span className="text-xs text-slate-400 flex items-center gap-1 font-mono">
              <Crown className="w-3.5 h-3.5 text-amber-400" />
              <span>CO3 | L3 Machine Learning Engine</span>
            </span>
          </div>
        </div>

        {/* Right Side: 4 Core Pillars Grid */}
        <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          <div className="p-3.5 rounded-xl glass-card border border-white/10 hover:border-violet-500/40 transition-all">
            <div className="text-violet-400 font-bold text-xs flex items-center gap-2 mb-1">
              <Sparkles className="w-4 h-4" />
              <span>Personalized Recs</span>
            </div>
            <p className="text-[11px] text-slate-400">Just for you, calculated across 30+ dimensional feature spaces.</p>
          </div>

          <div className="p-3.5 rounded-xl glass-card border border-white/10 hover:border-cyan-500/40 transition-all">
            <div className="text-cyan-400 font-bold text-xs flex items-center gap-2 mb-1">
              <Users className="w-4 h-4" />
              <span>Smarter Clusters</span>
            </div>
            <p className="text-[11px] text-slate-400">Find your tribe with K-Means unsupervised latent clustering.</p>
          </div>

          <div className="p-3.5 rounded-xl glass-card border border-white/10 hover:border-pink-500/40 transition-all">
            <div className="text-pink-400 font-bold text-xs flex items-center gap-2 mb-1">
              <Film className="w-4 h-4" />
              <span>Data-Driven Insights</span>
            </div>
            <p className="text-[11px] text-slate-400">Transparent metrics including Precision@10 and NDCG rank gain.</p>
          </div>

          <div className="p-3.5 rounded-xl glass-card border border-white/10 hover:border-amber-500/40 transition-all">
            <div className="text-amber-400 font-bold text-xs flex items-center gap-2 mb-1">
              <Smile className="w-4 h-4" />
              <span>Movies + People</span>
            </div>
            <p className="text-[11px] text-slate-400">Better together. Share ratings, watchlists, and hidden gems.</p>
          </div>
        </div>

      </div>
    </div>
  );
};
