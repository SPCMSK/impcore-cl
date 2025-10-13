'use client';

import { Release, Artist } from "@/types";

// Releases data - desde page.tsx original
// Orden cronológico de lanzamiento
export const releases: Release[] = [
  {
    id: "4",
    slug: "asphalt-rhythm-va",
    title: "ASPHALT RHYTHM V.A",
    artist: "Various Artists",
    coverImage: "/images/ASPHALT-RHYTHM-VA.png",
    catalogNumber: "IMP005",
    releaseDate: "2025-03-15",
    description: "Compilado que captura el ritmo crudo y la energía del asfalto urbano con sonidos underground.",
    tracklist: [
      { id: "1", title: "Urban Pulse", duration: "6:45", trackNumber: 1, audioUrl: "" },
      { id: "2", title: "Concrete Waves", duration: "7:15", trackNumber: 2, audioUrl: "" },
    ],
    purchaseLinks: [
      { platform: "Beatport", url: "https://impcore.bandcamp.com/album/asphalt-rythm-va", label: "Comprar en Beatport" },
      { platform: "Bandcamp", url: "https://impcore.bandcamp.com/album/asphalt-rythm-va", label: "Comprar en Bandcamp" },
      { platform: "iTunes", url: "https://impcore.bandcamp.com/album/asphalt-rythm-va", label: "Comprar en iTunes" },
    ],
    streamingLinks: [
      { platform: "Spotify", url: "https://impcore.bandcamp.com/album/asphalt-rythm-va", label: "Escuchar en Spotify" },
      { platform: "YouTube", url: "https://impcore.bandcamp.com/album/asphalt-rythm-va", label: "Escuchar en YouTube" },
      { platform: "SoundCloud", url: "https://impcore.bandcamp.com/album/asphalt-rythm-va", label: "Escuchar en SoundCloud" },
      { platform: "Apple Music", url: "https://impcore.bandcamp.com/album/asphalt-rythm-va", label: "Escuchar en Apple Music" },
      { platform: "Deezer", url: "https://impcore.bandcamp.com/album/asphalt-rythm-va", label: "Escuchar en Deezer" },
    ],
  },
  {
    id: "1",
    slug: "energy-ep",
    title: "ENERGY EP",
    artist: "SPCMSK",
    coverImage: "/images/ENERGY EP.png",
    catalogNumber: "IMP002",
    releaseDate: "2024-12-15",
    description: "Un explosivo EP que canaliza la energía pura del underground techno.",
    tracklist: [
      { id: "1", title: "Energy Flow", duration: "6:45", trackNumber: 1, audioUrl: "/audio/energy1.mp3" },
    ],
    purchaseLinks: [
      { platform: "Beatport", url: "https://www.beatport.com/es/release/energy-ep/5120099", label: "Comprar en Beatport" },
      { platform: "Bandcamp", url: "https://impcore.bandcamp.com/album/energy-ep", label: "Comprar en Bandcamp" },
      { platform: "iTunes", url: "https://music.apple.com/cl/album/energy-ep-ep/1818890589", label: "Comprar en iTunes" },
    ],
    streamingLinks: [
      { platform: "Spotify", url: "https://open.spotify.com/intl-es/album/0QYQlMH471cTSHzGavPNAR", label: "Escuchar en Spotify" },
      { platform: "YouTube", url: "https://youtube.com/playlist?list=OLAK5uy_kUxgrQALAUFobIrhgQmwoJjPrmoqcFp98&si=8BRy7XX8pRyv8v4I", label: "Escuchar en YouTube" },
      { platform: "SoundCloud", url: "https://soundcloud.com/imp-records-820395379/sets/imp-premiere-spcmsk-energy-ep-imp002", label: "Escuchar en SoundCloud" },
      { platform: "Apple Music", url: "https://music.apple.com/cl/album/energy-ep-ep/1818890589", label: "Escuchar en Apple Music" },
      { platform: "Deezer", url: "https://www.deezer.com/es/album/768168531", label: "Escuchar en Deezer" },
    ],
  },
  {
    id: "2",
    slug: "take-one-ep",
    title: "TAKE ONE EP",
    artist: "CX",
    coverImage: "/images/TAKE ONE EP.png",
    catalogNumber: "IMP003",
    releaseDate: "2025-01-10",
    description: "La primera toma perfecta de CX en IMPCORE Records.",
    tracklist: [
      { id: "1", title: "Take One", duration: "6:30", trackNumber: 1, audioUrl: "/audio/takeone1.mp3" },
    ],
    purchaseLinks: [
      { platform: "Beatport", url: "https://www.beatport.com/es/release/take-one-ep/5153717", label: "Comprar en Bandcamp" },
      { platform: "Bandcamp", url: "https://impcore.bandcamp.com/album/take-one-ep", label: "Comprar en Bandcamp" },
      { platform: "iTunes", url: "#", label: "Comprar en iTunes" },
    ],
    streamingLinks: [
      { platform: "Spotify", url: "https://open.spotify.com/album/abc", label: "Escuchar en Spotify" },
      { platform: "YouTube", url: "#", label: "Escuchar en YouTube" },
      { platform: "SoundCloud", url: "https://soundcloud.com/imp-records-820395379/sets/imp-premiere-spcmsk-take-one-ep-imp003", label: "Escuchar en SoundCloud" },
      { platform: "Apple Music", url: "https://music.apple.com/cl/album/take-one-ep-single/1823431827", label: "Escuchar en Apple Music" },
      { platform: "Deezer", url: "https://www.deezer.com/es/album/779833861", label: "Escuchar en Deezer" },
    ],
  },
  {
    id: "3",
    slug: "sumergidos-va",
    title: "SUMERGIDOS V.A",
    artist: "Various Artists",
    coverImage: "/images/album2.jpg",
    catalogNumber: "IMP004",
    releaseDate: "2025-02-20",
    description: "Compilado V.A que sumerge a los oyentes en las profundidades del techno underground.",
    tracklist: [
      { id: "1", title: "Deep Waters", duration: "7:00", trackNumber: 1, audioUrl: "" },
      { id: "2", title: "Abyssal Flow", duration: "6:30", trackNumber: 2, audioUrl: "" },
    ],
    purchaseLinks: [
      { platform: "Beatport", url: "https://impcore.bandcamp.com/album/sumergidos-v-a", label: "Comprar en Beatport" },
      { platform: "Bandcamp", url: "https://impcore.bandcamp.com/album/sumergidos-v-a", label: "Comprar en Bandcamp" },
      { platform: "iTunes", url: "https://impcore.bandcamp.com/album/sumergidos-v-a", label: "Comprar en iTunes" },
    ],
    streamingLinks: [
      { platform: "Spotify", url: "https://open.spotify.com/intl-es/album/3AX3t9n4XOx9XjkQJuhhhf", label: "Escuchar en Spotify" },
      { platform: "YouTube", url: "https://www.youtube.com/watch?v=RuX-Tlohsec&list=OLAK5uy_lKZvn8Uvsi8R_Xy7xHkl_eaIvR6offWZg", label: "Escuchar en YouTube" },
      { platform: "SoundCloud", url: "https://soundcloud.com/imp-records-820395379/sets/imp-va0001?si=686bd75dd74b4816a28848a2ea06d3c3&utm_source=clipboard&utm_medium=text&utm_campaign=social_sharing", label: "Escuchar en SoundCloud" },
      { platform: "Apple Music", url: "https://music.apple.com/cl/album/sumergidos-va/1805165753", label: "Escuchar en Apple Music" },
      { platform: "Deezer", url: "https://www.deezer.com/es/album/734394941", label: "Escuchar en Deezer" },
    ],
  },
];

// Artists data - desde artists/page.tsx original
export const artists: Artist[] = [
  {
    id: "1",
    slug: "residente-nasac",
    name: "Residente Nasac",
    bio: "HYPNOTIC TECHNO | RAW TECHNO",
    image: "/images/NASAC.jpg",
    socialLinks: [
      { platform: "Instagram", url: "https://instagram.com/nvsvc_n.s", label: "@residente_nasac" },
    ],
    releases: [],
  },
  {
    id: "2",
    slug: "cinder",
    name: "CINDER",
    bio: "HARD GROOVE | RAW TECHNO",
    image: "/images/CINDER1.jpg",
    socialLinks: [
      { platform: "Instagram", url: "https://instagram.com/cinderdj_", label: "@cinder" },
    ],
    releases: [],
  },
  {
    id: "3",
    slug: "spcmsk",
    name: "SPCMSK",
    bio: "HARDGROOVE | RAW TECHNO | HYPNOTIC TECHNO",
    image: "/images/spcmsk.jpg",
    socialLinks: [
      { platform: "Instagram", url: "https://instagram.com/spc.musik", label: "@spcmsk" },
    ],
    releases: [],
  },
];

// Eventos data - ejemplo
export const events = [
  {
    id: "1",
    title: "Underground Session #01",
    date: "2024-12-31",
    venue: "Club Techno Santiago",
    description: "Primera sesión underground del año con residentes IMPCORE",
    image: "/images/eventos.png",
    artists: ["Residente Nasac", "CINDER"],
  },
];

// Función para simular localStorage como base de datos local
class LocalDataManager {
  private getStorageKey(type: string) {
    return `impcore_${type}`;
  }

  // Releases
  getReleases(): Release[] {
    if (typeof window === 'undefined') return releases;
    const stored = localStorage.getItem(this.getStorageKey('releases'));
    return stored ? JSON.parse(stored) : releases;
  }

  saveReleases(newReleases: Release[]) {
    if (typeof window === 'undefined') return;
    localStorage.setItem(this.getStorageKey('releases'), JSON.stringify(newReleases));
  }

  addRelease(release: Omit<Release, 'id'>) {
    const currentReleases = this.getReleases();
    const newId = (Math.max(...currentReleases.map(r => parseInt(r.id)), 0) + 1).toString();
    const newRelease = { ...release, id: newId };
    const updatedReleases = [...currentReleases, newRelease];
    this.saveReleases(updatedReleases);
    return newRelease;
  }

  updateRelease(id: string, updates: Partial<Release>) {
    const currentReleases = this.getReleases();
    const updatedReleases = currentReleases.map(release =>
      release.id === id ? { ...release, ...updates } : release
    );
    this.saveReleases(updatedReleases);
    return updatedReleases.find(r => r.id === id);
  }

  deleteRelease(id: string) {
    const currentReleases = this.getReleases();
    const updatedReleases = currentReleases.filter(release => release.id !== id);
    this.saveReleases(updatedReleases);
  }

  // Artists
  getArtists(): Artist[] {
    if (typeof window === 'undefined') return artists;
    const stored = localStorage.getItem(this.getStorageKey('artists'));
    return stored ? JSON.parse(stored) : artists;
  }

  saveArtists(newArtists: Artist[]) {
    if (typeof window === 'undefined') return;
    localStorage.setItem(this.getStorageKey('artists'), JSON.stringify(newArtists));
  }

  addArtist(artist: Omit<Artist, 'id'>) {
    const currentArtists = this.getArtists();
    const newId = (Math.max(...currentArtists.map(a => parseInt(a.id)), 0) + 1).toString();
    const newArtist = { ...artist, id: newId };
    const updatedArtists = [...currentArtists, newArtist];
    this.saveArtists(updatedArtists);
    return newArtist;
  }

  updateArtist(id: string, updates: Partial<Artist>) {
    const currentArtists = this.getArtists();
    const updatedArtists = currentArtists.map(artist =>
      artist.id === id ? { ...artist, ...updates } : artist
    );
    this.saveArtists(updatedArtists);
    return updatedArtists.find(a => a.id === id);
  }

  deleteArtist(id: string) {
    const currentArtists = this.getArtists();
    const updatedArtists = currentArtists.filter(artist => artist.id !== id);
    this.saveArtists(updatedArtists);
  }
}

export const localDataManager = new LocalDataManager();