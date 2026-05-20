"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import site from "@/config/site.config";

export default function Hero() {
  return (
    <section className="relative flex min-h-[92vh] items-center justify-center overflow-hidden">
      {/* Background image — replace with /images/hero.jpg once you add your own */}
      <Image
        src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=2000&q=80"
        alt="Vitali Suites luxury hotel"
        fill
        priority
        className="object-cover"
      />
      {/* Dark gradient overlay for text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-ink/70 via-ink/50 to-ink" />

      <div className="relative z-10 mx-auto max-w-4xl px-4 text-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="kicker mb-4"
        >
          Welcome to {site.name}
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="font-serif text-5xl font-semibold leading-tight text-cream md:text-7xl"
        >
          {site.tagline}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.25 }}
          className="mx-auto mt-6 max-w-2xl text-lg text-cream/80"
        >
          {site.shortDescription}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <Link href="/booking" className="btn-gold w-full sm:w-auto">
            Book Your Stay
          </Link>
          <Link href="/rooms" className="btn-outline w-full sm:w-auto">
            Explore Rooms
          </Link>
        </motion.div>
      </div>

      {/* Scroll hint */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-cream/50">
        <div className="h-10 w-6 rounded-full border-2 border-cream/30 p-1">
          <motion.div
            className="mx-auto h-2 w-1 rounded-full bg-gold"
            animate={{ y: [0, 12, 0] }}
            transition={{ repeat: Infinity, duration: 1.6 }}
          />
        </div>
      </div>
    </section>
  );
}
