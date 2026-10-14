import React, { useState, useMemo, useCallback } from 'react';
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
import { MOVIES } from './data/moviesData';
import { DEFAULT_USER, CLUSTERS } from './data/clustersData';
import { ActiveTab, Movie, UserProfile } from './types';
import {
  generateRecommendations,
  calculateEvaluationMetrics,
  DEFAULT_ALGO_CONFIG,
  AlgorithmConfig,
} from './services/recommenderEngine';
import { Menu, Sparkles, Film, ArrowRight } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('home');
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
        setActiveTab={setActiveTab}
        currentUser={currentUser}
        setCurrentUser={setCurrentUser}
        watchlistCount={currentUser.watchlist.length}
        onOpenSearch={() => setActiveTab('browse')}
        onOpenProjectInfo={() => setIsProjectInfoOpen(true)}
      />

      {/* Mobile Top Bar with Sidebar toggle */}
      <div className="lg:hidden flex items-center justify-between px-4 py-2.5 bg-[#090d1f] border-b border-white/5 text-xs">
        <button
          onClick={() => setIsMobileMenuOpen(true)}
          className="flex items-center gap-2 p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-white/5"
        >
          <Menu className="w-4 h-4" />
          <span>Menu</span>
        </button>

        <span className="text-[11px] text-violet-400 font-mono font-medium">
          Cluster: {userCluster.name}
        </span>
      </div>

      {/* App Body Layout: Sidebar + Main Content */}
      <div className="flex-1 flex max-w-7xl mx-auto w-full">
        
        {/* Left Sidebar */}
        <Sidebar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
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
                onGetStarted={() => setActiveTab('recommendations')}
                onExploreMovies={() => setActiveTab('browse')}
                onSelectMovie={(movie) => setSelectedMovie(movie)}
              />

              {/* Quick Preview of Recommendations on Home */}
              <DashboardView
                currentUser={currentUser}
                recommendedMovies={recommended}
                clusterPicks={clusterPicks}
                userCluster={userCluster}
                onSelectMovie={(movie) => setSelectedMovie(movie)}
                onToggleWatchlist={handleToggleWatchlist}
                onNavigateToClusters={() => setActiveTab('clusters')}
                onNavigateToBrowse={() => setActiveTab('browse')}
              />

              <BottomBanner onExplore={() => setActiveTab('clusters')} />
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
                onSelectMovie={(movie) => setSelectedMovie(movie)}
                onToggleWatchlist={handleToggleWatchlist}
                onNavigateToClusters={() => setActiveTab('clusters')}
                onNavigateToBrowse={() => setActiveTab('browse')}
              />

              <BottomBanner onExplore={() => setActiveTab('clusters')} />
            </div>
          )}

          {/* View 3: User Clusters & t-SNE Latent Space */}
          {activeTab === 'clusters' && (
            <div className="space-y-8">
              <ClustersView
                currentUser={currentUser}
                onSelectMovie={(movie) => setSelectedMovie(movie)}
              />

              <BottomBanner onExplore={() => setActiveTab('analytics')} />
            </div>
          )}

          {/* View 4: Browse Full Movie Catalog */}
          {activeTab === 'browse' && (
            <div className="space-y-8">
              <BrowseView
                movies={MOVIES}
                currentUser={currentUser}
                onSelectMovie={(movie) => setSelectedMovie(movie)}
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
                onSelectMovie={(movie) => setSelectedMovie(movie)}
                moviesList={MOVIES}
              />

              <BottomBanner onExplore={() => setActiveTab('browse')} />
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
        onSelectMovie={(movie) => setSelectedMovie(movie)}
      />

      {/* Academic Project Info Modal (CO3 | L3) */}
      <ProjectInfoModal
        isOpen={isProjectInfoOpen}
        onClose={() => setIsProjectInfoOpen(false)}
      />

    </div>
  );
}
