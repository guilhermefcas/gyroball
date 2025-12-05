import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import { preference } from '@/lib/mercadopago'
import { sendNewOrderEmailToAdmins } from '@/lib/email'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      // Dados do cliente
      name,
      email,
      cpf,
      phone,
      // Endereço
      cep,
      street,
      number,
      complement,
      neighborhood,
      city,
      state,
      // Pedido
      quantity,
      subtotal,
      shippingCost,
      total,
      paymentMethod,
    } = body

    console.log('📦 Criando pedido:', { name, email, cpf, quantity, total, paymentMethod })

    // 1. Verificar se o cliente já existe pelo CPF
    let customerId: string
    const { data: existingCustomer } = await supabase
      .from('customers')
      .select('id')
      .eq('cpf', cpf)
      .single()

    if (existingCustomer) {
      customerId = existingCustomer.id
      console.log('✅ Cliente existente encontrado:', customerId)
      
      await supabase
        .from('customers')
        .update({ name, email, phone })
        .eq('id', customerId)
    } else {
      const { data: newCustomer, error: customerError } = await supabase
        .from('customers')
        .insert({ name, email, cpf, phone })
        .select('id')
        .single()

      if (customerError) {
        console.error('❌ Erro ao criar cliente:', customerError)
        throw customerError
      }
      
      customerId = newCustomer.id
      console.log('✅ Novo cliente criado:', customerId)
    }

    // 2. Criar endereço de entrega
    const { data: newAddress, error: addressError } = await supabase
      .from('shipping_addresses')
      .insert({
        customer_id: customerId,
        cep,
        street,
        number,
        complement,
        neighborhood,
        city,
        state,
      })
      .select('id')
      .single()

    if (addressError) {
      console.error('❌ Erro ao criar endereço:', addressError)
      throw addressError
    }
    
    console.log('✅ Endereço criado:', newAddress.id)

    // 3. Criar pedido
    const { data: newOrder, error: orderError } = await supabase
      .from('orders')
      .insert({
        customer_id: customerId,
        shipping_address_id: newAddress.id,
        quantity,
        subtotal,
        shipping_cost: shippingCost,
        total,
        payment_method: paymentMethod,
        payment_status: 'pending',
        order_status: 'pending',
      })
      .select('*')
      .single()

    if (orderError) {
      console.error('❌ Erro ao criar pedido:', orderError)
      throw orderError
    }
    
    console.log('✅ Pedido criado:', newOrder.id)

    // 4. Criar preferência de pagamento no Mercado Pago
    let paymentResponse: any = null

    try {
      const preferenceData: any = {
        items: [
          {
            id: newOrder.id,
            title: `Gyroball Pro - ${quantity} unidade${quantity > 1 ? 's' : ''}`,
            description: 'Fortalecedor Muscular Giroscópico',
            quantity: quantity,
            unit_price: total,
            currency_id: 'BRL',
          },
        ],
        payer: {
          name: name,
          email: email,
          identification: {
            type: 'CPF',
            number: cpf.replace(/\D/g, ''),
          },
          phone: {
            number: phone.replace(/\D/g, ''),
          },
          address: {
            zip_code: cep.replace(/\D/g, ''),
            street_name: street,
            street_number: number,
            city: city,
            federal_unit: state,
          },
        },
        back_urls: {
          success: `${process.env.NEXT_PUBLIC_APP_URL}/payment/success`,
          failure: `${process.env.NEXT_PUBLIC_APP_URL}/payment/failure`,
          pending: `${process.env.NEXT_PUBLIC_APP_URL}/payment/pending`,
        },
        auto_return: 'approved' as const,
        payment_methods: {
          excluded_payment_types: [] as any[],
          installments: 12,
        },
        notification_url: `${process.env.NEXT_PUBLIC_APP_URL}/api/webhooks/mercadopago`,
        external_reference: newOrder.id,
        statement_descriptor: 'GYROBALL PRO',
      }

      // Se for PIX, configurar apenas PIX
      if (paymentMethod === 'pix') {
        preferenceData.payment_methods.excluded_payment_types = [
          { id: 'credit_card' },
          { id: 'debit_card' },
          { id: 'ticket' },
        ]
        preferenceData.payment_methods.installments = 1
      } else {
        // Se for cartão, excluir PIX
        preferenceData.payment_methods.excluded_payment_types = [
          { id: 'ticket' },
        ]
        preferenceData.payment_methods.installments = 12
      }

      console.log('💳 Criando preferência no Mercado Pago...')
      const mpPreference = await preference.create({ body: preferenceData })
      
      console.log('✅ Preferência criada:', mpPreference.id)

      // Atualizar pedido com ID do Mercado Pago
      await supabase
        .from('orders')
        .update({ mercado_pago_id: mpPreference.id })
        .eq('id', newOrder.id)

      paymentResponse = {
        preference_id: mpPreference.id,
        init_point: mpPreference.init_point, // URL de checkout do Mercado Pago
        sandbox_init_point: mpPreference.sandbox_init_point, // URL para testes
      }

      console.log('✅ Pedido finalizado com sucesso!')

      // Enviar email de novo pedido para admins
      try {
        const unitPrice = quantity === 1 ? 59.90 : (quantity === 2 ? 99.90 / 2 : 49.95)
        
        await sendNewOrderEmailToAdmins({
          orderId: newOrder.id,
          orderNumber: newOrder.id.substring(0, 8).toUpperCase(),
          customerName: name,
          customerEmail: email,
          customerCPF: cpf,
          customerPhone: phone,
          shippingAddress: {
            street,
            number,
            complement: complement || undefined,
            neighborhood,
            city,
            state,
            cep
          },
          items: [
            {
              name: 'Gyroball Pro - Fortalecedor Muscular Giroscópico',
              quantity,
              unitPrice,
              total: subtotal
            }
          ],
          subtotal,
          shippingCost,
          total,
          paymentMethod: paymentMethod as 'pix' | 'credit_card',
          paymentStatus: 'pending'
        })
        console.log('📧 Emails de novo pedido enviados para admins')
      } catch (emailError) {
        console.error('⚠️ Erro ao enviar emails (continuando):', emailError)
        // Não falhar a criação do pedido se o email falhar
      }

    } catch (mpError: any) {
      console.error('❌ Erro ao criar preferência no Mercado Pago:', mpError)
      
      // Se falhar no Mercado Pago, criar mock para testes
      paymentResponse = {
        mock: true,
        message: 'Configurar credenciais do Mercado Pago no .env.local',
        init_point: '/checkout?mock=true',
      }
    }

    return NextResponse.json({
      success: true,
      orderId: newOrder.id,
      payment: paymentResponse,
      paymentUrl: paymentResponse?.init_point || paymentResponse?.sandbox_init_point,
      message: 'Pedido criado com sucesso!',
    })

  } catch (error: any) {
    console.error('❌ Erro ao criar pedido:', error)
    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Erro ao processar pedido',
      },
      { status: 500 }
    )
  }
}

// GET - Buscar pedidos
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const customerId = searchParams.get('customerId')
    const orderId = searchParams.get('orderId')

    let query = supabase
      .from('orders')
      .select(`
        *,
        customers (*),
        shipping_addresses (*)
      `)
      .order('created_at', { ascending: false })

    if (customerId) {
      query = query.eq('customer_id', customerId)
    }

    if (orderId) {
      query = query.eq('id', orderId)
    }

    const { data, error } = await query

    if (error) throw error

    return NextResponse.json({ success: true, orders: data })

  } catch (error: any) {
    console.error('Erro ao buscar pedidos:', error)
    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Erro ao buscar pedidos',
      },
      { status: 500 }
    )
  }
}
