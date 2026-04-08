/**
 * GraphPaper — graph paper background (fine grid lines)
 * Renders a grid of lines in the ink color at very low opacity.
 */
import React from "react";
import { AbsoluteFill } from "remotion";
import { retro } from "../lib/theme-retro";

interface GraphPaperProps {
  cellSize?: number;    // px between grid lines (default 30)
  opacity?: number;     // overall grid opacity (default 0.18)
}

export const GraphPaper: React.FC<GraphPaperProps> = ({
  cellSize = 30,
  opacity = 0.18,
}) => {
  return (
    <AbsoluteFill
      style={{
        backgroundImage: `
          linear-gradient(${retro.ink} 1px, transparent 1px),
          linear-gradient(90deg, ${retro.ink} 1px, transparent 1px)
        `,
        backgroundSize: `${cellSize}px ${cellSize}px`,
        opacity,
        pointerEvents: "none",
      }}
    />
  );
};
