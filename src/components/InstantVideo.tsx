'use client';

import { useEffect } from 'react';

interface InstantVideoProps {
  src: string;
}

export default function InstantVideo({ src }: InstantVideoProps) {
  useEffect(() => {
    // Preload video immediately
    const link = document.createElement('link');
    link.rel = 'preload';
    link.href = src;
    link.as = 'video';
    document.head.appendChild(link);

    return () => {
      document.head.removeChild(link);
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
