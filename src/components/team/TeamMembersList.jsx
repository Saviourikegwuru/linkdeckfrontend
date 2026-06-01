import { useState } from "react";

const INITIAL_MEMBERS = [
  { id: 1, name: "Gloria Maggie",  email: "gloriamaggie123@gmail.com",  role: "Admin",  status: "Active",  access: "Global Marketing Hub" },
  { id: 2, name: "Malik Davidson", email: "malikdavidson123@gmail.com",  role: "Editor", status: "Active",  access: "Global Marketing Hub" },
  { id: 3, name: "Uche Peterson",  email: "uchepeterson23@gmail.com",    role: "Viewer", status: "Active",  access: "Global Marketing Hub" },
  { id: 4, name: "Philip Ekeh",    email: "philipekeh123@gmail.com",     role: "Admin",  status: "Pending", access: "Global Marketing Hub" },
];

const ROLES = ["Admin", "Editor", "Viewer"];

function initials(name) {
  return name.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase();
}

const AVATAR_COLORS = ["#EEF3FF", "#FFF4E5", "#E8FAF3", "#FDE8E8"];
const TEXT_COLORS   = ["#0066FF", "#F59E0B", "#10B981", "#EF4444"];

function Avatar({ name, index }) {
  return (
    <div
      className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full text-[11px] font-bold"
      style={{ background: AVATAR_COLORS[index % 4], color: TEXT_COLORS[index % 4] }}
    >
      {initials(name)}
    </div>
  );
}

function ChevronDownIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
      <path d="M3 4.5l3 3 3-3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function DotsIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <circle cx="3" cy="8" r="1.3" fill="#8D8D8D" />
      <circle cx="8" cy="8" r="1.3" fill="#8D8D8D" />
      <circle cx="13" cy="8" r="1.3" fill="#8D8D8D" />
    </svg>
  );
}

function UserPlusIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <circle cx="6.5" cy="5" r="2.5" stroke="currentColor" strokeWidth="1.4" />
      <path d="M1 13c0-3.038 2.462-5.5 5.5-5.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      <path d="M12 9v4M10 11h4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

function FlashIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <path d="M8 1.5L2.5 8H7L6 12.5L11.5 6H7L8 1.5Z" fill="#fff" />
    </svg>
  );
}

export default function TeamMembersList({ members = INITIAL_MEMBERS, onInvite }) {
  const [list, setList] = useState(members);
  const [showSeatsBar, setShowSeatsBar] = useState(true);

  function changeRole(id, newRole) {
    setList((prev) => prev.map((m) => (m.id === id ? { ...m, role: newRole } : m)));
  }

  return (
    <div className="flex flex-1 flex-col overflow-auto p-6 gap-4">
      {/* Seats capacity banner */}
      {showSeatsBar && (
        <div className="flex items-center justify-between gap-3 rounded-xl border border-[#D6E4FF] bg-[#EEF3FF] px-4 py-2.5">
          <p className="text-xs font-medium text-[#0066FF]">
            Seats Capacity 4 of 4 seat filled
          </p>
          <div className="flex items-center gap-2">
            <button
              type="button"
              className="flex items-center gap-1.5 rounded-xl bg-[#0066FF] px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-[#005ae0]"
            >
              <FlashIcon />
              Upgrade to premium
            </button>
            <button
              type="button"
              onClick={() => setShowSeatsBar(false)}
              className="text-[#8D8D8D] hover:text-[#080707] transition"
              aria-label="Dismiss"
            >
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M1 1l10 10M11 1L1 11" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* Invite button row */}
      <div className="flex justify-end">
        <button
          type="button"
          onClick={onInvite}
          className="flex items-center gap-2 rounded-xl bg-[#0066FF] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#005ae0]"
        >
          <UserPlusIcon />
          Invite member
        </button>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-2xl border border-[#EDEDED] bg-white">
        <div className="border-b border-[#EDEDED] px-5 py-3">
          <h3 className="text-sm font-bold text-[#080707]">Team List</h3>
        </div>
        <table className="w-full min-w-[700px] text-sm">
          <thead>
            <tr className="border-b border-[#EDEDED] text-left text-xs text-[#8D8D8D]">
              <th className="px-5 py-3 font-medium">Member Name</th>
              <th className="px-5 py-3 font-medium">Email Address</th>
              <th className="px-5 py-3 font-medium">Role</th>
              <th className="px-5 py-3 font-medium">Status</th>
              <th className="px-5 py-3 font-medium">Account Access</th>
              <th className="px-5 py-3 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {list.map((member, idx) => (
              <tr
                key={member.id}
                className="border-b border-[#EDEDED] last:border-0 hover:bg-[#F8F9FA] transition-colors"
              >
                {/* Name */}
                <td className="px-5 py-3.5">
                  <div className="flex items-center gap-2.5">
                    <Avatar name={member.name} index={idx} />
                    <span className="font-medium text-[#080707]">{member.name}</span>
                  </div>
                </td>

                {/* Email */}
                <td className="px-5 py-3.5 text-[#8D8D8D]">{member.email}</td>

                {/* Role dropdown */}
                <td className="px-5 py-3.5">
                  <div className="relative inline-block">
                    <select
                      value={member.role}
                      onChange={(e) => changeRole(member.id, e.target.value)}
                      className="appearance-none rounded-lg border border-[#EDEDED] bg-white py-1 pl-3 pr-8 text-xs font-medium text-[#080707] focus:outline-none focus:border-[#0066FF]/50 cursor-pointer"
                    >
                      {ROLES.map((r) => (
                        <option key={r}>{r}</option>
                      ))}
                    </select>
                    <span className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-[#8D8D8D]">
                      <ChevronDownIcon />
                    </span>
                  </div>
                </td>

                {/* Status */}
                <td className="px-5 py-3.5">
                  <span
                    className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                      member.status === "Active"
                        ? "bg-[#E8FAF3] text-[#10B981]"
                        : "bg-[#FFF4E5] text-[#F59E0B]"
                    }`}
                  >
                    {member.status}
                  </span>
                </td>

                {/* Access */}
                <td className="px-5 py-3.5 text-[#8D8D8D]">{member.access}</td>

                {/* Actions */}
                <td className="px-5 py-3.5">
                  <button
                    type="button"
                    className="rounded-lg p-1 text-[#8D8D8D] transition hover:bg-[#F4F7FF] hover:text-[#080707]"
                    aria-label="More actions"
                  >
                    <DotsIcon />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
