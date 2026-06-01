import React from "react";

const LEGALS = [
  { label: "Terms of Service", desc: "General Rules and guidelines for using the LinkedEck platform" },
  { label: "Privacy Policy", desc: "How we collect , use and protect your personal information" },
  { label: "Cookie Policy", desc: "Information on how we use cookies to improve your experience" },
  { label: "Licence", desc: "Third part software and open source attribution" },
  { label: "Compliance", desc: "Industry specific certifications" },
];

export default function LegalPage() {
  return (
    <section className="w-full max-w-[980px]">
      <header>
        <h2 className="text-[32px] font-bold leading-tight text-[#080707]">Legal</h2>
        <p className="mt-2 max-w-[720px] text-sm text-[#8D8D8D]">Review our Terms, Policies, Privacy and Licencing informations to understand how LinkedEck protect your data and manages compliances</p>
      </header>

      <div className="mt-5 space-y-2.5">
        {LEGALS.map((l, idx) => (
          <button key={l.label} className="flex w-full items-center gap-3 rounded-lg border border-[#EDEDED] bg-[#F8F9FA] px-3 py-2.5 text-left transition hover:bg-[#EEF3FF]">
            <span className="flex h-4 w-4 items-center justify-center rounded bg-[#0066FF] text-white">
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
                <path d={idx === 1 ? "M5 1.5v7M1.5 5h7" : idx === 3 ? "M1.5 5h7M5 1.5v7" : "M2 2h6v6H2z"} stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
              </svg>
            </span>
            <span className="min-w-0 flex-1">
              <span className="block text-[12px] font-semibold text-[#080707]">{l.label}</span>
              <span className="block text-[11px] text-[#8D8D8D]">{l.desc}</span>
            </span>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true" className="text-[#8D8D8D]"><path d="M4.5 2.5 8 6l-3.5 3.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </button>
        ))}
      </div>
    </section>
  );
}
