'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'
import {
  Home,
  BookOpen,
  Music,
  Video,
  Download,
  User,
  LogOut,
  Clock
} from 'lucide-react'
import { Button } from '@/components/ui/Button'

// Mock data para contenido premium
const premiumContent = {
  courses: [
    {
      id: 1,
      title: 'Producción de Techno Underground',
      description: 'Aprende las técnicas avanzadas de producción techno con los residentes de IMPCORE',
      duration: '4 horas',
      level: 'Intermedio',
      instructor: 'SPCMSK',
      image: '/images/course-techno.jpg',
      progress: 65,
      available: true
    },
    {
      id: 2,
      title: 'Mezcla y Mastering para Sellos',
      description: 'Técnicas profesionales de mezcla y mastering para música electrónica',
      duration: '3.5 horas',
      level: 'Avanzado',
      instructor: 'NASAC',
      image: '/images/course-mixing.jpg',
      progress: 0,
      available: true
    },
    {
      id: 3,
      title: 'DJ Set Construction',
      description: 'Construye sets profesionales y maneja la energía de la pista',
      duration: '2.5 horas',
      level: 'Principiante',
      instructor: 'CINDER',
      image: '/images/course-dj.jpg',
      progress: 0,
      available: false // Próximamente
    }
  ],
  exclusiveReleases: [
    {
      id: 1,
      title: 'Unreleased Demo Pack Vol.1',
      artist: 'IMPCORE Residents',
      type: 'Demo Pack',
      size: '120 MB',
      tracks: 8,
      downloadUrl: '/downloads/demo-pack-1.zip'
    },
    {
      id: 2,
      title: 'Studio Session Live',
      artist: 'SPCMSK',
      type: 'Live Recording',
      size: '85 MB',
      tracks: 1,
      downloadUrl: '/downloads/studio-session.mp3'
    }
  ],
  tutorials: [
    {
      id: 1,
      title: 'Síntesis de Bass Techno',
      duration: '15 min',
      viewed: true
    },
    {
      id: 2,
      title: 'Efectos Creativos con Delay',
      duration: '12 min', 
      viewed: false
    },
    {
      id: 3,
      title: 'Arreglos Dinámicos',
      duration: '18 min',
      viewed: false
    }
  ]
}

export default function UserDashboard() {
  const { user, logout, isLoggedIn, isLoading } = useAuth()
  const router = useRouter()
  const [activeTab, setActiveTab] = useState<'overview' | 'courses' | 'downloads' | 'tutorials'>('overview')

  useEffect(() => {
    if (!isLoading && !isLoggedIn) {
      router.push('/login')
    } else if (!isLoading && user?.role === 'admin') {
      router.push('/admin/dashboard')
    }
  }, [isLoggedIn, isLoading, user, router])

  const handleLogout = () => {
    logout()
    router.push('/')
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-foreground/60">Cargando dashboard...</p>
        </div>
      </div>
    )
  }

  if (!isLoggedIn || user?.role === 'admin') {
    return null
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-accent/20 bg-background/95 backdrop-blur">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold text-foreground">IMPCORE Academy</h1>
              <div className="hidden md:flex items-center space-x-1">
                <Button
                  variant={activeTab === 'overview' ? 'default' : 'secondary'}
                  size="sm"
                  onClick={() => setActiveTab('overview')}
                >
                  <Home className="h-4 w-4 mr-2" />
                  Inicio
                </Button>
                <Button
                  variant={activeTab === 'courses' ? 'default' : 'secondary'}
                  size="sm"
                  onClick={() => setActiveTab('courses')}
                >
                  <BookOpen className="h-4 w-4 mr-2" />
                  Cursos
                </Button>
                <Button
                  variant={activeTab === 'downloads' ? 'default' : 'secondary'}
                  size="sm"
                  onClick={() => setActiveTab('downloads')}
                >
                  <Download className="h-4 w-4 mr-2" />
                  Descargas
                </Button>
                <Button
                  variant={activeTab === 'tutorials' ? 'default' : 'secondary'}
                  size="sm"
                  onClick={() => setActiveTab('tutorials')}
                >
                  <Video className="h-4 w-4 mr-2" />
                  Tutoriales
                </Button>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <User className="h-4 w-4 text-foreground/60" />
                <span className="text-sm text-foreground/80">{user?.username}</span>
              </div>
              <Button
                variant="secondary"
                size="sm"
                onClick={() => router.push('/')}
              >
                <Home className="h-4 w-4 mr-2" />
                Sitio Web
              </Button>
              <Button
                variant="secondary"
                size="sm"
                onClick={handleLogout}
              >
                <LogOut className="h-4 w-4 mr-2" />
                Salir
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Welcome Section */}
            <div className="bg-gradient-to-r from-accent/10 to-accent/5 rounded-lg p-8">
              <h2 className="text-3xl font-bold text-foreground mb-2">
                ¡Bienvenido, {user?.username}!
              </h2>
              <p className="text-foreground/70 mb-6">
                Accede a contenido exclusivo, cursos profesionales y recursos premium de IMPCORE Records.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-background/50 rounded-lg p-4 text-center">
                  <BookOpen className="h-8 w-8 text-accent mx-auto mb-2" />
                  <h3 className="font-semibold text-foreground">3 Cursos</h3>
                  <p className="text-sm text-foreground/60">Disponibles</p>
                </div>
                <div className="bg-background/50 rounded-lg p-4 text-center">
                  <Download className="h-8 w-8 text-accent mx-auto mb-2" />
                  <h3 className="font-semibold text-foreground">5 Descargas</h3>
                  <p className="text-sm text-foreground/60">Exclusivas</p>
                </div>
                <div className="bg-background/50 rounded-lg p-4 text-center">
                  <Video className="h-8 w-8 text-accent mx-auto mb-2" />
                  <h3 className="font-semibold text-foreground">12 Tutoriales</h3>
                  <p className="text-sm text-foreground/60">En video</p>
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-card border border-accent/20 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-foreground mb-4">Continuar Aprendiendo</h3>
                <div className="space-y-4">
                  {premiumContent.courses.filter(c => c.progress > 0).map(course => (
                    <div key={course.id} className="flex items-center space-x-4">
                      <div className="w-16 h-16 bg-accent/20 rounded-lg flex items-center justify-center">
                        <BookOpen className="h-6 w-6 text-accent" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-foreground">{course.title}</h4>
                        <div className="flex items-center space-x-2 mt-1">
                          <div className="flex-1 bg-accent/20 rounded-full h-2">
                            <div 
                              className="bg-accent h-2 rounded-full" 
                              style={{ width: `${course.progress}%` }}
                            />
                          </div>
                          <span className="text-xs text-foreground/60">{course.progress}%</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-card border border-accent/20 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-foreground mb-4">Novedades</h3>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-accent rounded-full mt-2" />
                    <div>
                      <p className="text-sm text-foreground">Nuevo curso disponible: &quot;DJ Set Construction&quot;</p>
                      <p className="text-xs text-foreground/60">Hace 2 días</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-accent/60 rounded-full mt-2" />
                    <div>
                      <p className="text-sm text-foreground">Demo Pack Vol.1 agregado a descargas</p>
                      <p className="text-xs text-foreground/60">Hace 1 semana</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-accent/40 rounded-full mt-2" />
                    <div>
                      <p className="text-sm text-foreground">3 nuevos tutoriales de síntesis</p>
                      <p className="text-xs text-foreground/60">Hace 2 semanas</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'courses' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-3xl font-bold text-foreground">Cursos Premium</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {premiumContent.courses.map((course) => (
                <div key={course.id} className="bg-card border border-accent/20 rounded-lg overflow-hidden">
                  <div className="aspect-video bg-accent/10 flex items-center justify-center">
                    <BookOpen className="h-12 w-12 text-accent" />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-medium text-accent bg-accent/10 px-2 py-1 rounded">
                        {course.level}
                      </span>
                      {course.progress > 0 && (
                        <span className="text-xs text-foreground/60">{course.progress}% completado</span>
                      )}
                    </div>
                    <h3 className="font-semibold text-foreground mb-2">{course.title}</h3>
                    <p className="text-sm text-foreground/60 mb-4">{course.description}</p>
                    <div className="flex items-center justify-between text-xs text-foreground/60 mb-4">
                      <span>{course.duration}</span>
                      <span>Instructor: {course.instructor}</span>
                    </div>
                    {course.progress > 0 && (
                      <div className="mb-4">
                        <div className="flex-1 bg-accent/20 rounded-full h-2">
                          <div 
                            className="bg-accent h-2 rounded-full" 
                            style={{ width: `${course.progress}%` }}
                          />
                        </div>
                      </div>
                    )}
                    <Button 
                      className="w-full" 
                      disabled={!course.available}
                    >
                      {course.available 
                        ? (course.progress > 0 ? 'Continuar' : 'Iniciar Curso')
                        : 'Próximamente'
                      }
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'downloads' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-3xl font-bold text-foreground">Descargas Exclusivas</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {premiumContent.exclusiveReleases.map((release) => (
                <div key={release.id} className="bg-card border border-accent/20 rounded-lg p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-accent/20 rounded-lg flex items-center justify-center">
                        <Music className="h-6 w-6 text-accent" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground">{release.title}</h3>
                        <p className="text-sm text-foreground/60">{release.artist}</p>
                      </div>
                    </div>
                    <span className="text-xs font-medium text-accent bg-accent/10 px-2 py-1 rounded">
                      {release.type}
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between text-sm text-foreground/60 mb-4">
                    <span>{release.tracks} tracks</span>
                    <span>{release.size}</span>
                  </div>
                  
                  <Button className="w-full">
                    <Download className="h-4 w-4 mr-2" />
                    Descargar
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'tutorials' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-3xl font-bold text-foreground">Video Tutoriales</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {premiumContent.tutorials.map((tutorial) => (
                <div key={tutorial.id} className="bg-card border border-accent/20 rounded-lg overflow-hidden">
                  <div className="aspect-video bg-accent/10 flex items-center justify-center relative">
                    <Video className="h-12 w-12 text-accent" />
                    {tutorial.viewed && (
                      <div className="absolute top-2 right-2 bg-green-500 text-white text-xs px-2 py-1 rounded">
                        ✓ Visto
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-foreground mb-2">{tutorial.title}</h3>
                    <div className="flex items-center justify-between text-sm text-foreground/60 mb-3">
                      <span className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        {tutorial.duration}
                      </span>
                    </div>
                    <Button className="w-full" size="sm">
                      {tutorial.viewed ? 'Ver de nuevo' : 'Ver tutorial'}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  )
}