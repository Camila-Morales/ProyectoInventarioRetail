import { FaEdit, FaPlus, FaSpinner, FaTrash } from 'react-icons/fa'
import { useUsers } from '../hooks/useUsers'
import { getTextFromUserRole, isUserRole } from '../utils/user.util'
import { Link } from 'react-router'
import { useEffect, useState } from 'react'
import { UserRole } from '../enums/user.enum'
import { User } from '../types/user'
import { EditUserModal } from './EditUserModal'
import { deleteUser as deleteUserService } from '../services/user.service'

export function UsersDashboard() {
  const { users, loading, error } = useUsers()
  const [dashboardUsers, setDashboardUsers] = useState(users)
  const [editingUser, setEditingUser] = useState<User | null>(null)
  const [filteredUsers, setFilteredUsers] = useState(dashboardUsers)

  useEffect(() => {
    if (!users) return

    setDashboardUsers(users)
    setFilteredUsers(users)
  }, [users])

  const changeRoleFilter = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const filter = e.target.value

    if (!dashboardUsers) return

    if (filter === 'all') return setFilteredUsers(dashboardUsers)

    const roleFilter = Number(filter)

    if (isUserRole(roleFilter)) {
      const filteredUsers = dashboardUsers.filter((user) => {
        return user.role === roleFilter
      })
      setFilteredUsers(filteredUsers)
    }
  }

  const deleteUser = (userIdDeleting: number) => {
    deleteUserService(userIdDeleting)
      .then((deleted) => {
        if (deleted) {
          setDashboardUsers((users) => users?.filter((user) => user.id !== userIdDeleting) ?? null)
          setFilteredUsers((users) => users?.filter((user) => user.id !== userIdDeleting) ?? null)
        }
      })
      .catch(() => {})
  }

  const openEditModal = (user: User) => {
    setEditingUser(user)
  }

  const closeEditModal = () => {
    setEditingUser(null)
  }

  const handleEditSave = (updatedUser: User | undefined) => {
    if (updatedUser)
      setFilteredUsers(
        (users) => users?.map((user) => (user.id === updatedUser.id ? updatedUser : user)) ?? null,
      )

    closeEditModal()
  }

  return (
    <section className="px-8">
      <header className="flex items-center justify-between py-6 text-left">
        <div>
          <h2 className="text-2xl font-bold">Users</h2>
          <p className="text-gray-400">Page to manage users</p>
        </div>
        <div>
          <Link
            to={'/users/add'}
            className="flex items-center gap-2 rounded-md bg-orange-600 p-2 text-xs text-gray-100 hover:cursor-pointer hover:bg-orange-500"
            type="button"
          >
            <FaPlus /> Add user
          </Link>
        </div>
      </header>
      <form className="flex items-center gap-2 pb-4">
        <label htmlFor="role-filter">Role</label>
        <select
          className="rounded-md border border-gray-400 p-1"
          name="role-filter"
          id="role-filter"
          onChange={changeRoleFilter}
        >
          <option value="all">All</option>
          <option value={UserRole.ADMIN}>Admin</option>
          <option value={UserRole.STORE}>Store</option>
        </select>
      </form>
      <div className="custom-scrollbar relative h-[70vh] overflow-y-auto">
        <table className="my-[-20px] w-full border-separate border-spacing-y-5 gap-4 text-center text-sm">
          <thead className="sticky top-0">
            <tr className="bg-gray-100">
              <th className="rounded-l-md border-t border-b border-l border-gray-300 p-2 px-5">
                Name
              </th>
              <th className="border-t border-b border-gray-300 p-2 px-5">Email</th>
              <th className="border-t border-b border-gray-300 p-2 px-5">Role</th>
              <th className="rounded-r-md border-t border-r border-b border-gray-300 p-2 px-5">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="">
            {loading ? (
              <tr>
                <td className="p-2 text-center" colSpan={4}>
                  <FaSpinner className="inline animate-spin" />
                </td>
              </tr>
            ) : !filteredUsers || !filteredUsers.length ? (
              <tr>
                <td className="text-gray-400" colSpan={4}>
                  {error || 'Users not found'}
                </td>
              </tr>
            ) : (
              filteredUsers.map((user) => (
                <tr key={user.id}>
                  <td className="rounded-l-md border-t border-b border-l border-gray-300 p-2 px-5">
                    {user.name}
                  </td>
                  <td className="border-t border-b border-gray-300 p-2 px-5">{user.email}</td>
                  <td className="border-t border-b border-gray-300 p-2 px-5">
                    {getTextFromUserRole(user.role)}
                  </td>
                  <td className="rounded-r-md border-t border-r border-b border-gray-300 p-2 px-5">
                    <div className="flex justify-center gap-4">
                      <button
                        className="text-amber-500 hover:cursor-pointer"
                        type="button"
                        onClick={() => openEditModal(user)}
                      >
                        <FaEdit />
                      </button>
                      <button
                        className="text-red-600 hover:cursor-pointer"
                        type="button"
                        onClick={() => deleteUser(user.id)}
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {editingUser && (
        <EditUserModal user={editingUser} onClose={closeEditModal} onSave={handleEditSave} />
      )}
    </section>
  )
}
