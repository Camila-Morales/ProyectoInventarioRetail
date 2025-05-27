import { useCallback, useEffect, useMemo, useState } from 'react'
import { AuthContext } from '../context/AuthContext'
import { AuthUser } from '../types/auth'
import { getToken, login as loginService } from '../services/auth.service'
import { useNavigate } from 'react-router'
import { setApiAuthToken } from '../../shared/utils/fetcher.util'
import { productsApi, usersApi,ventasApi } from '../../shared/config/fetcher'
import {
  getSavedAuthUser,
  getSavedToken,
  removeSavedAuthUser,
  removeSavedToken,
  saveAuthUser,
  saveToken,
} from '../../shared/utils/storage.util'
import { isTokenExpired } from '../utils/auth.util'

interface AuthProviderProps {
  children: React.ReactElement
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [authUser, setAuthUser] = useState<AuthUser | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [token, setToken] = useState<string | null>(null)
  const navigate = useNavigate()

  useEffect(() => {
    setApiAuthToken(usersApi, token)
    setApiAuthToken(productsApi, token)
    setApiAuthToken(ventasApi, token)
  }, [token])

  useEffect(() => {
    const savedToken = getSavedToken()
    const savedAuthUser = getSavedAuthUser()

    if (!savedToken || !savedAuthUser) return

    if (!isTokenExpired(savedToken)) {
      setToken(savedToken)
      setAuthUser(savedAuthUser)
    }

    removeSavedToken()
    removeSavedAuthUser()
  }, [])

  useEffect(() => {
    const handleUnload = () => {
      if (authUser && token) {
        saveToken(token)
        saveAuthUser(authUser)
      }
    }

    window.addEventListener('beforeunload', handleUnload)

    return () => {
      window.removeEventListener('beforeunload', handleUnload)
    }
  }, [authUser, token])

  const logout = useCallback(() => {
    setToken(null)
    setAuthUser(null)
    void navigate('/login', { replace: true })
  }, [navigate])

  const login = useCallback(
    async (email: string, password: string) => {
      try {
        setError(null)
        const token = await getToken(email, password)

        if (!token) return setError('Email or password incorrect')

        const authUser = await loginService(email, password, token)

        if (!authUser) return setError('Email or password incorrect')

        setToken(token)
        setAuthUser(authUser)
        void navigate('/dashboard')
      } catch (error) {
        if (error instanceof Error) setError(error.message)
      }
    },
    [navigate],
  )

  const contextValue = useMemo(
    () => ({
      authUser,
      error,
      token,
      logout,
      login,
    }),
    [authUser, error, token, login, logout],
  )

  return <AuthContext value={contextValue}>{children}</AuthContext>
}
