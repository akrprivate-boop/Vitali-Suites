# 🏨 Vitali Suites — Luxury Hotel Website

A premium, mobile-responsive hotel website with online room booking, half-day/full-day
stays, Indian online payments (UPI / Cards / Net Banking via **Razorpay**), offers,
events, and SEO — built with **Next.js + Tailwind CSS + Framer Motion**.

Everything you'll ever need to change (prices, offers, photos, phone number, payment
settings) lives in plain-English **config files** — no coding required.

---

## 📑 Table of Contents
1. [What you can do without coding](#-what-you-can-do-without-coding)
2. [Quick start (run it on your computer)](#-quick-start)
3. [Folder structure](#-folder-structure)
4. [How to edit prices](#-how-to-edit-prices)
5. [How to add / change offers](#-how-to-add--change-offers)
6. [How to replace images](#-how-to-replace-images)
7. [How to change phone / WhatsApp / contact](#-how-to-change-contact-details)
8. [Half-day booking system](#-half-day-booking-system)
9. [Payment setup (Razorpay) — full guide](#-payment-setup-razorpay)
10. [Free hosting & deployment](#-free-hosting--deployment)
11. [Booking confirmation emails (optional)](#-booking-confirmation-emails-optional)
12. [SEO checklist](#-seo-checklist)
13. [FAQ / troubleshooting](#-troubleshooting)

---

## ✅ What you can do without coding

Open these files in any text editor (even Notepad, but **VS Code** is recommended) and
change the text inside the quotes:

| I want to change…            | Edit this file                        |
|------------------------------|---------------------------------------|
| Hotel name, tagline, address | `config/site.config.js`               |
| Phone / WhatsApp / email     | `config/site.config.js`               |
| UPI ID & payment settings    | `config/site.config.js`               |
| Room prices (full & half day)| `config/rooms.config.js`              |
| Room photos & amenities      | `config/rooms.config.js`              |
| Offers / discounts / banner  | `config/offers.config.js`             |
| Events & party content       | `config/events.config.js`             |
| Guest testimonials           | `config/testimonials.config.js`       |
| FAQ questions                | `config/faq.config.js`                |
| Gallery photos               | `config/gallery.config.js`            |
| Hotel-wide amenities         | `config/amenities.config.js`          |

> **Golden rule:** only change text **inside the quotation marks** `"like this"`.
> Don't delete commas, brackets `{ }` or square brackets `[ ]`.

---

## 🚀 Quick Start

You need **Node.js 18+** installed (you already have v22 ✓). In a terminal:

```bash
# 1. Go into the project folder
cd vitali-suites

# 2. Install dependencies (one time, ~1 min)
npm install

# 3. Create your environment file
#    Windows PowerShell:
copy .env.local.example .env.local
#    Mac/Linux:
cp .env.local.example .env.local

# 4. Start the website locally
npm run dev
```

Open **http://localhost:3000** in your browser. The site works immediately with demo
content. Payments need Razorpay keys (see below) — until then the booking button falls
back to a WhatsApp booking request.

---

## 📁 Folder Structure

```
vitali-suites/
├── app/                      # Pages (Next.js App Router)
│   ├── page.js               # Home page
│   ├── layout.js             # Shared shell, SEO meta, fonts, schema
│   ├── rooms/                # /rooms list + /rooms/[slug] detail
│   ├── events/               # /events page
│   ├── booking/              # /booking + /booking/success
│   └── api/razorpay/         # Payment server routes (order + verify)
├── components/               # Reusable UI (Hero, Navbar, cards, forms…)
├── config/                   # ⭐ EDIT THESE — all your content & settings
├── lib/                      # Pricing/offers logic + email helper
├── public/images/            # ⭐ PUT YOUR PHOTOS HERE (see images/README.md)
├── .env.local.example        # Copy → .env.local and add your keys
└── README.md                 # This file
```

---

## 💰 How to Edit Prices

Open **`config/rooms.config.js`**. Each room looks like this:

```js
{
  name: "AC Room",
  fullDay: {
    price: 2499,            // ← change the full-day price here
    label: "Full Day (24 hrs)",
  },
  halfDay: {
    enabled: true,          // ← true = show half-day option, false = hide it
    price: 1499,            // ← change the half-day price here
    description: "Flexible check-in — perfect for day rest & business travellers",
  },
  ...
}
```

Change the number, save the file. On your live site it updates within seconds of
deploying (or instantly on `npm run dev`). **Discounts are applied automatically on
top of these prices** based on your offers (see next section).

---

## 🎉 How to Add / Change Offers

Open **`config/offers.config.js`**.

**To show/hide the top banner:**
```js
bannerEnabled: true,        // false = hide banner
bannerText: "🎉 Monsoon Special — Flat 20% OFF! Use code VITALI20",
```

**To run a discount** (it auto-applies to all room prices while it's active):
```js
{
  title: "Diwali Festive Offer",
  code: "DIWALI25",
  discountPercent: 25,       // 25% off
  enabled: true,             // ← flip to true to switch ON
  startDate: "2026-10-25",   // format: YYYY-MM-DD
  endDate: "2026-11-05",
  badge: "25% OFF",
}
```

- The offer only applies **between startDate and endDate**.
- If two offers are active, the **biggest discount** wins.
- Guests see the original price struck through and the discounted price in gold.
- Set `enabled: false` to instantly turn an offer off without deleting it.

---

## 🖼 How to Replace Images

Full guide: **`public/images/README.md`**. In short:

1. Put your photo in the right folder, e.g. `public/images/rooms/ac-1.jpg`
2. In the config file, change the demo link to your local path:
   ```js
   gallery: [
     "/images/rooms/ac-1.jpg",
     "/images/rooms/ac-2.jpg",
   ],
   ```
3. Save. Done.

**Best sizes:** Hero 2000×1200, room/gallery 1200×800, keep each under ~300 KB.
Optimize free at https://squoosh.app or https://tinypng.com.

---

## 📞 How to Change Contact Details

Open **`config/site.config.js`**:

```js
phone: "+91 90000 00000",       // shown on the site
phoneDial: "+919000000000",     // "Call Now" link — digits only, with country code
whatsapp: "919000000000",       // WhatsApp — country code + number, NO + and NO spaces
email: "stay@vitalisuites.com",
```

> ⚠️ WhatsApp number format matters: `91` (India code) + 10-digit number, no spaces,
> no `+`. Example for 98765 43210 → `919876543210`.

---

## ⏱ Half-Day Booking System

Per-room control in `config/rooms.config.js`:

- `halfDay.enabled: true/false` — turn the option on or off for that room
- `halfDay.price` — set a custom half-day price
- `halfDay.description` — custom text shown to guests, e.g.
  - `"4-hour stay available"`
  - `"Day stay for business travellers"`
  - `"Flexible check-in available"`

On the booking page guests pick **Full Day** or **Half Day** with a single tap; the
price summary updates instantly. If a room's half-day is disabled, the option is
greyed out automatically.

---

## 💳 Payment Setup (Razorpay)

👉 **Full step-by-step guide:** see **[`PAYMENT_GUIDE.md`](./PAYMENT_GUIDE.md)**

**Why Razorpay?** It's the easiest and cheapest for Indian hotels:
- Supports **UPI, Credit/Debit Cards, Net Banking, Wallets** out of the box
- No setup or annual fee; you pay **~2% per transaction** only
- Money settles to your bank account on a **T+2 day** cycle automatically
- Best documentation and test mode for beginners

Short version:
1. Sign up at https://razorpay.com → complete KYC (PAN, bank account, business proof)
2. Dashboard → **Settings → API Keys → Generate Test Keys**
3. Paste them into `.env.local`:
   ```
   NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_test_xxxxxxxx
   RAZORPAY_KEY_SECRET=your_secret
   ```
4. Test with card `4111 1111 1111 1111`, any future expiry, any CVV.
5. When approved, switch to **Live keys** (`rzp_live_...`) and redeploy.

---

## 🌐 Free Hosting & Deployment

👉 **Full step-by-step guide:** see **[`DEPLOYMENT_GUIDE.md`](./DEPLOYMENT_GUIDE.md)**

**Recommended: Vercel** (made by the creators of Next.js — easiest, free, supports
the payment API routes perfectly). Netlify and Cloudflare Pages also work but Vercel
is the smoothest for this stack.

Short version:
1. Push this folder to a **GitHub** repository
2. Go to https://vercel.com → **Add New Project** → import your repo
3. Add your environment variables (the Razorpay keys) in Vercel's settings
4. Click **Deploy**. You get a free `https://your-site.vercel.app` URL with SSL.
5. Add a custom domain in **Settings → Domains** (point your domain's DNS to Vercel).

To update the site later: just edit a config file, `git push`, and Vercel
auto-redeploys in ~1 minute.

---

## 📧 Booking Confirmation Emails (optional)

Emails are optional — booking works without them. To enable:
1. Sign up free at https://resend.com (3,000 emails/month free)
2. Get an API key, add to `.env.local`:
   ```
   RESEND_API_KEY=re_xxxxxxxx
   EMAIL_FROM=Vitali Suites <onboarding@resend.dev>
   EMAIL_TO_HOTEL=youremail@example.com
   ```
3. After a successful payment, the guest **and** you get a confirmation email.

---

## 🔍 SEO Checklist

Already built in:
- ✅ Meta title/description (per page) — edit in `config/site.config.js`
- ✅ OpenGraph + Twitter cards for nice link previews
- ✅ JSON-LD **Hotel schema** for Google rich results & local search
- ✅ Auto `sitemap.xml` and `robots.txt`
- ✅ Fast image optimization + lazy loading

After deploying:
1. Set the real `url` in `config/site.config.js`
2. Add an `og-image.jpg` (1200×630) to `public/`
3. Submit your site to **Google Search Console** (https://search.google.com/search-console)
4. Add your hotel to **Google Business Profile** for local "hotels near me" searches

---

## 🛠 Troubleshooting

| Problem | Fix |
|---------|-----|
| `npm install` fails | Make sure Node 18+ is installed: `node --version` |
| Payment says "not configured" | Add Razorpay keys to `.env.local` and restart `npm run dev` |
| Images don't show | Local paths must start with `/images/...` (not `public/...`) |
| Changes don't appear | Hard-refresh the browser (Ctrl+Shift+R); on Vercel, redeploy |
| Site looks unstyled | Run `npm install` again; ensure Tailwind built |

Need a hand? The code is heavily commented — every config file explains itself at the top.
