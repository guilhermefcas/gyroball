# 🎯 Quick Start - Teste de Webhook Mercado Pago

## 🚀 Teste Rápido (5 minutos)

### 1️⃣ Configurar Webhook no Mercado Pago

```bash
📍 URL do Webhook:
https://gyroball.com.br/api/webhooks/mercadopago

1. Acesse: https://www.mercadopago.com.br/developers/panel/app
2. Menu lateral > "Webhooks" 
3. Adicionar webhook > Cole a URL acima
4. Eventos: ☑️ Pagamentos
5. Salvar
```

### 2️⃣ Fazer um Pedido de Teste

```bash
🌐 Acessar: https://gyroball.com.br

📝 Dados de teste (Cartão Aprovado):
   Número: 5031 4332 1540 6351
   Nome: APRO
   Vencimento: 11/25
   CVV: 123
   CPF: 123.456.789-01
```

### 3️⃣ Monitorar Logs na Vercel

```bash
1. Acesse: https://vercel.com
2. Selecione projeto: gyroball
3. Deployments > Production > Functions
4. Procure: /api/webhooks/mercadopago
5. Veja logs em tempo real
```

### 4️⃣ Verificar Resultado

✅ **O que deve acontecer:**

1. **Webhook chamado** - Você verá logs na Vercel:
   ```
   🔔 Webhook recebido do Mercado Pago
   💳 Processando notificação de pagamento
   📦 Pedido encontrado
   ✅ Pedido atualizado: approved
   📧 Emails de notificação enviados
   ```

2. **Banco atualizado** - No Supabase:
   - `payment_status` → "approved"
   - `order_status` → "processing"

3. **Emails enviados**:
   - Cliente recebe confirmação do pedido
   - Admin recebe notificação de novo pedido

---

## 🧪 Teste Manual do Webhook

Se quiser testar o webhook diretamente:

```bash
# 1. Instalar dependências (se necessário)
npm install

# 2. Encontrar um PAYMENT_ID real
# Vá no Supabase > tabela orders > copie um mercado_pago_id

# 3. Testar webhook
node test-webhook.js SEU-PAYMENT-ID approved
```

---

## 🔍 Status dos Pagamentos

| Status MP | Nossa DB | Ação |
|-----------|----------|------|
| approved | approved | ✅ Pedido aprovado |
| pending | pending | ⏳ Aguardando |
| in_process | pending | ⏳ Processando |
| rejected | rejected | ❌ Rejeitado |
| cancelled | cancelled | ❌ Cancelado |
| refunded | cancelled | 💰 Reembolsado |

---

## 🐛 Problemas Comuns

### Webhook não é chamado
```bash
✓ URL configurada corretamente no MP?
✓ Usando credenciais de PRODUÇÃO?
✓ Domínio está online?
```

### Pedido não atualiza
```bash
✓ mercado_pago_id está salvo no banco?
✓ Credenciais Supabase corretas?
✓ Tabela orders existe?
```

### Emails não chegam
```bash
✓ RESEND_API_KEY configurado na Vercel?
✓ Domínio verificado no Resend?
✓ Veja logs de erro do email
```

---

## 📚 Documentação Completa

Para mais detalhes, veja: **TESTE-WEBHOOK-MP.md**

---

**Pronto para testar! 🚀**
