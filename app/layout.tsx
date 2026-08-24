import type {Metadata} from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const jbMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jb-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'M4A to MP3 Converter - Studio Grade',
  description: 'Locally transcode M4A to high-fidelity MP3. Zero server uploads.',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en" className={`${inter.variable} ${jbMono.variable}`}>
      <body className="bg-surface text-on-surface antialiased min-h-screen flex flex-col selection:bg-primary-container/30 selection:text-primary" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
