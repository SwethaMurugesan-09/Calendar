import React from "react";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";
import { Listbox } from "@headlessui/react";
import { months } from "./CalendarUtils";

const viewModes = [
  { value: "month", label: "Month" },
  { value: "week", label: "Week" },
  { value: "year", label: "Year" },
];

export default function CalendarHeader({
  today,
  setToday,
  viewMode,
  setViewMode,
  currentDate,
  darkMode,
  setDarkMode,
  showForm,
  setShowForm,
}) {
  const selectedMode = viewModes.find((m) => m.value === viewMode);

  return (
    <div className="flex justify-between items-center mb-6 px-4 pt-4">
      <div className="flex items-center gap-4">
        <h2 className="text-2xl font-semibold">
          {viewMode === "month" && `${months[today.month()]} ${today.year()}`}
          {viewMode === "year" && today.year()}
          {viewMode === "week" &&
            `Week of ${today.startOf("week").format("MMM D")} - ${today.endOf("week").format("MMM D, YYYY")}`}
        </h2>

        <button
          onClick={() => setToday( viewMode === "year" ? today.subtract(1, "year") : today.subtract(1, "month"))}
          className="px-2 py-1 rounded hover:bg-gray-100">
          <GrFormPrevious />
        </button>

        <button
          onClick={() => setToday(currentDate)}
          className={`px-4 py-1 rounded border text-white cursor-pointer transition
            ${darkMode ? "border-purple-600 bg-purple-800 text-white hover:bg-gray-700" : "border-purple-600 bg-purple-600 hover:bg-purple-800"}`} >
          Today
        </button>


        <button onClick={() =>setToday(viewMode === "year"? today.add(1, "year")
                : today.add(1, "month"))}
          className="px-2 py-1 rounded hover:bg-gray-100">
          <GrFormNext />
        </button>
      </div>

      <div className="flex items-center gap-3">
      <Listbox value={selectedMode} onChange={(mode) => setViewMode(mode.value)}>
  <div className="relative">
    <Listbox.Button className="px-4 py-2 rounded-full border cursor-pointer border-gray-300 bg-gray-50 text-black text-sm flex items-center gap-2 w-22 justify-between hover:bg-gray-100">
      {selectedMode.label.split(" ")[0]}
      <span className="text-xs">▼</span>
    </Listbox.Button>
    <Listbox.Options className="absolute mt-1 w-full bg-white  border-gray-300 rounded shadow-lg z-10">
      {viewModes.map((mode) => (
        <Listbox.Option key={mode.value} value={mode}
          className={({ active }) =>`px-4 py-2 cursor-pointer text-sm rounded ${active ? "bg-purple-400 text-white" : "text-black"}`}>
          {mode.label}
        </Listbox.Option>
      ))}
    </Listbox.Options>
  </div>
</Listbox>
        <button onClick={() => setDarkMode(!darkMode)} className={`px-3 py-2 text-sm rounded cursor-pointer ${
            darkMode ? "bg-yellow-400 text-black" : "bg-gray-700 text-white" }`}>
          {darkMode ? "☀️ Light" : "🌙 Dark"}
        </button>

        <button onClick={() => setShowForm(!showForm)}
          className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-900 text-sm cursor-pointer">
          {showForm ? "Close" : "Add Event"}
        </button>
      </div>
    </div>
  );
}
