import { AxiosError } from 'axios'
import { productsApi } from '../../shared/config/fetcher'
import { PostProduct, Product } from '../types/product'
import {
  isProductDto,
  isProductsDto,
  mapFromProductDto,
  mapToPostProductDto,
  mapToPutProductDto,
} from '../utils/product-dto.utils'

export async function getProducts(): Promise<Product[] | null> {
  try {
    const response = await productsApi.get('/products')

    const usersDto = response.data as unknown

    if (!isProductsDto(usersDto)) {
      throw new Error('Products cannot be loaded')
    }

    const usersMapped = usersDto.map((userDto) => mapFromProductDto(userDto))

    return usersMapped
  } catch (error) {
    if (error instanceof Error) throw error

    if (error instanceof AxiosError) throw new Error(error.message)

    return null
  }
}

export async function postProduct(newProduct: PostProduct): Promise<Product | undefined> {
  try {
    const response = await productsApi.post('/products', mapToPostProductDto(newProduct))

    const userCreated = response.data as unknown

    if (!isProductDto(userCreated)) throw new Error('Product cannot be created')

    return mapFromProductDto(userCreated)
  } catch (error) {
    if (error instanceof Error) throw error

    if (error instanceof AxiosError) throw new Error(error.message)
  }
}

export async function putProduct(
  id: number,
  updateProduct: PostProduct,
): Promise<Product | undefined> {
  try {
    const response = await productsApi.put(`/products/${id}`, mapToPutProductDto(updateProduct))

    const userUpdated = response.data as unknown

    if (!isProductDto(userUpdated)) throw new Error('Product cannot be updated')

    return mapFromProductDto(userUpdated)
  } catch (error) {
    if (error instanceof Error) throw error

    if (error instanceof AxiosError) throw new Error(error.message)
  }
}

export async function deleteProduct(id: number): Promise<boolean | undefined> {
  try {
    await productsApi.delete(`/products/${id}`)
    return true
  } catch (error) {
    if (error instanceof Error) throw error

    if (error instanceof AxiosError) throw new Error(error.message)
  }
}
