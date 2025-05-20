import { useEffect, useState } from 'react'
import { Product } from '../types/product'
import { getProducts } from '../services/product.service'

export function useProducts() {
  const [products, setProducts] = useState<Product[] | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    setLoading(true)
    getProducts()
      .then((products) => setProducts(products))
      .catch((error) => {
        if (error instanceof Error) return setError(error.message)
        setError("Products can't be loaded")
      })
      .finally(() => setLoading(false))
  }, [])

  return {
    products,
    loading,
    error,
  }
}
