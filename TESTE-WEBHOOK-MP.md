# 🧪 Guia de Teste - Webhook Mercado Pago

## 📋 Pré-requisitos

- [ ] Projeto deployado na Vercel
- [ ] Domínio configurado (gyroball.com.br)
- [ ] Variáveis de ambiente configuradas na Vercel
- [ ] Conta no Mercado Pago com credenciais de teste

## 🔧 Passo 1: Configurar Webhook no Mercado Pago

### 1.1 Acessar o Dashboard do Mercado Pago

1. Acesse: https://www.mercadopago.com.br/developers/panel/app
2. Faça login com sua conta
3. Selecione sua aplicação

### 1.2 Configurar URL do Webhook

1. No menu lateral, clique em **"Webhooks"**
2. Clique em **"Configurar notificações"** ou **"Adicionar webhook"**
3. Configure da seguinte forma:

```
URL de produção:
https://gyroball.com.br/api/webhooks/mercadopago

Eventos a serem notificados:
☑️ Pagamentos (payment)
☑️ Merchant Orders (merchant_order) - opcional

Modo: Produção
```

4. Clique em **"Salvar"**

### 1.3 Obter Credenciais de Teste

Para testes seguros sem cobranças reais:

1. No menu, vá em **"Suas integrações"**
2. Selecione **"Credenciais de teste"**
3. Copie:
   - **Public Key de Teste**: `TEST-xxxxx`
   - **Access Token de Teste**: `TEST-xxxxx`

## 🧪 Passo 2: Configurar Ambiente de Teste na Vercel

### 2.1 Adicionar Variáveis de Teste

Você pode criar uma preview deployment para testes ou usar as credenciais de teste temporariamente:

```bash
# Opção 1: Criar branch de teste
git checkout -b test-webhook
git push origin test-webhook
```

Depois configure as variáveis de teste na Vercel para essa branch.

### 2.2 Variáveis Necessárias

```env
NEXT_PUBLIC_MERCADOPAGO_PUBLIC_KEY=TEST-sua-public-key-de-teste
MERCADOPAGO_ACCESS_TOKEN=TEST-seu-access-token-de-teste
```

## 🎯 Passo 3: Realizar Teste de Pagamento

### 3.1 Acessar o Site

1. Acesse: https://gyroball.com.br
2. Adicione um produto ao carrinho
3. Preencha os dados do formulário

### 3.2 Dados de Teste para Cartão de Crédito

Use estes dados de teste fornecidos pelo Mercado Pago:

**Cartão Aprovado:**
```
Número: 5031 4332 1540 6351
Nome: APRO (Teste Aprovado)
Vencimento: 11/25
CVV: 123
CPF: 123.456.789-01
```

**Cartão Pendente:**
```
Número: 5031 4332 1540 6351
Nome: CONT (Teste Pendente)
Vencimento: 11/25
CVV: 123
```

**Cartão Rejeitado:**
```
Número: 5031 4332 1540 6351
Nome: OTHE (Teste Rejeitado)
Vencimento: 11/25
CVV: 123
```

### 3.3 Dados de Teste para PIX

1. Selecione a opção PIX
2. Complete o pedido
3. Será gerado um QR Code de teste
4. Use o app do Mercado Pago em modo teste para simular o pagamento

## 📊 Passo 4: Monitorar o Webhook

### 4.1 Verificar Logs na Vercel

1. Acesse: https://vercel.com/seu-usuario/gyroball
2. Vá em **"Deployments"** > Selecione o deployment ativo
3. Clique em **"Functions"**
4. Procure por `/api/webhooks/mercadopago`
5. Veja os logs em tempo real

### 4.2 O que Verificar nos Logs

Os logs devem mostrar:

```
🔔 Webhook recebido do Mercado Pago
Signature: [hash]
Request ID: [id]
Body: { type: 'payment', data: { id: 'xxx' } }
💳 Processando notificação de pagamento: xxx
📦 Pedido encontrado: [order-id]
✅ Pedido [order-id] atualizado: approved
📧 Emails de notificação enviados para admins
✅ Webhook processado com sucesso
```

### 4.3 Verificar no Supabase

1. Acesse seu projeto no Supabase
2. Vá em **"Table Editor"**
3. Abra a tabela **"orders"**
4. Verifique se:
   - `payment_status` foi atualizado para "approved"
   - `order_status` foi atualizado para "processing"
   - `updated_at` foi atualizado

## 📧 Passo 5: Verificar Emails

### 5.1 Verificar Email de Confirmação (Cliente)

Deve chegar no email do cliente:
- ✅ Confirmação do pedido
- ✅ Número do pedido
- ✅ Detalhes do produto
- ✅ Informações de entrega

### 5.2 Verificar Email de Notificação (Admin)

Deve chegar no email configurado no Resend:
- ✅ Novo pedido recebido
- ✅ Status do pagamento
- ✅ Dados do cliente
- ✅ Link para gerenciar

## 🛠️ Passo 6: Testar Webhook Manualmente (Opcional)

### 6.1 Usando cURL

```bash
curl -X POST https://gyroball.com.br/api/webhooks/mercadopago \
  -H "Content-Type: application/json" \
  -H "x-signature: test-signature" \
  -H "x-request-id: test-request-id" \
  -d '{
    "type": "payment",
    "data": {
      "id": "seu-payment-id-aqui",
      "status": "approved"
    }
  }'
```

### 6.2 Usando Postman

1. Método: **POST**
2. URL: `https://gyroball.com.br/api/webhooks/mercadopago`
3. Headers:
   ```
   Content-Type: application/json
   x-signature: test-signature
   x-request-id: test-request-id
   ```
4. Body (JSON):
   ```json
   {
     "type": "payment",
     "data": {
       "id": "seu-payment-id-real",
       "status": "approved"
     }
   }
   ```

## ✅ Checklist de Validação

Após realizar os testes, verifique:

- [ ] Webhook está recebendo notificações do Mercado Pago
- [ ] Logs aparecem corretamente na Vercel
- [ ] Status do pedido é atualizado no Supabase
- [ ] Email de confirmação chega para o cliente
- [ ] Email de notificação chega para o admin
- [ ] QR Code PIX é gerado corretamente
- [ ] Pagamento com cartão funciona
- [ ] Diferentes status são tratados (aprovado, pendente, rejeitado)

## 🐛 Troubleshooting

### Webhook não está sendo chamado

1. Verifique se a URL está correta no Mercado Pago
2. Certifique-se de estar usando credenciais de produção
3. Verifique se o domínio está acessível publicamente

### Pedido não é atualizado

1. Verifique se o `mercado_pago_id` está sendo salvo corretamente
2. Confirme se as credenciais do Supabase estão corretas
3. Veja os logs do webhook para erros

### Emails não chegam

1. Verifique se o `RESEND_API_KEY` está configurado
2. Confirme se o domínio do email está verificado no Resend
3. Veja os logs para erros de envio de email

### Erro 500 no webhook

1. Verifique as variáveis de ambiente na Vercel
2. Veja os logs completos para identificar o erro
3. Confirme se as tabelas do Supabase estão criadas

## 📞 Suporte

Se precisar de ajuda:

- **Documentação Mercado Pago**: https://www.mercadopago.com.br/developers/pt/docs/checkout-pro/landing
- **Documentação Webhooks**: https://www.mercadopago.com.br/developers/pt/docs/your-integrations/notifications/webhooks
- **Simulador de Pagamentos**: https://www.mercadopago.com.br/developers/pt/docs/checkout-pro/additional-content/test-integration

---

**Última atualização**: 5 de dezembro de 2025
