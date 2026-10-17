import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { name, company, email, message } = await req.json();

  if (!name?.trim() || !email?.trim()) {
    return NextResponse.json(
      { error: "Name and email are required." },
      { status: 400 },
    );
  }

  const firstName = name.trim().split(" ")[0];

  const res = await fetch("https://api.brevo.com/v3/smtp/email", {
    method: "POST",
    headers: {
      "api-key": process.env.BREVO_API_KEY!,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      sender: { name: "GiantzFly Exim LLP", email: "giantzflyexim@gmail.com" },
      to: [{ email: email.trim(), name: name.trim() }],
      subject: `Welcome to GiantzFly — ${firstName}, you're on our trade list`,
      htmlContent: buildEmailHtml(
        firstName,
        company?.trim() || "",
        message?.trim() || "",
      ),
      bcc: [{ email: "giantzflyexim@gmail.com" }],
    }),
  });

  if (!res.ok) {
    const err = await res.json();
    console.error("Brevo error:", err);
    return NextResponse.json(
      { error: "Failed to send email." },
      { status: 500 },
    );
  }

  return NextResponse.json({ success: true });
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function buildEmailHtml(
  firstName: string,
  company: string,
  sourcing: string,
): string {
  firstName = escapeHtml(firstName);
  company = escapeHtml(company);
  sourcing = escapeHtml(sourcing);
  const companyRow = company
    ? `<tr><td style="padding:6px 0;border-bottom:1px solid #f0ede8;font-size:14px;color:#0f2341;"><span style="font-weight:600;">Company:</span> ${company}</td></tr>`
    : "";

  const sourcingRow = sourcing
    ? `<tr><td style="padding:6px 0;font-size:14px;color:#0f2341;"><span style="font-weight:600;">Sourcing interest:</span> ${sourcing}</td></tr>`
    : "";

  const detailsBlock =
    company || sourcing
      ? `<div style="background:#f7f6f2;border-radius:8px;padding:16px 20px;margin:0 0 28px;">
          <p style="margin:0 0 10px;font-size:11px;letter-spacing:0.1em;text-transform:uppercase;color:#006494;font-weight:700;">Your details on file</p>
          <table cellpadding="0" cellspacing="0" width="100%">
            ${companyRow}
            ${sourcingRow}
          </table>
        </div>`
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
            <p style="margin:0;font-size:11px;letter-spacing:0.12em;text-transform:uppercase;color:#7db9e8;font-weight:700;">B2B Export Catalog</p>
            <h1 style="margin:8px 0 0;font-size:26px;font-weight:700;color:#ffffff;">GiantzFly Exim LLP</h1>
            <p style="margin:6px 0 0;font-size:13px;color:#a8c4dc;">From Indian Origins to Global Markets.</p>
          </td>
        </tr>
        <tr>
          <td style="padding:40px 40px 32px;">
            <p style="margin:0 0 8px;font-size:11px;letter-spacing:0.1em;text-transform:uppercase;color:#006494;font-weight:700;">Welcome aboard</p>
            <h2 style="margin:0 0 20px;font-size:22px;color:#0f2341;font-weight:700;">Thank you, ${firstName}.</h2>
            <p style="margin:0 0 16px;font-size:15px;color:#4a4845;line-height:1.7;">You are now connected with GiantzFly Exim LLP — a B2B export company supplying Indian spices, makhana, and dry fruits to importers, distributors, and sourcing teams worldwide.</p>
            <p style="margin:0 0 28px;font-size:15px;color:#4a4845;line-height:1.7;">We share trade updates, new catalog additions, origin sourcing notes, and market availability — no retail noise, only trade-relevant information.</p>
            ${detailsBlock}
            <hr style="border:none;border-top:1px solid #e8e5e0;margin:0 0 28px;" />
            <p style="margin:0 0 14px;font-size:11px;letter-spacing:0.1em;text-transform:uppercase;color:#006494;font-weight:700;">What to expect</p>
            <table cellpadding="0" cellspacing="0" width="100%">
              <tr><td style="padding:10px 0;border-bottom:1px solid #f0ede8;">
                <span style="font-size:14px;color:#0f2341;font-weight:600;">Catalog Updates</span>
                <span style="display:block;font-size:13px;color:#7a7974;margin-top:2px;">New SKUs, grades, and seasonal availability across spices, makhana, and dry fruits.</span>
              </td></tr>
              <tr><td style="padding:10px 0;border-bottom:1px solid #f0ede8;">
                <span style="font-size:14px;color:#0f2341;font-weight:600;">Origin &amp; Harvest Notes</span>
                <span style="display:block;font-size:13px;color:#7a7974;margin-top:2px;">Crop updates from Erode, Unjha, Wayanad, Bihar, and other key producing belts.</span>
              </td></tr>
              <tr><td style="padding:10px 0;">
                <span style="font-size:14px;color:#0f2341;font-weight:600;">Trade Communication</span>
                <span style="display:block;font-size:13px;color:#7a7974;margin-top:2px;">MOQ flexibility, packaging options, and documentation support updates.</span>
              </td></tr>
            </table>
            <div style="margin-top:32px;">
              <a href="https://giantzfly.com/products" style="display:inline-block;background:#0f2341;color:#ffffff;font-size:14px;font-weight:600;padding:14px 28px;border-radius:8px;text-decoration:none;">Explore Our Catalog →</a>
            </div>
          </td>
        </tr>
        <tr>
          <td style="background:#f3f0ec;padding:24px 40px;border-top:1px solid #e0ddd8;">
            <p style="margin:0 0 4px;font-size:12px;color:#7a7974;">GiantzFly Exim LLP · Sindhudurg, Kudal, India</p>
            <p style="margin:0;font-size:12px;color:#bab9b4;">FSSAI · APEDA · Spices Board India · ISO 22000</p>
            <p style="margin:10px 0 0;font-size:11px;color:#bab9b4;">You received this because you subscribed at giantzfly.com.</p>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;
}