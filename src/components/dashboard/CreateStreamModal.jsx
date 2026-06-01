import { useState } from "react";

/* ── Icons ──────────────────────────────────────────────────── */
function CloseIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function InfoIcon({ color = "#8D8D8D" }) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <circle cx="8" cy="8" r="7" stroke={color} strokeWidth="1.3" />
      <path d="M8 7v5" stroke={color} strokeWidth="1.3" strokeLinecap="round" />
      <circle cx="8" cy="4.5" r="0.8" fill={color} />
    </svg>
  );
}

function FeedIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <rect width="20" height="20" rx="5" fill="#0066FF" />
      <rect x="4" y="5" width="12" height="2.5" rx="1" fill="white" />
      <rect x="4" y="9" width="12" height="2.5" rx="1" fill="white" />
      <rect x="4" y="13" width="8" height="2.5" rx="1" fill="white" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <circle cx="10" cy="10" r="8" stroke="#D9D9D9" strokeWidth="1.5" />
      <path d="M10 6v4l3 2" stroke="#D9D9D9" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function PublishedIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <circle cx="10" cy="10" r="8" stroke="#D9D9D9" strokeWidth="1.5" />
      <path d="M6.5 10.5L8.5 12.5L13.5 7.5" stroke="#D9D9D9" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function CheckboxIcon({ checked }) {
  return checked ? (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
      <rect width="18" height="18" rx="4" fill="#0066FF" />
      <path d="M4.5 9L7 11.5L13.5 5.5" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ) : (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
      <rect x="0.75" y="0.75" width="16.5" height="16.5" rx="3.25" stroke="#D9D9D9" strokeWidth="1.5" />
    </svg>
  );
}

/* ── Column options ─────────────────────────────────────────── */
const COLUMN_OPTIONS = [
  {
    id: "my-feed",
    label: "My Feed",
    recommended: true,
    icon: <FeedIcon />,
    defaultChecked: true
  },
  {
    id: "schedule-post",
    label: "Schedule Post",
    recommended: false,
    icon: <ClockIcon />,
    defaultChecked: false
  },
  {
    id: "published-posts",
    label: "Published Posts",
    recommended: false,
    icon: <PublishedIcon />,
    defaultChecked: false
  }
];

/* ── Modal ──────────────────────────────────────────────────── */
export default function CreateStreamModal({ onClose, onCreateStream }) {
  const [streamName, setStreamName] = useState("");
  const [selected, setSelected] = useState(
    COLUMN_OPTIONS.filter((c) => c.defaultChecked).map((c) => c.id)
  );

  const toggle = (id) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]
    );
  };

  const handleSubmit = () => {
    if (!streamName.trim()) return;
    onCreateStream({ name: streamName.trim(), columns: selected });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/25 px-4 backdrop-blur-sm">
      <div
        className="w-full max-w-[440px] rounded-2xl bg-white shadow-[0_16px_48px_rgba(0,0,0,0.14)]"
        style={{ animation: "tutorialIn 0.2s ease-out" }}
      >
        {/* Header */}
        <div className="flex items-start justify-between px-6 pt-6">
          <h2 className="text-lg font-bold text-[#080707]">Create New Stream</h2>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-1 text-[#8D8D8D] transition hover:bg-[#F4F7FF] hover:text-[#080707]"
            aria-label="Close"
          >
            <CloseIcon />
          </button>
        </div>

        {/* Info text */}
        <div className="mt-3 flex items-start gap-2 px-6">
          <span className="mt-0.5 flex-shrink-0">
            <InfoIcon color="#8D8D8D" />
          </span>
          <p className="text-xs leading-relaxed text-[#8D8D8D]">
            A Stream is your workspace to monitor LinkedIn activities like leads, posts, and
            engagement. Set up your first one to start managing your tasks.
          </p>
        </div>

        <div className="mt-5 px-6">
          {/* Stream Name */}
          <label className="block text-sm font-semibold text-[#080707]">
            Stream Name
          </label>
          <input
            type="text"
            value={streamName}
            onChange={(e) => setStreamName(e.target.value)}
            placeholder="e.g. Content Monitoring"
            className="mt-2 w-full rounded-xl border border-[#EDEDED] bg-[#F8F9FA] px-4 py-3 text-sm text-[#080707] placeholder:text-[#C0C0C0] focus:border-[#0066FF]/50 focus:bg-white focus:outline-none transition"
          />

          {/* Column Selection */}
          <label className="mt-5 block text-sm font-semibold text-[#080707]">
            Select Initial Column
          </label>
          <div className="mt-3 space-y-2">
            {COLUMN_OPTIONS.map((col) => {
              const isChecked = selected.includes(col.id);
              return (
                <button
                  key={col.id}
                  type="button"
                  onClick={() => toggle(col.id)}
                  className={`flex w-full items-center gap-3 rounded-xl border px-3 py-3 text-left transition ${
                    isChecked
                      ? "border-[#0066FF]/30 bg-[#F4F7FF]"
                      : "border-[#EDEDED] bg-white hover:border-[#0066FF]/20 hover:bg-[#F8F9FA]"
                  }`}
                >
                  <CheckboxIcon checked={isChecked} />
                  <span className="flex-1 text-sm font-medium text-[#080707]">{col.label}</span>
                  {col.recommended && (
                    <span className="rounded-lg bg-[#EEF3FF] px-2 py-0.5 text-[10px] font-semibold text-[#0066FF]">
                      Recommended
                    </span>
                  )}
                  {col.icon}
                </button>
              );
            })}
          </div>

          {/* Free plan note */}
          <div className="mt-4 flex items-center gap-1.5">
            <InfoIcon color="#8D8D8D" />
            <p className="text-xs text-[#8D8D8D]">You can add up to 3 columns on the free plan</p>
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
            onClick={handleSubmit}
            disabled={!streamName.trim() || selected.length === 0}
            className="rounded-xl bg-[#0066FF] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#005ae0] disabled:opacity-40"
          >
            Create Stream
          </button>
        </div>
      </div>

      <style>{`
        @keyframes tutorialIn {
          from { opacity: 0; transform: scale(0.97) translateY(6px); }
          to   { opacity: 1; transform: scale(1)    translateY(0);   }
        }
      `}</style>
    </div>
  );
}
