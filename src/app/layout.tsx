import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ClientProviders } from "@/components/ClientProviders";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "IMPCORE Records - Electronic Music Label",
  description: "An independent electronic music label focused on pushing boundaries and discovering new sounds in the underground scene.",
  keywords: ["electronic music", "record label", "underground", "techno", "house", "experimental"],
  authors: [{ name: "IMPCORE Records" }],
  creator: "IMPCORE Records",
  publisher: "IMPCORE Records",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://impcore.com",
    siteName: "IMPCORE Records",
    title: "IMPCORE Records - Electronic Music Label",
    description: "An independent electronic music label focused on pushing boundaries and discovering new sounds in the underground scene.",
  },
  twitter: {
    card: "summary_large_image",
    title: "IMPCORE Records - Electronic Music Label",
    description: "An independent electronic music label focused on pushing boundaries and discovering new sounds in the underground scene.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="antialiased min-h-screen bg-background text-foreground">
        <ClientProviders>
          <Header />
          <main>
            {children}
          </main>
          <Footer />
        </ClientProviders>
      </body>
    </html>
  );
}
