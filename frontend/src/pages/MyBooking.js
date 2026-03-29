import { useNavigate } from "react-router-dom";
import { useMyBookings } from "../hooks/useMyBookings";
import { FullScreenLoader } from "../components/Loading";

const MyBooking = () => {
  const navigate = useNavigate();

  const { data, isLoading } = useMyBookings();

  const bookings = data?.data?.map((item) => ({
    id: item.id,
    pitchName: item.pitch.name,
    location: item.pitch.location,
    price: item.pitch.price_per_hour,
    date: item.booking_date,
    time: `${item.slot.start_time} - ${item.slot.end_time}`,
    status: item.status,
  }));

  const getStatusColor = (status) => {
    switch (status) {
      case "confirmed":
        return "bg-green-100 text-green-800";
      case "upcoming":
        return "bg-blue-100 text-blue-800";
      case "completed":
        return "bg-gray-100 text-gray-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "confirmed":
        return "✅";
      case "upcoming":
        return "⏰";
      case "completed":
        return "✓";
      case "cancelled":
        return "✗";
      default:
        return "📅";
    }
  };

  if (isLoading) {
    return <FullScreenLoader />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-12 px-4 shadow-lg">
        <div className="max-w-6xl mx-auto">
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 mb-4 text-blue-100 hover:text-white transition"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Back to Pitches
          </button>
          <h1 className="text-4xl font-extrabold">My Bookings</h1>
          <p className="text-blue-100 mt-2">
            Manage your cricket pitch reservations
          </p>
        </div>
      </div>

      {/* Bookings List */}
      <div className="py-12 px-4">
        <div className="max-w-4xl mx-auto">
          {bookings && bookings.length === 0 ? (
            <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
              <svg
                className="w-24 h-24 text-gray-300 mx-auto mb-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                No Bookings Yet
              </h3>
              <p className="text-gray-600 mb-6">
                You haven't made any bookings yet. Start by booking a pitch!
              </p>
              <button
                onClick={() => navigate("/")}
                className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold py-3 px-8 rounded-xl hover:shadow-lg transition-all duration-300"
              >
                Browse Pitches
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              {bookings &&
                bookings.map((booking) => (
                  <div
                    key={booking.id}
                    className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300"
                  >
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          <h3 className="text-xl font-bold text-gray-900">
                            {booking.pitchName}
                          </h3>
                          <span
                            className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(booking.status)}`}
                          >
                            {getStatusIcon(booking.status)}{" "}
                            {booking.status.charAt(0).toUpperCase() +
                              booking.status.slice(1)}
                          </span>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
                          <div className="flex items-center gap-2">
                            <svg
                              className="w-4 h-4 text-orange-500"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                                clipRule="evenodd"
                              />
                            </svg>
                            {booking.location}
                          </div>
                          <div className="flex items-center gap-2">
                            <svg
                              className="w-4 h-4 text-blue-500"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                              />
                            </svg>
                            {new Date(booking.date).toLocaleDateString()}
                          </div>
                          <div className="flex items-center gap-2">
                            <svg
                              className="w-4 h-4 text-green-500"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                              />
                            </svg>
                            {booking.time}
                          </div>
                        </div>
                      </div>

                      <div className="text-right">
                        <p className="text-2xl font-bold text-blue-600 mb-3">
                          ₹{booking.price}
                        </p>
                        {booking.status === "upcoming" && (
                          <button className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors text-sm font-semibold">
                            Cancel Booking
                          </button>
                        )}
                        {booking.status === "completed" && (
                          <button className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors text-sm font-semibold">
                            Book Again
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyBooking;
