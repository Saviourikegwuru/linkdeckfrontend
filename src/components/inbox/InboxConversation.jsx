import { useState } from "react";
import { AI_SUGGESTIONS } from "./inboxData";

/* ── Action icons ─────────────────────────────────────────────── */
function MoveIcon() {
  return <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M8 1v14M1 8h14M8 1l-2 2M8 1l2 2M8 15l-2-2M8 15l2-2M1 8l2-2M1 8l2 2M15 8l-2-2M15 8l-2 2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" /></svg>;
}
function CloseXIcon() {
  return <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>;
}
function LabelIcon() {
  return <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M1.5 2.5h5l5.5 5.5-4 4L2.5 6.5v-4z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" /><circle cx="5" cy="5" r="1" fill="currentColor" /></svg>;
}
function SnoozeIcon() {
  return <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><circle cx="7" cy="7" r="5.5" stroke="currentColor" strokeWidth="1.2" /><path d="M7 4v3.5l2.5 1.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" /></svg>;
}
function ScheduleIcon() {
  return <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><rect x="1.5" y="2" width="11" height="10" rx="1.5" stroke="currentColor" strokeWidth="1.2" /><path d="M1.5 5.5h11M4.5 1v2M9.5 1v2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" /></svg>;
}
function ArchiveIcon() {
  return <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M1.5 3.5h11v8a1 1 0 01-1 1h-9a1 1 0 01-1-1v-8z" stroke="currentColor" strokeWidth="1.2" /><path d="M.5 1.5h13v2H.5z" stroke="currentColor" strokeWidth="1.2" /><path d="M5 7h4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" /></svg>;
}
function ExportIcon() {
  return <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M7 1.5v8M4 4.5l3-3 3 3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" /><path d="M2 10v2h10v-2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" /></svg>;
}
function TrashIcon() {
  return <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2 3.5h10M5 3.5V2h4v1.5M5.5 6v4M8.5 6v4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" /><path d="M3 3.5l.6 8a1 1 0 001 .9h4.8a1 1 0 001-.9l.6-8" stroke="currentColor" strokeWidth="1.2" /></svg>;
}
function SparkleIcon() {
  return <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M7 1l1.5 4.5L13 7l-4.5 1.5L7 13l-1.5-4.5L1 7l4.5-1.5L7 1z" stroke="currentColor" strokeWidth="1" strokeLinejoin="round" /></svg>;
}
function EmojiIcon() {
  return <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><circle cx="9" cy="9" r="7" stroke="#8D8D8D" strokeWidth="1.3" /><circle cx="6.5" cy="7.5" r="0.8" fill="#8D8D8D" /><circle cx="11.5" cy="7.5" r="0.8" fill="#8D8D8D" /><path d="M6 11a3.5 3.5 0 006 0" stroke="#8D8D8D" strokeWidth="1.3" strokeLinecap="round" /></svg>;
}
function ImageIcon() {
  return <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><rect x="2" y="3" width="14" height="12" rx="2" stroke="#8D8D8D" strokeWidth="1.3" /><circle cx="6.5" cy="7.5" r="1.5" stroke="#8D8D8D" strokeWidth="1.2" /><path d="M2 13l4-4 3 3 2-2 5 3" stroke="#8D8D8D" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" /></svg>;
}
function AttachIcon() {
  return <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M15 9l-6.3 6.3a3.5 3.5 0 01-5-5L10 4a2.3 2.3 0 013.3 3.3L7 13.5a1.2 1.2 0 01-1.6-1.6L11 6" stroke="#8D8D8D" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" /></svg>;
}
function SendArrowIcon() {
  return <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M7 1.5v8M4 4.5l3-3 3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>;
}
function ReloadIcon() {
  return <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M1.5 6a4.5 4.5 0 018-2.8M10.5 6a4.5 4.5 0 01-8 2.8" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" /><path d="M9.5 1v2.2h-2.2M2.5 11V8.8h2.2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" /></svg>;
}
function CheckIcon() {
  return <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>;
}

export default function InboxConversation({
  conversation,
  onClose,
  onSnooze,
  onSchedule,
  onArchive,
  onExport,
  onTrash,
  onLabel,
  onSendMessage,
}) {
  const [replyText, setReplyText] = useState("");
  const [showAi, setShowAi] = useState(false);
  const [selectedSuggestion, setSelectedSuggestion] = useState(null);
  const [messages, setMessages] = useState(conversation?.messages || []);

  if (!conversation) {
    return <div className="flex h-full w-[403px] flex-shrink-0 items-center justify-center rounded-xl bg-white" />;
  }

  const handleSend = () => {
    if (!replyText.trim() && selectedSuggestion === null) return;
    const text = replyText.trim() || AI_SUGGESTIONS[selectedSuggestion];
    setMessages((prev) => [
      ...prev,
      { id: Date.now(), sender: "me", text, time: new Date().toLocaleTimeString([], { hour: "numeric", minute: "2-digit" }).toLowerCase(), date: prev[prev.length - 1]?.date || "" },
    ]);
    if (onSendMessage) onSendMessage(text);
    setReplyText("");
    setSelectedSuggestion(null);
    setShowAi(false);
  };

  /* Group messages by date */
  const grouped = [];
  let lastDate = "";
  messages.forEach((m) => {
    if (m.date !== lastDate) {
      grouped.push({ type: "date", date: m.date });
      lastDate = m.date;
    }
    grouped.push({ type: "msg", ...m });
  });

  return (
    <div className="flex h-full w-[403px] flex-shrink-0 flex-col rounded-xl bg-white overflow-hidden">
      {/* Header */}
      <div className="flex items-start justify-between border-b border-[#EDEDED] px-5 py-3">
        <div className="flex items-start gap-3">
          <button type="button" className="mt-0.5 text-[#8D8D8D] hover:text-[#080707]"><MoveIcon /></button>
          <div>
            <p className="text-sm font-semibold text-[#080707]">{conversation.name}</p>
            <p className="text-xs text-[#8D8D8D]">{conversation.title}</p>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <button type="button" onClick={onLabel} className="rounded p-1.5 text-[#8D8D8D] hover:bg-[#F3F4F6] hover:text-[#080707]" title="Labels"><LabelIcon /></button>
          <button type="button" onClick={onSnooze} className="rounded p-1.5 text-[#8D8D8D] hover:bg-[#F3F4F6] hover:text-[#080707]" title="Snooze"><SnoozeIcon /></button>
          <button type="button" onClick={onSchedule} className="rounded p-1.5 text-[#8D8D8D] hover:bg-[#F3F4F6] hover:text-[#080707]" title="Schedule"><ScheduleIcon /></button>
          <button type="button" onClick={onArchive} className="rounded p-1.5 text-[#8D8D8D] hover:bg-[#F3F4F6] hover:text-[#080707]" title="Archive"><ArchiveIcon /></button>
          <button type="button" onClick={onExport} className="rounded p-1.5 text-[#8D8D8D] hover:bg-[#F3F4F6] hover:text-[#080707]" title="Export"><ExportIcon /></button>
          <button type="button" onClick={onTrash} className="rounded p-1.5 text-[#8D8D8D] hover:bg-[#F3F4F6] hover:text-[#080707]" title="Trash"><TrashIcon /></button>
          <button type="button" onClick={onClose} className="ml-1 rounded p-1.5 text-[#8D8D8D] hover:bg-[#F3F4F6] hover:text-[#080707]"><CloseXIcon /></button>
        </div>
      </div>

      {/* Messages area */}
      <div className="flex-1 overflow-y-auto px-5 py-4 space-y-3">
        {grouped.map((item, i) => {
          if (item.type === "date") {
            return (
              <div key={"d-" + i} className="flex items-center justify-center py-3">
                <span className="text-xs font-medium text-[#8D8D8D]">{item.date}</span>
              </div>
            );
          }
          const isMe = item.sender === "me";
          return (
            <div key={item.id} className={"flex " + (isMe ? "justify-end" : "justify-start")}>
              <div className={"max-w-[80%] space-y-1"}>
                <div
                  className={"rounded-2xl px-4 py-3 text-sm leading-relaxed " + (
                    isMe
                      ? "bg-[#0066FF] text-white rounded-br-md"
                      : "bg-[#F3F4F6] text-[#080707] rounded-bl-md"
                  )}
                >
                  {item.text}
                </div>
                <div className={"flex items-center gap-1 " + (isMe ? "justify-end" : "justify-start")}>
                  <span className="text-[10px] text-[#C4C4C4]">{item.time}</span>
                  {isMe && <span className="text-[10px] font-medium text-[#0066FF]">Me</span>}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Reply composer */}
      <div className="border-t border-[#EDEDED] px-5 py-3">
        <div className="flex items-center justify-between">
          <input
            type="text"
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder="Write a reply"
            className="flex-1 text-sm text-[#080707] outline-none placeholder:text-[#C4C4C4]"
          />
          <button
            type="button"
            onClick={() => setShowAi(!showAi)}
            className="flex items-center gap-1 text-xs font-medium text-[#0066FF] transition hover:text-[#005ae0]"
          >
            <SparkleIcon />
            Use AI suggestion
          </button>
        </div>

        {/* AI suggestions */}
        {showAi && (
          <div className="mt-2 space-y-1.5">
            {AI_SUGGESTIONS.map((s, i) => (
              <button
                key={i}
                type="button"
                onClick={() => { setSelectedSuggestion(i); setReplyText(s); }}
                className={"flex w-full items-center gap-2 rounded-xl border px-3 py-2 text-left text-xs transition " + (
                  selectedSuggestion === i
                    ? "border-[#0066FF] bg-[#EEF3FF] text-[#0066FF]"
                    : "border-[#0066FF] text-[#0066FF] hover:bg-[#F4F7FF]"
                )}
              >
                <span className="flex-1">{s}</span>
                {selectedSuggestion === i && <CheckIcon />}
                {i === AI_SUGGESTIONS.length - 1 && selectedSuggestion !== i && (
                  <span className="flex items-center gap-1 text-[#EF4444]">
                    <ReloadIcon /> Reload
                  </span>
                )}
              </button>
            ))}
          </div>
        )}

        {/* Toolbar */}
        <div className="mt-2 flex items-center justify-between">
          <div className="flex items-center gap-1">
            <button type="button" className="rounded p-1 transition hover:bg-[#F3F4F6]"><EmojiIcon /></button>
            <button type="button" className="rounded p-1 transition hover:bg-[#F3F4F6]"><ImageIcon /></button>
            <button type="button" className="rounded p-1 transition hover:bg-[#F3F4F6]"><AttachIcon /></button>
          </div>
          <button
            type="button"
            onClick={handleSend}
            className="flex items-center gap-1.5 rounded-xl bg-[#0066FF] px-5 py-2 text-sm font-semibold text-white transition hover:bg-[#005ae0]"
          >
            Send
            {showAi && selectedSuggestion !== null && <SendArrowIcon />}
          </button>
        </div>
      </div>
    </div>
  );
}
