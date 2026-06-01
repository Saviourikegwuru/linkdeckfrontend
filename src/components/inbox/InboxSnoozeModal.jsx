export default function InboxSnoozeModal({ onClose, onSnooze, onPickDateTime }) {
  const presets = [
    { label: "Later Today \u2014 6:00 PM", value: "later-today" },
    { label: "Tomorrow Morning \u2014 9:00 AM", value: "tomorrow-morning" },
    { label: "Next Week \u2014 Monday 9:00 AM", value: "next-week" },
    { label: "This Weekend \u2014 Sat 10:00 AM", value: "this-weekend" },
  ];
  const nextWeek = [
    { label: "Monday \u2014 9:00 AM", value: "next-mon" },
    { label: "Wednesday \u2014 10:00 AM", value: "next-wed" },
    { label: "Friday \u2014 4:00 PM", value: "next-fri" },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <button type="button" className="absolute inset-0 bg-black/40" onClick={onClose} aria-label="Close" />
      <div className="relative z-10 w-[380px] rounded-2xl bg-white shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between px-6 pt-6 pb-4">
          <h2 className="text-lg font-bold text-[#080707]">Snooze</h2>
          <button type="button" onClick={onClose} className="text-[#8D8D8D] transition hover:text-[#080707]">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
          </button>
        </div>
        <div className="h-px bg-gradient-to-r from-transparent via-[#EDEDED] to-transparent" />

        <div className="px-6 py-4 space-y-1">
          <p className="mb-2 text-sm font-medium text-[#8D8D8D]">Snooze until...</p>
          {presets.map((p) => (
            <button
              key={p.value}
              type="button"
              onClick={() => onSnooze?.(p.value)}
              className="block w-full rounded-lg px-2 py-2.5 text-left text-sm text-[#080707] transition hover:bg-[#F4F7FF]"
            >
              {p.label}
            </button>
          ))}

          <p className="mt-4 mb-2 text-sm font-semibold text-[#080707]">Next Week...</p>
          {nextWeek.map((p) => (
            <button
              key={p.value}
              type="button"
              onClick={() => onSnooze?.(p.value)}
              className="block w-full rounded-lg px-2 py-2.5 text-left text-sm text-[#0066FF] transition hover:bg-[#F4F7FF]"
            >
              {p.label}
            </button>
          ))}

          <p className="mt-4 mb-2 text-sm font-medium text-[#8D8D8D]">Custom...</p>
          <button
            type="button"
            onClick={onPickDateTime}
            className="flex items-center gap-2 rounded-lg px-2 py-2.5 text-sm font-medium text-[#0066FF] transition hover:bg-[#F4F7FF]"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><rect x="1.5" y="2.5" width="13" height="11" rx="2" stroke="#0066FF" strokeWidth="1.3" /><path d="M1.5 6h13M5 1v3M11 1v3" stroke="#0066FF" strokeWidth="1.3" strokeLinecap="round" /></svg>
            Pick Date & Time
          </button>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-4 border-t border-[#EDEDED] px-6 py-4">
          <button type="button" onClick={onClose} className="text-sm font-semibold text-[#080707]">
            Cancel
          </button>
          <button
            type="button"
            onClick={() => onSnooze?.("custom")}
            className="rounded-xl bg-[#0066FF] px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-[#005ae0]"
          >
            Set Snooze
          </button>
        </div>
      </div>
    </div>
  );
}
