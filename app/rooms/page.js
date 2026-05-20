import rooms from "@/config/rooms.config";
import RoomCard from "@/components/RoomCard";
import Reveal from "@/components/Reveal";

export const metadata = {
  title: "Rooms & Suites",
  description: "Browse our AC Rooms, Non-AC Rooms and luxury Suites. Half-day & full-day booking with instant online payment.",
};

export default function RoomsPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16 md:px-8">
      <Reveal className="mb-12 pt-8 text-center">
        <p className="kicker">Stay With Us</p>
        <h1 className="section-title mt-3">Rooms & Suites</h1>
        <p className="mx-auto mt-4 max-w-2xl text-cream/70">
          Every room comes with flexible half-day and full-day options, premium bedding, and
          our signature hospitality.
        </p>
      </Reveal>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {rooms.map((room, i) => (
          <Reveal key={room.slug} delay={i * 0.1}>
            <RoomCard room={room} />
          </Reveal>
        ))}
      </div>
    </div>
  );
}
