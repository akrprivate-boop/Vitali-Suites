"use client";

import { useState } from "react";
import site from "@/config/site.config";

// Event inquiry form. With no backend it opens WhatsApp with a prefilled
// message (works instantly, free). You can later wire it to an email API.
export default function InquiryForm() {
  const [form, setForm] = useState({ name: "", phone: "", date: "", type: "Birthday Party", message: "" });

  const update = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    const text = `New Event Inquiry%0A--------------------%0AName: ${form.name}%0APhone: ${form.phone}%0AEvent: ${form.type}%0ADate: ${form.date}%0ADetails: ${form.message}`;
    window.open(`https://wa.me/${site.whatsapp}?text=${text}`, "_blank");
  };

  const field =
    "w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-cream placeholder-cream/40 outline-none transition focus:border-gold";

  return (
    <div className="glass h-full rounded-2xl p-8">
      <h3 className="font-serif text-2xl font-semibold text-cream">Send an Inquiry</h3>
      <p className="mt-1 text-sm text-cream/60">We'll get back to you with a custom package.</p>
      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        <input className={field} placeholder="Your Name" required value={form.name} onChange={update("name")} />
        <input className={field} placeholder="Phone Number" required value={form.phone} onChange={update("phone")} />
        <div className="grid grid-cols-2 gap-4">
          <select className={field} value={form.type} onChange={update("type")}>
            <option className="bg-ink">Birthday Party</option>
            <option className="bg-ink">Corporate Event</option>
            <option className="bg-ink">Family Gathering</option>
            <option className="bg-ink">Celebration</option>
          </select>
          <input type="date" className={field} value={form.date} onChange={update("date")} />
        </div>
        <textarea className={field} rows={3} placeholder="Tell us about your event..." value={form.message} onChange={update("message")} />
        <button type="submit" className="btn-gold w-full">Send via WhatsApp</button>
      </form>
    </div>
  );
}
