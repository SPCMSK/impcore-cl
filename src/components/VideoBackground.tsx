'use client';

import { useState, useRef, useEffect } from 'react';

interface VideoBackgroundProps {
  src: string;
  youtubeId?: string;
  fallbackImage?: string;
  className?: string;
  opacity?: number;
}

export default function VideoBackground({ 
  src, 
  youtubeId = '',
  fallbackImage = '',
  className = '',
  opacity = 0.4 
}: VideoBackgroundProps) {
  const [videoState, setVideoState] = useState<'loading' | 'success' | 'error'>('loading');
  const [useYoutube, setUseYoutube] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleCanPlay = () => {
      console.log('Video can play');
      setVideoState('success');
    };

    const handleError = (e: Event) => {
      console.error('Video failed to load:', e);
      setVideoState('error');
      // Try YouTube if available
      if (youtubeId) {
        setUseYoutube(true);
      }
    };

    const handleLoadStart = () => {
      console.log('Video load started');
    };

    video.addEventListener('canplay', handleCanPlay);
    video.addEventListener('error', handleError);
    video.addEventListener('loadstart', handleLoadStart);

    // Timeout fallback - if video doesn't load in 5 seconds, use fallback
    const timeout = setTimeout(() => {
      if (videoState === 'loading') {
        console.log('Video load timeout, using fallback');
        setVideoState('error');
        if (youtubeId) {
          setUseYoutube(true);
        }
      }
    }, 5000);

    return () => {
      video.removeEventListener('canplay', handleCanPlay);
      video.removeEventListener('error', handleError);
      video.removeEventListener('loadstart', handleLoadStart);
      clearTimeout(timeout);
    };
  }, [videoState, youtubeId]);

  // YouTube iframe background
  if (useYoutube && youtubeId) {
    return (
      <div className={`absolute inset-0 z-0 ${className}`}>
        <iframe
          src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1&mute=1&loop=1&playlist=${youtubeId}&controls=0&showinfo=0&rel=0&iv_load_policy=3&modestbranding=1`}
          className="w-full h-full object-cover scale-125"
          style={{ 
            opacity,
            pointerEvents: 'none',
            border: 'none'
          }}
          allow="autoplay; encrypted-media"
          allowFullScreen={false}
        />
        <div className="absolute inset-0 bg-black/30" />
      </div>
    );
  }

  // Fallback image
  if (videoState === 'error' && !youtubeId) {
    return (
      <div 
        className={`absolute inset-0 z-0 ${className}`}
        style={{
          background: fallbackImage 
            ? `url(${fallbackImage}) center/cover no-repeat`
            : 'linear-gradient(135deg, #1a1a1a 0%, #2d1b69 50%, #000000 100%)',
          opacity
        }}
      >
        <div className="absolute inset-0 bg-black/30" />
      </div>
    );
  }

  return (
    <div className={`absolute inset-0 z-0 ${className}`}>
      {/* Loading state */}
      {videoState === 'loading' && (
        <div 
          className="absolute inset-0 bg-gradient-to-br from-purple-900 via-black to-blue-900 flex items-center justify-center"
          style={{ opacity }}
        >
          <div className="text-white text-sm opacity-70">Loading...</div>
        </div>
      )}
      
      {/* Video element */}
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        className={`w-full h-full object-cover transition-opacity duration-1000 ${
          videoState === 'success' ? 'opacity-100' : 'opacity-0'
        }`}
        style={{ opacity: videoState === 'success' ? opacity : 0 }}
        onLoadedData={() => {
          console.log('Video data loaded');
          setVideoState('success');
        }}
        onError={(e) => {
          console.error('Video error:', e);
          setVideoState('error');
        }}
      >
        <source src={src} type="video/mp4" />
      </video>
      
      <div className="absolute inset-0 bg-black/30" />
    </div>
  );
}
