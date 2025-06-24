import React from "react";

export default function WeekdayHeader() {
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  return (
    <div className="grid grid-cols-7 border-t text-center border-gray-300">
      {days.map((day) => (
        <div key={day} className="py-2 border-r border-gray-300 text-sm last:border-r-0">
          {day}
        </div>
      ))}
    </div>
  );
}
