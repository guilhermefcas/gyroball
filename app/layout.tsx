import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'),
  title: 'Gyroball Pro - Fortalecedor Muscular | Oferta Especial',
  description: 'Fortaleça seus punhos, antebraços e mãos com tecnologia giroscópica. Ideal para atletas, fisioterapia e prevenção de lesões. Desconto de 33% OFF!',
  keywords: 'gyroball, fortalecedor muscular, fisioterapia, punho, antebraço, exercício',
  openGraph: {
    title: 'Gyroball Pro - Fortalecedor Muscular',
    description: 'Fortaleça seus punhos com tecnologia giroscópica. 33% OFF!',
    images: ['/images/D_NQ_NP_2X_931154-MLB88657957287_072025-F.webp'],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
