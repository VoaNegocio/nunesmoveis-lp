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
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-xl p-4 transition-opacity duration-300"
      onClick={onClose}
      style={{
        opacity: isOpen ? 1 : 0,
        pointerEvents: isOpen ? 'auto' : 'none'
      }}
    >
      {/* Container do modal */}
      <div
        className="relative max-w-7xl w-full max-h-[90vh] flex items-center justify-center"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Botão fechar */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white p-3 rounded-full transition-all duration-300 hover:scale-110 border border-white/20 hover:border-white/40 shadow-lg"
          aria-label="Fechar modal"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Imagem no modal */}
        <div className="relative w-full h-full flex items-center justify-center">
          <img
            key={currentIndex}
            src={currentImage.src}
            alt={currentImage.alt || currentImage.nome}
            className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl transition-opacity duration-300"
            style={{
              animation: 'fadeIn 0.3s ease-in-out'
            }}
          />
          
          {/* Nome do projeto */}
          {currentImage.nome && (
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 bg-white/10 backdrop-blur-md px-6 py-3 rounded-xl border border-white/20 shadow-lg">
              <p className="text-white font-semibold text-lg">{currentImage.nome}</p>
            </div>
          )}
        </div>

        {/* Botão anterior */}
        {images.length > 1 && (
          <button
            onClick={(e) => {
              e.stopPropagation()
              onPrev()
            }}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white p-4 rounded-full transition-all duration-300 hover:scale-110 border border-white/20 hover:border-white/40 shadow-lg z-10"
            aria-label="Imagem anterior"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
        )}

        {/* Botão próximo */}
        {images.length > 1 && (
          <button
            onClick={(e) => {
              e.stopPropagation()
              onNext()
            }}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white p-4 rounded-full transition-all duration-300 hover:scale-110 border border-white/20 hover:border-white/40 shadow-lg z-10"
            aria-label="Próxima imagem"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        )}

        {/* Indicadores */}
        {images.length > 1 && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/20">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={(e) => {
                  e.stopPropagation()
                  onSelectImage(index)
                }}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex ? 'w-8 bg-white' : 'w-2 bg-white/40 hover:bg-white/60'
                }`}
                aria-label={`Ir para imagem ${index + 1}`}
              />
            ))}
          </div>
        )}

        {/* Contador de imagens */}
        {images.length > 1 && (
          <div className="absolute top-4 left-4 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/20">
            <p className="text-white text-sm font-medium">
              {currentIndex + 1} / {images.length}
            </p>
          </div>
        )}
      </div>

      {/* Estilos de animação */}
      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>
    </div>
  )
}

export default GalleryModal

