import React from 'react';
import { motion } from 'framer-motion';
import { X, ExternalLink } from 'lucide-react';
import { PlatformIcon } from './PlatformIcons';
import { Release } from '@/types';

interface StreamingModalProps {
  release: Release;
  isOpen: boolean;
  onClose: () => void;
}

export const StreamingModal: React.FC<StreamingModalProps> = ({
  release,
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  const handlePlatformClick = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const getPlatformColor = (platform: string) => {
    switch (platform.toLowerCase()) {
      case 'spotify':
        return 'hover:bg-green-600 border-green-500 text-green-400';
      case 'apple music':
        return 'hover:bg-gray-600 border-gray-500 text-gray-300';
      case 'soundcloud':
        return 'hover:bg-orange-600 border-orange-500 text-orange-400';
      case 'youtube':
        return 'hover:bg-red-600 border-red-500 text-red-400';
      case 'bandcamp':
        return 'hover:bg-blue-600 border-blue-500 text-blue-400';
      default:
        return 'hover:bg-white/20 border-white/30 text-white/70';
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-zinc-900 rounded-lg max-w-md w-full p-6 border border-white/10"
      >
        {/* Header */}
        <div className="flex justify-between items-start mb-6">
          <div>
            <h3 className="text-xl font-bold text-white mb-1">Listen Now</h3>
            <p className="text-white/60 text-sm">{release.title} - {release.artist}</p>
          </div>
          <button
            onClick={onClose}
            className="text-white/60 hover:text-white transition-colors p-1"
          >
            <X size={20} />
          </button>
        </div>

        {/* Streaming Platforms */}
        <div className="space-y-3">
          <h4 className="text-white font-medium text-sm uppercase tracking-wide mb-4">
            Streaming Platforms
          </h4>
          
          {release.streamingLinks.map((link, index) => (
            <motion.button
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => handlePlatformClick(link.url)}
              className={`w-full flex items-center gap-4 p-4 rounded-lg border bg-transparent transition-all duration-200 ${getPlatformColor(link.platform)}`}
            >
              <PlatformIcon 
                platform={link.platform} 
                size={24} 
                className="flex-shrink-0"
              />
              <div className="flex-1 text-left">
                <p className="font-medium text-white">{link.platform}</p>
                <p className="text-xs text-white/60">Stream now</p>
              </div>
              <ExternalLink size={16} className="text-white/40" />
            </motion.button>
          ))}
        </div>

        {/* Purchase Links */}
        {release.purchaseLinks && release.purchaseLinks.length > 0 && (
          <div className="mt-6 pt-6 border-t border-white/10">
            <h4 className="text-white font-medium text-sm uppercase tracking-wide mb-4">
              Purchase
            </h4>
            
            {release.purchaseLinks.map((link, index) => (
              <motion.button
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: (release.streamingLinks.length + index) * 0.1 }}
                onClick={() => handlePlatformClick(link.url)}
                className="w-full flex items-center gap-4 p-4 rounded-lg border border-white/30 bg-white/5 hover:bg-white/10 transition-all duration-200"
              >
                <PlatformIcon 
                  platform={link.platform} 
                  size={24} 
                  className="flex-shrink-0 text-white"
                />
                <div className="flex-1 text-left">
                  <p className="font-medium text-white">{link.platform}</p>
                  <p className="text-xs text-white/60">Buy now</p>
                </div>
                <ExternalLink size={16} className="text-white/40" />
              </motion.button>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default StreamingModal;
