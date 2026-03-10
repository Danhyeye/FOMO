"use client"

import React, { createContext, useContext, useState, useCallback, useEffect } from "react"

export interface CartItem {
  id: string
  name: string
  price: number
  image?: string
  duration?: string
  effects?: Array<{
    id: string
    name: string
    price: number
    image?: string
    quantity: number
  }>
  quantity: number
}

interface CartContextType {
  items: CartItem[]
  addItem: (item: Omit<CartItem, "id" | "quantity">) => void
  removeItem: (id: string) => void
  updateQuantity: (id: string, quantity: number) => void
  updateEffectQuantity: (itemId: string, effectId: string, quantity: number) => void
  clearCart: () => void
  total: number
  itemCount: number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

const STORAGE_KEY = "foso-cart"

const loadCartFromStorage = (): CartItem[] => {
  if (typeof window === "undefined") return []
  
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      return JSON.parse(stored)
    }
  } catch (error) {
    console.error("Failed to load cart from localStorage:", error)
  }
  return []
}

const saveCartToStorage = (items: CartItem[]) => {
  if (typeof window === "undefined") return
  
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
  } catch (error) {
    console.error("Failed to save cart to localStorage:", error)
  }
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const loadedItems = loadCartFromStorage()
    if (loadedItems.length > 0) {
      setItems(loadedItems)
    }
  }, [])

  useEffect(() => {
    if (mounted) {
      saveCartToStorage(items)
    }
  }, [items, mounted])

  const addItem = useCallback((item: Omit<CartItem, "id" | "quantity">) => {
    setItems((prev) => {
      const existingIndex = prev.findIndex(
        (i) => i.name === item.name && !item.effects
      )
      
      if (existingIndex >= 0) {
        const updated = [...prev]
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + 1,
        }
        return updated
      }
      
      return [
        ...prev,
        {
          ...item,
          id: `${Date.now()}-${Math.random()}`,
          quantity: 1,
          effects: item.effects?.map((e) => ({ ...e, quantity: 1 })),
        },
      ]
    })
  }, [])

  const removeItem = useCallback((id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id))
  }, [])

  const updateQuantity = useCallback((id: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(id)
      return
    }
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity } : item))
    )
  }, [removeItem])

  const updateEffectQuantity = useCallback(
    (itemId: string, effectId: string, quantity: number) => {
      setItems((prev) =>
        prev.map((item) => {
          if (item.id === itemId && item.effects) {
            return {
              ...item,
              effects: item.effects.map((effect) =>
                effect.id === effectId ? { ...effect, quantity } : effect
              ),
            }
          }
          return item
        })
      )
    },
    []
  )

  const clearCart = useCallback(() => {
    setItems([])
  }, [])

  const total = items.reduce((sum, item) => {
    const itemTotal = item.price * item.quantity
    const effectsTotal =
      item.effects?.reduce(
        (sum, effect) => sum + effect.price * effect.quantity,
        0
      ) || 0
    return sum + itemTotal + effectsTotal
  }, 0)

  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        updateEffectQuantity,
        clearCart,
        total,
        itemCount,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}
