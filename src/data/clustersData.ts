import { ClusterInfo, ClusterPoint, UserProfile } from '../types';

export const CLUSTERS: ClusterInfo[] = [
  {
    id: 1,
    name: 'Action Lovers',
    label: 'Cluster 1 · Action Lovers',
    color: '#38bdf8', // Sky Cyan
    bgColor: 'rgba(56, 189, 248, 0.12)',
    borderColor: 'rgba(56, 189, 248, 0.4)',
    percentage: 24,
    userCount: 342,
    topGenres: ['Action', 'Sci-Fi', 'Adventure'],
    description: 'Adrenaline-fueled cinema lovers who crave high stakes, kinetic choreography, explosive set pieces, and epic superhero worlds.',
    sampleUsers: [
      { name: 'Alex Vance', avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop' },
      { name: 'Marcus Brody', avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=100&h=100&fit=crop' },
      { name: 'Sarah Connor', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop' },
      { name: 'David Kim', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop' }
    ],
    topMovieIds: ['dark-knight', 'the-matrix', 'the-avengers', 'the-batman', 'spider-verse', 'gladiator'],
    centroid: { 'Action': 0.95, 'Sci-Fi': 0.82, 'Adventure': 0.78, 'Thriller': 0.65, 'Drama': 0.4, 'Comedy': 0.5, 'Romance': 0.2 }
  },
  {
    id: 2,
    name: 'Mindful Explorers',
    label: 'Cluster 2 · The Mindful Explorers',
    color: '#a855f7', // Electric Violet
    bgColor: 'rgba(168, 85, 247, 0.12)',
    borderColor: 'rgba(168, 85, 247, 0.4)',
    percentage: 18,
    userCount: 256,
    topGenres: ['Sci-Fi', 'Thriller', 'Drama', 'Indie'],
    description: 'Seekers of profound conceptual stories, non-linear timelines, philosophical questions, existential dread, and visionary directors.',
    sampleUsers: [
      { name: 'Dharshan R.', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop' },
      { name: 'Elena Rostova', avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&h=100&fit=crop' },
      { name: 'Julian Thorne', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop' },
      { name: 'Maya Lin', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop' }
    ],
    topMovieIds: ['interstellar', 'inception', 'fight-club', 'dune-part-two', 'blade-runner-2049', 'arrival', 'oppenheimer', 'parasite'],
    centroid: { 'Sci-Fi': 0.96, 'Thriller': 0.91, 'Drama': 0.85, 'Indie': 0.75, 'Action': 0.45, 'Comedy': 0.3, 'Romance': 0.35 }
  },
  {
    id: 3,
    name: 'Comedy Fans',
    label: 'Cluster 3 · Comedy Fans',
    color: '#10b981', // Emerald Green
    bgColor: 'rgba(16, 185, 129, 0.12)',
    borderColor: 'rgba(16, 185, 129, 0.4)',
    percentage: 15,
    userCount: 214,
    topGenres: ['Comedy', 'Family', 'Feel Good', 'Adventure'],
    description: 'Enthusiasts of sharp wit, buddy chemistry, parody, lighthearted escapism, and satirical dark comedies.',
    sampleUsers: [
      { name: 'Sammy Brooks', avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=100&h=100&fit=crop' },
      { name: 'Chloe Zheng', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop' },
      { name: 'Tyler King', avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=100&h=100&fit=crop' }
    ],
    topMovieIds: ['deadpool-wolverine', 'everything-everywhere', 'grand-budapest-hotel', 'parasite', 'pulp-fiction'],
    centroid: { 'Comedy': 0.98, 'Adventure': 0.72, 'Action': 0.60, 'Drama': 0.42, 'Sci-Fi': 0.50, 'Romance': 0.55 }
  },
  {
    id: 4,
    name: 'Romance Seekers',
    label: 'Cluster 4 · Romance Seekers',
    color: '#f59e0b', // Amber Orange
    bgColor: 'rgba(245, 158, 11, 0.12)',
    borderColor: 'rgba(245, 158, 11, 0.4)',
    percentage: 12,
    userCount: 171,
    topGenres: ['Romance', 'Drama', 'Musical'],
    description: 'Heartfelt romantics who love emotional journeys, magnetic chemistry, melancholic yearning, and soaring musicals.',
    sampleUsers: [
      { name: 'Aria Montgomery', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop' },
      { name: 'Lucas Scott', avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop' },
      { name: 'Nina Simone', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop' }
    ],
    topMovieIds: ['la-la-land', 'her', 'forrest-gump', 'interstellar'],
    centroid: { 'Romance': 0.97, 'Drama': 0.88, 'Musical': 0.82, 'Comedy': 0.65, 'Sci-Fi': 0.35, 'Action': 0.15 }
  },
  {
    id: 5,
    name: 'Indie & Classics',
    label: 'Cluster 5 · Indie & Classics',
    color: '#ec4899', // Hot Pink
    bgColor: 'rgba(236, 72, 153, 0.12)',
    borderColor: 'rgba(236, 72, 153, 0.4)',
    percentage: 11,
    userCount: 157,
    topGenres: ['Indie', 'Classic', 'Art House', 'Drama'],
    description: 'Cinephiles dedicated to auteur cinema, bold cinematography, distinctive color palettes, and revolutionary indie classics.',
    sampleUsers: [
      { name: 'Felix Meyer', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop' },
      { name: 'Zoe Deschanel', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop' },
      { name: 'Leo Varma', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop' }
    ],
    topMovieIds: ['pulp-fiction', 'whiplash', 'grand-budapest-hotel', 'fight-club', 'parasite'],
    centroid: { 'Indie': 0.96, 'Drama': 0.90, 'Classic': 0.85, 'Music': 0.78, 'Thriller': 0.65, 'Action': 0.25 }
  }
];

// Dharshan is the default user from the screenshot
export const DEFAULT_USER: UserProfile = {
  id: 'usr_dharshan_2026',
  name: 'Dharshan',
  avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=120&h=120&fit=crop',
  email: 'dharshandachu3@gmail.com',
  role: 'Movie Explorer',
  clusterId: 2, // Mindful Explorers
  clusterName: 'Cluster 2 · The Mindful Explorers',
  preferredGenres: ['Sci-Fi', 'Thriller', 'Drama', 'Indie', 'Action', 'Mystery'],
  watchlist: ['dune-part-two', 'blade-runner-2049'],
  ratedMovies: {
    'inception': 9.5,
    'interstellar': 10,
    'dark-knight': 9.0,
    'fight-club': 8.5,
    'oppenheimer': 9.0,
    'arrival': 8.8,
    'parasite': 8.5,
    'the-matrix': 8.0,
    'whiplash': 8.5,
    'pulp-fiction': 8.0
  }
};

export const PRESET_PERSONAS: UserProfile[] = [
  DEFAULT_USER,
  {
    id: 'usr_maya_action',
    name: 'Maya Croft',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&h=120&fit=crop',
    email: 'maya@cinevibe.io',
    role: 'Action & Adrenaline Junkie',
    clusterId: 1,
    clusterName: 'Cluster 1 · Action Lovers',
    preferredGenres: ['Action', 'Sci-Fi', 'Adventure', 'Crime'],
    watchlist: ['the-batman', 'gladiator'],
    ratedMovies: {
      'dark-knight': 9.8,
      'the-matrix': 9.5,
      'the-avengers': 9.0,
      'spider-verse': 9.2,
      'gladiator': 9.0,
      'deadpool-wolverine': 8.5
    }
  },
  {
    id: 'usr_chloe_comedy',
    name: 'Chloe Sparks',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=120&h=120&fit=crop',
    email: 'chloe@cinevibe.io',
    role: 'Satire & Comedy Connoisseur',
    clusterId: 3,
    clusterName: 'Cluster 3 · Comedy Fans',
    preferredGenres: ['Comedy', 'Adventure', 'Family', 'Action'],
    watchlist: ['grand-budapest-hotel'],
    ratedMovies: {
      'deadpool-wolverine': 9.2,
      'everything-everywhere': 9.6,
      'grand-budapest-hotel': 9.0,
      'parasite': 8.0
    }
  },
  {
    id: 'usr_aria_romance',
    name: 'Aria Sterling',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=120&h=120&fit=crop',
    email: 'aria@cinevibe.io',
    role: 'Hopeless Romantic',
    clusterId: 4,
    clusterName: 'Cluster 4 · Romance Seekers',
    preferredGenres: ['Romance', 'Musical', 'Drama'],
    watchlist: ['forrest-gump'],
    ratedMovies: {
      'la-la-land': 10,
      'her': 9.5,
      'forrest-gump': 9.2
    }
  },
  {
    id: 'usr_leo_indie',
    name: 'Leo Varma',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&h=120&fit=crop',
    email: 'leo@cinevibe.io',
    role: 'Auteur & Arthouse Purist',
    clusterId: 5,
    clusterName: 'Cluster 5 · Indie & Classics',
    preferredGenres: ['Indie', 'Classic', 'Music', 'Drama'],
    watchlist: ['whiplash'],
    ratedMovies: {
      'pulp-fiction': 9.8,
      'whiplash': 9.7,
      'grand-budapest-hotel': 9.2,
      'fight-club': 9.0
    }
  }
];

// Generate deterministic realistic 2D points for the t-SNE plot
function generateTSNEPoints(): ClusterPoint[] {
  const points: ClusterPoint[] = [];

  // Center positions for the 5 clusters on a 2D plane [-100, 100]
  // Matching the visual layout in screenshot:
  // Cluster 1 (Blue): Top-left (-45, 35)
  // Cluster 2 (Purple/Teal): Center-right (35, 25)
  // Cluster 3 (Green): Top-right (45, 45)
  // Cluster 4 (Orange): Bottom-center (10, -35)
  // Cluster 5 (Pink): Bottom-right (50, -40)
  const clusterCenters = [
    { id: 1, name: 'Action Lovers', cx: -45, cy: 30, color: '#38bdf8', count: 32, genres: ['Action', 'Sci-Fi', 'Adventure'] },
    { id: 2, name: 'Mindful Explorers', cx: 10, cy: 45, color: '#a855f7', count: 26, genres: ['Sci-Fi', 'Thriller', 'Drama'] },
    { id: 3, name: 'Comedy Fans', cx: 48, cy: 35, color: '#10b981', count: 22, genres: ['Comedy', 'Family', 'Adventure'] },
    { id: 4, name: 'Romance Seekers', cx: -10, cy: -32, color: '#f59e0b', count: 18, genres: ['Romance', 'Drama', 'Musical'] },
    { id: 5, name: 'Indie & Classics', cx: 45, cy: -35, color: '#ec4899', count: 16, genres: ['Indie', 'Classic', 'Art House'] }
  ];

  // Pseudo-random generator for consistent layout
  let seed = 42;
  function pseudoRandom() {
    seed = (seed * 9301 + 49297) % 233280;
    return seed / 233280;
  }

  // Box-Muller transform for normal distribution
  function normalRandom(mean = 0, stdDev = 1) {
    const u1 = pseudoRandom();
    const u2 = pseudoRandom();
    const z0 = Math.sqrt(-2.0 * Math.log(u1 || 0.0001)) * Math.cos(2.0 * Math.PI * u2);
    return mean + z0 * stdDev;
  }

  const sampleNames = [
    'Sam W.', 'Jordan P.', 'Chris T.', 'Casey M.', 'Taylor N.',
    'Morgan K.', 'Riley B.', 'Dakota S.', 'Quinn L.', 'Reese D.',
    'Avery G.', 'Logan H.', 'Rowan C.', 'Hayden E.', 'Kendall V.'
  ];

  clusterCenters.forEach((center) => {
    for (let i = 0; i < center.count; i++) {
      const x = center.cx + normalRandom(0, 11);
      const y = center.cy + normalRandom(0, 9);
      const name = `${sampleNames[(i + center.id * 3) % sampleNames.length]} #${100 + i}`;

      points.push({
        id: `u_${center.id}_${i}`,
        x: Math.round(x * 10) / 10,
        y: Math.round(y * 10) / 10,
        clusterId: center.id,
        clusterName: center.name,
        userName: name,
        avatar: `https://images.unsplash.com/photo-${1530000000000 + i * 1000}?w=60&h=60&fit=crop`,
        genres: center.genres,
        isCurrentUser: false,
        ratedCount: Math.floor(40 + pseudoRandom() * 160)
      });
    }
  });

  // Current user Dharshan point in Cluster 2
  points.push({
    id: DEFAULT_USER.id,
    x: 12.4,
    y: 47.8,
    clusterId: 2,
    clusterName: 'Mindful Explorers',
    userName: 'Dharshan (You)',
    avatar: DEFAULT_USER.avatar,
    genres: DEFAULT_USER.preferredGenres,
    isCurrentUser: true,
    ratedCount: 187
  });

  return points;
}

export const TSNE_USER_POINTS = generateTSNEPoints();
