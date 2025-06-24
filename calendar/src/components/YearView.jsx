import React from "react";
import dayjs from "dayjs";
import { generateDate } from "./CalendarUtils";
import cn from "./cn";
import { months } from "./CalendarUtils";

export default function YearView({ today, setToday, selectDate, setSelectDate, darkMode, getEventsForDate }) {
  const currentYear = today.year();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-4">
      {months.map((monthName, i) => {
        const dates = generateDate(i, currentYear);

        return (
          <div key={monthName}
            className={`border  rounded-lg p-3 transition ${
              darkMode ? "bg-gray-800 text-white" : "bg-white border-purple-500 text-black"
            }`}>
            <h4 className="text-center font-semibold mb-2">{monthName}</h4>
            <div className="grid grid-cols-7 text-xs text-center font-medium opacity-70">
              {["M", "T", "W", "T", "F", "S","S"].map((d) => (
                <div key={d}>{d}</div>
              ))}
            </div>
            <div className="grid grid-cols-7 text-xs mt-1 gap-y-1">
              {dates.map(({ date, currentMonth, today: isToday }, idx) => {
                const isSelected =
                  selectDate.toDate().toDateString() === date.toDate().toDateString();
                return (
                  <div
                    key={idx}
                    onClick={() => {
                      setToday(date);
                      setSelectDate(date);
                    }}
                    className={cn("h-6 w-6 flex items-center justify-center rounded-full mx-auto cursor-pointer",
                      isToday? darkMode? "bg-purple-500 text-white" : "bg-purple-600 text-white": isSelected ? darkMode? "bg-gray-200 text-black"
                          : "bg-black text-white": "",
                      !currentMonth? darkMode? "text-gray-500": "text-gray-400": ""
                    )}>
                    {date.date()}
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
