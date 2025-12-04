'use client'

import { motion } from 'framer-motion'
import { ArrowLeft, Shield } from 'lucide-react'
import { useRouter } from 'next/navigation'
import Button from '@/components/ui/Button'

export default function PrivacyPage() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute w-[500px] h-[500px] bg-blue-500/20 rounded-full blur-3xl -top-48 -left-48 animate-pulse" />
        <div className="absolute w-[600px] h-[600px] bg-purple-500/20 rounded-full blur-3xl top-1/2 -right-48 animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute w-[400px] h-[400px] bg-pink-500/20 rounded-full blur-3xl -bottom-48 left-1/3 animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      {/* Header */}
      <header className="relative z-10 border-b border-white/10 backdrop-blur-xl bg-black/50">
        <div className="container mx-auto px-4 py-6">
          <Button
            variant="ghost"
            onClick={() => router.push('/')}
            className="text-white hover:text-blue-400"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Voltar para Home
          </Button>
        </div>
      </header>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-20 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-8"
        >
          <div className="flex items-center gap-4 mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center">
              <Shield className="w-8 h-8" />
            </div>
            <h1 className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
              Política de Privacidade
            </h1>
          </div>

          <div className="prose prose-invert prose-lg max-w-none">
            <motion.section
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white/5 backdrop-blur-xl rounded-2xl p-8 mb-6 border border-white/10"
            >
              <h2 className="text-2xl font-bold text-blue-400 mb-4">1. Informações que Coletamos</h2>
              <p className="text-gray-300 leading-relaxed">
                Coletamos informações pessoais que você nos fornece diretamente, incluindo:
              </p>
              <ul className="text-gray-300 space-y-2 mt-4">
                <li>• Nome completo</li>
                <li>• Endereço de e-mail</li>
                <li>• CPF</li>
                <li>• Telefone</li>
                <li>• Endereço de entrega</li>
                <li>• Informações de pagamento (processadas de forma segura)</li>
              </ul>
            </motion.section>

            <motion.section
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white/5 backdrop-blur-xl rounded-2xl p-8 mb-6 border border-white/10"
            >
              <h2 className="text-2xl font-bold text-purple-400 mb-4">2. Como Usamos suas Informações</h2>
              <p className="text-gray-300 leading-relaxed">
                Utilizamos suas informações para:
              </p>
              <ul className="text-gray-300 space-y-2 mt-4">
                <li>• Processar e entregar seu pedido</li>
                <li>• Enviar confirmações e atualizações sobre seu pedido</li>
                <li>• Fornecer suporte ao cliente</li>
                <li>• Melhorar nossos produtos e serviços</li>
                <li>• Enviar comunicações marketing (com seu consentimento)</li>
              </ul>
            </motion.section>

            <motion.section
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white/5 backdrop-blur-xl rounded-2xl p-8 mb-6 border border-white/10"
            >
              <h2 className="text-2xl font-bold text-pink-400 mb-4">3. Proteção de Dados</h2>
              <p className="text-gray-300 leading-relaxed">
                Implementamos medidas de segurança técnicas e organizacionais para proteger suas informações pessoais contra acesso não autorizado, perda ou destruição. Utilizamos criptografia SSL/TLS para todas as transações e armazenamos dados em servidores seguros.
              </p>
            </motion.section>

            <motion.section
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-white/5 backdrop-blur-xl rounded-2xl p-8 mb-6 border border-white/10"
            >
              <h2 className="text-2xl font-bold text-blue-400 mb-4">4. Compartilhamento de Informações</h2>
              <p className="text-gray-300 leading-relaxed">
                Não vendemos suas informações pessoais. Compartilhamos dados apenas com:
              </p>
              <ul className="text-gray-300 space-y-2 mt-4">
                <li>• Processadores de pagamento (Mercado Pago)</li>
                <li>• Serviços de entrega (Correios)</li>
                <li>• Provedores de serviços essenciais</li>
              </ul>
            </motion.section>

            <motion.section
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
              className="bg-white/5 backdrop-blur-xl rounded-2xl p-8 mb-6 border border-white/10"
            >
              <h2 className="text-2xl font-bold text-purple-400 mb-4">5. Seus Direitos</h2>
              <p className="text-gray-300 leading-relaxed">
                De acordo com a LGPD, você tem direito a:
              </p>
              <ul className="text-gray-300 space-y-2 mt-4">
                <li>• Acessar seus dados pessoais</li>
                <li>• Corrigir dados incompletos ou desatualizados</li>
                <li>• Solicitar a exclusão de seus dados</li>
                <li>• Revogar seu consentimento</li>
              </ul>
            </motion.section>

            <motion.section
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7 }}
              className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 backdrop-blur-xl rounded-2xl p-8 border border-blue-500/20"
            >
              <h2 className="text-2xl font-bold text-white mb-4">6. Contato</h2>
              <p className="text-gray-300 leading-relaxed">
                Para exercer seus direitos ou tirar dúvidas sobre privacidade, entre em contato:
              </p>
              <p className="text-blue-400 mt-4">
                Email: privacidade@gyroballpro.com
              </p>
            </motion.section>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="text-center text-gray-500 text-sm mt-12"
          >
            <p>Última atualização: 4 de dezembro de 2025</p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}
