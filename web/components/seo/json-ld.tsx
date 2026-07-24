import type { JsonLdNode } from "@/lib/structured-data";

type JsonLdProps = {
  nodes: JsonLdNode[];
};

/**
 * Safely serializes a Schema.org graph without adding client-side JavaScript.
 */
export function JsonLd({ nodes }: JsonLdProps) {
  const data = {
    "@context": "https://schema.org",
    "@graph": nodes,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}
