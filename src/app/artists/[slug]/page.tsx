'use client';

import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Instagram, Music, Youtube } from 'lucide-react';
import { notFound } from 'next/navigation';
import dynamic from 'next/dynamic';

// Lazy load del componente pesado LiquidEther
const LiquidEther = dynamic(
  () => import("@/components/ui/aceternity/liquid-ether-background"),
  { 
    ssr: false,
    loading: () => <div className="w-full h-full bg-black" />
  }
);

const artists = {
  spcmsk: {
    name: "SPCMSK",
    image: "/images/spcmsk.jpg",
    role: "IMPCORE RESIDENT & FOUNDER",
    bio: "HARD TECHNO | RAW TECHNO | HARDGROOVE",
    fullBio: "SPCMSK, fundador y residente de IMPCORE Records, es un productor y DJ chileno especializado en hard techno, raw techno y hardgroove. Su sonido se caracteriza por líneas de bajo profundas, kicks potentes y atmósferas industriales que transportan al oyente a un estado de trance energético. Con una visión clara de descentralizar la música electrónica en Chile, SPCMSK ha sido pieza fundamental en el crecimiento de la escena techno en Valparaíso y la Quinta Región. Su trabajo como productor incluye más de 15 tracks lanzados en IMPCORE Records, destacando su EP 'ENERGY' que alcanzó reconocimiento en plataformas como Beatport y Spotify. Como DJ, ha tocado en los principales clubes de Valparaíso y Santiago, compartiendo cabina con artistas nacionales e internacionales de renombre.",
    genre: ["Hard Techno", "Raw Techno", "Hardgroove", "Peak Time Techno"],
    releases: ["ENERGY EP", "TAKE ONE EP", "Various IMPCORE compilations"],
    socialLinks: {
      instagram: "https://instagram.com/spcmsk",
      soundcloud: "https://soundcloud.com/spcmsk",
      spotify: "https://open.spotify.com/artist/spcmsk"
    },
    videos: []
  },
  cinder: {
    name: "CINDER",
    image: "/images/CINDER1.jpg",
    role: "IMPCORE RESIDENT",
    bio: "HARD GROOVE | RAW TECHNO",
    fullBio: "Cinder, artista de la Quinta Región, es reconocido por sus mezclas entre raw techno y hardgroove. Se caracteriza por sets bastante hypnóticos y sonidos grooveros que mantienen a la pista en constante movimiento. A través del tiempo ha logrado tocar en importantes clubes de su región y en la capital de nuestro país, consolidándose como una figura clave en la escena underground chilena. Su capacidad para leer la pista y crear narrativas sonoras únicas lo ha convertido en un residente invaluable de IMPCORE Records. Su estilo distintivo fusiona elementos del techno clásico con sonidos modernos y experimentales, creando atmósferas envolventes que conectan profundamente con el público.",
    genre: ["Hardgroove", "Raw Techno", "Hypnotic Techno"],
    releases: ["IMP CORE Compilations"],
    socialLinks: {
      instagram: "https://instagram.com/cinder",
      youtube: "https://www.youtube.com/embed/jRD4jQRYOSE?si=Z7-vhYZukf7BahHg"
    },
    videos: ["https://www.youtube.com/embed/jRD4jQRYOSE?si=Z7-vhYZukf7BahHg"]
  },
  nasac: {
    name: "NASAC",
    image: "/images/NASAC.jpg",
    role: "IMPCORE RESIDENT",
    bio: "RAW TECHNO | PEAK TIME TECHNO",
    fullBio: "Nicolás Sanhueza, conocido como Nasac, es un DJ emergente apasionado por el techno. Su viaje comenzó en 2019 como parte del público, y en 2022 decidió dedicarse profesionalmente a la música. En 2023 adquirió su primera controladora y estudió en DJ School, presentando sus primeros sets en The House. Actualmente, es residente en BigBang Label, IMPCORE y Deforastó Club, explorando géneros como peak time, rawstyle/hardgroove y hard techno. También se dedica a la producción musical, enfocándose en raw techno y hardgroove. Su estilo busca generar una conexión profunda con el público, creando una atmósfera inmersiva a través de sonidos estimulantes. Su objetivo es mantener a la audiencia en sintonía con la música, estableciendo una experiencia de baile única y envolvente que trasciende lo convencional.",
    genre: ["Raw Techno", "Peak Time Techno", "Hardgroove", "Hard Techno"],
    releases: ["IMP CORE Compilations"],
    socialLinks: {
      instagram: "https://instagram.com/nasac",
      youtube: "https://www.youtube.com/embed/GiyaS1mkF74?si=qwbv9b4zKOZ-MZb-"
    },
    videos: ["https://www.youtube.com/embed/GiyaS1mkF74?si=qwbv9b4zKOZ-MZb-"]
  }
};

export default function ArtistPage() {
  const params = useParams();
  const slug = params.slug as string;
  const artist = artists[slug as keyof typeof artists];

  if (!artist) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-black relative">
      {/* Liquid Ether Background */}
      <div className="fixed inset-0 z-0">
        <LiquidEther 
          colors={['#7b61ff', '#0066FF', '#FF3366']}
          mouseForce={20}
          cursorSize={100}
          isViscous={false}
        />
      </div>

      {/* Back Button */}
      <div className="fixed top-24 left-4 sm:left-8 z-50">
        <Link
          href="/#residents"
          className="flex items-center gap-2 text-white/60 hover:text-white transition-colors group"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          <span className="hidden sm:inline">Volver</span>
        </Link>
      </div>

      {/* Hero Section - Pantalla completa con imagen centrada */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0 z-10">
          <Image
            src={artist.image}
            alt={artist.name}
            fill
            className="object-contain"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/90" />
        </div>
        
        <div className="relative z-20 w-full px-4 sm:px-6 lg:px-8 py-32">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black text-white tracking-wider mb-6"
            >
              {artist.name}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl sm:text-2xl md:text-3xl text-white/90 tracking-wide"
            >
              {artist.bio}
            </motion.p>
          </div>
        </div>
      </section>

      {/* Bio Section */}
      <section className="relative py-16 md:py-24 px-4 sm:px-6 lg:px-8 z-30 bg-black/60 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl sm:text-4xl font-black text-white mb-8 tracking-wide">
              BIOGRAFÍA
            </h2>
            <p className="text-white/80 text-base sm:text-lg leading-relaxed">
              {artist.fullBio}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Genre Section */}
      <section className="relative py-8 px-4 sm:px-6 lg:px-8 bg-black/40 backdrop-blur-sm z-30">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h3 className="text-2xl font-bold text-white mb-4 tracking-wide">
              GÉNEROS
            </h3>
            <div className="flex flex-wrap gap-3">
              {artist.genre.map((genre) => (
                <span
                  key={genre}
                  className="px-4 py-2 bg-gradient-to-r from-slate-400/20 to-slate-300/20 border border-slate-300/40 rounded-full text-slate-200 text-sm font-medium shadow-lg shadow-slate-400/10"
                >
                  {genre}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Releases Section */}
      <section className="relative py-16 md:py-24 px-4 sm:px-6 lg:px-8 z-30">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl sm:text-4xl font-black text-white mb-8 tracking-wide flex items-center gap-3">
              <Music className="w-8 h-8" />
              LANZAMIENTOS
            </h2>
            <ul className="space-y-3">
              {artist.releases.map((release) => (
                <li
                  key={release}
                  className="text-white/80 text-base sm:text-lg flex items-center gap-3"
                >
                    <span className="w-2 h-2 bg-white/60 rounded-full" />
                  {release}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </section>

      {/* Videos Section */}
      {artist.videos && artist.videos.length > 0 && (
        <section className="relative py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-black/40 backdrop-blur-sm z-30">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl sm:text-4xl font-black text-white mb-8 tracking-wide flex items-center gap-3">
                <Youtube className="w-8 h-8" />
                SESIONES
              </h2>
              <div className="aspect-video rounded-lg overflow-hidden">
                <iframe
                  className="w-full h-full"
                  src={artist.videos[0]}
                  title={`${artist.name} Session`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* Social Links */}
      <section className="relative py-16 md:py-24 px-4 sm:px-6 lg:px-8 z-30">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl sm:text-4xl font-black text-white mb-8 tracking-wide">
              SÍGUELO
            </h2>
            <div className="flex flex-wrap gap-6 justify-center">
              {artist.socialLinks.instagram && (
                <a
                  href={artist.socialLinks.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-slate-400/20 to-slate-300/20 border border-slate-300/40 rounded-lg text-white hover:from-slate-400/30 hover:to-slate-300/30 transition-all shadow-lg shadow-slate-400/10"
                >
                  <Instagram className="w-5 h-5" />
                  <span>Instagram</span>
                </a>
              )}
              {'soundcloud' in artist.socialLinks && artist.socialLinks.soundcloud && (
                <a
                  href={artist.socialLinks.soundcloud}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-slate-400/20 to-slate-300/20 border border-slate-300/40 rounded-lg text-white hover:from-slate-400/30 hover:to-slate-300/30 transition-all shadow-lg shadow-slate-400/10"
                >
                  <Music className="w-5 h-5" />
                  <span>SoundCloud</span>
                </a>
              )}
              {'spotify' in artist.socialLinks && artist.socialLinks.spotify && (
                <a
                  href={artist.socialLinks.spotify}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-slate-400/20 to-slate-300/20 border border-slate-300/40 rounded-lg text-white hover:from-slate-400/30 hover:to-slate-300/30 transition-all shadow-lg shadow-slate-400/10"
                >
                  <Music className="w-5 h-5" />
                  <span>Spotify</span>
                </a>
              )}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
