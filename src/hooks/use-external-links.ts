import { useEffect } from "react";

/**
 * Outbound links (the WhatsApp order CTAs, the Instagram DM link) are plain
 * `target="_blank"` anchors. Plenty of environments refuse to open that new
 * tab — mobile in-app browsers such as Instagram's, and popup blockers — and
 * the click then does nothing at all, which reads as a dead link.
 *
 * This listens for those clicks and falls back to navigating the current tab.
 * The fallback only applies when we are the top-level document: inside an embed
 * the target site refuses to be framed anyway, so there is nothing to fall back
 * to and we leave the native behaviour alone.
 */
export function useExternalLinkFallback() {
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      // Let modified clicks (new tab, new window, download) behave natively.
      if (event.defaultPrevented || event.button !== 0) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

      const target = event.target;
      if (!(target instanceof Element)) return;

      const link = target.closest<HTMLAnchorElement>(
        'a[target="_blank"][href^="http"]',
      );
      if (!link) return;

      event.preventDefault();

      // No `noopener` in the feature string: browsers return null for that,
      // which would make a successful open look blocked.
      const opened = window.open(link.href, "_blank");
      if (opened) {
        opened.opener = null;
        return;
      }

      if (window.self === window.top) window.location.assign(link.href);
    };

    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);
}
