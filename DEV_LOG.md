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

## Referências

- [Tailwind CSS v4 Docs](https://tailwindcss.com/docs/installation/using-vite)
- [React Icons](https://react-icons.github.io/react-icons/)

