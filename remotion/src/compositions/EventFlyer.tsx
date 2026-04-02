/**
 * EventFlyer — Flyer del evento de coworking
 *
 * Composiciones registradas:
 *   - EventFlyerSquare  1080×1080  (IG Post)
 *   - EventFlyerStory   1080×1920  (IG/TG Story)
 *
 * Render como PNG estático:
 *   npx remotion still EventFlyerSquare --output ../out/flyer-square.png
 *   npx remotion still EventFlyerStory  --output ../out/flyer-story.png
 *
 * Render como video animado:
 *   npx remotion render EventFlyerSquare --output ../out/flyer-square.mp4
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

export interface EventFlyerProps {
  format: "square" | "story";
  title?: string;
  subtitle?: string;
  dates?: Array<{ label: string; time: string }>;
  tagline?: string;
  url?: string;
}

export const DEFAULT_FLYER_PROPS: EventFlyerProps = {
  format: "square",
  title: "COWORKING EN DIRECTO",
  subtitle: "Montamos OpenClaw juntos.\nTú en casa. Yo en pantalla.",
  dates: [
    { label: "JUE 9 ABRIL", time: "19:00h" },
    { label: "SÁB 11 ABRIL", time: "11:00h" },
  ],
  tagline: "Gratis. Comunidad Nodo23.",
  url: "nodo23.co 🦞",
};

function useFade(startFrame: number, duration = 20) {
  const frame = useCurrentFrame();
  return interpolate(frame - startFrame, [0, duration], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
}

function useSlideUp(startFrame: number, fps: number, distance = 28) {
  const frame = useCurrentFrame();
  const progress = spring({
    frame: frame - startFrame,
    fps,
    config: { damping: 55, stiffness: 100, mass: 0.8 },
  });
  const opacity = interpolate(frame - startFrame, [0, 12], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  return {
    transform: `translateY(${interpolate(progress, [0, 1], [distance, 0])}px)`,
    opacity,
  };
}

export const EventFlyer: React.FC<EventFlyerProps> = ({
  format = "square",
  title = DEFAULT_FLYER_PROPS.title,
  subtitle = DEFAULT_FLYER_PROPS.subtitle,
  dates = DEFAULT_FLYER_PROPS.dates,
  tagline = DEFAULT_FLYER_PROPS.tagline,
  url = DEFAULT_FLYER_PROPS.url,
}) => {
  const { fps, width, height } = useVideoConfig();
  const isStory = format === "story";

  // Animation timings
  const logoAnim = useSlideUp(0, fps, 20);
  const badgeAnim = useSlideUp(10, fps, 16);
  const titleAnim = useSlideUp(20, fps, 28);
  const subtitleAnim = useSlideUp(35, fps, 20);
  const dividerFade = useFade(45);
  const date0Anim = useSlideUp(50, fps, 16);
  const date1Anim = useSlideUp(62, fps, 16);
  const taglineAnim = useSlideUp(75, fps, 12);
  const urlFade = useFade(85);

  const padding = isStory ? 80 : 64;
  const titleSize = isStory ? 56 : 48;
  const subtitleSize = isStory ? 26 : 22;
  const dateSize = isStory ? 38 : 32;
  const timeSize = isStory ? 32 : 26;

  return (
    <AbsoluteFill style={{ background: theme.bg.dark }}>
      <GridBackground showGlow glowColor={theme.accent.green} />

      {/* Border frame */}
      <AbsoluteFill
        style={{
          border: `1px solid ${theme.border.dark}`,
          margin: 24,
          borderRadius: 16,
          pointerEvents: "none",
        }}
      />

      {/* Content */}
      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "column",
          padding,
          justifyContent: isStory ? "center" : "space-between",
          gap: isStory ? 0 : undefined,
        }}
      >
        {/* Top: Logo + badge */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: isStory ? 80 : 0,
          }}
        >
          <div style={logoAnim}>
            <NodoLogo startFrame={0} size={isStory ? "md" : "sm"} />
          </div>
          <div
            style={{
              ...badgeAnim,
              fontFamily: theme.font.mono,
              fontSize: 11,
              color: theme.accent.green,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              border: `1px solid ${theme.accent.green}44`,
              borderRadius: 20,
              padding: "4px 12px",
            }}
          >
            openclaw · coworking
          </div>
        </div>

        {/* Center content */}
        <div
          style={{
            flex: isStory ? undefined : 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          {/* Title */}
          <div style={titleAnim}>
            <h1
              style={{
                fontFamily: theme.font.sans,
                fontSize: titleSize,
                fontWeight: 700,
                color: theme.text.primary,
                lineHeight: 1.1,
                letterSpacing: "-0.02em",
                margin: 0,
                marginBottom: 20,
              }}
            >
              {title}
            </h1>
          </div>

          {/* Subtitle */}
          <div style={subtitleAnim}>
            <p
              style={{
                fontFamily: theme.font.sans,
                fontSize: subtitleSize,
                fontWeight: 300,
                color: "rgba(255,255,255,0.55)",
                lineHeight: 1.5,
                margin: 0,
                marginBottom: 40,
                whiteSpace: "pre-line",
              }}
            >
              {subtitle}
            </p>
          </div>

          {/* Divider */}
          <div
            style={{
              height: 1,
              background: theme.border.dark,
              marginBottom: 36,
              opacity: dividerFade,
            }}
          />

          {/* Dates */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: isStory ? 28 : 20,
              marginBottom: 40,
            }}
          >
            {(dates ?? []).map((d, i) => {
              const anim = i === 0 ? date0Anim : date1Anim;
              return (
                <div
                  key={i}
                  style={{
                    ...anim,
                    display: "flex",
                    alignItems: "baseline",
                    gap: 16,
                  }}
                >
                  <span
                    style={{
                      fontFamily: theme.font.mono,
                      fontSize: dateSize,
                      fontWeight: 500,
                      color: theme.accent.green,
                      letterSpacing: "-0.01em",
                    }}
                  >
                    📅 {d.label}
                  </span>
                  <span
                    style={{
                      fontFamily: theme.font.mono,
                      fontSize: timeSize,
                      color: "rgba(255,255,255,0.5)",
                    }}
                  >
                    · {d.time}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom: tagline + url */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginTop: isStory ? 60 : 0,
          }}
        >
          <div style={taglineAnim}>
            <p
              style={{
                fontFamily: theme.font.sans,
                fontSize: 18,
                color: "rgba(255,255,255,0.45)",
                margin: 0,
              }}
            >
              {tagline}
            </p>
          </div>
          <div
            style={{
              opacity: urlFade,
              fontFamily: theme.font.mono,
              fontSize: 18,
              color: theme.text.secondary,
            }}
          >
            {url}
          </div>
        </div>
      </AbsoluteFill>

      {/* Bottom green glow accent */}
      <AbsoluteFill
        style={{
          background: `radial-gradient(ellipse at 50% 110%, ${theme.accent.green}12 0%, transparent 60%)`,
          pointerEvents: "none",
        }}
      />
    </AbsoluteFill>
  );
};

// Re-export with format pre-set for Root.tsx
export const EventFlyerSquare: React.FC<Omit<EventFlyerProps, "format">> = (
  props
) => <EventFlyer {...props} format="square" />;

export const EventFlyerStory: React.FC<Omit<EventFlyerProps, "format">> = (
  props
) => <EventFlyer {...props} format="story" />;
