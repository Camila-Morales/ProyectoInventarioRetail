import { AuthUser } from '../../auth/types/auth'
import { isAuthUserStorage } from '../../auth/utils/auth.util'

const TOKEN_ITEM_KEY = 'authToken'
const AUTH_USER_ITEM_KEY = 'authUser'

export function getSavedToken() {
  const localToken = localStorage.getItem(TOKEN_ITEM_KEY)
  return localToken
}

export function saveToken(token: string) {
  localStorage.setItem(TOKEN_ITEM_KEY, token)
}

export function removeSavedToken() {
  localStorage.removeItem(TOKEN_ITEM_KEY)
}

export function getSavedAuthUser(): AuthUser | null {
  const previousSessionJson = localStorage.getItem(AUTH_USER_ITEM_KEY)

  if (!previousSessionJson) return null

  const previousSession = JSON.parse(previousSessionJson) as unknown

  if (!isAuthUserStorage(previousSession)) return null

  return {
    email: '',
    id: previousSession.id,
    name: previousSession.name,
    role: previousSession.role,
  }
}

export function saveAuthUser(authUser: AuthUser) {
  const authSession = {
    id: authUser.id,
    name: authUser.name,
    role: authUser.role,
  }

  localStorage.setItem(AUTH_USER_ITEM_KEY, JSON.stringify(authSession))
}

export function removeSavedAuthUser() {
  localStorage.removeItem(AUTH_USER_ITEM_KEY)
}
