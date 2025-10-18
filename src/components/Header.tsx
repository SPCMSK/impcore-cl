'use client';

import { useState, useEffect } from "react";
import { Menu, X } from 'lucide-react'
import { cn } from "@/lib/utils";
import { Button } from "./ui/Button";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from 'framer-motion';

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  
  const navigation = [
    { name: "Inicio", href: "/" },
    { name: "Lanzamientos", href: "/#releases" },
    { name: "Sobre IMPCORE", href: "/#about" },
    { name: "Residentes", href: "/#residents" },
    { name: "Eventos", href: "/#events" },
    { name: "FAQ", href: "/#faq" },
    { name: "Demos", href: "/#demos" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  // En home, mostrar Header en mobile (hamburger) y desktop (menú). En otras páginas, mostrar siempre
  const isHomePage = pathname === "/";

  return (
    <>
      <header
        className={cn(
          "fixed top-0 w-full z-50 transition-all duration-300",
          isScrolled 
            ? "bg-black/85 backdrop-blur-lg border-b border-white/10" 
            : "bg-black/60 backdrop-blur"
        )}
      >
        <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Mobile Menu Button - Always on mobile */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-white md:hidden"
              aria-label={isMobileMenuOpen ? "Cerrar menú" : "Abrir menú"}
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>

            {/* Desktop Navigation - Show on all pages on desktop */}
            <div className="hidden md:flex space-x-6 lg:space-x-10 text-white/80 text-sm sm:text-base font-medium tracking-wide">
              <Link href="/" className="hover:text-white transition-colors duration-300">INICIO</Link>
              <Link href="/#releases" className="hover:text-white transition-colors duration-300">LANZAMIENTOS</Link>
              {isHomePage && <a href="#about" className="hover:text-white transition-colors duration-300">SOBRE IMPCORE</a>}
              {isHomePage && <a href="#sessions" className="hover:text-white transition-colors duration-300">SESIONES</a>}
              <Link href="/#residents" className="hover:text-white transition-colors duration-300">RESIDENTES</Link>
              <Link href="/#events" className="hover:text-white transition-colors duration-300">EVENTOS</Link>
              <Link href="/#faq" className="hover:text-white transition-colors duration-300">FAQ</Link>
              {isHomePage && <a href="#demos" className="hover:text-white transition-colors duration-300">DEMOS</a>}
            </div>
          </div>
        </nav>
      </header>

      {/* Fullscreen Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/98 backdrop-blur-lg z-40"
          >
            <div className="flex flex-col items-start justify-center h-full px-8 pt-16">
              <motion.div
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.1 }}
                className="flex flex-col space-y-3 text-left"
              >
                {navigation.map((item, index) => (
                  <motion.div
                    key={item.name}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.3, delay: 0.1 + index * 0.05 }}
                  >
                    <Link
                      href={item.href}
                      className={cn(
                        "block text-2xl sm:text-3xl font-light tracking-tight transition-colors",
                        pathname === item.href 
                          ? "text-white" 
                          : "text-white/70 hover:text-white"
                      )}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  </motion.div>
                ))}
              </motion.div>

              {/* Social Links */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.5 }}
                className="mt-12 flex flex-col gap-2 text-left"
              >
                <a
                  href="https://instagram.com/impcore.cl"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/50 hover:text-white transition-colors text-sm"
                >
                  Instagram
                </a>
                <a
                  href="mailto:impcorecl@gmail.com"
                  className="text-white/50 hover:text-white transition-colors text-sm"
                >
                  Email
                </a>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

