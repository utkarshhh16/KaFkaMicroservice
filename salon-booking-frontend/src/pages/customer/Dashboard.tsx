import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuthStore } from '../../store/authStore'
import { useBookingStore } from '../../store/bookingStore'
import { apiClient } from '../../services/apiClient'
import { Booking, Salon } from '../../types'
import BookingCard from '../../components/common/BookingCard'
import LoadingSpinner from '../../components/common/LoadingSpinner'

export default function CustomerDashboard() {
  const user = useAuthStore((state) => state.user)
  const [bookings, setBookings] = useState<Booking[]>([])
  const [salons, setSalons] = useState<Map<string, Salon>>(new Map())
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchBookings()
  }, [])

  const fetchBookings = async () => {
    try {
      setLoading(true)
      const bookingsData = await apiClient.getMyBookings()
      setBookings(bookingsData)

      // Fetch salon info for each booking
      const salonMap = new Map<string, Salon>()
      for (const booking of bookingsData) {
        if (!salonMap.has(booking.salonId)) {
          const salon = await apiClient.getSalonById(booking.salonId)
          salonMap.set(booking.salonId, salon)
        }
      }
      setSalons(salonMap)
    } catch (error) {
      console.error('Failed to fetch bookings:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-4xl font-bold">Welcome, {user?.name}</h1>
          <p className="text-gray-600 mt-2">Manage your salon bookings</p>
        </div>
        <Link
          to="/salons"
          className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition"
        >
          Book Salon
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-blue-50 rounded-lg p-6">
          <p className="text-gray-600">Total Bookings</p>
          <p className="text-3xl font-bold text-blue-600">{bookings.length}</p>
        </div>
        <div className="bg-green-50 rounded-lg p-6">
          <p className="text-gray-600">Confirmed</p>
          <p className="text-3xl font-bold text-green-600">
            {bookings.filter((b) => b.status === 'CONFIRMED').length}
          </p>
        </div>
        <div className="bg-purple-50 rounded-lg p-6">
          <p className="text-gray-600">Completed</p>
          <p className="text-3xl font-bold text-purple-600">
            {bookings.filter((b) => b.status === 'COMPLETED').length}
          </p>
        </div>
      </div>

      {/* Bookings */}
      <h2 className="text-2xl font-bold mb-6">Your Bookings</h2>
      {loading ? (
        <LoadingSpinner />
      ) : bookings.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {bookings.map((booking) => (
            <BookingCard
              key={booking.id}
              booking={booking}
              salon={salons.get(booking.salonId)}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <p className="text-gray-600 text-lg mb-4">No bookings yet</p>
          <Link
            to="/salons"
            className="inline-block bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
          >
            Book a Salon
          </Link>
        </div>
      )}
    </div>
  )
}
