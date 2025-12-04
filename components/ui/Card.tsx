'use client'

import { HTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  hover?: boolean
  glass?: boolean
}

export default function Card({ className, hover, glass, children, ...props }: CardProps) {
  return (
    <div
      className={cn(
        'rounded-2xl p-6 transition-all duration-300',
        glass 
          ? 'bg-white/10 backdrop-blur-lg border border-white/20 shadow-xl' 
          : 'bg-white border border-gray-200 shadow-lg',
        hover && 'hover:shadow-2xl hover:-translate-y-1 cursor-pointer',
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}
