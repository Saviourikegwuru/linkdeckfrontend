import { BrowserRouter, Routes, Route } from "react-router-dom";
import heroPreview from "./assets/hero-preview.svg";
import SignupPage from "./SignupPage";
import ConnectLinkedinPage from "./ConnectLinkedinPage";
import LoginPage from "./LoginPage";
import ForgotPasswordPage from "./ForgotPasswordPage";
import ResetPasswordPage from "./ResetPasswordPage";
import PricingPage from "./PricingPage";
import ContactUsPage from "./ContactUsPage";
import NotFoundPage from "./NotFoundPage";
import DashboardPage from "./DashboardPage";
import TeamPage from "./TeamPage";
import AnalyticsPage from "./AnalyticsPage";
import SettingsPage from "./SettingsPage";
import InboxPage from "./InboxPage";
import TopNav from "./components/TopNav";
import SiteFooter from "./components/SiteFooter";
import { ProtectedRoute, PublicOnlyRoute } from "./components/auth/ProtectedRoute";

function HomePage() {
  return (
    <main className="relative mx-auto min-h-screen w-full max-w-[1728px] overflow-hidden bg-[#F8F9FA] text-[#080707] lg:min-h-[2030px]">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div
          className="absolute left-[-24%] top-[30%] h-[1160px] w-[1280px] -translate-y-1/2 rounded-full blur-2xl"
          style={{
            opacity: 0.14,
            background:
              "radial-gradient(circle, rgba(255,149,0,0.82) 0%, rgba(255,149,0,0.62) 24%, rgba(0,102,255,0.9) 62%, rgba(0,102,255,1) 100%)"
          }}
        />
      </div>

      <TopNav />

      <section id="features" className="relative z-10 px-4 pb-28 pt-20 sm:px-6 sm:pb-32 sm:pt-24 lg:pt-28">
        <div className="mx-auto max-w-5xl text-center">
          <p className="mx-auto max-w-3xl text-center text-[18px] font-normal leading-none text-[#8D8D8D]">
            Your LinkedIn Command Center.
          </p>
          <h1 className="mx-auto mt-8 max-w-4xl text-center text-[34px] font-bold leading-[1.08] text-[#080707] sm:mt-10 sm:text-[44px] lg:text-[54px]">
            A powerful, real-time tool for Creators, Marketers and Sales people who live on LinkedIn.
          </h1>
          <p className="mx-auto mt-8 max-w-4xl text-center text-base font-medium leading-[1.25] text-[#8D8D8D] sm:mt-10 sm:text-[20px]">
            Monitor multiple timelines on a single screen. Track and organize content, and engage with Prospects and
            your communities in real-time.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:mt-12 sm:flex-row sm:gap-4">
            <a
              href="/signup"
              className="w-full rounded-xl bg-[#0066FF] px-8 py-3 text-center text-base font-semibold text-white transition hover:bg-[#005ae0] sm:w-auto sm:min-w-48 sm:text-lg"
            >
              Get Started
            </a>
            <button
              type="button"
              className="w-full rounded-xl border border-[#0066FF] bg-transparent px-8 py-3 text-base font-semibold text-[#0066FF] transition hover:bg-[#e9f1ff] sm:w-auto sm:min-w-48 sm:text-lg"
            >
              See it in Action
            </button>
          </div>
        </div>

        <div className="mx-auto mt-14 w-full max-w-[886px] rounded-[12px] border border-[#EDEDED] bg-white/45 p-2 shadow-[0_10px_40px_rgba(8,7,7,0.08)] backdrop-blur-[6px] sm:mt-16">
          <img
            src={heroPreview}
            alt="Linkdeck workspace preview"
            className="h-auto w-full rounded-[12px]"
            style={{ maxWidth: "886px", maxHeight: "401px" }}
          />
        </div>

        <p className="mt-14 text-center text-base font-semibold leading-[1.2] text-[#8D8D8D] sm:mt-16 sm:text-[17px]">
          Work LinkedIn Like a System — Not a Feed.
        </p>
      </section>

      <SiteFooter />
    </main>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/signup"
          element={
            <PublicOnlyRoute>
              <SignupPage />
            </PublicOnlyRoute>
          }
        />
        <Route
          path="/login"
          element={
            <PublicOnlyRoute>
              <LoginPage />
            </PublicOnlyRoute>
          }
        />
        <Route
          path="/forgot-password"
          element={
            <PublicOnlyRoute>
              <ForgotPasswordPage />
            </PublicOnlyRoute>
          }
        />
        <Route
          path="/reset-password"
          element={
            <PublicOnlyRoute>
              <ResetPasswordPage />
            </PublicOnlyRoute>
          }
        />
        <Route path="/pricing" element={<PricingPage />} />
        <Route path="/contact-us" element={<ContactUsPage />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/connect-linkedin" element={<ConnectLinkedinPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/team" element={<TeamPage />} />
          <Route path="/analytics" element={<AnalyticsPage />} />
          <Route path="/inbox" element={<InboxPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/settings/:section" element={<SettingsPage />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}
