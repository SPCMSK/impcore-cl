import React from 'react';
import { 
  FaSpotify, 
  FaApple, 
  FaSoundcloud, 
  FaYoutube, 
  FaBandcamp,
  FaItunes,
  FaMusic
} from 'react-icons/fa';
import { SiBeatport } from 'react-icons/si';

interface PlatformIconProps {
  platform: string;
  size?: number;
  className?: string;
}

export const PlatformIcon: React.FC<PlatformIconProps> = ({ 
  platform, 
  size = 24, 
  className = "" 
}) => {
  const iconProps = {
    size,
    className,
  };

  switch (platform.toLowerCase()) {
    case 'spotify':
      return <FaSpotify {...iconProps} />;

    case 'apple music':
      return <FaApple {...iconProps} />;

    case 'soundcloud':
      return <FaSoundcloud {...iconProps} />;

    case 'youtube':
      return <FaYoutube {...iconProps} />;

    case 'beatport':
      return <SiBeatport {...iconProps} />;

    case 'bandcamp':
      return <FaBandcamp {...iconProps} />;

    case 'itunes':
      return <FaItunes {...iconProps} />;

    case 'deezer':
      return <FaMusic {...iconProps} />;

    default:
      return (
        <div 
          style={{ width: size, height: size }} 
          className={`${className} bg-white/20 rounded flex items-center justify-center`}
        >
          <span className="text-xs">?</span>
        </div>
      );
  }
};

export default PlatformIcon;
