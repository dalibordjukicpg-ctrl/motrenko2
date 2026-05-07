import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, phone, message } = body ?? {};

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Sva obavezna polja moraju biti popunjena." },
        { status: 400 }
      );
    }

    if (typeof email !== "string" || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Email nije validan." }, { status: 400 });
    }

    // TODO: integrate email service (Resend / SMTP / Sendgrid)
    // Za sada: samo loguje upit. U produkciji se ovdje šalje mail na info@humanareprodukcija.com.
    // eslint-disable-next-line no-console
    console.log("[KONTAKT FORMA]", { name, email, phone, message });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { error: "Greška na serveru. Pokušajte ponovo." },
      { status: 500 }
    );
  }
}
