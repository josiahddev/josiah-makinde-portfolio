"use client";

import { useState } from "react";
import { contact } from "@/lib/data";

type Field = "name" | "email" | "subject" | "message";
type Values = Record<Field, string>;
type Errors = Partial<Record<Field, string>>;

const empty: Values = { name: "", email: "", subject: "", message: "" };

function validate(v: Values): Errors {
  const e: Errors = {};
  if (v.name.trim().length < 2) e.name = "Please add your name.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.email.trim())) e.email = "That email address doesn't look right.";
  if (v.subject.trim().length < 3) e.subject = "A short subject helps me reply faster.";
  if (v.message.trim().length < 20) e.message = "A little more detail, please — at least 20 characters.";
  return e;
}

/**
 * There's no backend yet, so on submit this opens the visitor's own email app with
 * everything pre-filled. Nothing is stored or sent by the site.
 *
 * To wire up a real provider later (Formspree, Resend, etc.), replace `deliver`
 * with a POST to that endpoint and keep the validation as is.
 */
function deliver(v: Values) {
  const body = `${v.message.trim()}\n\n— ${v.name.trim()} (${v.email.trim()})`;
  const href = `mailto:${contact.email}?subject=${encodeURIComponent(v.subject.trim())}&body=${encodeURIComponent(body)}`;
  window.location.href = href;
}

export function ContactForm() {
  const [values, setValues] = useState<Values>(empty);
  const [errors, setErrors] = useState<Errors>({});
  const [touched, setTouched] = useState<Partial<Record<Field, boolean>>>({});
  const [handedOff, setHandedOff] = useState(false);

  const update = (field: Field) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const next = { ...values, [field]: e.target.value };
    setValues(next);
    if (touched[field]) setErrors(validate(next));
  };

  const blur = (field: Field) => () => {
    setTouched((t) => ({ ...t, [field]: true }));
    setErrors(validate(values));
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const found = validate(values);
    setErrors(found);
    setTouched({ name: true, email: true, subject: true, message: true });
    const first = (Object.keys(found) as Field[])[0];
    if (first) {
      document.getElementById(`cf-${first}`)?.focus();
      return;
    }
    deliver(values);
    setHandedOff(true);
  };

  const shown = (f: Field) => (touched[f] ? errors[f] : undefined);

  return (
    <form noValidate onSubmit={onSubmit} className="space-y-6" aria-describedby="cf-note">
      <div className="grid gap-6 sm:grid-cols-2">
        <Input id="name" label="Name" autoComplete="name" value={values.name} onChange={update("name")} onBlur={blur("name")} error={shown("name")} />
        <Input id="email" label="Email" type="email" autoComplete="email" inputMode="email" value={values.email} onChange={update("email")} onBlur={blur("email")} error={shown("email")} />
      </div>
      <Input id="subject" label="Subject" value={values.subject} onChange={update("subject")} onBlur={blur("subject")} error={shown("subject")} />
      <Input id="message" label="Message" multiline value={values.message} onChange={update("message")} onBlur={blur("message")} error={shown("message")} />

      <div className="flex flex-col gap-4 pt-2 sm:flex-row sm:items-center sm:justify-between">
        <p id="cf-note" className="max-w-sm font-mono text-[0.6875rem] leading-5 text-faint">
          No server here — sending opens your email app with the message ready to go.
        </p>
        <button
          type="submit"
          className="group inline-flex min-h-11 shrink-0 items-center whitespace-nowrap justify-center gap-2 rounded-[3px] bg-fg px-6 text-[0.9375rem] font-medium text-bg transition-colors hover:bg-accent active:translate-y-px"
        >
          Send message
          <span aria-hidden="true" className="font-mono text-xs transition-transform group-hover:translate-x-0.5">
            →
          </span>
        </button>
      </div>

      <p role="status" aria-live="polite" className="text-sm text-muted empty:hidden">
        {handedOff && (
          <>
            Your email app should have opened with the message filled in. If it didn&rsquo;t, write to me directly at{" "}
            <a href={`mailto:${contact.email}`} className="text-fg underline decoration-accent underline-offset-4">
              {contact.email}
            </a>
            .
          </>
        )}
      </p>
    </form>
  );
}

type InputProps = {
  id: Field;
  label: string;
  error?: string;
  multiline?: boolean;
} & Pick<
  React.InputHTMLAttributes<HTMLInputElement>,
  "type" | "autoComplete" | "inputMode" | "value" | "onChange" | "onBlur"
>;

function Input({ id, label, error, multiline, ...rest }: InputProps) {
  const inputId = `cf-${id}`;
  const errorId = `${inputId}-error`;
  const cls = `peer w-full rounded-[3px] border bg-bg px-3.5 py-3 text-base text-fg transition-[border-color,box-shadow] outline-none placeholder:text-faint focus:shadow-[0_0_0_3px_color-mix(in_oklab,var(--color-accent)_18%,transparent)] ${
    error ? "border-red-400/70 focus:border-red-400" : "border-line-strong hover:border-muted focus:border-accent"
  }`;
  const shared = {
    id: inputId,
    name: id,
    required: true,
    "aria-invalid": !!error,
    "aria-describedby": error ? errorId : undefined,
    className: cls,
  };

  return (
    <div>
      <label htmlFor={inputId} className="mb-2 block font-mono text-xs tracking-wide text-muted uppercase">
        {label}
      </label>
      {multiline ? (
        <textarea
          {...shared}
          rows={6}
          value={rest.value}
          onChange={rest.onChange as unknown as React.ChangeEventHandler<HTMLTextAreaElement>}
          onBlur={rest.onBlur as unknown as React.FocusEventHandler<HTMLTextAreaElement>}
          className={`${cls} resize-y`}
        />
      ) : (
        <input {...shared} {...rest} type={rest.type ?? "text"} />
      )}
      {error && (
        <p id={errorId} className="mt-2 flex items-center gap-1.5 text-sm text-red-300">
          <span aria-hidden="true" className="font-mono">
            !
          </span>
          {error}
        </p>
      )}
    </div>
  );
}
