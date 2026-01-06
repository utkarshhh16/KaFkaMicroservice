import { Navigate } from 'react-router-dom'
import { useAuthStore } from '../../store/authStore'
import { User } from '../types'

interface ProtectedRouteProps {
  children: React.ReactNode
  requiredRole?: User['role']
}

export default function ProtectedRoute({ children, requiredRole }: ProtectedRouteProps) {
  const user = useAuthStore((state) => state.user)

  if (!user) {
    return <Navigate to="/login" replace />
  }

  if (requiredRole && user.role !== requiredRole) {
    return <Navigate to="/" replace />
  }

  return <>{children}</>
}
