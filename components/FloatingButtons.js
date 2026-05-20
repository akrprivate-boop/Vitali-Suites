"use client";

import Link from "next/link";
import { FaWhatsapp } from "react-icons/fa";
import site from "@/config/site.config";

// Floating WhatsApp chat (bottom-left) + sticky Book button (bottom-right on mobile).
export default function FloatingButtons() {
  const waLink = `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(
    `Hi ${site.name}, I'd like to know more about your rooms and offers.`
  )}`;

  return (
    <>
      {/* WhatsApp */}
      <a
        href={waLink}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="fixed bottom-6 left-6 z-[70] flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-2xl text-white shadow-lg transition-transform hover:scale-110"
      >
        <FaWhatsapp />
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#25D366] opacity-30" />
      </a>

      {/* Sticky Book Now — mobile only (desktop has navbar button) */}
      <Link
        href="/booking"
        className="btn-gold fixed bottom-6 right-6 z-[70] !px-6 !py-3 shadow-glow md:hidden"
      >
        Book Now
      </Link>
    </>
  );
}
