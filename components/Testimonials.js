import { FaStar, FaQuoteLeft } from "react-icons/fa";
import testimonials from "@/config/testimonials.config";
import Reveal from "@/components/Reveal";

export default function Testimonials() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-24 md:px-8">
      <Reveal className="mb-14 text-center">
        <p className="kicker">Guest Love</p>
        <h2 className="section-title mt-3">What Our Guests Say</h2>
      </Reveal>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {testimonials.map((t, i) => (
          <Reveal key={i} delay={i * 0.08}>
            <div className="glass card-hover flex h-full flex-col rounded-2xl p-6">
              <FaQuoteLeft className="text-2xl text-gold/40" />
              <p className="mt-4 flex-1 text-sm leading-relaxed text-cream/80">{t.text}</p>
              <div className="mt-5 flex gap-1 text-gold">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <FaStar key={j} className="text-sm" />
                ))}
              </div>
              <div className="mt-3 border-t border-white/10 pt-3">
                <p className="font-medium text-cream">{t.name}</p>
                <p className="text-xs text-cream/50">{t.location}</p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
