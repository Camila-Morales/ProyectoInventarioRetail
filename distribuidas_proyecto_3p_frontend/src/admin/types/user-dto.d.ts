export interface UserDto {
  id: number
  name: string
  password: string
  email: string
  role: UserRoleDto
  status: boolean
  failed_attempts: number
  lock_time: number | null
}

export interface UserRoleDto {
  id: number
  name: string
}

export interface PostUserDto {
  name: string
  password: string
  email: string
  role: Pick<UserRoleDto, 'id'>
  status: boolean
  failed_attempts: number
  lock_time: number | null
}

export interface PutUserDto {
  name: string
  password: string
  email: string
  role: Pick<UserRoleDto, 'id'>
  status: boolean
  failed_attempts: number
  lock_time: number | null
}
