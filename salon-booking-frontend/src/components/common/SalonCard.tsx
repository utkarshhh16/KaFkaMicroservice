import { Link } from 'react-router-dom'
import { Salon } from '../../types'

interface SalonCardProps {
  salon: Salon
}

export default function SalonCard({ salon }: SalonCardProps) {
  return (
    <div className="bg-white rounded-lg shadow hover:shadow-lg transition overflow-hidden">
      <img
        src={salon.image || 'https://via.placeholder.com/300x200?text=' + salon.name}
        alt={salon.name}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2">{salon.name}</h3>
        <p className="text-gray-600 text-sm mb-3">{salon.address}</p>
        <div className="flex justify-between items-center mb-4">
          <span className="text-yellow-500">⭐ {salon.rating.toFixed(1)}</span>
          <span className="text-gray-500 text-sm">{salon.city}</span>
        </div>
        <Link
          to={`/salons/${salon.id}`}
          className="w-full bg-blue-500 text-white py-2 rounded text-center hover:bg-blue-600 transition"
        >
          View Details
        </Link>
      </div>
    </div>
  )
}
