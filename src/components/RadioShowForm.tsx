'use client';

import { useState } from 'react';
import { Send, X, Radio, User, Mail, Link as LinkIcon, MessageSquare } from 'lucide-react';
import { Button } from './ui/Button';
import emailjs from '@emailjs/browser';
import toast, { Toaster } from 'react-hot-toast';

interface RadioShowFormData {
  name: string;
  email: string;
  projectName: string;
  setUrl: string;
  message: string;
}

interface RadioShowFormProps {
  isOpen: boolean;
  onClose: () => void;
}

export function RadioShowForm({ isOpen, onClose }: RadioShowFormProps) {
  const [formData, setFormData] = useState<RadioShowFormData>({
    name: '',
    email: '',
    projectName: '',
    setUrl: '',
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
    
    if (!formData.name || !formData.email || !formData.projectName || !formData.setUrl) {
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
    if (!process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || 
        !process.env.NEXT_PUBLIC_EMAILJS_CONTACT_TEMPLATE || 
        !process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY) {
      toast.error('Error de configuración: Variables de entorno de EmailJS no encontradas');
      console.error('Variables de entorno faltantes para Radio Show');
      return;
    }

    setIsLoading(true);

    try {
      const templateParams = {
        contact_type: 'Shows de Radio',
        from_name: formData.name,
        from_email: formData.email,
        subject: `Aplicación Shows de Radio - ${formData.projectName}`,
        project_name: formData.projectName,
        set_url: formData.setUrl,
        message: formData.message || 'Sin mensaje adicional',
        submission_date: new Date().toLocaleDateString('es-ES', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        })
      };

      console.log('Enviando aplicación de radio con parámetros:', templateParams);

      const response = await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_CONTACT_TEMPLATE!,
        templateParams,
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
      );

      console.log('Respuesta del email:', response);

      if (response.status === 200) {
        toast.success('¡Aplicación enviada exitosamente! Te contactaremos pronto.');
        setFormData({
          name: '',
          email: '',
          projectName: '',
          setUrl: '',
          message: ''
        });
        setTimeout(() => {
          onClose();
        }, 2000);
      }
    } catch (error) {
      console.error('Error al enviar aplicación:', error);
      toast.error('Error al enviar aplicación. Por favor inténtalo de nuevo.');
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
                <Radio className="h-6 w-6 text-accent" />
                Aplicar para Show de Radio
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
                  placeholder="Tu nombre"
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

              {/* Nombre del Proyecto */}
              <div>
                <label className="block text-sm font-medium text-white/80 mb-2">
                  <Radio className="inline-block w-4 h-4 mr-2" />
                  Nombre del Proyecto *
                </label>
                <input
                  type="text"
                  name="projectName"
                  value={formData.projectName}
                  onChange={handleChange}
                  placeholder="Nombre de tu proyecto o alias"
                  className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent"
                  required
                />
              </div>

              {/* URL del Set */}
              <div>
                <label className="block text-sm font-medium text-white/80 mb-2">
                  <LinkIcon className="inline-block w-4 h-4 mr-2" />
                  Link del Set *
                </label>
                <input
                  type="url"
                  name="setUrl"
                  value={formData.setUrl}
                  onChange={handleChange}
                  placeholder="https://soundcloud.com/tu-set o https://mixcloud.com/tu-set"
                  className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent"
                  required
                />
                <p className="text-xs text-white/50 mt-1">
                  Sube tu set a SoundCloud, Mixcloud o YouTube
                </p>
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
                  placeholder="Cuéntanos sobre tu proyecto, estilo musical, experiencia..."
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
                      Enviar Aplicación
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
