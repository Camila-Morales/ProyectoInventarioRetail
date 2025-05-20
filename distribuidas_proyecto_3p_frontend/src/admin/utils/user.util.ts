import { UserRole } from '../enums/user.enum'

export function getTextFromUserRole(role: UserRole) {
  switch (role) {
    case UserRole.ADMIN:
      return 'Admin'

    case UserRole.STORE:
      return 'Store'

    default:
      return 'Unknown'
  }
}

export function isUserRole(value: number): value is UserRole {
  return UserRole[value] !== undefined
}
