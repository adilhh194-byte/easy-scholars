import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from 'next-themes';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'EasyScholars — Find Your Perfect Scholarship',
    template: '%s | EasyScholars',
  },
  description: 'Discover thousands of international scholarships. Filter by country, degree level, and funding type. Your gateway to global education.',
  keywords: ['scholarships', 'international scholarships', 'fully funded', 'study abroad', 'graduate scholarships', 'PhD funding'],
  authors: [{ name: 'EasyScholars' }],
  openGraph: {
    title: 'EasyScholars — Find Your Perfect Scholarship',
    description: 'Discover thousands of international scholarships for every degree level and country.',
    type: 'website',
    locale: 'en_US',
    siteName: 'EasyScholars',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'EasyScholars — Find Your Perfect Scholarship',
    description: 'Discover thousands of international scholarships for every degree level and country.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={inter.variable}>
      <body className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950">
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <Navbar />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
