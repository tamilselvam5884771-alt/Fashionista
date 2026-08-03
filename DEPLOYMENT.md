# Vercel Deployment Guide - Fashionista Web

This guide provides step-by-step instructions for deploying the **Fashionista** Haute Couture web application to **Vercel**.

---

## 🚀 Step 1: Connect GitHub Repository to Vercel

1. Log in to your [Vercel Dashboard](https://vercel.com/dashboard).
2. Click **Add New...** → **Project**.
3. Import your GitHub repository (`Fashionista` or `tamilselvam5884771-alt/Fashionista`).
4. Select Framework Preset: **Vite**.

---

## 🔑 Step 2: Configure Environment Variables in Vercel

In the Vercel project configuration page under **Environment Variables**, add the following keys:

| Environment Variable | Description | Example Placeholder Value |
| :--- | :--- | :--- |
| `VITE_SUPABASE_URL` | Your Supabase Project URL | `https://your-project.supabase.co` |
| `VITE_SUPABASE_ANON_KEY` | Your Supabase Project Public Anon Key | `your-supabase-anon-key` |
| `VITE_CLAUDE_API_KEY` | *(Optional)* Anthropic Claude API Key | `your-claude-api-key` |

> [!IMPORTANT]
> Never commit secret keys or production API tokens into git repositories. Set them strictly in Vercel's Environment Variable settings.

---

## ⚡ Step 3: Build & Deploy

1. Set the **Build Command** to `npm run build` (or `vite build`).
2. Set the **Output Directory** to `dist`.
3. Click **Deploy**.

Vercel will build the production application bundle and deploy it to a global CDN.

---

## 🔄 SPA Routing Configuration (`vercel.json`)

The repository includes a [`vercel.json`](file:///c:/Users/TamilHari/Desktop/Fashanista/vercel.json) file with client-side SPA URL rewriting rules. This ensures that direct deep navigation or hard page refreshes on client routes (e.g. `/explore`, `/design`, `/wedding`, `/profile`) automatically route to `index.html` without returning 404 HTTP errors.
