# Terasiri - Next.js + Material UI (MUI) Environment

A production-ready single-page web environment built with **Next.js 14 (App Router)**, **Material UI (MUI v6)**, **TypeScript**, and **Emotion SSR Cache Provider**.

---

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Run the Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### 3. Build for Production
```bash
npm run build
npm run start
```

---

## 📁 Project Structure

```
terasiri/
├── src/
│   ├── app/
│   │   ├── layout.tsx         # Root layout with ThemeRegistry, Navbar, and Footer
│   │   ├── page.tsx           # Single-page template (Hero, Features, About, Contact)
│   │   └── globals.css        # Global CSS reset & defaults
│   ├── components/
│   │   ├── Navbar.tsx         # Responsive MUI Navbar with smooth scroll & mobile drawer
│   │   ├── Footer.tsx         # Responsive MUI Footer
│   │   └── PageContainer.tsx  # Reusable page section wrapper
│   └── theme/
│       ├── theme.ts           # MUI Theme configuration (colors, typography, components)
│       └── ThemeRegistry.tsx  # Emotion SSR AppRouterCacheProvider client wrapper
├── public/                    # Static assets
├── .env.example               # Example environment variables
├── .env.local                 # Local environment variables
├── next.config.mjs            # Next.js configuration
├── tsconfig.json              # TypeScript configuration
└── package.json               # Dependencies and scripts
```

---

## 🎨 Customizing the Design & Theme

- **Colors & Typography**: Edit `src/theme/theme.ts` to adjust the primary/secondary palettes, font families, and component default styles.
- **Components & Layout**: Edit `src/app/page.tsx`, `src/components/Navbar.tsx`, and `src/components/Footer.tsx`.
