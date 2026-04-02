/**
 * HeroReel — Reel principal de marca Nodo23 (1280×720, 15s)
 *
 * Secuencia:
 *   0–60:    Logo + eyebrow
 *   60–120:  Headline typewriter "Sistemas, no Sermones."
 *   120–200: Terminal abre + `openclaw skills --list`
 *   200–360: 6 skills en cascada con SkillBadge
 *   360–420: CTA "nodo23.co — Únete gratis"
 *   420–450: Fade out suave
 *
 * Render:
 *   npx remotion render HeroReel --output ../out/hero-reel.mp4
 */
import React from "react";
import {
  AbsoluteFill,
  interpolate,
  Sequence,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { GridBackground } from "../components/GridBackground";
import { NodoLogo } from "../components/NodoLogo";
import { SkillBadge } from "../components/SkillBadge";
import { Terminal } from "../components/Terminal";
import { skills } from "../lib/skills";
import { theme } from "../lib/theme";

function useTypewriter(text: string, startFrame: number, cps: number) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const elapsed = Math.max(0, frame - startFrame);
  const visible = Math.floor(elapsed * (cps / fps));
  return text.slice(0, Math.min(visible, text.length));
}

export const HeroReel: React.FC = () => {
  const { fps } = useVideoConfig();
  const frame = useCurrentFrame();

  // Overall fade out at the end
  const fadeOut = interpolate(frame, [420, 450], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Logo area
  const logoOpacity = interpolate(frame, [0, 20], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Eyebrow badge
  const eyebrowProg = spring({
    frame: frame - 10,
    fps,
    config: { damping: 60, stiffness: 120, mass: 0.7 },
  });
  const eyebrowOpacity = interpolate(frame - 10, [0, 15], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Headline
  const headline1 = useTypewriter("Tienes 12 apps de IA abiertas.", 60, 30);
  const headline2 = useTypewriter("Ninguna produce.", 110, 28);

  const h1Opacity = interpolate(frame, [58, 68], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const h2Opacity = interpolate(frame, [108, 118], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Subhead
  const subOpacity = interpolate(frame, [140, 160], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Terminal lines for openclaw skills --list
  const terminalLines = [
    {
      text: "$ openclaw skills --list",
      startFrame: 205,
      color: "#5b9cf4",
      cps: 30,
    },
    {
      text: "",
      startFrame: 235,
      color: "rgba(255,255,255,0.2)",
      cps: 999,
    },
    ...skills.map((s, i) => ({
      text: `  ${s.name.padEnd(18)} ${s.shortDesc}`,
      startFrame: 238 + i * 18,
      color: s.color,
      cps: 60,
    })),
    {
      text: "",
      startFrame: 238 + skills.length * 18,
      color: "rgba(255,255,255,0.2)",
      cps: 999,
    },
    {
      text: `${skills.length} skills · sistema activo`,
      startFrame: 238 + skills.length * 18 + 5,
      color: theme.accent.green,
      cps: 40,
    },
  ];

  // Skills grid badges (appear after terminal)
  const skillsBadgesStart = 360;
  const skillsOpacity = interpolate(frame, [358, 372], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // CTA
  const ctaOpacity = interpolate(frame, [405, 425], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const ctaProg = spring({
    frame: frame - 405,
    fps,
    config: { damping: 55, stiffness: 100, mass: 0.8 },
  });

  return (
    <AbsoluteFill style={{ background: theme.bg.dark, opacity: fadeOut }}>
      <GridBackground showGlow glowColor={theme.accent.green} gridOpacity={0.03} />

      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "column",
          padding: "48px 72px",
          gap: 0,
        }}
      >
        {/* ── Row 1: Logo + eyebrow ── */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: 40,
          }}
        >
          <div style={{ opacity: logoOpacity }}>
            <NodoLogo startFrame={0} size="md" />
          </div>

          <div
            style={{
              opacity: eyebrowOpacity,
              transform: `translateX(${interpolate(eyebrowProg, [0, 1], [16, 0])}px)`,
              display: "flex",
              alignItems: "center",
              gap: 8,
              border: `1px solid ${theme.border.dark}`,
              borderRadius: 20,
              padding: "4px 14px",
            }}
          >
            <span
              style={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                background: theme.accent.green,
              }}
            />
            <span
              style={{
                fontFamily: theme.font.mono,
                fontSize: 11,
                color: theme.text.secondary,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
              }}
            >
              OpenClaw · Skills de IA · Soberanía Digital
            </span>
          </div>
        </div>

        {/* ── Row 2: Headline ── */}
        <div style={{ marginBottom: 24 }}>
          <p
            style={{
              fontFamily: theme.font.sans,
              fontSize: 18,
              color: "rgba(255,255,255,0.35)",
              margin: 0,
              marginBottom: 10,
              opacity: h1Opacity,
            }}
          >
            {headline1}
          </p>
          <h1
            style={{
              fontFamily: theme.font.sans,
              fontSize: 64,
              fontWeight: 600,
              margin: 0,
              lineHeight: 1.05,
              letterSpacing: "-0.025em",
              background: "linear-gradient(90deg, #f6f6f6 0%, rgba(246,246,246,0.35) 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              opacity: h2Opacity,
            }}
          >
            Todas consumen.
            <br />
            <span style={{ color: theme.accent.green, WebkitTextFillColor: theme.accent.green }}>
              {headline2}
            </span>
          </h1>
        </div>

        {/* ── Row 3: Subheadline ── */}
        <p
          style={{
            fontFamily: theme.font.sans,
            fontSize: 18,
            color: "rgba(255,255,255,0.45)",
            lineHeight: 1.6,
            margin: 0,
            marginBottom: 32,
            maxWidth: 620,
            opacity: subOpacity,
          }}
        >
          OpenClaw es el motor. Los skills son las piezas.
          <br />
          Tu Nodo es el sistema completo.
        </p>

        {/* ── Row 4: Terminal ── */}
        <Sequence from={190} durationInFrames={200}>
          <div style={{ marginBottom: 24 }}>
            <Terminal
              title="openclaw · nodo activo"
              lines={terminalLines}
              openFrame={0}
              width={580}
            />
          </div>
        </Sequence>

        {/* ── Row 5: Skills badges grid ── */}
        <Sequence from={skillsBadgesStart} durationInFrames={90}>
          <div
            style={{
              opacity: skillsOpacity,
              display: "flex",
              flexWrap: "wrap",
              gap: 12,
            }}
          >
            {skills.map((skill, i) => (
              <SkillBadge key={skill.id} skill={skill} startFrame={0} index={i} />
            ))}
          </div>
        </Sequence>

        {/* ── Row 6: CTA ── */}
        <Sequence from={405} durationInFrames={45}>
          <div
            style={{
              position: "absolute",
              bottom: 48,
              left: 72,
              right: 72,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              opacity: ctaOpacity,
              transform: `translateY(${interpolate(ctaProg, [0, 1], [20, 0])}px)`,
            }}
          >
            <div>
              <p
                style={{
                  fontFamily: theme.font.sans,
                  fontSize: 28,
                  fontWeight: 500,
                  color: theme.text.primary,
                  margin: 0,
                  marginBottom: 6,
                }}
              >
                Sistemas, no Sermones.
              </p>
              <p
                style={{
                  fontFamily: theme.font.sans,
                  fontSize: 16,
                  color: "rgba(255,255,255,0.4)",
                  margin: 0,
                }}
              >
                Freelancers · Solopreneurs · PYMEs — sin convertirte en técnico
              </p>
            </div>
            <div
              style={{
                background: theme.text.primary,
                borderRadius: 28,
                padding: "12px 28px",
              }}
            >
              <span
                style={{
                  fontFamily: theme.font.sans,
                  fontSize: 16,
                  fontWeight: 600,
                  color: theme.bg.dark,
                }}
              >
                nodo23.co — Únete gratis →
              </span>
            </div>
          </div>
        </Sequence>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
