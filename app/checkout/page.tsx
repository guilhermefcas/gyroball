'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Minus, Plus, Truck, CreditCard, QrCode, Loader2, ArrowLeft, Lock, ShieldCheck } from 'lucide-react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import Card from '@/components/ui/Card'
import GyroballShake from '@/components/ui/GyroballShake'
import PaymentStatusModal from '@/components/PaymentStatusModal'
import { formatCurrency, formatCPF, formatPhone, formatCEP, validateCPF } from '@/lib/utils'
import type { ShippingOption } from '@/types'

const checkoutSchema = z.object({
  name: z.string().min(3, 'Nome completo é obrigatório'),
  email: z.string().email('Email inválido'),
  cpf: z.string().refine(validateCPF, 'CPF inválido'),
  phone: z.string().min(14, 'Telefone inválido'),
  cep: z.string().min(9, 'CEP inválido'),
  street: z.string().min(3, 'Endereço é obrigatório'),
  number: z.string().min(1, 'Número é obrigatório'),
  complement: z.string().optional(),
  neighborhood: z.string().min(2, 'Bairro é obrigatório'),
  city: z.string().min(2, 'Cidade é obrigatória'),
  state: z.string().length(2, 'Estado inválido'),
  cardName: z.string().optional(),
  cardNumber: z.string().optional(),
  cardExpiry: z.string().optional(),
  cardCvv: z.string().optional(),
})

type CheckoutForm = z.infer<typeof checkoutSchema>

export default function CheckoutPage() {
  const router = useRouter()
  const [quantity, setQuantity] = useState(1)
  const [paymentMethod, setPaymentMethod] = useState<'pix' | 'credit_card'>('pix')
  const [shippingOptions, setShippingOptions] = useState<ShippingOption[]>([])
  const [selectedShipping, setSelectedShipping] = useState<ShippingOption | null>(null)
  const [loadingCep, setLoadingCep] = useState(false)
  const [loadingOrder, setLoadingOrder] = useState(false)
  const [paymentStatus, setPaymentStatus] = useState<'processing' | 'success' | 'failure' | 'pending' | null>(null)
  const [currentOrderId, setCurrentOrderId] = useState<string | null>(null)
  const [currentOrderNumber, setCurrentOrderNumber] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<CheckoutForm>({
    resolver: zodResolver(checkoutSchema),
  })

  const cep = watch('cep')
  const cardName = watch('cardName') || ''
  const cardNumber = watch('cardNumber') || ''
  const cardExpiry = watch('cardExpiry') || ''
  const cardCvv = watch('cardCvv') || ''

  const unitPrice = 59.90
  const price2Units = 99.90
  
  // Cálculo correto: 2 unidades = R$99.90, cada unidade adicional = R$49.95
  const calculateSubtotal = (qty: number) => {
    if (qty === 1) return unitPrice
    if (qty === 2) return price2Units
    // Para 3+: preço de 2 unidades + (unidades extras * 49.95)
    return price2Units + ((qty - 2) * 49.95)
  }
  
  const subtotal = calculateSubtotal(quantity)
  const shippingCost = 0 // FRETE GRÁTIS!
  const total = subtotal + shippingCost

  const handleQuantityChange = (delta: number) => {
    const newQuantity = Math.max(1, Math.min(quantity + delta, 10))
    setQuantity(newQuantity)
  }

  const handleCepBlur = async () => {
    const cepNumbers = cep?.replace(/\D/g, '')
    if (cepNumbers?.length !== 8) return

    setLoadingCep(true)
    try {
      const response = await fetch(`https://viacep.com.br/ws/${cepNumbers}/json/`)
      const data = await response.json()

      if (!data.erro) {
        setValue('street', data.logradouro || '')
        setValue('neighborhood', data.bairro || '')
        setValue('city', data.localidade || '')
        setValue('state', data.uf || '')

        const mockShipping: ShippingOption[] = [
          {
            id: 'pac',
            name: 'PAC',
            price: 15.90,
            deliveryTime: '10-15 dias úteis',
            company: 'Correios',
          },
          {
            id: 'sedex',
            name: 'SEDEX',
            price: 25.90,
            deliveryTime: '5-7 dias úteis',
            company: 'Correios',
          },
        ]
        setShippingOptions(mockShipping)
        setSelectedShipping(mockShipping[0])
      }
    } catch (error) {
      console.error('Error fetching CEP:', error)
    } finally {
      setLoadingCep(false)
    }
  }

  const formatCardNumber = (value: string) => {
    return value
      .replace(/\D/g, '')
      .replace(/(\d{4})(?=\d)/g, '$1 ')
      .trim()
      .substring(0, 19)
  }

  const formatExpiryDate = (value: string) => {
    return value
      .replace(/\D/g, '')
      .replace(/(\d{2})(\d)/, '$1/$2')
      .substring(0, 5)
  }

  const onSubmit = async (data: CheckoutForm) => {
    setLoadingOrder(true)
    setPaymentStatus('processing')

    try {
      // Enviar dados no formato flat que a API espera
      const orderData = {
        // Dados do cliente
        name: data.name,
        email: data.email,
        cpf: data.cpf,
        phone: data.phone,
        // Endereço de entrega
        cep: data.cep,
        street: data.street,
        number: data.number,
        complement: data.complement || '',
        neighborhood: data.neighborhood,
        city: data.city,
        state: data.state,
        // Dados do pedido
        quantity,
        subtotal,
        shippingCost: 0, // FRETE GR\u00c1TIS
        total,
        paymentMethod,
      }

      console.log('📦 Enviando pedido:', orderData)

      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData),
      })

      const result = await response.json()

      if (response.ok) {
        console.log('✅ Pedido criado com sucesso:', result)
        
        setCurrentOrderId(result.orderId)
        setCurrentOrderNumber(result.orderId.substring(0, 8).toUpperCase())

        // Abrir Mercado Pago em nova janela/popup
        const paymentWindow = window.open(
          result.paymentUrl,
          'MercadoPago',
          'width=800,height=600,scrollbars=yes'
        )

        // Monitorar status do pagamento
        const checkPaymentStatus = async () => {
          try {
            const statusResponse = await fetch(`/api/orders?orderId=${result.orderId}`)
            const statusData = await statusResponse.json()
            
            if (statusData.success && statusData.orders.length > 0) {
              const order = statusData.orders[0]
              const paymentStatus = order.payment_status

              if (paymentStatus === 'approved') {
                setPaymentStatus('success')
                if (paymentWindow && !paymentWindow.closed) {
                  paymentWindow.close()
                }
                return true
              } else if (paymentStatus === 'rejected' || paymentStatus === 'cancelled') {
                setPaymentStatus('failure')
                if (paymentWindow && !paymentWindow.closed) {
                  paymentWindow.close()
                }
                return true
              } else if (paymentStatus === 'pending') {
                // Continuar checando
                return false
              }
            }
            return false
          } catch (error) {
            console.error('Erro ao verificar status:', error)
            return false
          }
        }

        // Fazer polling a cada 3 segundos
        const pollInterval = setInterval(async () => {
          const finished = await checkPaymentStatus()
          
          // Se a janela foi fechada pelo usuário
          if (paymentWindow && paymentWindow.closed) {
            clearInterval(pollInterval)
            // Fazer uma última checagem
            const finalCheck = await checkPaymentStatus()
            if (!finalCheck) {
              setPaymentStatus('pending')
            }
            setLoadingOrder(false)
          }

          if (finished) {
            clearInterval(pollInterval)
            setLoadingOrder(false)
          }
        }, 3000)

        // Timeout após 5 minutos
        setTimeout(() => {
          clearInterval(pollInterval)
          if (paymentWindow && !paymentWindow.closed) {
            paymentWindow.close()
          }
          setPaymentStatus('pending')
          setLoadingOrder(false)
        }, 300000) // 5 minutos

      } else {
        console.error('❌ Erro na resposta:', result)
        setPaymentStatus('failure')
        setLoadingOrder(false)
      }
    } catch (error) {
      console.error('❌ Erro ao criar pedido:', error)
      setPaymentStatus('failure')
      setLoadingOrder(false)
    }
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Banner Frete Grátis no Topo */}
      <div className="bg-gradient-to-r from-green-500 via-emerald-500 to-green-600 text-white py-3 px-4 text-center font-bold animate-pulse">
        <div className="flex items-center justify-center gap-2 text-sm md:text-base">
          <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
          </svg>
          <span>🎉 FRETE GRÁTIS PARA TODO O BRASIL! 🎉</span>
        </div>
      </div>
      
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-40">
        <div className="container mx-auto px-3 sm:px-4 py-3 sm:py-4">
          <div className="flex items-center justify-between gap-2">
            <button
              onClick={() => router.push('/')}
              className="flex items-center gap-1 sm:gap-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="font-semibold text-sm sm:text-base">Voltar</span>
            </button>
            <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              Gyroball Pro
            </h1>
            <div className="flex items-center gap-1 sm:gap-2 text-green-600">
              <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="text-xs sm:text-sm font-semibold hidden sm:inline">Compra Segura</span>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-3 sm:px-4 py-4 sm:py-6 md:py-8 max-w-7xl">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
            {/* Left Column - Forms */}
            <div className="lg:col-span-2 space-y-6">
              {/* Product Summary */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <Card>
                  <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-4">Seu Pedido</h2>
                  <div className="flex items-center gap-4">
                    <GyroballShake
                      src="/images/D_NQ_NP_2X_931154-MLB88657957287_072025-F.webp"
                      alt="Gyroball Pro"
                      width={80}
                      height={80}
                      className="rounded-lg w-16 h-16 md:w-20 md:h-20"
                      autoStart={true}
                      duration={3000}
                    />
                    <div className="flex-1">
                      <h3 className="font-bold text-lg">Gyroball Pro - Fortalecedor Muscular</h3>
                      <p className="text-gray-600">Tecnologia giroscópica avançada</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => handleQuantityChange(-1)}
                        disabled={quantity <= 1}
                      >
                        <Minus className="w-4 h-4" />
                      </Button>
                      <span className="text-xl font-bold w-8 text-center">{quantity}</span>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => handleQuantityChange(1)}
                      >
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  {quantity >= 2 && (
                    <div className="mt-4 bg-green-50 border border-green-200 rounded-lg p-3 text-center">
                      <p className="text-green-700 font-semibold">
                        🎉 Você economizou {formatCurrency((unitPrice * quantity) - subtotal)}!
                      </p>
                    </div>
                  )}
                </Card>
              </motion.div>

              {/* Customer Info */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <Card>
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">Dados Pessoais</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    <div className="sm:col-span-2">
                      <Input
                        label="Nome Completo"
                        {...register('name')}
                        error={errors.name?.message}
                        required
                      />
                    </div>
                    <Input
                      label="Email"
                      type="email"
                      {...register('email')}
                      error={errors.email?.message}
                      required
                    />
                    <Input
                      label="CPF"
                      {...register('cpf')}
                      error={errors.cpf?.message}
                      onChange={(e) => {
                        const formatted = formatCPF(e.target.value)
                        setValue('cpf', formatted)
                      }}
                      maxLength={14}
                      required
                    />
                    <Input
                      label="Telefone"
                      {...register('phone')}
                      error={errors.phone?.message}
                      onChange={(e) => {
                        const formatted = formatPhone(e.target.value)
                        setValue('phone', formatted)
                      }}
                      maxLength={15}
                      required
                    />
                  </div>
                </Card>
              </motion.div>

              {/* Shipping */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <Card>
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">Endereço de Entrega</h2>
                  <div className="space-y-4">
                    <div className="relative">
                      <Input
                        label="CEP"
                        {...register('cep')}
                        error={errors.cep?.message}
                        onChange={(e) => {
                          const formatted = formatCEP(e.target.value)
                          setValue('cep', formatted)
                        }}
                        onBlur={handleCepBlur}
                        maxLength={9}
                        required
                      />
                      {loadingCep && (
                        <Loader2 className="absolute right-4 top-12 w-5 h-5 animate-spin text-blue-600" />
                      )}
                    </div>

                    <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 sm:gap-4">
                      <div className="col-span-2 sm:col-span-3">
                        <Input
                          label="Endereço"
                          {...register('street')}
                          error={errors.street?.message}
                          required
                        />
                      </div>
                      <div className="col-span-1">
                        <Input
                          label="Número"
                          {...register('number')}
                          error={errors.number?.message}
                          required
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                      <Input
                        label="Bairro"
                        {...register('neighborhood')}
                        error={errors.neighborhood?.message}
                        required
                      />
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <Input
                        label="Cidade"
                        {...register('city')}
                        error={errors.city?.message}
                        required
                      />
                      <Input
                        label="Estado"
                        {...register('state')}
                        error={errors.state?.message}
                        maxLength={2}
                        required
                      />
                    </div>

                    {shippingOptions.length > 0 && (
                      <div className="space-y-2 pt-4 border-t">
                        <div className="flex items-center gap-2 text-gray-700 font-semibold mb-2">
                          <Truck className="w-5 h-5" />
                          <span>Opções de Frete</span>
                        </div>
                        {shippingOptions.map((option) => (
                          <button
                            key={option.id}
                            type="button"
                            onClick={() => setSelectedShipping(option)}
                            className={`w-full p-4 rounded-lg border-2 transition-all text-left ${
                              selectedShipping?.id === option.id
                                ? 'border-blue-600 bg-blue-50'
                                : 'border-gray-200 hover:border-blue-300'
                            }`}
                          >
                            <div className="flex items-center justify-between">
                              <div>
                                <div className="font-semibold text-gray-900">
                                  {option.company} - {option.name}
                                </div>
                                <div className="text-sm text-gray-600">
                                  {option.deliveryTime}
                                </div>
                              </div>
                              <div className="font-bold text-gray-900">
                                {formatCurrency(option.price)}
                              </div>
                            </div>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </Card>
              </motion.div>

              {/* Payment Method */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <Card>
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">Forma de Pagamento</h2>
                  
                  <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-6">
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('pix')}
                      className={`p-4 md:p-6 rounded-xl border-2 transition-all ${
                        paymentMethod === 'pix'
                          ? 'border-blue-600 bg-blue-50 shadow-lg'
                          : 'border-gray-200 hover:border-blue-300'
                      }`}
                    >
                      <QrCode className={`w-8 h-8 mx-auto mb-2 ${paymentMethod === 'pix' ? 'text-blue-600' : 'text-gray-400'}`} />
                      <div className="font-bold text-gray-900">PIX</div>
                      <div className="text-sm text-gray-600">Aprovação imediata</div>
                    </button>
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('credit_card')}
                      className={`p-4 md:p-6 rounded-xl border-2 transition-all ${
                        paymentMethod === 'credit_card'
                          ? 'border-blue-600 bg-blue-50 shadow-lg'
                          : 'border-gray-200 hover:border-blue-300'
                      }`}
                    >
                      <CreditCard className={`w-8 h-8 mx-auto mb-2 ${paymentMethod === 'credit_card' ? 'text-blue-600' : 'text-gray-400'}`} />
                      <div className="font-bold text-gray-900">Cartão de Crédito</div>
                      <div className="text-sm text-gray-600">Parcelamento disponível</div>
                    </button>
                  </div>

                  {/* Credit Card Form */}
                  {paymentMethod === 'credit_card' && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="space-y-4 pt-4 border-t"
                    >
                      <Input
                        label="Nome no Cartão"
                        {...register('cardName')}
                        placeholder="Nome como está no cartão"
                        onChange={(e) => setValue('cardName', e.target.value.toUpperCase())}
                      />
                      <Input
                        label="Número do Cartão"
                        {...register('cardNumber')}
                        placeholder="0000 0000 0000 0000"
                        maxLength={19}
                        onChange={(e) => {
                          const formatted = formatCardNumber(e.target.value)
                          setValue('cardNumber', formatted)
                        }}
                      />
                      <div className="grid grid-cols-2 gap-4">
                        <Input
                          label="Validade"
                          {...register('cardExpiry')}
                          placeholder="MM/AA"
                          maxLength={5}
                          onChange={(e) => {
                            const formatted = formatExpiryDate(e.target.value)
                            setValue('cardExpiry', formatted)
                          }}
                        />
                        <Input
                          label="CVV"
                          {...register('cardCvv')}
                          placeholder="000"
                          maxLength={4}
                          type="password"
                          onChange={(e) => {
                            const value = e.target.value.replace(/\D/g, '')
                            setValue('cardCvv', value)
                          }}
                        />
                      </div>
                    </motion.div>
                  )}
                </Card>
              </motion.div>
            </div>

            {/* Right Column - Summary & Card Preview */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-6">
                {/* Card Preview (only for credit card) */}
                {paymentMethod === 'credit_card' && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4 }}
                  >
                    <Card className="bg-gradient-to-br from-blue-600 via-purple-600 to-pink-500 text-white overflow-hidden relative">
                      <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -mr-20 -mt-20" />
                      <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/10 rounded-full -ml-16 -mb-16" />
                      
                      <div className="relative z-10 space-y-8">
                        <div className="flex justify-between items-start">
                          <div className="w-12 h-12 bg-yellow-400/30 backdrop-blur rounded-lg flex items-center justify-center">
                            <div className="w-8 h-8 bg-yellow-400/50 rounded-full" />
                          </div>
                          <CreditCard className="w-8 h-8 opacity-50" />
                        </div>

                        <div>
                          <div className="text-2xl font-mono tracking-wider mb-1">
                            {cardNumber || '•••• •••• •••• ••••'}
                          </div>
                        </div>

                        <div className="flex justify-between items-end">
                          <div>
                            <div className="text-xs opacity-70 mb-1">Nome do Titular</div>
                            <div className="font-semibold">
                              {cardName || 'SEU NOME AQUI'}
                            </div>
                          </div>
                          <div>
                            <div className="text-xs opacity-70 mb-1">Validade</div>
                            <div className="font-semibold">
                              {cardExpiry || 'MM/AA'}
                            </div>
                          </div>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                )}

                {/* Order Summary */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                    <Card className="bg-gradient-to-br from-blue-50 to-purple-50">
                      {/* Banner Frete Grátis */}
                      <div className="mb-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white p-4 rounded-lg text-center">
                        <div className="flex items-center justify-center gap-2 mb-1">
                          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          <span className="font-bold text-lg">FRETE GRÁTIS</span>
                        </div>
                        <p className="text-sm opacity-90">Para todo o Brasil!</p>
                      </div>
                      
                      <h3 className="text-xl font-bold text-gray-900 mb-4">Resumo do Pedido</h3>
                      <div className="space-y-3">
                        <div className="flex justify-between text-gray-700">
                          <span>Subtotal ({quantity}x Gyroball)</span>
                          <span className="font-semibold">{formatCurrency(subtotal)}</span>
                        </div>
                        <div className="flex justify-between text-green-600 font-semibold">
                          <span className="flex items-center gap-2">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                            </svg>
                            Frete
                          </span>
                          <span className="font-bold">GRÁTIS</span>
                        </div>
                        <div className="border-t-2 border-gray-300 pt-3 flex justify-between items-center">
                          <span className="text-base sm:text-lg font-bold text-gray-900">Total</span>
                          <span className="text-2xl sm:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                            {formatCurrency(total)}
                          </span>
                        </div>
                      </div>

                      <Button
                      type="submit"
                      size="lg"
                      className="w-full mt-6 text-base sm:text-lg py-4 sm:py-5"
                      isLoading={loadingOrder}
                    >
                      <Lock className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                      {loadingOrder ? 'Processando...' : 'Finalizar Compra'}
                    </Button>

                    <div className="mt-4 pt-4 border-t border-gray-300 space-y-2 text-xs sm:text-sm text-gray-600">
                      <div className="flex items-center gap-2">
                        <ShieldCheck className="w-4 h-4 text-green-600" />
                        <span>Compra 100% Segura e Criptografada</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <ShieldCheck className="w-4 h-4 text-green-600" />
                        <span>Garantia de 30 dias</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <ShieldCheck className="w-4 h-4 text-green-600" />
                        <span>Seus dados estão protegidos</span>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              </div>
            </div>
          </div>
        </form>

        {/* Payment Status Modal */}
        <PaymentStatusModal
          isOpen={paymentStatus !== null}
          status={paymentStatus || 'processing'}
          onClose={() => setPaymentStatus(null)}
          orderId={currentOrderId || undefined}
          orderNumber={currentOrderNumber || undefined}
        />
      </div>
    </div>
  )
}
