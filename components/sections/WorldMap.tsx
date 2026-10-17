"use client";

import { useEffect, useMemo, useState } from "react";
import { geoEqualEarth, geoPath } from "d3-geo";
import { feature } from "topojson-client";
import styles from "./WorldMap.module.css";

/* ------------------------------------------------------------------
   Real, flat (2D), light-theme world map.
   Country geometry is loaded at runtime from world-atlas (Natural
   Earth 110m, via jsDelivr CDN) and rendered with d3-geo. This is an
   actual equal-earth projection of real coastlines/borders, not a
   hand-drawn illustration.
   ------------------------------------------------------------------ */

const TOPOJSON_URL =
  "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

const VIEW_W = 960;
const VIEW_H = 500;

const HUB = { city: "New Delhi", country: "India", lon: 77.2, lat: 28.6 };

type Lane = {
  id: string;
  city: string;
  country: string;
  lon: number;
  lat: number;
  side: "left" | "right";
};

const LANES: Lane[] = [
  { id: "was", city: "Washington, D.C.", country: "United States", lon: -77.0, lat: 38.9, side: "right" },
  { id: "lon", city: "London", country: "United Kingdom", lon: -0.13, lat: 51.5, side: "left" },
  { id: "ber", city: "Berlin", country: "Germany", lon: 13.4, lat: 52.5, side: "right" },
  { id: "abd", city: "Abu Dhabi", country: "United Arab Emirates", lon: 54.4, lat: 24.5, side: "left" },
  { id: "riy", city: "Riyadh", country: "Saudi Arabia", lon: 46.7, lat: 24.7, side: "left" },
  { id: "sin", city: "Singapore", country: "Singapore", lon: 103.8, lat: 1.35, side: "right" },
  { id: "tok", city: "Tokyo", country: "Japan", lon: 139.7, lat: 35.7, side: "right" },
  { id: "cbr", city: "Canberra", country: "Australia", lon: 149.1, lat: -35.3, side: "right" },
  { id: "pta", city: "Pretoria", country: "South Africa", lon: 28.2, lat: -25.7, side: "left" },
  { id: "bsb", city: "Brasilia", country: "Brazil", lon: -47.9, lat: -15.8, side: "left" },
];

type Geo = {
  type: string;
  properties: { name?: string };
  geometry: any;
};

export default function WorldMap() {
  const [countries, setCountries] = useState<Geo[]>([]);
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetch(TOPOJSON_URL)
      .then((res) => res.json())
      .then((topology) => {
        if (cancelled) return;
        const objectKey = Object.keys(topology.objects)[0];
        const geo = feature(topology, topology.objects[objectKey]) as unknown as {
          features: Geo[];
        };
        setCountries(geo.features);
      })
      .catch(() => {
        if (!cancelled) setCountries([]);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const projection = useMemo(
    () =>
      geoEqualEarth().scale(190).translate([VIEW_W / 2, VIEW_H / 2 + 10]),
    [],
  );

  const path = useMemo(() => geoPath(projection), [projection]);

  const project = (lon: number, lat: number) => {
    const p = projection([lon, lat]);
    return p ? { x: p[0], y: p[1] } : { x: 0, y: 0 };
  };

  const hub = project(HUB.lon, HUB.lat);

  const lanes = useMemo(
    () =>
      LANES.map((l) => {
        const pt = project(l.lon, l.lat);
        const mx = (hub.x + pt.x) / 2;
        const my = (hub.y + pt.y) / 2 - Math.abs(hub.x - pt.x) * 0.12;
        return {
          ...l,
          x: pt.x,
          y: pt.y,
          d: `M ${hub.x.toFixed(2)} ${hub.y.toFixed(2)} Q ${mx.toFixed(2)} ${my.toFixed(2)} ${pt.x.toFixed(2)} ${pt.y.toFixed(2)}`,
        };
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [hub.x, hub.y],
  );

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.head}>
          <div>
            <span className={styles.eyebrow}>Global reach</span>
            <h2 className={styles.title}>
              One origin in India,{" "}
              <span className={styles.titleSoft}>ten capital-city lanes.</span>
            </h2>
          </div>
          <p className={styles.lead}>
            Every consignment starts at our New Delhi hub and ships against a
            fixed Incoterm to the destination capital shown on the map.
          </p>
        </div>

        <ul className={styles.legend}>
          <li className={styles.legendItem}>
            <span className={`${styles.legendDot} ${styles.legendHub}`} />
            Origin hub
          </li>
          <li className={styles.legendItem}>
            <span className={styles.legendLine} />
            Export lane
          </li>
          <li className={styles.legendItem}>
            <span className={`${styles.legendDot} ${styles.legendDest}`} />
            Destination capital
          </li>
        </ul>

        <div className={styles.stage}>
          <svg
            className={styles.svg}
            viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
            role="img"
            aria-label="World map showing export lanes from New Delhi"
          >
            <rect className={styles.ocean} x="0" y="0" width={VIEW_W} height={VIEW_H} />

            {countries.map((c, i) => {
              const isIndia = c.properties?.name === "India";
              return (
                <path
                  key={c.properties?.name ?? i}
                  d={path(c as any) ?? undefined}
                  className={isIndia ? styles.india : styles.land}
                />
              );
            })}

            {lanes.map((l) => {
              const dim = active !== null && active !== l.id;
              return (
                <path
                  key={l.id}
                  d={l.d}
                  className={dim ? styles.laneDim : styles.laneOn}
                />
              );
            })}

            {lanes.map((l) => (
              <circle
                key={`dot-${l.id}`}
                cx={l.x}
                cy={l.y}
                r={3.2}
                className={styles.destDotSvg}
              />
            ))}

            <circle cx={hub.x} cy={hub.y} r={8} className={styles.hubRing} />
            <circle cx={hub.x} cy={hub.y} r={4} className={styles.hubDot} />
          </svg>

          <div className={styles.labels}>
            <div
              className={styles.hubLabel}
              style={{ left: `${(hub.x / VIEW_W) * 100}%`, top: `${(hub.y / VIEW_H) * 100}%` }}
            >
              <div className={styles.hubLabelInner}>
                <strong>{HUB.city}</strong>
                <em>{HUB.country} / Origin</em>
              </div>
            </div>

            {lanes.map((l) => (
              <button
                key={l.id}
                type="button"
                className={`${styles.destLabel} ${l.side === "left" ? styles.destLeft : styles.destRight} ${active === l.id ? styles.destActive : ""}`}
                style={{ left: `${(l.x / VIEW_W) * 100}%`, top: `${(l.y / VIEW_H) * 100}%` }}
                onMouseEnter={() => setActive(l.id)}
                onMouseLeave={() => setActive(null)}
                onFocus={() => setActive(l.id)}
                onBlur={() => setActive(null)}
              >
                <span className={styles.destPin} />
                <span className={styles.destText}>
                  <strong>{l.city}</strong>
                  <em>{l.country}</em>
                </span>
              </button>
            ))}
          </div>
        </div>

        <div className={styles.footRow}>
          <div className={styles.footStat}>
            <strong>{LANES.length}</strong>
            <span>Capital-city lanes running from New Delhi</span>
          </div>
          <div className={styles.footStat}>
            <strong>5</strong>
            <span>Continents served across the network</span>
          </div>
          <div className={styles.footStat}>
            <strong>EXW / FOB / CIF</strong>
            <span>Incoterms quoted on every lane</span>
          </div>
        </div>
      </div>
    </section>
  );
}
