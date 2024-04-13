import type { Metadata,Viewport } from 'next'
import Head from 'next/head'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

// Added metadata and viewport to the layout
export const viewport: Viewport = {
  themeColor: "#FFFFFF",
};

export const metadata: Metadata = {
  manifest: '/manifest.json',
  title: 'Pix Room',
  description: 'Smart application to book meeting rooms and manage your meetings.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
