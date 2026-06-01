import { useState } from "react";
import {
  AnalyticsEmptyCard,
  AnalyticsFailureBanner,
  AnalyticsFailureCard,
  AnalyticsFailureTable,
  AnalyticsMetricGrid,
} from "./AnalyticsFallbackStates";

/* ── Icons ──────────────────────────────────────────────────────── */
function TrendUpIcon({ size = 11 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 12 12" fill="none">
      <path d="M1 9l3-3.5 2.5 2L10 3" stroke="#10B981" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function TrendDownIcon({ size = 11 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 12 12" fill="none">
      <path d="M1 3l3 3.5 2.5-2L10 9" stroke="#EF4444" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function IconStreams() {
  return (
    <svg width="17" height="17" viewBox="0 0 20 20" fill="none">
      <rect x="2" y="4" width="16" height="3" rx="1.5" stroke="#0066FF" strokeWidth="1.5" />
      <rect x="2" y="9" width="12" height="3" rx="1.5" stroke="#0066FF" strokeWidth="1.5" />
      <rect x="2" y="14" width="9" height="3" rx="1.5" stroke="#0066FF" strokeWidth="1.5" />
    </svg>
  );
}
function IconStar() {
  return (
    <svg width="17" height="17" viewBox="0 0 20 20" fill="none">
      <path d="M10 2l2.2 4.6L17 7.6l-3.5 3.4.8 4.9L10 13.5l-4.3 2.4.8-4.9L3 7.6l4.8-.9L10 2Z" stroke="#F59E0B" strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  );
}
function IconPost() {
  return (
    <svg width="17" height="17" viewBox="0 0 20 20" fill="none">
      <rect x="3" y="3" width="14" height="14" rx="2.5" stroke="#10B981" strokeWidth="1.5" />
      <path d="M6 7h8M6 10h6M6 13h4" stroke="#10B981" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}
function IconEngagement() {
  return (
    <svg width="17" height="17" viewBox="0 0 20 20" fill="none">
      <path d="M12 2L4 11h6l-2 7 8-9h-6l2-7Z" stroke="#0066FF" strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  );
}
function IconKeyword() {
  return (
    <svg width="17" height="17" viewBox="0 0 20 20" fill="none">
      <circle cx="10" cy="10" r="7" stroke="#6366F1" strokeWidth="1.5" />
      <path d="M7 10h6M10 7v6" stroke="#6366F1" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}
function IconRate() {
  return (
    <svg width="17" height="17" viewBox="0 0 20 20" fill="none">
      <circle cx="10" cy="10" r="7" stroke="#10B981" strokeWidth="1.5" />
      <path d="M7 13l1.5-3.5L11 11l1.5-4" stroke="#10B981" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function IconImpressions() {
  return (
    <svg width="17" height="17" viewBox="0 0 20 20" fill="none">
      <ellipse cx="10" cy="10" rx="8" ry="5" stroke="#0066FF" strokeWidth="1.5" />
      <circle cx="10" cy="10" r="2.5" stroke="#0066FF" strokeWidth="1.5" />
    </svg>
  );
}
function IconProfile() {
  return (
    <svg width="17" height="17" viewBox="0 0 20 20" fill="none">
      <circle cx="10" cy="8" r="3" stroke="#F59E0B" strokeWidth="1.5" />
      <path d="M4 18c0-3.3 2.7-6 6-6s6 2.7 6 6" stroke="#F59E0B" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}
function IconIT() {
  return (
    <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
      <rect x="2" y="3" width="12" height="8" rx="1.5" stroke="#F59E0B" strokeWidth="1.3" />
      <path d="M5 14h6M8 11v3" stroke="#F59E0B" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  );
}
function IconMarketing() {
  return (
    <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
      <path d="M2 12V6l4-3 4 3v6" stroke="#0066FF" strokeWidth="1.3" strokeLinejoin="round" />
      <rect x="5.5" y="9" width="3" height="3" rx="0.5" stroke="#0066FF" strokeWidth="1.3" />
    </svg>
  );
}
function IconFinance() {
  return (
    <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
      <circle cx="8" cy="8" r="5.5" stroke="#6366F1" strokeWidth="1.3" />
      <path d="M8 5v1.2M8 9.8V11" stroke="#6366F1" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}
function DownloadIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
      <path d="M7 1v8M4 6l3 3 3-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M1 11h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}
function ChevronDown() {
  return (
    <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
      <path d="M2 3.5l3 3 3-3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}
function ChevronLeft() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path d="M8.5 3.5L5 7l3.5 3.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function ChevronRight() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path d="M5.5 3.5L9 7l-3.5 3.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function FlashSmallIcon() {
  return (
    <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
      <path d="M7 1.5L2 7h4L4.5 11 10 5H6Z" fill="#fff" />
    </svg>
  );
}

/* ── Data ───────────────────────────────────────────────────────── */
const TOP_METRICS = [
  { label: "Total Streams",       value: "5",          change: "+12.5%", up: true,  Icon: IconStreams,    iconBg: "#EEF3FF", featured: false },
  { label: "Most Engaged Stream", value: "Tech Recruiting", change: "+12.5%", up: true, Icon: IconStar, iconBg: "#FFF8EC", featured: true },
  { label: "Total Posts",         value: "80",         change: "+12.5%", up: true,  Icon: IconPost,       iconBg: "#E6FAF3", featured: false },
  { label: "Total Engagement",    value: "100k",       change: "-0.57%", up: false, Icon: IconEngagement, iconBg: "#EEF3FF", featured: false },
  { label: "Keyword Tracked",     value: "58",         change: "+12.5%", up: true,  Icon: IconKeyword,    iconBg: "#F0F0FF", featured: false },
];

const SUB_METRICS = [
  { label: "Avg. Engagement Rate", value: "4.2%",  change: "+12.5%", up: true, Icon: IconRate,        iconBg: "#E6FAF3" },
  { label: "Total Impressions",    value: "1.3M",   change: "+12.5%", up: true, Icon: IconImpressions, iconBg: "#EEF3FF" },
  { label: "Profile Monitored",    value: "270",    change: "+12.5%", up: true, Icon: IconProfile,     iconBg: "#FFF8EC" },
];

const INDUSTRY = [
  { Icon: IconIT,        name: "IT Services", bg: "#FFF8EC", followers: "9,400 followers", pct: "48%" },
  { Icon: IconMarketing, name: "Marketing",   bg: "#EEF3FF", followers: "6,400 followers", pct: "25%" },
  { Icon: IconFinance,   name: "Finance",     bg: "#F0F0FF", followers: "9,400 followers", pct: "12%" },
];

const STREAM_POSTS = [
  { title: "Just wrapped up an amazing campaign with our top clients—results are phenomenal!",         stream: "Tech Recruiting",    time: "2 hours ago",  impressions: "4,820", engagements: 320, saves: 75, linkCopies: 22, shares: 18, up: true },
  { title: "Our new SaaS Scalability guide just dropped. 10x your pipeline before competitors do.",    stream: "Content Monitoring", time: "4 hours ago",  impressions: "3,970", engagements: 290, saves: 68, linkCopies: 19, shares: 14, up: false },
  { title: "Hot take: most B2B LinkedIn strategies are completely backwards. Here's what works.",       stream: "Tech Recruiting",    time: "6 hours ago",  impressions: "6,100", engagements: 410, saves: 92, linkCopies: 31, shares: 24, up: true },
  { title: "We grew our newsletter to 50k subscribers with zero paid ads. Playbook right here.",        stream: "Growth Hacking",     time: "8 hours ago",  impressions: "5,440", engagements: 375, saves: 84, linkCopies: 27, shares: 21, up: true },
  { title: "DM this to every SDR you know: cold outreach framework that converted 38% of leads.",      stream: "Sales Outreach",     time: "10 hours ago", impressions: "4,210", engagements: 305, saves: 71, linkCopies: 18, shares: 16, up: false },
  { title: "We just shipped v2 of our AI scheduling tool. First 100 signups get lifetime pricing.",    stream: "Product Updates",    time: "12 hours ago", impressions: "7,830", engagements: 520, saves: 103, linkCopies: 44, shares: 33, up: true },
  { title: "3 frameworks for enterprise sales that closed $2M last quarter—thread below.",             stream: "Sales Outreach",     time: "14 hours ago", impressions: "5,200", engagements: 360, saves: 81, linkCopies: 25, shares: 19, up: true },
  { title: "Reminder: relationship-driven outreach will always beat spray-and-pray cold email.",       stream: "Content Monitoring", time: "18 hours ago", impressions: "3,560", engagements: 260, saves: 59, linkCopies: 16, shares: 12, up: false },
  { title: "Every CTO we spoke to last month uses this one tool to evaluate engineering candidates.",  stream: "Tech Recruiting",    time: "20 hours ago", impressions: "4,900", engagements: 338, saves: 76, linkCopies: 22, shares: 17, up: true },
  { title: "LinkedIn algorithm update: native documents get 3x more reach now. Proof inside.",         stream: "Growth Hacking",     time: "1 day ago",    impressions: "8,440", engagements: 570, saves: 118, linkCopies: 52, shares: 40, up: true },
  { title: "We onboarded 12 enterprise clients in Q1 using this exact LinkedIn content framework.",    stream: "Sales Outreach",     time: "1 day ago",    impressions: "6,650", engagements: 430, saves: 97, linkCopies: 36, shares: 27, up: true },
  { title: "Stop guessing. Here's the data: the best time to post on LinkedIn is 9 AM on Tuesday.",   stream: "Content Monitoring", time: "2 days ago",   impressions: "5,120", engagements: 345, saves: 79, linkCopies: 23, shares: 18, up: false },
];
const POSTS_PER_PAGE = 10;

const LIVE_FEED = [
  { type: "prospect", text: 'Sarah Conner (CTO @ Skynet) just interacted with your "SaaS Scalability" post' },
  { type: "save",     text: 'Director of Engineering @ Microsoft saved your post on "SaaS Scalability"' },
];

/* ── Component ──────────────────────────────────────────────────── */
export default function AnalyticsStreams({ dataState = "live", onRetry }) {
  const [signalTab,  setSignalTab]  = useState("recent");
  const [signalPage, setSignalPage] = useState(1);
  const [activeStream, setActiveStream] = useState("All Streams");

  const streams = ["All Streams", "Tech Recruiting", "Content Monitoring", "Growth Hacking", "Sales Outreach", "Product Updates"];

  const filtered    = activeStream === "All Streams" ? STREAM_POSTS : STREAM_POSTS.filter(p => p.stream === activeStream);
  const totalPages  = Math.max(1, Math.ceil(filtered.length / POSTS_PER_PAGE));
  const visibleRows = filtered.slice((signalPage - 1) * POSTS_PER_PAGE, signalPage * POSTS_PER_PAGE);

  if (dataState === "empty") {
    return (
      <div className="flex flex-1 flex-col gap-4 overflow-auto p-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="flex h-2 w-2 rounded-full bg-[#10B981] ring-4 ring-[#10B981]/20 animate-pulse" />
            <span className="text-[13px] font-semibold text-[#080707]">Real-Time Update</span>
            <div className="relative ml-2">
              <select
                value={activeStream}
                onChange={e => { setActiveStream(e.target.value); setSignalPage(1); }}
                className="appearance-none rounded-xl border border-[#EDEDED] bg-white py-1.5 pl-3 pr-7 text-xs font-semibold text-[#080707] shadow-sm focus:outline-none cursor-pointer"
              >
                {streams.map(s => <option key={s}>{s}</option>)}
              </select>
              <span className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-[#8D8D8D]">
                <ChevronDown />
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button type="button" className="flex items-center gap-1.5 rounded-xl border border-[#EDEDED] bg-white px-3 py-1.5 text-xs font-medium text-[#4B4B4B] shadow-sm">
              <svg width="12" height="12" viewBox="0 0 14 14" fill="none"><rect x="1" y="2" width="12" height="10" rx="2" stroke="#8D8D8D" strokeWidth="1.3"/><path d="M1 5h12" stroke="#8D8D8D" strokeWidth="1.3"/><path d="M4 1v2M10 1v2" stroke="#8D8D8D" strokeWidth="1.3" strokeLinecap="round"/></svg>
              Last 30 days <ChevronDown />
            </button>
            <button type="button" className="flex items-center gap-1.5 rounded-xl bg-[#0066FF] px-3.5 py-1.5 text-xs font-semibold text-white shadow-md shadow-blue-200">
              <DownloadIcon /> Export Report
            </button>
          </div>
        </div>

        <AnalyticsMetricGrid items={TOP_METRICS} columnsClass="sm:grid-cols-5" />

        <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
          <AnalyticsMetricGrid items={SUB_METRICS} columnsClass="grid-cols-3" />
          <AnalyticsEmptyCard title="Live Monitoring" minHeight="min-h-[200px]" accent="primary" />
        </div>

        <div className="grid gap-3" style={{ gridTemplateColumns: "1fr 272px" }}>
          <AnalyticsEmptyCard
            title="High Signal Post Performance"
            subtitle="Signal-rich stream content will appear here."
            minHeight="min-h-[360px]"
          />
          <AnalyticsEmptyCard title="Audience Industry" minHeight="min-h-[360px]" />
        </div>
      </div>
    );
  }

  if (dataState === "error") {
    return (
      <div className="flex flex-1 flex-col gap-4 overflow-auto p-5">
        <AnalyticsFailureBanner
          title="Stream analytics couldn’t load"
          description="We couldn’t fetch stream-level performance right now. Try reconnecting to the analytics API and then reload the reports."
          onRetry={onRetry}
        />

        <AnalyticsMetricGrid items={TOP_METRICS} columnsClass="sm:grid-cols-5" />

        <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
          <AnalyticsMetricGrid items={SUB_METRICS} columnsClass="grid-cols-3" />
          <AnalyticsFailureCard title="Live Monitoring" minHeight="min-h-[200px]" />
        </div>

        <div className="grid gap-3" style={{ gridTemplateColumns: "1fr 272px" }}>
          <AnalyticsFailureTable
            title="High Signal Post Performance"
            subtitle="Top stream content"
            columns={["Post Content", "Impressions", "Engagements", "Saves", "Link Copies", "Shares"]}
            minHeight="min-h-[240px]"
          />
          <AnalyticsFailureCard title="Audience Industry" minHeight="min-h-[360px]" />
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-1 flex-col gap-4 overflow-auto p-5">

      {/* ── Sub-header ── */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <span className="flex h-2 w-2 rounded-full bg-[#10B981] ring-4 ring-[#10B981]/20 animate-pulse" />
          <span className="text-[13px] font-semibold text-[#080707]">Real-Time Update</span>

          {/* All Streams filter */}
          <div className="relative ml-2">
            <select
              value={activeStream}
              onChange={e => { setActiveStream(e.target.value); setSignalPage(1); }}
              className="appearance-none rounded-xl border border-[#EDEDED] bg-white py-1.5 pl-3 pr-7 text-xs font-semibold text-[#080707] shadow-sm focus:outline-none cursor-pointer"
            >
              {streams.map(s => <option key={s}>{s}</option>)}
            </select>
            <span className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-[#8D8D8D]">
              <ChevronDown />
            </span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button type="button" className="flex items-center gap-1.5 rounded-xl border border-[#EDEDED] bg-white px-3 py-1.5 text-xs font-medium text-[#4B4B4B] shadow-sm hover:border-[#0066FF]/30 transition">
            <svg width="12" height="12" viewBox="0 0 14 14" fill="none"><rect x="1" y="2" width="12" height="10" rx="2" stroke="#8D8D8D" strokeWidth="1.3"/><path d="M1 5h12" stroke="#8D8D8D" strokeWidth="1.3"/><path d="M4 1v2M10 1v2" stroke="#8D8D8D" strokeWidth="1.3" strokeLinecap="round"/></svg>
            Last 30 days <ChevronDown />
          </button>
          <button type="button" className="flex items-center gap-1.5 rounded-xl bg-[#0066FF] px-3.5 py-1.5 text-xs font-semibold text-white shadow-md shadow-blue-200 hover:bg-[#005ae0] transition">
            <DownloadIcon /> Export Report
          </button>
        </div>
      </div>

      {/* ── Top 5 metric cards ── */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-5">
        {TOP_METRICS.map((m) => (
          <div key={m.label} className={`relative overflow-hidden rounded-2xl border p-4 shadow-sm transition hover:shadow-md ${
            m.featured ? "border-[#0066FF]/30 bg-[#EEF5FF] ring-1 ring-[#0066FF]/20" : "border-[#EDEDED] bg-white"
          }`}>
            <div className="flex items-start justify-between">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl shadow-sm" style={{ background: m.iconBg }}>
                <m.Icon />
              </div>
              <span className={`flex items-center gap-0.5 rounded-full px-2 py-0.5 text-[10px] font-bold ${
                m.up ? "bg-[#E6FAF3] text-[#10B981]" : "bg-[#FEE8E8] text-[#EF4444]"
              }`}>
                {m.up ? <TrendUpIcon /> : <TrendDownIcon />} {m.change}
              </span>
            </div>
            <p className={`mt-3 text-xl font-extrabold tracking-tight ${m.featured ? "text-[#0055CC]" : "text-[#080707]"}`}>{m.value}</p>
            <p className="mt-0.5 text-[11px] font-medium text-[#8D8D8D]">{m.label}</p>
          </div>
        ))}
      </div>

      {/* ── Second row: 3 sub-metrics + Live Monitoring ── */}
      <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">

        {/* 3 sub-metric cards */}
        <div className="grid grid-cols-3 gap-3">
          {SUB_METRICS.map((m) => (
            <div key={m.label} className="rounded-2xl border border-[#EDEDED] bg-white p-4 shadow-sm transition hover:shadow-md">
              <div className="flex items-start justify-between">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl shadow-sm" style={{ background: m.iconBg }}>
                  <m.Icon />
                </div>
                <span className="flex items-center gap-0.5 rounded-full bg-[#E6FAF3] px-2 py-0.5 text-[10px] font-bold text-[#10B981]">
                  <TrendUpIcon /> {m.change}
                </span>
              </div>
              <p className="mt-3 text-2xl font-extrabold tracking-tight text-[#080707]">{m.value}</p>
              <p className="mt-0.5 text-[10px] font-medium text-[#8D8D8D]">{m.label}</p>
            </div>
          ))}
        </div>

        {/* Live Monitoring */}
        <div className="rounded-2xl bg-gradient-to-br from-[#0055DD] to-[#0040BB] p-4 shadow-lg shadow-blue-300/30">
          <div className="mb-2.5 flex items-center justify-between">
            <h3 className="text-sm font-bold text-white">Live Monitoring</h3>
            <span className="flex h-2.5 w-2.5 rounded-full bg-[#10B981] ring-4 ring-[#10B981]/30 animate-pulse" />
          </div>
          <ul className="space-y-2">
            {LIVE_FEED.map((item, i) => (
              <li key={i} className="flex items-start gap-3 rounded-xl bg-white/10 px-3.5 py-2.5 backdrop-blur-sm">
                <div className={`mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full ${
                  item.type === "prospect" ? "bg-[#F59E0B]" : "bg-[#10B981]"
                }`}>
                  <FlashSmallIcon />
                </div>
                <p className="text-[11px] leading-[1.6] text-white/90">
                  {item.type === "prospect"
                    ? <><span className="font-bold text-white">New Prospect Detected : </span>{item.text}</>
                    : <><span className="font-bold text-white">High Signal Save : </span>{item.text}</>
                  }
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* ── Main row: Posts table + Audience Industry ── */}
      <div className="grid gap-3" style={{ gridTemplateColumns: "1fr 240px" }}>

        {/* High Signal Post Performance */}
        <div className="overflow-hidden rounded-2xl border border-[#EDEDED] bg-white shadow-sm">
          <div className="flex items-center justify-between border-b border-[#EDEDED] px-5 py-3.5">
            <div>
              <h3 className="text-sm font-bold text-[#080707]">High Signal Post Performance</h3>
              <p className="text-[11px] text-[#8D8D8D]">See what&apos;s resonating</p>
            </div>
            <div className="flex overflow-hidden rounded-xl border border-[#EDEDED] bg-[#F8F9FA] text-xs font-semibold">
              {[["recent","Most Recent"],["engagement","Top Engagement"]].map(([val, lbl]) => (
                <button key={val} type="button" onClick={() => { setSignalTab(val); setSignalPage(1); }}
                  className={`px-3.5 py-1.5 transition ${signalTab === val ? "bg-[#0066FF] text-white shadow-sm" : "text-[#8D8D8D] hover:text-[#080707]"}`}>
                  {lbl}
                </button>
              ))}
            </div>
          </div>
          <table className="w-full min-w-[520px]">
            <thead>
              <tr className="border-b border-[#EDEDED] bg-[#F8F9FA] text-left text-[11px] text-[#8D8D8D]">
                <th className="px-5 py-2.5 font-semibold">Post Content</th>
                <th className="px-4 py-2.5 font-semibold">Impressions</th>
                <th className="px-4 py-2.5 font-semibold">Engagements</th>
                <th className="px-4 py-2.5 font-semibold">Post Saves</th>
                <th className="px-4 py-2.5 font-semibold">Link Copies</th>
                <th className="px-4 py-2.5 font-semibold">Shares</th>
              </tr>
            </thead>
            <tbody>
              {visibleRows.map((p, i) => (
                <tr key={i} className="border-b border-[#EDEDED] last:border-0 hover:bg-[#F8F9FA] transition-colors">
                  <td className="px-5 py-3 max-w-[220px]">
                    <p className="line-clamp-1 text-[11px] font-semibold text-[#080707]">{p.title}</p>
                    <div className="mt-0.5 flex items-center gap-2">
                      <span className="rounded-full bg-[#EEF3FF] px-2 py-0.5 text-[9px] font-bold text-[#0066FF]">{p.stream}</span>
                      <span className="text-[10px] text-[#ABABAB]">{p.time}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-[11px] font-semibold text-[#080707]">{p.impressions}</td>
                  <td className="px-4 py-3">
                    <span className={`flex items-center gap-0.5 text-[11px] font-bold ${p.up ? "text-[#10B981]" : "text-[#EF4444]"}`}>
                      {p.up ? <TrendUpIcon /> : <TrendDownIcon />} {p.engagements}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-[11px] text-[#4B4B4B]">{p.saves}</td>
                  <td className="px-4 py-3 text-[11px] text-[#4B4B4B]">{p.linkCopies}</td>
                  <td className="px-4 py-3 text-[11px] text-[#4B4B4B]">{p.shares}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {/* Pagination */}
          <div className="flex items-center justify-between border-t border-[#EDEDED] px-5 py-2.5">
            <span className="text-[11px] text-[#8D8D8D]">{filtered.length} posts total</span>
            <div className="flex items-center gap-1">
              <button type="button" onClick={() => setSignalPage(p => Math.max(1, p - 1))}
                className="flex h-7 w-7 items-center justify-center rounded-lg border border-[#EDEDED] bg-white text-[#4B4B4B] hover:bg-[#F8F9FA] disabled:opacity-40 transition"
                disabled={signalPage === 1}>
                <ChevronLeft />
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((pg) => (
                <button key={pg} type="button" onClick={() => setSignalPage(pg)}
                  className={`flex h-7 w-7 items-center justify-center rounded-lg text-xs font-semibold transition ${
                    pg === signalPage ? "bg-[#0066FF] text-white shadow-sm" : "border border-[#EDEDED] bg-white text-[#4B4B4B] hover:bg-[#F8F9FA]"
                  }`}>
                  {pg}
                </button>
              ))}
              <button type="button" onClick={() => setSignalPage(p => Math.min(totalPages, p + 1))}
                className="flex h-7 w-7 items-center justify-center rounded-lg border border-[#EDEDED] bg-white text-[#4B4B4B] hover:bg-[#F8F9FA] disabled:opacity-40 transition"
                disabled={signalPage === totalPages}>
                <ChevronRight />
              </button>
            </div>
          </div>
        </div>

        {/* Audience Industry sidebar */}
        <div className="rounded-2xl border border-[#EDEDED] bg-white p-4 shadow-sm">
          <h4 className="mb-3 text-[13px] font-bold text-[#080707]">Audience Industry</h4>
          <ul className="space-y-3">
            {INDUSTRY.map((ind) => (
              <li key={ind.name} className="flex items-center gap-3">
                <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl" style={{ background: ind.bg }}>
                  <ind.Icon />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="text-[12px] font-semibold text-[#080707]">{ind.name}</span>
                    <span className="text-[12px] font-bold text-[#080707]">{ind.pct}</span>
                  </div>
                  <p className="text-[10px] text-[#8D8D8D]">{ind.followers}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

    </div>
  );
}
