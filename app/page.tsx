'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Hero from '@/components/sections/Hero'
import Benefits from '@/components/sections/Benefits'
import ProductGallery from '@/components/sections/ProductGallery'
import Testimonials from '@/components/sections/Testimonials'
import Countdown from '@/components/sections/Countdown'
import InteractiveGyro from '@/components/sections/InteractiveGyro'
import FAQSection from '@/components/sections/FAQ'
import GyroballIntro from '@/components/ui/GyroballIntro'
import { motion, AnimatePresence } from 'framer-motion'
import { ShoppingCart } from 'lucide-react'

export default function Home() {
  const router = useRouter()
  const [showIntro, setShowIntro] = useState(true)

  const handleBuyClick = () => {
    router.push('/checkout')
  }

  return (
    <AnimatePresence mode="wait">
      {showIntro ? (
        <GyroballIntro key="intro" onComplete={() => setShowIntro(false)} />
      ) : (
        <motion.main
          key="content"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="min-h-screen"
        >
          <Hero onBuyClick={handleBuyClick} />
          <Countdown />
          <InteractiveGyro />
          <Benefits />
          <ProductGallery />
          <Testimonials />
          <FAQSection />
          
          {/* Floating CTA Button */}
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleBuyClick}
            className="fixed bottom-8 right-8 z-40 bg-gradient-to-r from-yellow-400 to-orange-500 text-gray-900 px-8 py-4 rounded-full shadow-2xl flex items-center gap-2 font-bold text-lg hover:shadow-3xl transition-all"
          >
            <ShoppingCart className="w-6 h-6" />
            COMPRAR AGORA
          </motion.button>

          {/* Footer */}
          <footer className="bg-black border-t border-white/10 text-white py-12">
            <div className="container mx-auto px-4 text-center">
              <p className="text-gray-400">
                © 2025 Gyroball Pro. Todos os direitos reservados.
              </p>
              <div className="mt-4 flex justify-center gap-6 text-sm text-gray-500">
                <a href="/privacidade" className="hover:text-white transition-colors">
                  Política de Privacidade
                </a>
                <a href="/termos" className="hover:text-white transition-colors">
                  Termos de Uso
                </a>
                <a href="/contato" className="hover:text-white transition-colors">
                  Contato
                </a>
              </div>
            </div>
          </footer>
        </motion.main>
      )}
    </AnimatePresence>
  )
}
