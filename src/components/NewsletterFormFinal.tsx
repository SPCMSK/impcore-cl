'use client';

import { useState } from 'react';
import { Button } from './ui/Button';
import emailjs from '@emailjs/browser';
import toast, { Toaster } from 'react-hot-toast';

interface NewsletterFormProps {
  className?: string;
}

export function NewsletterForm({ className = '' }: NewsletterFormProps) {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email.trim()) {
      toast.error('Por favor ingresa tu email');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      toast.error('Por favor ingresa un email válido');
      return;
    }

    // Verificar que las variables de entorno estén configuradas
    if (!process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || !process.env.NEXT_PUBLIC_EMAILJS_CONTACT_TEMPLATE || !process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY) {
      toast.error('Error de configuración: Variables de entorno de EmailJS no encontradas');
      console.error('Variables de entorno faltantes:', {
        serviceId: process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
        template: process.env.NEXT_PUBLIC_EMAILJS_CONTACT_TEMPLATE,
        publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
      });
      setIsLoading(false);
      return;
    }

    setIsLoading(true);

    try {
      // Parámetros compatibles con la plantilla EmailJS
      const templateParams = {
        contact_type: 'Newsletter',
        from_email: email.trim(),
        subject: 'Nueva Suscripción Newsletter',
        message: 'Nueva suscripción al newsletter',
        submission_date: new Date().toLocaleDateString('es-ES', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        })
      };

      const result = await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_CONTACT_TEMPLATE!,
        templateParams,
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
      );
      
      if (result.status === 200) {
        toast.success('🎵 ¡Suscrito exitosamente!');
        setEmail('');
      } else {
        throw new Error('EmailJS response not OK');
      }
      
    } catch {
      toast.error('Error al suscribirse. Verifica tu configuración de EmailJS.');
    }
    
    setIsLoading(false);
  };

  return (
    <div className={`space-y-4 ${className}`}>
      <Toaster position="top-right" />
      <div>
        <h3 className="text-lg font-semibold text-foreground mb-2">
          Newsletter
        </h3>
        <p className="text-sm text-muted-foreground mb-4">
          Mantente al día con nuestros últimos lanzamientos y eventos
        </p>
      </div>
      
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="tu@email.com"
          className="flex-1 px-3 py-2 bg-background border border-accent/20 rounded-md text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
          disabled={isLoading}
          required
        />
        <Button
          type="submit"
          size="sm"
          disabled={isLoading || !email.trim()}
          className="bg-accent hover:bg-accent/90 text-accent-foreground px-4"
        >
          {isLoading ? (
            <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
          ) : (
            'Suscribirse'
          )}
        </Button>
      </form>
    </div>
  );
}