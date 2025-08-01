import { ReleaseCard } from "@/components/ReleaseCard";
import { Release } from "@/types";

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
    tracklist: [],
    purchaseLinks: [],
    streamingLinks: [],
  },
  {
    id: "2",
    slug: "urban-echoes",
    title: "Urban Echoes",
    artist: "Maya Storm",
    coverImage: "/placeholder-album.jpg",
    catalogNumber: "IMP002",
    releaseDate: "2024-02-20",
    tracklist: [],
    purchaseLinks: [],
    streamingLinks: [],
  },
  {
    id: "3",
    slug: "synthetic-dreams",
    title: "Synthetic Dreams",
    artist: "Code Red",
    coverImage: "/placeholder-album.jpg",
    catalogNumber: "IMP003",
    releaseDate: "2024-03-10",
    tracklist: [],
    purchaseLinks: [],
    streamingLinks: [],
  },
  {
    id: "4",
    slug: "frequency-shift",
    title: "Frequency Shift",
    artist: "Digital Nomad",
    coverImage: "/placeholder-album.jpg",
    catalogNumber: "IMP004",
    releaseDate: "2024-03-25",
    tracklist: [],
    purchaseLinks: [],
    streamingLinks: [],
  },
  {
    id: "5",
    slug: "midnight-transmission",
    title: "Midnight Transmission",
    artist: "Luna Eclipse",
    coverImage: "/placeholder-album.jpg",
    catalogNumber: "IMP005",
    releaseDate: "2024-04-12",
    tracklist: [],
    purchaseLinks: [],
    streamingLinks: [],
  },
  {
    id: "6",
    slug: "quantum-loops",
    title: "Quantum Loops",
    artist: "Data Stream",
    coverImage: "/placeholder-album.jpg",
    catalogNumber: "IMP006",
    releaseDate: "2024-05-08",
    tracklist: [],
    purchaseLinks: [],
    streamingLinks: [],
  },
];

export default function ReleasesPage() {
  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center space-y-4 mb-16">
          <h1 className="text-4xl md:text-5xl font-bold tracking-wide text-foreground">
            Releases
          </h1>
          <p className="text-foreground/60 max-w-2xl mx-auto text-lg">
            Explore our complete catalog of electronic music releases, 
            featuring innovative artists and cutting-edge productions.
          </p>
        </div>

        {/* Releases Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {releases.map((release) => (
            <ReleaseCard key={release.id} release={release} />
          ))}
        </div>

        {/* Load More Button */}
        <div className="text-center mt-12">
          <button className="px-8 py-3 bg-accent hover:bg-accent/90 text-background font-medium rounded-lg transition-colors">
            Load More Releases
          </button>
        </div>
      </div>
    </div>
  );
}
