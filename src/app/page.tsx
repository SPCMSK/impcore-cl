'use client';

import Image from "next/image";
import Link from "next/link";
import { Play, ChevronLeft, ChevronRight, X, Mail, ShoppingCart } from "lucide-react";
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/Button";
import { Release } from "@/types";
import { useState } from "react";
import CloudinaryVideo from "@/components/CloudinaryVideo";
import InstantVideo from "@/components/InstantVideo";
import StreamingModal from "@/components/StreamingModal";

// Releases data - Actualizado con los últimos lanzamientos
const releases: Release[] = [
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
      { id: "2", title: "Power Surge", duration: "7:23", trackNumber: 2, audioUrl: "/audio/energy2.mp3" },
      { id: "3", title: "Electric Dreams", duration: "6:12", trackNumber: 3, audioUrl: "/audio/energy3.mp3" },
    ],
    purchaseLinks: [
      { platform: "Beatport", url: "https://www.beatport.com/es/release/energy-ep/5120099", label: "Buy on Beatport" },
    ],
    streamingLinks: [
      { platform: "Spotify", url: "https://open.spotify.com/intl-es/album/0QYQlMH471cTSHzGavPNAR?si=k1ZmVbixSOuTqPYkJtU5gg", label: "Listen on Spotify" },
      { platform: "Apple Music", url: "https://music.apple.com/cl/album/energy-ep-ep/1818890589", label: "Listen on Apple Music" },
      { platform: "SoundCloud", url: "https://soundcloud.com/imp-records-820395379/sets/imp-premiere-spcmsk-energy-ep-imp002?si=76e8e955de4b4bdcb55d7fe2208bc793&utm_source=clipboard&utm_medium=text&utm_campaign=social_sharing", label: "Listen on SoundCloud" },
      { platform: "YouTube", url: "https://www.youtube.com/watch?v=2NFYEc9Yzis&list=OLAK5uy_kUxgrQALAUFobIrhgQmwoJjPrmoqcFp98", label: "Listen on YouTube" },
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
      { id: "2", title: "Second Chance", duration: "7:15", trackNumber: 2, audioUrl: "/audio/takeone2.mp3" },
      { id: "3", title: "Final Cut", duration: "5:58", trackNumber: 3, audioUrl: "/audio/takeone3.mp3" },
    ],
    purchaseLinks: [
      { platform: "Beatport", url: "https://www.beatport.com/es/release/take-one-ep/5153717", label: "Buy on Beatport" },
    ],
    streamingLinks: [
      { platform: "Spotify", url: "https://open.spotify.com/intl-es/album/0cRquvjzzVTTEK1PvZLUAe?si=feaJtdncTm-wUa0AH6h1NQ", label: "Listen on Spotify" },
      { platform: "Apple Music", url: "https://music.apple.com/cl/album/take-one-ep-single/1823431827", label: "Listen on Apple Music" },
      { platform: "SoundCloud", url: "https://soundcloud.com/imp-records-820395379/sets/imp-premiere-spcmsk-take-one-ep-imp003?si=087b9503427d40f39914026e3651c5ef&utm_source=clipboard&utm_medium=text&utm_campaign=social_sharing", label: "Listen on SoundCloud" },
      { platform: "YouTube", url: "https://www.youtube.com/watch?v=8K8bRZeOT1s", label: "Listen on YouTube" },
    ],
  },
  {
    id: "3",
    slug: "sumergidos-va",
    title: "Sumergidos V.A.",
    artist: "Various Artists",
    coverImage: "/images/album2.jpg",
    catalogNumber: "IMP001",
    releaseDate: "2024-03-15",
    description: "Una inmersión profunda en las corrientes subterráneas del techno.",
    tracklist: [
      { id: "1", title: "Deep Waters", duration: "6:23", trackNumber: 1, audioUrl: "/audio/track1.mp3" },
      { id: "2", title: "Submerged Frequencies", duration: "7:12", trackNumber: 2, audioUrl: "/audio/track2.mp3" },
      { id: "3", title: "Underwater Dreams", duration: "5:45", trackNumber: 3, audioUrl: "/audio/track3.mp3" },
    ],
    purchaseLinks: [
      { platform: "Bandcamp", url: "https://impcore.bandcamp.com/album/sumergidos-va", label: "Buy on Bandcamp" },
    ],
    streamingLinks: [
      { platform: "Spotify", url: "https://open.spotify.com/intl-es/album/3AX3t9n4XOx9XjkQJuhhhf?si=oWdWoVZUThaxC-WFWPiSDQ", label: "Listen on Spotify" },
      { platform: "Apple Music", url: "https://music.apple.com/cl/album/sumergidos-va/1805165753", label: "Listen on Apple Music" },
      { platform: "SoundCloud", url: "https://soundcloud.com/imp-records-820395379/sets/imp-va0001?si=3efdf0c8fa6b4010a10cbd29c198617a&utm_source=clipboard&utm_medium=text&utm_campaign=social_sharing", label: "Listen on SoundCloud" },
      { platform: "YouTube", url: "https://youtube.com/playlist?list=OLAK5uy_lKZvn8Uvsi8R_Xy7xHkl_eaIvR6offWZg&si=mKTDiFoAZu4bK_aT", label: "Listen on YouTube" },
      { platform: "Bandcamp", url: "https://impcore.bandcamp.com/album/sumergidos-v-a", label: "Listen on Bandcamp" },
    ],
  },
];

// Residents data
const residents = [
  {
    id: "1",
    name: "SPCMSK",
    image: "/images/spcmsk.jpg",
    role: "Underground Sessions",
    bio: "Especialista en sesiones subterráneas y frecuencias enmascaradas.",
    fullBio: "SPCMSK, DJ y productor chileno de 23 años nacido en Viña del Mar, comenzó su pasión por la música influenciado por EDM y artistas como Skrillex y Zomboy. A los 16 años descubrió el techno, desarrollando un estilo versátil que combina hardgroove percusivo con techno rápido y groovero. A los 21 años incursionó en la producción musical y ha tocado en clubes como Woo Club, The House y Espacio 93, compartiendo escenario con artistas reconocidos. Actualmente, cuenta con lanzamientos en sellos como Inherente Project y DKN Selections y es fundador de IMP CORE, su sello y productora de eventos, consolidándose como una promesa del techno chileno.",
    email: "spcmsk@impcore.com",
    videos: [],
    releases: ["ENERGY EP", "Sumergidos V.A."]
  },
  {
    id: "2", 
    name: "CINDER",
    image: "/images/CINDER1.jpg",
    role: "Ember Tracks",
    bio: "Creador de texturas ardientes y paisajes sonoros experimentales.",
    fullBio: "Cinder artista de la quinta región reconocido por sus mezclas entre raw techno y hardgroove. Se caracteriza por sets bastante hypnóticos y sonidos grooveros. A través del tiempo ha logrado tocar en importantes clubes de su región y en la capital de nuestro país",
    email: "cinder@impcore.com",
    videos: ["https://www.youtube.com/embed/jRD4jQRYOSE?si=Z7-vhYZukf7BahHg"],
    releases: ["Sumergidos V.A.", "Ember Sessions EP"]
  },
  {
    id: "3",
    name: "NASAC",
    image: "/images/NASAC.jpg", 
    role: "Midnight Frequencies",
    bio: "Residente principal especializado en frecuencias nocturnas.",
    fullBio: "Nicolás Sanhueza, conocido como Nasac, es un DJ emergente apasionado por el techno. Su viaje comenzó en 2019 como parte del público, y en 2022 decidió dedicarse profesionalmente. En 2023 adquirió su primera controladora y estudió en DJ School, presentando sus primeros sets en The House. Actualmente, es residente en BigBang Label, IMPCORE y Deforastó Club, explorando géneros como peak time, rawstyle/hardgroove y hard techno. También se dedica a la producción musical, enfocándose en raw techno y hardgroove. Su estilo busca generar una conexión profunda con el público, creando una atmósfera inmersiva a través de sonidos estimulantes. Su objetivo es mantener a la audiencia en sintonía con la música, estableciendo una experiencia de baile única y envolvente.",
    email: "nasac@impcore.com",
    videos: ["https://www.youtube.com/embed/GiyaS1mkF74?si=qwbv9b4zKOZ-MZb-"],
    releases: ["Sumergidos V.A.", "Midnight Chronicles", "Deep Frequencies Vol.1"]
  }
];

export default function Home() {
  const [currentReleaseIndex, setCurrentReleaseIndex] = useState(0);
  const [selectedResident, setSelectedResident] = useState<string | null>(null);
  const [selectedReleaseForStreaming, setSelectedReleaseForStreaming] = useState<Release | null>(null);

  const nextRelease = () => {
    setCurrentReleaseIndex((prev) => (prev + 1) % releases.length);
  };

  const prevRelease = () => {
    setCurrentReleaseIndex((prev) => (prev - 1 + releases.length) % releases.length);
  };

  const handleListenClick = (release: Release) => {
    setSelectedReleaseForStreaming(release);
  };

  const handleBuyClick = (release: Release) => {
    if (release.purchaseLinks && release.purchaseLinks.length > 0) {
      window.open(release.purchaseLinks[0].url, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div className="min-h-screen bg-black">
      {/* HOME SECTION - Mutual Rytm Style */}
      <section className="h-screen flex items-center justify-center relative overflow-hidden">
        {/* Background Video - Instant Load */}
        <InstantVideo 
          src="https://res.cloudinary.com/dxysvykkk/video/upload/q_auto:low,f_auto,w_1920,h_1080,c_fill/v1754019807/impcore/background-video-raw.mp4"
        />
        
        {/* Content */}
        <div className="relative z-10 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-6xl md:text-8xl font-black text-white tracking-wider mb-8"
            style={{ fontFamily: 'var(--font-inter)' }}
          >
            IMPCORE
          </motion.h1>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="text-2xl md:text-3xl font-light text-white/80 tracking-wide"
            style={{ fontFamily: 'var(--font-inter)' }}
          >
            RECORDS
          </motion.h2>
        </div>
        
        {/* Navigation Menu - Top */}
        <motion.nav
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="absolute top-8 left-0 right-0 z-20"
        >
          <div className="container mx-auto px-6 flex justify-between items-center">
            <div className="flex space-x-10 text-white/80 text-base font-medium tracking-wide">
              <a href="#home" className="hover:text-white transition-colors duration-300">HOME</a>
              <a href="#releases" className="hover:text-white transition-colors duration-300">RELEASES</a>
              <a href="#sessions" className="hover:text-white transition-colors duration-300">SESSIONS</a>
              <a href="#residents" className="hover:text-white transition-colors duration-300">RESIDENTS</a>
              <a href="#events" className="hover:text-white transition-colors duration-300">EVENTS</a>
              <a href="#news" className="hover:text-white transition-colors duration-300">NEWS</a>
            </div>
            <div className="text-white/60 text-sm">
              <span>GL (EN)</span>
            </div>
          </div>
        </motion.nav>
      </section>

      {/* RELEASES SECTION */}
      <section id="releases" className="py-20 bg-black">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-6xl font-black text-white tracking-wide mb-4">RELEASES</h2>
            <p className="text-white/60 text-lg">Latest drops from the underground</p>
          </motion.div>
          
          {/* Release Carousel */}
          <div className="relative max-w-6xl mx-auto">
            <div className="flex justify-center items-center">
              <button
                onClick={prevRelease}
                className="absolute left-0 z-10 p-3 text-white/60 hover:text-white transition-colors"
              >
                <ChevronLeft size={32} />
              </button>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-16">
                {releases.slice(currentReleaseIndex, currentReleaseIndex + 3).map((release, index) => (
                  <motion.div
                    key={`${release.id}-${currentReleaseIndex}-${index}`}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="bg-zinc-900 rounded-lg overflow-hidden hover:bg-zinc-800 transition-colors"
                  >
                    <div className="aspect-square relative">
                      <Image
                        src={release.coverImage}
                        alt={release.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="p-6">
                      <h3 className="text-white font-bold text-lg mb-2">{release.title}</h3>
                      <p className="text-white/60 mb-4">{release.artist}</p>
                      <div className="flex gap-2">
                        <Button 
                          size="sm" 
                          className="bg-white text-black hover:bg-white/90"
                          onClick={() => handleListenClick(release)}
                        >
                          <Play className="h-4 w-4 mr-2" />
                          Listen
                        </Button>
                        <Button 
                          variant="secondary" 
                          size="sm" 
                          className="border-white/20 text-white hover:bg-white/10"
                          onClick={() => handleBuyClick(release)}
                        >
                          <ShoppingCart className="h-4 w-4 mr-2" />
                          Buy
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
              
              <button
                onClick={nextRelease}
                className="absolute right-0 z-10 p-3 text-white/60 hover:text-white transition-colors"
              >
                <ChevronRight size={32} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* SESSIONS SECTION */}
      <section id="sessions" className="py-20 bg-zinc-900">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-6xl font-black text-white tracking-wide mb-4">SESSIONS</h2>
            <p className="text-white/60 text-lg">Live sets and indoor sessions</p>
          </motion.div>
          
          {/* YouTube Sessions Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {/* Roddo b2b grenk */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-zinc-800 rounded-lg overflow-hidden hover:bg-zinc-700 transition-colors"
            >
              <div className="aspect-video">
                <iframe 
                  className="w-full h-full rounded-t-lg"
                  src="https://www.youtube.com/embed/aoq0AZozDgo?si=X-KCxNC-JWhVVdoI" 
                  title="Roddo b2b grenk"
                  frameBorder="0" 
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                  referrerPolicy="strict-origin-when-cross-origin" 
                  allowFullScreen
                />
              </div>
              <div className="p-4">
                <h3 className="text-white font-bold text-lg">Roddo b2b grenk</h3>
                <p className="text-white/60 text-sm">Underground Session</p>
              </div>
            </motion.div>

            {/* INERCIABSOLUTA */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-zinc-800 rounded-lg overflow-hidden hover:bg-zinc-700 transition-colors"
            >
              <div className="aspect-video">
                <iframe 
                  className="w-full h-full rounded-t-lg"
                  src="https://www.youtube.com/embed/vqhqTdUso9s?si=tmozQahTM757KwAJ" 
                  title="INERCIABSOLUTA"
                  frameBorder="0" 
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                  referrerPolicy="strict-origin-when-cross-origin" 
                  allowFullScreen
                />
              </div>
              <div className="p-4">
                <h3 className="text-white font-bold text-lg">INERCIABSOLUTA</h3>
                <p className="text-white/60 text-sm">Live Session</p>
              </div>
            </motion.div>

            {/* VAROS B2B SALOCIN MATA */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-zinc-800 rounded-lg overflow-hidden hover:bg-zinc-700 transition-colors"
            >
              <div className="aspect-video">
                <iframe 
                  className="w-full h-full rounded-t-lg"
                  src="https://www.youtube.com/embed/L4lUIjUDDWY?si=Aqbdxxq6oRDF12B7" 
                  title="VAROS B2B SALOCIN MATA"
                  frameBorder="0" 
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                  referrerPolicy="strict-origin-when-cross-origin" 
                  allowFullScreen
                />
              </div>
              <div className="p-4">
                <h3 className="text-white font-bold text-lg">VAROS B2B SALOCIN MATA</h3>
                <p className="text-white/60 text-sm">B2B Session</p>
              </div>
            </motion.div>

            {/* Nasac b2b staa */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="bg-zinc-800 rounded-lg overflow-hidden hover:bg-zinc-700 transition-colors"
            >
              <div className="aspect-video">
                <iframe 
                  className="w-full h-full rounded-t-lg"
                  src="https://www.youtube.com/embed/4EGyOAcQhxY?si=fdSQmMgM7r6jOQ-3" 
                  title="Nasac b2b staa"
                  frameBorder="0" 
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                  referrerPolicy="strict-origin-when-cross-origin" 
                  allowFullScreen
                />
              </div>
              <div className="p-4">
                <h3 className="text-white font-bold text-lg">Nasac b2b staa</h3>
                <p className="text-white/60 text-sm">B2B Session</p>
              </div>
            </motion.div>

            {/* TIVRE B2B JPSL */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="bg-zinc-800 rounded-lg overflow-hidden hover:bg-zinc-700 transition-colors"
            >
              <div className="aspect-video">
                <iframe 
                  className="w-full h-full rounded-t-lg"
                  src="https://www.youtube.com/embed/s63Sttpg-6Q?si=ehSHl5Xetx0_YgIJ" 
                  title="TIVRE B2B JPSL"
                  frameBorder="0" 
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                  referrerPolicy="strict-origin-when-cross-origin" 
                  allowFullScreen
                />
              </div>
              <div className="p-4">
                <h3 className="text-white font-bold text-lg">TIVRE B2B JPSL</h3>
                <p className="text-white/60 text-sm">B2B Session</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* RESIDENTS SECTION */}
      <section id="residents" className="py-20 bg-black">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-6xl font-black text-white tracking-wide mb-4">RESIDENTS</h2>
            <p className="text-white/60 text-lg">The core of our sound</p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {residents.map((resident, index) => (
              <motion.div
                key={resident.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="text-center group cursor-pointer"
                onClick={() => setSelectedResident(resident.id)}
              >
                <div className="relative mb-6">
                  <div className="w-64 h-64 mx-auto rounded-lg overflow-hidden">
                    <Image
                      src={resident.image}
                      alt={resident.name}
                      width={256}
                      height={256}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">{resident.name}</h3>
                <p className="text-white/60 text-lg mb-4">{resident.role}</p>
                <p className="text-white/40 text-sm max-w-xs mx-auto">{resident.bio}</p>
                <Button 
                  className="mt-4 bg-white/10 text-white hover:bg-white/20 border border-white/20"
                  size="sm"
                >
                  View Profile
                </Button>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Resident Modal */}
        {selectedResident && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-zinc-900 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="p-6">
                {(() => {
                  const resident = residents.find(r => r.id === selectedResident);
                  if (!resident) return null;
                  
                  return (
                    <>
                      {/* Header */}
                      <div className="flex justify-between items-start mb-6">
                        <div className="flex items-center gap-6">
                          <div className="w-24 h-24 rounded-lg overflow-hidden">
                            <Image
                              src={resident.image}
                              alt={resident.name}
                              width={96}
                              height={96}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div>
                            <h3 className="text-3xl font-bold text-white mb-2">{resident.name}</h3>
                            <p className="text-white/60 text-lg">{resident.role}</p>
                            <div className="flex items-center gap-2 mt-2 text-white/40">
                              <Mail size={16} />
                              <span className="text-sm">{resident.email}</span>
                            </div>
                          </div>
                        </div>
                        <button
                          onClick={() => setSelectedResident(null)}
                          className="text-white/60 hover:text-white transition-colors"
                        >
                          <X size={24} />
                        </button>
                      </div>

                      {/* Biography */}
                      <div className="mb-8">
                        <h4 className="text-xl font-bold text-white mb-4">Biography</h4>
                        <p className="text-white/80 leading-relaxed">{resident.fullBio}</p>
                      </div>

                      {/* Videos */}
                      {resident.videos.length > 0 && (
                        <div className="mb-8">
                          <h4 className="text-xl font-bold text-white mb-4">Featured Videos</h4>
                          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                            {resident.videos.map((video, index) => (
                              <div key={index} className="aspect-video">
                                <iframe 
                                  className="w-full h-full rounded-lg"
                                  src={video} 
                                  title={`${resident.name} Video ${index + 1}`}
                                  frameBorder="0" 
                                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                                  referrerPolicy="strict-origin-when-cross-origin" 
                                  allowFullScreen
                                />
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Releases */}
                      <div className="mb-8">
                        <h4 className="text-xl font-bold text-white mb-4">Releases</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                          {resident.releases.map((release, index) => (
                            <div key={index} className="bg-zinc-800 p-4 rounded-lg">
                              <p className="text-white font-medium">{release}</p>
                              <p className="text-white/60 text-sm">IMPCORE Records</p>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Booking */}
                      <div className="border-t border-white/10 pt-6">
                        <h4 className="text-xl font-bold text-white mb-4">Booking</h4>
                        <div className="flex gap-4">
                          <Button className="bg-white text-black hover:bg-white/90">
                            <Mail className="h-4 w-4 mr-2" />
                            Contact for Booking
                          </Button>
                          <Button variant="secondary" className="border-white/20 text-white hover:bg-white/10">
                            Download Press Kit
                          </Button>
                        </div>
                      </div>
                    </>
                  );
                })()}
              </div>
            </motion.div>
          </div>
        )}
      </section>

      {/* EVENTS SECTION */}
      <section id="events" className="py-20 bg-zinc-900">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-6xl font-black text-white tracking-wide mb-4">EVENTS</h2>
            <p className="text-white/60 text-lg">Upcoming shows and tickets</p>
          </motion.div>
          
          <div className="max-w-4xl mx-auto text-center">
            <Image
              src="/images/info.jpg"
              alt="Upcoming Events"
              width={800}
              height={400}
              className="w-full h-auto rounded-lg mb-8"
            />
            <Button className="bg-white text-black hover:bg-white/90 px-8 py-3 text-lg">
              Get Tickets
            </Button>
          </div>
        </div>
      </section>

      {/* NEWS SECTION */}
      <section id="news" className="py-20 bg-black">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-6xl font-black text-white tracking-wide mb-4">NEWS</h2>
            <p className="text-white/60 text-lg">Radio submissions, demos & booking</p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-zinc-900 p-8 rounded-lg text-center hover:bg-zinc-800 transition-colors"
            >
              <h3 className="text-2xl font-bold text-white mb-4">Demo Submissions</h3>
              <p className="text-white/60 mb-6">Send us your tracks for label consideration</p>
              <Button variant="secondary" className="border-white/20 text-white hover:bg-white/10">
                Submit Demo
              </Button>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-zinc-900 p-8 rounded-lg text-center hover:bg-zinc-800 transition-colors"
            >
              <h3 className="text-2xl font-bold text-white mb-4">Radio Shows</h3>
              <p className="text-white/60 mb-6">Apply for radio slots and podcasts</p>
              <Button variant="secondary" className="border-white/20 text-white hover:bg-white/10">
                Apply Now
              </Button>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-zinc-900 p-8 rounded-lg text-center hover:bg-zinc-800 transition-colors"
            >
              <h3 className="text-2xl font-bold text-white mb-4">Booking</h3>
              <p className="text-white/60 mb-6">Book our artists for your events</p>
              <Button variant="secondary" className="border-white/20 text-white hover:bg-white/10">
                Contact
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Streaming Modal */}
      {selectedReleaseForStreaming && (
        <StreamingModal
          release={selectedReleaseForStreaming}
          isOpen={!!selectedReleaseForStreaming}
          onClose={() => setSelectedReleaseForStreaming(null)}
        />
      )}
    </div>
  );
}
