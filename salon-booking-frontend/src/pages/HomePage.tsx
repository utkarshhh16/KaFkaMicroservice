import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { apiClient } from '../services/apiClient'
import { Salon } from '../types'
import SalonCard from '../components/common/SalonCard'
import LoadingSpinner from '../components/common/LoadingSpinner'

export default function HomePage() {
  const [salons, setSalons] = useState<Salon[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchSalons()
  }, [])

  const fetchSalons = async () => {
    try {
      setLoading(true)
      const data = await apiClient.getSalons()
      setSalons(data.slice(0, 6)) // Featured salons
    } catch (error) {
      console.error('Failed to fetch salons:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-lg p-12 mb-12 text-center">
        <h1 className="text-4xl font-bold mb-4">Welcome to Salon Booking</h1>
        <p className="text-xl mb-8">Find and book the best salons near you instantly</p>
        <Link
          to="/salons"
          className="inline-block bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
        >
          Browse Salons
        </Link>
      </div>

      {/* Featured Salons */}
      <section>
        <h2 className="text-3xl font-bold mb-8">Featured Salons</h2>
        {loading ? (
          <LoadingSpinner />
        ) : salons.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {salons.map((salon) => (
              <SalonCard key={salon.id} salon={salon} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-600">No salons found. Check back later!</p>
          </div>
        )}
      </section>

      {/* Stats Section */}
      <section className="mt-16 bg-gray-50 rounded-lg p-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div>
            <p className="text-4xl font-bold text-blue-600 mb-2">500+</p>
            <p className="text-gray-600">Salons</p>
          </div>
          <div>
            <p className="text-4xl font-bold text-green-600 mb-2">10K+</p>
            <p className="text-gray-600">Happy Customers</p>
          </div>
          <div>
            <p className="text-4xl font-bold text-purple-600 mb-2">50K+</p>
            <p className="text-gray-600">Bookings</p>
          </div>
        </div>
      </section>
    </div>
  )
}
