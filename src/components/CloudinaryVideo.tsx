'use client';

import { useState, useEffect, useRef } from 'react';

interface CloudinaryVideoProps {
  cloudinaryUrl: string;
  fallbackImage?: string;
  className?: string;
}

export default function CloudinaryVideo({ 
  cloudinaryUrl, 
  fallbackImage = '/images/background.jpg',
  className = '' 
}: CloudinaryVideoProps) {
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Preload the video immediately
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Set video to load immediately
    video.load();
    
    const handleLoadStart = () => {
      console.log('Video loading started');
    };

    const handleCanPlay = () => {
      console.log('✅ Video can play');
      setVideoLoaded(true);
    };

    const handleLoadedData = () => {
      console.log('✅ Video data loaded');
      setVideoLoaded(true);
    };

    video.addEventListener('loadstart', handleLoadStart);
    video.addEventListener('canplay', handleCanPlay);
    video.addEventListener('loadeddata', handleLoadedData);

    return () => {
      video.removeEventListener('loadstart', handleLoadStart);
      video.removeEventListener('canplay', handleCanPlay);
      video.removeEventListener('loadeddata', handleLoadedData);
    };
  }, []);

  // URL optimizada para Cloudinary
  const optimizedVideoUrl = cloudinaryUrl.includes('cloudinary.com') 
    ? cloudinaryUrl.replace('/upload/', '/upload/q_auto,f_auto,w_1920,h_1080,c_fill/')
    : cloudinaryUrl;

  if (videoError) {
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

  return (
    <div className={`absolute inset-0 z-0 ${className}`}>
      {/* Video - Start visible immediately */}
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        className="w-full h-full object-cover opacity-40"
        onLoadedData={() => {
          console.log('✅ Cloudinary video loaded');
          setVideoLoaded(true);
        }}
        onError={(e) => {
          console.error('❌ Cloudinary video error:', e);
          setVideoError(true);
        }}
        onCanPlay={() => {
          setVideoLoaded(true);
        }}
      >
        <source src={optimizedVideoUrl} type="video/mp4" />
      </video>

      <div className="absolute inset-0 bg-black/30" />
      
      {/* Debug info en desarrollo */}
      {process.env.NODE_ENV === 'development' && (
        <div className="absolute bottom-4 left-4 text-white/50 text-xs bg-black/50 p-2 rounded">
          <div>Video: {videoLoaded ? '✅ Loaded' : '⏳ Loading'}</div>
          <div>Source: Cloudinary</div>
        </div>
      )}
    </div>
  );
}
