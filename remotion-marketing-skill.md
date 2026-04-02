# Skill: remotion-marketing — Generar Assets de Marketing con Remotion

## Descripción
Este skill genera automáticamente los assets gráficos y de video para las campañas de marketing de Nodo23 usando Remotion. Los assets se crean a partir de composiciones React parametrizables y se renderizan como PNG (estáticos) o MP4 (animados).

## Cuándo usar este skill
- Cuando Eris necesite generar el flyer del evento de coworking
- Cuando haya que producir el post de agenda para Instagram
- Cuando se necesite un skill loop animado para Instagram
- Para producir el reel principal de marca
- Cualquier vez que el plan de contenido indique "generar asset visual"

---

## Setup (solo la primera vez)

```bash
cd ~/nodo23web/remotion
npm install
```

---

## Assets disponibles y cómo renderizarlos

### 1. Flyer del evento — 1080×1080 (IG Post)
```bash
cd ~/nodo23web/remotion
npm run still:flyer-sq
# Output: ~/nodo23web/out/flyer-square.png
```

### 2. Flyer del evento — 1080×1920 (IG Story / Telegram)
```bash
cd ~/nodo23web/remotion
npm run still:flyer-story
# Output: ~/nodo23web/out/flyer-story.png
```

### 3. Agenda visual — 1080×1080 (IG Post Mar 7)
```bash
cd ~/nodo23web/remotion
npm run render:agenda
# Output: ~/nodo23web/out/agenda.mp4
```

### 4. Hero Reel — 1280×720 (marketing general)
```bash
cd ~/nodo23web/remotion
npm run render:hero
# Output: ~/nodo23web/out/hero-reel.mp4
```

### 5. Skill Loop — 1080×1080 (por skill individual)
```bash
cd ~/nodo23web/remotion
npm run render:skill:bot      # nodo_bot
npm run render:skill:summary  # nodo_summary
npm run render:skill:reply    # nodo_reply
npm run render:skill:seo      # nodo_seo
npm run render:skill:leads    # nodo_leads
npm run render:skill:invoice  # nodo_invoice
# Outputs: ~/nodo23web/out/skill-nodo_*.mp4
```

### 6. Renderizar todo de una vez
```bash
cd ~/nodo23web/remotion
npm run render:all
```

---

## Preview visual (Remotion Studio)
```bash
cd ~/nodo23web/remotion
npm run studio
# Abre localhost:3000 — preview interactivo de todas las composiciones
```

---

## Parámetros personalizables

### Cambiar fechas/texto del flyer sin tocar código

Pasar props desde CLI:

```bash
npx remotion still EventFlyerSquare \
  --props '{"dates":[{"label":"JUE 16 ABRIL","time":"19:00h"},{"label":"SÁB 18 ABRIL","time":"11:00h"}]}' \
  --output ../out/flyer-square-apr16.png
```

### Props del EventFlyer
| Prop | Tipo | Default |
|------|------|---------|
| `title` | string | "COWORKING EN DIRECTO" |
| `subtitle` | string | "Montamos OpenClaw juntos..." |
| `dates` | `[{label, time}]` | Jue 9 + Sáb 11 |
| `tagline` | string | "Gratis. Comunidad Nodo23." |
| `url` | string | "nodo23.co 🦞" |

### Props del AgendaCard
| Prop | Tipo | Default |
|------|------|---------|
| `date` | string | "JUE 9 ABRIL" |
| `time` | string | "19:00h" |
| `steps` | `[{number, title, detail, duration}]` | 4 pasos del streaming |

### Props de SkillLoop
| Prop | Tipo | Default |
|------|------|---------|
| `skillIndex` | 0–5 | 0 (nodo_bot) |

Índices: 0=nodo_bot, 1=nodo_summary, 2=nodo_reply, 3=nodo_seo, 4=nodo_leads, 5=nodo_invoice

---

## Estructura del proyecto

```
remotion/
├── src/
│   ├── index.ts                   ← entry point
│   ├── Root.tsx                   ← registra todas las composiciones
│   ├── lib/
│   │   ├── theme.ts               ← tokens de diseño Nodo23
│   │   └── skills.ts              ← data de los 6 skills
│   ├── components/
│   │   ├── GridBackground.tsx     ← fondo con grid de puntos
│   │   ├── NodoLogo.tsx           ← logo "Nodo23" + punto verde
│   │   ├── Terminal.tsx           ← ventana terminal con typewriter
│   │   └── SkillBadge.tsx         ← badge de skill con color de acento
│   └── compositions/
│       ├── EventFlyer.tsx         ← flyer de evento (sq + story)
│       ├── AgendaCard.tsx         ← agenda visual 4 pasos
│       ├── SkillLoop.tsx          ← loop animado por skill
│       └── HeroReel.tsx           ← reel principal 15s
└── package.json
```

---

## Diseño del sistema (tokens)

| Variable | Valor |
|----------|-------|
| Fondo principal | `#141414` |
| Acento verde | `#34d399` |
| Acento azul | `#0089ff` |
| Acento teal | `#3fffdd` |
| Acento púrpura | `#8B5CF6` |
| Acento naranja | `#D87756` |
| Fuente titular | Inter Bold |
| Fuente mono/terminal | JetBrains Mono |

---

## Flujo típico para Eris (cron nightly)

```bash
# 1. Ir al directorio
cd ~/nodo23web/remotion

# 2. Generar flyers del evento
npm run still:flyer-sq   # → out/flyer-square.png (para IG post)
npm run still:flyer-story # → out/flyer-story.png (para Story + TG)

# 3. Si hay streaming esta semana, generar agenda
npm run render:agenda    # → out/agenda.mp4

# 4. Los archivos están en ~/nodo23web/out/ listos para publicar
ls ../out/
```

---

## Actualizar skills o texto

Para añadir un skill nuevo o cambiar el contenido:
- Datos de skills: `remotion/src/lib/skills.ts`
- Tokens de diseño: `remotion/src/lib/theme.ts`
- Flyer: `remotion/src/compositions/EventFlyer.tsx` → `DEFAULT_FLYER_PROPS`
- Agenda: `remotion/src/compositions/AgendaCard.tsx` → `DEFAULT_AGENDA_PROPS`

---

## Notas importantes

- Los renders se guardan en `~/nodo23web/out/` (ignorado por git)
- El Studio abre en `localhost:3000` — útil para Orlando para revisar visualmente
- Los PNGs estáticos (flyer) se generan con `remotion still`, los videos con `remotion render`
- Para formatos sin animación (solo imagen), usa el comando `still` — es mucho más rápido
