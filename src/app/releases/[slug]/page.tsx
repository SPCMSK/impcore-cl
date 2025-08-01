import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Play, ExternalLink, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Release, Track } from "@/types";
import { formatDate } from "@/lib/utils";

// Mock data - En una aplicación real, esto vendría de un CMS
const releases: Release[] = [
  {
    id: "1",
    slug: "deep-currents-ep",
    title: "Deep Currents EP",
    artist: "Neon Cipher",
    coverImage: "/placeholder-album.jpg",
    catalogNumber: "IMP001",
    releaseDate: "2024-01-15",
    description: "A hypnotic journey through deep techno landscapes, exploring the intersection of organic textures and digital precision. This EP showcases Neon Cipher's evolution as an artist, blending atmospheric soundscapes with driving rhythms that captivate both the mind and body.",
    tracklist: [
      { id: "1", title: "Deep Currents", duration: "6:23", trackNumber: 1, audioUrl: "/audio/track1.mp3" },
      { id: "2", title: "Midnight Pulse", duration: "7:12", trackNumber: 2, audioUrl: "/audio/track2.mp3" },
      { id: "3", title: "Subsonic", duration: "5:45", trackNumber: 3, audioUrl: "/audio/track3.mp3" },
      { id: "4", title: "Echoes in the Void", duration: "8:31", trackNumber: 4, audioUrl: "/audio/track4.mp3" },
    ],
    purchaseLinks: [
      { platform: "Bandcamp", url: "https://impcore.bandcamp.com/album/deep-currents-ep", label: "Buy on Bandcamp" },
      { platform: "Beatport", url: "https://beatport.com/release/deep-currents-ep", label: "Buy on Beatport" },
    ],
    streamingLinks: [
      { platform: "Spotify", url: "https://open.spotify.com/album/xyz", label: "Listen on Spotify" },
      { platform: "Apple Music", url: "https://music.apple.com/album/xyz", label: "Listen on Apple Music" },
      { platform: "SoundCloud", url: "https://soundcloud.com/neoncipher/sets/deep-currents-ep", label: "Listen on SoundCloud" },
    ],
  },
];

async function getRelease(slug: string): Promise<Release | null> {
  // En una aplicación real, esto sería una llamada a API o CMS
  return releases.find(release => release.slug === slug) || null;
}

interface ReleasePageProps {
  params: Promise<{ slug: string }>;
}

export default async function ReleasePage({ params }: ReleasePageProps) {
  const { slug } = await params;
  const release = await getRelease(slug);

  if (!release) {
    notFound();
  }

  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <Link 
          href="/releases"
          className="inline-flex items-center text-foreground/60 hover:text-accent transition-colors mb-8"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Releases
        </Link>

        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Album Cover */}
            <div className="space-y-6">
              <div className="aspect-square relative rounded-lg overflow-hidden border border-accent/20">
                <Image
                  src={release.coverImage}
                  alt={`${release.artist} - ${release.title}`}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              
              {/* Purchase & Streaming Links */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-foreground">
                  Purchase
                </h3>
                <div className="flex flex-wrap gap-2">
                  {release.purchaseLinks.map((link) => (
                    <Button key={link.platform} asChild>
                      <Link href={link.url} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="h-4 w-4 mr-2" />
                        {link.label}
                      </Link>
                    </Button>
                  ))}
                </div>
                
                <h3 className="text-lg font-semibold text-foreground pt-4">
                  Stream
                </h3>
                <div className="flex flex-wrap gap-2">
                  {release.streamingLinks.map((link) => (
                    <Button key={link.platform} variant="secondary" asChild>
                      <Link href={link.url} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="h-4 w-4 mr-2" />
                        {link.label}
                      </Link>
                    </Button>
                  ))}
                </div>
              </div>
            </div>

            {/* Release Info */}
            <div className="space-y-8">
              {/* Header */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-accent font-mono text-sm">
                    {release.catalogNumber}
                  </span>
                  <span className="text-foreground/60 text-sm">
                    {formatDate(release.releaseDate)}
                  </span>
                </div>
                
                <div>
                  <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
                    {release.title}
                  </h1>
                  <p className="text-xl text-foreground/80">
                    {release.artist}
                  </p>
                </div>
              </div>

              {/* Description */}
              {release.description && (
                <div className="space-y-4">
                  <h2 className="text-xl font-semibold text-foreground">
                    About this release
                  </h2>
                  <p className="text-foreground/80 leading-relaxed">
                    {release.description}
                  </p>
                </div>
              )}

              {/* Tracklist */}
              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-foreground">
                  Tracklist
                </h2>
                <div className="space-y-2">
                  {release.tracklist.map((track) => (
                    <TrackRow key={track.id} track={track} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function TrackRow({ track }: { track: Track }) {
  const handlePlay = () => {
    console.log(`Playing ${track.title}`);
  };

  return (
    <div className="flex items-center gap-4 p-3 rounded-lg bg-card/50 hover:bg-card transition-colors group">
      <button
        onClick={handlePlay}
        className="flex-shrink-0 w-10 h-10 rounded-full bg-accent/10 group-hover:bg-accent text-accent group-hover:text-background flex items-center justify-center transition-colors"
      >
        <Play className="h-4 w-4" />
      </button>
      
      <div className="flex-1 min-w-0">
        <p className="font-medium text-foreground truncate">
          {track.trackNumber}. {track.title}
        </p>
      </div>
      
      <span className="text-foreground/60 text-sm font-mono">
        {track.duration}
      </span>
    </div>
  );
}
