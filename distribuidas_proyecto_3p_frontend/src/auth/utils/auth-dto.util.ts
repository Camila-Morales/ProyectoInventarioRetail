import { AuthUser } from '../types/auth'
import { AuthTokenDto, AuthUserDto } from '../types/auth-dto'

export function mapFromAuthUserDto(authUserDto: AuthUserDto): AuthUser {
  return {
    email: authUserDto.email,
    id: authUserDto.id,
    name: authUserDto.name,
    role: authUserDto.role.id,
  }
}

export function isAuthTokenDto(response: unknown): response is AuthTokenDto {
  const token = (response as AuthTokenDto).token
  return typeof token === 'string'
}

export function isAuthUserDto(authUser: unknown): authUser is AuthUserDto {
  const user = authUser as AuthUserDto

  return user.id !== undefined && typeof user.name === 'string'
}
