"use client";

import { useEffect, useMemo, useState } from "react";
import { geoGraticule10, geoMercator, geoPath } from "d3-geo";
import { feature } from "topojson-client";
import type { Feature, Geometry } from "geojson";
import type { GeometryCollection, Topology } from "topojson-specification";
import { exportMarkets } from "@/data/export-markets";
import styles from "./WorldMap.module.css";

// Natural Earth 10m admin-0 "India point of view" boundaries (public domain), cropped to
// Asia and simplified into /public/data/asia-india.json. It draws India's official
// boundary, including all of Jammu and Kashmir, Ladakh and Arunachal Pradesh.
const MAP_DATA_URL = "/data/asia-india.json";

const VIEW_W = 960;
const VIEW_H = 560;
const HUB = { city: "Mumbai", region: "Maharashtra", country: "India", lon: 72.8777, lat: 19.076 };

type Destination = {
  id: string;
  city: string;
  country: string;
  lon: number;
  lat: number;
  side: "left" | "right";
  labelX: number;
  labelY: number;
};

// Target export markets. Connections are illustrative, not claims about existing routes.
// Labels sit a short step from their marker (viewBox units); the Gulf trio fans out so none collide.
const LABELS: Record<string, Pick<Destination, "side" | "labelX" | "labelY">> = {
  "Saudi Arabia": { side: "left", labelX: 163, labelY: 214 },
  "United Arab Emirates": { side: "left", labelX: 266, labelY: 188 },
  Oman: { side: "right", labelX: 328, labelY: 248 },
  Nepal: { side: "right", labelX: 644, labelY: 158 },
  Bangladesh: { side: "right", labelX: 704, labelY: 214 },
  "Sri Lanka": { side: "left", labelX: 552, labelY: 446 },
  Singapore: { side: "right", labelX: 862, labelY: 478 },
};

const DESTINATIONS: Destination[] = exportMarkets.map((market) => ({
  id: market.country.toLowerCase().replace(/\s+/g, "-"),
  city: market.city,
  country: market.country,
  lon: market.lon,
  lat: market.lat,
  ...LABELS[market.country],
}));

// Countries shaded as active export markets.
const marketNames = new Set(exportMarkets.map((market) => market.country));

type Shape = Feature<Geometry, { NAME?: string; name?: string }>;
type Props = { NAME?: string; name?: string };
type WorldTopology = Topology<{
  countries: GeometryCollection<Props>;
  outline: GeometryCollection<Props>;
  states_all: GeometryCollection<Props>;
}>;
type MapShapes = { countries: Shape[]; outline: Shape[]; states: Shape[] };

// Only the origin state is drawn inside India; the rest of the country is one shape.
const ORIGIN_STATE = "Maharashtra";

export default function WorldMap() {
  const [shapes, setShapes] = useState<MapShapes>({ countries: [], outline: [], states: [] });
  const [active, setActive] = useState<string | null>(null);
  const [loadState, setLoadState] = useState<"loading" | "ready" | "error">("loading");
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    let cancelled = false;
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 12000);

    fetch(MAP_DATA_URL, { signal: controller.signal })
      .then((res) => {
        if (!res.ok) throw new Error("Map request failed");
        return res.json() as Promise<WorldTopology>;
      })
      .then((topology) => {
        const next: MapShapes = {
          countries: feature(topology, topology.objects.countries).features,
          outline: feature(topology, topology.objects.outline).features,
          states: feature(topology, topology.objects.states_all).features,
        };
        if (!next.countries.length || !next.states.length) throw new Error("Map geometry unavailable");
        if (!cancelled) {
          setShapes(next);
          setLoadState("ready");
        }
      })
      .catch(() => {
        if (!cancelled) setLoadState("error");
      })
      .finally(() => clearTimeout(timeout));

    return () => {
      cancelled = true;
      clearTimeout(timeout);
      controller.abort();
    };
  }, [attempt]);

  const { path, graticule, hub, destinations } = useMemo(() => {
    // Mercator is the flat, north-up map people expect. Frame lon 33 to 112, lat -4 to 40.
    const projection = geoMercator().fitExtent(
      [[0, 0], [VIEW_W, VIEW_H]],
      { type: "MultiPoint", coordinates: [[33, -4], [112, 40]] },
    );
    const project = (lon: number, lat: number) => {
      const point = projection([lon, lat])!;
      return { x: point[0], y: point[1] };
    };
    const hub = project(HUB.lon, HUB.lat);
    const destinations = DESTINATIONS.map((destination) => {
      const point = project(destination.lon, destination.lat);
      const mx = (hub.x + point.x) / 2;
      const my = (hub.y + point.y) / 2 - Math.abs(hub.x - point.x) * 0.12;
      return {
        ...destination,
        ...point,
        d: `M ${hub.x.toFixed(2)} ${hub.y.toFixed(2)} Q ${mx.toFixed(2)} ${my.toFixed(2)} ${point.x.toFixed(2)} ${point.y.toFixed(2)}`,
      };
    });
    return { path: geoPath(projection), graticule: geoGraticule10(), hub, destinations };
  }, []);

  return (
    <section className={styles.section} aria-labelledby="global-reach-heading">
      <div className={styles.container}>
        <div className={styles.head}>
          <div>
            <span className={styles.eyebrow}>Global reach</span>
            <h2 id="global-reach-heading" className={styles.title}>
              Indian origins. <span className={styles.titleSoft}>Gulf and South Asia, first.</span>
            </h2>
          </div>
          <p id="global-reach-description" className={styles.lead}>
            We ship from Mumbai, Maharashtra to seven nearby markets where
            customs are fast and paperwork is simple. Routes, ports and delivery
            terms are agreed for each enquiry.
          </p>
        </div>

        <ul className={styles.legend} aria-label="Map legend">
          <li className={styles.legendItem}>
            <span className={`${styles.legendDot} ${styles.legendHub}`} aria-hidden="true" />
            Origin reference
          </li>
          <li className={styles.legendItem}>
            <span className={styles.legendLine} aria-hidden="true" />
            Illustrative connection
          </li>
          <li className={styles.legendItem}>
            <span className={`${styles.legendDot} ${styles.legendDest}`} aria-hidden="true" />
            Destination marker
          </li>
        </ul>

        {loadState !== "ready" ? (
          <div className={styles.status}>
            <p role="status">
              {loadState === "loading"
                ? "Loading world map… Mumbai, Maharashtra, India is the origin reference."
                : "The world map could not load. Mumbai, Maharashtra, India is the origin reference; destinations are listed below."}
            </p>
            {loadState === "error" && (
              <button type="button" className={styles.retry} onClick={() => {
                setLoadState("loading");
                setAttempt((value) => value + 1);
              }}>
                Retry map
              </button>
            )}
          </div>
        ) : (
          <div className={styles.stage}>
            <svg
              className={styles.svg}
              viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
              role="img"
              aria-labelledby="world-map-title world-map-description"
            >
              <title id="world-map-title">Map of Asia and the Gulf with Mumbai, Maharashtra, India as the origin reference</title>
              <desc id="world-map-description">Illustrative connections to selected destination markers. Routes are agreed for each enquiry.</desc>
              <rect className={styles.ocean} x="0" y="0" width={VIEW_W} height={VIEW_H} />
              <path d={path(graticule) ?? undefined} className={styles.graticule} />
              {shapes.countries.map((country, index) => (
                <path
                  key={country.properties?.NAME ?? index}
                  d={path(country) ?? undefined}
                  className={marketNames.has(country.properties?.NAME ?? "") ? styles.market : styles.land}
                />
              ))}
              {shapes.outline.map((country) => (
                <path key="india-fill" d={path(country) ?? undefined} className={styles.indiaBase} />
              ))}
              {shapes.states
                .filter((state) => state.properties?.name === ORIGIN_STATE)
                .map((state) => (
                  <path key={ORIGIN_STATE} d={path(state) ?? undefined} className={styles.originState} />
                ))}
              {shapes.outline.map((country) => (
                <path key="india-outline" d={path(country) ?? undefined} className={styles.indiaOutline} />
              ))}
              {destinations.map((destination) => (
                <path
                  key={destination.id}
                  d={destination.d}
                  className={active !== null && active !== destination.id ? styles.laneDim : styles.laneOn}
                />
              ))}
              {destinations.map((destination) => (
                <line
                  key={`leader-${destination.id}`}
                  x1={destination.x}
                  y1={destination.y}
                  x2={destination.labelX}
                  y2={destination.labelY}
                  className={active !== null && active !== destination.id ? styles.labelLeaderDim : styles.labelLeader}
                />
              ))}
              {destinations.map((destination) => (
                <circle key={`dot-${destination.id}`} cx={destination.x} cy={destination.y} r={3.2} className={styles.destDotSvg} />
              ))}
              <circle cx={hub.x} cy={hub.y} r={8} className={styles.hubRing} />
              <circle cx={hub.x} cy={hub.y} r={4} className={styles.hubDot} />
            </svg>

            <div className={styles.labels}>
              <div className={styles.hubLabel} style={{ left: `${(hub.x / VIEW_W) * 100}%`, top: `${(hub.y / VIEW_H) * 100}%` }}>
                <div className={styles.hubLabelInner}>
                  <strong>{HUB.city}</strong>
                  <em>{HUB.region}, {HUB.country}</em>
                </div>
              </div>
              {destinations.map((destination) => (
                <button
                  key={destination.id}
                  type="button"
                  className={`${styles.destLabel} ${destination.side === "left" ? styles.destLeft : styles.destRight} ${active === destination.id ? styles.destActive : ""}`}
                  style={{ left: `${(destination.labelX / VIEW_W) * 100}%`, top: `${(destination.labelY / VIEW_H) * 100}%` }}
                  onMouseEnter={() => setActive(destination.id)}
                  onMouseLeave={() => setActive(null)}
                  onFocus={() => setActive(destination.id)}
                  onBlur={() => setActive(null)}
                  onClick={() => setActive(destination.id)}
                  aria-label={`${destination.city}, ${destination.country}: highlight map connection`}
                >
                  <span className={styles.destPin} aria-hidden="true" />
                  <span className={styles.destText}>
                    <strong>{destination.country}</strong>
                    <em>{destination.city}</em>
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}

        <ul className={`${styles.destinationList} ${loadState !== "ready" ? styles.destinationListVisible : ""}`} aria-label="Map destinations">
          {destinations.map((destination) => (
            <li key={destination.id}>
              {loadState === "ready" ? (
                <button
                  type="button"
                  className={`${styles.destinationButton} ${active === destination.id ? styles.destinationButtonActive : ""}`}
                  onClick={() => setActive(destination.id)}
                  onFocus={() => setActive(destination.id)}
                  onBlur={() => setActive(null)}
                  aria-label={`${destination.city}, ${destination.country}: highlight map connection`}
                >
                  <strong>{destination.country}</strong>
                  <span>{destination.city}</span>
                </button>
              ) : (
                <div className={styles.destinationText}>
                  <strong>{destination.country}</strong>
                  <span>{destination.city}</span>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
