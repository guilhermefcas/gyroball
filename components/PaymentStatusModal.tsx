'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle, XCircle, Clock, Loader2 } from 'lucide-react'

interface PaymentStatusModalProps {
  isOpen: boolean
  status: 'processing' | 'success' | 'failure' | 'pending'
  onClose: () => void
  orderId?: string
  orderNumber?: string
}

export default function PaymentStatusModal({
  isOpen,
  status,
  onClose,
  orderId,
  orderNumber
}: PaymentStatusModalProps) {
  
  const getStatusConfig = () => {
    switch (status) {
      case 'processing':
        return {
          icon: Loader2,
          iconColor: 'text-blue-500',
          title: 'Processando Pagamento...',
          description: 'Aguarde enquanto confirmamos seu pagamento',
          showSpinner: true,
        }
      case 'success':
        return {
          icon: CheckCircle,
          iconColor: 'text-green-500',
          title: 'Pagamento Aprovado! 🎉',
          description: 'Seu pedido foi confirmado com sucesso',
          showButton: true,
          buttonText: 'Ver Pedido',
          buttonAction: () => window.location.href = `/payment/success?order=${orderId}`
        }
      case 'pending':
        return {
          icon: Clock,
          iconColor: 'text-yellow-500',
          title: 'Pagamento Pendente',
          description: 'Aguardando confirmação do pagamento',
          showButton: true,
          buttonText: 'Ver Status',
          buttonAction: () => window.location.href = `/payment/pending?order=${orderId}`
        }
      case 'failure':
        return {
          icon: XCircle,
          iconColor: 'text-red-500',
          title: 'Pagamento Não Aprovado',
          description: 'Ocorreu um problema com o pagamento. Tente novamente.',
          showButton: true,
          buttonText: 'Tentar Novamente',
          buttonAction: onClose
        }
    }
  }

  const config = getStatusConfig()
  const Icon = config.icon

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={status !== 'processing' ? onClose : undefined}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 text-center"
          >
            {/* Icon */}
            <div className="mb-6 flex justify-center">
              <div className={`rounded-full p-4 ${
                status === 'success' ? 'bg-green-100' :
                status === 'failure' ? 'bg-red-100' :
                status === 'pending' ? 'bg-yellow-100' :
                'bg-blue-100'
              }`}>
                <Icon 
                  className={`w-16 h-16 ${config.iconColor} ${
                    config.showSpinner ? 'animate-spin' : ''
                  }`}
                />
              </div>
            </div>

            {/* Title */}
            <h2 className="text-2xl font-bold text-gray-900 mb-3">
              {config.title}
            </h2>

            {/* Description */}
            <p className="text-gray-600 mb-6">
              {config.description}
            </p>

            {/* Order Number */}
            {orderNumber && status !== 'processing' && (
              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <p className="text-sm text-gray-500 mb-1">Número do Pedido</p>
                <p className="text-xl font-bold text-gray-900">{orderNumber}</p>
              </div>
            )}

            {/* Processing Animation */}
            {status === 'processing' && (
              <div className="flex justify-center gap-2 mb-6">
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1, repeat: Infinity, delay: 0 }}
                  className="w-3 h-3 bg-blue-500 rounded-full"
                />
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}
                  className="w-3 h-3 bg-blue-500 rounded-full"
                />
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1, repeat: Infinity, delay: 0.4 }}
                  className="w-3 h-3 bg-blue-500 rounded-full"
                />
              </div>
            )}

            {/* Button */}
            {config.showButton && config.buttonAction && (
              <button
                onClick={config.buttonAction}
                className={`w-full py-3 px-6 rounded-lg font-semibold transition-colors ${
                  status === 'success'
                    ? 'bg-green-600 hover:bg-green-700 text-white'
                    : status === 'failure'
                    ? 'bg-red-600 hover:bg-red-700 text-white'
                    : 'bg-yellow-600 hover:bg-yellow-700 text-white'
                }`}
              >
                {config.buttonText}
              </button>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
