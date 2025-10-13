'use client';

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X, User, LogIn } from 'lucide-react'
import { cn } from "@/lib/utils";
import { Button } from "./ui/Button";
import { usePathname } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { AuthModal } from './AuthModal'

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const pathname = usePathname();
  const isHomePage = pathname === '/';
  const { isLoggedIn, user, logout } = useAuth();
  
  const navigation = [
    { name: "Lanzamientos", href: "/releases" },
    { name: "Artistas", href: "/artists" },
    { name: "Eventos", href: "/events" },
    { name: "Demos", href: "#demos" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Hide header on homepage
  if (isHomePage) {
    return null;
  }

  return (
    <header
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-300",
        isScrolled 
          ? "bg-background/95 backdrop-blur-md border-b border-accent/10" 
          : "bg-transparent"
      )}
    >
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link 
            href="/" 
            className="flex items-center space-x-2 hover:opacity-80 transition-opacity"
          >
            <Image
              src="/images/logoimp2.png"
              alt="IMPCORE"
              width={32}
              height={32}
              className="h-8 w-auto"
            />
            <span className="text-2xl font-bold tracking-widest text-foreground">
              IMPCORE
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-foreground/80 hover:text-accent transition-colors text-sm font-medium tracking-wide"
              >
                {item.name}
              </Link>
            ))}
            
            {/* User Controls */}
            {isLoggedIn ? (
              <div className="flex items-center space-x-3 ml-4 pl-4 border-l border-accent/20">
                <div className="flex items-center space-x-2">
                  <User className="h-4 w-4 text-foreground/60" />
                  <span className="text-xs text-foreground/80">
                    {user?.username}
                  </span>
                  <span className="text-xs text-accent bg-accent/10 px-2 py-1 rounded">
                    {user?.role}
                  </span>
                </div>
                {user?.role === 'admin' && (
                  <Link
                    href="/admin/dashboard"
                    className="text-xs text-green-400 font-bold hover:text-green-300 transition-colors"
                  >
                    ● ADMIN PANEL
                  </Link>
                )}
                {user?.role === 'user' && (
                  <Link
                    href="/dashboard"
                    className="text-xs text-accent font-medium hover:text-accent/80 transition-colors"
                  >
                    ● MI DASHBOARD
                  </Link>
                )}
                <button
                  onClick={logout}
                  className="text-foreground/60 hover:text-red-400 transition-colors p-1 text-xs"
                >
                  Salir
                </button>
              </div>
            ) : (
              <div className="ml-4 pl-4 border-l border-accent/20">
                <button
                  onClick={() => setIsAuthModalOpen(true)}
                  className="flex items-center space-x-2 text-white hover:text-accent transition-colors text-sm font-medium bg-accent/10 hover:bg-accent/20 px-4 py-2 rounded-lg border border-accent/20"
                >
                  <LogIn className="h-4 w-4" />
                  <span>Acceder / Registrarte</span>
                </button>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-foreground"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-accent/10 bg-background/95 backdrop-blur-md">
            <div className="flex flex-col space-y-4">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-foreground/80 hover:text-accent transition-colors text-sm font-medium tracking-wide px-2 py-1"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              
              {/* Mobile User Controls */}
              <div className="border-t border-accent/20 pt-4 space-y-2">
                {isLoggedIn ? (
                  <>
                    <div className="px-2 py-1 text-xs text-foreground/60">
                      {user?.username} ({user?.role})
                    </div>
                    {user?.role === 'admin' && (
                      <Link
                        href="/admin/dashboard"
                        className="block text-green-400 text-sm font-medium px-2 py-1"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        Admin Panel
                      </Link>
                    )}
                    {user?.role === 'user' && (
                      <Link
                        href="/dashboard"
                        className="block text-accent text-sm font-medium px-2 py-1"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        Mi Dashboard
                      </Link>
                    )}
                    <button
                      onClick={() => {
                        logout()
                        setIsMobileMenuOpen(false)
                      }}
                      className="text-left text-red-400 text-sm px-2 py-1 w-full"
                    >
                      Cerrar Sesión
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => {
                      setIsAuthModalOpen(true)
                      setIsMobileMenuOpen(false)
                    }}
                    className="flex items-center space-x-2 text-white bg-accent/10 hover:bg-accent/20 px-4 py-3 rounded-lg text-sm font-medium w-full border border-accent/20"
                  >
                    <LogIn className="h-4 w-4" />
                    <span>Acceder / Registrarte</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </nav>
      
      {/* Auth Modal */}
      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)} 
      />
    </header>
  );
}
