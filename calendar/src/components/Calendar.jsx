import React, { useState, useEffect } from "react";
import dayjs from "dayjs";
import eventsData from "../assets/events.json";

import CalendarHeader from "./CalendarHeader";
import MonthView from "./MonthView";
import WeekView from "./WeekView";
import YearView from "./YearView";
import EventForm from "./EventForm"

export default function Calendar() {
  const currentDate = dayjs();
  const [today, setToday] = useState(currentDate);
  const [selectDate, setSelectDate] = useState(currentDate);
  const [events, setEvents] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [viewMode, setViewMode] = useState("month");
  const [formData, setFormData] = useState({
    title: "",
    date: "",
    starttime: "",
    endtime: "",
  });

  useEffect(() => {
    document.body.classList.toggle("dark", darkMode);
  }, [darkMode]);

  useEffect(() => {
    const storedEvents = JSON.parse(localStorage.getItem("calendarEvents") || "[]");
    setEvents(storedEvents);
  }, []);

  useEffect(() => {
    localStorage.setItem("calendarEvents", JSON.stringify(events));
  }, [events]);

  const getEventsForDate = (date) => {
    return [...eventsData, ...events].filter((event) =>
      dayjs(event.date).isSame(dayjs(date), "day")
    );
  };

  return (
    <div
      className={`max-w-9xl w-full mx-auto p-4 rounded-lg flex flex-col lg:flex-row gap-4 transition-all duration-300 ${
        darkMode ? "bg-gray-900 text-white" : "bg-white text-black"
      }`} >
      <div className={`transition-all duration-300 ${showForm ? "w-3/3" : "w-full"}`}>
        <CalendarHeader
          today={today}
          setToday={setToday}
          currentDate={currentDate}
          darkMode={darkMode}
          setDarkMode={setDarkMode}
          showForm={showForm}
          setShowForm={setShowForm}
          viewMode={viewMode}
          setViewMode={setViewMode}
        />

{viewMode !== "year" && (
  <div className={` grid grid-cols-7 text-center text-sm border-t ${darkMode ? "border-gray-700" : "border-gray-200"}`}>
    {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map(
      (day, index) => (
        <div key={day} className={`py-2 border-r text-sm
            ${darkMode ? "text-gray-400 border-gray-600" : "text-gray-700 border-gray-300"}
            ${index === 0 ? `${darkMode ? "border-l border-gray-600" : "border-l border-gray-300"}` : ""}`}>
          {day}
        </div>
      ))}
  </div>
)}
        {viewMode === "month" && (
          <MonthView
            today={today}
            selectDate={selectDate}
            setSelectDate={setSelectDate}
            getEventsForDate={getEventsForDate}
            darkMode={darkMode}
          />
        )}
        {viewMode === "week" && (
          <WeekView
            today={today}
            selectDate={selectDate}
            setSelectDate={setSelectDate}
            getEventsForDate={getEventsForDate}
            darkMode={darkMode}
          />
        )}

      {viewMode === "year" && (
        <YearView
          today={today}
          setToday={setToday}
          selectDate={selectDate}
          setSelectDate={setSelectDate}
          darkMode={darkMode}
          getEventsForDate={getEventsForDate}
        />)}
      </div>
      {showForm && (
        <EventForm
          formData={formData}
          setFormData={setFormData}
          setEvents={setEvents}
          setShowForm={setShowForm}
          darkMode={darkMode}
        />
      )}
    </div>
  );
}