#!/usr/bin/env python3
"""Writes the new analytics component files."""
import os

BASIC = r"""import { DualLineChart } from "./Charts";

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
const METRICS = [
  { label: "Total Impression",  value: "12,540",  change: "+12.5%", up: true,  Icon: IconEye,       iconBg: "#EEF3FF" },
  { label: "Engagement Rate",   value: "4.2%",    change: "-0.57%", up: false, Icon: IconLightning, iconBg: "#FFF4E5" },
  { label: "Net Followers",     value: "10,000",  change: "+12.5%", up: true,  Icon: IconPeople,    iconBg: "#EEF3FF" },
  { label: "Profile Visit",     value: "980",     change: "+12.5%", up: true,  Icon: IconVisit,     iconBg: "#E8FAF3" },
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
  { title: "Just finished an amazing podcast episode...", date: "1/27/2026", impressions: "3.9k", engagements: 680, rate: "+12.5%", up: true,  thumb: "#DBEAFE" },
  { title: "Just finished an amazing podcast episode...", date: "1/27/2026", impressions: "3.9k", engagements: 680, rate: "-3.90%",  up: false, thumb: "#FCE7F3" },
  { title: "Just finished an amazing podcast episode...", date: "1/27/2026", impressions: "3.9k", engagements: 680, rate: "+12.5%", up: true,  thumb: "#D1FAE5" },
  { title: "Just finished an amazing podcast episode...", date: "1/27/2026", impressions: "3.9k", engagements: 680, rate: "-0.80%",  up: false, thumb: "#FEF3C7" },
  { title: "Just finished an amazing podcast episode...", date: "1/27/2026", impressions: "3.9k", engagements: 680, rate: "+12.5%", up: true,  thumb: "#EDE9FE" },
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
export default function AnalyticsBasic({ onUpgrade }) {
  return (
    <div className="flex flex-1 flex-col gap-4 overflow-auto p-5">

      {/* Metric cards */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {METRICS.map((m) => (
          <div key={m.label} className="rounded-2xl border border-[#EDEDED] bg-white p-4">
            <div className="flex items-start justify-between">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl" style={{ background: m.iconBg }}>
                <m.Icon />
              </div>
              <span className={`flex items-center gap-0.5 rounded-full px-2 py-0.5 text-[10px] font-semibold ${
                m.up ? "bg-[#E8FAF3] text-[#10B981]" : "bg-[#FDE8E8] text-[#EF4444]"
              }`}>
                {m.up ? <TrendUpIcon /> : <TrendDownIcon />}
                {m.change}
              </span>
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
"""

PRO = r"""import { useState } from "react";
import { DualLineChart, BarChart, DonutChart, HeatmapChart } from "./Charts";

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
function DownloadIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path d="M7 1v8M4 6l3 3 3-3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M1 11h12" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
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
const METRICS = [
  { label: "Total Impression",  value: "12,540",  change: "+12.5%", up: true,  Icon: IconEye,       iconBg: "#EEF3FF" },
  { label: "Engagement Rate",   value: "4.2%",    change: "-0.57%", up: false, Icon: IconLightning, iconBg: "#FFF4E5" },
  { label: "Net Followers",     value: "10,000",  change: "+12.5%", up: true,  Icon: IconPeople,    iconBg: "#EEF3FF" },
  { label: "Profile Visit",     value: "980",     change: "+12.5%", up: true,  Icon: IconVisit,     iconBg: "#E8FAF3" },
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
  { title: "Just finished an amazing podcast episode...", date: "1/27/2026", impressions: "3.9k", engagements: 680, rate: "+12.5%", up: true,  thumb: "#DBEAFE" },
  { title: "Just finished an amazing podcast episode...", date: "1/27/2026", impressions: "3.9k", engagements: 680, rate: "-3.90%",  up: false, thumb: "#FCE7F3" },
  { title: "Just finished an amazing podcast episode...", date: "1/27/2026", impressions: "3.9k", engagements: 680, rate: "+12.5%", up: true,  thumb: "#D1FAE5" },
  { title: "Just finished an amazing podcast episode...", date: "1/27/2026", impressions: "3.9k", engagements: 680, rate: "-0.80%",  up: false, thumb: "#FEF3C7" },
  { title: "Just finished an amazing podcast episode...", date: "1/27/2026", impressions: "3.9k", engagements: 680, rate: "+12.5%", up: true,  thumb: "#EDE9FE" },
];

const ENGAGEMENT_BARS = [
  { label: "Text",     value: 42, color: "#0066FF" },
  { label: "Image",    value: 68, color: "#10B981" },
  { label: "Video",    value: 91, color: "#EC4899" },
  { label: "Carousel", value: 74, color: "#F59E0B" },
  { label: "Poll",     value: 35, color: "#6366F1" },
];

const CONTENT_DONUT = [
  { label: "Text",     value: 38, color: "#0066FF" },
  { label: "Image",    value: 27, color: "#10B981" },
  { label: "Video",    value: 19, color: "#EC4899" },
  { label: "Carousel", value: 11, color: "#F59E0B" },
  { label: "Poll",     value: 5,  color: "#6366F1" },
];

const HEATMAP_DATA = [
  [0,0,1,2,2,1,0,0,0],[0,1,3,5,4,2,0,0,0],[0,2,4,7,9,8,5,2,0],[0,3,6,8,7,5,3,1,0],
  [0,1,2,3,4,3,2,1,0],[0,0,1,2,2,1,0,0,0],[0,0,1,1,1,1,0,0,0],
];
const HEATMAP_ROWS = ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"];
const HEATMAP_COLS = ["12 AM","3 AM","6 AM","9 AM","12 PM","3 PM","6 PM","9 PM","11 PM"];

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
          className="flex items-center gap-1.5 rounded-xl bg-[#080707] px-3 py-1.5 text-xs font-semibold text-white hover:bg-[#1a1a1a]">
          <FlashIcon />Upgrade to Premium
        </button>
      </div>
    </div>
  );
}

/* == Component =================================================== */
export default function AnalyticsPro({ onUpgrade }) {
  const [dateRange, setDateRange] = useState("30d");

  return (
    <div className="flex flex-1 flex-col gap-4 overflow-auto p-5">

      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div />
        <div className="flex items-center gap-2">
          <div className="flex overflow-hidden rounded-xl border border-[#EDEDED] bg-white text-xs font-semibold">
            {[["7d","7d"],["30d","30d"],["90d","90d"]].map(([val, lbl]) => (
              <button key={val} type="button" onClick={() => setDateRange(val)}
                className={`px-3 py-1.5 transition ${dateRange === val ? "bg-[#0066FF] text-white" : "text-[#8D8D8D] hover:bg-[#F4F7FF]"}`}>
                {lbl}
              </button>
            ))}
          </div>
          <button type="button" className="flex items-center gap-1.5 rounded-xl border border-[#EDEDED] bg-white px-3 py-1.5 text-xs font-medium text-[#080707] hover:border-[#0066FF]/30">
            <DownloadIcon />Export
          </button>
          <span className="rounded-full bg-[#0066FF] px-2.5 py-1 text-xs font-semibold text-white">Pro</span>
        </div>
      </div>

      {/* Metric cards */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {METRICS.map((m) => (
          <div key={m.label} className="rounded-2xl border border-[#EDEDED] bg-white p-4">
            <div className="flex items-start justify-between">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl" style={{ background: m.iconBg }}>
                <m.Icon />
              </div>
              <span className={`flex items-center gap-0.5 rounded-full px-2 py-0.5 text-[10px] font-semibold ${
                m.up ? "bg-[#E8FAF3] text-[#10B981]" : "bg-[#FDE8E8] text-[#EF4444]"
              }`}>
                {m.up ? <TrendUpIcon /> : <TrendDownIcon />}
                {m.change}
              </span>
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

      {/* Posts performance table */}
      <div className="overflow-hidden rounded-2xl border border-[#EDEDED] bg-white">
        <div className="flex items-center justify-between border-b border-[#EDEDED] px-5 py-3">
          <h3 className="text-sm font-bold text-[#080707]">Performance Over Time</h3>
          <button type="button" className="text-xs font-medium text-[#0066FF] hover:underline">
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
      </div>

      {/* Engagement by content type + Content mix */}
      <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
        <div className="rounded-2xl border border-[#EDEDED] bg-white p-5">
          <h3 className="mb-1 text-sm font-bold text-[#080707]">Engagement Rate by Content Type</h3>
          <p className="mb-4 text-[11px] text-[#8D8D8D]">Average % per post type</p>
          <BarChart data={ENGAGEMENT_BARS} width={320} height={130} />
        </div>
        <div className="rounded-2xl border border-[#EDEDED] bg-white p-5">
          <h3 className="mb-1 text-sm font-bold text-[#080707]">Content Mix</h3>
          <p className="mb-4 text-[11px] text-[#8D8D8D]">Posts share per type</p>
          <div className="flex items-center gap-6">
            <DonutChart segments={CONTENT_DONUT} size={110} />
            <ul className="space-y-1.5">
              {CONTENT_DONUT.map((seg) => (
                <li key={seg.label} className="flex items-center gap-2 text-[11px]">
                  <span className="h-2 w-2 flex-shrink-0 rounded-full" style={{ background: seg.color }} />
                  <span className="text-[#080707] font-medium">{seg.label}</span>
                  <span className="text-[#8D8D8D]">{seg.value}%</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Engagement heatmap */}
      <div className="overflow-hidden rounded-2xl border border-[#EDEDED] bg-white p-5">
        <div className="mb-4 flex items-start justify-between">
          <div>
            <h3 className="text-sm font-bold text-[#080707]">Engagement Heatmap</h3>
            <p className="text-[11px] text-[#8D8D8D]">Peak intensity by day and hour</p>
          </div>
          <div className="flex items-center gap-2 text-[10px] text-[#8D8D8D]">
            <div className="h-3 w-8 rounded bg-[#E8F0FF]" />Low
            <div className="h-3 w-8 rounded bg-[#0066FF]" />High
          </div>
        </div>
        <div className="overflow-x-auto">
          <HeatmapChart
            data={HEATMAP_DATA}
            rowLabels={HEATMAP_ROWS}
            colLabels={HEATMAP_COLS}
            color="#0066FF"
            cellW={56}
            cellH={28}
          />
        </div>
      </div>

      {/* Premium-locked sections */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <LockedSection
          title="AI-Powered Content Insights"
          description="Get AI analysis on what topics, formats and hooks drive your best engagement."
          onUpgrade={onUpgrade}
        />
        <LockedSection
          title="Competitor Benchmarking"
          description="Compare your performance against top creators and brands in your niche."
          onUpgrade={onUpgrade}
        />
      </div>

      {/* Premium upgrade banner */}
      <div className="flex flex-col items-start justify-between gap-3 rounded-2xl border border-[#F59E0B]/30 bg-[#FFF9EC] px-5 py-4 sm:flex-row sm:items-center">
        <div>
          <p className="text-sm font-bold text-[#080707]">Go further with Premium Analytics</p>
          <p className="mt-0.5 text-xs text-[#8D8D8D]">AI insights, competitor benchmarking, audience demographics and CSV exports.</p>
        </div>
        <button type="button" onClick={onUpgrade}
          className="flex flex-shrink-0 items-center gap-1.5 rounded-xl bg-[#F59E0B] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#d97706]">
          <FlashIcon />Upgrade to Premium
        </button>
      </div>

    </div>
  );
}
"""

base = "/Users/sotonye/Documents/GitHub/linkdeck-frontend/src/components/analytics"
with open(os.path.join(base, "AnalyticsBasic.jsx"), "w") as f:
    f.write(BASIC)
print("AnalyticsBasic.jsx written")

with open(os.path.join(base, "AnalyticsPro.jsx"), "w") as f:
    f.write(PRO)
print("AnalyticsPro.jsx written")
