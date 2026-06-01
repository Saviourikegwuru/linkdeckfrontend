import React from "react";

function EmptyStateIcon() {
  return (
    <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[#F0F2F5] text-[#9A9A9A] shadow-[inset_0_1px_0_rgba(255,255,255,0.8)]">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <rect x="4.5" y="7" width="15" height="10" rx="2.5" stroke="currentColor" strokeWidth="1.8" />
        <path d="M8 12h8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    </span>
  );
}

function ErrorStateIcon() {
  return (
    <span className="flex h-14 w-14 items-center justify-center rounded-full bg-[#FFF1F1] text-[#E25B5B] shadow-[0_12px_30px_rgba(226,91,91,0.14)]">
      <svg width="26" height="26" viewBox="0 0 26 26" fill="none" aria-hidden="true">
        <path d="M13 4.5 3.5 21h19L13 4.5Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
        <path d="M13 10v5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        <circle cx="13" cy="18" r="1.2" fill="currentColor" />
      </svg>
    </span>
  );
}

function RefreshIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <path d="M11.8 7A4.8 4.8 0 1 1 10.5 3.6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      <path d="M11 1.9v2.5H8.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function AnalyticsMetricGrid({ items, columnsClass = "sm:grid-cols-5" }) {
  return (
    <div className={`grid grid-cols-2 gap-3 ${columnsClass}`}>
      {items.map((metric) => (
        <div
          key={metric.label}
          className="relative overflow-hidden rounded-2xl border border-[#EDEDED] bg-white p-4 shadow-sm"
        >
          <div className="flex items-start justify-between gap-3">
            <div
              className="flex h-9 w-9 items-center justify-center rounded-xl shadow-sm"
              style={{ background: metric.iconBg || "#EEF3FF" }}
            >
              {metric.Icon ? <metric.Icon /> : <span className="h-3 w-3 rounded-full bg-[#0066FF]" />}
            </div>
            {metric.change ? (
              <span
                className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${
                  metric.up ? "bg-[#E6FAF3] text-[#10B981]" : "bg-[#FEE8E8] text-[#EF4444]"
                }`}
              >
                {metric.change}
              </span>
            ) : null}
          </div>
          <p className="mt-3 text-2xl font-extrabold tracking-tight text-[#080707]">{metric.value}</p>
          <p className="mt-0.5 text-[11px] font-medium text-[#8D8D8D]">{metric.label}</p>
        </div>
      ))}
    </div>
  );
}

export function AnalyticsEmptyCard({
  title,
  subtitle,
  minHeight = "min-h-[220px]",
  className = "",
  accent = "neutral",
}) {
  const accentStyle = accent === "primary"
    ? "bg-[linear-gradient(135deg,rgba(255,255,255,0.98),rgba(234,241,255,0.96))] border-[#CFE0FF]"
    : "bg-[linear-gradient(135deg,rgba(255,255,255,0.98),rgba(246,247,250,0.95))] border-[#EDEDED]";

  return (
    <div className={`rounded-2xl border p-5 shadow-sm ${accentStyle} ${minHeight} ${className}`}>
      {title || subtitle ? (
        <div className="mb-5">
          {title ? <h3 className="text-sm font-bold text-[#080707]">{title}</h3> : null}
          {subtitle ? <p className="mt-0.5 text-[11px] text-[#8D8D8D]">{subtitle}</p> : null}
        </div>
      ) : null}
      <div className="flex h-full min-h-[140px] flex-col items-center justify-center text-center">
        <EmptyStateIcon />
        <p className="mt-5 max-w-[280px] text-[15px] font-semibold leading-snug text-[#1E1E1E]">
          Not enough traffic data to show this report
        </p>
        <p className="mt-2 max-w-[300px] text-[12px] leading-relaxed text-[#8D8D8D]">
          Publish a few more posts or give your recent activity some time to accumulate engagement.
        </p>
      </div>
    </div>
  );
}

export function AnalyticsFailureBanner({
  title = "Analytics data couldn’t load",
  description = "We couldn’t fetch the latest analytics right now. Please try again in a moment.",
  onRetry,
}) {
  return (
    <div className="rounded-[26px] border border-[#FFD4D4] bg-[linear-gradient(135deg,rgba(255,255,255,0.98),rgba(255,244,244,0.95))] px-6 py-7 shadow-[0_20px_50px_rgba(226,91,91,0.12)]">
      <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
        <div className="flex items-start gap-4">
          <ErrorStateIcon />
          <div>
            <h2 className="text-[20px] font-bold text-[#111111]">{title}</h2>
            <p className="mt-1 max-w-[560px] text-[14px] leading-relaxed text-[#8D8D8D]">{description}</p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={onRetry}
            className="inline-flex items-center gap-2 rounded-xl bg-[#0066FF] px-4 py-2.5 text-sm font-semibold text-white shadow-[0_16px_30px_rgba(0,102,255,0.18)] transition hover:bg-[#005ae0]"
          >
            <RefreshIcon />
            Try again
          </button>
          <span className="rounded-full bg-[#FFF5F5] px-3 py-1 text-[12px] font-medium text-[#C15C5C]">
            API connection issue
          </span>
        </div>
      </div>
    </div>
  );
}

export function AnalyticsFailureCard({
  title,
  subtitle,
  minHeight = "min-h-[220px]",
  className = "",
}) {
  return (
    <div className={`rounded-2xl border border-[#FFE0E0] bg-[linear-gradient(135deg,rgba(255,255,255,0.98),rgba(255,245,245,0.96))] p-5 shadow-sm ${minHeight} ${className}`}>
      {title || subtitle ? (
        <div className="mb-5">
          {title ? <h3 className="text-sm font-bold text-[#080707]">{title}</h3> : null}
          {subtitle ? <p className="mt-0.5 text-[11px] text-[#8D8D8D]">{subtitle}</p> : null}
        </div>
      ) : null}
      <div className="flex h-full min-h-[140px] flex-col items-center justify-center text-center">
        <ErrorStateIcon />
        <p className="mt-5 max-w-[280px] text-[15px] font-semibold leading-snug text-[#1E1E1E]">
          This report is temporarily unavailable
        </p>
        <p className="mt-2 max-w-[320px] text-[12px] leading-relaxed text-[#8D8D8D]">
          We hit an unexpected analytics service error while loading this panel.
        </p>
      </div>
    </div>
  );
}

export function AnalyticsFailureTable({
  title,
  subtitle,
  columns = [],
  minHeight = "min-h-[260px]",
}) {
  return (
    <div className="overflow-hidden rounded-2xl border border-[#FFE0E0] bg-white shadow-sm">
      <div className="border-b border-[#F3E3E3] px-5 py-3.5">
        <h3 className="text-sm font-bold text-[#080707]">{title}</h3>
        {subtitle ? <p className="mt-0.5 text-[11px] text-[#8D8D8D]">{subtitle}</p> : null}
      </div>
      {columns.length ? (
        <div className="grid gap-px bg-[#F3E3E3] text-left text-[11px] font-semibold text-[#8D8D8D]" style={{ gridTemplateColumns: `repeat(${columns.length}, minmax(0, 1fr))` }}>
          {columns.map((column) => (
            <div key={column} className="bg-[#FFF8F8] px-5 py-3">{column}</div>
          ))}
        </div>
      ) : null}
      <div className={`px-5 py-6 ${minHeight}`}>
        <div className="flex h-full min-h-[160px] flex-col items-center justify-center text-center">
          <ErrorStateIcon />
          <p className="mt-5 text-[15px] font-semibold text-[#1E1E1E]">Table data could not be loaded</p>
          <p className="mt-2 max-w-[340px] text-[12px] leading-relaxed text-[#8D8D8D]">
            Refresh the page or try again later while we reconnect to the analytics API.
          </p>
        </div>
      </div>
    </div>
  );
}
