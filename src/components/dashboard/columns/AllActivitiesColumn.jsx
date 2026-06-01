/* ── Icons ──────────────────────────────────────────────────── */
function DotsIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <circle cx="8" cy="3" r="1.2" fill="currentColor" />
      <circle cx="8" cy="8" r="1.2" fill="currentColor" />
      <circle cx="8" cy="13" r="1.2" fill="currentColor" />
    </svg>
  );
}

function DragIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <circle cx="4" cy="4" r="1.2" fill="currentColor" />
      <circle cx="10" cy="4" r="1.2" fill="currentColor" />
      <circle cx="4" cy="10" r="1.2" fill="currentColor" />
      <circle cx="10" cy="10" r="1.2" fill="currentColor" />
    </svg>
  );
}

function LikeIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <path d="M4 6V12M4 6L6.5 2.5C7.5 2.5 8 3 8 4V5.5H11.5L10.5 11H4V6Z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
    </svg>
  );
}

function CommentIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <path d="M2 2h10a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1H4L1 13V3a1 1 0 0 1 1-1z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
    </svg>
  );
}

function RepostIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <path d="M1 5l3-3 3 3M4 2v6a2 2 0 0 0 2 2h4M13 9l-3 3-3-3M10 12V6a2 2 0 0 0-2-2H4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ShareIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <path d="M2 7v4a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V7M7 1v8M4.5 3.5L7 1l2.5 2.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/* ── Mock posts ─────────────────────────────────────────────── */
const ACTIVITIES = [
  {
    id: 1,
    type: "post",
    author: "Grace George",
    role: "Product Designer",
    time: "1 week ago",
    content:
      "Consistency compounds faster than motivation.\nSmall actions, repeated daily, create real growth.\n\nGrateful for the progress so far. 🙌",
    imageBg: "linear-gradient(135deg, #E3F2FD 0%, #BBDEFB 100%)",
    likes: 29,
    comments: 6
  },
  {
    id: 2,
    type: "post",
    author: "Grace George",
    role: "Product Designer",
    time: "1 week ago",
    content:
      "This week's focus: simplifying how we work on LinkedIn.\nLess noise. More intention.\n\nExcited to share what we're building.",
    imageBg: "linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)",
    likes: 29,
    comments: 6
  },
  {
    id: 3,
    type: "repost",
    repostedBy: "Grace George",
    author: "Tunde Adebayo",
    role: "Product Designer",
    time: "1 week ago",
    content:
      "If you're building in public, remember this:\nPeople don't connect with perfection. They connect with honesty.\n\nShare the process.",
    imageBg: "linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)",
    likes: 29,
    comments: 6
  }
];

/* ── Column ─────────────────────────────────────────────────── */
export default function AllActivitiesColumn() {
  return (
    <div className="flex h-full w-[403px] flex-shrink-0 flex-col rounded-xl bg-white overflow-hidden">
      {/* Header */}
      <div className="flex flex-shrink-0 items-center gap-2 border-b border-[#EDEDED] px-4 py-3">
        <span className="cursor-grab text-[#C0C0C0]"><DragIcon /></span>
        <span className="flex-1 text-sm font-semibold text-[#080707]">All Activities</span>
        <span className="rounded-md bg-[#EEF3FF] px-1.5 py-0.5 text-[10px] font-semibold text-[#0066FF]">Posts</span>
        <button type="button" className="rounded-md p-0.5 text-[#8D8D8D] transition hover:text-[#080707]" aria-label="Filter">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
            <path d="M1 3h12M3 7h8M5 11h4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
          </svg>
        </button>
        <button type="button" className="text-[#C0C0C0] transition hover:text-[#8D8D8D]" aria-label="Options">
          <DotsIcon />
        </button>
      </div>

      {/* Posts */}
      <div className="flex-1 overflow-y-auto">
        {ACTIVITIES.map((item) => (
          <article key={item.id} className="border-b border-[#F4F4F4] px-4 py-4">
            {item.type === "repost" && (
              <p className="mb-2 flex items-center gap-1 text-[10px] text-[#8D8D8D]">
                <RepostIcon />
                {item.repostedBy} reposted this
              </p>
            )}

            <div className="flex items-start gap-2">
              <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-[#EDEDED] text-[10px] font-semibold text-[#8D8D8D]">
                {item.author.charAt(0)}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-[11px] font-semibold text-[#080707]">{item.author}</p>
                    <p className="text-[10px] text-[#8D8D8D]">{item.role} · {item.time}</p>
                  </div>
                  <button type="button" className="flex-shrink-0 text-[#C0C0C0] transition hover:text-[#8D8D8D]">
                    <DotsIcon />
                  </button>
                </div>

                <p className="mt-2 whitespace-pre-line text-[11px] leading-relaxed text-[#3D3D3D] line-clamp-4">
                  {item.content}
                </p>

                {item.imageBg && (
                  <div
                    className="mt-2 h-[80px] w-full rounded-lg"
                    style={{ background: item.imageBg }}
                    aria-hidden="true"
                  />
                )}

                <div className="mt-3 flex items-center gap-3 text-[#8D8D8D]">
                  <span className="flex items-center gap-1 text-[10px]"><LikeIcon />{item.likes}</span>
                  <span className="flex items-center gap-1 text-[10px]"><CommentIcon />{item.comments}</span>
                  <button type="button" className="ml-auto transition hover:text-[#080707]"><RepostIcon /></button>
                  <button type="button" className="transition hover:text-[#080707]"><ShareIcon /></button>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
