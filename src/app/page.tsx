'use client';

import Image from "next/image";
import Link from "next/link";
import { Play, ChevronLeft, ChevronRight, X, Mail } from "lucide-react";
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/Button";
import { Release } from "@/types";
import { useState } from "react";

// Releases data - Actualizado con los últimos lanzamientos
const releases: Release[] = [
  {
    id: "1",
    slug: "energy-ep",
    title: "ENERGY EP",
    artist: "SPCMSK",
    coverImage: "/images/ENERGY EP.png",
    catalogNumber: "IMP003",
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
      { platform: "Spotify", url: "https://open.spotify.com/album/xyz", label: "Listen on Spotify" },
    ],
  },
  {
    id: "2",
    slug: "take-one-ep",
    title: "TAKE ONE EP",
    artist: "CX",
    coverImage: "/images/TAKE ONE EP.png",
    catalogNumber: "IMP004",
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
      { platform: "Spotify", url: "https://open.spotify.com/album/xyz", label: "Listen on Spotify" },
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
      { platform: "Spotify", url: "https://open.spotify.com/album/xyz", label: "Listen on Spotify" },
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
    fullBio: "SPCMSK es un pionero en las sesiones subterráneas de techno, conocido por su enfoque experimental y su habilidad para crear atmósferas inmersivas. Con más de 5 años en la escena, ha desarrollado un sonido único que combina elementos industriales con texturas ambientales profundas.",
    email: "spcmsk@impcore.com",
    videos: [],
    releases: ["ENERGY EP", "Sumergidos V.A."]
  },
  {
    id: "2", 
    name: "Cinder",
    image: "/images/CINDER1.jpg",
    role: "Ember Tracks",
    bio: "Creador de texturas ardientes y paisajes sonoros experimentales.",
    fullBio: "Cinder emerge desde las cenizas del techno tradicional para crear paisajes sonoros que arden con intensidad emocional. Su enfoque experimental combina elementos orgánicos con síntesis modular, creando texturas que evocan tanto destrucción como renacimiento.",
    email: "cinder@impcore.com",
    videos: ["https://www.youtube.com/embed/jRD4jQRYOSE?si=Z7-vhYZukf7BahHg"],
    releases: ["Sumergidos V.A.", "Ember Sessions EP"]
  },
  {
    id: "3",
    name: "Residente Nasac",
    image: "/images/NASAC.jpg", 
    role: "Midnight Frequencies",
    bio: "Residente principal especializado en frecuencias nocturnas.",
    fullBio: "Nasac es el alma nocturna de IMPCORE Records. Especializado en frecuencias que emergen en las horas más profundas de la noche, su música transporta a los oyentes a dimensiones donde el tiempo se desvanece y solo existe el pulso primordial del techno.",
    email: "nasac@impcore.com",
    videos: ["https://www.youtube.com/embed/GiyaS1mkF74?si=qwbv9b4zKOZ-MZb-"],
    releases: ["Sumergidos V.A.", "Midnight Chronicles", "Deep Frequencies Vol.1"]
  },
  {
    id: "4",
    name: "CX",
    image: "/images/spcmsk.jpg",
    role: "Experimental Producer",
    bio: "Productor emergente especializado en texturas experimentales.",
    fullBio: "CX emerge en la escena con un enfoque fresco y experimental al techno. Su debut 'TAKE ONE EP' demuestra una comprensión profunda de las texturas sonoras modernas, combinando elementos clásicos del underground con innovaciones contemporáneas.",
    email: "cx@impcore.com",
    videos: [],
    releases: ["TAKE ONE EP"]
  }
];

export default function Home() {
  const [currentReleaseIndex, setCurrentReleaseIndex] = useState(0);
  const [selectedResident, setSelectedResident] = useState<string | null>(null);

  const nextRelease = () => {
    setCurrentReleaseIndex((prev) => (prev + 1) % releases.length);
  };

  const prevRelease = () => {
    setCurrentReleaseIndex((prev) => (prev - 1 + releases.length) % releases.length);
  };

  return (
    <div className="min-h-screen bg-black">
      {/* HOME SECTION - Mutual Rytm Style */}
      <section className="h-screen flex items-center justify-center relative overflow-hidden">
        {/* Background Video */}
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover opacity-40"
          >
            <source src="/images/videopagina.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-black/30" />
        </div>
        
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
                        <Button size="sm" className="bg-white text-black hover:bg-white/90">
                          <Play className="h-4 w-4 mr-2" />
                          Listen
                        </Button>
                        <Button variant="secondary" size="sm" className="border-white/20 text-white hover:bg-white/10">
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
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
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
                  <div className="w-64 h-64 mx-auto rounded-full overflow-hidden">
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
                          <div className="w-24 h-24 rounded-full overflow-hidden">
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
    </div>
  );
}
