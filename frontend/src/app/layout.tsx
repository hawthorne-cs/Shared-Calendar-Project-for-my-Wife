import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import './globals.css'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-poppins',
})

export const metadata: Metadata = {
  title: 'Shared Calendar',
  description: 'A platform for sharing calendars and making plans together',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="h-full">
      <body className={`${poppins.variable} font-sans h-full bg-gray-50 dark:bg-gray-900`}>
        <div className="min-h-full">
          {children}
        </div>
      </body>
    </html>
  )
} 