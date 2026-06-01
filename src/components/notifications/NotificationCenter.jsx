import React, { useMemo, useState, useEffect } from "react";
import { getNotifications, markAllNotificationsRead } from "../../services/notifications";

const FILTERS = ["All", "Messages", "Engagement", "Reminders", "System"];

function relativeTime(dateStr) {
  const ms = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(ms / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  if (mins < 1440) return `${Math.floor(mins / 60)}h ago`;
  if (mins < 2880) return "Yesterday";
  return `${Math.floor(mins / 1440)}d ago`;
}

function mapNotification(n) {
  const body = n.body || {};
  const ageMs = Date.now() - new Date(n.createdAt).getTime();
  return {
    id: n.id,
    section: ageMs < 24 * 60 * 60 * 1000 ? "New" : "Earlier",
    type: n.type || "system",
    category: body.category || "System",
    title: body.title || n.type || "Notification",
    excerpt: body.excerpt || body.text || "",
    time: relativeTime(n.createdAt),
    unread: !n.read,
  };
}

const NOTIFICATIONS = [
  {
    id: "new-like",
    section: "New",
    type: "like",
    category: "Engagement",
    title: "John Carter and 12 others liked your post",
    excerpt:
      "Just finished an amazing podcast episode with thought leaders in the marketing industry. We discussed...",
    time: "2m ago",
    unread: true,
    actors: [
      { label: "JC", bg: "from-[#0F172A] to-[#334155]" },
      { label: "MD", bg: "from-[#7C2D12] to-[#EA580C]" },
      { label: "EA", bg: "from-[#166534] to-[#22C55E]" },
      { label: "ML", bg: "from-[#1D4ED8] to-[#60A5FA]" },
    ],
    overflowCount: "+8",
  },
  {
    id: "new-comment",
    section: "New",
    type: "comment",
    category: "Engagement",
    title: "Emily Davis commented on your post",
    excerpt:
      "Just finished an amazing podcast episode with thought leaders in the marketing industry. We discussed...",
    time: "1h ago",
    unread: true,
    person: { name: "Emily Davis", label: "ED", bg: "from-[#22C55E] to-[#14B8A6]" },
  },
  {
    id: "new-share",
    section: "New",
    type: "share",
    category: "Engagement",
    title: "Your post was shared by Michael Lee",
    excerpt:
      "Just finished an amazing podcast episode with thought leaders in the marketing industry. We discussed...",
    time: "3h ago",
    unread: true,
    person: { name: "Michael Lee", label: "ML", bg: "from-[#1D4ED8] to-[#312E81]" },
  },
  {
    id: "new-copy",
    section: "New",
    type: "copy",
    category: "Engagement",
    title: "Your post link was copied 7 times",
    excerpt:
      "Just finished an amazing podcast episode with thought leaders in the marketing industry. We discussed...",
    time: "4h ago",
    unread: true,
  },
  {
    id: "new-connect",
    section: "New",
    type: "connect",
    category: "Messages",
    title: "Daniel Kim wants to connect with you",
    excerpt:
      "Just finished an amazing podcast episode with thought leaders in the marketing industry. We discussed...",
    time: "4h ago",
    unread: true,
    actions: ["Cancel", "Accept"],
  },
  {
    id: "earlier-like",
    section: "Earlier",
    type: "like",
    category: "Engagement",
    title: "John Carter and 12 others liked your post",
    excerpt:
      "Just finished an amazing podcast episode with thought leaders in the marketing industry. We discussed...",
    time: "Yesterday",
    unread: false,
    actors: [
      { label: "JC", bg: "from-[#0F172A] to-[#334155]" },
      { label: "MD", bg: "from-[#7C2D12] to-[#EA580C]" },
      { label: "EA", bg: "from-[#166534] to-[#22C55E]" },
      { label: "ML", bg: "from-[#1D4ED8] to-[#60A5FA]" },
    ],
    overflowCount: "+8",
  },
  {
    id: "earlier-comment",
    section: "Earlier",
    type: "comment",
    category: "Engagement",
    title: "Emily Davis commented on your post",
    excerpt:
      "Just finished an amazing podcast episode with thought leaders in the marketing industry. We discussed...",
    time: "Yesterday",
    unread: false,
    person: { name: "Emily Davis", label: "ED", bg: "from-[#22C55E] to-[#14B8A6]" },
  },
  {
    id: "earlier-share",
    section: "Earlier",
    type: "share",
    category: "Engagement",
    title: "Your post was shared by Michael Lee",
    excerpt:
      "Just finished an amazing podcast episode with thought leaders in the marketing industry. We discussed...",
    time: "2d ago",
    unread: false,
    person: { name: "Michael Lee", label: "ML", bg: "from-[#1D4ED8] to-[#312E81]" },
  },
  {
    id: "earlier-copy",
    section: "Earlier",
    type: "copy",
    category: "Engagement",
    title: "Your post link was copied 7 times",
    excerpt:
      "Just finished an amazing podcast episode with thought leaders in the marketing industry. We discussed...",
    time: "2d ago",
    unread: false,
  },
  {
    id: "earlier-connect",
    section: "Earlier",
    type: "connect",
    category: "Messages",
    title: "Daniel Kim wants to connect with you",
    excerpt:
      "Just finished an amazing podcast episode with thought leaders in the marketing industry. We discussed...",
    time: "3d ago",
    unread: false,
    actions: ["Cancel", "Accept"],
  },
];

const PANEL_MENU_ITEMS = [
  { id: "center", label: "Go to Notification Center", icon: "bookmark" },
  { id: "settings", label: "Go to Notification settings", icon: "link" },
];

const ITEM_MENU_ITEMS = [
  { id: "show-more", label: "Show more", icon: "link" },
  { id: "show-less", label: "Show less", icon: "bookmark" },
  { id: "mute-post", label: "Turn off notifications about this post", icon: "link" },
  { id: "mute-like-this", label: "Turn off notifications like this", icon: "link" },
  { id: "report", label: "Report issue", icon: "link" },
];

function CheckMarkIcon({ className = "" }) {
  return (
    <svg className={className} width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="m3.8 10.5 3.3 3.3 9.2-9.1" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function EllipsisIcon({ className = "" }) {
  return (
    <svg className={className} width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
      <circle cx="4" cy="9" r="1.3" fill="currentColor" />
      <circle cx="9" cy="9" r="1.3" fill="currentColor" />
      <circle cx="14" cy="9" r="1.3" fill="currentColor" />
    </svg>
  );
}

function CloseIcon({ className = "" }) {
  return (
    <svg className={className} width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="M5 5 15 15M15 5 5 15" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function ThumbIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
      <path
        d="M8.4 9.2V18H5.5a1.5 1.5 0 0 1-1.5-1.5v-5.8a1.5 1.5 0 0 1 1.5-1.5h2.9Zm2 8.8h5.1c1.1 0 2-.8 2.1-1.9l.8-5.2c.2-1.3-.8-2.4-2.1-2.4h-4.2l.4-2.6c.2-1-.4-2-1.4-2.3a1.8 1.8 0 0 0-2.2 1.3l-1.5 4.3V18h3Z"
        fill="#0066FF"
      />
    </svg>
  );
}

function CommentIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <path
        d="M7 2C4.2 2 2 3.9 2 6.3c0 1.1.5 2.1 1.4 2.9L3 12l2.3-1.2c.5.1 1.1.2 1.7.2 2.8 0 5-1.9 5-4.3S9.8 2 7 2Z"
        fill="#0066FF"
      />
      <circle cx="5.2" cy="6.4" r=".7" fill="white" />
      <circle cx="7" cy="6.4" r=".7" fill="white" />
      <circle cx="8.8" cy="6.4" r=".7" fill="white" />
    </svg>
  );
}

function ShareIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <path
        d="M10.8 8.8a1.9 1.9 0 1 0-1.4-3.2L5.6 3.8a1.9 1.9 0 1 0-.3 2.8l3.8 1.8a1.9 1.9 0 1 0 1.7.4Z"
        fill="#0066FF"
      />
    </svg>
  );
}

function CopyIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <rect x="6.5" y="4.5" width="9" height="11" rx="2.3" fill="#0066FF" />
      <rect x="3.5" y="7.5" width="9" height="11" rx="2.3" fill="#1F7BFF" opacity="0.2" stroke="#0066FF" strokeWidth="1.3" />
    </svg>
  );
}

function ConnectIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="M7 5H3.8A1.8 1.8 0 0 0 2 6.8v8.4A1.8 1.8 0 0 0 3.8 17H12" stroke="#0066FF" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M13 4h4.2M15.1 1.9 17.2 4l-2.1 2.1" stroke="#0066FF" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M7.2 12H17" stroke="#0066FF" strokeWidth="1.6" strokeLinecap="round" />
      <path d="m9.2 9.9-2.1 2.1 2.1 2.1" stroke="#0066FF" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function LinkIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
      <path
        d="M11.2 17a4.2 4.2 0 0 1 0-5.9l3-3a4.2 4.2 0 1 1 6 6l-1.8 1.9M16.8 11a4.2 4.2 0 0 1 0 5.9l-3 3a4.2 4.2 0 0 1-6-6l1.8-1.9"
        stroke="currentColor"
        strokeWidth="1.9"
        strokeLinecap="round"
      />
    </svg>
  );
}

function BookmarkIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
      <path
        d="M9 6.5A2.5 2.5 0 0 1 11.5 4h5A2.5 2.5 0 0 1 19 6.5V23l-5-3-5 3V6.5Z"
        stroke="currentColor"
        strokeWidth="1.9"
        strokeLinejoin="round"
      />
      <path d="M12.2 8.8h4.1" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  );
}

function renderMenuIcon(icon) {
  if (icon === "bookmark") return <BookmarkIcon />;
  return <LinkIcon />;
}

function getLeadingTone(type) {
  if (type === "copy" || type === "connect") return "bg-[#EEF3FF]";
  return "bg-[#EAF1FF]";
}

function getTypeBadge(type) {
  if (type === "comment") return <CommentIcon />;
  if (type === "share") return <ShareIcon />;
  return null;
}

function getTypeIcon(type) {
  if (type === "like") return <ThumbIcon />;
  if (type === "copy") return <CopyIcon />;
  if (type === "connect") return <ConnectIcon />;
  return null;
}

function NotificationActionMenu({ onClose, onToggleExpanded, expanded }) {
  return (
    <div className="absolute right-0 top-11 z-30 w-[min(340px,calc(100vw-3.5rem))] overflow-hidden rounded-[28px] border border-white/60 bg-[linear-gradient(135deg,rgba(255,255,255,0.98),rgba(238,243,255,0.94))] shadow-[0_30px_80px_rgba(8,7,7,0.28)] backdrop-blur-xl">
      <div className="flex justify-end border-b border-[#EDEDED] px-5 py-4">
        <button
          type="button"
          onClick={onClose}
          className="rounded-full p-1 text-[#8D8D8D] transition hover:bg-white/80 hover:text-[#080707]"
          aria-label="Close item menu"
        >
          <CloseIcon />
        </button>
      </div>
      <div className="space-y-1 px-4 py-4">
        {ITEM_MENU_ITEMS.map((item) => {
          const isExpandedItem = item.id === "show-more" || item.id === "show-less";
          if (item.id === "show-more" && expanded) return null;
          if (item.id === "show-less" && !expanded) return null;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => {
                if (isExpandedItem) onToggleExpanded();
                else onClose();
              }}
              className="flex w-full items-center gap-4 rounded-[22px] px-4 py-3 text-left text-[16px] font-medium text-[#8D8D8D] transition hover:bg-white/80 hover:text-[#080707]"
            >
              <span className="flex h-10 w-10 items-center justify-center text-[#9A9A9A]">
                {renderMenuIcon(item.icon)}
              </span>
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function NotificationPanelMenu({ onClose, onNavigateToCenter, onOpenSettings }) {
  return (
    <div className="absolute right-0 top-12 z-30 w-[min(370px,calc(100vw-3.5rem))] overflow-hidden rounded-[28px] border border-white/60 bg-[linear-gradient(135deg,rgba(255,255,255,0.98),rgba(238,243,255,0.94))] shadow-[0_30px_80px_rgba(8,7,7,0.28)] backdrop-blur-xl">
      <div className="flex justify-end border-b border-[#EDEDED] px-5 py-4">
        <button
          type="button"
          onClick={onClose}
          className="rounded-full p-1 text-[#8D8D8D] transition hover:bg-white/80 hover:text-[#080707]"
          aria-label="Close notifications menu"
        >
          <CloseIcon />
        </button>
      </div>
      <div className="space-y-1 px-4 py-4">
        {PANEL_MENU_ITEMS.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => {
              if (item.id === "center") onNavigateToCenter?.();
              if (item.id === "settings") onOpenSettings?.();
              onClose();
            }}
            className="flex w-full items-center gap-4 rounded-[22px] px-4 py-3 text-left text-[16px] font-medium text-[#8D8D8D] transition hover:bg-white/80 hover:text-[#080707]"
          >
            <span className="flex h-10 w-10 items-center justify-center text-[#9A9A9A]">
              {renderMenuIcon(item.icon)}
            </span>
            <span>{item.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

function ActorStack({ actors = [], overflowCount }) {
  return (
    <div className="flex items-center pl-1">
      {actors.map((actor, index) => (
        <span
          key={`${actor.label}-${index}`}
          className={`-ml-1.5 flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-gradient-to-br ${actor.bg} text-[10px] font-semibold tracking-[0.06em] text-white first:ml-0`}
        >
          {actor.label}
        </span>
      ))}
      {overflowCount ? (
        <span className="-ml-1.5 flex h-8 min-w-8 items-center justify-center rounded-full border-2 border-white bg-[#0066FF] px-1.5 text-[12px] font-semibold text-white">
          {overflowCount}
        </span>
      ) : null}
    </div>
  );
}

function LeadingVisual({ notification }) {
  const badge = getTypeBadge(notification.type);
  const person = notification.person;

  if (person) {
    return (
      <div className="relative flex h-14 w-14 flex-shrink-0 items-center justify-center">
        <span className={`flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br ${person.bg} text-sm font-semibold text-white shadow-[0_10px_24px_rgba(0,0,0,0.12)]`}>
          {person.label}
        </span>
        {badge ? (
          <span className="absolute bottom-0 right-0 flex h-7 w-7 items-center justify-center rounded-full border-[3px] border-white bg-white shadow-[0_8px_20px_rgba(0,102,255,0.16)]">
            {badge}
          </span>
        ) : null}
      </div>
    );
  }

  return (
    <div className={`flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-full ${getLeadingTone(notification.type)}`}>
      {getTypeIcon(notification.type)}
    </div>
  );
}

function NotificationCard({
  notification,
  compact = false,
  menuOpen,
  onToggleMenu,
  expanded,
  onToggleExpanded,
}) {
  return (
    <article className={`relative flex gap-4 px-5 py-4 ${compact ? "sm:gap-3" : "sm:gap-4"}`}>
      <LeadingVisual notification={notification} />

      <div className="min-w-0 flex-1">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
          <div className="min-w-0 pr-2">
            <div className="flex items-start gap-2">
              <div className="min-w-0 flex-1">
                <h3 className={`text-[#111111] ${compact ? "text-[17px]" : "text-[18px]"} font-semibold leading-snug`}>
                  {notification.title}
                </h3>
                <p
                  className={`mt-1 text-[#8D8D8D] ${compact ? "text-[14px]" : "text-[15px]"} italic leading-relaxed`}
                  style={expanded ? undefined : {
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                  }}
                >
                  "{notification.excerpt}"
                </p>
              </div>
            </div>

            {notification.actors ? (
              <div className="mt-3">
                <ActorStack actors={notification.actors} overflowCount={notification.overflowCount} />
              </div>
            ) : null}

            {notification.actions ? (
              <div className="mt-4 flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  className="rounded-xl px-4 py-2 text-[15px] font-semibold text-[#111111] transition hover:bg-[#EDEDED]"
                >
                  {notification.actions[0]}
                </button>
                <button
                  type="button"
                  className="min-w-[132px] rounded-xl bg-[#0066FF] px-5 py-2 text-[15px] font-semibold text-white shadow-[0_14px_24px_rgba(0,102,255,0.22)] transition hover:bg-[#005ae0]"
                >
                  {notification.actions[1]}
                </button>
              </div>
            ) : null}
          </div>

          <div className="flex flex-row items-center gap-3 self-end text-right sm:flex-col sm:items-end sm:self-start">
            <div className="flex items-center gap-3">
              <span className="text-[13px] font-medium text-[#8D8D8D]">{notification.time}</span>
              <span className={`h-2.5 w-2.5 rounded-full ${notification.unread ? "bg-[#0066FF]" : "bg-[#D5DBE8]"}`} />
            </div>
            <div className="relative">
              <button
                type="button"
                onClick={onToggleMenu}
                className={`rounded-full p-1.5 text-[#9A9A9A] transition hover:bg-white hover:text-[#080707] ${menuOpen ? "bg-white text-[#080707] shadow-[0_10px_30px_rgba(8,7,7,0.08)]" : ""}`}
                aria-label={`Open options for ${notification.title}`}
              >
                <EllipsisIcon />
              </button>
              {menuOpen ? (
                <NotificationActionMenu
                  onClose={onToggleMenu}
                  onToggleExpanded={onToggleExpanded}
                  expanded={expanded}
                />
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

function NotificationSection({
  title,
  notifications,
  compact = false,
  openMenuId,
  onToggleMenu,
  expandedIds,
  onToggleExpanded,
}) {
  if (notifications.length === 0) return null;

  return (
    <section>
      <div className="mb-4 flex items-center gap-4">
        <h2 className="text-[16px] font-semibold text-[#8D8D8D]">{title}</h2>
        <div className="h-px flex-1 bg-[#E8E8E8]" />
      </div>

      <div className="overflow-visible rounded-[24px] border border-[#EDEDED] bg-[#F7F7F8] shadow-[0_16px_40px_rgba(8,7,7,0.04)]">
        {notifications.map((notification, index) => (
          <div
            key={notification.id}
            className={index === 0 ? "" : "border-t border-white/90"}
          >
            <NotificationCard
              notification={notification}
              compact={compact}
              menuOpen={openMenuId === notification.id}
              onToggleMenu={() => onToggleMenu(notification.id)}
              expanded={expandedIds.includes(notification.id)}
              onToggleExpanded={() => onToggleExpanded(notification.id)}
            />
          </div>
        ))}
      </div>
    </section>
  );
}

function EmptyState({ label }) {
  return (
    <div className="rounded-[24px] border border-dashed border-[#D7DFED] bg-[linear-gradient(135deg,rgba(255,255,255,0.98),rgba(238,243,255,0.82))] px-8 py-12 text-center">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#EEF3FF] text-[#0066FF]">
        <CheckMarkIcon />
      </div>
      <h3 className="mt-4 text-[18px] font-semibold text-[#111111]">All caught up in {label}</h3>
      <p className="mt-2 text-[14px] text-[#8D8D8D]">New notifications in this tab will appear here.</p>
    </div>
  );
}

export function NotificationCenterContent({
  variant = "page",
  onNavigateToCenter,
  onOpenSettings,
}) {
  const [activeFilter, setActiveFilter] = useState("All");
  const [items, setItems] = useState(NOTIFICATIONS);
  const [openMenuId, setOpenMenuId] = useState(null);
  const [panelMenuOpen, setPanelMenuOpen] = useState(false);
  const [expandedIds, setExpandedIds] = useState([]);

  useEffect(() => {
    getNotifications()
      .then((data) => {
        const real = data?.notifications ?? [];
        if (real.length > 0) setItems(real.map(mapNotification));
      })
      .catch(() => {/* keep mock data on error */});
  }, []);

  const compact = variant === "panel";
  const filteredItems = useMemo(() => {
    return items.filter((item) => activeFilter === "All" || item.category === activeFilter);
  }, [activeFilter, items]);

  const groupedNotifications = useMemo(() => {
    return ["New", "Earlier"].map((section) => ({
      section,
      items: filteredItems.filter((item) => item.section === section),
    }));
  }, [filteredItems]);

  function toggleExpanded(id) {
    setExpandedIds((current) => (
      current.includes(id)
        ? current.filter((value) => value !== id)
        : [...current, id]
    ));
    setOpenMenuId(null);
  }

  function markAllAsRead() {
    setItems((current) => current.map((item) => ({ ...item, unread: false })));
    markAllNotificationsRead().catch(() => {});
  }

  return (
    <div className={variant === "page" ? "w-full max-w-[1080px]" : "w-full"}>
      {variant === "panel" ? (
        <div className="mb-5 flex items-start justify-between gap-4">
          <div>
            <h2 className="text-[18px] font-semibold text-[#111111]">Notifications</h2>
            <p className="mt-1 text-[13px] text-[#8D8D8D]">Latest updates across your workspace.</p>
          </div>
          <div className="relative">
            <button
              type="button"
              onClick={() => {
                setPanelMenuOpen((open) => !open);
                setOpenMenuId(null);
              }}
              className={`rounded-full p-2 text-[#8D8D8D] transition hover:bg-[#F4F7FF] hover:text-[#080707] ${panelMenuOpen ? "bg-[#EEF3FF] text-[#080707]" : ""}`}
              aria-label="Open notifications menu"
            >
              <EllipsisIcon />
            </button>
            {panelMenuOpen ? (
              <NotificationPanelMenu
                onClose={() => setPanelMenuOpen(false)}
                onNavigateToCenter={onNavigateToCenter}
                onOpenSettings={onOpenSettings}
              />
            ) : null}
          </div>
        </div>
      ) : null}

      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#EDEDED] pb-4">
        <div className="flex flex-wrap items-center gap-2 sm:gap-4">
          {FILTERS.map((filter) => (
            <button
              key={filter}
              type="button"
              onClick={() => {
                setActiveFilter(filter);
                setOpenMenuId(null);
                setPanelMenuOpen(false);
              }}
              className={`relative pb-2 text-[15px] font-medium transition ${
                activeFilter === filter
                  ? "text-[#0066FF] after:absolute after:bottom-[-17px] after:left-0 after:h-[2px] after:w-full after:rounded-full after:bg-[#0066FF]"
                  : "text-[#8D8D8D] hover:text-[#080707]"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        <button
          type="button"
          onClick={markAllAsRead}
          className="inline-flex items-center gap-2 text-[14px] font-medium italic text-[#8D8D8D] transition hover:text-[#080707]"
        >
          <CheckMarkIcon className="text-[#8D8D8D]" />
          Mark all as Read
        </button>
      </div>

      <div className={`${compact ? "mt-5 space-y-6" : "mt-7 space-y-10"}`}>
        {groupedNotifications.every((group) => group.items.length === 0) ? (
          <EmptyState label={activeFilter} />
        ) : (
          groupedNotifications.map((group) => (
            <NotificationSection
              key={group.section}
              title={group.section}
              notifications={group.items}
              compact={compact}
              openMenuId={openMenuId}
              onToggleMenu={(id) => {
                setOpenMenuId((current) => current === id ? null : id);
                setPanelMenuOpen(false);
              }}
              expandedIds={expandedIds}
              onToggleExpanded={toggleExpanded}
            />
          ))
        )}
      </div>

      {variant === "page" ? (
        <div className="mt-10 flex justify-end">
          <button
            type="button"
            className="min-w-[270px] rounded-[14px] bg-[#0066FF] px-6 py-3 text-[16px] font-semibold text-white shadow-[0_16px_30px_rgba(0,102,255,0.18)] transition hover:bg-[#005ae0]"
          >
            See Previous Notifications
          </button>
        </div>
      ) : (
        <div className="mt-6">
          <button
            type="button"
            onClick={onNavigateToCenter}
            className="w-full rounded-[14px] bg-[#0066FF] px-6 py-3 text-[15px] font-semibold text-white shadow-[0_16px_30px_rgba(0,102,255,0.18)] transition hover:bg-[#005ae0]"
          >
            Go to Notification Centre
          </button>
        </div>
      )}
    </div>
  );
}

export function NotificationBellPanel({ containerRef, onNavigateToCenter, onOpenSettings }) {
  return (
    <div
      ref={containerRef}
      className="absolute right-0 top-[calc(100%+16px)] z-40 w-[min(460px,calc(100vw-2rem))] rounded-[30px] border border-white/60 bg-[linear-gradient(180deg,rgba(255,255,255,0.98),rgba(248,249,250,0.98))] p-5 shadow-[0_35px_90px_rgba(8,7,7,0.22)] backdrop-blur-xl"
    >
      <NotificationCenterContent
        variant="panel"
        onNavigateToCenter={onNavigateToCenter}
        onOpenSettings={onOpenSettings}
      />
    </div>
  );
}
