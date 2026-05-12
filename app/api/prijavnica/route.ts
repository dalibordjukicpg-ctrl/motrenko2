import { NextResponse } from "next/server";

const MAX = 8000;

function str(v: unknown): string {
  return typeof v === "string" ? v.trim().slice(0, MAX) : "";
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const name = str(body?.name);
    const email = str(body?.email);
    const phone = str(body?.phone);

    if (!name || !email || !phone) {
      return NextResponse.json(
        { error: "Ime, email i telefon su obavezni." },
        { status: 400 }
      );
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Email nije validan." }, { status: 400 });
    }

    if (!str(body?.reasonForVisit)) {
      return NextResponse.json(
        { error: "Polje „razlog dolaska“ je obavezno." },
        { status: 400 }
      );
    }

    const payload = {
      type: "prijavnica-pregleda" as const,
      name,
      email,
      phone,
      visitWith: str(body?.visitWith),
      partnerName: str(body?.partnerName),
      partnerPhone: str(body?.partnerPhone),
      reasonForVisit: str(body?.reasonForVisit),
      tryingToConceive: str(body?.tryingToConceive),
      hasLivingChildren: str(body?.hasLivingChildren),
      pregnancyLossInfo: str(body?.pregnancyLossInfo),
      diagnosesSurgeries: str(body?.diagnosesSurgeries),
      medications: str(body?.medications),
      allergies: str(body?.allergies),
      prevFertilityCare: str(body?.prevFertilityCare),
      cycleRegularity: str(body?.cycleRegularity),
      schedulingNote: str(body?.schedulingNote),
    };

    // TODO: slanje e-poštom (Resend / SMTP). Za sada log.
    // eslint-disable-next-line no-console
    console.log("[PRIJAVNICA PREGLEDA]", payload);

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { error: "Greška na serveru. Pokušajte ponovo." },
      { status: 500 }
    );
  }
}
