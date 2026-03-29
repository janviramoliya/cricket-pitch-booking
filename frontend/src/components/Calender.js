import React, { useState } from "react";

const Calendar = ({ onSelect }) => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const today = new Date();
  const todayDate = today.getDate();
  const todayMonth = today.getMonth();
  const todayYear = today.getFullYear();

  const firstDayOfMonth = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const prevMonth = () => {
    const newDate = new Date(year, month - 1, 1);
    // Prevent going to past months
    if (newDate < new Date(todayYear, todayMonth, 1)) {
      return;
    }
    setCurrentDate(newDate);
  };

  const nextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  const isPastDate = (day) => {
    if (year < todayYear) return true;
    if (year === todayYear && month < todayMonth) return true;
    if (year === todayYear && month === todayMonth && day < todayDate)
      return true;
    return false;
  };

  const isToday = (day) => {
    return year === todayYear && month === todayMonth && day === todayDate;
  };

  const renderDays = () => {
    const days = [];

    // Empty slots before first day
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<div key={`empty-${i}`} className="p-2" />);
    }

    // Actual days
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      const isDisabled = isPastDate(day);
      const isTodayDate = isToday(day);

      days.push(
        <button
          key={day}
          onClick={() =>
            !isDisabled && onSelect(date.toLocaleDateString("en-US"))
          }
          disabled={isDisabled}
          className={`p-2 rounded-lg font-semibold transition-all duration-300 ${
            isDisabled
              ? "text-gray-400 cursor-not-allowed bg-gray-100"
              : isTodayDate
                ? "bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg"
                : "hover:bg-blue-200 cursor-pointer hover:shadow-md border border-gray-200"
          }`}
        >
          {day}
        </button>,
      );
    }

    return days;
  };

  const isPrevMonthDisabled =
    new Date(year, month - 1, 1) < new Date(todayYear, todayMonth, 1);

  return (
    <div className="w-80 p-4 bg-white rounded-2xl shadow">
      <div className="flex justify-between items-center mb-4">
        <button
          onClick={prevMonth}
          disabled={isPrevMonthDisabled}
          className={`p-2 rounded-lg transition-all ${
            isPrevMonthDisabled
              ? "text-gray-300 cursor-not-allowed"
              : "text-gray-700 hover:bg-gray-100 cursor-pointer"
          }`}
        >
          ◀
        </button>
        <h2 className="font-semibold text-gray-900">
          {currentDate.toLocaleString("default", {
            month: "long",
          })}{" "}
          {year}
        </h2>
        <button
          onClick={nextMonth}
          className="p-2 rounded-lg text-gray-700 hover:bg-gray-100 cursor-pointer transition-all"
        >
          ▶
        </button>
      </div>

      <div className="grid grid-cols-7 text-center font-medium mb-2 text-gray-700">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
          <div key={d} className="text-sm">
            {d}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1 text-center text-sm">
        {renderDays()}
      </div>

      <div className="mt-4 p-3 bg-blue-50 rounded-lg text-xs text-gray-600 text-center">
        <p>📅 Select a date to view available slots</p>
      </div>
    </div>
  );
};

export default Calendar;

// export default function App() {
//   const [selectedDate, setSelectedDate] = useState(null);

//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
//       <Calendar onSelect={setSelectedDate} />
//       {selectedDate && (
//         <p className="mt-4 text-lg">Selected: {selectedDate.toDateString()}</p>
//       )}
//     </div>
//   );
// }
