import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "./assets/logo.svg";
import whiskShape from "./assets/signup-whisk.svg";
import ToastAlert from "./components/ToastAlert";
import { useToast } from "./components/toast";
import { ApiError } from "./services/api";
import { useAuth } from "./context/AuthContext";

function InboxModal({ email, onClose, onResend, isResending }) {
  return (
    <div className="absolute inset-0 z-30 flex items-center justify-center bg-[rgba(8,7,7,0.28)] backdrop-blur-[6px] px-4">
      <div className="w-full max-w-[660px] rounded-2xl bg-[#F1F2F4] px-8 py-10 text-center shadow-[0_20px_55px_rgba(8,7,7,0.25)]">
        <h3 className="text-4xl font-bold leading-none text-[#080707]">Check your inbox</h3>
        <p className="mx-auto mt-5 max-w-[440px] text-base leading-snug text-[#8D8D8D]">
          We sent a password reset link to {email}.
          <br />
          Didn&apos;t get it? Check spam or try again in a minute.
        </p>

        <button
          type="button"
          onClick={onResend}
          disabled={isResending}
          className="mx-auto mt-8 block w-full max-w-[520px] rounded-xl bg-[#0066FF] px-6 py-3 text-2xl font-semibold text-white transition hover:bg-[#005ae0]"
        >
          {isResending ? "Resending..." : "Resend email"}
        </button>

        <button
          type="button"
          onClick={onClose}
          className="mt-5 text-xl font-medium text-[#FF9500] transition hover:opacity-80"
        >
          Back to sign in
        </button>
      </div>
    </div>
  );
}

export default function ForgotPasswordPage() {
  const navigate = useNavigate();
  const { forgotPassword } = useAuth();
  const { toast, dismissToast, showError, showSuccess } = useToast();
  const [email, setEmail] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isResending, setIsResending] = useState(false);

  function getErrorMessage(error, fallback) {
    if (error instanceof ApiError) {
      return error.data?.message || error.message || fallback;
    }

    return error instanceof Error ? error.message : fallback;
  }

  async function sendResetLink({ asResend = false } = {}) {
    if (!email.trim()) {
      showError("Email is required.", "Enter the email tied to your account.");
      return;
    }

    const setLoading = asResend ? setIsResending : setIsSubmitting;
    setLoading(true);

    try {
      await forgotPassword({ email: email.trim() });
      setShowModal(true);
      showSuccess(asResend ? "Reset email resent." : "Reset email sent.", "Check your inbox for the link.");
    } catch (error) {
      showError("Unable to send reset link.", getErrorMessage(error, "Please try again."));
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="relative min-h-screen bg-[#F1F2F4]">
      <ToastAlert toast={toast} onClose={dismissToast} />
      <header className="border-b border-[#EDEDED] bg-[#FFFFFF7A] backdrop-blur-[24px]">
        <nav className="mx-auto flex h-[62px] w-full items-center justify-between px-4 py-[18px] sm:px-8 lg:px-[72px]">
          <a href="/" className="inline-flex items-center">
            <img src={logo} alt="Linkdeck" className="h-8 w-auto sm:h-10" />
          </a>
        </nav>
      </header>

      <section className="grid min-h-[calc(100vh-62px)] w-full lg:grid-cols-2">
        <div className="bg-[#0066FF] px-6 py-10 sm:px-10 md:px-14 md:py-14">
          <div className="mx-auto max-w-[760px]">
            <div className="border border-[#D9E1F8] bg-[#F6F8FF]">
              <img src={whiskShape} alt="Linkdeck onboarding preview" className="h-auto w-full object-contain" />
            </div>
            <h2 className="mt-8 text-[32px] font-semibold leading-none text-white lg:text-[42px]">Start working LinkedIn like a system</h2>
            <p className="mt-4 text-[15px] font-normal leading-none text-[#EAF2FF]">
              Get set up fast-then connect LinkedIn to start monitoring, posting, and measuring in one workspace.
            </p>
          </div>
        </div>

        <div className="bg-transparent px-6 py-10 sm:px-10 md:px-16 md:py-14 lg:px-20">
          <div className="mx-auto w-full max-w-[640px]">
            <h1 className="text-2xl font-bold leading-[1.05] text-[#080707] sm:text-2xl lg:text-[30px]">Forgot your password?</h1>
            <p className="mt-3 text-sm font-normal leading-relaxed text-[#8D8D8D] sm:text-base">
              Enter the email you use for LinkDeck. We&apos;ll send you a reset link.
            </p>

            <form
              className="mt-10 space-y-6"
              onSubmit={async (event) => {
                event.preventDefault();
                await sendResetLink();
              }}
            >
              <label className="block">
                <span className="mb-2 block text-sm font-medium text-[#080707]">Email Address</span>
                <input
                  type="email"
                  placeholder="name@company.com"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  autoComplete="email"
                  className="w-full rounded-xl border border-[#D9D9D9] bg-white px-4 py-2.5 text-sm outline-none transition focus:border-[#0066FF] focus:ring-2 focus:ring-[#0066FF]/20"
                />
              </label>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full rounded-xl bg-[#0066FF] px-6 py-3 text-base font-semibold text-white transition hover:bg-[#005ae0]"
              >
                {isSubmitting ? "Sending..." : "Send reset link"}
              </button>
            </form>

            <p className="mt-4 text-center text-sm text-[#FF9500]">
              <a href="/login" className="font-medium">
                Back to sign in
              </a>
            </p>
          </div>
        </div>
      </section>

      {showModal ? (
        <InboxModal
          email={email}
          isResending={isResending}
          onResend={() => sendResetLink({ asResend: true })}
          onClose={() => navigate("/login")}
        />
      ) : null}
    </main>
  );
}
