import Link from "next/link";
import rooms from "@/config/rooms.config";
import RoomCard from "@/components/RoomCard";
import Reveal from "@/components/Reveal";

// Home-page room showcase (server component — just renders the config).
export default function RoomShowcase() {
  return (
    <section id="rooms" className="mx-auto max-w-7xl px-4 py-24 md:px-8">
      <Reveal className="mb-14 text-center">
        <p className="kicker">Our Accommodations</p>
        <h2 className="section-title mt-3">Rooms & Suites</h2>
        <p className="mx-auto mt-4 max-w-2xl text-cream/70">
          Choose from our thoughtfully designed rooms. Every stay includes flexible
          half-day and full-day options.
        </p>
      </Reveal>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {rooms.map((room, i) => (
          <Reveal key={room.slug} delay={i * 0.1}>
            <RoomCard room={room} />
          </Reveal>
        ))}
      </div>

      <div className="mt-12 text-center">
        <Link href="/rooms" className="btn-outline">
          View All Rooms
        </Link>
      </div>
    </section>
  );
}
