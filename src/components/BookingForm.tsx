'use client';

import { useState } from 'react';
import { Send, X, Users, User, Mail, Calendar, MapPin, MessageSquare } from 'lucide-react';
import { Button } from './ui/Button';
import emailjs from '@emailjs/browser';
import toast, { Toaster } from 'react-hot-toast';
import { emailjsConfig, isEmailJsConfigured } from '@/lib/emailjs-config';

interface BookingFormData {
  name: string;
  email: string;
  eventName: string;
  eventDate: string;
  eventLocation: string;
  artistsInterest: string;
  message: string;
}

interface BookingFormProps {
  isOpen: boolean;
  onClose: () => void;
}

export function BookingForm({ isOpen, onClose }: BookingFormProps) {
  const [formData, setFormData] = useState<BookingFormData>({
    name: '',
    email: '',
    eventName: '',
    eventDate: '',
    eventLocation: '',
    artistsInterest: '',
    message: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.eventName || !formData.eventDate || !formData.eventLocation) {
      toast.error('Por favor completa todos los campos obligatorios');
      return;
    }

    // Validar formato de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error('Por favor ingresa un email válido');
      return;
    }

    // Verificar variables de entorno
    if (!isEmailJsConfigured()) {
      toast.error('Error de configuración: Variables de entorno de EmailJS no encontradas');
      return;
    }

    setIsLoading(true);

    try {
      const templateParams = {
        contact_type: 'Contratación',
        from_name: formData.name,
        from_email: formData.email,
        subject: `Solicitud de Contratación - ${formData.eventName}`,
        event_name: formData.eventName,
        event_date: formData.eventDate,
        event_location: formData.eventLocation,
        artists_interest: formData.artistsInterest || 'No especificado',
        message: formData.message || 'Sin mensaje adicional',
        submission_date: new Date().toLocaleDateString('es-ES', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        })
      };

      console.log('Enviando solicitud de booking con parámetros:', templateParams);

      const response = await emailjs.send(
        emailjsConfig.serviceId,
        emailjsConfig.contactTemplate,
        templateParams,
        emailjsConfig.publicKey
      );

      console.log('Respuesta del email:', response);

      if (response.status === 200) {
        toast.success('¡Solicitud enviada exitosamente! Te contactaremos pronto.');
        setFormData({
          name: '',
          email: '',
          eventName: '',
          eventDate: '',
          eventLocation: '',
          artistsInterest: '',
          message: ''
        });
        setTimeout(() => {
          onClose();
        }, 2000);
      }
    } catch (error) {
      console.error('Error al enviar solicitud:', error);
      toast.error('Error al enviar solicitud. Por favor inténtalo de nuevo.');
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
                <Users className="h-6 w-6 text-accent" />
                Contratar Artistas
              </h3>
              <button
                onClick={onClose}
                className="text-white/60 hover:text-white transition-colors"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Nombre */}
              <div>
                <label className="block text-sm font-medium text-white/80 mb-2">
                  <User className="inline-block w-4 h-4 mr-2" />
                  Nombre *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Tu nombre o empresa"
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

              {/* Nombre del Evento */}
              <div>
                <label className="block text-sm font-medium text-white/80 mb-2">
                  <Users className="inline-block w-4 h-4 mr-2" />
                  Nombre del Evento *
                </label>
                <input
                  type="text"
                  name="eventName"
                  value={formData.eventName}
                  onChange={handleChange}
                  placeholder="Nombre del evento o fiesta"
                  className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent"
                  required
                />
              </div>

              {/* Fecha del Evento */}
              <div>
                <label className="block text-sm font-medium text-white/80 mb-2">
                  <Calendar className="inline-block w-4 h-4 mr-2" />
                  Fecha del Evento *
                </label>
                <input
                  type="date"
                  name="eventDate"
                  value={formData.eventDate}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg text-white focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent"
                  required
                />
              </div>

              {/* Ubicación */}
              <div>
                <label className="block text-sm font-medium text-white/80 mb-2">
                  <MapPin className="inline-block w-4 h-4 mr-2" />
                  Ubicación *
                </label>
                <input
                  type="text"
                  name="eventLocation"
                  value={formData.eventLocation}
                  onChange={handleChange}
                  placeholder="Ciudad, País o Nombre del Venue"
                  className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent"
                  required
                />
              </div>

              {/* Artistas de Interés */}
              <div>
                <label className="block text-sm font-medium text-white/80 mb-2">
                  <Users className="inline-block w-4 h-4 mr-2" />
                  Artista(s) de Interés (Opcional)
                </label>
                <input
                  type="text"
                  name="artistsInterest"
                  value={formData.artistsInterest}
                  onChange={handleChange}
                  placeholder="Ej: SPCMSK, CINDER, NASAC"
                  className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent"
                />
              </div>

              {/* Mensaje */}
              <div>
                <label className="block text-sm font-medium text-white/80 mb-2">
                  <MessageSquare className="inline-block w-4 h-4 mr-2" />
                  Mensaje (Opcional)
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Detalles adicionales sobre el evento, presupuesto, duración del set..."
                  rows={4}
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
                      Enviar Solicitud
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
