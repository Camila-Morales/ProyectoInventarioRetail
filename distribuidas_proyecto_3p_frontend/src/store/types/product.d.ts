export interface Product {
  id: number
  sku: string
  name: string
  description: string
  price: number
  stock: number
}

export type PostProduct = Omit<Product, 'id'>

export type PutProduct = Omit<Product, 'id'>
