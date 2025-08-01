'use client';

import { useState, useEffect } from 'react';

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
      {/* Loading state */}
      {!videoLoaded && (
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-black to-blue-900 opacity-40 flex items-center justify-center">
          <div className="text-white/70 text-sm">Loading video...</div>
        </div>
      )}

      {/* Video */}
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        className={`w-full h-full object-cover transition-opacity duration-1000 ${
          videoLoaded ? 'opacity-40' : 'opacity-0'
        }`}
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
