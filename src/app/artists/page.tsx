import { ArtistAvatar } from "@/components/ArtistAvatar";
import { Artist } from "@/types";
import type { Metadata } from "next";
import { BackgroundGridPattern } from "@/components/ui/aceternity/background-grid";
import { TextReveal } from "@/components/ui/aceternity/text-reveal";
import { MovingBorderButton } from "@/components/ui/aceternity/moving-border";

export const metadata: Metadata = {
  title: "Artistas",
  description: "Conoce a los talentosos artistas y DJs residentes de IMPCORE Records. Con SPCMSK, CINDER, NASAC y otros productores e intérpretes de música electrónica underground.",
  keywords: [
    "artistas música electrónica",
    "artistas techno",
    "artistas IMPCORE Records",
    "SPCMSK",
    "CINDER",
    "NASAC",
    "DJs underground",
    "productores techno",
    "música electrónica chilena",
    "artistas residentes"
  ],
  openGraph: {
    title: "Artistas | IMPCORE Records",
    description: "Conoce a los talentosos artistas y DJs residentes de IMPCORE Records especializados en música electrónica underground.",
    images: [
      {
        url: "/images/LOGOIMP.png",
        width: 1200,
        height: 630,
        alt: "Artistas IMPCORE Records",
      }
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Artistas | IMPCORE Records",
    description: "Artistas de música electrónica underground de IMPCORE Records",
    images: ["/images/LOGOIMP.png"],
  },
  alternates: {
    canonical: "https://impcore-cl.vercel.app/artists",
  },
};

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
    <div className="min-h-screen py-20 relative overflow-hidden">
      {/* Background Grid Pattern */}
      <BackgroundGridPattern className="absolute inset-0 z-0" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center space-y-4 mb-16">
          <TextReveal 
            text="Artistas" 
            className="text-4xl md:text-5xl tracking-wide text-foreground"
          />
          <p className="text-foreground/60 max-w-2xl mx-auto text-lg">
            Conoce a los artistas innovadores que dan forma al futuro de la música electrónica 
            a través de IMPCORE Records.
          </p>
        </div>

        {/* Artists Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-8">
          {artists.map((artist) => (
            <ArtistAvatar key={artist.id} artist={artist} size="lg" />
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16 py-12 bg-card/30 rounded-lg border border-accent/10">
          <h2 className="text-2xl font-bold text-foreground mb-4">
            ¿Interesado en unirte a IMPCORE?
          </h2>
          <p className="text-foreground/60 mb-6 max-w-lg mx-auto">
            Siempre estamos buscando artistas talentosos que compartan nuestra visión 
            de la música electrónica innovadora.
          </p>
          <MovingBorderButton
            borderRadius="0.5rem"
            className="bg-background/80 text-foreground hover:bg-background"
            duration={3000}
          >
            Envía Tu Demo
          </MovingBorderButton>
        </div>
      </div>
    </div>
  );
}
