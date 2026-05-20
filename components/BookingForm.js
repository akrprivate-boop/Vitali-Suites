"use client";

import { useState, useEffect, useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import rooms from "@/config/rooms.config";
import site from "@/config/site.config";
import { applyOffer, formatINR, getActiveOffer } from "@/lib/pricing";
import { FaWhatsapp } from "react-icons/fa";

// Loads the Razorpay checkout script once.
function loadRazorpay() {
  return new Promise((resolve) => {
    if (typeof window === "undefined") return resolve(false);
    if (window.Razorpay) return resolve(true);
    const s = document.createElement("script");
    s.src = "https://checkout.razorpay.com/v1/checkout.js";
    s.onload = () => resolve(true);
    s.onerror = () => resolve(false);
    document.body.appendChild(s);
  });
}

export default function BookingForm() {
  const router = useRouter();
  const params = useSearchParams();

  // Pre-select room from ?room=slug, else first room.
  const initialRoom = params.get("room") || rooms[0].slug;

  const [roomSlug, setRoomSlug] = useState(initialRoom);
  const [stayType, setStayType] = useState("full"); // "full" | "half"
  const [checkIn, setCheckIn] = useState("");
  const [guest, setGuest] = useState({ name: "", email: "", phone: "", guests: 1, notes: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const room = useMemo(() => rooms.find((r) => r.slug === roomSlug) || rooms[0], [roomSlug]);

  // If chosen room has no half-day, force full-day.
  useEffect(() => {
    if (!room.halfDay.enabled && stayType === "half") setStayType("full");
  }, [room, stayType]);

  // Price calc
  const basePrice = stayType === "half" ? room.halfDay.price : room.fullDay.price;
  const priced = applyOffer(basePrice);
  const payPercent = site.payment.payPercent ?? 100;
  const payable = Math.round((priced.final * payPercent) / 100);
  const activeOffer = getActiveOffer();

  const update = (k) => (e) => setGuest({ ...guest, [k]: e.target.value });

  const handlePay = async (e) => {
    e.preventDefault();
    setError("");

    if (!checkIn) return setError("Please choose a check-in date.");
    if (!guest.name || !guest.phone) return setError("Please enter your name and phone number.");

    // If online payments are turned off, fall back to WhatsApp booking request.
    if (!site.payment.onlinePaymentsEnabled) {
      const text = `Booking Request%0A----------------%0ARoom: ${room.name}%0AStay: ${
        stayType === "half" ? "Half Day" : "Full Day"
      }%0ADate: ${checkIn}%0AGuests: ${guest.guests}%0AName: ${guest.name}%0APhone: ${guest.phone}`;
      window.open(`https://wa.me/${site.whatsapp}?text=${text}`, "_blank");
      return;
    }

    setLoading(true);
    try {
      const ok = await loadRazorpay();
      if (!ok) throw new Error("Could not load payment gateway. Check your connection.");

      // 1) Create an order on our server
      const orderRes = await fetch("/api/razorpay/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: payable,
          roomSlug: room.slug,
          stayType,
          checkIn,
        }),
      });
      const order = await orderRes.json();
      if (!orderRes.ok) throw new Error(order.error || "Could not create order.");

      // 2) Open Razorpay checkout
      const rzp = new window.Razorpay({
        key: order.keyId,
        amount: order.amount,
        currency: order.currency,
        name: site.name,
        description: `${room.name} — ${stayType === "half" ? "Half Day" : "Full Day"} (${checkIn})`,
        order_id: order.id,
        prefill: { name: guest.name, email: guest.email, contact: guest.phone },
        notes: { room: room.name, stayType, checkIn },
        theme: { color: "#c9a35e" },
        handler: async (response) => {
          // 3) Verify the signature on our server
          const verifyRes = await fetch("/api/razorpay/verify", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              ...response,
              booking: {
                roomName: room.name,
                stayType: stayType === "half" ? "Half Day" : "Full Day",
                checkIn,
                guests: guest.guests,
                amount: payable,
                guestName: guest.name,
                guestEmail: guest.email,
                guestPhone: guest.phone,
              },
            }),
          });
          const verify = await verifyRes.json();
          if (verify.valid) {
            const q = new URLSearchParams({
              status: "success",
              room: room.name,
              amount: String(payable),
              pid: response.razorpay_payment_id,
            });
            router.push(`/booking/success?${q.toString()}`);
          } else {
            router.push(`/booking/success?status=failed`);
          }
        },
        modal: {
          ondismiss: () => setLoading(false),
        },
      });
      rzp.on("payment.failed", () => {
        setLoading(false);
        router.push(`/booking/success?status=failed`);
      });
      rzp.open();
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  const field =
    "w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-cream placeholder-cream/40 outline-none transition focus:border-gold";

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
      {/* ---- Left: form ---- */}
      <form onSubmit={handlePay} className="glass rounded-2xl p-6 md:p-8">
        <h2 className="font-serif text-2xl font-semibold text-cream">Booking Details</h2>

        {/* Room select */}
        <label className="mt-6 block text-xs uppercase tracking-wider text-cream/60">Select Room</label>
        <select className={`${field} mt-2`} value={roomSlug} onChange={(e) => setRoomSlug(e.target.value)}>
          {rooms.map((r) => (
            <option key={r.slug} value={r.slug} className="bg-ink">
              {r.name}
            </option>
          ))}
        </select>

        {/* Stay type toggle */}
        <label className="mt-6 block text-xs uppercase tracking-wider text-cream/60">Stay Type</label>
        <div className="mt-2 grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => setStayType("full")}
            className={`rounded-xl border p-4 text-left transition ${
              stayType === "full" ? "border-gold bg-gold/10" : "border-white/10 bg-white/5"
            }`}
          >
            <p className="font-medium text-cream">{room.fullDay.label}</p>
            <p className="text-sm text-gold">{formatINR(applyOffer(room.fullDay.price).final)}</p>
          </button>

          <button
            type="button"
            disabled={!room.halfDay.enabled}
            onClick={() => setStayType("half")}
            className={`rounded-xl border p-4 text-left transition disabled:cursor-not-allowed disabled:opacity-40 ${
              stayType === "half" ? "border-gold bg-gold/10" : "border-white/10 bg-white/5"
            }`}
          >
            <p className="font-medium text-cream">{room.halfDay.label}</p>
            {room.halfDay.enabled ? (
              <>
                <p className="text-sm text-gold">{formatINR(applyOffer(room.halfDay.price).final)}</p>
                <p className="mt-1 text-[11px] text-cream/50">{room.halfDay.description}</p>
              </>
            ) : (
              <p className="text-xs text-cream/40">Not available</p>
            )}
          </button>
        </div>

        {/* Date + guests */}
        <div className="mt-6 grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs uppercase tracking-wider text-cream/60">Check-in Date</label>
            <input
              type="date"
              className={`${field} mt-2`}
              value={checkIn}
              min={new Date().toISOString().split("T")[0]}
              onChange={(e) => setCheckIn(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-xs uppercase tracking-wider text-cream/60">Guests</label>
            <input
              type="number"
              min={1}
              max={room.maxGuests}
              className={`${field} mt-2`}
              value={guest.guests}
              onChange={update("guests")}
            />
          </div>
        </div>

        {/* Guest details */}
        <div className="mt-6 space-y-4">
          <input className={field} placeholder="Full Name *" required value={guest.name} onChange={update("name")} />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <input className={field} placeholder="Phone *" required value={guest.phone} onChange={update("phone")} />
            <input className={field} type="email" placeholder="Email (for confirmation)" value={guest.email} onChange={update("email")} />
          </div>
          <textarea className={field} rows={2} placeholder="Special requests (optional)" value={guest.notes} onChange={update("notes")} />
        </div>

        {error && <p className="mt-4 rounded-lg bg-red-500/10 px-4 py-2 text-sm text-red-300">{error}</p>}
      </form>

      {/* ---- Right: summary ---- */}
      <div className="lg:sticky lg:top-24 lg:h-fit">
        <div className="glass rounded-2xl p-6">
          <h3 className="font-serif text-xl font-semibold text-cream">Price Summary</h3>
          <div className="mt-5 space-y-3 text-sm">
            <Row label="Room" value={room.name} />
            <Row label="Stay" value={stayType === "half" ? "Half Day" : "Full Day"} />
            <Row label="Base price" value={formatINR(priced.original)} />
            {priced.hasDiscount && (
              <Row
                label={`Offer ${activeOffer ? `(${activeOffer.code})` : ""}`}
                value={`− ${formatINR(priced.original - priced.final)}`}
                gold
              />
            )}
            <div className="border-t border-white/10 pt-3">
              <Row label="Subtotal" value={formatINR(priced.final)} />
            </div>
            {payPercent < 100 && (
              <Row label={`Pay now (${payPercent}% advance)`} value={formatINR(payable)} gold />
            )}
          </div>

          <div className="mt-5 flex items-baseline justify-between border-t border-white/10 pt-4">
            <span className="text-cream/70">Payable now</span>
            <span className="font-serif text-3xl font-semibold text-gradient">{formatINR(payable)}</span>
          </div>

          <button onClick={handlePay} disabled={loading} className="btn-gold mt-6 w-full disabled:opacity-60">
            {loading
              ? "Processing..."
              : site.payment.onlinePaymentsEnabled
              ? "Pay & Confirm"
              : "Request Booking"}
          </button>

          {site.payment.onlinePaymentsEnabled && (
            <p className="mt-3 text-center text-[11px] text-cream/50">
              Secure payment via Razorpay · UPI · Cards · Net Banking
            </p>
          )}

          <a
            href={`https://wa.me/${site.whatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 flex items-center justify-center gap-2 text-sm text-cream/60 hover:text-gold"
          >
            <FaWhatsapp /> Need help? Chat with us
          </a>
        </div>
      </div>
    </div>
  );
}

function Row({ label, value, gold }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-cream/60">{label}</span>
      <span className={gold ? "text-gold" : "text-cream"}>{value}</span>
    </div>
  );
}
