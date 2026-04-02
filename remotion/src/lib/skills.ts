import { theme } from "./theme";

export interface Skill {
  id: string;
  name: string;
  tagline: string;
  shortDesc: string;
  command: string;
  output: string[];
  color: string;
}

export const skills: Skill[] = [
  {
    id: "nodo_bot",
    name: "nodo_bot",
    tagline: "Soporte 24/7. Siempre activo.",
    shortDesc: "tu copiloto · nunca duerme",
    command: "$ openclaw run nodo_bot",
    output: [
      "→ Conectando con Gmail     [✓]",
      "→ Conectando con WhatsApp  [✓]",
      "→ Cargando contexto        [✓]",
      "nodo_bot activo · listo para operar",
    ],
    color: theme.accent.green,
  },
  {
    id: "nodo_summary",
    name: "nodo_summary",
    tagline: "Resume docs, emails y reuniones.",
    shortDesc: "resume todo · en segundos",
    command: "$ openclaw run nodo_summary --inbox",
    output: [
      "→ 23 emails sin leer detectados",
      "→ Procesando...",
      "→ Resumen generado           [✓]",
      "3 acciones urgentes identificadas",
    ],
    color: theme.accent.blue,
  },
  {
    id: "nodo_reply",
    name: "nodo_reply",
    tagline: "Borradores en tu tono exacto.",
    shortDesc: "responde · en tu voz",
    command: "$ openclaw run nodo_reply --draft",
    output: [
      "→ Analizando historial de tono...",
      "→ Generando borrador          [✓]",
      "→ Revisión humana pendiente",
      "Listo para enviar con 1 clic",
    ],
    color: theme.accent.teal,
  },
  {
    id: "nodo_seo",
    name: "nodo_seo",
    tagline: "Contenido SEO que posiciona.",
    shortDesc: "contenido · que posiciona",
    command: '$ openclaw run nodo_seo --kw "IA local"',
    output: [
      "→ Keyword research completado",
      "→ Estructura del artículo    [✓]",
      "→ Meta tags optimizados      [✓]",
      "Artículo listo · 1.200 palabras",
    ],
    color: theme.accent.purple,
  },
  {
    id: "nodo_leads",
    name: "nodo_leads",
    tagline: "Cualifica leads automáticamente.",
    shortDesc: "cualifica · sin esfuerzo",
    command: "$ openclaw run nodo_leads --pipeline",
    output: [
      "→ 12 leads nuevos detectados",
      "→ Puntuando por criterios...",
      "→ 4 hot leads identificados  [✓]",
      "CRM actualizado · siguiente paso asignado",
    ],
    color: theme.accent.orange,
  },
  {
    id: "nodo_invoice",
    name: "nodo_invoice",
    tagline: "Concilia facturas sin errores.",
    shortDesc: "facturas · sin fricción",
    command: "$ openclaw run nodo_invoice --sync",
    output: [
      "→ 8 facturas nuevas detectadas",
      "→ Conciliando con contabilidad...",
      "→ 7/8 aprobadas automáticamente [✓]",
      "1 requiere revisión manual",
    ],
    color: theme.accent.yellow,
  },
];
