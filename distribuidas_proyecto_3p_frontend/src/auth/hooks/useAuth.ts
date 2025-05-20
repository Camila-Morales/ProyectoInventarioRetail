import { use } from 'react'
import { AuthContext } from '../context/AuthContext'

export function useAuth() {
  const authContext = use(AuthContext)

  if (!authContext) throw new Error('useAuth context should be use inside a AuthProvider')

  return authContext
}
