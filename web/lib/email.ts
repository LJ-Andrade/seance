/**
 * Contact message delivery.
 *
 * Uses Brevo's transactional email API. The integration is fully implemented
 * but gated on environment variables, so wiring it up later is only a matter of
 * setting `BREVO_API_KEY`, `BREVO_SENDER_EMAIL` and `CONTACT_TO_EMAIL` (see
 * `.env.example`). While those are unset (local dev / preview) the message is
 * logged and treated as delivered, so the form UX keeps working end to end.
 */

const BREVO_ENDPOINT = "https://api.brevo.com/v3/smtp/email";

export type ContactPayload = {
  name: string;
  email: string;
  company?: string;
  phone?: string;
  message: string;
};

export type SendResult = { ok: true } | { ok: false; error: string };

export async function sendContactMessage(
  payload: ContactPayload,
): Promise<SendResult> {
  const apiKey = process.env.BREVO_API_KEY;
  const sender = process.env.BREVO_SENDER_EMAIL;
  const to = process.env.CONTACT_TO_EMAIL;

  // Not configured yet: don't break the UX, just record the attempt.
  if (!apiKey || !sender || !to) {
    console.warn(
      "[contact] Email not sent — set BREVO_API_KEY, BREVO_SENDER_EMAIL and CONTACT_TO_EMAIL to enable delivery.",
      payload,
    );
    return { ok: true };
  }

  try {
    const res = await fetch(BREVO_ENDPOINT, {
      method: "POST",
      headers: {
        "api-key": apiKey,
        "content-type": "application/json",
        accept: "application/json",
      },
      body: JSON.stringify({
        sender: { name: "Laboratorio Séance — Web", email: sender },
        to: [{ email: to }],
        replyTo: { email: payload.email, name: payload.name },
        subject: `Nuevo contacto web — ${payload.name}`,
        htmlContent: buildHtml(payload),
        textContent: buildText(payload),
      }),
    });

    if (!res.ok) {
      const detail = await res.text().catch(() => "");
      console.error("[contact] Brevo error", res.status, detail);
      return { ok: false, error: `brevo_${res.status}` };
    }

    return { ok: true };
  } catch (err) {
    console.error("[contact] Brevo request failed", err);
    return { ok: false, error: "network" };
  }
}

function buildText(p: ContactPayload): string {
  return [
    `Nombre: ${p.name}`,
    `Email: ${p.email}`,
    p.company ? `Empresa: ${p.company}` : null,
    p.phone ? `Teléfono: ${p.phone}` : null,
    "",
    p.message,
  ]
    .filter((line) => line !== null)
    .join("\n");
}

function buildHtml(p: ContactPayload): string {
  const rows: string[] = [
    `<p><strong>Nombre:</strong> ${escapeHtml(p.name)}</p>`,
    `<p><strong>Email:</strong> ${escapeHtml(p.email)}</p>`,
  ];
  if (p.company)
    rows.push(`<p><strong>Empresa:</strong> ${escapeHtml(p.company)}</p>`);
  if (p.phone)
    rows.push(`<p><strong>Teléfono:</strong> ${escapeHtml(p.phone)}</p>`);
  rows.push(
    `<p><strong>Mensaje:</strong></p><p>${escapeHtml(p.message).replace(/\n/g, "<br>")}</p>`,
  );
  return rows.join("\n");
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
