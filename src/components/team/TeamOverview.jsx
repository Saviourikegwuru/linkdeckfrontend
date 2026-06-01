import { useState } from "react";

/* ── Data ─────────────────────────────────────────────────────── */
const STATS = [
  {
    label: "Active Members",
    value: "10",
    badge: "2 inactive",
    badgeColor: "text-[#EF4444] bg-[#FDE8E8]",
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <rect width="28" height="28" rx="8" fill="#FFF4E5" />
        <circle cx="10" cy="10" r="3" stroke="#F59E0B" strokeWidth="1.4" />
        <path d="M4 21c0-3.314 2.686-6 6-6" stroke="#F59E0B" strokeWidth="1.4" strokeLinecap="round" />
        <circle cx="18" cy="10" r="3" stroke="#F59E0B" strokeWidth="1.4" />
        <path d="M18 15c3.314 0 6 2.686 6 6" stroke="#F59E0B" strokeWidth="1.4" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    label: "Posts Created",
    value: "450",
    badge: "+18%",
    badgeColor: "text-[#10B981] bg-[#E8FAF3]",
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <rect width="28" height="28" rx="8" fill="#EEF3FF" />
        <rect x="7" y="9" width="14" height="2" rx="1" fill="#0066FF" />
        <rect x="7" y="13" width="10" height="2" rx="1" fill="#0066FF" />
        <rect x="7" y="17" width="7" height="2" rx="1" fill="#0066FF" />
      </svg>
    ),
  },
  {
    label: "Total Engagement",
    value: "100k",
    badge: "+12.5%",
    badgeColor: "text-[#10B981] bg-[#E8FAF3]",
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <rect width="28" height="28" rx="8" fill="#FFF0FA" />
        <path d="M14 20s-7-4.5-7-9a4 4 0 0 1 7-2.65A4 4 0 0 1 21 11c0 4.5-7 9-7 9Z" stroke="#EC4899" strokeWidth="1.4" strokeLinejoin="round" fill="#FDE8F5" />
      </svg>
    ),
  },
  {
    label: "Scheduled posts",
    value: "32",
    badge: "8 Members",
    badgeColor: "text-[#0066FF] bg-[#EEF3FF]",
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <rect width="28" height="28" rx="8" fill="#EEF3FF" />
        <circle cx="14" cy="14" r="6" stroke="#0066FF" strokeWidth="1.4" />
        <path d="M14 10v4l2.5 2.5" stroke="#0066FF" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    label: "Productivity",
    value: "78/100",
    badge: "+12.5%",
    badgeColor: "text-[#10B981] bg-[#E8FAF3]",
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <rect width="28" height="28" rx="8" fill="#E8FAF3" />
        <path d="M8 20l4-8 4 4 3-6" stroke="#10B981" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
];

const PERFORMANCE = [
  { name: "Gloria Maggie",  role: "Admin",  posts: 48, published: 32, engagement: "12.8K", avgEngagement: 450,  lastActive: "2hrs ago", online: false, access: "Global Marketing Hub" },
  { name: "Uche Peterson",  role: "Editor", posts: 63, published: 52, engagement: "9.2k",  avgEngagement: 370,  lastActive: "Online",   online: true,  access: "Global Marketing Hub" },
  { name: "Malik Davidson", role: "Admin",  posts: 63, published: 52, engagement: "9.2k",  avgEngagement: 370,  lastActive: "Online",   online: true,  access: "Global Marketing Hub" },
  { name: "Philip Ekeh",    role: "Viewer", posts: 0,  published: 0,  engagement: "0",     avgEngagement: 0,    lastActive: "Online",   online: true,  access: "Global Marketing Hub" },
];

const CONTRIBUTORS = [
  { name: "Gloria Maggie",  badge: "Highest Engagement", value: "48%",     color: "#F59E0B", bg: "#FFF4E5" },
  { name: "Malik Davidson", badge: "Constant Poster",    value: "63 Posts", color: "#0066FF", bg: "#EEF3FF" },
  { name: "Gloria Maggie",  badge: "Viral Reach",        value: "100k",     color: "#10B981", bg: "#E8FAF3" },
];

function initials(name) {
  return name.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase();
}

const AV_BG  = ["#EEF3FF", "#FFF4E5", "#E8FAF3", "#FDE8E8"];
const AV_CLR = ["#0066FF", "#F59E0B", "#10B981", "#EF4444"];

function Avatar({ name, index }) {
  return (
    <div
      className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full text-[11px] font-bold"
      style={{ background: AV_BG[index % 4], color: AV_CLR[index % 4] }}
    >
      {initials(name)}
    </div>
  );
}

function UserPlusIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <circle cx="6.5" cy="5" r="2.5" stroke="currentColor" strokeWidth="1.4" />
      <path d="M1 13c0-3.038 2.462-5.5 5.5-5.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      <path d="M12 9v4M10 11h4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

function CalendarIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <rect x="1" y="2.5" width="12" height="10" rx="2" stroke="#8D8D8D" strokeWidth="1.3" />
      <path d="M4 1v3M10 1v3M1 6h12" stroke="#8D8D8D" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  );
}

function DownloadIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <path d="M7 1v8M4 6l3 3 3-3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M1 11h12" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

function TrendUpIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
      <path d="M1 9l4-4 2 2 4-5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function TeamOverview({ onInvite }) {
  const [perfTab, setPerfTab] = useState("recent");

  return (
    <div className="flex flex-1 flex-col gap-5 overflow-auto p-6">
      {/* Header row */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-sm font-semibold text-[#080707]">Team Overview</h2>
          <p className="text-xs text-[#8D8D8D]">Monitoring 12 Team Members across all LinkDECK account</p>
        </div>
        <div className="flex items-center gap-2">
          {/* Date filter */}
          <button
            type="button"
            className="flex items-center gap-1.5 rounded-xl border border-[#EDEDED] bg-white px-3 py-2 text-xs font-medium text-[#080707] transition hover:border-[#0066FF]/40"
          >
            <CalendarIcon />
            Last 30 days
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
              <path d="M2 4l3 3 3-3" stroke="#8D8D8D" strokeWidth="1.2" strokeLinecap="round" />
            </svg>
          </button>

          {/* Export */}
          <button
            type="button"
            className="flex items-center gap-1.5 rounded-xl border border-[#EDEDED] bg-white px-3 py-2 text-xs font-medium text-[#080707] transition hover:border-[#0066FF]/40"
          >
            <DownloadIcon />
            Export Report
          </button>

          {/* Invite */}
          <button
            type="button"
            onClick={onInvite}
            className="flex items-center gap-2 rounded-xl bg-[#0066FF] px-4 py-2 text-xs font-semibold text-white transition hover:bg-[#005ae0]"
          >
            <UserPlusIcon />
            Invite member
          </button>
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
        {STATS.map((stat) => (
          <div key={stat.label} className="flex flex-col gap-3 rounded-2xl border border-[#EDEDED] bg-white p-4">
            <div className="flex items-start justify-between">
              {stat.icon}
              <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${stat.badgeColor}`}>
                {stat.badge}
              </span>
            </div>
            <div>
              <p className="text-[10px] font-medium text-[#8D8D8D]">{stat.label}</p>
              <p className="mt-0.5 text-xl font-bold text-[#080707]">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Performance table */}
      <div className="overflow-hidden rounded-2xl border border-[#EDEDED] bg-white">
        <div className="flex items-center justify-between border-b border-[#EDEDED] px-5 py-3">
          <div>
            <h3 className="text-sm font-bold text-[#080707]">Team Output and Performance</h3>
            <p className="text-xs text-[#8D8D8D]">See what's resonating</p>
          </div>
          <div className="flex rounded-lg border border-[#EDEDED] overflow-hidden text-xs font-semibold">
            <button
              type="button"
              onClick={() => setPerfTab("recent")}
              className={`px-3 py-1.5 transition ${perfTab === "recent" ? "bg-[#0066FF] text-white" : "text-[#8D8D8D] hover:bg-[#F4F7FF]"}`}
            >
              Most Recent
            </button>
            <button
              type="button"
              onClick={() => setPerfTab("engagement")}
              className={`px-3 py-1.5 transition ${perfTab === "engagement" ? "bg-[#0066FF] text-white" : "text-[#8D8D8D] hover:bg-[#F4F7FF]"}`}
            >
              Top Engagement
            </button>
          </div>
        </div>
        <table className="w-full min-w-[640px] text-sm">
          <thead>
            <tr className="border-b border-[#EDEDED] text-left text-xs text-[#8D8D8D]">
              {["Member","Role","Posts","Published","Engagement","Avg. Engagment","Last Active","Account Access"].map((h) => (
                <th key={h} className="px-5 py-3 font-medium">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {PERFORMANCE.map((m, idx) => (
              <tr key={m.name + idx} className="border-b border-[#EDEDED] last:border-0 hover:bg-[#F8F9FA] transition-colors">
                <td className="px-5 py-3.5">
                  <div className="flex items-center gap-2.5">
                    <Avatar name={m.name} index={idx} />
                    <span className="font-medium text-[#080707]">{m.name}</span>
                  </div>
                </td>
                <td className="px-5 py-3.5 text-[#8D8D8D]">{m.role}</td>
                <td className="px-5 py-3.5 text-[#080707]">{m.posts}</td>
                <td className="px-5 py-3.5 text-[#080707]">{m.published}</td>
                <td className="px-5 py-3.5 text-[#080707]">{m.engagement}</td>
                <td className="px-5 py-3.5 text-[#080707]">{m.avgEngagement}</td>
                <td className="px-5 py-3.5">
                  {m.online ? (
                    <span className="flex items-center gap-1 text-xs text-[#10B981] font-medium">
                      <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#10B981]" />
                      Online
                    </span>
                  ) : (
                    <span className="text-xs text-[#8D8D8D]">{m.lastActive}</span>
                  )}
                </td>
                <td className="px-5 py-3.5 text-[#8D8D8D]">{m.access}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* High Signal Contributors */}
      <div className="w-full max-w-[360px] rounded-2xl border border-[#EDEDED] bg-white p-4">
        <h3 className="mb-3 text-sm font-bold text-[#080707]">High Signal Contributors</h3>
        <div className="space-y-3">
          {CONTRIBUTORS.map((c, i) => (
            <div key={i} className="flex items-center gap-3">
              <div
                className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full text-[11px] font-bold"
                style={{ background: c.bg, color: c.color }}
              >
                {initials(c.name)}
              </div>
              <div className="flex-1 min-w-0">
                <p className="truncate text-xs font-semibold text-[#080707]">{c.name}</p>
                <p className="text-[11px] text-[#8D8D8D]">{c.badge}</p>
              </div>
              <span className="text-xs font-bold text-[#080707]">{c.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
