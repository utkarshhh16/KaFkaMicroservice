import { Link, useNavigate } from 'react-router-dom'
import { useAuthStore } from '../../store/authStore'

export default function Navbar() {
  const { user, logout } = useAuthStore()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  const getDashboardLink = () => {
    if (!user) return null
    switch (user.role) {
      case 'CUSTOMER':
        return '/customer/dashboard'
      case 'SALON':
        return '/salon/dashboard'
      case 'ADMIN':
        return '/admin/dashboard'
      default:
        return null
    }
  }

  return (
    <nav className="bg-white shadow">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-blue-600">
          💇 Salon Booking
        </Link>

        <ul className="flex gap-6">
          <li>
            <Link to="/" className="text-gray-700 hover:text-blue-600">
              Home
            </Link>
          </li>
          <li>
            <Link to="/salons" className="text-gray-700 hover:text-blue-600">
              Salons
            </Link>
          </li>
          {user && (
            <li>
              <Link to={getDashboardLink() || '/'} className="text-gray-700 hover:text-blue-600">
                Dashboard
              </Link>
            </li>
          )}
        </ul>

        <div className="flex gap-3">
          {user ? (
            <>
              <span className="text-gray-700 py-2">{user.name}</span>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="px-4 py-2 border border-blue-500 text-blue-500 rounded hover:bg-blue-50"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}
