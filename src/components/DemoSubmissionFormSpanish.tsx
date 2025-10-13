'use client';

import { useState } from 'react';
import { Send, X, Music, User, Mail, List, Link as LinkIcon } from 'lucide-react';
import { Button } from './ui/Button';
import emailjs from '@emailjs/browser';
import toast, { Toaster } from 'react-hot-toast';

interface DemoFormData {
  artistName: string;
  email: string;
  trackTitle: string;
  genre: string;
  isPlaylist: boolean;
  soundcloudUrl: string;
  streamingUrl: string;
  description: string;
  additionalInfo: string;
}

interface DemoSubmissionFormProps {
  isOpen: boolean;
  onClose: () => void;
}

export function DemoSubmissionForm({ isOpen, onClose }: DemoSubmissionFormProps) {
  const [formData, setFormData] = useState<DemoFormData>({
    artistName: '',
    email: '',
    trackTitle: '',
    genre: '',
    isPlaylist: false,
    soundcloudUrl: '',
    streamingUrl: '',
    description: '',
    additionalInfo: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.artistName || !formData.email || !formData.trackTitle || !formData.genre || !formData.soundcloudUrl) {
      toast.error('Por favor completa todos los campos obligatorios');
      return;
    }

    // Verificar que las variables de entorno estén configuradas
    if (!process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || !process.env.NEXT_PUBLIC_EMAILJS_DEMO_TEMPLATE || !process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY) {
      toast.error('Error de configuración: Variables de entorno de EmailJS no encontradas');
      console.error('Variables de entorno faltantes:', {
        serviceId: process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
        template: process.env.NEXT_PUBLIC_EMAILJS_DEMO_TEMPLATE,
        publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
      });
      return;
    }

    setIsLoading(true);

    try {
      const templateParams = {
        artist_name: formData.artistName,
        artist_email: formData.email,
        track_title: formData.trackTitle,
        genre: formData.genre,
        if_playlist: formData.isPlaylist,
        soundcloud_url: formData.soundcloudUrl,
        streaming_url: formData.streamingUrl,
        description: formData.description,
        additional_info: formData.additionalInfo,
        submission_date: new Date().toLocaleDateString('es-ES', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        })
      };

      console.log('Enviando email con parámetros:', templateParams);

      const response = await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_DEMO_TEMPLATE!,
        templateParams,
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
      );

      console.log('Respuesta del email:', response);

      if (response.status === 200) {
        toast.success('¡Demo enviado exitosamente! Te contactaremos pronto.');
        setFormData({
          artistName: '',
          email: '',
          trackTitle: '',
          genre: '',
          isPlaylist: false,
          soundcloudUrl: '',
          streamingUrl: '',
          description: '',
          additionalInfo: ''
        });
        setTimeout(() => {
          onClose();
        }, 2000);
      }
    } catch (error) {
      console.error('Error al enviar demo:', error);
      toast.error('Error al enviar demo. Por favor inténtalo de nuevo.');
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 overflow-y-auto">
        <div className="min-h-screen px-4 text-center">
          <div className="inline-block align-middle min-h-screen" aria-hidden="true">&#8203;</div>
          
          <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-zinc-900 shadow-xl rounded-2xl">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-white flex items-center gap-2">
                <Music className="h-6 w-6 text-accent" />
                Envío de Demo
              </h3>
              <button
                onClick={onClose}
                className="text-white/60 hover:text-white transition-colors"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Nombre del Artista */}
              <div>
                <label className="block text-sm font-medium text-white/80 mb-2">
                  <User className="inline-block w-4 h-4 mr-2" />
                  Nombre del Artista *
                </label>
                <input
                  type="text"
                  name="artistName"
                  value={formData.artistName}
                  onChange={handleChange}
                  placeholder="Tu nombre artístico"
                  className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent"
                  required
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-white/80 mb-2">
                  <Mail className="inline-block w-4 h-4 mr-2" />
                  Email *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="tu@email.com"
                  className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent"
                  required
                />
              </div>

              {/* Título del Track */}
              <div>
                <label className="block text-sm font-medium text-white/80 mb-2">
                  <Music className="inline-block w-4 h-4 mr-2" />
                  Título del Track *
                </label>
                <input
                  type="text"
                  name="trackTitle"
                  value={formData.trackTitle}
                  onChange={handleChange}
                  placeholder="Nombre de tu track"
                  className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent"
                  required
                />
              </div>

              {/* Checkbox Playlist */}
              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  name="isPlaylist"
                  checked={formData.isPlaylist}
                  onChange={handleChange}
                  className="w-4 h-4 text-accent bg-zinc-800 border-zinc-700 rounded focus:ring-accent focus:ring-2"
                />
                <label className="text-sm font-medium text-white/80">
                  Es una playlist (múltiples tracks)
                </label>
              </div>

              {/* Género */}
              <div>
                <label className="block text-sm font-medium text-white/80 mb-2">
                  <List className="inline-block w-4 h-4 mr-2" />
                  Género *
                </label>
                <select
                  name="genre"
                  value={formData.genre}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg text-white focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent"
                  required
                >
                  <option value="">Selecciona un género...</option>
                  <option value="techno">Techno</option>
                  <option value="hardgroove">Hard Groove</option>
                  <option value="minimal">Minimal</option>
                  <option value="experimental">Experimental</option>
                  <option value="house">House</option>
                  <option value="other">Otro</option>
                </select>
              </div>

              {/* URL SoundCloud */}
              <div>
                <label className="block text-sm font-medium text-white/80 mb-2">
                  <LinkIcon className="inline-block w-4 h-4 mr-2" />
                  URL SoundCloud *
                </label>
                <input
                  type="url"
                  name="soundcloudUrl"
                  value={formData.soundcloudUrl}
                  onChange={handleChange}
                  placeholder="https://soundcloud.com/tu-track"
                  className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent"
                  required
                />
              </div>

              {/* URL Streaming Adicional */}
              <div>
                <label className="block text-sm font-medium text-white/80 mb-2">
                  <LinkIcon className="inline-block w-4 h-4 mr-2" />
                  URL Streaming Adicional
                </label>
                <input
                  type="url"
                  name="streamingUrl"
                  value={formData.streamingUrl}
                  onChange={handleChange}
                  placeholder="https://spotify.com/tu-track (opcional)"
                  className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent"
                />
              </div>

              {/* Descripción */}
              <div>
                <label className="block text-sm font-medium text-white/80 mb-2">
                  Descripción del Track
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Cuéntanos sobre tu track..."
                  rows={3}
                  className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent resize-none"
                />
              </div>

              {/* Información Adicional */}
              <div>
                <label className="block text-sm font-medium text-white/80 mb-2">
                  Información Adicional
                </label>
                <textarea
                  name="additionalInfo"
                  value={formData.additionalInfo}
                  onChange={handleChange}
                  placeholder="Cualquier información adicional..."
                  rows={2}
                  className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent resize-none"
                />
              </div>

              {/* Botón de Envío */}
              <div className="pt-4">
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-accent hover:bg-accent/90 text-white font-medium py-3 flex items-center justify-center gap-2"
                >
                  {isLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-2 border-white/30 border-t-white"></div>
                      Enviando...
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4" />
                      Enviar Demo
                    </>
                  )}
                </Button>
              </div>
            </form>

            <div className="mt-4 text-xs text-white/60 text-center">
              * Campos obligatorios
            </div>
          </div>
        </div>
      </div>
      <Toaster 
        position="top-center"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#18181b',
            color: '#fff',
            border: '1px solid #3f3f46'
          }
        }}
      />
    </>
  );
}