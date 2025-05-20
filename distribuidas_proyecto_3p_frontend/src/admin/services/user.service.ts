import { PostUser, User } from '../types/user'
import { usersApi } from '../../shared/config/fetcher'
import { AxiosError } from 'axios'
import {
  isUserDto,
  isUsersDto,
  mapFromUserDto,
  mapToPostUserDto,
  mapToPutUserDto,
} from '../utils/user-dto.util'

export async function getUsers(): Promise<User[] | null> {
  try {
    const response = await usersApi.get('/users')

    const usersDto = response.data as unknown

    if (!isUsersDto(usersDto)) {
      throw new Error('Users cannot be loaded')
    }

    const usersMapped = usersDto.map((userDto) => mapFromUserDto(userDto))

    return usersMapped
  } catch (error) {
    if (error instanceof Error) throw error

    if (error instanceof AxiosError) throw new Error(error.message)

    return null
  }
}

export async function postUser(newUser: PostUser): Promise<User | undefined> {
  try {
    const response = await usersApi.post('/users', mapToPostUserDto(newUser))

    const userCreated = response.data as unknown

    if (!isUserDto(userCreated)) throw new Error('User cannot be created')

    return mapFromUserDto(userCreated)
  } catch (error) {
    if (error instanceof Error) throw error

    if (error instanceof AxiosError) throw new Error(error.message)
  }
}

export async function putUser(id: number, updateUser: PostUser): Promise<User | undefined> {
  try {
    const response = await usersApi.put(`/users/${id}`, mapToPutUserDto(updateUser))

    const userUpdated = response.data as unknown

    if (!isUserDto(userUpdated)) throw new Error('User cannot be updated')

    return mapFromUserDto(userUpdated)
  } catch (error) {
    if (error instanceof Error) throw error

    if (error instanceof AxiosError) throw new Error(error.message)
  }
}

export async function deleteUser(id: number): Promise<boolean | undefined> {
  try {
    await usersApi.delete(`/users/${id}`)
    return true
  } catch (error) {
    if (error instanceof Error) throw error

    if (error instanceof AxiosError) throw new Error(error.message)
  }
}
