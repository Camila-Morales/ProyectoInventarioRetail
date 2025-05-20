import { Outlet } from 'react-router'

import { SideNav } from '../components/SideNav'

export function Layout() {
  return (
    <div className="relative grid grid-cols-[minmax(216px,_0.25fr)_1fr]">
      <SideNav />
      <Outlet />
    </div>
  )
}
