import { MercadoPagoConfig, Payment, Preference } from 'mercadopago'

// Inicializar cliente do Mercado Pago
const client = new MercadoPagoConfig({
  accessToken: process.env.MERCADOPAGO_ACCESS_TOKEN || '',
  options: {
    timeout: 5000,
  },
})

const payment = new Payment(client)
const preference = new Preference(client)

export { payment, preference }

// Tipos
export interface MercadoPagoPaymentData {
  orderId: string
  amount: number
  paymentMethod: 'pix' | 'credit_card'
  customer: {
    name: string
    email: string
    cpf: string
    phone: string
  }
  cardData?: {
    cardNumber: string
    cardholderName: string
    expirationDate: string
    securityCode: string
  }
}

export interface MercadoPagoPixResponse {
  id: string
  status: string
  qr_code: string
  qr_code_base64: string
  ticket_url: string
}

export interface MercadoPagoCardResponse {
  id: string
  status: string
  status_detail: string
  transaction_amount: number
}
