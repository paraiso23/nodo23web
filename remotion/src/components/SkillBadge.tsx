import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { theme } from "../lib/theme";
import type { Skill } from "../lib/skills";

interface SkillBadgeProps {
  skill: Skill;
  startFrame?: number;
  /** index used for stagger delay */
  index?: number;
}

export const SkillBadge: React.FC<SkillBadgeProps> = ({
  skill,
  startFrame = 0,
  index = 0,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const stagger = index * 6;

  const progress = spring({
    frame: frame - startFrame - stagger,
    fps,
    config: { damping: 60, stiffness: 120, mass: 0.7 },
  });

  const opacity = interpolate(frame - startFrame - stagger, [0, 12], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const translateY = interpolate(progress, [0, 1], [16, 0]);

  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 8,
        background: `${skill.color}14`,
        border: `1px solid ${skill.color}30`,
        borderRadius: 6,
        padding: "6px 12px",
        opacity,
        transform: `translateY(${translateY}px)`,
      }}
    >
      <span
        style={{
          width: 6,
          height: 6,
          borderRadius: "50%",
          background: skill.color,
          flexShrink: 0,
        }}
      />
      <span
        style={{
          fontFamily: theme.font.mono,
          fontSize: 13,
          color: skill.color,
          letterSpacing: "0.02em",
        }}
      >
        {skill.name}
      </span>
      <span
        style={{
          fontFamily: theme.font.sans,
          fontSize: 12,
          color: "rgba(255,255,255,0.45)",
        }}
      >
        {skill.shortDesc}
      </span>
    </div>
  );
};
