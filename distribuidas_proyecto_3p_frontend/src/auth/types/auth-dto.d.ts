export interface AuthTokenDto {
  token: string
}

export interface AuthUserDto {
  id: number
  name: string
  password: string
  email: string
  role: AuthRoleDto
  status: boolean
  failed_attempts: number
  lock_time: null
}

export interface AuthRoleDto {
  id: number
  name: string
}
