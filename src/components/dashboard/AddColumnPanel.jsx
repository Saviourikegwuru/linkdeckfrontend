import { useState } from "react";

/* ── Icons ──────────────────────────────────────────────────── */
function CloseIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <circle cx="7" cy="7" r="5" stroke="currentColor" strokeWidth="1.4" />
      <path d="M11 11l3 3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

function PlusCircleIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <circle cx="10" cy="10" r="9" stroke="#D9D9D9" strokeWidth="1.4" />
      <path d="M10 6v8M6 10h8" stroke="#D9D9D9" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

function CheckFilledIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <circle cx="10" cy="10" r="9" fill="#0066FF" />
      <path d="M6 10.5L8.5 13L14 7" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function FlashIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <path d="M8 1.5L2.5 8H7L6 12.5L11.5 6H7L8 1.5Z" fill="white" />
    </svg>
  );
}

function FeedSquareIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <rect width="32" height="32" rx="8" fill="#0066FF" fillOpacity="0.1" />
      <rect x="7" y="9" width="18" height="4" rx="2" fill="#0066FF" fillOpacity="0.5" />
      <rect x="7" y="15" width="18" height="4" rx="2" fill="#0066FF" fillOpacity="0.5" />
      <rect x="7" y="21" width="10" height="4" rx="2" fill="#0066FF" fillOpacity="0.5" />
    </svg>
  );
}

function ClockSquareIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <rect width="32" height="32" rx="8" fill="#F4F4F4" />
      <circle cx="16" cy="16" r="8" stroke="#8D8D8D" strokeWidth="1.4" />
      <path d="M16 10v6l4 2" stroke="#8D8D8D" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function CheckSquareIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <rect width="32" height="32" rx="8" fill="#F4F4F4" />
      <circle cx="16" cy="16" r="8" stroke="#8D8D8D" strokeWidth="1.4" />
      <path d="M11.5 16L14.5 19L20.5 13" stroke="#8D8D8D" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/* ── Column catalogue ────────────────────────────────────────── */
const FREE_ITEMS = [
  {
    id: "my-feed",
    label: "My feed",
    desc: "General LinkedIn home feed",
    icon: <FeedSquareIcon />,
    added: true
  },
  {
    id: "schedule-posts",
    label: "Create and Schedule Posts",
    desc: "Monitor you planned content",
    icon: <ClockSquareIcon />,
    added: false
  },
  {
    id: "all-activities",
    label: "All Activities",
    desc: "Posts, Comments, Images, Events, Reactions",
    icon: <CheckSquareIcon />,
    added: false
  }
];

const PRO_ITEMS = [
  { id: "scheduled-post", label: "Scheduled Post", desc: "Monitor you planned content" },
  { id: "published-posts-1", label: "Published Posts", desc: "Track engagements on live posts" },
  { id: "published-posts-2", label: "Published Posts", desc: "Track engagements on live posts" },
  { id: "published-posts-3", label: "Published Posts", desc: "Track engagements on live posts" },
  { id: "published-posts-4", label: "Published Posts", desc: "Track engagements on live posts" },
  { id: "published-posts-5", label: "Published Posts", desc: "Track engagements on live posts" },
  { id: "published-posts-6", label: "Published Posts", desc: "Track engagements on live posts" }
];

/* ── Panel ───────────────────────────────────────────────────── */
export default function AddColumnPanel({ onClose, onAddColumn, existingColumnIds = [] }) {
  const [search, setSearch] = useState("");
  const [added, setAdded] = useState(new Set(existingColumnIds));

  const handleAdd = (id) => {
    setAdded((prev) => {
      const next = new Set(prev);
      next.add(id);
      return next;
    });
    onAddColumn?.(id);
  };

  const filteredFree = FREE_ITEMS.filter(
    (item) =>
      item.label.toLowerCase().includes(search.toLowerCase()) ||
      item.desc.toLowerCase().includes(search.toLowerCase())
  );

  const filteredPro = PRO_ITEMS.filter(
    (item) =>
      item.label.toLowerCase().includes(search.toLowerCase()) ||
      item.desc.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      {/* Backdrop – blurs the entire dashboard (sidebar + topbar + content) */}
      <div
        className="fixed inset-0 z-30 bg-black/20 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Panel */}
      <div
        className="absolute bottom-0 right-0 top-0 z-40 flex w-[280px] flex-col border-l border-[#EDEDED] bg-white shadow-[-8px_0_32px_rgba(0,0,0,0.08)]"
        style={{ animation: "slideInRight 0.22s ease-out" }}
      >
        {/* Header */}
        <div className="flex flex-shrink-0 items-center justify-between border-b border-[#EDEDED] px-5 py-4">
          <h2 className="text-sm font-bold text-[#080707]">Add new column</h2>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-1 text-[#8D8D8D] transition hover:bg-[#F4F7FF] hover:text-[#080707]"
            aria-label="Close"
          >
            <CloseIcon />
          </button>
        </div>

        {/* Search */}
        <div className="flex-shrink-0 px-5 py-3">
          <div className="flex items-center gap-2 rounded-xl border border-[#EDEDED] bg-[#F8F9FA] px-3 py-2.5 text-[#8D8D8D] transition focus-within:border-[#0066FF]/40 focus-within:bg-white">
            <SearchIcon />
            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search for column type"
              className="w-full bg-transparent text-xs text-[#080707] placeholder:text-[#8D8D8D] focus:outline-none"
            />
          </div>
        </div>

        {/* Scrollable items */}
        <div className="flex-1 overflow-y-auto px-5 pb-4">
          {/* FREE ITEMS */}
          <div className="mb-4">
            <div className="mb-3 flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#8D8D8D]">
                Free Items
              </span>
              <span className="rounded-lg bg-[#EEF3FF] px-2 py-0.5 text-[10px] font-semibold text-[#0066FF]">
                Included
              </span>
            </div>
            <div className="space-y-2">
              {filteredFree.map((item) => {
                const isAdded = added.has(item.id) || item.added;
                return (
                  <div
                    key={item.id}
                    className="flex items-center gap-3 rounded-xl border border-[#EDEDED] bg-white px-3 py-2.5"
                  >
                    <div className="flex-shrink-0">{item.icon}</div>
                    <div className="min-w-0 flex-1">
                      <p className="text-[11px] font-semibold text-[#080707] line-clamp-1">{item.label}</p>
                      <p className="text-[10px] text-[#8D8D8D] line-clamp-1">{item.desc}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => !isAdded && handleAdd(item.id)}
                      className="flex-shrink-0 transition hover:opacity-70"
                      aria-label={isAdded ? "Added" : `Add ${item.label}`}
                    >
                      {isAdded ? <CheckFilledIcon /> : <PlusCircleIcon />}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          {/* PRO FEATURES */}
          <div>
            <div className="mb-3 flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#8D8D8D]">
                Pro Features
              </span>
              <span className="flex items-center gap-1 rounded-lg bg-[#0066FF] px-2 py-0.5">
                <FlashIcon />
                <span className="text-[10px] font-semibold text-white">Premium</span>
              </span>
            </div>
            <div className="space-y-2">
              {filteredPro.map((item) => {
                const isAdded = added.has(item.id);
                return (
                  <div
                    key={item.id}
                    className="flex items-center gap-3 rounded-xl border border-[#EDEDED] bg-white px-3 py-2.5 opacity-60"
                  >
                    <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-[#F4F4F4]">
                      <ClockSquareIcon />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-[11px] font-semibold text-[#080707]">{item.label}</p>
                      <p className="text-[10px] text-[#8D8D8D]">{item.desc}</p>
                    </div>
                    <button
                      type="button"
                      className="flex-shrink-0 opacity-40"
                      disabled
                      aria-label={`${item.label} – Pro required`}
                    >
                      <PlusCircleIcon />
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Pro Plan card */}
        <div className="flex-shrink-0 border-t border-[#EDEDED] p-4">
          <div className="rounded-xl border border-[#D6E4FF] bg-[#EEF3FF] px-4 py-3">
            <div className="flex items-center gap-1.5">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <path d="M8 1.5L2.5 8H7L6 12.5L11.5 6H7L8 1.5Z" fill="#0066FF" />
              </svg>
              <span className="text-xs font-bold text-[#0066FF]">Pro Plan</span>
            </div>
            <p className="mt-0.5 text-[10px] text-[#0066FF]">Unlock pro features Now</p>
            <button
              type="button"
              className="mt-2 w-full rounded-xl bg-[#0066FF] py-2 text-xs font-semibold text-white transition hover:bg-[#005ae0]"
            >
              Upgrade to pro
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes slideInRight {
          from { opacity: 0; transform: translateX(24px); }
          to   { opacity: 1; transform: translateX(0); }
        }
      `}</style>
    </>
  );
}
