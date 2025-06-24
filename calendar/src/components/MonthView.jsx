
import React from "react";
import cn from "./cn";
import { generateDate } from "./CalendarUtils";

export default function MonthView({ today, selectDate, setSelectDate, getEventsForDate, darkMode }) {
  return (
    <div className="grid grid-cols-7 border-b border-gray-300">
      {generateDate(today.month(), today.year()).map(({ date, currentMonth, today: isToday }, index) => {
        const isSelected = selectDate.toDate().toDateString() === date.toDate().toDateString();
        const dayEvents = getEventsForDate(date);

        return (
          <div key={index} onClick={() => setSelectDate(date)}
            className={cn(`border h-28 px-2 py-1 relative transition cursor-pointer overflow-auto`, darkMode ? "bg-gray-800 border-gray-700 text-white" : "bg-white border-gray-200 text-black",
              !currentMonth && (darkMode ? "bg-gray-700 text-gray-500" : "bg-gray-50 text-gray-400") )}>
           <div className={cn( `absolute top-1 right-1 w-8 h-8 text-sm font-medium flex items-center justify-center rounded-full`,
                isToday? darkMode ? "bg-purple-500 text-white": "bg-purple-600 text-white" : isSelected ? darkMode? "bg-gray-200 text-black"
                    : "bg-black text-white": "",!currentMonth &&!isToday && !isSelected &&
                  (darkMode ? "text-gray-500" : "text-gray-400"))}>
              {date.date()}
            </div>
            <div className="mt-6 space-y-1">
              {dayEvents.map((event, i) => (
                <div key={i} className={cn( `text-xs px-1 py-0.5 rounded truncate`,dayEvents.length > 1? darkMode? "bg-blue-400 text-white": "bg-blue-200": darkMode
                      ? "bg-gray-700 text-white" : "bg-gray-200" )}
                  title={`${event.title} at ${event.starttime}`}>
                  {event.title}
                  <div className={`text-[10px] ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                    {event.starttime} - {event.endtime}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
