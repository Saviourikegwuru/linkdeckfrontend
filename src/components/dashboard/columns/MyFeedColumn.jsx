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
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <path d="M4 6V12M4 6L6.5 2.5C7.5 2.5 8 3 8 4V5.5H11.5L10.5 11H4V6Z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
    </svg>
  );
}

function CommentIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <path d="M2 2h10a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1H4L1 13V3a1 1 0 0 1 1-1z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
    </svg>
  );
}

function ShareIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <path d="M2 7v4a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V7M7 1v8M4.5 3.5L7 1l2.5 2.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function BookmarkIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <path d="M3 1h8v12l-4-3-4 3V1z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
    </svg>
  );
}

/* ── Mock posts ─────────────────────────────────────────────── */
const FEED_POSTS = [
  {
    id: 1,
    author: "Janet Smith",
    role: "Growth Lead at Elevate Digital",
    time: "1hr ago",
    avatar: null,
    content:
      "Grateful for how far our team has come this quarter. 🔥\n\nWe set out to improve our LinkedIn engagement, and the results speak for themselves—stronger reach, better conversations, and real leads.\n\nBig thanks to everyone who contributed. On to the next milestone. 🎯\n\n#Growth #B2B #LinkedInMarketing #StartupLife #Milestones",
    imageBg: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    likes: 41,
    comments: 48
  },
  {
    id: 2,
    author: "Emily Wang",
    role: "Founder at MarketLabs",
    time: "1day ago",
    avatar: null,
    content:
      "Just finished an amazing podcast episode with thought leaders in the marketing industry.\n\nWe discussed the latest trends in AI-driven campaigns.\n\nCheck it out!\n\n🎙 #AI #MarketingTrends #Podcast",
    imageBg: "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)",
    likes: 20,
    comments: 6
  },
  {
    id: 3,
    author: "Michael Robinson",
    role: "Senior Sales Consultant at SalesForce",
    time: "1wk ago",
    avatar: null,
    content:
      "Just read this fantastic article on the future of sales in the digital world. Highly recommend it for anyone trying to stay ahead of the curve.",
    imageBg: "linear-gradient(135deg, #cc2b5e 0%, #753a88 100%)",
    likes: 74,
    comments: 20
  },
  {
    id: 4,
    author: "Sarah Johnson",
    role: "Head of Marketing at Innovate Solutions",
    time: "1wk ago",
    avatar: null,
    content:
      "Thrilled to announce our upcoming webinar on the latest digital marketing techniques! It's free, and we'll have some industry experts sharing insights. Don't miss out!\n\n🌟 #Webinar #MarketingTips #DigitalGrowth",
    imageBg: null,
    likes: null,
    comments: null
  }
];

/* ── Column ─────────────────────────────────────────────────── */
export default function MyFeedColumn() {
  return (
    <div className="flex h-full w-[403px] flex-shrink-0 flex-col rounded-xl bg-white overflow-hidden">
      {/* Column header */}
      <div className="flex flex-shrink-0 items-center gap-2 border-b border-[#EDEDED] px-4 py-3">
        <span className="cursor-grab text-[#C0C0C0]"><DragIcon /></span>
        <span className="flex-1 text-sm font-semibold text-[#080707]">My Feed</span>
        <button type="button" className="text-[#C0C0C0] transition hover:text-[#8D8D8D]" aria-label="Options">
          <DotsIcon />
        </button>
      </div>

      {/* Scrollable posts */}
      <div className="flex-1 overflow-y-auto">
        {FEED_POSTS.map((post) => (
          <article key={post.id} className="border-b border-[#F4F4F4] px-4 py-4">
            {/* Author */}
            <div className="flex items-start gap-2">
              <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-[#EDEDED] text-[10px] font-semibold text-[#8D8D8D]">
                {post.author.charAt(0)}
              </div>
              <div className="min-w-0">
                <p className="truncate text-[11px] font-semibold text-[#080707]">{post.author}</p>
                <p className="truncate text-[10px] text-[#8D8D8D]">{post.role} · {post.time}</p>
              </div>
            </div>

            {/* Content */}
            <p className="mt-2.5 whitespace-pre-line text-[11px] leading-relaxed text-[#3D3D3D] line-clamp-5">
              {post.content}
            </p>

            {/* Image placeholder */}
            {post.imageBg && (
              <div
                className="mt-2.5 h-[90px] w-full rounded-lg"
                style={{ background: post.imageBg }}
                aria-hidden="true"
              />
            )}

            {/* Actions */}
            {post.likes != null && (
              <div className="mt-3 flex items-center gap-3 text-[#8D8D8D]">
                <span className="flex items-center gap-1 text-[10px]">
                  <LikeIcon />
                  {post.likes}
                </span>
                <span className="flex items-center gap-1 text-[10px]">
                  <CommentIcon />
                  {post.comments}
                </span>
                <span className="ml-auto flex items-center gap-3">
                  <button type="button" className="transition hover:text-[#080707]"><ShareIcon /></button>
                  <button type="button" className="transition hover:text-[#080707]"><BookmarkIcon /></button>
                </span>
              </div>
            )}
          </article>
        ))}
      </div>
    </div>
  );
}
