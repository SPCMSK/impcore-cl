'use client';

import Image from "next/image";
import { motion } from "framer-motion";

export default function EventsPage() {
  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="relative py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center space-y-8"
          >
            <h1 className="text-4xl md:text-6xl font-bold tracking-wide text-foreground">
              Events
            </h1>
            <p className="text-xl text-foreground/60 max-w-2xl mx-auto">
              Únete a nosotros en nuestros eventos exclusivos y showcases de música electrónica underground.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-foreground">
              Próximos Eventos
            </h2>
            
            <div className="relative">
              <Image
                src="/images/info.jpg"
                alt="Próximos eventos IMPCORE - Pronto más info"
                width={800}
                height={600}
                className="w-full h-auto rounded-lg"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent rounded-lg" />
              <div className="absolute bottom-6 left-6 text-white">
                <h3 className="text-2xl font-bold mb-2">Próximamente</h3>
                <p className="text-white/80">Mantente atento para más información sobre nuestros próximos showcases.</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Past Events Gallery */}
      <section className="py-20 bg-card/20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Eventos Pasados
            </h2>
            <p className="text-foreground/60">
              Revive los momentos más destacados de nuestros eventos anteriores.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="relative group cursor-pointer"
            >
              <Image
                src="/images/eventos.png"
                alt="Evento IMPCORE - Experiencia inmersiva"
                width={600}
                height={400}
                className="w-full h-64 object-cover rounded-lg group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg flex items-center justify-center">
                <span className="text-white font-semibold text-lg">Ver Galería</span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="relative group cursor-pointer"
            >
              <Image
                src="/images/background.jpg"
                alt="Showcase IMPCORE - Atmosphere underground"
                width={600}
                height={400}
                className="w-full h-64 object-cover rounded-lg group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg flex items-center justify-center">
                <span className="text-white font-semibold text-lg">Ver Galería</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto text-center space-y-6"
          >
            <h2 className="text-3xl font-bold text-foreground">
              No te pierdas ningún evento
            </h2>
            <p className="text-foreground/60">
              Suscríbete a nuestro newsletter para recibir información exclusiva sobre próximos eventos y lanzamientos.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Tu email"
                className="flex-1 px-4 py-3 bg-card border border-accent/20 rounded-lg text-foreground placeholder:text-foreground/40 focus:outline-none focus:border-accent"
              />
              <button className="px-6 py-3 bg-accent text-black font-medium rounded-lg hover:bg-accent/90 transition-colors">
                Suscribirse
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
