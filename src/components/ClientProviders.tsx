'use client';

import { MusicPlayer } from "./MusicPlayer";

export function ClientProviders({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <MusicPlayer />
    </>
  );
}
