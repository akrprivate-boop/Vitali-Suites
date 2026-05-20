import { Suspense } from "react";
import Link from "next/link";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import { formatINR } from "@/lib/pricing";
import site from "@/config/site.config";

export const metadata = { title: "Booking Status", robots: { index: false } };

function Result({ searchParams }) {
  const status = searchParams.status || "failed";
  const success = status === "success";

  if (!success) {
    return (
      <div className="glass mx-auto max-w-lg rounded-2xl p-10 text-center">
        <FaTimesCircle className="mx-auto text-6xl text-red-400" />
        <h1 className="mt-6 font-serif text-3xl font-semibold text-cream">Payment Failed</h1>
        <p className="mt-3 text-cream/70">
          Your payment could not be completed or was cancelled. No amount has been charged.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Link href="/booking" className="btn-gold">Try Again</Link>
          <a href={`https://wa.me/${site.whatsapp}`} target="_blank" rel="noopener noreferrer" className="btn-outline">
            Contact Us
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="glass mx-auto max-w-lg rounded-2xl p-10 text-center">
      <FaCheckCircle className="mx-auto text-6xl text-green-400" />
      <h1 className="mt-6 font-serif text-3xl font-semibold text-cream">Booking Confirmed!</h1>
      <p className="mt-3 text-cream/70">
        Thank you for choosing {site.name}. A confirmation has been sent to your email
        (if provided). We look forward to hosting you.
      </p>

      <div className="mt-6 space-y-2 rounded-xl bg-white/5 p-5 text-left text-sm">
        {searchParams.room && (
          <div className="flex justify-between"><span className="text-cream/60">Room</span><span className="text-cream">{searchParams.room}</span></div>
        )}
        {searchParams.amount && (
          <div className="flex justify-between"><span className="text-cream/60">Amount paid</span><span className="text-gold">{formatINR(Number(searchParams.amount))}</span></div>
        )}
        {searchParams.pid && (
          <div className="flex justify-between"><span className="text-cream/60">Payment ID</span><span className="font-mono text-xs text-cream">{searchParams.pid}</span></div>
        )}
      </div>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
        <Link href="/" className="btn-gold">Back to Home</Link>
        <a href={`tel:${site.phoneDial}`} className="btn-outline">Call Hotel</a>
      </div>
    </div>
  );
}

export default function SuccessPage({ searchParams }) {
  return (
    <div className="mx-auto max-w-7xl px-4 py-24 md:px-8">
      <Suspense fallback={<div className="text-center text-cream/50">Loading…</div>}>
        <Result searchParams={searchParams} />
      </Suspense>
    </div>
  );
}
