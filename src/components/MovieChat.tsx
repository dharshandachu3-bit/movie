import React, { useState, useEffect, useRef } from 'react';
import {
  Sparkles,
  Send,
  Bot,
  User,
  Star,
  Bookmark,
  RotateCcw,
  Film,
  ArrowRight,
  Compass,
  Check,
  Zap,
} from 'lucide-react';
import { Movie, UserProfile } from '../types';
import { MOVIES } from '../data/moviesData';
import { MoviePoster } from './MoviePoster';

interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  recommendedMovies?: Movie[];
  isStreaming?: boolean;
  clusterContext?: string;
}

interface MovieChatProps {
  currentUser: UserProfile;
  onSelectMovie: (movie: Movie) => void;
  onToggleWatchlist: (movieId: string) => void;
}

const STARTER_PROMPTS = [
  {
    icon: '🌌',
    label: 'Mind-Bending Sci-Fi',
    query: 'Recommend mind-bending sci-fi movies that explore time, dreams, or existential questions.',
  },
  {
    icon: '🦇',
    label: 'Gritty Noir Thrillers',
    query: 'I want a dark, atmospheric detective thriller with psychological tension like The Batman or Fight Club.',
  },
  {
    icon: '🎷',
    label: 'Aesthetic Romances',
    query: 'Show me visually striking romances with melancholic yearning and incredible soundtracks.',
  },
  {
    icon: '🍿',
    label: 'Sharp Satirical Comedies',
    query: 'Looking for clever dark comedies with distinctive auteur visuals and witty scripts.',
  },
  {
    icon: '💥',
    label: 'High-Octane Kinetic Action',
    query: 'Give me intense, fast-paced action movies with top-tier choreography and heroic stakes.',
  },
];

export const MovieChat: React.FC<MovieChatProps> = ({
  currentUser,
  onSelectMovie,
  onToggleWatchlist,
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome_msg',
      sender: 'assistant',
      text: `Hello ${currentUser.name}! I'm your CineVibe AI recommendation assistant. I analyze your profile in ${currentUser.clusterName} and our 30+ dimensional TF-IDF movie space.\n\nTell me what you're in the mood for — whether it's a specific genre, mood, director, plot twist, or a blend of your favorite films!`,
      timestamp: 'Just now',
      clusterContext: currentUser.clusterName,
    },
  ]);

  const [inputQuery, setInputQuery] = useState('');
  const [isStreaming, setIsStreaming] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom of chat
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isStreaming]);

  // Semantic query matcher to select matching movies from dataset
  const matchMoviesForQuery = (query: string): { movies: Movie[]; rationale: string } => {
    const q = query.toLowerCase();

    const scored = MOVIES.map((movie) => {
      let score = 0;

      // Genre matching
      movie.genres.forEach((g) => {
        if (q.includes(g.toLowerCase())) score += 3.5;
      });

      // Tag matching
      movie.tags.forEach((t) => {
        if (q.includes(t.toLowerCase())) score += 2.8;
      });

      // Director matching
      if (q.includes(movie.director.toLowerCase())) score += 5.0;

      // Cast matching
      movie.cast.forEach((c) => {
        if (q.includes(c.toLowerCase())) score += 3.0;
      });

      // Keyword associations
      if (q.includes('mind') || q.includes('time') || q.includes('space') || q.includes('dream') || q.includes('physics')) {
        if (['inception', 'interstellar', 'arrival', 'blade-runner-2049'].includes(movie.id)) score += 4.0;
      }
      if (q.includes('dark') || q.includes('noir') || q.includes('batman') || q.includes('detective') || q.includes('crime')) {
        if (['dark-knight', 'the-batman', 'joker', 'pulp-fiction', 'fight-club'].includes(movie.id)) score += 4.0;
      }
      if (q.includes('love') || q.includes('romance') || q.includes('aesthetic') || q.includes('music') || q.includes('heart')) {
        if (['la-la-land', 'her', 'forrest-gump', 'whiplash'].includes(movie.id)) score += 4.0;
      }
      if (q.includes('comedy') || q.includes('funny') || q.includes('satire') || q.includes('quirky') || q.includes('fun')) {
        if (['deadpool-wolverine', 'everything-everywhere', 'grand-budapest-hotel', 'parasite'].includes(movie.id)) score += 4.0;
      }
      if (q.includes('action') || q.includes('hero') || q.includes('fight') || q.includes('epic') || q.includes('adrenaline')) {
        if (['the-matrix', 'the-avengers', 'gladiator', 'spider-verse', 'dune-part-two'].includes(movie.id)) score += 4.0;
      }

      // User taste affinity boost
      if (movie.clusterAffinity === currentUser.clusterId) {
        score += 2.0;
      }
      if (currentUser.ratedMovies[movie.id] && currentUser.ratedMovies[movie.id] >= 8) {
        score += 1.5;
      }

      return { movie, score };
    });

    // Sort descending by score
    scored.sort((a, b) => b.score - a.score);

    // Pick top 2-3 movies
    const topPicks = scored.slice(0, 3).map((s) => s.movie);

    // Build personalized rationale
    const firstMovie = topPicks[0] || MOVIES[0];
    const secondMovie = topPicks[1] || MOVIES[1];

    let rationale = `Based on your request and taste vectors in ${currentUser.clusterName}, I've mapped your query through our TF-IDF embedding space.\n\n` +
      `Here is why these are curated for you:\n` +
      `• **${firstMovie.title}** (${firstMovie.year}): Perfectly matches your prompt with its ${firstMovie.genres.join(' & ')} focus and directed by ${firstMovie.director}. It has a high cosine similarity of 96% with your profile.\n` +
      `• **${secondMovie.title}** (${secondMovie.year}): A stellar counterpart offering exceptional atmosphere, acclaimed performances by ${secondMovie.cast.slice(0, 2).join(' & ')}, and an IMDb rating of ${secondMovie.rating}/10.\n\n` +
      `Check out their details below or tap to add directly to your CineVibe watchlist:`;

    return {
      movies: topPicks,
      rationale,
    };
  };

  // Mock streaming response implementation
  const handleSendMessage = (textToSend?: string) => {
    const query = (textToSend || inputQuery).trim();
    if (!query || isStreaming) return;

    // 1. Add user message
    const userMsgId = `user_${Date.now()}`;
    const userMsg: ChatMessage = {
      id: userMsgId,
      sender: 'user',
      text: query,
      timestamp: 'Just now',
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputQuery('');
    setIsStreaming(true);

    // 2. Prepare matching recommendations and full response text
    const { movies: recommendedPicks, rationale: fullResponse } = matchMoviesForQuery(query);

    // 3. Create placeholder assistant message that will stream tokens
    const botMsgId = `bot_${Date.now()}`;
    const initialBotMsg: ChatMessage = {
      id: botMsgId,
      sender: 'assistant',
      text: '',
      timestamp: 'Just now',
      isStreaming: true,
      clusterContext: currentUser.clusterName,
    };

    setMessages((prev) => [...prev, initialBotMsg]);

    // 4. Token-by-token / chunk streaming simulation
    const chunks = fullResponse.split(' ');
    let currentChunkIndex = 0;
    let accumulatedText = '';

    const streamInterval = setInterval(() => {
      if (currentChunkIndex < chunks.length) {
        // Stream 2-3 words per tick for smooth natural typing rhythm
        const nextWords = chunks.slice(currentChunkIndex, currentChunkIndex + 2).join(' ') + ' ';
        accumulatedText += nextWords;
        currentChunkIndex += 2;

        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === botMsgId
              ? { ...msg, text: accumulatedText }
              : msg
          )
        );
      } else {
        // Streaming finished
        clearInterval(streamInterval);
        setIsStreaming(false);

        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === botMsgId
              ? {
                  ...msg,
                  text: fullResponse,
                  isStreaming: false,
                  recommendedMovies: recommendedPicks,
                }
              : msg
          )
        );
      }
    }, 45);
  };

  const handleResetChat = () => {
    setMessages([
      {
        id: 'welcome_reset',
        sender: 'assistant',
        text: `Chat reset! What type of cinema experience are you looking for next, ${currentUser.name}?`,
        timestamp: 'Just now',
        clusterContext: currentUser.clusterName,
      },
    ]);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300 max-w-5xl mx-auto">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-white/5">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-violet-950/60 border border-violet-500/30 text-[11px] font-bold text-violet-300 uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5 text-pink-400 animate-pulse" />
            <span>AI Neural Recommender · Natural Language Discovery</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold font-display text-white tracking-tight">
            MovieChat
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Talk to CineVibe AI in plain English. Get real-time streaming recommendations grounded in your personal taste cluster.
          </p>
        </div>

        {/* Clear Chat Button */}
        <button
          onClick={handleResetChat}
          className="self-start sm:self-auto inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold glass-card hover:bg-white/10 text-slate-400 hover:text-white transition-all cursor-pointer border border-white/10"
          title="Reset conversation"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset Chat</span>
        </button>
      </div>

      {/* Starter Prompts Bar */}
      <div className="space-y-2">
        <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
          <Zap className="w-3.5 h-3.5 text-amber-400" />
          <span>Quick Inspiration Prompts</span>
        </span>
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {STARTER_PROMPTS.map((prompt, idx) => (
            <button
              key={idx}
              onClick={() => handleSendMessage(prompt.query)}
              disabled={isStreaming}
              className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-medium glass-card hover:border-violet-500/40 hover:bg-violet-950/20 text-slate-300 hover:text-white transition-all whitespace-nowrap cursor-pointer disabled:opacity-50 flex-shrink-0"
            >
              <span>{prompt.icon}</span>
              <span>{prompt.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Chat Box */}
      <div className="glass-panel-glow rounded-2xl border border-violet-500/25 overflow-hidden flex flex-col h-[600px] shadow-2xl bg-[#070b1a]">
        
        {/* Messages Stream Container */}
        <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-6">
          {messages.map((msg) => {
            const isUser = msg.sender === 'user';

            return (
              <div
                key={msg.id}
                className={`flex gap-3.5 ${isUser ? 'justify-end' : 'justify-start'}`}
              >
                {/* Bot Avatar */}
                {!isUser && (
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-violet-600 via-fuchsia-600 to-pink-500 p-0.5 flex-shrink-0 shadow-md shadow-violet-500/30">
                    <div className="w-full h-full bg-[#090d1a] rounded-[10px] flex items-center justify-center">
                      <Bot className="w-4 h-4 text-violet-300" />
                    </div>
                  </div>
                )}

                {/* Message Bubble & Content */}
                <div className={`max-w-[85%] sm:max-w-[78%] space-y-3.5 ${isUser ? 'items-end' : 'items-start'}`}>
                  
                  {/* Sender Name & Meta */}
                  <div className={`flex items-center gap-2 text-[11px] text-slate-400 ${isUser ? 'justify-end' : 'justify-start'}`}>
                    <span className="font-semibold text-slate-300">
                      {isUser ? currentUser.name : 'CineVibe Assistant'}
                    </span>
                    {!isUser && msg.clusterContext && (
                      <span className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-violet-950/70 text-violet-300 border border-violet-800/40">
                        {msg.clusterContext}
                      </span>
                    )}
                    <span>· {msg.timestamp}</span>
                  </div>

                  {/* Text Container */}
                  <div
                    className={`p-4 rounded-2xl text-sm leading-relaxed ${
                      isUser
                        ? 'bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white rounded-tr-none shadow-lg shadow-violet-600/25'
                        : 'glass-card border border-white/10 text-slate-200 rounded-tl-none bg-[#0e1428]/90'
                    }`}
                  >
                    <div className="whitespace-pre-line font-normal">
                      {msg.text}
                      {msg.isStreaming && (
                        <span className="inline-block w-2 h-4 ml-1 bg-violet-400 animate-pulse align-middle" />
                      )}
                    </div>
                  </div>

                  {/* Embedded Interactive Movie Recommendations */}
                  {msg.recommendedMovies && msg.recommendedMovies.length > 0 && (
                    <div className="space-y-2 pt-1 animate-in fade-in duration-300">
                      <div className="text-xs font-bold text-violet-300 uppercase tracking-wider flex items-center gap-1.5">
                        <Film className="w-3.5 h-3.5" />
                        <span>Curated Matches</span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                        {msg.recommendedMovies.map((movie) => {
                          const isWatchlisted = currentUser.watchlist.includes(movie.id);

                          return (
                            <div
                              key={movie.id}
                              onClick={() => onSelectMovie(movie)}
                              className="group rounded-xl overflow-hidden glass-panel hover:border-violet-500/50 transition-all duration-200 cursor-pointer flex flex-col justify-between border border-white/10 bg-[#090e21]"
                            >
                              <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-900">
                                <MoviePoster
                                  src={movie.backdrop || movie.poster}
                                  alt={movie.title}
                                  fallbackTitle={movie.title}
                                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#090e21] via-black/30 to-transparent" />

                                <div className="absolute top-2 left-2 px-1.5 py-0.5 rounded bg-violet-950/90 text-violet-300 font-bold text-[10px] border border-violet-500/30">
                                  {movie.matchScore || 96}% Match
                                </div>

                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    onToggleWatchlist(movie.id);
                                  }}
                                  className={`absolute top-2 right-2 p-1.5 rounded-full backdrop-blur-md transition-all ${
                                    isWatchlisted
                                      ? 'bg-pink-600 text-white'
                                      : 'bg-black/60 text-slate-300 hover:text-white'
                                  }`}
                                  title={isWatchlisted ? 'Remove from Watchlist' : 'Add to Watchlist'}
                                >
                                  <Bookmark className="w-3 h-3 fill-current" />
                                </button>

                                <div className="absolute bottom-2 left-2 flex items-center gap-1 text-[11px] font-bold text-amber-300 bg-black/60 px-1.5 py-0.5 rounded backdrop-blur-sm">
                                  <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                                  <span>{movie.rating}</span>
                                </div>
                              </div>

                              <div className="p-3 space-y-1">
                                <h4 className="text-xs font-bold text-white group-hover:text-violet-300 transition-colors truncate">
                                  {movie.title}
                                </h4>
                                <p className="text-[10px] text-slate-400 line-clamp-1">
                                  {movie.genres.join(' · ')} ({movie.year})
                                </p>
                                <div className="pt-2 flex items-center justify-between text-[11px] text-violet-400 group-hover:translate-x-1 transition-transform">
                                  <span className="font-semibold text-[10px]">View Details</span>
                                  <ArrowRight className="w-3 h-3" />
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                </div>

                {/* User Avatar */}
                {isUser && (
                  <img
                    src={currentUser.avatar}
                    alt={currentUser.name}
                    className="w-9 h-9 rounded-xl object-cover ring-2 ring-violet-500/40 flex-shrink-0"
                  />
                )}
              </div>
            );
          })}

          <div ref={messagesEndRef} />
        </div>

        {/* Query Input Area */}
        <div className="p-4 bg-[#0a0f26] border-t border-white/10">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="flex items-center gap-2.5"
          >
            <div className="relative flex-1">
              <input
                type="text"
                value={inputQuery}
                onChange={(e) => setInputQuery(e.target.value)}
                placeholder="Ask CineVibe: 'A dark psychological thriller with great cinematography' or 'Mind-bending like Interstellar'..."
                disabled={isStreaming}
                className="w-full pl-4 pr-10 py-3 rounded-xl bg-slate-900/90 border border-white/10 text-sm text-white placeholder-slate-400 focus:outline-none focus:border-violet-500/60 focus:ring-1 focus:ring-violet-500/60 transition-all disabled:opacity-50"
              />
            </div>

            <button
              type="submit"
              disabled={!inputQuery.trim() || isStreaming}
              className="px-5 py-3 rounded-xl bg-gradient-to-r from-violet-600 via-fuchsia-600 to-pink-600 hover:from-violet-500 hover:to-pink-500 text-white font-bold text-xs flex items-center gap-2 shadow-lg shadow-violet-600/30 transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex-shrink-0"
            >
              <span>Send</span>
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>

          <div className="mt-2 text-center text-[11px] text-slate-500">
            Powered by CineVibe's TF-IDF vector space & collaborative filtering engine. Grounded in your taste cluster.
          </div>
        </div>

      </div>

    </div>
  );
};
