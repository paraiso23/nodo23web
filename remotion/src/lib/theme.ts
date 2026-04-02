// Design tokens — extracted from nodo23-v3.html :root {}
export const theme = {
  bg: {
    dark: "#141414",
    dark2: "#1a1a1a",
    dark3: "#1e1e1e",
    light: "#F6F6F6",
  },
  border: {
    dark: "#2c2c2c",
    light: "#e0e0e0",
  },
  text: {
    primary: "#f6f6f6",
    secondary: "#999999",
    dark: "#1a1a1a",
  },
  accent: {
    green: "#34d399",
    blue: "#0089ff",
    teal: "#3fffdd",
    purple: "#8B5CF6",
    orange: "#D87756",
    yellow: "#febc2e",
  },
  font: {
    sans: "Inter, sans-serif",
    mono: "'JetBrains Mono', monospace",
  },
  // macOS-style terminal dots
  termDots: {
    red: "#ff5f57",
    yellow: "#febc2e",
    green: "#28c840",
  },
} as const;
