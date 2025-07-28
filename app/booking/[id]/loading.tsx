export default function BookingLoading() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto mb-4"></div>
        <h2 className="text-xl font-semibold text-gray-900 mb-2">Loading Booking Details...</h2>
        <p className="text-gray-600">Please wait while we prepare your booking page.</p>
      </div>
    </div>
  )
}
