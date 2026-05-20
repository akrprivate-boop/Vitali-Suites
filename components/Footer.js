import Link from "next/link";
import { FaInstagram, FaFacebookF, FaPhoneAlt, FaEnvelope } from "react-icons/fa";
import site from "@/config/site.config";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-ink">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 md:grid-cols-4 md:px-8">
        <div>
          <p className="font-serif text-2xl font-semibold text-gradient">{site.name}</p>
          <p className="mt-1 text-[10px] uppercase tracking-[0.3em] text-cream/50">Luxury Suites</p>
          <p className="mt-4 max-w-xs text-sm text-cream/60">{site.shortDescription}</p>
        </div>

        <div>
          <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gold">Explore</h4>
          <ul className="space-y-2 text-sm text-cream/60">
            <li><Link href="/rooms" className="hover:text-gold">Rooms & Suites</Link></li>
            <li><Link href="/events" className="hover:text-gold">Events & Parties</Link></li>
            <li><Link href="/#gallery" className="hover:text-gold">Gallery</Link></li>
            <li><Link href="/booking" className="hover:text-gold">Book Now</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gold">Contact</h4>
          <ul className="space-y-3 text-sm text-cream/60">
            <li className="flex items-center gap-2">
              <FaPhoneAlt className="text-gold" />
              <a href={`tel:${site.phoneDial}`} className="hover:text-gold">{site.phone}</a>
            </li>
            <li className="flex items-center gap-2">
              <FaEnvelope className="text-gold" />
              <a href={`mailto:${site.email}`} className="hover:text-gold">{site.email}</a>
            </li>
            <li className="text-cream/60">
              {site.address.line1}, {site.address.city}
            </li>
          </ul>
        </div>

        <div>
          <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gold">Follow Us</h4>
          <div className="flex gap-3">
            {site.social.instagram && (
              <a href={site.social.instagram} target="_blank" rel="noopener noreferrer"
                 className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-cream/70 transition hover:border-gold hover:text-gold">
                <FaInstagram />
              </a>
            )}
            {site.social.facebook && (
              <a href={site.social.facebook} target="_blank" rel="noopener noreferrer"
                 className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-cream/70 transition hover:border-gold hover:text-gold">
                <FaFacebookF />
              </a>
            )}
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 py-5 text-center text-xs text-cream/40">
        © {new Date().getFullYear()} {site.name}. All rights reserved.
      </div>
    </footer>
  );
}
