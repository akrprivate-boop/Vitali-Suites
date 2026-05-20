// =====================================================================
//  ROOMS CONFIG  —  EDIT THIS FILE to change rooms, prices, photos.
//
//  HOW PRICES WORK:
//   - fullDay.price      = the normal nightly / full-day price (₹)
//   - halfDay.enabled    = true/false  -> turn the half-day option on or off
//   - halfDay.price      = the half-day price (₹)
//   - halfDay.description = the small text shown under the half-day option
//
//  HOW IMAGES WORK:
//   - Put your photos in /public/images/rooms/  (see folder README)
//   - Then change the gallery paths below to "/images/rooms/your-file.jpg"
//   - Demo uses Unsplash links so the site looks good before you add photos.
// =====================================================================

export const rooms = [
  {
    slug: "ac-room",
    name: "AC Room",
    category: "AC Room",
    shortDescription:
      "Cool, quiet comfort with premium bedding and modern amenities — ideal for a restful stay.",
    longDescription:
      "Our AC Rooms blend understated elegance with everyday comfort. Enjoy a climate-controlled retreat featuring a plush queen bed and a smart TV. Perfect for solo travellers and couples seeking a serene escape.",

    // Full-day (standard) booking
    fullDay: {
      price: 1700,
      label: "Full Day (24 hrs)",
    },

    // Half-day booking — flip `enabled` to false to hide it for this room
    halfDay: {
      enabled: true,
      price: 850,
      label: "Half Day (up to 6 to 8 hrs)",
      description: "Flexible check-in — perfect for day rest & business travellers",
    },

    maxGuests: 2,
    bedType: "Queen Bed",
    sizeSqft: 220,

    amenities: [
      "Air Conditioning",
      "Free High-Speed Wi-Fi",
      "Smart TV",
      "Premium Bedding",
      "Daily Housekeeping",
      "Hot Water 24x7",
      "Room Service",
    ],

    gallery: [
      "https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80",
    ],
    featured: true,
  },

  {
    slug: "non-ac-room",
    name: "Non-AC Room",
    category: "Non-AC Room",
    shortDescription:
      "Naturally ventilated, value-friendly comfort without compromising on style.",
    longDescription:
      "A bright, airy room with windows and a calm aesthetic. Our Non-AC Rooms are a smart choice for budget-conscious guests who still want premium bedding, fast Wi-Fi and attentive service.",

    fullDay: {
      price: 1400,
      label: "Full Day (24 hrs)",
    },

    halfDay: {
      enabled: true,
      price: 700,
      label: "Half Day (up to 6 to 8 hrs)",
      description: "Flexible check-in — perfect for budget-conscious travellers and guests.",
    },

    maxGuests: 2,
    bedType: "Double Bed",
    sizeSqft: 180,

    amenities: [
      "Ceiling Fan",
      "Free High-Speed Wi-Fi",
      "TV",
      "Premium Bedding",
      "Daily Housekeeping",
      "Hot Water 24x7",
      "Room Service",
    ],

    gallery: [
      "https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1200&q=80",
    ],
    featured: false,
  },

  {
    slug: "suite-room",
    name: "Suite Room",
    category: "Suite Room",
    shortDescription:
      "Our signature suite — a spacious living area, king bed, and luxurious finishes.",
    longDescription:
      "The Vitali Suite is the pinnacle of our hospitality. A separate lounge, a king-size bed dressed in fine linen and curated amenities make every moment feel special. Ideal for honeymooners, families and discerning guests.",

    fullDay: {
      price: 4999,
      label: "Full Day (24 hrs)",
    },

    halfDay: {
      enabled: false,
      price: 2999,
      label: "Half Day (up to 6 hrs)",
      description: "Day stay for business meetings & special occasions",
    },

    maxGuests: 2,
    bedType: "King Bed + Sofa",
    sizeSqft: 480,

    amenities: [
      "Air Conditioning",
      "Separate Living Area with Sofa",
      "Free High-Speed Wi-Fi",
      "Smart TV",
      "Premium Bedding",
      "Premium Toiletries",
      "Priority Room Service",
    ],

    gallery: [
      "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1591088398332-8a7791972843?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1200&q=80",
    ],
    featured: true,
  },
];

// Helper used across the app (don't need to edit this).
export const getRoomBySlug = (slug) => rooms.find((r) => r.slug === slug);

export default rooms;
