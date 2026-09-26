/**
 * Asset URLs that survive being hosted under a sub-path.
 *
 * A project site on GitHub Pages is served from `https://<user>.github.io/<repo>/`,
 * so a hard-coded `/logo.png` points at the domain root and 404s. Vite exposes
 * the deployment root as `import.meta.env.BASE_URL` (`/` in dev, `/repo-name/`
 * when the build passes `--base=/repo-name/`), and every file in `public/`
 * should be referenced through it.
 */

/** Deployment root with a trailing slash, e.g. `/` or `/draag.co/`. */
export const BASE_URL = import.meta.env.BASE_URL;

/** Resolve a `public/` file (`/logo.png`) against the deployment root. */
export function assetUrl(path: string): string {
  return `${BASE_URL}${path.replace(/^\/+/, "")}`;
}

/**
 * React Router `basename` for the same deployment root, without a trailing
 * slash. An empty string means "served from the domain root", which is what the
 * dev server (`BASE_URL === "/"`) resolves to.
 */
export const ROUTER_BASENAME = BASE_URL.replace(/\/+$/, "");
