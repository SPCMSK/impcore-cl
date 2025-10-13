import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Suspense } from "react";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ClientProviders } from "@/components/ClientProviders";
import { GoogleAnalytics } from "@/components/GoogleAnalytics";
import { Toaster } from 'react-hot-toast';

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: {
    default: "IMPCORE Records - Sello de Música Electrónica Underground",
    template: "%s | IMPCORE Records"
  },
  description: "IMPCORE Records - Sello discográfico independiente de Chile especializado en techno underground, hardgroove y música electrónica experimental. Con artistas residentes SPCMSK, CINDER y NASAC.",
  keywords: [
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
    "beatport",
    "spotify electronic",
    "soundcloud techno",
    "raw techno",
    "peak time techno",
    "hard techno",
    "electrónica experimental"
  ],
  authors: [{ name: "IMPCORE Records" }],
  creator: "IMPCORE Records",
  publisher: "IMPCORE Records",
  category: "Music",
  openGraph: {
    type: "website",
    locale: "es_CL",
    url: "https://impcore-cl.vercel.app",
    siteName: "IMPCORE Records",
    title: "IMPCORE Records - Sello de Música Electrónica Underground",
    description: "Sello discográfico independiente de Chile especializado en techno underground, hardgroove y música electrónica experimental.",
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
    title: "IMPCORE Records - Sello de Música Electrónica Underground",
    description: "Sello discográfico independiente de Chile especializado en techno underground, hardgroove y música electrónica experimental.",
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
  verification: {
    google: "your-google-verification-code", // Reemplazar con código real
  },
  alternates: {
    canonical: "https://impcore-cl.vercel.app",
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
