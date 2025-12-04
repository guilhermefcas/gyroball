'use client'

import { useEffect, useState, useMemo } from 'react'
import { motion } from 'framer-motion'

interface CountdownProps {
  endDate?: Date
}

export default function Countdown({ endDate }: CountdownProps) {
  // Define a data de término uma única vez
  const targetDate = useMemo(() => {
    if (endDate) return endDate
    
    // Pega ou cria uma data de término fixa no localStorage
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('countdown_end')
      if (stored) {
        return new Date(stored)
      }
      const newEnd = new Date(Date.now() + 24 * 60 * 60 * 1000)
      localStorage.setItem('countdown_end', newEnd.toISOString())
      return newEnd
    }
    return new Date(Date.now() + 24 * 60 * 60 * 1000)
  }, [endDate])

  const calculateTimeLeft = () => {
    const now = new Date().getTime()
    const distance = targetDate.getTime() - now

    if (distance < 0) {
      return { hours: 0, minutes: 0, seconds: 0 }
    }

    return {
      hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
      minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
      seconds: Math.floor((distance % (1000 * 60)) / 1000),
    }
  }

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft())

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft())
    }, 1000)

    return () => clearInterval(timer)
  }, [targetDate])

  const TimeUnit = ({ value, label }: { value: number; label: string }) => (
    <div className="flex flex-col items-center">
      <motion.div
        key={value}
        initial={{ scale: 1.2, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white rounded-lg p-4 shadow-lg min-w-[60px] md:min-w-[80px]"
      >
        <div className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
          {String(value).padStart(2, '0')}
        </div>
      </motion.div>
      <div className="text-sm font-semibold mt-2 text-gray-700">{label}</div>
    </div>
  )

  return (
    <div className="bg-gradient-to-r from-red-500 to-orange-500 py-8 px-4">
      <div className="container mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-white">
            ⚡ OFERTA RELÂMPAGO - Termina em:
          </h3>
          <div className="flex items-center justify-center gap-2 md:gap-4">
            <TimeUnit value={timeLeft.hours} label="Horas" />
            <div className="text-4xl font-bold text-white">:</div>
            <TimeUnit value={timeLeft.minutes} label="Minutos" />
            <div className="text-4xl font-bold text-white">:</div>
            <TimeUnit value={timeLeft.seconds} label="Segundos" />
          </div>
          <p className="text-white/90 text-lg">
            Não perca! Desconto de <span className="font-bold text-yellow-300">33% OFF</span> apenas hoje!
          </p>
        </motion.div>
      </div>
    </div>
  )
}
