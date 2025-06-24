import React from "react";
import dayjs from "dayjs";
import cn from "./cn";

export default function WeekView({ today, selectDate, setSelectDate, getEventsForDate, darkMode }) {
  return (
    <div className="grid grid-cols-7 border-b border-gray-300">
      {[...Array(7)].map((_, i) => {
        const date = dayjs(today).startOf("week").add(i, "day");
        const isSelected = selectDate.toDate().toDateString() === date.toDate().toDateString();
        const dayEvents = getEventsForDate(date);
        const isToday = dayjs().isSame(date, "day");

        return (
          <div key={i} onClick={() => setSelectDate(date)}
            className={cn( `border h-28 px-2 py-1 relative transition cursor-pointer overflow-auto`,
              darkMode ? "bg-gray-800 border-gray-700 text-white" : "bg-white border-gray-200 text-black"
            )}>
            <div className={cn(`absolute top-1 right-1 w-8 h-8 text-sm font-medium flex items-center justify-center rounded-full`,
                isToday? darkMode ? "bg-purple-500 text-white" : "bg-purple-600 text-white"
                  : isSelected
                  ? darkMode ? "bg-gray-200 text-black" : "bg-black text-white": ""
              )}>
              {date.date()}
            </div>
            <div className="mt-6 space-y-1">
              {dayEvents.map((event, i) => (
                <div key={i} className="text-xs truncate">
                  {event.title}
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
