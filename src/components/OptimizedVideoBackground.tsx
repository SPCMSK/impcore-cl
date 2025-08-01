'use client';

import { useState, useEffect, useRef } from 'react';

export default function OptimizedVideoBackground() {
  const [videoState, setVideoState] = useState<'loading' | 'playing' | 'failed'>('loading');
  const videoRef = useRef<HTMLVideoElement>(null);
  const [showYoutube, setShowYoutube] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let timeoutId: NodeJS.Timeout;
    
    const handleCanPlay = () => {
      console.log('✅ Video can play');
      setVideoState('playing');
      clearTimeout(timeoutId);
    };

    const handleError = (e: any) => {
      console.error('❌ Video error:', e);
      setVideoState('failed');
      setShowYoutube(true);
      clearTimeout(timeoutId);
    };

    // Timeout después de 3 segundos
    timeoutId = setTimeout(() => {
      if (videoState === 'loading') {
        console.log('⏰ Video timeout - switching to YouTube');
        setVideoState('failed');
        setShowYoutube(true);
      }
    }, 3000);

    video.addEventListener('canplay', handleCanPlay);
    video.addEventListener('error', handleError);

    return () => {
      video.removeEventListener('canplay', handleCanPlay);
      video.removeEventListener('error', handleError);
      clearTimeout(timeoutId);
    };
  }, [videoState]);

  // YouTube fallback
  if (showYoutube) {
    return (
      <div className="absolute inset-0 z-0">
        <div className="w-full h-full relative">
          <iframe
            src="https://www.youtube.com/embed/jRD4jQRYOSE?autoplay=1&mute=1&loop=1&playlist=jRD4jQRYOSE&controls=0&showinfo=0&rel=0&iv_load_policy=3&modestbranding=1"
            className="absolute inset-0 w-full h-full object-cover scale-110 opacity-50"
            style={{ border: 'none', pointerEvents: 'none' }}
            allow="autoplay; encrypted-media"
          />
        </div>
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute bottom-4 right-4 text-white/50 text-xs">
          Using YouTube fallback
        </div>
      </div>
    );
  }

  return (
    <div className="absolute inset-0 z-0">
      {/* Loading state */}
      {videoState === 'loading' && (
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-black to-blue-900 opacity-50 flex items-center justify-center">
          <div className="text-white/70 text-sm">Loading video...</div>
        </div>
      )}

      {/* Video */}
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        className={`w-full h-full object-cover transition-opacity duration-1000 ${
          videoState === 'playing' ? 'opacity-40' : 'opacity-0'
        }`}
      >
        <source src="/images/videopagina.mp4" type="video/mp4" />
      </video>

      <div className="absolute inset-0 bg-black/30" />
      
      {/* Debug info */}
      {process.env.NODE_ENV === 'development' && (
        <div className="absolute bottom-4 left-4 text-white/50 text-xs">
          Video state: {videoState}
        </div>
      )}
    </div>
  );
}
