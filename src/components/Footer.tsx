'use client';

import Link from "next/link";
import { Instagram, Music, ExternalLink } from "lucide-react";
import { NewsletterForm } from "./NewsletterFormFinal";

const socialLinks = [
  {
    name: "Instagram",
    href: "https://instagram.com/impcore",
    icon: Instagram,
  },
  {
    name: "Bandcamp",
    href: "https://impcore.bandcamp.com",
    icon: Music,
  },
  {
    name: "SoundCloud",
    href: "https://soundcloud.com/impcore",
    icon: ExternalLink,
  },
];

export function Footer() {
  // Show footer on all pages including homepage
  return (
    <footer className="bg-card border-t border-accent/10 mt-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <Link 
              href="/" 
              className="text-2xl font-bold tracking-widest text-foreground hover:text-accent transition-colors"
            >
              IMPCORE
            </Link>
            <p className="text-foreground/60 text-sm leading-relaxed max-w-sm">
              Un sello discográfico independiente enfocado en romper límites 
              y descubrir nuevos sonidos en la escena underground.
            </p>
          </div>

          {/* Newsletter Subscription */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold tracking-wide text-foreground">
              Mantente Actualizado
            </h3>
            <p className="text-foreground/60 text-sm">
              Suscríbete a nuestro newsletter para los últimos lanzamientos y noticias.
            </p>
            <NewsletterForm />
          </div>

          {/* Social Links & Navigation */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold tracking-wide text-foreground">
              Conectar
            </h3>
            <div className="flex gap-4">
              {socialLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-foreground/60 hover:text-accent transition-colors"
                >
                  <link.icon className="h-5 w-5" />
                  <span className="sr-only">{link.name}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-accent/10 mt-8 pt-8 text-center">
          <p className="text-foreground/40 text-sm">
            © {new Date().getFullYear()} IMPCORE Records. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
