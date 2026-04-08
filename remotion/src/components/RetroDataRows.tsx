/**
 * RetroDataRows — dense alphanumeric data rows (decorative).
 * The style mimics industrial monitoring logs / hash data.
 * Rows fade in progressively from top.
 */
import React from "react";
import { retro } from "../lib/theme-retro";

const CHARS = "ABCDEFGHJKLMNOPQRSTUVWXYZ0123456789";
function seeded(n: number): number {
  const x = Math.sin(n * 91.3 + 44.5) * 99999.7;
  return x - Math.floor(x);
}
function randomChar(seed: number): string {
  return CHARS[Math.floor(seeded(seed) * CHARS.length)];
}

function generateCode(seed: number, parts = 5, partLen = 3): string {
  return Array.from({ length: parts }, (_, p) =>
    Array.from({ length: partLen }, (__, c) =>
      randomChar(seed * 100 + p * 10 + c)
    ).join("")
  ).join(".");
}

interface RetroDataRowsProps {
  rowCount?: number;
  revealProgress?: number; // 0–1, rows reveal from top
  fontSize?: number;
  opacity?: number;
  seed?: number;
}

export const RetroDataRows: React.FC<RetroDataRowsProps> = ({
  rowCount = 6,
  revealProgress = 1,
  fontSize = 14,
  opacity = 0.45,
  seed = 0,
}) => {
  const revealedCount = Math.ceil(revealProgress * rowCount);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
      {Array.from({ length: rowCount }, (_, i) => {
        if (i >= revealedCount) return null;
        const code = generateCode(seed + i * 13);
        return (
          <div
            key={i}
            style={{
              fontFamily: retro.font,
              fontSize,
              color: retro.ink,
              opacity,
              letterSpacing: "0.04em",
              whiteSpace: "nowrap",
            }}
          >
            {code}
          </div>
        );
      })}
    </div>
  );
};
