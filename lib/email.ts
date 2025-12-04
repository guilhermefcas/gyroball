import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

const EMAIL_FROM = 'Gyroball Pro <noreply@gyroball.com.br>'
const ADMIN_EMAILS = ['guilhermefcas07@gmail.com', 'raphaelctbc@gmail.com']

interface OrderEmailData {
  orderId: string
  orderNumber: string
  customerName: string
  customerEmail: string
  customerCPF: string
  customerPhone: string
  shippingAddress: {
    street: string
    number: string
    complement?: string
    neighborhood: string
    city: string
    state: string
    cep: string
  }
  items: {
    name: string
    quantity: number
    unitPrice: number
    total: number
  }[]
  subtotal: number
  shippingCost: number
  total: number
  paymentMethod: 'pix' | 'credit_card'
  paymentStatus: string
}

interface PaymentNotificationData {
  orderId: string
  orderNumber: string
  customerName: string
  customerEmail: string
  paymentStatus: 'approved' | 'pending' | 'rejected' | 'cancelled'
  paymentMethod: string
  amount: number
  mercadoPagoId: string
}

// Template de email para novo pedido (Admin)
function getNewOrderAdminEmailHTML(data: OrderEmailData): string {
  const statusBadge = data.paymentStatus === 'approved' 
    ? '<span style="background: #10b981; color: white; padding: 4px 12px; border-radius: 4px; font-size: 12px; font-weight: 600;">APROVADO</span>'
    : '<span style="background: #f59e0b; color: white; padding: 4px 12px; border-radius: 4px; font-size: 12px; font-weight: 600;">PENDENTE</span>'

  const paymentMethodText = data.paymentMethod === 'pix' ? 'PIX' : 'Cartão de Crédito'

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Novo Pedido - Gyroball Pro</title>
    </head>
    <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f3f4f6;">
      <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f3f4f6; padding: 40px 20px;">
        <tr>
          <td align="center">
            <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
              
              <!-- Header -->
              <tr>
                <td style="background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%); padding: 30px; text-align: center;">
                  <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: 700;">🎉 Novo Pedido Recebido!</h1>
                  <p style="margin: 10px 0 0 0; color: #e0e7ff; font-size: 14px;">Pedido #${data.orderNumber}</p>
                </td>
              </tr>

              <!-- Status Badge -->
              <tr>
                <td style="padding: 20px; text-align: center; background-color: #f9fafb;">
                  ${statusBadge}
                </td>
              </tr>

              <!-- Informações do Cliente -->
              <tr>
                <td style="padding: 30px;">
                  <h2 style="margin: 0 0 20px 0; color: #111827; font-size: 18px; font-weight: 600; border-bottom: 2px solid #3b82f6; padding-bottom: 10px;">👤 Dados do Cliente</h2>
                  <table width="100%" cellpadding="8" cellspacing="0">
                    <tr>
                      <td style="color: #6b7280; font-size: 14px; width: 120px;"><strong>Nome:</strong></td>
                      <td style="color: #111827; font-size: 14px;">${data.customerName}</td>
                    </tr>
                    <tr>
                      <td style="color: #6b7280; font-size: 14px;"><strong>Email:</strong></td>
                      <td style="color: #111827; font-size: 14px;">${data.customerEmail}</td>
                    </tr>
                    <tr>
                      <td style="color: #6b7280; font-size: 14px;"><strong>CPF:</strong></td>
                      <td style="color: #111827; font-size: 14px;">${data.customerCPF}</td>
                    </tr>
                    <tr>
                      <td style="color: #6b7280; font-size: 14px;"><strong>Telefone:</strong></td>
                      <td style="color: #111827; font-size: 14px;">${data.customerPhone}</td>
                    </tr>
                  </table>
                </td>
              </tr>

              <!-- Endereço de Entrega -->
              <tr>
                <td style="padding: 0 30px 30px 30px;">
                  <h2 style="margin: 0 0 20px 0; color: #111827; font-size: 18px; font-weight: 600; border-bottom: 2px solid #3b82f6; padding-bottom: 10px;">📦 Endereço de Entrega</h2>
                  <p style="margin: 0; color: #111827; font-size: 14px; line-height: 1.6;">
                    ${data.shippingAddress.street}, ${data.shippingAddress.number}${data.shippingAddress.complement ? ` - ${data.shippingAddress.complement}` : ''}<br>
                    ${data.shippingAddress.neighborhood}<br>
                    ${data.shippingAddress.city} - ${data.shippingAddress.state}<br>
                    CEP: ${data.shippingAddress.cep}
                  </p>
                </td>
              </tr>

              <!-- Itens do Pedido -->
              <tr>
                <td style="padding: 0 30px 30px 30px;">
                  <h2 style="margin: 0 0 20px 0; color: #111827; font-size: 18px; font-weight: 600; border-bottom: 2px solid #3b82f6; padding-bottom: 10px;">🛒 Itens do Pedido</h2>
                  <table width="100%" cellpadding="12" cellspacing="0" style="background-color: #f9fafb; border-radius: 8px;">
                    ${data.items.map(item => `
                      <tr>
                        <td style="color: #111827; font-size: 14px; border-bottom: 1px solid #e5e7eb;">
                          <strong>${item.name}</strong><br>
                          <span style="color: #6b7280; font-size: 12px;">Quantidade: ${item.quantity}x</span>
                        </td>
                        <td align="right" style="color: #111827; font-size: 14px; font-weight: 600; border-bottom: 1px solid #e5e7eb;">
                          R$ ${item.total.toFixed(2).replace('.', ',')}
                        </td>
                      </tr>
                    `).join('')}
                  </table>
                </td>
              </tr>

              <!-- Resumo do Pedido -->
              <tr>
                <td style="padding: 0 30px 30px 30px;">
                  <table width="100%" cellpadding="8" cellspacing="0" style="background-color: #f9fafb; border-radius: 8px; padding: 15px;">
                    <tr>
                      <td style="color: #6b7280; font-size: 14px;">Subtotal:</td>
                      <td align="right" style="color: #111827; font-size: 14px;">R$ ${data.subtotal.toFixed(2).replace('.', ',')}</td>
                    </tr>
                    <tr>
                      <td style="color: #6b7280; font-size: 14px;">Frete:</td>
                      <td align="right" style="color: #111827; font-size: 14px;">R$ ${data.shippingCost.toFixed(2).replace('.', ',')}</td>
                    </tr>
                    <tr style="border-top: 2px solid #3b82f6;">
                      <td style="color: #111827; font-size: 18px; font-weight: 700; padding-top: 12px;">TOTAL:</td>
                      <td align="right" style="color: #3b82f6; font-size: 18px; font-weight: 700; padding-top: 12px;">R$ ${data.total.toFixed(2).replace('.', ',')}</td>
                    </tr>
                  </table>
                </td>
              </tr>

              <!-- Pagamento -->
              <tr>
                <td style="padding: 0 30px 30px 30px;">
                  <table width="100%" cellpadding="12" cellspacing="0" style="background-color: #eff6ff; border-radius: 8px; border: 1px solid #3b82f6;">
                    <tr>
                      <td style="color: #1e40af; font-size: 14px;">
                        <strong>💳 Forma de Pagamento:</strong> ${paymentMethodText}
                      </td>
                    </tr>
                    <tr>
                      <td style="color: #1e40af; font-size: 14px;">
                        <strong>📋 ID do Pedido:</strong> ${data.orderId}
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>

              <!-- Footer -->
              <tr>
                <td style="background-color: #f9fafb; padding: 20px; text-align: center; border-top: 1px solid #e5e7eb;">
                  <p style="margin: 0; color: #6b7280; font-size: 12px;">
                    Este é um email automático do sistema Gyroball Pro<br>
                    Para gerenciar pedidos, acesse o painel administrativo
                  </p>
                </td>
              </tr>

            </table>
          </td>
        </tr>
      </table>
    </body>
    </html>
  `
}

// Template de notificação de pagamento (Admin)
function getPaymentNotificationAdminEmailHTML(data: PaymentNotificationData): string {
  const statusConfig = {
    approved: { color: '#10b981', text: 'APROVADO', emoji: '✅' },
    pending: { color: '#f59e0b', text: 'PENDENTE', emoji: '⏳' },
    rejected: { color: '#ef4444', text: 'RECUSADO', emoji: '❌' },
    cancelled: { color: '#6b7280', text: 'CANCELADO', emoji: '🚫' }
  }

  const status = statusConfig[data.paymentStatus] || statusConfig.pending

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Atualização de Pagamento - Gyroball Pro</title>
    </head>
    <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f3f4f6;">
      <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f3f4f6; padding: 40px 20px;">
        <tr>
          <td align="center">
            <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
              
              <!-- Header -->
              <tr>
                <td style="background-color: ${status.color}; padding: 30px; text-align: center;">
                  <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: 700;">${status.emoji} Pagamento ${status.text}</h1>
                  <p style="margin: 10px 0 0 0; color: rgba(255, 255, 255, 0.9); font-size: 14px;">Pedido #${data.orderNumber}</p>
                </td>
              </tr>

              <!-- Conteúdo -->
              <tr>
                <td style="padding: 40px;">
                  <h2 style="margin: 0 0 20px 0; color: #111827; font-size: 18px; font-weight: 600;">Detalhes do Pagamento</h2>
                  
                  <table width="100%" cellpadding="12" cellspacing="0" style="background-color: #f9fafb; border-radius: 8px; margin-bottom: 20px;">
                    <tr>
                      <td style="color: #6b7280; font-size: 14px; width: 180px;"><strong>Status:</strong></td>
                      <td style="color: ${status.color}; font-size: 14px; font-weight: 600;">${status.text}</td>
                    </tr>
                    <tr>
                      <td style="color: #6b7280; font-size: 14px;"><strong>Valor:</strong></td>
                      <td style="color: #111827; font-size: 14px; font-weight: 600;">R$ ${data.amount.toFixed(2).replace('.', ',')}</td>
                    </tr>
                    <tr>
                      <td style="color: #6b7280; font-size: 14px;"><strong>Forma de Pagamento:</strong></td>
                      <td style="color: #111827; font-size: 14px;">${data.paymentMethod}</td>
                    </tr>
                    <tr>
                      <td style="color: #6b7280; font-size: 14px;"><strong>Cliente:</strong></td>
                      <td style="color: #111827; font-size: 14px;">${data.customerName}</td>
                    </tr>
                    <tr>
                      <td style="color: #6b7280; font-size: 14px;"><strong>Email do Cliente:</strong></td>
                      <td style="color: #111827; font-size: 14px;">${data.customerEmail}</td>
                    </tr>
                    <tr>
                      <td style="color: #6b7280; font-size: 14px;"><strong>ID do Pedido:</strong></td>
                      <td style="color: #111827; font-size: 14px; font-family: monospace;">${data.orderId}</td>
                    </tr>
                    <tr>
                      <td style="color: #6b7280; font-size: 14px;"><strong>ID Mercado Pago:</strong></td>
                      <td style="color: #111827; font-size: 14px; font-family: monospace;">${data.mercadoPagoId}</td>
                    </tr>
                  </table>

                  ${data.paymentStatus === 'approved' ? `
                    <div style="background-color: #d1fae5; border-left: 4px solid #10b981; padding: 15px; border-radius: 4px; margin-top: 20px;">
                      <p style="margin: 0; color: #065f46; font-size: 14px;">
                        <strong>✅ Ação necessária:</strong> Processar e enviar o pedido para o cliente.
                      </p>
                    </div>
                  ` : ''}

                </td>
              </tr>

              <!-- Footer -->
              <tr>
                <td style="background-color: #f9fafb; padding: 20px; text-align: center; border-top: 1px solid #e5e7eb;">
                  <p style="margin: 0; color: #6b7280; font-size: 12px;">
                    Este é um email automático do webhook do Mercado Pago<br>
                    Gyroball Pro - Sistema de Notificações
                  </p>
                </td>
              </tr>

            </table>
          </td>
        </tr>
      </table>
    </body>
    </html>
  `
}

// Enviar email de novo pedido para admins
export async function sendNewOrderEmailToAdmins(data: OrderEmailData) {
  try {
    const emailPromises = ADMIN_EMAILS.map(adminEmail =>
      resend.emails.send({
        from: EMAIL_FROM,
        to: adminEmail,
        subject: `🎉 Novo Pedido #${data.orderNumber} - Gyroball Pro`,
        html: getNewOrderAdminEmailHTML(data)
      })
    )

    await Promise.all(emailPromises)
    console.log('✅ Emails de novo pedido enviados para admins:', ADMIN_EMAILS)
  } catch (error) {
    console.error('❌ Erro ao enviar emails de novo pedido:', error)
    throw error
  }
}

// Enviar notificação de pagamento para admins
export async function sendPaymentNotificationToAdmins(data: PaymentNotificationData) {
  try {
    const emailPromises = ADMIN_EMAILS.map(adminEmail =>
      resend.emails.send({
        from: EMAIL_FROM,
        to: adminEmail,
        subject: `${data.paymentStatus === 'approved' ? '✅' : '⏳'} Pagamento ${data.paymentStatus.toUpperCase()} - Pedido #${data.orderNumber}`,
        html: getPaymentNotificationAdminEmailHTML(data)
      })
    )

    await Promise.all(emailPromises)
    console.log('✅ Emails de notificação de pagamento enviados para admins:', ADMIN_EMAILS)
  } catch (error) {
    console.error('❌ Erro ao enviar emails de notificação de pagamento:', error)
    throw error
  }
}
