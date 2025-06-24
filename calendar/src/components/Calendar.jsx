import React, { useState, useEffect } from "react";
import dayjs from "dayjs";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";
import { generateDate, months } from "./CalendarUtils";
import cn from "./cn";
import image from "../assets/image1.png";
import eventsData from "../assets/events.json";

export default function Calendar() {
  const currentDate = dayjs();
  const [today, setToday] = useState(currentDate);
  const [selectDate, setSelectDate] = useState(currentDate);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    setEvents(eventsData);
  }, []);

  const getEventsForDate = (date) => {
    return events.filter(
      (event) => dayjs(event.date).isSame(date, "day")
    );
  };

  return (
    <div className="max-w-5xl mx-auto p-4 rounded-lg">
      <div className="flex justify-between items-center mb-6 px-4 pt-4">
        <h2 className="text-2xl font-semibold">
          {months[today.month()]} {today.year()}
        </h2>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setToday(today.subtract(1, "month"))}
            className="px-2 py-1 rounded hover:bg-gray-100"
          >
            <GrFormPrevious />
          </button>

          <button
            onClick={() => setToday(currentDate)}
            className="px-4 py-1 rounded border hover:bg-gray-100 cursor-pointer"
          >
            Today
          </button>

          <button
            onClick={() => setToday(today.add(1, "month"))}
            className="px-2 py-1 rounded hover:bg-gray-100"
          >
            <GrFormNext />
          </button>

          <img className="rounded-full w-7 h-7" src={image} alt="Profile" />
          <button className="bg-purple-600 text-white px-4 py-1.5 rounded hover:bg-blue-700 text-sm cursor-pointer">
            Add event
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 border-t border text-center border-gray-300">
        {["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"].map(
          (day) => (
            <div key={day} className="py-2 border-r border-gray-300 text-sm last:border-r-0">
              {day}
            </div>
          )
        )}
      </div>

      <div className="grid grid-cols-7 border-b border-gray-300">
        {generateDate(today.month(), today.year()).map(
          ({ date, currentMonth, today: isToday }, index) => {
            const isSelected =
              selectDate.toDate().toDateString() === date.toDate().toDateString();
            const dayEvents = getEventsForDate(date);

            return (
              <div
                key={index}
                className={cn(
                  "border border-gray-200  h-30 px-2 py-1 relative transition cursor-pointer overflow-auto",
                  !currentMonth && "bg-gray-50 text-gray-400"
                )}
                onClick={() => setSelectDate(date)}
              >
                <div
                  className={cn(
                    "absolute top-1 right-1 w-7 h-7 text-xs flex items-center justify-center rounded-full",
                    isToday && "bg-purple-600 text-white",
                    isSelected && !isToday && "bg-black text-white"
                  )}
                >
                  {date.date()}
                </div>
                <div className="mt-6 space-y-1">
                  {dayEvents.map((event, i) => (
                    <div
                      key={i}
                     className={cn(
                        "text-xs px-1 py-0.5 rounded truncate",
                        dayEvents.length > 1 ? "bg-blue-200" : "bg-gray-200"
                      )}

                      title={`${event.title} at ${event.time}`}
                    >
                      {event.title} 
            <div className="text-[10px] text-gray-700">
                    {event.starttime} - {event.endtime}
                  </div>                
                  </div>
                  ))}
                </div>
              </div>
            );
          }
        )}
      </div>
    </div>
  );
}
