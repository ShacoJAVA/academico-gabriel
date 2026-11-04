import React, { useState, useMemo, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion'
import data from './data/trabalhos.json'
import { cn } from './lib/utils'
import { SectionHeader } from './components/SectionHeader'
import {
  Search,
  Video,
  FileText,
  Maximize2,
  Minimize2,
  X,
  Eye,
  SlidersHorizontal,
  GraduationCap,
  Sparkles,
  Layers,
  CheckCircle2,
  XCircle,
  FileCode,
  ShieldCheck,
  ChevronRight,
  BookOpen,
  ArrowDown
} from 'lucide-react'

export default function App() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedDiscipline, setSelectedDiscipline] = useState('TODAS')
  const [selectedType, setSelectedType] = useState('TODOS')
  const [activeModalItem, setActiveModalItem] = useState(null)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const modalContainerRef = useRef(null)

  // Barra de progresso de scroll suave no topo
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001
  })

  // Fechar modal com tecla ESC
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        if (document.fullscreenElement) {
          document.exitFullscreen().catch(() => {})
          setIsFullscreen(false)
        } else {
          setActiveModalItem(null)
        }
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  // Sincronizar mudanca de estado de tela cheia
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(Boolean(document.fullscreenElement))
    }
    document.addEventListener('fullscreenchange', handleFullscreenChange)
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange)
  }, [])

  const toggleModalFullscreen = () => {
    if (!document.fullscreenElement) {
      if (modalContainerRef.current) {
        modalContainerRef.current.requestFullscreen().catch(() => {})
        setIsFullscreen(true)
      }
    } else {
      document.exitFullscreen().catch(() => {})
      setIsFullscreen(false)
    }
  }

  // Lista unica de disciplinas
  const disciplines = useMemo(() => {
    const list = Array.from(new Set(data.trabalhos.map((t) => t.disciplina)))
    return ['TODAS', ...list]
  }, [])

  // Lista unica de tipos
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
    <div className="min-h-screen galaem-grid-pattern bg-neutral-950 text-neutral-100 flex flex-col font-sans selection:bg-amber-500 selection:text-neutral-950 antialiased relative">
      {/* Indicador de Progresso de Scroll com Motion */}
      <motion.div
        style={{ scaleX }}
        className="fixed top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-amber-500 via-amber-400 to-rose-500 origin-left z-50 shadow-[0_0_12px_rgba(245,158,11,0.6)]"
      />

      {/* Barra Superior Industrial e Telemetria com Glassmorphism */}
      <header className="border-b border-white/[0.08] galaem-glass text-[11px] font-mono tracking-wider uppercase px-4 sm:px-8 py-2.5 flex flex-wrap items-center justify-between gap-3 sticky top-0 z-30">
        <div className="flex items-center space-x-3">
          <span className="inline-block w-2 h-2 rounded-full bg-amber-500 animate-pulse shadow-[0_0_8px_rgba(245,158,11,0.8)]" />
          <span className="font-bold text-neutral-200">GALAEM FLOW // PORTAL ACADÊMICO</span>
          <span className="text-neutral-600 hidden sm:inline">|</span>
          <span className="text-neutral-400 hidden sm:inline">
            UFES CEFD (LICENCIATURA EM EDUCAÇÃO FÍSICA)
          </span>
        </div>

        <div className="flex items-center space-x-4">
          <span className="text-amber-400/90 bg-amber-500/10 border border-amber-500/20 px-2.5 py-0.5 rounded-full text-[10px] font-semibold backdrop-blur-sm">
            REGISTRO INSTITUCIONAL // 2026
          </span>
          <a
            href="#acervo"
            className="text-neutral-400 hover:text-amber-400 transition-colors flex items-center gap-1 text-[10px]"
          >
            <BookOpen className="w-3 h-3 text-amber-500" />
            <span>ACERVO INTERNO</span>
          </a>
        </div>
      </header>

      {/* Bloco 00: Hero Section com Motion e Glassmorphism */}
      <section className="relative border-b border-white/[0.06] overflow-hidden py-16 sm:py-24">
        {/* Orbe de Iluminacao Fluida com Animacao Suave */}
        <motion.div
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.08, 0.16, 0.08],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[380px] bg-gradient-to-tr from-amber-500/20 to-rose-500/15 blur-[140px] pointer-events-none rounded-full"
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Bloco Tipografico Principal */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-7 space-y-6"
            >
              {/* Badge da Marca com Efeito Vidro */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/[0.08] bg-neutral-900/70 backdrop-blur-md text-neutral-300 text-xs font-mono shadow-sm">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                <span>UFES // CEFD • ACERVO DE PRODUÇÃO PEDAGÓGICA</span>
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

              {/* Botoes de Acao Interna Padronizados */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <motion.a
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  href="#acervo"
                  className="px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-xs uppercase tracking-wider transition-all duration-200 flex items-center gap-2 galaem-glow-amber cursor-pointer shadow-lg"
                >
                  <span>Explorar Acervo de Trabalhos</span>
                  <ChevronRight className="w-4 h-4" />
                </motion.a>

                <motion.a
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  href="#diretrizes"
                  className="px-5 py-3 rounded-xl galaem-glass hover:bg-neutral-800/80 hover:border-amber-500/40 text-neutral-300 hover:text-white font-mono text-xs uppercase tracking-wider transition-all duration-200 flex items-center gap-2 cursor-pointer"
                >
                  <span>Diretrizes de Investigação</span>
                  <ArrowDown className="w-3.5 h-3.5 text-amber-500" />
                </motion.a>
              </div>
            </motion.div>

            {/* Ficha do Pesquisador (Card Glassmorphism GALAEM) */}
            <motion.div
              initial={{ opacity: 0, y: 35 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-5"
            >
              <div className="galaem-card p-6 sm:p-7 space-y-5">
                <div className="flex items-center justify-between border-b border-white/[0.08] pb-3 font-mono text-xs">
                  <div className="flex items-center gap-2">
                    <GraduationCap className="w-4 h-4 text-amber-500" />
                    <span className="font-bold text-neutral-200">FICHA CATALOGRÁFICA</span>
                  </div>
                  <span className="text-rose-400 bg-rose-500/10 border border-rose-500/20 px-2.5 py-0.5 rounded-full text-[10px] font-semibold">
                    REGISTRO ATIVO
                  </span>
                </div>

                <div className="space-y-3.5 font-mono text-xs">
                  <div>
                    <span className="text-neutral-500 text-[10px] block uppercase tracking-wider">Pesquisador / Autor</span>
                    <span className="text-base font-bold text-neutral-100">{data.estudante.nome}</span>
                  </div>

                  <div>
                    <span className="text-neutral-500 text-[10px] block uppercase tracking-wider">Instituição de Ensino</span>
                    <span className="text-neutral-300">{data.estudante.instituicao}</span>
                  </div>

                  <div>
                    <span className="text-neutral-500 text-[10px] block uppercase tracking-wider">Curso de Graduação</span>
                    <span className="text-amber-400 font-medium">{data.estudante.curso}</span>
                  </div>

                  <div className="pt-3 border-t border-white/[0.08] flex items-center justify-between text-[11px]">
                    <span className="text-neutral-500">Acesso &amp; Utilização</span>
                    <span className="text-neutral-300 font-semibold flex items-center gap-1.5">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                      Consulta Local Integrada
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Bloco 01: Telemetria & Recursos com Motion de Scroll */}
      <section className="border-b border-white/[0.06] py-10 bg-neutral-950/90">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                number: "01",
                label: "AUTOR",
                title: "Gabriel Freitas",
                desc: "Licenciatura em Educação Física na UFES.",
                icon: GraduationCap
              },
              {
                number: "02",
                label: "DISCIPLINA",
                title: "Epistemologia da EF",
                desc: "Matrizes conceituais, ciência e corporeidade.",
                icon: Layers
              },
              {
                number: "03",
                label: "MULTIMÍDIA",
                title: "Slides & Vídeos",
                desc: "Player embutido de alta fidelidade sem sair da página.",
                icon: Video
              },
              {
                number: "04",
                label: "CONSULTA",
                title: "Ambiente Integrado",
                desc: "Visualização direta de apresentações e vídeos.",
                icon: FileCode
              }
            ].map((item, idx) => {
              const Icon = item.icon
              return (
                <motion.div
                  key={item.number}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.5, delay: idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
                  whileHover={{ y: -4 }}
                  className="galaem-card p-5 space-y-2.5 cursor-default"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-amber-500 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                      {item.number} / {item.label}
                    </span>
                    <Icon className="w-4 h-4 text-neutral-500" />
                  </div>
                  <h4 className="font-bold text-neutral-200 text-sm tracking-tight">{item.title}</h4>
                  <p className="text-xs text-neutral-400 leading-relaxed">{item.desc}</p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Bloco 02: Indexador e Filtros com Glassmorphism Fixo */}
      <section className="border-b border-white/[0.08] galaem-glass sticky top-[41px] z-20 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between">
            {/* Input de Busca Dark Precision com Efeito Vidro */}
            <div className="relative flex-1 max-w-xl">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400" />
              <input
                type="text"
                placeholder="Buscar por termo, conceito, código ou tema..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-20 py-2.5 bg-neutral-900/80 border border-white/[0.08] rounded-xl font-mono text-xs text-neutral-100 placeholder:text-neutral-500 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500/40 transition-all backdrop-blur-md"
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

            {/* Filtros em Pilulas com Microinteracoes */}
            <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
              <span className="text-[11px] text-neutral-400 uppercase flex items-center gap-1.5 mr-1">
                <SlidersHorizontal className="w-3.5 h-3.5 text-amber-500" /> FILTROS:
              </span>

              {disciplines.map((disc, idx) => {
                const active = selectedDiscipline === disc
                return (
                  <motion.button
                    whileTap={{ scale: 0.96 }}
                    key={disc}
                    onClick={() => setSelectedDiscipline(disc)}
                    className={cn(
                      "px-3.5 py-1.5 rounded-lg border text-xs font-mono uppercase tracking-tight transition-all duration-150 cursor-pointer flex items-center gap-1.5 backdrop-blur-md",
                      active
                        ? "bg-amber-500/15 border-amber-500/60 text-amber-400 shadow-[0_0_15px_rgba(245,158,11,0.2)]"
                        : "bg-neutral-900/60 border-white/[0.06] text-neutral-400 hover:text-neutral-200 hover:border-white/[0.15]"
                    )}
                  >
                    <span className="text-[10px] opacity-60">0{idx + 1}.</span>
                    <span>{disc === 'TODAS' ? 'TODAS AS MATÉRIAS' : disc}</span>
                  </motion.button>
                )
              })}

              {/* Seletor de Formato */}
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="py-1.5 px-3 rounded-lg border border-white/[0.08] bg-neutral-900/80 font-mono text-xs uppercase text-neutral-300 focus:outline-none focus:border-amber-500 cursor-pointer backdrop-blur-md"
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

      {/* Bloco 03: Acervo de Producoes com Motion de Scroll */}
      <main id="acervo" className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-8 py-14 space-y-12">
        <div>
          <SectionHeader
            number="03"
            title="Catálogo &amp; Acervo de Trabalhos"
            subtitle={`Mostrando ${filteredWorks.length} registro(s) catalogado(s). Clique em qualquer trabalho para visualizar diretamente no leitor interno.`}
          />

          {/* Grade de Trabalhos com Glassmorphism Refinado e Stagger Reveal */}
          {filteredWorks.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredWorks.map((item, idx) => (
                <motion.article
                  key={item.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.6, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
                  onClick={() => setActiveModalItem(item)}
                  className="galaem-card p-6 sm:p-7 flex flex-col justify-between group space-y-5 cursor-pointer relative overflow-hidden"
                >
                  {/* Borda Superior com Brilho Suave */}
                  <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-500/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  {/* Faixa Superior Tecnica */}
                  <div className="flex items-center justify-between border-b border-white/[0.08] pb-3.5 font-mono text-[11px] uppercase tracking-wider">
                    <div className="flex items-center space-x-2">
                      <span className="w-2 h-2 rounded-full bg-amber-500 inline-block shadow-[0_0_6px_rgba(245,158,11,0.6)]" />
                      <span className="font-bold text-neutral-300">{item.codigo}</span>
                    </div>

                    <span className="px-2.5 py-0.5 rounded-full border border-amber-500/25 bg-amber-500/10 text-[10px] font-bold text-amber-400 backdrop-blur-sm">
                      {item.formato}
                    </span>
                  </div>

                  {/* Conteudo do Trabalho */}
                  <div className="space-y-3">
                    <div className="font-mono text-xs text-rose-400 uppercase tracking-wider flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-rose-500 inline-block" />
                      <span>{item.disciplina}</span>
                    </div>

                    <h3 className="text-xl sm:text-2xl font-bold text-neutral-100 group-hover:text-amber-400 transition-colors tracking-tight">
                      {item.titulo}
                    </h3>

                    <p className="text-sm text-neutral-400 leading-relaxed">
                      {item.descricao}
                    </p>

                    {/* Tags com Estilo Pilula Translúcida */}
                    <div className="flex flex-wrap gap-1.5 pt-2 font-mono text-[10px]">
                      {item.tags.map((tag) => (
                        <span
                          key={tag}
                          className="border border-white/[0.06] rounded-md px-2.5 py-0.5 bg-neutral-900/60 text-neutral-400 uppercase backdrop-blur-sm"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Botao de Acao Interna de Abertura */}
                  <div className="pt-4 border-t border-white/[0.08] flex items-center justify-between font-mono text-xs">
                    <div className="text-[11px] text-neutral-500 flex items-center gap-1.5">
                      <Eye className="w-3.5 h-3.5 text-amber-500" />
                      <span>Visualização Interna</span>
                    </div>

                    <motion.div
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      className="py-2.5 px-5 rounded-xl bg-amber-500 group-hover:bg-amber-400 text-neutral-950 font-bold transition-all duration-200 flex items-center justify-center gap-2 uppercase tracking-wider galaem-glow-amber text-xs"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Abrir Trabalho</span>
                    </motion.div>
                  </div>
                </motion.article>
              ))}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="galaem-card p-12 text-center space-y-3 font-mono"
            >
              <div className="text-amber-400 text-sm uppercase tracking-widest">
                [ NENHUM REGISTRO ENCONTRADO ]
              </div>
              <p className="text-xs text-neutral-400">
                Não foram localizados trabalhos correspondentes aos critérios de busca ou filtros selecionados.
              </p>
            </motion.div>
          )}
        </div>

        {/* Bloco 04: Manifesto Academico com Motion de Scroll */}
        <section id="diretrizes" className="pt-8">
          <SectionHeader
            number="04"
            title="Diretrizes &amp; Manifesto de Investigação"
            subtitle="Critérios epistemológicos e éticos que regem as produções e ensaios deste repositório."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Coluna 1: O que e buscado */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="galaem-card p-6 sm:p-7 space-y-4 border-emerald-500/30 bg-emerald-950/15"
            >
              <div className="flex items-center gap-2 text-emerald-400 font-mono text-xs uppercase font-bold">
                <CheckCircle2 className="w-4 h-4" />
                <span>→ Princípios da Práxis Pedagógica</span>
              </div>
              <ul className="space-y-3 text-xs text-neutral-300 font-sans leading-relaxed">
                <li className="flex items-start gap-2.5">
                  <span className="text-emerald-400 font-bold">✓</span>
                  <span>Rigor epistemológico e fundamentação científica do movimento humano.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-emerald-400 font-bold">✓</span>
                  <span>Articulação dialética entre matrizes conceituais e intervenção na educação escolar.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-emerald-400 font-bold">✓</span>
                  <span>Comunicação multimídia aberta, clara e acessível a estudantes e docentes.</span>
                </li>
              </ul>
            </motion.div>

            {/* Coluna 2: O que e desqualificado */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="galaem-card p-6 sm:p-7 space-y-4 border-rose-500/30 bg-rose-950/15"
            >
              <div className="flex items-center gap-2 text-rose-400 font-mono text-xs uppercase font-bold">
                <XCircle className="w-4 h-4" />
                <span>× Práticas Rejeitadas</span>
              </div>
              <ul className="space-y-3 text-xs text-neutral-300 font-sans leading-relaxed">
                <li className="flex items-start gap-2.5">
                  <span className="text-rose-400 font-bold">×</span>
                  <span>Reprodução acrítica de modelos puramente biomédicos sem reflexão pedagógica.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-rose-400 font-bold">×</span>
                  <span>Materiais acadêmicos descontextualizados da realidade social da escola pública.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-rose-400 font-bold">×</span>
                  <span>Acervos fechados ou com dependência de barreiras de acesso.</span>
                </li>
              </ul>
            </motion.div>
          </div>
        </section>
      </main>

      {/* Modal Técnico de Visualização Embutida (Sem Links Externos) */}
      <AnimatePresence>
        {activeModalItem && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-xl"
            onClick={() => setActiveModalItem(null)}
          >
            <motion.div
              ref={modalContainerRef}
              initial={{ scale: 0.94, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.94, opacity: 0, y: 15 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className={cn(
                "w-full galaem-card overflow-hidden border border-neutral-700/80 shadow-[0_0_60px_rgba(245,158,11,0.18)] flex flex-col transition-all duration-300",
                isFullscreen ? "max-w-full h-full rounded-none" : "max-w-5xl max-h-[92vh]"
              )}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Barra Técnica Superior do Modal */}
              <div className="p-3.5 sm:px-6 bg-neutral-900/95 border-b border-white/[0.08] text-neutral-200 flex items-center justify-between font-mono text-xs uppercase">
                <div className="flex items-center space-x-2 truncate">
                  <span className="w-2 h-2 rounded-full bg-amber-500 inline-block animate-pulse" />
                  <span className="font-bold text-amber-400">{activeModalItem.codigo}</span>
                  <span className="text-neutral-600">|</span>
                  <span className="truncate text-neutral-300 font-medium">{activeModalItem.titulo}</span>
                </div>

                <div className="flex items-center space-x-2 shrink-0">
                  <button
                    onClick={toggleModalFullscreen}
                    className="px-2.5 py-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-200 transition-colors flex items-center gap-1.5 text-[11px] cursor-pointer"
                    title={isFullscreen ? "Restaurar Janela" : "Expandir em Tela Cheia no Portal"}
                  >
                    {isFullscreen ? (
                      <>
                        <Minimize2 className="w-3 h-3 text-amber-500" />
                        <span className="hidden sm:inline">RESTAURAR</span>
                      </>
                    ) : (
                      <>
                        <Maximize2 className="w-3 h-3 text-amber-500" />
                        <span className="hidden sm:inline">TELA CHEIA</span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={() => setActiveModalItem(null)}
                    className="px-2.5 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-500 text-white transition-colors flex items-center gap-1 text-[11px] cursor-pointer font-bold"
                    title="Fechar (Esc)"
                  >
                    <X className="w-3 h-3" />
                    <span>[ESC] FECHAR</span>
                  </button>
                </div>
              </div>

              {/* Container do Iframe / Player Embutido */}
              <div className="relative w-full flex-1 bg-black min-h-[50vh] sm:min-h-[68vh]">
                <iframe
                  src={activeModalItem.previewUrl}
                  title={activeModalItem.titulo}
                  className="w-full h-full absolute inset-0 border-0"
                  allow="autoplay; fullscreen"
                  allowFullScreen
                />
              </div>

              {/* Rodapé Informativo do Modal (Uso 100% Interno) */}
              <div className="p-3.5 sm:px-6 bg-neutral-900/95 border-t border-white/[0.08] flex flex-wrap items-center justify-between gap-3 font-mono text-xs">
                <div className="text-neutral-400 truncate max-w-xl text-[11px]">
                  {activeModalItem.descricao}
                </div>
                <div className="text-amber-400 font-bold text-[11px] flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>CONSULTA LOCAL INTEGRADA • USO INTERNO</span>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Bloco 05: Rodape Institucional sem Mencoes de Infraestrutura */}
      <footer className="border-t border-white/[0.08] bg-neutral-950 py-10 px-4 sm:px-8 mt-auto font-mono text-xs">
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
              href="#acervo"
              className="hover:text-amber-400 transition-colors uppercase underline underline-offset-4 flex items-center gap-1"
            >
              <span>Navegar no Acervo</span>
            </a>
            <span className="text-neutral-700">•</span>
            <span className="text-neutral-500">LICENCIATURA EM EDUCAÇÃO FÍSICA</span>
            <span className="text-neutral-700">•</span>
            <span className="text-amber-500/80">REGISTRO ACADÊMICO 2026</span>
          </div>
        </div>
      </footer>
    </div>
  )
}
