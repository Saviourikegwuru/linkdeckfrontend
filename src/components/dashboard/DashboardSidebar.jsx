import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import logo from "../../assets/logo.svg";

/* ── Inline SVG icons ─────────────────────────────────────────── */
function CheckCircleIcon({ filled = false }) {
  return filled ? (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
      <circle cx="9" cy="9" r="9" fill="#0066FF" />
      <path d="M5.5 9L7.5 11L12.5 6.5" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ) : (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
      <circle cx="9" cy="9" r="8" stroke="#D9D9D9" strokeWidth="1.5" />
    </svg>
  );
}

function PlusIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M8 3v10M3 8h10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function AnalyticsIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
      <rect x="2" y="10" width="3" height="6" rx="1" stroke="currentColor" strokeWidth="1.4" />
      <rect x="7" y="6" width="3" height="10" rx="1" stroke="currentColor" strokeWidth="1.4" />
      <rect x="12" y="2" width="3" height="14" rx="1" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  );
}

function TeamIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
      <circle cx="7" cy="6" r="2.5" stroke="currentColor" strokeWidth="1.4" />
      <path d="M1.5 15c0-3.038 2.462-5.5 5.5-5.5s5.5 2.462 5.5 5.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      <circle cx="13" cy="5" r="2" stroke="currentColor" strokeWidth="1.4" />
      <path d="M16.5 14c0-2.485-1.567-4.5-3.5-4.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

function MessagesIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
      <rect x="2" y="3" width="14" height="10" rx="2" stroke="currentColor" strokeWidth="1.4" />
      <path d="M2 5.5l7 4.5 7-4.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function FlashIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <path d="M8 1.5L2.5 8H7L6 12.5L11.5 6H7L8 1.5Z" fill="#0066FF" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function HelpIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
      <circle cx="9" cy="9" r="7.5" stroke="currentColor" strokeWidth="1.4" />
      <path d="M7 6.8a2.1 2.1 0 0 1 4 .9c0 1.4-2 1.8-2 3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      <circle cx="9" cy="13" r="0.8" fill="currentColor" />
    </svg>
  );
}

function SettingsIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
      <path
        d="M9 1.8 10.4 2.1 11 3.4 12.4 3.6 13.6 2.8 14.6 3.8 13.8 5 14 6.4 15.3 7 15.6 8.4 14.5 9.3 14.5 10.7 15.6 11.6 15.3 13 14 13.6 13.8 15 14.6 16.2 13.6 17.2 12.4 16.4 11 16.6 10.4 17.9 9 18.2 7.6 17.9 7 16.6 5.6 16.4 4.4 17.2 3.4 16.2 4.2 15 4 13.6 2.7 13 2.4 11.6 3.5 10.7 3.5 9.3 2.4 8.4 2.7 7 4 6.4 4.2 5 3.4 3.8 4.4 2.8 5.6 3.6 7 3.4 7.6 2.1 9 1.8Z"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
      <circle cx="9" cy="10" r="2.2" stroke="currentColor" strokeWidth="1.3" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function DotsIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <circle cx="2.5" cy="7" r="1.2" fill="currentColor" />
      <circle cx="7"   cy="7" r="1.2" fill="currentColor" />
      <circle cx="11.5" cy="7" r="1.2" fill="currentColor" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <circle cx="7" cy="7" r="7" fill="#0066FF" />
      <path d="M4 7L6 9L10 5" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/* ── Data ─────────────────────────────────────────────────────── */
const CHECKLIST = [
  { id: "linkedin", label: "Connect LinkedIn profile", done: true },
  { id: "stream",   label: "Create your first stream", done: false },
  { id: "post",     label: "Schedule Post",            done: false },
  { id: "analytics",label: "Explore Analytics Dashboard", done: false }
];

const PROGRESS = Math.round((CHECKLIST.filter((t) => t.done).length / CHECKLIST.length) * 100);

/* ── Component ────────────────────────────────────────────────── */
export default function DashboardSidebar({
  user = { name: "Grace George", plan: "Basic", avatar: null },
  streams = [],
  activeStreamId = null,
  onSelectStream,
  onCreateStream,
}) {
  const [gettingStartedOpen, setGettingStartedOpen] = useState(true);
  const [settingsMenuOpen, setSettingsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const isTeam = location.pathname === "/team";
  const isAnalytics = location.pathname === "/analytics";
  const isInbox = location.pathname === "/inbox";
  const isSettings = location.pathname.startsWith("/settings");

  const settingsOptions = [
    { id: "account", label: "Account", icon: <circle cx="9" cy="6" r="3" />, path: "/settings/account" },
    {
      id: "profile",
      label: "Profile and identity",
      icon: (
        <>
          <rect x="2.5" y="4" width="13" height="10" rx="2" />
          <circle cx="7" cy="9" r="1.8" />
          <path d="M10 9h3" strokeWidth="1.4" strokeLinecap="round" />
        </>
      ),
      path: "/settings/profile",
    },
    {
      id: "linkedin",
      label: "LinkedIn Accounts",
      icon: <path d="M3 13c4.5 0 4.5-8 9-8 1.4 0 2.6.8 3 2" strokeWidth="1.4" strokeLinecap="round" />,
      path: "/settings/linkedin",
      pro: true,
    },
    {
      id: "preference",
      label: "Preference",
      icon: (
        <>
          <path d="M3 6h12" strokeWidth="1.4" strokeLinecap="round" />
          <path d="M5 9h8" strokeWidth="1.4" strokeLinecap="round" />
          <path d="M7 12h4" strokeWidth="1.4" strokeLinecap="round" />
        </>
      ),
      path: "/settings/preference",
    },
    { id: "notification", label: "Notification", icon: <path d="M9 2a4.5 4.5 0 0 0-4.5 4.5v2.7L3 11v1h12v-1l-1.5-1.8V6.5A4.5 4.5 0 0 0 9 2Zm-1.2 11.7a1.2 1.2 0 0 0 2.4 0" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />, path: "/settings/notification" },
    { id: "security", label: "Security", icon: <path d="M9 2.5 14 5v4c0 3.5-2.2 5.8-5 6.5C6.2 14.8 4 12.5 4 9V5l5-2.5Z" strokeWidth="1.4" strokeLinejoin="round" />, path: "/settings/security" },
    {
      id: "privacy",
      label: "Privacy and Data",
      icon: (
        <>
          <ellipse cx="9" cy="4" rx="4.5" ry="1.7" />
          <path d="M4.5 4v7c0 .9 2 1.7 4.5 1.7s4.5-.8 4.5-1.7V4" strokeWidth="1.4" strokeLinejoin="round" />
        </>
      ),
      path: "/settings/privacy",
    },
    {
      id: "billing",
      label: "Billing and plans",
      icon: (
        <>
          <rect x="2.5" y="3" width="13" height="12" rx="2" />
          <circle cx="12.3" cy="9" r="1.4" />
          <path d="M5 6h3" strokeWidth="1.4" strokeLinecap="round" />
        </>
      ),
      path: "/settings/billing",
    },
    {
      id: "legal",
      label: "Legal",
      icon: (
        <>
          <rect x="4" y="2.8" width="10" height="12.4" rx="2" />
          <path d="M7 7h4M7 10.2h4" strokeWidth="1.4" strokeLinecap="round" />
        </>
      ),
      path: "/settings/legal",
    },
  ];

  return (
    <>
      <aside className="flex h-full w-[284px] flex-shrink-0 flex-col overflow-y-auto border-r border-[#EDEDED] bg-white px-4 pb-4 pt-4">
      {/* Logo */}
      <div className="px-1 pb-4">
        <img src={logo} alt="Linkdeck" className="h-7 w-auto" />
      </div>

      {/* User profile */}
      <div className="flex items-center gap-2 rounded-xl border border-[#EDEDED] bg-white px-2.5 py-2">
        {user.avatar ? (
          <img src={user.avatar} alt={user.name} className="h-8 w-8 flex-shrink-0 rounded-full object-cover" />
        ) : (
          <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-[#EDEDED] text-xs font-semibold text-[#8D8D8D]">
            {user.name.charAt(0)}
          </div>
        )}
        <div className="min-w-0">
          <p className="truncate text-[11px] font-semibold text-[#080707]">{user.name}</p>
          <p className="text-[10px] font-normal text-[#8D8D8D]">{user.plan}</p>
        </div>
      </div>

      {/* Getting Started checklist */}
      {gettingStartedOpen && (
        <div className="mt-3 rounded-xl border border-[#EDEDED] bg-white p-3">
          <div className="flex items-center justify-between gap-1">
            <div className="flex items-center gap-1.5">
              <CheckIcon />
              <span className="text-[11px] font-semibold text-[#080707]">Getting Started</span>
            </div>
            <button
              type="button"
              onClick={() => setGettingStartedOpen(false)}
              className="rounded p-0.5 text-[#8D8D8D] transition hover:text-[#080707]"
              aria-label="Close getting started"
            >
              <CloseIcon />
            </button>
          </div>
          <p className="mt-1 text-[10px] leading-snug text-[#8D8D8D]">
            Complete this task to master linkDeck
          </p>

          {/* Checklist items */}
          <ul className="mt-3 space-y-2">
            {CHECKLIST.map((item) => (
              <li key={item.id} className="flex items-center gap-2">
                <CheckCircleIcon filled={item.done} />
                <span
                  className={`text-[11px] leading-snug ${
                    item.done
                      ? "text-[#8D8D8D] line-through"
                      : "text-[#080707]"
                  }`}
                >
                  {item.label}
                </span>
              </li>
            ))}
          </ul>

          {/* Progress bar */}
          <div className="mt-3">
            <div className="h-1.5 w-full overflow-hidden rounded-full bg-[#EDEDED]">
              <div
                className="h-full rounded-full bg-[#0066FF] transition-all"
                style={{ width: `${PROGRESS}%` }}
              />
            </div>
            <p className="mt-1 text-[10px] text-[#8D8D8D]">{PROGRESS} per. completed</p>
          </div>

          {/* Create Stream CTA */}
          <button
            type="button"
            onClick={onCreateStream}
            className="mt-3 flex w-full items-center justify-center gap-1.5 rounded-xl bg-[#0066FF] py-2 text-[11px] font-semibold text-white transition hover:bg-[#005ae0]"
          >
            <PlusIcon />
            Create Stream
          </button>
        </div>
      )}

      {/* Streams list */}
      {streams.length > 0 && (
        <div className="mt-3">
          <p className="mb-1.5 px-1 text-[10px] font-semibold uppercase tracking-widest text-[#8D8D8D]">
            Streams
          </p>
          <ul className="space-y-0.5">
            {streams.map((stream) => {
              const isInboxStream = stream.id === "inbox" || stream.name === "Inbox";
              const active = isInboxStream ? isInbox : stream.id === activeStreamId;
              return (
                <li key={stream.id}>
                  <button
                    type="button"
                    onClick={() => isInboxStream ? navigate("/inbox") : onSelectStream?.(stream.id)}
                    className={`group flex w-full items-center gap-2 rounded-xl px-2.5 py-2 text-left transition ${
                      active
                        ? "bg-[#EEF3FF] text-[#0066FF]"
                        : "text-[#080707] hover:bg-[#F4F7FF]"
                    }`}
                  >
                    <CheckCircleIcon filled={active} />
                    <span className="min-w-0 flex-1 truncate text-[11px] font-medium">
                      {stream.name}
                    </span>
                    <span className="invisible text-[#8D8D8D] transition group-hover:visible">
                      <DotsIcon />
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
          <button
            type="button"
            onClick={onCreateStream}
            className="mt-2 flex w-full items-center gap-1.5 rounded-xl px-2.5 py-2 text-[11px] font-medium text-[#0066FF] transition hover:bg-[#EEF3FF]"
          >
            <PlusIcon />
            Create Stream
          </button>
        </div>
      )}

      {/* Nav items */}
      <nav className="mt-4 flex flex-1 flex-col gap-1">
        <NavItem icon={<MessagesIcon />} label="Messages" onClick={() => navigate('/inbox')} active={isInbox} />
        <NavItem icon={<AnalyticsIcon />} label="Analytics" badge="Pro" active={isAnalytics} onClick={() => navigate('/analytics')} />
        <NavItem icon={<TeamIcon />} label="Team" badge="Pro" active={isTeam} onClick={() => navigate("/team")} />
      </nav>

      {/* Bottom section */}
      <div className="mt-4 space-y-1">
        {/* Pro Plan upgrade card */}
        <div className="rounded-xl border border-[#D6E4FF] bg-[#EEF3FF] px-3 py-3">
          <div className="flex items-center gap-1.5">
            <FlashIcon />
            <span className="text-[11px] font-bold text-[#0066FF]">Pro Plan</span>
          </div>
          <p className="mt-0.5 text-[10px] text-[#0066FF]">Unlock pro features Now</p>
          <button
            type="button"
            className="mt-2 w-full rounded-xl bg-[#0066FF] py-2 text-[11px] font-semibold text-white transition hover:bg-[#005ae0]"
          >
            Upgrade to pro
          </button>
        </div>

        {/* Help Center */}
        <NavItem icon={<HelpIcon />} label="Help Center" />
        {/* Settings */}
        <NavItem icon={<SettingsIcon />} label="Settings" active={isSettings} onClick={() => setSettingsMenuOpen(true)} />
      </div>
      </aside>

      {settingsMenuOpen && (
        <>
          <button
            type="button"
            aria-label="Close settings menu"
            className="fixed inset-0 z-40 bg-[#080707]/45"
            onClick={() => setSettingsMenuOpen(false)}
          />
          <div className="fixed left-[270px] top-1/2 z-50 w-[258px] -translate-y-1/2 rounded-2xl border border-[#EDEDED] bg-white p-4 shadow-[0_8px_30px_rgba(8,7,7,0.2)]">
            <ul className="space-y-1.5">
              {settingsOptions.map((opt) => (
                <li key={opt.id}>
                  <button
                    type="button"
                    onClick={() => {
                      setSettingsMenuOpen(false);
                      navigate(opt.path);
                    }}
                    className="flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-left text-[#8D8D8D] transition hover:bg-[#F4F7FF] hover:text-[#080707]"
                  >
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" className="text-current" aria-hidden="true">
                      <g stroke="currentColor" fill="none">{opt.icon}</g>
                    </svg>
                    <span className="text-[14px] font-medium">{opt.label}</span>
                    {opt.pro && (
                      <span className="ml-auto rounded-md bg-[#D6E4FF] px-2 py-0.5 text-[12px] font-semibold text-[#0066FF]">Pro</span>
                    )}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
    </>
  );
}

function NavItem({ icon, label, badge, onClick, active = false }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex w-full items-center justify-between gap-2 rounded-xl px-2.5 py-2 transition ${
        active
          ? "bg-[#EEF3FF] text-[#0066FF]"
          : "text-[#8D8D8D] hover:bg-[#F4F7FF] hover:text-[#080707]"
      }`}
    >
      <div className="flex items-center gap-2">
        {icon}
        <span className="text-[11px] font-medium">{label}</span>
      </div>
      {badge && (
        <span className="rounded-md bg-[#0066FF] px-1.5 py-0.5 text-[9px] font-semibold text-white">
          {badge}
        </span>
      )}
    </button>
  );
}
