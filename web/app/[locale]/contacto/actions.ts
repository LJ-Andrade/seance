"use server";

import { getTranslations } from "next-intl/server";
import { sendContactMessage } from "@/lib/email";

export type ContactFieldErrors = Partial<
  Record<"name" | "email" | "message", string>
>;

export type ContactState = {
  status: "idle" | "success" | "error";
  /** Top-level feedback (success or non-field error). */
  message?: string;
  /** Per-field validation errors. */
  errors?: ContactFieldErrors;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MIN_MESSAGE_LENGTH = 10;

export async function submitContactForm(
  _prev: ContactState,
  formData: FormData,
): Promise<ContactState> {
  const locale = String(formData.get("locale") ?? "es");
  const t = await getTranslations({ locale, namespace: "contacto.estado" });

  // Honeypot: bots fill hidden fields. Pretend success and drop the message.
  if (String(formData.get("website") ?? "").trim()) {
    return { status: "success", message: t("exito") };
  }

  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const company = String(formData.get("company") ?? "").trim();
  const phone = String(formData.get("phone") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();

  const errors: ContactFieldErrors = {};
  if (!name) errors.name = t("requerido");
  if (!email) errors.email = t("requerido");
  else if (!EMAIL_RE.test(email)) errors.email = t("emailInvalido");
  if (!message) errors.message = t("requerido");
  else if (message.length < MIN_MESSAGE_LENGTH) errors.message = t("mensajeCorto");

  if (Object.keys(errors).length > 0) {
    return { status: "error", errors };
  }

  const result = await sendContactMessage({
    name,
    email,
    company: company || undefined,
    phone: phone || undefined,
    message,
  });

  if (!result.ok) {
    return { status: "error", message: t("error") };
  }

  return { status: "success", message: t("exito") };
}
