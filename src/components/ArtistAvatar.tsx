import Image from "next/image";
import Link from "next/link";
import { Artist } from "@/types";

interface ArtistAvatarProps {
  artist: Pick<Artist, 'slug' | 'name' | 'image'>;
  size?: 'sm' | 'md' | 'lg';
}

const sizeClasses = {
  sm: 'w-16 h-16',
  md: 'w-24 h-24',
  lg: 'w-32 h-32',
};

export function ArtistAvatar({ artist, size = 'md' }: ArtistAvatarProps) {
  return (
    <Link href={`/artists/${artist.slug}`}>
      <div className="group text-center space-y-2">
        <div className={`${sizeClasses[size]} mx-auto relative rounded-full overflow-hidden border-2 border-accent/20 group-hover:border-accent transition-colors`}>
          <Image
            src={artist.image}
            alt={artist.name}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-110"
          />
        </div>
        <p className="text-sm font-medium text-foreground group-hover:text-accent transition-colors">
          {artist.name}
        </p>
      </div>
    </Link>
  );
}
