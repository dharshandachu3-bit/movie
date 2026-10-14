import React, { useState, useMemo } from 'react';
import { Search, Star, Bookmark, Filter, SlidersHorizontal, Check, Sparkles } from 'lucide-react';
import { Movie, UserProfile } from '../types';
import { GENRES } from '../data/moviesData';

interface BrowseViewProps {
  movies: Movie[];
  currentUser: UserProfile;
  onSelectMovie: (movie: Movie) => void;
  onToggleWatchlist: (movieId: string) => void;
}

export const BrowseView: React.FC<BrowseViewProps> = ({
  movies,
  currentUser,
  onSelectMovie,
  onToggleWatchlist,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('All');
  const [sortBy, setSortBy] = useState<'rating' | 'year' | 'match' | 'title'>('rating');
  const [filterWatchlistOnly, setFilterWatchlistOnly] = useState(false);

  // Filter and sort movies
  const filteredMovies = useMemo(() => {
    return movies.filter((movie) => {
      // Search query match in title, cast, director, or tags
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch = !query || (
        movie.title.toLowerCase().includes(query) ||
        movie.director.toLowerCase().includes(query) ||
        movie.cast.some(c => c.toLowerCase().includes(query)) ||
        movie.genres.some(g => g.toLowerCase().includes(query)) ||
        movie.tags.some(t => t.toLowerCase().includes(query))
      );

      // Genre match
      const matchesGenre = selectedGenre === 'All' || selectedGenre === 'For You'
        ? true
        : movie.genres.some(g => g.toLowerCase() === selectedGenre.toLowerCase());

      // Watchlist filter
      const matchesWatchlist = !filterWatchlistOnly || currentUser.watchlist.includes(movie.id);

      return matchesSearch && matchesGenre && matchesWatchlist;
    }).sort((a, b) => {
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'year') return b.year - a.year;
      if (sortBy === 'match') return (b.matchScore || 0) - (a.matchScore || 0);
      return a.title.localeCompare(b.title);
    });
  }, [movies, searchQuery, selectedGenre, sortBy, filterWatchlistOnly, currentUser.watchlist]);

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* Top Header & Search Input matching mockup */}
      <div className="space-y-4 pb-2 border-b border-white/5">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold font-display text-white tracking-tight">
            Browse Movies
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Explore all movies and filter by your interests or personal taste vectors.
          </p>
        </div>

        {/* Search Bar + Controls */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          
          {/* Search Input */}
          <div className="relative flex-1 max-w-lg">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search movies, actors, genres..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900/80 border border-white/10 text-sm text-white placeholder-slate-400 focus:outline-none focus:border-violet-500/60 focus:ring-1 focus:ring-violet-500/60 transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-white"
              >
                Clear
              </button>
            )}
          </div>

          {/* Sort & Watchlist Toggle */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setFilterWatchlistOnly(!filterWatchlistOnly)}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold border transition-all ${
                filterWatchlistOnly
                  ? 'bg-pink-600/30 text-pink-300 border-pink-500/40 shadow-sm'
                  : 'glass-card text-slate-300 hover:text-white border-white/10'
              }`}
            >
              <Bookmark className="w-3.5 h-3.5 fill-current" />
              <span>Watchlist ({currentUser.watchlist.length})</span>
            </button>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="px-3 py-2 rounded-xl text-xs font-semibold bg-slate-900 border border-white/10 text-slate-200 focus:outline-none focus:border-violet-500"
            >
              <option value="rating">Sort: Top Rated</option>
              <option value="match">Sort: Match %</option>
              <option value="year">Sort: Release Year</option>
              <option value="title">Sort: Title (A-Z)</option>
            </select>
          </div>

        </div>

        {/* Genre Filter Chips matching mockup */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {GENRES.map((genre) => {
            const isActive = selectedGenre === genre;
            return (
              <button
                key={genre}
                onClick={() => setSelectedGenre(genre)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'bg-violet-600 text-white shadow-md shadow-violet-600/25'
                    : 'bg-slate-900/80 text-slate-400 hover:text-slate-200 hover:bg-slate-800 border border-white/5'
                }`}
              >
                {genre}
              </button>
            );
          })}
        </div>
      </div>

      {/* Movies Grid */}
      {filteredMovies.length === 0 ? (
        <div className="glass-card rounded-2xl p-12 text-center space-y-3">
          <div className="text-3xl">🎬</div>
          <h3 className="text-base font-bold text-white">No Movies Found</h3>
          <p className="text-xs text-slate-400 max-w-sm mx-auto">
            Try adjusting your search query, selecting another genre, or clearing filters.
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedGenre('All');
              setFilterWatchlistOnly(false);
            }}
            className="px-4 py-2 rounded-lg bg-violet-600 text-white text-xs font-semibold hover:bg-violet-500"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {filteredMovies.map((movie) => {
            const isWatchlisted = currentUser.watchlist.includes(movie.id);
            const userRating = currentUser.ratedMovies[movie.id];

            return (
              <div
                key={movie.id}
                onClick={() => onSelectMovie(movie)}
                className="group relative rounded-xl overflow-hidden glass-card hover:border-violet-500/40 transition-all duration-300 flex flex-col cursor-pointer"
              >
                <div className="relative aspect-[2/3] w-full overflow-hidden bg-slate-900">
                  <img
                    src={movie.poster}
                    alt={movie.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  
                  <div className="absolute inset-0 bg-gradient-to-t from-[#090d1a] via-transparent to-black/25 opacity-70 group-hover:opacity-40 transition-opacity" />

                  {/* Rating badge on poster */}
                  <div className="absolute bottom-2 left-2 flex items-center gap-1 text-amber-300 font-bold bg-black/60 px-1.5 py-0.5 rounded backdrop-blur-sm text-[11px]">
                    <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                    <span>{movie.rating}</span>
                  </div>

                  {/* Match percentage pill */}
                  {movie.matchScore && (
                    <div className="absolute top-2 left-2 px-1.5 py-0.5 rounded bg-violet-950/80 backdrop-blur-sm border border-violet-500/30 text-[10px] font-bold text-violet-300">
                      {movie.matchScore}% Match
                    </div>
                  )}

                  {/* Watchlist toggle */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleWatchlist(movie.id);
                    }}
                    className={`absolute top-2 right-2 p-1.5 rounded-full backdrop-blur-md transition-all ${
                      isWatchlisted
                        ? 'bg-pink-600 text-white shadow-md'
                        : 'bg-black/50 text-slate-300 hover:text-white'
                    }`}
                  >
                    <Bookmark className="w-3 h-3 fill-current" />
                  </button>
                </div>

                <div className="p-3 flex-1 flex flex-col justify-between bg-[#0b0f1e]/80">
                  <div>
                    <h3 className="text-xs font-bold text-white group-hover:text-violet-300 transition-colors line-clamp-1">
                      {movie.title}
                    </h3>
                    <p className="text-[10px] text-slate-400 line-clamp-1 mt-0.5">
                      {movie.genres.join(' · ')}
                    </p>
                  </div>

                  <div className="mt-2.5 pt-2 border-t border-white/5 flex items-center justify-between text-[10px] text-slate-400">
                    <span>{movie.year}</span>
                    {userRating ? (
                      <span className="text-violet-300 font-bold font-mono">
                        Rated {userRating}★
                      </span>
                    ) : (
                      <span className="text-slate-500 group-hover:text-slate-300">
                        {movie.duration}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

    </div>
  );
};
