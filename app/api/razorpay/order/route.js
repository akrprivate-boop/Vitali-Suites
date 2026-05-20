import { NextResponse } from "next/server";
import Razorpay from "razorpay";

// Creates a Razorpay order on the server (keeps the secret key off the browser).
// POST body: { amount, roomSlug, stayType, checkIn }  — amount is in RUPEES.
export async function POST(req) {
  try {
    const { amount, roomSlug, stayType, checkIn } = await req.json();

    const keyId = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;
    const keySecret = process.env.RAZORPAY_KEY_SECRET;

    if (!keyId || !keySecret) {
      return NextResponse.json(
        { error: "Payment gateway not configured. Add Razorpay keys to .env.local" },
        { status: 500 }
      );
    }
    if (!amount || amount < 1) {
      return NextResponse.json({ error: "Invalid amount." }, { status: 400 });
    }

    const razorpay = new Razorpay({ key_id: keyId, key_secret: keySecret });

    const order = await razorpay.orders.create({
      amount: Math.round(amount * 100), // Razorpay works in paise (₹1 = 100)
      currency: "INR",
      receipt: `rcpt_${Date.now()}`,
      notes: { roomSlug, stayType, checkIn },
    });

    return NextResponse.json({
      id: order.id,
      amount: order.amount,
      currency: order.currency,
      keyId, // public key, safe to send to browser
    });
  } catch (err) {
    console.error("[razorpay/order]", err);
    return NextResponse.json({ error: "Could not create order." }, { status: 500 });
  }
}
