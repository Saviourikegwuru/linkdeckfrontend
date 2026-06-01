import { Link } from "react-router-dom";
import TopNav from "./components/TopNav";
import SiteFooter from "./components/SiteFooter";

export default function NotFoundPage() {
  return (
    <main className="relative mx-auto flex min-h-screen w-full max-w-[1728px] flex-col overflow-hidden bg-[#F8F9FA] text-[#080707]">
      {/* Background blob — mirrors the homepage */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div
          className="absolute left-[-24%] top-[30%] h-[1160px] w-[1280px] -translate-y-1/2 rounded-full blur-2xl"
          style={{
            opacity: 0.14,
            background:
              "radial-gradient(circle, rgba(255,149,0,0.82) 0%, rgba(255,149,0,0.62) 24%, rgba(0,102,255,0.9) 62%, rgba(0,102,255,1) 100%)",
          }}
        />
      </div>

      <TopNav />

      <section className="relative z-10 flex flex-1 flex-col items-center justify-center px-4 py-24 text-center sm:px-6">
        <p className="text-[15px] font-semibold uppercase tracking-widest text-[#0066FF]">
          404
        </p>
        <h1 className="mx-auto mt-5 max-w-2xl text-[34px] font-bold leading-[1.08] text-[#080707] sm:text-[44px] lg:text-[54px]">
          This page doesn't exist.
        </h1>
        <p className="mx-auto mt-6 max-w-md text-base font-medium leading-relaxed text-[#8D8D8D] sm:text-[18px]">
          The link you followed may be broken, or the page may have been removed.
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
          <Link
            to="/"
            className="w-full rounded-xl bg-[#0066FF] px-8 py-3 text-center text-base font-semibold text-white transition hover:bg-[#005ae0] sm:w-auto sm:min-w-48 sm:text-lg"
          >
            Back to Home
          </Link>
          <Link
            to="/signup"
            className="w-full rounded-xl border border-[#0066FF] bg-transparent px-8 py-3 text-base font-semibold text-[#0066FF] transition hover:bg-[#e9f1ff] sm:w-auto sm:min-w-48 sm:text-lg"
          >
            Get Started
          </Link>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
