import Image from "next/image";
import { FaWhatsapp, FaPhoneAlt, FaCheck } from "react-icons/fa";
import eventsConfig from "@/config/events.config";
import site from "@/config/site.config";
import Reveal from "@/components/Reveal";
import InquiryForm from "@/components/InquiryForm";

export default function EventsSection({ showForm = true }) {
  const waLink = `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(
    "Hi, I'd like to inquire about hosting an event at Vitali Suites."
  )}`;

  return (
    <section className="mx-auto max-w-7xl px-4 py-24 md:px-8">
      <Reveal className="mb-14 text-center">
        <p className="kicker">{eventsConfig.subheading}</p>
        <h2 className="section-title mt-3">{eventsConfig.heading}</h2>
        <p className="mx-auto mt-4 max-w-2xl text-cream/70">{eventsConfig.intro}</p>
      </Reveal>

      {/* Event type cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {eventsConfig.types.map((ev, i) => (
          <Reveal key={ev.title} delay={i * 0.08}>
            <div className="group relative h-72 overflow-hidden rounded-2xl">
              <Image
                src={ev.image}
                alt={ev.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                sizes="(max-width: 768px) 100vw, 25vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-transparent" />
              <div className="absolute bottom-0 p-5">
                <h3 className="font-serif text-xl font-semibold text-cream">{ev.title}</h3>
                <p className="mt-1 text-xs text-cream/70">{ev.description}</p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>

      {/* Facilities + contact */}
      <div className="mt-14 grid gap-8 lg:grid-cols-2">
        <Reveal>
          <div className="glass h-full rounded-2xl p-8">
            <h3 className="font-serif text-2xl font-semibold text-cream">Event Facilities</h3>
            <ul className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {eventsConfig.facilities.map((f) => (
                <li key={f} className="flex items-center gap-2 text-sm text-cream/80">
                  <FaCheck className="text-gold" /> {f}
                </li>
              ))}
            </ul>
            <p className="mt-6 rounded-xl bg-gold/10 p-4 text-sm text-gold">
              Contact us for attractive offers and customized packages.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <a href={waLink} target="_blank" rel="noopener noreferrer"
                 className="flex flex-1 items-center justify-center gap-2 rounded-full bg-[#25D366] px-5 py-3 font-medium text-white transition hover:opacity-90">
                <FaWhatsapp className="text-lg" /> WhatsApp Us
              </a>
              <a href={`tel:${site.phoneDial}`}
                 className="btn-outline flex-1">
                <FaPhoneAlt /> Call Now
              </a>
            </div>
          </div>
        </Reveal>

        {showForm && (
          <Reveal delay={0.1}>
            <InquiryForm />
          </Reveal>
        )}
      </div>
    </section>
  );
}
