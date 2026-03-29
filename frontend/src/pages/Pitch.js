import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Calendar from "../components/Calender";
import TimeSlots from "../components/TimeSlots";
import { usePitches } from "../hooks/usePitches";
import { FullScreenLoader } from "../components/Loading";

const Pitch = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState(null);

  const { data: pitches, isLoading } = usePitches();

  // Mock pitch data - in real app, fetch from API using id
  // const pitches = [
  //   {
  //     id: "e0cc0a85-6a1b-4ee5-b4f8-974ff8b637dd",
  //     name: "pitch 1",
  //     location: "Turf Ground",
  //     price_per_hour: 700,
  //     surface: "Natural Grass",
  //     capacity: "22 Players",
  //     facilities: "Lights, Parking",
  //   },
  //   {
  //     id: "03e1677d-c79f-49fc-9a2f-6d43892fb4c4",
  //     name: "pitch 2",
  //     location: "Box Cricket",
  //     price_per_hour: 600,
  //     surface: "Artificial Turf",
  //     capacity: "16 Players",
  //     facilities: "AC, Changing Rooms",
  //   },
  //   {
  //     id: "191f6705-5bd5-4225-bf61-547ee6672357",
  //     name: "pitch 3",
  //     location: "Indoor Nets",
  //     price_per_hour: 500,
  //     surface: "Synthetic Mat",
  //     capacity: "12 Players",
  //     facilities: "Nets, Equipment",
  //   },
  // ];

  const pitch =
    pitches && pitches.data && pitches.data.find((p) => p.id === id);

  if (!pitch) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Pitch Not Found
          </h1>
          <button
            onClick={() => navigate("/")}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      {isLoading && <FullScreenLoader />}
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
        {/* Header with Back Button */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-8 px-4 shadow-lg">
          <div className="max-w-6xl mx-auto">
            <button
              onClick={() => navigate("/")}
              className="flex items-center gap-2 mb-4 text-blue-100 hover:text-white transition"
            >
              <svg className="flex items-center gap-2 mb-4 text-blue-100 hover:text-white transition" />
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
            <h1 className="text-4xl font-extrabold">{pitch.name}</h1>
            <p className="text-blue-100 mt-2">{pitch.location}</p>
          </div>
        </div>

        {/* Main Content */}
        <div className="py-12 px-4">
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Pitch Details */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-20">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Pitch Details
                </h2>

                <div className="space-y-4 mb-6">
                  <div>
                    <p className="text-gray-600 text-sm mb-1">Surface</p>
                    <p className="font-semibold text-gray-900">
                      {pitch.surface}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-600 text-sm mb-1">Capacity</p>
                    <p className="font-semibold text-gray-900">
                      {pitch.capacity}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-600 text-sm mb-1">Facilities</p>
                    <p className="font-semibold text-gray-900">
                      {pitch.facilities}
                    </p>
                  </div>
                  <div className="pt-4 border-t">
                    <p className="text-gray-600 text-sm mb-1">Price per Hour</p>
                    <p className="text-3xl font-bold text-blue-600">
                      ₹{pitch.price_per_hour}
                    </p>
                  </div>
                </div>

                {/* Selected Date and Slot Summary */}
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-900 mb-3">
                    Booking Summary
                  </h3>
                  <div className="text-sm space-y-2">
                    <p>
                      <span className="text-gray-600">Date:</span>
                      <span className="font-semibold text-gray-900 block">
                        {selectedDate ? selectedDate : "Not selected"}
                      </span>
                    </p>
                    <p>
                      <span className="text-gray-600">Time:</span>
                      <span className="font-semibold text-gray-900 block">
                        {selectedSlot ? selectedSlot.time : "Not selected"}
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Calendar and Slots */}
            <div className="lg:col-span-2 space-y-8">
              {/* Calendar Section */}
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Select Date
                </h2>
                <div className="flex justify-center">
                  <Calendar onSelect={setSelectedDate} />
                </div>
                {selectedDate && (
                  <p className="text-center mt-6 text-lg font-semibold text-blue-600">
                    📅 Selected: {selectedDate}
                  </p>
                )}
              </div>

              {/* Time Slots Section */}
              {selectedDate && (
                <div className="bg-white rounded-2xl shadow-lg p-8">
                  <TimeSlots
                    selectedPitch={id}
                    selectedDate={selectedDate}
                    onSelectSlot={setSelectedSlot}
                    selectedSlot={selectedSlot}
                    pitchPrice={pitch.price_per_hour}
                  />
                </div>
              )}

              {!selectedDate && (
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl border-2 border-dashed border-blue-300 p-12 text-center">
                  <svg
                    className="w-16 h-16 text-blue-400 mx-auto mb-4"
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
                  <p className="text-gray-600 font-semibold">
                    Please select a date to view available time slots
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Pitch;
