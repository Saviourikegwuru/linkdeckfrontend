import { useState } from "react";

const DAYS = ["S", "M", "T", "W", "T", "F", "S"];
const MONTHS = ["January","February","March","April","May","June","July","August","September","October","November","December"];

function getDaysInMonth(year, month) {
  return new Date(year, month + 1, 0).getDate();
}
function getFirstDayOfMonth(year, month) {
  return new Date(year, month, 1).getDay();
}

export default function InboxScheduleModal({ onClose, onSchedule }) {
  const now = new Date();
  const [year, setYear] = useState(now.getFullYear());
  const [month, setMonth] = useState(now.getMonth());
  const [selectedDay, setSelectedDay] = useState(now.getDate());
  const [hour, setHour] = useState(12);
  const [minute, setMinute] = useState(0);
  const [ampm, setAmpm] = useState("AM");

  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = getFirstDayOfMonth(year, month);
  const prevMonthDays = getDaysInMonth(year, month - 1);

  const calendarCells = [];
  for (let i = 0; i < firstDay; i++) {
    calendarCells.push({ day: prevMonthDays - firstDay + 1 + i, current: false });
  }
  for (let d = 1; d <= daysInMonth; d++) {
    calendarCells.push({ day: d, current: true });
  }
  const remaining = 42 - calendarCells.length;
  for (let i = 1; i <= remaining; i++) {
    calendarCells.push({ day: i, current: false });
  }

  const prevMonth = () => {
    if (month === 0) { setMonth(11); setYear(year - 1); }
    else setMonth(month - 1);
  };
  const nextMonth = () => {
    if (month === 11) { setMonth(0); setYear(year + 1); }
    else setMonth(month + 1);
  };

  const cycleHour = (dir) => setHour((h) => { const n = h + dir; if (n > 12) return 1; if (n < 1) return 12; return n; });
  const cycleMinute = (dir) => setMinute((m) => { const n = m + dir * 5; if (n >= 60) return 0; if (n < 0) return 55; return n; });
  const toggleAmpm = () => setAmpm((v) => (v === "AM" ? "PM" : "AM"));

  const pad = (n) => String(n).padStart(2, "0");

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <button type="button" className="absolute inset-0 bg-black/40" onClick={onClose} aria-label="Close" />
      <div className="relative z-10 w-[400px] rounded-2xl bg-[#F8F9FA] p-6 shadow-xl">
        <h2 className="mb-6 text-xl font-bold text-[#080707]">Pick Date and Time</h2>

        {/* Calendar */}
        <div className="rounded-2xl border border-[#EDEDED] bg-white p-4">
          {/* Month nav */}
          <div className="mb-4 flex items-center justify-between">
            <button type="button" onClick={prevMonth} className="text-[#0066FF] transition hover:text-[#005ae0]">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M12 4l-6 6 6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </button>
            <div className="flex items-center gap-2">
              <select value={month} onChange={(e) => setMonth(Number(e.target.value))} className="rounded-lg border border-[#EDEDED] bg-white px-2 py-1 text-sm font-semibold text-[#080707] outline-none">
                {MONTHS.map((m, i) => <option key={m} value={i}>{m}</option>)}
              </select>
              <select value={year} onChange={(e) => setYear(Number(e.target.value))} className="rounded-lg border border-[#EDEDED] bg-white px-2 py-1 text-sm font-semibold text-[#080707] outline-none">
                {Array.from({ length: 10 }, (_, i) => now.getFullYear() + i).map((y) => <option key={y} value={y}>{y}</option>)}
              </select>
            </div>
            <button type="button" onClick={nextMonth} className="text-[#0066FF] transition hover:text-[#005ae0]">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M8 4l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </button>
          </div>

          {/* Day headers */}
          <div className="mb-2 grid grid-cols-7 text-center">
            {DAYS.map((d, i) => (
              <span key={i} className="text-xs font-semibold text-[#0066FF]">{d}</span>
            ))}
          </div>

          {/* Day grid */}
          <div className="grid grid-cols-7 gap-y-1 text-center">
            {calendarCells.map((cell, i) => (
              <button
                key={i}
                type="button"
                onClick={() => cell.current && setSelectedDay(cell.day)}
                className={`mx-auto flex h-8 w-8 items-center justify-center rounded-lg text-sm transition ${
                  !cell.current
                    ? "text-[#C4C4C4]"
                    : cell.day === selectedDay
                    ? "bg-[#0066FF] font-semibold text-white"
                    : "font-medium text-[#080707] hover:bg-[#EEF3FF]"
                }`}
              >
                {cell.day}
              </button>
            ))}
          </div>
        </div>

        {/* Time picker */}
        <div className="mt-4 flex items-center justify-center">
          <div className="inline-flex items-center gap-4 rounded-2xl border border-[#EDEDED] bg-white px-6 py-3">
            {/* Hour */}
            <div className="flex flex-col items-center gap-1">
              <button type="button" onClick={() => cycleHour(1)} className="text-[#8D8D8D] hover:text-[#080707]">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M4 10l4-4 4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </button>
              <span className="text-lg font-medium text-[#8D8D8D]">{pad(hour)}</span>
              <button type="button" onClick={() => cycleHour(-1)} className="text-[#8D8D8D] hover:text-[#080707]">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </button>
            </div>
            <span className="text-lg font-medium text-[#8D8D8D]">:</span>
            {/* Minute */}
            <div className="flex flex-col items-center gap-1">
              <button type="button" onClick={() => cycleMinute(1)} className="text-[#8D8D8D] hover:text-[#080707]">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M4 10l4-4 4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </button>
              <span className="text-lg font-medium text-[#8D8D8D]">{pad(minute)}</span>
              <button type="button" onClick={() => cycleMinute(-1)} className="text-[#8D8D8D] hover:text-[#080707]">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </button>
            </div>
            {/* AM/PM */}
            <div className="flex flex-col items-center gap-1">
              <button type="button" onClick={toggleAmpm} className="text-[#8D8D8D] hover:text-[#080707]">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M4 10l4-4 4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </button>
              <span className="text-lg font-medium text-[#8D8D8D]">{ampm}</span>
              <button type="button" onClick={toggleAmpm} className="text-[#8D8D8D] hover:text-[#080707]">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </button>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-6 flex items-center justify-between">
          <button type="button" onClick={onClose} className="text-sm font-semibold text-[#080707]">
            Cancel
          </button>
          <button
            type="button"
            onClick={() => onSchedule?.({ year, month, day: selectedDay, hour, minute, ampm })}
            className="rounded-xl bg-[#0066FF] px-8 py-3 text-sm font-semibold text-white transition hover:bg-[#005ae0]"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
