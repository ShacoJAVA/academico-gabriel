import React, { useState, useMemo, useEffect } from 'react'
import data from './data/trabalhos.json'
import {
  FolderOpen,
  Search,
  Video,
  FileText,
  ExternalLink,
  Sun,
  Moon,
  ArrowUpRight,
  Maximize2,
  X,
  Eye,
  SlidersHorizontal,
  Bookmark
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
    <div className="min-h-screen technical-grid bg-[#F5F3EF] text-[#121212] dark:bg-[#0C0D0E] dark:text-[#E8E6E1] transition-colors duration-150 flex flex-col font-sans selection:bg-[#D9381E] selection:text-white">
      {/* Tarja Superior Industrial / Carimbo de Cabeçalho */}
      <div className="border-b border-[#121212] dark:border-[#282B30] bg-[#ECE8DF] dark:bg-[#14161A] text-[11px] font-mono tracking-wider uppercase px-4 sm:px-8 py-2 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center space-x-3">
          <span className="inline-block w-2 h-2 bg-[#D9381E]" />
          <span className="font-bold text-[#121212] dark:text-[#E8E6E1]">UFES // CEFD</span>
          <span className="text-[#666666] dark:text-[#888888] hidden sm:inline">|</span>
          <span className="text-[#666666] dark:text-[#888888] hidden sm:inline">
            ARQUIVO DE PRODUÇÃO ACADÊMICA E ENSAIOS CRÍTICOS
          </span>
        </div>

        <div className="flex items-center space-x-4">
          <span className="text-[#666666] dark:text-[#888888]">
            REGISTRO DISPONÍVEL • 2026
          </span>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="border border-[#121212] dark:border-[#444] px-2 py-0.5 hover:bg-[#121212] hover:text-white dark:hover:bg-[#E8E6E1] dark:hover:text-[#121212] transition-colors cursor-pointer flex items-center gap-1.5"
          >
            {darkMode ? (
              <>
                <Sun className="w-3 h-3 text-[#D9381E]" />
                <span>CLARO</span>
              </>
            ) : (
              <>
                <Moon className="w-3 h-3 text-[#121212]" />
                <span>ESCURO</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Cabeçalho Principal Brutalista / Editorial */}
      <header className="border-b border-[#121212] dark:border-[#282B30] bg-[#F5F3EF] dark:bg-[#0C0D0E]">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 py-10 sm:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Bloco Tipográfico Esquerdo (Editorial / Serifa Forte) */}
            <div className="lg:col-span-8 space-y-4">
              <div className="font-mono text-xs text-[#D9381E] tracking-widest uppercase flex items-center gap-2">
                <span>[ REF: UFES-EF-DOCS ]</span>
                <span className="h-px w-8 bg-[#D9381E]" />
                <span>GRADUAÇÃO EM EDUCAÇÃO FÍSICA</span>
              </div>

              <h1 className="font-editorial text-4xl sm:text-6xl lg:text-7xl leading-[1.05] tracking-tight text-[#121212] dark:text-white">
                Produções &amp; <br />
                <span className="italic font-normal">Investigações</span> Acadêmicas.
              </h1>

              <p className="font-sans text-base sm:text-lg text-[#444444] dark:text-[#A8A8A8] max-w-2xl leading-relaxed pt-2">
                {data.estudante.bio}
              </p>
            </div>

            {/* Ficha Catalográfica Lateral (Grid de 1px com Alto Contraste) */}
            <div className="lg:col-span-4 border border-[#121212] dark:border-[#282B30] bg-[#ECE8DF]/50 dark:bg-[#14161A]/50 p-5 space-y-4 shadow-[4px_4px_0px_#121212] dark:shadow-[4px_4px_0px_#D9381E]">
              <div className="border-b border-[#121212] dark:border-[#282B30] pb-2 flex items-center justify-between font-mono text-[11px] tracking-wider uppercase">
                <span className="font-bold">FICHA CATALOGRÁFICA</span>
                <span className="text-[#D9381E]">ATIVO</span>
              </div>

              <div className="space-y-2 text-xs font-mono">
                <div>
                  <span className="text-[#777777] block text-[10px]">AUTOR</span>
                  <span className="font-bold text-sm tracking-tight text-[#121212] dark:text-white">
                    {data.estudante.nome}
                  </span>
                </div>
                <div>
                  <span className="text-[#777777] block text-[10px]">INSTITUIÇÃO / CURSO</span>
                  <span>{data.estudante.instituicao}</span>
                  <span className="block text-[#D9381E]">{data.estudante.curso}</span>
                </div>
                <div className="pt-2 border-t border-[#121212]/20 dark:border-[#282B30]">
                  <span className="text-[#777777] block text-[10px]">REPOSITÓRIO BRUTO</span>
                  <a
                    href={data.estudante.driveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-[#121212] dark:text-white font-bold hover:text-[#D9381E] dark:hover:text-[#D9381E] transition-colors group mt-1"
                  >
                    <FolderOpen className="w-3.5 h-3.5 text-[#D9381E]" />
                    <span className="underline underline-offset-4">ABRIR PASTA GOOGLE DRIVE</span>
                    <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Barra de Filtros e Busca (Estilo Indexador Técnico) */}
      <section className="border-b border-[#121212] dark:border-[#282B30] bg-[#ECE8DF] dark:bg-[#111317] sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 py-3.5">
          <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
            {/* Input de Busca com Borda Nítida */}
            <div className="relative flex-1 max-w-xl">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#666666] dark:text-[#888888]" />
              <input
                type="text"
                placeholder="BUSCAR POR TERMO, MATÉRIA OU CONCEITO..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-16 py-2 bg-[#F5F3EF] dark:bg-[#0C0D0E] border border-[#121212] dark:border-[#282B30] font-mono text-xs uppercase text-[#121212] dark:text-white placeholder:text-[#888888] focus:outline-none focus:ring-1 focus:ring-[#D9381E] focus:border-[#D9381E] transition-all"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-mono text-[#D9381E] font-bold hover:underline"
                >
                  [LIMPAR]
                </button>
              )}
            </div>

            {/* Filtros em Botões Secos */}
            <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
              <span className="text-[11px] text-[#777777] uppercase flex items-center gap-1 mr-1">
                <SlidersHorizontal className="w-3 h-3 text-[#D9381E]" /> FILTRO:
              </span>

              {disciplines.map((disc, idx) => {
                const active = selectedDiscipline === disc
                return (
                  <button
                    key={disc}
                    onClick={() => setSelectedDiscipline(disc)}
                    className={`px-3 py-1.5 border transition-all cursor-pointer uppercase tracking-tight flex items-center gap-1.5 ${
                      active
                        ? 'border-[#121212] bg-[#121212] text-white dark:border-[#D9381E] dark:bg-[#D9381E] dark:text-white shadow-[2px_2px_0px_#D9381E] dark:shadow-[2px_2px_0px_#FFFFFF]'
                        : 'border-[#121212]/40 dark:border-[#333] bg-[#F5F3EF] dark:bg-[#14161A] text-[#121212] dark:text-[#A8A8A8] hover:border-[#121212] dark:hover:border-white'
                    }`}
                  >
                    <span className="text-[10px] opacity-60">0{idx + 1}.</span>
                    <span>{disc === 'TODAS' ? 'TODAS AS DISCIPLINAS' : disc}</span>
                  </button>
                )
              })}

              {/* Seletor de Formato */}
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="py-1.5 px-2 border border-[#121212]/40 dark:border-[#333] bg-[#F5F3EF] dark:bg-[#14161A] font-mono text-xs uppercase text-[#121212] dark:text-[#E8E6E1] focus:outline-none focus:border-[#D9381E] cursor-pointer"
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

      {/* Conteúdo: Lista Editorial de Trabalhos */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-8 py-10 sm:py-14 space-y-8">
        <div className="flex items-center justify-between border-b border-[#121212] dark:border-[#282B30] pb-2 font-mono text-xs text-[#666666] dark:text-[#888888] uppercase">
          <div className="flex items-center gap-2">
            <Bookmark className="w-3.5 h-3.5 text-[#D9381E]" />
            <span>
              CATÁLOGO DE PRODUÇÃO // TOTAL DE ENTRADAS: <strong>{filteredWorks.length}</strong>
            </span>
          </div>
          <span>UFES // LICENCIATURA EF</span>
        </div>

        {/* Grade de Trabalhos Brutalista */}
        {filteredWorks.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filteredWorks.map((item) => (
              <article
                key={item.id}
                className="border border-[#121212] dark:border-[#282B30] bg-[#FAF8F5] dark:bg-[#111317] flex flex-col justify-between shadow-[6px_6px_0px_#121212] dark:shadow-[6px_6px_0px_#222] hover:shadow-[8px_8px_0px_#D9381E] dark:hover:shadow-[8px_8px_0px_#D9381E] transition-all duration-150 relative group"
              >
                {/* Faixa Superior Técnica */}
                <div className="border-b border-[#121212] dark:border-[#282B30] bg-[#ECE8DF]/70 dark:bg-[#181A20] px-4 py-2.5 flex items-center justify-between font-mono text-[11px] uppercase tracking-wider">
                  <div className="flex items-center space-x-2">
                    <span className="w-2 h-2 bg-[#D9381E] inline-block" />
                    <span className="font-bold text-[#121212] dark:text-white">
                      {item.codigo}
                    </span>
                  </div>
                  <span className="px-2 py-0.5 border border-[#121212] dark:border-[#444] bg-[#F5F3EF] dark:bg-[#0C0D0E] text-[10px] font-bold text-[#D9381E]">
                    {item.formato}
                  </span>
                </div>

                {/* Corpo do Artigo */}
                <div className="p-6 space-y-4">
                  <div className="font-mono text-[11px] text-[#D9381E] uppercase tracking-widest">
                    // {item.disciplina}
                  </div>

                  <h3 className="font-editorial text-2xl sm:text-3xl text-[#121212] dark:text-white leading-tight group-hover:text-[#D9381E] dark:group-hover:text-[#D9381E] transition-colors">
                    {item.titulo}
                  </h3>

                  <p className="font-sans text-sm text-[#444444] dark:text-[#A8A8A8] leading-relaxed">
                    {item.descricao}
                  </p>

                  {/* Tags em Estilo Carimbo / Etiqueta Técnica */}
                  <div className="flex flex-wrap gap-1.5 pt-2 font-mono text-[10px]">
                    {item.tags.map((tag) => (
                      <span
                        key={tag}
                        className="border border-[#121212]/30 dark:border-[#333] px-2 py-0.5 bg-[#ECE8DF]/40 dark:bg-[#181A20] text-[#555] dark:text-[#999] uppercase"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Ações Brutalistas: Dois Botões com Alto Contraste */}
                <div className="border-t border-[#121212] dark:border-[#282B30] grid grid-cols-2 bg-[#ECE8DF] dark:bg-[#14161A] font-mono text-xs">
                  <button
                    onClick={() => setActiveModalItem(item)}
                    className="py-3 px-4 bg-[#121212] text-white dark:bg-[#E8E6E1] dark:text-[#121212] hover:bg-[#D9381E] dark:hover:bg-[#D9381E] dark:hover:text-white font-bold transition-colors cursor-pointer flex items-center justify-center gap-2 border-r border-[#121212] dark:border-[#282B30] uppercase tracking-wider"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>VISUALIZAR</span>
                  </button>

                  <a
                    href={item.previewUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-3 px-4 text-[#121212] dark:text-white hover:bg-[#D9381E] hover:text-white font-bold transition-colors flex items-center justify-center gap-1.5 uppercase tracking-wider group/link"
                  >
                    <span>TELA CHEIA</span>
                    <ArrowUpRight className="w-3.5 h-3.5 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
                  </a>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="border border-[#121212] dark:border-[#282B30] bg-[#FAF8F5] dark:bg-[#111317] p-12 text-center space-y-3 font-mono">
            <div className="text-[#D9381E] text-sm uppercase tracking-widest">
              [ NENHUM REGISTRO ENCONTRADO ]
            </div>
            <p className="text-xs text-[#777]">
              Não foram localizados trabalhos correspondentes aos critérios de busca ou disciplina selecionada.
            </p>
          </div>
        )}
      </main>

      {/* Modal Técnico de Visualização (Sem Cantos Arredondados / Moldura Técnica) */}
      {activeModalItem && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-sm"
          onClick={() => setActiveModalItem(null)}
        >
          <div
            className="w-full max-w-5xl bg-[#F5F3EF] dark:bg-[#0C0D0E] border-2 border-[#121212] dark:border-white shadow-[10px_10px_0px_#D9381E] flex flex-col max-h-[92vh] animate-in fade-in duration-100"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Barra Técnica Superior do Modal */}
            <div className="p-3 sm:px-6 bg-[#121212] text-white flex items-center justify-between font-mono text-xs uppercase">
              <div className="flex items-center space-x-2 truncate">
                <span className="w-2 h-2 bg-[#D9381E] inline-block" />
                <span className="font-bold text-[#D9381E]">{activeModalItem.codigo}</span>
                <span className="text-[#888]">|</span>
                <span className="truncate">{activeModalItem.titulo}</span>
              </div>

              <div className="flex items-center space-x-2 shrink-0">
                <a
                  href={activeModalItem.previewUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-2 py-1 bg-[#222] hover:bg-[#D9381E] transition-colors flex items-center gap-1 text-[11px]"
                  title="Abrir em Nova Aba"
                >
                  <Maximize2 className="w-3 h-3" />
                  <span className="hidden sm:inline">EXPANDIR</span>
                </a>

                <button
                  onClick={() => setActiveModalItem(null)}
                  className="px-2 py-1 bg-[#D9381E] hover:bg-[#B32610] text-white transition-colors flex items-center gap-1 text-[11px] cursor-pointer"
                  title="Fechar (Esc)"
                >
                  <X className="w-3 h-3" />
                  <span>[ESC] FECHAR</span>
                </button>
              </div>
            </div>

            {/* Container do Iframe / Player */}
            <div className="relative w-full flex-1 bg-black min-h-[50vh] sm:min-h-[68vh] border-b border-[#121212] dark:border-[#282B30]">
              <iframe
                src={activeModalItem.previewUrl}
                title={activeModalItem.titulo}
                className="w-full h-full absolute inset-0 border-0"
                allow="autoplay; fullscreen"
                allowFullScreen
              />
            </div>

            {/* Rodapé Informativo do Modal */}
            <div className="p-3 sm:px-6 bg-[#ECE8DF] dark:bg-[#14161A] flex flex-wrap items-center justify-between gap-2 font-mono text-xs">
              <div className="text-[#555] dark:text-[#999] truncate max-w-xl text-[11px]">
                {activeModalItem.descricao}
              </div>
              <a
                href={activeModalItem.directUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#D9381E] hover:underline font-bold text-[11px] flex items-center gap-1"
              >
                <span>LINK ORIGINAL DO DRIVE</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Rodapé Editorial / Manifesto */}
      <footer className="border-t border-[#121212] dark:border-[#282B30] bg-[#ECE8DF] dark:bg-[#0E1013] py-8 px-4 sm:px-8 mt-auto font-mono text-xs">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-1">
            <div className="font-bold tracking-tight text-[#121212] dark:text-white uppercase">
              {data.estudante.nome}
            </div>
            <div className="text-[#666666] dark:text-[#888888] text-[11px]">
              UNIVERSIDADE FEDERAL DO ESPÍRITO SANTO • LICENCIATURA EM EDUCAÇÃO FÍSICA
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-6 text-[11px] text-[#666666] dark:text-[#888888]">
            <a
              href={data.estudante.driveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#D9381E] transition-colors uppercase underline underline-offset-4"
            >
              PASTA COMPLETA GOOGLE DRIVE
            </a>
            <span>•</span>
            <span>PUBLICAÇÃO VIA CLOUDFLARE</span>
            <span>•</span>
            <span>2026 // ACERVO ABERTO</span>
          </div>
        </div>
      </footer>
    </div>
  )
}
