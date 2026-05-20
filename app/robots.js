import site from "@/config/site.config";

// Auto-generates /robots.txt
export default function robots() {
  const base = site.url.replace(/\/$/, "");
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${base}/sitemap.xml`,
  };
}
