import { useEffect, useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import logo from "./assets/logo.svg";
import frame7Background from "./assets/frame-7.svg";
import linkIcon from "./assets/link.svg";
import { useAuth } from "./context/AuthContext";
import { useWorkspace } from "./context/WorkspaceContext";
import ToastAlert from "./components/ToastAlert";
import { useToast } from "./components/toast";
import { ApiError } from "./services/api";

function CheckItem({ children }) {
  return (
    <li className="flex items-start gap-3 text-sm text-[#8D8D8D]">
      <span className="mt-0.5 inline-flex h-5 w-5 items-center justify-center rounded-md bg-[#0066FF] text-xs text-white">
        ✓
      </span>
      <span>{children}</span>
    </li>
  );
}

export default function ConnectLinkedinPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { user, logout } = useAuth();
  const { connectProfile, profiles, isWorkspaceLoading } = useWorkspace();
  const { toast, dismissToast, showError, showSuccess } = useToast();
  const [manualCode, setManualCode] = useState("");
  const [manualRedirectUri, setManualRedirectUri] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const codeFromQuery = searchParams.get("code") || "";
  const hasConnectedProfile = profiles.length > 0;

  const resolvedRedirectUri = useMemo(() => {
    if (typeof window === "undefined") return "";
    return `${window.location.origin}/connect-linkedin`;
  }, []);

  useEffect(() => {
    if (resolvedRedirectUri) {
      setManualRedirectUri(resolvedRedirectUri);
    }
  }, [resolvedRedirectUri]);

  function getErrorMessage(error, fallback) {
    if (error instanceof ApiError) {
      return error.data?.message || error.message || fallback;
    }

    return error instanceof Error ? error.message : fallback;
  }

  async function submitConnection({ code, redirectUri }) {
    if (!code.trim() || !redirectUri.trim()) {
      showError("Missing connection details.", "Provide the authorization code and redirect URI.");
      return;
    }

    setIsSubmitting(true);

    try {
      await connectProfile({
        code: code.trim(),
        redirectUri: redirectUri.trim(),
      });
      showSuccess("LinkedIn profile connected.", "Your workspace is ready.");
      navigate("/dashboard", { replace: true });
    } catch (error) {
      showError("Unable to connect profile.", getErrorMessage(error, "Please try again."));
    } finally {
      setIsSubmitting(false);
    }
  }

  useEffect(() => {
    if (!codeFromQuery || isSubmitting || hasConnectedProfile) return;
    submitConnection({ code: codeFromQuery, redirectUri: resolvedRedirectUri });
  }, [codeFromQuery, hasConnectedProfile, resolvedRedirectUri]);

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
        <div
          className="relative flex min-h-[360px] items-end bg-cover bg-center px-6 py-8 sm:px-10 md:px-14 md:py-12"
          style={{ backgroundImage: `url(${frame7Background})` }}
        >
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,7,7,0.28)_0%,rgba(8,7,7,0.52)_55%,rgba(8,7,7,0.62)_100%)]" />
          <div className="relative z-10 max-w-[520px] text-white">
            <img src={logo} alt="Linkdeck" className="h-9 w-auto brightness-0 invert" />
            <h2 className="mt-6 text-[42px] font-semibold leading-[1.04] sm:text-[48px]">Master your professional presence</h2>
            <p className="mt-4 text-[16px] leading-snug text-[#EDEDED]">
              Join over 10,000 professionals using linkDeck to automate networking and scale their personal brands
            </p>
          </div>
        </div>

        <div className="bg-transparent px-6 py-8 sm:px-10 md:px-14 md:py-12 lg:px-20">
          <div className="mx-auto flex h-full w-full max-w-[620px] flex-col">
            <div>
              <h1 className="text-[36px] font-bold leading-[1.05] text-[#080707]">Welcome to LinkDeck</h1>
              <p className="mt-4 text-[16px] leading-[1.35] text-[#8D8D8D]">
                {user?.email ? `You’re signed in as ${user.email}. ` : ""}
                To start managing your professional presence and monitoring your network, please link your account
              </p>

              <button
                type="button"
                onClick={() => navigate("/settings/linkedin")}
                className="mt-8 flex w-full items-center justify-center gap-2 rounded-xl bg-[#0066FF] px-6 py-3 text-lg font-semibold text-white transition hover:bg-[#005ae0]"
              >
                <img src={linkIcon} alt="" className="h-5 w-5" />
                <span>{hasConnectedProfile ? "Manage connected profiles" : "Open LinkedIn connections"}</span>
              </button>

              <div className="my-8 flex items-center gap-3">
                <div className="h-px flex-1 bg-[#D9D9D9]" />
                <span className="text-xs uppercase tracking-[0.06em] text-[#8D8D8D]">Secure Connection</span>
                <div className="h-px flex-1 bg-[#D9D9D9]" />
              </div>

              <ul className="space-y-5">
                <CheckItem>Linkedeck will never post without your permission or share your private data</CheckItem>
                <CheckItem>Unlock advanced analytics and relationship tracking immediately after syncing</CheckItem>
              </ul>

              {!hasConnectedProfile ? (
                <form
                  className="mt-8 space-y-4 rounded-2xl border border-[#EDEDED] bg-white px-5 py-5"
                  onSubmit={async (event) => {
                    event.preventDefault();
                    await submitConnection({ code: manualCode, redirectUri: manualRedirectUri });
                  }}
                >
                  <div>
                    <p className="text-sm font-semibold text-[#080707]">Complete profile connection</p>
                    <p className="mt-1 text-xs leading-relaxed text-[#8D8D8D]">
                      If LinkedIn sends you back with a `code`, we’ll finish automatically. You can also paste the code manually here.
                    </p>
                  </div>

                  <label className="block">
                    <span className="mb-2 block text-sm font-medium text-[#080707]">Authorization code</span>
                    <input
                      type="text"
                      value={manualCode}
                      onChange={(event) => setManualCode(event.target.value)}
                      className="w-full rounded-xl border border-[#D9D9D9] bg-white px-4 py-2.5 text-sm outline-none transition focus:border-[#0066FF] focus:ring-2 focus:ring-[#0066FF]/20"
                    />
                  </label>

                  <label className="block">
                    <span className="mb-2 block text-sm font-medium text-[#080707]">Redirect URI</span>
                    <input
                      type="text"
                      value={manualRedirectUri}
                      onChange={(event) => setManualRedirectUri(event.target.value)}
                      className="w-full rounded-xl border border-[#D9D9D9] bg-white px-4 py-2.5 text-sm outline-none transition focus:border-[#0066FF] focus:ring-2 focus:ring-[#0066FF]/20"
                    />
                  </label>

                  <button
                    type="submit"
                    disabled={isSubmitting || isWorkspaceLoading}
                    className="w-full rounded-xl bg-[#080707] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#1a1a1a] disabled:cursor-not-allowed disabled:bg-[#B5B5B5]"
                  >
                    {isSubmitting ? "Connecting..." : "Submit connection code"}
                  </button>
                </form>
              ) : null}

              <button
                type="button"
                onClick={logout}
                className="mt-6 text-sm font-semibold text-[#FF9500] transition hover:opacity-80"
              >
                Sign out
              </button>
            </div>

            <div className="mt-auto border-t border-[#E5E5E5] pt-6 text-sm text-[#8D8D8D]">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="text-[#080707]">© 2026 LinkDeck. All rights reserved.</p>
                  <p className="mt-4 text-[#080707]">
                    Need help?{" "}
                    <a href="#" className="font-semibold text-[#0066FF]">
                      Contact Support
                    </a>
                  </p>
                </div>
                <div className="space-y-2 text-right">
                  <p>Privacy Policy · Terms ·</p>
                  <p>Cookie Policy · Security</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
