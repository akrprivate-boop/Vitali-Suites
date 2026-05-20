"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaChevronDown } from "react-icons/fa";
import faqs from "@/config/faq.config";
import Reveal from "@/components/Reveal";

export default function FAQ() {
  const [open, setOpen] = useState(0);

  return (
    <section className="bg-ink-soft py-24">
      <div className="mx-auto max-w-3xl px-4 md:px-8">
        <Reveal className="mb-14 text-center">
          <p className="kicker">Good to Know</p>
          <h2 className="section-title mt-3">Frequently Asked Questions</h2>
        </Reveal>

        <div className="space-y-4">
          {faqs.map((f, i) => (
            <Reveal key={i} delay={i * 0.04}>
              <div className="glass overflow-hidden rounded-2xl">
                <button
                  onClick={() => setOpen(open === i ? -1 : i)}
                  className="flex w-full items-center justify-between gap-4 p-5 text-left"
                >
                  <span className="font-medium text-cream">{f.q}</span>
                  <FaChevronDown
                    className={`shrink-0 text-gold transition-transform ${open === i ? "rotate-180" : ""}`}
                  />
                </button>
                <AnimatePresence>
                  {open === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <p className="px-5 pb-5 text-sm leading-relaxed text-cream/70">{f.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
