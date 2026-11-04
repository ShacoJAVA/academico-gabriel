import React from 'react'
import { motion } from 'framer-motion'

export const SectionHeader = ({ number, title, subtitle }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="mb-8 border-b border-neutral-800/80 pb-5"
    >
      <div className="flex items-center gap-3 mb-2">
        <span className="font-mono text-xs font-bold text-amber-500 bg-amber-500/10 px-2.5 py-1 rounded-md border border-amber-500/20 backdrop-blur-sm">
          {number}
        </span>
        <h2 className="text-xl md:text-2xl font-bold text-neutral-100 tracking-tight">{title}</h2>
      </div>
      {subtitle && <p className="text-neutral-400 text-xs md:text-sm max-w-2xl mt-1 leading-relaxed">{subtitle}</p>}
    </motion.div>
  )
}
