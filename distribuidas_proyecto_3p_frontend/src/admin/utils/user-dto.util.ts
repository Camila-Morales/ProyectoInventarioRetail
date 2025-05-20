import { PostUser, PutUser, User } from '../types/user'
import { PostUserDto, PutUserDto, UserDto } from '../types/user-dto'

export function isUserDto(object: unknown): object is UserDto {
  const userDto = object as UserDto

  return userDto.id !== undefined
}

export function isUsersDto(array: unknown): array is UserDto[] {
  const usersDto = array as UserDto[]
  return usersDto instanceof Array && (usersDto.length === 0 || isUserDto(usersDto[0]))
}

export function mapFromUserDto(userDto: UserDto): User {
  return {
    email: userDto.email,
    id: userDto.id,
    name: userDto.name,
    role: userDto.role.id,
    failedAttempts: userDto.failed_attempts,
    lockTime: userDto.lock_time,
    password: userDto.password,
    status: userDto.status,
  }
}

export function mapToPostUserDto(user: PostUser): PostUserDto {
  return {
    email: user.email,
    failed_attempts: 0,
    lock_time: null,
    name: user.name,
    password: user.password,
    role: {
      id: user.role,
    },
    status: user.status,
  }
}

export function mapToPutUserDto(user: PutUser): PutUserDto {
  return {
    email: user.email,
    failed_attempts: 0,
    lock_time: null,
    name: user.name,
    password: user.password,
    role: {
      id: user.role,
    },
    status: user.status,
  }
}
