"use client";

import { useState } from "react";
import Link from "next/link";
import offersConfig from "@/config/offers.config";

// Dismissible top banner. Controlled by config/offers.config.js (bannerEnabled).
export default function OfferBanner() {
  const [open, setOpen] = useState(true);
  if (!offersConfig.bannerEnabled || !open) return null;

  return (
    <div className="relative z-[60] bg-gold-gradient text-ink">
      <div className="mx-auto flex max-w-7xl items-center justify-center gap-3 px-4 py-2 text-sm font-medium">
        <span className="text-center">{offersConfig.bannerText}</span>
        <Link
          href={offersConfig.bannerCtaLink}
          className="hidden rounded-full bg-ink/90 px-3 py-1 text-xs text-gold sm:inline-block"
        >
          {offersConfig.bannerCtaText}
        </Link>
        <button
          aria-label="Dismiss offer"
          onClick={() => setOpen(false)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-ink/70 hover:text-ink"
        >
          ✕
        </button>
      </div>
    </div>
  );
}
