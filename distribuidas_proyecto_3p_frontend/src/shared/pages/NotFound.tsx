import { Link } from 'react-router'

export function NotFound() {
  return (
    <main className="flex flex-col place-content-center place-items-center gap-y-4">
      <h2 className="text-8xl font-bold text-red-600">404</h2>
      <p className="text-xl">Sorry, we couldn't find that page</p>
      <Link className="rounded-md bg-orange-600 p-2 text-gray-100 hover:bg-orange-500" to={'/'}>
        Go Back Home
      </Link>
    </main>
  )
}
