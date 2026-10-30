/** @param {unknown} value */
function text(value) {
  return typeof value === "string" ? value.trim() : "";
}

/** @param {string} value */
export function isMailAddress(value) {
  return /^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/.test(value);
}

/** The sender must be configured separately and already verified in Brevo.
 * This checks configuration presence/format, not remote verification status.
 * @param {Record<string, unknown>} environment
 * @returns {{apiKey: string, senderEmail: string} | null}
 */
export function getMailConfig(environment = {}) {
  const apiKey = text(environment.BREVO_API_KEY);
  const senderEmail = text(environment.BREVO_SENDER_EMAIL);
  return apiKey && isMailAddress(senderEmail) ? { apiKey, senderEmail } : null;
}

/** Validate known text fields before any trim/HTML rendering in a route handler.
 * Omitted optional fields normalize to an empty string; supplied non-strings are invalid.
 * @param {unknown} value
 * @param {string[]} requiredFields
 * @param {string[]} optionalFields
 * @returns {{ok: true, data: Record<string, string>} | {ok: false, error: string}}
 */
export function validateMailFields(value, requiredFields, optionalFields = []) {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    return { ok: false, error: "Provide a JSON object with your enquiry details." };
  }
  const body = /** @type {Record<string, unknown>} */ (value);
  const data = /** @type {Record<string, string>} */ ({});
  for (const field of [...requiredFields, ...optionalFields]) {
    const fieldValue = body[field];
    if (fieldValue !== undefined && typeof fieldValue !== "string") {
      return { ok: false, error: "All contact and requirement fields must be text." };
    }
    data[field] = text(fieldValue);
    if (requiredFields.includes(field) && !data[field]) {
      return { ok: false, error: "Required fields are missing." };
    }
  }
  if (data.email && !isMailAddress(data.email)) {
    return { ok: false, error: "Enter a valid email address." };
  }
  return { ok: true, data };
}
