/**
 * SkillLoop — Loop animado por skill (1080×1080, 5s)
 * Estilo: bicromatico retrofuturista (parchment + charcoal)
 *
 * Render:
 *   npx remotion render SkillLoop --props '{"skillIndex":0}' --output ../out/skill-nodo-bot.mp4
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

export interface SkillLoopProps {
  skillIndex?: number;
}

// Map skill index to a short 2-char code for the pixel display
const SKILL_CODES = ["B0", "NS", "NR", "S0", "NL", "N1"];
// Ticker per skill
const SKILL_TICKERS = [
  "OPENCLAW · SKILL.BOT · SOPORTE.24/7 · GMAIL · WHATSAPP · ACTIVO · ",
  "OPENCLAW · SKILL.SUMMARY · RESUME.DOCS · EMAILS · REUNIONES · ACTIVO · ",
  "OPENCLAW · SKILL.REPLY · BORRADORES · TU.TONO · INBOX.ZERO · ACTIVO · ",
  "OPENCLAW · SKILL.SEO · CONTENIDO · KEYWORDS · META.TAGS · ACTIVO · ",
  "OPENCLAW · SKILL.LEADS · CUALIFICA · HOT.LEADS · CRM.UPDATE · ACTIVO · ",
  "OPENCLAW · SKILL.INVOICE · FACTURAS · CONCILIA · SIN.ERRORES · ACTIVO · ",
];

export const SkillLoop: React.FC<SkillLoopProps> = ({ skillIndex = 0 }) => {
  const { fps } = useVideoConfig();
  const frame = useCurrentFrame();
  const skill = skills[skillIndex] ?? skills[0];
  const skillCode = SKILL_CODES[skillIndex] ?? "N0";
  const ticker = SKILL_TICKERS[skillIndex] ?? SKILL_TICKERS[0];

  // ── Timing (150 frames = 5s @ 30fps) ───────────────────────
  // 0-15:  grid + ticker fade in
  // 5-50:  pixel code scans in
  // 30-70: bar chart grows
  // 55-120: terminal lines reveal as data rows
  // 120-150: status line + logo

  const gridOpacity = interpolate(frame, [0, 15], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const pixelScan = interpolate(frame, [5, 50], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const barGrow = interpolate(frame, [30, 70], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const skillNameOpacity = interpolate(frame, [45, 65], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const cmdOpacity = interpolate(frame, [55, 75], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Terminal output lines appear one by one
  const outputLines = skill.output;
  const lineReveal = outputLines.map((_, i) =>
    interpolate(frame, [80 + i * 15, 95 + i * 15], [0, 1], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    })
  );

  const statusOpacity = interpolate(frame, [120, 140], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const dataRowReveal = interpolate(frame, [125, 150], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const tickerOffset = -(frame * 2.4) % (ticker.length * 9.6);

  const TICKER_H = 40;
  const SIDE_COL = 200;
  const PAD = 52;
  const UPPER_H = 380;

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
          {ticker.repeat(8)}
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
              text={skillCode}
              dotSize={28}
              gap={9}
              scanProgress={pixelScan}
            />
          </div>

          {/* LOWER: skill name + terminal data */}
          <div
            style={{
              flex: 1,
              padding: PAD,
              paddingTop: 28,
              display: "flex",
              flexDirection: "column",
              gap: 20,
            }}
          >
            {/* Skill name */}
            <div style={{ opacity: skillNameOpacity }}>
              <div
                style={{
                  fontFamily: retro.font,
                  fontSize: 11,
                  color: retro.ink,
                  opacity: 0.45,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  marginBottom: 8,
                }}
              >
                // openclaw · skill
              </div>
              <div
                style={{
                  fontFamily: retro.font,
                  fontSize: 34,
                  fontWeight: 700,
                  color: retro.ink,
                  letterSpacing: "-0.01em",
                  lineHeight: 1,
                  marginBottom: 6,
                }}
              >
                {skill.name}
              </div>
              <div
                style={{
                  fontFamily: retro.font,
                  fontSize: 14,
                  color: retro.ink,
                  opacity: 0.5,
                }}
              >
                {skill.tagline}
              </div>
            </div>

            {/* Command + output (terminal data) */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 4,
                borderLeft: `2px solid ${retro.ink}`,
                paddingLeft: 16,
              }}
            >
              <div
                style={{
                  opacity: cmdOpacity,
                  fontFamily: retro.font,
                  fontSize: 13,
                  color: retro.ink,
                  letterSpacing: "0.02em",
                  marginBottom: 4,
                }}
              >
                {skill.command}
              </div>
              {outputLines.map((line, i) => (
                <div
                  key={i}
                  style={{
                    opacity: lineReveal[i] * 0.7,
                    fontFamily: retro.font,
                    fontSize: 12,
                    color: retro.ink,
                    letterSpacing: "0.01em",
                  }}
                >
                  {line}
                </div>
              ))}
            </div>

            {/* Status bar */}
            <div
              style={{
                opacity: statusOpacity,
                display: "flex",
                alignItems: "center",
                gap: 10,
                padding: "8px 12px",
                border: `1px solid ${retro.ink}`,
                marginTop: "auto",
              }}
            >
              <div
                style={{
                  width: 7,
                  height: 7,
                  borderRadius: "50%",
                  background: retro.ink,
                  flexShrink: 0,
                }}
              />
              <span
                style={{
                  fontFamily: retro.font,
                  fontSize: 11,
                  color: retro.ink,
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                }}
              >
                {skill.name} · activo · {skill.shortDesc}
              </span>
            </div>

            {/* Data rows */}
            <RetroDataRows
              rowCount={3}
              revealProgress={dataRowReveal}
              fontSize={11}
              seed={skillIndex * 17 + 5}
            />
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
              maxHeight={520}
              growProgress={barGrow}
            />
          </div>

          <div
            style={{
              fontFamily: retro.font,
              fontSize: 18,
              color: retro.ink,
              alignSelf: "flex-end",
              opacity: skillNameOpacity,
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

          {/* Nodo23 signature */}
          <div
            style={{
              fontFamily: retro.font,
              fontSize: 10,
              color: retro.ink,
              opacity: 0.35,
              letterSpacing: "0.08em",
              alignSelf: "flex-end",
              writingMode: "vertical-rl",
              textTransform: "uppercase",
            }}
          >
            nodo23
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
