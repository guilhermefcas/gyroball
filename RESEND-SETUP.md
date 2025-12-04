# 📧 Guia de Configuração do Resend para Emails

## 🎯 O que é o Resend?

O Resend é um serviço moderno de envio de emails transacionais (confirmações de pedido, notificações, etc). É fácil de configurar e tem plano gratuito generoso.

---

## 📋 Passo a Passo - Configuração Completa

### 1️⃣ Criar Conta no Resend

1. Acesse: **https://resend.com**
2. Clique em **Sign Up**
3. Crie sua conta (pode usar GitHub ou email)
4. Confirme seu email

---

### 2️⃣ Adicionar e Verificar Domínio

#### Opção A: Usar domínio próprio (gyroball.com.br) - RECOMENDADO

1. No dashboard do Resend, vá em **Domains**
2. Clique em **Add Domain**
3. Digite: `gyroball.com.br`
4. Clique em **Add**

5. **Adicione os registros DNS** no seu provedor de domínio:

```
Tipo: TXT
Nome: @
Valor: [copie do Resend]

Tipo: TXT  
Nome: resend._domainkey
Valor: [copie do Resend]

Tipo: CNAME
Nome: resend
Valor: [copie do Resend]
```

6. Aguarde a verificação (15-30 minutos)
7. Quando verificado, você poderá enviar de `noreply@gyroball.com.br`

#### Opção B: Usar domínio de teste (apenas para testes)

1. No Resend, você já tem um domínio padrão configurado
2. Emails serão enviados de `onboarding@resend.dev`
3. **Funciona apenas para desenvolvimento**, não para produção

---

### 3️⃣ Gerar API Key

1. No dashboard do Resend, vá em **API Keys**
2. Clique em **Create API Key**
3. Nome: `Gyroball Production`
4. Permission: **Full Access** (para enviar e ver logs)
5. Domain: Selecione `gyroball.com.br` (ou All Domains)
6. Clique em **Create**

7. **COPIE A API KEY** (ela aparece apenas uma vez!)
   - Formato: `re_XXXXXXXXXXXXXXXXXXXXXXXXXXXX`

---

### 4️⃣ Configurar no Projeto

#### A. Adicione no `.env.local`:

```bash
RESEND_API_KEY=re_XXXXXXXXXXXXXXXXXXXXXXXXX
```

**⚠️ IMPORTANTE:** Use a API Key real que você copiou!

#### B. Adicione no Vercel:

1. Acesse: **Vercel Dashboard** > Seu Projeto > **Settings** > **Environment Variables**
2. Adicione:
   - **Key:** `RESEND_API_KEY`
   - **Value:** `re_XXXXXXXXXXXXXXXXXXXXXXXXX`
   - **Environments:** Production, Preview, Development
3. Clique em **Save**

---

### 5️⃣ Atualizar Email Sender no Código

Edite `lib/email.ts` linha 3:

```typescript
// Se configurou domínio próprio:
const EMAIL_FROM = 'Gyroball Pro <noreply@gyroball.com.br>'

// Se está usando domínio de teste:
const EMAIL_FROM = 'Gyroball Pro <onboarding@resend.dev>'
```

---

## 🧪 Como Testar

### 1. Teste Local (Development)

```bash
# Certifique-se que o .env.local está com a RESEND_API_KEY correta
npm run dev
```

1. Faça um pedido de teste no site
2. Confira os logs no terminal
3. Verifique os emails em **Resend Dashboard** > **Emails**

### 2. Teste de Webhook do Mercado Pago

1. Acesse: **Mercado Pago Dashboard** > **Webhooks**
2. Clique em **Simular notificações**
3. URL: `https://gyroball.com.br/api/webhooks/mercadopago`
4. Tipo: **Pagamentos**
5. Data ID: `123456` (qualquer número)
6. Clique em **Enviar teste**

7. Verifique:
   - ✅ Logs do Vercel (Functions logs)
   - ✅ Emails no Resend Dashboard
   - ✅ Emails recebidos em `guilhermefcas07@gmail.com` e `raphaelctbc@gmail.com`

---

## 📧 Tipos de Email Enviados

### 1. **Novo Pedido** (para admins)

**Quando:** Cliente finaliza checkout e cria o pedido  
**Para:** `guilhermefcas07@gmail.com` e `raphaelctbc@gmail.com`  
**Assunto:** `🎉 Novo Pedido #XXXXXXXX - Gyroball Pro`

**Contém:**
- ✅ Dados do cliente (nome, email, CPF, telefone)
- ✅ Endereço de entrega completo
- ✅ Itens do pedido com quantidades
- ✅ Subtotal, frete e total
- ✅ Forma de pagamento (PIX ou Cartão)
- ✅ ID do pedido

### 2. **Atualização de Pagamento** (webhook - para admins)

**Quando:** Mercado Pago envia notificação de mudança de status  
**Para:** `guilhermefcas07@gmail.com` e `raphaelctbc@gmail.com`  
**Assunto:** 
- `✅ Pagamento APROVADO - Pedido #XXXXXXXX`
- `⏳ Pagamento PENDENTE - Pedido #XXXXXXXX`
- `❌ Pagamento RECUSADO - Pedido #XXXXXXXX`

**Contém:**
- ✅ Status do pagamento (com cores e emojis)
- ✅ Valor pago
- ✅ Forma de pagamento
- ✅ Dados do cliente
- ✅ ID do pedido
- ✅ ID do Mercado Pago
- ✅ Alerta de ação (se aprovado: "Processar e enviar pedido")

---

## 🎨 Templates de Email

Os emails são **totalmente responsivos** e funcionam em:
- ✅ Gmail (web e app)
- ✅ Outlook (web e app)
- ✅ Apple Mail (iOS e macOS)
- ✅ Outros clientes de email

**Design:**
- Gradientes azul/roxo (tema do site)
- Status com cores (verde=aprovado, amarelo=pendente, vermelho=recusado)
- Layout profissional com tabelas HTML
- Emojis para melhor visualização

---

## ⚙️ Configurações Avançadas

### Emails de Destinatários

Edite `lib/email.ts` linha 5 para alterar quem recebe:

```typescript
const ADMIN_EMAILS = [
  'guilhermefcas07@gmail.com', 
  'raphaelctbc@gmail.com',
  // Adicione mais emails se necessário
]
```

### Personalizar Remetente

Edite `lib/email.ts` linha 3:

```typescript
const EMAIL_FROM = 'Seu Nome <seu-email@seu-dominio.com>'
```

---

## 🔍 Monitoramento e Logs

### Ver Emails Enviados

1. Acesse: **https://resend.com/emails**
2. Veja todos os emails enviados
3. Clique em um email para ver:
   - Status de entrega
   - Aberturas
   - Cliques
   - HTML renderizado

### Logs do Webhook

No Vercel:
1. Acesse: **Vercel Dashboard** > Seu Projeto > **Functions**
2. Filtre por: `/api/webhooks/mercadopago`
3. Veja logs em tempo real

---

## 🚨 Troubleshooting

### ❌ "Invalid API key"

**Solução:**
1. Verifique se copiou a API key completa
2. Certifique-se que não tem espaços antes/depois
3. Gere uma nova API key se necessário

### ❌ "Domain not verified"

**Solução:**
1. Verifique os registros DNS no provedor do domínio
2. Aguarde propagação (até 48h, geralmente 30min)
3. Use `onboarding@resend.dev` temporariamente

### ❌ Emails não chegam

**Solução:**
1. Verifique **spam/lixo eletrônico**
2. Confira se o email está na lista de destinatários em `lib/email.ts`
3. Veja logs no Resend Dashboard
4. Verifique se a API key está configurada no Vercel

### ❌ Webhook não dispara

**Solução:**
1. Teste manualmente no Mercado Pago Dashboard
2. Verifique logs do Vercel Functions
3. Confirme que a URL está correta: `https://gyroball.com.br/api/webhooks/mercadopago`

---

## 💰 Planos e Limites

### Plano Gratuito (Free)

- ✅ **3.000 emails/mês**
- ✅ API Keys ilimitadas
- ✅ Domínios ilimitados
- ✅ Logs de 30 dias
- ✅ Suporte por email

**É SUFICIENTE para começar!** 3.000 emails = ~1.500 pedidos/mês

### Quando Fazer Upgrade?

Se você ultrapassar 1.500 pedidos/mês, considere o plano pago:
- **Pro:** $20/mês - 50.000 emails
- **Business:** Customizado

---

## ✅ Checklist de Configuração

- [ ] Conta criada no Resend
- [ ] Domínio `gyroball.com.br` adicionado e verificado
- [ ] API Key gerada
- [ ] `RESEND_API_KEY` adicionada no `.env.local`
- [ ] `RESEND_API_KEY` adicionada no Vercel
- [ ] `EMAIL_FROM` atualizado em `lib/email.ts`
- [ ] Emails de destinatários confirmados em `lib/email.ts`
- [ ] Deploy realizado no Vercel
- [ ] Teste de pedido realizado
- [ ] Teste de webhook realizado
- [ ] Emails recebidos com sucesso

---

## 📚 Links Úteis

- **Resend Dashboard:** https://resend.com
- **Documentação:** https://resend.com/docs
- **Verificar DNS:** https://dnschecker.org
- **Status do Resend:** https://status.resend.com

---

## 🎯 Próximos Passos Após Configuração

1. ✅ Configurar API Key do Resend
2. ✅ Fazer deploy no Vercel
3. ✅ Testar criação de pedido
4. ✅ Testar webhook do Mercado Pago
5. ✅ Verificar recebimento dos emails
6. 🚀 Começar a vender!

---

**Dúvidas?** Verifique os logs do Vercel e do Resend Dashboard para diagnosticar problemas.
