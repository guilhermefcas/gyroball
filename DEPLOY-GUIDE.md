# 🚀 Gyroball Pro - Guia de Deploy

## ✅ Status Atual

### Configurado:
- ✅ Supabase (banco de dados)
- ✅ Mercado Pago PRODUÇÃO (pagamentos reais)
- ✅ Landing page completa
- ✅ Checkout funcional
- ✅ 3 vídeos + galeria de imagens
- ✅ Countdown 24h
- ✅ CTAs em todas as seções

### Pendente:
- ⚠️ Executar SQL no Supabase (criar tabelas)
- ⚠️ Configurar webhook em produção
- ⚠️ Deploy em produção (Vercel/Netlify)

---

## 📋 Checklist Antes de Vender

### 1. Criar Tabelas no Supabase
```bash
1. Acesse: https://supabase.com/dashboard
2. Vá em SQL Editor
3. Copie o conteúdo de: supabase-schema.sql
4. Execute (Run)
5. Verifique em Table Editor se apareceu: customers, shipping_addresses, orders
```

### 2. Testar Localmente
```bash
npm run dev
```

- Acesse: http://localhost:3000
- Faça uma compra de teste
- Veja se redireciona para Mercado Pago
- Pague com PIX ou Cartão de teste
- Verifique se salvou no Supabase (Table Editor > orders)

### 3. Deploy em Produção

**Opção A: Vercel (Recomendado)**
```bash
1. Crie conta em: https://vercel.com
2. Conecte seu repositório GitHub
3. Configure as variáveis de ambiente (.env.local)
4. Deploy automático
```

**Opção B: Netlify**
```bash
1. Crie conta em: https://netlify.com
2. Conecte repositório
3. Configure env vars
4. Deploy
```

### 4. Configurar Webhook do Mercado Pago

Após deploy, configure:

```
1. Acesse: https://mercadopago.com.br/developers
2. Vá em Webhooks
3. Adicione URL: https://seudominio.com/api/webhooks/mercadopago
4. Selecione evento: payment
5. Salve
```

---

## 🧪 Cartões de Teste (Sandbox)

Se precisar testar antes de produção:

**Aprovado:**
```
Número: 5031 4332 1540 6351
Nome: APRO
CVV: 123
Validade: 11/25
```

**Recusado:**
```
Número: 5031 4332 1540 6351
Nome: OTHE
CVV: 123
Validade: 11/25
```

---

## 💰 Taxas Mercado Pago

- PIX: ~0,99%
- Cartão de Crédito: ~4,99% + R$ 0,49
- Parcelamento: você escolhe absorver ou repassar

---

## 📊 Ver Pedidos

**No Supabase:**
- Dashboard > Table Editor > orders
- Veja status de pagamento e pedidos em tempo real

**API:**
```
GET https://seudominio.com/api/orders
```

---

## 🔒 Segurança

✅ Nunca commitar .env.local no Git
✅ Adicionar no .gitignore (já está)
✅ Configurar variáveis de ambiente no Vercel/Netlify
✅ SSL automático (Vercel/Netlify fornecem)

---

## 🆘 Troubleshooting

**Erro ao criar pedido:**
- Verifique se as tabelas foram criadas no Supabase
- Veja os logs no terminal (npm run dev)

**Pagamento não redireciona:**
- Verifique as credenciais do Mercado Pago no .env.local
- Confira se está usando credenciais de PRODUÇÃO

**Webhook não funciona:**
- Configure a URL correta no Mercado Pago
- URL deve ser HTTPS (não HTTP)

---

## 🎯 Próximos Passos Opcionais

1. **Email de confirmação** (Resend)
2. **Admin panel** (gerenciar pedidos)
3. **Google Analytics** (rastrear vendas)
4. **Pixel do Facebook** (remarketing)
5. **WhatsApp API** (notificações)

---

## 📞 Comandos Úteis

```bash
# Rodar em desenvolvimento
npm run dev

# Build para produção
npm run build

# Rodar produção localmente
npm start

# Instalar dependências
npm install
```

---

**🎉 Tudo pronto para começar a vender!**

Só falta executar o SQL no Supabase e fazer o deploy!
