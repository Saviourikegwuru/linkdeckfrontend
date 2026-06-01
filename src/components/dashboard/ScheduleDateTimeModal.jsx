import { useState } from "react";

function CloseIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function CalendarIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
      <rect x="2" y="3" width="14" height="13" rx="2" stroke="#8D8D8D" strokeWidth="1.3" />
      <path d="M2 7h14" stroke="#8D8D8D" strokeWidth="1.3" />
      <path d="M6 1v4M12 1v4" stroke="#8D8D8D" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
      <circle cx="9" cy="9" r="7" stroke="#8D8D8D" strokeWidth="1.3" />
      <path d="M9 5v4l2.5 2" stroke="#8D8D8D" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function ScheduleDateTimeModal({ onClose, onSchedule }) {
  const today = new Date();
  const pad = (n) => String(n).padStart(2, "0");
  const defaultDate = `${pad(today.getMonth() + 1)}/${pad(today.getDate())}/${today.getFullYear()}`;

  const [date, setDate] = useState(defaultDate);
  const [time, setTime] = useState("12:00 PM");

  const tzLabel = Intl.DateTimeFormat().resolvedOptions().timeZone.replace(/_/g, " ");

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/25 px-4 backdrop-blur-sm">
      <div
        className="w-full max-w-[380px] rounded-2xl bg-white shadow-[0_16px_48px_rgba(0,0,0,0.14)]"
        style={{ animation: "tutorialIn 0.2s ease-out" }}
      >
        {/* Header */}
        <div className="px-6 pt-6">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-lg font-bold text-[#080707]">Schedule Date and Time</h2>
              <p className="mt-1 text-xs leading-relaxed text-[#8D8D8D]">
                {today.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" })},{" "}
                {today.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })} –{" "}
                based on your location
              </p>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg p-1 text-[#8D8D8D] transition hover:bg-[#F4F7FF] hover:text-[#080707]"
              aria-label="Close"
            >
              <CloseIcon />
            </button>
          </div>

          {/* Date */}
          <div className="mt-5">
            <label className="block text-sm font-semibold text-[#080707]">Date</label>
            <div className="relative mt-2">
              <input
                type="text"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full rounded-xl border border-[#EDEDED] bg-[#F8F9FA] px-4 py-3 pr-12 text-sm text-[#080707] placeholder:text-[#C0C0C0] focus:border-[#0066FF]/50 focus:bg-white focus:outline-none transition"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2">
                <CalendarIcon />
              </span>
            </div>
          </div>

          {/* Time */}
          <div className="mt-4">
            <label className="block text-sm font-semibold text-[#080707]">Time</label>
            <div className="relative mt-2">
              <input
                type="text"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="w-full rounded-xl border border-[#EDEDED] bg-[#F8F9FA] px-4 py-3 pr-12 text-sm text-[#080707] placeholder:text-[#C0C0C0] focus:border-[#0066FF]/50 focus:bg-white focus:outline-none transition"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2">
                <ClockIcon />
              </span>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-6 flex items-center justify-end gap-3 border-t border-[#EDEDED] px-6 py-4">
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl border border-[#D9D9D9] bg-white px-5 py-2.5 text-sm font-semibold text-[#080707] transition hover:border-[#0066FF]/40 hover:bg-[#f7faff]"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={() => { onSchedule?.({ date, time }); onClose(); }}
            className="rounded-xl bg-[#0066FF] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#005ae0]"
          >
            Schedule
          </button>
        </div>
      </div>

      <style>{`
        @keyframes tutorialIn {
          from { opacity: 0; transform: scale(0.97) translateY(6px); }
          to   { opacity: 1; transform: scale(1)    translateY(0); }
        }
      `}</style>
    </div>
  );
}
