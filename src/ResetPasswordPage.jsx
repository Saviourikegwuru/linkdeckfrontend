import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import logo from "./assets/logo.svg";
import whiskShape from "./assets/signup-whisk.svg";
import ToastAlert from "./components/ToastAlert";
import { useToast } from "./components/toast";
import { ApiError } from "./services/api";
import { resetPassword } from "./services/auth";

export default function ResetPasswordPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token") || "";
  const { toast, dismissToast, showError, showSuccess } = useToast();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  function getErrorMessage(error, fallback) {
    if (error instanceof ApiError) {
      return error.data?.message || error.message || fallback;
    }

    return error instanceof Error ? error.message : fallback;
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (!token) {
      showError("Missing reset token.", "Open this page from the password reset link in your email.");
      return;
    }

    if (!password.trim() || !confirmPassword.trim()) {
      showError("Missing information.", "Enter and confirm your new password.");
      return;
    }

    if (password.length < 8) {
      showError("Password is too short.", "Use at least 8 characters.");
      return;
    }

    if (password !== confirmPassword) {
      showError("Password mismatch.", "Make sure both password fields match.");
      return;
    }

    setIsSubmitting(true);

    try {
      await resetPassword({ token, password });
      showSuccess("Password updated.", "You can sign in with your new password now.");
      window.setTimeout(() => {
        navigate("/login", { replace: true });
      }, 900);
    } catch (error) {
      showError("Unable to reset password.", getErrorMessage(error, "Please try again."));
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#F1F2F4]">
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
            <h2 className="mt-8 text-[32px] font-semibold leading-none text-white lg:text-[42px]">Set a new password</h2>
            <p className="mt-4 text-[15px] font-normal leading-none text-[#EAF2FF]">
              Choose a secure password to get back into your workspace.
            </p>
          </div>
        </div>

        <div className="bg-transparent px-6 py-10 sm:px-10 md:px-16 md:py-14 lg:px-20">
          <div className="mx-auto w-full max-w-[640px]">
            <h1 className="text-2xl font-bold leading-[1.05] text-[#080707] sm:text-2xl lg:text-[30px]">Reset your password</h1>
            <p className="mt-3 text-sm font-normal leading-relaxed text-[#8D8D8D] sm:text-base">
              Enter your new password below.
            </p>

            <form className="mt-10 space-y-6" onSubmit={handleSubmit}>
              <label className="block">
                <span className="mb-2 block text-sm font-medium text-[#080707]">New Password</span>
                <input
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  autoComplete="new-password"
                  className="w-full rounded-xl border border-[#D9D9D9] bg-white px-4 py-2.5 text-sm outline-none transition focus:border-[#0066FF] focus:ring-2 focus:ring-[#0066FF]/20"
                />
              </label>

              <label className="block">
                <span className="mb-2 block text-sm font-medium text-[#080707]">Confirm Password</span>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(event) => setConfirmPassword(event.target.value)}
                  autoComplete="new-password"
                  className="w-full rounded-xl border border-[#D9D9D9] bg-white px-4 py-2.5 text-sm outline-none transition focus:border-[#0066FF] focus:ring-2 focus:ring-[#0066FF]/20"
                />
              </label>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full rounded-xl bg-[#0066FF] px-6 py-3 text-base font-semibold text-white transition hover:bg-[#005ae0] disabled:cursor-not-allowed disabled:bg-[#A9C0E0]"
              >
                {isSubmitting ? "Updating..." : "Update password"}
              </button>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}
