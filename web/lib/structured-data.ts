import { absoluteUrl, siteConfig, siteUrl } from "@/lib/site";

export type JsonLdNode = Record<string, unknown>;

export type FaqItem = {
  pregunta: string;
  respuesta: string;
};

export type StructuredProduct = {
  slug: string;
  name: string;
  description: string;
  image: string;
  presentations: string[];
};

export const organizationId = `${siteUrl}/#organization`;
export const websiteId = `${siteUrl}/#website`;
export const andreaPellizaId = `${siteUrl}/#andrea-pelliza`;
export const enriquePellizaId = `${siteUrl}/#enrique-pelliza`;
export const everestBrandId = `${siteUrl}/#brand-everest`;

const contactLanguages = ["es", "en"];

/**
 * Shared business entity. Values mirror the client-confirmed business data
 * (change request v1-10-26); keep them in sync with `siteConfig.contact`.
 */
export function organizationNode(description?: string): JsonLdNode {
  const { contact, social } = siteConfig;
  const [salesEmail, comexEmail] = contact.emails;

  return {
    "@type": ["Organization", "LocalBusiness"],
    "@id": organizationId,
    name: "Séance",
    legalName: "SEANCE SRL",
    alternateName: siteConfig.name,
    url: siteUrl,
    logo: `${siteUrl}/images/logo-seance-v2.png`,
    image: `${siteUrl}/images/og-image.jpg`,
    ...(description ? { description } : {}),
    foundingDate: "1990",
    // Inline name so the reference resolves on pages without the Person node.
    founder: { "@type": "Person", "@id": enriquePellizaId, name: "Enrique Pelliza" },
    email: salesEmail,
    telephone: contact.phone,
    address: {
      "@type": "PostalAddress",
      streetAddress: "Directorio 3548",
      addressLocality: "Caseros",
      addressRegion: "Buenos Aires",
      postalCode: "1678",
      addressCountry: "AR",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: siteConfig.maps.lat,
      longitude: siteConfig.maps.lng,
    },
    hasMap: siteConfig.maps.placeUrl,
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "08:00",
      closes: "17:00",
    },
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "sales",
        telephone: contact.phone,
        email: salesEmail,
        availableLanguage: contactLanguages,
      },
      {
        "@type": "ContactPoint",
        contactType: "comercio exterior",
        email: comexEmail,
        availableLanguage: contactLanguages,
      },
    ],
    sameAs: [social.facebook, social.linkedin],
    knowsAbout: [
      "Registro de cosméticos ante ANMAT",
      "Cosméticos Grado I y Grado II",
      "Buenas Prácticas de Fabricación (BPF)",
      "Control de calidad de productos cosméticos",
      "Productos domisanitarios",
      "Hosting regulatorio",
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Servicios",
      itemListElement: [
        ["Fabricación para terceros", "servicios/fabricacion"],
        ["Hosting regulatorio", "servicios/hosting"],
        ["Importación", "servicios/importacion"],
      ].map(([name, path]) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name,
          url: absoluteUrl("es", path),
        },
      })),
    },
  };
}

export function websiteNode(locale: string): JsonLdNode {
  return {
    "@type": "WebSite",
    "@id": websiteId,
    url: siteUrl,
    name: siteConfig.name,
    inLanguage: locale,
    publisher: { "@id": organizationId },
  };
}

export type BreadcrumbItem = { name: string; path: string };

export function breadcrumbNode(
  locale: string,
  trail: BreadcrumbItem[],
): JsonLdNode {
  const last = trail[trail.length - 1];

  return {
    "@type": "BreadcrumbList",
    "@id": `${absoluteUrl(locale, last.path)}#breadcrumb`,
    itemListElement: trail.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: absoluteUrl(locale, item.path),
    })),
  };
}

export function personNodes(locale: string): JsonLdNode[] {
  return [
    {
      "@type": "Person",
      "@id": andreaPellizaId,
      name: "Andrea Pelliza",
      jobTitle: "CEO & Regulatory Affairs",
      worksFor: { "@id": organizationId },
    },
    {
      "@type": "Person",
      "@id": enriquePellizaId,
      name: "Enrique Pelliza",
      jobTitle: locale === "en" ? "Founder" : "Fundador",
    },
  ];
}

export function faqPageNode(
  locale: string,
  path: string,
  items: FaqItem[],
): JsonLdNode {
  return {
    "@type": "FAQPage",
    "@id": `${absoluteUrl(locale, path)}#faq`,
    url: absoluteUrl(locale, path),
    inLanguage: locale,
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.pregunta,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.respuesta,
      },
    })),
  };
}

export function aboutPageNode(
  locale: string,
  name: string,
  description: string,
): JsonLdNode {
  const url = absoluteUrl(locale, "nosotros");

  return {
    "@type": "AboutPage",
    "@id": `${url}#about-page`,
    url,
    name,
    description,
    inLanguage: locale,
    about: { "@id": organizationId },
  };
}

export function serviceNode({
  locale,
  path,
  name,
  description,
  serviceType,
}: {
  locale: string;
  path: string;
  name: string;
  description: string;
  serviceType: string;
}): JsonLdNode {
  const url = absoluteUrl(locale, path);

  return {
    "@type": "Service",
    "@id": `${url}#service`,
    url,
    name,
    description,
    serviceType,
    provider: { "@id": organizationId },
    areaServed: {
      "@type": "Country",
      name: "Argentina",
    },
  };
}

export function everestBrandNode(locale: string): JsonLdNode {
  return {
    "@type": "Brand",
    "@id": everestBrandId,
    name: "Everest",
    url: absoluteUrl(locale, "productos"),
    logo: `${siteUrl}/images/logo-everest.jpg`,
  };
}

export function productNodes(
  locale: string,
  products: StructuredProduct[],
  presentationsLabel: string,
): JsonLdNode[] {
  const pageUrl = absoluteUrl(locale, "productos");

  return products.map((product) => ({
    "@type": "Product",
    "@id": `${siteUrl}/#product-everest-${product.slug}`,
    url: `${pageUrl}#${product.slug}`,
    name: product.name,
    description: product.description,
    image: `${siteUrl}${product.image}`,
    brand: { "@id": everestBrandId },
    manufacturer: { "@id": organizationId },
    additionalProperty: product.presentations.map((presentation) => ({
      "@type": "PropertyValue",
      name: presentationsLabel,
      value: presentation,
    })),
  }));
}

export function contactPageNode(
  locale: string,
  name: string,
  description: string,
): JsonLdNode {
  const url = absoluteUrl(locale, "contacto");

  return {
    "@type": "ContactPage",
    "@id": `${url}#contact-page`,
    url,
    name,
    description,
    inLanguage: locale,
    mainEntity: { "@id": organizationId },
  };
}
