'use client'

import { Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { Clock } from 'lucide-react'
import Button from '@/components/ui/Button'

function PaymentPendingContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const orderId = searchParams.get('external_reference')

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
          className="w-24 h-24 bg-yellow-500 rounded-full flex items-center justify-center mx-auto mb-6"
        >
          <Clock className="w-16 h-16 text-white" />
        </motion.div>

        <h1 className="text-3xl font-bold text-white mb-4">
          Pagamento Pendente
        </h1>

        <p className="text-gray-400 mb-8">
          Seu pagamento está sendo processado. Você receberá uma confirmação por email em breve.
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
            className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600"
          >
            Voltar para Home
          </Button>
        </div>
      </motion.div>
    </div>
  )
}

export default function PaymentPendingPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-black" />}>
      <PaymentPendingContent />
    </Suspense>
  )
}
