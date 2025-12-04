export interface Product {
  id: string
  name: string
  description: string
  price: number
  price2Units: number
  images: string[]
  features: string[]
  stock: number
}

export interface CartItem {
  productId: string
  quantity: number
  price: number
}

export interface ShippingInfo {
  cep: string
  street: string
  number: string
  complement?: string
  neighborhood: string
  city: string
  state: string
}

export interface CustomerInfo {
  name: string
  email: string
  cpf: string
  phone: string
  shipping: ShippingInfo
}

export interface ShippingOption {
  id: string
  name: string
  price: number
  deliveryTime: string
  company: string
}

export interface Order {
  id?: string
  customer: CustomerInfo
  items: CartItem[]
  subtotal: number
  shipping: ShippingOption
  total: number
  paymentMethod: 'pix' | 'credit_card'
  status: 'pending' | 'paid' | 'shipped' | 'delivered' | 'cancelled'
  createdAt?: string
  updatedAt?: string
}

export interface Testimonial {
  id: string
  name: string
  rating: number
  comment: string
  date: string
  verified: boolean
  avatar?: string
}
