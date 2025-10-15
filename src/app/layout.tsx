import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Suspense } from "react";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ClientProviders } from "@/components/ClientProviders";
import { GoogleAnalytics } from "@/components/GoogleAnalytics";
import { StructuredData } from "@/components/StructuredData";
import { Toaster } from 'react-hot-toast';

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  metadataBase: new URL('https://www.impcore.cl'),
  title: {
    default: "IMPCORE RECORDS | Sello Techno Underground Chile",
    template: "%s | IMPCORE RECORDS"
  },
  description: "IMPCORE Records - Sello discográfico independiente de Valparaíso, Chile especializado en techno underground, hardgroove y raw techno. Descubre nuestros artistas residentes SPCMSK, CINDER y NASAC. Escucha en Beatport, Spotify y SoundCloud.",
  applicationName: "IMPCORE Records",
  verification: {
    google: "ba9737b318456caf",
  },
  icons: {
    icon: [
      { url: '/icon.png', sizes: '32x32', type: 'image/png' },
      { url: '/icon.png', sizes: '64x64', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  keywords: [
    "IMPCORE",
    "IMPCORE RECORDS",
    "IMPCORE CL",
    "impcore.cl",
    "impcore chile",
    "impcore valparaiso",
    "Labels Chilenos",
    "sello discografico chile",
    "musica electronica chilena",
    "tecno valparaiso",
    "techno valparaiso",
    "techno quinta region",
    "techno viña del mar",
    "música electrónica", 
    "sello discográfico", 
    "techno underground", 
    "hardgroove", 
    "techno chile", 
    "música electrónica chile",
    "música underground",
    "sello techno",
    "sello techno chile",
    "SPCMSK",
    "CINDER", 
    "NASAC",
    "beatport chile",
    "spotify electronic chile",
    "soundcloud techno chile",
    "raw techno",
    "peak time techno",
    "hard techno",
    "electrónica experimental",
    "DJ chile",
    "productor techno chile"
  ],
  authors: [{ name: "IMPCORE Records" }],
  creator: "IMPCORE Records",
  publisher: "IMPCORE Records",
  category: "Music",
  openGraph: {
    type: "website",
    locale: "es_CL",
    url: "https://www.impcore.cl",
    siteName: "IMPCORE RECORDS",
    title: "IMPCORE RECORDS | Sello Techno Underground Chile",
    description: "Sello discográfico independiente de Valparaíso, Chile especializado en techno underground, hardgroove y raw techno. Descubre nuestros artistas residentes SPCMSK, CINDER y NASAC.",
    images: [
      {
        url: "/images/LOGOIMP.png",
        width: 1200,
        height: 630,
        alt: "IMPCORE Records Logo",
      }
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@impcore_records",
    creator: "@impcore_records",
    title: "IMPCORE RECORDS | Sello Techno Underground Chile",
    description: "Sello discográfico independiente de Valparaíso, Chile especializado en techno underground, hardgroove y raw techno.",
    images: ["/images/LOGOIMP.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://www.impcore.cl",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={inter.variable}>
      <head>
        <Suspense fallback={null}>
          <GoogleAnalytics />
        </Suspense>
        <StructuredData />
      </head>
      <body className="antialiased min-h-screen bg-background text-foreground">
        <ClientProviders>
          <Header />
          <main>
            {children}
          </main>
          <Footer />
        </ClientProviders>
        <Toaster 
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#1A1A1A',
              color: '#F5F5F5',
              border: '1px solid rgba(255, 255, 255, 0.1)',
            },
            success: {
              iconTheme: {
                primary: '#0066FF',
                secondary: '#F5F5F5',
              },
            },
            error: {
              iconTheme: {
                primary: '#FF3366',
                secondary: '#F5F5F5',
              },
            },
          }}
        />
      </body>
    </html>
  );
}
