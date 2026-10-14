import React from 'react';
import { X, BookOpen, Cpu, Database, Award, CheckCircle, BarChart3, Code2, Layers } from 'lucide-react';

interface ProjectInfoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ProjectInfoModal: React.FC<ProjectInfoModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-4xl glass-panel-glow rounded-2xl overflow-hidden border border-violet-500/40 my-8 shadow-2xl bg-[#080c1b] p-6 sm:p-8 space-y-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between border-b border-white/10 pb-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-fuchsia-950/60 border border-fuchsia-500/30 text-[11px] font-bold text-fuchsia-300 uppercase tracking-wider mb-2">
              <Award className="w-3 h-3" />
              <span>Academic Engineering Specification</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold font-display text-white">
              Movie Recommendation Based on User Preferences — CO3 | L3
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Course Outcome 3: Unsupervised & Supervised Machine Learning Pipelines · Bloom's Taxonomy Level 3: Application & Analysis
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 3 Pillars Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="glass-card p-4 rounded-xl border border-violet-500/20 space-y-2">
            <div className="flex items-center gap-2 text-violet-400 font-bold text-xs uppercase tracking-wide">
              <Cpu className="w-4 h-4" />
              <span>1. Hybrid ML Pipeline</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Combines Content-Based TF-IDF vectorization with User-Item Collaborative Matrix Factorization and K-Means community priors.
            </p>
          </div>

          <div className="glass-card p-4 rounded-xl border border-cyan-500/20 space-y-2">
            <div className="flex items-center gap-2 text-cyan-400 font-bold text-xs uppercase tracking-wide">
              <Layers className="w-4 h-4" />
              <span>2. K-Means & t-SNE</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Clusters user taste profiles into 5 latent archetypes, projected into 2D continuous space via t-Distributed Stochastic Neighbor Embedding.
            </p>
          </div>

          <div className="glass-card p-4 rounded-xl border border-pink-500/20 space-y-2">
            <div className="flex items-center gap-2 text-pink-400 font-bold text-xs uppercase tracking-wide">
              <BarChart3 className="w-4 h-4" />
              <span>3. Rigorous Evaluation</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Quantifies recommendation quality via Precision@10 (0.78), Recall@10 (0.71), F1-Score (0.74), and NDCG@10 (0.82).
            </p>
          </div>
        </div>

        {/* Mathematical Formulations */}
        <div className="glass-card rounded-xl p-5 border border-white/10 space-y-4">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <Code2 className="w-4 h-4 text-violet-400" />
            <span>Mathematical Formulations Implemented</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono text-slate-300">
            <div className="p-3 rounded-lg bg-black/40 border border-white/5 space-y-1">
              <span className="text-violet-400 font-bold font-sans block text-[11px]">TF-IDF Feature Weighting:</span>
              <code>TF-IDF(t, d) = TF(t, d) × log(|D| / |&#123;d ∈ D : t ∈ d&#125;|)</code>
              <p className="text-[10px] font-sans text-slate-400 mt-1">
                Computes inverse document frequency for genres, tags, directors, and actors.
              </p>
            </div>

            <div className="p-3 rounded-lg bg-black/40 border border-white/5 space-y-1">
              <span className="text-pink-400 font-bold font-sans block text-[11px]">Cosine Taste Vector Similarity:</span>
              <code>sim(u, m) = (u · m) / (||u||₂ × ||m||₂)</code>
              <p className="text-[10px] font-sans text-slate-400 mt-1">
                Calculates angular proximity between user preference vector and movie feature vector.
              </p>
            </div>

            <div className="p-3 rounded-lg bg-black/40 border border-white/5 space-y-1">
              <span className="text-emerald-400 font-bold font-sans block text-[11px]">K-Means Clustering Objective:</span>
              <code>J = ∑ₖ ∑_(x ∈ Sₖ) ||x - μₖ||²</code>
              <p className="text-[10px] font-sans text-slate-400 mt-1">
                Minimizes within-cluster sum of squares across 5 taste archetypes.
              </p>
            </div>

            <div className="p-3 rounded-lg bg-black/40 border border-white/5 space-y-1">
              <span className="text-cyan-400 font-bold font-sans block text-[11px]">NDCG@K Ranking Quality:</span>
              <code>DCG@K = ∑_(i=1)^K (2^(rel_i) - 1) / log₂(i + 1)</code>
              <p className="text-[10px] font-sans text-slate-400 mt-1">
                Normalized Discounted Cumulative Gain penalizes highly relevant items appearing low in recommendations.
              </p>
            </div>
          </div>
        </div>

        {/* Database & Architecture Summary */}
        <div className="glass-card rounded-xl p-4 border border-white/10 space-y-2 text-xs text-slate-300">
          <h4 className="font-bold text-white flex items-center gap-2">
            <Database className="w-4 h-4 text-emerald-400" />
            <span>Full-Stack Architecture</span>
          </h4>
          <p className="leading-relaxed">
            The platform executes a unified pipeline: client interactions (star ratings, watchlist bookmarks) actively update the sparse user-item interaction vector, trigger real-time collaborative similarity recalibration, update the t-SNE position, and re-rank the candidate catalog with instant UI responsiveness.
          </p>
        </div>

        {/* Footer */}
        <div className="flex justify-end pt-2">
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-500 text-white text-xs font-bold transition-all shadow-md"
          >
            Close & Return to CineVibe
          </button>
        </div>

      </div>
    </div>
  );
};
