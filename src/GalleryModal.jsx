/**
 * GalleryModal.jsx - Componente de Modal para Galeria de Imagens
 * 
 * Modal premium com backdrop blur para exibir imagens em tamanho maior
 */

import { useEffect } from 'react'

/**
 * Componente de Modal da Galeria
 * @param {boolean} isOpen - Se o modal está aberto
 * @param {Function} onClose - Função para fechar o modal
 * @param {Array} images - Array de imagens da galeria
 * @param {number} currentIndex - Índice da imagem atual
 * @param {Function} onNext - Função para ir para próxima imagem
 * @param {Function} onPrev - Função para ir para imagem anterior
 * @param {Function} onSelectImage - Função para selecionar uma imagem específica
 */
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
      // Previne scroll do body quando modal está aberto
      document.body.style.overflow = 'hidden'
    }
    
    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'unset'
    }
  }, [isOpen, onClose])

  // Se o modal não estiver aberto, não renderiza nada
  if (!isOpen || !images || images.length === 0) {
    return null
  }

  const currentImage = images[currentIndex]

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-2xl p-4 transition-all duration-500"
      onClick={onClose}
      style={{
        opacity: isOpen ? 1 : 0,
        pointerEvents: isOpen ? 'auto' : 'none'
      }}
    >
      {/* Overlay com gradiente premium */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#1B4B7B]/20 via-black/90 to-[#1B4B7B]/20 pointer-events-none"></div>
      
      {/* Container do modal */}
      <div
        className="relative max-w-7xl w-full max-h-[90vh] flex items-center justify-center transform transition-all duration-500"
        style={{
          transform: isOpen ? 'scale(1)' : 'scale(0.95)',
          opacity: isOpen ? 1 : 0
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Efeito de brilho ao redor do modal */}
        <div className="absolute -inset-2 bg-gradient-to-r from-[#1B4B7B]/30 via-[#2a6ba8]/30 to-[#1B4B7B]/30 rounded-3xl blur-2xl opacity-50 pointer-events-none"></div>
        
        {/* Botão fechar - Premium */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 z-30 bg-white/15 hover:bg-white/25 backdrop-blur-xl text-white p-4 rounded-2xl transition-all duration-300 hover:scale-110 border-2 border-white/30 hover:border-white/50 shadow-2xl group/close"
          aria-label="Fechar modal"
        >
          <svg className="w-6 h-6 group-hover/close:rotate-90 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Imagem no modal - Premium */}
        <div className="relative w-full h-full flex items-center justify-center">
          {/* Container da imagem com efeitos premium */}
          <div className="relative group/image">
            {/* Sombra decorativa */}
            <div className="absolute -inset-4 bg-gradient-to-r from-[#1B4B7B]/20 via-transparent to-[#1B4B7B]/20 rounded-3xl blur-2xl opacity-0 group-hover/image:opacity-100 transition-opacity duration-500"></div>
            
            <img
              key={currentIndex}
              src={currentImage.src}
              alt={currentImage.alt || currentImage.nome}
              className="max-w-full max-h-[90vh] object-contain rounded-2xl shadow-2xl transition-all duration-500 border-4 border-white/10 group-hover/image:border-white/20"
              style={{
                animation: 'fadeInScale 0.5s ease-out'
              }}
            />
          </div>
        </div>

        {/* Botão anterior - Premium */}
        {images.length > 1 && (
          <button
            onClick={(e) => {
              e.stopPropagation()
              onPrev()
            }}
            className="absolute left-6 top-1/2 -translate-y-1/2 bg-white/15 hover:bg-white/25 backdrop-blur-xl text-white p-5 rounded-2xl transition-all duration-300 hover:scale-110 border-2 border-white/30 hover:border-white/50 shadow-2xl z-20 group/prev"
            aria-label="Imagem anterior"
          >
            <svg className="w-7 h-7 group-hover/prev:translate-x-[-3px] transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
        )}

        {/* Botão próximo - Premium */}
        {images.length > 1 && (
          <button
            onClick={(e) => {
              e.stopPropagation()
              onNext()
            }}
            className="absolute right-6 top-1/2 -translate-y-1/2 bg-white/15 hover:bg-white/25 backdrop-blur-xl text-white p-5 rounded-2xl transition-all duration-300 hover:scale-110 border-2 border-white/30 hover:border-white/50 shadow-2xl z-20 group/next"
            aria-label="Próxima imagem"
          >
            <svg className="w-7 h-7 group-hover/next:translate-x-[3px] transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        )}

        {/* Indicadores - Premium */}
        {images.length > 1 && (
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3 bg-white/15 backdrop-blur-xl px-6 py-3 rounded-2xl border-2 border-white/30 shadow-2xl z-20">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={(e) => {
                  e.stopPropagation()
                  onSelectImage(index)
                }}
                className={`h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex 
                    ? 'w-10 bg-gradient-to-r from-[#1B4B7B] to-[#2a6ba8] shadow-lg shadow-[#1B4B7B]/50' 
                    : 'w-3 bg-white/40 hover:bg-white/60'
                }`}
                aria-label={`Ir para imagem ${index + 1}`}
              />
            ))}
          </div>
        )}

        {/* Contador de imagens - Premium */}
        {images.length > 1 && (
          <div className="absolute top-6 left-6 bg-white/15 backdrop-blur-xl px-6 py-3 rounded-2xl border-2 border-white/30 shadow-2xl z-20">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-gradient-to-r from-[#1B4B7B] to-[#2a6ba8] animate-pulse"></div>
              <p className="text-white text-base font-bold">
                <span className="text-[#1B4B7B]">{currentIndex + 1}</span>
                <span className="text-white/60 mx-2">/</span>
                <span className="text-white/80">{images.length}</span>
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Estilos de animação - Premium */}
      <style>{`
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
      `}</style>
    </div>
  )
}

export default GalleryModal

