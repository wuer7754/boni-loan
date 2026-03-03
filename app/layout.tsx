import '../styles/globals.css'
import Link from 'next/link'

export const metadata = {
  title: 'boni-loan',
  description: 'Fast estimate for home equity-backed loans'
}

export default function RootLayout({children}:{children: React.ReactNode}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
