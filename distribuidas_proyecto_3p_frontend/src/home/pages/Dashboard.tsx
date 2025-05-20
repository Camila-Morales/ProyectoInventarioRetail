import { useAuth } from '../../auth/hooks/useAuth'

export function Dashboard() {
  const { authUser } = useAuth()

  return (
    <main className="flex flex-col place-content-center place-items-center">
      <h2 className="text-3xl font-semibold text-orange-600">Dashboard</h2>
      <p className="text-lg">Welcome back {authUser?.name}</p>
    </main>
  )
}
