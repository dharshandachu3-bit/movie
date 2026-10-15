import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';
import { HeroSection } from './components/HeroSection';
import { DashboardView } from './components/DashboardView';
import { ClustersView } from './components/ClustersView';
import { BrowseView } from './components/BrowseView';
import { AnalyticsView } from './components/AnalyticsView';
import { MovieDetailModal } from './components/MovieDetailModal';
import { ProjectInfoModal } from './components/ProjectInfoModal';
import { BottomBanner } from './components/BottomBanner';
import { MovieChat } from './components/MovieChat';
import { MOVIES } from './data/moviesData';
import { DEFAULT_USER, CLUSTERS } from './data/clustersData';
import { ActiveTab, Movie, UserProfile } from './types';
import {
  generateRecommendations,
  calculateEvaluationMetrics,
  DEFAULT_ALGO_CONFIG,
  AlgorithmConfig,
} from './services/recommenderEngine';
import { Menu, Sparkles, Film, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';

interface NavigationHistoryEntry {
  tab: ActiveTab;
  movieId?: string | null;
}

export default function App() {
  const [activeTab, setActiveTabState] = useState<ActiveTab>('home');
  const [currentUser, setCurrentUser] = useState<UserProfile>(DEFAULT_USER);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [isProjectInfoOpen, setIsProjectInfoOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [algoConfig, setAlgoConfig] = useState<AlgorithmConfig>(DEFAULT_ALGO_CONFIG);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = useCallback((msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2800);
  }, []);

  // Navigation History Stack
  const [historyStack, setHistoryStack] = useState<NavigationHistoryEntry[]>([
    { tab: 'home', movieId: null },
  ]);
  const [historyPointer, setHistoryPointer] = useState<number>(0);

  // Navigate function that records history
  const navigateTo = useCallback((tab: ActiveTab, movieId: string | null = null) => {
    setActiveTabState(tab);
    if (movieId) {
      const movie = MOVIES.find(m => m.id === movieId) || null;
      setSelectedMovie(movie);
    } else {
      setSelectedMovie(null);
    }

    setHistoryStack(prev => {
      const truncated = prev.slice(0, historyPointer + 1);
      const currentEntry = truncated[truncated.length - 1];
      if (currentEntry && currentEntry.tab === tab && currentEntry.movieId === movieId) {
        return truncated;
      }
      const next = [...truncated, { tab, movieId }];
      setHistoryPointer(next.length - 1);
      return next;
    });
  }, [historyPointer]);

  // Back navigation
  const handleGoBack = useCallback(() => {
    // If a movie details modal is open, back closes it
    if (selectedMovie) {
      setSelectedMovie(null);
      return;
    }

    if (historyPointer > 0) {
      const targetIdx = historyPointer - 1;
      const targetEntry = historyStack[targetIdx];
      setHistoryPointer(targetIdx);
      setActiveTabState(targetEntry.tab);
      if (targetEntry.movieId) {
        setSelectedMovie(MOVIES.find(m => m.id === targetEntry.movieId) || null);
      } else {
        setSelectedMovie(null);
      }
    }
  }, [selectedMovie, historyPointer, historyStack]);

  // Forward navigation
  const handleGoForward = useCallback(() => {
    if (historyPointer < historyStack.length - 1) {
      const targetIdx = historyPointer + 1;
      const targetEntry = historyStack[targetIdx];
      setHistoryPointer(targetIdx);
      setActiveTabState(targetEntry.tab);
      if (targetEntry.movieId) {
        setSelectedMovie(MOVIES.find(m => m.id === targetEntry.movieId) || null);
      } else {
        setSelectedMovie(null);
      }
    }
  }, [historyPointer, historyStack]);

  // Keyboard shortcuts: Alt + ArrowLeft / Alt + ArrowRight
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.altKey && e.key === 'ArrowLeft') {
        e.preventDefault();
        handleGoBack();
      } else if (e.altKey && e.key === 'ArrowRight') {
        e.preventDefault();
        handleGoForward();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleGoBack, handleGoForward]);

  const canGoBack = Boolean(selectedMovie) || historyPointer > 0;
  const canGoForward = historyPointer < historyStack.length - 1;

  // Run dynamic recommendation engine whenever user profile or weights change
  const { recommended, clusterPicks, userCluster } = useMemo(() => {
    return generateRecommendations(currentUser, algoConfig);
  }, [currentUser, algoConfig]);

  // Run mathematical evaluation metrics
  const metrics = useMemo(() => {
    return calculateEvaluationMetrics(currentUser, recommended);
  }, [currentUser, recommended]);

  // Handle rating a movie
  const handleRateMovie = (movieId: string, rating: number) => {
    const movie = MOVIES.find(m => m.id === movieId);
    const title = movie?.title || 'Movie';

    setCurrentUser(prev => ({
      ...prev,
      ratedMovies: {
        ...prev.ratedMovies,
        [movieId]: rating
      }
    }));

    showToast(`Rated "${title}" ${rating}★! Recalculating recommendation vectors...`);
  };

  // Handle watchlist toggle
  const handleToggleWatchlist = (movieId: string) => {
    const movie = MOVIES.find(m => m.id === movieId);
    const title = movie?.title || 'Movie';
    const isAlready = currentUser.watchlist.includes(movieId);

    setCurrentUser(prev => ({
      ...prev,
      watchlist: isAlready
        ? prev.watchlist.filter(id => id !== movieId)
        : [...prev.watchlist, movieId]
    }));

    showToast(isAlready ? `Removed "${title}" from Watchlist` : `Saved "${title}" to Watchlist`);
  };

  // Reset taste profile
  const handleResetTasteProfile = () => {
    setCurrentUser(DEFAULT_USER);
    showToast('Taste profile reset to baseline.');
  };

  return (
    <div className="min-h-screen bg-[#060813] text-[#e2e8f0] flex flex-col font-sans selection:bg-violet-600 selection:text-white">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 glass-panel-glow px-4 py-3 rounded-xl border border-violet-500/50 shadow-2xl flex items-center gap-2.5 text-xs font-semibold text-white animate-in slide-in-from-bottom-5 duration-200">
          <Sparkles className="w-4 h-4 text-violet-400 animate-spin" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main Top Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={(tab) => navigateTo(tab)}
        currentUser={currentUser}
        setCurrentUser={setCurrentUser}
        watchlistCount={currentUser.watchlist.length}
        onOpenSearch={() => navigateTo('browse')}
        onOpenProjectInfo={() => setIsProjectInfoOpen(true)}
        canGoBack={canGoBack}
        canGoForward={canGoForward}
        onGoBack={handleGoBack}
        onGoForward={handleGoForward}
      />

      {/* Mobile Top Bar with Back/Forward & Sidebar toggle */}
      <div className="lg:hidden flex items-center justify-between px-4 py-2 bg-[#090d1f] border-b border-white/5 text-xs">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className="flex items-center gap-1.5 p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-white/5"
          >
            <Menu className="w-4 h-4" />
            <span>Menu</span>
          </button>

          {/* Mobile Back & Forward */}
          <div className="flex items-center gap-0.5 bg-slate-900 border border-white/10 rounded-full p-0.5">
            <button
              onClick={handleGoBack}
              disabled={!canGoBack}
              className={`p-1 rounded-full ${
                canGoBack ? 'text-white hover:bg-white/10' : 'text-slate-600 opacity-30 cursor-not-allowed'
              }`}
              title="Go Back"
              aria-label="Go Back"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={handleGoForward}
              disabled={!canGoForward}
              className={`p-1 rounded-full ${
                canGoForward ? 'text-white hover:bg-white/10' : 'text-slate-600 opacity-30 cursor-not-allowed'
              }`}
              title="Go Forward"
              aria-label="Go Forward"
            >
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        <span className="text-[11px] text-violet-400 font-mono font-medium">
          Cluster: {userCluster.name}
        </span>
      </div>

      {/* App Body Layout: Sidebar + Main Content */}
      <div className="flex-1 flex max-w-7xl mx-auto w-full">
        
        {/* Left Sidebar */}
        <Sidebar
          activeTab={activeTab}
          setActiveTab={(tab) => navigateTo(tab)}
          currentUser={currentUser}
          isOpenMobile={isMobileMenuOpen}
          onCloseMobile={() => setIsMobileMenuOpen(false)}
          onOpenProjectInfo={() => setIsProjectInfoOpen(true)}
          onResetTasteProfile={handleResetTasteProfile}
        />

        {/* Center / Right Content Panel */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-x-hidden min-w-0">
          
          {/* View 1: Home / Landing Showcase */}
          {activeTab === 'home' && (
            <div className="space-y-10">
              <HeroSection
                featuredMovies={MOVIES}
                onGetStarted={() => navigateTo('recommendations')}
                onExploreMovies={() => navigateTo('browse')}
                onSelectMovie={(movie) => navigateTo(activeTab, movie.id)}
              />

              {/* Quick Preview of Recommendations on Home */}
              <DashboardView
                currentUser={currentUser}
                recommendedMovies={recommended}
                clusterPicks={clusterPicks}
                userCluster={userCluster}
                onSelectMovie={(movie) => navigateTo(activeTab, movie.id)}
                onToggleWatchlist={handleToggleWatchlist}
                onNavigateToClusters={() => navigateTo('clusters')}
                onNavigateToBrowse={() => navigateTo('browse')}
                onNavigateToChat={() => navigateTo('chat')}
              />

              <BottomBanner onExplore={() => navigateTo('clusters')} />
            </div>
          )}

          {/* View 2: Personalized Recommendations Dashboard */}
          {activeTab === 'recommendations' && (
            <div className="space-y-8">
              <DashboardView
                currentUser={currentUser}
                recommendedMovies={recommended}
                clusterPicks={clusterPicks}
                userCluster={userCluster}
                onSelectMovie={(movie) => navigateTo(activeTab, movie.id)}
                onToggleWatchlist={handleToggleWatchlist}
                onNavigateToClusters={() => navigateTo('clusters')}
                onNavigateToBrowse={() => navigateTo('browse')}
                onNavigateToChat={() => navigateTo('chat')}
              />

              <BottomBanner onExplore={() => navigateTo('clusters')} />
            </div>
          )}

          {/* View: MovieChat Natural Language AI Recommender */}
          {activeTab === 'chat' && (
            <div className="space-y-8">
              <MovieChat
                currentUser={currentUser}
                onSelectMovie={(movie) => navigateTo(activeTab, movie.id)}
                onToggleWatchlist={handleToggleWatchlist}
              />
            </div>
          )}

          {/* View 3: User Clusters & t-SNE Latent Space */}
          {activeTab === 'clusters' && (
            <div className="space-y-8">
              <ClustersView
                currentUser={currentUser}
                onSelectMovie={(movie) => navigateTo(activeTab, movie.id)}
              />

              <BottomBanner onExplore={() => navigateTo('analytics')} />
            </div>
          )}

          {/* View 4: Browse Full Movie Catalog */}
          {activeTab === 'browse' && (
            <div className="space-y-8">
              <BrowseView
                movies={MOVIES}
                currentUser={currentUser}
                onSelectMovie={(movie) => navigateTo(activeTab, movie.id)}
                onToggleWatchlist={handleToggleWatchlist}
              />
            </div>
          )}

          {/* View 5: Recommendation Analytics & Performance Benchmark */}
          {activeTab === 'analytics' && (
            <div className="space-y-8">
              <AnalyticsView
                metrics={metrics}
                currentUser={currentUser}
                algoConfig={algoConfig}
                onUpdateAlgoConfig={setAlgoConfig}
                onSelectMovie={(movie) => navigateTo(activeTab, movie.id)}
                moviesList={MOVIES}
              />

              <BottomBanner onExplore={() => navigateTo('browse')} />
            </div>
          )}

        </main>
      </div>

      {/* Footer */}
      <footer className="mt-16 border-t border-white/5 py-8 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Film className="w-4 h-4 text-violet-400" />
            <span className="font-bold text-slate-300">CineVibe Platform</span>
            <span>· Academic Project: Movie Recommendation Based on User Preferences (CO3 | L3)</span>
          </div>

          <div className="flex items-center gap-4 text-slate-400">
            <button
              onClick={() => setIsProjectInfoOpen(true)}
              className="hover:text-violet-400 transition-colors"
            >
              CO3 | L3 Model Architecture
            </button>
            <span>·</span>
            <span>Production Build v2.4</span>
          </div>
        </div>
      </footer>

      {/* Movie Details Modal */}
      <MovieDetailModal
        movie={selectedMovie}
        onClose={() => setSelectedMovie(null)}
        currentUser={currentUser}
        onRateMovie={handleRateMovie}
        onToggleWatchlist={handleToggleWatchlist}
        allMovies={MOVIES}
        onSelectMovie={(movie) => navigateTo(activeTab, movie.id)}
      />

      {/* Academic Project Info Modal (CO3 | L3) */}
      <ProjectInfoModal
        isOpen={isProjectInfoOpen}
        onClose={() => setIsProjectInfoOpen(false)}
      />

    </div>
  );
}
