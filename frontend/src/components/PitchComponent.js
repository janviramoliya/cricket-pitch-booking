import React from "react";

const PitchComponent = ({ pitch, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="bg-white rounded-xl shadow-md hover:shadow-xl transition duration-300 cursor-pointer border border-gray-200 hover:border-blue-400 overflow-hidden"
    >
      <div className="p-5">
        {/* Header */}
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-semibold text-gray-800 capitalize">
            {pitch.name}
          </h2>

          {/* Small Icon */}
          <div className="w-8 h-8 flex items-center justify-center bg-blue-100 text-blue-600 rounded-md">
            🏏
          </div>
        </div>

        {/* Location */}
        <p className="text-sm text-gray-500 mb-4">📍 {pitch.location}</p>

        {/* Info */}
        <div className="grid grid-cols-2 gap-y-2 text-sm mb-4">
          <span className="text-gray-500">Surface</span>
          <span className="font-medium text-gray-700">{pitch.surface}</span>

          <span className="text-gray-500">Capacity</span>
          <span className="font-medium text-gray-700">{pitch.capacity}</span>

          <span className="text-gray-500">Facilities</span>
          <span className="font-medium text-gray-700">{pitch.facilities}</span>
        </div>

        {/* Price + Button */}
        <div className="flex items-center justify-between mt-4">
          <div>
            <p className="text-xs text-gray-500">Price</p>
            <p className="text-xl font-bold text-blue-600">
              ₹{pitch.price_per_hour}
              <span className="text-sm font-normal text-gray-500">/hr</span>
            </p>
          </div>

          <button className="bg-blue-600 text-white text-sm px-4 py-2 rounded-lg hover:bg-blue-700 transition">
            Book
          </button>
        </div>
      </div>
    </div>
  );
};

export default PitchComponent;
