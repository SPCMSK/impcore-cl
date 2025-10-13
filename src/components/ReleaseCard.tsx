'use client';

import Image from "next/image";
import Link from "next/link";
import { Play } from "lucide-react";
import { Button } from "./ui/Button";
import { useMusicPlayer } from "@/store/musicPlayer";
import { Release } from "@/types";

interface ReleaseCardProps {
  release: Release;
}

export function ReleaseCard({ release }: ReleaseCardProps) {
  const { playTrack } = useMusicPlayer();

  const handlePlay = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (release.tracklist.length > 0) {
      playTrack(release.tracklist[0], release.tracklist);
    }
  };

  return (
    <div className="group/card perspective-1000">
      <Link href={`/releases/${release.slug}`}>
        <div className="relative bg-card hover:bg-card-hover transition-all duration-300 rounded-lg overflow-hidden border border-accent/10 hover:border-accent/30 transform-gpu hover:scale-[1.02] hover:rotate-1 hover:shadow-[0_0_30px_rgba(0,102,255,0.3)]">
          {/* Cover Image */}
          <div className="relative aspect-square overflow-hidden">
            <Image
              src={release.coverImage}
              alt={`${release.artist} - ${release.title}`}
              fill
              className="object-cover transition-transform duration-500 group-hover/card:scale-110"
            />
            
            {/* Play Button Overlay */}
            <div className="absolute inset-0 bg-black/0 group-hover/card:bg-black/40 transition-all duration-300 flex items-center justify-center backdrop-blur-0 group-hover/card:backdrop-blur-sm">
              <Button
                size="icon"
                className="opacity-0 group-hover/card:opacity-100 transition-all duration-300 transform scale-75 group-hover/card:scale-100 shadow-lg shadow-accent/50"
                onClick={handlePlay}
              >
                <Play className="h-5 w-5" />
              </Button>
            </div>
            
            {/* Catalog Number */}
            <div className="absolute top-3 right-3 bg-background/90 backdrop-blur-md px-3 py-1.5 rounded-md text-xs font-mono text-foreground/80 border border-accent/20 shadow-lg">
              {release.catalogNumber}
            </div>
            
            {/* Glow effect on hover */}
            <div className="absolute inset-0 opacity-0 group-hover/card:opacity-100 transition-opacity duration-500 pointer-events-none">
              <div className="absolute inset-0 bg-gradient-to-t from-accent/20 via-transparent to-transparent" />
            </div>
          </div>

          {/* Content */}
          <div className="p-4 space-y-2 relative">
            <h3 className="font-semibold text-foreground group-hover/card:text-accent transition-colors line-clamp-1">
              {release.title}
            </h3>
            <p className="text-foreground/60 text-sm line-clamp-1">
              {release.artist}
            </p>
            <p className="text-foreground/40 text-xs font-mono">
              {new Date(release.releaseDate).getFullYear()}
            </p>
            
            {/* Bottom gradient line */}
            <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-accent to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-500" />
          </div>
        </div>
      </Link>
    </div>
  );
}
