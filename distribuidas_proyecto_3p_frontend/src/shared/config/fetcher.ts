import axios from 'axios'

export const authApi = axios.create({
  baseURL: (import.meta.env.VITE_AUTH_API as string | undefined) ?? 'http://localhost:8003/auth',
  headers: {
    'Content-Type': 'application/json',
  },
})

export const usersApi = axios.create({
  baseURL: (import.meta.env.VITE_USERS_API as string | undefined) ?? 'http://localhost:8001/api',
  headers: {
    'Content-Type': 'application/json',
  },
})

export const productsApi = axios.create({
  baseURL: (import.meta.env.VITE_PRODUCTS_API as string | undefined) ?? 'http://localhost:8002/api',
  headers: {
    'Content-Type': 'application/json',
  },
})


export const ventasApi = axios.create({
  baseURL: (import.meta.env.VITE_VENTAS_API as string | undefined) ?? 'http://localhost:8002/api',
  headers: {
    'Content-Type': 'application/json',
  },
})
