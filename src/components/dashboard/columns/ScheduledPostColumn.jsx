import { useState, useEffect } from "react";
import ScheduleDateTimeModal from "../ScheduleDateTimeModal";
import { getPosts, createPost, publishPost } from "../../../services/posts";

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

function EmojiIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
      <circle cx="9" cy="9" r="7.5" stroke="#8D8D8D" strokeWidth="1.3" />
      <circle cx="6.5" cy="7.5" r="1" fill="#8D8D8D" />
      <circle cx="11.5" cy="7.5" r="1" fill="#8D8D8D" />
      <path d="M6 11.5c.8 1.2 2 1.8 3 1.8s2.2-.6 3-1.8" stroke="#8D8D8D" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  );
}

function ImageIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
      <rect x="2" y="3" width="14" height="12" rx="2" stroke="#8D8D8D" strokeWidth="1.3" />
      <circle cx="6.5" cy="7.5" r="1.5" stroke="#8D8D8D" strokeWidth="1.3" />
      <path d="M2 12l4-3 3 3 2-2 5 4" stroke="#8D8D8D" strokeWidth="1.3" strokeLinejoin="round" />
    </svg>
  );
}

function DocIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
      <path d="M4 2h7l4 4v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1Z" stroke="#8D8D8D" strokeWidth="1.3" strokeLinejoin="round" />
      <path d="M11 2v4h4M6 9h6M6 12h4" stroke="#8D8D8D" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  );
}

function ClockBlueIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <circle cx="8" cy="8" r="6.5" fill="#0066FF" />
      <path d="M8 4.5V8l2.5 1.5" stroke="white" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function TrashIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M2 4h12M6 4V2h4v2M5 4l1 10h4l1-10" stroke="#8D8D8D" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ArrowRightIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const MAX_CHARS = 3000;

export default function ScheduledPostColumn({ activeAccount }) {
  const [content, setContent] = useState("");
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [posts, setPosts] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const charCount = content.length;
  const profileId = activeAccount?.profileId;

  useEffect(() => {
    getPosts({ status: "scheduled" })
      .then((data) => setPosts(data?.posts ?? []))
      .catch(() => {});
  }, []);

  async function handlePost() {
    if (!content.trim() || !profileId || isSubmitting) return;
    setIsSubmitting(true);
    try {
      const { post } = await createPost({
        text: content,
        destinations: [{ type: "PERSONAL", id: profileId }],
      });
      await publishPost(post.id);
      setContent("");
    } catch (err) {
      console.error("Failed to post:", err);
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleSchedule({ date, time }) {
    if (!content.trim() || !profileId || isSubmitting) return;
    setIsSubmitting(true);
    try {
      const scheduleAt = new Date(`${date}T${time}`).toISOString();
      const { post } = await createPost({
        text: content,
        destinations: [{ type: "PERSONAL", id: profileId }],
        schedule_at: scheduleAt,
      });
      setPosts((prev) => [post, ...prev]);
      setContent("");
      setShowScheduleModal(false);
    } catch (err) {
      console.error("Failed to schedule post:", err);
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleSaveDraft() {
    if (!content.trim() || !profileId || isSubmitting) return;
    setIsSubmitting(true);
    try {
      await createPost({
        text: content,
        destinations: [{ type: "PERSONAL", id: profileId }],
      });
      setContent("");
    } catch (err) {
      console.error("Failed to save draft:", err);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <>
      <div className="flex h-full w-[403px] flex-shrink-0 flex-col rounded-xl bg-white overflow-hidden">
        {/* Header */}
        <div className="flex flex-shrink-0 items-center gap-2 border-b border-[#EDEDED] px-4 py-3">
          <span className="cursor-grab text-[#C0C0C0]"><DragIcon /></span>
          <span className="flex-1 text-sm font-semibold text-[#080707]">Scheduled Post</span>
          {posts.length > 0 && (
            <span className="rounded-md bg-[#EEF3FF] px-1.5 py-0.5 text-[10px] font-semibold text-[#0066FF]">
              {posts.length} scheduled
            </span>
          )}
          <button type="button" className="text-[#C0C0C0] transition hover:text-[#8D8D8D]" aria-label="Options">
            <DotsIcon />
          </button>
        </div>

        {/* Compose area */}
        {!profileId ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-3 px-6 text-center">
            <p className="text-sm font-semibold text-[#080707]">No LinkedIn profile connected</p>
            <p className="text-xs text-[#8D8D8D]">
              Connect a LinkedIn profile in Settings to start posting.
            </p>
          </div>
        ) : (
        <div className="flex flex-1 flex-col overflow-y-auto px-4 py-4">
          <p className="text-xs font-semibold text-[#080707]">Post content</p>

          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value.slice(0, MAX_CHARS))}
            placeholder="What's on your mind?, share your professional updates..."
            rows={7}
            className="mt-2 w-full resize-none border-b border-[#EDEDED] bg-transparent text-[11px] leading-relaxed text-[#080707] placeholder:text-[#C0C0C0] focus:outline-none"
          />

          {/* Toolbar */}
          <div className="mt-2 flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 text-[#8D8D8D]">
              <button type="button" className="transition hover:text-[#080707]" aria-label="Emoji"><EmojiIcon /></button>
              <button type="button" className="transition hover:text-[#080707]" aria-label="Image"><ImageIcon /></button>
              <button type="button" className="transition hover:text-[#080707]" aria-label="Document"><DocIcon /></button>
            </div>
            <span className="text-[10px] text-[#8D8D8D]">{charCount}/{MAX_CHARS}</span>
          </div>

          {/* Draft actions */}
          <div className="mt-3 flex items-center gap-3">
            <button
              type="button"
              onClick={() => setContent("")}
              disabled={isSubmitting}
              className="flex items-center gap-1 text-[11px] text-[#8D8D8D] transition hover:text-[#080707] disabled:opacity-50"
            >
              <TrashIcon />
              Discard
            </button>
            <button
              type="button"
              onClick={handleSaveDraft}
              disabled={isSubmitting || !content.trim()}
              className="text-[11px] text-[#8D8D8D] transition hover:text-[#080707] disabled:opacity-50"
            >
              Save as Draft
            </button>
          </div>

          {/* Main action buttons */}
          <div className="mt-4 grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={handlePost}
              disabled={isSubmitting || !content.trim()}
              className="rounded-xl bg-[#0066FF] py-2.5 text-sm font-semibold text-white transition hover:bg-[#005ae0] disabled:opacity-60"
            >
              {isSubmitting ? "Posting…" : "Post"}
            </button>
            <button
              type="button"
              onClick={() => setShowScheduleModal(true)}
              disabled={isSubmitting || !content.trim()}
              className="flex items-center justify-center gap-1.5 rounded-xl border border-[#0066FF] py-2.5 text-sm font-semibold text-[#0066FF] transition hover:bg-[#EEF3FF] disabled:opacity-60"
            >
              <ClockBlueIcon />
              Schedule
            </button>
          </div>

          {/* View all link */}
          <button type="button" className="mt-4 flex items-center gap-1 self-start text-[11px] font-medium text-[#0066FF] transition hover:underline">
            View all scheduled posts
            <ArrowRightIcon />
          </button>
        </div>
        )}
      </div>

      {showScheduleModal && (
        <ScheduleDateTimeModal
          onClose={() => setShowScheduleModal(false)}
          onSchedule={handleSchedule}
        />
      )}
    </>
  );
}
