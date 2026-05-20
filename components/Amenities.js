import {
  FaWifi,
  FaSwimmingPool,
  FaParking,
  FaUtensils,
  FaSnowflake,
  FaConciergeBell,
  FaBell,
  FaGlassCheers,
} from "react-icons/fa";
import hotelAmenities from "@/config/amenities.config";
import Reveal from "@/components/Reveal";

// Maps the `icon` string from config to an actual icon component.
const ICONS = {
  wifi: FaWifi,
  pool: FaSwimmingPool,
  parking: FaParking,
  restaurant: FaUtensils,
  ac: FaSnowflake,
  service: FaConciergeBell,
  reception: FaBell,
  events: FaGlassCheers,
};

export default function Amenities() {
  return (
    <section className="bg-ink-soft py-24">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <Reveal className="mb-14 text-center">
          <p className="kicker">Why Choose Us</p>
          <h2 className="section-title mt-3">World-Class Amenities</h2>
        </Reveal>

        <div className="grid grid-cols-2 gap-5 md:grid-cols-4">
          {hotelAmenities.map((a, i) => {
            const Icon = ICONS[a.icon] || FaBell;
            return (
              <Reveal key={a.label} delay={i * 0.06}>
                <div className="glass-light card-hover flex flex-col items-center gap-3 rounded-2xl p-7 text-center">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gold/10 text-2xl text-gold">
                    <Icon />
                  </div>
                  <span className="text-sm text-cream/80">{a.label}</span>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
