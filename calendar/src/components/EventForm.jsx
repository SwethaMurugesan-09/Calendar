import React from "react";
import dayjs from "dayjs";

export default function EventForm({ darkMode, formData, setFormData, setEvents, setShowForm }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    const newEvent = {
      ...formData,
      date: dayjs(formData.date).format("YYYY-MM-DD"),
    };
    setEvents((prev) => [...prev, newEvent]);
    setShowForm(false);
    setFormData({ title: "", date: "", starttime: "", endtime: "" });
  };

  return (
    <div className={`w-1/3 rounded-lg p-4 h-fit self-start mt-23 ${darkMode ? "bg-gray-800 text-white" : "bg-gray-50 text-black"}`}>
      <form onSubmit={handleSubmit} className="flex flex-col items-center space-y-3 text-center">
        <h3 className="text-lg font-semibold mb-2">Add New Event</h3>
        <input type="text" placeholder="Event Title" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} className="w-64 border px-3 py-2 rounded" required />
        <input type="date" value={formData.date} onChange={(e) => setFormData({ ...formData, date: e.target.value })} className="w-64 border px-3 py-2 rounded" required />
        <input type="time" value={formData.starttime} onChange={(e) => setFormData({ ...formData, starttime: e.target.value })} className="w-64 border px-3 py-2 rounded" required />
        <input type="time" value={formData.endtime} onChange={(e) => setFormData({ ...formData, endtime: e.target.value })} className="w-64 border px-3 py-2 rounded" required />
        <button type="submit" className="block bg-purple-600 cursor-pointer text-white px-6 py-2 rounded hover:bg-purple-800">
          Add event
        </button>
      </form>
    </div>
  );
}
