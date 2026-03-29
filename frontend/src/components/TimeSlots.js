import { useEffect } from "react";
import socket from "../socket";
import { useSlots } from "../hooks/useSlots";
import { DotsLoader } from "./Loading";
import { useConfirmBooking, useReserveSlot } from "../hooks/useBooking";

const TimeSlots = ({
  selectedPitch,
  selectedDate,
  onSelectSlot,
  selectedSlot,
  pitchPrice,
}) => {
  //   const timeSlots = [
  //     { id: 1, time: "06:00 PM - 07:00 PM", available: false },
  //     { id: 2, time: "07:00 PM - 08:00 PM", available: true },
  //     { id: 3, time: "08:00 PM - 09:00 PM", available: true },
  //   ];

  useEffect(() => {
    if (selectedPitch && selectedDate) {
      socket.emit("join_slot_room", {
        pitchId: selectedPitch,
        bookingDate: selectedDate,
      });
    }
  }, [selectedPitch, selectedDate]);

  const {
    data: timeSlots,
    isLoading,
    refetch: refetchSlots,
  } = useSlots(selectedPitch, selectedDate);

  useEffect(() => {
    const handleSlotReserved = (data) => {
      console.log("Slot reserved:", data);

      refetchSlots();
    };

    socket.on("slot_reserved", handleSlotReserved);

    return () => {
      socket.off("slot_reserved", handleSlotReserved);
    };
  }, []);

  const reserveSlotMutation = useReserveSlot();
  const handleReserveSlot = (slot) => {
    reserveSlotMutation.mutate(
      {
        pitch_id: selectedPitch,
        slot_id: slot.id,
        booking_date: selectedDate,
      },
      {
        onSuccess: (res) => {
          alert("Slot reserved");
        },
        onError: (err) => {
          alert("Slot reservation failed");
        },
      },
    );
  };

  const confirmBookingMutation = useConfirmBooking();

  const handleConfirmBooking = (e) => {
    e.preventDefault();

    if (!selectedSlot) {
      return alert("Please select a slot");
    }

    confirmBookingMutation.mutate(
      {
        pitch_id: selectedPitch,
        slot_id: selectedSlot.id,
        booking_date: selectedDate,
      },
      {
        onSuccess: (res) => {
          alert("Booking confirmed");
          onSelectSlot(null);
        },
        onError: (err) => {
          alert("Booking failed");
        },
      },
    );
  };

  return (
    <div className="w-full">
      {isLoading && <DotsLoader />}
      <h3 className="text-2xl font-bold text-gray-900 mb-6">
        Select Time Slot
      </h3>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {timeSlots &&
          timeSlots.data &&
          timeSlots.data.length &&
          timeSlots.data.map((slot) => (
            <button
              key={slot.id}
              onClick={(e) => {
                if (slot.available) {
                  onSelectSlot(slot);
                  handleReserveSlot(slot);
                }
              }}
              disabled={!slot.available}
              className={`p-4 rounded-xl font-semibold transition-all duration-300 ${
                selectedSlot?.id === slot.id
                  ? "bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg transform scale-105"
                  : slot.available
                    ? "bg-white border-2 border-gray-200 text-gray-800 hover:border-blue-400 hover:shadow-md cursor-pointer"
                    : "bg-gray-100 text-gray-400 cursor-not-allowed border-2 border-gray-200"
              }`}
            >
              <div className="text-sm">
                {slot.start_time} - {slot.end_time}
              </div>
              {!slot.available && <div className="text-xs mt-1">Booked</div>}
            </button>
          ))}
      </div>

      {selectedSlot && (
        <div className="mt-8 p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border border-blue-200">
          <h4 className="text-lg font-bold text-gray-900 mb-3">
            Booking Summary
          </h4>
          <div className="space-y-2 text-gray-700 mb-4">
            <p>
              <span className="font-semibold">Selected Slot:</span>{" "}
              {selectedSlot.time}
            </p>
            <p>
              <span className="font-semibold">Duration:</span> 1 Hour
            </p>
            <p className="text-2xl font-bold text-blue-600 mt-4">
              Total: ₹{pitchPrice}
            </p>
          </div>
          <form onSubmit={handleConfirmBooking}>
            <button className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold py-3 rounded-xl hover:shadow-lg transition-all duration-300 transform hover:scale-105">
              Confirm Booking
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default TimeSlots;
