'use client'

import { useEffect, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { CheckCircle } from 'lucide-react'
import Button from '@/components/ui/Button'

function PaymentSuccessContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const orderId = searchParams.get('external_reference')

  useEffect(() => {
    // Confetti effect
    if (typeof window !== 'undefined') {
      const duration = 3 * 1000
      const end = Date.now() + duration

      const frame = () => {
        if (Date.now() < end) {
          requestAnimationFrame(frame)
        }
      }
      frame()
    }
  }, [])

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-12 max-w-md w-full text-center"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
          className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6"
        >
          <CheckCircle className="w-16 h-16 text-white" />
        </motion.div>

        <h1 className="text-3xl font-bold text-white mb-4">
          Pagamento Aprovado!
        </h1>

        <p className="text-gray-400 mb-8">
          Seu pedido foi confirmado com sucesso. Você receberá um email com os detalhes.
        </p>

        {orderId && (
          <div className="bg-white/5 rounded-lg p-4 mb-8">
            <p className="text-sm text-gray-500 mb-1">Número do Pedido</p>
            <p className="text-white font-mono text-sm">{orderId}</p>
          </div>
        )}

        <div className="space-y-3">
          <Button
            onClick={() => router.push('/')}
            size="lg"
            className="w-full bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600"
          >
            Voltar para Home
          </Button>
        </div>
      </motion.div>
    </div>
  )
}

export default function PaymentSuccessPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-black" />}>
      <PaymentSuccessContent />
    </Suspense>
  )
}
