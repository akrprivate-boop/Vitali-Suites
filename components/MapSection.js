import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaDirections } from "react-icons/fa";
import site from "@/config/site.config";
import Reveal from "@/components/Reveal";

export default function MapSection() {
  return (
    <section id="contact" className="mx-auto max-w-7xl px-4 py-24 md:px-8">
      <Reveal className="mb-14 text-center">
        <p className="kicker">Find Us</p>
        <h2 className="section-title mt-3">Location & Contact</h2>
      </Reveal>

      <div className="grid items-stretch gap-8 lg:grid-cols-2">
        {/* Contact details */}
        <Reveal>
          <div className="glass flex h-full flex-col justify-center gap-6 rounded-2xl p-8">
            <div className="flex items-start gap-4">
              <FaMapMarkerAlt className="mt-1 text-xl text-gold" />
              <div>
                <p className="font-medium text-cream">Address</p>
                <p className="text-sm text-cream/70">
                  {site.address.line1}, {site.address.line2}
                  <br />
                  {site.address.city}, {site.address.state} {site.address.pincode}
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <FaPhoneAlt className="mt-1 text-xl text-gold" />
              <div>
                <p className="font-medium text-cream">Phone</p>
                <a href={`tel:${site.phoneDial}`} className="text-sm text-cream/70 hover:text-gold">
                  {site.phone}
                </a>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <FaEnvelope className="mt-1 text-xl text-gold" />
              <div>
                <p className="font-medium text-cream">Email</p>
                <a href={`mailto:${site.email}`} className="text-sm text-cream/70 hover:text-gold">
                  {site.email}
                </a>
              </div>
            </div>
            <a
              href={site.mapsDirectionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gold mt-2 w-full"
            >
              <FaDirections /> Get Directions
            </a>
          </div>
        </Reveal>

        {/* Map */}
        <Reveal delay={0.1}>
          <div className="h-full min-h-[360px] overflow-hidden rounded-2xl border border-white/10">
            <iframe
              src={site.mapsEmbedUrl}
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: 360 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Hotel location map"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
