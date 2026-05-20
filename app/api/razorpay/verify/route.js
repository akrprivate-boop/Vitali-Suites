import { NextResponse } from "next/server";
import crypto from "crypto";
import { sendBookingEmails } from "@/lib/email";

// Verifies the Razorpay payment signature so we KNOW the payment is genuine.
// Razorpay sends: razorpay_order_id, razorpay_payment_id, razorpay_signature.
// The valid signature = HMAC_SHA256(order_id + "|" + payment_id, KEY_SECRET).
export async function POST(req) {
  try {
    const body = await req.json();
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, booking } = body;

    const secret = process.env.RAZORPAY_KEY_SECRET;
    if (!secret) {
      return NextResponse.json({ valid: false, error: "Not configured" }, { status: 500 });
    }

    const expected = crypto
      .createHmac("sha256", secret)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex");

    const valid = expected === razorpay_signature;

    if (valid && booking) {
      // Fire-and-forget confirmation email (won't block the response).
      sendBookingEmails({ ...booking, paymentId: razorpay_payment_id }).catch(() => {});
    }

    return NextResponse.json({ valid });
  } catch (err) {
    console.error("[razorpay/verify]", err);
    return NextResponse.json({ valid: false }, { status: 500 });
  }
}
