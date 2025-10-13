'use client';

import Script from 'next/script';
import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_ID;

declare global {
  interface Window {
    gtag: (command: string, targetId: string, config?: Record<string, unknown>) => void;
  }
}

export function GoogleAnalytics() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!GA_MEASUREMENT_ID) return;
    
    const url = pathname + searchParams.toString();
    
    window.gtag('config', GA_MEASUREMENT_ID, {
      page_path: url,
    });
  }, [pathname, searchParams]);

  if (!GA_MEASUREMENT_ID) {
    return null;
  }

  return (
    <>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}', {
              page_path: window.location.pathname,
            });
          `,
        }}
      />
    </>
  );
}

// Función para tracking de eventos personalizados
export const trackEvent = (action: string, category: string, label?: string, value?: number) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
};

// Eventos específicos para la página de música
export const musicEvents = {
  playTrack: (trackName: string, artist: string) => {
    trackEvent('play_track', 'Music Player', `${artist} - ${trackName}`);
  },
  pauseTrack: (trackName: string, artist: string) => {
    trackEvent('pause_track', 'Music Player', `${artist} - ${trackName}`);
  },
  clickStreamingLink: (platform: string, releaseName: string) => {
    trackEvent('click_streaming_link', 'External Links', `${platform} - ${releaseName}`);
  },
  clickPurchaseLink: (platform: string, releaseName: string) => {
    trackEvent('click_purchase_link', 'Purchase', `${platform} - ${releaseName}`);
  },
  viewReleaseDetails: (releaseName: string) => {
    trackEvent('view_release_details', 'Release', releaseName);
  },
  viewArtistProfile: (artistName: string) => {
    trackEvent('view_artist_profile', 'Artist', artistName);
  },
  submitDemo: () => {
    trackEvent('submit_demo', 'Demo Submission', 'Form Submit');
  },
  subscribeNewsletter: () => {
    trackEvent('subscribe_newsletter', 'Newsletter', 'Subscription');
  }
};