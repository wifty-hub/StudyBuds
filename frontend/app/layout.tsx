import type { Metadata } from 'next'
import './globals.css'
import React from 'react'

export const metadata: Metadata = {
  title: 'StudyBudds',
  description: 'Multimodal learning platform powered by Google Gemini',
  icons: {
    icon: [
      { url: '/lumio.png', sizes: 'any' },
      { url: '/favicon.ico', sizes: 'any' },
    ],
    apple: '/lumio.png',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="overflow-x-hidden">
      <body className="font-sans antialiased overflow-x-hidden">{children}</body>
    </html>
  )
}

