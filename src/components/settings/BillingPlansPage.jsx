import React from "react";

export default function BillingPlansPage() {
  return (
    <section className="mx-auto w-full max-w-[980px]">
      <header className="mb-5">
        <h2 className="text-[32px] font-bold leading-tight text-[#080707]">Billing and plans</h2>
        <p className="mt-1 text-sm text-[#8D8D8D]">Review your current subscription and payment method</p>
      </header>

      <div className="space-y-4">
        <div className="rounded-xl border border-[#D6E4FF] bg-[#EEF3FF] p-5">
          <h3 className="text-sm font-semibold text-[#0066FF]">Current Plan: Pro</h3>
          <p className="mt-1 text-xs text-[#0066FF]">Next renewal: April 10, 2026</p>
          <div className="mt-3 flex gap-2">
            <button type="button" className="rounded-lg bg-[#0066FF] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#005ae0]">
              Manage Plan
            </button>
            <button type="button" className="rounded-lg border border-[#0066FF] bg-white px-4 py-2 text-sm font-semibold text-[#0066FF] transition hover:bg-[#F4F7FF]">
              View Invoices
            </button>
          </div>
        </div>

        <div className="rounded-xl border border-[#EDEDED] bg-white p-5">
          <h3 className="text-sm font-semibold text-[#080707]">Payment Method</h3>
          <p className="mt-1 text-xs text-[#8D8D8D]">Visa ending in 1294</p>
          <button type="button" className="mt-3 rounded-lg border border-[#EDEDED] px-4 py-2 text-sm font-semibold text-[#080707] transition hover:bg-[#F4F7FF]">
            Update Card
          </button>
        </div>
      </div>
    </section>
  );
}
