'use client';

import { useEffect } from 'react';

interface InstantVideoProps {
  src: string;
}

export default function InstantVideo({ src }: InstantVideoProps) {
  useEffect(() => {
    // Preload video using video element instead of link preload
    const video = document.createElement('video');
    video.src = src;
    video.preload = 'metadata';
    video.muted = true;
    video.style.display = 'none';
    document.body.appendChild(video);

    return () => {
      document.body.removeChild(video);
    };
  }, [src]);

  return (
    <div className="absolute inset-0 z-0">
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        className="w-full h-full object-cover opacity-40"
        style={{
          // Force hardware acceleration
          transform: 'translateZ(0)',
          willChange: 'transform'
        }}
      >
        <source src={src} type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-black/30" />
    </div>
  );
}
