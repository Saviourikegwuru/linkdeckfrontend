import { LABELS } from "./inboxData";

/* ── tiny icons ───────────────────────────────────────────────── */
function MailIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <rect x="1.5" y="3" width="13" height="10" rx="2" stroke="currentColor" strokeWidth="1.3" />
      <path d="M1.5 5l6.5 4 6.5-4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function ArchiveBoxIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <rect x="1" y="2" width="14" height="3.5" rx="1" stroke="currentColor" strokeWidth="1.3" />
      <path d="M2.5 5.5V13a1 1 0 001 1h9a1 1 0 001-1V5.5" stroke="currentColor" strokeWidth="1.3" />
      <path d="M6 8.5h4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  );
}
function TrashIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M2.5 4h11M5.5 4V2.5h5V4M6.5 7v4M9.5 7v4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
      <path d="M3.5 4l.7 9.1a1 1 0 001 .9h5.6a1 1 0 001-.9L12.5 4" stroke="currentColor" strokeWidth="1.3" />
    </svg>
  );
}
function SearchIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <circle cx="7" cy="7" r="4.5" stroke="#8D8D8D" strokeWidth="1.3" />
      <path d="M10.5 10.5L14 14" stroke="#8D8D8D" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  );
}
function RefreshIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path d="M2 7a5 5 0 019-3M12 7a5 5 0 01-9 3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
      <path d="M11 1v3h-3M3 13v-3h3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function SnoozeIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <circle cx="7" cy="7" r="5.5" stroke="currentColor" strokeWidth="1.3" />
      <path d="M7 4v3.5l2.5 1.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function ScheduleIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <rect x="1.5" y="2" width="11" height="10" rx="1.5" stroke="currentColor" strokeWidth="1.3" />
      <path d="M1.5 5.5h11M4.5 1v2M9.5 1v2" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  );
}
function ArchiveActionIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path d="M1.5 3.5h11v8a1 1 0 01-1 1h-9a1 1 0 01-1-1v-8z" stroke="currentColor" strokeWidth="1.3" />
      <path d="M.5 1.5h13v2H.5z" stroke="currentColor" strokeWidth="1.3" />
      <path d="M5 7h4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  );
}
function ExportIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path d="M7 1.5v8M4 4.5l3-3 3 3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M2 10v2h10v-2" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function TrashActionIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path d="M2 3.5h10M5 3.5V2h4v1.5M5.5 6v4M8.5 6v4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      <path d="M3 3.5l.6 8a1 1 0 001 .9h4.8a1 1 0 001-.9l.6-8" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  );
}

const FILTER_PILLS_INBOX = ["All", "Unread", "High Priority", "Follow Ups"];

export default function InboxList({
  conversations = [],
  mailbox = "inbox",
  filter = "All",
  selectedId = null,
  checkedIds = new Set(),
  searchQuery = "",
  labels = [],
  onSelectMailbox,
  onSelectFilter,
  onSelectConversation,
  onToggleCheck,
  onCheckAll,
  onSearchChange,
  onArchive,
  onTrash,
  onSnooze,
  onSchedule,
  onExport,
}) {
  const hasChecked = checkedIds.size > 0;
  const labelMap = {};
  labels.forEach((l) => { labelMap[l.id] = l; });

  /* Derive filter pills: show label names when on a mailbox that has label filters */
  const filterPills = mailbox === "inbox"
    ? FILTER_PILLS_INBOX
    : ["All", "Unread", ...labels.slice(0, 4).map((l) => l.name)];

  return (
    <div className="flex h-full w-[403px] flex-shrink-0 flex-col rounded-xl bg-white overflow-hidden">
      {/* Search */}
      <div className="px-4 pt-4 pb-2">
        <div className="flex items-center gap-2 rounded-xl border border-[#EDEDED] bg-[#F8F9FA] px-3 py-2">
          <SearchIcon />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange?.(e.target.value)}
            placeholder="Search by name, company or tag"
            className="flex-1 bg-transparent text-sm text-[#080707] outline-none placeholder:text-[#C4C4C4]"
          />
        </div>
      </div>

      {/* Mailbox Tabs */}
      <div className="flex items-center gap-4 border-b border-[#EDEDED] px-4">
        {[
          { key: "inbox", label: "Inbox", Icon: MailIcon, color: "#0066FF" },
          { key: "archive", label: "Archive", Icon: ArchiveBoxIcon, color: "#0066FF" },
          { key: "trash", label: "Trash", Icon: TrashIcon, color: "#EF4444" },
        ].map(({ key, label, Icon, color }) => {
          const active = mailbox === key;
          return (
            <button
              key={key}
              type="button"
              onClick={() => onSelectMailbox?.(key)}
              className={`flex items-center gap-1.5 border-b-2 pb-2 pt-3 text-sm font-medium transition ${
                active ? "border-[#0066FF]" : "border-transparent text-[#8D8D8D] hover:text-[#080707]"
              }`}
              style={active ? { color } : undefined}
            >
              <Icon />
              {label}
            </button>
          );
        })}
      </div>

      {/* Filter pills */}
      <div className="flex items-center gap-2 overflow-x-auto px-4 py-2.5 no-scrollbar">
        {filterPills.map((pill) => {
          const active = filter === pill;
          return (
            <button
              key={pill}
              type="button"
              onClick={() => onSelectFilter?.(pill)}
              className={`flex-shrink-0 rounded-full px-3 py-1 text-xs font-medium transition ${
                active
                  ? "bg-[#0066FF] text-white"
                  : "bg-[#F3F4F6] text-[#8D8D8D] hover:bg-[#E5E7EB]"
              }`}
            >
              {pill}
            </button>
          );
        })}
      </div>

      {/* Select-all + actions bar */}
      <div className="flex items-center justify-between border-b border-[#EDEDED] px-4 py-2">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onCheckAll}
            className="flex items-center gap-1 text-[#8D8D8D]"
          >
            <span className="flex h-4 w-4 items-center justify-center rounded border border-[#D9D9D9]">
              {hasChecked && (
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M2 5l2 2 4-4" stroke="#0066FF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
              )}
            </span>
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M2 4l3 3 3-3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" /></svg>
          </button>
          {hasChecked && (
            <div className="flex items-center gap-1 ml-2">
              <button type="button" onClick={onSnooze} className="rounded p-1 text-[#8D8D8D] hover:bg-[#F3F4F6] hover:text-[#080707]" title="Snooze"><SnoozeIcon /></button>
              <button type="button" onClick={onSchedule} className="rounded p-1 text-[#8D8D8D] hover:bg-[#F3F4F6] hover:text-[#080707]" title="Schedule"><ScheduleIcon /></button>
              <button type="button" onClick={onArchive} className="rounded p-1 text-[#8D8D8D] hover:bg-[#F3F4F6] hover:text-[#080707]" title="Archive"><ArchiveActionIcon /></button>
              <button type="button" onClick={onExport} className="rounded p-1 text-[#8D8D8D] hover:bg-[#F3F4F6] hover:text-[#080707]" title="Export"><ExportIcon /></button>
              <button type="button" onClick={onTrash} className="rounded p-1 text-[#8D8D8D] hover:bg-[#F3F4F6] hover:text-[#080707]" title="Trash"><TrashActionIcon /></button>
            </div>
          )}
        </div>
        <button type="button" className="text-[#8D8D8D] hover:text-[#080707]"><RefreshIcon /></button>
      </div>

      {/* Conversation list */}
      <div className="flex-1 overflow-y-auto">
        {conversations.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <p className="text-sm font-semibold text-[#080707]">Nothing here</p>
            <p className="mt-1 text-xs text-[#8D8D8D]">
              {mailbox === "archive" ? "You do not have any archived message" : mailbox === "trash" ? "Your trash is empty" : "No conversations yet"}
            </p>
          </div>
        ) : (
          conversations.map((conv) => {
            const isActive = conv.id === selectedId;
            const isChecked = checkedIds.has(conv.id);
            return (
              <button
                key={conv.id}
                type="button"
                onClick={() => onSelectConversation?.(conv.id)}
                className={`group flex w-full items-start gap-3 border-b border-[#F3F4F6] px-4 py-3 text-left transition ${
                  isActive ? "border-l-2 border-l-[#0066FF] bg-[#F4F7FF]" : "hover:bg-[#FAFBFC]"
                }`}
              >
                {/* Checkbox */}
                <button
                  type="button"
                  onClick={(e) => { e.stopPropagation(); onToggleCheck?.(conv.id); }}
                  className={`mt-1 flex h-4 w-4 flex-shrink-0 items-center justify-center rounded border transition ${
                    isChecked ? "border-[#0066FF] bg-[#0066FF]" : "border-[#D9D9D9] opacity-0 group-hover:opacity-100"
                  }`}
                >
                  {isChecked && (
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M2 5l2 2 4-4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  )}
                </button>

                {/* Avatar */}
                <div
                  className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full text-xs font-semibold text-white"
                  style={{ backgroundColor: conv.avatarBg || "#8D8D8D" }}
                >
                  {conv.avatar ? (
                    <img src={conv.avatar} alt={conv.name} className="h-full w-full rounded-full object-cover" />
                  ) : (
                    conv.name.charAt(0)
                  )}
                </div>

                {/* Content */}
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <p className="truncate text-xs font-semibold text-[#080707]">{conv.name}</p>
                    <span className="flex-shrink-0 text-[10px] text-[#8D8D8D]">{conv.time}</span>
                  </div>
                  <p className="truncate text-[10px] text-[#8D8D8D]">{conv.title}</p>
                  <p className="mt-1 line-clamp-2 text-[11px] leading-snug text-[#8D8D8D]">{conv.preview}</p>
                  <div className="mt-1.5 flex items-center gap-1.5">
                    {conv.labels.map((lid) => {
                      const l = labelMap[lid];
                      if (!l) return null;
                      return (
                        <span key={lid} className="flex items-center gap-1">
                          <span className="h-2 w-2 rounded-full" style={{ backgroundColor: l.color }} />
                          <span className="rounded-full px-2 py-0.5 text-[9px] font-semibold" style={{ backgroundColor: l.bg, color: l.color }}>{l.name}</span>
                        </span>
                      );
                    })}
                    {conv.unread && (
                      <span className="ml-auto h-2 w-2 flex-shrink-0 rounded-full bg-[#0066FF]" />
                    )}
                  </div>
                </div>
              </button>
            );
          })
        )}
      </div>
    </div>
  );
}
