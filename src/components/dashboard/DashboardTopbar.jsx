import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { NotificationBellPanel } from "../notifications/NotificationCenter";

function SearchIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <circle cx="7" cy="7" r="5" stroke="currentColor" strokeWidth="1.5" />
      <path d="M11 11l3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function BellIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
      <path
        d="M9 2a5 5 0 0 0-5 5v3l-1.5 2h13L14 10V7a5 5 0 0 0-5-5Z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
      <path d="M7.5 14a1.5 1.5 0 0 0 3 0" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

export default function DashboardTopbar({ user = { name: "Grace George", avatar: null }, streamName = null, tabs = [], activeTab = null, onTabChange = () => {} }) {
  const navigate = useNavigate();
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const bellButtonRef = useRef(null);
  const panelRef = useRef(null);

  useEffect(() => {
    if (!notificationsOpen) return undefined;

    function handlePointerDown(event) {
      const target = event.target;
      if (bellButtonRef.current?.contains(target) || panelRef.current?.contains(target)) return;
      setNotificationsOpen(false);
    }

    document.addEventListener("mousedown", handlePointerDown);
    return () => document.removeEventListener("mousedown", handlePointerDown);
  }, [notificationsOpen]);

  return (
    <header className="relative flex h-[52px] flex-shrink-0 items-center justify-between gap-3 border-b border-[#EDEDED] bg-white px-6">
      {/* Left – stream name */}
      <div className="min-w-0 flex-1">
        {streamName && (
          <h1 className="truncate text-base font-bold text-[#080707]">{streamName}</h1>
        )}
      </div>

      {/* Center – tab switcher */}
      {tabs.length > 0 && (
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center gap-1">
          {tabs.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => onTabChange(t.id)}
              className={`relative px-4 py-1.5 text-sm font-semibold transition ${
                activeTab === t.id
                  ? "text-[#0066FF] after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:rounded-full after:bg-[#0066FF]"
                  : "text-[#8D8D8D] hover:text-[#080707]"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      )}

      {/* Right – search / bell / avatar */}
      <div className="flex flex-shrink-0 items-center gap-3">
        <div className="flex w-[220px] items-center gap-2 rounded-xl border border-[#EDEDED] bg-[#F8F9FA] px-3 py-2 text-[#8D8D8D] transition focus-within:border-[#0066FF]/40 focus-within:bg-white">
          <SearchIcon />
          <input
            type="search"
            placeholder="Search"
            className="w-full bg-transparent text-sm text-[#080707] placeholder:text-[#8D8D8D] focus:outline-none"
            aria-label="Search"
          />
        </div>

        {/* Bell */}
        <div className="relative">
          <button
            ref={bellButtonRef}
            type="button"
            onClick={() => setNotificationsOpen((open) => !open)}
            className={`relative flex h-8 w-8 items-center justify-center rounded-full transition ${
              notificationsOpen
                ? "bg-[#EEF3FF] text-[#0066FF]"
                : "text-[#8D8D8D] hover:bg-[#F4F7FF] hover:text-[#080707]"
            }`}
            aria-label="Notifications"
            aria-expanded={notificationsOpen}
          >
            <BellIcon />
            <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-[#0066FF]" />
          </button>

          {notificationsOpen ? (
            <NotificationBellPanel
              containerRef={panelRef}
              onNavigateToCenter={() => {
                setNotificationsOpen(false);
                navigate("/settings/notification");
              }}
              onOpenSettings={() => {
                setNotificationsOpen(false);
                navigate("/settings/notification");
              }}
            />
          ) : null}
        </div>

        {/* Avatar */}
        {user.avatar ? (
          <img src={user.avatar} alt={user.name} className="h-8 w-8 rounded-full object-cover" />
        ) : (
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#EDEDED] text-xs font-semibold text-[#8D8D8D]">
            {user.name.charAt(0)}
          </div>
        )}
      </div>
    </header>
  );
}
