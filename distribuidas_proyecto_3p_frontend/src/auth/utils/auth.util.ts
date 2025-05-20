import { jwtDecode } from 'jwt-decode'
import { AuthUserStorage } from '../types/auth'

export function isAuthUserStorage(user: unknown): user is AuthUserStorage {
  const authUserStorage = user as AuthUserStorage

  return authUserStorage.id !== undefined
}

export function isTokenExpired(token: string) {
  try {
    const decoded = jwtDecode(token)

    if (!decoded.exp) throw new Error('Token has no expiration time')

    const expirationDate = decoded.exp * 1000
    const currentDate = Date.now()

    return expirationDate < currentDate
  } catch (error) {
    if (error instanceof Error) console.error('Token decoder error:', error.message)

    return true
  }
}
