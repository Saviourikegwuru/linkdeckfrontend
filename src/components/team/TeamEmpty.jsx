function TeamEmptyIcon() {
  return (
    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#EDEDED]">
      <svg width="22" height="14" viewBox="0 0 22 14" fill="none" aria-hidden="true">
        <rect x="0" y="0" width="22" height="5" rx="2.5" fill="#8D8D8D" />
        <rect x="0" y="9" width="22" height="5" rx="2.5" fill="#8D8D8D" />
      </svg>
    </div>
  );
}

function PlusIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M8 3v10M3 8h10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function InfoCircleIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <circle cx="8" cy="8" r="7" stroke="#0066FF" strokeWidth="1.3" fill="#EEF3FF" />
      <path d="M8 7v4" stroke="#0066FF" strokeWidth="1.3" strokeLinecap="round" />
      <circle cx="8" cy="5" r="0.8" fill="#0066FF" />
    </svg>
  );
}

const ROLES_GUIDE = [
  {
    title: "Super Admin",
    description:
      "Full access to all features, billing, management and team member's control. Recommended for account owners.",
  },
  {
    title: "Editor",
    description:
      "Can manage content streams, schedule posts and view analytics. Cannot manage billing and team members.",
  },
  {
    title: "Viewer",
    description:
      "Read only access to stream and analytics. Ideal for clients and or managements for monitoring purposes.",
  },
];

export default function TeamEmpty({ onAddMember }) {
  return (
    <div className="flex flex-1 flex-col items-center justify-start gap-6 p-8">
      {/* Empty card */}
      <div className="w-full max-w-[560px] rounded-2xl border-2 border-dashed border-[#D9D9D9] bg-white px-10 py-16 text-center">
        <div className="flex justify-center">
          <TeamEmptyIcon />
        </div>
        <h2 className="mt-5 text-2xl font-bold text-[#080707]">No team member yet</h2>
        <p className="mt-2 text-sm text-[#8D8D8D]">Add team members to build your team</p>
        <button
          type="button"
          onClick={onAddMember}
          className="mt-7 inline-flex items-center gap-2 rounded-xl bg-[#0066FF] px-8 py-3 text-sm font-semibold text-white transition hover:bg-[#005ae0]"
        >
          <PlusIcon />
          Add team member
        </button>
      </div>

      {/* Roles and Permission Guide */}
      <div className="w-full max-w-[720px] rounded-2xl border border-[#D6E4FF] bg-[#EEF3FF] p-5">
        <div className="mb-4 flex items-center gap-2">
          <InfoCircleIcon />
          <h3 className="text-sm font-bold text-[#0066FF]">Roles and Permission Guid</h3>
        </div>
        <div className="grid grid-cols-3 gap-6">
          {ROLES_GUIDE.map((role) => (
            <div key={role.title}>
              <p className="text-sm font-bold text-[#080707]">{role.title}</p>
              <p className="mt-1.5 text-xs leading-relaxed text-[#8D8D8D]">{role.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
