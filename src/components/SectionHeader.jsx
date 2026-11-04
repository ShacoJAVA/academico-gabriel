import React from 'react'

export const SectionHeader = ({ number, title, subtitle }) => {
  return (
    <div className="mb-8 border-b border-neutral-800/60 pb-5">
      <div className="flex items-center gap-3 mb-2">
        <span className="font-mono text-xs font-bold text-amber-500 bg-amber-500/10 px-2.5 py-1 rounded-md border border-amber-500/20">
          {number}
        </span>
        <h2 className="text-xl md:text-2xl font-bold text-neutral-100 tracking-tight">{title}</h2>
      </div>
      {subtitle && <p className="text-neutral-400 text-xs md:text-sm max-w-2xl mt-1">{subtitle}</p>}
    </div>
  )
}
