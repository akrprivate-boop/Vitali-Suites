import offersConfig from "@/config/offers.config";
import { getActiveOffer } from "@/lib/pricing";
import Reveal from "@/components/Reveal";
import Link from "next/link";

// Shows currently-active offers as elegant cards.
export default function OffersSection() {
  const today = new Date();
  const activeOffers = offersConfig.offers.filter((o) => {
    if (!o.enabled) return false;
    const start = new Date(o.startDate + "T00:00:00");
    const end = new Date(o.endDate + "T23:59:59");
    return today >= start && today <= end;
  });

  if (!activeOffers.length) return null;
  const best = getActiveOffer();

  return (
    <section className="mx-auto max-w-7xl px-4 py-24 md:px-8">
      <Reveal className="mb-14 text-center">
        <p className="kicker">Limited Time</p>
        <h2 className="section-title mt-3">Special Offers</h2>
        <p className="mx-auto mt-4 max-w-2xl text-cream/70">
          Save more on your stay with our seasonal deals.
          {best && ` Best price applied automatically at checkout.`}
        </p>
      </Reveal>

      <div className="grid gap-6 md:grid-cols-3">
        {activeOffers.map((o, i) => (
          <Reveal key={o.id} delay={i * 0.1}>
            <div className="glass relative overflow-hidden rounded-2xl p-7">
              <div className="absolute -right-6 -top-6 flex h-24 w-24 rotate-12 items-center justify-center rounded-2xl bg-gold-gradient text-ink">
                <span className="font-serif text-xl font-bold">{o.badge}</span>
              </div>
              <h3 className="font-serif text-2xl font-semibold text-cream">{o.title}</h3>
              <p className="mt-3 text-sm text-cream/70">{o.description}</p>
              <div className="mt-5 flex items-center gap-3">
                <span className="rounded-lg border border-dashed border-gold/50 px-3 py-1.5 font-mono text-sm tracking-widest text-gold">
                  {o.code}
                </span>
                <span className="text-xs text-cream/50">Valid till {o.endDate}</span>
              </div>
              <Link href="/booking" className="btn-gold mt-6 w-full !py-2.5 text-sm">
                Claim Offer
              </Link>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
