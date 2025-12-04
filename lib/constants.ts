import { Product, Testimonial } from '@/types'

export const PRODUCT: Product = {
  id: 'gyroball-pro',
  name: 'Gyroball Pro - Fortalecedor Muscular',
  description: 'Fortaleça seus punhos, antebraços e mãos com tecnologia giroscópica avançada. Ideal para atletas, fisioterapia e quem busca mais força e coordenação.',
  price: 59.90,
  price2Units: 99.90,
  images: [
    '/images/gyroball-1.webp',
    '/images/gyroball-2.webp',
    '/images/gyroball-3.webp',
    '/images/gyroball-4.webp',
  ],
  features: [
    'Fortalece punhos e antebraços',
    'Melhora coordenação motora',
    'Auxilia na reabilitação',
    'Aumenta resistência muscular',
    'Portátil e silencioso',
    'Não precisa de bateria',
  ],
  stock: 50,
}

export const TESTIMONIALS: Testimonial[] = [
  {
    id: '1',
    name: 'Carlos Silva',
    rating: 5,
    comment: 'Produto incrível! Em 3 semanas já senti diferença na força do meu punho. Recomendo muito para quem trabalha com computador.',
    date: '2025-11-28',
    verified: true,
  },
  {
    id: '2',
    name: 'Marina Santos',
    rating: 5,
    comment: 'Comprei para fisioterapia após lesão no punho. Meu fisioterapeuta aprovou! Está me ajudando muito na recuperação.',
    date: '2025-11-25',
    verified: true,
  },
  {
    id: '3',
    name: 'Rafael Oliveira',
    rating: 4,
    comment: 'Ótimo custo-benefício. Uso depois do treino de musculação e realmente complementa bem. Chegou rápido.',
    date: '2025-11-20',
    verified: true,
  },
  {
    id: '4',
    name: 'Juliana Costa',
    rating: 5,
    comment: 'Meu marido amou! Ele joga tênis e sentiu muita melhora no jogo. Já comprei outro para presente.',
    date: '2025-11-15',
    verified: true,
  },
  {
    id: '5',
    name: 'Pedro Almeida',
    rating: 5,
    comment: 'Estava com tendinite e o Gyroball foi fundamental na minha recuperação. Produto de qualidade!',
    date: '2025-11-10',
    verified: true,
  },
  {
    id: '6',
    name: 'Ana Paula',
    rating: 5,
    comment: 'Excelente para quem trabalha digitando o dia todo. Minha mão não dói mais! Super recomendo.',
    date: '2025-11-05',
    verified: true,
  },
]

export const BENEFITS = [
  {
    icon: '💪',
    title: 'Fortalecimento Muscular',
    description: 'Desenvolve força nos punhos, antebraços e mãos de forma progressiva',
  },
  {
    icon: '🎯',
    title: 'Coordenação Motora',
    description: 'Melhora significativamente a coordenação e controle dos movimentos',
  },
  {
    icon: '⚡',
    title: 'Reabilitação',
    description: 'Ideal para recuperação de lesões e prevenção de LER/DORT',
  },
  {
    icon: '🏃',
    title: 'Para Atletas',
    description: 'Perfeito para tênis, golfe, escalada, musculação e outros esportes',
  },
  {
    icon: '🔄',
    title: 'Portátil',
    description: 'Use em qualquer lugar: casa, trabalho, academia ou viagens',
  },
  {
    icon: '🔇',
    title: 'Silencioso',
    description: 'Funciona sem baterias e não faz barulho',
  },
]

export const FAQ = [
  {
    question: 'Como funciona o Gyroball?',
    answer: 'O Gyroball utiliza um giroscópio interno que gera resistência através do movimento circular. Quanto mais rápido você gira, maior a resistência, proporcionando um treino eficaz para punhos e antebraços.',
  },
  {
    question: 'Precisa de bateria ou carregamento?',
    answer: 'Não! O Gyroball funciona 100% de forma mecânica. Não precisa de pilhas, baterias ou carregamento. É totalmente sustentável e prático.',
  },
  {
    question: 'Quanto tempo devo usar por dia?',
    answer: 'Recomendamos começar com 5-10 minutos por dia e aumentar gradualmente. Use de 2 a 3 vezes por dia para melhores resultados.',
  },
  {
    question: 'Serve para reabilitação?',
    answer: 'Sim! Muitos fisioterapeutas recomendam o Gyroball para reabilitação de lesões no punho, prevenção de LER/DORT e fortalecimento após cirurgias. Sempre consulte seu médico antes.',
  },
  {
    question: 'Qual o prazo de entrega?',
    answer: 'O prazo varia de acordo com sua região. Calculamos o frete antes de finalizar a compra, geralmente entre 5 a 15 dias úteis.',
  },
  {
    question: 'Vocês oferecem garantia?',
    answer: 'Sim! Oferecemos 30 dias de garantia contra defeitos de fabricação. Se não ficar satisfeito, devolvemos seu dinheiro.',
  },
]
