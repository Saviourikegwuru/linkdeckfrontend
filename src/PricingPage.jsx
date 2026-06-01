import { useMemo, useState } from "react";
import flashIcon from "./assets/flash.svg";
import SiteFooter from "./components/SiteFooter";
import TopNav from "./components/TopNav";

const PLAN_ORDER = ["free", "basic", "pro", "premium"];

const PLANS = [
  {
    id: "free",
    name: "FREE",
    subtitle: "For getting started",
    monthlyPrice: 0,
    yearlyTotal: 0,
    yearlyEquivalent: 0,
    ctaLabel: "Start Now",
    features: ["1 Stream", "3 Columns", "Snapshot Analytics", "LinkedIn Account"],
    tagline: "Best for exploring the workflow.",
    accent: "neutral",
    highlighted: false
  },
  {
    id: "basic",
    name: "BASIC",
    subtitle: "For individual creators & sellers",
    monthlyPrice: 20,
    yearlyTotal: 192,
    yearlyEquivalent: 16,
    ctaLabel: "Get Basic",
    features: ["Up to 3 Streams", "Up to 6 Columns per stream", "Draft + Scheduling", "30 day Analytics"],
    tagline: "Most Popular (Solo)",
    accent: "blue",
    highlighted: false
  },
  {
    id: "pro",
    name: "PRO",
    subtitle: "For teams & agencies",
    monthlyPrice: 45,
    yearlyTotal: 456,
    yearlyEquivalent: 38,
    ctaLabel: "Get Pro",
    features: [
      "Up to 10 Streams",
      "Unlimited Columns",
      "Team roles (Admin/Editors)",
      "Delegated Access + Approval",
      "90 day + Team Analytics"
    ],
    tagline: "Best for Teams",
    accent: "blue",
    highlighted: true
  },
  {
    id: "premium",
    name: "PREMIUM",
    subtitle: "For scale and full visibility",
    monthlyPrice: 120,
    yearlyTotal: 1344,
    yearlyEquivalent: 112,
    ctaLabel: "Get Premium",
    features: [
      "Unlimited Streams",
      "Unlimited Columns",
      "Unlimited Accounts",
      "Unlimited Team Members",
      "Workspace Super Analytics",
      "Client Report + Scheduled Report"
    ],
    tagline: "All Features",
    accent: "orange",
    highlighted: false
  }
];

const FAQ_ITEMS = [
  {
    id: "start-free",
    question: "Can I start free?",
    answer: "Yes. The Free plan is available with no credit card and gives you the core workflow experience."
  },
  {
    id: "linkedin-connection",
    question: "Do I need LinkedIn connected?",
    answer: "Yes, connecting LinkedIn enables stream monitoring, posting, and analytics across your workspace."
  },
  {
    id: "change-plans",
    question: "Can I change plans later?",
    answer: "Absolutely. You can upgrade or downgrade at any time from your billing settings."
  },
  {
    id: "downgrade",
    question: "What happens if I downgrade?",
    answer: "Your account remains active. Features above your new plan limit are paused until you upgrade again."
  },
  {
    id: "teams",
    question: "Do you support teams?",
    answer: "Yes. Pro and Premium include collaboration, delegated access, and team-level analytics."
  },
  {
    id: "yearly-discount",
    question: "Is there a yearly discount?",
    answer: "Yes. Yearly billing includes a 25% discount compared to monthly billing."
  }
];

const COMPARISON_ROWS = [
  { feature: "Price Monthly", free: "$0", basic: "$20", pro: "$45", premium: "$120" },
  { feature: "Price Annually", free: "$0", basic: "$192", pro: "$456", premium: "$1,344" },
  { feature: "Stream Management", free: "1 Streams", basic: "3 Stream", pro: "10 Streams", premium: "Unlimited" },
  {
    feature: "Multi-Column Workspace",
    free: "3 Columns",
    basic: "6 Columns Per Stream",
    pro: "Unlimited Streams",
    premium: "Unlimited Streams"
  },
  { feature: "Real-Time LinkedIn Monitoring", free: "cross", basic: "check-muted", pro: "check", premium: "check-muted" },
  { feature: "Post Composer & Scedula", free: "cross", basic: "check-muted", pro: "check", premium: "check-muted" },
  { feature: "Advanced Post Analytics", free: "cross", basic: "check-muted", pro: "check", premium: "check" },
  { feature: "Real-Time Workspace Analytics", free: "cross", basic: "Limited Features", pro: "check", premium: "check" },
  { feature: "Real-Time Stream Analytics", free: "cross", basic: "cross", pro: "check", premium: "check" },
  { feature: "Real-Time Team Analytics", free: "cross", basic: "cross", pro: "Limited Team Members", premium: "check" },
  { feature: "Delegated Access", free: "cross", basic: "cross", pro: "check", premium: "check" },
  { feature: "Multi Account Management", free: "cross", basic: "cross", pro: "cross-blue", premium: "check" },
  { feature: "Export and Reporting", free: "cross", basic: "cross", pro: "check", premium: "check" },
  { feature: "User Experience", free: "check-muted", basic: "check-muted", pro: "check", premium: "check" }
];

function IconCell({ value }) {
  if (value === "check" || value === "check-muted") {
    return (
      <span
        className={`inline-flex h-6 w-6 items-center justify-center rounded-full border text-xs ${
          value === "check"
            ? "border-[#0066FF] text-[#0066FF]"
            : "border-[#8D8D8D] text-[#8D8D8D]"
        }`}
      >
        ✓
      </span>
    );
  }
  if (value === "cross" || value === "cross-blue") {
    return (
      <span
        className={`inline-flex h-6 w-6 items-center justify-center rounded-full border text-xs ${
          value === "cross-blue" ? "border-[#0066FF] text-[#0066FF]" : "border-[#8D8D8D] text-[#8D8D8D]"
        }`}
      >
        ✕
      </span>
    );
  }

  return <span>{value}</span>;
}

function PlanCard({ plan, cycle }) {
  const yearly = cycle === "yearly";
  const mainPrice = yearly ? plan.yearlyEquivalent : plan.monthlyPrice;
  const suffix = yearly ? "per year" : "per month";
  const secondaryLine = yearly ? "Once a year" : "Cancel anytime";

  const ctaClass =
    plan.id === "free"
      ? "rounded-xl border border-[#8D8D8D] bg-transparent px-6 py-2.5 text-sm font-medium text-[#8D8D8D]"
      : plan.accent === "orange"
      ? "rounded-xl bg-[#FF9500] px-6 py-2.5 text-sm font-medium text-black transition hover:opacity-90"
      : "rounded-xl bg-[#0066FF] px-6 py-2.5 text-sm font-medium text-white transition hover:bg-[#005ae0]";

  return (
    <article
      className={`relative flex h-[632px] w-full max-w-[320px] flex-col rounded-[24px] border bg-[#F8F9FA] ${
        plan.highlighted ? "border-[#0066FF]" : "border-[#EDEDED]"
      }`}
    >
      {plan.highlighted ? (
        <span className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#0066FF] px-5 py-1 text-xs font-semibold text-white">
          Most popular
        </span>
      ) : null}
      <div className="p-6">
        <p className="text-base font-semibold text-[#080707]">{plan.name}</p>
        <p className="mt-1 text-sm text-[#8D8D8D]">{plan.subtitle}</p>
        <div className="mt-3 flex items-end gap-2">
          {yearly && plan.id !== "free" ? (
            <span className="text-sm text-[#8D8D8D] line-through">${plan.monthlyPrice}</span>
          ) : null}
          <span className="text-[28px] font-semibold leading-none text-[#080707]">${mainPrice}</span>
          {plan.id !== "free" ? <span className="pb-1 text-xs text-[#8D8D8D]">{suffix}</span> : null}
        </div>
        <p className="mt-2 text-xs text-[#8D8D8D]">{secondaryLine}</p>
        <a href="/signup" className={`mt-5 inline-block ${ctaClass}`}>
          {plan.ctaLabel}
        </a>
      </div>
      <div className="border-t border-[#E0E0E0] px-6 pb-5 pt-6">
        <ul className="space-y-4">
          {plan.features.map((feature) => (
            <li key={feature} className="flex items-start gap-3 text-[12px] text-[#080707]">
              <span className="text-sm leading-none">✓</span>
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </div>
      <p className="mt-auto px-6 pb-8 text-[12px] font-medium text-[#0066FF]">{plan.tagline}</p>
    </article>
  );
}

export default function PricingPage() {
  const [billingCycle, setBillingCycle] = useState("monthly");
  const [openFaqIds, setOpenFaqIds] = useState(new Set());

  const orderedPlans = useMemo(
    () => PLAN_ORDER.map((id) => PLANS.find((plan) => plan.id === id)).filter(Boolean),
    []
  );

  const toggleFaq = (id) => {
    setOpenFaqIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <main className="relative mx-auto min-h-screen w-full max-w-[1728px] overflow-hidden bg-[#F8F9FA] text-[#080707]">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div
          className="absolute left-1/2 top-[280px] h-[900px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
          style={{
            opacity: 0.16,
            background:
              "radial-gradient(circle, rgba(255,149,0,0.8) 0%, rgba(255,149,0,0.55) 28%, rgba(0,102,255,0.85) 72%, rgba(0,102,255,0.95) 100%)"
          }}
        />
      </div>

      <TopNav active="pricing" />

      <section className="relative z-10 px-6 pb-24 pt-20 sm:px-10 lg:px-24">
        <div className="mx-auto max-w-[1320px]">
          <div className="text-center">
            <h1 className="text-xl font-semibold leading-tight text-[#080707] sm:text-2xl lg:text-3xl">
              Plans for every LinkDeck workflow
            </h1>
            <p className="mx-auto mt-5 max-w-[980px] text-xs text-[#080707] sm:text-sm">
              Find the right plan for your workflow - from focused solo use to full team operations.
            </p>
            <div className="mt-10 inline-flex rounded-full border border-[#D9D9D9] bg-[#EFEFEF] p-2">
              <button
                type="button"
                onClick={() => setBillingCycle("monthly")}
                className={`rounded-full px-7 py-2.5 text-xs transition sm:text-sm ${
                  billingCycle === "monthly" ? "bg-[#0066FF] text-white" : "text-[#8D8D8D]"
                }`}
              >
                Monthly
              </button>
              <button
                type="button"
                onClick={() => setBillingCycle("yearly")}
                className={`ml-2 inline-flex items-center gap-2 rounded-full px-6 py-2.5 text-xs transition sm:text-sm ${
                  billingCycle === "yearly" ? "bg-[#0066FF] text-white" : "text-[#8D8D8D]"
                }`}
              >
                <span>Yearly</span>
                <img src={flashIcon} alt="" className="h-5 w-5" />
                <span>25% off</span>
              </button>
            </div>
            <p className="mt-5 text-xs text-[#080707]">No credit card for Free • Cancel anytime</p>
          </div>

          <div className="mt-14 grid justify-items-center gap-6 lg:grid-cols-4">
            {orderedPlans.map((plan) => (
              <PlanCard key={plan.id} plan={plan} cycle={billingCycle} />
            ))}
          </div>

          <section className="mt-14 rounded-2xl bg-[#EDEDED] px-7 py-10 sm:px-10">
            <h2 className="text-center text-xl font-semibold leading-none text-[#080707] sm:text-2xl">
              Frequently Asked Questions
            </h2>
            <div className="mt-10 space-y-5">
              {FAQ_ITEMS.map((item) => {
                const open = openFaqIds.has(item.id);
                return (
                  <div key={item.id} className="rounded-2xl bg-[#F8F9FA]">
                    <button
                      type="button"
                      onClick={() => toggleFaq(item.id)}
                      className="flex w-full items-center justify-between px-5 py-4 text-left"
                    >
                      <span className="text-sm font-medium text-[#080707] sm:text-base">{item.question}</span>
                      <span className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-[#8D8D8D] text-[#8D8D8D]">
                        {open ? "−" : "+"}
                      </span>
                    </button>
                    {open ? <p className="px-5 pb-5 text-xs leading-snug text-[#8D8D8D]">{item.answer}</p> : null}
                  </div>
                );
              })}
            </div>
          </section>

          <section className="mt-20">
            <h2 className="text-center text-xl font-semibold leading-tight text-[#080707] sm:text-2xl">
              Compare Our Plans: Tailored for Every LinkedIn User
            </h2>
            <p className="mt-5 text-center text-xs text-[#8D8D8D]">
              Get the tools you need at every level-whether you&apos;re just starting out or scaling your LinkedIn efforts.
            </p>

            <div className="mt-8 hidden rounded-2xl border border-[#E0E0E0] bg-[#F8F9FA] p-4 lg:block">
              <div className="grid grid-cols-[1.4fr_repeat(4,1fr)] gap-3">
                <div className="rounded-xl bg-[#EFEFEF] px-4 py-4 text-xs font-semibold">Feature</div>
                {orderedPlans.map((plan) => (
                  <div
                    key={`head-${plan.id}`}
                    className={`rounded-xl px-4 py-4 text-center text-sm font-semibold ${
                      plan.id === "pro" ? "bg-[#8097D8] text-[#080707]" : "bg-[#EFEFEF]"
                    }`}
                  >
                    {plan.name === "FREE" ? "Free" : plan.name === "BASIC" ? "Basic" : plan.name === "PRO" ? "Pro" : "Premium"}
                  </div>
                ))}

                {COMPARISON_ROWS.map((row) => (
                  <div key={`row-${row.feature}`} className="contents">
                    <div key={`${row.feature}-feature`} className="border-b border-[#E0E0E0] px-4 py-5 text-xs text-[#080707]">
                      {row.feature}
                    </div>
                    {orderedPlans.map((plan) => {
                      let value = row[plan.id];
                      if (row.feature === "Price Monthly") value = `$${plan.monthlyPrice}`;
                      if (row.feature === "Price Annually") value = `$${plan.yearlyTotal.toLocaleString()}`;
                      return (
                        <div
                          key={`${row.feature}-${plan.id}`}
                          className={`border-b border-[#E0E0E0] px-4 py-5 text-center text-xs text-[#080707] ${
                            plan.id === "pro" ? "bg-[#CBD4E8]" : ""
                          }`}
                        >
                          <IconCell value={value} />
                        </div>
                      );
                    })}
                  </div>
                ))}
              </div>

              <div className="mt-4 grid grid-cols-[1.4fr_repeat(4,1fr)] gap-3">
                <div />
                {orderedPlans.map((plan) => (
                  <a
                    key={`cta-${plan.id}`}
                    href="/signup"
                    className={`rounded-xl border px-4 py-2.5 text-center text-sm font-medium transition ${
                      plan.id === "pro"
                        ? "border-[#0066FF] bg-[#0066FF] text-white hover:bg-[#005ae0]"
                        : "border-[#0066FF] text-[#0066FF] hover:bg-[#EAF2FF]"
                    }`}
                  >
                    {plan.id === "free" ? "Free Trial" : plan.ctaLabel}
                  </a>
                ))}
              </div>
            </div>

            <div className="mt-8 space-y-5 lg:hidden">
              {orderedPlans.map((plan) => (
                <article key={`mobile-${plan.id}`} className="rounded-2xl border border-[#E0E0E0] bg-[#F8F9FA] p-5">
                  <div className="flex items-center justify-between">
                    <h3 className="text-base font-semibold text-[#080707]">
                      {plan.name === "FREE" ? "Free" : plan.name === "BASIC" ? "Basic" : plan.name === "PRO" ? "Pro" : "Premium"}
                    </h3>
                    <span className="text-xs text-[#8D8D8D]">
                      {billingCycle === "yearly" ? `$${plan.yearlyTotal}` : `$${plan.monthlyPrice}`}
                    </span>
                  </div>
                  <ul className="mt-4 space-y-2">
                    {COMPARISON_ROWS.map((row) => {
                      let value = row[plan.id];
                      if (row.feature === "Price Monthly") value = `$${plan.monthlyPrice}`;
                      if (row.feature === "Price Annually") value = `$${plan.yearlyTotal.toLocaleString()}`;
                      return (
                        <li key={`${plan.id}-${row.feature}`} className="flex items-center justify-between gap-3 text-xs">
                          <span className="text-[#8D8D8D]">{row.feature}</span>
                          <span className="text-[#080707]">
                            <IconCell value={value} />
                          </span>
                        </li>
                      );
                    })}
                  </ul>
                  <a
                    href="/signup"
                    className={`mt-5 block rounded-xl border px-4 py-2.5 text-center text-sm font-medium transition ${
                      plan.id === "pro"
                        ? "border-[#0066FF] bg-[#0066FF] text-white hover:bg-[#005ae0]"
                        : "border-[#0066FF] text-[#0066FF] hover:bg-[#EAF2FF]"
                    }`}
                  >
                    {plan.id === "free" ? "Free Trial" : plan.ctaLabel}
                  </a>
                </article>
              ))}
            </div>
          </section>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
