import "./globals.css";
import { Cormorant_Garamond, Jost } from "next/font/google";
import site from "@/config/site.config";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingButtons from "@/components/FloatingButtons";
import OfferBanner from "@/components/OfferBanner";

// Luxury serif for headings, clean sans for body.
const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-cormorant",
  display: "swap",
});
const jost = Jost({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-jost",
  display: "swap",
});

// ---- SEO metadata (Next.js reads this automatically) ----
export const metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: site.seoTitle,
    template: `%s | ${site.name}`,
  },
  description: site.seoDescription,
  keywords: [
    "luxury hotel",
    "hotel booking",
    site.address.city + " hotel",
    "AC rooms",
    "suite booking",
    "half day hotel booking",
    "online hotel payment",
    site.name,
  ],
  openGraph: {
    title: site.seoTitle,
    description: site.seoDescription,
    url: site.url,
    siteName: site.name,
    type: "website",
    locale: "en_IN",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: site.name }],
  },
  twitter: {
    card: "summary_large_image",
    title: site.seoTitle,
    description: site.seoDescription,
    images: ["/og-image.jpg"],
  },
  alternates: { canonical: site.url },
  robots: { index: true, follow: true },
};

export const viewport = {
  themeColor: "#0e0f12",
  width: "device-width",
  initialScale: 1,
};

// JSON-LD structured data for Google (Hotel schema → rich results + local SEO)
function HotelSchema() {
  const json = {
    "@context": "https://schema.org",
    "@type": "Hotel",
    name: site.name,
    description: site.shortDescription,
    url: site.url,
    telephone: site.phoneDial,
    email: site.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: `${site.address.line1}, ${site.address.line2}`,
      addressLocality: site.address.city,
      addressRegion: site.address.state,
      postalCode: site.address.pincode,
      addressCountry: "IN",
    },
    priceRange: "₹₹",
    starRating: { "@type": "Rating", ratingValue: "4.8" },
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }}
    />
  );
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${cormorant.variable} ${jost.variable}`}>
      <body>
        <HotelSchema />
        <OfferBanner />
        <Navbar />
        <main>{children}</main>
        <Footer />
        <FloatingButtons />
      </body>
    </html>
  );
}
