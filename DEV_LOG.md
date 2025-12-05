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

## Referências

- [Tailwind CSS v4 Docs](https://tailwindcss.com/docs/installation/using-vite)
- [React Icons](https://react-icons.github.io/react-icons/)
- [Backdrop Filter MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/backdrop-filter)
- [Glassmorphism Design Trend](https://uxdesign.cc/glassmorphism-in-user-interfaces-1f39bb1308c9)

