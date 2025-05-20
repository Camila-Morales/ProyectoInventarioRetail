import { UserRole } from '../enums/user.enum'

export interface User {
  id: number
  name: string
  password: string
  email: string
  role: UserRole
  status: boolean
  failedAttempts: number
  lockTime: number | null
}

export type PostUser = Omit<User, 'id' | 'failedAttempts' | 'lockTime'>

export type PutUser = Omit<User, 'id' | 'failedAttempts' | 'lockTime'>
