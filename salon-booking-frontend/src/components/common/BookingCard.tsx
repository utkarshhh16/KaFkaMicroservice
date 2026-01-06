import { Booking, Salon } from '../../types'

interface BookingCardProps {
  booking: Booking
  salon?: Salon
}

const statusColors: Record<string, string> = {
  PENDING: 'bg-yellow-100 text-yellow-800',
  CONFIRMED: 'bg-green-100 text-green-800',
  COMPLETED: 'bg-blue-100 text-blue-800',
  CANCELLED: 'bg-red-100 text-red-800',
}

export default function BookingCard({ booking, salon }: BookingCardProps) {
  return (
    <div className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-semibold">Booking #{booking.id.slice(0, 8)}</h3>
          {salon && <p className="text-gray-600">{salon.name}</p>}
        </div>
        <span className={`px-3 py-1 rounded-full text-sm font-medium ${statusColors[booking.status]}`}>
          {booking.status}
        </span>
      </div>
      <div className="space-y-2 text-sm">
        <p><span className="font-medium">Date:</span> {new Date(booking.date).toLocaleDateString()}</p>
        <p><span className="font-medium">Time:</span> {booking.time}</p>
        <p><span className="font-medium">Price:</span> ₹{booking.totalPrice}</p>
        {booking.notes && <p><span className="font-medium">Notes:</span> {booking.notes}</p>}
      </div>
      {booking.status === 'PENDING' && (
        <button className="mt-4 w-full bg-red-500 text-white py-2 rounded hover:bg-red-600 transition">
          Cancel Booking
        </button>
      )}
    </div>
  )
}
