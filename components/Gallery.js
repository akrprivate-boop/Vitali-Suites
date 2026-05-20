"use client";

import Image from "next/image";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import galleryImages from "@/config/gallery.config";
import Reveal from "@/components/Reveal";

export default function Gallery() {
  const [active, setActive] = useState(null); // index of opened image (lightbox)

  return (
    <section id="gallery" className="bg-ink-soft py-24">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <Reveal className="mb-14 text-center">
          <p className="kicker">Moments</p>
          <h2 className="section-title mt-3">Photo Gallery</h2>
        </Reveal>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
          {galleryImages.map((img, i) => (
            <Reveal key={i} delay={(i % 3) * 0.08}>
              <button
                onClick={() => setActive(i)}
                className={`group relative block w-full overflow-hidden rounded-2xl ${
                  i % 5 === 0 ? "row-span-2 h-80" : "h-44 md:h-56"
                }`}
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  sizes="(max-width: 768px) 50vw, 33vw"
                />
                <div className="absolute inset-0 flex items-end bg-gradient-to-t from-ink/80 to-transparent p-4 opacity-0 transition-opacity group-hover:opacity-100">
                  <span className="text-sm text-cream">{img.caption}</span>
                </div>
              </button>
            </Reveal>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {active !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActive(null)}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-ink/95 p-4"
          >
            <button
              className="absolute right-6 top-6 text-3xl text-cream/70 hover:text-gold"
              onClick={() => setActive(null)}
            >
              ✕
            </button>
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              className="relative h-[80vh] w-full max-w-4xl"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={galleryImages[active].src}
                alt={galleryImages[active].alt}
                fill
                className="rounded-2xl object-contain"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
