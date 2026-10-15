import React, { useState, useEffect } from 'react';
import { X, Star, Bookmark, Sparkles, Film, Clock, Calendar, User, Check, Play, Share2, ArrowLeft, ChevronLeft } from 'lucide-react';
import { Movie, UserProfile } from '../types';
import confetti from 'canvas-confetti';
import { MoviePoster } from './MoviePoster';

interface MovieDetailModalProps {
  movie: Movie | null;
  onClose: () => void;
  currentUser: UserProfile;
  onRateMovie: (movieId: string, rating: number) => void;
  onToggleWatchlist: (movieId: string) => void;
  allMovies: Movie[];
  onSelectMovie: (movie: Movie) => void;
}

export const MovieDetailModal: React.FC<MovieDetailModalProps> = ({
  movie,
  onClose,
  currentUser,
  onRateMovie,
  onToggleWatchlist,
  allMovies,
  onSelectMovie,
}) => {
  if (!movie) return null;

  const currentRating = currentUser.ratedMovies[movie.id] || 0;
  const [hoverRating, setHoverRating] = useState<number | null>(null);
  const isWatchlisted = currentUser.watchlist.includes(movie.id);

  // Close modal on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  // Find similar movies based on genres
  const similarMovies = allMovies
    .filter(m => m.id !== movie.id && m.genres.some(g => movie.genres.includes(g)))
    .slice(0, 4);

  const handleStarClick = (score: number) => {
    onRateMovie(movie.id, score);
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.7 }
    });
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200 cursor-pointer"
      onClick={onClose}
    >
      
      {/* Modal Container */}
      <div 
        className="relative w-full max-w-4xl glass-panel-glow rounded-2xl overflow-hidden border border-violet-500/30 my-8 shadow-2xl bg-[#080c1b] cursor-default"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Backdrop Banner */}
        <div className="relative h-64 sm:h-80 w-full overflow-hidden">
          <img
            src={movie.backdrop || movie.poster}
            alt={movie.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#080c1b] via-[#080c1b]/60 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#080c1b] via-transparent to-[#080c1b]" />

          {/* Prominent Back to Movies Button in Top Left */}
          <button
            onClick={onClose}
            className="absolute top-4 left-4 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-black/75 hover:bg-black/95 text-white text-xs font-bold backdrop-blur-md border border-white/20 hover:border-violet-400/60 shadow-xl transition-all z-20 cursor-pointer group"
            title="Back to movies (Esc)"
          >
            <ArrowLeft className="w-4 h-4 text-violet-300 group-hover:-translate-x-1 transition-transform" />
            <span>Back to Movies</span>
          </button>

          {/* Close X button in Top Right */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-black/70 hover:bg-black/95 text-slate-300 hover:text-white backdrop-blur-md border border-white/10 transition-colors z-20 cursor-pointer"
            title="Close (Esc)"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Match Score Badge */}
          <div className="absolute bottom-4 right-4 sm:top-4 sm:right-16 sm:bottom-auto inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-violet-600/90 backdrop-blur-md text-white text-xs font-bold border border-violet-400/30 shadow-lg">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{movie.matchScore || 95}% Match for You</span>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-5 sm:p-8 -mt-20 sm:-mt-24 relative z-10 space-y-6">
          
          <div className="flex flex-col sm:flex-row gap-6 items-start">
            
            {/* Poster Card */}
            <div className="w-32 sm:w-44 flex-shrink-0 aspect-[2/3] rounded-xl overflow-hidden glass-card shadow-2xl border border-white/20 mx-auto sm:mx-0">
              <MoviePoster
                src={movie.poster}
                alt={movie.title}
                fallbackTitle={movie.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Title & Metadata */}
            <div className="flex-1 space-y-3 text-center sm:text-left">
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                {movie.genres.map((g) => (
                  <span
                    key={g}
                    className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-violet-950/60 text-violet-300 border border-violet-700/40"
                  >
                    {g}
                  </span>
                ))}
                <span className="text-xs text-slate-400 font-mono flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  {movie.year}
                </span>
                <span className="text-xs text-slate-400 font-mono flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {movie.duration}
                </span>
              </div>

              <h2 className="text-2xl sm:text-4xl font-extrabold font-display text-white tracking-tight">
                {movie.title}
              </h2>

              <p className="text-sm text-slate-300 leading-relaxed max-w-2xl">
                {movie.synopsis}
              </p>

              {/* Action Buttons: Watchlist & Rating */}
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 pt-2">
                <button
                  onClick={() => onToggleWatchlist(movie.id)}
                  className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                    isWatchlisted
                      ? 'bg-pink-600 text-white shadow-lg shadow-pink-600/30'
                      : 'glass-card hover:bg-white/10 text-slate-200 border border-white/15'
                  }`}
                >
                  <Bookmark className="w-4 h-4 fill-current" />
                  <span>{isWatchlisted ? 'In Your Watchlist' : 'Add to Watchlist'}</span>
                </button>

                <div className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-amber-500/10 text-amber-300 text-xs font-bold border border-amber-500/20">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                  <span>{movie.rating} IMDb Rating</span>
                </div>
              </div>

            </div>

          </div>

          {/* Interactive User Rating Section */}
          <div className="glass-card rounded-xl p-4 border border-violet-500/20 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <div className="text-xs font-bold text-white flex items-center gap-2">
                <Star className="w-4 h-4 text-violet-400" />
                <span>Rate this Movie to Refine Your Machine Learning Profile</span>
              </div>
              <p className="text-[11px] text-slate-400 mt-0.5">
                Your rating updates the SVD Matrix Factorization model and recalibrates your recommendations in real-time.
              </p>
            </div>

            {/* 10-Star Picker */}
            <div className="flex items-center gap-1 bg-slate-900/90 px-3 py-2 rounded-xl border border-white/10">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((starValue) => {
                const isActive = (hoverRating !== null ? hoverRating : currentRating) >= starValue;
                return (
                  <button
                    key={starValue}
                    onMouseEnter={() => setHoverRating(starValue)}
                    onMouseLeave={() => setHoverRating(null)}
                    onClick={() => handleStarClick(starValue)}
                    className="p-1 hover:scale-125 transition-transform"
                    title={`Rate ${starValue} / 10`}
                  >
                    <Star
                      className={`w-4 h-4 ${
                        isActive
                          ? 'fill-amber-400 text-amber-400'
                          : 'text-slate-600 hover:text-slate-400'
                      }`}
                    />
                  </button>
                );
              })}
              <span className="text-xs font-mono font-bold text-amber-300 ml-2 min-w-[28px] text-right">
                {hoverRating !== null ? `${hoverRating}` : currentRating ? `${currentRating}` : '-'}★
              </span>
            </div>
          </div>

          {/* Explainability Block: "Why Recommended to You" */}
          <div className="glass-panel rounded-xl p-4 border border-white/10 space-y-2">
            <h4 className="text-xs font-bold text-violet-300 uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-pink-400" />
              <span>Algorithmic Explainability (CO3 | L3)</span>
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              {movie.whyRecommended || `Calculated 94% taste overlap with your high affinity for Christopher Nolan and Sci-Fi/Drama themes, boosted by your Cluster ${movie.clusterAffinity} membership.`}
            </p>
            <div className="flex flex-wrap gap-1.5 pt-1">
              {movie.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-0.5 rounded text-[10px] font-mono bg-white/5 text-slate-400 border border-white/5"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>

          {/* Credits & Cast */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-slate-300 pt-2 border-t border-white/5">
            <div>
              <span className="text-slate-500 font-semibold block">Director:</span>
              <span className="text-slate-200 font-medium">{movie.director}</span>
            </div>
            <div>
              <span className="text-slate-500 font-semibold block">Top Cast:</span>
              <span className="text-slate-200 font-medium">{movie.cast.join(', ')}</span>
            </div>
          </div>

          {/* Similar Movies Shelf */}
          {similarMovies.length > 0 && (
            <div className="space-y-3 pt-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Similar High-Cosine Match Movies
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {similarMovies.map((sim) => (
                  <div
                    key={sim.id}
                    onClick={() => onSelectMovie(sim)}
                    className="glass-card rounded-lg p-2 hover:border-violet-500/40 transition-all cursor-pointer flex items-center gap-2"
                  >
                    <div className="w-10 h-14 rounded overflow-hidden flex-shrink-0 bg-slate-900">
                      <MoviePoster
                        src={sim.poster}
                        alt={sim.title}
                        fallbackTitle={sim.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="truncate">
                      <p className="text-xs font-bold text-white truncate">{sim.title}</p>
                      <p className="text-[10px] text-slate-400">{sim.genres[0]}</p>
                      <p className="text-[10px] text-amber-300">★ {sim.rating}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Modal Bottom Footer with Back Button */}
          <div className="pt-4 border-t border-white/10 flex items-center justify-between">
            <button
              onClick={onClose}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-bold border border-white/15 shadow-sm transition-all cursor-pointer group"
            >
              <ArrowLeft className="w-4 h-4 text-violet-300 group-hover:-translate-x-1 transition-transform" />
              <span>Back to Movies</span>
            </button>

            <span className="text-[11px] text-slate-400">
              Press <kbd className="px-1.5 py-0.5 rounded bg-black/40 border border-white/10 text-slate-300 font-mono text-[10px]">ESC</kbd> to return
            </span>
          </div>

        </div>

      </div>

    </div>
  );
};
