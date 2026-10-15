export interface Movie {
  id: string;
  title: string;
  year: number;
  poster: string;
  backdrop: string;
  genres: string[];
  rating: number; // e.g. 8.8
  voteCount: number;
  director: string;
  cast: string[];
  synopsis: string;
  duration: string;
  clusterAffinity: number; // 1 to 5
  tags: string[];
  matchScore?: number; // 0 to 100% computed dynamically
  predictedScore?: number; // 0.0 to 1.0
  whyRecommended?: string;
}

export interface UserRating {
  movieId: string;
  rating: number; // 1 to 10
  timestamp: number;
}

export interface UserProfile {
  id: string;
  name: string;
  avatar: string;
  email: string;
  role: string;
  clusterId: number;
  clusterName: string;
  ratedMovies: Record<string, number>; // movieId -> rating 1-10
  watchlist: string[]; // movieIds
  preferredGenres: string[];
}

export interface ClusterInfo {
  id: number;
  name: string;
  label: string;
  color: string;
  bgColor: string;
  borderColor: string;
  percentage: number;
  userCount: number;
  topGenres: string[];
  description: string;
  sampleUsers: { name: string; avatar: string }[];
  topMovieIds: string[];
  centroid: Record<string, number>;
}

export interface ClusterPoint {
  id: string;
  x: number;
  y: number;
  clusterId: number;
  clusterName: string;
  userName: string;
  avatar: string;
  genres: string[];
  isCurrentUser: boolean;
  ratedCount: number;
}

export interface SystemMetrics {
  precisionAtK: number;
  recallAtK: number;
  f1Score: number;
  ndcgAtK: number;
  mapAtK: number;
  genreDistribution: { name: string; value: number; color: string }[];
  userEngagement: { week: string; recommended: number; random: number }[];
  topAccuracyMovies: { id: string; title: string; score: number; poster: string }[];
}

export type ActiveTab = 'home' | 'recommendations' | 'clusters' | 'browse' | 'analytics' | 'project-info' | 'chat';
