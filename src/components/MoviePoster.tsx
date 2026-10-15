import React, { useState } from 'react';
import { Film } from 'lucide-react';

interface MoviePosterProps {
  src: string;
  alt: string;
  className?: string;
  fallbackTitle?: string;
}

export const MoviePoster: React.FC<MoviePosterProps> = ({
  src,
  alt,
  className = 'w-full h-full object-cover',
  fallbackTitle,
}) => {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div className={`flex flex-col items-center justify-center bg-gradient-to-br from-slate-900 via-indigo-950 to-purple-950 text-slate-300 p-3 text-center ${className}`}>
        <Film className="w-8 h-8 text-violet-400 mb-2 opacity-80" />
        <span className="text-xs font-bold text-white line-clamp-2 px-1">
          {fallbackTitle || alt}
        </span>
        <span className="text-[10px] text-violet-400/80 mt-1 uppercase tracking-widest font-mono">
          CineVibe
        </span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      onError={() => setHasError(true)}
      loading="lazy"
    />
  );
};
