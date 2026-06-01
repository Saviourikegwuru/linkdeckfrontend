import React from "react";

export default function SecurityPage() {
  return (
    <section className="mx-auto w-full max-w-[980px]">
      <header className="mb-5">
        <h2 className="text-[32px] font-bold leading-tight text-[#080707]">Security</h2>
        <p className="mt-1 text-sm text-[#8D8D8D]">Protect your account and sign-in activity</p>
      </header>

      <div className="space-y-4">
        <div className="rounded-xl border border-[#EDEDED] bg-white p-5">
          <h3 className="text-sm font-semibold text-[#080707]">Two-Factor Authentication</h3>
          <p className="mt-1 text-xs text-[#8D8D8D]">Add an extra layer of security when signing in.</p>
          <button type="button" className="mt-3 rounded-lg bg-[#0066FF] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#005ae0]">
            Enable 2FA
          </button>
        </div>

        <div className="rounded-xl border border-[#EDEDED] bg-white p-5">
          <h3 className="text-sm font-semibold text-[#080707]">Active Sessions</h3>
          <div className="mt-3 rounded-lg border border-[#EDEDED] bg-[#F8F9FA] px-4 py-3 text-sm text-[#080707]">
            macOS • Chrome • Lagos, NG • Active now
          </div>
          <button type="button" className="mt-3 rounded-lg border border-[#EDEDED] px-4 py-2 text-sm font-semibold text-[#080707] transition hover:bg-[#F4F7FF]">
            Sign out of all other devices
          </button>
        </div>
      </div>
    </section>
  );
}
