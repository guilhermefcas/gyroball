'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'

interface GyroballShakeProps {
  src: string
  alt: string
  width: number
  height: number
  className?: string
  autoStart?: boolean
  duration?: number
}

export default function GyroballShake({ 
  src, 
  alt, 
  width, 
  height, 
  className = '', 
  autoStart = true,
  duration = 3000 
}: GyroballShakeProps) {
  const [isShaking, setIsShaking] = useState(false)

  useEffect(() => {
    // Evitar hidratação no servidor
    if (autoStart) {
      setIsShaking(true)
      const timer = setTimeout(() => {
        setIsShaking(false)
      }, duration)
      return () => clearTimeout(timer)
    }
  }, [autoStart, duration])

  const shakeKeyframes = `
    @keyframes gyroball-shake-${width} {
      0%, 100% { transform: translate(0, 0) rotate(0deg); }
      5% { transform: translate(-2px, -1px) rotate(-3deg); }
      10% { transform: translate(2px, 1px) rotate(3deg); }
      15% { transform: translate(-1px, 2px) rotate(-2deg); }
      20% { transform: translate(1px, -2px) rotate(2deg); }
      25% { transform: translate(-2px, 1px) rotate(-4deg); }
      30% { transform: translate(2px, -1px) rotate(4deg); }
      35% { transform: translate(-1px, -2px) rotate(-3deg); }
      40% { transform: translate(1px, 2px) rotate(3deg); }
      45% { transform: translate(-2px, -1px) rotate(-2deg); }
      50% { transform: translate(2px, 1px) rotate(2deg); }
      55% { transform: translate(-1px, 2px) rotate(-4deg); }
      60% { transform: translate(1px, -2px) rotate(4deg); }
      65% { transform: translate(-2px, 1px) rotate(-3deg); }
      70% { transform: translate(2px, -1px) rotate(3deg); }
      75% { transform: translate(-1px, -2px) rotate(-2deg); }
      80% { transform: translate(1px, 2px) rotate(2deg); }
      85% { transform: translate(-2px, -1px) rotate(-3deg); }
      90% { transform: translate(2px, 1px) rotate(3deg); }
      95% { transform: translate(-1px, 2px) rotate(-2deg); }
    }
    @keyframes gyroball-glow-${width} {
      0%, 100% { filter: drop-shadow(0 0 4px rgba(59, 130, 246, 0.3)); }
      25% { filter: drop-shadow(0 0 12px rgba(59, 130, 246, 0.6)) drop-shadow(0 0 16px rgba(147, 51, 234, 0.4)); }
      50% { filter: drop-shadow(0 0 8px rgba(147, 51, 234, 0.5)) drop-shadow(0 0 12px rgba(59, 130, 246, 0.3)); }
      75% { filter: drop-shadow(0 0 12px rgba(59, 130, 246, 0.6)) drop-shadow(0 0 16px rgba(147, 51, 234, 0.4)); }
    }
  `

  return (
    <div className="relative" style={{ width, height }}>
      <style dangerouslySetInnerHTML={{ __html: shakeKeyframes }} />
      
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        className={className}
        style={isShaking ? {
          animation: `gyroball-shake-${width} 0.8s ease-in-out infinite, gyroball-glow-${width} 2s ease-in-out infinite`,
          transformOrigin: 'center center'
        } : undefined}
      />
    </div>
  )
}
