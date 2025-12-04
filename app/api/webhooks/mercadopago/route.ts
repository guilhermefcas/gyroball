import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import { sendPaymentNotificationToAdmins } from '@/lib/email'

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
      console.log('💳 Processando notificação de pagamento:', paymentId)

      // Buscar o pedido pelo mercado_pago_id
      const { data: order, error: orderError } = await supabase
        .from('orders')
        .select(`
          *,
          customers (
            name,
            email
          )
        `)
        .eq('mercado_pago_id', paymentId.toString())
        .single()

      if (orderError || !order) {
        console.log('⚠️ Pedido não encontrado para payment_id:', paymentId)
        return NextResponse.json({ success: true, message: 'Pedido não encontrado' })
      }

      console.log('📦 Pedido encontrado:', order.id)

      // Mapear status do Mercado Pago
      const statusMap: Record<string, string> = {
        'approved': 'approved',
        'pending': 'pending',
        'in_process': 'pending',
        'rejected': 'rejected',
        'cancelled': 'cancelled',
        'refunded': 'cancelled'
      }

      const newPaymentStatus = statusMap[data.status] || 'pending'
      const newOrderStatus = newPaymentStatus === 'approved' ? 'processing' : 'pending'

      // Atualizar status do pedido
      const { error: updateError } = await supabase
        .from('orders')
        .update({
          payment_status: newPaymentStatus,
          order_status: newOrderStatus,
          updated_at: new Date().toISOString()
        })
        .eq('id', order.id)

      if (updateError) {
        console.error('❌ Erro ao atualizar pedido:', updateError)
        throw updateError
      }

      console.log(`✅ Pedido ${order.id} atualizado: ${newPaymentStatus}`)

      // Enviar email de notificação para admins
      try {
        await sendPaymentNotificationToAdmins({
          orderId: order.id,
          orderNumber: order.id.substring(0, 8).toUpperCase(),
          customerName: order.customers.name,
          customerEmail: order.customers.email,
          paymentStatus: newPaymentStatus as any,
          paymentMethod: order.payment_method === 'pix' ? 'PIX' : 'Cartão de Crédito',
          amount: order.total,
          mercadoPagoId: paymentId.toString()
        })
        console.log('📧 Emails de notificação enviados para admins')
      } catch (emailError) {
        console.error('⚠️ Erro ao enviar emails (continuando):', emailError)
        // Não falhar o webhook se o email falhar
      }

      console.log('✅ Webhook processado com sucesso')
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
