"use client";

import { useActionState, useId, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  submitContactForm,
  type ContactState,
} from "@/app/[locale]/contacto/actions";

const initialState: ContactState = { status: "idle" };
const MAX_MESSAGE = 200;

const inputClass =
  "w-full rounded-[6px] border-2 border-[#e9eaec] bg-white px-[14px] text-sm text-brand-ink outline-none transition-colors placeholder:text-[#919ca4] focus:border-brand-teal";
const labelClass = "flex items-center gap-1.5 text-xs text-[#3e464d]";
const errorClass = "text-xs text-[#c03744]";

export function ContactForm() {
  const t = useTranslations("contacto");
  const locale = useLocale();
  const [messageLength, setMessageLength] = useState(0);
  const [state, formAction, pending] = useActionState(
    submitContactForm,
    initialState,
  );

  if (state.status === "success") {
    return (
      <div className="flex flex-col items-start gap-3 rounded-[8px] border-2 border-[#e9eaec] bg-white p-8">
        <CheckCircle2 className="size-8 text-brand-teal" aria-hidden />
        <p className="text-base leading-[22px] text-brand-slate">
          {state.message}
        </p>
      </div>
    );
  }

  return (
    <form action={formAction} className="flex flex-col gap-5" noValidate>
      <input type="hidden" name="locale" value={locale} />
      {/* Honeypot: hidden from users, catches bots. */}
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden
        className="hidden"
      />

      <div className="grid gap-5 sm:grid-cols-2">
        <Field
          name="name"
          label={t("form.nombre.label")}
          placeholder={t("form.nombre.placeholder")}
          required
          error={state.errors?.name}
        />
        <Field
          name="email"
          type="email"
          label={t("form.email.label")}
          placeholder={t("form.email.placeholder")}
          required
          error={state.errors?.email}
        />
        <Field
          name="company"
          label={t("form.empresa.label")}
          placeholder={t("form.empresa.placeholder")}
        />
        <Field
          name="phone"
          type="tel"
          label={t("form.telefono.label")}
          placeholder={t("form.telefono.placeholder")}
        />
      </div>

      <MessageField
        label={t("form.mensaje.label")}
        placeholder={t("form.mensaje.placeholder")}
        error={state.errors?.message}
        length={messageLength}
        onLengthChange={setMessageLength}
      />

      <div className="flex flex-col gap-3">
        <button
          type="submit"
          disabled={pending}
          className="inline-flex w-fit items-center gap-2 rounded-[4px] bg-brand-teal px-7 py-3.5 text-[11px] font-medium uppercase tracking-[2px] text-brand-cream transition-colors hover:bg-brand-teal/90 disabled:opacity-60"
        >
          {pending ? t("form.enviando") : t("form.enviar")}
          {!pending ? <ArrowRight className="size-3.5" aria-hidden /> : null}
        </button>

        {state.status === "error" && state.message ? (
          <p className={errorClass} role="alert">
            {state.message}
          </p>
        ) : null}
      </div>
    </form>
  );
}

type FieldProps = {
  name: string;
  label: string;
  placeholder?: string;
  type?: string;
  required?: boolean;
  error?: string;
};

function Field({
  name,
  label,
  placeholder,
  type = "text",
  required = false,
  error,
}: FieldProps) {
  const id = useId();
  const errorId = `${id}-error`;

  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className={labelClass}>
        {required ? <span className="text-[#c03744]">*</span> : null}
        {label}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        placeholder={placeholder}
        required={required}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? errorId : undefined}
        className={cn(inputClass, "h-14")}
      />
      {error ? (
        <p id={errorId} className={errorClass}>
          {error}
        </p>
      ) : null}
    </div>
  );
}

type MessageFieldProps = {
  label: string;
  placeholder?: string;
  error?: string;
  length: number;
  onLengthChange: (length: number) => void;
};

function MessageField({
  label,
  placeholder,
  error,
  length,
  onLengthChange,
}: MessageFieldProps) {
  const id = useId();
  const errorId = `${id}-error`;

  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className={labelClass}>
        <span className="text-[#c03744]">*</span>
        {label}
      </label>
      <textarea
        id={id}
        name="message"
        rows={5}
        maxLength={MAX_MESSAGE}
        placeholder={placeholder}
        required
        onChange={(e) => onLengthChange(e.target.value.length)}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? errorId : undefined}
        className={cn(inputClass, "min-h-[160px] resize-y py-3 leading-[20px]")}
      />
      <div className="flex items-center justify-between gap-3">
        {error ? (
          <p id={errorId} className={errorClass}>
            {error}
          </p>
        ) : (
          <span />
        )}
        <span className="shrink-0 text-xs text-[#89939e]">
          {length}/{MAX_MESSAGE}
        </span>
      </div>
    </div>
  );
}
