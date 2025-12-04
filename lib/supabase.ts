import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Types para o banco de dados
export interface Customer {
  id?: string
  name: string
  email: string
  cpf: string
  phone: string
  created_at?: string
}

export interface ShippingAddress {
  id?: string
  customer_id: string
  cep: string
  street: string
  number: string
  complement?: string
  neighborhood: string
  city: string
  state: string
  created_at?: string
}

export interface Order {
  id?: string
  customer_id: string
  shipping_address_id: string
  quantity: number
  subtotal: number
  shipping_cost: number
  total: number
  payment_method: 'pix' | 'credit_card'
  payment_status: 'pending' | 'approved' | 'rejected' | 'cancelled'
  order_status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
  mercado_pago_id?: string
  created_at?: string
  updated_at?: string
}
