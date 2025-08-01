'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface VideoIntroProps {
  onComplete: () => void;
}

export default function VideoIntro({ onComplete }: VideoIntroProps) {
  const [isPlaying, setIsPlaying] = useState(true);
  const [showSkip, setShowSkip] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Mostrar botón de skip después de 2 segundos
    const skipTimer = setTimeout(() => {
      setShowSkip(true);
    }, 2000);

    return () => clearTimeout(skipTimer);
  }, []);

  const handleVideoEnd = () => {
    setIsCompleted(true);
    setTimeout(onComplete, 500);
  };

  const handleSkip = () => {
    setIsCompleted(true);
    setTimeout(onComplete, 300);
  };

  const handleVideoClick = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        videoRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  return (
    <AnimatePresence>
      {!isCompleted && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="fixed inset-0 z-50 bg-black flex items-center justify-center"
        >
          {/* Video */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="relative w-full h-full max-w-6xl max-h-screen cursor-pointer"
            onClick={handleVideoClick}
          >
            <video
              ref={videoRef}
              className="w-full h-full object-cover"
              autoPlay
              muted
              playsInline
              onEnded={handleVideoEnd}
            >
              <source src="/images/videoinicio.mp4" type="video/mp4" />
              Tu navegador no soporta el elemento de video.
            </video>

            {/* Overlay con controles */}
            <div className="absolute inset-0 bg-black/10 flex items-center justify-center">
              {!isPlaying && (
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center"
                >
                  <div className="w-0 h-0 border-l-[12px] border-l-white border-t-[8px] border-t-transparent border-b-[8px] border-b-transparent ml-1"></div>
                </motion.div>
              )}
            </div>

            {/* Botón Skip */}
            <AnimatePresence>
              {showSkip && (
                <motion.button
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSkip();
                  }}
                  className="absolute bottom-8 right-8 px-6 py-3 bg-white/10 backdrop-blur-md border border-white/20 text-white font-medium rounded-full hover:bg-white/20 transition-colors duration-200"
                >
                  Saltar
                </motion.button>
              )}
            </AnimatePresence>

            {/* Logo IMPCORE en la esquina */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.5, duration: 0.8 }}
              className="absolute top-8 left-8"
            >
              <img
                src="/images/LOGOIMP.png"
                alt="IMPCORE"
                className="h-12 w-auto opacity-80"
              />
            </motion.div>

            {/* Barra de progreso */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 30, ease: "linear" }} // Ajustar según duración del video
              className="absolute bottom-0 left-0 h-1 bg-white/50 origin-left"
              style={{ width: '100%' }}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
