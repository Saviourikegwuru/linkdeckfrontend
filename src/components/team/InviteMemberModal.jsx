import { useState } from "react";

const ROLES = [
  {
    id: "admin",
    label: "Admin",
    description: "Full access to all features, billing, management and team members control.",
  },
  {
    id: "editor",
    label: "Editor",
    description: "Can create, edit and schedule post. Can not manage billing and team members",
  },
  {
    id: "viewer",
    label: "Viewer",
    description: "Read only access to stream and analytics. Ideal for clients and or managements.",
  },
];

const ACCOUNTS = [
  { id: "global", label: "Global Marketing Hub" },
  { id: "ceo1",   label: "CEO Profile page (personal)" },
  { id: "ceo2",   label: "CEO Profile page (personal)" },
];

function CloseIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function ChevronDownIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M4 6l4 4 4-4" stroke="#8D8D8D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function InfoIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <circle cx="7" cy="7" r="6" stroke="#0066FF" strokeWidth="1.3" />
      <path d="M7 6v4" stroke="#0066FF" strokeWidth="1.3" strokeLinecap="round" />
      <circle cx="7" cy="4" r="0.7" fill="#0066FF" />
    </svg>
  );
}

function CheckboxIcon({ checked }) {
  return checked ? (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
      <rect width="18" height="18" rx="4" fill="#0066FF" />
      <path d="M4.5 9l3 3L13.5 6" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ) : (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
      <rect x="0.5" y="0.5" width="17" height="17" rx="3.5" stroke="#D9D9D9" />
    </svg>
  );
}

export default function InviteMemberModal({ onClose, onInvite }) {
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("editor");
  const [roleOpen, setRoleOpen] = useState(false);
  const [accounts, setAccounts] = useState(["global", "ceo1", "ceo2"]);

  const selectedRole = ROLES.find((r) => r.id === role);

  function toggleAccount(id) {
    setAccounts((prev) =>
      prev.includes(id) ? prev.filter((a) => a !== id) : [...prev, id]
    );
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!email.trim()) return;
    onInvite?.({ email: email.trim(), role, accounts });
    onClose();
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/25 backdrop-blur-sm p-4">
      <div
        className="w-full max-w-[420px] rounded-2xl bg-white shadow-[0_16px_48px_rgba(0,0,0,0.14)]"
        style={{ animation: "tutorialIn 0.18s ease-out" }}
      >
        <style>{`@keyframes tutorialIn{from{opacity:0;transform:scale(0.97) translateY(6px)}to{opacity:1;transform:scale(1) translateY(0)}}`}</style>

        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#EDEDED] px-6 py-4">
          <h2 className="text-base font-bold text-[#080707]">Invite new member</h2>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-1.5 text-[#8D8D8D] transition hover:bg-[#F4F7FF] hover:text-[#080707]"
            aria-label="Close"
          >
            <CloseIcon />
          </button>
        </div>

        {/* Body */}
        <form onSubmit={handleSubmit} className="px-6 py-5 space-y-5">
          {/* Email */}
          <div>
            <label className="mb-1.5 block text-sm font-semibold text-[#080707]">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="e.g. xydtech@gmail.com"
              className="w-full rounded-xl border border-[#EDEDED] bg-[#F8F9FA] px-4 py-2.5 text-sm text-[#080707] placeholder:text-[#8D8D8D] focus:border-[#0066FF]/50 focus:bg-white focus:outline-none transition"
            />
          </div>

          {/* Role */}
          <div>
            <label className="mb-1.5 block text-sm font-semibold text-[#080707]">
              Select Role
            </label>
            <div className="relative">
              <button
                type="button"
                onClick={() => setRoleOpen((v) => !v)}
                className="flex w-full items-center justify-between rounded-xl border border-[#EDEDED] bg-[#F8F9FA] px-4 py-2.5 text-sm text-[#080707] transition hover:border-[#0066FF]/40"
              >
                <span>{selectedRole.label}</span>
                <ChevronDownIcon />
              </button>
              {roleOpen && (
                <div className="absolute left-0 right-0 top-full z-10 mt-1 overflow-hidden rounded-xl border border-[#EDEDED] bg-white shadow-[0_8px_24px_rgba(0,0,0,0.10)]">
                  {ROLES.map((r) => (
                    <button
                      key={r.id}
                      type="button"
                      onClick={() => { setRole(r.id); setRoleOpen(false); }}
                      className={`w-full px-4 py-2.5 text-left text-sm transition hover:bg-[#F4F7FF] ${
                        role === r.id ? "font-semibold text-[#0066FF]" : "text-[#080707]"
                      }`}
                    >
                      {r.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
            <div className="mt-2 flex items-start gap-1.5">
              <span className="mt-px flex-shrink-0 text-[#0066FF]"><InfoIcon /></span>
              <p className="text-xs text-[#8D8D8D]">{selectedRole.description}</p>
            </div>
          </div>

          {/* Account Access */}
          <div>
            <p className="mb-2 text-sm font-semibold text-[#080707]">Account Access</p>
            <div className="divide-y divide-[#EDEDED] rounded-xl border border-[#EDEDED] overflow-hidden">
              {ACCOUNTS.map((acc) => (
                <div
                  key={acc.id}
                  className="flex items-center justify-between px-4 py-3 cursor-pointer hover:bg-[#F8F9FA] transition"
                  onClick={() => toggleAccount(acc.id)}
                >
                  <div>
                    <p className="text-sm font-medium text-[#080707]">{acc.label}</p>
                    <p className="text-xs text-[#0066FF]">Recommended</p>
                  </div>
                  <CheckboxIcon checked={accounts.includes(acc.id)} />
                </div>
              ))}
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-end gap-3 pt-1">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-[#D9D9D9] bg-white px-5 py-2.5 text-sm font-semibold text-[#080707] transition hover:border-[#0066FF]/40 hover:bg-[#f7faff]"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-xl bg-[#0066FF] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#005ae0]"
            >
              Invite member
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
