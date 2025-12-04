# 🎯 Gyroball Pro - E-commerce Landing Page

Landing page moderna e profissional para venda de Gyroball com checkout integrado, cálculo de frete e gateway de pagamento.

## ✨ Funcionalidades

- 🎨 Design moderno com animações suaves (Framer Motion)
- 📱 Totalmente responsivo
- 🛒 Checkout completo com validação
- 📦 Cálculo de frete via API ViaCEP + Correios
- 💳 Integração com Mercado Pago (PIX + Cartão)
- 📧 Notificações por email
- 💾 Banco de dados Supabase
- ⚡ Performance otimizada com Next.js 14
- 🎭 Gatilhos de urgência e escassez
- ⭐ Depoimentos e prova social

## 🚀 Tecnologias

- **Frontend:** Next.js 14, TypeScript, Tailwind CSS
- **Animações:** Framer Motion
- **Formulários:** React Hook Form + Zod
- **Pagamento:** Mercado Pago SDK
- **Banco:** Supabase
- **Email:** Resend / SendGrid
- **Deploy:** Vercel

## 📋 Pré-requisitos

- Node.js 18+
- Conta Mercado Pago (para pagamentos)
- Conta Supabase (banco de dados)
- Conta Resend/SendGrid (emails)

## 🔧 Instalação

1. Clone o repositório ou use este projeto

2. Instale as dependências:
```bash
npm install
```

3. Configure as variáveis de ambiente:
Copie o arquivo `.env.local` e preencha com suas credenciais:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=seu_url_supabase
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua_chave_supabase

# Mercado Pago
NEXT_PUBLIC_MERCADOPAGO_PUBLIC_KEY=sua_chave_publica_mp
MERCADOPAGO_ACCESS_TOKEN=seu_access_token_mp

# Email
RESEND_API_KEY=sua_chave_resend
EMAIL_FROM=noreply@seudominio.com
EMAIL_TO=seu@email.com
```

4. Execute o projeto em desenvolvimento:
```bash
npm run dev
```

5. Acesse: http://localhost:3000

## 🗄️ Setup Supabase

1. Crie um projeto no [Supabase](https://supabase.com)

2. Execute o SQL abaixo para criar as tabelas:

```sql
-- Tabela de clientes
create table customers (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  email text not null,
  cpf text not null,
  phone text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Tabela de endereços
create table shipping_addresses (
  id uuid default gen_random_uuid() primary key,
  customer_id uuid references customers(id) not null,
  cep text not null,
  street text not null,
  number text not null,
  complement text,
  neighborhood text not null,
  city text not null,
  state text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Tabela de pedidos
create table orders (
  id uuid default gen_random_uuid() primary key,
  customer_id uuid references customers(id) not null,
  quantity integer not null,
  subtotal decimal(10,2) not null,
  shipping_cost decimal(10,2) not null,
  total decimal(10,2) not null,
  payment_method text not null,
  status text not null default 'pending',
  shipping_address_id uuid references shipping_addresses(id) not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);
```

## 💳 Setup Mercado Pago

1. Crie uma conta no [Mercado Pago Developers](https://www.mercadopago.com.br/developers)

2. Obtenha suas credenciais:
   - Public Key (para frontend)
   - Access Token (para backend)

3. Configure o webhook para receber notificações de pagamento

## 📧 Setup Email (Resend)

1. Crie uma conta no [Resend](https://resend.com)

2. Verifique seu domínio

3. Obtenha a API Key

## 🎨 Customização

### Cores do Produto
Edite `tailwind.config.ts` para ajustar a paleta de cores baseada no produto.

### Textos e Imagens
- Imagens: `public/images/`
- Textos: `lib/constants.ts`
- Depoimentos: `lib/constants.ts`

### Preços
Edite `.env.local`:
```env
NEXT_PUBLIC_PRODUCT_PRICE=59.90
NEXT_PUBLIC_PRODUCT_PRICE_2UNITS=99.90
```

## 📦 Build e Deploy

### Build local:
```bash
npm run build
npm start
```

### Deploy na Vercel:
1. Conecte seu repositório GitHub
2. Configure as variáveis de ambiente
3. Deploy automático!

## 🔐 Segurança

- Validação de CPF no frontend e backend
- Sanitização de inputs
- HTTPS obrigatório em produção
- Tokens de API protegidos

## 📝 Próximos Passos

- [ ] Integrar Mercado Pago completamente
- [ ] Conectar Supabase
- [ ] Configurar envio de emails
- [ ] Adicionar painel administrativo
- [ ] Automatizar pedidos no Mercado Livre
- [ ] Implementar analytics
- [ ] Adicionar chat de suporte

## 🤝 Suporte

Para dúvidas ou suporte, entre em contato.

---

**Desenvolvido com ❤️ usando Next.js e Tailwind CSS**
