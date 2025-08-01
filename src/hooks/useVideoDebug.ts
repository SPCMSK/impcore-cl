'use client';

import { useEffect, useState } from 'react';

export const useVideoDebug = (src: string) => {
  const [status, setStatus] = useState('checking');

  useEffect(() => {
    const video = document.createElement('video');
    video.preload = 'metadata';
    
    video.onloadedmetadata = () => {
      setStatus(`✅ Video accessible - Duration: ${video.duration}s`);
    };
    
    video.onerror = (e) => {
      setStatus(`❌ Video failed to load: ${e.type}`);
    };
    
    video.src = src;
  }, [src]);

  return status;
};
