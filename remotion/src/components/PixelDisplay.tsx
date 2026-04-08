/**
 * PixelDisplay — renders a string as a dot-matrix (LED display) pixel art.
 *
 * "On" dots render at full ink opacity.
 * "Off" dots render at scatter opacity — creates the halo/field effect.
 *
 * scanProgress (0–1): animates a scan-line revealing the dots top-to-bottom.
 */
import React from "react";
import { retro, PIXEL_FONT } from "../lib/theme-retro";

interface PixelDisplayProps {
  text: string;
  dotSize?: number;
  gap?: number;
  color?: string;
  offOpacity?: number;
  scanProgress?: number; // 0 = hidden, 1 = fully revealed
}

export const PixelDisplay: React.FC<PixelDisplayProps> = ({
  text,
  dotSize = 24,
  gap = 8,
  color,
  offOpacity = 0.08,
  scanProgress = 1,
}) => {
  const ink = color ?? retro.ink;
  const step = dotSize + gap;
  const chars = text.toUpperCase().split("");
  const rows = 7;
  const cols = 5;
  const charWidth = cols * step;
  const charGap = step * 2; // gap between characters
  const totalWidth = chars.length * charWidth + (chars.length - 1) * charGap;
  const totalHeight = rows * step;

  // How many rows are revealed (scanProgress 0→1 maps to 0→rows)
  const revealedRows = scanProgress * rows;

  return (
    <div
      style={{
        position: "relative",
        width: totalWidth,
        height: totalHeight,
        flexShrink: 0,
      }}
    >
      {chars.map((char, ci) => {
        const bitmap = PIXEL_FONT[char] ?? PIXEL_FONT[" "];
        const charX = ci * (charWidth + charGap);

        return bitmap.map((row, ri) =>
          row.map((cell, coli) => {
            const x = charX + coli * step;
            const y = ri * step;
            const isOn = cell === 1;

            // Scan-line: rows below the reveal threshold are hidden
            const revealed = ri < revealedRows;
            const alpha = revealed
              ? isOn
                ? 1
                : offOpacity
              : 0;

            if (alpha === 0) return null;

            return (
              <div
                key={`${ci}-${ri}-${coli}`}
                style={{
                  position: "absolute",
                  left: x,
                  top: y,
                  width: dotSize,
                  height: dotSize,
                  background: ink,
                  opacity: alpha,
                  borderRadius: 2,
                }}
              />
            );
          })
        );
      })}
    </div>
  );
};
