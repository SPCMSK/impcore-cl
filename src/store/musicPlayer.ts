import { create } from 'zustand';
import { Track } from '@/types';

interface MusicPlayerStore {
  currentTrack: Track | null;
  isPlaying: boolean;
  playlist: Track[];
  currentIndex: number;
  volume: number;
  currentTime: number;
  duration: number;
  
  // Actions
  playTrack: (track: Track, playlist?: Track[]) => void;
  pauseTrack: () => void;
  resumeTrack: () => void;
  nextTrack: () => void;
  previousTrack: () => void;
  setVolume: (volume: number) => void;
  setCurrentTime: (time: number) => void;
  setDuration: (duration: number) => void;
  setPlaylist: (playlist: Track[]) => void;
}

export const useMusicPlayer = create<MusicPlayerStore>((set, get) => ({
  currentTrack: null,
  isPlaying: false,
  playlist: [],
  currentIndex: 0,
  volume: 0.8,
  currentTime: 0,
  duration: 0,

  playTrack: (track: Track, playlist?: Track[]) => {
    const state = get();
    
    if (playlist) {
      const trackIndex = playlist.findIndex(t => t.id === track.id);
      set({
        currentTrack: track,
        playlist,
        currentIndex: trackIndex >= 0 ? trackIndex : 0,
        isPlaying: true,
        currentTime: 0,
      });
    } else {
      set({
        currentTrack: track,
        isPlaying: true,
        currentTime: 0,
      });
    }
  },

  pauseTrack: () => set({ isPlaying: false }),
  
  resumeTrack: () => set({ isPlaying: true }),

  nextTrack: () => {
    const { playlist, currentIndex } = get();
    if (playlist.length > 0) {
      const nextIndex = (currentIndex + 1) % playlist.length;
      const nextTrack = playlist[nextIndex];
      
      set({
        currentTrack: nextTrack,
        currentIndex: nextIndex,
        currentTime: 0,
      });
    }
  },

  previousTrack: () => {
    const { playlist, currentIndex } = get();
    if (playlist.length > 0) {
      const prevIndex = currentIndex > 0 ? currentIndex - 1 : playlist.length - 1;
      const prevTrack = playlist[prevIndex];
      
      set({
        currentTrack: prevTrack,
        currentIndex: prevIndex,
        currentTime: 0,
      });
    }
  },

  setVolume: (volume: number) => set({ volume }),
  
  setCurrentTime: (currentTime: number) => set({ currentTime }),
  
  setDuration: (duration: number) => set({ duration }),
  
  setPlaylist: (playlist: Track[]) => set({ playlist }),
}));
