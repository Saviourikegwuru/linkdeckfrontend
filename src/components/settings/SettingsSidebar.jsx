import React from "react";

// TODO: Replace with SVG imports from assets/settings if available
const ICONS = {
  account: (
    <svg width="22" height="22" fill="none"><circle cx="11" cy="8" r="4.5" stroke="#8D8D8D" strokeWidth="1.5"/><path d="M3.5 18c0-3.6 3.1-6.5 7-6.5s7 2.9 7 6.5" stroke="#8D8D8D" strokeWidth="1.5"/></svg>
  ),
  profile: (
    <svg width="22" height="22" fill="none"><rect x="4" y="4" width="14" height="14" rx="4" stroke="#8D8D8D" strokeWidth="1.5"/><circle cx="11" cy="10" r="3" stroke="#8D8D8D" strokeWidth="1.5"/></svg>
  ),
  linkedin: (
    <svg width="22" height="22" fill="none"><path d="M6.5 8.5v7M11 8.5v7M15.5 8.5v7" stroke="#8D8D8D" strokeWidth="1.5"/><circle cx="11" cy="5.5" r="1.5" stroke="#8D8D8D" strokeWidth="1.5"/></svg>
  ),
  preference: (
    <svg width="22" height="22" fill="none"><rect x="4" y="10" width="14" height="2" rx="1" fill="#8D8D8D"/></svg>
  ),
  notification: (
    <svg width="22" height="22" fill="none"><path d="M11 19a2 2 0 0 0 2-2H9a2 2 0 0 0 2 2Zm6-5V9a6 6 0 1 0-12 0v5l-2 2v1h16v-1l-2-2Z" stroke="#8D8D8D" strokeWidth="1.5"/></svg>
  ),
  security: (
    <svg width="22" height="22" fill="none"><path d="M11 3l7 4v5c0 5-3.5 8-7 8s-7-3-7-8V7l7-4Z" stroke="#8D8D8D" strokeWidth="1.5"/></svg>
  ),
  privacy: (
    <svg width="22" height="22" fill="none"><rect x="4" y="8" width="14" height="10" rx="2" stroke="#8D8D8D" strokeWidth="1.5"/><path d="M8 8V6a3 3 0 1 1 6 0v2" stroke="#8D8D8D" strokeWidth="1.5"/></svg>
  ),
  billing: (
    <svg width="22" height="22" fill="none"><rect x="3" y="6" width="16" height="10" rx="2" stroke="#8D8D8D" strokeWidth="1.5"/><path d="M3 10h16" stroke="#8D8D8D" strokeWidth="1.5"/></svg>
  ),
  legal: (
    <svg width="22" height="22" fill="none"><rect x="5" y="4" width="12" height="14" rx="2" stroke="#8D8D8D" strokeWidth="1.5"/><path d="M8 8h6M8 12h6" stroke="#8D8D8D" strokeWidth="1.5"/></svg>
  ),
};

const OPTIONS = [
  { key: "account", label: "Account", icon: ICONS.account },
  { key: "profile", label: "Profile and identity", icon: ICONS.profile },
  { key: "linkedin", label: "LinkedIn Accounts", icon: ICONS.linkedin, pro: true },
  { key: "preference", label: "Preference", icon: ICONS.preference },
  { key: "notification", label: "Notification", icon: ICONS.notification },
  { key: "security", label: "Security", icon: ICONS.security },
  { key: "privacy", label: "Privacy and Data", icon: ICONS.privacy },
  { key: "billing", label: "Billing and plans", icon: ICONS.billing },
  { key: "legal", label: "Legal", icon: ICONS.legal },
];

export default function SettingsSidebar({ active, onSelect }) {
  return (
    <nav className="w-[260px] rounded-2xl bg-white py-6 shadow-md">
      <ul className="space-y-1">
        {OPTIONS.map(opt => (
          <li key={opt.key}>
            <button
              type="button"
              className={`flex w-full items-center gap-3 rounded-lg px-5 py-2.5 text-left text-[15px] font-medium transition
                ${active === opt.key ? "bg-[#F4F7FF] text-[#0066FF]" : "text-[#8D8D8D] hover:bg-[#F8F9FA]"}`}
              onClick={() => onSelect(opt.key)}
            >
              <span className="flex-shrink-0">{opt.icon}</span>
              <span className="flex-1">{opt.label}</span>
              {opt.pro && (
                <span className="ml-2 rounded bg-[#EEF3FF] px-2 py-0.5 text-xs font-bold text-[#0066FF]">Pro</span>
              )}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}
