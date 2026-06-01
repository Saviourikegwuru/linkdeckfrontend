import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "./assets/logo.svg";
import googleIcon from "./assets/google-icon.svg";
import linkedinIcon from "./assets/linkedin-icon.svg";
import whiskShape from "./assets/signup-whisk.svg";
import ToastAlert from "./components/ToastAlert";
import { useToast } from "./components/toast";
import { ApiError } from "./services/api";
import { useAuth } from "./context/AuthContext";

function SocialButton({ icon, label, href, onClick, disabled = false }) {
  const classes =
    "flex w-full items-center justify-center gap-3 rounded-xl border border-[#D9D9D9] bg-white px-4 py-2.5 text-sm font-medium text-[#080707] transition hover:border-[#0066FF]/35 hover:bg-[#f7faff] disabled:cursor-not-allowed disabled:opacity-60";

  if (href) {
    return (
      <a href={href} className={classes}>
        <img src={icon} alt="" className="h-5 w-5" />
        <span>{label}</span>
      </a>
    );
  }

  return (
    <button
      type="button"
      className={classes}
      onClick={onClick}
      disabled={disabled}
    >
      <img src={icon} alt="" className="h-5 w-5" />
      <span>{label}</span>
    </button>
  );
}

export default function SignupPage() {
  const navigate = useNavigate();
  const { signUp, startGoogleAuth, startLinkedInAuth } = useAuth();
  const { toast, dismissToast, showError, showSuccess } = useToast();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [nameError, setNameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [oauthLoading, setOauthLoading] = useState("");

  function getErrorMessage(error, fallback) {
    if (error instanceof ApiError) {
      return error.data?.message || error.message || fallback;
    }

    return error instanceof Error ? error.message : fallback;
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    setEmailError("");
    setNameError("");
    setPasswordError("");

    if (!name.trim()) {
      setNameError("Name is required.");
      showError("Missing information.", "Add your name to create your account.");
      return;
    }

    if (!email.trim()) {
      setEmailError("Email is required.");
      showError("Missing information.", "Add an email address to continue.");
      return;
    }

    if (!password.trim() || !confirmPassword.trim()) {
      setPasswordError("Password and confirmation are required.");
      showError("Missing information.", "Enter and confirm your password.");
      return;
    }

    if (password.length < 8) {
      setPasswordError("Password must be at least 8 characters.");
      showError("Password is too short.", "Use at least 8 characters.");
      return;
    }

    if (password !== confirmPassword) {
      setPasswordError("Passwords do not match.");
      showError("Password mismatch.", "Make sure both password fields match.");
      return;
    }

    setIsSubmitting(true);

    try {
      await signUp({
        name: name.trim(),
        email: email.trim(),
        password,
      });
      showSuccess("Account created.", "Let’s connect your LinkedIn profile next.");
      navigate("/connect-linkedin", { replace: true });
    } catch (error) {
      const message = getErrorMessage(error, "Please try again.");
      if (message.toLowerCase().includes("email")) {
        setEmailError(message);
      }
      showError("Unable to create account.", message);
    } finally {
      setIsSubmitting(false);
    }
  };

  async function handleSocialSignup(provider) {
    setOauthLoading(provider);

    try {
      if (provider === "linkedin") {
        await startLinkedInAuth();
        return;
      }

      await startGoogleAuth();
    } catch (error) {
      showError("Unable to continue.", getErrorMessage(error, "Please try again in a moment."));
      setOauthLoading("");
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
            <img src={whiskShape} alt="" aria-hidden="true" className="hidden" />
            <h2 className="mt-8 text-[32px] font-semibold leading-none text-white lg:text-[42px]">Start working LinkedIn like a system</h2>
            <p className="mt-4 text-[15px] font-normal leading-none text-[#EAF2FF]">
              Get set up fast-then connect LinkedIn to start monitoring, posting, and measuring in one workspace.
            </p>
          </div>
        </div>

        <div className="bg-transparent px-6 py-10 sm:px-10 md:px-16 md:py-14 lg:px-20">
          <div className="mx-auto w-full max-w-[640px]">
            <h1 className="text-2xl font-bold leading-[1.05] text-[#080707] sm:text-2xl lg:text-[30px]">Create your LinkDeck account</h1>
            <p className="mt-3 text-sm font-normal leading-relaxed text-[#8D8D8D] sm:text-base">
              Sign up in seconds. You&apos;ll connect LinkedIn before you can start using Streams.
            </p>

            <div className="mt-10 space-y-4">
              <SocialButton
                icon={linkedinIcon}
                label={oauthLoading === "linkedin" ? "Redirecting..." : "Continue with LinkedIn"}
                onClick={() => handleSocialSignup("linkedin")}
                disabled={Boolean(oauthLoading) || isSubmitting}
              />
              <SocialButton
                icon={googleIcon}
                label={oauthLoading === "google" ? "Redirecting..." : "Continue with Google"}
                onClick={() => handleSocialSignup("google")}
                disabled={Boolean(oauthLoading) || isSubmitting}
              />
            </div>

            <div className="my-8 flex items-center gap-3">
              <div className="h-px flex-1 bg-[#D9D9D9]" />
              <span className="text-xs text-[#8D8D8D] sm:text-sm">Or continue with Email</span>
              <div className="h-px flex-1 bg-[#D9D9D9]" />
            </div>

            <form
              className="space-y-4"
              onSubmit={handleSubmit}
            >
              <label className="block">
                <span className="mb-2 block text-sm font-medium text-[#080707]">Full Name</span>
                <input
                  type="text"
                  placeholder="Enter your full name"
                  value={name}
                  onChange={(event) => {
                    setName(event.target.value);
                    if (nameError) setNameError("");
                  }}
                  autoComplete="name"
                  className={`w-full rounded-xl border bg-white px-4 py-2.5 text-sm outline-none transition focus:ring-2 ${
                    nameError
                      ? "border-[#FF3B3B] focus:border-[#FF3B3B] focus:ring-[#FF3B3B]/20"
                      : "border-[#D9D9D9] focus:border-[#0066FF] focus:ring-[#0066FF]/20"
                  }`}
                />
                {nameError ? <span className="mt-2 block text-xs text-[#FF3B3B]">{nameError}</span> : null}
              </label>

              <label className="block">
                <span className="mb-2 block text-sm font-medium text-[#080707]">Email Address</span>
                <input
                  type="email"
                  placeholder="Enter Email"
                  value={email}
                  onChange={(event) => {
                    setEmail(event.target.value);
                    if (emailError) setEmailError("");
                  }}
                  autoComplete="email"
                  className={`w-full rounded-xl border bg-white px-4 py-2.5 text-sm outline-none transition focus:ring-2 ${
                    emailError
                      ? "border-[#FF3B3B] focus:border-[#FF3B3B] focus:ring-[#FF3B3B]/20"
                      : "border-[#D9D9D9] focus:border-[#0066FF] focus:ring-[#0066FF]/20"
                  }`}
                />
                {emailError ? (
                  <span className="mt-2 block text-xs text-[#FF3B3B]">{emailError}</span>
                ) : (
                  <span className="mt-2 block text-xs text-[#8D8D8D]">Use the email you want to manage LinkDeck with.</span>
                )}
              </label>

              <label className="block">
                <span className="mb-2 block text-sm font-medium text-[#080707]">Create Password</span>
                <input
                  type="password"
                  placeholder="********"
                  value={password}
                  onChange={(event) => {
                    setPassword(event.target.value);
                    if (passwordError) setPasswordError("");
                  }}
                  autoComplete="new-password"
                  className={`w-full rounded-xl border bg-white px-4 py-2.5 text-sm outline-none transition focus:ring-2 ${
                    passwordError
                      ? "border-[#FF3B3B] focus:border-[#FF3B3B] focus:ring-[#FF3B3B]/20"
                      : "border-[#D9D9D9] focus:border-[#0066FF] focus:ring-[#0066FF]/20"
                  }`}
                />
                <span className="mt-2 block text-xs text-[#8D8D8D]">Minimum 8 characters include at least one number</span>
              </label>

              <label className="block">
                <span className="mb-2 block text-sm font-medium text-[#080707]">Confirm Password</span>
                <input
                  type="password"
                  placeholder="********"
                  value={confirmPassword}
                  onChange={(event) => {
                    setConfirmPassword(event.target.value);
                    if (passwordError) setPasswordError("");
                  }}
                  autoComplete="new-password"
                  className={`w-full rounded-xl border bg-white px-4 py-2.5 text-sm outline-none transition focus:ring-2 ${
                    passwordError
                      ? "border-[#FF3B3B] focus:border-[#FF3B3B] focus:ring-[#FF3B3B]/20"
                      : "border-[#D9D9D9] focus:border-[#0066FF] focus:ring-[#0066FF]/20"
                  }`}
                />
                {passwordError ? <span className="mt-2 block text-xs text-[#FF3B3B]">{passwordError}</span> : null}
              </label>

              <label className="flex items-start gap-2.5 pt-1 text-xs text-[#080707] sm:text-sm">
                <input type="checkbox" className="mt-1 h-4 w-4 rounded border-[#D9D9D9] text-[#0066FF]" />
                <span>By creating an account, you agree to our Terms and Privacy Policy.</span>
              </label>

              <button
                type="submit"
                disabled={isSubmitting || Boolean(oauthLoading)}
                className="mt-5 w-full rounded-xl bg-[#0066FF] px-6 py-3 text-base font-semibold text-white transition hover:bg-[#005ae0] disabled:cursor-not-allowed disabled:bg-[#A9C0E0]"
              >
                {isSubmitting ? "Creating Account..." : "Create Account"}
              </button>
            </form>

            <p className="mt-4 text-center text-sm text-[#8D8D8D]">
              Already have an account?{" "}
              <a href="/login" className="font-semibold text-[#FF9500]">
                Sign In
              </a>
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
