import { useSession } from '../hooks/useSession'

export function SessionExpired() {
  const { closeSession } = useSession()

  return (
    <main className="mx-auto flex max-w-160 flex-col place-content-center place-items-center gap-4">
      <h2 className="text-center text-3xl font-bold text-orange-600">Session expired</h2>
      <p>Your session timed out. To continue working, log in again</p>

      <button
        className="rounded-md bg-orange-600 p-2 text-center text-gray-100 hover:cursor-pointer hover:bg-orange-500"
        type="button"
        onClick={closeSession}
      >
        Continue
      </button>
    </main>
  )
}
