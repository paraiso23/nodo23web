/**
 * EventFlyer — Flyer del evento de coworking
 * Estilo: bicromatico retrofuturista (parchment + charcoal)
 *
 * Composiciones:
 *   EventFlyerSquare  1080×1080  (IG Post)
 *   EventFlyerStory   1080×1920  (IG/TG Story)
 *
 * Render:
 *   npx remotion still EventFlyerSquare --frame=149 --output ../out/flyer-square.png
 *   npx remotion still EventFlyerStory  --frame=149 --output ../out/flyer-story.png
 */
import React from "react";
import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { GraphPaper } from "../components/GraphPaper";
import { PixelDisplay } from "../components/PixelDisplay";
import { RetroBarChart } from "../components/RetroBarChart";
import { RetroDataRows } from "../components/RetroDataRows";
import { retro } from "../lib/theme-retro";

export interface EventFlyerProps {
  format: "square" | "story";
  title?: string;
  subtitle?: string;
  dates?: Array<{ label: string; time: string }>;
  tagline?: string;
  url?: string;
}

export const DEFAULT_FLYER_PROPS: EventFlyerProps = {
  format: "square",
  title: "COWORKING EN DIRECTO",
  subtitle: "Montamos OpenClaw juntos.\nTú en casa. Yo en pantalla.",
  dates: [
    { label: "JUE 9 ABRIL", time: "19:00h" },
    { label: "SÁB 11 ABRIL", time: "11:00h" },
  ],
  tagline: "Gratis. Comunidad Nodo23.",
  url: "nodo23.co",
};

// Scrolling ticker text
const TICKER = "NODO23 · COWORKING.EN.DIRECTO · JUE.09.ABR · 19:00h · OPENCLAW · COMUNIDAD.LIBRE · SKILLS.ACTIVOS · ";

export const EventFlyer: React.FC<EventFlyerProps> = ({
  format = "square",
  title = DEFAULT_FLYER_PROPS.title,
  subtitle = DEFAULT_FLYER_PROPS.subtitle,
  dates = DEFAULT_FLYER_PROPS.dates,
  tagline = DEFAULT_FLYER_PROPS.tagline,
  url = DEFAULT_FLYER_PROPS.url,
}) => {
  const { fps, width, height } = useVideoConfig();
  const frame = useCurrentFrame();
  const isStory = format === "story";

  // ── Timing ──────────────────────────────────────────────────
  // 0-15:   grid fades in
  // 0-50:   pixel "23" scans in row by row
  // 30-70:  bar chart grows
  // 50-90:  title typewriter
  // 80-130: dates + tagline
  // 110-150: data rows appear

  const gridOpacity = interpolate(frame, [0, 15], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const pixelScan = interpolate(frame, [5, 50], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const barGrow = interpolate(frame, [30, 75], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const titleOpacity = interpolate(frame, [50, 75], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const date0Opacity = interpolate(frame, [80, 100], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const date1Opacity = interpolate(frame, [95, 115], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const taglineOpacity = interpolate(frame, [110, 130], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const dataRowReveal = interpolate(frame, [115, 150], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Ticker scroll: moves left at ~80px/s (about 2.67px/frame @ 30fps)
  const tickerOffset = -(frame * 2.4) % (TICKER.length * 9.6);

  // Layout
  const TICKER_H = isStory ? 44 : 40;
  const SIDE_COL = isStory ? 200 : 220;
  const PAD = isStory ? 48 : 56;
  const PIXEL_DOT = isStory ? 22 : 26;
  const PIXEL_GAP = isStory ? 7 : 9;

  const contentWidth = width - SIDE_COL;
  const UPPER_H = isStory ? 520 : 420;

  return (
    <AbsoluteFill style={{ background: retro.paper }}>

      {/* Graph paper grid */}
      <div style={{ opacity: gridOpacity, position: "absolute", inset: 0 }}>
        <GraphPaper cellSize={30} opacity={0.16} />
      </div>

      {/* ── TOP TICKER ─────────────────────────────────────────── */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: TICKER_H,
          borderBottom: `1px solid ${retro.ink}`,
          overflow: "hidden",
          display: "flex",
          alignItems: "center",
        }}
      >
        <div
          style={{
            whiteSpace: "nowrap",
            fontFamily: retro.font,
            fontSize: isStory ? 13 : 11,
            color: retro.ink,
            letterSpacing: "0.06em",
            transform: `translateX(${tickerOffset}px)`,
          }}
        >
          {TICKER.repeat(8)}
        </div>
      </div>

      {/* ── MAIN AREA (below ticker) ────────────────────────────── */}
      <div
        style={{
          position: "absolute",
          top: TICKER_H,
          left: 0,
          right: 0,
          bottom: 0,
          display: "flex",
        }}
      >
        {/* LEFT CONTENT */}
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            borderRight: `1px solid ${retro.ink}`,
          }}
        >
          {/* UPPER: pixel art */}
          <div
            style={{
              height: UPPER_H,
              padding: PAD,
              paddingBottom: 24,
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-end",
              borderBottom: `1px solid ${retro.ink}`,
              overflow: "hidden",
            }}
          >
            <PixelDisplay
              text="23"
              dotSize={PIXEL_DOT}
              gap={PIXEL_GAP}
              scanProgress={pixelScan}
            />
          </div>

          {/* LOWER: text content */}
          <div
            style={{
              flex: 1,
              padding: PAD,
              paddingTop: isStory ? 40 : 32,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            {/* Title */}
            <div style={{ opacity: titleOpacity }}>
              <div
                style={{
                  fontFamily: retro.font,
                  fontSize: isStory ? 14 : 11,
                  color: retro.ink,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  opacity: 0.5,
                  marginBottom: isStory ? 14 : 12,
                }}
              >
                // evento · coworking
              </div>
              <div
                style={{
                  fontFamily: retro.font,
                  fontSize: isStory ? 40 : 36,
                  fontWeight: 700,
                  color: retro.ink,
                  lineHeight: 1.1,
                  letterSpacing: "-0.01em",
                  marginBottom: 8,
                }}
              >
                {title}
              </div>
              {subtitle && (
                <div
                  style={{
                    fontFamily: retro.font,
                    fontSize: isStory ? 16 : 14,
                    color: retro.ink,
                    opacity: 0.55,
                    lineHeight: 1.5,
                    whiteSpace: "pre-line",
                  }}
                >
                  {subtitle}
                </div>
              )}
            </div>

            {/* Dates */}
            <div style={{ display: "flex", flexDirection: "column", gap: isStory ? 16 : 12 }}>
              {(dates ?? []).map((d, i) => (
                <div
                  key={i}
                  style={{
                    opacity: i === 0 ? date0Opacity : date1Opacity,
                    display: "flex",
                    alignItems: "baseline",
                    gap: 10,
                    borderLeft: `3px solid ${retro.ink}`,
                    paddingLeft: 14,
                  }}
                >
                  <span
                    style={{
                      fontFamily: retro.font,
                      fontSize: isStory ? 28 : 24,
                      fontWeight: 600,
                      color: retro.ink,
                      letterSpacing: "0.02em",
                    }}
                  >
                    {d.label}
                  </span>
                  <span
                    style={{
                      fontFamily: retro.font,
                      fontSize: isStory ? 22 : 18,
                      color: retro.ink,
                      opacity: 0.5,
                    }}
                  >
                    · {d.time}
                  </span>
                </div>
              ))}
            </div>

            {/* Tagline + URL */}
            <div
              style={{
                opacity: taglineOpacity,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-end",
                borderTop: `1px solid ${retro.ink}`,
                paddingTop: 16,
              }}
            >
              <span
                style={{
                  fontFamily: retro.font,
                  fontSize: isStory ? 14 : 12,
                  color: retro.ink,
                  opacity: 0.6,
                  letterSpacing: "0.04em",
                }}
              >
                {tagline}
              </span>
              <span
                style={{
                  fontFamily: retro.font,
                  fontSize: isStory ? 14 : 12,
                  color: retro.ink,
                  letterSpacing: "0.06em",
                  fontWeight: 600,
                }}
              >
                {url}
              </span>
            </div>

            {/* Data rows */}
            <div style={{ marginTop: 8 }}>
              <RetroDataRows
                rowCount={isStory ? 5 : 4}
                revealProgress={dataRowReveal}
                fontSize={isStory ? 12 : 11}
                seed={42}
              />
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: bar chart */}
        <div
          style={{
            width: SIDE_COL,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: "24px 16px",
            gap: 20,
            overflow: "hidden",
          }}
        >
          {/* "el." label top right */}
          <div
            style={{
              fontFamily: retro.font,
              fontSize: isStory ? 13 : 11,
              color: retro.ink,
              opacity: 0.5,
              letterSpacing: "0.08em",
              alignSelf: "flex-end",
            }}
          >
            el.
          </div>

          {/* Bar chart fills the column */}
          <div
            style={{
              flex: 1,
              display: "flex",
              alignItems: "flex-end",
              width: "100%",
              overflow: "hidden",
            }}
          >
            <RetroBarChart
              barCount={isStory ? 20 : 24}
              barWidth={isStory ? 5 : 5}
              barGap={isStory ? 3 : 2}
              maxHeight={isStory ? 700 : 560}
              growProgress={barGrow}
            />
          </div>

          {/* "04_" cursor */}
          <div
            style={{
              fontFamily: retro.font,
              fontSize: isStory ? 20 : 18,
              color: retro.ink,
              letterSpacing: "0.02em",
              alignSelf: "flex-end",
              opacity: titleOpacity,
            }}
          >
            04_
          </div>

          {/* Secondary mini bars */}
          <div style={{ alignSelf: "flex-end", opacity: barGrow }}>
            <RetroBarChart
              barCount={8}
              barWidth={isStory ? 8 : 7}
              barGap={2}
              maxHeight={isStory ? 80 : 70}
              growProgress={barGrow}
            />
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

export const EventFlyerSquare: React.FC<Omit<EventFlyerProps, "format">> = (
  props
) => <EventFlyer {...props} format="square" />;

export const EventFlyerStory: React.FC<Omit<EventFlyerProps, "format">> = (
  props
) => <EventFlyer {...props} format="story" />;
