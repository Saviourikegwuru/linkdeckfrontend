import React from "react";

export default function PrivacyDataPage() {
  return (
    <section className="mx-auto w-full max-w-[980px]">
      <header className="mb-5">
        <h2 className="text-[32px] font-bold leading-tight text-[#080707]">Privacy and Data</h2>
        <p className="mt-1 text-sm text-[#8D8D8D]">Manage your data exports and privacy controls</p>
      </header>

      <div className="space-y-4">
        <div className="rounded-xl border border-[#EDEDED] bg-white p-5">
          <h3 className="text-sm font-semibold text-[#080707]">Data Export</h3>
          <p className="mt-1 text-xs text-[#8D8D8D]">Download a copy of your account data.</p>
          <button type="button" className="mt-3 rounded-lg bg-[#0066FF] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#005ae0]">
            Request Export
          </button>
        </div>

        <div className="rounded-xl border border-[#EDEDED] bg-white p-5">
          <h3 className="text-sm font-semibold text-[#080707]">Privacy Preferences</h3>
          <div className="mt-3 space-y-2 text-sm text-[#080707]">
            <label className="flex items-center gap-2">
              <input type="checkbox" defaultChecked className="h-4 w-4 rounded border-[#D9D9D9] text-[#0066FF]" />
              Allow profile discovery by connected teammates
            </label>
            <label className="flex items-center gap-2">
              <input type="checkbox" defaultChecked className="h-4 w-4 rounded border-[#D9D9D9] text-[#0066FF]" />
              Share anonymized usage analytics
            </label>
          </div>
        </div>
      </div>
    </section>
  );
}
