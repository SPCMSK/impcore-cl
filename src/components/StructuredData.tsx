export function StructuredData() {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "MusicGroup",
    "name": "IMPCORE Records",
    "alternateName": ["IMPCORE", "IMPCORE CL", "impcore.cl"],
    "url": "https://www.impcore.cl",
    "logo": "https://www.impcore.cl/images/LOGOIMP.png",
    "description": "Sello discográfico independiente de Valparaíso, Chile especializado en techno underground, hardgroove, raw techno y música electrónica experimental. Artistas: SPCMSK, CINDER, NASAC.",
    "genre": ["Techno", "Electronic Music", "Hard Techno", "Underground Techno", "Hardgroove", "Raw Techno", "Peak Time Techno"],
    "location": {
      "@type": "Place",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Valparaíso",
        "addressRegion": "Región de Valparaíso",
        "addressCountry": "CL"
      }
    },
    "foundingDate": "2024",
    "sameAs": [
      "https://soundcloud.com/impcore-records",
      "https://www.beatport.com/label/impcore-records",
      "https://www.instagram.com/impcore_records",
      "https://open.spotify.com/label/impcore-records",
      "https://www.youtube.com/@impcore_records"
    ]
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "IMPCORE Records",
    "url": "https://www.impcore.cl",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://www.impcore.cl/releases?search={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };

  const organizationBusiness = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "IMPCORE Records",
    "alternateName": ["IMPCORE", "IMPCORE CL", "impcore.cl"],
    "url": "https://www.impcore.cl",
    "logo": "https://www.impcore.cl/images/LOGOIMP.png",
    "description": "Sello discográfico independiente de Valparaíso, Chile especializado en techno underground, hardgroove y raw techno",
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
    },
    "foundingDate": "2024"
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
