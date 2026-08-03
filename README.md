# Fashionista Web

High-Fashion & Luxury Atelier E-Commerce Web Application built with React, Vite, TypeScript, TailwindCSS, Framer Motion, Zustand, and Supabase.

---

## 🌟 Tech Stack

- **Core**: React 19, TypeScript, Vite
- **Styling**: TailwindCSS v3 (Custom Theme: `royal-purple`, `champagne-gold`, `lavender`, `rose-gold`, `soft-grey`, Inter & Poppins typography, Dark Mode class strategy)
- **Animations**: Framer Motion 12 (spring micro-interactions, layoutId tab indicators, AnimatePresence page transitions)
- **State Management**: Zustand 5 (with `localStorage` theme persistence)
- **Routing**: React Router v7
- **Backend & Database**: Supabase (Database, Auth, Storage, Edge Functions)
- **Icons**: Lucide React

---

## 📁 Repository Structure

```text
├── src/
│   ├── assets/           # Static media assets & images
│   ├── components/
│   │   ├── ui/           # Reusable UI component library (Button, Card, Input, Badge, Avatar, Modal, Skeleton, Tabs, Toast)
│   │   ├── layout/       # Layout components (Navbar, BottomNav, MainLayout)
│   │   └── features/     # Domain feature modules
│   ├── hooks/            # Custom React hooks
│   ├── lib/              # Utility functions & Supabase client integration
│   ├── pages/            # Application routes (Home, Explore, Design, Wedding, Profile, Wishlist, Wallet, Login, Signup, StyleGuide)
│   ├── store/            # Zustand global stores (useThemeStore)
│   └── types/            # TypeScript interface definitions
├── supabase/
│   ├── functions/        # Supabase Edge Functions (AI & backend calls)
│   └── migrations/       # SQL migration scripts
├── .env.example          # Environment variable template
├── .gitignore            # Git exclusion rules
├── index.html            # HTML entry point with Google Fonts
├── package.json          # Node dependencies & scripts
├── tailwind.config.js    # Custom Tailwind design system tokens
└── vite.config.ts        # Vite configuration
```

---

## 🚀 Setup & Installation

### Prerequisites
- Node.js (v18+ recommended)
- npm or yarn

### Quick Start

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/tamilselvam5884771-alt/Fashionista.git
   cd Fashionista
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Configure Environment Variables**:
   Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```
   Open `.env` and add your Supabase credentials:
   ```env
   VITE_SUPABASE_URL=https://your-supabase-project-id.supabase.co
   VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
   ```

4. **Run Local Development Server**:
   ```bash
   npm run dev
   ```
   Open `http://localhost:5173/` in your browser.

5. **Build for Production**:
   ```bash
   npm run build
   ```

---

## 🎨 UI Component Library & Style Guide

To visually review the design tokens, micro-animations, and UI components in Light & Dark modes, navigate to `/style-guide` when running the app.
