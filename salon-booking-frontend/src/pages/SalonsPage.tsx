import { useState, useEffect } from 'react'
import { apiClient } from '../services/apiClient'
import { Salon } from '../types'
import SalonCard from '../components/common/SalonCard'
import LoadingSpinner from '../components/common/LoadingSpinner'

export default function SalonsPage() {
  const [salons, setSalons] = useState<Salon[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [filteredSalons, setFilteredSalons] = useState<Salon[]>([])

  useEffect(() => {
    fetchSalons()
  }, [])

  useEffect(() => {
    const filtered = salons.filter((salon) =>
      salon.name.toLowerCase().includes(search.toLowerCase()) ||
      salon.city.toLowerCase().includes(search.toLowerCase()) ||
      salon.address.toLowerCase().includes(search.toLowerCase())
    )
    setFilteredSalons(filtered)
  }, [search, salons])

  const fetchSalons = async () => {
    try {
      setLoading(true)
      const data = await apiClient.getSalons()
      setSalons(data)
    } catch (error) {
      console.error('Failed to fetch salons:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <h1 className="text-4xl font-bold mb-8">All Salons</h1>

      {/* Search */}
      <div className="mb-8">
        <input
          type="text"
          placeholder="Search by salon name, city, or address..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Salons Grid */}
      {loading ? (
        <LoadingSpinner />
      ) : filteredSalons.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSalons.map((salon) => (
            <SalonCard key={salon.id} salon={salon} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-600 text-lg">No salons found matching your search.</p>
        </div>
      )}
    </div>
  )
}
