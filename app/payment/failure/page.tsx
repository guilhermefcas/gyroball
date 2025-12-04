'use client'

import { Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { XCircle } from 'lucide-react'
import Button from '@/components/ui/Button'

function PaymentFailureContent() {
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
          className="w-24 h-24 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-6"
        >
          <XCircle className="w-16 h-16 text-white" />
        </motion.div>

        <h1 className="text-3xl font-bold text-white mb-4">
          Pagamento Recusado
        </h1>

        <p className="text-gray-400 mb-8">
          Não foi possível processar seu pagamento. Por favor, tente novamente.
        </p>

        <div className="space-y-3">
          <Button
            onClick={() => router.push('/checkout')}
            size="lg"
            className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
          >
            Tentar Novamente
          </Button>

          <Button
            onClick={() => router.push('/')}
            size="lg"
            variant="outline"
            className="w-full border-white text-white hover:bg-white hover:text-black"
          >
            Voltar para Home
          </Button>
        </div>
      </motion.div>
    </div>
  )
}

export default function PaymentFailurePage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-black" />}>
      <PaymentFailureContent />
    </Suspense>
  )
}
