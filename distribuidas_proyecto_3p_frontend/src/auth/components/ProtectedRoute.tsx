import { Navigate, Outlet } from 'react-router'
import { UserRole } from '../../admin/enums/user.enum'
import { useAuth } from '../hooks/useAuth'
import { Unauthorized } from '../../shared/pages/Unauthorized'
import { useSession } from '../hooks/useSession'
import { SessionExpired } from '../pages/SessionExpired'

interface ProtectedRouteProps {
  allowedRoles: UserRole[]
}

export function ProtectedRoute({ allowedRoles }: ProtectedRouteProps) {
  const { authUser, token } = useAuth()
  const { hasExpired } = useSession()

  if (hasExpired) return <SessionExpired />

  if (!authUser || !token) return <Navigate to={'/'} />

  if (!allowedRoles.includes(authUser.role)) return <Unauthorized />

  return <Outlet />
}
