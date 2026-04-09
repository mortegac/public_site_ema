export const CANONICAL_DOMAIN = "https://www.energica.city";
export const SITE_NAME = "Energica City";
export const DEFAULT_OG_IMAGE = "/og-default.jpg";
export const LOGO_URL = "https://www.energica.city/logo.png";

/** Use for Prismic `og_url` and similar: ensures energica.city host is always `www`. */
export function normalizeEnergicaSiteUrl(
  url: string | null | undefined,
  fallback: string
): string {
  if (!url?.trim()) return fallback;
  const t = url.trim();
  if (t.startsWith("/")) return `${CANONICAL_DOMAIN}${t}`;
  try {
    const u = new URL(t);
    if (u.hostname === "energica.city" || u.hostname === "www.energica.city") {
      u.hostname = "www.energica.city";
      return u.href;
    }
    return t;
  } catch {
    return t;
  }
}
