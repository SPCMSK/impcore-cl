'use client';

import { useState, useEffect } from 'react';

interface HybridVideoBackgroundProps {
  cloudinaryUrl?: string;
  youtubeId: string;
  fallbackImage: string;
  className?: string;
}

export default function HybridVideoBackground({ 
  cloudinaryUrl = '',
  youtubeId,
  fallbackImage,
  className = '' 
}: HybridVideoBackgroundProps) {
  const [videoState, setVideoState] = useState<'loading' | 'cloudinary' | 'youtube' | 'fallback'>('loading');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    // Si no hay URL de Cloudinary, usar YouTube directamente
    if (!cloudinaryUrl) {
      setVideoState('youtube');
      return;
    }

    // Intentar cargar video de Cloudinary
    const video = document.createElement('video');
    video.src = cloudinaryUrl;
    
    const timeout = setTimeout(() => {
      setVideoState('youtube');
    }, 5000); // 5 segundos timeout

    video.onloadeddata = () => {
      setVideoState('cloudinary');
      clearTimeout(timeout);
    };

    video.onerror = () => {
      setVideoState('youtube');
      clearTimeout(timeout);
    };

    return () => clearTimeout(timeout);
  }, [cloudinaryUrl]);

  if (!mounted) {
    return (
      <div className={`absolute inset-0 z-0 ${className}`}>
        <div className="w-full h-full bg-gradient-to-br from-purple-900 via-black to-blue-900 opacity-40" />
        <div className="absolute inset-0 bg-black/30" />
      </div>
    );
  }

  // Cloudinary Video
  if (videoState === 'cloudinary' && cloudinaryUrl) {
    return (
      <div className={`absolute inset-0 z-0 ${className}`}>
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover opacity-40"
          onError={() => setVideoState('youtube')}
        >
          <source src={cloudinaryUrl} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/30" />
      </div>
    );
  }

  // YouTube Video
  if (videoState === 'youtube') {
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
        {process.env.NODE_ENV === 'development' && (
          <div className="absolute bottom-4 right-4 text-white/50 text-xs bg-black/50 p-2 rounded">
            Using YouTube: {youtubeId}
          </div>
        )}
      </div>
    );
  }

  // Fallback Image
  return (
    <div 
      className={`absolute inset-0 z-0 ${className}`}
      style={{
        background: `url(${fallbackImage}) center/cover no-repeat`,
        opacity: 0.4
      }}
    >
      <div className="absolute inset-0 bg-black/30" />
    </div>
  );
}
