# EasyScholars — Scholarship Discovery Platform

A production-ready scholarship discovery platform built with **Next.js 14**, **TypeScript**, **Tailwind CSS**, and **Firebase Firestore**. Inspired by Udemy/Coursera's clean layout, but for international scholarships.

## Features

- 🔍 **Search & Filter** — Browse 50+ scholarships by country, degree level, funding type, and deadline
- 🌍 **Global Coverage** — Scholarships from 20+ countries including UK, USA, Germany, Japan, Korea, and more
- 🎨 **Dark Mode** — Full dark/light theme toggle
- 📱 **Responsive** — Mobile-first design with bottom sheet filters
- 📖 **Guide System** — Step-by-step expandable lessons for scholarship seekers
- 🔥 **Firebase Ready** — Firestore integration with mock data fallback
- 🔎 **SEO Optimized** — Dynamic metadata, OG tags, and keyword-rich pages
- ⚡ **Static Generation** — SSG for scholarship detail pages for maximum performance

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Setup

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Firebase (Optional)

The app works fully without Firebase — it uses rich mock data. To connect Firestore:

1. Copy `.env.example` to `.env.local`
2. Fill in your Firebase project credentials
3. Visit `/admin` (dev mode only) to seed data

```bash
cp .env.example .env.local
```

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── page.tsx            # Homepage (hero, featured, categories)
│   ├── scholarships/       # Listing + detail pages
│   ├── guide/              # Expandable guide lessons
│   └── admin/              # Data seeding (dev only)
├── components/             # Reusable UI components
│   ├── Navbar.tsx          # Navigation + dark mode toggle
│   ├── ScholarshipCard.tsx # Scholarship card with badges
│   ├── FilterSidebar.tsx   # Accordion filters + mobile drawer
│   └── ...
├── lib/                    # Data layer
│   ├── firebase.ts         # Firebase initialization
│   ├── scholarships.ts     # Queries + mock fallback
│   └── mock-data.ts        # 50+ sample scholarships
└── types/                  # TypeScript interfaces
```

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server at localhost:3000 |
| `npm run build` | Build for production |
| `npm run start` | Serve production build |
| `npm run lint` | Run ESLint |

## Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Import to [Vercel](https://vercel.com)
3. Add environment variables from `.env.example`
4. Deploy

### Other Platforms

```bash
npm run build
npm run start
```

## Tech Stack

- [Next.js 14](https://nextjs.org/) — React framework with App Router
- [TypeScript](https://typescriptlang.org/) — Type safety
- [Tailwind CSS](https://tailwindcss.com/) — Utility-first styling
- [Firebase](https://firebase.google.com/) — Firestore database
- [Lucide React](https://lucide.dev/) — Icon library
- [next-themes](https://github.com/pacocoursey/next-themes) — Dark mode

## License

MIT
