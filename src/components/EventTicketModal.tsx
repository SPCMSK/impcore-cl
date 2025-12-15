'use client';

import { useState } from 'react';
import { X, Users, Clock, ShoppingCart } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface TicketType {
  name: string;
  price: string;
  description: string;
  icon: React.ReactNode;
}

interface EventTicketModalProps {
  isOpen: boolean;
  onClose: () => void;
  eventTitle: string;
  eventDescription: string;
}

const tickets: TicketType[] = [
  {
    name: 'PREVENTA 1',
    price: '$5.000',
    description: 'Acceso hasta 00:00',
    icon: <Clock className="w-5 h-5" />
  },
  {
    name: 'PROMO 2X',
    price: '$8.000', 
    description: 'Acceso para 2 personas hasta 00:00',
    icon: <Users className="w-5 h-5" />
  },
  {
    name: 'PROMO 4X (Grupo)',
    price: '$15.000',
    description: 'Acceso para 4 personas hasta 00:00',
    icon: <Users className="w-5 h-5" />
  },
  {
    name: 'PROMO 4X + BOT',
    price: '$25.000',
    description: 'Acceso para 4 personas hasta 01:00. Incluye 4 aguas + guardarropía',
    icon: <ShoppingCart className="w-5 h-5" />
  }
];

export function EventTicketModal({ isOpen, onClose, eventTitle, eventDescription }: EventTicketModalProps) {
  const whatsappNumber = '+56 9 5328 2138';
  
  const handleTicketPurchase = (ticketName: string, price: string) => {
    const message = encodeURIComponent(
      `¡Hola! Estoy interesado/a en comprar la entrada "${ticketName}" (${price}) para el evento ${eventTitle}. ¿Podrían enviarme los datos para la transferencia?`
    );
    const whatsappUrl = `https://wa.me/${whatsappNumber.replace(/\s+/g, '')}?text=${message}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          />
          
          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative bg-zinc-900 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden"
          >
            {/* Header */}
            <div className="relative p-6 pb-4 border-b border-zinc-700">
              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-2 text-white/60 hover:text-white hover:bg-white/10 rounded-full transition-all duration-200"
              >
                <X className="w-5 h-5" />
              </button>
              
              <h3 className="text-2xl font-bold text-white mb-2">{eventTitle}</h3>
              <div className="flex items-center gap-2 text-accent text-sm font-semibold">
                <Clock className="w-4 h-4" />
                VIERNES 2 DE ENERO
              </div>
              <div className="text-white/60 text-sm mt-1">
                Espacio Underground, Errázuriz 1024, Valparaíso
              </div>
            </div>

            {/* Content */}
            <div className="p-6 max-h-[60vh] overflow-y-auto">
              {/* Event Description */}
              <div className="mb-6">
                <h4 className="text-lg font-semibold text-white mb-3">Descripción del Evento</h4>
                <div className="text-white/80 text-sm leading-relaxed whitespace-pre-line">
                  {eventDescription}
                </div>
              </div>

              {/* Tickets Section */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <h4 className="text-lg font-semibold text-white">Entradas Disponibles</h4>
                  <span className="bg-red-600 text-white text-xs px-2 py-1 rounded-full font-semibold">
                    STOCK LIMITADO
                  </span>
                </div>
                
                <p className="text-white/60 text-sm mb-4">
                  Venta por transferencia bancaria. Haz clic en "Comprar" para contactarnos por WhatsApp.
                </p>

                <div className="grid gap-3">
                  {tickets.map((ticket, index) => (
                    <motion.div
                      key={ticket.name}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-zinc-800 rounded-lg p-4 border border-zinc-700 hover:border-accent/50 transition-all duration-200"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            {ticket.icon}
                            <h5 className="font-semibold text-white">{ticket.name}</h5>
                          </div>
                          <p className="text-white/70 text-sm">{ticket.description}</p>
                        </div>
                        
                        <div className="flex items-center gap-3">
                          <div className="text-right">
                            <div className="text-xl font-bold text-accent">{ticket.price}</div>
                            <div className="text-xs text-white/60">Primera tanda</div>
                          </div>
                          
                          <button
                            onClick={() => handleTicketPurchase(ticket.name, ticket.price)}
                            className="border border-accent bg-transparent hover:bg-accent text-accent hover:text-white px-4 py-2 rounded-md font-medium transition-all duration-200 whitespace-nowrap transform hover:scale-105 active:scale-95"
                          >
                            Comprar
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}