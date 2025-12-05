// Script para testar webhook do Mercado Pago localmente
// Execute com: node test-webhook.js

const testWebhook = async (paymentId, status = 'approved') => {
  const webhookUrl = 'https://gyroball.com.br/api/webhooks/mercadopago'
  
  const payload = {
    type: 'payment',
    data: {
      id: paymentId,
      status: status
    }
  }

  console.log('🧪 Testando webhook...')
  console.log('URL:', webhookUrl)
  console.log('Payload:', JSON.stringify(payload, null, 2))
  console.log('')

  try {
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-signature': 'test-signature',
        'x-request-id': `test-${Date.now()}`
      },
      body: JSON.stringify(payload)
    })

    const data = await response.json()
    
    console.log('✅ Status:', response.status)
    console.log('📦 Resposta:', JSON.stringify(data, null, 2))
    
    if (response.ok) {
      console.log('\n✅ Webhook funcionou corretamente!')
      console.log('\n📋 Próximos passos:')
      console.log('1. Verifique os logs na Vercel')
      console.log('2. Confirme a atualização no Supabase')
      console.log('3. Verifique se os emails foram enviados')
    } else {
      console.log('\n❌ Webhook retornou erro')
    }

  } catch (error) {
    console.error('❌ Erro ao chamar webhook:', error.message)
  }
}

// Exemplos de uso:
console.log('═══════════════════════════════════════════')
console.log('🧪 TESTE DE WEBHOOK - MERCADO PAGO')
console.log('═══════════════════════════════════════════\n')

// Substitua pelo ID do pagamento real que você quer testar
const PAYMENT_ID = process.argv[2] || 'EXEMPLO-PAYMENT-ID'
const STATUS = process.argv[3] || 'approved'

if (PAYMENT_ID === 'EXEMPLO-PAYMENT-ID') {
  console.log('⚠️  Uso: node test-webhook.js [PAYMENT_ID] [STATUS]')
  console.log('\nExemplos:')
  console.log('  node test-webhook.js 1234567890 approved')
  console.log('  node test-webhook.js 1234567890 pending')
  console.log('  node test-webhook.js 1234567890 rejected')
  console.log('\n💡 Dica: O PAYMENT_ID deve ser o mesmo que está salvo no campo')
  console.log('   "mercado_pago_id" da tabela orders no Supabase\n')
  process.exit(1)
}

testWebhook(PAYMENT_ID, STATUS)
