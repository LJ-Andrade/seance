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
export const andreaPellizaId = `${siteUrl}/#andrea-pelliza`;
export const enriquePellizaId = `${siteUrl}/#enrique-pelliza`;
export const everestBrandId = `${siteUrl}/#brand-everest`;

export function organizationNode(description?: string): JsonLdNode {
  return {
    "@type": ["Organization", "LocalBusiness"],
    "@id": organizationId,
    name: siteConfig.name,
    url: siteUrl,
    logo: `${siteUrl}/images/logo-seance-v2.png`,
    ...(description ? { description } : {}),
    foundingDate: "1990",
    founder: { "@id": enriquePellizaId },
    email: "info@laboratorioseance.com.ar",
    telephone: "+54 11 4750-0763",
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
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+54 11 4750-0763",
      email: "info@laboratorioseance.com.ar",
      contactType: "customer service",
      areaServed: "AR",
    },
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
