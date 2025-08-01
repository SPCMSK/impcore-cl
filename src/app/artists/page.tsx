import { ArtistAvatar } from "@/components/ArtistAvatar";
import { Artist } from "@/types";

// Mock data actualizado con artistas reales de IMPCORE
const artists: Artist[] = [
  {
    id: "1",
    slug: "residente-nasac",
    name: "Residente Nasac",
    bio: "Residente principal del sello IMPCORE, especializado en frecuencias nocturnas y paisajes sonoros techno profundos.",
    image: "/images/NASAC.jpg",
    socialLinks: [
      { platform: "Spotify", url: "https://open.spotify.com/artist/residentenasac", label: "Listen on Spotify" },
      { platform: "SoundCloud", url: "https://soundcloud.com/residentenasac", label: "Follow on SoundCloud" },
    ],
    releases: [],
  },
  {
    id: "2",
    slug: "spc",
    name: "SPC",
    bio: "Artista underground que explora las sesiones subterráneas y frecuencias enmascaradas del techno experimental.",
    image: "/images/spcmsk.jpg",
    socialLinks: [
      { platform: "Spotify", url: "https://open.spotify.com/artist/spc", label: "Listen on Spotify" },
      { platform: "SoundCloud", url: "https://soundcloud.com/spc", label: "Follow on SoundCloud" },
    ],
    releases: [],
  },
  {
    id: "3",
    slug: "cinder",
    name: "Cinder",
    bio: "Productor especializado en crear texturas ardientes y paisajes sonoros que combinan elementos orgánicos con síntesis digital.",
    image: "/images/CINDER1.jpg",
    socialLinks: [
      { platform: "Spotify", url: "https://open.spotify.com/artist/cinder", label: "Listen on Spotify" },
      { platform: "Bandcamp", url: "https://cinder.bandcamp.com", label: "Buy on Bandcamp" },
    ],
    releases: [],
  },
  {
    id: "6",
    slug: "data-stream",
    name: "Data Stream",
    bio: "Cyberpunk-influenced producer crafting futuristic electronic compositions.",
    image: "/placeholder-artist.jpg",
    socialLinks: [],
    releases: [],
  },
];

export default function ArtistsPage() {
  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center space-y-4 mb-16">
          <h1 className="text-4xl md:text-5xl font-bold tracking-wide text-foreground">
            Artists
          </h1>
          <p className="text-foreground/60 max-w-2xl mx-auto text-lg">
            Meet the innovative artists shaping the future of electronic music 
            through IMPCORE Records.
          </p>
        </div>

        {/* Artists Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-8">
          {artists.map((artist) => (
            <ArtistAvatar key={artist.id} artist={artist} size="lg" />
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16 py-12 bg-card/30 rounded-lg">
          <h2 className="text-2xl font-bold text-foreground mb-4">
            Interested in joining IMPCORE?
          </h2>
          <p className="text-foreground/60 mb-6 max-w-lg mx-auto">
            We&apos;re always looking for talented artists who share our vision 
            for innovative electronic music.
          </p>
          <button className="px-8 py-3 bg-accent hover:bg-accent/90 text-background font-medium rounded-lg transition-colors">
            Submit Your Demo
          </button>
        </div>
      </div>
    </div>
  );
}
