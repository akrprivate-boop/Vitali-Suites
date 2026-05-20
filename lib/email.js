// =====================================================================
//  BOOKING CONFIRMATION EMAIL (optional, via Resend)
//  If RESEND_API_KEY is not set, this silently does nothing — the booking
//  still succeeds. Uses fetch() so there's no extra package to install.
// =====================================================================

import site from "@/config/site.config";
import { formatINR } from "@/lib/pricing";

export async function sendBookingEmails(booking) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.log("[email] RESEND_API_KEY not set — skipping confirmation email.");
    return { sent: false, reason: "no-api-key" };
  }

  const from = process.env.EMAIL_FROM || "Vitali Suites <onboarding@resend.dev>";
  const hotelEmail = process.env.EMAIL_TO_HOTEL || site.email;

  const html = `
    <div style="font-family:Arial,sans-serif;max-width:560px;margin:auto;border:1px solid #eee;border-radius:12px;overflow:hidden">
      <div style="background:#0e0f12;color:#c9a35e;padding:24px;text-align:center">
        <h1 style="margin:0;font-size:22px;">${site.name}</h1>
        <p style="margin:4px 0 0;color:#e0c98a;">Booking Confirmed</p>
      </div>
      <div style="padding:24px;color:#222;line-height:1.6">
        <p>Dear ${booking.guestName},</p>
        <p>Thank you for your booking. Here are your details:</p>
        <table style="width:100%;border-collapse:collapse">
          <tr><td style="padding:6px 0;color:#777">Room</td><td style="text-align:right"><b>${booking.roomName}</b></td></tr>
          <tr><td style="padding:6px 0;color:#777">Stay type</td><td style="text-align:right">${booking.stayType}</td></tr>
          <tr><td style="padding:6px 0;color:#777">Check-in</td><td style="text-align:right">${booking.checkIn}</td></tr>
          <tr><td style="padding:6px 0;color:#777">Guests</td><td style="text-align:right">${booking.guests}</td></tr>
          <tr><td style="padding:6px 0;color:#777">Amount paid</td><td style="text-align:right"><b>${formatINR(booking.amount)}</b></td></tr>
          <tr><td style="padding:6px 0;color:#777">Payment ID</td><td style="text-align:right">${booking.paymentId}</td></tr>
        </table>
        <p style="margin-top:16px">We look forward to hosting you. For any changes, call us at ${site.phone}.</p>
        <p style="color:#777;font-size:13px">${site.address.line1}, ${site.address.city}</p>
      </div>
    </div>`;

  async function send(to, subject) {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ from, to, subject, html }),
    });
    return res.ok;
  }

  try {
    // Email the guest + a copy to the hotel
    if (booking.guestEmail) await send(booking.guestEmail, `Booking Confirmed — ${site.name}`);
    await send(hotelEmail, `New Booking: ${booking.roomName} — ${booking.guestName}`);
    return { sent: true };
  } catch (err) {
    console.error("[email] failed:", err);
    return { sent: false, reason: "send-failed" };
  }
}
