import React, { useState, useMemo, useEffect } from 'react'
import data from './data/trabalhos.json'
import { motion, AnimatePresence } from 'framer-motion'
import {
  GraduationCap,
  FolderOpen,
  Search,
  Video,
  Presentation,
  FileText,
  ExternalLink,
  Sun,
  Moon,
  BookOpen,
  Filter,
  Calendar,
  Tag,
  CheckCircle2,
  Eye,
  X,
  Maximize2,
  Sparkles,
  ArrowUpRight
} from 'lucide-react'

export default function App() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedDiscipline, setSelectedDiscipline] = useState('TODAS')
  const [selectedType, setSelectedType] = useState('TODOS')
  const [activeModalItem, setActiveModalItem] = useState(null)
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('theme')
      if (saved) return saved === 'dark'
      return window.matchMedia('(prefers-color-scheme: dark)').matches
    }
    return false
  })

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    } else {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    }
  }, [darkMode])

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
        item.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))

      const matchesDiscipline =
        selectedDiscipline === 'TODAS' || item.disciplina === selectedDiscipline

      const matchesType =
        selectedType === 'TODOS' || item.tipo === selectedType

      return matchesSearch && matchesDiscipline && matchesType
    })
  }, [searchTerm, selectedDiscipline, selectedType])

  const getFormatIcon = (tipo) => {
    switch (tipo.toLowerCase()) {
      case 'vídeo':
      case 'video':
        return <Video className="w-5 h-5 text-purple-500 dark:text-purple-400" />
      case 'apresentação':
      case 'apresentacao':
        return <Presentation className="w-5 h-5 text-blue-500 dark:text-blue-400" />
      default:
        return <FileText className="w-5 h-5 text-emerald-500 dark:text-emerald-400" />
    }
  }

  const getTypeBadgeStyle = (tipo) => {
    switch (tipo.toLowerCase()) {
      case 'vídeo':
      case 'video':
        return 'bg-purple-500/10 text-purple-700 dark:text-purple-300 border-purple-500/20'
      case 'apresentação':
      case 'apresentacao':
        return 'bg-blue-500/10 text-blue-700 dark:text-blue-300 border-blue-500/20'
      default:
        return 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border-emerald-500/20'
    }
  }

  return (
    <div className="relative min-h-screen flex flex-col bg-slate-50 text-slate-800 dark:bg-[#0b0f19] dark:text-slate-100 transition-colors selection:bg-blue-500 selection:text-white overflow-x-hidden font-sans">
      {/* Background Mesh Glow Elements (Glassmorphism Environment) */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-blue-400/20 dark:bg-blue-600/15 rounded-full blur-[100px]" />
        <div className="absolute top-1/4 -right-40 w-[28rem] h-[28rem] bg-indigo-400/20 dark:bg-indigo-600/15 rounded-full blur-[120px]" />
        <div className="absolute bottom-10 left-1/3 w-80 h-80 bg-purple-400/15 dark:bg-purple-600/10 rounded-full blur-[100px]" />
      </div>

      {/* Barra Superior / Navbar com Glassmorphism */}
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="sticky top-0 z-30 backdrop-blur-xl bg-white/70 dark:bg-[#0f172a]/70 border-b border-slate-200/60 dark:border-slate-800/60 shadow-[0_4px_20px_rgba(0,0,0,0.02)] transition-colors"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-3.5">
            <motion.div
              whileHover={{ rotate: 10, scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 400, damping: 17 }}
              className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-violet-600 flex items-center justify-center text-white shadow-md shadow-blue-500/25"
            >
              <GraduationCap className="w-5 h-5" />
            </motion.div>
            <div>
              <h1 className="font-bold text-base sm:text-lg leading-tight text-slate-900 dark:text-white tracking-tight flex items-center gap-1.5">
                {data.estudante.nome}
                <Sparkles className="w-3.5 h-3.5 text-blue-500 opacity-80" />
              </h1>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                {data.estudante.instituicao}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2 sm:space-x-3">
            <motion.a
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              href={data.estudante.driveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-semibold rounded-xl backdrop-blur-md bg-white/80 hover:bg-white dark:bg-slate-800/80 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200/80 dark:border-slate-700/80 shadow-sm transition-all"
            >
              <FolderOpen className="w-4 h-4 text-blue-500" />
              <span className="hidden xs:inline">Pasta Completa</span>
              <ExternalLink className="w-3.5 h-3.5 opacity-60" />
            </motion.a>

            <motion.button
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.92 }}
              onClick={() => setDarkMode(!darkMode)}
              aria-label="Alternar tema"
              className="p-2.5 rounded-xl border border-slate-200/80 dark:border-slate-800/80 backdrop-blur-md bg-white/60 dark:bg-slate-800/60 hover:bg-slate-100 dark:hover:bg-slate-700/80 text-slate-600 dark:text-slate-300 transition-colors shadow-sm"
            >
              <AnimatePresence mode="wait" initial={false}>
                {darkMode ? (
                  <motion.div
                    key="sun"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Sun className="w-4 h-4 text-amber-400" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="moon"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Moon className="w-4 h-4 text-slate-600" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>
      </motion.header>

      {/* Hero / Apresentação Acadêmica com Glassmorphism e Motion */}
      <section className="relative z-10 py-12 sm:py-16 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.4 }}
            className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full text-xs font-semibold backdrop-blur-xl bg-blue-500/10 text-blue-700 dark:text-blue-300 border border-blue-500/20 shadow-sm"
          >
            <BookOpen className="w-3.5 h-3.5 text-blue-500" />
            <span>{data.estudante.curso}</span>
          </motion.div>

          <motion.h2
            initial={{ y: 15, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight"
          >
            Produções e Trabalhos Acadêmicos
          </motion.h2>

          <motion.p
            initial={{ y: 15, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="text-slate-600 dark:text-slate-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed"
          >
            {data.estudante.bio}
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="pt-2 flex flex-wrap items-center justify-center gap-3 text-xs text-slate-500 dark:text-slate-400"
          >
            <span className="inline-flex items-center space-x-1.5 backdrop-blur-md bg-white/40 dark:bg-slate-800/40 px-2.5 py-1 rounded-lg border border-slate-200/50 dark:border-slate-800/50">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
              <span>Acesso direto ao trabalho</span>
            </span>
            <span>•</span>
            <span className="inline-flex items-center space-x-1.5 backdrop-blur-md bg-white/40 dark:bg-slate-800/40 px-2.5 py-1 rounded-lg border border-slate-200/50 dark:border-slate-800/50">
              <Eye className="w-3.5 h-3.5 text-blue-500" />
              <span>Visualizador embutido na página</span>
            </span>
          </motion.div>
        </div>
      </section>

      {/* Conteúdo Principal / Filtros e Cards */}
      <main className="relative z-10 flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 pb-12 space-y-6">
        {/* Painel de Busca e Filtros em Glassmorphism */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.35, duration: 0.4 }}
          className="backdrop-blur-xl bg-white/70 dark:bg-[#0f172a]/70 p-4 sm:p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 shadow-lg shadow-slate-200/50 dark:shadow-none space-y-4 transition-colors"
        >
          <div className="flex flex-col sm:flex-row gap-3">
            {/* Input de Busca */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Buscar por título, matéria, conceito ou tag..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 text-sm rounded-xl border border-slate-200/80 dark:border-slate-700/80 bg-white/50 dark:bg-slate-900/50 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-all placeholder:text-slate-400"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 px-1 py-0.5"
                >
                  Limpar
                </button>
              )}
            </div>

            {/* Seletor de Tipo / Formato */}
            <div className="sm:w-52">
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="w-full py-2.5 px-3 text-sm rounded-xl border border-slate-200/80 dark:border-slate-700/80 bg-white/50 dark:bg-slate-900/50 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-all cursor-pointer"
              >
                <option value="TODOS">Todos os Formatos</option>
                {types
                  .filter((t) => t !== 'TODOS')
                  .map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
              </select>
            </div>
          </div>

          {/* Filtros em Pílulas de Disciplina */}
          <div className="flex items-center space-x-2 overflow-x-auto pb-1 pt-1 scrollbar-none">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center pr-1 shrink-0">
              <Filter className="w-3 h-3 mr-1" /> Disciplina:
            </span>
            {disciplines.map((disc) => {
              const active = selectedDiscipline === disc
              const count =
                disc === 'TODAS'
                  ? data.trabalhos.length
                  : data.trabalhos.filter((t) => t.disciplina === disc).length

              return (
                <motion.button
                  key={disc}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedDiscipline(disc)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-all flex items-center space-x-1.5 ${
                    active
                      ? 'bg-blue-600 text-white shadow-md shadow-blue-500/30'
                      : 'backdrop-blur-md bg-slate-100/80 hover:bg-slate-200/80 text-slate-600 dark:bg-slate-800/60 dark:hover:bg-slate-800 dark:text-slate-300'
                  }`}
                >
                  <span>{disc === 'TODAS' ? 'Todas as Disciplinas' : disc}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                      active
                        ? 'bg-blue-800/40 text-blue-100'
                        : 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-400'
                    }`}
                  >
                    {count}
                  </span>
                </motion.button>
              )
            })}
          </div>
        </motion.div>

        {/* Status de Resultados */}
        <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 px-1">
          <span>
            Mostrando <strong>{filteredWorks.length}</strong> de <strong>{data.trabalhos.length}</strong> produção(ões)
          </span>
          {(searchTerm || selectedDiscipline !== 'TODAS' || selectedType !== 'TODOS') && (
            <button
              onClick={() => {
                setSearchTerm('')
                setSelectedDiscipline('TODAS')
                setSelectedType('TODOS')
              }}
              className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
            >
              Resetar filtros
            </button>
          )}
        </div>

        {/* Grid de Cards dos Trabalhos com Animações Fluidas */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <AnimatePresence mode="popLayout">
            {filteredWorks.length > 0 ? (
              filteredWorks.map((item, index) => (
                <motion.article
                  key={item.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.35, delay: index * 0.08 }}
                  whileHover={{ y: -5, transition: { duration: 0.2 } }}
                  className="group relative flex flex-col justify-between backdrop-blur-xl bg-white/75 dark:bg-[#0f172a]/75 border border-slate-200/80 dark:border-slate-800/80 rounded-2xl p-5 sm:p-6 shadow-sm hover:shadow-xl hover:shadow-blue-500/10 hover:border-blue-400/50 dark:hover:border-blue-500/40 transition-all duration-300 overflow-hidden"
                >
                  {/* Detalhe de iluminação sutil no card */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-blue-500/5 to-transparent rounded-bl-full pointer-events-none group-hover:from-blue-500/15 transition-all" />

                  <div className="space-y-3 relative z-10">
                    {/* Cabeçalho do Card: Ícone, Tipo e Ano */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <motion.div
                          whileHover={{ scale: 1.1, rotate: 5 }}
                          className="p-2.5 rounded-xl backdrop-blur-md bg-slate-100/80 dark:bg-slate-800/80 border border-slate-200/50 dark:border-slate-700/50"
                        >
                          {getFormatIcon(item.tipo)}
                        </motion.div>
                        <span
                          className={`text-xs font-semibold px-2.5 py-1 rounded-full border backdrop-blur-sm ${getTypeBadgeStyle(
                            item.tipo
                          )}`}
                        >
                          {item.formato}
                        </span>
                      </div>

                      <div className="flex items-center space-x-1 text-xs text-slate-400">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>{item.ano}</span>
                      </div>
                    </div>

                    {/* Disciplina */}
                    <div className="text-xs font-semibold text-blue-600 dark:text-blue-400 tracking-wider uppercase">
                      {item.disciplina}
                    </div>

                    {/* Título */}
                    <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white leading-snug group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {item.titulo}
                    </h3>

                    {/* Descrição */}
                    <p className="text-sm text-slate-600 dark:text-slate-300 line-clamp-3 leading-relaxed">
                      {item.descricao}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {item.tags.map((tag) => (
                        <span
                          key={tag}
                          className="inline-flex items-center space-x-1 text-[11px] font-medium px-2 py-0.5 rounded-md backdrop-blur-md bg-slate-100/70 text-slate-600 dark:bg-slate-800/70 dark:text-slate-400 border border-slate-200/40 dark:border-slate-700/40"
                        >
                          <Tag className="w-2.5 h-2.5 opacity-60" />
                          <span>{tag}</span>
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Botões de Ação Direta */}
                  <div className="pt-5 mt-4 border-t border-slate-100/80 dark:border-slate-800/80 flex items-center justify-between gap-2 relative z-10">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.96 }}
                      onClick={() => setActiveModalItem(item)}
                      className="inline-flex items-center space-x-2 px-4 py-2 text-xs sm:text-sm font-semibold rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-md shadow-blue-500/20 transition-all"
                    >
                      <Eye className="w-4 h-4" />
                      <span>Visualizar Aqui</span>
                    </motion.button>

                    <motion.a
                      whileHover={{ x: 2 }}
                      href={item.previewUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center space-x-1.5 text-xs sm:text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors py-2 px-2"
                    >
                      <span>Tela Cheia</span>
                      <ArrowUpRight className="w-4 h-4 opacity-70" />
                    </motion.a>
                  </div>
                </motion.article>
              ))
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="col-span-full text-center py-16 px-4 backdrop-blur-xl bg-white/50 dark:bg-slate-900/50 rounded-2xl border border-dashed border-slate-300 dark:border-slate-800 space-y-3"
              >
                <BookOpen className="w-10 h-10 text-slate-300 dark:text-slate-600 mx-auto" />
                <h4 className="text-base font-semibold text-slate-700 dark:text-slate-200">
                  Nenhum trabalho encontrado
                </h4>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  Não encontramos resultados para sua busca ou filtro atual. Tente buscar por outros termos.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </main>

      {/* Modal Interativo de Visualização Direta com Framer Motion */}
      <AnimatePresence>
        {activeModalItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/80 backdrop-blur-md transition-all"
            onClick={() => setActiveModalItem(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ type: 'spring', damping: 25, stiffness: 350 }}
              className="relative w-full max-w-5xl backdrop-blur-2xl bg-white/95 dark:bg-[#0f172a]/95 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 shadow-2xl overflow-hidden flex flex-col max-h-[92vh]"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Barra do Topo do Modal */}
              <div className="p-4 sm:px-6 sm:py-4 border-b border-slate-200/80 dark:border-slate-800/80 flex items-center justify-between bg-slate-50/70 dark:bg-slate-900/70">
                <div className="flex items-center space-x-3 pr-2 overflow-hidden">
                  <div className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 shrink-0">
                    {getFormatIcon(activeModalItem.tipo)}
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-bold text-sm sm:text-base text-slate-900 dark:text-white truncate">
                      {activeModalItem.titulo}
                    </h3>
                    <p className="text-xs text-blue-600 dark:text-blue-400 font-medium truncate">
                      {activeModalItem.disciplina} • {activeModalItem.formato}
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-2 shrink-0">
                  <motion.a
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    href={activeModalItem.previewUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-xl text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                    title="Abrir em Nova Aba"
                  >
                    <Maximize2 className="w-4 h-4" />
                  </motion.a>

                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setActiveModalItem(null)}
                    className="p-2 rounded-xl text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                    title="Fechar (Esc)"
                  >
                    <X className="w-5 h-5" />
                  </motion.button>
                </div>
              </div>

              {/* Container do Iframe / Player Embutido */}
              <div className="relative w-full flex-1 bg-black min-h-[50vh] sm:min-h-[65vh]">
                <iframe
                  src={activeModalItem.previewUrl}
                  title={activeModalItem.titulo}
                  className="w-full h-full absolute inset-0 border-0"
                  allow="autoplay; fullscreen"
                  allowFullScreen
                />
              </div>

              {/* Rodapé do Modal */}
              <div className="p-3 sm:px-6 sm:py-3 border-t border-slate-200/80 dark:border-slate-800/80 bg-white/70 dark:bg-slate-900/70 flex items-center justify-between text-xs text-slate-500">
                <span className="truncate pr-2">{activeModalItem.descricao}</span>
                <a
                  href={activeModalItem.directUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 dark:text-blue-400 hover:underline font-medium shrink-0 flex items-center space-x-1"
                >
                  <span>Link Original</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Rodapé */}
      <footer className="relative z-10 mt-auto border-t border-slate-200/80 dark:border-slate-800/80 backdrop-blur-xl bg-white/60 dark:bg-[#0f172a]/60 py-6 px-4 sm:px-6 transition-colors">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-400">
          <div>
            © {new Date().getFullYear()} {data.estudante.nome} • {data.estudante.instituicao}
          </div>
          <div className="flex items-center space-x-4">
            <a
              href={data.estudante.driveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              Pasta Geral no Drive
            </a>
            <span>•</span>
            <span>Licenciatura em Educação Física</span>
          </div>
        </div>
      </footer>
    </div>
  )
}
