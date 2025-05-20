import { useEffect, useState } from 'react'
import { User } from '../types/user'
import { getUsers } from '../services/user.service'

export function useUsers() {
  const [users, setUsers] = useState<User[] | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    setLoading(true)
    getUsers()
      .then((users) => users && setUsers(users))
      .catch((error) => {
        if (error instanceof Error) return setError(error.message)

        setError("Users can't be loaded")
      })
      .finally(() => setLoading(false))
  }, [])

  return {
    users,
    loading,
    error,
  }
}
