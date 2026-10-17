import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const {
    name,
    company,
    email,
    whatsapp,
    country,
    city,
    lookingFor,
    productSpec,
    quantity,
    targetPort,
    packaging,
    message,
    attachment,
  } = body;

  if (
    !name?.trim() ||
    !company?.trim() ||
    !email?.trim() ||
    !whatsapp?.trim() ||
    !country?.trim() ||
    !lookingFor?.trim() ||
    !productSpec?.trim() ||
    !targetPort?.trim()
  ) {
    return NextResponse.json(
      { error: "Required fields are missing." },
      { status: 400 },
    );
  }

  const res = await fetch("https://api.brevo.com/v3/smtp/email", {
    method: "POST",
    headers: {
      "api-key": process.env.BREVO_API_KEY!,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      sender: { name: "GiantzFly Exim LLP", email: "giantzflyexim@gmail.com" },
      to: [{ email: "giantzflyexim@gmail.com", name: "GiantzFly Exim LLP" }],
      replyTo: { email: email.trim(), name: name.trim() },
      subject: `New Export Enquiry — ${company.trim()} (${productSpec.trim()})`,
      htmlContent: buildEmailHtml({
        name,
        company,
        email,
        whatsapp,
        country,
        city,
        lookingFor,
        productSpec,
        quantity,
        targetPort,
        packaging,
        message,
      }),
      ...(attachment?.content
        ? { attachment: [{ name: attachment.name, content: attachment.content }] }
        : {}),
    }),
  });

  if (!res.ok) {
    const err = await res.json();
    console.error("Brevo error:", err);
    return NextResponse.json(
      { error: "Failed to send enquiry." },
      { status: 500 },
    );
  }

  return NextResponse.json({ success: true });
}

function escapeHtml(s: string): string {
  return (s ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function row(label: string, value: string): string {
  if (!value?.trim()) return "";
  return `<tr><td style="padding:6px 0;border-bottom:1px solid #f0ede8;font-size:14px;color:#0f2341;"><span style="font-weight:600;">${escapeHtml(label)}:</span> ${escapeHtml(value)}</td></tr>`;
}

function buildEmailHtml(f: {
  name: string;
  company: string;
  email: string;
  whatsapp: string;
  country: string;
  city?: string;
  lookingFor: string;
  productSpec: string;
  quantity?: string;
  targetPort: string;
  packaging?: string;
  message?: string;
}): string {
  const rows = [
    row("Full Name", f.name),
    row("Company", f.company),
    row("Business Email", f.email),
    row("WhatsApp / Phone", f.whatsapp),
    row("Country", f.country),
    row("City", f.city ?? ""),
    row("Looking For", f.lookingFor),
    row("Product / Specification", f.productSpec),
    row("Quantity", f.quantity ?? ""),
    row("Target Country / Port", f.targetPort),
    row("Packaging Requirement", f.packaging ?? ""),
  ].join("");

  const messageBlock = f.message?.trim()
    ? `<hr style="border:none;border-top:1px solid #e8e5e0;margin:24px 0;" /><p style="margin:0 0 8px;font-size:11px;letter-spacing:0.1em;text-transform:uppercase;color:#006494;font-weight:700;">Message</p><p style="margin:0;font-size:14px;color:#4a4845;line-height:1.7;">${escapeHtml(f.message)}</p>`
    : "";

  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8" /><meta name="viewport" content="width=device-width, initial-scale=1.0" /></head>
<body style="margin:0;padding:0;background:#f7f6f2;font-family:Montserrat, sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f7f6f2;padding:40px 16px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.07);">
        <tr>
          <td style="background:#0f2341;padding:32px 40px;">
            <p style="margin:0;font-size:11px;letter-spacing:0.12em;text-transform:uppercase;color:#7db9e8;font-weight:700;">New Export Enquiry</p>
            <h1 style="margin:8px 0 0;font-size:24px;font-weight:700;color:#ffffff;">${escapeHtml(f.company)}</h1>
          </td>
        </tr>
        <tr>
          <td style="padding:32px 40px;">
            <table cellpadding="0" cellspacing="0" width="100%">${rows}</table>
            ${messageBlock}
          </td>
        </tr>
        <tr>
          <td style="background:#f3f0ec;padding:20px 40px;border-top:1px solid #e0ddd8;">
            <p style="margin:0;font-size:12px;color:#7a7974;">Submitted via giantzfly.com — Send Your Enquiry form.</p>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;
}
