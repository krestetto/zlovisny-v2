import { Analytics } from '@vercel/analytics/next'
import type { Metadata } from 'next'
import { Geist, Geist_Mono, Cinzel } from 'next/font/google'
import './globals.css'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { EdgeFrames } from '@/components/edge-frames'
import { PageTransition } from '@/components/page-transition'

const geistSans = Geist({ variable: '--font-geist-sans', subsets: ['latin'] })
const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})
const cinzel = Cinzel({
  variable: '--font-cinzel',
  subsets: ['latin'],
  weight: ['400', '600', '700', '800', '900'],
})

export const metadata: Metadata = {
  title: 'Зловісний — Майнкрафт всесвіт',
  description:
    'Зловісний — Minecraft сервер у далекому космосі. Дослідіть прокляту планету, перемагайте древніх босів та збирайте легендарний лут.',
  generator: 'v0.app',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="uk"
      data-scroll-behavior="smooth"
      className={`dark ${geistSans.variable} ${geistMono.variable} ${cinzel.variable} bg-[oklch(0.06_0.01_25)]`}
    >
      <body className="font-sans antialiased pb-[36px] sm:pb-[38px] bg-[oklch(0.06_0.01_25)]">
        <PageTransition />
        <EdgeFrames />
        <SiteHeader />
        {children}
        <SiteFooter />
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
