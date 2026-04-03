import React from "react";
import { Composition } from "remotion";
import {
  AgendaCard,
  DEFAULT_AGENDA_PROPS,
} from "./compositions/AgendaCard";
import {
  DEFAULT_FLYER_PROPS,
  EventFlyerSquare,
  EventFlyerStory,
} from "./compositions/EventFlyer";
import { HeroReel } from "./compositions/HeroReel";
import { SkillLoop } from "./compositions/SkillLoop";
import { skills } from "./lib/skills";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      {/* ── FLYER CUADRADO 1080×1080 (IG Post) ── */}
      <Composition
        id="EventFlyerSquare"
        component={EventFlyerSquare}
        durationInFrames={150}
        fps={30}
        width={1080}
        height={1080}
        defaultProps={{
          ...DEFAULT_FLYER_PROPS,
          format: "square",
        }}
      />

      {/* ── FLYER STORY 1080×1920 (IG/TG Story) ── */}
      <Composition
        id="EventFlyerStory"
        component={EventFlyerStory}
        durationInFrames={150}
        fps={30}
        width={1080}
        height={1920}
        defaultProps={{
          ...DEFAULT_FLYER_PROPS,
          format: "story",
        }}
      />

      {/* ── AGENDA VISUAL 1080×1080 (IG Post Mar 7) ── */}
      <Composition
        id="AgendaCard"
        component={AgendaCard}
        durationInFrames={240}
        fps={30}
        width={1080}
        height={1080}
        defaultProps={DEFAULT_AGENDA_PROPS}
      />

      {/* ── SKILL LOOPS 1080×1080 — uno por skill ── */}
      {skills.map((skill, i) => (
        <Composition
          key={skill.id}
          id={`SkillLoop-${skill.id.replace(/_/g, '-')}`}
          component={SkillLoop}
          durationInFrames={150}
          fps={30}
          width={1080}
          height={1080}
          defaultProps={{ skillIndex: i }}
        />
      ))}

      {/* ── Generic SkillLoop (parametrizable desde CLI) ── */}
      <Composition
        id="SkillLoop"
        component={SkillLoop}
        durationInFrames={150}
        fps={30}
        width={1080}
        height={1080}
        defaultProps={{ skillIndex: 0 }}
      />

      {/* ── HERO REEL 1280×720 (general marketing) ── */}
      <Composition
        id="HeroReel"
        component={HeroReel}
        durationInFrames={450}
        fps={30}
        width={1280}
        height={720}
      />
    </>
  );
};
