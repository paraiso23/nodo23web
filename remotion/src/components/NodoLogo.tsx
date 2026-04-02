import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { theme } from "../lib/theme";

interface NodoLogoProps {
  /** Frame at which the logo starts animating in */
  startFrame?: number;
  size?: "sm" | "md" | "lg";
  showDot?: boolean;
}

const sizes = {
  sm: { fontSize: 20, dotSize: 8 },
  md: { fontSize: 32, dotSize: 11 },
  lg: { fontSize: 52, dotSize: 16 },
};

export const NodoLogo: React.FC<NodoLogoProps> = ({
  startFrame = 0,
  size = "md",
  showDot = true,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const { fontSize, dotSize } = sizes[size];

  const progress = spring({
    frame: frame - startFrame,
    fps,
    config: { damping: 60, stiffness: 120, mass: 0.6 },
  });

  const opacity = interpolate(frame - startFrame, [0, 10], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Dot pulse: 0→1→0 on a 60-frame cycle
  const dotOpacity = interpolate(
    Math.sin(((frame - startFrame) / 60) * Math.PI * 2),
    [-1, 1],
    [0.45, 1]
  );

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: dotSize * 0.7,
        opacity,
        transform: `translateY(${interpolate(progress, [0, 1], [20, 0])}px)`,
      }}
    >
      <span
        style={{
          fontFamily: theme.font.mono,
          fontSize,
          fontWeight: 500,
          letterSpacing: "-0.01em",
          color: theme.text.primary,
          lineHeight: 1,
        }}
      >
        Nodo
        <span style={{ color: theme.accent.green }}>23</span>
      </span>
      {showDot && (
        <span
          style={{
            width: dotSize,
            height: dotSize,
            borderRadius: "50%",
            background: theme.accent.green,
            opacity: dotOpacity,
            flexShrink: 0,
          }}
        />
      )}
    </div>
  );
};
