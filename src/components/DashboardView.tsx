import React, { useState } from 'react';
import { Sparkles, Star, ChevronRight, Bookmark, ArrowUpRight, Film, Heart, Info, Play, Check } from 'lucide-react';
import { Movie, UserProfile, ClusterInfo } from '../types';
import { GENRES } from '../data/moviesData';

interface DashboardViewProps {
  currentUser: UserProfile;
  recommendedMovies: Movie[];
  clusterPicks: Movie[];
  userCluster: ClusterInfo;
  onSelectMovie: (movie: Movie) => void;
  onToggleWatchlist: (movieId: string) => void;
  onNavigateToClusters: () => void;
  onNavigateToBrowse: () => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  currentUser,
  recommendedMovies,
  clusterPicks,
  userCluster,
  onSelectMovie,
  onToggleWatchlist,
  onNavigateToClusters,
  onNavigateToBrowse,
}) => {
  const [selectedGenre, setSelectedGenre] = useState<string>('For You');

  // Filter movies if a genre is selected
  const displayedRecommendations = selectedGenre === 'For You' || selectedGenre === 'All'
    ? recommendedMovies
    : recommendedMovies.filter(m => m.genres.some(g => g.toLowerCase() === selectedGenre.toLowerCase()));

  // Calculate quick stats
  const ratedCount = Object.keys(currentUser.ratedMovies).length;
  const ratingValues = Object.values(currentUser.ratedMovies);
  const avgRating = ratingValues.length > 0
    ? (ratingValues.reduce((a, b) => a + b, 0) / ratingValues.length).toFixed(1)
    : '8.2';
  const preferredGenreCount = currentUser.preferredGenres.length || 6;

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Top Welcome Greeting Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-2 border-b border-white/5">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold font-display text-white tracking-tight flex items-center gap-2">
            <span>Good morning, {currentUser.name}</span>
            <span className="text-2xl">👋</span>
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Here are your personalized movie recommendations based on our ML pipeline.
          </p>
        </div>

        {/* Real-time ML status indicator */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-violet-950/40 border border-violet-500/20 text-xs text-violet-300">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <span>Model Active: Hybrid SVD + TF-IDF</span>
        </div>
      </div>

      {/* Genre Filter Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {GENRES.map((genre) => {
          const isActive = selectedGenre === genre;
          return (
            <button
              key={genre}
              onClick={() => setSelectedGenre(genre)}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-200 cursor-pointer ${
                isActive
                  ? 'bg-violet-600 text-white shadow-lg shadow-violet-600/30 scale-105'
                  : 'bg-slate-900/80 text-slate-400 hover:text-slate-200 hover:bg-slate-800 border border-white/5'
              }`}
            >
              {genre}
            </button>
          );
        })}
      </div>

      {/* Main Grid: Content + Right Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left 8-9 cols: Recommendation Shelves */}
        <div className="lg:col-span-8 xl:col-span-9 space-y-8">
          
          {/* 1. Recommended for You Shelf */}
          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold font-display text-white tracking-tight flex items-center gap-2">
                  <span>Recommended for You</span>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-violet-500/20 text-violet-300 border border-violet-500/30 font-mono">
                    Top Matches
                  </span>
                </h2>
                <p className="text-xs text-slate-400 mt-0.5">
                  Based on your viewing history & similar users
                </p>
              </div>

              <button
                onClick={onNavigateToBrowse}
                className="text-xs font-semibold text-violet-400 hover:text-violet-300 flex items-center gap-1 transition-colors"
              >
                <span>View All</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Poster Cards Carousel / Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-3.5 sm:gap-4">
              {displayedRecommendations.slice(0, 5).map((movie) => {
                const isWatchlisted = currentUser.watchlist.includes(movie.id);
                const userRating = currentUser.ratedMovies[movie.id];

                return (
                  <div
                    key={movie.id}
                    className="group relative rounded-xl overflow-hidden glass-card hover:border-violet-500/40 transition-all duration-300 flex flex-col cursor-pointer"
                    onClick={() => onSelectMovie(movie)}
                  >
                    {/* Poster Image */}
                    <div className="relative aspect-[2/3] w-full overflow-hidden bg-slate-900">
                      <img
                        src={movie.poster}
                        alt={movie.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                      
                      {/* Gradient overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#090d1a] via-transparent to-black/30 opacity-80 group-hover:opacity-60 transition-opacity" />

                      {/* Match Score Badge */}
                      <div className="absolute top-2 left-2 px-1.5 py-0.5 rounded-md bg-black/70 backdrop-blur-md border border-violet-500/40 text-[10px] font-bold text-violet-300">
                        {movie.matchScore || 94}%
                      </div>

                      {/* Quick Watchlist Button */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onToggleWatchlist(movie.id);
                        }}
                        className={`absolute top-2 right-2 p-1.5 rounded-full backdrop-blur-md transition-all ${
                          isWatchlisted
                            ? 'bg-pink-600 text-white shadow-md'
                            : 'bg-black/50 text-slate-300 hover:text-white hover:bg-black/80'
                        }`}
                        title={isWatchlisted ? 'Remove from Watchlist' : 'Add to Watchlist'}
                      >
                        <Bookmark className="w-3 h-3 fill-current" />
                      </button>

                      {/* Bottom Rating on Poster */}
                      <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between text-[11px]">
                        <div className="flex items-center gap-1 text-amber-300 font-bold bg-black/60 px-1.5 py-0.5 rounded backdrop-blur-sm">
                          <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                          <span>{movie.rating}</span>
                        </div>
                        {userRating && (
                          <div className="text-[10px] bg-violet-600/80 text-white px-1.5 py-0.5 rounded font-semibold">
                            You: {userRating}★
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Meta info */}
                    <div className="p-2.5 flex-1 flex flex-col justify-between bg-[#0b0f1e]/80">
                      <div>
                        <h3 className="text-xs font-bold text-white group-hover:text-violet-300 transition-colors line-clamp-1">
                          {movie.title}
                        </h3>
                        <p className="text-[10px] text-slate-400 line-clamp-1 mt-0.5">
                          {movie.genres.slice(0, 2).join(' · ')}
                        </p>
                      </div>

                      <div className="mt-2 pt-2 border-t border-white/5 flex items-center justify-between text-[10px] text-slate-400">
                        <span>{movie.year}</span>
                        <span className="text-violet-400 font-medium group-hover:translate-x-0.5 transition-transform flex items-center gap-0.5">
                          Details
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* 2. Top Picks from Your Cluster Shelf */}
          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold font-display text-white tracking-tight flex items-center gap-2">
                  <span>Top Picks from Your Cluster</span>
                  <span className="w-2 h-2 rounded-full bg-violet-400" />
                </h2>
                <p className="text-xs text-slate-400 mt-0.5">
                  Movies loved by users with similar tastes in {userCluster.name}
                </p>
              </div>

              <button
                onClick={onNavigateToClusters}
                className="text-xs font-semibold text-violet-400 hover:text-violet-300 flex items-center gap-1 transition-colors"
              >
                <span>Cluster Insights</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Horizontal Cluster Picks Row */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-3.5 sm:gap-4">
              {clusterPicks.slice(0, 5).map((movie) => {
                const isWatchlisted = currentUser.watchlist.includes(movie.id);

                return (
                  <div
                    key={`cluster_${movie.id}`}
                    className="group relative rounded-xl overflow-hidden glass-card hover:border-violet-500/40 transition-all duration-300 flex flex-col cursor-pointer"
                    onClick={() => onSelectMovie(movie)}
                  >
                    <div className="relative aspect-[2/3] w-full overflow-hidden bg-slate-900">
                      <img
                        src={movie.poster}
                        alt={movie.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#090d1a] via-transparent to-black/30" />
                      
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onToggleWatchlist(movie.id);
                        }}
                        className={`absolute top-2 right-2 p-1.5 rounded-full backdrop-blur-md transition-all ${
                          isWatchlisted
                            ? 'bg-pink-600 text-white'
                            : 'bg-black/50 text-slate-300 hover:text-white'
                        }`}
                      >
                        <Bookmark className="w-3 h-3 fill-current" />
                      </button>

                      <div className="absolute bottom-2 left-2 flex items-center gap-1 text-amber-300 font-bold bg-black/60 px-1.5 py-0.5 rounded backdrop-blur-sm text-[11px]">
                        <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                        <span>{movie.rating}</span>
                      </div>
                    </div>

                    <div className="p-2.5 bg-[#0b0f1e]/80">
                      <h3 className="text-xs font-bold text-white group-hover:text-violet-300 transition-colors line-clamp-1">
                        {movie.title}
                      </h3>
                      <p className="text-[10px] text-slate-400 line-clamp-1 mt-0.5">
                        {movie.genres.join(' · ')}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

        </div>

        {/* Right 3-4 cols: Cluster card, Quick stats, and Quote */}
        <div className="lg:col-span-4 xl:col-span-3 space-y-5">
          
          {/* Your Cluster Card matching mockup */}
          <div className="glass-panel-glow rounded-2xl p-5 border border-violet-500/30 relative overflow-hidden space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold uppercase tracking-wider text-violet-400 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-violet-400" />
                Your Cluster
              </span>
              <span className="text-xs text-slate-400 font-mono">
                {userCluster.percentage}% of users
              </span>
            </div>

            <div>
              <h3 className="text-base font-bold font-display text-white">
                {userCluster.label}
              </h3>
              <p className="text-xs text-violet-300/80 mt-1">
                {userCluster.topGenres.join(' · ')}
              </p>
              <p className="text-xs text-slate-400 mt-2 line-clamp-2 leading-relaxed">
                {userCluster.description}
              </p>
            </div>

            {/* Avatar stack + member count */}
            <div className="pt-2 border-t border-white/10 flex items-center justify-between">
              <div className="flex items-center -space-x-2">
                {userCluster.sampleUsers.slice(0, 4).map((user, idx) => (
                  <img
                    key={idx}
                    src={user.avatar}
                    alt={user.name}
                    className="w-7 h-7 rounded-full object-cover ring-2 ring-[#0f172a]"
                  />
                ))}
                <div className="w-7 h-7 rounded-full bg-violet-950 text-violet-300 ring-2 ring-[#0f172a] text-[10px] font-bold flex items-center justify-center">
                  +48
                </div>
              </div>

              <button
                onClick={onNavigateToClusters}
                className="text-xs font-semibold text-violet-300 hover:text-white flex items-center gap-1 transition-colors"
              >
                <span>View Details</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Quick Stats Card matching mockup */}
          <div className="glass-card rounded-2xl p-5 border border-white/10 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Quick Stats
            </h4>

            <div className="space-y-3.5">
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-white/5 border border-white/5">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400">
                    <Film className="w-4 h-4" />
                  </div>
                  <span className="text-xs text-slate-300">Total Movies Rated</span>
                </div>
                <span className="text-sm font-bold text-white font-mono">{ratedCount}</span>
              </div>

              <div className="flex items-center justify-between p-2.5 rounded-xl bg-white/5 border border-white/5">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-lg bg-violet-500/10 text-violet-400">
                    <Heart className="w-4 h-4" />
                  </div>
                  <span className="text-xs text-slate-300">Preferred Genres</span>
                </div>
                <span className="text-sm font-bold text-white font-mono">{preferredGenreCount}</span>
              </div>

              <div className="flex items-center justify-between p-2.5 rounded-xl bg-white/5 border border-white/5">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400">
                    <Star className="w-4 h-4" />
                  </div>
                  <span className="text-xs text-slate-300">Avg. Rating</span>
                </div>
                <span className="text-sm font-bold text-amber-300 font-mono">{avgRating} ★</span>
              </div>
            </div>
          </div>

          {/* Quote Card matching mockup */}
          <div className="glass-card rounded-2xl p-5 border border-purple-500/20 bg-gradient-to-br from-purple-950/30 to-pink-950/20 text-center relative overflow-hidden">
            <div className="text-2xl mb-2">🍿</div>
            <p className="text-sm font-medium text-purple-200 italic">
              "Great movies aren't just watched, they're felt."
            </p>
            <p className="text-[11px] text-purple-400/80 mt-2 uppercase tracking-widest font-semibold">
              CineVibe Editorial
            </p>
          </div>

        </div>

      </div>

    </div>
  );
};
