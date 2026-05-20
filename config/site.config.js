// =====================================================================
//  SITE CONFIG  —  EDIT THIS FILE to change hotel info, contact, payment.
//  This is the #1 file a non-developer will touch. No coding needed:
//  just change the text inside the quotes "like this".
// =====================================================================

export const site = {
  // ---- Basic hotel identity ----
  name: "Vitali Suites",
  tagline: "Where Luxury Feels Like Home",
  shortDescription:
    "A boutique luxury stay offering AC & Non AC rooms and flexible half-day bookings — perfect for business travellers, families and celebrations.",

  // Used for SEO and browser tab. Keep it descriptive + include your city.
  seoTitle: "Vitali Suites — Luxury Hotel | Book Rooms Online",
  seoDescription:
    "Book luxury AC rooms and Non-AC rooms at Vitali Suites. Half-day & full-day stays, instant online payment (UPI, Cards, Net Banking), and event hosting.",

  // The live website URL (set this after you deploy). Used for SEO/sitemap.
  url: "https://vitali-suites.vercel.app",

  // ---- Contact details (change your number/email here in ONE place) ----
  phone: "+91 9337129100", // shown on site
  phoneDial: "+919337129100", // used for "Call Now" links — digits + country code, no spaces
  whatsapp: "919337129100", // WhatsApp number: country code + number, NO + and NO spaces
  email: "stay@vitalisuites.com",

  // ---- Address ----
  address: {
    line1: "Plot no-20/21, Jatni Gate, Infocity -2 square",
    line2: "Near Bata Bhuasani Temple, Janla, Khordha, Bhubaneswar",
    city: "Bhubaneswar",
    state: "Odisha",
    pincode: "751024",
    country: "India",
  },

  // ---- Google Maps ----
  // Paste the EMBED url: Google Maps -> Share -> Embed a map -> copy the src="..." link.
  mapsEmbedUrl:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d377",
  // The normal Google Maps link (for the "Get Directions" button):
  mapsDirectionsUrl: "https://maps.app.goo.gl/DdLjH9MZoKKuD1u66",

  // ---- Social links (leave "" empty to hide) ----
  social: {
    instagram: "https://www.instagram.com/vitali_suites?igsh=MXZhejVpeDZ5dDJlYQ==",
    facebook: "",
  },

  // ---- Payment / UPI ----
  payment: {
    // Your UPI ID for direct UPI display (the QR / "pay to" id). Razorpay still
    // handles the actual transaction; this is shown as info only.
    upiId: "vitalisuites@upi",
    // The currency. Razorpay uses INR.
    currency: "INR",
    // Master switch — set to false to hide all "Pay Online" buttons and only
    // collect inquiries (useful before your Razorpay account is approved).
    onlinePaymentsEnabled: true,
    // A small booking advance instead of full amount? Set a percent (0-100).
    // Example: 100 = full payment, 30 = collect 30% advance online.
    payPercent: 100,
  },
};

export default site;
