'use client'

import { motion } from 'framer-motion'
import { ArrowLeft, Mail, Phone, MapPin, Send } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import Card from '@/components/ui/Card'

export default function ContactPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    // Simulate sending
    await new Promise(resolve => setTimeout(resolve, 2000))
    setLoading(false)
    alert('Mensagem enviada com sucesso!')
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute w-[500px] h-[500px] bg-green-500/20 rounded-full blur-3xl -top-48 left-1/4 animate-pulse" />
        <div className="absolute w-[600px] h-[600px] bg-blue-500/20 rounded-full blur-3xl top-1/3 -right-48 animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute w-[400px] h-[400px] bg-purple-500/20 rounded-full blur-3xl -bottom-48 -left-24 animate-pulse" style={{ animationDelay: '2s' }} />
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
      <div className="relative z-10 container mx-auto px-4 py-20 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 mb-4">
              Entre em Contato
            </h1>
            <p className="text-xl text-gray-400">
              Estamos aqui para ajudar. Envie sua mensagem!
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/10">
                <h2 className="text-2xl font-bold mb-6 text-white">Envie uma Mensagem</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <Input
                    label="Nome"
                    required
                    className="bg-white/10 border-white/20 text-white placeholder:text-gray-500"
                  />
                  <Input
                    label="Email"
                    type="email"
                    required
                    className="bg-white/10 border-white/20 text-white placeholder:text-gray-500"
                  />
                  <Input
                    label="Telefone"
                    required
                    className="bg-white/10 border-white/20 text-white placeholder:text-gray-500"
                  />
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Mensagem <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      required
                      rows={5}
                      className="w-full px-4 py-3 rounded-lg bg-white/10 border-2 border-white/20 text-white placeholder:text-gray-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 outline-none"
                      placeholder="Como podemos ajudar?"
                    />
                  </div>
                  <Button
                    type="submit"
                    size="lg"
                    className="w-full bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600"
                    isLoading={loading}
                  >
                    <Send className="w-5 h-5 mr-2" />
                    Enviar Mensagem
                  </Button>
                </form>
              </div>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="space-y-6"
            >
              <div className="bg-gradient-to-br from-green-500/10 to-blue-500/10 backdrop-blur-xl rounded-3xl p-8 border border-green-500/20">
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-green-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">Email</h3>
                    <a href="mailto:contato@gyroballpro.com" className="text-green-400 hover:text-green-300">
                      contato@gyroballpro.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4 mb-6">
                  <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-blue-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">Telefone</h3>
                    <a href="tel:+5511999999999" className="text-blue-400 hover:text-blue-300">
                      (11) 99999-9999
                    </a>
                    <p className="text-gray-400 text-sm mt-1">
                      Segunda a Sexta: 9h - 18h
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-purple-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">Endereço</h3>
                    <p className="text-gray-400">
                      São Paulo, SP<br />
                      Brasil
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/10">
                <h3 className="text-2xl font-bold text-white mb-4">Horário de Atendimento</h3>
                <div className="space-y-3 text-gray-300">
                  <div className="flex justify-between">
                    <span>Segunda - Sexta</span>
                    <span className="text-green-400 font-semibold">9h - 18h</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sábado</span>
                    <span className="text-green-400 font-semibold">9h - 13h</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Domingo</span>
                    <span className="text-red-400 font-semibold">Fechado</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
