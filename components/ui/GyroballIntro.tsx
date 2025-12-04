'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'

interface Particle {
  id: number
  x: number
  y: number
  color: string
  size: number
  delay: number
}

export default function GyroballIntro({ onComplete }: { onComplete: () => void }) {
  const [particles, setParticles] = useState<Particle[]>([])
  const [showFireworks, setShowFireworks] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    
    // Gerar partículas de fogos
    const newParticles: Particle[] = []
    const colors = ['#ef4444', '#dc2626', '#3b82f6', '#2563eb', '#1d4ed8']
    
    for (let i = 0; i < 30; i++) {
      newParticles.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        color: colors[Math.floor(Math.random() * colors.length)],
        size: Math.random() * 8 + 4,
        delay: Math.random() * 0.5
      })
    }
    
    setParticles(newParticles)
    
    // Ativar fogos após a explosão
    const fireworksTimer = setTimeout(() => {
      setShowFireworks(true)
    }, 2400)

    // Completar intro e abrir landing
    const completeTimer = setTimeout(() => {
      onComplete()
    }, 2800)

    return () => {
      clearTimeout(fireworksTimer)
      clearTimeout(completeTimer)
    }
  }, [onComplete])

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 z-50 bg-black flex items-center justify-center overflow-hidden"
    >
      {/* Background gradiente animado */}
      <motion.div
        animate={{
          background: [
            'radial-gradient(circle at 50% 50%, rgba(239, 68, 68, 0.15) 0%, rgba(0, 0, 0, 1) 70%)',
            'radial-gradient(circle at 50% 50%, rgba(59, 130, 246, 0.15) 0%, rgba(0, 0, 0, 1) 70%)',
            'radial-gradient(circle at 50% 50%, rgba(220, 38, 38, 0.15) 0%, rgba(0, 0, 0, 1) 70%)',
            'radial-gradient(circle at 50% 50%, rgba(37, 99, 235, 0.15) 0%, rgba(0, 0, 0, 1) 70%)',
          ]
        }}
        transition={{ duration: 1.5, repeat: Infinity }}
        className="absolute inset-0"
      />

      {/* Partículas de fundo */}
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          initial={{ 
            x: '50vw', 
            y: '50vh',
            scale: 0,
            opacity: 0
          }}
          animate={showFireworks ? {
            x: `${particle.x}vw`,
            y: `${particle.y}vh`,
            scale: [0, 1, 0],
            opacity: [0, 1, 0]
          } : {}}
          transition={{
            duration: 1.5,
            delay: particle.delay,
            ease: 'easeOut'
          }}
          className="absolute rounded-full"
          style={{
            width: particle.size,
            height: particle.size,
            backgroundColor: particle.color,
            boxShadow: `0 0 ${particle.size * 2}px ${particle.color}`
          }}
        />
      ))}

      {/* Gyroball principal */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ 
          scale: [0, 0.1, 0.3, 0.5, 0.7, 0.9, 1.1, 1.3, 1.5, 1.8, 2.2, 3, 0],
        }}
        transition={{
          duration: 2.5,
          times: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.85, 0.9, 0.95, 1],
          ease: [0.34, 1.56, 0.64, 1]
        }}
        className="relative z-10"
      >
        <motion.div
          animate={{
            scale: [1, 1.15, 0.9, 1.12, 0.92, 1.1, 0.95, 1],
            rotate: [0, -15, 15, -12, 12, -8, 8, -5, 5, 0],
            x: [0, -8, 8, -6, 6, -8, 8, -4, 4, 0],
            y: [0, -6, 6, -8, 8, -5, 5, -6, 6, 0]
          }}
          transition={{
            duration: 0.4,
            repeat: Infinity,
            repeatDelay: 0.1,
            ease: 'easeInOut'
          }}
        >
          <motion.div
            animate={{
              filter: [
                'drop-shadow(0 0 20px rgba(239, 68, 68, 0.6)) drop-shadow(0 0 30px rgba(59, 130, 246, 0.6))',
                'drop-shadow(0 0 40px rgba(239, 68, 68, 0.9)) drop-shadow(0 0 60px rgba(59, 130, 246, 0.9))',
                'drop-shadow(0 0 60px rgba(239, 68, 68, 1)) drop-shadow(0 0 80px rgba(59, 130, 246, 1))',
                'drop-shadow(0 0 20px rgba(239, 68, 68, 0.6)) drop-shadow(0 0 30px rgba(59, 130, 246, 0.6))',
              ]
            }}
            transition={{
              duration: 0.6,
              repeat: Infinity,
              ease: 'easeInOut'
            }}
          >
            <Image
              src="/images/gyroball.png"
              alt="Gyroball Pro"
              width={300}
              height={300}
              className="relative z-10"
              priority
              loading="eager"
            />
          </motion.div>
        </motion.div>

        {/* Flash de explosão */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{
            scale: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 8],
            opacity: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0]
          }}
          transition={{
            duration: 2.5,
            times: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 0.95, 1],
            ease: 'easeOut'
          }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          style={{
            width: '600px',
            height: '600px',
            background: 'radial-gradient(circle, rgba(255,255,255,1) 0%, rgba(239,68,68,0.8) 20%, rgba(59,130,246,0.6) 40%, transparent 60%)',
            borderRadius: '50%',
            filter: 'blur(30px)',
            pointerEvents: 'none'
          }}
        />
      </motion.div>

      {/* Texto animado */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.6 }}
        className="absolute bottom-32 text-center"
      >
        <motion.h1
          animate={{
            textShadow: [
              '0 0 20px rgba(239, 68, 68, 0.6)',
              '0 0 40px rgba(59, 130, 246, 0.8)',
              '0 0 30px rgba(220, 38, 38, 0.7)',
              '0 0 40px rgba(37, 99, 235, 0.8)',
            ]
          }}
          transition={{ duration: 1.2, repeat: Infinity }}
          className="text-6xl font-bold bg-gradient-to-r from-red-500 via-blue-500 to-red-500 bg-clip-text text-transparent"
        >
          Gyroball Pro
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="text-xl text-gray-400 mt-4"
        >
          Prepare-se para a transformação
        </motion.p>
      </motion.div>

      {/* Barra de progresso */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 3.3, ease: 'linear' }}
        className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-red-500 via-blue-500 to-red-500 origin-left"
      />
    </motion.div>
  )
}
