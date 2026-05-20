import { notFound } from "next/navigation";
import Link from "next/link";
import { FaUserFriends, FaBed, FaRulerCombined, FaCheck, FaClock } from "react-icons/fa";
import rooms, { getRoomBySlug } from "@/config/rooms.config";
import { applyOffer, formatINR } from "@/lib/pricing";
import RoomGallery from "@/components/RoomGallery";

// Pre-build a page for every room (great for SEO + speed).
export function generateStaticParams() {
  return rooms.map((r) => ({ slug: r.slug }));
}

export function generateMetadata({ params }) {
  const room = getRoomBySlug(params.slug);
  if (!room) return {};
  return {
    title: room.name,
    description: room.shortDescription,
    openGraph: { images: [room.gallery[0]] },
  };
}

export default function RoomDetailPage({ params }) {
  const room = getRoomBySlug(params.slug);
  if (!room) notFound();

  const full = applyOffer(room.fullDay.price);
  const half = applyOffer(room.halfDay.price);

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 md:px-8">
      <nav className="mb-6 pt-6 text-sm text-cream/50">
        <Link href="/rooms" className="hover:text-gold">Rooms</Link> / <span className="text-cream">{room.name}</span>
      </nav>

      <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr]">
        {/* Gallery */}
        <RoomGallery images={room.gallery} name={room.name} />

        {/* Info */}
        <div>
          <p className="kicker">{room.category}</p>
          <h1 className="mt-2 font-serif text-4xl font-semibold text-cream">{room.name}</h1>
          <p className="mt-4 text-cream/70">{room.longDescription}</p>

          <div className="mt-6 flex flex-wrap gap-5 text-sm text-cream/70">
            <span className="flex items-center gap-2"><FaUserFriends className="text-gold" /> {room.maxGuests} Guests</span>
            <span className="flex items-center gap-2"><FaBed className="text-gold" /> {room.bedType}</span>
            <span className="flex items-center gap-2"><FaRulerCombined className="text-gold" /> {room.sizeSqft} sq.ft</span>
          </div>

          {/* Pricing cards */}
          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="glass rounded-2xl p-5">
              <p className="text-xs uppercase tracking-wider text-cream/50">{room.fullDay.label}</p>
              <div className="mt-1 flex items-baseline gap-2">
                {full.hasDiscount && <span className="text-sm text-cream/40 line-through">{formatINR(full.original)}</span>}
                <span className="font-serif text-3xl font-semibold text-gradient">{formatINR(full.final)}</span>
              </div>
            </div>

            {room.halfDay.enabled && (
              <div className="glass rounded-2xl border-gold/30 p-5">
                <p className="flex items-center gap-2 text-xs uppercase tracking-wider text-gold">
                  <FaClock /> {room.halfDay.label}
                </p>
                <div className="mt-1 flex items-baseline gap-2">
                  {half.hasDiscount && <span className="text-sm text-cream/40 line-through">{formatINR(half.original)}</span>}
                  <span className="font-serif text-3xl font-semibold text-gradient">{formatINR(half.final)}</span>
                </div>
                <p className="mt-1 text-xs text-cream/60">{room.halfDay.description}</p>
              </div>
            )}
          </div>

          {/* Amenities */}
          <h3 className="mt-8 font-serif text-xl font-semibold text-cream">Amenities</h3>
          <ul className="mt-4 grid grid-cols-2 gap-3">
            {room.amenities.map((a) => (
              <li key={a} className="flex items-center gap-2 text-sm text-cream/80">
                <FaCheck className="text-gold" /> {a}
              </li>
            ))}
          </ul>

          <Link href={`/booking?room=${room.slug}`} className="btn-gold mt-8 w-full">
            Book This Room
          </Link>
        </div>
      </div>
    </div>
  );
}
