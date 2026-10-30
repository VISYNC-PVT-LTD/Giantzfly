export const DEFAULT_SITE_SETTINGS = Object.freeze({
  contactEmail: "info@giantzfly.com",
  contactPhone: "+91 88799 65547",
  origin: "Mumbai, Maharashtra, India",
});

/** @param {unknown} value */
function text(value) {
  return typeof value === "string" ? value.trim() : "";
}

/** The public phone and WhatsApp destination intentionally share one CMS field.
 * @param {unknown} value
 */
export function normalizeSiteSettings(value) {
  const doc = value && typeof value === "object"
    ? /** @type {Record<string, unknown>} */ (value) : {};
  const email = text(doc.contactEmail);
  const phone = text(doc.contactPhone);
  const contactEmail = /^[^\s@?&#]+@[^\s@?&#]+\.[^\s@?&#]+$/.test(email)
    ? email : DEFAULT_SITE_SETTINGS.contactEmail;
  const contactPhone = /^\+[\d\s().-]+$/.test(phone) && /^\d{8,15}$/.test(phone.replace(/\D/g, ""))
    ? phone : DEFAULT_SITE_SETTINGS.contactPhone;
  const whatsappNumber = contactPhone.replace(/\D/g, "");
  return {
    contactEmail,
    contactPhone,
    origin: text(doc.origin) || DEFAULT_SITE_SETTINGS.origin,
    whatsappNumber,
    emailHref: `mailto:${contactEmail}`,
    phoneHref: `tel:+${whatsappNumber}`,
    whatsappHref: `https://wa.me/${whatsappNumber}`,
  };
}
