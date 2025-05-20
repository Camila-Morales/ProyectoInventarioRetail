import { PostProduct, Product, PutProduct } from '../types/product'
import { PostProductDto, ProductDto, PutProductDto } from '../types/product-dto'

export function isProductDto(object: unknown): object is ProductDto {
  const productDto = object as ProductDto

  return productDto.id !== undefined
}

export function isProductsDto(array: unknown): array is ProductDto[] {
  const productsDto = array as ProductDto[]
  return productsDto instanceof Array && (productsDto.length === 0 || isProductDto(productsDto[0]))
}

export function mapFromProductDto(productDto: ProductDto): Product {
  return {
    id: productDto.id,
    sku: productDto.sku,
    name: productDto.name,
    description: productDto.description,
    price: productDto.price,
    stock: productDto.stock,
  }
}

export function mapToPostProductDto(product: PostProduct): PostProductDto {
  return {
    description: product.description,
    name: product.name,
    price: product.price,
    sku: product.sku,
    stock: product.stock,
  }
}

export function mapToPutProductDto(product: PutProduct): PutProductDto {
  return {
    description: product.description,
    name: product.name,
    price: product.price,
    sku: product.sku,
    stock: product.stock,
  }
}
