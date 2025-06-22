'use client'

import { useActionState, useState } from 'react'
import { addToCart } from '@/lib/actions'

export default function AddToCartButton({ productId, quantity = 1, disabled = false, className = '' }) {
  const [state, action] = useActionState(addToCart, {})
  const [isLoading, setIsLoading] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)

  const handleSubmit = async (formData) => {
    setIsLoading(true)
    setIsAnimating(true)
    try {
      await action(formData)
      if (!state.error) {
        setShowSuccess(true)
        setTimeout(() => {
          setShowSuccess(false)
          setIsAnimating(false)
        }, 2000)
      } else {
        setIsAnimating(false)
      }
    } finally {
      setIsLoading(false)
    }
  }

  if (showSuccess) {
    return (
      <button
        disabled
        className="inline-flex items-center justify-center px-6 py-3 rounded-xl text-sm font-medium bg-green-500/20 text-green-300 border border-green-400/30 backdrop-blur-md transition-all cart-success"
      >
        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
        ✨ Sepete Eklendi!
      </button>
    )
  }

  return (
    <div>
      <form action={handleSubmit}>
        <input type="hidden" name="productId" value={productId} />
        <input type="hidden" name="quantity" value={quantity} />
        <button
          type="submit"
          disabled={disabled || isLoading}
          className={`cart-button inline-flex items-center justify-center px-6 py-3 rounded-xl text-sm font-medium transition-all transform shadow-lg ${
            disabled 
              ? 'bg-slate-600/50 text-slate-400 cursor-not-allowed border border-slate-500/30' 
              : isLoading
                ? 'bg-purple-600/50 text-purple-300 border border-purple-400/30 cart-pulse'
                : 'bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-500 hover:to-pink-500 border-0 cart-shimmer'
          } backdrop-blur-md ${isAnimating ? 'cart-bounce' : ''} ${className}`}
        >
                     {isLoading ? (
             <>
               <svg className="w-4 h-4 mr-2 animate-spin" fill="none" viewBox="0 0 24 24">
                 <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                 <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
               </svg>
               🛒 Ekleniyor...
             </>
           ) : (
             <>
               <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.5 6M7 13l-1.5 6m0 0h9" />
               </svg>
               {disabled ? '❌ Stokta Yok' : '🛒 Sepete Ekle'}
             </>
           )}
        </button>
      </form>

      {/* Durum Mesajları */}
      {state.error && (
        <div className="mt-2 text-sm text-red-300 bg-red-500/10 backdrop-blur-md border border-red-400/30 rounded-lg px-3 py-2">
          ❌ {state.error}
        </div>
      )}
    </div>
  )
} 