import type { Metadata } from 'next';
import { Red_Hat_Display } from 'next/font/google';
import '@radix-ui/themes/styles.css';
import { ClerkProvider } from '@clerk/nextjs';
import './globals.css';

const redHatDisplay = Red_Hat_Display({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-redHatDisplay',
});

export const metadata: Metadata = {
  title: '📚 Booklists',
  description: 'Share book lists quickly and easily',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={redHatDisplay.variable}>{children}</body>
      </html>
    </ClerkProvider>
  );
}
