/**
 * SkillLoop — Loop animado por skill (1080×1080, 5s, loop)
 *
 * Composiciones: SkillLoop (parametrizada por skillIndex 0-5)
 *
 * Render:
 *   npx remotion render SkillLoop --props '{"skillIndex":0}' --output ../out/skill-nodo_bot.mp4
 *   npx remotion render SkillLoop --props '{"skillIndex":1}' --output ../out/skill-nodo_summary.mp4
 *   ... etc
 */
import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { GridBackground } from "../components/GridBackground";
import { NodoLogo } from "../components/NodoLogo";
import { Terminal } from "../components/Terminal";
import { theme } from "../lib/theme";
import { skills } from "../lib/skills";

export interface SkillLoopProps {
  skillIndex?: number;
}

export const SkillLoop: React.FC<SkillLoopProps> = ({ skillIndex = 0 }) => {
  const { fps } = useVideoConfig();
  const frame = useCurrentFrame();
  const skill = skills[skillIndex] ?? skills[0];

  // Timing (150 frames = 5s @ 30fps)
  // 0-25:   Background + skill name springs in
  // 25-55:  Tagline fades in
  // 55-120: Terminal opens + lines type one by one
  // 120-140: Result pulse
  // 140-150: Logo fades in

  const nameProg = spring({
    frame,
    fps,
    config: { damping: 55, stiffness: 110, mass: 0.7 },
  });
  const nameOpacity = interpolate(frame, [0, 15], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const taglineOpacity = interpolate(frame, [25, 45], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const logoOpacity = interpolate(frame, [138, 150], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Build terminal lines with staggered start frames
  const FPS_PER_LINE = 22; // frames between each output line
  const terminalLines = [
    {
      text: skill.command,
      startFrame: 55,
      color: "#5b9cf4", // keyword blue
      cps: 35,
    },
    ...skill.output.map((line, i) => ({
      text: line,
      startFrame: 80 + i * FPS_PER_LINE,
      color:
        i === skill.output.length - 1
          ? theme.accent.green
          : "rgba(255,255,255,0.65)",
      cps: 45,
    })),
  ];

  // Accent glow color derived from skill
  const glowColor = skill.color;

  // Result pulse at frame 120
  const pulseFade = interpolate(frame, [118, 130], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ background: theme.bg.dark }}>
      <GridBackground showGlow glowColor={glowColor} gridOpacity={0.03} />

      {/* Accent stripe on left */}
      <div
        style={{
          position: "absolute",
          left: 0,
          top: "20%",
          bottom: "20%",
          width: 4,
          background: skill.color,
          borderRadius: "0 2px 2px 0",
          opacity: nameOpacity,
        }}
      />

      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "column",
          padding: 64,
          justifyContent: "space-between",
        }}
      >
        {/* Top: skill name + tagline */}
        <div>
          {/* eyebrow */}
          <div
            style={{
              opacity: nameOpacity,
              fontFamily: theme.font.mono,
              fontSize: 12,
              color: "rgba(255,255,255,0.3)",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              marginBottom: 16,
            }}
          >
            // openclaw · skill
          </div>

          {/* Skill name */}
          <h1
            style={{
              fontFamily: theme.font.mono,
              fontSize: 64,
              fontWeight: 500,
              color: skill.color,
              margin: 0,
              letterSpacing: "-0.01em",
              lineHeight: 1,
              opacity: nameOpacity,
              transform: `translateY(${interpolate(nameProg, [0, 1], [24, 0])}px)`,
              marginBottom: 16,
            }}
          >
            {skill.name}
          </h1>

          {/* Tagline */}
          <p
            style={{
              fontFamily: theme.font.sans,
              fontSize: 24,
              fontWeight: 300,
              color: "rgba(255,255,255,0.55)",
              margin: 0,
              opacity: taglineOpacity,
            }}
          >
            {skill.tagline}
          </p>
        </div>

        {/* Terminal */}
        <div
          style={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            paddingTop: 40,
            paddingBottom: 40,
          }}
        >
          <Terminal
            title={`openclaw · ${skill.name}`}
            lines={terminalLines}
            openFrame={50}
            width="100%"
            showCursor
          />
        </div>

        {/* Pulse indicator at end */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            opacity: pulseFade,
            background: `${skill.color}12`,
            border: `1px solid ${skill.color}30`,
            borderRadius: 8,
            padding: "10px 16px",
          }}
        >
          <span
            style={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              background: skill.color,
              flexShrink: 0,
            }}
          />
          <span
            style={{
              fontFamily: theme.font.mono,
              fontSize: 14,
              color: skill.color,
            }}
          >
            {skill.name} activo
          </span>
          <span
            style={{
              marginLeft: "auto",
              fontFamily: theme.font.sans,
              fontSize: 13,
              color: "rgba(255,255,255,0.35)",
            }}
          >
            {skill.shortDesc}
          </span>
        </div>

        {/* Logo fade in at end */}
        <div
          style={{
            opacity: logoOpacity,
            display: "flex",
            justifyContent: "flex-end",
            marginTop: 20,
          }}
        >
          <NodoLogo startFrame={0} size="sm" showDot />
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
