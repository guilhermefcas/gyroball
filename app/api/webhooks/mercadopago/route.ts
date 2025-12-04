import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const signature = request.headers.get('x-signature')
    const requestId = request.headers.get('x-request-id')

    console.log('🔔 Webhook recebido do Mercado Pago')
    console.log('Signature:', signature)
    console.log('Request ID:', requestId)
    console.log('Body:', body)

    const { type, data } = body

    // Processar notificação de pagamento
    if (type === 'payment') {
      const paymentId = data.id
      console.log('💳 Atualizando status do pagamento:', paymentId)

      // TODO: Buscar detalhes do pagamento no Mercado Pago
      // const payment = await mercadopago.payment.get(paymentId)
      
      // TODO: Atualizar pedido no Supabase
      // const orderId = payment.external_reference
      // await supabase
      //   .from('orders')
      //   .update({
      //     payment_status: payment.status,
      //     order_status: payment.status === 'approved' ? 'processing' : 'pending'
      //   })
      //   .eq('id', orderId)

      console.log('✅ Webhook processado')
    }

    return NextResponse.json({ success: true })

  } catch (error: any) {
    console.error('❌ Erro ao processar webhook:', error)
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    )
  }
}
