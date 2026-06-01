import { DualLineChart } from "./Charts";
import {
  AnalyticsEmptyCard,
  AnalyticsFailureBanner,
  AnalyticsFailureCard,
  AnalyticsFailureTable,
  AnalyticsMetricGrid,
} from "./AnalyticsFallbackStates";

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
function LockIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
      <rect x="4" y="9" width="12" height="9" rx="2" stroke="#8D8D8D" strokeWidth="1.4" />
      <path d="M7 9V6a3 3 0 0 1 6 0v3" stroke="#8D8D8D" strokeWidth="1.4" strokeLinecap="round" />
      <circle cx="10" cy="13.5" r="1.2" fill="#8D8D8D" />
    </svg>
  );
}
function FlashIcon({ color = "#fff" }) {
  return (
    <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
      <path d="M8 1.5L2.5 8H7L6 12.5L11.5 6H7L8 1.5Z" fill={color} />
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
function IconIT() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <rect x="2" y="3" width="12" height="8" rx="1.5" stroke="#F59E0B" strokeWidth="1.3" />
      <path d="M5 14h6M8 11v3" stroke="#F59E0B" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  );
}
function IconMarketing() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M2 12V6l4-3 4 3v6" stroke="#0066FF" strokeWidth="1.3" strokeLinejoin="round" />
      <rect x="5.5" y="9" width="3" height="3" rx="0.5" stroke="#0066FF" strokeWidth="1.3" />
    </svg>
  );
}
function IconFinance() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <circle cx="8" cy="8" r="5.5" stroke="#6366F1" strokeWidth="1.3" />
      <path d="M8 5v1.2M8 9.8V11" stroke="#6366F1" strokeWidth="1.2" strokeLinecap="round" />
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

/* == Data ======================================================== */
function buildMetrics(summaryData) {
  const s = summaryData?.summary;
  return [
    { label: "Total Impression",  value: s ? (s.impressions ?? 0).toLocaleString()                               : "12,540",  change: s ? null : "+12.5%", up: true,  Icon: IconEye,       iconBg: "#EEF3FF" },
    { label: "Engagement Rate",   value: s ? (s.engagement_rate != null ? `${s.engagement_rate.toFixed(1)}%` : "—") : "4.2%",    change: s ? null : "-0.57%", up: s ? (s.engagement_rate ?? 0) >= 0 : false, Icon: IconLightning, iconBg: "#FFF4E5" },
    { label: "Net Followers",     value: "N/A",  change: null, up: true,  Icon: IconPeople,    iconBg: "#EEF3FF" },
    { label: "Profile Visit",     value: "N/A",  change: null, up: true,  Icon: IconVisit,     iconBg: "#E8FAF3" },
  ];
}

const IMPRESSION_DATA = [185,200,230,215,195,180,170,190,235,220,205,215,200,205,160,180,195,210,200,215,225,180,200,215,210,195,200,185];
const ENGAGEMENT_DATA = [135,150,140,130,120,110,100,115,135,120,105,100,115,120,65,85,100,115,105,110,120,100,115,120,115,100,115,100];
const TOOLTIP_LABELS = [
  "Dec 27","Dec 28","Dec 29","Dec 30","Dec 31","Jan 1","Jan 2",
  "Jan 3","Jan 4","Jan 5","Jan 6","Jan 7","Jan 8","Jan 9",
  "Jan 10","Jan 11","Jan 12","Jan 13","Jan 14","Jan 15","Jan 16",
  "Jan 17","Jan 18","Jan 19","Jan 20","Jan 21","Jan 22","Jan 23",
];

const JOB_TITLES = [
  { name: "Software Engineer",  pct: 56 },
  { name: "Product Designer",   pct: 46 },
  { name: "Marketing Manager",  pct: 32 },
];

const INDUSTRY = [
  { Icon: IconIT,        name: "IT Services", bg: "#FFF4E5", followers: "9,400 followers", pct: "48%" },
  { Icon: IconMarketing, name: "Marketing",   bg: "#EEF3FF", followers: "9,400 followers", pct: "25%" },
  { Icon: IconFinance,   name: "Finance",     bg: "#F0F0FF", followers: "9,400 followers", pct: "12%" },
];

const POSTS = [
  { title: "Just finished an amazing podcast episode on building in public", date: "1/27/2026", impressions: "5.2k", engagements: 843, rate: "+12.5%", up: true,  thumb: "#DBEAFE" },
  { title: "3 mistakes I made growing my LinkedIn to 10k followers",         date: "1/24/2026", impressions: "4.1k", engagements: 512, rate: "-3.90%",  up: false, thumb: "#FCE7F3" },
  { title: "How I doubled my engagement rate in 30 days — thread",           date: "1/21/2026", impressions: "6.8k", engagements: 1240, rate: "+18.2%", up: true,  thumb: "#D1FAE5" },
  { title: "The content framework I use to write posts in under 10 minutes",  date: "1/18/2026", impressions: "3.3k", engagements: 390, rate: "-0.80%",  up: false, thumb: "#FEF3C7" },
  { title: "Stop chasing virality — do this instead for consistent growth",   date: "1/15/2026", impressions: "7.4k", engagements: 1580, rate: "+21.3%", up: true,  thumb: "#EDE9FE" },
];

/* == Locked overlay ============================================== */
function LockedSection({ title, description, onUpgrade }) {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-[#EDEDED] bg-white min-h-[160px]">
      <div className="pointer-events-none select-none p-4 opacity-25 blur-[3px]">
        <div className="mb-2 h-3 w-32 rounded bg-[#EDEDED]" />
        <div className="h-24 rounded-xl bg-[#F4F7FF]" />
      </div>
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-white/80 backdrop-blur-[2px]">
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#EDEDED]">
          <LockIcon />
        </div>
        <div className="text-center px-4">
          <p className="text-xs font-bold text-[#080707]">{title}</p>
          <p className="mt-0.5 text-[10px] text-[#8D8D8D]">{description}</p>
        </div>
        <button type="button" onClick={onUpgrade}
          className="flex items-center gap-1.5 rounded-xl bg-[#0066FF] px-3 py-1.5 text-xs font-semibold text-white hover:bg-[#005ae0]">
          <FlashIcon />Upgrade to Pro
        </button>
      </div>
    </div>
  );
}

/* == Component =================================================== */
export default function AnalyticsBasic({ onUpgrade, dataState = "live", onRetry, summaryData }) {
  const metrics = buildMetrics(summaryData);

  if (dataState === "empty") {
    return (
      <div className="flex flex-1 flex-col gap-4 overflow-auto p-5">
        <AnalyticsMetricGrid items={metrics} columnsClass="sm:grid-cols-4" />

        <div className="grid gap-3" style={{ gridTemplateColumns: "1fr 256px" }}>
          <AnalyticsEmptyCard
            title="Performance Over Time"
            subtitle="Impression VS Engagement"
            minHeight="min-h-[360px]"
          />

          <div className="flex flex-col gap-3">
            <AnalyticsEmptyCard title="Top Job Titles" minHeight="min-h-[174px]" />
            <LockedSection
              title="Audience Industry"
              description="See which industries your followers come from."
              onUpgrade={onUpgrade}
            />
          </div>
        </div>

        <AnalyticsEmptyCard
          title="Post Performance"
          subtitle="Not enough activity yet to rank your recent posts."
          minHeight="min-h-[280px]"
        />
      </div>
    );
  }

  if (dataState === "error") {
    return (
      <div className="flex flex-1 flex-col gap-4 overflow-auto p-5">
        <AnalyticsFailureBanner
          title="Basic analytics couldn’t load"
          description="We couldn’t connect to the analytics service for this workspace. Your upgrade prompts are still available, but the report data is temporarily unavailable."
          onRetry={onRetry}
        />

        <AnalyticsMetricGrid items={metrics} columnsClass="sm:grid-cols-4" />

        <div className="grid gap-3" style={{ gridTemplateColumns: "1fr 256px" }}>
          <AnalyticsFailureCard
            title="Performance Over Time"
            subtitle="Impression VS Engagement"
            minHeight="min-h-[360px]"
          />
          <div className="flex flex-col gap-3">
            <AnalyticsFailureCard title="Top Job Titles" minHeight="min-h-[174px]" />
            <LockedSection
              title="Audience Industry"
              description="See which industries your followers come from."
              onUpgrade={onUpgrade}
            />
          </div>
        </div>

        <AnalyticsFailureTable
          title="Post Performance"
          subtitle="Recent post metrics"
          columns={["Post", "Date", "Impressions", "Engagements", "Rate", "Actions"]}
        />
      </div>
    );
  }

  return (
    <div className="flex flex-1 flex-col gap-4 overflow-auto p-5">

      {/* Metric cards */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {metrics.map((m) => (
          <div key={m.label} className="rounded-2xl border border-[#EDEDED] bg-white p-4">
            <div className="flex items-start justify-between">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl" style={{ background: m.iconBg }}>
                <m.Icon />
              </div>
              {m.change != null && (
              <span className={`flex items-center gap-0.5 rounded-full px-2 py-0.5 text-[10px] font-semibold ${
                m.up ? "bg-[#E8FAF3] text-[#10B981]" : "bg-[#FDE8E8] text-[#EF4444]"
              }`}>
                {m.up ? <TrendUpIcon /> : <TrendDownIcon />}
                {m.change}
              </span>
              )}
            </div>
            <p className="mt-3 text-2xl font-bold text-[#080707]">{m.value}</p>
            <p className="text-[11px] text-[#8D8D8D]">{m.label}</p>
          </div>
        ))}
      </div>

      {/* Main row: chart + sidebar */}
      <div className="grid gap-3" style={{ gridTemplateColumns: "1fr 256px" }}>

        {/* Performance Over Time */}
        <div className="rounded-2xl border border-[#EDEDED] bg-white p-5">
          <div className="mb-3 flex items-start justify-between">
            <div>
              <h3 className="text-sm font-bold text-[#080707]">Performance Over Time</h3>
              <p className="text-[11px] text-[#8D8D8D]">Impression VS Engagement</p>
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
          <div className="mt-1 flex justify-between px-10 text-[10px] text-[#ABABAB]">
            {["Dec 26-Jan 2","Jan 3-10","Jan 11-18","Jan 19-26"].map((l) => (
              <span key={l}>{l}</span>
            ))}
          </div>
        </div>

        {/* Right sidebar */}
        <div className="flex flex-col gap-3">
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

          {/* Audience Industry - locked on Basic */}
          <LockedSection
            title="Audience Industry"
            description="See which industries your followers come from."
            onUpgrade={onUpgrade}
          />
        </div>
      </div>

      {/* Posts performance table */}
      <div className="overflow-hidden rounded-2xl border border-[#EDEDED] bg-white">
        <div className="flex items-center justify-between border-b border-[#EDEDED] px-5 py-3">
          <h3 className="text-sm font-bold text-[#080707]">Performance Over Time</h3>
          <button type="button" onClick={onUpgrade}
            className="text-xs font-medium text-[#0066FF] hover:underline">
            View all posts &rarr;
          </button>
        </div>
        <table className="w-full min-w-[580px]">
          <thead>
            <tr className="border-b border-[#EDEDED] bg-[#F8F9FA] text-left text-[11px] text-[#8D8D8D]">
              <th className="px-5 py-2.5 font-medium">Content Preview</th>
              <th className="px-4 py-2.5 font-medium">Date Published</th>
              <th className="px-4 py-2.5 font-medium">Impression</th>
              <th className="px-4 py-2.5 font-medium">Engagements</th>
              <th className="px-4 py-2.5 font-medium">Engagement Rate</th>
              <th className="px-4 py-2.5 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {POSTS.map((p, i) => (
              <tr key={i} className="border-b border-[#EDEDED] last:border-0 transition-colors hover:bg-[#F8F9FA]">
                <td className="px-5 py-3">
                  <div className="flex items-center gap-2.5">
                    <div className="h-9 w-14 flex-shrink-0 rounded-lg" style={{ background: p.thumb }} />
                    <p className="max-w-[180px] truncate text-[11px] font-medium text-[#080707]">{p.title}</p>
                  </div>
                </td>
                <td className="px-4 py-3 text-[11px] text-[#8D8D8D] whitespace-nowrap">{p.date}</td>
                <td className="px-4 py-3 text-[11px] font-semibold text-[#080707]">{p.impressions}</td>
                <td className="px-4 py-3 text-[11px] text-[#080707]">{p.engagements}</td>
                <td className="px-4 py-3">
                  <span className={`flex items-center gap-0.5 text-[11px] font-semibold ${
                    p.up ? "text-[#10B981]" : "text-[#EF4444]"
                  }`}>
                    {p.up ? <TrendUpIcon /> : <TrendDownIcon />}{p.rate}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <button type="button" className="text-[#8D8D8D] hover:text-[#080707]"><DotsIcon /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="border-t border-[#EDEDED] bg-[#F8F9FA] px-5 py-3 text-center">
          <button type="button" onClick={onUpgrade}
            className="text-xs font-semibold text-[#0066FF] hover:underline">
            Upgrade to Pro to see all posts and full engagement data
          </button>
        </div>
      </div>

      {/* Upgrade banner */}
      <div className="flex flex-col items-start justify-between gap-3 rounded-2xl border border-[#D6E4FF] bg-[#EEF3FF] px-5 py-4 sm:flex-row sm:items-center">
        <div>
          <p className="text-sm font-bold text-[#0066FF]">Unlock the full picture with Pro</p>
          <p className="mt-0.5 text-xs text-[#0066FF]/80">Engagement breakdown, follower growth, audience industry data and more.</p>
        </div>
        <button type="button" onClick={onUpgrade}
          className="flex flex-shrink-0 items-center gap-1.5 rounded-xl bg-[#0066FF] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#005ae0]">
          <FlashIcon />Upgrade to Pro
        </button>
      </div>

    </div>
  );
}
