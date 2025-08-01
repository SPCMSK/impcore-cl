'use client';

import Link from "next/link";
import { Instagram, Music, Mail, ExternalLink } from "lucide-react";
import { Button } from "./ui/Button";
import { usePathname } from "next/navigation";

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

const footerLinks = [
  { name: "Privacy Policy", href: "/privacy" },
  { name: "Terms of Service", href: "/terms" },
  { name: "Contact", href: "/contact" },
];

export function Footer() {
  const pathname = usePathname();
  const isHomePage = pathname === '/';

  // Hide footer on homepage
  if (isHomePage) {
    return null;
  }
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
              An independent electronic music label focused on pushing boundaries 
              and discovering new sounds in the underground scene.
            </p>
          </div>

          {/* Newsletter Subscription */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold tracking-wide text-foreground">
              Stay Updated
            </h3>
            <p className="text-foreground/60 text-sm">
              Subscribe to our newsletter for the latest releases and news.
            </p>
            <div className="flex gap-2 max-w-sm">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-3 py-2 bg-background border border-accent/20 rounded-md text-sm text-foreground placeholder:text-foreground/40 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
              />
              <Button size="sm" className="px-4">
                <Mail className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Social Links & Navigation */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold tracking-wide text-foreground">
              Connect
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
            <div className="flex flex-wrap gap-4 pt-4">
              {footerLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-sm text-foreground/60 hover:text-accent transition-colors"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-accent/10 mt-8 pt-8 text-center">
          <p className="text-foreground/40 text-sm">
            © {new Date().getFullYear()} IMPCORE Records. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
