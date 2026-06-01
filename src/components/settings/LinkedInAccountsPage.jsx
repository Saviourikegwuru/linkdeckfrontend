import { useState, useEffect } from "react";
import SettingsOptionMenu from "./SettingsOptionMenu";
import { useWorkspace } from "../../context/WorkspaceContext";
import { getAccountsHealth } from "../../services/accounts";
import ToastAlert from "../ToastAlert";
import { useToast } from "../toast";
import { ApiError } from "../../services/api";

function StatusBadge({ status }) {
  const map = {
    expired:       { dot: "bg-[#EF4444]", text: "text-[#EF4444]", label: "Token expired" },
    expiring_soon: { dot: "bg-[#F59E0B]", text: "text-[#F59E0B]", label: "Expiring soon" },
    active:        { dot: "bg-[#10B981]", text: "text-[#10B981]", label: "Active" },
  };
  const s = map[status] || map.active;
  return (
    <span className="flex items-center gap-1.5">
      <span className={`h-2 w-2 rounded-full ${s.dot}`} />
      <span className={`text-xs font-semibold ${s.text}`}>{s.label}</span>
    </span>
  );
}

function ExpiryInfo({ expiresInDays, expiresAt }) {
  if (expiresInDays === null) return null;
  if (expiresInDays < 0) {
    return <p className="text-[11px] text-[#EF4444]">Expired — reconnect to restore access</p>;
  }
  if (expiresInDays <= 7) {
    return <p className="text-[11px] text-[#F59E0B]">Expires in {expiresInDays} day{expiresInDays !== 1 ? "s" : ""}</p>;
  }
  const date = expiresAt ? new Date(expiresAt).toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" }) : null;
  return date ? <p className="text-[11px] text-[#ABABAB]">Valid until {date}</p> : null;
}

export default function LinkedInAccountsPage() {
  const { accounts, profiles, activeAccount, switchAccount, deleteProfile, isWorkspaceLoading } = useWorkspace();
  const { toast, dismissToast, showError, showSuccess } = useToast();
  const [menuIdx, setMenuIdx] = useState(null);
  const [isSwitchingId, setIsSwitchingId] = useState(null);
  const [isDeletingId, setIsDeletingId] = useState(null);
  const [healthMap, setHealthMap] = useState({});

  const mergedAccounts = accounts.length > 0 ? accounts : profiles;

  useEffect(() => {
    getAccountsHealth()
      .then((data) => {
        const map = {};
        for (const h of data?.health || []) {
          map[h.profileId] = h;
        }
        setHealthMap(map);
      })
      .catch(() => {});
  }, [mergedAccounts.length]);

  function getErrorMessage(error, fallback) {
    if (error instanceof ApiError) return error.data?.message || error.message || fallback;
    return error instanceof Error ? error.message : fallback;
  }

  return (
    <section className="w-full max-w-[980px]">
      <ToastAlert toast={toast} onClose={dismissToast} />

      <header className="flex items-start justify-between">
        <div>
          <h2 className="text-[32px] font-bold leading-tight text-[#080707]">LinkedIn Accounts</h2>
          <p className="mt-1 text-sm text-[#8D8D8D]">Manage connected profiles and switch account context</p>
        </div>
        <a
          href="/connect-linkedin"
          className="mt-2 rounded-lg bg-[#0066FF] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#005ae0]"
        >
          + Add Account
        </a>
      </header>

      {mergedAccounts.length === 0 && (
        <div className="mt-6 w-full rounded-xl border border-dashed border-[#D9D9D9] bg-white p-10 text-center">
          <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-[#EEF3FF]">
            <svg width="24" height="24" fill="none"><path d="M12 2a5 5 0 100 10A5 5 0 0012 2zM4 20a8 8 0 0116 0" stroke="#0066FF" strokeWidth="2" strokeLinecap="round"/></svg>
          </div>
          <p className="text-sm font-semibold text-[#080707]">No LinkedIn accounts connected yet</p>
          <p className="mt-1 text-sm text-[#8D8D8D]">Connect a profile to start monitoring content and publishing posts.</p>
          <a href="/connect-linkedin" className="mt-4 inline-block rounded-lg bg-[#0066FF] px-5 py-2 text-sm font-semibold text-white hover:bg-[#005ae0] transition">
            Connect LinkedIn
          </a>
        </div>
      )}

      <div className="mt-6 flex flex-wrap gap-4">
        {mergedAccounts.map((acc, i) => {
          const profileId = acc.profileId || acc.id;
          const health = healthMap[profileId];
          const tokenStatus = health?.status || (acc.status?.toLowerCase().includes("re-auth") ? "expired" : "active");
          const isActive = activeAccount?.profileId === profileId || activeAccount?.id === profileId || acc.isActive;
          const needsReconnect = tokenStatus === "expired";
          const delegates = acc.teamAccess || [];

          return (
            <div key={profileId || i} className="relative w-full max-w-[280px] rounded-xl border border-[#EDEDED] bg-white p-4 shadow-sm">
              {/* Header */}
              <div className="flex items-start gap-3 mb-3">
                {acc.avatar ? (
                  <img src={acc.avatar} alt={acc.name} className="h-11 w-11 rounded-full object-cover shrink-0" />
                ) : (
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#EEF3FF] text-sm font-bold text-[#0066FF] shrink-0">
                    {(acc.name || "L").charAt(0)}
                  </div>
                )}
                <div className="min-w-0 flex-1">
                  <p className="truncate font-semibold text-[#080707] text-sm leading-tight">{acc.name}</p>
                  <p className="truncate text-xs text-[#8D8D8D]">{acc.company}</p>
                </div>
                <button
                  className="ml-auto shrink-0 rounded p-1 hover:bg-[#EEF3FF] transition"
                  onClick={() => setMenuIdx(menuIdx === i ? null : i)}
                >
                  <svg width="18" height="18" fill="none">
                    <circle cx="3.5" cy="9" r="1.2" fill="#8D8D8D"/>
                    <circle cx="9" cy="9" r="1.2" fill="#8D8D8D"/>
                    <circle cx="14.5" cy="9" r="1.2" fill="#8D8D8D"/>
                  </svg>
                </button>
                {menuIdx === i && (
                  <SettingsOptionMenu
                    onClose={() => setMenuIdx(null)}
                    onDelete={async () => {
                      setMenuIdx(null);
                      if (!profileId) return;
                      setIsDeletingId(profileId);
                      try {
                        await deleteProfile(profileId);
                        showSuccess("Profile removed.", "LinkedIn account disconnected.");
                      } catch (error) {
                        showError("Unable to remove.", getErrorMessage(error, "Please try again."));
                      } finally {
                        setIsDeletingId(null);
                      }
                    }}
                  />
                )}
              </div>

              {/* Status + expiry */}
              <div className="mb-2 space-y-1">
                <div className="flex items-center justify-between">
                  <StatusBadge status={tokenStatus} />
                  {isActive && (
                    <span className="rounded-full bg-[#EEF3FF] px-2 py-0.5 text-[10px] font-semibold text-[#0066FF]">Active</span>
                  )}
                </div>
                <ExpiryInfo expiresInDays={health?.expiresInDays ?? null} expiresAt={health?.expiresAt} />
              </div>

              {/* Badge */}
              <div className="mb-3">
                <span className="rounded-full bg-[#F4F7FF] px-2.5 py-1 text-xs font-semibold text-[#0066FF]">
                  {acc.badgeLabel || "LinkedIn account"}
                </span>
              </div>

              {/* Delegates */}
              <div className="mb-4">
                <p className="mb-1 text-[11px] text-[#8D8D8D]">Delegated to</p>
                {delegates.length === 0 ? (
                  <span className="text-xs text-[#ABABAB]">No delegates</span>
                ) : (
                  <div className="flex flex-wrap gap-1">
                    {delegates.map((d, idx) => (
                      <span key={idx} className="rounded-full bg-[#EEF3FF] px-2 py-0.5 text-xs font-bold text-[#0066FF]">
                        {typeof d === "string" ? d.slice(0, 2).toUpperCase() : (d.teamName || "?").slice(0, 2).toUpperCase()}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Reconnect or Switch */}
              {needsReconnect ? (
                <a
                  href="/connect-linkedin"
                  className="block w-full rounded-lg bg-[#EF4444] py-2 text-center text-sm font-semibold text-white hover:bg-[#DC2626] transition"
                >
                  Reconnect Account
                </a>
              ) : (
                <button
                  type="button"
                  disabled={isActive || isWorkspaceLoading || isSwitchingId === profileId || isDeletingId === profileId || !profileId}
                  onClick={async () => {
                    if (!profileId) return;
                    setIsSwitchingId(profileId);
                    try {
                      await switchAccount(profileId);
                      showSuccess("Account switched.", `Now working as ${acc.name}.`);
                    } catch (error) {
                      showError("Unable to switch.", getErrorMessage(error, "Please try again."));
                    } finally {
                      setIsSwitchingId(null);
                    }
                  }}
                  className="w-full rounded-lg border border-[#0066FF] py-2 text-sm font-semibold text-[#0066FF] transition hover:bg-[#EEF3FF] disabled:cursor-not-allowed disabled:border-[#D9D9D9] disabled:text-[#ABABAB]"
                >
                  {isActive
                    ? "Current active account"
                    : isSwitchingId === profileId
                    ? "Switching…"
                    : "Switch to this account"}
                </button>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
