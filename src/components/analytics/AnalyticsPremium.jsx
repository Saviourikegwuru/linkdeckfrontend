import { useState } from "react";
import { DualLineChart, HeatmapChart } from "./Charts";
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
function IconEye() {
  return (
    <svg width="17" height="17" viewBox="0 0 20 20" fill="none">
      <ellipse cx="10" cy="10" rx="8" ry="5" stroke="#0066FF" strokeWidth="1.6" />
      <circle cx="10" cy="10" r="2.5" stroke="#0066FF" strokeWidth="1.6" />
    </svg>
  );
}
function IconLightning() {
  return (
    <svg width="17" height="17" viewBox="0 0 20 20" fill="none">
      <path d="M12 2L4 11h6l-2 7 8-9h-6l2-7Z" stroke="#F59E0B" strokeWidth="1.6" strokeLinejoin="round" />
    </svg>
  );
}
function IconPeople() {
  return (
    <svg width="17" height="17" viewBox="0 0 20 20" fill="none">
      <circle cx="8" cy="7" r="3" stroke="#0066FF" strokeWidth="1.5" />
      <path d="M2 17c0-3.3 2.7-6 6-6" stroke="#0066FF" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="14" cy="6" r="2" stroke="#0066FF" strokeWidth="1.5" />
      <path d="M12 17c0-2.8 1.8-5.1 4-5.8" stroke="#0066FF" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}
function IconVisit() {
  return (
    <svg width="17" height="17" viewBox="0 0 20 20" fill="none">
      <circle cx="10" cy="8" r="3" stroke="#10B981" strokeWidth="1.5" />
      <path d="M4 18c0-3.3 2.7-6 6-6s6 2.7 6 6" stroke="#10B981" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}
function IconPost() {
  return (
    <svg width="17" height="17" viewBox="0 0 20 20" fill="none">
      <rect x="3" y="3" width="14" height="14" rx="2.5" stroke="#F59E0B" strokeWidth="1.5" />
      <path d="M6 7h8M6 10h6M6 13h4" stroke="#F59E0B" strokeWidth="1.4" strokeLinecap="round" />
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
      <path d="M8 5v1.2M8 9.8V11M6.5 7.5c0-.8.7-1.5 1.5-1.5s1.5.7 1.5 1.5S9.3 10 8 10" stroke="#6366F1" strokeWidth="1.2" strokeLinecap="round" />
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
function DotsIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <circle cx="3" cy="8" r="1.3" fill="#8D8D8D" />
      <circle cx="8" cy="8" r="1.3" fill="#8D8D8D" />
      <circle cx="13" cy="8" r="1.3" fill="#8D8D8D" />
    </svg>
  );
}
function LocationIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
      <path d="M7 1a4.5 4.5 0 0 1 4.5 4.5C11.5 9 7 13 7 13S2.5 9 2.5 5.5A4.5 4.5 0 0 1 7 1Z" stroke="#8D8D8D" strokeWidth="1.3" />
      <circle cx="7" cy="5.5" r="1.5" stroke="#8D8D8D" strokeWidth="1.2" />
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
function ChevronDown() {
  return (
    <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
      <path d="M2 3.5l3 3 3-3" stroke="#8D8D8D" strokeWidth="1.4" strokeLinecap="round" />
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

/* ── Data ───────────────────────────────────────────────────────── */
const METRICS = [
  { label: "Total Impression",  value: "1.2M",   change: "+12.5%", up: true,  Icon: IconEye,       iconBg: "#EEF3FF", ring: "#0066FF" },
  { label: "Total Engagement",  value: "48.8k",  change: "-0.57%", up: false, Icon: IconLightning, iconBg: "#FFF8EC", ring: "#F59E0B" },
  { label: "Net Followers",     value: "10,000", change: "+12.5%", up: true,  Icon: IconPeople,    iconBg: "#EEF3FF", ring: "#0066FF" },
  { label: "Profile Visit",     value: "980",    change: "+12.5%", up: true,  Icon: IconVisit,     iconBg: "#E6FAF3", ring: "#10B981" },
  { label: "Total post",        value: "1,200",  change: "+12.5%", up: true,  Icon: IconPost,      iconBg: "#FFF8EC", ring: "#F59E0B" },
];

const IMPRESSION_DATA  = [185,200,230,215,195,180,170,190,235,220,205,215,200,205,160,180,195,210,200,215,225,180,200,215,210,195,200,185];
const ENGAGEMENT_DATA  = [135,150,140,130,120,110,100,115,135,120,105,100,115,120,65,85,100,115,105,110,120,100,115,120,115,100,115,100];
const TOOLTIP_LABELS   = ["Dec 27","Dec 28","Dec 29","Dec 30","Dec 31","Jan 1","Jan 2","Jan 3","Jan 4","Jan 5","Jan 6","Jan 7","Jan 8","Jan 9","Jan 10","Jan 11","Jan 12","Jan 13","Jan 14","Jan 15","Jan 16","Jan 17","Jan 18","Jan 19","Jan 20","Jan 21","Jan 22","Jan 23"];

/* Heatmap – rows = time-of-day, cols = days-of-week (transposed from data[day][time]) */
const HEATMAP_ROWS = ["12 AM","3 AM","6 AM","9 AM","12 PM","3 PM","6 PM","9 PM","11 PM"];
const HEATMAP_COLS = ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"];
/* data[time][day] — transposed */
const HEATMAP_DATA = [
  [0, 0, 0, 0, 0, 0, 0],
  [0, 1, 2, 3, 1, 0, 0],
  [1, 3, 4, 6, 2, 1, 1],
  [2, 5, 7, 8, 3, 2, 1],
  [2, 4, 9, 7, 4, 2, 1],
  [1, 2, 8, 5, 3, 1, 1],
  [0, 0, 5, 3, 2, 0, 0],
  [0, 0, 2, 1, 1, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
];

const JOB_TITLES = [
  { name: "Software Engineer",  pct: 58, color: "#0066FF" },
  { name: "Product Designer",   pct: 46, color: "#0066FF" },
  { name: "Marketing Manager",  pct: 32, color: "#0066FF" },
];

const INDUSTRY = [
  { Icon: IconIT,        name: "IT Services", bg: "#FFF8EC", followers: "9,400 followers", pct: "48%" },
  { Icon: IconMarketing, name: "Marketing",   bg: "#EEF3FF", followers: "6,400 followers", pct: "25%" },
  { Icon: IconFinance,   name: "Finance",     bg: "#F0F0FF", followers: "9,400 followers", pct: "12%" },
];

const HIGH_SIGNAL_POSTS = [
  { title: "Just wrapped up an amazing campaign with our top clients—the results are phenomenal!", time: "2 hours ago", impressions: "4,820", engagements: 320, saves: 75, linkCopies: 22, shares: 18, up: true },
  { title: "Our new SaaS Scalability guide just dropped. 10x your pipeline—read it before your competition does.", time: "4 hours ago", impressions: "3,970", engagements: 290, saves: 68, linkCopies: 19, shares: 14, up: false },
  { title: "Hot take: most B2B LinkedIn strategies are completely backwards. Here's what actually works.", time: "6 hours ago", impressions: "6,100", engagements: 410, saves: 92, linkCopies: 31, shares: 24, up: true },
  { title: "We grew our newsletter to 50k subscribers with zero paid ads. The playbook is right here.", time: "8 hours ago", impressions: "5,440", engagements: 375, saves: 84, linkCopies: 27, shares: 21, up: true },
  { title: "DM this to every SDR you know: the cold outreach framework that converted 38% of leads last Q.", time: "10 hours ago", impressions: "4,210", engagements: 305, saves: 71, linkCopies: 18, shares: 16, up: false },
  { title: "We just shipped v2 of our AI scheduling tool. First 100 signups get lifetime pricing.", time: "12 hours ago", impressions: "7,830", engagements: 520, saves: 103, linkCopies: 44, shares: 33, up: true },
  { title: "3 frameworks for enterprise sales that closed $2M last quarter—thread breakdown below.", time: "14 hours ago", impressions: "5,200", engagements: 360, saves: 81, linkCopies: 25, shares: 19, up: true },
  { title: "Reminder: relationship-driven outreach will always beat spray-and-pray cold email.", time: "18 hours ago", impressions: "3,560", engagements: 260, saves: 59, linkCopies: 16, shares: 12, up: false },
  { title: "Every CTO we spoke to last month uses this one tool to evaluate engineering candidates.", time: "20 hours ago", impressions: "4,900", engagements: 338, saves: 76, linkCopies: 22, shares: 17, up: true },
  { title: "LinkedIn algorithm update: posts with native documents now get 3× more reach. Here's proof.", time: "1 day ago",   impressions: "8,440", engagements: 570, saves: 118, linkCopies: 52, shares: 40, up: true },
];

const POSTS_PER_PAGE = 6;

const MULTI_ACCOUNT = [
  { initials: "GM", avatarBg: "#DBEAFE", avatarText: "#1D4ED8", name: "Global Marketing Hub", posts: 45, impression: "842,000", engagements: "25,400", growth: "+12.5%", up: true,  assignee: "Gloria Meggie",     status: "Active" },
  { initials: "HR", avatarBg: "#D1FAE5", avatarText: "#065F46", name: "HR Talent Solution",   posts: 64, impression: "85,200",  engagements: "3,100",  growth: "+12.5%", up: true,  assignee: "Chuks Igwe",        status: "Active" },
  { initials: "EA", avatarBg: "#EDE9FE", avatarText: "#5B21B6", name: "EMEA Outreach",        posts: 12, impression: "16,000",  engagements: "500",    growth: "-0.8%",  up: false, assignee: "Nathaniel Williams", status: "Active" },
];

const TOP_LOCATIONS = [
  { city: "New York, USA",      pct: 32 },
  { city: "London, UK",         pct: 20 },
  { city: "San Francisco, USA", pct: 18 },
  { city: "Berlin, Germany",    pct: 15 },
  { city: "Toronto, Canada",    pct: 12 },
];

const LIVE_FEED = [
  { type: "prospect", text: 'Sarah Conner (CTO @ Skynet) just interacted with your "SaaS Scalability" post' },
  { type: "save",     text: 'Director of Engineering @ Microsoft saved your post on "SaaS Scalability"' },
  { type: "prospect", text: 'Sarah Conner (CTO @ Skynet) just interacted with your "SaaS Scalability" post' },
];

/* ── Main Component ─────────────────────────────────────────────── */
export default function AnalyticsPremium({ dataState = "live", onRetry }) {
  const [signalTab, setSignalTab]   = useState("recent");
  const [signalPage, setSignalPage] = useState(1);

  const totalPages  = Math.ceil(HIGH_SIGNAL_POSTS.length / POSTS_PER_PAGE);
  const visibleRows = HIGH_SIGNAL_POSTS.slice((signalPage - 1) * POSTS_PER_PAGE, signalPage * POSTS_PER_PAGE);

  if (dataState === "empty") {
    return (
      <div className="flex flex-1 flex-col gap-4 overflow-auto p-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="flex h-2 w-2 rounded-full bg-[#10B981] ring-4 ring-[#10B981]/20 animate-pulse" />
            <span className="text-[13px] font-semibold text-[#080707]">Real Time Update</span>
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

        <AnalyticsMetricGrid items={METRICS} columnsClass="sm:grid-cols-5" />

        <div className="grid gap-3" style={{ gridTemplateColumns: "1fr 272px" }}>
          <AnalyticsEmptyCard
            title="Account Growth"
            subtitle="Followers growth and Engagement across time"
            minHeight="min-h-[430px]"
          />

          <div className="flex flex-col gap-3">
            <AnalyticsEmptyCard title="Engagement Heatmap" subtitle="Peak intensity by day and hour" minHeight="min-h-[242px]" />
            <AnalyticsEmptyCard title="Top Job Titles" minHeight="min-h-[196px]" />
            <AnalyticsEmptyCard title="Audience Industry" minHeight="min-h-[196px]" />
          </div>
        </div>

        <AnalyticsEmptyCard
          title="High Signal Post Performance"
          subtitle="See what's resonating"
          minHeight="min-h-[320px]"
        />

        <AnalyticsEmptyCard
          title="Multi-Account Performance"
          subtitle="Comparison data will appear here as connected accounts gather activity."
          minHeight="min-h-[320px]"
        />

        <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
          <AnalyticsEmptyCard title="Top Locations" minHeight="min-h-[250px]" />
          <AnalyticsEmptyCard title="Live Monitoring" minHeight="min-h-[250px]" accent="primary" />
        </div>
      </div>
    );
  }

  if (dataState === "error") {
    return (
      <div className="flex flex-1 flex-col gap-4 overflow-auto p-5">
        <AnalyticsFailureBanner
          title="Premium analytics couldn’t load"
          description="The analytics API is currently unavailable for your workspace overview. We’ve preserved the dashboard structure so you can retry without losing context."
          onRetry={onRetry}
        />

        <AnalyticsMetricGrid items={METRICS} columnsClass="sm:grid-cols-5" />

        <div className="grid gap-3" style={{ gridTemplateColumns: "1fr 272px" }}>
          <AnalyticsFailureCard
            title="Account Growth"
            subtitle="Followers growth and Engagement across time"
            minHeight="min-h-[430px]"
          />
          <div className="flex flex-col gap-3">
            <AnalyticsFailureCard title="Engagement Heatmap" subtitle="Peak intensity by day and hour" minHeight="min-h-[242px]" />
            <AnalyticsFailureCard title="Top Job Titles" minHeight="min-h-[196px]" />
            <AnalyticsFailureCard title="Audience Industry" minHeight="min-h-[196px]" />
          </div>
        </div>

        <AnalyticsFailureTable
          title="High Signal Post Performance"
          subtitle="See what's resonating"
          columns={["Post Content", "Impressions", "Engagements", "Post Saves", "Link Copies", "Shares"]}
          minHeight="min-h-[230px]"
        />

        <AnalyticsFailureTable
          title="Multi-Account Performance"
          columns={["Account Name", "Posts", "Impression", "Engagements", "Growth", "Assigned Team Mem.", "Status", "Actions"]}
          minHeight="min-h-[230px]"
        />

        <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
          <AnalyticsFailureCard title="Top Locations" minHeight="min-h-[250px]" />
          <AnalyticsFailureCard title="Live Monitoring" minHeight="min-h-[250px]" />
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
          <span className="text-[13px] font-semibold text-[#080707]">Real Time Update</span>
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

      {/* ── Metric cards ── */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-5">
        {METRICS.map((m) => (
          <div key={m.label} className="relative overflow-hidden rounded-2xl border border-[#EDEDED] bg-white p-4 shadow-sm transition hover:shadow-md">
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
            <p className="mt-3 text-2xl font-extrabold tracking-tight text-[#080707]">{m.value}</p>
            <p className="mt-0.5 text-[11px] font-medium text-[#8D8D8D]">{m.label}</p>
          </div>
        ))}
      </div>

      {/* ── Main 2-col: chart + sidebar ── */}
      <div className="grid gap-3" style={{ gridTemplateColumns: "1fr 272px" }}>

        {/* Account Growth chart */}
        <div className="rounded-2xl border border-[#EDEDED] bg-white p-5 shadow-sm">
          <div className="mb-4 flex items-start justify-between">
            <div>
              <h3 className="text-sm font-bold text-[#080707]">Account Growth</h3>
              <p className="text-[11px] text-[#8D8D8D]">Followers growth and Engagement across time</p>
            </div>
            <div className="flex items-center gap-4 text-[11px] text-[#8D8D8D]">
              <span className="flex items-center gap-1.5">
                <span className="inline-block h-[3px] w-6 rounded-full bg-[#F59E0B]" /> Impression
              </span>
              <span className="flex items-center gap-1.5">
                <span className="inline-block h-[3px] w-6 rounded-full bg-[#0066FF]" /> Engagement
              </span>
            </div>
          </div>
          <DualLineChart
            series={[
              { label: "Impression",  data: IMPRESSION_DATA, color: "#F59E0B", fillColor: "#F59E0B" },
              { label: "Engagements", data: ENGAGEMENT_DATA, color: "#0066FF", fillColor: "#0066FF" },
            ]}
            labels={TOOLTIP_LABELS}
            width={600}
            height={210}
            yMax={400}
            yTicks={[0, 100, 200, 300, 400]}
          />
          <div className="mt-1.5 flex justify-between pl-10 pr-4 text-[10px] text-[#ABABAB]">
            {["Dec 26-Jan 2","Jan 3-10","Jan 11-18","Jan 19-26"].map((l) => (
              <span key={l}>{l}</span>
            ))}
          </div>
        </div>

        {/* Right sidebar */}
        <div className="flex flex-col gap-3">

          {/* Engagement Heatmap */}
          <div className="rounded-2xl border border-[#EDEDED] bg-white p-4 shadow-sm">
            <div className="mb-3 flex items-start justify-between">
              <div>
                <h4 className="text-[13px] font-bold text-[#080707]">Engagement Heatmap</h4>
                <p className="text-[10px] text-[#8D8D8D]">Peak intensity by day and hour</p>
              </div>
              {/* Legend */}
              <div className="flex flex-col items-end gap-1">
                <div className="flex items-center gap-1 text-[10px] text-[#8D8D8D]">
                  <div className="h-2.5 w-8 rounded bg-[#DBEAFE]" />
                  <span>Low</span>
                </div>
                <div className="flex items-center gap-1 text-[10px] text-[#8D8D8D]">
                  <div className="h-2.5 w-8 rounded bg-[#0066FF]" />
                  <span>high</span>
                </div>
              </div>
            </div>
            <HeatmapChart
              data={HEATMAP_DATA}
              rowLabels={HEATMAP_ROWS}
              colLabels={HEATMAP_COLS}
              color="#0066FF"
              cellW={26}
              cellH={17}
            />
          </div>

          {/* Top Job Titles */}
          <div className="rounded-2xl border border-[#EDEDED] bg-white p-4 shadow-sm">
            <h4 className="mb-3 text-[13px] font-bold text-[#080707]">Top Job Titles</h4>
            <ul className="space-y-3.5">
              {JOB_TITLES.map((j) => (
                <li key={j.name}>
                  <div className="mb-1.5 flex items-center justify-between">
                    <span className="text-[11px] font-semibold text-[#2C2C2C]">{j.name}</span>
                    <span className="text-[11px] font-bold text-[#080707]">{j.pct}%</span>
                  </div>
                  <div className="h-1.5 w-full overflow-hidden rounded-full bg-[#EEF3FF]">
                    <div className="h-full rounded-full bg-[#0066FF] transition-all" style={{ width: `${j.pct}%` }} />
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Audience Industry */}
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

      {/* ── High Signal Post Performance ── */}
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
        <table className="w-full min-w-[640px]">
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
                <td className="px-5 py-3 max-w-[260px]">
                  <p className="line-clamp-1 text-[11px] font-semibold text-[#080707]">{p.title}</p>
                  <p className="text-[10px] text-[#ABABAB]">{p.time}</p>
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
          <button type="button" className="text-xs font-semibold text-[#0066FF] hover:underline">View all Stream Posts</button>
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

      {/* ── Multi-Account Performance ── */}
      <div className="overflow-hidden rounded-2xl border border-[#EDEDED] bg-white shadow-sm">
        <div className="flex items-center justify-between border-b border-[#EDEDED] px-5 py-3.5">
          <div>
            <h3 className="text-sm font-bold text-[#080707]">Multi-Account Performance</h3>
          </div>
          <button type="button" className="text-xs font-semibold text-[#0066FF] hover:underline">View all Performance →</button>
        </div>
        <table className="w-full min-w-[680px]">
          <thead>
            <tr className="border-b border-[#EDEDED] bg-[#F8F9FA] text-left text-[11px] text-[#8D8D8D]">
              <th className="px-5 py-2.5 font-semibold">Account Name</th>
              <th className="px-4 py-2.5 font-semibold">Posts</th>
              <th className="px-4 py-2.5 font-semibold">Impression</th>
              <th className="px-4 py-2.5 font-semibold">Engagements</th>
              <th className="px-4 py-2.5 font-semibold">Growth</th>
              <th className="px-4 py-2.5 font-semibold">Assigned Team Mem.</th>
              <th className="px-4 py-2.5 font-semibold">Status</th>
              <th className="px-4 py-2.5 font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {MULTI_ACCOUNT.map((a, i) => (
              <tr key={i} className="border-b border-[#EDEDED] last:border-0 hover:bg-[#F8F9FA] transition-colors">
                <td className="px-5 py-3">
                  <div className="flex items-center gap-2.5">
                    <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full text-[10px] font-bold" style={{ background: a.avatarBg, color: a.avatarText }}>
                      {a.initials}
                    </div>
                    <span className="text-[12px] font-semibold text-[#080707]">{a.name}</span>
                  </div>
                </td>
                <td className="px-4 py-3 text-[11px] text-[#4B4B4B]">{a.posts}</td>
                <td className="px-4 py-3 text-[11px] font-semibold text-[#080707]">{a.impression}</td>
                <td className="px-4 py-3 text-[11px] text-[#4B4B4B]">{a.engagements}</td>
                <td className="px-4 py-3">
                  <span className={`flex items-center gap-0.5 text-[11px] font-bold ${a.up ? "text-[#10B981]" : "text-[#EF4444]"}`}>
                    {a.up ? <TrendUpIcon /> : <TrendDownIcon />} {a.growth}
                  </span>
                </td>
                <td className="px-4 py-3 text-[11px] text-[#4B4B4B]">{a.assignee}</td>
                <td className="px-4 py-3">
                  <span className="rounded-full bg-[#E6FAF3] px-2.5 py-0.5 text-[10px] font-bold text-[#10B981]">{a.status}</span>
                </td>
                <td className="px-4 py-3">
                  <button type="button" className="rounded-lg p-1 hover:bg-[#F0F0F0] transition">
                    <DotsIcon />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ── Bottom row: Top Locations + Live Monitoring ── */}
      <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">

        {/* Top Locations */}
        <div className="rounded-2xl border border-[#EDEDED] bg-white p-5 shadow-sm">
          <h3 className="text-sm font-bold text-[#080707]">Top Locations</h3>
          <p className="mb-4 mt-0.5 text-[11px] text-[#8D8D8D]">See where your content is generating the most engagement.</p>
          <div className="flex gap-5">
            <ul className="flex-1 space-y-3">
              {TOP_LOCATIONS.map((loc) => (
                <li key={loc.city} className="flex items-center gap-2.5">
                  <LocationIcon />
                  <span className="flex-1 text-[12px] font-semibold text-[#2C2C2C]">{loc.city}</span>
                  <span className="text-[12px] font-bold text-[#0066FF]">{loc.pct}%</span>
                </li>
              ))}
            </ul>
            {/* Globe graphic */}
            <div className="flex w-36 flex-shrink-0 flex-col items-center justify-center rounded-2xl bg-[#F0F5FF] py-4">
              <svg width="56" height="40" viewBox="0 0 56 40" fill="none" className="mb-2">
                <ellipse cx="28" cy="20" rx="25" ry="17" fill="#EEF3FF" stroke="#BFDBFE" strokeWidth="1.2" />
                <path d="M3 20h50M14 5C9 10 7 14 7 20s2 10 7 15M42 5c5 5 7 9 7 15s-2 10-7 15M28 3v34" stroke="#BFDBFE" strokeWidth="0.9" />
                <circle cx="33" cy="20" r="3.5" fill="#0066FF" />
              </svg>
              <p className="text-[10px] font-bold text-[#0066FF]">Global Reach</p>
              <p className="text-[15px] font-extrabold text-[#080707]">8,239</p>
              <p className="text-[10px] font-semibold text-[#10B981]">↑ 18.5%</p>
            </div>
          </div>
        </div>

        {/* Live Monitoring */}
        <div className="rounded-2xl bg-gradient-to-br from-[#0055DD] to-[#0040BB] p-5 shadow-lg shadow-blue-300/30">
          <div className="mb-3 flex items-center justify-between">
            <h3 className="text-sm font-bold text-white">Live Monitoring</h3>
            <span className="flex h-2.5 w-2.5 rounded-full bg-[#10B981] ring-4 ring-[#10B981]/30 animate-pulse" />
          </div>
          <ul className="space-y-2.5">
            {LIVE_FEED.map((item, i) => (
              <li key={i} className="flex items-start gap-3 rounded-xl bg-white/10 px-3.5 py-3 backdrop-blur-sm">
                <div className={`mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full ${
                  item.type === "prospect" ? "bg-[#F59E0B]" : "bg-[#10B981]"
                }`}>
                  <FlashSmallIcon />
                </div>
                <p className="text-[11px] leading-[1.6] text-white/90">
                  {item.type === "prospect" ? (
                    <><span className="font-bold text-white">New Prospect Detected : </span>{item.text}</>
                  ) : (
                    <><span className="font-bold text-white">High Signal Save : </span>{item.text}</>
                  )}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>

    </div>
  );
}
