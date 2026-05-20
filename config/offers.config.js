// =====================================================================
//  OFFERS / DISCOUNTS CONFIG  —  EDIT THIS FILE to run promotions.
//
//  HOW IT WORKS:
//   - `bannerEnabled`  -> show or hide the discount banner at the top
//   - each offer has a discountPercent that is applied to room prices
//     ONLY while today's date is between `startDate` and `endDate`.
//   - Set `enabled: false` to instantly switch an offer off.
//
//  DATE FORMAT is "YYYY-MM-DD" (year-month-day). Example: "2026-12-25".
//
//  The BIGGEST currently-active offer is applied to prices automatically,
//  and a strike-through "before" price is shown to guests.
// =====================================================================

export const offersConfig = {
  // Top sticky banner
  bannerEnabled: true,
  bannerText: "🎉 Summer Special — Flat 20% OFF on all rooms! Use code SUMMER@VITALI20",
  bannerCtaText: "Book Now",
  bannerCtaLink: "/rooms",

  // List of offers. Add as many as you like.
  offers: [
    {
      id: "Summer-2026",
      title: "Summer Special",
      code: "SUMMER@VITALI20",
      description: "Flat 20% off on all room bookings this summer season.",
      discountPercent: 20,
      enabled: true,
      startDate: "2026-05-01",
      endDate: "2026-06-30",
      badge: "20% OFF",
    },
    {
      id: "diwali-2026",
      title: "Diwali Festive Offer",
      code: "DIWALI25",
      description: "Celebrate the festival of lights with 25% off suites & rooms.",
      discountPercent: 25,
      enabled: false, // turn true closer to the date
      startDate: "2026-10-25",
      endDate: "2026-11-05",
      badge: "25% OFF",
    },
    {
      id: "early-bird",
      title: "Early Bird",
      code: "EARLY10",
      description: "Book in advance and save 10% on full-day stays.",
      discountPercent: 10,
      enabled: false,
      startDate: "2026-01-01",
      endDate: "2026-12-31",
      badge: "10% OFF",
    },
  ],
};

export default offersConfig;
