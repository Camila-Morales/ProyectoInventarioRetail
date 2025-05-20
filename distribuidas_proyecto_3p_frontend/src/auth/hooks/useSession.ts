import { useLocation } from 'react-router'
import { useAuth } from './useAuth'
import { useEffect, useState } from 'react'
import { isTokenExpired } from '../utils/auth.util'

export function useSession() {
  const { token, logout } = useAuth()
  const location = useLocation()
  const [hasExpired, setHasExpired] = useState(false)

  useEffect(() => {
    if (token && isTokenExpired(token)) {
      setHasExpired(true)
    }
  }, [token, location, logout])

  const closeSession = () => {
    setHasExpired(false)
    logout()
  }

  return {
    hasExpired,
    closeSession,
  }
}
