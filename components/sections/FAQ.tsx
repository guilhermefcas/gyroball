'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { FAQ } from '@/lib/constants'

export default function FAQSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <section ref={ref} className="py-20 bg-black relative overflow-hidden">
      {/* Ambient light effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-1/3 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl" />
      </div>
      
      <div className="container mx-auto px-4 max-w-4xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            Perguntas <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Frequentes</span>
          </h2>
          <p className="text-xl text-gray-400">
            Tire suas dúvidas sobre o Gyroball Pro
          </p>
        </motion.div>

        <div className="space-y-4">
          {FAQ.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-4 md:p-6 hover:bg-white/10 transition-all duration-300 text-left"
              >
                <div className="flex items-center justify-between gap-4">
                  <h3 className="text-lg font-bold text-white flex-1">
                    {item.question}
                  </h3>
                  <motion.div
                    animate={{ rotate: openIndex === index ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ChevronDown className="w-6 h-6 text-blue-400 flex-shrink-0" />
                  </motion.div>
                </div>
                <motion.div
                  initial={false}
                  animate={{
                    height: openIndex === index ? 'auto' : 0,
                    opacity: openIndex === index ? 1 : 0,
                  }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <p className="text-gray-400 mt-4 leading-relaxed">
                    {item.answer}
                  </p>
                </motion.div>
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
