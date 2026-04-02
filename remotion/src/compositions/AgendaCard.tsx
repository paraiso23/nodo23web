/**
 * AgendaCard — Agenda visual 4 pasos para el streaming (Mar 7)
 *
 * Formato: 1080×1080 @ 30fps, 8s = 240 frames
 *
 * Render:
 *   npx remotion render AgendaCard --output ../out/agenda.mp4
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
import { theme } from "../lib/theme";

export interface AgendaStep {
  number: string;
  title: string;
  detail?: string;
  duration?: string;
}

export interface AgendaCardProps {
  steps?: AgendaStep[];
  date?: string;
  time?: string;
  subtitle?: string;
}

export const DEFAULT_AGENDA_PROPS: AgendaCardProps = {
  steps: [
    {
      number: "①",
      title: "Instalar OpenClaw desde cero",
      detail: "Terminal. Sin preparación previa.",
      duration: "~15 min",
    },
    {
      number: "②",
      title: "Darle acceso al correo",
      detail: "Gmail de demo. Conexión en vivo.",
      duration: "~5 min",
    },
    {
      number: "③",
      title: "Ver cómo gestiona un email solo",
      detail: "Sin tocar el teclado.",
      duration: "~10 min",
    },
    {
      number: "④",
      title: "Preguntas abiertas",
      detail: "Tu caso concreto. Sin filtro.",
      duration: "~15 min",
    },
  ],
  date: "JUE 9 ABRIL",
  time: "19:00h",
  subtitle: "Sin script. Sin edición. Si algo falla, lo vemos en directo.",
};

function useStepAnim(stepIndex: number, fps: number) {
  const frame = useCurrentFrame();
  // Steps appear one by one: step 0 at frame 40, then every 35 frames
  const startFrame = 40 + stepIndex * 38;

  const progress = spring({
    frame: frame - startFrame,
    fps,
    config: { damping: 58, stiffness: 110, mass: 0.75 },
  });

  const opacity = interpolate(frame - startFrame, [0, 15], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return {
    opacity,
    transform: `translateX(${interpolate(progress, [0, 1], [-24, 0])}px)`,
  };
}

// Tick mark that appears after the step slides in
function useTickAnim(stepIndex: number, fps: number) {
  const frame = useCurrentFrame();
  const startFrame = 40 + stepIndex * 38 + 18; // appears slightly after the step
  return interpolate(frame - startFrame, [0, 12], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
}

export const AgendaCard: React.FC<AgendaCardProps> = ({
  steps = DEFAULT_AGENDA_PROPS.steps,
  date = DEFAULT_AGENDA_PROPS.date,
  time = DEFAULT_AGENDA_PROPS.time,
  subtitle = DEFAULT_AGENDA_PROPS.subtitle,
}) => {
  const { fps } = useVideoConfig();
  const frame = useCurrentFrame();

  const headerOpacity = interpolate(frame, [0, 20], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const lastStepEnd = 40 + ((steps ?? []).length - 1) * 38 + 30;
  const ctaOpacity = interpolate(frame - lastStepEnd, [0, 25], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ background: theme.bg.dark }}>
      <GridBackground showGlow glowColor={theme.accent.green} gridOpacity={0.025} />

      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "column",
          padding: 64,
          justifyContent: "space-between",
        }}
      >
        {/* Header */}
        <div style={{ opacity: headerOpacity }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: 8,
            }}
          >
            <NodoLogo startFrame={0} size="sm" />
            <span
              style={{
                fontFamily: theme.font.mono,
                fontSize: 11,
                color: theme.text.secondary,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
              }}
            >
              // agenda del directo
            </span>
          </div>
          <div
            style={{ height: 1, background: theme.border.dark, marginTop: 20 }}
          />
        </div>

        {/* Date + subtitle */}
        <div style={{ opacity: headerOpacity }}>
          <div
            style={{
              display: "flex",
              alignItems: "baseline",
              gap: 12,
              marginBottom: 8,
            }}
          >
            <span
              style={{
                fontFamily: theme.font.mono,
                fontSize: 30,
                fontWeight: 500,
                color: theme.accent.green,
              }}
            >
              📅 {date}
            </span>
            <span
              style={{
                fontFamily: theme.font.mono,
                fontSize: 24,
                color: "rgba(255,255,255,0.4)",
              }}
            >
              · {time}
            </span>
          </div>
          <p
            style={{
              fontFamily: theme.font.sans,
              fontSize: 16,
              color: "rgba(255,255,255,0.4)",
              margin: 0,
              lineHeight: 1.5,
            }}
          >
            {subtitle}
          </p>
        </div>

        {/* Steps */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", gap: 20 }}>
          {(steps ?? []).map((step, i) => {
            const anim = useStepAnim(i, fps);
            const tickOpacity = useTickAnim(i, fps);

            return (
              <div
                key={i}
                style={{
                  ...anim,
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 20,
                  background: "rgba(255,255,255,0.02)",
                  border: `1px solid ${theme.border.dark}`,
                  borderRadius: 10,
                  padding: "16px 20px",
                }}
              >
                {/* Step number */}
                <span
                  style={{
                    fontFamily: theme.font.mono,
                    fontSize: 28,
                    color: theme.accent.green,
                    lineHeight: 1,
                    flexShrink: 0,
                    marginTop: 2,
                  }}
                >
                  {step.number}
                </span>

                {/* Content */}
                <div style={{ flex: 1 }}>
                  <p
                    style={{
                      fontFamily: theme.font.sans,
                      fontSize: 18,
                      fontWeight: 500,
                      color: theme.text.primary,
                      margin: 0,
                      lineHeight: 1.3,
                    }}
                  >
                    {step.title}
                  </p>
                  {step.detail && (
                    <p
                      style={{
                        fontFamily: theme.font.sans,
                        fontSize: 14,
                        color: "rgba(255,255,255,0.4)",
                        margin: "4px 0 0",
                      }}
                    >
                      {step.detail}
                    </p>
                  )}
                </div>

                {/* Duration + tick */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    flexShrink: 0,
                    opacity: tickOpacity,
                  }}
                >
                  {step.duration && (
                    <span
                      style={{
                        fontFamily: theme.font.mono,
                        fontSize: 12,
                        color: "rgba(255,255,255,0.3)",
                      }}
                    >
                      {step.duration}
                    </span>
                  )}
                  <span
                    style={{
                      fontFamily: theme.font.mono,
                      fontSize: 18,
                      color: theme.accent.green,
                    }}
                  >
                    ✓
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div
          style={{
            opacity: ctaOpacity,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            paddingTop: 20,
            borderTop: `1px solid ${theme.border.dark}`,
          }}
        >
          <span
            style={{
              fontFamily: theme.font.sans,
              fontSize: 16,
              color: "rgba(255,255,255,0.4)",
            }}
          >
            Gratis para todos los miembros.
          </span>
          <span
            style={{
              fontFamily: theme.font.mono,
              fontSize: 16,
              color: theme.accent.green,
            }}
          >
            nodo23.co 🦞
          </span>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
