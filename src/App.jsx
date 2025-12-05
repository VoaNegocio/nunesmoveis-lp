/**
 * App.jsx - Landing Page Nunes Móveis
 * 
 * Componente principal da landing page premium para Nunes Móveis
 * Implementado seguindo as tendências de design 2026 e diretrizes do BRANDING.md
 */

// Imports do React e bibliotecas
import { useState, useEffect } from 'react' // Hooks para gerenciar estado e efeitos
import { FiStar, FiUsers, FiHome, FiAward, FiTarget, FiTool, FiCreditCard, FiClipboard } from 'react-icons/fi' // Ícones premium do Feather Icons
import GalleryModal from './GalleryModal' // Componente do modal da galeria
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
  
  // Estado para armazenar reviews do Google
  const [googleReviews, setGoogleReviews] = useState([])
  const [googleRating, setGoogleRating] = useState(4.9) // Nota média do Google
  const [isLoadingReviews, setIsLoadingReviews] = useState(false)
  
  // Estado para galeria com modal (Seção 2) - Sistema de Tabs
  const [activeTab, setActiveTab] = useState('banheiro') // Tab ativa: 'banheiro', 'sala', 'cozinha'
  
  // Estados para cada categoria de galeria
  const [banheiroCurrentIndex, setBanheiroCurrentIndex] = useState(0)
  const [banheiroSelectedIndex, setBanheiroSelectedIndex] = useState(null)
  
  const [salaCurrentIndex, setSalaCurrentIndex] = useState(0)
  const [salaSelectedIndex, setSalaSelectedIndex] = useState(null)
  
  const [cozinhaCurrentIndex, setCozinhaCurrentIndex] = useState(0)
  const [cozinhaSelectedIndex, setCozinhaSelectedIndex] = useState(null)
  
  // Estado para modal do carrossel de ambientes (Seção 4)
  const [selectedAmbienteIndex, setSelectedAmbienteIndex] = useState(null) // Índice do ambiente selecionado no modal
  const [ambienteModalIndex, setAmbienteModalIndex] = useState(0) // Índice atual no modal de ambientes
  
  // Estado para carrossel de depoimentos (Seção 3 - Mobile)
  const [depoimentoSlide, setDepoimentoSlide] = useState(0) // Índice atual do carrossel de depoimentos
  
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
  const enderecoCompleto = 'Av. Niza Marquez Guaritá, 528 - Conj. Manoel Mendes, Uberaba - MG' // Endereço formatado para exibição
  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(endereco)}` // URL para abrir no Google Maps
  // Para obter o embed URL correto:
  // 1. Acesse https://www.google.com/maps
  // 2. Procure pelo endereço da Nunes Móveis
  // 3. Clique em "Compartilhar" > "Incorporar um mapa"
  // 4. Copie o src do iframe e cole aqui
  const googleMapsEmbedUrl = 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7509.839827059201!2d-47.89959263201268!3d-19.75855692625126!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94bacf94f5726321%3A0x388b157581986cf0!2sAv.%20Niza%20Marquez%20Guarit%C3%A1%2C%20528%20-%20Conj.%20Manoel%20Mendes%2C%20Uberaba%20-%20MG%2C%2038082-669!5e0!3m2!1spt-BR!2sbr!4v1764878550346!5m2!1spt-BR!2sbr'
  
  // ============================================
  // CONFIGURAÇÃO: GOOGLE REVIEWS API
  // ============================================
  // IMPORTANTE: Para usar a API do Google Places, você precisa:
  // 1. Obter o Place ID do seu negócio no Google Maps
  // 2. Criar uma API Key no Google Cloud Console
  // 3. Habilitar a API "Places API" no Google Cloud Console
  // 4. Por segurança, crie um backend proxy para não expor a API Key no frontend
  // 
  // Para obter o Place ID:
  // 1. Acesse https://www.google.com/maps
  // 2. Procure pelo seu negócio
  // 3. Clique no negócio e copie o Place ID da URL ou use o Place ID Finder do Google
  //
  // Exemplo de Place ID: ChIJN1t_tDeuEmsRUsoyG83frY4
  const googlePlaceId = '' // COLE O PLACE ID AQUI (ex: 'ChIJN1t_tDeuEmsRUsoyG83frY4')
  
  // IDs das reviews específicas que você quer exibir (opcional)
  // Se vazio, exibirá as primeiras reviews retornadas pela API
  // Para obter os IDs, você precisa fazer uma chamada à API primeiro
  const selectedReviewIds = [] // Exemplo: ['review_id_1', 'review_id_2', 'review_id_3']
  
  // URL do backend proxy (recomendado por segurança)
  // Crie um endpoint no seu backend que faça a chamada à API do Google
  // Exemplo: '/api/google-reviews?placeId=...'
  // eslint-disable-next-line no-unused-vars
  const backendProxyUrl = '/api/google-reviews' // Ajuste conforme seu backend (será usado quando a API for integrada)

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
  // DADOS: VÍDEO DA SECTION 4 (OPCIONAL)
  // ============================================
  // URL do vídeo para a Section 4 (Carrossel de Ambientes)
  // Se definido, o vídeo será exibido ao invés do carrossel
  // Suporta: YouTube, Vimeo, ou arquivos locais (MP4, WebM, etc)
  // Formato YouTube: 'https://www.youtube.com/watch?v=VIDEO_ID' ou 'https://youtu.be/VIDEO_ID'
  // Formato Vimeo: 'https://vimeo.com/VIDEO_ID'
  // Arquivo local: '/video-nunes-moveis-lp.mp4' (colocar na pasta public/)
  const section4Video = '/video-nunes-moveis-lp.mp4' // Vídeo da Nunes Móveis - Section 4
  
  // Função para detectar tipo de vídeo e retornar URL formatada (Section 4)
  const getSection4VideoEmbedUrl = (videoUrl) => {
    if (!videoUrl) return null
    
    // Remove fragmentos (#) da URL antes de processar
    const cleanUrl = videoUrl.split('#')[0]
    
    // YouTube - formato youtu.be
    if (cleanUrl.includes('youtu.be/')) {
      const videoId = cleanUrl.split('youtu.be/')[1].split('?')[0]
      return `https://www.youtube.com/embed/${videoId}`
    }
    
    // YouTube - formato youtube.com/watch
    if (cleanUrl.includes('youtube.com/watch')) {
      const videoId = cleanUrl.split('v=')[1].split('&')[0].split('#')[0]
      return `https://www.youtube.com/embed/${videoId}`
    }
    
    // YouTube - já está em formato embed
    if (cleanUrl.includes('youtube.com/embed')) {
      return cleanUrl.split('#')[0]
    }
    
    // Vimeo - formato vimeo.com
    if (cleanUrl.includes('vimeo.com/')) {
      const videoId = cleanUrl.split('vimeo.com/')[1].split('?')[0].split('#')[0]
      return `https://player.vimeo.com/video/${videoId}`
    }
    
    // Vimeo - já está em formato player
    if (cleanUrl.includes('player.vimeo.com')) {
      return cleanUrl.split('#')[0]
    }
    
    // Arquivo local ou outro formato - retorna como está
    return videoUrl
  }
  
  // Função para detectar se é vídeo embed (YouTube/Vimeo) ou arquivo (Section 4)
  const isSection4EmbedVideo = (videoUrl) => {
    if (!videoUrl) return false
    return videoUrl.includes('youtube.com/embed') || 
           videoUrl.includes('player.vimeo.com') ||
           videoUrl.includes('youtu.be') ||
           videoUrl.includes('youtube.com/watch') ||
           videoUrl.includes('vimeo.com/')
  }

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
    clipboard: FiClipboard,     // Ícone de prancheta
    users: FiUsers         // Ícone de usuários/atendimento
  }

  // ============================================
  // DADOS: DIFERENCIAIS
  // ============================================
  // Array com os diferenciais da empresa (reduzido - apenas atendimento com design de interiores)
  const diferenciais = [
    {
      titulo: 'Atendimento com Design de Interiores',
      descricao: 'Atendimento realizado por designers de interiores especializados, transformando seu projeto em uma experiência exclusiva e personalizada',
      iconName: 'users' // Referência ao iconMap
    },
  ]
  
  // ============================================
  // DADOS: GALERIA DE IMAGENS POR CATEGORIA
  // ============================================
  // Arrays com as imagens de cada categoria
  // Estrutura esperada: public/banheiro/, public/sala/, public/cozinha/
  const banheiroImagens = [
    { 
      src: '/banheiro/img1.jpg', 
      alt: 'Projeto de móveis planejados - Banheiro',
      nome: 'Banheiro'
    },
    { 
      src: '/banheiro/img2.jpg', 
      alt: 'Projeto de móveis planejados - Banheiro',
      nome: 'Banheiro'
    },
    { 
      src: '/banheiro/img3.jpg', 
      alt: 'Projeto de móveis planejados - Banheiro',
      nome: 'Banheiro'
    },
  ]
  
  const salaImagens = [
    { 
      src: '/sala/sala1.jpg', 
      alt: 'Projeto de móveis planejados - Sala',
      nome: 'Sala'
    },
    { 
      src: '/sala/sala2.jpg', 
      alt: 'Projeto de móveis planejados - Sala',
      nome: 'Sala'
    },
    { 
      src: '/sala/sala3.jpg', 
      alt: 'Projeto de móveis planejados - Sala',
      nome: 'Sala'
    },
  ]
  
  const cozinhaImagens = [
    { 
      src: '/cozinha/cozinha1.jpg', 
      alt: 'Projeto de móveis planejados - Cozinha',
      nome: 'Cozinha'
    },
    { 
      src: '/cozinha/cozinha2.jpg', 
      alt: 'Projeto de móveis planejados - Cozinha',
      nome: 'Cozinha'
    },
    { 
      src: '/cozinha/cozinha3.jpg', 
      alt: 'Projeto de móveis planejados - Cozinha',
      nome: 'Cozinha'
    },
  ]
  
  // ============================================
  // DADOS: VÍDEOS POR CATEGORIA (OPCIONAL)
  // ============================================
  // URLs de vídeos para cada categoria
  // Se definido, o vídeo será exibido ao invés do carrossel
  // Suporta: YouTube, Vimeo, ou arquivos locais (MP4, WebM, etc)
  // Formato YouTube: 'https://www.youtube.com/embed/VIDEO_ID' ou 'https://youtu.be/VIDEO_ID'
  // Formato Vimeo: 'https://player.vimeo.com/video/VIDEO_ID'
  // Arquivo local: '/videos/nome-do-video.mp4'
  const banheiroVideo = null // Exemplo: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
  const salaVideo = null // Exemplo: 'https://player.vimeo.com/video/123456789'
  const cozinhaVideo = null // Exemplo: '/videos/cozinha.mp4'
  
  // Função para obter vídeo da categoria ativa
  const getActiveVideo = () => {
    switch(activeTab) {
      case 'banheiro': return banheiroVideo
      case 'sala': return salaVideo
      case 'cozinha': return cozinhaVideo
      default: return null
    }
  }
  
  // Função para detectar tipo de vídeo e retornar URL formatada
  const getVideoEmbedUrl = (videoUrl) => {
    if (!videoUrl) return null
    
    // Remove fragmentos (#) da URL antes de processar
    const cleanUrl = videoUrl.split('#')[0]
    
    // YouTube - formato youtu.be
    if (cleanUrl.includes('youtu.be/')) {
      const videoId = cleanUrl.split('youtu.be/')[1].split('?')[0]
      return `https://www.youtube.com/embed/${videoId}`
    }
    
    // YouTube - formato youtube.com/watch
    if (cleanUrl.includes('youtube.com/watch')) {
      const videoId = cleanUrl.split('v=')[1].split('&')[0].split('#')[0]
      return `https://www.youtube.com/embed/${videoId}`
    }
    
    // YouTube - já está em formato embed
    if (cleanUrl.includes('youtube.com/embed')) {
      return cleanUrl.split('#')[0]
    }
    
    // Vimeo - formato vimeo.com
    if (cleanUrl.includes('vimeo.com/')) {
      const videoId = cleanUrl.split('vimeo.com/')[1].split('?')[0].split('#')[0]
      return `https://player.vimeo.com/video/${videoId}`
    }
    
    // Vimeo - já está em formato player
    if (cleanUrl.includes('player.vimeo.com')) {
      return cleanUrl.split('#')[0]
    }
    
    // Arquivo local ou outro formato - retorna como está
    return videoUrl
  }
  
  // Função para detectar se é vídeo embed (YouTube/Vimeo) ou arquivo
  const isEmbedVideo = (videoUrl) => {
    if (!videoUrl) return false
    return videoUrl.includes('youtube.com/embed') || 
           videoUrl.includes('player.vimeo.com') ||
           videoUrl.includes('youtu.be') ||
           videoUrl.includes('youtube.com/watch') ||
           videoUrl.includes('vimeo.com/')
  }
  
  // Função para obter imagens da categoria ativa
  const getActiveImages = () => {
    switch(activeTab) {
      case 'banheiro': return banheiroImagens
      case 'sala': return salaImagens
      case 'cozinha': return cozinhaImagens
      default: return banheiroImagens
    }
  }
  
  // Função para obter índice atual da categoria ativa
  const getActiveCurrentIndex = () => {
    switch(activeTab) {
      case 'banheiro': return banheiroCurrentIndex
      case 'sala': return salaCurrentIndex
      case 'cozinha': return cozinhaCurrentIndex
      default: return 0
    }
  }
  
  // Função para obter índice selecionado da categoria ativa
  const getActiveSelectedIndex = () => {
    switch(activeTab) {
      case 'banheiro': return banheiroSelectedIndex
      case 'sala': return salaSelectedIndex
      case 'cozinha': return cozinhaSelectedIndex
      default: return null
    }
  }
  
  // Funções para navegação - Banheiro
  const nextBanheiro = () => {
    setBanheiroCurrentIndex((prev) => (prev + 1) % banheiroImagens.length)
  }
  const prevBanheiro = () => {
    setBanheiroCurrentIndex((prev) => (prev - 1 + banheiroImagens.length) % banheiroImagens.length)
  }
  const openBanheiroModal = (index) => {
    setBanheiroSelectedIndex(index)
    setBanheiroCurrentIndex(index)
  }
  const closeBanheiroModal = () => {
    setBanheiroSelectedIndex(null)
  }
  
  // Funções para navegação - Sala
  const nextSala = () => {
    setSalaCurrentIndex((prev) => (prev + 1) % salaImagens.length)
  }
  const prevSala = () => {
    setSalaCurrentIndex((prev) => (prev - 1 + salaImagens.length) % salaImagens.length)
  }
  const openSalaModal = (index) => {
    setSalaSelectedIndex(index)
    setSalaCurrentIndex(index)
  }
  const closeSalaModal = () => {
    setSalaSelectedIndex(null)
  }
  
  // Funções para navegação - Cozinha
  const nextCozinha = () => {
    setCozinhaCurrentIndex((prev) => (prev + 1) % cozinhaImagens.length)
  }
  const prevCozinha = () => {
    setCozinhaCurrentIndex((prev) => (prev - 1 + cozinhaImagens.length) % cozinhaImagens.length)
  }
  const openCozinhaModal = (index) => {
    setCozinhaSelectedIndex(index)
    setCozinhaCurrentIndex(index)
  }
  const closeCozinhaModal = () => {
    setCozinhaSelectedIndex(null)
  }
  
  // Funções genéricas para modal baseadas na tab ativa
  const openActiveModal = (index) => {
    switch(activeTab) {
      case 'banheiro': return openBanheiroModal(index)
      case 'sala': return openSalaModal(index)
      case 'cozinha': return openCozinhaModal(index)
      default: return
    }
  }
  
  const closeActiveModal = () => {
    switch(activeTab) {
      case 'banheiro': return closeBanheiroModal()
      case 'sala': return closeSalaModal()
      case 'cozinha': return closeCozinhaModal()
      default: return
    }
  }
  
  const nextActiveImage = () => {
    switch(activeTab) {
      case 'banheiro': return nextBanheiro()
      case 'sala': return nextSala()
      case 'cozinha': return nextCozinha()
      default: return
    }
  }
  
  const prevActiveImage = () => {
    switch(activeTab) {
      case 'banheiro': return prevBanheiro()
      case 'sala': return prevSala()
      case 'cozinha': return prevCozinha()
      default: return
    }
  }
  
  const setActiveCurrentIndex = (index) => {
    switch(activeTab) {
      case 'banheiro': return setBanheiroCurrentIndex(index)
      case 'sala': return setSalaCurrentIndex(index)
      case 'cozinha': return setCozinhaCurrentIndex(index)
      default: return
    }
  }
  
  // Funções para modal do carrossel de ambientes (Seção 4)
  const openAmbienteModal = (index) => {
    setSelectedAmbienteIndex(index)
    setAmbienteModalIndex(index)
  }
  
  const closeAmbienteModal = () => {
    setSelectedAmbienteIndex(null)
  }
  
  const nextAmbienteModal = () => {
    setAmbienteModalIndex((prev) => (prev + 1) % ambientes.length)
  }
  
  const prevAmbienteModal = () => {
    setAmbienteModalIndex((prev) => (prev - 1 + ambientes.length) % ambientes.length)
  }
  
  // Funções para navegação do carrossel de depoimentos (Mobile)
  const nextDepoimento = () => {
    setDepoimentoSlide((prev) => (prev + 1) % depoimentos.length)
  }
  
  const prevDepoimento = () => {
    setDepoimentoSlide((prev) => (prev - 1 + depoimentos.length) % depoimentos.length)
  }
  
  // Converter ambientes para formato do modal
  const ambientesParaModal = ambientes.map(ambiente => ({
    src: ambiente.imagem,
    alt: ambiente.descricao,
    nome: ambiente.nome
  }))

  // ============================================
  // DADOS: DEPOIMENTOS (FALLBACK)
  // ============================================
  // Array com depoimentos de clientes para prova social (usado como fallback)
  // Se as reviews do Google estiverem disponíveis, elas terão prioridade
  const depoimentosFallback = [
    {
      nome: 'Maria Silva',
      cidade: 'Uberaba - MG',
      texto: 'Ficamos encantados com o resultado! A equipe da Nunes transformou nossa cozinha em um ambiente dos sonhos. Profissionalismo e qualidade impecáveis.',
      nota: 5, // Nota de 1 a 5
      data: '2024-01-15',
      foto: null
    },
    {
      nome: 'João Santos',
      cidade: 'Uberaba - MG',
      texto: '38 anos de experiência realmente fazem diferença. O projeto do nosso closet ficou perfeito, exatamente como planejamos. Recomendo!',
      nota: 5,
      data: '2024-02-20',
      foto: null
    },
    {
      nome: 'Ana Costa',
      cidade: 'Uberaba - MG',
      texto: 'Atendimento excepcional desde o primeiro contato. A designer entendeu perfeitamente nossa visão e entregou além das expectativas.',
      nota: 5,
      data: '2024-03-10',
      foto: null
    },
  ]

  // ============================================
  // FUNÇÕES: GOOGLE REVIEWS API
  // ============================================
  
  /**
   * Busca reviews do Google Places API
   * IMPORTANTE: Esta função deve ser chamada através de um backend proxy
   * para não expor a API Key no frontend
   */
  const fetchGoogleReviews = async () => {
    // Se não houver Place ID configurado, não faz nada
    if (!googlePlaceId) {
      console.log('Place ID não configurado. Usando depoimentos padrão.')
      return
    }
    
    setIsLoadingReviews(true)
    
    try {
      // Opção 1: Usar backend proxy (RECOMENDADO)
      // Descomente e ajuste conforme seu backend
      /*
      const response = await fetch(`${backendProxyUrl}?placeId=${googlePlaceId}`)
      if (!response.ok) throw new Error('Erro ao buscar reviews')
      const data = await response.json()
      */
      
      // Opção 2: Chamada direta (NÃO RECOMENDADO - expõe API Key)
      // Descomente apenas se estiver em desenvolvimento/teste
      /*
      const apiKey = 'SUA_API_KEY_AQUI' // NUNCA exponha isso em produção!
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/place/details/json?place_id=${googlePlaceId}&fields=name,rating,user_ratings_total,reviews&key=${apiKey}`
      )
      if (!response.ok) throw new Error('Erro ao buscar reviews')
      const data = await response.json()
      */
      
      // Por enquanto, vamos simular uma resposta (remova quando integrar a API real)
      // ESTRUTURA ESPERADA DA API:
      /*
      {
        result: {
          rating: 4.9,
          user_ratings_total: 150,
          reviews: [
            {
              author_name: "Nome do Cliente",
              rating: 5,
              relative_time_description: "há 2 meses",
              text: "Texto da review...",
              profile_photo_url: "https://...",
              time: 1234567890
            },
            // ... mais reviews
          ]
        }
      }
      */
      
      // SIMULAÇÃO (remova quando integrar a API real):
      await new Promise(resolve => setTimeout(resolve, 500)) // Simula delay
      const mockData = {
        result: {
          rating: 4.9,
          user_ratings_total: 150,
          reviews: []
        }
      }
      
      // Processa as reviews
      if (mockData.result && mockData.result.reviews) {
        let reviews = mockData.result.reviews
        
        // Se houver IDs específicos selecionados, filtra apenas essas
        if (selectedReviewIds.length > 0) {
          reviews = reviews.filter(review => 
            selectedReviewIds.includes(review.author_name) || 
            selectedReviewIds.includes(review.time?.toString())
          )
        }
        
        // Limita a 6 reviews para exibição
        reviews = reviews.slice(0, 6)
        
        // Formata as reviews para o formato esperado
        const formattedReviews = reviews.map(review => ({
          nome: review.author_name || 'Cliente',
          cidade: 'Uberaba - MG', // A API não retorna cidade, use padrão ou obtenha de outra fonte
          texto: review.text || '',
          nota: review.rating || 5,
          data: review.relative_time_description || '',
          foto: review.profile_photo_url || null,
          link: `https://www.google.com/maps/place/?q=place_id:${googlePlaceId}` // Link para a review no Google
        }))
        
        setGoogleReviews(formattedReviews)
        setGoogleRating(mockData.result.rating || 4.9)
      }
    } catch (error) {
      console.error('Erro ao buscar reviews do Google:', error)
      // Em caso de erro, usa os depoimentos padrão
    } finally {
      setIsLoadingReviews(false)
    }
  }
  
  // Busca reviews quando o componente é montado
  useEffect(() => {
    fetchGoogleReviews()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []) // Executa apenas uma vez ao montar (fetchGoogleReviews não precisa estar nas dependências)

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
  // DADOS: DEPOIMENTOS FINAIS
  // ============================================
  // Usa reviews do Google se disponíveis, senão usa os depoimentos padrão
  const depoimentos = googleReviews.length > 0 ? googleReviews : depoimentosFallback

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

        {/* VERSÃO MOBILE - Hero Section Alternativa */}
        <div className="md:hidden relative z-10 w-full px-4 py-8">
          <div className="space-y-6">
            {/* Badge "38 anos" em destaque */}
            <div className="text-center">
              <span className="inline-block px-6 py-3 bg-white/95 backdrop-blur-sm border-2 border-white/60 rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.2)]">
                <span className="bg-gradient-to-r from-[#1B4B7B] via-[#2a6ba8] to-[#1B4B7B] bg-clip-text text-transparent text-2xl font-extrabold">
                  38 anos
                </span>
              </span>
            </div>

            {/* Título principal - Mais direto e impactante */}
            <h1 className="text-3xl font-bold text-white text-center leading-tight drop-shadow-[0_4px_20px_rgba(0,0,0,0.8)] [text-shadow:_2px_2px_8px_rgba(0,0,0,0.9)]">
              Transformando ambientes com móveis planejados de alto padrão
            </h1>
            
            {/* Texto de apoio - Mais conciso */}
            <p className="text-base text-white/95 text-center leading-relaxed drop-shadow-[0_2px_12px_rgba(0,0,0,0.7)] px-2">
              Excelência, pontualidade e facilidade na hora de planejar seu ambiente dos sonhos.
            </p>

            {/* CTA Principal - WhatsApp em destaque */}
            <div className="pt-4">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative flex items-center justify-center gap-3 bg-gradient-to-r from-[#25D366] via-[#20BA5A] to-[#25D366] text-white px-6 py-4 rounded-xl font-bold text-base shadow-2xl hover:shadow-[0_0_30px_rgba(37,211,102,0.6)] transition-all duration-300 transform hover:scale-105 animate-pulse-slow overflow-hidden w-full"
              >
                {/* Efeito de brilho animado */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out"></div>
                
                {/* Ícone do WhatsApp */}
                <svg className="w-6 h-6 group-hover:scale-125 transition-transform relative z-10" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                </svg>
                <span className="relative z-10 font-extrabold">Fale com uma designer</span>
              </a>
            </div>

            {/* Badges compactos - Grid 2 colunas */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <div className="bg-white/90 backdrop-blur-md border border-white/20 rounded-xl px-3 py-3 shadow-lg">
                <div className="flex items-center gap-2">
                  <FiStar className="w-5 h-5 text-[#1B4B7B] flex-shrink-0" />
                  <p className="text-xs text-neutral-800 font-semibold leading-tight">
                    38 anos de experiência
                  </p>
                </div>
              </div>
              <div className="bg-white/90 backdrop-blur-md border border-white/20 rounded-xl px-3 py-3 shadow-lg">
                <div className="flex items-center gap-2">
                  <FiUsers className="w-5 h-5 text-[#1B4B7B] flex-shrink-0" />
                  <p className="text-xs text-neutral-800 font-semibold leading-tight">
                    Design de interiores
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* VERSÃO DESKTOP - Hero Section Original */}
        <div className="hidden md:block relative z-10 max-w-7xl mx-auto w-full px-4 md:px-8 lg:px-12 py-12 md:py-20">
          <div className="max-w-4xl">
            {/* Conteúdo principal */}
            <div className="space-y-10 md:space-y-12">
              
              {/* Título principal - Hierarquia visual forte e premium */}
              <div className="space-y-6 md:space-y-8">
                <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold leading-[1.1] tracking-tight">
                  {/* Destaque para "38 anos" com background premium e efeito de brilho */}
                  <span className="inline-block mb-3 md:mb-4 px-6 md:px-8 py-2 md:py-3 bg-white/95 backdrop-blur-sm border-2 border-white/60 rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.2)] font-extrabold">
                    <span className="bg-gradient-to-r from-[#1B4B7B] via-[#2a6ba8] to-[#1B4B7B] bg-clip-text text-transparent drop-shadow-[0_2px_8px_rgba(27,75,123,0.5)]">
                      38 anos
                    </span>
                  </span>
                  {/* Resto do título com sombra premium e contraste elevado */}
                  <span className="block text-white font-bold drop-shadow-[0_4px_20px_rgba(0,0,0,0.8)] [text-shadow:_2px_2px_8px_rgba(0,0,0,0.9)]">
                    Transformando ambientes com móveis planejados de alto padrão.
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
                {/* CTA Principal: WhatsApp - Design Premium com Animações */}
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative inline-flex items-center justify-center gap-3 bg-gradient-to-r from-[#25D366] via-[#20BA5A] to-[#25D366] text-white px-8 py-4 rounded-xl font-bold text-lg shadow-2xl hover:shadow-[0_0_30px_rgba(37,211,102,0.6)] transition-all duration-300 transform hover:-translate-y-1 hover:scale-105 animate-pulse-slow overflow-hidden"
                >
                  {/* Efeito de brilho animado */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out"></div>
                  
                  {/* Anel de pulso animado */}
                  <div className="absolute inset-0 rounded-xl border-2 border-white/50 animate-ping-slow opacity-75"></div>
                  
                  {/* Ícone do WhatsApp com animação */}
                  <svg className="w-7 h-7 group-hover:scale-125 group-hover:rotate-12 transition-all duration-300 relative z-10 drop-shadow-lg" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                  </svg>
                  <span className="relative z-10 drop-shadow-lg font-extrabold tracking-wide">Fale com uma designer</span>
                  
                  {/* Efeito de partículas/brilho */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-white/20 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500 opacity-50"></div>
                </a>
                
                {/* CTA Secundário: Ver Projetos */}
                <a
                  href="#diferenciais"
                  className="group inline-flex items-center justify-center gap-2 md:gap-3 bg-white backdrop-blur-md border-2 border-white text-[#1B4B7B] px-3 py-2 md:px-6 md:py-3 rounded-xl font-semibold text-base md:text-xl hover:bg-[#1B4B7B] hover:text-white hover:border-[#1B4B7B] transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-1 hover:scale-105"
                >
                  <span className="drop-shadow-sm">Ver Diferenciais</span>
                  {/* Ícone de seta animada */}
                  <svg className="w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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

          {/* Galeria com Tabs - Design premium */}
          <div className="mb-16 md:mb-20">
            <h3 className="text-3xl md:text-4xl font-bold text-neutral-900 text-center mb-12">
              <span className="bg-gradient-to-r from-neutral-900 via-neutral-800 to-neutral-900 bg-clip-text text-transparent">
                Nossos Projetos
              </span>
            </h3>
            
            {/* Sistema de Tabs Premium */}
            <div className="max-w-6xl mx-auto">
              {/* Tabs Navigation */}
              <div className="flex items-center justify-center gap-2 md:gap-4 mb-8 overflow-x-auto pb-2 scrollbar-hide">
                <button
                  onClick={() => {
                    closeActiveModal()
                    setActiveTab('banheiro')
                  }}
                  className={`relative px-6 md:px-8 py-3 md:py-4 rounded-xl font-semibold text-base md:text-lg transition-all duration-300 whitespace-nowrap ${
                    activeTab === 'banheiro'
                      ? 'bg-[#1B4B7B] text-white shadow-lg shadow-[#1B4B7B]/30'
                      : 'bg-white text-neutral-700 hover:bg-neutral-50 border border-neutral-200'
                  }`}
                >
                  Banheiro
                  {activeTab === 'banheiro' && (
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/50 rounded-b-xl"></div>
                  )}
                </button>
                
                <button
                  onClick={() => {
                    closeActiveModal()
                    setActiveTab('sala')
                  }}
                  className={`relative px-6 md:px-8 py-3 md:py-4 rounded-xl font-semibold text-base md:text-lg transition-all duration-300 whitespace-nowrap ${
                    activeTab === 'sala'
                      ? 'bg-[#1B4B7B] text-white shadow-lg shadow-[#1B4B7B]/30'
                      : 'bg-white text-neutral-700 hover:bg-neutral-50 border border-neutral-200'
                  }`}
                >
                  Sala
                  {activeTab === 'sala' && (
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/50 rounded-b-xl"></div>
                  )}
                </button>
                
                <button
                  onClick={() => {
                    closeActiveModal()
                    setActiveTab('cozinha')
                  }}
                  className={`relative px-6 md:px-8 py-3 md:py-4 rounded-xl font-semibold text-base md:text-lg transition-all duration-300 whitespace-nowrap ${
                    activeTab === 'cozinha'
                      ? 'bg-[#1B4B7B] text-white shadow-lg shadow-[#1B4B7B]/30'
                      : 'bg-white text-neutral-700 hover:bg-neutral-50 border border-neutral-200'
                  }`}
                >
                  Cozinha
                  {activeTab === 'cozinha' && (
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/50 rounded-b-xl"></div>
                  )}
                </button>
              </div>
              
              {/* Vídeo ou Carrossel da categoria ativa */}
              <div className="relative">
                {getActiveVideo() ? (
                  /* Exibe vídeo se disponível */
                  <div className="overflow-hidden rounded-2xl bg-neutral-100">
                    {isEmbedVideo(getActiveVideo()) ? (
                      /* Vídeo embed (YouTube/Vimeo) */
                      <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
                        <iframe
                          src={getVideoEmbedUrl(getActiveVideo())}
                          className="absolute top-0 left-0 w-full h-full"
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                          title={`Vídeo ${activeTab}`}
                        ></iframe>
                      </div>
                    ) : (
                      /* Vídeo local (MP4, WebM, etc) */
                      <video
                        className="w-full h-[400px] md:h-[500px] object-cover"
                        controls
                        playsInline
                      >
                        <source src={getActiveVideo()} type="video/mp4" />
                        <source src={getActiveVideo()} type="video/webm" />
                        Seu navegador não suporta o elemento de vídeo.
                      </video>
                    )}
                  </div>
                ) : (
                  /* Exibe carrossel se não houver vídeo */
                  <>
                    <div className="overflow-hidden rounded-2xl bg-neutral-100">
                      <div
                        className="flex transition-transform duration-500 ease-in-out"
                        style={{ transform: `translateX(-${getActiveCurrentIndex() * 100}%)` }}
                      >
                        {getActiveImages().map((imagem, index) => (
                          <div
                            key={index}
                            className="min-w-full relative group cursor-pointer"
                            onClick={() => openActiveModal(index)}
                          >
                            <img
                              src={imagem.src}
                              alt={imagem.alt}
                              className="w-full h-[400px] md:h-[500px] object-cover group-hover:opacity-90 transition-opacity"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6 pointer-events-none">
                              <p className="text-white font-semibold text-lg">{imagem.nome}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Botões de navegação */}
                    {getActiveImages().length > 1 && (
                      <>
                        <button
                          onClick={prevActiveImage}
                          className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-neutral-800 p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110 z-10"
                          aria-label="Imagem anterior"
                        >
                          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                          </svg>
                        </button>
                        
                        <button
                          onClick={nextActiveImage}
                          className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-neutral-800 p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110 z-10"
                          aria-label="Próxima imagem"
                        >
                          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </button>
                      </>
                    )}

                    {/* Indicadores */}
                    {getActiveImages().length > 1 && (
                      <div className="flex justify-center gap-2 mt-6">
                        {getActiveImages().map((_, index) => (
                          <button
                            key={index}
                            onClick={() => setActiveCurrentIndex(index)}
                            className={`h-2 rounded-full transition-all duration-300 ${
                              index === getActiveCurrentIndex() ? 'w-8 bg-[#1B4B7B]' : 'w-2 bg-neutral-300'
                            }`}
                            aria-label={`Ir para imagem ${index + 1}`}
                          />
                        ))}
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Card único de diferencial - Design premium */}
          <div className="flex justify-center mt-16 md:mt-20 mb-16 md:mb-20">
            {diferenciais.map((diferencial, index) => {
              const IconComponent = iconMap[diferencial.iconName]
              
              if (!IconComponent) {
                return null
              }
              
              return (
                <div
                  key={index}
                  className="group relative bg-white p-10 md:p-12 rounded-2xl border border-neutral-200/80 hover:border-[#1B4B7B]/40 transition-all duration-500 shadow-sm hover:shadow-2xl transform hover:-translate-y-2 overflow-hidden w-full max-w-2xl"
                >
                  {/* Efeito de brilho sutil no hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-[#1B4B7B]/0 via-[#1B4B7B]/0 to-[#1B4B7B]/0 group-hover:from-[#1B4B7B]/5 group-hover:via-transparent group-hover:to-transparent transition-all duration-500 pointer-events-none"></div>
                  
                  <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
                    {/* Container do ícone */}
                    <div className="flex-shrink-0 w-24 h-24 rounded-2xl bg-gradient-to-br from-[#1B4B7B]/10 to-[#1B4B7B]/5 flex items-center justify-center group-hover:from-[#1B4B7B]/20 group-hover:to-[#1B4B7B]/10 group-hover:scale-110 transition-all duration-500 shadow-lg group-hover:shadow-xl">
                      <IconComponent className="w-12 h-12 text-[#1B4B7B] group-hover:scale-110 transition-transform duration-500" />
                    </div>
                    
                    {/* Texto */}
                    <div className="flex-1 text-center md:text-left">
                      <h3 className="text-2xl md:text-3xl font-bold text-neutral-900 mb-4 group-hover:text-[#1B4B7B] transition-colors duration-300">
                        {diferencial.titulo}
                      </h3>
                      <p className="text-neutral-600 leading-relaxed text-lg group-hover:text-neutral-700 transition-colors duration-300">
                        {diferencial.descricao}
                      </p>
                    </div>
                  </div>
                  
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
          MODAL DA GALERIA (SISTEMA DE TABS)
          ============================================
          Modal premium para exibir imagens em tamanho maior
          Reutilizado para todas as categorias (Banheiro, Sala, Cozinha)
      */}
      <GalleryModal
        isOpen={getActiveSelectedIndex() !== null}
        onClose={closeActiveModal}
        images={getActiveImages()}
        currentIndex={getActiveCurrentIndex()}
        onNext={nextActiveImage}
        onPrev={prevActiveImage}
        onSelectImage={setActiveCurrentIndex}
      />

      {/* ============================================
          SECTION 3 - PROVA SOCIAL (PREMIUM)
          ============================================
          Objetivo: Mostrar credibilidade por meio de clientes reais
          Elementos: Depoimentos do Google, fotos dos ambientes, nota média
          Design: Premium com cards elegantes e gradientes sutis
      */}
      <section className="py-24 md:py-32 px-4 bg-gradient-to-b from-white via-neutral-50/50 to-white relative overflow-hidden">
        {/* Mesh Gradient Background - Estilo moderno com formas elípticas e dinâmicas */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Camada 1 - Forma elíptica horizontal superior esquerda */}
          <div className="absolute -top-32 -left-32 w-[900px] h-[400px] bg-gradient-to-r from-[#1B4B7B]/25 via-[#2a6ba8]/20 to-transparent rounded-full blur-[100px] rotate-12"></div>
          
          {/* Camada 2 - Forma elíptica vertical direita */}
          <div className="absolute top-1/4 -right-40 w-[350px] h-[800px] bg-gradient-to-l from-[#2a6ba8]/22 via-[#1B4B7B]/18 to-transparent rounded-full blur-[120px] -rotate-6"></div>
          
          {/* Camada 3 - Forma circular grande central */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-gradient-to-br from-[#1B4B7B]/15 via-[#2a6ba8]/10 via-[#153a5f]/8 to-transparent rounded-full blur-[150px]"></div>
          
          {/* Camada 4 - Forma elíptica horizontal inferior */}
          <div className="absolute -bottom-40 left-1/3 w-[800px] h-[350px] bg-gradient-to-t from-[#153a5f]/20 via-[#1B4B7B]/15 to-transparent rounded-full blur-[110px] -rotate-12"></div>
          
          {/* Camada 5 - Forma vertical esquerda */}
          <div className="absolute top-0 left-0 w-[300px] h-[600px] bg-gradient-to-r from-[#1B4B7B]/18 via-[#2a6ba8]/12 to-transparent rounded-full blur-[100px]"></div>
          
          {/* Camada 6 - Forma pequena decorativa superior direita */}
          <div className="absolute top-20 right-1/4 w-[400px] h-[400px] bg-gradient-to-bl from-[#2a6ba8]/16 via-[#1B4B7B]/10 to-transparent rounded-full blur-[90px]"></div>
          
          {/* Camada 7 - Forma alongada diagonal */}
          <div className="absolute bottom-1/3 right-1/4 w-[600px] h-[200px] bg-gradient-to-r from-[#1B4B7B]/14 via-[#2a6ba8]/10 to-transparent rounded-full blur-[100px] rotate-45"></div>
          
          {/* Overlay gradiente suave para harmonizar */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/50 via-transparent via-transparent to-white/40"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-white/30 via-transparent to-transparent"></div>
        </div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          {/* Cabeçalho da seção - Design premium */}
          <div className="text-center mb-16 md:mb-20">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-neutral-900 mb-6 leading-tight tracking-tight">
              <span className="bg-gradient-to-r from-neutral-900 via-neutral-800 to-neutral-900 bg-clip-text text-transparent">
                Clientes satisfeitos são nossa
              </span>
              <br />
              <span className="text-[#1B4B7B]">maior prova de qualidade.</span>
            </h2>
            
            {/* Linha decorativa sutil */}
            <div className="flex items-center justify-center gap-4 mb-8">
              <div className="h-px w-16 bg-gradient-to-r from-transparent to-[#1B4B7B]/30"></div>
              <div className="w-2 h-2 rounded-full bg-[#1B4B7B]"></div>
              <div className="h-px w-16 bg-gradient-to-l from-transparent to-[#1B4B7B]/30"></div>
            </div>
            
            <p className="text-lg md:text-xl text-neutral-600 max-w-3xl mx-auto leading-relaxed mb-8">
              Ao longo de quase quatro décadas, entregamos centenas de projetos residenciais e corporativos, sempre com alta precisão, estética e pontualidade. Veja o que nossos clientes dizem sobre a experiência com a Nunes:
            </p>
            
            {/* Nota média destacada - Design premium */}
            <div className="inline-flex items-center justify-center gap-4 px-8 py-4 bg-gradient-to-r from-white/90 to-white/80 backdrop-blur-md border border-[#1B4B7B]/20 rounded-2xl shadow-xl">
              <div className="flex items-center gap-3">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#1B4B7B]/10 to-[#1B4B7B]/5 flex items-center justify-center border-2 border-[#1B4B7B]/20">
                  <FiStar className="w-8 h-8 text-[#1B4B7B]" />
                </div>
                <div className="text-left">
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl md:text-5xl font-bold text-[#1B4B7B]">
                      {googleRating.toFixed(1)}
                    </span>
                    <span className="text-xl text-neutral-600">/ 5</span>
                  </div>
                  <div className="flex items-center gap-1 mt-1">
                    {[...Array(5)].map((_, i) => (
                      <FiStar
                        key={i}
                        className={`w-5 h-5 ${
                          i < Math.floor(googleRating)
                            ? 'text-yellow-400 fill-yellow-400'
                            : i < googleRating
                            ? 'text-yellow-400 fill-yellow-400/50'
                            : 'text-neutral-300'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
              {googleReviews.length > 0 && (
                <div className="h-12 w-px bg-neutral-300"></div>
              )}
              {googleReviews.length > 0 && (
                <div className="text-left">
                  <p className="text-sm text-neutral-500 mb-1">Avaliações no Google</p>
                  <p className="text-lg font-semibold text-neutral-900">
                    {googleReviews.length}+ avaliações verificadas
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Grid de depoimentos - Design premium */}
          {isLoadingReviews ? (
            <div className="flex items-center justify-center py-20">
              <div className="flex flex-col items-center gap-4">
                <div className="w-12 h-12 border-4 border-[#1B4B7B]/20 border-t-[#1B4B7B] rounded-full animate-spin"></div>
                <p className="text-neutral-600">Carregando avaliações...</p>
              </div>
            </div>
          ) : (
            <>
              {/* Carrossel Mobile */}
              <div className="relative md:hidden mb-8">
                <div className="overflow-hidden rounded-2xl">
                  <div
                    className="flex transition-transform duration-500 ease-in-out"
                    style={{ transform: `translateX(-${depoimentoSlide * 100}%)` }}
                  >
                    {depoimentos.map((depoimento, index) => (
                      <div key={index} className="min-w-full px-2">
                        <div className="group relative bg-white p-6 rounded-2xl border border-neutral-200/80 hover:border-[#1B4B7B]/40 transition-all duration-500 shadow-sm hover:shadow-2xl transform hover:-translate-y-2 overflow-hidden">
                          {/* Efeito de brilho sutil no hover */}
                          <div className="absolute inset-0 bg-gradient-to-br from-[#1B4B7B]/0 via-[#1B4B7B]/0 to-[#1B4B7B]/0 group-hover:from-[#1B4B7B]/5 group-hover:via-transparent group-hover:to-transparent transition-all duration-500 pointer-events-none"></div>
                          
                          {/* Badge do Google (se for review do Google) */}
                          {depoimento.link && (
                            <div className="absolute top-4 right-4 z-10">
                              <a
                                href={depoimento.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1 px-3 py-1 bg-white/90 backdrop-blur-sm border border-neutral-200 rounded-full text-xs font-medium text-neutral-700 hover:bg-white hover:border-[#1B4B7B]/40 transition-all"
                                title="Ver no Google"
                              >
                                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                                </svg>
                                Google
                              </a>
                            </div>
                          )}
                          
                          {/* Container do conteúdo */}
                          <div className="relative z-10">
                            {/* Estrelas de avaliação - Design premium */}
                            <div className="flex items-center gap-1 mb-4">
                              {[...Array(5)].map((_, i) => (
                                <FiStar
                                  key={i}
                                  className={`w-4 h-4 ${
                                    i < depoimento.nota
                                      ? 'text-yellow-400 fill-yellow-400'
                                      : 'text-neutral-300'
                                  }`}
                                />
                              ))}
                              <span className="ml-2 text-xs font-semibold text-neutral-600">
                                {depoimento.nota}.0
                              </span>
                            </div>
                            
                            {/* Texto do depoimento */}
                            <p className="text-neutral-700 mb-4 leading-relaxed text-sm italic relative">
                              <span className="absolute -left-1 -top-1 text-3xl text-[#1B4B7B]/10 font-serif leading-none">"</span>
                              {depoimento.texto}
                              <span className="absolute -right-1 -bottom-3 text-3xl text-[#1B4B7B]/10 font-serif leading-none">"</span>
                            </p>
                            
                            {/* Informações do cliente - Design premium */}
                            <div className="flex items-center gap-3 pt-4 border-t border-neutral-200/80">
                              {/* Foto do cliente (se disponível) */}
                              {depoimento.foto ? (
                                <img
                                  src={depoimento.foto}
                                  alt={depoimento.nome}
                                  className="w-10 h-10 rounded-full object-cover border-2 border-neutral-200"
                                />
                              ) : (
                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#1B4B7B]/20 to-[#1B4B7B]/10 flex items-center justify-center border-2 border-neutral-200">
                                  <span className="text-base font-bold text-[#1B4B7B]">
                                    {depoimento.nome.charAt(0).toUpperCase()}
                                  </span>
                                </div>
                              )}
                              <div className="flex-1">
                                <p className="font-semibold text-neutral-900 mb-1 text-sm">{depoimento.nome}</p>
                                <div className="flex items-center gap-2">
                                  <p className="text-xs text-neutral-600">{depoimento.cidade}</p>
                                  {depoimento.data && (
                                    <>
                                      <span className="text-neutral-400">•</span>
                                      <p className="text-xs text-neutral-500">{depoimento.data}</p>
                                    </>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                          
                          {/* Linha decorativa no hover */}
                          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#1B4B7B]/0 to-transparent group-hover:via-[#1B4B7B] transition-all duration-500"></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Botões de navegação - Mobile */}
                {depoimentos.length > 1 && (
                  <div className="flex items-center justify-center gap-4 mt-4">
                    <button
                      onClick={prevDepoimento}
                      className="bg-white/90 hover:bg-white text-neutral-800 p-2 rounded-full shadow-lg transition-all duration-300 hover:scale-110"
                      aria-label="Depoimento anterior"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                    </button>
                    
                    <button
                      onClick={nextDepoimento}
                      className="bg-white/90 hover:bg-white text-neutral-800 p-2 rounded-full shadow-lg transition-all duration-300 hover:scale-110"
                      aria-label="Próximo depoimento"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>
                )}
                
                {/* Indicadores - Mobile */}
                {depoimentos.length > 1 && (
                  <div className="flex justify-center gap-2 mt-3">
                    {depoimentos.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setDepoimentoSlide(index)}
                        className={`h-2 rounded-full transition-all duration-300 ${
                          index === depoimentoSlide ? 'w-8 bg-[#1B4B7B]' : 'w-2 bg-neutral-300'
                        }`}
                        aria-label={`Ir para depoimento ${index + 1}`}
                      />
                    ))}
                  </div>
                )}
              </div>
              
              {/* Grid Desktop */}
              <div className="hidden md:grid grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                {depoimentos.map((depoimento, index) => (
                <div
                  key={index}
                  className="group relative bg-white p-8 rounded-2xl border border-neutral-200/80 hover:border-[#1B4B7B]/40 transition-all duration-500 shadow-sm hover:shadow-2xl transform hover:-translate-y-2 overflow-hidden"
                >
                  {/* Efeito de brilho sutil no hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-[#1B4B7B]/0 via-[#1B4B7B]/0 to-[#1B4B7B]/0 group-hover:from-[#1B4B7B]/5 group-hover:via-transparent group-hover:to-transparent transition-all duration-500 pointer-events-none"></div>
                  
                  {/* Badge do Google (se for review do Google) */}
                  {depoimento.link && (
                    <div className="absolute top-4 right-4 z-10">
                      <a
                        href={depoimento.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 px-3 py-1 bg-white/90 backdrop-blur-sm border border-neutral-200 rounded-full text-xs font-medium text-neutral-700 hover:bg-white hover:border-[#1B4B7B]/40 transition-all"
                        title="Ver no Google"
                      >
                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                          <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                          <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                          <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                        </svg>
                        Google
                      </a>
                    </div>
                  )}
                  
                  {/* Container do conteúdo */}
                  <div className="relative z-10">
                    {/* Estrelas de avaliação - Design premium */}
                    <div className="flex items-center gap-1 mb-6">
                      {[...Array(5)].map((_, i) => (
                        <FiStar
                          key={i}
                          className={`w-5 h-5 ${
                            i < depoimento.nota
                              ? 'text-yellow-400 fill-yellow-400'
                              : 'text-neutral-300'
                          }`}
                        />
                      ))}
                      <span className="ml-2 text-sm font-semibold text-neutral-600">
                        {depoimento.nota}.0
                      </span>
                    </div>
                    
                    {/* Texto do depoimento */}
                    <p className="text-neutral-700 mb-6 leading-relaxed text-base italic relative">
                      <span className="absolute -left-2 -top-1 text-4xl text-[#1B4B7B]/10 font-serif leading-none">"</span>
                      {depoimento.texto}
                      <span className="absolute -right-2 -bottom-4 text-4xl text-[#1B4B7B]/10 font-serif leading-none">"</span>
                    </p>
                    
                    {/* Informações do cliente - Design premium */}
                    <div className="flex items-center gap-4 pt-6 border-t border-neutral-200/80">
                      {/* Foto do cliente (se disponível) */}
                      {depoimento.foto ? (
                        <img
                          src={depoimento.foto}
                          alt={depoimento.nome}
                          className="w-12 h-12 rounded-full object-cover border-2 border-neutral-200"
                        />
                      ) : (
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#1B4B7B]/20 to-[#1B4B7B]/10 flex items-center justify-center border-2 border-neutral-200">
                          <span className="text-lg font-bold text-[#1B4B7B]">
                            {depoimento.nome.charAt(0).toUpperCase()}
                          </span>
                        </div>
                      )}
                      <div className="flex-1">
                        <p className="font-semibold text-neutral-900 mb-1">{depoimento.nome}</p>
                        <div className="flex items-center gap-2">
                          <p className="text-sm text-neutral-600">{depoimento.cidade}</p>
                          {depoimento.data && (
                            <>
                              <span className="text-neutral-400">•</span>
                              <p className="text-sm text-neutral-500">{depoimento.data}</p>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Linha decorativa no hover */}
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#1B4B7B]/0 to-transparent group-hover:via-[#1B4B7B] transition-all duration-500"></div>
                </div>
              ))}
              </div>
            </>
          )}
          
          {/* Link para ver mais avaliações no Google */}
          {googleReviews.length > 0 && (
            <div className="text-center mt-12">
              <a
                href={`https://www.google.com/maps/place/?q=place_id:${googlePlaceId}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center justify-center gap-3 bg-white/90 backdrop-blur-md border-2 border-[#1B4B7B]/20 text-[#1B4B7B] px-8 py-4 rounded-xl font-semibold text-lg hover:bg-[#1B4B7B] hover:text-white hover:border-[#1B4B7B] transition-all duration-300 shadow-lg hover:shadow-2xl transform hover:-translate-y-1"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="currentColor"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="currentColor"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="currentColor"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="currentColor"/>
                </svg>
                <span>Ver todas as avaliações no Google</span>
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </a>
            </div>
          )}
        </div>
      </section>

      {/* ============================================
          SECTION 4 - CARROSSEL + CONEXÃO EMOCIONAL
          ============================================
          Objetivo: Criar desejo pelo resultado final
          Elemento visual: Carrossel com ambientes premium (9:16 - vertical)
      */}
      <section className="py-24 md:py-32 px-4 bg-gradient-to-br from-white via-neutral-50/30 via-blue-50/20 to-white relative overflow-hidden">
        {/* Elementos decorativos de fundo - Design Premium */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Grid pattern sutil */}
          <div 
            className="absolute inset-0 opacity-[0.02]"
            style={{
              backgroundImage: `
                linear-gradient(to right, #1B4B7B 1px, transparent 1px),
                linear-gradient(to bottom, #1B4B7B 1px, transparent 1px)
              `,
              backgroundSize: '50px 50px'
            }}
          ></div>
          
          {/* Círculos decorativos com gradiente */}
          <div className="absolute top-10 left-5 w-96 h-96 bg-gradient-to-br from-[#1B4B7B]/8 via-[#2a6ba8]/6 to-transparent rounded-full blur-3xl animate-pulse-slow"></div>
          <div className="absolute top-1/3 right-10 w-[500px] h-[500px] bg-gradient-to-br from-[#2a6ba8]/6 via-[#1B4B7B]/4 to-transparent rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-5 w-80 h-80 bg-gradient-to-tl from-[#1B4B7B]/8 via-[#2a6ba8]/5 to-transparent rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 left-10 w-72 h-72 bg-gradient-to-tr from-[#2a6ba8]/7 to-transparent rounded-full blur-3xl"></div>
          
          {/* Linhas decorativas diagonais */}
          <div className="absolute top-0 left-0 w-full h-full">
            <div className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#1B4B7B]/8 to-transparent transform -rotate-3"></div>
            <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#1B4B7B]/10 to-transparent"></div>
            <div className="absolute bottom-1/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#2a6ba8]/8 to-transparent transform rotate-2"></div>
          </div>
          
          {/* Formas geométricas sutis */}
          <div className="absolute top-20 right-20 w-32 h-32 border border-[#1B4B7B]/5 rounded-3xl transform rotate-45 blur-sm"></div>
          <div className="absolute bottom-32 left-20 w-24 h-24 border border-[#2a6ba8]/5 rounded-2xl transform -rotate-12 blur-sm"></div>
          
          {/* Efeito de brilho central */}
          <div 
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-3xl"
            style={{
              background: 'radial-gradient(circle, rgba(27, 75, 123, 0.15) 0%, rgba(27, 75, 123, 0.05) 40%, transparent 70%)'
            }}
          ></div>
        </div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          {/* Cabeçalho da seção - Design Premium */}
          <div className="text-center mb-16 md:mb-20">
            {/* Badge decorativo */}
            <div className="inline-block mb-6">
              <span className="inline-block px-6 py-2 bg-gradient-to-r from-[#1B4B7B]/10 via-[#2a6ba8]/15 to-[#1B4B7B]/10 backdrop-blur-sm border-2 border-[#1B4B7B]/20 rounded-full shadow-lg">
                <span className="bg-gradient-to-r from-[#1B4B7B] via-[#2a6ba8] to-[#1B4B7B] bg-clip-text text-transparent font-bold text-sm md:text-base">
                  Transformação de Ambientes
                </span>
              </span>
            </div>
            
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-neutral-900 mb-6 leading-tight tracking-tight">
              <span className="bg-gradient-to-r from-neutral-900 via-neutral-800 to-neutral-900 bg-clip-text text-transparent">
                Vamos transformar
              </span>
              <br />
              <span className="text-[#1B4B7B]">seu ambiente?</span>
            </h2>
            
            {/* Linha decorativa sutil */}
            <div className="flex items-center justify-center gap-4 mt-8 mb-6">
              <div className="h-px w-16 bg-gradient-to-r from-transparent to-[#1B4B7B]/30"></div>
              <div className="w-2 h-2 rounded-full bg-[#1B4B7B]"></div>
              <div className="h-px w-16 bg-gradient-to-l from-transparent to-[#1B4B7B]/30"></div>
            </div>
            
            <p className="text-lg md:text-xl text-neutral-600 max-w-3xl mx-auto leading-relaxed">
              Fale agora com uma de nossas <span className="font-semibold text-[#1B4B7B]">designers de interiores</span> e comece a planejar um espaço que reflete seu estilo, com qualidade, precisão e entrega garantida.
            </p>
          </div>

          {/* Vídeo ou Carrossel de ambientes */}
          <div className="relative max-w-md mx-auto mb-16 md:mb-20">
            {section4Video ? (
              /* Exibe vídeo se disponível - Design Premium */
              <div className="relative group">
                {/* Container principal com efeitos premium */}
                <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900 aspect-[9/16] shadow-2xl shadow-[#1B4B7B]/20 border-4 border-white/10 group-hover:border-white/20 transition-all duration-500">
                  {/* Overlay sutil no hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-10"></div>
                  
                  {/* Efeito de brilho nas bordas */}
                  <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-transparent via-[#1B4B7B]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-10"></div>
                  
                  {isSection4EmbedVideo(section4Video) ? (
                    /* Vídeo embed (YouTube/Vimeo) - Premium */
                    <div className="relative w-full h-full">
                      <iframe
                        src={getSection4VideoEmbedUrl(section4Video)}
                        className="absolute top-0 left-0 w-full h-full rounded-3xl"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        title="Vídeo Nunes Móveis"
                      ></iframe>
                    </div>
                  ) : (
                    /* Vídeo local (MP4, WebM, etc) - Premium */
                    <div className="relative w-full h-full">
                      <video
                        className="w-full h-full object-cover rounded-3xl"
                        controls
                        playsInline
                        controlsList="nodownload"
                      >
                        <source src={section4Video} type="video/mp4" />
                        <source src={section4Video} type="video/webm" />
                        Seu navegador não suporta o elemento de vídeo.
                      </video>
                      
                      {/* Overlay decorativo superior */}
                      <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-black/30 via-black/10 to-transparent pointer-events-none z-10 rounded-t-3xl"></div>
                      
                      {/* Overlay decorativo inferior */}
                      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-black/30 via-black/10 to-transparent pointer-events-none z-10 rounded-b-3xl"></div>
                    </div>
                  )}
                  
                  {/* Badge premium no canto superior direito */}
                  <div className="absolute top-4 right-4 z-20 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/20 shadow-lg">
                    <div className="flex items-center gap-2">
                      <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z"/>
                      </svg>
                      <span className="text-white text-sm font-semibold">Vídeo</span>
                    </div>
                  </div>
                </div>
                
                {/* Sombra decorativa externa */}
                <div className="absolute -inset-1 bg-gradient-to-r from-[#1B4B7B]/20 via-[#2a6ba8]/20 to-[#1B4B7B]/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"></div>
              </div>
            ) : (
              /* Exibe carrossel se não houver vídeo */
              <>
                {/* Container do carrossel com proporção 9:16 (vertical) - Design Premium */}
                <div className="relative group">
                  {/* Container principal com efeitos premium */}
                  <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900 aspect-[9/16] shadow-2xl shadow-[#1B4B7B]/20 border-4 border-white/10 group-hover:border-white/20 transition-all duration-500">
                    {/* Container dos slides com animação de transição */}
                    <div
                      className="flex transition-transform duration-500 ease-in-out h-full"
                      style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                    >
                      {/* Mapeia cada ambiente e cria um slide */}
                      {ambientes.map((ambiente, index) => (
                        <div
                          key={index}
                          className="min-w-full relative h-full bg-gradient-to-br from-blue-50 via-neutral-100 to-blue-50 cursor-pointer group/item"
                          onClick={() => openAmbienteModal(index)}
                        >
                          {/* Overlay sutil no hover */}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover/item:opacity-100 transition-opacity duration-500 pointer-events-none z-10"></div>
                          
                          {/* Se a imagem não falhou ao carregar, mostra a imagem */}
                          {!imageErrors.includes(index) ? (
                            <img
                              src={ambiente.imagem}
                              alt={ambiente.nome}
                              className="w-full h-full object-cover object-center group-hover/item:scale-105 transition-transform duration-700"
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
                          
                          {/* Badge com nome do ambiente no hover */}
                          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 opacity-0 group-hover/item:opacity-100 transition-opacity duration-500 z-20">
                            <div className="bg-white/10 backdrop-blur-md px-6 py-3 rounded-xl border border-white/20 shadow-lg">
                              <p className="text-white font-semibold text-lg">{ambiente.nome}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Sombra decorativa externa */}
                  <div className="absolute -inset-1 bg-gradient-to-r from-[#1B4B7B]/20 via-[#2a6ba8]/20 to-[#1B4B7B]/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"></div>
                </div>

                {/* Botão de navegação: Slide anterior - Premium */}
                <button
                  onClick={prevSlide}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/95 hover:bg-white backdrop-blur-md text-[#1B4B7B] p-4 rounded-full shadow-2xl transition-all duration-300 hover:scale-110 border-2 border-white/50 hover:border-[#1B4B7B]/30 z-20 group/btn"
                  aria-label="Slide anterior"
                >
                  <svg className="w-6 h-6 group-hover/btn:translate-x-[-2px] transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                
                {/* Botão de navegação: Próximo slide - Premium */}
                <button
                  onClick={nextSlide}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/95 hover:bg-white backdrop-blur-md text-[#1B4B7B] p-4 rounded-full shadow-2xl transition-all duration-300 hover:scale-110 border-2 border-white/50 hover:border-[#1B4B7B]/30 z-20 group/btn"
                  aria-label="Próximo slide"
                >
                  <svg className="w-6 h-6 group-hover/btn:translate-x-[2px] transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                  </svg>
                </button>

                {/* Indicadores de slide (dots) - Premium */}
                <div className="flex justify-center gap-2 mt-6">
                  {ambientes.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentSlide(index)}
                      className={`h-2.5 rounded-full transition-all duration-300 ${
                        index === currentSlide 
                          ? 'w-10 bg-gradient-to-r from-[#1B4B7B] to-[#2a6ba8] shadow-lg shadow-[#1B4B7B]/50' 
                          : 'w-2.5 bg-neutral-300 hover:bg-neutral-400'
                      }`}
                      aria-label={`Ir para slide ${index + 1}`}
                    />
                  ))}
                </div>
              </>
            )}
          </div>

          {/* CTA da seção - Design Premium */}
          <div className="text-center mt-16 md:mt-20">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center justify-center gap-3 bg-gradient-to-r from-[#1B4B7B] via-[#2a6ba8] to-[#1B4B7B] text-white px-10 py-5 rounded-2xl font-bold text-lg md:text-xl hover:from-[#153a5f] hover:via-[#1B4B7B] hover:to-[#153a5f] transition-all duration-500 shadow-2xl shadow-[#1B4B7B]/30 hover:shadow-[#1B4B7B]/50 transform hover:-translate-y-2 hover:scale-105 relative overflow-hidden"
            >
              {/* Efeito de brilho animado */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              
              <span className="relative z-10 drop-shadow-sm">Comece seu projeto com a gente</span>
              
              {/* Ícone de seta */}
              <svg className="w-6 h-6 relative z-10 group-hover:translate-x-2 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </a>
            
            {/* Texto de apoio */}
            <p className="mt-6 text-sm md:text-base text-neutral-500">
              Atendimento personalizado e consultoria gratuita
            </p>
          </div>
        </div>
      </section>

      {/* ============================================
          MODAL DO CARROSSEL DE AMBIENTES (SEÇÃO 4)
          ============================================
          Modal premium para exibir imagens do carrossel em tamanho maior
      */}
      <GalleryModal
        isOpen={selectedAmbienteIndex !== null}
        onClose={closeAmbienteModal}
        images={ambientesParaModal}
        currentIndex={ambienteModalIndex}
        onNext={nextAmbienteModal}
        onPrev={prevAmbienteModal}
        onSelectImage={setAmbienteModalIndex}
      />

      {/* ============================================
          SECTION 5 - GOOGLE MAPS
          ============================================
          Objetivo: Mostrar localização e facilitar visita
          Funcionalidade: Mapa clicável que abre no Google Maps
      */}
      <section className="py-20 px-4 bg-gradient-to-b from-white via-neutral-50/50 to-white relative overflow-hidden">
        {/* Mesh Gradient Background - Estilo sutil e harmonioso */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Camada 1 - Forma elíptica horizontal superior direita */}
          <div className="absolute -top-24 -right-24 w-[800px] h-[350px] bg-gradient-to-l from-[#1B4B7B]/22 via-[#2a6ba8]/18 to-transparent rounded-full blur-[100px] -rotate-12"></div>
          
          {/* Camada 2 - Forma elíptica vertical esquerda */}
          <div className="absolute top-1/3 -left-32 w-[320px] h-[700px] bg-gradient-to-r from-[#2a6ba8]/20 via-[#1B4B7B]/16 to-transparent rounded-full blur-[120px] rotate-6"></div>
          
          {/* Camada 3 - Forma circular grande central inferior */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[900px] h-[900px] bg-gradient-to-t from-[#1B4B7B]/14 via-[#2a6ba8]/10 via-[#153a5f]/8 to-transparent rounded-full blur-[140px]"></div>
          
          {/* Camada 4 - Forma elíptica horizontal inferior esquerda */}
          <div className="absolute -bottom-32 left-1/4 w-[700px] h-[300px] bg-gradient-to-t from-[#153a5f]/18 via-[#1B4B7B]/14 to-transparent rounded-full blur-[110px] rotate-12"></div>
          
          {/* Camada 5 - Forma vertical direita */}
          <div className="absolute top-0 right-0 w-[280px] h-[550px] bg-gradient-to-l from-[#1B4B7B]/16 via-[#2a6ba8]/12 to-transparent rounded-full blur-[100px]"></div>
          
          {/* Camada 6 - Forma pequena decorativa central superior */}
          <div className="absolute top-16 left-1/2 -translate-x-1/2 w-[400px] h-[400px] bg-gradient-to-br from-[#2a6ba8]/14 via-[#1B4B7B]/10 to-transparent rounded-full blur-[90px]"></div>
          
          {/* Camada 7 - Forma alongada diagonal superior */}
          <div className="absolute top-1/4 right-1/3 w-[550px] h-[180px] bg-gradient-to-l from-[#1B4B7B]/12 via-[#2a6ba8]/9 to-transparent rounded-full blur-[100px] -rotate-45"></div>
          
          {/* Overlay gradiente suave para harmonizar */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/50 via-transparent via-transparent to-white/40"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-white/30 via-transparent to-transparent"></div>
        </div>
        
        <div className="max-w-6xl mx-auto relative z-10">
          {/* Cabeçalho da seção */}
          <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 text-center mb-4 drop-shadow-sm [text-shadow:_0_2px_4px_rgba(0,0,0,0.1)]">
            Venha nos visitar
          </h2>
          <p className="text-lg text-neutral-800 font-medium text-center mb-12 max-w-2xl mx-auto drop-shadow-sm">
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
                <span className="font-bold text-[#1B4B7B] drop-shadow-sm">Abrir no Google Maps</span>
                {/* Ícone de link externo */}
                <svg className="w-5 h-5 text-[#1B4B7B]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </div>
            </a>
          </div>

          {/* Informações de endereço abaixo do mapa */}
          <div className="mt-8 text-center">
            <p className="text-neutral-900 font-semibold mb-2 text-lg drop-shadow-sm">
              <span className="text-[#1B4B7B]">📍</span> {enderecoCompleto}
            </p>
            <p className="text-sm text-neutral-800 font-medium">
              Clique no mapa para ver a localização completa no Google Maps
            </p>
          </div>
        </div>
      </section>

      {/* ============================================
          SECTION 6 - RODAPÉ (PREMIUM)
          ============================================
          Elementos: Logo, WhatsApp, informações de contato, créditos
          Design: Premium com gradientes sutis e hierarquia visual refinada
      */}
      <footer className="relative bg-gradient-to-b from-neutral-900 via-neutral-900 to-black text-white py-16 md:py-20 px-4 overflow-hidden">
        {/* Elementos decorativos de fundo */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#1B4B7B] rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#1B4B7B] rounded-full blur-3xl"></div>
        </div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          {/* Grid de informações do rodapé - Design premium */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
            {/* Coluna 1: Sobre a empresa */}
            <div className="lg:col-span-1">
              <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-white to-neutral-300 bg-clip-text text-transparent">
                Nunes Móveis
              </h3>
              <p className="text-neutral-400 leading-relaxed text-sm">
                38 anos transformando ambientes com móveis planejados de alto padrão em Uberaba, MG.
              </p>
            </div>

            {/* Coluna 2: Contato */}
            <div>
              <h3 className="text-lg font-bold mb-6 text-white flex items-center gap-2">
                <div className="w-1 h-6 bg-gradient-to-b from-[#1B4B7B] to-[#2a6ba8] rounded-full"></div>
                Contato
              </h3>
              <div className="space-y-4">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-3 text-neutral-300 hover:text-white transition-all duration-300 hover:translate-x-1"
                >
                  {/* Ícone do WhatsApp com background premium */}
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-gradient-to-br from-[#25D366]/20 to-[#25D366]/10 border border-[#25D366]/30 flex items-center justify-center group-hover:from-[#25D366]/30 group-hover:to-[#25D366]/20 transition-all duration-300">
                    <svg className="w-5 h-5 text-[#25D366]" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                    </svg>
                  </div>
                  <div>
                    <p className="font-semibold text-white">WhatsApp</p>
                    <p className="text-sm text-neutral-400">(34) 99900-2642</p>
                  </div>
                </a>
              </div>
            </div>

            {/* Coluna 3: Localização */}
            <div>
              <h3 className="text-lg font-bold mb-6 text-white flex items-center gap-2">
                <div className="w-1 h-6 bg-gradient-to-b from-[#1B4B7B] to-[#2a6ba8] rounded-full"></div>
                Localização
              </h3>
              <div className="space-y-2 text-neutral-300">
                <p className="text-sm leading-relaxed">
                  Av. Niza Marquez Guaritá, 528
                </p>
                <p className="text-sm leading-relaxed">
                  Conj. Manoel Mendes
                </p>
                <p className="text-sm leading-relaxed">
                  Uberaba - MG, 38082-669
                </p>
              </div>
            </div>

            {/* Coluna 4: Atendimento */}
            <div>
              <h3 className="text-lg font-bold mb-6 text-white flex items-center gap-2">
                <div className="w-1 h-6 bg-gradient-to-b from-[#1B4B7B] to-[#2a6ba8] rounded-full"></div>
                Atendimento
              </h3>
              <p className="text-neutral-300 leading-relaxed text-sm mb-4">
                Atendimento realizado por designers de interiores especializados.
              </p>
              <div className="flex items-center gap-2 text-neutral-400 text-sm">
                <FiStar className="w-4 h-4 text-yellow-400" />
                <span>4.9 / 5.0</span>
                <span className="text-neutral-500">•</span>
                <span>150+ avaliações</span>
              </div>
            </div>
          </div>

          {/* Divisor premium */}
          <div className="relative mb-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gradient-to-r from-transparent via-neutral-700 to-transparent"></div>
            </div>
            <div className="relative flex justify-center">
              <div className="w-16 h-px bg-gradient-to-r from-transparent via-[#1B4B7B] to-transparent"></div>
            </div>
          </div>

          {/* Copyright e Créditos */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8 border-t border-neutral-800/50">
            {/* Copyright */}
            <div className="text-center md:text-left">
              <p className="text-neutral-400 text-sm">
                &copy; {new Date().getFullYear()} <span className="text-white font-semibold">Nunes Móveis</span>. Todos os direitos reservados.
              </p>
            </div>
            
            {/* Créditos - Design premium */}
            <div className="flex items-center gap-2 text-neutral-500 text-xs">
              <span className="text-neutral-600">Landing Page made by</span>
              <span className="text-white font-semibold bg-gradient-to-r from-[#1B4B7B] to-[#2a6ba8] bg-clip-text text-transparent">
                Voa Negocio
              </span>
              <span className="text-neutral-600">e</span>
              <span className="text-white font-semibold">Victor</span>
            </div>
          </div>
        </div>
      </footer>

      {/* ============================================
          BOTÃO FLUTUANTE DO WHATSAPP (PREMIUM)
          ============================================
          Posição: Fixo no canto inferior direito
          Funcionalidade: Abre WhatsApp diretamente
          Design: Premium com animações e efeitos visuais
      */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="group fixed bottom-6 right-6 z-50 inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-[#25D366] via-[#20BA5A] to-[#25D366] text-white rounded-full shadow-2xl hover:shadow-[0_0_25px_rgba(37,211,102,0.7)] transition-all duration-300 hover:scale-110 animate-pulse-slow overflow-hidden"
        aria-label="Fale conosco no WhatsApp"
      >
        {/* Anel de pulso animado */}
        <div className="absolute inset-0 rounded-full border-2 border-white/60 animate-ping-slow opacity-75"></div>
        
        {/* Efeito de brilho animado */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out"></div>
        
        {/* Efeito de partículas/brilho no centro */}
        <div className="absolute inset-0 bg-white/20 rounded-full blur-xl group-hover:scale-150 transition-transform duration-500 opacity-50"></div>
        
        {/* Ícone do WhatsApp com animação */}
        <svg className="w-8 h-8 relative z-10 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300 drop-shadow-lg" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
        </svg>
        
        {/* Tooltip premium que aparece no hover */}
        <div className="absolute -top-14 right-0 opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:-translate-y-1 pointer-events-none">
          <div className="relative bg-gradient-to-r from-[#25D366] to-[#20BA5A] text-white text-sm font-bold px-4 py-2 rounded-lg shadow-xl whitespace-nowrap">
            <span>Fale conosco</span>
            {/* Seta do tooltip */}
            <div className="absolute bottom-0 right-4 translate-y-full">
              <div className="w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-[#20BA5A]"></div>
            </div>
          </div>
        </div>
      </a>
    </div>
  )
}

// Exporta o componente como padrão
export default App
