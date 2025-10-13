'use client';

import Image from "next/image";
import { Play, ChevronLeft, ChevronRight, X, Mail, ShoppingCart } from "lucide-react";
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/Button";
import { Release } from "@/types";
import { useState, useEffect } from "react";
import InstantVideo from "@/components/InstantVideo";
import StreamingModal from "@/components/StreamingModal";
import { musicEvents } from "@/components/GoogleAnalytics";
import { DemoSubmissionForm } from "@/components/DemoSubmissionFormSpanish";
import { RadioShowForm } from "@/components/RadioShowForm";
import { BookingForm } from "@/components/BookingForm";
import { localDataManager } from "@/data/content";
import dynamic from 'next/dynamic';

// Lazy load del componente pesado LiquidEther
const LiquidEther = dynamic(
  () => import("@/components/ui/aceternity/liquid-ether-background"),
  { 
    ssr: false, // No renderizar en el servidor
    loading: () => <div className="w-full h-full bg-black" /> // Placeholder mientras carga
  }
);

// Releases data - ahora se cargan desde localStorage
const initialReleases: Release[] = [
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
      { platform: "Beatport", url: "https://www.beatport.com/es/release/energy-ep/5120099", label: "Comprar en Beatport" },
    ],
    streamingLinks: [
      { platform: "Spotify", url: "https://open.spotify.com/intl-es/album/0QYQlMH471cTSHzGavPNAR?si=k1ZmVbixSOuTqPYkJtU5gg", label: "Escuchar en Spotify" },
      { platform: "Apple Music", url: "https://music.apple.com/cl/album/energy-ep-ep/1818890589", label: "Escuchar en Apple Music" },
      { platform: "SoundCloud", url: "https://soundcloud.com/imp-records-820395379/sets/imp-premiere-spcmsk-energy-ep-imp002?si=76e8e955de4b4bdcb55d7fe2208bc793&utm_source=clipboard&utm_medium=text&utm_campaign=social_sharing", label: "Escuchar en SoundCloud" },
      { platform: "YouTube", url: "https://www.youtube.com/watch?v=2NFYEc9Yzis&list=OLAK5uy_kUxgrQALAUFobIrhgQmwoJjPrmoqcFp98", label: "Escuchar en YouTube" },
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
      { platform: "Beatport", url: "https://www.beatport.com/es/release/take-one-ep/5153717", label: "Comprar en Beatport" },
    ],
    streamingLinks: [
      { platform: "Spotify", url: "https://open.spotify.com/intl-es/album/0cRquvjzzVTTEK1PvZLUAe?si=feaJtdncTm-wUa0AH6h1NQ", label: "Escuchar en Spotify" },
      { platform: "Apple Music", url: "https://music.apple.com/cl/album/take-one-ep-single/1823431827", label: "Escuchar en Apple Music" },
      { platform: "SoundCloud", url: "https://soundcloud.com/imp-records-820395379/sets/imp-premiere-spcmsk-take-one-ep-imp003?si=087b9503427d40f39914026e3651c5ef&utm_source=clipboard&utm_medium=text&utm_campaign=social_sharing", label: "Escuchar en SoundCloud" },
      { platform: "YouTube", url: "https://www.youtube.com/watch?v=8K8bRZeOT1s", label: "Escuchar en YouTube" },
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
      { platform: "Bandcamp", url: "https://impcore.bandcamp.com/album/sumergidos-va", label: "Comprar en Bandcamp" },
    ],
    streamingLinks: [
      { platform: "Spotify", url: "https://open.spotify.com/intl-es/album/3AX3t9n4XOx9XjkQJuhhhf?si=oWdWoVZUThaxC-WFWPiSDQ", label: "Escuchar en Spotify" },
      { platform: "Apple Music", url: "https://music.apple.com/cl/album/sumergidos-va/1805165753", label: "Escuchar en Apple Music" },
      { platform: "SoundCloud", url: "https://soundcloud.com/imp-records-820395379/sets/imp-va0001?si=3efdf0c8fa6b4010a10cbd29c198617a&utm_source=clipboard&utm_medium=text&utm_campaign=social_sharing", label: "Escuchar en SoundCloud" },
      { platform: "YouTube", url: "https://youtube.com/playlist?list=OLAK5uy_lKZvn8Uvsi8R_Xy7xHkl_eaIvR6offWZg&si=mKTDiFoAZu4bK_aT", label: "Escuchar en YouTube" },
      { platform: "Bandcamp", url: "https://impcore.bandcamp.com/album/sumergidos-v-a", label: "Escuchar en Bandcamp" },
    ],
  },
];

// Residents data
const residents = [
  {
    id: "1",
    name: "SPCMSK",
    image: "/images/spcmsk.jpg",
    role: "IMPCORE RESIDENT",
    bio: "HARD GROOVE | RAW TECHNO",
    fullBio: "SPCMSK, DJ y productor chileno de 23 años nacido en Viña del Mar, comenzó su pasión por la música influenciado por EDM y artistas como Skrillex y Zomboy. A los 16 años descubrió el techno, desarrollando un estilo versátil que combina hardgroove percusivo con techno rápido y groovero. A los 21 años incursionó en la producción musical y ha tocado en clubes como Woo Club, The House y Espacio 93, compartiendo escenario con artistas reconocidos. Actualmente, cuenta con lanzamientos en sellos como Inherente Project y DKN Selections y es fundador de IMP CORE, su sello y productora de eventos, consolidándose como una promesa del techno chileno.",
    email: "spcmsk@impcore.com",
    videos: [],
    releases: ["Dzb Records", "Marlow Records", "Inherente Records", "Space Records", "Xelima Records", "Logia Sound Collective", "IMP CORE"]
  },
  {
    id: "2", 
    name: "CINDER",
    image: "/images/CINDER1.jpg",
    role: "IMPCORE RESIDENT",
    bio: "HARD GROOVE | RAW TECHNO",
    fullBio: "Cinder artista de la quinta región reconocido por sus mezclas entre raw techno y hardgroove. Se caracteriza por sets bastante hypnóticos y sonidos grooveros. A través del tiempo ha logrado tocar en importantes clubes de su región y en la capital de nuestro país",
    email: "cinder@impcore.com",
    videos: ["https://www.youtube.com/embed/jRD4jQRYOSE?si=Z7-vhYZukf7BahHg"],
    releases: ["IMP CORE" ]
  },
  {
    id: "3",
    name: "NASAC",
    image: "/images/NASAC.jpg", 
    role: "IMPCORE RESIDENT",
    bio: "RAW TECHNO",
    fullBio: "Nicolás Sanhueza, conocido como Nasac, es un DJ emergente apasionado por el techno. Su viaje comenzó en 2019 como parte del público, y en 2022 decidió dedicarse profesionalmente. En 2023 adquirió su primera controladora y estudió en DJ School, presentando sus primeros sets en The House. Actualmente, es residente en BigBang Label, IMPCORE y Deforastó Club, explorando géneros como peak time, rawstyle/hardgroove y hard techno. También se dedica a la producción musical, enfocándose en raw techno y hardgroove. Su estilo busca generar una conexión profunda con el público, creando una atmósfera inmersiva a través de sonidos estimulantes. Su objetivo es mantener a la audiencia en sintonía con la música, estableciendo una experiencia de baile única y envolvente.",
    email: "nasac@impcore.com",
    videos: ["https://www.youtube.com/embed/GiyaS1mkF74?si=qwbv9b4zKOZ-MZb-"],
    releases: [" IMP CORE "]
  }
];

export default function Home() {
  const [releases, setReleases] = useState<Release[]>(initialReleases);
  const [currentReleaseIndex, setCurrentReleaseIndex] = useState(0);
  const [selectedResident, setSelectedResident] = useState<string | null>(null);
  const [selectedReleaseForStreaming, setSelectedReleaseForStreaming] = useState<Release | null>(null);
  const [isDemoFormOpen, setIsDemoFormOpen] = useState(false);
  const [isRadioFormOpen, setIsRadioFormOpen] = useState(false);
  const [isBookingFormOpen, setIsBookingFormOpen] = useState(false);

  // Cargar releases desde localStorage al montar el componente
  useEffect(() => {
    const storedReleases = localDataManager.getReleases();
    if (storedReleases.length > 0) {
      setReleases(storedReleases);
    }
  }, []);

  const nextRelease = () => {
    setCurrentReleaseIndex((prev) => (prev + 1) % releases.length);
  };

  const prevRelease = () => {
    setCurrentReleaseIndex((prev) => (prev - 1 + releases.length) % releases.length);
  };

  const handleListenClick = (release: Release) => {
    console.log('Listen clicked for:', release.title); // Debug log
    musicEvents.viewReleaseDetails(release.title);
    setSelectedReleaseForStreaming(release);
  };

  const handleBuyClick = (release: Release) => {
    console.log('Buy clicked for:', release.title); // Debug log
    if (release.purchaseLinks && release.purchaseLinks.length > 0) {
      musicEvents.clickPurchaseLink(release.purchaseLinks[0].platform, release.title);
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
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="text-lg md:text-xl text-white/70 mt-4 max-w-2xl mx-auto"
          >
Sello discográfico independiente dedicado a la música electrónica underground
          </motion.p>
          
          {/* Call to Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.9 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mt-8"
          >
            <a
              href="#demos"
              className="px-8 py-3 text-white font-medium tracking-wide border border-white/30 rounded-lg hover:bg-white/10 transition-all duration-300 text-center"
            >
              Enviar Demo
            </a>
            <a
              href="#releases"
              className="px-8 py-3 text-white font-medium tracking-wide border border-white/30 rounded-lg hover:bg-white/10 transition-all duration-300 text-center"
            >
              Explorar Música
            </a>
          </motion.div>
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
              <a href="#home" className="hover:text-white transition-colors duration-300">INICIO</a>
              <a href="#releases" className="hover:text-white transition-colors duration-300">LANZAMIENTOS</a>
              <a href="#sessions" className="hover:text-white transition-colors duration-300">SESIONES</a>
              <a href="#residents" className="hover:text-white transition-colors duration-300">RESIDENTES</a>
              <a href="#events" className="hover:text-white transition-colors duration-300">EVENTOS</a>
              <a href="#demos" className="hover:text-white transition-colors duration-300">DEMOS</a>
            </div>
          </div>
        </motion.nav>
      </section>

      {/* RELEASES SECTION */}
      <section id="releases" className="py-20 bg-black relative overflow-hidden">
        {/* Liquid Ether Background */}
        <div style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', zIndex: 0 }}>
          <LiquidEther 
            colors={['#0066FF', '#00CCFF', '#0099FF']}
            mouseForce={20}
            cursorSize={100}
            isViscous={false}
            viscous={30}
            iterationsViscous={20}
            iterationsPoisson={20}
            resolution={0.35}
            isBounce={false}
            autoDemo={true}
            autoSpeed={0.5}
            autoIntensity={2.2}
            takeoverDuration={0.25}
            autoResumeDelay={3000}
            autoRampDuration={0.6}
            className="pointer-events-auto"
          />
        </div>
        
        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-6xl font-black text-white tracking-wide mb-4">LANZAMIENTOS</h2>
            <p className="text-white/60 text-lg">Últimos Lanzamientos</p>
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
                    className="group/card perspective-1000"
                  >
                    <div className="bg-zinc-900 rounded-lg overflow-hidden transition-all duration-300 shadow-lg relative transform-gpu hover:scale-[1.05] hover:rotate-1 hover:shadow-[0_0_30px_rgba(0,102,255,0.4)] border border-white/5 hover:border-accent/50">
                      <div className="aspect-square relative overflow-hidden">
                        <Image
                          src={release.coverImage}
                          alt={`${release.artist} - ${release.title}`}
                          fill
                          className="object-cover transition-transform duration-500 group-hover/card:scale-110"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 25vw"
                          loading="lazy"
                        />
                        {/* Glow effect on hover */}
                        <div className="absolute inset-0 opacity-0 group-hover/card:opacity-100 transition-opacity duration-500 pointer-events-none">
                          <div className="absolute inset-0 bg-gradient-to-t from-accent/20 via-transparent to-transparent" />
                        </div>
                      </div>
                      <div className="p-6 relative">
                        <h3 className="text-white font-bold text-lg mb-2 group-hover/card:text-accent transition-colors">{release.title}</h3>
                        <p className="text-white/60 mb-4">{release.artist}</p>
                        <div className="flex gap-2">
                          <Button 
                            size="sm" 
                            className="bg-white text-black hover:bg-white/90 shadow-lg shadow-accent/20"
                            onClick={() => handleListenClick(release)}
                          >
                            <Play className="h-4 w-4 mr-2" />
                            Escuchar
                        </Button>
                        <Button 
                          variant="secondary" 
                          size="sm" 
                          className="border-white/20 text-white hover:bg-white/10"
                          onClick={() => handleBuyClick(release)}
                        >
                          <ShoppingCart className="h-4 w-4 mr-2" />
                          Comprar
                        </Button>
                      </div>
                      {/* Bottom gradient line */}
                      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-accent to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-500" />
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
      <section id="sessions" className="py-20 bg-black relative overflow-hidden">
        {/* Liquid Ether Background */}
        <div style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', zIndex: 0 }}>
          <LiquidEther 
            colors={['#7b61ff', '#0066FF', '#FF3366']}
            mouseForce={20}
            cursorSize={100}
            isViscous={false}
            viscous={30}
            iterationsViscous={20}
            iterationsPoisson={20}
            resolution={0.35}
            isBounce={false}
            autoDemo={true}
            autoSpeed={0.55}
            autoIntensity={2.5}
            takeoverDuration={0.25}
            autoResumeDelay={3000}
            autoRampDuration={0.6}
            className="pointer-events-auto"
          />
        </div>
        
        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-6xl font-black text-white tracking-wide mb-4">SESIONES</h2>
            <p className="text-white/60 text-lg">Revive los mejores momentos de nuestros encuentros</p>
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
                <h3 className="text-white font-bold text-lg">RODDO B2B GRENK</h3>
                <p className="text-white/60 text-sm">Immersive Mental Patterns | 09/11 | IMPXWOO</p>
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
                <p className="text-white/60 text-sm">Immersive Mental Patterns | 09/11 | IMPXWOO</p>
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
                <p className="text-white/60 text-sm">Immersive Mental Patterns | 09/11 | IMPXWOO</p>
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
                <h3 className="text-white font-bold text-lg">NASAC B2B STAA</h3>
                <p className="text-white/60 text-sm">Immersive Mental Patterns | 09/11 | IMPXWOO</p>
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
                <p className="text-white/60 text-sm">Immersive Mental Patterns | 09/11 | IMPXWOO</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* RESIDENTS SECTION */}
      <section id="residents" className="py-20 bg-black relative overflow-hidden">
        {/* Liquid Ether Background */}
        <div style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', zIndex: 0 }}>
          <LiquidEther 
            colors={['#0066FF', '#7b61ff', '#00CCFF']}
            mouseForce={22}
            cursorSize={120}
            isViscous={false}
            viscous={30}
            iterationsViscous={20}
            iterationsPoisson={20}
            resolution={0.35}
            isBounce={false}
            autoDemo={true}
            autoSpeed={0.6}
            autoIntensity={2.8}
            takeoverDuration={0.25}
            autoResumeDelay={3000}
            autoRampDuration={0.6}
            className="pointer-events-auto"
          />
        </div>
        
        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-6xl font-black text-white tracking-wide mb-4">RESIDENTES</h2>
            <p className="text-white/60 text-lg">El núcleo de nuestro sonido</p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {residents.map((resident, index) => (
              <motion.div
                key={resident.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="text-center group/resident cursor-pointer perspective-1000"
                onClick={() => {
                  musicEvents.viewArtistProfile(resident.name);
                  setSelectedResident(resident.id);
                }}
              >
                <div className="relative mb-6 transform-gpu transition-all duration-300 hover:scale-105 hover:-rotate-1">
                  <div className="w-64 h-72 mx-auto rounded-lg overflow-hidden border border-white/10 hover:border-accent/50 transition-all shadow-lg hover:shadow-[0_0_30px_rgba(0,102,255,0.4)]">
                    <Image
                      src={resident.image}
                      alt={resident.name}
                      width={256}
                      height={288}
                      className="w-full h-full object-cover group-hover/resident:scale-110 transition-transform duration-500"
                      loading="lazy"
                    />
                    {/* Glow overlay */}
                    <div className="absolute inset-0 opacity-0 group-hover/resident:opacity-100 transition-opacity duration-500 pointer-events-none">
                      <div className="absolute inset-0 bg-gradient-to-t from-accent/30 via-transparent to-transparent" />
                    </div>
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-white mb-2 group-hover/resident:text-accent transition-colors">{resident.name}</h3>
                <p className="text-white/60 text-lg mb-4">{resident.role}</p>
                <p className="text-white/40 text-sm max-w-xs mx-auto">{resident.bio}</p>
                <Button 
                  className="mt-4 bg-white/10 text-white hover:bg-white/20 border border-white/20 hover:border-accent/50 shadow-lg shadow-accent/10 transition-all"
                  size="sm"
                >
                  Ver Perfil
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
                        <h4 className="text-xl font-bold text-white mb-4">Biografía</h4>
                        <p className="text-white/80 leading-relaxed">{resident.fullBio}</p>
                      </div>

                      {/* Videos */}
                      {resident.videos.length > 0 && (
                        <div className="mb-8">
                          <h4 className="text-xl font-bold text-white mb-4">Videos Destacados</h4>
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
                        <h4 className="text-xl font-bold text-white mb-4">Lanzamientos</h4>
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
                        <h4 className="text-xl font-bold text-white mb-4">Contrataciones</h4>
                        <div className="flex gap-4">
                          <Button className="bg-white text-black hover:bg-white/90">
                            <Mail className="h-4 w-4 mr-2" />
                            Contactar para Contratación
                          </Button>
                          <Button variant="secondary" className="border-white/20 text-white hover:bg-white/10">
                            Descargar Press Kit
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
      <section id="events" className="py-20 bg-black relative overflow-hidden">
        {/* Liquid Ether Background */}
        <div style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', zIndex: 0 }}>
          <LiquidEther 
            colors={['#FF3366', '#0066FF', '#00CCFF']}
            mouseForce={25}
            cursorSize={110}
            isViscous={false}
            viscous={30}
            iterationsViscous={20}
            iterationsPoisson={20}
            resolution={0.35}
            isBounce={false}
            autoDemo={true}
            autoSpeed={0.7}
            autoIntensity={3.0}
            takeoverDuration={0.25}
            autoResumeDelay={3000}
            autoRampDuration={0.6}
            className="pointer-events-auto"
          />
        </div>
        
        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-6xl font-black text-white tracking-wide mb-4">EVENTOS</h2>
            <p className="text-white/60 text-lg">Próximos shows y entradas</p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {/* Event 1: ADN REWORK */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0 }}
              className="group/event bg-zinc-900 rounded-lg overflow-hidden hover:bg-zinc-800 transition-all duration-300 cursor-pointer"
            >
              <div className="relative aspect-square overflow-hidden">
                <Image
                  src="/images/eventos.png"
                  alt="ADN REWORK"
                  width={400}
                  height={400}
                  className="w-full h-full object-cover group-hover/event:scale-110 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover/event:opacity-100 transition-opacity duration-300" />
              </div>
              <div className="p-6">
                <div className="text-accent text-sm font-semibold mb-2">18/10/2025</div>
                <h3 className="text-2xl font-bold text-white mb-2">ADN REWORK</h3>
                <p className="text-white/60 mb-4">Evento especial de techno</p>
                <Button className="w-full bg-accent hover:bg-accent/90 text-white">
                  Obtener Entradas
                </Button>
              </div>
            </motion.div>

            {/* Event 2: SOUND OR TRICK WORKSHOP */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="group/event bg-zinc-900 rounded-lg overflow-hidden hover:bg-zinc-800 transition-all duration-300 cursor-pointer"
            >
              <div className="relative aspect-square overflow-hidden">
                <Image
                  src="/images/eventos.png"
                  alt="SOUND OR TRICK WORKSHOP"
                  width={400}
                  height={400}
                  className="w-full h-full object-cover group-hover/event:scale-110 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover/event:opacity-100 transition-opacity duration-300" />
              </div>
              <div className="p-6">
                <div className="text-accent text-sm font-semibold mb-2">Próximamente</div>
                <h3 className="text-2xl font-bold text-white mb-2">SOUND OR TRICK WORKSHOP</h3>
                <p className="text-white/60 mb-4">Workshop de producción</p>
                <Button className="w-full bg-accent hover:bg-accent/90 text-white">
                  Más Información
                </Button>
              </div>
            </motion.div>

            {/* Event 3: RAVE */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="group/event bg-zinc-900 rounded-lg overflow-hidden hover:bg-zinc-800 transition-all duration-300 cursor-pointer"
            >
              <div className="relative aspect-square overflow-hidden">
                <Image
                  src="/images/eventos.png"
                  alt="RAVE"
                  width={400}
                  height={400}
                  className="w-full h-full object-cover group-hover/event:scale-110 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover/event:opacity-100 transition-opacity duration-300" />
              </div>
              <div className="p-6">
                <div className="text-accent text-sm font-semibold mb-2">18/10/2025</div>
                <h3 className="text-2xl font-bold text-white mb-2">RAVE</h3>
                <p className="text-white/60 mb-4">Noche de techno underground</p>
                <Button className="w-full bg-accent hover:bg-accent/90 text-white">
                  Obtener Entradas
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* DEMOS SECTION */}
      <section id="demos" className="py-20 bg-black relative overflow-hidden">
        {/* Liquid Ether Background */}
        <div style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', zIndex: 0 }}>
          <LiquidEther 
            colors={['#0066FF', '#7b61ff', '#FF3366']}
            mouseForce={18}
            cursorSize={90}
            isViscous={false}
            viscous={30}
            iterationsViscous={20}
            iterationsPoisson={20}
            resolution={0.35}
            isBounce={false}
            autoDemo={true}
            autoSpeed={0.4}
            autoIntensity={2.0}
            takeoverDuration={0.25}
            autoResumeDelay={3000}
            autoRampDuration={0.6}
            className="pointer-events-auto"
          />
        </div>
        
        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-6xl font-black text-white tracking-wide mb-4">DEMOS</h2>
            <p className="text-white/60 text-lg">Envío de demos, radio y contrataciones</p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-zinc-900 p-8 rounded-lg hover:bg-zinc-800 transition-colors flex flex-col"
            >
              <div className="text-center flex-1 flex flex-col">
                <h3 className="text-2xl font-bold text-white mb-4">Envío de Demos</h3>
                <p className="text-white/60 mb-6 flex-1">Envíanos tus tracks para consideración del sello</p>
                <Button 
                  variant="secondary" 
                  className="border-white/20 text-white hover:bg-white/10 w-full"
                  onClick={() => setIsDemoFormOpen(true)}
                >
                  Enviar Demo
                </Button>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-zinc-900 p-8 rounded-lg hover:bg-zinc-800 transition-colors flex flex-col"
            >
              <div className="text-center flex-1 flex flex-col">
                <h3 className="text-2xl font-bold text-white mb-4">Shows de Radio</h3>
                <p className="text-white/60 mb-6 flex-1">Aplica para slots de radio y podcasts</p>
                <Button 
                  variant="secondary" 
                  className="border-white/20 text-white hover:bg-white/10 w-full"
                  onClick={() => setIsRadioFormOpen(true)}
                >
                  Aplicar Ahora
                </Button>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-zinc-900 p-8 rounded-lg hover:bg-zinc-800 transition-colors flex flex-col"
            >
              <div className="text-center flex-1 flex flex-col">
                <h3 className="text-2xl font-bold text-white mb-4">Contrataciones</h3>
                <p className="text-white/60 mb-6 flex-1">Contrata nuestros artistas para tus eventos</p>
                <Button 
                  variant="secondary" 
                  className="border-white/20 text-white hover:bg-white/10 w-full"
                  onClick={() => setIsBookingFormOpen(true)}
                >
                  Contactar
                </Button>
              </div>
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

      {/* Demo Submission Modal */}
      <DemoSubmissionForm
        isOpen={isDemoFormOpen}
        onClose={() => setIsDemoFormOpen(false)}
      />

      {/* Radio Show Application Modal */}
      <RadioShowForm
        isOpen={isRadioFormOpen}
        onClose={() => setIsRadioFormOpen(false)}
      />

      {/* Booking Request Modal */}
      <BookingForm
        isOpen={isBookingFormOpen}
        onClose={() => setIsBookingFormOpen(false)}
      />
    </div>
  );
}
