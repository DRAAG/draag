import type { CategorySlug } from "@/data/products";

/**
 * Placeholder product imagery.
 *
 * No real inventory photography exists yet, so every product frame is rendered
 * as an on-brand editorial composition: a toned studio backdrop, a vector
 * silhouette of the product type, and typographic captions. Frames vary in
 * crop and angle so a gallery still feels like a photo set.
 */

const ACCENT = "#C7F03C";

const TONES: Record<CategorySlug, { a: string; b: string; ink: string }> = {
  sneakers: { a: "#F4F1EA", b: "#DBD3C3", ink: "#141410" },
  sunglasses: { a: "#EEF0F3", b: "#D3D9E0", ink: "#14161A" },
  watches: { a: "#F3EDE2", b: "#DCD0BC", ink: "#17140E" },
};

function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function sneakerSilhouette(ink: string): string {
  return `<g transform="translate(28 -12)">
    <path d="M26 168 C26 150 30 130 40 116 C52 100 72 94 92 96 C116 98 132 92 150 80 C170 66 192 62 214 66 C240 71 262 86 286 102 C310 118 340 132 366 139 C392 146 412 152 420 160 C428 168 428 178 420 182 C412 186 396 188 376 188 L56 188 C36 188 26 184 26 168 Z" fill="${ink}"/>
    <path d="M30 166 L416 166" stroke="#F7F5EF" stroke-width="17" stroke-linecap="round"/>
    <path d="M32 166 L414 166" stroke="${ACCENT}" stroke-width="6" stroke-linecap="round"/>
    <path d="M122 116 L162 142 M154 106 L194 132 M188 96 L224 120" stroke="#F7F5EF" stroke-width="7" stroke-linecap="round"/>
    <path d="M300 118 C320 128 342 136 362 141" stroke="#F7F5EF" stroke-width="6" stroke-linecap="round" fill="none"/>
  </g>`;
}

function sunglassesSilhouette(ink: string): string {
  return `<g transform="translate(32 -8)">
    <path d="M40 104 Q40 78 66 74 L188 78 Q206 80 204 104 L196 148 Q190 178 158 178 L110 178 Q62 178 48 146 Z" fill="${ink}"/>
    <path d="M396 104 Q396 78 370 74 L248 78 Q230 80 232 104 L240 148 Q246 178 278 178 L326 178 Q374 178 388 146 Z" fill="${ink}"/>
    <path d="M204 110 Q250 90 296 110" stroke="${ink}" stroke-width="13" fill="none" stroke-linecap="round"/>
    <path d="M40 100 L12 86" stroke="${ink}" stroke-width="13" stroke-linecap="round"/>
    <path d="M396 100 L424 86" stroke="${ink}" stroke-width="13" stroke-linecap="round"/>
    <path d="M62 108 Q80 96 118 100" stroke="${ACCENT}" stroke-width="9" stroke-linecap="round" fill="none"/>
    <path d="M260 108 Q290 98 330 104" stroke="#F7F5EF" stroke-width="9" stroke-linecap="round" fill="none" opacity="0.55"/>
  </g>`;
}

function watchSilhouette(ink: string): string {
  return `<g>
    <path d="M214 6 L286 6 L279 72 L221 72 Z" fill="${ink}"/>
    <path d="M221 152 L279 152 L286 218 L214 218 Z" fill="${ink}"/>
    <circle cx="250" cy="112" r="56" fill="${ink}"/>
    <circle cx="250" cy="112" r="45" fill="#F7F5EF"/>
    <circle cx="250" cy="112" r="45" fill="none" stroke="${ACCENT}" stroke-width="4"/>
    <path d="M250 112 L250 82" stroke="${ink}" stroke-width="7" stroke-linecap="round"/>
    <path d="M250 112 L274 124" stroke="${ink}" stroke-width="7" stroke-linecap="round"/>
    <path d="M250 112 L250 86" stroke="${ACCENT}" stroke-width="4" stroke-linecap="round"/>
    <circle cx="250" cy="112" r="6" fill="${ink}"/>
    <rect x="303" y="104" width="14" height="17" rx="3" fill="${ink}"/>
  </g>`;
}

function silhouette(category: CategorySlug, ink: string): string {
  if (category === "sneakers") return sneakerSilhouette(ink);
  if (category === "sunglasses") return sunglassesSilhouette(ink);
  return watchSilhouette(ink);
}

const FRAME_TRANSFORM = [
  { rotate: -4, scale: 1.32, x: 0, y: 0 },
  { rotate: 3, scale: 1.08, x: -34, y: 26 },
  { rotate: -8, scale: 1.95, x: 40, y: 90 },
  { rotate: 6, scale: 1.5, x: -60, y: -30 },
];

export function productImageDataUri(opts: {
  category: CategorySlug;
  brand: string;
  title: string;
  frame?: number;
}): string {
  const frame = ((opts.frame ?? 0) % 4 + 4) % 4;
  const tone = TONES[opts.category];
  const ink = tone.ink;
  const t = FRAME_TRANSFORM[frame];
  const titleSize = opts.title.length > 20 ? 46 : opts.title.length > 14 ? 54 : 62;

  const grid = Array.from({ length: 9 }, (_, i) => {
    const x = 100 * (i + 1);
    return `<line x1="${x}" y1="0" x2="${x}" y2="1250" stroke="${ink}" stroke-opacity="0.05" stroke-width="1"/>`;
  }).join("");

  const gridH = Array.from({ length: 11 }, (_, i) => {
    const y = 100 * (i + 1);
    return `<line x1="0" y1="${y}" x2="1000" y2="${y}" stroke="${ink}" stroke-opacity="0.05" stroke-width="1"/>`;
  }).join("");

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1250" width="1000" height="1250" role="img">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="0.45" y2="1">
      <stop offset="0" stop-color="${tone.a}"/>
      <stop offset="1" stop-color="${tone.b}"/>
    </linearGradient>
    <radialGradient id="glow" cx="0.72" cy="0.26" r="0.72">
      <stop offset="0" stop-color="${ACCENT}" stop-opacity="0.55"/>
      <stop offset="1" stop-color="${ACCENT}" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="vig" cx="0.5" cy="0.48" r="0.78">
      <stop offset="0.55" stop-color="#000" stop-opacity="0"/>
      <stop offset="1" stop-color="#000" stop-opacity="0.18"/>
    </radialGradient>
  </defs>
  <rect width="1000" height="1250" fill="url(#bg)"/>
  ${grid}${gridH}
  <text x="500" y="322" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="190" font-weight="700" letter-spacing="6" fill="${ink}" fill-opacity="0.06">DRAAG</text>
  <rect width="1000" height="1250" fill="url(#glow)"/>
  <ellipse cx="500" cy="905" rx="340" ry="36" fill="#000" fill-opacity="0.1"/>
  <g transform="translate(${500 + t.x} ${560 + t.y}) rotate(${t.rotate}) scale(${t.scale}) translate(-250 -112)">
    ${silhouette(opts.category, ink)}
  </g>
  <text x="64" y="90" font-family="Arial, Helvetica, sans-serif" font-size="24" letter-spacing="7" fill="${ink}" fill-opacity="0.5">0${frame + 1} / 04</text>
  <rect x="64" y="112" width="128" height="9" fill="${ACCENT}"/>
  <text x="64" y="1060" font-family="Arial, Helvetica, sans-serif" font-size="30" letter-spacing="10" fill="${ink}" fill-opacity="0.55">${escapeXml(opts.brand.toUpperCase())}</text>
  <text x="64" y="1132" font-family="Arial, Helvetica, sans-serif" font-size="${titleSize}" font-weight="700" fill="${ink}">${escapeXml(opts.title)}</text>
  <text x="64" y="1190" font-family="Arial, Helvetica, sans-serif" font-size="24" letter-spacing="5" fill="${ink}" fill-opacity="0.4">PLACEHOLDER IMAGERY</text>
  <rect width="1000" height="1250" fill="url(#vig)"/>
</svg>`;

  return `data:image/svg+xml,${encodeURIComponent(svg)}`;
}
