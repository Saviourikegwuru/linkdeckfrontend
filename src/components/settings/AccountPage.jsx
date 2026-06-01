import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useWorkspace } from "../../context/WorkspaceContext";
import { changePassword } from "../../services/auth";
import { useToast } from "../toast";
import ToastAlert from "../ToastAlert";

function ChangePasswordModal({ onClose }) {
  const [form, setForm] = useState({ currentPassword: "", newPassword: "", confirmPassword: "" });
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");

  function field(key) {
    return (e) => setForm((prev) => ({ ...prev, [key]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (form.newPassword.length < 8) {
      setError("New password must be at least 8 characters.");
      return;
    }
    if (form.newPassword !== form.confirmPassword) {
      setError("New passwords do not match.");
      return;
    }

    setIsSaving(true);
    try {
      await changePassword({
        currentPassword: form.currentPassword,
        newPassword: form.newPassword,
      });
      onClose(true);
    } catch (err) {
      setError(err?.message || "Failed to change password. Please try again.");
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="relative w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
        <button
          type="button"
          onClick={() => onClose(false)}
          className="absolute right-4 top-4 text-[#8D8D8D] hover:text-[#080707] transition"
        >
          <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 5l10 10M15 5L5 15"/></svg>
        </button>

        <h3 className="text-lg font-bold text-[#080707] mb-1">Change Password</h3>
        <p className="text-sm text-[#8D8D8D] mb-5">Keep your account secure by using a strong, unique password.</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {[
            { key: "currentPassword", label: "Current Password", placeholder: "Your current password" },
            { key: "newPassword", label: "New Password", placeholder: "At least 8 characters" },
            { key: "confirmPassword", label: "Confirm New Password", placeholder: "Repeat new password" },
          ].map(({ key, label, placeholder }) => (
            <label key={key} className="block">
              <span className="mb-1 block text-xs font-semibold text-[#080707]">{label}</span>
              <input
                type="password"
                value={form[key]}
                onChange={field(key)}
                placeholder={placeholder}
                autoComplete={key === "currentPassword" ? "current-password" : "new-password"}
                required
                className="w-full rounded-lg border border-[#D9D9D9] bg-white px-3 py-2 text-sm outline-none transition focus:border-[#0066FF] focus:ring-2 focus:ring-[#0066FF]/20"
              />
            </label>
          ))}

          {error && (
            <p className="rounded-lg bg-[#FFF5F5] border border-[#FCD2D2] px-3 py-2 text-xs text-[#C81E1E]">{error}</p>
          )}

          <div className="flex gap-3 pt-1">
            <button
              type="button"
              onClick={() => onClose(false)}
              className="flex-1 rounded-lg border border-[#D9D9D9] py-2 text-sm font-semibold text-[#080707] hover:bg-[#F8F9FA] transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSaving}
              className="flex-1 rounded-lg bg-[#0066FF] py-2 text-sm font-semibold text-white hover:bg-[#005ae0] disabled:opacity-60 transition"
            >
              {isSaving ? "Saving…" : "Update Password"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function DeleteAccountSection() {
  const [confirming, setConfirming] = useState(false);

  return (
    <div className="rounded-xl border border-[#FCD2D2] bg-[#FFF5F5] p-5">
      <h3 className="text-sm font-semibold text-[#C81E1E]">Danger Zone</h3>
      <p className="mt-1 text-xs text-[#8D8D8D]">Once you delete your account, all data is permanently removed and cannot be recovered.</p>
      {confirming ? (
        <div className="mt-3 flex items-center gap-3">
          <span className="text-xs text-[#8D8D8D]">Are you sure?</span>
          <button
            type="button"
            onClick={() => setConfirming(false)}
            className="rounded-lg border border-[#D9D9D9] px-3 py-1.5 text-xs font-semibold text-[#080707] hover:bg-white transition"
          >
            Cancel
          </button>
          <button
            type="button"
            className="rounded-lg bg-[#EF4444] px-3 py-1.5 text-xs font-semibold text-white hover:bg-[#DC2626] transition"
          >
            Yes, delete my account
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => setConfirming(true)}
          className="mt-3 rounded-lg border border-[#EF4444] px-4 py-2 text-sm font-semibold text-[#EF4444] hover:bg-[#FEEAEA] transition"
        >
          Delete Account
        </button>
      )}
    </div>
  );
}

export default function AccountPage() {
  const { user } = useAuth();
  const { activeAccount, accountSummary } = useWorkspace();
  const { toast, dismissToast, showError, showSuccess } = useToast();
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const isOAuthAccount = user?.provider && user.provider !== "email";

  function handlePasswordModalClose(success) {
    setShowPasswordModal(false);
    if (success) showSuccess("Password updated", "Your new password is active.");
    else if (success === false) showError("Cancelled", "No changes were made.");
  }

  return (
    <section className="mx-auto w-full max-w-[980px]">
      <ToastAlert toast={toast} onClose={dismissToast} />
      {showPasswordModal && <ChangePasswordModal onClose={handlePasswordModalClose} />}

      <header className="mb-5">
        <h2 className="text-[32px] font-bold leading-tight text-[#080707]">Account</h2>
        <p className="mt-1 text-sm text-[#8D8D8D]">Manage your account details and preferences</p>
      </header>

      <div className="space-y-4">
        {/* Account info */}
        <div className="rounded-xl border border-[#EDEDED] bg-white p-5">
          <h3 className="text-sm font-semibold text-[#080707]">Account Information</h3>
          <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
            <label className="block">
              <span className="mb-1 block text-xs text-[#8D8D8D]">Full Name</span>
              <input value={user?.name || ""} readOnly className="w-full rounded-lg border border-[#EDEDED] bg-[#F8F9FA] px-3 py-2 text-sm text-[#080707]" />
            </label>
            <label className="block">
              <span className="mb-1 block text-xs text-[#8D8D8D]">Email Address</span>
              <input value={user?.email || ""} readOnly className="w-full rounded-lg border border-[#EDEDED] bg-[#F8F9FA] px-3 py-2 text-sm text-[#080707]" />
            </label>
            <label className="block">
              <span className="mb-1 block text-xs text-[#8D8D8D]">Active Account</span>
              <input
                value={activeAccount?.name || activeAccount?.displayName || "No active account"}
                readOnly
                className="w-full rounded-lg border border-[#EDEDED] bg-[#F8F9FA] px-3 py-2 text-sm text-[#080707]"
              />
            </label>
            <label className="block">
              <span className="mb-1 block text-xs text-[#8D8D8D]">Connected Accounts</span>
              <input
                value={`${accountSummary.owned.length + accountSummary.delegated.length} account${accountSummary.owned.length + accountSummary.delegated.length !== 1 ? "s" : ""}`}
                readOnly
                className="w-full rounded-lg border border-[#EDEDED] bg-[#F8F9FA] px-3 py-2 text-sm text-[#080707]"
              />
            </label>
          </div>
        </div>

        {/* Password */}
        <div className="rounded-xl border border-[#EDEDED] bg-white p-5">
          <h3 className="text-sm font-semibold text-[#080707]">Password</h3>
          {isOAuthAccount ? (
            <p className="mt-1 text-xs text-[#8D8D8D]">
              Your account uses <span className="font-semibold capitalize">{user.provider}</span> to sign in — no password required.
            </p>
          ) : (
            <>
              <p className="mt-1 text-xs text-[#8D8D8D]">Keep your account secure by changing your password regularly.</p>
              <button
                type="button"
                onClick={() => setShowPasswordModal(true)}
                className="mt-3 rounded-lg bg-[#0066FF] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#005ae0]"
              >
                Change Password
              </button>
            </>
          )}
        </div>

        <DeleteAccountSection />
      </div>
    </section>
  );
}
