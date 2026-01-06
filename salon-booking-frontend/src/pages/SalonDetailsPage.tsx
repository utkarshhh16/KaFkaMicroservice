import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { apiClient } from '../services/apiClient'
import { Salon, Service } from '../types'
import ServiceCard from '../components/common/ServiceCard'
import LoadingSpinner from '../components/common/LoadingSpinner'
import { useAuthStore } from '../store/authStore'

export default function SalonDetailsPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const user = useAuthStore((state) => state.user)
  const [salon, setSalon] = useState<Salon | null>(null)
  const [services, setServices] = useState<Service[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (id) fetchSalonDetails()
  }, [id])

  const fetchSalonDetails = async () => {
    try {
      setLoading(true)
      const salonData = await apiClient.getSalonById(id!)
      const servicesData = await apiClient.getServices(id!)
      setSalon(salonData)
      setServices(servicesData)
    } catch (error) {
      console.error('Failed to fetch salon details:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleBookService = (service: Service) => {
    if (!user) {
      navigate('/login')
      return
    }
    navigate(`/book/${salon?.id}/${service.id}`)
  }

  if (loading) return <LoadingSpinner />
  if (!salon) return <div className="text-center py-12">Salon not found</div>

  return (
    <div>
      {/* Salon Header */}
      <div className="bg-white rounded-lg shadow overflow-hidden mb-8">
        <img
          src={salon.image || 'https://via.placeholder.com/800x400'}
          alt={salon.name}
          className="w-full h-96 object-cover"
        />
        <div className="p-8">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h1 className="text-4xl font-bold mb-2">{salon.name}</h1>
              <p className="text-gray-600 text-lg mb-2">{salon.address}</p>
              <p className="text-gray-600">{salon.city}</p>
            </div>
            <div className="text-right">
              <p className="text-3xl font-bold text-yellow-500">⭐ {salon.rating.toFixed(1)}</p>
              <p className="text-gray-600 text-sm mt-2">{salon.phone}</p>
            </div>
          </div>
          <p className="text-gray-700">{salon.description}</p>
        </div>
      </div>

      {/* Services */}
      <div>
        <h2 className="text-3xl font-bold mb-8">Services</h2>
        {services.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {services.map((service) => (
              <ServiceCard
                key={service.id}
                service={service}
                onBook={handleBookService}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-600">No services available</p>
          </div>
        )}
      </div>
    </div>
  )
}
