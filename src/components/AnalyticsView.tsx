import React, { useState } from 'react';
import { BarChart3, TrendingUp, Sliders, CheckCircle, ArrowUpRight, Zap, Target, Award, PieChart as PieIcon } from 'lucide-react';
import { SystemMetrics, Movie, UserProfile } from '../types';
import { AlgorithmConfig } from '../services/recommenderEngine';
import { PieChart, Pie, Cell, ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

interface AnalyticsViewProps {
  metrics: SystemMetrics;
  currentUser: UserProfile;
  algoConfig: AlgorithmConfig;
  onUpdateAlgoConfig: (config: AlgorithmConfig) => void;
  onSelectMovie: (movie: Movie) => void;
  moviesList: Movie[];
}

export const AnalyticsView: React.FC<AnalyticsViewProps> = ({
  metrics,
  currentUser,
  algoConfig,
  onUpdateAlgoConfig,
  onSelectMovie,
  moviesList,
}) => {
  const [showTuner, setShowTuner] = useState(false);

  // Custom tooltips for recharts
  const CustomLineTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="glass-panel p-2.5 rounded-lg border border-white/10 text-xs shadow-xl">
          <p className="font-bold text-white mb-1">{label}</p>
          <p className="text-violet-400">Recommended: {payload[0].value}% click-through</p>
          {payload[1] && <p className="text-cyan-400">Random Baseline: {payload[1].value}%</p>}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 border-b border-white/5">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-violet-950/60 border border-violet-500/30 text-[11px] font-bold text-violet-300 uppercase tracking-wider mb-2">
            <BarChart3 className="w-3 h-3" />
            <span>Academic Performance Benchmark</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold font-display text-white tracking-tight">
            Recommendation Performance
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            We evaluate our system using standard metrics: Precision@10, Recall@10, F1-Score, and NDCG@10.
          </p>
        </div>

        {/* Algorithm Tuner Toggle */}
        <button
          onClick={() => setShowTuner(!showTuner)}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold glass-card hover:bg-white/10 text-violet-300 border border-violet-500/30 transition-all cursor-pointer"
        >
          <Sliders className="w-3.5 h-3.5 text-violet-400" />
          <span>{showTuner ? 'Hide Hyperparameters' : 'Tune ML Model Weights'}</span>
        </button>
      </div>

      {/* Interactive Hyperparameter Tuning Panel */}
      {showTuner && (
        <div className="glass-panel-glow rounded-2xl p-6 border border-violet-500/30 space-y-4 animate-in fade-in slide-in-from-top-4 duration-200">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Sliders className="w-4 h-4 text-violet-400" />
                <span>Hybrid Ensemble Weights (CO3 | L3)</span>
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Adjust the balance between Collaborative Filtering, TF-IDF Content Vector Space, and Cluster Prior.
              </p>
            </div>

            <button
              onClick={() => onUpdateAlgoConfig({
                algorithm: 'hybrid',
                collaborativeWeight: 0.45,
                contentWeight: 0.35,
                clusterWeight: 0.20
              })}
              className="text-[11px] text-slate-400 hover:text-white underline"
            >
              Reset to Defaults
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
            
            {/* Collaborative Filtering Slider */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="font-semibold text-slate-300">Collaborative Filtering (CF)</span>
                <span className="font-mono font-bold text-violet-400">{Math.round(algoConfig.collaborativeWeight * 100)}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={algoConfig.collaborativeWeight}
                onChange={(e) => onUpdateAlgoConfig({
                  ...algoConfig,
                  collaborativeWeight: parseFloat(e.target.value)
                })}
                className="w-full accent-violet-500 cursor-pointer"
              />
              <p className="text-[10px] text-slate-400">User-item interaction matrix factorization</p>
            </div>

            {/* Content-Based Filtering Slider */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="font-semibold text-slate-300">Content-Based (TF-IDF)</span>
                <span className="font-mono font-bold text-pink-400">{Math.round(algoConfig.contentWeight * 100)}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={algoConfig.contentWeight}
                onChange={(e) => onUpdateAlgoConfig({
                  ...algoConfig,
                  contentWeight: parseFloat(e.target.value)
                })}
                className="w-full accent-pink-500 cursor-pointer"
              />
              <p className="text-[10px] text-slate-400">Cosine similarity on genres, tags & cast</p>
            </div>

            {/* Cluster Affinity Slider */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="font-semibold text-slate-300">Cluster Prior (K-Means)</span>
                <span className="font-mono font-bold text-cyan-400">{Math.round(algoConfig.clusterWeight * 100)}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={algoConfig.clusterWeight}
                onChange={(e) => onUpdateAlgoConfig({
                  ...algoConfig,
                  clusterWeight: parseFloat(e.target.value)
                })}
                className="w-full accent-cyan-500 cursor-pointer"
              />
              <p className="text-[10px] text-slate-400">Centroid distance taste tribe boost</p>
            </div>

          </div>
        </div>
      )}

      {/* 4 Metric KPI Cards matching screenshot exactly */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          {
            label: 'Precision@10',
            value: metrics.precisionAtK.toFixed(2),
            desc: 'Relevant recommendations in top-10',
            color: 'text-violet-400',
            border: 'border-violet-500/30'
          },
          {
            label: 'Recall@10',
            value: metrics.recallAtK.toFixed(2),
            desc: 'Coverage of user preferred catalog',
            color: 'text-cyan-400',
            border: 'border-cyan-500/30'
          },
          {
            label: 'F1-Score',
            value: metrics.f1Score.toFixed(2),
            desc: 'Harmonic mean of precision & recall',
            color: 'text-pink-400',
            border: 'border-pink-500/30'
          },
          {
            label: 'NDCG@10',
            value: metrics.ndcgAtK.toFixed(2),
            desc: 'Normalized Discounted Cumulative Gain',
            color: 'text-emerald-400',
            border: 'border-emerald-500/30'
          }
        ].map((kpi, idx) => (
          <div
            key={idx}
            className={`p-5 rounded-2xl glass-card ${kpi.border} flex flex-col justify-between space-y-2`}
          >
            <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              {kpi.label}
            </div>
            <div className={`text-3xl sm:text-4xl font-extrabold font-mono ${kpi.color}`}>
              {kpi.value}
            </div>
            <div className="text-[11px] text-slate-400">
              {kpi.desc}
            </div>
          </div>
        ))}
      </div>

      {/* Charts Section: Donut + Line Chart matching screenshot */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        
        {/* Genre Distribution Donut Chart (5-6 cols) */}
        <div className="lg:col-span-5 glass-card rounded-2xl p-5 border border-white/10 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <div>
              <h3 className="text-sm font-bold text-white">Genre Distribution in Recommendations</h3>
              <p className="text-[11px] text-slate-400">Categorical diversity across recommended items</p>
            </div>
            <PieIcon className="w-4 h-4 text-violet-400" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 items-center gap-4 py-3">
            {/* Recharts Donut */}
            <div className="h-44 w-full relative">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={metrics.genreDistribution}
                    innerRadius={46}
                    outerRadius={68}
                    paddingAngle={4}
                    dataKey="value"
                  >
                    {metrics.genreDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="text-xs font-bold text-white">Top 6</span>
                <span className="text-[10px] text-slate-400">Genres</span>
              </div>
            </div>

            {/* Legend list matching screenshot */}
            <div className="space-y-1.5">
              {metrics.genreDistribution.map((genre, idx) => (
                <div key={idx} className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: genre.color }} />
                    <span className="text-slate-300">{genre.name}</span>
                  </div>
                  <span className="font-mono text-slate-400 font-medium">{genre.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* User Engagement Over Time Line Chart (7 cols) */}
        <div className="lg:col-span-7 glass-card rounded-2xl p-5 border border-white/10 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <div>
              <h3 className="text-sm font-bold text-white">User Engagement Over Time</h3>
              <p className="text-[11px] text-slate-400">A/B test: Personalized Recommender vs Random Baseline</p>
            </div>
            <div className="flex items-center gap-3 text-xs">
              <span className="flex items-center gap-1.5 text-violet-400 font-medium">
                <span className="w-2.5 h-1 rounded-full bg-violet-400" />
                Recommended
              </span>
              <span className="flex items-center gap-1.5 text-cyan-400 font-medium">
                <span className="w-2.5 h-1 rounded-full bg-cyan-400" />
                Random
              </span>
            </div>
          </div>

          <div className="h-44 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={metrics.userEngagement} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="week" stroke="#64748b" fontSize={11} tickLine={false} />
                <YAxis stroke="#64748b" fontSize={11} tickLine={false} />
                <Tooltip content={<CustomLineTooltip />} />
                <Line
                  type="monotone"
                  dataKey="recommended"
                  stroke="#a855f7"
                  strokeWidth={2.5}
                  dot={{ r: 4, fill: '#a855f7' }}
                  activeDot={{ r: 6 }}
                />
                <Line
                  type="monotone"
                  dataKey="random"
                  stroke="#38bdf8"
                  strokeWidth={1.5}
                  strokeDasharray="4 4"
                  dot={{ r: 3, fill: '#38bdf8' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>

      {/* Top Recommended Movies (Accuracy) Shelf matching bottom right of screenshot */}
      <div className="glass-card rounded-2xl p-5 border border-white/10 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-white">Top Recommended Movies (Accuracy)</h3>
            <p className="text-xs text-slate-400">Highest ranked items according to cosine similarity and latent factorization</p>
          </div>

          <button
            onClick={() => setShowTuner(true)}
            className="text-xs font-semibold text-violet-400 hover:text-violet-300 flex items-center gap-1 transition-colors"
          >
            <span>View Report</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3.5 pt-1">
          {metrics.topAccuracyMovies.map((item) => {
            const fullMovie = moviesList.find(m => m.id === item.id);
            return (
              <div
                key={item.id}
                onClick={() => fullMovie && onSelectMovie(fullMovie)}
                className="group rounded-xl overflow-hidden glass-panel hover:border-violet-500/40 transition-all cursor-pointer flex flex-col"
              >
                <div className="relative aspect-[2/3] w-full overflow-hidden bg-slate-900">
                  <img
                    src={item.poster}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-2 right-2 px-1.5 py-0.5 rounded-md bg-black/70 backdrop-blur-md text-[10px] font-mono font-bold text-violet-300 border border-violet-500/30">
                    {item.score.toFixed(2)}
                  </div>
                </div>

                <div className="p-2.5 bg-[#0b0f1e]/80">
                  <h4 className="text-xs font-bold text-white group-hover:text-violet-300 transition-colors truncate">
                    {item.title}
                  </h4>
                  <div className="mt-1 flex items-center justify-between text-[10px] text-slate-400">
                    <span>Rank Score</span>
                    <span className="font-mono text-emerald-400 font-bold">{Math.round(item.score * 100)}%</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
};
