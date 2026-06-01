import React from "react";

export default function PreferencePage() {
  return (
    <section className="w-full max-w-[980px]">
      <header>
        <h2 className="text-[32px] font-bold leading-tight text-[#080707]">Preference</h2>
        <p className="mt-1 text-sm text-[#8D8D8D]">Customize your LinkedEck experience and Interface settings</p>
      </header>

      <div className="mt-5 border-t border-[#EDEDED] pt-5">
        <div className="font-semibold text-[#080707] mb-3">Appearance</div>
        <div className="flex gap-3 mb-5">
          <button className="flex h-10 w-24 flex-col items-center justify-center rounded-lg border border-[#EDEDED] bg-[#F8F9FA] text-[12px] font-medium text-[#8D8D8D]">Light</button>
          <button className="flex h-10 w-24 flex-col items-center justify-center rounded-lg bg-[#080707] text-[12px] font-medium text-white">Dark</button>
          <button className="flex h-10 w-24 flex-col items-center justify-center rounded-lg border border-[#EDEDED] bg-[#F8F9FA] text-[12px] font-medium text-[#8D8D8D]">System</button>
        </div>
      </div>
      <div className="mb-8 grid grid-cols-2 gap-6">
        <div>
          <label className="block text-xs text-[#080707] mb-1">Language</label>
          <select className="w-full rounded-lg border border-[#EDEDED] px-3 py-2 text-sm text-[#8D8D8D] bg-[#F8F9FA]">
            <option>English (US)</option>
          </select>
        </div>
        <div>
          <label className="block text-xs text-[#080707] mb-1">Time Zone</label>
          <select className="w-full rounded-lg border border-[#EDEDED] px-3 py-2 text-sm text-[#8D8D8D] bg-[#F8F9FA]">
            <option>(UTC-08:00) Pacific Time</option>
          </select>
        </div>
        <div>
          <label className="block text-xs text-[#080707] mb-1">Date Format</label>
          <select className="w-full rounded-lg border border-[#EDEDED] px-3 py-2 text-sm text-[#8D8D8D] bg-[#F8F9FA]">
            <option>DD/MM/YYYY</option>
          </select>
        </div>
        <div>
          <label className="block text-xs text-[#080707] mb-1">Time Format</label>
          <select className="w-full rounded-lg border border-[#EDEDED] px-3 py-2 text-sm text-[#8D8D8D] bg-[#F8F9FA]">
            <option>12 Hours</option>
          </select>
        </div>
      </div>
      <div className="mb-8">
        <div className="font-semibold text-[#080707] mb-2">Navigation Behaviour</div>
        <div className="flex items-center gap-4 mb-2">
          <span className="text-sm text-[#080707]">Open Last Workspace on Loging</span>
          <label className="inline-flex items-center cursor-pointer">
            <input type="checkbox" className="sr-only peer" checked readOnly />
            <div className="w-10 h-5 bg-[#EEF3FF] rounded-full peer peer-checked:bg-[#0066FF] transition"></div>
            <div className="dot absolute left-1 top-1 bg-white w-3 h-3 rounded-full transition peer-checked:translate-x-5"></div>
          </label>
        </div>
        <div className="text-xs text-[#8D8D8D] mb-4">Automatically take you back to where you left off</div>
      </div>
      <div className="mb-8">
        <div className="font-semibold text-[#080707] mb-2">Motion</div>
        <div className="flex items-center gap-4 mb-2">
          <span className="text-sm text-[#080707]">Reduce motion</span>
          <label className="inline-flex items-center cursor-pointer">
            <input type="checkbox" className="sr-only peer" checked readOnly />
            <div className="w-10 h-5 bg-[#EEF3FF] rounded-full peer peer-checked:bg-[#0066FF] transition"></div>
            <div className="dot absolute left-1 top-1 bg-white w-3 h-3 rounded-full transition peer-checked:translate-x-5"></div>
          </label>
        </div>
        <div className="flex items-center gap-4 mb-2">
          <span className="text-sm text-[#080707]">Disable Animation</span>
          <label className="inline-flex items-center cursor-pointer">
            <input type="checkbox" className="sr-only peer" />
            <div className="w-10 h-5 bg-[#EEF3FF] rounded-full peer peer-checked:bg-[#0066FF] transition"></div>
            <div className="dot absolute left-1 top-1 bg-white w-3 h-3 rounded-full transition peer-checked:translate-x-5"></div>
          </label>
        </div>
        <div className="text-xs text-[#8D8D8D]">Turn off all interface animation for interface performance</div>
      </div>
    </section>
  );
}
