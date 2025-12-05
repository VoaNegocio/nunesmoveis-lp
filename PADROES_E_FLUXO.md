# Padrões de Desenvolvimento e Fluxo da Landing Page - Nunes Móveis

## 📋 Índice
1. [Visão Geral do Projeto](#visão-geral-do-projeto)
2. [Arquitetura Premium - Sistema de Design](#arquitetura-premium---sistema-de-design)
3. [Padrões de Design](#padrões-de-design)
4. [Estrutura da Landing Page](#estrutura-da-landing-page)
5. [Templates e Componentes Reutilizáveis](#templates-e-componentes-reutilizáveis)
6. [Fluxo de Desenvolvimento](#fluxo-de-desenvolvimento)
7. [Padrões de Código](#padrões-de-código)
8. [Componentes e Reutilização](#componentes-e-reutilização)
9. [Aprendizados e Lições](#aprendizados-e-lições)
10. [Guia de Implementação Rápida](#guia-de-implementação-rápida)
11. [Anotações Importantes](#anotações-importantes)

---

## 🎯 Visão Geral do Projeto

### Objetivo
Landing page premium para Nunes Móveis, empresa de móveis planejados com 38 anos de experiência, focada em criar conexão emocional e gerar leads qualificados.

### Stack Tecnológica
- **React** + **Vite** - Framework e build tool
- **Tailwind CSS v4** - Estilização utility-first
- **React Icons** - Biblioteca de ícones

### Princípios de Desenvolvimento
- **Design Premium**: Visual sofisticado e moderno
- **Mobile-First**: Responsividade em todos os dispositivos
- **Performance**: Código otimizado e componentes reutilizáveis
- **Acessibilidade**: Semântica HTML e ARIA labels
- **Manutenibilidade**: Código limpo e bem documentado

---

## 🏛️ Arquitetura Premium - Sistema de Design

### Filosofia de Design

#### Princípios Fundamentais
1. **Profundidade Visual**: Múltiplas camadas criam hierarquia e interesse
2. **Micro-interações**: Animações sutis guiam o olhar e melhoram UX
3. **Glassmorphism**: Backdrop blur cria modernidade e elegância
4. **Gradientes Sofisticados**: Transições suaves de cor adicionam premium
5. **Espaçamento Generoso**: Respiração visual cria sensação de qualidade
6. **Consistência Visual**: Padrões repetidos criam coesão

### Sistema de Camadas Visuais

#### Camada 1: Background Base
```css
/* Gradiente diagonal sofisticado */
bg-gradient-to-br from-white via-neutral-50/30 via-blue-50/20 to-white
```

**Quando usar**: Background principal de seções premium

#### Camada 2: Elementos Decorativos
```css
/* Grid pattern sutil */
backgroundImage: linear-gradient(to right, #1B4B7B 1px, transparent 1px),
                 linear-gradient(to bottom, #1B4B7B 1px, transparent 1px)
opacity: 0.02
backgroundSize: 50px 50px
```

**Quando usar**: Adicionar textura sem competir com conteúdo

#### Camada 3: Círculos Decorativos
```css
/* Círculos com gradiente e blur */
bg-gradient-to-br from-[#1B4B7B]/8 via-[#2a6ba8]/6 to-transparent
rounded-full blur-3xl
```

**Quando usar**: Criar profundidade e movimento visual

#### Camada 4: Linhas Decorativas
```css
/* Linhas diagonais com gradiente */
bg-gradient-to-r from-transparent via-[#1B4B7B]/8 to-transparent
transform rotate-3
```

**Quando usar**: Adicionar direção e movimento

#### Camada 5: Formas Geométricas
```css
/* Quadrados rotacionados */
border border-[#1B4B7B]/5 rounded-3xl transform rotate-45 blur-sm
```

**Quando usar**: Adicionar interesse visual nas bordas

#### Camada 6: Efeito de Brilho Central
```css
/* Gradiente radial central */
radial-gradient(circle, rgba(27, 75, 123, 0.15) 0%, transparent 70%)
blur-3xl
```

**Quando usar**: Criar ponto focal sutil

### Arquitetura de Componentes Premium

#### 1. Hero Section Premium

**Estrutura Base**:
```jsx
<section className="relative min-h-screen flex items-center justify-center overflow-hidden">
  {/* Background com imagem */}
  <div className="absolute inset-0">
    <img src="..." className="w-full h-full object-cover" />
    <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60" />
  </div>
  
  {/* Conteúdo */}
  <div className="relative z-10 max-w-7xl mx-auto px-4">
    {/* Badge premium */}
    <div className="inline-block mb-6">
      <span className="px-6 py-2 bg-white/10 backdrop-blur-sm border-2 border-white/20 rounded-full">
        Texto do badge
      </span>
    </div>
    
    {/* Título com gradiente */}
    <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
      Título Principal
    </h1>
    
    {/* CTAs premium */}
    <div className="flex gap-4">
      <a className="bg-gradient-to-r from-[#1B4B7B] to-[#2a6ba8] px-8 py-4 rounded-xl">
        CTA Principal
      </a>
    </div>
  </div>
</section>
```

**Características**:
- Overlay escuro para legibilidade
- Badge com backdrop blur
- Título impactante
- CTAs com gradiente

#### 2. Seção com Background Premium

**Estrutura Base**:
```jsx
<section className="py-24 md:py-32 px-4 bg-gradient-to-br from-white via-neutral-50/30 via-blue-50/20 to-white relative overflow-hidden">
  {/* Elementos decorativos */}
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    {/* Grid pattern */}
    <div className="absolute inset-0 opacity-[0.02]" style={{...}} />
    
    {/* Círculos decorativos */}
    <div className="absolute top-10 left-5 w-96 h-96 bg-gradient-to-br from-[#1B4B7B]/8 via-[#2a6ba8]/6 to-transparent rounded-full blur-3xl" />
    
    {/* Linhas decorativas */}
    <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#1B4B7B]/10 to-transparent" />
    
    {/* Efeito de brilho central */}
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-3xl" style={{...}} />
  </div>
  
  {/* Conteúdo */}
  <div className="max-w-7xl mx-auto relative z-10">
    {/* Conteúdo da seção */}
  </div>
</section>
```

**Características**:
- 6 camadas de elementos decorativos
- Profundidade visual
- Não interfere com conteúdo (pointer-events-none)

#### 3. Card Premium

**Estrutura Base**:
```jsx
<div className="group relative bg-white p-8 rounded-2xl border border-neutral-200/80 hover:border-[#1B4B7B]/40 transition-all duration-500 shadow-sm hover:shadow-2xl transform hover:-translate-y-2 overflow-hidden">
  {/* Efeito de brilho no hover */}
  <div className="absolute inset-0 bg-gradient-to-br from-[#1B4B7B]/0 via-[#1B4B7B]/0 to-[#1B4B7B]/0 group-hover:from-[#1B4B7B]/5 group-hover:via-transparent group-hover:to-transparent transition-all duration-500 pointer-events-none" />
  
  {/* Ícone premium */}
  <div className="relative z-10 w-16 h-16 rounded-2xl bg-gradient-to-br from-[#1B4B7B]/10 to-[#1B4B7B]/5 flex items-center justify-center mb-6 group-hover:from-[#1B4B7B]/20 group-hover:to-[#1B4B7B]/10 group-hover:scale-110 transition-all duration-500">
    <Icon className="w-8 h-8 text-[#1B4B7B]" />
  </div>
  
  {/* Conteúdo */}
  <div className="relative z-10">
    <h3 className="text-xl font-bold text-neutral-900 mb-3 group-hover:text-[#1B4B7B] transition-colors">
      Título
    </h3>
    <p className="text-neutral-600">Descrição</p>
  </div>
  
  {/* Linha decorativa no hover */}
  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#1B4B7B]/0 to-transparent group-hover:via-[#1B4B7B] transition-all duration-500" />
</div>
```

**Características**:
- Hover effects sofisticados
- Múltiplas camadas de interação
- Transições suaves
- Feedback visual claro

#### 4. Botão CTA Premium

**Estrutura Base**:
```jsx
<a className="group inline-flex items-center justify-center gap-3 bg-gradient-to-r from-[#1B4B7B] via-[#2a6ba8] to-[#1B4B7B] text-white px-10 py-5 rounded-2xl font-bold text-lg hover:from-[#153a5f] hover:via-[#1B4B7B] hover:to-[#153a5f] transition-all duration-500 shadow-2xl shadow-[#1B4B7B]/30 hover:shadow-[#1B4B7B]/50 transform hover:-translate-y-2 hover:scale-105 relative overflow-hidden">
  {/* Efeito de brilho animado */}
  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
  
  <span className="relative z-10">Texto do Botão</span>
  
  <svg className="w-6 h-6 relative z-10 group-hover:translate-x-2 transition-transform" />
</a>
```

**Características**:
- Gradiente animado
- Efeito de brilho que se move
- Múltiplas animações simultâneas
- Feedback visual forte

#### 5. Modal Premium (GalleryModal)

**Estrutura Base**:
```jsx
<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-2xl">
  {/* Overlay com gradiente */}
  <div className="absolute inset-0 bg-gradient-to-br from-[#1B4B7B]/20 via-black/90 to-[#1B4B7B]/20 pointer-events-none" />
  
  {/* Container do modal */}
  <div className="relative max-w-7xl w-full max-h-[90vh]">
    {/* Efeito de brilho ao redor */}
    <div className="absolute -inset-2 bg-gradient-to-r from-[#1B4B7B]/30 via-[#2a6ba8]/30 to-[#1B4B7B]/30 rounded-3xl blur-2xl opacity-50" />
    
    {/* Botão fechar premium */}
    <button className="absolute top-6 right-6 bg-white/15 hover:bg-white/25 backdrop-blur-xl text-white p-4 rounded-2xl border-2 border-white/30 shadow-2xl">
      {/* Ícone */}
    </button>
    
    {/* Conteúdo */}
    <div className="relative">
      {/* Imagem com bordas premium */}
      <img className="rounded-2xl shadow-2xl border-4 border-white/10" />
      
      {/* Botões de navegação premium */}
      <button className="absolute left-6 top-1/2 bg-white/15 hover:bg-white/25 backdrop-blur-xl text-white p-5 rounded-2xl border-2 border-white/30 shadow-2xl" />
      
      {/* Indicadores premium */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-white/15 backdrop-blur-xl px-6 py-3 rounded-2xl border-2 border-white/30">
        {/* Dots com gradiente quando ativo */}
      </div>
    </div>
  </div>
</div>
```

**Características**:
- Backdrop blur intenso
- Múltiplas camadas de overlay
- Botões com glassmorphism
- Animações de entrada suaves

### Sistema de Animações

#### Animações de Entrada
```css
/* Fade in com scale */
@keyframes fadeInScale {
  0% {
    opacity: 0;
    transform: scale(0.9) translateY(20px);
  }
  100% {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}
```

#### Animações de Hover
- **Scale**: `hover:scale-105` ou `hover:scale-110`
- **Translate**: `hover:-translate-y-1` ou `hover:-translate-y-2`
- **Rotate**: `group-hover:rotate-90` (botões de fechar)
- **Translate X**: `group-hover:translate-x-2` (setas)

#### Animações Contínuas
```css
/* Pulse lento para elementos decorativos */
@keyframes pulse-slow {
  0%, 100% { opacity: 0.6; }
  50% { opacity: 1; }
}
animation: pulse-slow 4s cubic-bezier(0.4, 0, 0.6, 1) infinite;
```

### Padrões de Transição

#### Durações Padrão
- **Rápido**: `duration-300` (300ms) - Hover states básicos
- **Médio**: `duration-500` (500ms) - Transições principais
- **Lento**: `duration-700` (700ms) - Transformações complexas
- **Muito Lento**: `duration-1000` (1000ms) - Efeitos de brilho

#### Easing Functions
- **Padrão**: `ease-in-out` - Transições suaves
- **Custom**: `cubic-bezier(0.4, 0, 0.6, 1)` - Pulse animations

---

## 🎨 Padrões de Design

### Paleta de Cores

#### Cores Principais
- **Azul Primário**: `#1B4B7B` - Cor da marca, usada em CTAs, destaques e elementos principais
- **Azul Secundário**: `#2a6ba8` - Variação para gradientes e hover states
- **Azul Escuro**: `#153a5f` - Hover states e profundidade

#### Cores Neutras
- **Branco**: `white` - Backgrounds principais
- **Neutro 50**: `neutral-50` - Backgrounds sutis
- **Neutro 200**: `neutral-200` - Bordas sutis
- **Neutro 600**: `neutral-600` - Textos secundários
- **Neutro 900**: `neutral-900` - Textos principais

#### Cores de Feedback
- **WhatsApp**: `#25D366` - Botão flutuante WhatsApp
- **Amarelo**: `yellow-400` - Estrelas de avaliação
- **Vermelho**: `red-500` - Notificações (se necessário)

### Tipografia

#### Hierarquia
- **Títulos Principais**: `text-4xl md:text-5xl lg:text-6xl` - Hero e seções principais
- **Títulos de Seção**: `text-3xl md:text-4xl` - Títulos de seções
- **Subtítulos**: `text-xl md:text-2xl` - Subtítulos e destaques
- **Corpo de Texto**: `text-base md:text-lg` - Textos principais
- **Texto Secundário**: `text-sm md:text-base` - Informações complementares

#### Peso de Fonte
- **Bold**: `font-bold` - Títulos e destaques
- **Semibold**: `font-semibold` - Subtítulos e CTAs
- **Normal**: `font-normal` - Textos corridos

### Espaçamentos

#### Padding Vertical de Seções
- **Mobile**: `py-20` ou `py-24`
- **Desktop**: `md:py-32`
- **Seções Especiais**: `py-24 md:py-32`

#### Padding Horizontal
- **Mobile**: `px-4`
- **Desktop**: `md:px-8` ou `lg:px-12`

#### Margens entre Elementos
- **Pequeno**: `mb-4` ou `mb-6`
- **Médio**: `mb-8` ou `mb-12`
- **Grande**: `mb-16 md:mb-20`

### Bordas e Cantos Arredondados

#### Padrões de Border Radius
- **Pequeno**: `rounded-lg` ou `rounded-xl` - Botões pequenos
- **Médio**: `rounded-2xl` - Cards e containers
- **Grande**: `rounded-3xl` - Elementos principais (vídeo, carrossel)
- **Full**: `rounded-full` - Botões circulares e badges

#### Bordas
- **Sutis**: `border` ou `border-2` com `border-neutral-200/80`
- **Premium**: `border-4` com `border-white/10` em elementos principais
- **Hover**: `hover:border-[#1B4B7B]/40` ou `hover:border-white/20`

### Sombras

#### Níveis de Sombra
- **Sutil**: `shadow-sm` - Cards básicos
- **Médio**: `shadow-lg` - Cards com hover
- **Grande**: `shadow-xl` - Elementos destacados
- **Premium**: `shadow-2xl` - Elementos principais
- **Colorida**: `shadow-[#1B4B7B]/30` - Sombras com cor da marca

### Efeitos Visuais

#### Backdrop Blur
- **Sutil**: `backdrop-blur-sm` - Overlays leves
- **Médio**: `backdrop-blur-md` - Cards e badges
- **Intenso**: `backdrop-blur-xl` ou `backdrop-blur-2xl` - Modais

#### Gradientes
- **Backgrounds**: `bg-gradient-to-br from-[cor1] via-[cor2] to-[cor3]`
- **Textos**: `bg-gradient-to-r from-[cor1] via-[cor2] to-[cor1] bg-clip-text text-transparent`
- **Bordas**: Gradientes sutis em hover states

#### Animações
- **Transições**: `transition-all duration-300` ou `duration-500`
- **Hover Scale**: `hover:scale-105` ou `hover:scale-110`
- **Hover Translate**: `hover:-translate-y-1` ou `hover:-translate-y-2`
- **Pulse Lento**: `animate-pulse-slow` (custom, 4s)

---

## 🏗️ Estrutura da Landing Page

### Seções (Ordem de Aparição)

#### 1. Hero Section
**Objetivo**: Primeira impressão e captura de atenção

**Elementos**:
- Background com imagem (`fotobanner1.png`)
- Badge "38 anos" com design premium
- Título principal impactante
- Texto de apoio
- CTAs (WhatsApp e "Ver Diferenciais")
- Badges de credibilidade (mobile: grid 2 colunas)

**Versões**:
- **Mobile**: Layout centralizado, mais compacto
- **Desktop**: Layout alinhado à esquerda, mais espaçado

**Características**:
- Overlay escuro no background para legibilidade
- Animações sutis nos elementos
- Botões com efeitos de hover premium

---

#### 2. Section 2 - Diferenciais e Projetos
**Objetivo**: Mostrar diferenciais e portfólio de projetos

**Estrutura**:
1. Título da seção ("Diferenciais que transformam...")
2. **Nossos Projetos** (tabs com carrosséis)
   - Tab "Banheiro" → Carrossel → Modal
   - Tab "Sala" → Carrossel → Modal
   - Tab "Cozinha" → Carrossel → Modal
3. Card de Diferenciais (único card premium)
4. CTA da seção

**Sistema de Tabs**:
- Design premium com indicador visual
- Estados independentes por categoria
- Fecha modal ao trocar de tab
- Carrossel adapta-se dinamicamente

**Suporte a Vídeo**:
- Variáveis: `banheiroVideo`, `salaVideo`, `cozinhaVideo`
- Se definido, exibe vídeo ao invés do carrossel
- Suporta: YouTube, Vimeo, arquivos locais
- Função: `getVideoEmbedUrl()` com remoção de fragmentos (#)

**Modal**:
- Componente reutilizável `GalleryModal`
- Backdrop blur premium
- Navegação completa (setas, indicadores, teclado)
- Fecha com ESC ou clique fora

---

#### 3. Section 3 - Prova Social (Depoimentos)
**Objetivo**: Construir confiança através de avaliações reais

**Estrutura**:
- Título da seção
- Grid de depoimentos (desktop: 3 colunas)
- Carrossel mobile com navegação
- Badges do Google quando disponível

**Dados**:
- Array `depoimentos` com estrutura completa
- Suporte a links do Google Reviews
- Fallback para dados estáticos

**Design**:
- Cards premium com hover effects
- Estrelas de avaliação (5.0)
- Informações do cliente (foto, nome, cidade, data)
- Badge do Google quando é review real

---

#### 4. Section 4 - Carrossel/Vídeo de Ambientes
**Objetivo**: Criar desejo pelo resultado final

**Estrutura**:
- Cabeçalho premium com badge e linha decorativa
- Vídeo ou Carrossel (9:16 vertical)
- CTA da seção

**Background Premium**:
- Gradiente diagonal sofisticado
- Grid pattern sutil
- 4 círculos decorativos com blur
- Linhas diagonais decorativas
- Formas geométricas sutis
- Efeito de brilho central

**Vídeo**:
- Variável: `section4Video`
- Se definido, exibe vídeo premium
- Suporte a YouTube, Vimeo, arquivos locais
- Design premium com bordas, sombras e overlays

**Carrossel**:
- Proporção 9:16 (vertical)
- Navegação com setas premium
- Indicadores com gradiente
- Modal ao clicar nas imagens

**Modal**:
- Mesmo componente `GalleryModal`
- Estados independentes da Section 2
- Design premium consistente

---

#### 5. Section 5 - Google Maps
**Objetivo**: Mostrar localização e facilitar visita

**Elementos**:
- Título da seção
- Iframe do Google Maps
- Background com elementos decorativos sutis

---

#### 6. Footer
**Objetivo**: Informações finais e créditos

**Elementos**:
- Informações da empresa
- Créditos: "Landing Page made by Voa Negocio e Victor"
- Design premium e minimalista

---

## 📦 Templates e Componentes Reutilizáveis

### Biblioteca de Templates

#### 1. Template de Hero Section Premium
**Uso**: Primeira seção de qualquer landing page

**Características**:
- Background com imagem
- Overlay escuro para legibilidade
- Badge premium no topo
- Título com gradiente de texto
- CTAs com animações
- Versão mobile separada

**Tempo de implementação**: 15 minutos

#### 2. Template de Seção com Background Premium
**Uso**: Seções de conteúdo principais

**Características**:
- 6 camadas de elementos decorativos
- Grid pattern sutil
- Círculos decorativos (4+)
- Linhas diagonais
- Formas geométricas
- Efeito de brilho central

**Tempo de implementação**: 10 minutos (copiar estrutura)

#### 3. Template de Card Premium
**Uso**: Grids de cards, diferenciais, features

**Características**:
- Hover effects sofisticados
- Ícone premium com gradiente
- Efeito de brilho no hover
- Linha decorativa animada
- Transições suaves

**Tempo de implementação**: 5 minutos por card

#### 4. Template de CTA Premium
**Uso**: Botões de ação principais

**Características**:
- Gradiente animado
- Efeito de brilho que se move
- Múltiplas animações simultâneas
- Ícone com movimento
- Sombra colorida

**Tempo de implementação**: 3 minutos

#### 5. Template de Modal Premium
**Uso**: Galerias, lightboxes, detalhes

**Características**:
- Backdrop blur intenso
- Overlay com gradiente
- Botões com glassmorphism
- Navegação completa
- Animações de entrada

**Tempo de implementação**: 0 minutos (componente pronto)

### Componentes Prontos para Copiar

#### GalleryModal.jsx
**Status**: ✅ Completo e testado
**Uso**: Qualquer galeria de imagens
**Props**: isOpen, onClose, images, currentIndex, onNext, onPrev, onSelectImage

#### Sistema de Tabs Premium
**Status**: ✅ Padrão estabelecido
**Uso**: Organizar conteúdo em categorias
**Características**: Estados independentes, design premium, fechamento automático de modal

#### Player de Vídeo Premium
**Status**: ✅ Funções prontas
**Uso**: Exibir vídeos (YouTube, Vimeo, local)
**Funções**: getVideoEmbedUrl(), isEmbedVideo()

### Estrutura de Dados Padrão

#### Dados de Imagens
```javascript
{
  src: '/caminho/para/imagem.jpg',
  alt: 'Texto alternativo descritivo',
  nome: 'Nome do projeto' // Opcional
}
```

#### Dados de Cards
```javascript
{
  titulo: 'Título do Card',
  descricao: 'Descrição do conteúdo',
  iconName: 'nome-do-icone' // Referência ao iconMap
}
```

#### Dados de Depoimentos
```javascript
{
  nome: 'Nome do Cliente',
  texto: 'Texto do depoimento',
  nota: 5, // 1-5
  cidade: 'Cidade - Estado',
  data: '2024-01-15', // Opcional
  foto: '/caminho/foto.jpg', // Opcional
  link: 'https://...' // Link para review (opcional)
}
```

### Funções Utilitárias Reutilizáveis

#### Parsing de URLs de Vídeo
```javascript
// Remove fragmentos e formata para embed
const getVideoEmbedUrl = (videoUrl) => {
  const cleanUrl = videoUrl.split('#')[0]
  // ... lógica de parsing
}
```

#### Detecção de Tipo de Vídeo
```javascript
// Retorna true se for YouTube/Vimeo, false se for arquivo local
const isEmbedVideo = (videoUrl) => {
  return videoUrl.includes('youtube.com') || videoUrl.includes('vimeo.com')
}
```

#### Navegação de Carrossel
```javascript
// Próximo item (circular)
const nextItem = () => {
  setIndex((prev) => (prev + 1) % items.length)
}

// Item anterior (circular)
const prevItem = () => {
  setIndex((prev) => (prev - 1 + items.length) % items.length)
}
```

### Padrões de Estado Reutilizáveis

#### Estado de Modal
```javascript
// Padrão para qualquer modal
const [isOpen, setIsOpen] = useState(false)
const [currentIndex, setCurrentIndex] = useState(0)

const openModal = (index) => {
  setIsOpen(true)
  setCurrentIndex(index)
}

const closeModal = () => {
  setIsOpen(false)
}
```

#### Estado de Tabs
```javascript
// Padrão para sistema de tabs
const [activeTab, setActiveTab] = useState('tab1')
const [tab1Index, setTab1Index] = useState(0)
const [tab2Index, setTab2Index] = useState(0)

// Funções genéricas
const getActiveData = () => {
  switch(activeTab) {
    case 'tab1': return tab1Data
    case 'tab2': return tab2Data
    default: return tab1Data
  }
}
```

#### Estado de Carrossel
```javascript
// Padrão para carrosséis
const [currentSlide, setCurrentSlide] = useState(0)
const [imageErrors, setImageErrors] = useState([])

const nextSlide = () => {
  setCurrentSlide((prev) => (prev + 1) % slides.length)
}

const prevSlide = () => {
  setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
}
```

### Animações CSS Reutilizáveis

#### Animação de Pulse Lento
```css
@keyframes pulse-slow {
  0%, 100% { opacity: 0.6; }
  50% { opacity: 1; }
}

.animate-pulse-slow {
  animation: pulse-slow 4s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}
```

#### Animação de Fade In Scale
```css
@keyframes fadeInScale {
  0% {
    opacity: 0;
    transform: scale(0.9) translateY(20px);
  }
  100% {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}
```

### Classes CSS Utilitárias Premium

#### Glassmorphism
```css
bg-white/15 backdrop-blur-xl border-2 border-white/30
```

#### Gradiente de Texto
```css
bg-gradient-to-r from-[#1B4B7B] via-[#2a6ba8] to-[#1B4B7B] bg-clip-text text-transparent
```

#### Sombra Colorida
```css
shadow-2xl shadow-[#1B4B7B]/30
```

#### Hover Premium
```css
hover:scale-105 hover:-translate-y-2 transition-all duration-500
```

---

## 🔄 Fluxo de Desenvolvimento

### 1. Planejamento
- Definir objetivo da seção
- Identificar elementos necessários
- Planejar estrutura de dados
- Decidir sobre componentes reutilizáveis

### 2. Estrutura de Dados
- Criar arrays/objetos com dados
- Definir estrutura consistente
- Comentar código com exemplos

### 3. Estados e Lógica
- Identificar estados necessários
- Criar funções de controle
- Implementar lógica de navegação
- Gerenciar modais e interações

### 4. Design Visual
- Aplicar padrões de cores
- Implementar espaçamentos consistentes
- Adicionar efeitos visuais premium
- Garantir responsividade

### 5. Componentes Reutilizáveis
- Identificar padrões repetidos
- Criar componentes isolados
- Documentar props e uso
- Testar em diferentes contextos

### 6. Refinamento
- Ajustar animações e transições
- Otimizar performance
- Melhorar acessibilidade
- Testar em diferentes dispositivos

---

## 💻 Padrões de Código

### Estrutura de Arquivos

```
src/
├── App.jsx           # Componente principal com todas as seções
├── GalleryModal.jsx  # Componente de modal reutilizável
├── index.css         # Estilos globais e animações customizadas
└── main.jsx          # Entry point
```

### Organização do Código (App.jsx)

#### 1. Imports
```javascript
import { useState } from 'react'
import { FiIcon1, FiIcon2 } from 'react-icons/fi'
import GalleryModal from './GalleryModal'
```

#### 2. Dados e Configurações
```javascript
// ============================================
// DADOS: [NOME DA SEÇÃO]
// ============================================
// Comentários explicativos
// Estrutura esperada
const dados = [...]
```

#### 3. Estados
```javascript
// Estados agrupados por funcionalidade
const [estado1, setEstado1] = useState(null)
const [estado2, setEstado2] = useState(0)
```

#### 4. Funções
```javascript
// Funções agrupadas por funcionalidade
// Comentários explicativos quando necessário
const funcao1 = () => { ... }
const funcao2 = () => { ... }
```

#### 5. JSX
```javascript
// Seções bem separadas com comentários
// Estrutura clara e indentada
return (
  <>
    {/* SECTION 1 */}
    <section>...</section>
    
    {/* SECTION 2 */}
    <section>...</section>
  </>
)
```

### Convenções de Nomenclatura

#### Variáveis e Funções
- **camelCase**: `activeTab`, `getActiveImages()`, `openModal()`
- **Descritivo**: Nomes que explicam a função
- **Consistente**: Padrões similares para funcionalidades similares

#### Classes CSS
- **Tailwind Utilities**: Uso de classes utilitárias
- **Responsive**: Prefixos `md:`, `lg:` quando necessário
- **Hover States**: `group` e `group-hover:` para efeitos
- **Transitions**: Sempre incluir `transition-all duration-X`

#### Componentes
- **PascalCase**: `GalleryModal`, `App`
- **Descritivo**: Nomes que indicam propósito
- **Reutilizável**: Componentes genéricos e flexíveis

### Comentários no Código

#### Estrutura de Seções
```javascript
{/* ============================================
    SECTION X - [NOME]
    ============================================
    Objetivo: [Descrição]
    Elemento visual: [Descrição]
*/}
```

#### Dados e Configurações
```javascript
// ============================================
// DADOS: [NOME]
// ============================================
// Descrição do que são os dados
// Estrutura esperada
// Exemplos de uso
```

#### Funções Complexas
```javascript
// Função para [propósito]
// Parâmetros: [descrição]
// Retorna: [descrição]
// Exemplo: [exemplo de uso]
```

---

## 🧩 Componentes e Reutilização

### GalleryModal

#### Props
- `isOpen`: boolean - Controla visibilidade
- `onClose`: function - Fecha o modal
- `images`: array - Array de imagens
- `currentIndex`: number - Índice da imagem atual
- `onNext`: function - Próxima imagem
- `onPrev`: function - Imagem anterior
- `onSelectImage`: function - Seleciona imagem específica

#### Uso
```javascript
<GalleryModal
  isOpen={selectedIndex !== null}
  onClose={closeModal}
  images={imagens}
  currentIndex={currentIndex}
  onNext={nextImage}
  onPrev={prevImage}
  onSelectImage={setCurrentIndex}
/>
```

#### Características
- Backdrop blur premium
- Fecha com ESC
- Fecha ao clicar fora
- Navegação completa
- Indicadores clicáveis
- Contador de imagens
- Animações suaves

### Padrão de Estados para Modais

```javascript
// Estados separados por instância
const [selectedIndex, setSelectedIndex] = useState(null) // null = fechado
const [currentIndex, setCurrentIndex] = useState(0)

// Funções de controle
const openModal = (index) => {
  setSelectedIndex(index)
  setCurrentIndex(index) // Sincroniza
}

const closeModal = () => {
  setSelectedIndex(null)
}

const nextImage = () => {
  setCurrentIndex((prev) => (prev + 1) % images.length)
}

const prevImage = () => {
  setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)
}
```

### Padrão de Tabs com Estados Independentes

```javascript
// Estado da tab ativa
const [activeTab, setActiveTab] = useState('banheiro')

// Estados por categoria
const [banheiroCurrentIndex, setBanheiroCurrentIndex] = useState(0)
const [banheiroSelectedIndex, setBanheiroSelectedIndex] = useState(null)

// Funções genéricas
const getActiveImages = () => {
  switch(activeTab) {
    case 'banheiro': return banheiroImagens
    case 'sala': return salaImagens
    case 'cozinha': return cozinhaImagens
    default: return banheiroImagens
  }
}

const getActiveCurrentIndex = () => {
  switch(activeTab) {
    case 'banheiro': return banheiroCurrentIndex
    case 'sala': return salaCurrentIndex
    case 'cozinha': return cozinhaCurrentIndex
    default: return 0
  }
}
```

---

## 📝 Anotações Importantes

### Vídeos

#### Suporte a Formatos
- **YouTube**: `youtu.be/VIDEO_ID`, `youtube.com/watch?v=VIDEO_ID`, `youtube.com/embed/VIDEO_ID`
- **Vimeo**: `vimeo.com/VIDEO_ID`, `player.vimeo.com/video/VIDEO_ID`
- **Arquivos Locais**: `/video.mp4` (colocar em `public/`)

#### Funções de Parsing
- `getVideoEmbedUrl()` - Section 2 (tabs)
- `getSection4VideoEmbedUrl()` - Section 4
- **Importante**: Removem fragmentos (`#`) das URLs antes de processar

#### Detecção de Tipo
- `isEmbedVideo()` - Section 2
- `isSection4EmbedVideo()` - Section 4
- Retorna `true` se for YouTube/Vimeo, `false` se for arquivo local

### Imagens

#### Estrutura de Pastas
```
public/
├── carrossel/        # Imagens do carrossel original
├── banheiro/         # Imagens da categoria banheiro
├── sala/            # Imagens da categoria sala
├── cozinha/         # Imagens da categoria cozinha
├── fotobanner1.png  # Background do hero
└── LOGO NUNES.png   # Logo da empresa
```

#### Estrutura de Dados
```javascript
{
  src: '/caminho/para/imagem.jpg',
  alt: 'Texto alternativo',
  nome: 'Nome do projeto' // Opcional, usado no modal
}
```

### Responsividade

#### Breakpoints Tailwind
- **Mobile**: `< 768px` (padrão)
- **Tablet**: `md:` (≥ 768px)
- **Desktop**: `lg:` (≥ 1024px)

#### Estratégias
- **Mobile-First**: Estilos base para mobile, depois `md:` e `lg:`
- **Layouts Separados**: `md:hidden` e `hidden md:block` quando necessário
- **Tamanhos Adaptativos**: `text-3xl md:text-4xl lg:text-5xl`

### Performance

#### Otimizações
- Componentes reutilizáveis reduzem duplicação
- Estados independentes evitam re-renders desnecessários
- Lazy loading de imagens (quando implementado)
- Animações CSS ao invés de JavaScript quando possível

### Acessibilidade

#### Boas Práticas
- `aria-label` em todos os botões interativos
- `alt` descritivo em todas as imagens
- Navegação por teclado (ESC para fechar modal)
- Contraste adequado de cores
- Semântica HTML correta

### Google Tag Manager e Analytics

#### Estrutura Preparada
- Espaço reservado no `index.html` para GTM
- Estrutura pronta para eventos customizados
- Comentários indicando onde adicionar código

---

## 🎯 Checklist de Desenvolvimento

### Antes de Finalizar uma Seção
- [ ] Design premium aplicado
- [ ] Responsividade testada (mobile, tablet, desktop)
- [ ] Animações e transições suaves
- [ ] Estados e lógica funcionando corretamente
- [ ] Acessibilidade (aria-labels, alt texts)
- [ ] Comentários no código explicativos
- [ ] Consistência com padrões estabelecidos
- [ ] Performance otimizada

### Antes de Criar um Novo Componente
- [ ] Verificar se já existe componente similar
- [ ] Planejar props e estrutura
- [ ] Documentar uso e exemplos
- [ ] Testar em diferentes contextos
- [ ] Garantir reutilização

### Antes de Adicionar Dados
- [ ] Estrutura consistente com padrões
- [ ] Comentários explicativos
- [ ] Exemplos de uso quando necessário
- [ ] Validação de dados (quando aplicável)

---

## 📚 Referências e Recursos

### Documentação
- [Tailwind CSS v4](https://tailwindcss.com/docs)
- [React Icons](https://react-icons.github.io/react-icons/)
- [React Hooks](https://react.dev/reference/react)

### Design Patterns
- **Glassmorphism**: Backdrop blur com transparência
- **Gradient Overlays**: Sobreposição de gradientes sutis
- **Micro-interactions**: Animações em hover e interações
- **Card Design**: Elevação e sombras para profundidade

---

## 🔄 Histórico de Decisões

### Decisões de Design
1. **Sistema de Tabs**: Escolhido para organizar categorias de projetos
2. **Modal Reutilizável**: Criado componente único para todas as galerias
3. **Estados Independentes**: Cada seção tem seus próprios estados
4. **Background Premium**: Múltiplas camadas para profundidade visual

### Decisões Técnicas
1. **Tailwind v4**: Usando plugin do Vite (sem config file)
2. **Componentes Funcionais**: Hooks do React para estado
3. **CSS Inline**: Para estilos dinâmicos complexos
4. **Estrutura de Dados**: Arrays de objetos para flexibilidade

---

## 📌 Notas Finais

Este documento serve como guia de referência para:
- Manutenção do código
- Adição de novas features
- Onboarding de novos desenvolvedores
- Consistência visual e técnica

**Última atualização**: Finalização da Section 4 com design premium completo.

---

## 🎓 Aprendizados e Lições

### Lições Técnicas

#### 1. Estados Independentes para Modais
**Aprendizado**: Cada seção deve ter seus próprios estados de modal para evitar conflitos.

**Implementação**:
```javascript
// ✅ CORRETO - Estados separados
const [selectedImageIndex, setSelectedImageIndex] = useState(null) // Section 2
const [selectedAmbienteIndex, setSelectedAmbienteIndex] = useState(null) // Section 4

// ❌ ERRADO - Estado compartilhado
const [selectedIndex, setSelectedIndex] = useState(null) // Conflito!
```

**Por quê**: Permite múltiplos modais funcionarem independentemente, melhor controle de estado, evita bugs.

#### 2. Remoção de Fragmentos em URLs de Vídeo
**Aprendizado**: URLs de vídeo podem conter fragmentos (`#`) que quebram embed URLs.

**Implementação**:
```javascript
// ✅ CORRETO - Remove fragmentos
const cleanUrl = videoUrl.split('#')[0]
const videoId = cleanUrl.split('youtu.be/')[1].split('?')[0]

// ❌ ERRADO - Mantém fragmentos
const videoId = videoUrl.split('youtu.be/')[1] // Pode incluir #comments
```

**Por quê**: Fragmentos não são parte do video ID e causam URLs inválidas.

#### 3. Pointer Events em Overlays
**Aprendizado**: Overlays com `absolute inset-0` bloqueiam cliques se não tiverem `pointer-events-none`.

**Implementação**:
```javascript
// ✅ CORRETO - Permite clique passar
<div className="absolute inset-0 pointer-events-none">
  {/* Overlay decorativo */}
</div>
<div onClick={handleClick}>
  {/* Conteúdo clicável */}
</div>

// ❌ ERRADO - Bloqueia cliques
<div className="absolute inset-0">
  {/* Bloqueia interações */}
</div>
```

**Por quê**: Overlays decorativos não devem interferir com interações do usuário.

#### 4. Estados com Arrays ao Invés de Sets
**Aprendizado**: React funciona melhor com arrays serializáveis do que Sets.

**Implementação**:
```javascript
// ✅ CORRETO - Array
const [imageErrors, setImageErrors] = useState([])
setImageErrors(prev => [...prev, index])
imageErrors.includes(index)

// ❌ ERRADO - Set
const [imageErrors, setImageErrors] = useState(new Set())
// Pode causar problemas de renderização
```

**Por quê**: Arrays são serializáveis e funcionam melhor com React DevTools e debugging.

### Lições de Design

#### 1. Múltiplas Camadas Criam Profundidade
**Aprendizado**: Backgrounds com 6+ camadas de elementos decorativos criam sensação premium.

**Estrutura**:
1. Gradiente base
2. Grid pattern
3. Círculos decorativos (4+)
4. Linhas diagonais
5. Formas geométricas
6. Efeito de brilho central

**Resultado**: Visual sofisticado sem sobrecarregar.

#### 2. Backdrop Blur é Essencial para Premium
**Aprendizado**: Glassmorphism (backdrop blur) cria modernidade instantaneamente.

**Uso**:
- Modais: `backdrop-blur-2xl`
- Badges: `backdrop-blur-md`
- Overlays: `backdrop-blur-sm`

**Resultado**: Sensação de profundidade e modernidade.

#### 3. Animações Sutis > Animações Exageradas
**Aprendizado**: Micro-interações sutis (scale 105%, translate 2px) são mais elegantes.

**Padrão**:
- Scale: `hover:scale-105` (não 120%)
- Translate: `hover:-translate-y-1` (não -10px)
- Duration: `duration-300` (não 1000ms)

**Resultado**: Sensação premium sem distrair.

#### 4. Gradientes em Texto Adicionam Destaque
**Aprendizado**: Títulos com gradiente de texto são mais impactantes.

**Implementação**:
```css
bg-gradient-to-r from-neutral-900 via-neutral-800 to-neutral-900
bg-clip-text text-transparent
```

**Resultado**: Hierarquia visual clara e moderna.

### Lições de UX

#### 1. Fechar Modal ao Trocar de Tab
**Aprendizado**: Modais devem fechar automaticamente ao mudar contexto.

**Implementação**:
```javascript
<button onClick={() => {
  closeActiveModal() // Fecha modal
  setActiveTab('nova-tab') // Muda tab
}}>
```

**Por quê**: Evita confusão e mantém contexto limpo.

#### 2. Feedback Visual Imediato
**Aprendizado**: Todos os elementos interativos devem ter feedback visual claro.

**Padrão**:
- Hover: Mudança de cor/borda/scale
- Active: Mudança mais intensa
- Focus: Outline visível

**Resultado**: Usuário sempre sabe o que está interagindo.

#### 3. Mobile-First com Versões Separadas
**Aprendizado**: Às vezes é melhor ter layouts completamente diferentes para mobile.

**Implementação**:
```jsx
{/* Mobile */}
<div className="md:hidden">...</div>

{/* Desktop */}
<div className="hidden md:block">...</div>
```

**Por quê**: Mobile tem necessidades diferentes (espaço, interação, legibilidade).

### Lições de Performance

#### 1. Componentes Reutilizáveis Reduzem Bundle Size
**Aprendizado**: Um componente bem feito pode ser usado em múltiplos lugares.

**Exemplo**: `GalleryModal` usado em 2 seções diferentes.

**Resultado**: Menos código, mais consistência, mais fácil manutenção.

#### 2. Estados Independentes Evitam Re-renders
**Aprendizado**: Estados separados por funcionalidade evitam re-renders desnecessários.

**Implementação**: Cada seção tem seus próprios estados.

**Resultado**: Melhor performance, menos bugs.

#### 3. CSS Animations > JavaScript Animations
**Aprendizado**: Animações CSS são mais performáticas que JavaScript.

**Uso**: `transition-all duration-300` ao invés de `useEffect` com `setTimeout`.

**Resultado**: Animações mais suaves, menos carga no JS.

---

## 🚀 Guia de Implementação Rápida

### Template de Landing Page Premium

#### Estrutura Base
```jsx
function LandingPage() {
  // ============================================
  // DADOS
  // ============================================
  const dados = [...]
  
  // ============================================
  // ESTADOS
  // ============================================
  const [estado1, setEstado1] = useState(null)
  
  // ============================================
  // FUNÇÕES
  // ============================================
  const funcao1 = () => { ... }
  
  return (
    <>
      {/* HERO SECTION */}
      <HeroSection />
      
      {/* SECTION 2 */}
      <Section2 />
      
      {/* SECTION 3 */}
      <Section3 />
      
      {/* FOOTER */}
      <Footer />
    </>
  )
}
```

### Checklist de Implementação Rápida

#### 1. Setup Inicial (5 min)
- [ ] Copiar estrutura base do App.jsx
- [ ] Configurar cores da marca
- [ ] Importar componentes necessários

#### 2. Hero Section (15 min)
- [ ] Background com imagem
- [ ] Overlay escuro
- [ ] Badge premium
- [ ] Título com gradiente
- [ ] CTAs premium
- [ ] Versão mobile separada (se necessário)

#### 3. Seções de Conteúdo (20 min cada)
- [ ] Background premium (6 camadas)
- [ ] Cabeçalho com badge e linha decorativa
- [ ] Cards ou grid premium
- [ ] CTA da seção

#### 4. Componentes Especiais (30 min)
- [ ] Modal (reutilizar GalleryModal)
- [ ] Carrossel (se necessário)
- [ ] Tabs (se necessário)
- [ ] Vídeo player (se necessário)

#### 5. Refinamento (30 min)
- [ ] Animações e transições
- [ ] Responsividade
- [ ] Acessibilidade
- [ ] Performance

**Tempo Total Estimado**: 2-3 horas para landing page completa

### Template de Seção Premium

```jsx
{/* ============================================
    SECTION X - [NOME]
    ============================================
    Objetivo: [Descrição]
*/}
<section className="py-24 md:py-32 px-4 bg-gradient-to-br from-white via-neutral-50/30 via-blue-50/20 to-white relative overflow-hidden">
  {/* Elementos decorativos de fundo */}
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    {/* Grid pattern */}
    <div className="absolute inset-0 opacity-[0.02]" style={{...}} />
    
    {/* Círculos decorativos (4+) */}
    <div className="absolute top-10 left-5 w-96 h-96 bg-gradient-to-br from-[#1B4B7B]/8 via-[#2a6ba8]/6 to-transparent rounded-full blur-3xl" />
    {/* ... mais círculos ... */}
    
    {/* Linhas decorativas */}
    <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#1B4B7B]/10 to-transparent" />
    
    {/* Efeito de brilho central */}
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-3xl" style={{...}} />
  </div>
  
  {/* Conteúdo */}
  <div className="max-w-7xl mx-auto relative z-10">
    {/* Cabeçalho */}
    <div className="text-center mb-16 md:mb-20">
      {/* Badge */}
      <div className="inline-block mb-6">
        <span className="inline-block px-6 py-2 bg-gradient-to-r from-[#1B4B7B]/10 via-[#2a6ba8]/15 to-[#1B4B7B]/10 backdrop-blur-sm border-2 border-[#1B4B7B]/20 rounded-full">
          Badge
        </span>
      </div>
      
      {/* Título */}
      <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-neutral-900 mb-6">
        <span className="bg-gradient-to-r from-neutral-900 via-neutral-800 to-neutral-900 bg-clip-text text-transparent">
          Título Principal
        </span>
        <br />
        <span className="text-[#1B4B7B]">Subtítulo</span>
      </h2>
      
      {/* Linha decorativa */}
      <div className="flex items-center justify-center gap-4 mt-8 mb-6">
        <div className="h-px w-16 bg-gradient-to-r from-transparent to-[#1B4B7B]/30"></div>
        <div className="w-2 h-2 rounded-full bg-[#1B4B7B]"></div>
        <div className="h-px w-16 bg-gradient-to-l from-transparent to-[#1B4B7B]/30"></div>
      </div>
      
      {/* Texto de apoio */}
      <p className="text-lg md:text-xl text-neutral-600 max-w-3xl mx-auto">
        Descrição da seção
      </p>
    </div>
    
    {/* Conteúdo principal */}
    <div>
      {/* Cards, grid, carrossel, etc. */}
    </div>
    
    {/* CTA */}
    <div className="text-center mt-16 md:mt-20">
      <a className="group inline-flex items-center justify-center gap-3 bg-gradient-to-r from-[#1B4B7B] via-[#2a6ba8] to-[#1B4B7B] text-white px-10 py-5 rounded-2xl font-bold text-lg hover:from-[#153a5f] hover:via-[#1B4B7B] hover:to-[#153a5f] transition-all duration-500 shadow-2xl shadow-[#1B4B7B]/30 hover:shadow-[#1B4B7B]/50 transform hover:-translate-y-2 hover:scale-105 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
        <span className="relative z-10">CTA Text</span>
        <svg className="w-6 h-6 relative z-10 group-hover:translate-x-2 transition-transform" />
      </a>
    </div>
  </div>
</section>
```

### Template de Card Premium

```jsx
<div className="group relative bg-white p-8 rounded-2xl border border-neutral-200/80 hover:border-[#1B4B7B]/40 transition-all duration-500 shadow-sm hover:shadow-2xl transform hover:-translate-y-2 overflow-hidden">
  {/* Efeito de brilho no hover */}
  <div className="absolute inset-0 bg-gradient-to-br from-[#1B4B7B]/0 via-[#1B4B7B]/0 to-[#1B4B7B]/0 group-hover:from-[#1B4B7B]/5 group-hover:via-transparent group-hover:to-transparent transition-all duration-500 pointer-events-none" />
  
  {/* Ícone */}
  <div className="relative z-10 w-16 h-16 rounded-2xl bg-gradient-to-br from-[#1B4B7B]/10 to-[#1B4B7B]/5 flex items-center justify-center mb-6 group-hover:from-[#1B4B7B]/20 group-hover:to-[#1B4B7B]/10 group-hover:scale-110 transition-all duration-500">
    <Icon className="w-8 h-8 text-[#1B4B7B]" />
  </div>
  
  {/* Conteúdo */}
  <div className="relative z-10">
    <h3 className="text-xl font-bold text-neutral-900 mb-3 group-hover:text-[#1B4B7B] transition-colors">
      Título
    </h3>
    <p className="text-neutral-600">Descrição</p>
  </div>
  
  {/* Linha decorativa */}
  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#1B4B7B]/0 to-transparent group-hover:via-[#1B4B7B] transition-all duration-500" />
</div>
```

### Sistema de Cores Adaptável

#### Como Adaptar para Outro Nicho

1. **Identificar Cor Principal do Cliente**
   - Exemplo: Verde `#10B981` para nicho de sustentabilidade
   - Exemplo: Vermelho `#EF4444` para nicho de urgência

2. **Criar Variações**
   ```javascript
   // Cor primária
   const primaryColor = '#10B981'
   
   // Variações
   const primaryLight = '#34D399' // +20% brightness
   const primaryDark = '#059669'  // -20% brightness
   ```

3. **Substituir em Todo o Código**
   - Buscar: `#1B4B7B` → Substituir: `#10B981`
   - Buscar: `#2a6ba8` → Substituir: `#34D399`
   - Buscar: `#153a5f` → Substituir: `#059669`

4. **Ajustar Neutros se Necessário**
   - Manter neutros padrão geralmente funciona
   - Ajustar apenas se houver conflito visual

### Biblioteca de Componentes Reutilizáveis

#### Componentes Prontos para Copiar

1. **GalleryModal.jsx** - Modal premium completo
2. **Hero Section Template** - Hero com todas as variações
3. **Section Template** - Seção com background premium
4. **Card Template** - Card premium com hover effects
5. **CTA Button Template** - Botão com animações
6. **Background Decorations** - Elementos decorativos

### Workflow de Desenvolvimento Otimizado

#### Passo 1: Planejamento (10 min)
- Definir seções necessárias
- Identificar componentes reutilizáveis
- Listar dados necessários

#### Passo 2: Setup (5 min)
- Copiar templates base
- Configurar cores
- Importar componentes

#### Passo 3: Implementação (2-3 horas)
- Hero section (15 min)
- Seções de conteúdo (20 min cada)
- Componentes especiais (30 min)
- Footer (10 min)

#### Passo 4: Refinamento (30 min)
- Animações
- Responsividade
- Acessibilidade
- Performance

#### Passo 5: Testes (20 min)
- Testar em diferentes dispositivos
- Verificar acessibilidade
- Validar performance

**Total**: 3-4 horas para landing page completa e premium

---

*Documento criado para manter consistência e facilitar manutenção do projeto Nunes Móveis Landing Page. Arquitetura premium reutilizável para acelerar desenvolvimento de novas landing pages.*

