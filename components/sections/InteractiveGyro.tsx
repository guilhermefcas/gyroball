'use client'

import { useRef, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import Image from 'next/image'

export default function InteractiveGyro() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isHovering, setIsHovering] = useState(false)
  
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  
  const springConfig = { damping: 8, stiffness: 250 }
  const rotateX = useSpring(mouseY, springConfig)
  const rotateY = useSpring(mouseX, springConfig)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return
    
    const rect = containerRef.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    
    const deltaX = (e.clientX - centerX) / (rect.width / 2)
    const deltaY = (e.clientY - centerY) / (rect.height / 2)
    
    mouseX.set(deltaX * 50)
    mouseY.set(deltaY * -50)
  }

  const handleMouseLeave = () => {
    setIsHovering(false)
    mouseX.set(0)
    mouseY.set(0)
  }

  return (
    <section className="py-20 bg-black relative overflow-hidden">
      {/* Background gradiente */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900 to-black opacity-50" />
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-white mb-4">
            Sinta a <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-blue-500">Energia</span>
          </h2>
          <p className="text-xl text-gray-400">
            Passe o mouse e veja a Gyroball em ação!
          </p>
        </motion.div>

        <div
          ref={containerRef}
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={handleMouseLeave}
          className="relative max-w-2xl mx-auto aspect-square flex items-center justify-center cursor-pointer"
          style={{ perspective: '2000px', perspectiveOrigin: '50% 50%' }}
        >
          {/* Círculo de fundo pulsante */}
          <motion.div
            animate={{
              scale: isHovering ? [1, 1.1, 1] : 1,
              opacity: isHovering ? [0.3, 0.5, 0.3] : 0.2
            }}
            transition={{
              duration: 1.5,
              repeat: isHovering ? Infinity : 0,
              ease: 'easeInOut'
            }}
            className="absolute inset-0 rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(239, 68, 68, 0.3) 0%, rgba(59, 130, 246, 0.3) 50%, transparent 70%)',
              filter: 'blur(40px)'
            }}
          />

          {/* Partículas ao redor */}
          {isHovering && Array.from({ length: 8 }).map((_, i) => {
            const angle = (360 / 8) * i
            return (
              <motion.div
                key={`particle-${i}`}
                initial={{ scale: 0, opacity: 0 }}
                animate={{
                  scale: [0, 1, 0],
                  opacity: [0, 1, 0],
                  x: [0, Math.cos((angle * Math.PI) / 180) * 150],
                  y: [0, Math.sin((angle * Math.PI) / 180) * 150]
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  delay: i * 0.1,
                  ease: 'easeOut'
                }}
                className="absolute left-1/2 top-1/2 w-4 h-4 rounded-full"
                style={{
                  background: i % 2 === 0 ? '#ef4444' : '#3b82f6',
                  boxShadow: `0 0 20px ${i % 2 === 0 ? '#ef4444' : '#3b82f6'}`
                }}
              />
            )
          })}

          {/* Gyroball interativa */}
          <motion.div
            style={{
              rotateX,
              rotateY,
              transformStyle: 'preserve-3d',
              transform: 'translateZ(0)'
            }}
            animate={{
              scale: isHovering ? [1, 1.05, 1] : 1,
              z: isHovering ? [0, 50, 0] : 0
            }}
            transition={{
              scale: {
                duration: 0.8,
                repeat: isHovering ? Infinity : 0,
                ease: 'easeInOut'
              },
              z: {
                duration: 0.8,
                repeat: isHovering ? Infinity : 0,
                ease: 'easeInOut'
              }
            }}
            className="relative w-48 h-48 md:w-64 md:h-64 lg:w-80 lg:h-80 xl:w-96 xl:h-96"
          >
            <motion.div
              className="relative w-full h-full"
              style={{
                transformStyle: 'preserve-3d',
                transform: 'translateZ(20px)'
              }}
              animate={isHovering ? {
                filter: [
                  'drop-shadow(0 0 20px rgba(239, 68, 68, 0.6)) drop-shadow(0 0 30px rgba(59, 130, 246, 0.6))',
                  'drop-shadow(0 0 40px rgba(239, 68, 68, 0.9)) drop-shadow(0 0 60px rgba(59, 130, 246, 0.9))',
                  'drop-shadow(0 0 60px rgba(239, 68, 68, 1)) drop-shadow(0 0 80px rgba(59, 130, 246, 1))',
                  'drop-shadow(0 0 40px rgba(239, 68, 68, 0.9)) drop-shadow(0 0 60px rgba(59, 130, 246, 0.9))',
                  'drop-shadow(0 0 20px rgba(239, 68, 68, 0.6)) drop-shadow(0 0 30px rgba(59, 130, 246, 0.6))',
                ]
              } : {}}
              transition={{
                duration: 1.5,
                repeat: isHovering ? Infinity : 0,
                ease: 'easeInOut'
              }}
            >
              <Image
                src="/images/gyroball.png"
                alt="Gyroball Pro Interativa"
                fill
                className="object-contain"
                draggable={false}
                priority
              />
            </motion.div>

            {/* Anéis de energia */}
            {isHovering && [0, 1, 2].map((i) => (
              <motion.div
                key={`ring-${i}`}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{
                  scale: [0.8, 1.5, 2],
                  opacity: [0.6, 0.3, 0]
                }}
                transition={{
                  duration: 2,
                  delay: i * 0.3,
                  repeat: Infinity,
                  ease: 'easeOut'
                }}
                className="absolute inset-0 rounded-full border-4"
                style={{
                  borderColor: i % 2 === 0 ? '#ef4444' : '#3b82f6',
                  boxShadow: `0 0 20px ${i % 2 === 0 ? '#ef4444' : '#3b82f6'}`
                }}
              />
            ))}
          </motion.div>

          {/* Texto de instrução */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ 
              opacity: isHovering ? 0 : 1,
              y: isHovering ? 20 : 0
            }}
            transition={{ duration: 0.3 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 text-center"
          >
            <motion.p
              animate={{
                y: [0, -10, 0]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut'
              }}
              className="text-lg md:text-xl text-gray-300 font-semibold"
            >
              ✨ Passe o mouse aqui ✨
            </motion.p>
          </motion.div>
        </div>

        {/* Dica adicional */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-8"
        >
          <p className="text-gray-500 text-sm">
            Mova o mouse para sentir a força giroscópica da Gyroball
          </p>
        </motion.div>
      </div>
    </section>
  )
}
