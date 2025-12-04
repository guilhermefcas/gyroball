# 💳 Configuração do Mercado Pago - Gyroball Pro

## ✅ Já Configurado

1. **SDK Instalado**: mercadopago
2. **Cliente configurado**: `lib/mercadopago.ts`
3. **API Route**: `/api/orders` integrada
4. **Webhook**: `/api/webhooks/mercadopago` criado
5. **Páginas de retorno**: Success, Failure, Pending

---

## 🔑 Como Obter suas Credenciais

### 1. Criar Conta no Mercado Pago

1. Acesse: https://www.mercadopago.com.br/developers
2. Faça login ou crie uma conta
3. Vá em **"Suas integrações"** → **"Criar aplicação"**

### 2. Obter Credenciais de Teste

1. Na sua aplicação, vá em **"Credenciais de teste"**
2. Copie:
   - **Public Key** (começa com `TEST-...`)
   - **Access Token** (começa com `TEST-...`)

### 3. Adicionar no .env.local

Abra o arquivo `.env.local` e substitua:

```bash
# Mercado Pago - TESTE
NEXT_PUBLIC_MERCADOPAGO_PUBLIC_KEY=TEST-sua-public-key-aqui
MERCADOPAGO_ACCESS_TOKEN=TEST-seu-access-token-aqui
```

---

## 🧪 Testar Pagamentos

### Cartões de Teste (Para Sandbox)

**Cartão Aprovado:**
```
Número: 5031 4332 1540 6351
CVV: 123
Validade: 11/25
Nome: APRO
```

**Cartão Recusado:**
```
Número: 5031 4332 1540 6351
CVV: 123
Validade: 11/25
Nome: OTHE
```

**PIX de Teste:**
- O QR Code será gerado automaticamente
- Em teste, não precisa pagar de verdade

---

## 🚀 Colocar em Produção

### 1. Obter Credenciais de Produção

1. No dashboard, vá em **"Credenciais de produção"**
2. Complete os dados da sua empresa
3. Aguarde aprovação (pode levar algumas horas)
4. Copie as credenciais de **PRODUÇÃO**

### 2. Atualizar .env.local

```bash
# Mercado Pago - PRODUÇÃO
NEXT_PUBLIC_MERCADOPAGO_PUBLIC_KEY=APP_USR-sua-public-key-producao
MERCADOPAGO_ACCESS_TOKEN=APP_USR-seu-access-token-producao
```

### 3. Configurar Webhook

1. No dashboard do Mercado Pago
2. Vá em **"Webhooks"**
3. Adicione a URL:
```
https://seudominio.com/api/webhooks/mercadopago
```
4. Selecione eventos: **payment**

---

## 💰 Como Funciona o Fluxo de Pagamento

### PIX:
1. Cliente escolhe PIX no checkout
2. API cria preferência no Mercado Pago
3. Cliente é redirecionado para página do MP
4. Mostra QR Code do PIX
5. Cliente paga pelo app do banco
6. Webhook notifica aprovação
7. Pedido atualizado automaticamente

### Cartão de Crédito:
1. Cliente escolhe Cartão
2. API cria preferência no Mercado Pago
3. Cliente é redirecionado para página do MP
4. Preenche dados do cartão
5. Pagamento processado em tempo real
6. Retorna para página de sucesso/falha
7. Webhook confirma status

---

## 📊 Taxas do Mercado Pago

- **PIX**: ~0,99% por transação
- **Cartão de Crédito**: ~4,99% + R$ 0,49
- **Parcelamento**: Taxas adicionais (configurável)

---

## 🔒 Segurança

✅ Dados de cartão **nunca** passam pelo seu servidor
✅ Certificado PCI Compliance automático
✅ Webhooks assinados digitalmente
✅ Tokens de pagamento criptografados

---

## 🎯 URLs Importantes

- **Dashboard**: https://www.mercadopago.com.br/developers
- **Documentação**: https://www.mercadopago.com.br/developers/pt/docs
- **Suporte**: https://www.mercadopago.com.br/developers/panel/support

---

## ✅ Checklist Final

- [ ] Criar conta no Mercado Pago Developers
- [ ] Obter credenciais de teste
- [ ] Adicionar no `.env.local`
- [ ] Testar checkout com cartão de teste
- [ ] Testar checkout com PIX
- [ ] Criar tabelas no Supabase (já tem o SQL)
- [ ] Configurar webhook em produção
- [ ] Obter credenciais de produção
- [ ] Atualizar `.env.local` com produção
- [ ] Fazer compra de teste real

---

**🎉 Pronto! Seu e-commerce está configurado para receber pagamentos!**

Qualquer erro nos logs, me avise que ajudo a resolver.
