# 🌐 Deployment Guide — Free Hosting for Vitali Suites

This site is a Next.js app with server-side payment routes. That means you need a host
that runs Next.js **server functions** (not just static files).

## Which host should I pick?

| Host              | Best for           | Next.js server routes | Custom domain | SSL  | Beginner-friendly |
|-------------------|--------------------|-----------------------|---------------|------|-------------------|
| **Vercel** ⭐      | This project       | ✅ Perfect            | ✅ Free       | ✅ Auto | ⭐⭐⭐⭐⭐         |
| Netlify           | Most sites         | ✅ (with adapter)     | ✅ Free       | ✅ Auto | ⭐⭐⭐⭐           |
| Cloudflare Pages  | High traffic       | ⚠️ Needs config       | ✅ Free       | ✅ Auto | ⭐⭐⭐             |

> **Use Vercel.** It's built by the makers of Next.js, the payment API routes work with
> zero config, and the free tier is generous. The rest of this guide uses Vercel.

---

## Step 1 — Put your code on GitHub

1. Create a free account at https://github.com
2. Create a **new repository** (e.g. `vitali-suites`), keep it **Private**.
3. In a terminal inside the project folder:

```bash
git init
git add .
git commit -m "Initial Vitali Suites website"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/vitali-suites.git
git push -u origin main
```

> ✅ `.env.local` is gitignored, so your secret keys are **not** uploaded. Good.

---

## Step 2 — Deploy on Vercel

1. Go to **https://vercel.com** → **Sign Up** → "Continue with GitHub".
2. Click **Add New… → Project**.
3. Find and **Import** your `vitali-suites` repository.
4. Vercel auto-detects Next.js. Leave build settings as default.
5. Before deploying, expand **Environment Variables** and add:

   | Name                          | Value                       |
   |-------------------------------|-----------------------------|
   | `NEXT_PUBLIC_RAZORPAY_KEY_ID` | your `rzp_test_` / `rzp_live_` Key ID |
   | `RAZORPAY_KEY_SECRET`         | your Razorpay secret        |
   | `RESEND_API_KEY`              | (optional) your Resend key  |
   | `EMAIL_FROM`                  | (optional) sender address   |
   | `EMAIL_TO_HOTEL`              | (optional) your inbox       |

6. Click **Deploy**. In ~1 minute you get a live URL like
   `https://vitali-suites.vercel.app` with **HTTPS/SSL already enabled**.

7. Open `config/site.config.js`, set `url` to your live URL, commit & push (so SEO,
   sitemap and OpenGraph use the correct address).

---

## Step 3 — Connect a custom domain (e.g. vitalisuites.com)

1. Buy a domain (GoDaddy, Namecheap, Hostinger, etc.) — ~₹700–1000/year.
2. In Vercel → your project → **Settings → Domains → Add**.
3. Enter your domain (`vitalisuites.com`) and Vercel shows you DNS records.
4. In your domain registrar's DNS settings, add the records Vercel gives you
   (usually an **A record** `76.76.21.21` and a **CNAME** for `www`).
5. Wait a few minutes to a few hours for DNS to propagate. Vercel issues the SSL
   certificate **automatically and for free** (auto-renews — you never touch it).

---

## Step 4 — Updating the website later

This is the easy part. Whenever you want to change a price, offer, photo, or anything:

1. Edit the relevant config file (or add an image).
2. Save, then run:
   ```bash
   git add .
   git commit -m "Update prices / offers"
   git push
   ```
3. Vercel automatically rebuilds and redeploys in ~1 minute. Done.

> Prefer not to use git each time? You can also edit files directly on
> **github.com** (open the file → pencil icon → commit). Vercel still auto-deploys.

---

## SSL certificate management

Nothing to do. Vercel (and Netlify/Cloudflare) provision and **auto-renew** free SSL
certificates via Let's Encrypt. Your site is always `https://`.

---

## Netlify alternative (if you prefer)

1. Push to GitHub (same as Step 1).
2. https://netlify.com → **Add new site → Import from Git**.
3. Netlify auto-installs the Next.js runtime. Add the same environment variables under
   **Site settings → Environment variables**.
4. Deploy. Add a custom domain under **Domain settings**.

Cloudflare Pages works too but needs the `@cloudflare/next-on-pages` adapter — only
choose it if you expect very high traffic and are comfortable with extra setup.
