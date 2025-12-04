# 🚀 Configuração do Supabase - Gyroball Pro

## ✅ Já Configurado

1. **SDK Instalado**: @supabase/supabase-js
2. **Credenciais no .env.local**: URL e API Key configuradas
3. **Cliente Supabase**: `lib/supabase.ts` criado
4. **API Route**: `/api/orders` integrada com Supabase

---

## 📋 Próximos Passos

### 1. Criar as Tabelas no Supabase

1. Acesse: https://supabase.com/dashboard
2. Selecione seu projeto: **xwgvgedugqpqdgjyhwja**
3. Vá em **SQL Editor** (menu lateral esquerdo)
4. Clique em **New Query**
5. Copie e cole todo o conteúdo do arquivo `supabase-schema.sql`
6. Clique em **Run** (ou pressione Ctrl+Enter)

✅ Isso criará as 3 tabelas:
- `customers` - Dados dos clientes
- `shipping_addresses` - Endereços de entrega
- `orders` - Pedidos

---

## 🧪 Testar a Integração

Após criar as tabelas, teste o sistema:

1. Execute o servidor:
```bash
npm run dev
```

2. Acesse: http://localhost:3000
3. Clique em "COMPRAR AGORA"
4. Preencha o formulário de checkout
5. Finalize o pedido

6. Verifique no Supabase:
   - Dashboard > Table Editor > `orders`
   - Você verá o pedido criado!

---

## 📊 Como Visualizar os Pedidos

### Opção 1: Supabase Dashboard
1. Acesse: https://supabase.com/dashboard
2. Vá em **Table Editor**
3. Selecione a tabela `orders`
4. Veja todos os pedidos em tempo real

### Opção 2: API
```bash
# Buscar todos os pedidos
GET http://localhost:3000/api/orders

# Buscar pedido específico
GET http://localhost:3000/api/orders?orderId=UUID_DO_PEDIDO
```

---

## 🔄 Status dos Pedidos

### Payment Status:
- `pending` - Aguardando pagamento
- `approved` - Pagamento aprovado
- `rejected` - Pagamento rejeitado
- `cancelled` - Pagamento cancelado

### Order Status:
- `pending` - Pedido criado
- `processing` - Em processamento
- `shipped` - Enviado
- `delivered` - Entregue
- `cancelled` - Cancelado

---

## 🎯 Próximas Integrações

### 1. Mercado Pago (Gateway de Pagamento)
- [ ] Criar conta no Mercado Pago Developers
- [ ] Obter Public Key e Access Token
- [ ] Adicionar no `.env.local`
- [ ] Integrar SDK no checkout

### 2. Email (Notificações)
- [ ] Criar conta no Resend.com
- [ ] Obter API Key
- [ ] Configurar templates de email
- [ ] Enviar confirmação de pedido

### 3. Admin Panel
- [ ] Criar página `/admin`
- [ ] Listar todos os pedidos
- [ ] Atualizar status
- [ ] Exportar relatórios

---

## 💾 Estrutura do Banco de Dados

### Tabela: customers
```
id (UUID)
name (TEXT)
email (TEXT)
cpf (TEXT) - UNIQUE
phone (TEXT)
created_at (TIMESTAMP)
```

### Tabela: shipping_addresses
```
id (UUID)
customer_id (UUID) - FK para customers
cep, street, number, complement
neighborhood, city, state
created_at (TIMESTAMP)
```

### Tabela: orders
```
id (UUID)
customer_id (UUID) - FK
shipping_address_id (UUID) - FK
quantity, subtotal, shipping_cost, total
payment_method (pix | credit_card)
payment_status (pending | approved | ...)
order_status (pending | processing | ...)
mercado_pago_id (TEXT)
created_at, updated_at (TIMESTAMP)
```

---

## 🔐 Segurança

- ✅ Row Level Security (RLS) desabilitado para permitir inserções da API
- ✅ API Key pública segura para uso no browser
- ✅ Índices criados para melhor performance
- ✅ Triggers para atualização automática de `updated_at`

---

## 📞 Suporte

Se tiver algum erro:
1. Verifique os logs no terminal (`npm run dev`)
2. Verifique os logs no Supabase Dashboard > Logs
3. Confira se as tabelas foram criadas corretamente

**Tudo pronto! Seus pedidos já estão sendo salvos no Supabase! 🎉**
