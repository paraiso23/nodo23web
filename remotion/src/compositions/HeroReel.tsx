/**
 * HeroReel — Reel principal de marca Nodo23 (1280×720, 15s)
 * Estilo: bicromatico retrofuturista (parchment + charcoal)
 *
 * Secuencia:
 *   0–60:    Grid + ticker + logo "23" pixel scan
 *   60–120:  Headline typewriter
 *   120–220: Skills cascade (data rows)
 *   220–340: Command output + bar chart fills
 *   340–420: CTA
 *   420–450: Fade out
 *
 * Render:
 *   npx remotion render HeroReel --output ../out/hero-reel.mp4
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
import { skills } from "../lib/skills";

function useTypewriter(text: string, startFrame: number, cps: number) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const elapsed = Math.max(0, frame - startFrame);
  const visible = Math.floor(elapsed * (cps / fps));
  return text.slice(0, Math.min(visible, text.length));
}

const TICKER = "NODO23 · SISTEMAS.DE.IA · OPENCLAW · SKILLS.ACTIVOS · SOBERANIA.DIGITAL · FREELANCERS · SOLOPRENEURS · PYMES · ";

export const HeroReel: React.FC = () => {
  const frame = useCurrentFrame();

  // ── Timing ───────────────────────────────────────────────────
  const gridOpacity = interpolate(frame, [0, 15], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const pixelScan = interpolate(frame, [5, 55], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const barGrow = interpolate(frame, [40, 100], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Headline
  const h1 = useTypewriter("SISTEMAS, NO SERMONES.", 60, 28);
  const h2 = useTypewriter("Skills de IA que trabajan mientras duermes.", 110, 32);

  const h1Opacity = interpolate(frame, [58, 72], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const h2Opacity = interpolate(frame, [108, 120], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Skills cascade (each skill appears as a data line)
  const skillLineOpacity = skills.map((_, i) =>
    interpolate(frame, [130 + i * 18, 148 + i * 18], [0, 1], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    })
  );

  // Command + output section
  const cmdOpacity = interpolate(frame, [230, 250], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // CTA
  const ctaOpacity = interpolate(frame, [340, 370], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Data rows
  const dataRowReveal = interpolate(frame, [260, 330], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Fade out
  const fadeOut = interpolate(frame, [420, 450], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const tickerOffset = -(frame * 2.8) % (TICKER.length * 9.6);

  const TICKER_H = 40;
  const SIDE_COL = 220;
  const PAD_X = 60;
  const PAD_Y = 48;
  const UPPER_H = 280;

  return (
    <AbsoluteFill style={{ background: retro.paper, opacity: fadeOut }}>

      {/* Graph paper grid */}
      <div style={{ opacity: gridOpacity, position: "absolute", inset: 0 }}>
        <GraphPaper cellSize={28} opacity={0.15} />
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
          {TICKER.repeat(6)}
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
          {/* UPPER: pixel "23" + headline */}
          <div
            style={{
              height: UPPER_H,
              padding: `${PAD_Y}px ${PAD_X}px`,
              paddingBottom: 20,
              display: "flex",
              flexDirection: "row",
              alignItems: "flex-end",
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

            {/* Headline */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-end",
                maxWidth: 460,
              }}
            >
              <div
                style={{
                  opacity: h1Opacity,
                  fontFamily: retro.font,
                  fontSize: 32,
                  fontWeight: 700,
                  color: retro.ink,
                  letterSpacing: "-0.01em",
                  lineHeight: 1.1,
                  textAlign: "right",
                  marginBottom: 10,
                }}
              >
                {h1}
              </div>
              <div
                style={{
                  opacity: h2Opacity * 0.55,
                  fontFamily: retro.font,
                  fontSize: 14,
                  color: retro.ink,
                  lineHeight: 1.5,
                  textAlign: "right",
                }}
              >
                {h2}
              </div>
            </div>
          </div>

          {/* LOWER: skills list + command */}
          <div
            style={{
              flex: 1,
              padding: `24px ${PAD_X}px`,
              display: "flex",
              flexDirection: "column",
              gap: 12,
            }}
          >
            {/* Skills cascade */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 4,
              }}
            >
              {skills.map((skill, i) => (
                <div
                  key={skill.id}
                  style={{
                    opacity: skillLineOpacity[i],
                    display: "flex",
                    alignItems: "center",
                    gap: 16,
                    fontFamily: retro.font,
                    fontSize: 13,
                    color: retro.ink,
                    letterSpacing: "0.02em",
                  }}
                >
                  <span style={{ opacity: 0.35, width: 28, flexShrink: 0, fontWeight: 700 }}>
                    {String(i + 1).padStart(2, "0")}.
                  </span>
                  <span style={{ fontWeight: 600, width: 140, flexShrink: 0 }}>
                    {skill.name}
                  </span>
                  <span
                    style={{
                      opacity: 0.5,
                      flex: 1,
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {skill.tagline}
                  </span>
                  <span style={{ opacity: 0.3, flexShrink: 0, fontSize: 11 }}>
                    [activo]
                  </span>
                </div>
              ))}
            </div>

            {/* Command line */}
            <div
              style={{
                opacity: cmdOpacity,
                fontFamily: retro.font,
                fontSize: 12,
                color: retro.ink,
                borderLeft: `2px solid ${retro.ink}`,
                paddingLeft: 14,
                marginTop: 8,
              }}
            >
              $ openclaw skills --list --status=active
            </div>

            {/* Data rows */}
            <div style={{ marginTop: "auto" }}>
              <RetroDataRows
                rowCount={4}
                revealProgress={dataRowReveal}
                fontSize={11}
                seed={77}
              />
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div
          style={{
            width: SIDE_COL,
            display: "flex",
            flexDirection: "column",
            padding: "20px 16px",
            gap: 16,
            overflow: "hidden",
          }}
        >
          <div
            style={{
              fontFamily: retro.font,
              fontSize: 11,
              color: retro.ink,
              opacity: 0.45,
              alignSelf: "flex-end",
              letterSpacing: "0.06em",
            }}
          >
            el.
          </div>

          {/* Bar chart */}
          <div
            style={{
              flex: 1,
              display: "flex",
              alignItems: "flex-end",
              overflow: "hidden",
            }}
          >
            <RetroBarChart
              barCount={26}
              barWidth={4}
              barGap={2}
              maxHeight={460}
              growProgress={barGrow}
            />
          </div>

          {/* CTA box */}
          <div
            style={{
              opacity: ctaOpacity,
              border: `2px solid ${retro.ink}`,
              padding: "16px 14px",
              display: "flex",
              flexDirection: "column",
              gap: 8,
            }}
          >
            <div
              style={{
                fontFamily: retro.font,
                fontSize: 11,
                color: retro.ink,
                opacity: 0.45,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
              }}
            >
              // empieza aquí
            </div>
            <div
              style={{
                fontFamily: retro.font,
                fontSize: 20,
                fontWeight: 700,
                color: retro.ink,
                lineHeight: 1.1,
              }}
            >
              nodo23.co
            </div>
            <div
              style={{
                fontFamily: retro.font,
                fontSize: 11,
                color: retro.ink,
                opacity: 0.5,
              }}
            >
              €300 setup · €120/mes
            </div>
          </div>

          {/* 04_ cursor */}
          <div
            style={{
              fontFamily: retro.font,
              fontSize: 16,
              color: retro.ink,
              alignSelf: "flex-end",
              opacity: h1Opacity,
            }}
          >
            04_
          </div>

          {/* Mini bars */}
          <div style={{ alignSelf: "flex-end", opacity: barGrow }}>
            <RetroBarChart
              barCount={10}
              barWidth={6}
              barGap={2}
              maxHeight={55}
              growProgress={barGrow}
            />
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
