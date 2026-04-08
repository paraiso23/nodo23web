# Skill: design-retro — Sistema de Diseño Bicromatico Retrofuturista

## Descripción
Sistema de diseño visual de dos colores (parchment + charcoal) con estética retrofuturista industrial. Inspirado en monitores HVAC, displays LED industriales y terminales de datos de los años 80. Todas las composiciones de marketing de Nodo23 usan este sistema.

---

## Sistema de color (estrictamente bicromatico)

| Token | Valor | Uso |
|-------|-------|-----|
| `paper` | `#C9BCAA` | Fondo principal — pergamino cálido |
| `ink` | `#1E180E` | Todo el contenido — carbón oscuro |
| `grid` | `#B8AE9C` | Líneas de papel cuadriculado |
| `scatter` | `rgba(30,24,14,0.09)` | Puntos apagados del pixel art |

**Sin colores adicionales.** Cero gradientes de color, cero acentos de color, cero transparencias con matiz.

---

## Tipografía

**Solo monospace.** Una sola familia:
```
'JetBrains Mono', 'Courier New', monospace
```

Jerarquía por peso y tamaño, no por color:
- **Labels/eyebrow**: 11px, letterspacing 0.1em, uppercase, opacity 0.45
- **Body text**: 12–14px, letterspacing 0.02–0.04em
- **Títulos**: 22–40px, fontWeight 700, letterspacing -0.01em
- **Display grande**: Pixel dot matrix (componente PixelDisplay)
- **Datos densos**: 11–12px, opacity 0.45–0.55

---

## Elementos visuales del sistema

### 1. Papel cuadriculado (GraphPaper)
Cuadrícula fina de líneas `ink` sobre fondo `paper`. Grid de 30px × 30px, opacidad ~16%.

### 2. Display pixel (PixelDisplay)
Números/letras renderizados como matrices de puntos (fuente LED de 5×7 dots).
- Dots "encendidos": opacidad 1
- Dots "apagados": opacidad 0.08 → efecto scatter/halo alrededor del número
- Animación: scan line de arriba hacia abajo (`scanProgress` 0→1)

Caracteres disponibles: `0–9`, `N`, `O`, `D`, `B`, `S`

### 3. Barra lateral de histograma (RetroBarChart)
Columna de barras finas (4–6px) con alturas semialeatorizadas (seeded-random, determinista).
- Se anima creciendo desde abajo (`growProgress` 0→1)
- Siempre en la columna derecha (200–220px de ancho)

### 4. Ticker de estado (top bar)
Barra horizontal de 40px en la parte superior con texto de estado técnico que desplaza hacia la izquierda.
Formato: `NODO23 · DATO.1 · DATO.2 · DATO.3 · `
Velocidad: ~2.4–2.8px/frame

### 5. Filas de datos (RetroDataRows)
Códigos alfanuméricos generados proceduralmente:
```
CCB.NJZ.HJC.GBR.NZW
AEA.MCG.464.GSD.CID
SNN.MSC.JD3.FJJ.GQG
```
Se revelan de arriba hacia abajo durante la animación.

### 6. Cursor `04_`
Pequeño indicador de cursor esquina inferior derecha de la columna sidebar.

### 7. Etiqueta `el.`
Esquina superior derecha de la columna sidebar. Referencia de nivel.

---

## Layout estándar (1080×1080)

```
+----------------------------------------------------------+
| TICKER: NODO23 · DATO · DATO · DATO ·              (40px)|
+------------------------------------------+---------------+
|                                          |    el.        |
|   [PIXEL DISPLAY — pixel "23" o código]  |               |
|                                          |    ████       |
|   scatter dots ·  · ·    ·  ·           |    █████      |
|   ·  · ·          ·   ·   ·             |    ██████     |
|                                          |    ████████   |
+------------------------------------------+    ████       |
|                                          |    ████████   |
|   // label · eyebrow                     |    ██████     |
|   TÍTULO GRANDE                          |               |
|   Subtítulo o fecha en tamaño menor      |    04_        |
|                                          |               |
|   | DATO FECHA 1  · hora                 |    ████       |
|   | DATO FECHA 2  · hora                 |    ████████   |
|                                          |               |
|   tagline                    url         |               |
|                                          |               |
|   COD.NJZ.HJC.GBR.NZW                   |               |
|   AEA.MCG.464.GSD.CID                   |               |
+------------------------------------------+---------------+
```

---

## Composiciones disponibles

### EventFlyerSquare — 1080×1080 (IG Post)
```bash
cd ~/nodo23web/remotion
npx remotion still EventFlyerSquare --frame=149 --output ../out/flyer-square.png
```

### EventFlyerStory — 1080×1920 (IG Story / Telegram)
```bash
npx remotion still EventFlyerStory --frame=149 --output ../out/flyer-story.png
```

### AgendaCard — 1080×1080 (8s video)
```bash
npx remotion render AgendaCard --output ../out/agenda.mp4
# Preview estático:
npx remotion still AgendaCard --frame=200 --output ../out/agenda-preview.png
```

### SkillLoop-[skill] — 1080×1080 (5s loop por skill)
```bash
npx remotion render SkillLoop-nodo-bot      --output ../out/skill-nodo-bot.mp4
npx remotion render SkillLoop-nodo-summary  --output ../out/skill-nodo-summary.mp4
npx remotion render SkillLoop-nodo-reply    --output ../out/skill-nodo-reply.mp4
npx remotion render SkillLoop-nodo-seo      --output ../out/skill-nodo-seo.mp4
npx remotion render SkillLoop-nodo-leads    --output ../out/skill-nodo-leads.mp4
npx remotion render SkillLoop-nodo-invoice  --output ../out/skill-nodo-invoice.mp4
```

### HeroReel — 1280×720 (15s reel de marca)
```bash
npx remotion render HeroReel --output ../out/hero-reel.mp4
```

---

## Tokens de diseño — archivos clave

| Archivo | Contenido |
|---------|-----------|
| `remotion/src/lib/theme-retro.ts` | Colores, fuente, fuente pixel 5×7 |
| `remotion/src/components/GraphPaper.tsx` | Fondo cuadriculado |
| `remotion/src/components/PixelDisplay.tsx` | Display LED de puntos |
| `remotion/src/components/RetroBarChart.tsx` | Histograma lateral |
| `remotion/src/components/RetroDataRows.tsx` | Filas de datos decorativos |

---

## Anatomía de la animación (patrón estándar)

Cada composición sigue este orden:
1. **Frame 0–15**: Papel cuadriculado fade in
2. **Frame 5–50**: Pixel display scan de arriba abajo
3. **Frame 25–70**: Barras del histograma crecen desde abajo
4. **Frame 50–90**: Título y datos textuales (fade in)
5. **Frame 80+**: Datos de output / líneas de terminal (aparecen una a una)
6. **Frame 120+**: Filas de datos decorativos
7. **Todo el tiempo**: Ticker desplazando a la izquierda

---

## Personalizar texto sin tocar código

Las fechas, título y tagline son props por defecto. Pasar desde CLI:

```bash
npx remotion still EventFlyerSquare \
  --frame=149 \
  --props '{"title":"WORKSHOP EN DIRECTO","dates":[{"label":"MAR 15 ABRIL","time":"19:00h"}]}' \
  --output ../out/flyer-workshop.png
```

Props de `EventFlyer`:
| Prop | Tipo | Default |
|------|------|---------|
| `title` | string | "COWORKING EN DIRECTO" |
| `subtitle` | string | "Montamos OpenClaw juntos..." |
| `dates` | `[{label, time}]` | Jue 9 + Sáb 11 |
| `tagline` | string | "Gratis. Comunidad Nodo23." |
| `url` | string | "nodo23.co" |

Props de `AgendaCard`:
| Prop | Tipo | Default |
|------|------|---------|
| `date` | string | "JUE 9 ABRIL" |
| `time` | string | "19:00h" |
| `steps` | `[{number, title, detail, duration}]` | 4 pasos OpenClaw |

Props de `SkillLoop`:
| Prop | Tipo | Default |
|------|------|---------|
| `skillIndex` | 0–5 | 0 (nodo_bot) |

---

## Referencia visual del sistema

El estilo imita monitores industriales de los años 80–90 (HVAC, SCADA, PLCs):
- **Fondo pergamino** en lugar de negro: lectura en luz ambiental
- **Cuadrícula de papel técnico**: precisión y trazabilidad
- **Fuente LED pixel**: displays de 7 segmentos / matrices LED
- **Barras de histograma**: monitorización de señal en tiempo real
- **Códigos alfanuméricos**: logs de sistema, identificadores de proceso
- **Ticker horizontal**: feed de datos en tiempo real
- **Cursor `04_`**: referencia de nivel / frame actual

---

## Flujo rápido para Eris

```bash
cd ~/nodo23web/remotion

# Flyer del próximo evento (editar props si cambian fechas)
npx remotion still EventFlyerSquare --frame=149 --output ../out/flyer-square.png
npx remotion still EventFlyerStory  --frame=149 --output ../out/flyer-story.png

# Preview de agenda (8s video)
npx remotion still AgendaCard --frame=200 --output ../out/agenda-preview.png

# Skill loops (todos los 6)
for i in 0 1 2 3 4 5; do
  npx remotion render SkillLoop --props "{\"skillIndex\":$i}" --output ../out/skill-${i}.mp4
done

# Los assets están en ~/nodo23web/out/ listos para publicar
ls ../out/
```
