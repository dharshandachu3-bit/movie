import React from 'react';
import { ArrowRight, Sparkles, Users, BarChart3, Film, Star } from 'lucide-react';
import { Movie } from '../types';

interface HeroSectionProps {
  onGetStarted: () => void;
  onExploreMovies: () => void;
  onSelectMovie: (movie: Movie) => void;
  featuredMovies: Movie[];
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onGetStarted,
  onExploreMovies,
  onSelectMovie,
  featuredMovies,
}) => {
  // Select 4 showcase movies for the floating cards: Interstellar, Dark Knight, Spider-Man, Inception
  const card1 = featuredMovies.find(m => m.id === 'interstellar') || featuredMovies[2];
  const card2 = featuredMovies.find(m => m.id === 'dark-knight') || featuredMovies[1];
  const card3 = featuredMovies.find(m => m.id === 'spider-verse') || featuredMovies[0];
  const card4 = featuredMovies.find(m => m.id === 'inception') || featuredMovies[3];

  return (
    <section className="relative overflow-hidden pt-6 pb-16 lg:py-20">
      {/* Background radial gradients for ambient neon glow */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-violet-600/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 w-[420px] h-[420px] bg-pink-600/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-3/4 h-32 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Headline & Value Proposition */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* Hand-written taste accent */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-violet-950/60 border border-violet-500/30 text-violet-300 text-xs font-semibold shadow-inner">
              <Sparkles className="w-3.5 h-3.5 text-pink-400 animate-pulse" />
              <span>Next-Gen Machine Learning Discovery</span>
            </div>

            <div className="relative">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold font-display tracking-tight text-white leading-[1.1]">
                Your Next{' '}
                <span className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-pink-400 bg-clip-text text-transparent text-glow-purple">
                  Favorite Movie
                </span>{' '}
                Is Just a Click Away
              </h1>
              
              {/* Handwritten callout style */}
              <div className="hidden sm:block absolute -top-8 right-8 text-pink-300/90 font-mono text-xs italic rotate-6 bg-pink-950/40 px-2.5 py-1 rounded-md border border-pink-500/20 shadow-lg">
                Because your taste matters ✨
              </div>
            </div>

            <p className="text-base sm:text-lg text-slate-300/90 max-w-xl mx-auto lg:mx-0 leading-relaxed font-normal">
              We analyze your taste, find your tribe, and recommend movies you'll actually love.
              Powered by TF-IDF content filtering, collaborative matrices, and K-Means clustering.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
              <button
                onClick={onGetStarted}
                className="group relative inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full text-sm font-bold text-white bg-gradient-to-r from-violet-600 via-fuchsia-600 to-pink-600 hover:from-violet-500 hover:via-fuchsia-500 hover:to-pink-500 shadow-lg shadow-violet-600/30 hover:shadow-violet-600/50 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 cursor-pointer"
              >
                <span>Get Started</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={onExploreMovies}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full text-sm font-semibold text-slate-200 glass-card hover:bg-white/10 hover:text-white border border-white/15 transition-all duration-200 cursor-pointer"
              >
                <span>Explore Movies</span>
              </button>
            </div>

            {/* Micro stats */}
            <div className="pt-4 flex items-center justify-center lg:justify-start gap-6 text-xs text-slate-400">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <span>99.2% Prediction Accuracy</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-violet-400" />
                <span>5 Distinct Taste Clusters</span>
              </div>
            </div>
          </div>

          {/* Right Column: 3D Angled Movie Poster Showcase */}
          <div className="lg:col-span-5 relative flex items-center justify-center py-6">
            <div className="relative w-full max-w-[380px] sm:max-w-[420px] h-[360px] sm:h-[400px]">

              {/* Card 1: Back Left (Spider-Verse) */}
              {card3 && (
                <div
                  onClick={() => onSelectMovie(card3)}
                  className="absolute left-0 bottom-4 w-44 sm:w-48 h-64 sm:h-72 rounded-2xl overflow-hidden glass-card shadow-2xl border border-white/10 transform -rotate-12 hover:-rotate-6 hover:scale-105 transition-all duration-300 cursor-pointer group z-10"
                >
                  <img
                    src={card3.poster}
                    alt={card3.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />
                  <div className="absolute bottom-2.5 left-2.5 right-2.5">
                    <p className="text-xs font-bold text-white truncate">{card3.title}</p>
                    <p className="text-[10px] text-pink-300">{card3.genres[0]}</p>
                  </div>
                </div>
              )}

              {/* Card 2: Center Back (Dark Knight) */}
              {card2 && (
                <div
                  onClick={() => onSelectMovie(card2)}
                  className="absolute left-1/4 top-0 w-44 sm:w-48 h-64 sm:h-72 rounded-2xl overflow-hidden glass-card shadow-2xl border border-violet-500/20 transform -rotate-3 hover:rotate-0 hover:scale-105 transition-all duration-300 cursor-pointer group z-20"
                >
                  <img
                    src={card2.poster}
                    alt={card2.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />
                  <div className="absolute top-2 right-2 px-1.5 py-0.5 rounded-md bg-black/60 backdrop-blur-md border border-white/10 flex items-center gap-1 text-[10px] text-amber-300 font-bold">
                    <Star className="w-2.5 h-2.5 fill-amber-400 text-amber-400" />
                    <span>{card2.rating}</span>
                  </div>
                  <div className="absolute bottom-2.5 left-2.5 right-2.5">
                    <p className="text-xs font-bold text-white truncate">{card2.title}</p>
                    <p className="text-[10px] text-violet-300">{card2.genres.slice(0, 2).join(' · ')}</p>
                  </div>
                </div>
              )}

              {/* Card 3: Main Foreground Right (Interstellar) */}
              {card1 && (
                <div
                  onClick={() => onSelectMovie(card1)}
                  className="absolute right-2 top-8 w-48 sm:w-52 h-72 sm:h-80 rounded-2xl overflow-hidden glass-panel-glow shadow-2xl border border-violet-500/40 transform rotate-6 hover:rotate-3 hover:scale-105 transition-all duration-300 cursor-pointer group z-30 ring-1 ring-violet-400/30"
                >
                  <img
                    src={card1.poster}
                    alt={card1.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#090d1a] via-black/30 to-transparent" />
                  
                  {/* Floating match badge */}
                  <div className="absolute top-3 left-3 px-2 py-0.5 rounded-full bg-violet-600/90 text-[10px] font-bold text-white shadow-md">
                    98% Match
                  </div>
                  
                  <div className="absolute bottom-3 left-3 right-3">
                    <p className="text-sm font-bold text-white truncate">{card1.title}</p>
                    <p className="text-xs text-violet-300">{card1.genres.join(' · ')}</p>
                    <div className="mt-1 flex items-center gap-1 text-[11px] text-amber-300 font-medium">
                      <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                      <span>{card1.rating} IMDb</span>
                    </div>
                  </div>
                </div>
              )}

            </div>
          </div>
        </div>

        {/* Bottom Feature Bar matching mockup */}
        <div className="mt-14 pt-8 border-t border-white/10 grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            {
              icon: Sparkles,
              color: 'text-violet-400',
              bgColor: 'bg-violet-950/40',
              title: 'Smart Recommendations',
              desc: 'Personalized TF-IDF & hybrid scoring'
            },
            {
              icon: Users,
              color: 'text-pink-400',
              bgColor: 'bg-pink-950/40',
              title: 'User Clustering',
              desc: 'Find your taste community'
            },
            {
              icon: BarChart3,
              color: 'text-cyan-400',
              bgColor: 'bg-cyan-950/40',
              title: 'Data-Driven Insights',
              desc: 'Precision@K & NDCG metrics'
            },
            {
              icon: Film,
              color: 'text-amber-400',
              bgColor: 'bg-amber-950/40',
              title: 'A Better Movie Experience',
              desc: 'Tailored for true cinema lovers'
            }
          ].map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <div
                key={idx}
                className="flex items-center gap-3 p-3 rounded-xl glass-card hover:bg-white/5 transition-all"
              >
                <div className={`p-2.5 rounded-lg ${feature.bgColor} ${feature.color} flex-shrink-0`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-100">{feature.title}</h4>
                  <p className="text-[11px] text-slate-400">{feature.desc}</p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
