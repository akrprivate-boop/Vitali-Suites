# 💳 Payment Setup Guide — Razorpay (for Vitali Suites)

This guide takes you from zero to accepting **UPI, Cards, and Net Banking** payments,
with money landing in your bank account.

---

## Why Razorpay (vs Cashfree / PhonePe)?

| Feature              | Razorpay ⭐ | Cashfree | PhonePe Business |
|----------------------|------------|----------|------------------|
| UPI / Cards / NetBanking | ✅ All  | ✅ All   | ✅ (UPI-focused) |
| Easiest setup        | ✅ Best    | Good     | Medium           |
| Test/sandbox mode    | ✅ Excellent | Good   | Limited          |
| Per-transaction fee  | ~2%        | ~1.75–2% | ~1.8%            |
| Setup / annual fee   | ₹0         | ₹0       | ₹0               |
| Developer docs       | ✅ Best    | Good     | Basic            |
| Settlement to bank   | T+2 days   | T+1/T+2  | T+1              |

**Recommendation: Razorpay.** Best for beginners, best documentation, and this
website is already wired for it. (Cashfree is a close second if you want T+1
settlement; the integration code would be very similar.)

---

## Step 1 — Create your merchant account

1. Go to **https://razorpay.com** → **Sign Up**.
2. Use your business email and create a password.
3. Choose account type: **Individual** or **Proprietorship / Company** (whatever your
   hotel is registered as). Individual works if you're a sole owner.
4. Verify your email and phone.

## Step 2 — Complete KYC (required to receive real money)

In the Razorpay Dashboard → **Account & Settings → Complete KYC**, you'll provide:
- **PAN card** (business or personal)
- **Bank account details** (account number + IFSC — this is where your money goes)
- **Business proof** (GST certificate, shop license, or utility bill)
- **Address proof**

> KYC approval usually takes **1–2 business days**. You can build and **test**
> everything before KYC is approved using **Test Mode** keys.

## Step 3 — Get your API keys

1. In the Dashboard, toggle to **Test Mode** (switch at the top).
2. Go to **Settings → API Keys → Generate Test Key**.
3. You'll get:
   - **Key ID** — looks like `rzp_test_AbC123...`
   - **Key Secret** — shown **once**, copy it immediately.

## Step 4 — Where to add the keys

Open the file **`.env.local`** in the project root (copy it from
`.env.local.example` if it doesn't exist yet) and paste:

```
NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_test_AbC123...
RAZORPAY_KEY_SECRET=your_secret_here
```

- `NEXT_PUBLIC_RAZORPAY_KEY_ID` → the public Key ID (safe in the browser).
- `RAZORPAY_KEY_SECRET` → the secret. **Never share it or commit it to GitHub.**
  (It's already in `.gitignore`.)

Restart the dev server (`npm run dev`) after changing `.env.local`.

> 🔑 On Vercel (live site) you add these same two variables under
> **Project → Settings → Environment Variables**. See `DEPLOYMENT_GUIDE.md`.

## Step 5 — Test payments before going live

With Test keys active, open `/booking`, fill the form, click **Pay & Confirm**.
Use Razorpay's test instruments:

- **Test card:** `4111 1111 1111 1111`, expiry any future date (e.g. 12/30), CVV any 3 digits.
- **Test UPI:** enter `success@razorpay` to simulate success, `failure@razorpay` to simulate failure.
- **Net Banking:** pick any bank in the test popup and click "Success".

A successful test sends you to the **Booking Confirmed** page. You can see every test
transaction in **Dashboard → Transactions** (Test Mode).

## Step 6 — Go live

1. Finish KYC (Step 2). Once approved, switch the Dashboard to **Live Mode**.
2. **Settings → API Keys → Generate Live Key** → you get `rzp_live_...` keys.
3. Replace the values in `.env.local` (local) **and** in Vercel's Environment
   Variables (live site) with the live keys.
4. Redeploy. You're now accepting real payments. 🎉

---

## How settlement works (how money reaches your bank)

1. A guest pays → the money goes into your **Razorpay account balance**.
2. Razorpay automatically **settles** the balance to your linked bank account on a
   **T+2 day** cycle (T = transaction day). Example: paid Monday → in your bank Wednesday.
3. Razorpay's fee (~2% + GST) is deducted automatically; you receive the net amount.
4. You can see upcoming/settled payouts in **Dashboard → Settlements**.

You can also enable **instant settlements** (small extra fee) if you need money faster.

---

## Important notes

- **Advance vs full payment:** In `config/site.config.js` → `payment.payPercent`.
  Set `100` for full payment, or e.g. `30` to collect a 30% advance online and the
  rest at the hotel.
- **Turn payments off temporarily:** set `payment.onlinePaymentsEnabled: false`. The
  booking button then sends a WhatsApp booking request instead — useful before KYC.
- **Refunds:** issue them from the Razorpay Dashboard → Transactions → Refund. (No code
  needed.)
- **Security:** every payment is verified server-side using a signature check
  (`app/api/razorpay/verify`), so fake "success" responses are rejected.
