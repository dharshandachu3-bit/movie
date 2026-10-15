import React, { useState } from 'react';
import { Users, Sparkles, Filter, Info, Eye, Compass, Award } from 'lucide-react';
import { ClusterInfo, ClusterPoint, Movie, UserProfile } from '../types';
import { CLUSTERS, TSNE_USER_POINTS } from '../data/clustersData';
import { MOVIES } from '../data/moviesData';
import { MoviePoster } from './MoviePoster';

interface ClustersViewProps {
  currentUser: UserProfile;
  onSelectMovie: (movie: Movie) => void;
  onSwitchUserCluster?: (clusterId: number) => void;
}

export const ClustersView: React.FC<ClustersViewProps> = ({
  currentUser,
  onSelectMovie,
}) => {
  const [selectedClusterId, setSelectedClusterId] = useState<number | null>(null);
  const [hoveredPoint, setHoveredPoint] = useState<ClusterPoint | null>(null);
  const [selectedPoint, setSelectedPoint] = useState<ClusterPoint | null>(null);

  // Filter points based on selected cluster
  const pointsToRender = selectedClusterId
    ? TSNE_USER_POINTS.filter(p => p.clusterId === selectedClusterId)
    : TSNE_USER_POINTS;

  // Active cluster for details
  const activeCluster = CLUSTERS.find(c => c.id === (selectedClusterId || currentUser.clusterId)) || CLUSTERS[1];
  const clusterMovies = MOVIES.filter(m => activeCluster.topMovieIds.includes(m.id));

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 border-b border-white/5">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-violet-950/60 border border-violet-500/30 text-[11px] font-bold text-violet-300 uppercase tracking-wider mb-2">
            <Users className="w-3 h-3" />
            <span>Unsupervised Machine Learning</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold font-display text-white tracking-tight">
            User Clusters
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Users with similar viewing behavior are grouped together via K-Means & t-SNE 2D dimensionality reduction.
          </p>
        </div>

        {/* Cluster Filter Buttons */}
        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={() => setSelectedClusterId(null)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              selectedClusterId === null
                ? 'bg-white text-slate-900 shadow-md'
                : 'glass-card text-slate-300 hover:text-white hover:bg-white/10'
            }`}
          >
            All Clusters
          </button>
          {CLUSTERS.map(c => (
            <button
              key={c.id}
              onClick={() => setSelectedClusterId(selectedClusterId === c.id ? null : c.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
                selectedClusterId === c.id
                  ? 'text-white shadow-lg'
                  : 'glass-card text-slate-300 hover:text-white'
              }`}
              style={{
                backgroundColor: selectedClusterId === c.id ? c.color : undefined,
                borderColor: selectedClusterId === c.id ? c.color : undefined
              }}
            >
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: c.color }} />
              <span>{c.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Main t-SNE 2D Scatter Plot Canvas Container */}
      <div className="glass-panel-glow rounded-2xl p-4 sm:p-6 border border-violet-500/20 relative overflow-hidden">
        
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-200">t-SNE Latent Projection (CO3 | L3)</span>
            <span className="text-[11px] text-slate-400 font-mono">112 Sampled Users</span>
          </div>

          <div className="text-xs text-slate-400 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-violet-400 animate-ping" />
            <span>Click any node to inspect taste vector</span>
          </div>
        </div>

        {/* SVG Scatter Plot Grid */}
        <div className="relative w-full aspect-[16/9] max-h-[460px] bg-[#070b18]/90 rounded-xl border border-white/10 overflow-hidden flex items-center justify-center">
          
          {/* Background Grid Lines */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px]" />

          {/* Axis Labels */}
          <div className="absolute left-3 top-1/2 -translate-y-1/2 -rotate-90 text-[10px] font-mono text-slate-500 tracking-widest uppercase select-none">
            t-SNE 2
          </div>
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 text-[10px] font-mono text-slate-500 tracking-widest uppercase select-none">
            t-SNE 1
          </div>

          {/* Centroid labels */}
          {CLUSTERS.map(c => {
            const centroidPos = {
              1: { x: '24%', y: '28%' },
              2: { x: '58%', y: '22%' },
              3: { x: '78%', y: '30%' },
              4: { x: '42%', y: '75%' },
              5: { x: '75%', y: '75%' },
            }[c.id] || { x: '50%', y: '50%' };

            return (
              <div
                key={`centroid_${c.id}`}
                className="absolute transform -translate-x-1/2 -translate-y-1/2 pointer-events-none text-center opacity-70 transition-opacity"
                style={{ left: centroidPos.x, top: centroidPos.y }}
              >
                <div
                  className="w-16 h-16 rounded-full blur-xl absolute -inset-2 opacity-30"
                  style={{ backgroundColor: c.color }}
                />
                <span
                  className="px-2 py-0.5 rounded-full text-[10px] font-bold font-mono tracking-wider backdrop-blur-md border"
                  style={{ color: c.color, borderColor: `${c.color}60`, backgroundColor: 'rgba(0,0,0,0.6)' }}
                >
                  Centroid {c.id}
                </span>
              </div>
            );
          })}

          {/* SVG Plot for points */}
          <svg className="w-full h-full p-8" viewBox="-90 -70 180 140">
            {pointsToRender.map((point) => {
              const cluster = CLUSTERS.find(c => c.id === point.clusterId) || CLUSTERS[0];
              const isHovered = hoveredPoint?.id === point.id;
              const isSelected = selectedPoint?.id === point.id;
              const isUser = point.isCurrentUser;

              return (
                <g
                  key={point.id}
                  className="cursor-pointer transition-transform duration-200"
                  onMouseEnter={() => setHoveredPoint(point)}
                  onMouseLeave={() => setHoveredPoint(null)}
                  onClick={() => setSelectedPoint(point)}
                >
                  {/* Glowing ring for current user or selected */}
                  {(isUser || isSelected || isHovered) && (
                    <circle
                      cx={point.x}
                      cy={point.y}
                      r={isUser ? 6 : 4.5}
                      fill="none"
                      stroke={isUser ? '#ffffff' : cluster.color}
                      strokeWidth={isUser ? 1.5 : 1}
                      strokeDasharray={isUser ? "2 2" : undefined}
                      className={isUser ? "animate-spin" : undefined}
                    />
                  )}

                  {/* Core node circle */}
                  <circle
                    cx={point.x}
                    cy={point.y}
                    r={isUser ? 3.5 : (isHovered || isSelected ? 3 : 2)}
                    fill={isUser ? '#ffffff' : cluster.color}
                    opacity={isHovered || isSelected || isUser ? 1 : 0.85}
                  />

                  {/* Current User Label */}
                  {isUser && (
                    <text
                      x={point.x + 5}
                      y={point.y - 4}
                      fill="#ffffff"
                      fontSize="5"
                      fontWeight="bold"
                      fontFamily="sans-serif"
                    >
                      YOU (Dharshan)
                    </text>
                  )}
                </g>
              );
            })}
          </svg>

          {/* Right Floating Cluster Legend (matching mockup) */}
          <div className="absolute right-3 top-3 bottom-3 w-52 sm:w-60 glass-panel rounded-xl p-3 border border-white/10 flex flex-col justify-between hidden md:flex">
            <div>
              <div className="text-[11px] font-bold text-slate-300 uppercase tracking-wider mb-2">
                Cluster Legend
              </div>
              <div className="space-y-2">
                {CLUSTERS.map(c => {
                  const isCur = c.id === currentUser.clusterId;
                  return (
                    <div
                      key={c.id}
                      onClick={() => setSelectedClusterId(selectedClusterId === c.id ? null : c.id)}
                      className={`flex items-center justify-between p-1.5 rounded-lg text-xs cursor-pointer transition-colors ${
                        selectedClusterId === c.id ? 'bg-white/10' : 'hover:bg-white/5'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: c.color }} />
                        <span className="text-slate-200 font-medium truncate max-w-[120px]">{c.name}</span>
                      </div>
                      <span className="text-[11px] font-mono text-slate-400">({c.percentage}%)</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Hovered/Selected Point Tooltip */}
            <div className="pt-2 border-t border-white/10">
              {hoveredPoint || selectedPoint ? (
                (() => {
                  const pt = hoveredPoint || selectedPoint!;
                  const cl = CLUSTERS.find(c => c.id === pt.clusterId);
                  return (
                    <div className="text-[11px] space-y-1">
                      <div className="font-bold text-white flex items-center justify-between">
                        <span>{pt.userName}</span>
                        <span style={{ color: cl?.color }}>{cl?.name}</span>
                      </div>
                      <div className="text-slate-400 text-[10px]">
                        Movies Rated: <span className="text-slate-200">{pt.ratedCount}</span>
                      </div>
                      <div className="text-slate-400 text-[10px] truncate">
                        Top: {pt.genres.join(', ')}
                      </div>
                    </div>
                  );
                })()
              ) : (
                <div className="text-[10px] text-slate-500 italic text-center">
                  Hover over any node in the plot to inspect
                </div>
              )}
            </div>
          </div>

        </div>
      </div>

      {/* Cluster Profiles Cards Section (matching bottom of screenshot) */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold font-display text-white">
            Cluster Profiles & Taste Tribes
          </h2>
          <span className="text-xs text-slate-400">
            Click any profile to view community top picks
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
          {CLUSTERS.map((cluster) => {
            const isUserCluster = cluster.id === currentUser.clusterId;
            const isSelected = cluster.id === activeCluster.id;

            return (
              <div
                key={cluster.id}
                onClick={() => setSelectedClusterId(cluster.id)}
                className={`p-4 rounded-xl glass-card cursor-pointer transition-all duration-200 flex flex-col justify-between ${
                  isSelected
                    ? 'border-violet-500 shadow-lg shadow-violet-500/10'
                    : 'hover:border-white/20'
                }`}
                style={{
                  borderLeftWidth: '4px',
                  borderLeftColor: cluster.color
                }}
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold font-mono text-slate-400">
                      Cluster {cluster.id}
                    </span>
                    <span className="text-xs font-bold font-mono" style={{ color: cluster.color }}>
                      {cluster.percentage}%
                    </span>
                  </div>

                  <h3 className="text-sm font-bold text-white mt-1">
                    {cluster.name}
                  </h3>

                  <p className="text-[11px] text-slate-400 mt-1 line-clamp-1">
                    {cluster.topGenres.join(' · ')}
                  </p>
                </div>

                {/* Avatar stack */}
                <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between">
                  <div className="flex items-center -space-x-1.5">
                    {cluster.sampleUsers.map((u, i) => (
                      <img
                        key={i}
                        src={u.avatar}
                        alt={u.name}
                        className="w-5 h-5 rounded-full object-cover ring-1 ring-slate-900"
                      />
                    ))}
                  </div>

                  {isUserCluster && (
                    <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-violet-600/30 text-violet-300 border border-violet-500/30">
                      Your Tribe
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Selected Cluster Deep-Dive Shelf */}
      <div className="glass-card rounded-2xl p-5 border border-white/10 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: activeCluster.color }} />
              <span>{activeCluster.name} Community Top Movies</span>
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              {activeCluster.description}
            </p>
          </div>

          <div className="text-xs font-mono text-slate-400">
            {activeCluster.userCount} Active Members
          </div>
        </div>

        {/* Poster row for this cluster */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 pt-2">
          {clusterMovies.map((movie) => (
            <div
              key={movie.id}
              onClick={() => onSelectMovie(movie)}
              className="group rounded-xl overflow-hidden glass-card hover:border-violet-500/40 transition-all cursor-pointer"
            >
              <div className="relative aspect-[2/3] w-full overflow-hidden bg-slate-900">
                <MoviePoster
                  src={movie.poster}
                  alt={movie.title}
                  fallbackTitle={movie.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-1.5 right-1.5 px-1 py-0.5 rounded bg-black/70 text-[10px] font-bold text-amber-300">
                  ★ {movie.rating}
                </div>
              </div>
              <div className="p-2">
                <p className="text-xs font-bold text-white truncate">{movie.title}</p>
                <p className="text-[10px] text-slate-400 truncate">{movie.genres[0]}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
