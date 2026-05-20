import { Suspense } from "react";
import BookingForm from "@/components/BookingForm";

export const metadata = {
  title: "Book Your Stay",
  description: "Book your room online — choose half-day or full-day, pay securely via UPI, cards or net banking.",
};

export default function BookingPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-16 md:px-8">
      <div className="mb-10 pt-6 text-center">
        <p className="kicker">Reserve Now</p>
        <h1 className="section-title mt-3">Book Your Stay</h1>
        <p className="mx-auto mt-3 max-w-xl text-cream/70">
          Select your room, choose half-day or full-day, and pay securely online.
        </p>
      </div>

      {/* Suspense is required because BookingForm reads URL query params */}
      <Suspense fallback={<div className="py-20 text-center text-cream/50">Loading booking form…</div>}>
        <BookingForm />
      </Suspense>
    </div>
  );
}
