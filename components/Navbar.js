"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import site from "@/config/site.config";

const links = [
  { href: "/", label: "Home" },
  { href: "/rooms", label: "Rooms" },
  { href: "/events", label: "Events" },
  { href: "/#gallery", label: "Gallery" },
  { href: "/#contact", label: "Contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-ink/80 backdrop-blur-xl border-b border-white/10" : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 md:px-8">
        <Link href="/" className="flex flex-col leading-none">
          <span className="font-serif text-2xl font-semibold text-gradient">{site.name}</span>
          <span className="text-[10px] uppercase tracking-[0.3em] text-cream/60">Luxury Suites</span>
        </Link>

        {/* Desktop links */}
        <div className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-sm text-cream/80 transition-colors hover:text-gold"
            >
              {l.label}
            </Link>
          ))}
          <Link href="/booking" className="btn-gold !px-6 !py-2.5 text-sm">
            Book Now
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          className="text-cream md:hidden"
          aria-label="Toggle menu"
          onClick={() => setOpen((v) => !v)}
        >
          <div className="space-y-1.5">
            <span className={`block h-0.5 w-6 bg-gold transition ${open ? "translate-y-2 rotate-45" : ""}`} />
            <span className={`block h-0.5 w-6 bg-gold transition ${open ? "opacity-0" : ""}`} />
            <span className={`block h-0.5 w-6 bg-gold transition ${open ? "-translate-y-2 -rotate-45" : ""}`} />
          </div>
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="border-t border-white/10 bg-ink/95 px-4 py-4 md:hidden">
          <div className="flex flex-col gap-4">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="text-cream/80 hover:text-gold"
              >
                {l.label}
              </Link>
            ))}
            <Link href="/booking" onClick={() => setOpen(false)} className="btn-gold text-sm">
              Book Now
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
