import React, { useState, useMemo, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import data from './data/trabalhos.json'
import { cn } from './lib/utils'
import { SectionHeader } from './components/SectionHeader'
import {
  FolderOpen,
  Search,
  Video,
  FileText,
  ExternalLink,
  ArrowUpRight,
  Maximize2,
  X,
  Eye,
  SlidersHorizontal,
  Bookmark,
  GraduationCap,
  Sparkles,
  Layers,
  CheckCircle2,
  XCircle,
  FileCode,
  ShieldCheck,
  ChevronRight
} from 'lucide-react'

export default function App() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedDiscipline, setSelectedDiscipline] = useState('TODAS')
  const [selectedType, setSelectedType] = useState('TODOS')
  const [activeModalItem, setActiveModalItem] = useState(null)

  // Fechar modal com tecla ESC
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setActiveModalItem(null)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  // Lista única de disciplinas
  const disciplines = useMemo(() => {
    const list = Array.from(new Set(data.trabalhos.map((t) => t.disciplina)))
    return ['TODAS', ...list]
  }, [])

  // Lista única de tipos
  const types = useMemo(() => {
    const list = Array.from(new Set(data.trabalhos.map((t) => t.tipo)))
    return ['TODOS', ...list]
  }, [])

  // Filtragem dos trabalhos
  const filteredWorks = useMemo(() => {
    return data.trabalhos.filter((item) => {
      const matchesSearch =
        item.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.disciplina.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.descricao.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.codigo.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))

      const matchesDiscipline =
        selectedDiscipline === 'TODAS' || item.disciplina === selectedDiscipline

      const matchesType =
        selectedType === 'TODOS' || item.tipo === selectedType

      return matchesSearch && matchesDiscipline && matchesType
    })
  }, [searchTerm, selectedDiscipline, selectedType])

  return (
    <div className="min-h-screen galaem-grid-pattern bg-neutral-950 text-neutral-100 flex flex-col font-sans selection:bg-amber-500 selection:text-neutral-950 antialiased">
      {/* Barra Superior Industrial e Telemetria */}
      <div className="border-b border-neutral-800/80 bg-neutral-900/60 backdrop-blur-md text-[11px] font-mono tracking-wider uppercase px-4 sm:px-8 py-2.5 flex flex-wrap items-center justify-between gap-3 sticky top-0 z-30">
        <div className="flex items-center space-x-3">
          <span className="inline-block w-2 h-2 rounded-full bg-amber-500 animate-pulse shadow-[0_0_8px_rgba(245,158,11,0.8)]" />
          <span className="font-bold text-neutral-200">GALAEM FLOW // PORTAL ACADÊMICO</span>
          <span className="text-neutral-600 hidden sm:inline">|</span>
          <span className="text-neutral-400 hidden sm:inline">
            UFES CEFD (LICENCIATURA EM EDUCAÇÃO FÍSICA)
          </span>
        </div>

        <div className="flex items-center space-x-4">
          <span className="text-amber-400/90 bg-amber-500/10 border border-amber-500/20 px-2.5 py-0.5 rounded text-[10px] font-semibold">
            STATUS: ATIVO • 2026
          </span>
          <a
            href={data.estudante.driveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-neutral-300 hover:text-amber-400 transition-colors flex items-center gap-1.5 text-[10px]"
          >
            <FolderOpen className="w-3.5 h-3.5 text-amber-500" />
            <span className="hidden md:inline">GOOGLE DRIVE</span>
            <ArrowUpRight className="w-3 h-3" />
          </a>
        </div>
      </div>

      {/* Bloco 00: Hero Section (Apresentação & Promessa de Valor) */}
      <section className="relative border-b border-neutral-800/80 overflow-hidden py-14 sm:py-20">
        {/* Efeito de Iluminação de Fundo Âmbar */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-amber-500/10 blur-[130px] pointer-events-none rounded-full" />

        <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Bloco Tipográfico Principal */}
            <div className="lg:col-span-7 space-y-6">
              {/* Badge da Marca */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-neutral-800 bg-neutral-900/90 text-neutral-300 text-xs font-mono">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                <span>UFES // CEFD • ACERVO DE INVESTIGAÇÃO PEDAGÓGICA</span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-neutral-100 leading-[1.1]">
                Arquivo &amp; Produção <br />
                <span className="bg-gradient-to-r from-amber-400 via-amber-500 to-rose-500 bg-clip-text text-transparent">
                  Acadêmica Oficial
                </span>
              </h1>

              <p className="text-neutral-400 text-sm sm:text-base leading-relaxed max-w-xl">
                {data.estudante.bio}
              </p>

              {/* Botões de Ação Padronizados GALAEM */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <a
                  href="#acervo"
                  className="px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-xs uppercase tracking-wider transition-all duration-200 flex items-center gap-2 galaem-glow-amber cursor-pointer"
                >
                  <span>Explorar Acervo de Trabalhos</span>
                  <ChevronRight className="w-4 h-4" />
                </a>

                <a
                  href={data.estudante.driveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-3 rounded-xl bg-neutral-900/80 hover:bg-neutral-800 border border-neutral-800 hover:border-amber-500/40 text-neutral-300 hover:text-white font-mono text-xs uppercase tracking-wider transition-all duration-200 flex items-center gap-2 cursor-pointer"
                >
                  <FolderOpen className="w-4 h-4 text-amber-500" />
                  <span>Repositório Google Drive</span>
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-60" />
                </a>
              </div>
            </div>

            {/* Ficha do Pesquisador (Card Glassmorphism GALAEM) */}
            <div className="lg:col-span-5">
              <div className="galaem-card p-6 space-y-5">
                <div className="flex items-center justify-between border-b border-neutral-800/80 pb-3 font-mono text-xs">
                  <div className="flex items-center gap-2">
                    <GraduationCap className="w-4 h-4 text-amber-500" />
                    <span className="font-bold text-neutral-200">FICHA CATALOGRÁFICA</span>
                  </div>
                  <span className="text-rose-400 bg-rose-500/10 border border-rose-500/20 px-2 py-0.5 rounded text-[10px] font-semibold">
                    AUTOR VALIDADO
                  </span>
                </div>

                <div className="space-y-3 font-mono text-xs">
                  <div>
                    <span className="text-neutral-500 text-[10px] block uppercase">Pesquisador / Estudante</span>
                    <span className="text-base font-bold text-neutral-100">{data.estudante.nome}</span>
                  </div>

                  <div>
                    <span className="text-neutral-500 text-[10px] block uppercase">Instituição de Ensino</span>
                    <span className="text-neutral-300">{data.estudante.instituicao}</span>
                  </div>

                  <div>
                    <span className="text-neutral-500 text-[10px] block uppercase">Curso de Graduação</span>
                    <span className="text-amber-400 font-medium">{data.estudante.curso}</span>
                  </div>

                  <div className="pt-3 border-t border-neutral-800/80 flex items-center justify-between text-[11px]">
                    <span className="text-neutral-500">Publicação em Nuvem</span>
                    <span className="text-neutral-300 font-semibold flex items-center gap-1.5">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                      Cloudflare Workers
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bloco 01: Telemetria & Recursos (Grid Numerado) */}
      <section className="border-b border-neutral-800/80 py-10 bg-neutral-950/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Card 01 */}
            <div className="galaem-card p-5 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-bold text-amber-500">01 / AUTOR</span>
                <GraduationCap className="w-4 h-4 text-neutral-500" />
              </div>
              <h4 className="font-bold text-neutral-200 text-sm">Gabriel Freitas</h4>
              <p className="text-xs text-neutral-400">Licenciatura em Educação Física na UFES.</p>
            </div>

            {/* Card 02 */}
            <div className="galaem-card p-5 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-bold text-amber-500">02 / DISCIPLINA</span>
                <Layers className="w-4 h-4 text-neutral-500" />
              </div>
              <h4 className="font-bold text-neutral-200 text-sm">Epistemologia da EF</h4>
              <p className="text-xs text-neutral-400">Matrizes conceituais, ciência e corporeidade.</p>
            </div>

            {/* Card 03 */}
            <div className="galaem-card p-5 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-bold text-amber-500">03 / MULTIMÍDIA</span>
                <Video className="w-4 h-4 text-neutral-500" />
              </div>
              <h4 className="font-bold text-neutral-200 text-sm">Slides &amp; Vídeos</h4>
              <p className="text-xs text-neutral-400">Player embutido sem depender de login no Drive.</p>
            </div>

            {/* Card 04 */}
            <div className="galaem-card p-5 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-bold text-amber-500">04 / REPOSITÓRIO</span>
                <FileCode className="w-4 h-4 text-neutral-500" />
              </div>
              <h4 className="font-bold text-neutral-200 text-sm">Acesso Aberto</h4>
              <p className="text-xs text-neutral-400">Arquivos originais e apresentações em alta definição.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Bloco 02: Indexador e Filtros de Busca */}
      <section className="border-b border-neutral-800/80 bg-neutral-900/40 backdrop-blur-md sticky top-[45px] z-20 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between">
            {/* Input de Busca Dark Precision */}
            <div className="relative flex-1 max-w-xl">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-500" />
              <input
                type="text"
                placeholder="Buscar por termo, conceito, código ou tema..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-20 py-2.5 bg-neutral-900/90 border border-neutral-800 rounded-xl font-mono text-xs text-neutral-100 placeholder:text-neutral-500 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500/40 transition-all"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-mono text-amber-500 font-bold hover:underline cursor-pointer"
                >
                  [LIMPAR]
                </button>
              )}
            </div>

            {/* Filtros em Pílulas */}
            <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
              <span className="text-[11px] text-neutral-400 uppercase flex items-center gap-1.5 mr-1">
                <SlidersHorizontal className="w-3.5 h-3.5 text-amber-500" /> FILTROS:
              </span>

              {disciplines.map((disc, idx) => {
                const active = selectedDiscipline === disc
                return (
                  <button
                    key={disc}
                    onClick={() => setSelectedDiscipline(disc)}
                    className={cn(
                      "px-3.5 py-1.5 rounded-lg border text-xs font-mono uppercase tracking-tight transition-all duration-150 cursor-pointer flex items-center gap-1.5",
                      active
                        ? "bg-amber-500/15 border-amber-500/60 text-amber-400 shadow-[0_0_15px_rgba(245,158,11,0.2)]"
                        : "bg-neutral-900/80 border-neutral-800 text-neutral-400 hover:text-neutral-200 hover:border-neutral-700"
                    )}
                  >
                    <span className="text-[10px] opacity-60">0{idx + 1}.</span>
                    <span>{disc === 'TODAS' ? 'TODAS AS MATÉRIAS' : disc}</span>
                  </button>
                )
              })}

              {/* Seletor de Formato */}
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="py-1.5 px-3 rounded-lg border border-neutral-800 bg-neutral-900/90 font-mono text-xs uppercase text-neutral-300 focus:outline-none focus:border-amber-500 cursor-pointer"
              >
                <option value="TODOS">TODOS OS FORMATOS</option>
                {types
                  .filter((t) => t !== 'TODOS')
                  .map((t) => (
                    <option key={t} value={t}>
                      FORMATO: {t.toUpperCase()}
                    </option>
                  ))}
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Bloco 03: Acervo de Produções e Trabalhos */}
      <main id="acervo" className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-8 py-12 space-y-8">
        <SectionHeader
          number="03"
          title="Catálogo &amp; Acervo de Trabalhos"
          subtitle={`Mostrando ${filteredWorks.length} registro(s) catalogado(s) segundo as diretrizes de investigação pedagógica.`}
        />

        {/* Grade de Trabalhos no Padrão GALAEM Card */}
        {filteredWorks.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredWorks.map((item) => (
              <article
                key={item.id}
                className="galaem-card p-6 flex flex-col justify-between group space-y-5"
              >
                {/* Faixa Superior Técnica */}
                <div className="flex items-center justify-between border-b border-neutral-800/80 pb-3 font-mono text-[11px] uppercase tracking-wider">
                  <div className="flex items-center space-x-2">
                    <span className="w-2 h-2 rounded-full bg-amber-500 inline-block shadow-[0_0_6px_rgba(245,158,11,0.6)]" />
                    <span className="font-bold text-neutral-300">{item.codigo}</span>
                  </div>

                  <span className="px-2.5 py-0.5 rounded-md border border-amber-500/20 bg-amber-500/10 text-[10px] font-bold text-amber-400">
                    {item.formato}
                  </span>
                </div>

                {/* Conteúdo do Trabalho */}
                <div className="space-y-3">
                  <div className="font-mono text-xs text-rose-400 uppercase tracking-wider">
                    // {item.disciplina}
                  </div>

                  <h3 className="text-xl sm:text-2xl font-bold text-neutral-100 group-hover:text-amber-400 transition-colors tracking-tight">
                    {item.titulo}
                  </h3>

                  <p className="text-sm text-neutral-400 leading-relaxed">
                    {item.descricao}
                  </p>

                  {/* Tags em Estilo Pílula Translúcida */}
                  <div className="flex flex-wrap gap-1.5 pt-2 font-mono text-[10px]">
                    {item.tags.map((tag) => (
                      <span
                        key={tag}
                        className="border border-neutral-800/80 rounded px-2 py-0.5 bg-neutral-900/60 text-neutral-400 uppercase"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Botões de Ação Padronizados */}
                <div className="pt-4 border-t border-neutral-800/80 grid grid-cols-2 gap-3 font-mono text-xs">
                  <button
                    onClick={() => setActiveModalItem(item)}
                    className="py-2.5 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold transition-all duration-150 cursor-pointer flex items-center justify-center gap-2 uppercase tracking-wider galaem-glow-amber"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>Visualizar</span>
                  </button>

                  <a
                    href={item.previewUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-2.5 px-4 rounded-xl bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 hover:border-amber-500/40 text-neutral-200 transition-all duration-150 flex items-center justify-center gap-1.5 uppercase tracking-wider cursor-pointer"
                  >
                    <span>Tela Cheia</span>
                    <ArrowUpRight className="w-3.5 h-3.5 opacity-70" />
                  </a>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="galaem-card p-12 text-center space-y-3 font-mono">
            <div className="text-amber-400 text-sm uppercase tracking-widest">
              [ NENHUM REGISTRO ENCONTRADO ]
            </div>
            <p className="text-xs text-neutral-400">
              Não foram localizados trabalhos correspondentes aos critérios de busca ou filtros selecionados.
            </p>
          </div>
        )}

        {/* Bloco 04: Manifesto Acadêmico (Qualificação em 2 Colunas GALAEM) */}
        <section className="pt-8">
          <SectionHeader
            number="04"
            title="Diretrizes &amp; Manifesto de Investigação"
            subtitle="Critérios epistemológicos e éticos que regem as produções e ensaios deste repositório."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Coluna 1: O que é buscado */}
            <div className="galaem-card p-6 space-y-4 border-emerald-500/20 bg-emerald-950/10">
              <div className="flex items-center gap-2 text-emerald-400 font-mono text-xs uppercase font-bold">
                <CheckCircle2 className="w-4 h-4" />
                <span>→ Princípios da Práxis Pedagógica</span>
              </div>
              <ul className="space-y-3 text-xs text-neutral-300 font-sans">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">✓</span>
                  <span>Rigor epistemológico e fundamentação científica do movimento humano.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">✓</span>
                  <span>Articulação dialética entre matrizes conceituais e intervenção na educação escolar.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">✓</span>
                  <span>Comunicação multimídia aberta, clara e acessível a estudantes e docentes.</span>
                </li>
              </ul>
            </div>

            {/* Coluna 2: O que é desqualificado */}
            <div className="galaem-card p-6 space-y-4 border-rose-500/20 bg-rose-950/10">
              <div className="flex items-center gap-2 text-rose-400 font-mono text-xs uppercase font-bold">
                <XCircle className="w-4 h-4" />
                <span>× Práticas Rejeitadas</span>
              </div>
              <ul className="space-y-3 text-xs text-neutral-300 font-sans">
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">×</span>
                  <span>Reprodução acrítica de modelos puramente biomédicos sem reflexão pedagógica.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">×</span>
                  <span>Materiais acadêmicos descontextualizados da realidade social da escola pública.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">×</span>
                  <span>Acervos fechados ou com dependência de barreiras de acesso.</span>
                </li>
              </ul>
            </div>
          </div>
        </section>
      </main>

      {/* Modal Técnico de Visualização Embutida */}
      <AnimatePresence>
        {activeModalItem && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md"
            onClick={() => setActiveModalItem(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="w-full max-w-5xl galaem-card overflow-hidden border border-neutral-700 shadow-[0_0_50px_rgba(245,158,11,0.15)] flex flex-col max-h-[92vh]"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Barra Técnica Superior do Modal */}
              <div className="p-3 sm:px-6 bg-neutral-900/90 border-b border-neutral-800 text-neutral-200 flex items-center justify-between font-mono text-xs uppercase">
                <div className="flex items-center space-x-2 truncate">
                  <span className="w-2 h-2 rounded-full bg-amber-500 inline-block animate-pulse" />
                  <span className="font-bold text-amber-400">{activeModalItem.codigo}</span>
                  <span className="text-neutral-600">|</span>
                  <span className="truncate text-neutral-300">{activeModalItem.titulo}</span>
                </div>

                <div className="flex items-center space-x-2 shrink-0">
                  <a
                    href={activeModalItem.previewUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-2.5 py-1 rounded bg-neutral-800 hover:bg-neutral-700 text-neutral-200 transition-colors flex items-center gap-1 text-[11px]"
                    title="Abrir em Nova Aba"
                  >
                    <Maximize2 className="w-3 h-3 text-amber-500" />
                    <span className="hidden sm:inline">EXPANDIR</span>
                  </a>

                  <button
                    onClick={() => setActiveModalItem(null)}
                    className="px-2.5 py-1 rounded bg-rose-600 hover:bg-rose-500 text-white transition-colors flex items-center gap-1 text-[11px] cursor-pointer"
                    title="Fechar (Esc)"
                  >
                    <X className="w-3 h-3" />
                    <span>[ESC] FECHAR</span>
                  </button>
                </div>
              </div>

              {/* Container do Iframe / Player */}
              <div className="relative w-full flex-1 bg-black min-h-[50vh] sm:min-h-[68vh]">
                <iframe
                  src={activeModalItem.previewUrl}
                  title={activeModalItem.titulo}
                  className="w-full h-full absolute inset-0 border-0"
                  allow="autoplay; fullscreen"
                  allowFullScreen
                />
              </div>

              {/* Rodapé Informativo do Modal */}
              <div className="p-3 sm:px-6 bg-neutral-900/95 border-t border-neutral-800 flex flex-wrap items-center justify-between gap-2 font-mono text-xs">
                <div className="text-neutral-400 truncate max-w-xl text-[11px]">
                  {activeModalItem.descricao}
                </div>
                <a
                  href={activeModalItem.directUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-amber-400 hover:underline font-bold text-[11px] flex items-center gap-1"
                >
                  <span>Link Original no Google Drive</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Bloco 05: Rodapé Oficial da Marca */}
      <footer className="border-t border-neutral-800/80 bg-neutral-950 py-10 px-4 sm:px-8 mt-auto font-mono text-xs">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-1.5">
            <div className="font-bold tracking-tight text-neutral-200 uppercase flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-500" />
              <span>{data.estudante.nome}</span>
              <span className="text-neutral-600">•</span>
              <span className="text-neutral-400 font-normal">GALAEM FLOW</span>
            </div>
            <div className="text-neutral-500 text-[11px]">
              UNIVERSIDADE FEDERAL DO ESPÍRITO SANTO (UFES) • CENTRO DE EDUCAÇÃO FÍSICA E DESPORTOS (CEFD)
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-5 text-[11px] text-neutral-400">
            <a
              href={data.estudante.driveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-amber-400 transition-colors uppercase underline underline-offset-4 flex items-center gap-1"
            >
              <span>Pasta Raiz Google Drive</span>
              <ArrowUpRight className="w-3 h-3" />
            </a>
            <span className="text-neutral-700">•</span>
            <span className="text-neutral-500">HOSPEDAGEM CLOUDFLARE</span>
            <span className="text-neutral-700">•</span>
            <span className="text-amber-500/80">ACERVO ABERTO 2026</span>
          </div>
        </div>
      </footer>
    </div>
  )
}
