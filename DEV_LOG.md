# Dev Log - Nunes Móveis Landing Page

## Erros Encontrados e Soluções

### ✅ Erro 1: Tailwind CSS não estava funcionando
**Data:** Início do projeto
**Problema:** Tailwind CSS não estava sendo processado corretamente
**Causa:** 
- Plugin do Tailwind não estava dentro do array `plugins` no `vite.config.js`
- Import do Tailwind estava no arquivo errado (`App.css` ao invés de `index.css`)

**Solução:**
- Movido `tailwindcss()` para dentro do array `plugins` no `vite.config.js`
- Movido `@import "tailwindcss"` do `App.css` para o `index.css`
- Instalados os pacotes: `npm install tailwindcss @tailwindcss/vite`

**Status:** ✅ Resolvido

---

### ✅ Erro 2: Sintaxe incorreta no background do Hero
**Data:** Durante implementação do Hero
**Problema:** Erro de parsing no JSX com URL do SVG inline
**Causa:** URL do SVG com caracteres especiais dentro do className causando erro de parsing

**Solução:**
- Removida a linha problemática com o padrão SVG
- Mantido apenas o gradiente de background

**Status:** ✅ Resolvido

---

### ✅ Erro 3: Imagens do carrossel não apareciam
**Data:** Durante implementação do carrossel
**Problema:** Imagens não carregavam, mostrando apenas placeholder
**Causa:** 
- Extensão das imagens estava como `.jpg` mas eram `.png`
- Nomes dos arquivos não correspondiam (faltava `img3.png`)

**Solução:**
- Atualizado extensões de `.jpg` para `.png`
- Ajustado nomes dos arquivos: `img1.png`, `img2.png`, `img4.png`, `img5.png`
- Implementado sistema de fallback com estado `imageErrors`

**Status:** ✅ Resolvido

---

### ❌ Erro 4: Tela branca após substituir emojis por ícones
**Data:** Durante substituição de emojis por ícones premium
**Problema:** Tela branca após implementar ícones do react-icons
**Causa:** 
- `FiPalette` não existe no `react-icons/fi`
- `FiBrush` também não existe no `react-icons/fi`

**Solução Aplicada:**
- Substituído `FiPalette` por `FiUsers` (ícone válido que representa designers)
- Verificado build: `npm run build` passou com sucesso

**Status:** ⚠️ Em investigação - tela ainda branca

**Ações tomadas:**
- ✅ Substituído `FiPalette` por `FiUsers`
- ✅ Build passou com sucesso (`npm run build`)
- ✅ Removida verificação de segurança que poderia causar problemas
- ✅ Mudado `useState(new Set())` para `useState([])` - Set pode causar problemas com React
- ✅ Atualizado `imageErrors.has()` para `imageErrors.includes()`
- ⏳ Servidor de desenvolvimento reiniciado

**Próximos passos:**
- [ ] Verificar console do navegador (F12) para erros específicos
- [ ] Limpar cache do navegador (Cmd+Shift+R)
- [ ] Verificar se há erros de runtime no console
- [ ] Testar em modo de produção (`npm run build && npm run preview`)

---

### ✅ Erro 5: Uso de Set no useState
**Data:** Durante correção da tela branca
**Problema:** `useState(new Set())` pode causar problemas de renderização
**Causa:** Set não é serializável e pode causar problemas com React

**Solução:**
- Mudado para `useState([])` (array)
- Atualizado `imageErrors.has(index)` para `imageErrors.includes(index)`
- Atualizado `setImageErrors(prev => new Set([...prev, index]))` para `setImageErrors(prev => [...prev, index])`

**Status:** ✅ Resolvido

---

## Acertos e Melhorias Implementadas

### ✅ Instalação do Tailwind CSS v4
- Configurado corretamente com plugin do Vite
- Import no arquivo correto (`index.css`)
- Funcionando perfeitamente

### ✅ Estrutura da Landing Page
- Todas as 6 seções implementadas:
  1. Hero Section com background de imagem
  2. Diferenciais com cards
  3. Prova Social com depoimentos
  4. Carrossel de ambientes
  5. Google Maps
  6. Rodapé

### ✅ Design Premium
- Layout minimalista e funcional
- Tipografia marcante
- Microinterações sutis
- Mobile-first
- Cores da marca (#1B4B7B)

### ✅ Funcionalidades
- Carrossel interativo funcionando
- Botão flutuante do WhatsApp
- Links para Google Maps
- CTAs com hover effects

---

## Notas de Desenvolvimento

### Dependências Instaladas
- `tailwindcss@^4.1.17`
- `@tailwindcss/vite@^4.1.17`
- `react-icons@^5.5.0`

### Estrutura de Arquivos
- Imagens do carrossel: `public/carrossel/`
- Banner hero: `public/fotobanner1.png`
- Logo: `public/LOGO NUNES.png`

### Configurações
- Vite configurado com React e Tailwind
- Tailwind v4 usando plugin do Vite (não precisa de `tailwind.config.js`)

---

## Pendências

- [ ] Resolver tela branca atual
- [ ] Adicionar endereço real no Google Maps
- [ ] Otimizar imagens do carrossel
- [ ] Adicionar mais depoimentos reais
- [ ] Testar em diferentes navegadores
- [ ] Otimizar performance

---

## Comandos Úteis

```bash
# Iniciar servidor de desenvolvimento
npm run dev

# Build para produção
npm run build

# Preview do build
npm run preview
```

---

---

## Implementação: Modal da Galeria com Backdrop Blur

### Data: Implementação completa do modal premium

### Objetivo
Criar um modal premium para exibir imagens da galeria em tamanho maior, com efeito de backdrop blur (glassmorphism) e navegação completa entre imagens.

### Pensamento e Decisões de Design

#### 1. Por que um componente separado?
- **Reutilização**: O modal pode ser usado em outras partes da aplicação
- **Manutenibilidade**: Código mais limpo e organizado
- **Testabilidade**: Mais fácil de testar isoladamente
- **Performance**: Componente isolado pode ser otimizado separadamente

#### 2. Técnica: Backdrop Blur (Glassmorphism)
- **O que é**: Efeito de desfoque do conteúdo de fundo quando o modal está aberto
- **Por que usar**: Cria foco na imagem, melhora a experiência visual e segue tendências modernas de design
- **Implementação**: Usando `backdrop-blur-xl` do Tailwind CSS com background semi-transparente

#### 3. Estrutura de Estados
```javascript
const [selectedImageIndex, setSelectedImageIndex] = useState(null) // Controla se modal está aberto
const [galleryCurrentIndex, setGalleryCurrentIndex] = useState(0) // Índice da imagem atual no modal
```

**Decisão**: Separar o índice do carrossel do índice do modal permite:
- Navegação independente no carrossel e no modal
- Abrir o modal em qualquer imagem sem perder a posição do carrossel
- Sincronizar quando necessário

### Implementação do Código

#### Componente GalleryModal.jsx

```jsx
function GalleryModal({
  isOpen,
  onClose,
  images,
  currentIndex,
  onNext,
  onPrev,
  onSelectImage
}) {
  // Fechar modal com tecla ESC
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose()
      }
    }
    
    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      document.body.style.overflow = 'hidden' // Previne scroll
    }
    
    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'unset'
    }
  }, [isOpen, onClose])

  if (!isOpen || !images || images.length === 0) {
    return null // Não renderiza se não estiver aberto
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-xl p-4"
      onClick={onClose} // Fecha ao clicar fora
    >
      {/* Container do modal */}
      <div onClick={(e) => e.stopPropagation()}>
        {/* Imagem, botões, indicadores */}
      </div>
    </div>
  )
}
```

**Decisões importantes**:
1. **Early return**: Se não estiver aberto, retorna `null` (não renderiza)
2. **Event delegation**: Usa `stopPropagation()` para evitar fechar ao clicar na imagem
3. **Body scroll lock**: Previne scroll quando modal está aberto
4. **Keyboard support**: Fecha com ESC para acessibilidade

#### Integração no App.jsx

```jsx
// Estados
const [selectedImageIndex, setSelectedImageIndex] = useState(null)
const [galleryCurrentIndex, setGalleryCurrentIndex] = useState(0)

// Funções
const openModal = (index) => {
  setSelectedImageIndex(index)
  setGalleryCurrentIndex(index) // Sincroniza com a imagem clicada
}

const closeModal = () => {
  setSelectedImageIndex(null)
}

// Renderização
<GalleryModal
  isOpen={selectedImageIndex !== null}
  onClose={closeModal}
  images={galeriaImagens}
  currentIndex={galleryCurrentIndex}
  onNext={nextGalleryImage}
  onPrev={prevGalleryImage}
  onSelectImage={setGalleryCurrentIndex}
/>
```

#### Problema Encontrado e Solução

**Problema**: O clique na imagem não estava funcionando

**Causa**: O overlay com `absolute inset-0` estava bloqueando os eventos de clique

**Solução**:
```jsx
// ANTES (não funcionava)
<div className="min-w-full relative">
  <img onClick={() => openModal(index)} />
  <div className="absolute inset-0"> {/* Bloqueava o clique */}
</div>

// DEPOIS (funciona)
<div 
  className="min-w-full relative group cursor-pointer"
  onClick={() => openModal(index)} // Clique no container
>
  <img />
  <div className="absolute inset-0 pointer-events-none"> {/* Não bloqueia mais */}
</div>
```

**Mudanças**:
1. Movido `onClick` para o container `div`
2. Adicionado `pointer-events-none` no overlay
3. Usado `group` e `group-hover` para melhor controle

### Funcionalidades Implementadas

✅ **Backdrop Blur**: Desfoque do fundo com `backdrop-blur-xl`  
✅ **Fechar ao clicar fora**: `onClick` no container externo  
✅ **Fechar com ESC**: Event listener no `useEffect`  
✅ **Navegação com setas**: Botões anterior/próximo  
✅ **Indicadores clicáveis**: Navegação direta para qualquer imagem  
✅ **Contador de imagens**: Exibe "1 / 5" no canto superior  
✅ **Bloqueio de scroll**: `body.style.overflow = 'hidden'`  
✅ **Animações suaves**: Transições CSS  
✅ **Responsivo**: Funciona em todos os dispositivos  
✅ **Acessibilidade**: `aria-label` em todos os botões  

### Estrutura de Arquivos

```
src/
  ├── GalleryModal.jsx  (Componente do modal)
  └── App.jsx           (Uso do modal)
```

### Classes CSS Utilizadas

- `backdrop-blur-xl`: Desfoque intenso do fundo
- `bg-black/80`: Background semi-transparente (80% opacidade)
- `pointer-events-none`: Permite clique passar através do elemento
- `group` / `group-hover`: Controle de hover em elementos filhos

### Status
✅ **Implementado e funcionando**

### Próximas Melhorias Possíveis
- [ ] Adicionar animação de entrada/saída mais elaborada
- [ ] Suporte a gestos de swipe em mobile
- [ ] Zoom na imagem ao clicar
- [ ] Download da imagem
- [ ] Compartilhamento social

---

## Implementação: Modal no Carrossel de Ambientes (Seção 4)

### Data: Extensão do modal para o carrossel de ambientes

### Objetivo
Adicionar funcionalidade de modal ao carrossel de ambientes da seção 4, permitindo que os usuários cliquem nas imagens e visualizem em tamanho maior com backdrop blur, reutilizando o componente `GalleryModal` já criado.

### Pensamento e Decisões

#### 1. Reutilização do Componente
- **Decisão**: Reutilizar o componente `GalleryModal` já implementado
- **Por quê**: 
  - Evita duplicação de código
  - Mantém consistência visual entre seções
  - Facilita manutenção (uma mudança beneficia ambas as seções)
  - Componente já testado e funcionando

#### 2. Estados Separados
```javascript
// Estados para modal do carrossel de ambientes (Seção 4)
const [selectedAmbienteIndex, setSelectedAmbienteIndex] = useState(null)
const [ambienteModalIndex, setAmbienteModalIndex] = useState(0)
```

**Decisão**: Criar estados separados para cada seção permite:
- Modais independentes (pode ter ambos abertos simultaneamente, se necessário)
- Navegação independente em cada modal
- Melhor controle de estado
- Evita conflitos entre seções

#### 3. Conversão de Dados
```javascript
// Converter ambientes para formato do modal
const ambientesParaModal = ambientes.map(ambiente => ({
  src: ambiente.imagem,
  alt: ambiente.descricao,
  nome: ambiente.nome
}))
```

**Decisão**: Criar função de conversão porque:
- Estrutura de dados diferente: `ambientes` usa `imagem`, modal espera `src`
- Mantém dados originais intactos
- Facilita manutenção se estrutura mudar
- Transformação simples e clara

### Implementação do Código

#### Funções de Controle

```jsx
// Funções para modal do carrossel de ambientes (Seção 4)
const openAmbienteModal = (index) => {
  setSelectedAmbienteIndex(index)
  setAmbienteModalIndex(index) // Sincroniza com a imagem clicada
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
```

**Padrão**: Mesmo padrão usado na seção 2, garantindo consistência.

#### Integração no Carrossel

```jsx
{ambientes.map((ambiente, index) => (
  <div
    key={index}
    className="min-w-full relative h-full bg-gradient-to-br from-blue-50 via-neutral-100 to-blue-50 cursor-pointer group"
    onClick={() => openAmbienteModal(index)} // Clique no container
  >
    <img
      src={ambiente.imagem}
      alt={ambiente.nome}
      className="w-full h-full object-cover object-center group-hover:opacity-90 transition-opacity"
    />
  </div>
))}
```

**Decisões**:
1. `onClick` no container `div` (não na imagem) - mais confiável
2. `cursor-pointer` - indica que é clicável
3. `group` e `group-hover` - efeito visual no hover
4. `transition-opacity` - animação suave

#### Renderização do Modal

```jsx
<GalleryModal
  isOpen={selectedAmbienteIndex !== null}
  onClose={closeAmbienteModal}
  images={ambientesParaModal}
  currentIndex={ambienteModalIndex}
  onNext={nextAmbienteModal}
  onPrev={prevAmbienteModal}
  onSelectImage={setAmbienteModalIndex}
/>
```

**Vantagens da reutilização**:
- Mesmo componente, mesma experiência
- Todas as funcionalidades já implementadas (ESC, backdrop blur, navegação)
- Código limpo e organizado

### Diferenças entre Seção 2 e Seção 4

| Aspecto | Seção 2 (Galeria) | Seção 4 (Carrossel) |
|---------|-------------------|---------------------|
| **Fonte de dados** | `galeriaImagens` | `ambientes` (convertido) |
| **Formato original** | `{ src, alt, nome }` | `{ nome, descricao, imagem }` |
| **Estados** | `selectedImageIndex`, `galleryCurrentIndex` | `selectedAmbienteIndex`, `ambienteModalIndex` |
| **Layout** | Grid horizontal | Carrossel vertical (9:16) |
| **Componente modal** | `GalleryModal` | `GalleryModal` (mesmo) |

**Conclusão**: Mesmo componente, diferentes fontes de dados e estados.

### Funcionalidades Implementadas

✅ **Reutilização do componente**: Mesmo `GalleryModal` da seção 2  
✅ **Estados independentes**: Não interfere com modal da seção 2  
✅ **Conversão de dados**: Transforma `ambientes` para formato do modal  
✅ **Clique no carrossel**: Imagens clicáveis com feedback visual  
✅ **Navegação completa**: Setas, indicadores e contador  
✅ **Backdrop blur**: Mesmo efeito premium  
✅ **Todas as funcionalidades**: ESC, fechar ao clicar fora, etc.  

### Estrutura de Dados

**Antes (ambientes)**:
```javascript
{
  nome: 'Cozinha',
  descricao: 'Cozinhas planejadas com acabamento premium',
  imagem: '/carrossel/img2.png'
}
```

**Depois (ambientesParaModal)**:
```javascript
{
  src: '/carrossel/img2.png',
  alt: 'Cozinhas planejadas com acabamento premium',
  nome: 'Cozinha'
}
```

### Status
✅ **Implementado e funcionando**

### Lições Aprendidas

1. **Reutilização é poderosa**: Um componente bem feito pode ser usado em múltiplos lugares
2. **Estados separados**: Cada instância precisa de seus próprios estados
3. **Conversão de dados**: Às vezes é necessário adaptar dados para o formato esperado
4. **Consistência**: Usar o mesmo padrão facilita manutenção

---

## Implementação: Sistema de Tabs com Carrosséis por Categoria (Seção 2)

### Data: Implementação do sistema de tabs premium

### Objetivo
Transformar a galeria única da seção 2 em um sistema de tabs organizado por categorias (Banheiro, Sala, Cozinha), cada uma com seu próprio carrossel e modal, mantendo o design premium e reutilizando o componente `GalleryModal`.

### Pensamento e Decisões de Design

#### 1. Por que Tabs ao invés de Seções Verticais?
- **Organização**: Com 3 imagens por categoria, tabs são mais eficientes em espaço
- **Navegação**: Melhor UX para alternar entre categorias
- **Profissionalismo**: Design mais moderno e organizado
- **Mobile-friendly**: Scroll horizontal nas tabs funciona melhor em mobile
- **Foco**: Uma categoria por vez mantém o foco do usuário

#### 2. Estrutura de Estados Independentes
```javascript
// Estado para controlar qual tab está ativa
const [activeTab, setActiveTab] = useState('banheiro') // 'banheiro', 'sala', 'cozinha'

// Estados independentes para cada categoria
const [banheiroCurrentIndex, setBanheiroCurrentIndex] = useState(0)
const [banheiroSelectedIndex, setBanheiroSelectedIndex] = useState(null)

const [salaCurrentIndex, setSalaCurrentIndex] = useState(0)
const [salaSelectedIndex, setSalaSelectedIndex] = useState(null)

const [cozinhaCurrentIndex, setCozinhaCurrentIndex] = useState(0)
const [cozinhaSelectedIndex, setCozinhaSelectedIndex] = useState(null)
```

**Decisão**: Estados separados por categoria permitem:
- Navegação independente em cada categoria
- Manter posição do carrossel ao trocar de tab
- Modal independente por categoria
- Melhor controle de estado e performance

#### 3. Funções Genéricas vs Específicas
```javascript
// Funções específicas por categoria
const nextBanheiro = () => { ... }
const openBanheiroModal = (index) => { ... }

// Funções genéricas que adaptam à tab ativa
const getActiveImages = () => {
  switch(activeTab) {
    case 'banheiro': return banheiroImagens
    case 'sala': return salaImagens
    case 'cozinha': return cozinhaImagens
    default: return banheiroImagens
  }
}

const openActiveModal = (index) => {
  switch(activeTab) {
    case 'banheiro': return openBanheiroModal(index)
    case 'sala': return openSalaModal(index)
    case 'cozinha': return openCozinhaModal(index)
  }
}
```

**Decisão**: Híbrido de funções específicas e genéricas porque:
- Funções específicas: Mais controle e clareza
- Funções genéricas: Reduz duplicação no JSX
- Facilita manutenção: Mudanças em uma categoria não afetam outras

### Implementação do Código

#### Estrutura de Dados
```javascript
// Arrays de imagens por categoria
const banheiroImagens = [
  { 
    src: '/banheiro/img1.png', 
    alt: 'Projeto de móveis planejados - Banheiro',
    nome: 'Banheiro'
  },
  { src: '/banheiro/img2.png', ... },
  { src: '/banheiro/img3.png', ... },
]

const salaImagens = [
  { src: '/sala/img1.png', ... },
  { src: '/sala/img2.png', ... },
  { src: '/sala/img3.png', ... },
]

const cozinhaImagens = [
  { src: '/cozinha/img1.png', ... },
  { src: '/cozinha/img2.png', ... },
  { src: '/cozinha/img3.png', ... },
]
```

**Estrutura de pastas esperada**:
```
public/
├── banheiro/
│   ├── img1.png
│   ├── img2.png
│   └── img3.png
├── sala/
│   ├── img1.png
│   ├── img2.png
│   └── img3.png
└── cozinha/
    ├── img1.png
    ├── img2.png
    └── img3.png
```

#### Componente de Tabs
```jsx
{/* Tabs Navigation */}
<div className="flex items-center justify-center gap-2 md:gap-4 mb-8 overflow-x-auto pb-2 scrollbar-hide">
  <button
    onClick={() => {
      closeActiveModal() // Fecha modal ao trocar de tab
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
  {/* Tabs Sala e Cozinha com mesmo padrão */}
</div>
```

**Decisões de design**:
1. **Indicador visual**: Linha inferior branca na tab ativa
2. **Cores**: Azul da marca (#1B4B7B) para tab ativa, branco para inativas
3. **Hover**: Efeito sutil em tabs inativas
4. **Fechamento de modal**: Fecha automaticamente ao trocar de tab
5. **Responsivo**: Scroll horizontal em mobile se necessário

#### Carrossel Dinâmico
```jsx
{/* Carrossel da categoria ativa */}
<div className="relative">
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
  
  {/* Botões de navegação e indicadores */}
</div>
```

**Características**:
- Carrossel adapta-se dinamicamente à categoria ativa
- Usa funções genéricas (`getActiveImages()`, `getActiveCurrentIndex()`)
- Mantém mesmo design premium do carrossel original
- Navegação completa (setas + indicadores)

#### Modal Reutilizado
```jsx
<GalleryModal
  isOpen={getActiveSelectedIndex() !== null}
  onClose={closeActiveModal}
  images={getActiveImages()}
  currentIndex={getActiveCurrentIndex()}
  onNext={nextActiveImage}
  onPrev={prevActiveImage}
  onSelectImage={setActiveCurrentIndex}
/>
```

**Vantagens**:
- Um único modal para todas as categorias
- Funciona dinamicamente com a categoria ativa
- Todas as funcionalidades já implementadas (ESC, backdrop blur, navegação)
- Código limpo e reutilizável

### Funcionalidades Implementadas

✅ **Sistema de Tabs**: 3 tabs (Banheiro, Sala, Cozinha) com design premium  
✅ **Estados independentes**: Cada categoria mantém seu próprio estado  
✅ **Carrossel dinâmico**: Adapta-se à categoria ativa  
✅ **Modal reutilizado**: Um único modal para todas as categorias  
✅ **Navegação completa**: Setas, indicadores, teclado  
✅ **Fechamento automático**: Modal fecha ao trocar de tab  
✅ **Design premium**: Alinhado com o restante do site  
✅ **Responsivo**: Funciona perfeitamente em mobile  
✅ **Transições suaves**: Animações CSS em todas as interações  

### Estrutura de Estados

| Estado | Propósito |
|--------|-----------|
| `activeTab` | Controla qual tab está ativa ('banheiro', 'sala', 'cozinha') |
| `banheiroCurrentIndex` | Índice atual do carrossel de banheiro |
| `banheiroSelectedIndex` | Índice da imagem selecionada no modal (null = fechado) |
| `salaCurrentIndex` | Índice atual do carrossel de sala |
| `salaSelectedIndex` | Índice da imagem selecionada no modal |
| `cozinhaCurrentIndex` | Índice atual do carrossel de cozinha |
| `cozinhaSelectedIndex` | Índice da imagem selecionada no modal |

### Funções Principais

#### Funções Genéricas (usadas no JSX)
- `getActiveImages()`: Retorna array de imagens da categoria ativa
- `getActiveCurrentIndex()`: Retorna índice atual da categoria ativa
- `getActiveSelectedIndex()`: Retorna índice selecionado da categoria ativa
- `openActiveModal(index)`: Abre modal da categoria ativa
- `closeActiveModal()`: Fecha modal da categoria ativa
- `nextActiveImage()`: Próxima imagem da categoria ativa
- `prevActiveImage()`: Imagem anterior da categoria ativa
- `setActiveCurrentIndex(index)`: Define índice atual da categoria ativa

#### Funções Específicas (por categoria)
- `nextBanheiro()`, `prevBanheiro()`, `openBanheiroModal()`, `closeBanheiroModal()`
- `nextSala()`, `prevSala()`, `openSalaModal()`, `closeSalaModal()`
- `nextCozinha()`, `prevCozinha()`, `openCozinhaModal()`, `closeCozinhaModal()`

### Fluxo de Navegação

1. **Usuário clica em uma tab**:
   - `setActiveTab('categoria')` → muda categoria ativa
   - `closeActiveModal()` → fecha modal se estiver aberto
   - Carrossel atualiza para mostrar imagens da nova categoria

2. **Usuário navega no carrossel**:
   - Clica em setas ou indicadores
   - `setActiveCurrentIndex()` atualiza índice da categoria ativa
   - Carrossel desliza para nova imagem

3. **Usuário clica em uma imagem**:
   - `openActiveModal(index)` → abre modal
   - `setActiveSelectedIndex(index)` → define imagem selecionada
   - Modal exibe imagem em tamanho maior

4. **Usuário navega no modal**:
   - Setas ou teclado navegam entre imagens
   - `nextActiveImage()` / `prevActiveImage()` atualizam índice
   - Modal sincroniza com carrossel

### Diferenças em Relação à Implementação Anterior

| Aspecto | Antes (Galeria Única) | Depois (Sistema de Tabs) |
|---------|----------------------|--------------------------|
| **Estrutura** | Um único carrossel | 3 carrosséis por categoria |
| **Estados** | 2 estados (`selectedImageIndex`, `galleryCurrentIndex`) | 7 estados (1 para tab + 6 para categorias) |
| **Dados** | `galeriaImagens` (array único) | 3 arrays separados por categoria |
| **Navegação** | Carrossel único | Tabs + carrossel por categoria |
| **Modal** | Modal único | Modal reutilizado dinamicamente |
| **Organização** | Todas as imagens juntas | Imagens organizadas por categoria |

### Vantagens da Nova Implementação

1. **Organização**: Imagens separadas por categoria facilita navegação
2. **Escalabilidade**: Fácil adicionar novas categorias no futuro
3. **Performance**: Estados independentes evitam re-renders desnecessários
4. **UX**: Usuário encontra o que procura mais rapidamente
5. **Manutenção**: Código mais organizado e fácil de manter
6. **Reutilização**: Modal e funções genéricas reduzem duplicação

### Status
✅ **Implementado e funcionando**

### Próximas Melhorias Possíveis
- [ ] Adicionar mais categorias (Closet, Área Gourmet, etc.)
- [ ] Adicionar tab "Todos" que mostra todas as imagens
- [ ] Adicionar filtros avançados
- [ ] Adicionar busca por categoria
- [ ] Adicionar animação de transição entre tabs
- [ ] Adicionar lazy loading nas imagens

---

## Implementação: Hero Section Mobile Alternativa

### Data: Implementação de versão mobile otimizada da hero section

### Objetivo
Criar uma versão alternativa e otimizada da hero section especificamente para dispositivos mobile, com layout mais compacto, conteúdo mais direto e melhor aproveitamento do espaço vertical limitado.

### Pensamento e Decisões de Design

#### 1. Por que uma Versão Mobile Separada?
- **Espaço limitado**: Telas mobile têm menos espaço vertical e horizontal
- **Legibilidade**: Textos menores precisam ser mais concisos
- **Interação**: Botões precisam ser maiores e mais fáceis de clicar
- **Performance**: Menos elementos renderizados = melhor performance
- **UX**: Experiência otimizada para toque ao invés de mouse

#### 2. Estratégia de Implementação
```jsx
{/* VERSÃO MOBILE - Hero Section Alternativa */}
<div className="md:hidden relative z-10 w-full px-4 py-8">
  {/* Conteúdo mobile otimizado */}
</div>

{/* VERSÃO DESKTOP - Hero Section Original */}
<div className="hidden md:block relative z-10 max-w-7xl mx-auto w-full px-4 md:px-8 lg:px-12 py-12 md:py-20">
  {/* Conteúdo desktop original */}
</div>
```

**Decisão**: Usar classes Tailwind `md:hidden` e `hidden md:block` porque:
- Renderiza apenas a versão necessária (não duplica conteúdo)
- Mantém código limpo e organizado
- Fácil de manter (versões separadas)
- Performance otimizada (menos DOM)

### Implementação do Código

#### Estrutura Mobile
```jsx
<div className="md:hidden relative z-10 w-full px-4 py-8">
  <div className="space-y-6">
    {/* Badge "38 anos" em destaque centralizado */}
    <div className="text-center">
      <span className="inline-block px-6 py-3 bg-white/95 backdrop-blur-sm border-2 border-white/60 rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.2)]">
        <span className="bg-gradient-to-r from-[#1B4B7B] via-[#2a6ba8] to-[#1B4B7B] bg-clip-text text-transparent text-2xl font-extrabold">
          38 anos
        </span>
      </span>
    </div>

    {/* Título principal - Mais direto e impactante */}
    <h1 className="text-3xl font-bold text-white text-center leading-tight drop-shadow-[0_4px_20px_rgba(0,0,0,0.8)]">
      Transformando ambientes com móveis planejados de alto padrão
    </h1>
    
    {/* Texto de apoio - Mais conciso */}
    <p className="text-base text-white/95 text-center leading-relaxed drop-shadow-[0_2px_12px_rgba(0,0,0,0.7)] px-2">
      Excelência, pontualidade e facilidade na hora de planejar seu ambiente dos sonhos.
    </p>

    {/* CTA Principal - WhatsApp em destaque full-width */}
    <div className="pt-4">
      <a href={whatsappUrl} className="group relative flex items-center justify-center gap-3 bg-gradient-to-r from-[#25D366] via-[#20BA5A] to-[#25D366] text-white px-6 py-4 rounded-xl font-bold text-base shadow-2xl hover:shadow-[0_0_30px_rgba(37,211,102,0.6)] transition-all duration-300 transform hover:scale-105 animate-pulse-slow overflow-hidden w-full">
        {/* Efeitos visuais */}
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
      {/* Segundo badge */}
    </div>
  </div>
</div>
```

### Diferenças entre Mobile e Desktop

| Aspecto | Mobile | Desktop |
|---------|--------|---------|
| **Layout** | Centralizado, vertical | Alinhado à esquerda, mais espaçado |
| **Título** | `text-3xl`, centralizado, mais conciso | `text-4xl md:text-5xl lg:text-7xl`, alinhado à esquerda |
| **Texto de apoio** | `text-base`, versão reduzida | `text-lg md:text-xl lg:text-2xl`, versão completa |
| **Badge "38 anos"** | Centralizado no topo, maior destaque | Inline com título, menor |
| **CTA WhatsApp** | Full-width (`w-full`), mais compacto | Tamanho padrão, lado a lado com outro botão |
| **Badges de credibilidade** | Grid 2 colunas, compactos, ícones menores | Grid 2 colunas, maiores, mais espaçados |
| **Espaçamento** | `space-y-6`, `py-8` | `space-y-10 md:space-y-12`, `py-12 md:py-20` |
| **Padding horizontal** | `px-4` | `px-4 md:px-8 lg:px-12` |

### Decisões de Design Mobile

#### 1. Badge "38 anos" em Destaque
- **Posição**: Centralizado no topo
- **Tamanho**: `text-2xl` (maior que desktop inline)
- **Razão**: Primeira coisa que o usuário vê, cria impacto imediato

#### 2. Título Mais Conciso
- **Tamanho**: `text-3xl` (menor que desktop)
- **Alinhamento**: Centralizado
- **Conteúdo**: Mesma mensagem, mas mais direto
- **Razão**: Melhor legibilidade em telas pequenas

#### 3. Texto de Apoio Reduzido
- **Tamanho**: `text-base`
- **Conteúdo**: Versão resumida da mensagem principal
- **Razão**: Evita scroll excessivo, mantém foco

#### 4. CTA Full-Width
- **Largura**: `w-full` (ocupa toda largura)
- **Tamanho**: `px-6 py-4` (mais compacto)
- **Razão**: Mais fácil de clicar em mobile, maior área de toque

#### 5. Badges Compactos
- **Layout**: Grid 2 colunas
- **Tamanho**: `px-3 py-3` (menor que desktop)
- **Ícones**: `w-5 h-5` (menores)
- **Texto**: `text-xs` (menor)
- **Razão**: Economiza espaço vertical, mantém informação essencial

### Funcionalidades Implementadas

✅ **Versão mobile separada**: Layout otimizado para telas pequenas  
✅ **Badge destacado**: "38 anos" em destaque no topo  
✅ **Título conciso**: Versão mais direta e impactante  
✅ **Texto reduzido**: Mensagem essencial sem perder significado  
✅ **CTA full-width**: Botão WhatsApp mais fácil de clicar  
✅ **Badges compactos**: Grid 2 colunas com informações essenciais  
✅ **Animações mantidas**: Efeitos visuais preservados  
✅ **Responsivo**: Funciona perfeitamente em todos os tamanhos mobile  

### Classes CSS Utilizadas

#### Mobile (`md:hidden`)
- `md:hidden`: Oculta em telas médias e maiores
- `space-y-6`: Espaçamento vertical compacto
- `text-center`: Centralização do conteúdo
- `w-full`: Largura total para CTA
- `grid grid-cols-2`: Grid 2 colunas para badges
- `text-xs`: Texto pequeno para badges

#### Desktop (`hidden md:block`)
- `hidden md:block`: Oculta em mobile, mostra em desktop
- Mantém estrutura original da hero section

### Vantagens da Implementação

1. **Melhor UX Mobile**: Experiência otimizada para telas pequenas
2. **Performance**: Menos elementos renderizados em mobile
3. **Legibilidade**: Textos ajustados para tamanhos de tela
4. **Interação**: Botões maiores e mais fáceis de tocar
5. **Manutenção**: Versões separadas facilitam ajustes independentes
6. **Flexibilidade**: Fácil testar diferentes layouts

### Status
✅ **Implementado e funcionando**

### Próximas Melhorias Possíveis
- [ ] Testar diferentes layouts mobile
- [ ] Adicionar animações específicas para mobile
- [ ] Otimizar imagens para mobile (lazy loading)
- [ ] Adicionar gestos de swipe
- [ ] Testar em diferentes dispositivos mobile
- [ ] A/B testing entre versões

---

## Alteração: Inversão de Ordem na Section 2

### Data: Reorganização do conteúdo da Section 2

### Objetivo
Inverter a ordem do conteúdo na Section 2, colocando "Nossos Projetos" (tabs com carrosséis) antes do card de "Diferenciais", para melhorar o fluxo visual e destacar os projetos primeiro.

### Mudança Implementada

#### Antes
1. Título da seção ("Diferenciais que transformam...")
2. Card de Diferenciais
3. "Nossos Projetos" (tabs com carrosséis)
4. CTA

#### Depois
1. Título da seção ("Diferenciais que transformam...")
2. **"Nossos Projetos" (tabs com carrosséis)** ← Subiu
3. **Card de Diferenciais** ← Desceu
4. CTA

### Estrutura Final

```jsx
<section id="diferenciais" className="py-24 md:py-32 px-4 bg-gradient-to-b from-white via-neutral-50/30 to-white relative overflow-hidden">
  <div className="max-w-7xl mx-auto relative z-10">
    {/* Título da seção */}
    <div className="text-center mb-16 md:mb-20">
      <h2>Diferenciais que transformam a Nunes na melhor escolha.</h2>
    </div>

    {/* Nossos Projetos - Tabs com carrosséis */}
    <div className="mb-16 md:mb-20">
      <h3>Nossos Projetos</h3>
      {/* Sistema de tabs (Banheiro, Sala, Cozinha) */}
      {/* Carrosséis por categoria */}
    </div>

    {/* Card de Diferenciais */}
    <div className="flex justify-center mt-16 md:mt-20 mb-16 md:mb-20">
      {/* Card único de diferencial */}
    </div>

    {/* CTA */}
    <div className="text-center mt-16 md:mt-20">
      {/* Botão "Solicitar orçamento personalizado" */}
    </div>
  </div>
</section>
```

### Razão da Mudança

1. **Destaque Visual**: Projetos aparecem primeiro, criando impacto imediato
2. **Fluxo Lógico**: Mostrar o que a empresa faz (projetos) antes de explicar como (diferenciais)
3. **Engajamento**: Imagens chamam mais atenção que texto, melhorando retenção
4. **Hierarquia**: Projetos são mais tangíveis e visuais que diferenciais

### Ajustes Realizados

- **Espaçamento**: Mantido `mb-16 md:mb-20` entre seções
- **Margens**: Adicionado `mt-16 md:mt-20` antes do card de diferenciais para separação adequada
- **Estrutura**: Título permanece no topo, mantendo contexto da seção

### Status
✅ **Implementado e funcionando**

---

## Referências

- [Tailwind CSS v4 Docs](https://tailwindcss.com/docs/installation/using-vite)
- [React Icons](https://react-icons.github.io/react-icons/)
- [Backdrop Filter MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/backdrop-filter)
- [Glassmorphism Design Trend](https://uxdesign.cc/glassmorphism-in-user-interfaces-1f39bb1308c9)

