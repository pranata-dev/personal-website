import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/ThemeProvider';
import { LocaleProvider } from '@/context/LocaleContext';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-geist-sans',
});

export const metadata: Metadata = {
  title: {
    default: 'Dzulfikar Yudha Pranata | AI & Automation Engineer',
    template: '%s | Dzulfikar Yudha Pranata',
  },
  description:
    'Physics student exploring AI, machine learning, and automation engineering. Building tools that amplify human potential.',
  keywords: ['AI', 'Machine Learning', 'Automation', 'Physics', 'Portfolio', 'Developer', 'Dzulfikar Yudha Pranata'],
  authors: [{ name: 'Dzulfikar Yudha Pranata' }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'Dzulfikar Yudha Pranata',
    title: 'Dzulfikar Yudha Pranata | AI & Automation Engineer',
    description: 'Physics student exploring AI, machine learning, and automation engineering.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Dzulfikar Yudha Pranata | AI & Automation Engineer',
    description: 'Physics student exploring AI, machine learning, and automation engineering.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} antialiased`}>
        <ThemeProvider>
          <LocaleProvider>
            <div className="min-h-screen flex flex-col">
              <Header />
              <main className="flex-1">{children}</main>
              <Footer />
            </div>
          </LocaleProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
