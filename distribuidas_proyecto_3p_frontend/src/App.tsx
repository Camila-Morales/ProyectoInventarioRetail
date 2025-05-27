import { Route, Routes } from 'react-router'
import './App.css'
import { Login } from './auth/pages/Login'
import { NotFound } from './shared/pages/NotFound'
import { Layout } from './shared/layouts/Layout'
import { Home } from './home/pages/Home'
import { AuthProvider } from './auth/components/AuthProvider'
import { ProtectedRoute } from './auth/components/ProtectedRoute'
import { UserRole } from './admin/enums/user.enum'
import { Dashboard } from './home/pages/Dashboard'
import { Users } from './admin/pages/Users'
import { Products } from './store/pages/Products'
import { AddUser } from './admin/pages/AddUser'
import { AddProduct } from './store/pages/AddProduct'
import { ReporteVentas } from './shared/components/ReporteVentas'
import { RegisterSalePage } from './admin/pages/RegisterSalePage'

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route element={<ProtectedRoute allowedRoles={[UserRole.ADMIN, UserRole.STORE]} />}>
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>
          <Route element={<ProtectedRoute allowedRoles={[UserRole.ADMIN]} />}>
            <Route path="/users" element={<Users />} />
            <Route path="/users/add" element={<AddUser />} />
          </Route>
          <Route element={<ProtectedRoute allowedRoles={[UserRole.STORE]} />}>
            <Route path="/products" element={<Products />} />
            <Route path="/products/add" element={<AddProduct />} />
            <Route path="/ventas/nueva" element={<RegisterSalePage />} />
            <Route path="/ventas/reporte" element={<ReporteVentas />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </AuthProvider>
  )
}

export default App
