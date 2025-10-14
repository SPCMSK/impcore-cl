'use client';

export function StructuredData() {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "MusicGroup",
    "name": "IMPCORE Records",
    "alternateName": ["IMPCORE", "IMPCORE CL"],
    "url": "https://impcore-cl.vercel.app",
    "logo": "https://impcore-cl.vercel.app/images/LOGOIMP.png",
    "description": "Sello discográfico independiente de Chile especializado en techno underground, hardgroove y música electrónica experimental",
    "genre": ["Techno", "Electronic Music", "Hard Techno", "Underground Techno"],
    "location": {
      "@type": "Place",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Valparaíso",
        "addressRegion": "Región de Valparaíso",
        "addressCountry": "CL"
      }
    },
    "sameAs": [
      "https://soundcloud.com/impcore-records",
      "https://www.beatport.com/label/impcore-records",
      "https://www.instagram.com/impcore_records"
    ]
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "IMPCORE Records",
    "url": "https://impcore-cl.vercel.app",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://impcore-cl.vercel.app/releases?search={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };

  const organizationBusiness = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "IMPCORE Records",
    "alternateName": ["IMPCORE", "IMPCORE CL"],
    "url": "https://impcore-cl.vercel.app",
    "logo": "https://impcore-cl.vercel.app/images/LOGOIMP.png",
    "description": "Sello discográfico independiente de Chile especializado en techno underground",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Valparaíso",
      "addressRegion": "Región de Valparaíso",
      "addressCountry": "Chile"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "Customer Service",
      "availableLanguage": ["Spanish", "English"]
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationBusiness) }}
      />
    </>
  );
}
