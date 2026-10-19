import { getTranslations } from "next-intl/server";
import { breadcrumbNode, type JsonLdNode } from "@/lib/structured-data";

export type BreadcrumbKey =
  | "nosotros"
  | "productos"
  | "contacto"
  | "fabricacion"
  | "hosting"
  | "importacion";

/**
 * Home > page breadcrumb for an internal route. Service pages link straight to
 * Home because there is no Servicios index page.
 */
export async function pageBreadcrumb(
  locale: string,
  key: BreadcrumbKey,
  path: string,
): Promise<JsonLdNode> {
  const t = await getTranslations({ locale, namespace: "migas" });

  return breadcrumbNode(locale, [
    { name: t("inicio"), path: "" },
    { name: t(key), path },
  ]);
}
