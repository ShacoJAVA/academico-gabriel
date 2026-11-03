import React, { useState, useMemo, useEffect } from 'react'
import data from './data/trabalhos.json'
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
  Play,
  Maximize2
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
        return <Video className="w-5 h-5 text-purple-600 dark:text-purple-400" />
      case 'apresentação':
      case 'apresentacao':
        return <Presentation className="w-5 h-5 text-blue-600 dark:text-blue-400" />
      default:
        return <FileText className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
    }
  }

  const getTypeBadgeStyle = (tipo) => {
    switch (tipo.toLowerCase()) {
      case 'vídeo':
      case 'video':
        return 'bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-950/50 dark:text-purple-300 dark:border-purple-800'
      case 'apresentação':
      case 'apresentacao':
        return 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/50 dark:text-blue-300 dark:border-blue-800'
      default:
        return 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/50 dark:text-emerald-300 dark:border-emerald-800'
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800 dark:bg-slate-950 dark:text-slate-100 transition-colors">
      {/* Barra Superior / Navbar */}
      <header className="sticky top-0 z-30 backdrop-blur-md bg-white/80 dark:bg-slate-900/80 border-b border-slate-200 dark:border-slate-800 transition-colors">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div>
              <h1 className="font-bold text-base sm:text-lg leading-tight text-slate-900 dark:text-white">
                {data.estudante.nome}
              </h1>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                {data.estudante.instituicao}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2 sm:space-x-3">
            <a
              href={data.estudante.driveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-semibold rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 transition-all border border-slate-200 dark:border-slate-700"
            >
              <FolderOpen className="w-4 h-4 text-blue-500" />
              <span className="hidden xs:inline">Pasta Completa</span>
              <ExternalLink className="w-3.5 h-3.5 opacity-60" />
            </a>

            <button
              onClick={() => setDarkMode(!darkMode)}
              aria-label="Alternar tema"
              className="p-2 rounded-lg border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 transition-colors"
            >
              {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </header>

      {/* Hero / Apresentação Acadêmica */}
      <section className="bg-gradient-to-b from-blue-50/50 via-white to-slate-50 dark:from-slate-900 dark:via-slate-950 dark:to-slate-950 border-b border-slate-200 dark:border-slate-800/80 py-12 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full text-xs font-semibold bg-blue-100/70 text-blue-800 dark:bg-blue-950/70 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
            <BookOpen className="w-3.5 h-3.5" />
            <span>{data.estudante.curso}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Produções e Trabalhos Acadêmicos
          </h2>

          <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            {data.estudante.bio}
          </p>

          <div className="pt-2 flex flex-wrap items-center justify-center gap-3 text-xs text-slate-500 dark:text-slate-400">
            <span className="inline-flex items-center space-x-1">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              <span>Acesso direto ao trabalho (sem navegar em pastas)</span>
            </span>
            <span>•</span>
            <span className="inline-flex items-center space-x-1">
              <Eye className="w-4 h-4 text-blue-500" />
              <span>Visualização interativa na própria página</span>
            </span>
          </div>
        </div>
      </section>

      {/* Conteúdo Principal / Filtros e Cards */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 py-8 space-y-6">
        {/* Painel de Busca e Filtros */}
        <div className="bg-white dark:bg-slate-900 p-4 sm:p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4 transition-colors">
          <div className="flex flex-col sm:flex-row gap-3">
            {/* Input de Busca */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Buscar por título, matéria, palavra-chave ou conceito..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all placeholder:text-slate-400"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
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
                className="w-full py-2.5 px-3 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
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
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center pr-1">
              <Filter className="w-3 h-3 mr-1" /> Disciplina:
            </span>
            {disciplines.map((disc) => {
              const active = selectedDiscipline === disc
              const count =
                disc === 'TODAS'
                  ? data.trabalhos.length
                  : data.trabalhos.filter((t) => t.disciplina === disc).length

              return (
                <button
                  key={disc}
                  onClick={() => setSelectedDiscipline(disc)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all flex items-center space-x-1.5 ${
                    active
                      ? 'bg-blue-600 text-white shadow-sm shadow-blue-500/30'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-600 dark:bg-slate-800 dark:hover:bg-slate-700 dark:text-slate-300'
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
                </button>
              )
            })}
          </div>
        </div>

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

        {/* Grid de Cards dos Trabalhos */}
        {filteredWorks.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {filteredWorks.map((item) => (
              <article
                key={item.id}
                className="group flex flex-col justify-between bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-2xl p-5 sm:p-6 shadow-sm hover:shadow-md hover:border-blue-300 dark:hover:border-blue-900 transition-all duration-200"
              >
                <div className="space-y-3">
                  {/* Cabeçalho do Card: Ícone, Tipo e Ano */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 group-hover:scale-105 transition-transform">
                        {getFormatIcon(item.tipo)}
                      </div>
                      <span
                        className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${getTypeBadgeStyle(
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
                  <div className="text-xs font-medium text-blue-600 dark:text-blue-400 tracking-wide uppercase">
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
                        className="inline-flex items-center space-x-1 text-[11px] font-medium px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 dark:bg-slate-800/80 dark:text-slate-400"
                      >
                        <Tag className="w-2.5 h-2.5 opacity-60" />
                        <span>{tag}</span>
                      </span>
                    ))}
                  </div>
                </div>

                {/* Botões de Ação Direta */}
                <div className="pt-5 mt-4 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between gap-2">
                  <button
                    onClick={() => setActiveModalItem(item)}
                    className="inline-flex items-center space-x-2 px-3.5 py-2 text-xs sm:text-sm font-semibold rounded-xl bg-blue-600 hover:bg-blue-700 text-white shadow-sm shadow-blue-500/20 active:scale-95 transition-all"
                  >
                    <Eye className="w-4 h-4" />
                    <span>Visualizar Aqui</span>
                  </button>

                  <a
                    href={item.previewUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-1.5 text-xs sm:text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors py-2 px-2"
                  >
                    <span>Abrir Tela Cheia</span>
                    <ExternalLink className="w-3.5 h-3.5 opacity-70" />
                  </a>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 px-4 bg-white dark:bg-slate-900 rounded-2xl border border-dashed border-slate-300 dark:border-slate-800 space-y-3">
            <BookOpen className="w-10 h-10 text-slate-300 dark:text-slate-600 mx-auto" />
            <h4 className="text-base font-semibold text-slate-700 dark:text-slate-200">
              Nenhum trabalho encontrado
            </h4>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              Não encontramos resultados para sua busca ou filtro atual. Tente buscar por outros termos.
            </p>
          </div>
        )}
      </main>

      {/* Modal Interativo de Visualização Direta */}
      {activeModalItem && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/80 backdrop-blur-sm transition-all"
          onClick={() => setActiveModalItem(null)}
        >
          <div
            className="relative w-full max-w-5xl bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden flex flex-col max-h-[92vh] animate-in fade-in zoom-in-95 duration-150"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Barra do Topo do Modal */}
            <div className="p-4 sm:px-6 sm:py-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50/50 dark:bg-slate-900/50">
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
                <a
                  href={activeModalItem.previewUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                  title="Abrir em Nova Aba"
                >
                  <Maximize2 className="w-4 h-4" />
                </a>

                <button
                  onClick={() => setActiveModalItem(null)}
                  className="p-2 rounded-lg text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                  title="Fechar (Esc)"
                >
                  <X className="w-5 h-5" />
                </button>
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
            <div className="p-3 sm:px-6 sm:py-3 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex items-center justify-between text-xs text-slate-500">
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
          </div>
        </div>
      )}

      {/* Rodapé */}
      <footer className="mt-auto border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 py-6 px-4 sm:px-6 transition-colors">
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
