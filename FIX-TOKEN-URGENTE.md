# 🔧 CORREÇÃO URGENTE - Access Token Incorreto

## ❌ Problema Identificado

O Access Token na Vercel está **DIFERENTE** das suas credenciais de produção!

### Token na Vercel (ERRADO):
```
APP_USR-1330917025191085-120413-f9d36ed42871e2b03be51629fbf87668-1054434298
```

### Token Correto (das suas credenciais):
```
APP_USR-404271653885379-120412-d5393589180d07eed9730f155ef9073e-288855977
```

---

## ✅ SOLUÇÃO IMEDIATA

### 1. Acesse a Vercel
https://vercel.com/seu-usuario/gyroball

### 2. Vá em Settings → Environment Variables

### 3. ATUALIZE a variável `MERCADOPAGO_ACCESS_TOKEN`:

**Clique em Editar e cole o valor correto:**
```
APP_USR-404271653885379-120412-d5393589180d07eed9730f155ef9073e-288855977
```

### 4. Marque todos os ambientes:
- ☑️ Production
- ☑️ Preview  
- ☑️ Development

### 5. Save

### 6. Redeploy

Depois de salvar, faça redeploy:
- Na Vercel: Deployments → ... → Redeploy

**OU** rode este comando:
```bash
git commit --allow-empty -m "chore: fix access token" && git push
```

---

## 🎯 Verificação

Após o redeploy, teste novamente o checkout.

O erro **"invalid access token"** deve desaparecer!

---

**IMPORTANTE:** O SDK do Mercado Pago já envia o token no header corretamente (`Authorization: Bearer`). O problema era apenas o token errado nas variáveis de ambiente.
