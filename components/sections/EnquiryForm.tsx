"use client";

import { useState } from "react";
import styles from "./EnquiryForm.module.css";

const CATEGORIES = [
  "Whole Spices",
  "Powder Spices & Nutrition",
  "Fresh Vegetables",
  "Dry Fruits",
  "Makhana & Others",
  "Other / Not Sure",
];

const QUANTITIES = [
  "Trial Order",
  "100–500 kg",
  "500 kg–1 MT",
  "1–5 MT",
  "5–10 MT",
  "10+ MT",
  "Container Load",
  "Not Decided Yet",
];

const PACKAGING = [
  "Bulk Packaging",
  "Retail Packaging",
  "Private Label",
  "Custom Packaging",
  "Not Required",
];

const MAX_FILE_BYTES = 10 * 1024 * 1024;

type Status = "idle" | "loading" | "success" | "error";

function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      resolve(result.split(",")[1] ?? "");
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export default function EnquiryForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [fileError, setFileError] = useState("");
  const [form, setForm] = useState({
    name: "",
    company: "",
    email: "",
    whatsapp: "",
    country: "",
    city: "",
    lookingFor: "",
    productSpec: "",
    quantity: "",
    targetPort: "",
    packaging: "",
    message: "",
  });
  const [file, setFile] = useState<File | null>(null);
  const [quantityOpen, setQuantityOpen] = useState(false);

  function update<K extends keyof typeof form>(key: K, value: string) {
    setForm((p) => ({ ...p, [key]: value }));
  }

  function onFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0] ?? null;
    if (f && f.size > MAX_FILE_BYTES) {
      setFileError("File is larger than 10 MB.");
      setFile(null);
      return;
    }
    setFileError("");
    setFile(f);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");

    const attachment = file
      ? { name: file.name, content: await fileToBase64(file) }
      : null;

    const res = await fetch("/api/enquiry", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, attachment }),
    });
    const data = await res.json();
    setStatus(data.success ? "success" : "error");
  }

  if (status === "success") {
    return (
      <div className={styles.card}>
        <p className={styles.success}>
          Enquiry sent — a director will get back to you within 48 hours.
        </p>
      </div>
    );
  }

  return (
    <form className={styles.card} onSubmit={handleSubmit}>
      <h3 className={styles.heading}>Send Your Enquiry</h3>
      <p className={styles.sub}>
        Please provide your business and product requirements.
      </p>

      <div className={styles.sectionLabel}>Contact Details</div>
      <div className={styles.contactGrid}>
        <label className={styles.field}>
          <span className={styles.labelText}>Full Name<span className={styles.req}>*</span></span>
          <input
            required
            placeholder="Enter your full name"
            value={form.name}
            onChange={(e) => update("name", e.target.value)}
          />
        </label>
        <label className={styles.field}>
          <span className={styles.labelText}>Company Name<span className={styles.req}>*</span></span>
          <input
            required
            placeholder="Enter your company name"
            value={form.company}
            onChange={(e) => update("company", e.target.value)}
          />
        </label>
        <label className={styles.field}>
          <span className={styles.labelText}>Business Email<span className={styles.req}>*</span></span>
          <input
            required
            type="email"
            placeholder="name@company.com"
            value={form.email}
            onChange={(e) => update("email", e.target.value)}
          />
        </label>
        <label className={styles.field}>
          <span className={styles.labelText}>WhatsApp / Phone<span className={styles.req}>*</span></span>
          <input
            required
            placeholder="+91 XXXXX XXXXX"
            value={form.whatsapp}
            onChange={(e) => update("whatsapp", e.target.value)}
          />
        </label>
        <label className={styles.field}>
          <span className={styles.labelText}>Country<span className={styles.req}>*</span></span>
          <input
            required
            placeholder="Select your country"
            value={form.country}
            onChange={(e) => update("country", e.target.value)}
          />
        </label>
        <label className={styles.field}>
          City
          <input
            placeholder="City"
            value={form.city}
            onChange={(e) => update("city", e.target.value)}
          />
        </label>
      </div>

      <div className={styles.sectionLabel}>Product & Business Requirement</div>
      <div className={styles.requirementGrid}>
        <label className={styles.field}>
          <span className={styles.labelText}>What Are You Looking For?<span className={styles.req}>*</span></span>
          <select
            required
            value={form.lookingFor}
            onChange={(e) => update("lookingFor", e.target.value)}
          >
            <option value="" disabled>
              Select a category
            </option>
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </label>

        <label className={styles.field}>
          <span className={styles.labelText}>Product Name / Specification<span className={styles.req}>*</span></span>
          <input
            required
            placeholder="Example: Turmeric Fingers – 5% moisture – export grade"
            value={form.productSpec}
            onChange={(e) => update("productSpec", e.target.value)}
          />
        </label>
      </div>

      <div className={`${styles.accordion} ${quantityOpen ? styles.accordionOpen : ""}`}>
        <button
          type="button"
          className={styles.accordionHeader}
          aria-expanded={quantityOpen}
          aria-controls="quantity-panel"
          onClick={() => setQuantityOpen((o) => !o)}
        >
          <span className={styles.labelText}>
            Quantity<span className={styles.req}>*</span>
          </span>
          <span className={styles.accordionValue}>
            {form.quantity || "Select quantity"}
          </span>
          <span className={styles.chevron} aria-hidden="true" />
        </button>
        <div id="quantity-panel" className={styles.accordionPanelWrap}>
          <div className={styles.accordionPanelInner}>
            <div className={styles.pillRow}>
              {QUANTITIES.map((q) => (
                <button
                  type="button"
                  key={q}
                  className={`${styles.pill} ${form.quantity === q ? styles.pillActive : ""}`}
                  onClick={() => {
                    update("quantity", form.quantity === q ? "" : q);
                  }}
                >
                  {q}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <label className={styles.field}>
        <span className={styles.labelText}>Target Country / Port<span className={styles.req}>*</span></span>
        <input
          required
          placeholder="Example: Dubai, UAE / Jebel Ali Port"
          value={form.targetPort}
          onChange={(e) => update("targetPort", e.target.value)}
        />
      </label>

      <div className={styles.field}>
        Packaging Requirement
        <div className={styles.radioGrid}>
          {PACKAGING.map((p) => (
            <label key={p} className={styles.radioOption}>
              <input
                type="radio"
                name="packaging"
                checked={form.packaging === p}
                onChange={() => update("packaging", p)}
              />
              {p}
            </label>
          ))}
        </div>
      </div>

      <div className={styles.sectionLabel}>Your Message</div>
      <label className={styles.field}>
        Tell Us About Your Requirement
        <textarea
          placeholder="Please share product specifications, quantity, packaging requirements, destination market and expected delivery timeline."
          value={form.message}
          onChange={(e) => update("message", e.target.value)}
        />
      </label>

      <label className={styles.field}>
        Upload Product Specification / Requirement
        <input
          className={styles.fileInput}
          type="file"
          accept=".pdf,.doc,.docx,.xls,.xlsx,.jpg,.jpeg,.png"
          onChange={onFileChange}
        />
        <span className={styles.hint}>
          PDF, DOC, DOCX, XLS, XLSX, JPG, PNG — max 10 MB
        </span>
        {fileError && <span className={styles.fileError}>{fileError}</span>}
      </label>

      <button type="submit" className={styles.submit} disabled={status === "loading"}>
        {status === "loading" ? "Sending…" : "Send My Enquiry →"}
      </button>
      {status === "error" && (
        <p className={styles.error}>Something went wrong. Try again.</p>
      )}
      <p className={styles.privacy}>
        Your information is used only to respond to your business enquiry.{" "}
        <a href="/privacy-policy">Privacy Policy</a>
      </p>
    </form>
  );
}
