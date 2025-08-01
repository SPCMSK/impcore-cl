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
    <Link href={`/releases/${release.slug}`}>
      <div className="group relative bg-card hover:bg-card-hover transition-all duration-300 rounded-lg overflow-hidden border border-accent/10 hover:border-accent/30">
        {/* Cover Image */}
        <div className="relative aspect-square overflow-hidden">
          <Image
            src={release.coverImage}
            alt={`${release.artist} - ${release.title}`}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
          
          {/* Play Button Overlay */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center">
            <Button
              size="icon"
              className="opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-75 group-hover:scale-100"
              onClick={handlePlay}
            >
              <Play className="h-5 w-5" />
            </Button>
          </div>
          
          {/* Catalog Number */}
          <div className="absolute top-3 right-3 bg-background/80 backdrop-blur-sm px-2 py-1 rounded text-xs font-mono text-foreground/80">
            {release.catalogNumber}
          </div>
        </div>

        {/* Content */}
        <div className="p-4 space-y-2">
          <h3 className="font-semibold text-foreground group-hover:text-accent transition-colors line-clamp-1">
            {release.title}
          </h3>
          <p className="text-foreground/60 text-sm line-clamp-1">
            {release.artist}
          </p>
          <p className="text-foreground/40 text-xs">
            {new Date(release.releaseDate).getFullYear()}
          </p>
        </div>
      </div>
    </Link>
  );
}
