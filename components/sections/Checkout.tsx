'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Minus, Plus, Truck, CreditCard, QrCode, Loader2 } from 'lucide-react'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import Card from '@/components/ui/Card'
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
})

type CheckoutForm = z.infer<typeof checkoutSchema>

interface CheckoutProps {
  onClose: () => void
}

export default function Checkout({ onClose }: CheckoutProps) {
  const [quantity, setQuantity] = useState(1)
  const [paymentMethod, setPaymentMethod] = useState<'pix' | 'credit_card' | null>(null)
  const [shippingOptions, setShippingOptions] = useState<ShippingOption[]>([])
  const [selectedShipping, setSelectedShipping] = useState<ShippingOption | null>(null)
  const [loadingCep, setLoadingCep] = useState(false)
  const [loadingOrder, setLoadingOrder] = useState(false)

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

  const unitPrice = 59.90
  const price2Units = 99.90
  const subtotal = quantity === 1 ? unitPrice : price2Units
  const shippingCost = selectedShipping?.price || 0
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
      // Fetch address from ViaCEP
      const response = await fetch(`https://viacep.com.br/ws/${cepNumbers}/json/`)
      const data = await response.json()

      if (!data.erro) {
        setValue('street', data.logradouro || '')
        setValue('neighborhood', data.bairro || '')
        setValue('city', data.localidade || '')
        setValue('state', data.uf || '')

        // Simulate shipping calculation (replace with real API)
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

  const onSubmit = async (data: CheckoutForm) => {
    if (!paymentMethod) {
      alert('Selecione uma forma de pagamento')
      return
    }

    if (!selectedShipping) {
      alert('Calcule o frete antes de continuar')
      return
    }

    setLoadingOrder(true)

    try {
      const orderData = {
        customer: {
          name: data.name,
          email: data.email,
          cpf: data.cpf,
          phone: data.phone,
          shipping: {
            cep: data.cep,
            street: data.street,
            number: data.number,
            complement: data.complement,
            neighborhood: data.neighborhood,
            city: data.city,
            state: data.state,
          },
        },
        items: [
          {
            productId: 'gyroball-pro',
            quantity,
            price: subtotal,
          },
        ],
        subtotal,
        shipping: selectedShipping,
        total,
        paymentMethod,
      }

      // Send order to API
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData),
      })

      const result = await response.json()

      if (response.ok) {
        // Redirect to payment based on method
        if (paymentMethod === 'pix') {
          window.location.href = result.paymentUrl
        } else {
          window.location.href = result.paymentUrl
        }
      } else {
        alert('Erro ao processar pedido. Tente novamente.')
      }
    } catch (error) {
      console.error('Error creating order:', error)
      alert('Erro ao processar pedido. Tente novamente.')
    } finally {
      setLoadingOrder(false)
    }
  }

  return (
    <div className="max-h-[80vh] overflow-y-auto">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Quantity Selector */}
        <Card>
          <h3 className="text-xl font-bold text-gray-900 mb-4">Quantidade</h3>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => handleQuantityChange(-1)}
                disabled={quantity <= 1}
              >
                <Minus className="w-4 h-4" />
              </Button>
              <span className="text-2xl font-bold w-12 text-center">{quantity}</span>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => handleQuantityChange(1)}
              >
                <Plus className="w-4 h-4" />
              </Button>
            </div>
            <div className="text-right">
              {quantity === 2 && (
                <div className="text-sm text-green-600 font-semibold mb-1">
                  🎉 Você economizou R$ {((unitPrice * 2) - price2Units).toFixed(2)}!
                </div>
              )}
              <div className="text-2xl font-bold text-gray-900">
                {formatCurrency(subtotal)}
              </div>
            </div>
          </div>
        </Card>

        {/* Customer Info */}
        <Card>
          <h3 className="text-xl font-bold text-gray-900 mb-4">Dados Pessoais</h3>
          <div className="grid md:grid-cols-2 gap-3 md:gap-4">
            <div className="md:col-span-2">
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

        {/* Shipping */}
        <Card>
          <h3 className="text-xl font-bold text-gray-900 mb-4">Endereço de Entrega</h3>
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

            <div className="grid md:grid-cols-4 gap-4">
              <div className="md:col-span-3">
                <Input
                  label="Endereço"
                  {...register('street')}
                  error={errors.street?.message}
                  required
                />
              </div>
              <Input
                label="Número"
                {...register('number')}
                error={errors.number?.message}
                required
              />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <Input
                label="Complemento"
                {...register('complement')}
                placeholder="Opcional"
              />
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

            {/* Shipping Options */}
            <AnimatePresence>
              {shippingOptions.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="space-y-2 pt-4 border-t"
                >
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
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </Card>

        {/* Payment Method */}
        <Card>
          <h3 className="text-xl font-bold text-gray-900 mb-4">Forma de Pagamento</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <button
              type="button"
              onClick={() => setPaymentMethod('pix')}
              className={`p-4 md:p-6 rounded-xl border-2 transition-all ${
                paymentMethod === 'pix'
                  ? 'border-blue-600 bg-blue-50'
                  : 'border-gray-200 hover:border-blue-300'
              }`}
            >
              <QrCode className="w-6 h-6 md:w-8 md:h-8 mx-auto mb-2 text-blue-600" />
              <div className="font-bold text-gray-900">PIX</div>
              <div className="text-sm text-gray-600">Aprovação imediata</div>
            </button>
            <button
              type="button"
              onClick={() => setPaymentMethod('credit_card')}
              className={`p-4 md:p-6 rounded-xl border-2 transition-all ${
                paymentMethod === 'credit_card'
                  ? 'border-blue-600 bg-blue-50'
                  : 'border-gray-200 hover:border-blue-300'
              }`}
            >
              <CreditCard className="w-6 h-6 md:w-8 md:h-8 mx-auto mb-2 text-blue-600" />
              <div className="font-bold text-gray-900">Cartão de Crédito</div>
              <div className="text-sm text-gray-600">Parcelamento disponível</div>
            </button>
          </div>
        </Card>

        {/* Order Summary */}
        <Card className="bg-gradient-to-br from-blue-50 to-purple-50">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Resumo do Pedido</h3>
          <div className="space-y-2">
            <div className="flex justify-between text-gray-700">
              <span>Subtotal ({quantity}x)</span>
              <span>{formatCurrency(subtotal)}</span>
            </div>
            {selectedShipping && (
              <div className="flex justify-between text-gray-700">
                <span>Frete ({selectedShipping.name})</span>
                <span>{formatCurrency(shippingCost)}</span>
              </div>
            )}
            <div className="border-t-2 border-gray-300 pt-2 flex justify-between text-2xl font-bold text-gray-900">
              <span>Total</span>
              <span className="text-blue-600">{formatCurrency(total)}</span>
            </div>
          </div>
        </Card>

        {/* Submit Button */}
        <Button
          type="submit"
          size="lg"
          className="w-full"
          isLoading={loadingOrder}
          disabled={!paymentMethod || !selectedShipping}
        >
          {loadingOrder ? 'Processando...' : 'Finalizar Compra'}
        </Button>
      </form>
    </div>
  )
}
