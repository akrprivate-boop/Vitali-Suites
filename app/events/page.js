import Image from "next/image";
import EventsSection from "@/components/EventsSection";
import eventsConfig from "@/config/events.config";

export const metadata = {
  title: "Events & Parties",
  description: "Host birthday parties, corporate events, family gatherings and celebrations at Vitali Suites. Contact us for customized packages and attractive offers.",
};

export default function EventsPage() {
  return (
    <div>
      {/* Banner */}
      <section className="relative flex h-[50vh] items-center justify-center overflow-hidden">
        <Image src={eventsConfig.bannerImage} alt="Events at Vitali Suites" fill priority className="object-cover" />
        <div className="absolute inset-0 bg-ink/60" />
        <div className="relative z-10 px-4 text-center">
          <p className="kicker">{eventsConfig.subheading}</p>
          <h1 className="mt-3 font-serif text-5xl font-semibold text-cream md:text-6xl">{eventsConfig.heading}</h1>
        </div>
      </section>

      <EventsSection showForm={true} />
    </div>
  );
}
