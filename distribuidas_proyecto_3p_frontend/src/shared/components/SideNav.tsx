import { Link, useLocation } from 'react-router'
import PageLoco from '../../assets/img/PageLogo.png'
import { FiLogIn } from 'react-icons/fi'
import { UserRole } from '../../admin/enums/user.enum'
import { MdOutlineLocalGroceryStore, MdOutlineStore, MdPointOfSale, MdBarChart, MdLogout } from 'react-icons/md'
import { useAuth } from '../../auth/hooks/useAuth'
import { AiOutlineDashboard } from 'react-icons/ai'

const links = {
  default: [
    {
      href: '/login',
      icon: FiLogIn,
      text: 'Login',
    },
  ],
  [UserRole.ADMIN]: [
    {
      href: '/dashboard',
      icon: AiOutlineDashboard,
      text: 'Dashboard',
    },
    {
      href: '/users',
      icon: MdOutlineStore,
      text: 'Users',
    },
  ],
  [UserRole.STORE]: [
    {
      href: '/dashboard',
      icon: AiOutlineDashboard,
      text: 'Dashboard',
    },
    {
      href: '/products',
      icon: MdOutlineLocalGroceryStore,
      text: 'Products',
    },
    {
      href: '/ventas/nueva',
      icon: MdPointOfSale,
      text: 'Registrar Venta',
    },
    {
      href: '/ventas/reporte',
      icon: MdBarChart,
      text: 'Reporte de Ventas',
    },
  ],
}

export function SideNav() {
  const { authUser, logout } = useAuth()
  const location = useLocation()

  return (
    <header className="sticky top-0 flex h-screen overflow-y-auto bg-gray-100">
      <nav className="flex grow flex-col">
        <div className="border-b-1 border-b-gray-300 p-6 text-center">
          <Link className="inline-flex place-items-center justify-center gap-2" to={'/'}>
            <img className="w-10" src={PageLoco} alt="React icon" />
            <h1 className="font-semibold">RETAIL TRACK</h1>
          </Link>
        </div>
        <ul className="flex grow flex-col justify-between p-4 text-sm">
          <div>
            {links[authUser ? authUser.role : 'default'].map((link) => (
              <li key={link.href}>
                <Link
                  className={`flex place-items-center gap-3 rounded-md p-2 ${location.pathname === link.href ? 'bg-orange-600 text-white' : 'hover:bg-gray-200'}`}
                  to={link.href}
                >
                  <link.icon />
                  {link.text}
                </Link>
              </li>
            ))}
          </div>
          {authUser && (
            <li>
              <button
                className="flex place-items-center gap-3 place-self-stretch rounded-md p-2 hover:cursor-pointer hover:bg-gray-200 hover:text-red-600"
                type="button"
                onClick={logout}
              >
                <MdLogout />
                Logout
              </button>
            </li>
          )}
        </ul>
      </nav>
    </header>
  )
}
