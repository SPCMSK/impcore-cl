export interface Release {
  id: string;
  slug: string;
  title: string;
  artist: string;
  coverImage: string;
  catalogNumber: string;
  releaseDate: string;
  description?: string;
  tracklist: Track[];
  purchaseLinks: PurchaseLink[];
  streamingLinks: StreamingLink[];
}

export interface Track {
  id: string;
  title: string;
  duration: string;
  audioUrl?: string;
  trackNumber: number;
}

export interface Artist {
  id: string;
  slug: string;
  name: string;
  bio: string;
  image: string;
  socialLinks: SocialLink[];
  releases: Release[];
}

export interface NewsArticle {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  featuredImage: string;
  publishedAt: string;
  author: string;
}

export interface PurchaseLink {
  platform: string;
  url: string;
  label: string;
}

export interface StreamingLink {
  platform: string;
  url: string;
  label: string;
}

export interface SocialLink {
  platform: string;
  url: string;
  label: string;
}

export interface MusicPlayerState {
  currentTrack: Track | null;
  isPlaying: boolean;
  playlist: Track[];
  currentIndex: number;
  volume: number;
  currentTime: number;
  duration: number;
}
