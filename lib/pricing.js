// =====================================================================
//  PRICING + OFFERS LOGIC
//  Figures out which offer is active today and applies the discount.
//  You normally won't edit this — change numbers in config/offers.config.js
// =====================================================================

import offersConfig from "@/config/offers.config";

// Returns the currently-active offer with the HIGHEST discount, or null.
export function getActiveOffer(today = new Date()) {
  const active = offersConfig.offers
    .filter((o) => o.enabled)
    .filter((o) => {
      const start = new Date(o.startDate + "T00:00:00");
      const end = new Date(o.endDate + "T23:59:59");
      return today >= start && today <= end;
    })
    .sort((a, b) => b.discountPercent - a.discountPercent);

  return active.length ? active[0] : null;
}

// Given a base price, return { original, final, discountPercent, hasDiscount }
export function applyOffer(basePrice, today = new Date()) {
  const offer = getActiveOffer(today);
  if (!offer || !offer.discountPercent) {
    return { original: basePrice, final: basePrice, discountPercent: 0, hasDiscount: false, offer: null };
  }
  const final = Math.round(basePrice * (1 - offer.discountPercent / 100));
  return {
    original: basePrice,
    final,
    discountPercent: offer.discountPercent,
    hasDiscount: true,
    offer,
  };
}

// Format a number as Indian Rupees, e.g. 2499 -> "₹2,499"
export function formatINR(amount) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}
