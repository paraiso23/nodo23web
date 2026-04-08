/**
 * AgendaCard — Agenda visual 4 pasos para el streaming
 * Estilo: bicromatico retrofuturista (parchment + charcoal)
 *
 * Formato: 1080×1080 @ 30fps, 8s = 240 frames
 *
 * Render:
 *   npx remotion render AgendaCard --output ../out/agenda.mp4
 *   npx remotion still AgendaCard --frame=200 --output ../out/agenda-preview.png
 */
import React from "react";
import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
} from "remotion";
import { GraphPaper } from "../components/GraphPaper";
import { PixelDisplay } from "../components/PixelDisplay";
import { RetroBarChart } from "../components/RetroBarChart";
import { RetroDataRows } from "../components/RetroDataRows";
import { retro } from "../lib/theme-retro";

export interface AgendaStep {
  number: string;
  title: string;
  detail?: string;
  duration?: string;
}

export interface AgendaCardProps {
  steps?: AgendaStep[];
  date?: string;
  time?: string;
  subtitle?: string;
}

export const DEFAULT_AGENDA_PROPS: AgendaCardProps = {
  steps: [
    {
      number: "01",
      title: "Instalar OpenClaw desde cero",
      detail: "Terminal. Sin preparación previa.",
      duration: "~15min",
    },
    {
      number: "02",
      title: "Darle acceso al correo",
      detail: "Gmail de demo. Conexión en vivo.",
      duration: "~5min",
    },
    {
      number: "03",
      title: "Ver cómo gestiona un email solo",
      detail: "Sin tocar el teclado.",
      duration: "~10min",
    },
    {
      number: "04",
      title: "Preguntas abiertas",
      detail: "Tu caso concreto. Sin filtro.",
      duration: "~15min",
    },
  ],
  date: "JUE 9 ABRIL",
  time: "19:00h",
  subtitle: "Sin script. Sin edición. Si algo falla, lo vemos en directo.",
};

const TICKER = "NODO23 · AGENDA.DIRECTO · JUE.09.ABR · 19:00h · OPENCLAW · COWORKING.LIVE · ";

export const AgendaCard: React.FC<AgendaCardProps> = ({
  steps = DEFAULT_AGENDA_PROPS.steps,
  date = DEFAULT_AGENDA_PROPS.date,
  time = DEFAULT_AGENDA_PROPS.time,
  subtitle = DEFAULT_AGENDA_PROPS.subtitle,
}) => {
  const frame = useCurrentFrame();

  // ── Timing (240 frames = 8s @ 30fps) ───────────────────────
  // 0-20:   grid + ticker
  // 5-40:   pixel "23" scans in
  // 25-60:  bar chart grows
  // 40-70:  header info
  // Step reveals: 70, 108, 146, 184 (every 38 frames)
  // 200-240: data rows + status

  const gridOpacity = interpolate(frame, [0, 20], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const pixelScan = interpolate(frame, [5, 40], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const barGrow = interpolate(frame, [25, 65], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const headerOpacity = interpolate(frame, [40, 65], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const stepReveal = (steps ?? []).map((_, i) => {
    const start = 70 + i * 38;
    return interpolate(frame, [start, start + 20], [0, 1], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    });
  });

  const tickOpacity = (steps ?? []).map((_, i) => {
    const start = 85 + i * 38;
    return interpolate(frame, [start, start + 15], [0, 1], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    });
  });

  const dataRowReveal = interpolate(frame, [200, 235], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const tickerOffset = -(frame * 2.4) % (TICKER.length * 9.6);

  const TICKER_H = 40;
  const SIDE_COL = 200;
  const PAD = 52;
  const UPPER_H = 300;

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
            fontSize: 11,
            color: retro.ink,
            letterSpacing: "0.06em",
            transform: `translateX(${tickerOffset}px)`,
          }}
        >
          {TICKER.repeat(8)}
        </div>
      </div>

      {/* ── MAIN AREA ───────────────────────────────────────────── */}
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
          {/* UPPER: pixel art + header */}
          <div
            style={{
              height: UPPER_H,
              padding: PAD,
              paddingBottom: 20,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              borderBottom: `1px solid ${retro.ink}`,
              overflow: "hidden",
            }}
          >
            <PixelDisplay
              text="23"
              dotSize={22}
              gap={7}
              scanProgress={pixelScan}
            />

            {/* Date + subtitle */}
            <div style={{ opacity: headerOpacity }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "baseline",
                  gap: 10,
                  marginBottom: 6,
                }}
              >
                <span
                  style={{
                    fontFamily: retro.font,
                    fontSize: 22,
                    fontWeight: 700,
                    color: retro.ink,
                    letterSpacing: "0.02em",
                  }}
                >
                  {date}
                </span>
                <span
                  style={{
                    fontFamily: retro.font,
                    fontSize: 18,
                    color: retro.ink,
                    opacity: 0.5,
                  }}
                >
                  · {time}
                </span>
              </div>
              <div
                style={{
                  fontFamily: retro.font,
                  fontSize: 12,
                  color: retro.ink,
                  opacity: 0.5,
                  lineHeight: 1.4,
                }}
              >
                {subtitle}
              </div>
            </div>
          </div>

          {/* LOWER: agenda steps */}
          <div
            style={{
              flex: 1,
              padding: PAD,
              paddingTop: 24,
              display: "flex",
              flexDirection: "column",
              gap: 14,
            }}
          >
            {(steps ?? []).map((step, i) => (
              <div
                key={i}
                style={{
                  opacity: stepReveal[i],
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 16,
                  padding: "12px 16px",
                  border: `1px solid ${retro.ink}`,
                  borderLeftWidth: 3,
                }}
              >
                {/* Step number */}
                <span
                  style={{
                    fontFamily: retro.font,
                    fontSize: 20,
                    fontWeight: 700,
                    color: retro.ink,
                    flexShrink: 0,
                    lineHeight: 1,
                    opacity: 0.35,
                    marginTop: 2,
                  }}
                >
                  {step.number}
                </span>

                {/* Content */}
                <div style={{ flex: 1 }}>
                  <div
                    style={{
                      fontFamily: retro.font,
                      fontSize: 16,
                      fontWeight: 600,
                      color: retro.ink,
                      lineHeight: 1.25,
                    }}
                  >
                    {step.title}
                  </div>
                  {step.detail && (
                    <div
                      style={{
                        fontFamily: retro.font,
                        fontSize: 12,
                        color: retro.ink,
                        opacity: 0.5,
                        marginTop: 3,
                      }}
                    >
                      {step.detail}
                    </div>
                  )}
                </div>

                {/* Duration + tick */}
                <div
                  style={{
                    opacity: tickOpacity[i],
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    flexShrink: 0,
                  }}
                >
                  {step.duration && (
                    <span
                      style={{
                        fontFamily: retro.font,
                        fontSize: 11,
                        color: retro.ink,
                        opacity: 0.4,
                      }}
                    >
                      {step.duration}
                    </span>
                  )}
                  <span
                    style={{
                      fontFamily: retro.font,
                      fontSize: 16,
                      color: retro.ink,
                      fontWeight: 700,
                    }}
                  >
                    [✓]
                  </span>
                </div>
              </div>
            ))}

            {/* Data rows at bottom */}
            <div style={{ marginTop: "auto", paddingTop: 8 }}>
              <RetroDataRows
                rowCount={3}
                revealProgress={dataRowReveal}
                fontSize={11}
                seed={99}
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
          <div
            style={{
              fontFamily: retro.font,
              fontSize: 11,
              color: retro.ink,
              opacity: 0.5,
              alignSelf: "flex-end",
              letterSpacing: "0.06em",
            }}
          >
            el.
          </div>

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
              barCount={22}
              barWidth={5}
              barGap={2}
              maxHeight={560}
              growProgress={barGrow}
            />
          </div>

          <div
            style={{
              fontFamily: retro.font,
              fontSize: 18,
              color: retro.ink,
              alignSelf: "flex-end",
              opacity: headerOpacity,
            }}
          >
            04_
          </div>

          <div style={{ alignSelf: "flex-end", opacity: barGrow }}>
            <RetroBarChart
              barCount={8}
              barWidth={7}
              barGap={2}
              maxHeight={65}
              growProgress={barGrow}
            />
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
