'use client'

import { motion } from 'framer-motion'
import { ArrowLeft, FileText } from 'lucide-react'
import { useRouter } from 'next/navigation'
import Button from '@/components/ui/Button'

export default function TermsPage() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute w-[500px] h-[500px] bg-orange-500/20 rounded-full blur-3xl -top-48 -right-48 animate-pulse" />
        <div className="absolute w-[600px] h-[600px] bg-blue-500/20 rounded-full blur-3xl top-1/2 -left-48 animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute w-[400px] h-[400px] bg-purple-500/20 rounded-full blur-3xl -bottom-48 right-1/3 animate-pulse" style={{ animationDelay: '2s' }} />
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
            <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-pink-500 rounded-2xl flex items-center justify-center">
              <FileText className="w-8 h-8" />
            </div>
            <h1 className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-orange-400 via-pink-400 to-purple-400">
              Termos de Uso
            </h1>
          </div>

          <div className="prose prose-invert prose-lg max-w-none">
            <motion.section
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white/5 backdrop-blur-xl rounded-2xl p-8 mb-6 border border-white/10"
            >
              <h2 className="text-2xl font-bold text-orange-400 mb-4">1. Aceitação dos Termos</h2>
              <p className="text-gray-300 leading-relaxed">
                Ao acessar e usar este site, você aceita e concorda em cumprir estes Termos de Uso. Se você não concordar com qualquer parte destes termos, não deve usar nosso site.
              </p>
            </motion.section>

            <motion.section
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white/5 backdrop-blur-xl rounded-2xl p-8 mb-6 border border-white/10"
            >
              <h2 className="text-2xl font-bold text-pink-400 mb-4">2. Uso do Site</h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                Você concorda em usar o site apenas para fins legais e de acordo com estes termos. É proibido:
              </p>
              <ul className="text-gray-300 space-y-2">
                <li>• Usar o site de qualquer forma que viole leis locais, nacionais ou internacionais</li>
                <li>• Transmitir material ilegal, prejudicial ou ofensivo</li>
                <li>• Tentar obter acesso não autorizado ao site ou sistemas relacionados</li>
                <li>• Interferir ou interromper o funcionamento do site</li>
              </ul>
            </motion.section>

            <motion.section
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white/5 backdrop-blur-xl rounded-2xl p-8 mb-6 border border-white/10"
            >
              <h2 className="text-2xl font-bold text-purple-400 mb-4">3. Compras e Pagamentos</h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                Ao realizar uma compra:
              </p>
              <ul className="text-gray-300 space-y-2">
                <li>• Você garante que as informações fornecidas são verdadeiras e completas</li>
                <li>• Os preços estão sujeitos a alteração sem aviso prévio</li>
                <li>• Reservamo-nos o direito de recusar ou cancelar pedidos</li>
                <li>• Todos os pagamentos são processados de forma segura através do Mercado Pago</li>
              </ul>
            </motion.section>

            <motion.section
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-white/5 backdrop-blur-xl rounded-2xl p-8 mb-6 border border-white/10"
            >
              <h2 className="text-2xl font-bold text-orange-400 mb-4">4. Entrega e Devolução</h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                <strong>Entrega:</strong> Os prazos de entrega são estimados e podem variar. Não nos responsabilizamos por atrasos causados pelos Correios.
              </p>
              <p className="text-gray-300 leading-relaxed">
                <strong>Devolução:</strong> Oferecemos garantia de 30 dias. Produtos devem ser devolvidos em condições originais.
              </p>
            </motion.section>

            <motion.section
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
              className="bg-white/5 backdrop-blur-xl rounded-2xl p-8 mb-6 border border-white/10"
            >
              <h2 className="text-2xl font-bold text-pink-400 mb-4">5. Garantia do Produto</h2>
              <p className="text-gray-300 leading-relaxed">
                O Gyroball Pro possui garantia de 30 dias contra defeitos de fabricação. A garantia não cobre danos causados por mau uso, acidentes ou desgaste normal.
              </p>
            </motion.section>

            <motion.section
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7 }}
              className="bg-white/5 backdrop-blur-xl rounded-2xl p-8 mb-6 border border-white/10"
            >
              <h2 className="text-2xl font-bold text-purple-400 mb-4">6. Propriedade Intelectual</h2>
              <p className="text-gray-300 leading-relaxed">
                Todo o conteúdo do site, incluindo textos, imagens, logos e design, é propriedade da Gyroball Pro e está protegido por leis de direitos autorais. É proibida a reprodução sem autorização.
              </p>
            </motion.section>

            <motion.section
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8 }}
              className="bg-white/5 backdrop-blur-xl rounded-2xl p-8 mb-6 border border-white/10"
            >
              <h2 className="text-2xl font-bold text-orange-400 mb-4">7. Limitação de Responsabilidade</h2>
              <p className="text-gray-300 leading-relaxed">
                Não nos responsabilizamos por danos indiretos, incidentais ou consequenciais decorrentes do uso do site ou produto. Nossa responsabilidade total não excederá o valor pago pelo produto.
              </p>
            </motion.section>

            <motion.section
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.9 }}
              className="bg-gradient-to-r from-orange-500/10 to-pink-500/10 backdrop-blur-xl rounded-2xl p-8 border border-orange-500/20"
            >
              <h2 className="text-2xl font-bold text-white mb-4">8. Alterações aos Termos</h2>
              <p className="text-gray-300 leading-relaxed">
                Reservamo-nos o direito de modificar estes termos a qualquer momento. As alterações entrarão em vigor imediatamente após a publicação no site.
              </p>
            </motion.section>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="text-center text-gray-500 text-sm mt-12"
          >
            <p>Última atualização: 4 de dezembro de 2025</p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}
