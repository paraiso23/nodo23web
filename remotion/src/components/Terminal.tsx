import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { theme } from "../lib/theme";

interface TerminalLine {
  text: string;
  /** Frame at which this line starts typing */
  startFrame: number;
  /** chars per second (default 40) */
  cps?: number;
  color?: string;
}

interface TerminalProps {
  title?: string;
  lines: TerminalLine[];
  /** Frame at which the window opens */
  openFrame?: number;
  width?: number | string;
  /** Show blinking cursor on last active line */
  showCursor?: boolean;
}

function useTypewriter(
  text: string,
  startFrame: number,
  cps: number,
  fps: number,
  currentFrame: number
): string {
  const elapsed = Math.max(0, currentFrame - startFrame);
  const charsPerFrame = cps / fps;
  const visible = Math.floor(elapsed * charsPerFrame);
  return text.slice(0, Math.min(visible, text.length));
}

export const Terminal: React.FC<TerminalProps> = ({
  title = "openclaw · nodo activo",
  lines,
  openFrame = 0,
  width = "100%",
  showCursor = true,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const openProgress = spring({
    frame: frame - openFrame,
    fps,
    config: { damping: 55, stiffness: 100, mass: 0.8 },
  });

  const scaleY = interpolate(openProgress, [0, 1], [0, 1]);
  const opacity = interpolate(openProgress, [0, 0.2], [0, 1], {
    extrapolateRight: "clamp",
  });

  // Blinking cursor (every 30 frames)
  const cursorVisible = Math.floor(frame / 15) % 2 === 0;

  // Find the last line that has started but not finished
  let activeLine = -1;
  for (let i = 0; i < lines.length; i++) {
    const l = lines[i];
    const cps = l.cps ?? 40;
    const endFrame = l.startFrame + (l.text.length / cps) * fps;
    if (frame >= l.startFrame && frame < endFrame + fps * 0.5) {
      activeLine = i;
    }
  }

  return (
    <div
      style={{
        width,
        background: theme.bg.dark3,
        border: `1px solid rgba(255,255,255,0.1)`,
        borderRadius: 8,
        overflow: "hidden",
        boxShadow: "0 24px 80px rgba(0,0,0,0.65)",
        fontFamily: theme.font.mono,
        fontSize: 13,
        transform: `scaleY(${scaleY})`,
        transformOrigin: "top center",
        opacity,
      }}
    >
      {/* Title bar */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 6,
          padding: "10px 14px",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
          background: "rgba(255,255,255,0.02)",
        }}
      >
        <span
          style={{
            width: 10,
            height: 10,
            borderRadius: "50%",
            background: theme.termDots.red,
          }}
        />
        <span
          style={{
            width: 10,
            height: 10,
            borderRadius: "50%",
            background: theme.termDots.yellow,
          }}
        />
        <span
          style={{
            width: 10,
            height: 10,
            borderRadius: "50%",
            background: theme.termDots.green,
          }}
        />
        <span
          style={{
            marginLeft: "auto",
            marginRight: "auto",
            fontSize: 10,
            color: "rgba(255,255,255,0.3)",
            letterSpacing: "0.08em",
            textTransform: "uppercase",
          }}
        >
          {title}
        </span>
        {/* Live indicator */}
        <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
          <span
            style={{
              width: 6,
              height: 6,
              borderRadius: "50%",
              background: theme.accent.green,
              opacity: cursorVisible ? 1 : 0.4,
            }}
          />
          <span style={{ fontSize: 10, color: "rgba(255,255,255,0.2)" }}>
            live
          </span>
        </div>
      </div>

      {/* Body */}
      <div style={{ padding: "16px 20px", lineHeight: 2 }}>
        {lines.map((line, i) => {
          if (frame < line.startFrame) return null;
          const cps = line.cps ?? 40;
          const typed = useTypewriter(line.text, line.startFrame, cps, fps, frame);
          const isActive = i === activeLine;

          return (
            <div
              key={i}
              style={{
                color: line.color ?? "rgba(255,255,255,0.75)",
                display: "flex",
                alignItems: "center",
              }}
            >
              <span>{typed}</span>
              {showCursor && isActive && (
                <span
                  style={{
                    display: "inline-block",
                    width: 8,
                    height: 14,
                    background: theme.accent.green,
                    marginLeft: 2,
                    opacity: cursorVisible ? 1 : 0,
                  }}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
