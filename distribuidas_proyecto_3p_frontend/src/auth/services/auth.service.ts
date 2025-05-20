import { AxiosError } from 'axios'
import { authApi, usersApi } from '../../shared/config/fetcher'
import { AuthToken, AuthUser } from '../types/auth'
import { isAuthTokenDto, isAuthUserDto, mapFromAuthUserDto } from '../utils/auth-dto.util'

export async function getToken(email: string, password: string): Promise<AuthToken | undefined> {
  try {
    const response = await authApi.post('/login', {
      email,
      password,
    })

    const authToken = response.data as unknown

    if (!isAuthTokenDto(authToken)) throw new Error('Email or password incorrect')

    return authToken.token
  } catch (error) {
    if (error instanceof Error) {
      const UNAUTHORIZED = 401
      if (error.message.includes(UNAUTHORIZED.toString()))
        throw new Error('Email or password incorrect')
      throw error
    }

    if (error instanceof AxiosError) throw new Error(error.message)
  }
}

export async function login(
  email: string,
  password: string,
  token: string,
): Promise<AuthUser | undefined> {
  try {
    const response = await usersApi.post(
      '/auth/login',
      { email, password },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    )

    const authUser = response.data as unknown

    if (!isAuthUserDto(authUser)) throw new Error('Invalid token')

    return mapFromAuthUserDto(authUser)
  } catch (error) {
    if (error instanceof Error) throw error

    if (error instanceof AxiosError) throw new Error(error.message)
  }
}
