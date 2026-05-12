"use client";

import { useEffect, useId, useRef, useState } from "react";

type Props = { open: boolean; onClose: () => void };

type FormState = "idle" | "submitting" | "success" | "error";

export function BookConsultModal({ open, onClose }: Props) {
  const titleId = useId();
  const panelRef = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<FormState>("idle");
  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    if (!open) {
      setState("idle");
      setErrMsg("");
      return;
    }
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  useEffect(() => {
    if (open) panelRef.current?.querySelector<HTMLElement>("input, select, textarea")?.focus();
  }, [open]);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState("submitting");
    setErrMsg("");

    const fd = new FormData(e.currentTarget);
    const payload: Record<string, string> = {
      name: String(fd.get("name") ?? "").trim(),
      email: String(fd.get("email") ?? "").trim(),
      phone: String(fd.get("phone") ?? "").trim(),
      visitWith: String(fd.get("visitWith") ?? "").trim(),
      partnerName: String(fd.get("partnerName") ?? "").trim(),
      partnerPhone: String(fd.get("partnerPhone") ?? "").trim(),
      reasonForVisit: String(fd.get("reasonForVisit") ?? "").trim(),
      tryingToConceive: String(fd.get("tryingToConceive") ?? "").trim(),
      hasLivingChildren: fd.get("hasLivingChildren") === "on" ? "da" : "ne",
      pregnancyLossInfo: String(fd.get("pregnancyLossInfo") ?? "").trim(),
      diagnosesSurgeries: String(fd.get("diagnosesSurgeries") ?? "").trim(),
      medications: String(fd.get("medications") ?? "").trim(),
      allergies: String(fd.get("allergies") ?? "").trim(),
      prevFertilityCare: String(fd.get("prevFertilityCare") ?? "").trim(),
      cycleRegularity: String(fd.get("cycleRegularity") ?? "").trim(),
      schedulingNote: String(fd.get("schedulingNote") ?? "").trim(),
    };

    try {
      const res = await fetch("/api/prijavnica", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setErrMsg(data?.error ?? "Slanje nije uspjelo.");
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

  if (!open) return null;

  const inputCls =
    "w-full border border-zinc-200 bg-white px-3 py-2.5 text-sm text-zinc-900 placeholder:text-zinc-400 focus:border-[#f37021] focus:outline-none";
  const labelCls = "mb-1 block text-[11px] font-medium uppercase tracking-[0.18em] text-zinc-500";
  const sectionCls = "space-y-4 border-t border-zinc-100 pt-6 first:border-t-0 first:pt-0";

  return (
    <div
      className="fixed inset-0 z-[200] flex items-end justify-center p-0 sm:items-center sm:p-6"
      role="presentation"
    >
      <button
        type="button"
        aria-label="Zatvori"
        className="absolute inset-0 bg-zinc-950/65 backdrop-blur-[2px]"
        onClick={onClose}
      />

      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="relative flex max-h-[min(92vh,900px)] w-full max-w-lg flex-col rounded-t-2xl bg-[#fdfaf7] shadow-[0_-8px_40px_rgba(0,0,0,0.2)] sm:max-h-[90vh] sm:rounded-2xl sm:shadow-2xl"
      >
        <div className="flex shrink-0 items-start justify-between gap-4 border-b border-zinc-100 px-5 py-4 sm:px-6">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[#f37021]">
              Prijavnica za pregled
            </p>
            <h2
              id={titleId}
              style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
              className="mt-1 text-xl font-normal text-zinc-950 sm:text-2xl"
            >
              Zakažite konsultaciju
            </h2>
            <p className="mt-2 text-xs leading-relaxed text-zinc-600">
              Kratko popunjene informacije pomažu liječniku da vas bolje razumije prije prvog kontakta —
              posebno ako se suočavate s izazovima u začeoću ili ste već imali tretmane.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="shrink-0 rounded-md p-2 text-zinc-400 transition-colors hover:bg-zinc-100 hover:text-zinc-800"
            aria-label="Zatvori formu"
          >
            <svg className="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {state === "success" ? (
          <div className="overflow-y-auto px-5 py-10 text-center sm:px-8">
            <p
              style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
              className="text-2xl font-normal text-zinc-950"
            >
              Hvala na povjerenju
            </p>
            <p className="mt-3 text-sm leading-relaxed text-zinc-600">
              Primili smo vašu prijavnicu. Naš tim će vas uskoro kontaktirati radi dogovora oko termina.
            </p>
            <p className="mt-4 text-xs text-zinc-500">
              U hitnim slučajevima možete nas i dalje nazvati na{" "}
              <a href="tel:+38233402432" className="text-[#f37021] hover:underline">
                033 402 432
              </a>
              .
            </p>
            <button
              type="button"
              onClick={onClose}
              className="mt-8 rounded-sm bg-[#f37021] px-8 py-3 text-[11px] font-medium uppercase tracking-[0.22em] text-white transition-colors hover:bg-[#d9601a]"
            >
              Zatvori
            </button>
          </div>
        ) : (
          <form onSubmit={onSubmit} className="flex min-h-0 flex-1 flex-col">
            <div className="min-h-0 flex-1 overflow-y-auto px-5 py-4 sm:px-6">
              <div className={sectionCls}>
                <h3 className="text-sm font-medium text-zinc-800">Osnovni podaci</h3>
                <div>
                  <label className={labelCls} htmlFor="bc-name">Ime i prezime *</label>
                  <input id="bc-name" name="name" required className={inputCls} autoComplete="name" />
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className={labelCls} htmlFor="bc-email">Email *</label>
                    <input id="bc-email" name="email" type="email" required className={inputCls} autoComplete="email" />
                  </div>
                  <div>
                    <label className={labelCls} htmlFor="bc-phone">Telefon *</label>
                    <input id="bc-phone" name="phone" type="tel" required className={inputCls} autoComplete="tel" />
                  </div>
                </div>
                <div>
                  <span className={labelCls}>Ko dolazi na pregled? *</span>
                  <select name="visitWith" required className={inputCls}>
                    <option value="">— izaberite —</option>
                    <option value="par">Par (oba partnera)</option>
                    <option value="ja">Samo ja (pacijent/kinja)</option>
                    <option value="partner">Samo partner</option>
                  </select>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className={labelCls} htmlFor="bc-partner-name">Ime partnera (ako dolazi)</label>
                    <input id="bc-partner-name" name="partnerName" className={inputCls} />
                  </div>
                  <div>
                    <label className={labelCls} htmlFor="bc-partner-phone">Telefon partnera</label>
                    <input id="bc-partner-phone" name="partnerPhone" type="tel" className={inputCls} />
                  </div>
                </div>
              </div>

              <div className={sectionCls}>
                <h3 className="text-sm font-medium text-zinc-800">Razlog dolaska</h3>
                <div>
                  <label className={labelCls} htmlFor="bc-reason">Šta vas je dovelo na konsultaciju? *</label>
                  <textarea
                    id="bc-reason"
                    name="reasonForVisit"
                    required
                    rows={3}
                    placeholder="Npr. duži pokušaji začeoća, preporuka za IVF, kontrola nakon gubitka trudnoće, drugo…"
                    className={`${inputCls} resize-y min-h-[88px]`}
                  />
                </div>
                <div>
                  <label className={labelCls} htmlFor="bc-trying">Koliko dugo aktivno pokušavate začeoće?</label>
                  <select id="bc-trying" name="tryingToConceive" className={inputCls}>
                    <option value="">— nije bitno / ne želim navesti —</option>
                    <option value="manje-od-godine">Manje od godine</option>
                    <option value="1-2g">1–2 godine</option>
                    <option value="2-3g">2–3 godine</option>
                    <option value="vise-od-3g">Više od 3 godine</option>
                    <option value="ne-pokusavamo">Trenutno ne pokušavamo prirodno</option>
                  </select>
                </div>
                <div className="flex flex-col gap-2 rounded-md border border-zinc-100 bg-white/60 px-3 py-3">
                  <label className="flex cursor-pointer items-start gap-3 text-sm text-zinc-700">
                    <input type="checkbox" name="hasLivingChildren" className="mt-1 size-4 accent-[#f37021]" />
                    <span>
                      Imam djecu iz ranije veze ili ranijih trudnoća (kratko opišite u polju ispod ako želite).
                    </span>
                  </label>
                </div>
                <div>
                  <label className={labelCls} htmlFor="bc-loss">
                    Gubici trudnoće, komplikacije ili šta liječnik treba posebno da zna
                  </label>
                  <textarea
                    id="bc-loss"
                    name="pregnancyLossInfo"
                    rows={2}
                    placeholder="Opciono. Samo ono što smatrate bitnim za prvi razgovor."
                    className={`${inputCls} resize-y`}
                  />
                </div>
              </div>

              <div className={sectionCls}>
                <h3 className="text-sm font-medium text-zinc-800">Kratka zdravstvena anamneza</h3>
                <p className="text-xs leading-relaxed text-zinc-500">
                  Odgovori ne zamjenjuju pregled; služe da tim pripremi razgovor.
                </p>
                <div>
                  <label className={labelCls} htmlFor="bc-diag">Poznate dijagnoze, operacije, važni nalazi</label>
                  <textarea id="bc-diag" name="diagnosesSurgeries" rows={2} className={`${inputCls} resize-y`} />
                </div>
                <div>
                  <label className={labelCls} htmlFor="bc-med">Lijekovi i dodaci koje trenutno uzimate</label>
                  <textarea id="bc-med" name="medications" rows={2} className={`${inputCls} resize-y`} />
                </div>
                <div>
                  <label className={labelCls} htmlFor="bc-all">Alergije</label>
                  <input id="bc-all" name="allergies" className={inputCls} />
                </div>
                <div>
                  <label className={labelCls} htmlFor="bc-prev">Prethodni tretmani reproduktivne medicine (IVF, IUI, stimulacija…)</label>
                  <textarea id="bc-prev" name="prevFertilityCare" rows={2} className={`${inputCls} resize-y`} />
                </div>
                <div>
                  <label className={labelCls} htmlFor="bc-cycle">Ciklusi (ako je relevantno): redovni / neredovni / ne znam</label>
                  <input id="bc-cycle" name="cycleRegularity" className={inputCls} placeholder="Primjer: redovni, svakih 28 dana" />
                </div>
              </div>

              <div className={sectionCls}>
                <h3 className="text-sm font-medium text-zinc-800">Termin</h3>
                <div>
                  <label className={labelCls} htmlFor="bc-note">Napomena za zakazivanje (željeni dani, vrijeme, jezik…)</label>
                  <textarea id="bc-note" name="schedulingNote" rows={2} className={`${inputCls} resize-y`} />
                </div>
              </div>

              {state === "error" && errMsg && (
                <p className="mt-4 text-sm text-red-600">{errMsg}</p>
              )}

              <p className="mt-6 text-[11px] leading-relaxed text-zinc-500">
                Slanjem prihvatate da obradimo navedene podatke radi dogovora pregleda, u skladu s našom{" "}
                <a href="/politika-privatnosti" className="text-[#f37021] hover:underline" target="_blank" rel="noreferrer">
                  politikom privatnosti
                </a>
                . Za hitne medicinske intervencije koristite hitnu službu ili poziv na broj ispod.
              </p>
            </div>

            <div className="shrink-0 border-t border-zinc-100 bg-[#fdfaf7] px-5 py-4 sm:px-6">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <a
                  href="tel:+38233402432"
                  className="text-center text-[11px] font-medium uppercase tracking-[0.2em] text-zinc-500 hover:text-[#f37021] sm:text-left"
                >
                  Ili pozovite: 033 402 432
                </a>
                <button
                  type="submit"
                  disabled={state === "submitting"}
                  className="inline-flex h-12 w-full items-center justify-center bg-[#f37021] px-8 text-[11px] font-medium uppercase tracking-[0.22em] text-white transition-colors hover:bg-[#d9601a] disabled:opacity-60 sm:w-auto"
                >
                  {state === "submitting" ? "Slanje…" : "Pošalji prijavnicu"}
                </button>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
