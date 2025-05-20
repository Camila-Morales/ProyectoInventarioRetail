export interface ProductDto {
  id: number
  sku: string
  name: string
  description: string
  price: number
  stock: number
}

export type PostProductDto = Omit<ProductDto, 'id'>

export type PutProductDto = Omit<ProductDto, 'id'>
