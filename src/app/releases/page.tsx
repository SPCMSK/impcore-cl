'use client'

import { useState, useEffect } from 'react'
import { ReleaseCard } from "@/components/ReleaseCard";
import { Release } from "@/types";
import { localDataManager } from "@/data/content";
import { BackgroundGridPattern } from "@/components/ui/aceternity/background-grid";
import { TextReveal } from "@/components/ui/aceternity/text-reveal";
import { MovingBorderButton } from "@/components/ui/aceternity/moving-border";

export default function ReleasesPage() {
  const [releases, setReleases] = useState<Release[]>([])
  const [isLoading, setIsLoading] = useState(true)
  
  // Cargar releases desde localStorage
  const fetchReleases = () => {
    try {
      const data = localDataManager.getReleases()
      setReleases(data)
    } catch (error) {
      console.error('Error fetching releases:', error)
    } finally {
      setIsLoading(false)
    }
  }
  
  useEffect(() => {
    fetchReleases()
  }, [])
  
  if (isLoading) {
    return (
      <div className="min-h-screen py-20 flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-foreground/60">Cargando releases...</p>
        </div>
      </div>
    )
  }
  
  return (
    <div className="min-h-screen py-20 relative overflow-hidden">
      {/* Background Grid Pattern */}
      <BackgroundGridPattern className="absolute inset-0 z-0" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center space-y-4 mb-16">
          <TextReveal 
            text="Lanzamientos" 
            className="text-4xl md:text-5xl tracking-wide text-foreground"
          />
          <p className="text-foreground/60 max-w-2xl mx-auto text-lg">
            Explora nuestro catálogo completo de lanzamientos de música electrónica, 
            con artistas innovadores y producciones de vanguardia.
          </p>
        </div>

        {/* Releases Grid */}
        {releases.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {releases.map((release) => (
              <ReleaseCard key={release.id} release={release} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-foreground/60 text-lg">No hay releases disponibles</p>
          </div>
        )}

        {/* Load More Button */}
        {releases.length > 0 && (
          <div className="text-center mt-12">
            <MovingBorderButton
              borderRadius="0.5rem"
              className="bg-background/80 text-foreground hover:bg-background"
              duration={3000}
            >
              Cargar Más Lanzamientos
            </MovingBorderButton>
          </div>
        )}
      </div>
    </div>
  );
}