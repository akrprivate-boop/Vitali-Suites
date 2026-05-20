import site from "@/config/site.config";
import rooms from "@/config/rooms.config";

// Auto-generates /sitemap.xml for Google indexing.
export default function sitemap() {
  const base = site.url.replace(/\/$/, "");
  const now = new Date();

  const staticPages = ["", "/rooms", "/events", "/booking"].map((path) => ({
    url: `${base}${path}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: path === "" ? 1 : 0.8,
  }));

  const roomPages = rooms.map((r) => ({
    url: `${base}/rooms/${r.slug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  return [...staticPages, ...roomPages];
}
