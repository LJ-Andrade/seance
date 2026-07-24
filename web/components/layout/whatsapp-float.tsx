import { useTranslations } from "next-intl";
import { WhatsappIcon } from "@/components/icons/brand-icons";
import { siteConfig } from "@/lib/site";

/**
 * Persistent WhatsApp contact button, fixed to the bottom-right corner.
 */
export function WhatsAppFloat() {
  const t = useTranslations("footer");

  return (
    <a
      href={siteConfig.whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={t("whatsapp")}
      className="fixed bottom-6 right-6 z-50 flex size-14 items-center justify-center rounded-full bg-[#25d366] text-white shadow-lg transition-transform hover:scale-105"
    >
      <WhatsappIcon className="size-7" />
    </a>
  );
}
