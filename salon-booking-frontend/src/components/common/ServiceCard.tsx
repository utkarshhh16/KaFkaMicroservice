import { Service } from '../../types'

interface ServiceCardProps {
  service: Service
  onBook?: (service: Service) => void
}

export default function ServiceCard({ service, onBook }: ServiceCardProps) {
  return (
    <div className="bg-white rounded-lg shadow p-4 hover:shadow-lg transition">
      <div className="flex justify-between items-start mb-3">
        <div>
          <h4 className="font-semibold text-lg">{service.name}</h4>
          <p className="text-sm text-gray-600">{service.category}</p>
        </div>
        <span className="text-lg font-bold text-green-600">₹{service.price}</span>
      </div>
      <p className="text-gray-700 text-sm mb-3">{service.description || 'Premium salon service'}</p>
      <div className="flex justify-between items-center">
        <span className="text-xs text-gray-500">{service.duration} mins</span>
        {onBook && (
          <button
            onClick={() => onBook(service)}
            className="bg-blue-500 text-white px-4 py-2 rounded text-sm hover:bg-blue-600 transition"
          >
            Book Now
          </button>
        )}
      </div>
    </div>
  )
}
