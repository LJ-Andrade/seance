import { useTranslations } from "next-intl";
import { siteConfig } from "@/lib/site";

/**
 * Embedded map pointing to the laboratory's address, shown beside the form.
 * Uses Google Maps' keyless embed endpoint; lazy-loaded to protect CWV.
 */
export function ContactMap() {
  const t = useTranslations("contacto");
  const { maps } = siteConfig;
  const query = encodeURIComponent(maps.query);
  // Center on the exact place while keeping the business marker/label.
  const src = `https://www.google.com/maps?q=${query}&center=${maps.lat},${maps.lng}&z=17&output=embed`;

  return (
    <div className="min-h-[360px] overflow-hidden rounded-[16px] border border-border lg:min-h-full">
      <iframe
        title={t("mapaAlt")}
        src={src}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="size-full min-h-[360px] border-0"
      />
    </div>
  );
}
