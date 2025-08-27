import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '@/styles/globals.css';
import { AuthProvider } from '@/context/AuthContext';
import { ToastProvider } from '@/context/ToastContext';
import { SonnerProvider } from '@/context/SonnerContext';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'AI Finance - Personal Finance Tracker',
  description: 'Track your expenses and manage your finances with AI-powered insights',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <ToastProvider>
            <SonnerProvider>
              {children}
            </SonnerProvider>
          </ToastProvider>
        </AuthProvider>
      </body>
    </html>
  );
}