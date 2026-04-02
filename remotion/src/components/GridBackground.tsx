import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { theme } from "../lib/theme";

interface GridBackgroundProps {
  /** Opacity of the dot grid (default 0.03) */
  gridOpacity?: number;
  /** Show green radial glow in top center (default true) */
  showGlow?: boolean;
  glowColor?: string;
}

export const GridBackground: React.FC<GridBackgroundProps> = ({
  gridOpacity = 0.03,
  showGlow = true,
  glowColor = theme.accent.green,
}) => {
  const frame = useCurrentFrame();

  // Subtle pulsing glow
  const glowAlpha = interpolate(
    Math.sin((frame / 90) * Math.PI),
    [-1, 1],
    [0.05, 0.09]
  );

  return (
    <AbsoluteFill style={{ background: theme.bg.dark, overflow: "hidden" }}>
      {/* Dot grid */}
      <AbsoluteFill
        style={{
          opacity: gridOpacity,
          backgroundImage:
            "radial-gradient(circle, #fff 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      {/* Radial glow */}
      {showGlow && (
        <AbsoluteFill
          style={{
            background: `radial-gradient(ellipse at 50% -10%, ${glowColor}${Math.round(
              glowAlpha * 255
            )
              .toString(16)
              .padStart(2, "0")} 0%, transparent 65%)`,
            filter: "blur(40px)",
          }}
        />
      )}
    </AbsoluteFill>
  );
};
