import type { Metadata } from 'next';
import { Inter, JetBrains_Mono, Pixelify_Sans } from 'next/font/google';
import './globals.css';
import { SiteHeader } from '@/components/SiteHeader';
import { SiteFooter } from '@/components/SiteFooter';
import { siteContent } from '@/content/site';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});

const pixelify = Pixelify_Sans({
  subsets: ['latin'],
  variable: '--font-pixel',
  display: 'swap',
  weight: ['400', '600', '700'],
});

export const metadata: Metadata = {
  title: siteContent.name,
  description: siteContent.description,
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '48x48' },
      { url: '/favicon-48x48.png', sizes: '48x48', type: 'image/png' },
      { url: '/icon-192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icon-512.png', sizes: '512x512', type: 'image/png' },
    ],
    shortcut: '/favicon.ico',
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  keywords: [
    'Claude Proxy',
    'AgentRouter',
    'Claude Code',
    'Anthropic Proxy',
    'API Retry',
    '403 to 429',
    'Local Proxy',
    'Developer Tools',
  ],
  authors: [{ name: 'Claude Proxy Team' }],
  openGraph: {
    title: siteContent.name,
    description: siteContent.description,
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`dark ${inter.variable} ${jetbrainsMono.variable} ${pixelify.variable}`}>
      <body className="min-h-screen bg-[#0B0E12] text-[#F4F5F6] antialiased selection:bg-[#FF704D] selection:text-white">
        {/* Accessible Skip to content link */}
        <a
          href="#main-content"
          aria-label="Skip to main content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:rounded-md focus:bg-[#FF704D] focus:px-4 focus:py-2 focus:text-white focus:shadow-lg"
        >
          Skip to main content
        </a>

        <div className="relative flex min-h-screen flex-col">
          <SiteHeader />
          <main
            id="main-content"
            className="flex-1 w-full max-w-[1220px] mx-auto px-[18px] sm:px-6 lg:px-8 py-8 lg:py-12"
          >
            {children}
          </main>
          <SiteFooter />
        </div>
      </body>
    </html>
  );
}
