import './globals.css';
import { Inter } from 'next/font/google';

import { PWALifeCycle } from '@/app/containers/PwaUpdater';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Trackr',
  description: 'Track everything',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <PWALifeCycle />
        {children}
      </body>
    </html>
  );
}
