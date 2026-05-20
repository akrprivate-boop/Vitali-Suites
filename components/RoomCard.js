"use client";

import Image from "next/image";
import Link from "next/link";
import { FaUserFriends, FaBed } from "react-icons/fa";
import { applyOffer, formatINR } from "@/lib/pricing";

// A single room card used in the showcase + rooms page.
export default function RoomCard({ room }) {
  const full = applyOffer(room.fullDay.price);

  return (
    <div className="group glass card-hover overflow-hidden">
      {/* Image */}
      <div className="relative h-60 overflow-hidden">
        <Image
          src={room.gallery[0]}
          alt={room.name}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/80 to-transparent" />

        {/* Discount badge */}
        {full.hasDiscount && (
          <span className="absolute left-4 top-4 rounded-full bg-gold-gradient px-3 py-1 text-xs font-semibold text-ink">
            {full.discountPercent}% OFF
          </span>
        )}
        {/* Half-day badge */}
        {room.halfDay.enabled && (
          <span className="absolute right-4 top-4 rounded-full bg-ink/70 px-3 py-1 text-xs font-medium text-gold backdrop-blur">
            Half-Day available
          </span>
        )}

        <h3 className="absolute bottom-4 left-4 font-serif text-2xl font-semibold text-cream">
          {room.name}
        </h3>
      </div>

      {/* Body */}
      <div className="p-6">
        <p className="text-sm leading-relaxed text-cream/70">{room.shortDescription}</p>

        <div className="mt-4 flex items-center gap-5 text-xs text-cream/60">
          <span className="flex items-center gap-1.5">
            <FaUserFriends className="text-gold" /> {room.maxGuests} Guests
          </span>
          <span className="flex items-center gap-1.5">
            <FaBed className="text-gold" /> {room.bedType}
          </span>
        </div>

        {/* Price */}
        <div className="mt-5 flex items-end justify-between border-t border-white/10 pt-4">
          <div>
            <p className="text-[11px] uppercase tracking-wider text-cream/50">Full day from</p>
            <div className="flex items-baseline gap-2">
              {full.hasDiscount && (
                <span className="text-sm text-cream/40 line-through">{formatINR(full.original)}</span>
              )}
              <span className="font-serif text-3xl font-semibold text-gradient">
                {formatINR(full.final)}
              </span>
            </div>
            {room.halfDay.enabled && (
              <p className="mt-1 text-xs text-gold/80">
                Half day from {formatINR(applyOffer(room.halfDay.price).final)}
              </p>
            )}
          </div>
        </div>

        <div className="mt-5 flex gap-3">
          <Link href={`/rooms/${room.slug}`} className="btn-outline flex-1 !px-4 !py-2.5 text-sm">
            Details
          </Link>
          <Link href={`/booking?room=${room.slug}`} className="btn-gold flex-1 !px-4 !py-2.5 text-sm">
            Book Now
          </Link>
        </div>
      </div>
    </div>
  );
}
