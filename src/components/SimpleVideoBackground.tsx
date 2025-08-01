'use client';

import { useState, useEffect } from 'react';

interface SimpleVideoBackgroundProps {
  src: string;
  youtubeId?: string;
  className?: string;
}

export default function SimpleVideoBackground({ 
  src, 
  youtubeId = 'jRD4jQRYOSE',
  className = '' 
}: SimpleVideoBackgroundProps) {
  const [videoFailed, setVideoFailed] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className={`absolute inset-0 z-0 ${className}`}>
        <div className="w-full h-full bg-gradient-to-br from-purple-900 via-black to-blue-900 opacity-40" />
        <div className="absolute inset-0 bg-black/30" />
      </div>
    );
  }

  // Si el video falla, usar YouTube
  if (videoFailed) {
    return (
      <div className={`absolute inset-0 z-0 ${className}`}>
        <div className="w-full h-full relative overflow-hidden">
          <iframe
            src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1&mute=1&loop=1&playlist=${youtubeId}&controls=0&showinfo=0&rel=0&iv_load_policy=3&modestbranding=1&start=10`}
            className="absolute top-0 left-0 w-full h-full scale-125 opacity-40"
            style={{ 
              border: 'none',
              pointerEvents: 'none'
            }}
            allow="autoplay; encrypted-media"
          />
        </div>
        <div className="absolute inset-0 bg-black/30" />
      </div>
    );
  }

  return (
    <div className={`absolute inset-0 z-0 ${className}`}>
      <video
        autoPlay
        muted
        loop
        playsInline
        className="w-full h-full object-cover opacity-40"
        onError={() => {
          console.log('Video failed, switching to YouTube');
          setVideoFailed(true);
        }}
        onLoadStart={() => console.log('Video loading started')}
        onCanPlay={() => console.log('Video can play')}
      >
        <source src={src} type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-black/30" />
    </div>
  );
}
