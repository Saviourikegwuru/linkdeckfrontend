import os

PREMIUM = r"""import { useState } from "react";
import { DualLineChart, HeatmapChart } from "./Charts";

/* == Icons ======================================================= */
function TrendUpIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
      <path d="M1 9l3-3.5 2.5 2L10 3" stroke="#10B981" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function TrendDownIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
      <path d="M1 3l3 3.5 2.5-2L10 9" stroke="#EF4444" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function IconEye() {
  return (
    <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
      <ellipse cx="10" cy="10" rx="8" ry="5" stroke="#0066FF" strokeWidth="1.5" />
      <circle cx="10" cy="10" r="2.5" stroke="#0066FF" strokeWidth="1.5" />
    </svg>
  );
}
function IconLightning() {
  return (
    <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
      <path d="M12 2L4 11h6l-2 7 8-9h-6l2-7Z" stroke="#F59E0B" strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  );
}
function IconPeople() {
  return (
    <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
      <circle cx="8" cy="7" r="3" stroke="#0066FF" strokeWidth="1.4" />
      <path d="M2 17c0-3.3 2.7-6 6-6" stroke="#0066FF" strokeWidth="1.4" strokeLinecap="round" />
      <circle cx="14" cy="6" r="2" stroke="#0066FF" strokeWidth="1.4" />
      <path d="M12 17c0-2.8 1.8-5.1 4-5.8" stroke="#0066FF" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}
function IconVisit() {
  return (
    <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
      <circle cx="10" cy="8" r="3" stroke="#10B981" strokeWidth="1.4" />
      <path d="M4 18c0-3.3 2.7-6 6-6s6 2.7 6 6" stroke="#10B981" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}
function IconPost() {
  return (
    <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
      <rect x="3" y="3" width="14" height="14" rx="2.5" stroke="#F59E0B" strokeWidth="1.4" />
      <path d="M6 7h8M6 10h6M6 13h4" stroke="#F59E0B" strokeWidth="1.3" strokeLinecap="round" />
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
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path d="M7 1v8M4 6l3 3 3-3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M1 11h12" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}
function DotsIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <circle cx="3" cy="8" r="1.2" fill="#8D8D8D" />
      <circle cx="8" cy="8" r="1.2" fill="#8D8D8D" />
      <circle cx="13" cy="8" r="1.2" fill="#8D8D8D" />
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

/* == Data ======================================================== */
const METRICS = [
  { label: "Total Impression",  value: "1.2M",   change: "+12.5%", up: true,  Icon: IconEye,       iconBg: "#EEF3FF" },
  { label: "Total Engagement",  value: "48.8k",  change: "-0.57%", up: false, Icon: IconLightning, iconBg: "#FFF4E5" },
  { label: "Net Followers",     value: "10,000", change: "+12.5%", up: true,  Icon: IconPeople,    iconBg: "#EEF3FF" },
  { label: "Profile Visit",     value: "980",    change: "+12.5%", up: true,  Icon: IconVisit,     iconBg: "#E8FAF3" },
  { label: "Total post",        value: "1,200",  change: "+12.5%", up: true,  Icon: IconPost,      iconBg: "#FFF4E5" },
];

const IMPRESSION_DATA = [185,200,230,215,195,180,170,190,235,220,205,215,200,205,160,180,195,210,200,215,225,180,200,215,210,195,200,185];
const ENGAGEMENT_DATA = [135,150,140,130,120,110,100,115,135,120,105,100,115,120,65,85,100,115,105,110,120,100,115,120,115,100,115,100];
const TOOLTIP_LABELS = [
  "Dec 27","Dec 28","Dec 29","Dec 30","Dec 31","Jan 1","Jan 2",
  "Jan 3","Jan 4","Jan 5","Jan 6","Jan 7","Jan 8","Jan 9",
  "Jan 10","Jan 11","Jan 12","Jan 13","Jan 14","Jan 15","Jan 16",
  "Jan 17","Jan 18","Jan 19","Jan 20","Jan 21","Jan 22","Jan 23",
];

const JOB_TITLES = [
  { name: "Software Engineer",  pct: 58 },
  { name: "Product Designer",   pct: 46 },
  { name: "Marketing Manager",  pct: 32 },
];

const INDUSTRY = [
  { Icon: IconIT,        name: "IT Services", bg: "#FFF4E5", followers: "9,400 followers", pct: "48%" },
  { Icon: IconMarketing, name: "Marketing",   bg: "#EEF3FF", followers: "6,400 followers", pct: "25%" },
  { Icon: IconFinance,   name: "Finance",     bg: "#F0F0FF", followers: "9,400 followers", pct: "12%" },
];

const HEATMAP_DATA = [
  [0,0,1,2,2,1,0,0,0],[0,1,3,5,4,2,0,0,0],[0,2,4,7,9,8,5,2,0],[0,3,6,8,7,5,3,1,0],
  [0,1,2,3,4,3,2,1,0],[0,0,1,2,2,1,0,0,0],[0,0,1,1,1,1,0,0,0],
];
const HEATMAP_ROWS = ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"];
const HEATMAP_COLS = ["12 AM","3 AM","6 AM","9 AM","12 PM","3 PM","6 PM","9 PM","11 PM"];

const HIGH_SIGNAL_POSTS = [
  { title: "Just wrapped up an amazing campaign with our top clients...", time: "2 hours ago", impressions: "4,820", engagements: 320, saves: 75, linkCopies: 22, shares: 18, up: true },
  { title: "Just wrapped up an amazing campaign with our top clients...", time: "2 hours ago", impressions: "4,820", engagements: 320, saves: 75, linkCopies: 22, shares: 18, up: false },
];

const MULTI_ACCOUNT = [
  { name: "Global Marketing Hub", avatar: "#DBEAFE", posts: 45, impression: "842,000", engagements: "25,400", growth: "+12.5%", up: true,  assignee: "Gloria Meggie",     status: "Active" },
  { name: "HR Talent Solution",   avatar: "#D1FAE5", posts: 64, impression: "85,200",  engagements: "3,100",  growth: "+12.5%", up: true,  assignee: "Chuks Igwe",        status: "Active" },
  { name: "EMEA Outreach",        avatar: "#EDE9FE", posts: 12, impression: "16,000",  engagements: "500",    growth: "-0.8%",  up: false, assignee: "Nathaniel Williams", status: "Active" },
];

const TOP_LOCATIONS = [
  { city: "New York, USA",      pct: 32 },
  { city: "London, UK",         pct: 20 },
  { city: "San Francisco, USA", pct: 18 },
  { city: "Berlin, Germany",    pct: 15 },
  { city: "Toronto, Canada",    pct: 12 },
];

const LIVE_FEED = [
  { type: "prospect", text: "Sarah Conner (CTO @ Skynet) just interacted with your \"SaaS Scalability\" post" },
  { type: "save",     text: "Director of Engineering @ Microsoft saved your post on \"SaaS Scalability\" post" },
  { type: "prospect", text: "Sarah Conner (CTO @ Skynet) just interacted with your \"SaaS Scalability\" post" },
];

/* == Component =================================================== */
export default function AnalyticsPremium() {
  const [signalTab, setSignalTab] = useState("recent");

  return (
    <div className="flex flex-1 flex-col gap-4 overflow-auto p-5">

      {/* Sub-header: realtime + filters */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-[#10B981] animate-pulse" />
          <span className="text-xs font-medium text-[#080707]">Real Time Update</span>
        </div>
        <div className="flex items-center gap-2">
          <button type="button" className="flex items-center gap-1.5 rounded-xl border border-[#EDEDED] bg-white px-3 py-1.5 text-xs font-medium text-[#080707] hover:border-[#0066FF]/30">
            Last 30 days
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M2 3.5l3 3 3-3" stroke="#8D8D8D" strokeWidth="1.3" strokeLinecap="round" /></svg>
          </button>
          <button type="button" className="flex items-center gap-1.5 rounded-xl bg-[#0066FF] px-3 py-1.5 text-xs font-semibold text-white hover:bg-[#005ae0]">
            <DownloadIcon />Export Report
          </button>
        </div>
      </div>

      {/* Metric cards */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-5">
        {METRICS.map((m) => (
          <div key={m.label} className="rounded-2xl border border-[#EDEDED] bg-white p-4">
            <div className="flex items-start justify-between">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl" style={{ background: m.iconBg }}>
                <m.Icon />
              </div>
              <span className={`flex items-center gap-0.5 rounded-full px-2 py-0.5 text-[10px] font-semibold ${
                m.up ? "bg-[#E8FAF3] text-[#10B981]" : "bg-[#FDE8E8] text-[#EF4444]"
              }`}>
                {m.up ? <TrendUpIcon /> : <TrendDownIcon />}{m.change}
              </span>
            </div>
            <p className="mt-3 text-xl font-bold text-[#080707]">{m.value}</p>
            <p className="text-[11px] text-[#8D8D8D]">{m.label}</p>
          </div>
        ))}
      </div>

      {/* Main row: chart + right sidebar */}
      <div className="grid gap-3" style={{ gridTemplateColumns: "1fr 256px" }}>

        {/* Account Growth chart */}
        <div className="rounded-2xl border border-[#EDEDED] bg-white p-5">
          <div className="mb-3 flex items-start justify-between">
            <div>
              <h3 className="text-sm font-bold text-[#080707]">Account Growth</h3>
              <p className="text-[11px] text-[#8D8D8D]">Followers growth and Engagement across time</p>
            </div>
            <div className="flex items-center gap-4 text-[11px] text-[#8D8D8D]">
              <span className="flex items-center gap-1.5">
                <span className="inline-block h-2 w-5 rounded-sm bg-[#F59E0B]" />Impression
              </span>
              <span className="flex items-center gap-1.5">
                <span className="inline-block h-2 w-5 rounded-sm bg-[#0066FF]" />Engagement
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
            height={220}
            yMax={400}
            yTicks={[0, 100, 200, 300, 400]}
          />
          <div className="mt-1 flex justify-between px-8 text-[10px] text-[#ABABAB]">
            {["Dec 26-Jan 2","Jan 3-10","Jan 11-18","Jan 19-26"].map((l) => (
              <span key={l}>{l}</span>
            ))}
          </div>
        </div>

        {/* Right sidebar */}
        <div className="flex flex-col gap-3">
          {/* Engagement Heatmap */}
          <div className="rounded-2xl border border-[#EDEDED] bg-white p-4">
            <div className="mb-2 flex items-center justify-between">
              <h4 className="text-xs font-bold text-[#080707]">Engagement Heatmap</h4>
              <div className="flex items-center gap-1.5 text-[9px] text-[#8D8D8D]">
                <div className="h-2 w-5 rounded bg-[#E8F0FF]" />Low
                <div className="h-2 w-5 rounded bg-[#0066FF]" />High
              </div>
            </div>
            <HeatmapChart
              data={HEATMAP_DATA}
              rowLabels={HEATMAP_ROWS}
              colLabels={HEATMAP_COLS}
              color="#0066FF"
              cellW={22}
              cellH={16}
            />
          </div>

          {/* Top Job Titles */}
          <div className="rounded-2xl border border-[#EDEDED] bg-white p-4">
            <h4 className="mb-3 text-xs font-bold text-[#080707]">Top Job Titles</h4>
            <ul className="space-y-3">
              {JOB_TITLES.map((j) => (
                <li key={j.name}>
                  <div className="mb-1 flex items-center justify-between text-[11px]">
                    <span className="font-medium text-[#080707]">{j.name}</span>
                    <span className="text-[#8D8D8D]">{j.pct}%</span>
                  </div>
                  <div className="h-1.5 w-full overflow-hidden rounded-full bg-[#EDEDED]">
                    <div className="h-full rounded-full bg-[#0066FF]" style={{ width: `${j.pct}%` }} />
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Audience Industry */}
          <div className="rounded-2xl border border-[#EDEDED] bg-white p-4">
            <h4 className="mb-3 text-xs font-bold text-[#080707]">Audience Industry</h4>
            <ul className="space-y-3">
              {INDUSTRY.map((ind) => (
                <li key={ind.name} className="flex items-center gap-2.5">
                  <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg" style={{ background: ind.bg }}>
                    <ind.Icon />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="font-medium text-[#080707]">{ind.name}</span>
                      <span className="font-semibold text-[#080707]">{ind.pct}</span>
                    </div>
                    <p className="text-[9px] text-[#8D8D8D]">{ind.followers}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* High Signal Post Performance */}
      <div className="overflow-hidden rounded-2xl border border-[#EDEDED] bg-white">
        <div className="flex items-center justify-between border-b border-[#EDEDED] px-5 py-3">
          <div>
            <h3 className="text-sm font-bold text-[#080707]">High Signal Post Performance</h3>
            <p className="text-[11px] text-[#8D8D8D]">See what's resonating</p>
          </div>
          <div className="flex overflow-hidden rounded-xl border border-[#EDEDED] bg-[#F8F9FA] text-xs font-semibold">
            {[["recent","Most Recent"],["engagement","Top Engagement"]].map(([val, lbl]) => (
              <button key={val} type="button" onClick={() => setSignalTab(val)}
                className={`px-3 py-1.5 transition ${signalTab === val ? "bg-[#0066FF] text-white" : "text-[#8D8D8D] hover:bg-white"}`}>
                {lbl}
              </button>
            ))}
          </div>
        </div>
        <table className="w-full min-w-[620px]">
          <thead>
            <tr className="border-b border-[#EDEDED] bg-[#F8F9FA] text-left text-[11px] text-[#8D8D8D]">
              <th className="px-5 py-2.5 font-medium">Post Content</th>
              <th className="px-4 py-2.5 font-medium">Impressions</th>
              <th className="px-4 py-2.5 font-medium">Engagements</th>
              <th className="px-4 py-2.5 font-medium">Post Saves</th>
              <th className="px-4 py-2.5 font-medium">Link Copies</th>
              <th className="px-4 py-2.5 font-medium">Shares</th>
            </tr>
          </thead>
          <tbody>
            {HIGH_SIGNAL_POSTS.map((p, i) => (
              <tr key={i} className="border-b border-[#EDEDED] last:border-0 hover:bg-[#F8F9FA] transition-colors">
                <td className="px-5 py-3 max-w-[240px]">
                  <p className="truncate text-[11px] font-medium text-[#080707]">{p.title}</p>
                  <p className="text-[10px] text-[#8D8D8D]">{p.time}</p>
                </td>
                <td className="px-4 py-3 text-[11px] font-semibold text-[#080707]">{p.impressions}</td>
                <td className="px-4 py-3">
                  <span className={`text-[11px] font-semibold flex items-center gap-0.5 ${p.up ? "text-[#10B981]" : "text-[#EF4444]"}`}>
                    {p.up ? <TrendUpIcon /> : <TrendDownIcon />}{p.engagements}
                  </span>
                </td>
                <td className="px-4 py-3 text-[11px] text-[#080707]">{p.saves}</td>
                <td className="px-4 py-3 text-[11px] text-[#080707]">{p.linkCopies}</td>
                <td className="px-4 py-3 text-[11px] text-[#080707]">{p.shares}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="border-t border-[#EDEDED] px-5 py-2.5 text-center">
          <button type="button" className="text-xs font-medium text-[#0066FF] hover:underline">View all Stream Posts</button>
        </div>
      </div>

      {/* Multi-Account Performance */}
      <div className="overflow-hidden rounded-2xl border border-[#EDEDED] bg-white">
        <div className="flex items-center justify-between border-b border-[#EDEDED] px-5 py-3">
          <h3 className="text-sm font-bold text-[#080707]">Multi-Account Performance</h3>
          <button type="button" className="text-xs font-medium text-[#0066FF] hover:underline">View all Performance &rarr;</button>
        </div>
        <table className="w-full min-w-[640px]">
          <thead>
            <tr className="border-b border-[#EDEDED] bg-[#F8F9FA] text-left text-[11px] text-[#8D8D8D]">
              <th className="px-5 py-2.5 font-medium">Account Name</th>
              <th className="px-4 py-2.5 font-medium">Posts</th>
              <th className="px-4 py-2.5 font-medium">Impression</th>
              <th className="px-4 py-2.5 font-medium">Engagements</th>
              <th className="px-4 py-2.5 font-medium">Growth</th>
              <th className="px-4 py-2.5 font-medium">Assigned Team Mem.</th>
              <th className="px-4 py-2.5 font-medium">Status</th>
              <th className="px-4 py-2.5 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {MULTI_ACCOUNT.map((a, i) => (
              <tr key={i} className="border-b border-[#EDEDED] last:border-0 hover:bg-[#F8F9FA] transition-colors">
                <td className="px-5 py-3">
                  <div className="flex items-center gap-2.5">
                    <div className="h-7 w-7 flex-shrink-0 rounded-full" style={{ background: a.avatar }} />
                    <span className="text-[11px] font-medium text-[#080707]">{a.name}</span>
                  </div>
                </td>
                <td className="px-4 py-3 text-[11px] text-[#080707]">{a.posts}</td>
                <td className="px-4 py-3 text-[11px] font-semibold text-[#080707]">{a.impression}</td>
                <td className="px-4 py-3 text-[11px] text-[#080707]">{a.engagements}</td>
                <td className="px-4 py-3">
                  <span className={`flex items-center gap-0.5 text-[11px] font-semibold ${a.up ? "text-[#10B981]" : "text-[#EF4444]"}`}>
                    {a.up ? <TrendUpIcon /> : <TrendDownIcon />}{a.growth}
                  </span>
                </td>
                <td className="px-4 py-3 text-[11px] text-[#8D8D8D]">{a.assignee}</td>
                <td className="px-4 py-3">
                  <span className="rounded-full bg-[#E8FAF3] px-2.5 py-1 text-[10px] font-semibold text-[#10B981]">{a.status}</span>
                </td>
                <td className="px-4 py-3">
                  <button type="button" className="text-[#8D8D8D] hover:text-[#080707]"><DotsIcon /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Bottom row: Top Locations + Live Monitoring */}
      <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
        {/* Top Locations */}
        <div className="rounded-2xl border border-[#EDEDED] bg-white p-5">
          <h3 className="mb-0.5 text-sm font-bold text-[#080707]">Top Locations</h3>
          <p className="mb-4 text-[11px] text-[#8D8D8D]">See where your content is generating the most engagement.</p>
          <div className="flex gap-4">
            <ul className="flex-1 space-y-3">
              {TOP_LOCATIONS.map((loc) => (
                <li key={loc.city} className="flex items-center gap-2 text-[11px]">
                  <LocationIcon />
                  <span className="flex-1 font-medium text-[#080707]">{loc.city}</span>
                  <span className="font-semibold text-[#0066FF]">{loc.pct}%</span>
                </li>
              ))}
            </ul>
            {/* Map placeholder */}
            <div className="flex w-36 flex-shrink-0 items-center justify-center rounded-xl bg-[#F4F7FF] text-center">
              <div>
                <svg width="48" height="32" viewBox="0 0 48 32" fill="none" className="mx-auto mb-1">
                  <ellipse cx="24" cy="16" rx="22" ry="14" stroke="#DBEAFE" strokeWidth="1.5" fill="#EEF3FF" />
                  <path d="M2 16h44M12 4C8 8 6 12 6 16s2 8 6 12M36 4c4 4 6 8 6 12s-2 8-6 12M24 2v28" stroke="#BFDBFE" strokeWidth="1" />
                </svg>
                <p className="text-[9px] font-semibold text-[#0066FF]">Global Reach</p>
                <p className="text-[10px] font-bold text-[#080707]">8,239</p>
                <p className="text-[9px] text-[#10B981]">+18.5%</p>
              </div>
            </div>
          </div>
        </div>

        {/* Live Monitoring */}
        <div className="rounded-2xl bg-[#0050CC] p-5">
          <div className="mb-3 flex items-center justify-between">
            <h3 className="text-sm font-bold text-white">Live Monitoring</h3>
            <span className="h-2 w-2 rounded-full bg-[#10B981] ring-2 ring-[#10B981]/30 animate-pulse" />
          </div>
          <ul className="space-y-3">
            {LIVE_FEED.map((item, i) => (
              <li key={i} className="flex items-start gap-3 rounded-xl bg-white/10 px-3 py-2.5">
                <div className={`mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full ${
                  item.type === "prospect" ? "bg-[#F59E0B]" : "bg-[#10B981]"
                }`}>
                  <FlashSmallIcon />
                </div>
                <p className="text-[11px] leading-relaxed text-white/90">
                  {item.type === "prospect" ? (
                    <>
                      <span className="font-bold text-white">New Prospect Detected :</span>{" "}{item.text}
                    </>
                  ) : (
                    <>
                      <span className="font-bold text-white">High Signal Save :</span>{" "}{item.text}
                    </>
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
"""

path = "/Users/sotonye/Documents/GitHub/linkdeck-frontend/src/components/analytics/AnalyticsPremium.jsx"
with open(path, "w") as f:
    f.write(PREMIUM)
print("AnalyticsPremium.jsx written:", len(PREMIUM.splitlines()), "lines")
