
import React from "react";
import cn from "./cn";
import { generateDate } from "./CalendarUtils";
import dayjs from "dayjs";

export default function MonthView({ today, selectDate, setSelectDate, getEventsForDate, darkMode, setShowForm, setFormData  }) {
  return (
    <div className="grid grid-cols-7 border-b border-gray-300">
      {generateDate(today.month(), today.year()).map(({ date, currentMonth, today: isToday }, index) => {
        const isSelected = selectDate.toDate().toDateString() === date.toDate().toDateString();
        const dayEvents = getEventsForDate(date);

        return (
          <div key={index} onClick={() => setSelectDate(date)}
            className={cn("border h-28 px-2 py-1 relative transition cursor-pointer overflow-auto group",darkMode ? "bg-gray-800 border-gray-700 text-white" : "bg-white border-gray-200 text-black",
            !currentMonth && (darkMode ? "bg-gray-700 text-gray-500" : "bg-gray-50 text-gray-400")
          )}>
          <div className="absolute top-1 right-1 w-8 h-8 group">
           <div className={cn("w-full h-full text-sm font-medium flex items-center justify-center rounded-full transition-opacity duration-200 group-hover:hidden",
                isToday? darkMode ? "bg-purple-500 text-white": "bg-purple-600 text-white" : isSelected ? darkMode? " text-white"
                    : " text-black": "",!currentMonth &&!isToday && !isSelected &&
                  (darkMode ? "text-gray-500" : "text-gray-400"))}>
              {date.date()}
            </div>
            <button className="hidden cursor-pointer group-hover:flex items-center justify-center w-full h-full text-2xl font-bold rounded-full text-purple-800 bg-white hover:bg-purple-100"
              onClick={(e) => {
                e.stopPropagation();
                setFormData({
                  title: "",
                  date: date.format("YYYY-MM-DD"),
                  starttime: "",
                  endtime: "",
                });
                setSelectDate(date);
                setShowForm(true);
              }}
              title="Add event">+
            </button>
            </div>
            <div className="mt-6 space-y-1">
              {dayEvents.map((event, i) => {
                let bgColorClass = "";
                if (date.isSame(dayjs(), "day")) {
                  bgColorClass = darkMode ? "bg-pink-400 text-white" : "bg-pink-300 text-black";
                } else if (date.isBefore(dayjs(), "day")) {
                  bgColorClass = darkMode ? "bg-gray-600 text-white" : "bg-gray-300 text-black";
                } else {
                  bgColorClass = darkMode ? "bg-blue-500 text-white" : "bg-blue-200 text-black";
                }

                return (
                  <div
                    key={i}
                    className={cn("text-xs px-1 py-0.5 rounded truncate", bgColorClass)}
                    title={`${event.title} at ${event.starttime}`}
                  >
                    {event.title}
                    {(event.starttime || event.endtime) && (
                    <div className={`text-[10px] ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                      {event.starttime} - {event.endtime}
                    </div>
                    )}
                  </div>
                );
              })}

            </div>
          </div>
        );
      })}
    </div>
  );
}
