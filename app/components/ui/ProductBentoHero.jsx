"use client";

import Image from "next/image";

export default function ProductBentoHero({
  product,
  accent = "oklch(43% 0.13 255)",
  images = [],
  specEntries = [],
  flavourSpec,
  added = false,
  handleAdd,
}) {
  const GN = "var(--navy)";
  const GNM = "var(--navy-muted)";
  const GB = "var(--blue)";
  const GBL = "var(--blue-light)";
  const GSF = "var(--bg)";
  const GS2 = "var(--bg-2)";
  const GSC = "var(--bg-card)";
  const BORDER = "var(--border)";
  const BORDER_LIGHT = "var(--border-light)";

  const img0 = images?.[0] || images?.[1] || "";
  const img1 = images?.[1] || images?.[0] || "";

  const specs = Array.isArray(specEntries) ? specEntries.filter(Boolean) : [];
  const topSpecs = specs.slice(0, 3);
  const moreSpecs = specs.slice(3, 7);
  const certs = Array.isArray(product?.certifications)
    ? product.certifications.slice(0, 3)
    : [];
  const tags = Array.isArray(product?.tags) ? product.tags.slice(0, 4) : [];
  const packs = Array.isArray(product?.packaging)
    ? product.packaging.slice(0, 3)
    : [];

  const label = {
    fontFamily: "var(--font-montserrat)",
    fontSize: "clamp(0.52rem, 0.58rem + 0.1vw, 0.66rem)",
    fontWeight: 700,
    letterSpacing: "0.16em",
    textTransform: "uppercase",
  };

  const body = {
    fontFamily: "var(--font-montserrat)",
    fontSize: "clamp(0.72rem, 0.7rem + 0.16vw, 0.9rem)",
    lineHeight: 1.45,
    fontWeight: 500,
  };

  const serif = {
    fontFamily: "var(--font-montserrat)",
    letterSpacing: "-0.035em",
    lineHeight: 0.98,
    fontWeight: 700,
  };

  const card = (extra = {}) => ({
    position: "relative",
    overflow: "hidden",
    borderRadius: 18,
    background: GSC,
    border: `1px solid ${BORDER_LIGHT}`,
    ...extra,
  });

  const pad = "clamp(14px, 1.2vw, 20px)";

  const sectionLabel = (text, dark = false) => (
    <div
      style={{
        ...label,
        color: dark ? "rgba(245,247,250,0.58)" : "oklch(22% 0.07 255 / 0.38)",
        marginBottom: 10,
      }}
    >
      {text}
    </div>
  );

  return (
    <div
      style={{
        width: "100%",
        height: "100svh",
        display: "grid",
        gridTemplateColumns: "1.08fr 0.92fr 0.92fr 0.98fr",
        gridTemplateRows: "0.95fr 0.95fr 0.9fr",
        gap: 8,
        padding: 8,
        background: GS2,
      }}
    >
      <div
        style={{ ...card({ gridColumn: 1, gridRow: "1 / 3", border: "none" }) }}
      >
        {img0 ? (
          <Image
            src={img0}
            alt={product?.name || "product image"}
            fill
            sizes="40vw"
            style={{ objectFit: "cover" }}
          />
        ) : null}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(180deg, rgba(13,43,85,0.12) 0%, rgba(13,43,85,0.82) 100%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            padding: pad,
            display: "flex",
            flexDirection: "column",
            zIndex: 2,
          }}
        >
          {sectionLabel("Product", true)}
          <div style={{ marginTop: "auto", maxWidth: "82%" }}>
            <div
              style={{
                ...serif,
                fontSize: "clamp(2rem, 2.6vw, 3.15rem)",
                color: GSF,
                marginBottom: 10,
              }}
            >
              {product?.name || "Product Name"}
            </div>
            <div
              style={{
                ...body,
                color: "rgba(245,247,250,0.76)",
                maxWidth: 360,
              }}
            >
              {product?.description ||
                `${product?.grade || "Export grade"} product sourced from ${product?.origin || "India"}. Built for bulk shipments and repeat trade.`}
            </div>
          </div>
        </div>
      </div>

      <div
        style={{
          ...card({ gridColumn: "2 / 4", gridRow: 1, background: GBL }),
        }}
      >
        <div
          style={{
            padding: pad,
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <div>
            {sectionLabel("Source Origin")}
            <div
              style={{
                ...serif,
                fontSize: "clamp(1.6rem, 2vw, 2.4rem)",
                color: GN,
              }}
            >
              {(product?.origin || "Unjha, Gujarat").toUpperCase()}
            </div>
          </div>
          <div style={{ ...body, color: "oklch(22% 0.07 255 / 0.68)" }}>
            {product?.grade || "Bold Export Grade"}
          </div>
        </div>
      </div>

      <div
        style={{
          ...card({
            gridColumn: 4,
            gridRow: "1 / 2",
            background: GB,
            border: "none",
          }),
        }}
      >
        <div
          style={{
            padding: pad,
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          {sectionLabel("Minimum Order", true)}
          <div>
            <div
              style={{
                ...serif,
                fontSize: "clamp(2.6rem, 4.2vw, 4.8rem)",
                color: GSF,
                marginBottom: 4,
              }}
            >
              {product?.moqOptions && product.moqOptions.length > 0
                ? product.moqOptions[0]
                : product?.moq || "5 MT"}
            </div>
            {product?.moqOptions && product.moqOptions.length > 1 ? (
              <div style={{ fontSize: "0.8rem", color: "rgba(245,247,250,0.72)" }}>
                {product.moqOptions.slice(1).join(" · ")}
              </div>
            ) : null}
            <div
              style={{
                ...label,
                color: "rgba(245,247,250,0.52)",
                letterSpacing: "0.08em",
              }}
            >
              Bulk · Export Ready
            </div>
          </div>
        </div>
      </div>

      <div
        style={{
          gridColumn: "2 / 4",
          gridRow: 2,
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          gap: 8,
        }}
      >
        {(topSpecs.length
          ? topSpecs
          : [
              ["purity", ">99.5%"],
              ["moisture", "<10%"],
              ["type", product?.grade || "Export"],
            ]
        ).map(([k, v], i) => {
          const dark = i === 1 || i === 2;
          const bg = i === 0 ? GSC : i === 1 ? "oklch(25% 0.06 255)" : GN;
          const fg = dark ? GSF : GN;
          const subtle = dark
            ? "rgba(245,247,250,0.54)"
            : "oklch(22% 0.07 255 / 0.35)";
          return (
            <div
              key={k}
              className="bento-cell"
              style={{
                ...card({
                  background: bg,
                  border: dark ? "none" : `1px solid ${BORDER_LIGHT}`,
                }),
              }}
            >
              <div
                style={{
                  padding: pad,
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <div style={{ ...label, color: subtle }}>
                  {String(k).replace(/-/g, " ")}
                </div>
                <div
                  style={{
                    ...serif,
                    fontSize: "clamp(1.1rem, 1.5vw, 1.8rem)",
                    color: fg,
                  }}
                >
                  {v}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div style={{ ...card({ gridColumn: 4, gridRow: 2, border: "none" }) }}>
        {img1 ? (
          <Image
            src={img1}
            alt={product?.name || "product detail image"}
            fill
            sizes="20vw"
            style={{ objectFit: "cover" }}
          />
        ) : null}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(180deg, rgba(13,43,85,0.06) 0%, rgba(13,43,85,0.72) 100%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 2,
            padding: pad,
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
          }}
        >
          <div
            style={{
              ...label,
              color: "rgba(245,247,250,0.56)",
              marginBottom: 6,
            }}
          >
            {specs?.[0]?.[0]
              ? String(specs[0][0]).replace(/-/g, " ")
              : "Quality"}
          </div>
          <div
            style={{
              ...serif,
              fontSize: "clamp(1.25rem, 1.8vw, 2.05rem)",
              color: GSF,
            }}
          >
            {specs?.[0]?.[1] || "> 99.5%"}
          </div>
        </div>
      </div>

      <div style={{ ...card({ gridColumn: 1, gridRow: 3, background: GBL }) }}>
        <div
          style={{
            padding: pad,
            height: "100%",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {sectionLabel("Certified")}
          <div style={{ marginTop: "auto", display: "grid", gap: 8 }}>
            {certs.length ? (
              certs.map((c, i) => (
                <div
                  key={c}
                  className="bento-cell"
                  style={{
                    padding: "10px 12px",
                    background: i === 0 ? GN : "rgba(245,247,250,0.82)",
                    color: i === 0 ? GSF : GN,
                    borderRadius: 12,
                    border: i === 0 ? "none" : `1px solid ${BORDER}`,
                    ...label,
                    letterSpacing: "0.08em",
                  }}
                >
                  {c}
                </div>
              ))
            ) : (
              <div style={{ ...body, color: GN }}>
                FSSAI · EU Organic · Export documentation available
              </div>
            )}
          </div>
        </div>
      </div>

      <div style={{ ...card({ gridColumn: 2, gridRow: 3, background: GSC }) }}>
        <div
          style={{
            padding: pad,
            height: "100%",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {sectionLabel("Packaging Options")}
          <div style={{ display: "grid", gap: 8, marginBottom: 12 }}>
            {(packs.length
              ? packs
              : ["25 kg PP bags", "1 kg retail packs (OEM)", "Custom"]
            )
              .slice(0, 3)
              .map((p, i) => (
                <div
                  key={p}
                  className="bento-cell"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "10px 12px",
                    background: i === 1 ? GBL : i === 2 ? GB : GSF,
                    color: i === 2 ? GSF : GN,
                    borderRadius: 12,
                    border: i === 2 ? "none" : `1px solid ${BORDER_LIGHT}`,
                    ...body,
                    fontWeight: 600,
                  }}
                >
                  <span>{p}</span>
                  <span
                    style={{
                      width: 18,
                      height: 18,
                      borderRadius: 999,
                      background: i === 2 ? GSF : i === 1 ? GN : GB,
                      flexShrink: 0,
                    }}
                  />
                </div>
              ))}
          </div>
          <div
            style={{
              ...label,
              color: "oklch(22% 0.07 255 / 0.35)",
              marginBottom: 8,
            }}
          >
            Export Tags
          </div>
          <div
            style={{
              display: "flex",
              gap: 6,
              flexWrap: "wrap",
              marginTop: "auto",
            }}
          >
            {(tags.length
              ? tags
              : ["Private Label", "Export Ready", "Bulk"]
            ).map((t, i) => (
              <div
                key={t}
                className="bento-cell"
                style={{
                  padding: "7px 10px",
                  borderRadius: 999,
                  background:
                    i === 0 ? GB : i === 1 ? GBL : "rgba(13,43,85,0.06)",
                  color: i === 2 ? GN : i === 0 ? GSF : GN,
                  ...label,
                  fontSize: "0.58rem",
                  letterSpacing: "0.08em",
                }}
              >
                {t}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div
        style={{
          ...card({
            gridColumn: "3 / 5",
            gridRow: 3,
            background: GN,
            border: "none",
          }),
        }}
      >
        <div
          style={{
            padding: pad,
            height: "100%",
            display: "grid",
            gridTemplateColumns: "1.15fr 0.85fr",
            gap: 14,
          }}
        >
          <div style={{ display: "flex", flexDirection: "column" }}>
            {sectionLabel("Specifications", true)}
            <div style={{ display: "grid", gap: 8, marginTop: "auto" }}>
              {(moreSpecs.length ? moreSpecs : specs.slice(0, 4))
                .slice(0, 4)
                .map(([k, v]) => (
                  <div
                    key={k}
                    className="bento-cell"
                    style={{
                      display: "grid",
                      gridTemplateColumns: "0.9fr 1.1fr",
                      gap: 10,
                      paddingBottom: 8,
                      borderBottom: "1px solid rgba(245,247,250,0.08)",
                    }}
                  >
                    <div style={{ ...label, color: "rgba(245,247,250,0.46)" }}>
                      {String(k).replace(/-/g, " ")}
                    </div>
                    <div style={{ ...body, color: GSF, fontWeight: 600 }}>
                      {v}
                    </div>
                  </div>
                ))}
            </div>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              borderLeft: "1px solid rgba(245,247,250,0.1)",
              paddingLeft: 14,
            }}
          >
            <div>
              {sectionLabel("Enquiry", true)}
              <div
                style={{
                  ...body,
                  color: "rgba(245,247,250,0.74)",
                  maxWidth: 240,
                }}
              >
                {flavourSpec
                  ? `Available variants: ${Array.isArray(flavourSpec) ? flavourSpec.join(", ") : flavourSpec}.`
                  : "Clean product summary with direct actions."}
              </div>
            </div>
            <div style={{ display: "grid", gap: 8 }}>
              <button
                onClick={handleAdd}
                style={{
                  height: 42,
                  borderRadius: 999,
                  border: "none",
                  background: GBL,
                  color: GN,
                  ...label,
                  letterSpacing: "0.12em",
                  cursor: "pointer",
                  fontSize: "0.72rem",
                  fontWeight: 800,
                }}
              >
                {added ? "Added" : "Add to Enquiry"}
              </button>
              <a
                href="https://wa.me/919427191459"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  height: 42,
                  borderRadius: 999,
                  border: "1px solid rgba(245,247,250,0.16)",
                  color: GSF,
                  textDecoration: "none",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  ...label,
                  letterSpacing: "0.12em",
                  fontSize: "0.72rem",
                }}
              >
                WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}