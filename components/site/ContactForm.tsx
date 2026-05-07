"use client";

import { useState } from "react";

type State = "idle" | "submitting" | "success" | "error";

export function ContactForm() {
  const [state, setState]   = useState<State>("idle");
  const [errMsg, setErrMsg] = useState<string>("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState("submitting");
    setErrMsg("");

    const fd = new FormData(e.currentTarget);
    const payload = {
      name:    String(fd.get("name")    ?? "").trim(),
      email:   String(fd.get("email")   ?? "").trim(),
      phone:   String(fd.get("phone")   ?? "").trim(),
      message: String(fd.get("message") ?? "").trim(),
    };

    try {
      const res = await fetch("/api/kontakt", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify(payload),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setErrMsg(data?.error ?? "Greška pri slanju poruke.");
        setState("error");
        return;
      }
      setState("success");
      e.currentTarget.reset();
    } catch {
      setErrMsg("Mreža nije dostupna. Pokušajte kasnije.");
      setState("error");
    }
  }

  if (state === "success") {
    return (
      <div className="rounded-sm border border-orange-200 bg-orange-50/50 px-6 py-10 text-center">
        <p
          style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
          className="text-2xl font-normal text-zinc-950"
        >
          Hvala na poruci!
        </p>
        <p className="mt-2 text-sm text-zinc-500">
          Odgovorićemo u najkraćem mogućem roku.
        </p>
        <button
          onClick={() => setState("idle")}
          className="mt-6 text-[11px] font-medium uppercase tracking-[0.25em] text-[#f37021] hover:underline"
        >
          Pošalji još jednu →
        </button>
      </div>
    );
  }

  const inputCls =
    "w-full border border-zinc-200 bg-white px-4 py-3 text-sm text-zinc-900 placeholder:text-zinc-400 focus:border-[#f37021] focus:outline-none";

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <input
          required
          type="text"
          name="name"
          placeholder="Ime i prezime *"
          className={inputCls}
        />
        <input
          required
          type="email"
          name="email"
          placeholder="Email *"
          className={inputCls}
        />
      </div>
      <input type="tel" name="phone" placeholder="Telefon" className={inputCls} />
      <textarea
        required
        name="message"
        rows={5}
        placeholder="Vaša poruka *"
        className={inputCls + " resize-y"}
      />

      {state === "error" && (
        <p className="text-sm text-red-600">{errMsg}</p>
      )}

      <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-[11px] text-zinc-400">
          Slanjem prihvatate našu{" "}
          <a href="/politika-privatnosti" className="text-[#f37021] hover:underline">
            politiku privatnosti
          </a>
          .
        </p>
        <button
          type="submit"
          disabled={state === "submitting"}
          className="inline-flex h-12 items-center bg-[#f37021] px-8 text-[11px] font-medium uppercase tracking-[0.25em] text-white transition-colors hover:bg-[#d9601a] disabled:opacity-60"
        >
          {state === "submitting" ? "Slanje…" : "Pošaljite poruku"}
        </button>
      </div>
    </form>
  );
}
