/**
 * App.jsx - Landing Page Nunes Móveis
 * 
 * Componente principal da landing page premium para Nunes Móveis
 * Implementado seguindo as tendências de design 2026 e diretrizes do BRANDING.md
 */

// Imports do React e bibliotecas
import { useState } from 'react' // Hook para gerenciar estado
import { FiStar, FiUsers, FiHome, FiAward, FiTarget, FiTool, FiCreditCard, FiClipboard } from 'react-icons/fi' // Ícones premium do Feather Icons
import './App.css' // Estilos customizados

/**
 * Componente principal da aplicação
 * Gerencia todo o estado e renderiza todas as seções da landing page
 */
function App() {
  // ============================================
  // ESTADOS (State Management)
  // ============================================
  
  // Estado para controlar qual slide do carrossel está ativo (0 = primeiro slide)
  const [currentSlide, setCurrentSlide] = useState(0)
  
  // Estado para rastrear quais imagens do carrossel falharam ao carregar
  // Usa array ao invés de Set para compatibilidade com React
  const [imageErrors, setImageErrors] = useState([])
  
  // ============================================
  // CONFIGURAÇÕES E DADOS
  // ============================================
  
  // Configuração do WhatsApp
  const whatsappNumber = '5534999002642' // Número do WhatsApp com código do país (55 = Brasil)
  const whatsappMessage = 'Olá! Gostaria de saber mais sobre móveis planejados.' // Mensagem padrão
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}` // URL completa do WhatsApp
  
  // Configuração do Google Maps
  // ATENÇÃO: Atualize o endereco e googleMapsEmbedUrl com os dados reais da empresa
  const endereco = 'Nunes Móveis, Uberaba, MG' // Endereço para busca no Google Maps
  const enderecoCompleto = 'Uberaba, MG' // Endereço formatado para exibição
  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(endereco)}` // URL para abrir no Google Maps
  // Para obter o embed URL correto:
  // 1. Acesse https://www.google.com/maps
  // 2. Procure pelo endereço da Nunes Móveis
  // 3. Clique em "Compartilhar" > "Incorporar um mapa"
  // 4. Copie o src do iframe e cole aqui
  const googleMapsEmbedUrl = 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3759.5!2d-48.2584!3d-18.9186!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTjCsDU1JzA3LjAiUyA0OMKwMTUnMzAuMyJX!5e0!3m2!1spt-BR!2sbr!4v1234567890123!5m2!1spt-BR!2sbr'

  // ============================================
  // DADOS: AMBIENTES DO CARROSSEL
  // ============================================
  // Array com os ambientes que aparecem no carrossel
  // As imagens devem estar em: public/carrossel/
  const ambientes = [
    { 
      nome: 'Cozinha', 
      descricao: 'Cozinhas planejadas com acabamento premium',
      imagem: '/carrossel/img2.png' // Caminho da imagem (formato 9:16 - vertical)
    },
    { 
      nome: 'Sala', 
      descricao: 'Salas elegantes e funcionais',
      imagem: '/carrossel/img1.png'
    },
    { 
      nome: 'Closet', 
      descricao: 'Closets organizados e personalizados',
      imagem: '/carrossel/img4.png'
    },
    { 
      nome: 'Área Gourmet', 
      descricao: 'Áreas gourmet completas e sofisticadas',
      imagem: '/carrossel/img5.png'
    },
  ]

  // ============================================
  // MAPA DE ÍCONES
  // ============================================
  // Mapeia nomes de ícones para componentes React
  // Usado para renderizar ícones dinamicamente na seção de diferenciais
  const iconMap = {
    award: FiAward,        // Ícone de prêmio/troféu
    target: FiTarget,      // Ícone de alvo/mira
    tool: FiTool,          // Ícone de ferramenta
    creditCard: FiCreditCard, // Ícone de cartão de crédito
    clipboard: FiClipboard     // Ícone de prancheta
  }

  // ============================================
  // DADOS: DIFERENCIAIS
  // ============================================
  // Array com os diferenciais da empresa
  // Cada item tem título, descrição e nome do ícone (que é mapeado no iconMap)
  const diferenciais = [
    {
      titulo: 'Materiais Premium',
      descricao: 'Materiais de alta durabilidade e acabamentos premium',
      iconName: 'award' // Referência ao iconMap
    },
    {
      titulo: 'Design Inteligente',
      descricao: 'Aproveitamento máximo do espaço com design inteligente',
      iconName: 'target'
    },
    {
      titulo: 'Montagem Profissional',
      descricao: 'Montagem precisa, feita por profissionais especializados',
      iconName: 'tool'
    },
    {
      titulo: 'Pagamento Facilitado',
      descricao: 'Condições de pagamento facilitadas',
      iconName: 'creditCard'
    },
    {
      titulo: 'Acompanhamento Completo',
      descricao: 'Acompanhamento completo em todas as etapas',
      iconName: 'clipboard'
    },
  ]

  // ============================================
  // DADOS: DEPOIMENTOS
  // ============================================
  // Array com depoimentos de clientes para prova social
  const depoimentos = [
    {
      nome: 'Maria Silva',
      cidade: 'Uberaba - MG',
      texto: 'Ficamos encantados com o resultado! A equipe da Nunes transformou nossa cozinha em um ambiente dos sonhos. Profissionalismo e qualidade impecáveis.',
      nota: 5 // Nota de 1 a 5
    },
    {
      nome: 'João Santos',
      cidade: 'Uberaba - MG',
      texto: '38 anos de experiência realmente fazem diferença. O projeto do nosso closet ficou perfeito, exatamente como planejamos. Recomendo!',
      nota: 5
    },
    {
      nome: 'Ana Costa',
      cidade: 'Uberaba - MG',
      texto: 'Atendimento excepcional desde o primeiro contato. A designer entendeu perfeitamente nossa visão e entregou além das expectativas.',
      nota: 5
    },
  ]

  // ============================================
  // FUNÇÕES DE NAVEGAÇÃO DO CARROSSEL
  // ============================================
  
  /**
   * Avança para o próximo slide do carrossel
   * Usa módulo (%) para voltar ao primeiro slide após o último
   */
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % ambientes.length)
  }

  /**
   * Volta para o slide anterior do carrossel
   * Usa módulo (%) para ir ao último slide se estiver no primeiro
   */
  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + ambientes.length) % ambientes.length)
  }

  // ============================================
  // RENDERIZAÇÃO DO COMPONENTE
  // ============================================
  return (
    <div className="min-h-screen bg-white">
      
      {/* ============================================
          SECTION 1 - HERO / PRIMEIRO CONTATO
          ============================================
          Objetivo: Gerar impacto imediato e transmitir credibilidade
          Design: Imagem de background ocupando toda a seção com overlay escuro
      */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        {/* Background com imagem do banner */}
        <div className="absolute inset-0 z-0">
          {/* Imagem de background - fotobanner1.png deve estar em public/ */}
          <img
            src="/fotobanner1.png"
            alt="Ambiente premium com móveis planejados Nunes Móveis"
            className="w-full h-full object-cover scale-105 transition-transform duration-700 ease-out"
          />
          {/* Overlay escuro para melhorar legibilidade do texto sobre a imagem */}
          <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/50 to-black/30"></div>
          {/* Overlay sutil com cor da marca para adicionar identidade visual */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#1B4B7B]/20 via-transparent to-transparent"></div>
        </div>

        {/* Container principal do conteúdo */}
        <div className="relative z-10 max-w-7xl mx-auto w-full px-4 md:px-8 lg:px-12 py-12 md:py-20">
          <div className="max-w-4xl">
            {/* Conteúdo principal */}
            <div className="space-y-10 md:space-y-12">
              
              {/* Título principal - Hierarquia visual forte e premium */}
              <div className="space-y-6 md:space-y-8">
                <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold leading-[1.1] tracking-tight">
                  {/* Destaque para "38 anos" com background premium e efeito de brilho */}
                  <span className="inline-block mb-3 md:mb-4 px-6 md:px-8 py-2 md:py-3 bg-gradient-to-r from-[#1B4B7B]/20 via-[#2a6ba8]/25 to-[#1B4B7B]/20 backdrop-blur-sm border-2 border-[#1B4B7B]/40 rounded-2xl shadow-[0_4px_20px_rgba(27,75,123,0.3)] font-extrabold">
                    <span className="bg-gradient-to-r from-[#1B4B7B] via-[#2a6ba8] to-[#1B4B7B] bg-clip-text text-transparent drop-shadow-[0_2px_8px_rgba(27,75,123,0.5)]">
                      38 anos
                    </span>
                  </span>
                  {/* Resto do título com sombra premium e contraste elevado */}
                  <span className="block text-white font-bold drop-shadow-[0_4px_20px_rgba(0,0,0,0.8)] [text-shadow:_2px_2px_8px_rgba(0,0,0,0.9)]">
                    transformando ambientes com móveis planejados de alto padrão.
                  </span>
                </h1>
                
                {/* Texto de apoio - Copy premium com tipografia refinada */}
                <div className="relative">
                  {/* Linha decorativa sutil antes do texto */}
                  <div className="absolute -left-4 md:-left-6 top-0 bottom-0 w-1 bg-gradient-to-b from-[#1B4B7B]/60 via-[#1B4B7B]/40 to-transparent rounded-full"></div>
                  <p className="text-lg md:text-xl lg:text-2xl text-white/95 leading-relaxed max-w-3xl font-light pl-6 md:pl-8 drop-shadow-[0_2px_12px_rgba(0,0,0,0.7)] [text-shadow:_1px_1px_4px_rgba(0,0,0,0.8)]">
                    Mais que móveis: o cenário do seu próximo capítulo, com foco em quem busca excelência, pontualidade e facilidade na hora de planejar.
                  </p>
                </div>
              </div>

              {/* Badges de credibilidade - Grid responsivo */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Badge 1: Experiência */}
                <div className="group flex items-start gap-4 bg-white/90 backdrop-blur-md border border-white/20 rounded-2xl px-6 py-5 shadow-xl hover:bg-white/95 hover:shadow-2xl transition-all duration-300 hover:scale-[1.02]">
                  {/* Ícone em círculo com cor da marca */}
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#1B4B7B]/10 flex items-center justify-center group-hover:bg-[#1B4B7B]/20 transition-colors">
                    <FiStar className="w-6 h-6 text-[#1B4B7B]" />
                  </div>
                  <div>
                    <p className="text-neutral-800 font-semibold text-base leading-snug">
                      Especialista em móveis planejados há mais de 38 anos.
                    </p>
                  </div>
                </div>
                
                {/* Badge 2: Atendimento especializado */}
                <div className="group flex items-start gap-4 bg-white/90 backdrop-blur-md border border-white/20 rounded-2xl px-6 py-5 shadow-xl hover:bg-white/95 hover:shadow-2xl transition-all duration-300 hover:scale-[1.02]">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#1B4B7B]/10 flex items-center justify-center group-hover:bg-[#1B4B7B]/20 transition-colors">
                    <FiUsers className="w-6 h-6 text-[#1B4B7B]" />
                  </div>
                  <div>
                    <p className="text-neutral-800 font-semibold text-base leading-snug">
                      Atendimento personalizado e direto com designers de interiores.
                    </p>
                  </div>
                </div>
              </div>

              {/* CTAs (Call to Actions) - Botões principais */}
              <div className="flex flex-col sm:flex-row gap-4 pt-2">
                {/* CTA Principal: WhatsApp */}
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center justify-center gap-3 bg-[#1B4B7B] text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-[#153a5f] transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-1 hover:scale-105"
                >
                  {/* Ícone do WhatsApp */}
                  <svg className="w-6 h-6 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                  </svg>
                  Fale com uma designer
                </a>
                
                {/* CTA Secundário: Ver Projetos */}
                <a
                  href="#diferenciais"
                  className="group inline-flex items-center justify-center gap-3 bg-white backdrop-blur-md border-2 border-white text-[#1B4B7B] px-8 py-4 rounded-xl font-semibold text-lg hover:bg-[#1B4B7B] hover:text-white hover:border-[#1B4B7B] transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-1 hover:scale-105"
                >
                  <span className="drop-shadow-sm">Ver Diferenciais</span>
                  {/* Ícone de seta animada */}
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================
          SECTION 2 - DIFERENCIAIS
          ============================================
          Objetivo: Justificar racionalmente a escolha pela Nunes
          Design: Cards minimalistas com ícones lineares em azul #1B4B7B
      */}
      <section id="diferenciais" className="py-24 md:py-32 px-4 bg-gradient-to-b from-white via-neutral-50/30 to-white relative overflow-hidden">
        {/* Elemento decorativo sutil de fundo */}
        <div className="absolute inset-0 opacity-[0.02]">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#1B4B7B] rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#1B4B7B] rounded-full blur-3xl"></div>
        </div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          {/* Título da seção - Design premium */}
          <div className="text-center mb-16 md:mb-20">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-neutral-900 mb-6 leading-tight tracking-tight">
              <span className="bg-gradient-to-r from-neutral-900 via-neutral-800 to-neutral-900 bg-clip-text text-transparent">
                Diferenciais que transformam
              </span>
              <br />
              <span className="text-[#1B4B7B]">a Nunes na melhor escolha.</span>
            </h2>
            {/* Linha decorativa sutil */}
            <div className="flex items-center justify-center gap-4 mt-8">
              <div className="h-px w-16 bg-gradient-to-r from-transparent to-[#1B4B7B]/30"></div>
              <div className="w-2 h-2 rounded-full bg-[#1B4B7B]"></div>
              <div className="h-px w-16 bg-gradient-to-l from-transparent to-[#1B4B7B]/30"></div>
            </div>
          </div>

          {/* Grid de cards com diferenciais - Design premium */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
            {diferenciais.map((diferencial, index) => {
              // Obtém o componente de ícone do mapa
              const IconComponent = iconMap[diferencial.iconName]
              
              // Se o ícone não existir, não renderiza o card (segurança)
              if (!IconComponent) {
                return null
              }
              
              return (
                <div
                  key={index}
                  className="group relative bg-white p-8 rounded-2xl border border-neutral-200/80 hover:border-[#1B4B7B]/40 transition-all duration-500 shadow-sm hover:shadow-2xl transform hover:-translate-y-2 overflow-hidden"
                >
                  {/* Efeito de brilho sutil no hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-[#1B4B7B]/0 via-[#1B4B7B]/0 to-[#1B4B7B]/0 group-hover:from-[#1B4B7B]/5 group-hover:via-transparent group-hover:to-transparent transition-all duration-500 pointer-events-none"></div>
                  
                  {/* Container do ícone com círculo de fundo premium */}
                  <div className="relative z-10 w-16 h-16 rounded-2xl bg-gradient-to-br from-[#1B4B7B]/10 to-[#1B4B7B]/5 flex items-center justify-center mb-6 group-hover:from-[#1B4B7B]/20 group-hover:to-[#1B4B7B]/10 group-hover:scale-110 transition-all duration-500 shadow-lg group-hover:shadow-xl">
                    <IconComponent className="w-8 h-8 text-[#1B4B7B] group-hover:scale-110 transition-transform duration-500" />
                  </div>
                  
                  {/* Título do diferencial */}
                  <h3 className="relative z-10 text-xl md:text-2xl font-bold text-neutral-900 mb-3 group-hover:text-[#1B4B7B] transition-colors duration-300">
                    {diferencial.titulo}
                  </h3>
                  
                  {/* Descrição do diferencial */}
                  <p className="relative z-10 text-neutral-600 leading-relaxed text-base group-hover:text-neutral-700 transition-colors duration-300">
                    {diferencial.descricao}
                  </p>
                  
                  {/* Linha decorativa no hover */}
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#1B4B7B]/0 to-transparent group-hover:via-[#1B4B7B] transition-all duration-500"></div>
                </div>
              )
            })}
          </div>

          {/* CTA da seção - Design premium */}
          <div className="text-center mt-16 md:mt-20">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center justify-center gap-3 bg-gradient-to-r from-[#1B4B7B] to-[#153a5f] text-white px-10 py-4 rounded-xl font-semibold text-lg hover:from-[#153a5f] hover:to-[#1B4B7B] transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-1 hover:scale-105"
            >
              <span>Solicitar orçamento personalizado</span>
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* ============================================
          SECTION 3 - PROVA SOCIAL
          ============================================
          Objetivo: Mostrar credibilidade por meio de clientes reais
          Elementos: Depoimentos, fotos dos ambientes, nota média
      */}
      <section className="py-20 px-4 bg-neutral-50">
        <div className="max-w-7xl mx-auto">
          {/* Cabeçalho da seção */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
              Clientes satisfeitos são nossa maior prova de qualidade.
            </h2>
            <p className="text-lg text-neutral-600 max-w-3xl mx-auto">
              Ao longo de quase quatro décadas, entregamos centenas de projetos residenciais e corporativos, sempre com alta precisão, estética e pontualidade. Veja o que nossos clientes dizem sobre a experiência com a Nunes:
            </p>
            
            {/* Nota média destacada */}
            <div className="mt-6 flex items-center justify-center gap-2">
              <span className="text-3xl font-bold text-[#1B4B7B]">4.9</span>
              <div className="flex text-yellow-400">
                {'★'.repeat(5)} {/* 5 estrelas */}
              </div>
              <span className="text-neutral-600">/ 5</span>
            </div>
          </div>

          {/* Grid de depoimentos */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {depoimentos.map((depoimento, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-xl shadow-md border border-neutral-200 hover:shadow-lg transition-shadow duration-300"
              >
                {/* Estrelas de avaliação */}
                <div className="flex items-center gap-1 mb-4 text-yellow-400">
                  {'★'.repeat(depoimento.nota)}
                </div>
                
                {/* Texto do depoimento */}
                <p className="text-neutral-700 mb-4 leading-relaxed italic">"{depoimento.texto}"</p>
                
                {/* Informações do cliente */}
                <div className="border-t border-neutral-200 pt-4">
                  <p className="font-semibold text-neutral-900">{depoimento.nome}</p>
                  <p className="text-sm text-neutral-600">{depoimento.cidade}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================
          SECTION 4 - CARROSSEL + CONEXÃO EMOCIONAL
          ============================================
          Objetivo: Criar desejo pelo resultado final
          Elemento visual: Carrossel com ambientes premium (9:16 - vertical)
      */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          {/* Cabeçalho da seção */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
              Vamos transformar seu ambiente?
            </h2>
            <p className="text-lg text-neutral-600 max-w-3xl mx-auto">
              Fale agora com uma de nossas designers de interiores e comece a planejar um espaço que reflete seu estilo, com qualidade, precisão e entrega garantida.
            </p>
          </div>

          {/* Carrossel de ambientes */}
          <div className="relative max-w-md mx-auto mb-12">
            {/* Container do carrossel com proporção 9:16 (vertical) */}
            <div className="relative overflow-hidden rounded-2xl bg-neutral-100 aspect-[9/16]">
              {/* Container dos slides com animação de transição */}
              <div
                className="flex transition-transform duration-500 ease-in-out h-full"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                {/* Mapeia cada ambiente e cria um slide */}
                {ambientes.map((ambiente, index) => (
                  <div
                    key={index}
                    className="min-w-full relative h-full bg-gradient-to-br from-blue-50 via-neutral-100 to-blue-50"
                  >
                    {/* Se a imagem não falhou ao carregar, mostra a imagem */}
                    {!imageErrors.includes(index) ? (
                      <img
                        src={ambiente.imagem}
                        alt={ambiente.nome}
                        className="w-full h-full object-cover object-center"
                        onError={() => {
                          // Se a imagem falhar, adiciona o índice ao array de erros
                          setImageErrors(prev => [...prev, index])
                        }}
                      />
                    ) : (
                      // Placeholder caso a imagem não carregue
                      <div className="absolute inset-0 flex items-center justify-center p-12">
                        <div className="text-center">
                          <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-[#1B4B7B]/10 flex items-center justify-center">
                            <FiHome className="w-12 h-12 text-[#1B4B7B]" />
                          </div>
                          <h3 className="text-3xl font-bold text-neutral-800 mb-2">{ambiente.nome}</h3>
                          <p className="text-neutral-600 text-lg">{ambiente.descricao}</p>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Botão de navegação: Slide anterior */}
            <button
              onClick={prevSlide}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-neutral-800 p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110"
              aria-label="Slide anterior"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            
            {/* Botão de navegação: Próximo slide */}
            <button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-neutral-800 p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110"
              aria-label="Próximo slide"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>

            {/* Indicadores de slide (dots) */}
            <div className="flex justify-center gap-2 mt-4">
              {ambientes.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    index === currentSlide ? 'w-8 bg-[#1B4B7B]' : 'w-2 bg-neutral-300'
                  }`}
                  aria-label={`Ir para slide ${index + 1}`}
                />
              ))}
            </div>
          </div>

          {/* CTA da seção */}
          <div className="text-center">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-[#1B4B7B] text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-[#153a5f] transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              Comece seu projeto com a gente
            </a>
          </div>
        </div>
      </section>

      {/* ============================================
          SECTION 5 - GOOGLE MAPS
          ============================================
          Objetivo: Mostrar localização e facilitar visita
          Funcionalidade: Mapa clicável que abre no Google Maps
      */}
      <section className="py-20 px-4 bg-neutral-50">
        <div className="max-w-6xl mx-auto">
          {/* Cabeçalho da seção */}
          <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 text-center mb-4">
            Venha nos visitar
          </h2>
          <p className="text-lg text-neutral-600 text-center mb-12 max-w-2xl mx-auto">
            Estamos prontos para recebê-lo e apresentar nossos projetos de móveis planejados.
          </p>

          {/* Container do mapa */}
          <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-neutral-200 group">
            {/* Iframe do Google Maps Embed */}
            <iframe
              src={googleMapsEmbedUrl}
              width="100%"
              height="500"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-[500px] md:h-[600px]"
              title="Localização Nunes Móveis"
            />
            
            {/* Botão flutuante para abrir no Google Maps */}
            <a
              href={googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="absolute bottom-4 right-4 bg-white/95 backdrop-blur-sm px-6 py-4 rounded-xl shadow-lg border border-[#1B4B7B]/20 hover:scale-105 transition-transform duration-300 hover:bg-white z-10"
            >
              <div className="flex items-center gap-3">
                {/* Ícone de localização */}
                <svg className="w-6 h-6 text-[#1B4B7B]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span className="font-semibold text-[#1B4B7B]">Abrir no Google Maps</span>
                {/* Ícone de link externo */}
                <svg className="w-5 h-5 text-[#1B4B7B]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </div>
            </a>
          </div>

          {/* Informações de endereço abaixo do mapa */}
          <div className="mt-8 text-center">
            <p className="text-neutral-700 font-medium mb-2">
              <span className="text-[#1B4B7B]">📍</span> {enderecoCompleto}
            </p>
            <p className="text-sm text-neutral-600">
              Clique no mapa para ver a localização completa no Google Maps
            </p>
          </div>
        </div>
      </section>

      {/* ============================================
          SECTION 6 - RODAPÉ
          ============================================
          Elementos: Logo, WhatsApp, informações de contato
      */}
      <footer className="bg-neutral-900 text-white py-12 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Grid de informações do rodapé */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            {/* Coluna 1: Sobre a empresa */}
            <div>
              <h3 className="text-xl font-bold mb-4">Nunes Móveis</h3>
              <p className="text-neutral-400">
                38 anos transformando ambientes com móveis planejados de alto padrão.
              </p>
            </div>

            {/* Coluna 2: Contato */}
            <div>
              <h3 className="text-xl font-bold mb-4">Contato</h3>
              <div className="space-y-2 text-neutral-400">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:text-white transition-colors"
                >
                  {/* Ícone do WhatsApp */}
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                  </svg>
                  WhatsApp: (34) 99900-2642
                </a>
              </div>
            </div>

            {/* Coluna 3: Atendimento */}
            <div>
              <h3 className="text-xl font-bold mb-4">Atendimento</h3>
              <p className="text-neutral-400">
                Atendimento realizado por designers de interiores especializados.
              </p>
            </div>
          </div>

          {/* Copyright */}
          <div className="border-t border-neutral-800 pt-8 text-center text-neutral-400 text-sm">
            <p>&copy; {new Date().getFullYear()} Nunes Móveis. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>

      {/* ============================================
          BOTÃO FLUTUANTE DO WHATSAPP
          ============================================
          Posição: Fixo no canto inferior direito
          Funcionalidade: Abre WhatsApp diretamente
      */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 bg-[#25D366] text-white p-4 rounded-full shadow-2xl hover:bg-[#20BA5A] transition-all duration-300 z-50 hover:scale-110 group"
        aria-label="Fale conosco no WhatsApp"
      >
        {/* Ícone do WhatsApp */}
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
        </svg>
        {/* Tooltip que aparece no hover */}
        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
          Fale conosco
        </span>
      </a>
    </div>
  )
}

// Exporta o componente como padrão
export default App
