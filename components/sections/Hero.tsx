'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { ShoppingCart, Star, TrendingUp, Users, Volume2, VolumeX } from 'lucide-react'
import Button from '@/components/ui/Button'

interface HeroProps {
  onBuyClick: () => void
}

export default function Hero({ onBuyClick }: HeroProps) {
  const [isMuted, setIsMuted] = useState(true)

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">
      {/* Animated background elements - Lando Norris style */}
      <div className="absolute inset-0">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 100, 0],
            y: [0, -50, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute top-0 left-0 w-[600px] h-[600px] bg-blue-500/30 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            x: [0, -100, 0],
            y: [0, 100, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 1,
          }}
          className="absolute bottom-0 right-0 w-[700px] h-[700px] bg-purple-500/30 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            x: [0, 50, 0],
            y: [0, -100, 0],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 2,
          }}
          className="absolute top-1/2 left-1/2 w-[500px] h-[500px] bg-pink-500/20 rounded-full blur-3xl"
        />
      </div>

      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-white space-y-6"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-lg px-4 py-2 rounded-full border border-white/30"
            >
              <TrendingUp className="w-4 h-4" />
              <span className="text-sm font-semibold">+5.000 vendidos este mês</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-5xl md:text-6xl font-bold leading-tight"
            >
              Gyroball Pro
              <span className="block text-yellow-300">Fortalecedor Muscular</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-xl text-white/90"
            >
              Fortaleça seus punhos, antebraços e mãos com tecnologia giroscópica. Ideal para atletas, reabilitação e prevenção de lesões.
            </motion.p>

            {/* Benefits */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="grid grid-cols-3 gap-4"
            >
              <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 bg-white/20 backdrop-blur rounded-full flex items-center justify-center mb-2">
                  <span className="text-2xl">💪</span>
                </div>
                <span className="text-sm">Força</span>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 bg-white/20 backdrop-blur rounded-full flex items-center justify-center mb-2">
                  <span className="text-2xl">🎯</span>
                </div>
                <span className="text-sm">Coordenação</span>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 bg-white/20 backdrop-blur rounded-full flex items-center justify-center mb-2">
                  <span className="text-2xl">⚡</span>
                </div>
                <span className="text-sm">Reabilitação</span>
              </div>
            </motion.div>

            {/* Price and CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6 space-y-4"
            >
              <div className="flex items-baseline gap-3">
                <span className="text-2xl text-white/60 line-through">R$ 89,90</span>
                <span className="text-5xl font-bold text-yellow-300">R$ 59,90</span>
                <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">-33%</span>
              </div>
              <p className="text-sm text-white/80">ou 2 unidades por apenas R$ 99,90</p>
              
              <div className="space-y-3">
                <Button
                  onClick={onBuyClick}
                  size="lg"
                  className="w-full bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-gray-900 font-bold shadow-2xl hover:scale-105"
                >
                  <ShoppingCart className="mr-2 w-5 h-5" />
                  COMPRAR AGORA
                </Button>
                
                <Button
                  onClick={onBuyClick}
                  size="lg"
                  variant="outline"
                  className="w-full border-2 border-white text-white hover:bg-white hover:text-black font-bold"
                >
                  APROVEITAR DESCONTO 33%
                </Button>
              </div>

              <div className="flex items-center justify-center gap-6 text-sm">
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-yellow-300 text-yellow-300" />
                  <span>4.9/5.0</span>
                </div>
                <div className="flex items-center gap-1">
                  <Users className="w-4 h-4" />
                  <span>+1.200 avaliações</span>
                </div>
              </div>
            </motion.div>

            {/* Urgency */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="flex items-center gap-2 text-sm"
            >
              <span className="w-3 h-3 bg-red-500 rounded-full animate-pulse" />
              <span className="text-white/90">Apenas 100 unidades restantes neste preço!</span>
            </motion.div>
          </motion.div>

          {/* Right Content - Product Video */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative"
          >
            <motion.div
              animate={{
                y: [0, -20, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="relative z-10"
            >
              <div className="relative aspect-square rounded-2xl overflow-hidden shadow-2xl group">
                <video
                  id="hero-video"
                  src="/images/video.mp4"
                  autoPlay
                  loop
                  muted={isMuted}
                  playsInline
                  className="w-full h-full object-cover"
                />
                
                {/* Controle de Áudio */}
                <button
                  onClick={() => setIsMuted(!isMuted)}
                  className="absolute top-4 right-4 w-12 h-12 bg-black/50 backdrop-blur-lg rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-all z-10 opacity-0 group-hover:opacity-100"
                  aria-label={isMuted ? 'Ativar som' : 'Desativar som'}
                >
                  {isMuted ? <VolumeX className="w-6 h-6" /> : <Volume2 className="w-6 h-6" />}
                </button>
              </div>
            </motion.div>
            
            {/* Floating elements */}
            <motion.div
              animate={{
                scale: [1, 1.1, 1],
                opacity: [0.5, 0.8, 0.5],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
              }}
              className="absolute -z-10 inset-0 bg-gradient-to-r from-yellow-400 to-pink-500 rounded-full blur-3xl"
            />
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.8 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-6 h-10 border-2 border-white/50 rounded-full flex items-start justify-center p-2"
        >
          <div className="w-1.5 h-1.5 bg-white rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  )
}
