/**
 * RetroBarChart — thin vertical bar histogram, bichromatic.
 * Heights are seeded-random so they're deterministic across frames.
 * growProgress (0–1): bars grow from 0 to their target height.
 */
import React from "react";
import { retro } from "../lib/theme-retro";

function seeded(n: number): number {
  const x = Math.sin(n * 127.1 + 311.7) * 43758.5453;
  return x - Math.floor(x);
}

interface RetroBarChartProps {
  barCount?: number;
  barWidth?: number;
  barGap?: number;
  maxHeight?: number;
  growProgress?: number; // 0–1
  color?: string;
}

export const RetroBarChart: React.FC<RetroBarChartProps> = ({
  barCount = 28,
  barWidth = 5,
  barGap = 3,
  maxHeight = 300,
  growProgress = 1,
  color,
}) => {
  const ink = color ?? retro.ink;
  const totalWidth = barCount * (barWidth + barGap) - barGap;

  const bars = Array.from({ length: barCount }, (_, i) => {
    // Seeded height: 20–100% of maxHeight, biased toward medium-high
    const raw = seeded(i + 7);
    const h = (0.2 + raw * 0.8) * maxHeight * growProgress;
    return h;
  });

  return (
    <div
      style={{
        display: "flex",
        alignItems: "flex-end",
        gap: barGap,
        width: totalWidth,
        height: maxHeight,
      }}
    >
      {bars.map((h, i) => (
        <div
          key={i}
          style={{
            width: barWidth,
            height: h,
            background: ink,
            flexShrink: 0,
          }}
        />
      ))}
    </div>
  );
};
