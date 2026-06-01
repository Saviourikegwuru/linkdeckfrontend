import { useState } from "react";

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
function BriefcaseIcon() {
  return <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><rect x="1" y="4" width="12" height="8" rx="1.5" stroke="#0066FF" strokeWidth="1.2" /><path d="M5 4V2.5A1 1 0 016 1.5h2a1 1 0 011 1V4" stroke="#0066FF" strokeWidth="1.2" /></svg>;
}
function LocationIcon() {
  return <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M7 13S2.5 8.5 2.5 5.5a4.5 4.5 0 019 0C11.5 8.5 7 13 7 13z" stroke="#10B981" strokeWidth="1.2" /><circle cx="7" cy="5.5" r="1.5" stroke="#10B981" strokeWidth="1.2" /></svg>;
}
function EmailIcon() {
  return <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><rect x="1" y="3" width="12" height="8" rx="1.5" stroke="#0066FF" strokeWidth="1.2" /><path d="M1 4.5l6 3.5 6-3.5" stroke="#0066FF" strokeWidth="1.2" strokeLinecap="round" /></svg>;
}
function LinkedInIcon() {
  return <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M11 7.5V11M3 5v6M3 3h.01M7 11V8.5a2 2 0 014 0M7 11V7" stroke="#0066FF" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" /></svg>;
}
function EditIcon() {
  return <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M8.5 2.5l3 3L5 12H2v-3l6.5-6.5z" stroke="#0066FF" strokeWidth="1.2" strokeLinejoin="round" /></svg>;
}

const LABEL_COLORS = {
  Recruiting: { color: "#0066FF", bg: "#DBEAFE" },
  Fintech: { color: "#F97316", bg: "#FFF7ED" },
  "Hot Lead": { color: "#EF4444", bg: "#FEE2E2" },
  Partner: { color: "#0066FF", bg: "#DBEAFE" },
  Community: { color: "#3B82F6", bg: "#DBEAFE" },
};

export default function InboxProfilePanel({
  conversation,
  onClose,
  onSnooze,
  onSchedule,
  onArchive,
  onExport,
  onTrash,
  onLabel,
}) {
  const [note, setNote] = useState(conversation?.note || "");
  const [editingNote, setEditingNote] = useState(false);

  if (!conversation) {
    return <div className="w-[403px] flex-shrink-0 rounded-xl bg-white" />;
  }

  return (
    <div className="flex h-full w-[403px] flex-shrink-0 flex-col overflow-y-auto rounded-xl bg-white">
      {/* Header */}
      <div className="flex items-start justify-between border-b border-[#EDEDED] px-4 py-3">
        <div className="flex items-start gap-2">
          <button type="button" className="mt-0.5 text-[#8D8D8D] hover:text-[#080707]"><MoveIcon /></button>
          <p className="text-sm font-semibold text-[#080707]">{conversation.name}</p>
        </div>
        <div className="flex items-center gap-0.5">
          <button type="button" onClick={onLabel} className="rounded p-1 text-[#8D8D8D] hover:bg-[#F3F4F6] hover:text-[#080707]" title="Labels"><LabelIcon /></button>
          <button type="button" onClick={onSnooze} className="rounded p-1 text-[#8D8D8D] hover:bg-[#F3F4F6] hover:text-[#080707]"><SnoozeIcon /></button>
          <button type="button" onClick={onSchedule} className="rounded p-1 text-[#8D8D8D] hover:bg-[#F3F4F6] hover:text-[#080707]"><ScheduleIcon /></button>
          <button type="button" onClick={onArchive} className="rounded p-1 text-[#8D8D8D] hover:bg-[#F3F4F6] hover:text-[#080707]"><ArchiveIcon /></button>
          <button type="button" onClick={onExport} className="rounded p-1 text-[#8D8D8D] hover:bg-[#F3F4F6] hover:text-[#080707]"><ExportIcon /></button>
          <button type="button" onClick={onTrash} className="rounded p-1 text-[#8D8D8D] hover:bg-[#F3F4F6] hover:text-[#080707]"><TrashIcon /></button>
          <button type="button" onClick={onClose} className="rounded p-1 text-[#8D8D8D] hover:bg-[#F3F4F6] hover:text-[#080707]"><CloseXIcon /></button>
        </div>
      </div>

      <div className="flex-1 px-4 py-4 space-y-5">
        {/* Contact Details */}
        <div>
          <h3 className="mb-3 text-xs font-bold text-[#080707]">Contact Details</h3>
          <ul className="space-y-2.5">
            <li className="flex items-center gap-2">
              <BriefcaseIcon />
              <span className="text-xs text-[#080707]">{conversation.contact.role}</span>
            </li>
            <li className="flex items-center gap-2">
              <LocationIcon />
              <span className="text-xs text-[#080707]">{conversation.contact.location}</span>
            </li>
            <li className="flex items-center gap-2">
              <EmailIcon />
              <span className="text-xs text-[#0066FF]">{conversation.contact.email}</span>
            </li>
            <li className="flex items-center gap-2">
              <LinkedInIcon />
              <span className="text-xs text-[#0066FF]">{conversation.contact.linkedin}</span>
            </li>
          </ul>
        </div>

        {/* Labels */}
        {conversation.contactLabels && conversation.contactLabels.length > 0 && (
          <div>
            <h3 className="mb-3 text-xs font-bold text-[#080707]">Contact Details</h3>
            <div className="flex flex-wrap gap-2">
              {conversation.contactLabels.map((label) => {
                const style = LABEL_COLORS[label] || { color: "#0066FF", bg: "#DBEAFE" };
                return (
                  <span
                    key={label}
                    className="rounded-full px-3 py-1 text-xs font-semibold"
                    style={{ backgroundColor: style.bg, color: style.color }}
                  >
                    {label}
                  </span>
                );
              })}
            </div>
          </div>
        )}

        {/* Note */}
        <div>
          <div className="mb-2 flex items-center justify-between">
            <h3 className="text-xs font-bold text-[#080707]">Note</h3>
            <button type="button" onClick={() => setEditingNote(!editingNote)} className="text-[#0066FF]"><EditIcon /></button>
          </div>
          {editingNote ? (
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              onBlur={() => setEditingNote(false)}
              className="w-full rounded-lg border border-[#EDEDED] px-3 py-2 text-xs italic text-[#0066FF] outline-none focus:border-[#0066FF]"
              rows={3}
              autoFocus
            />
          ) : (
            <p className="text-xs italic leading-relaxed text-[#0066FF]">
              {note || "No notes yet"}
            </p>
          )}
        </div>

        {/* AI Summary */}
        {conversation.aiSummary && (
          <div>
            <div className="mb-2 flex items-center justify-between">
              <h3 className="text-xs font-bold text-[#080707]">AI Summary</h3>
              <button type="button" className="text-[#0066FF]"><EditIcon /></button>
            </div>
            <p className="text-xs leading-relaxed text-[#8D8D8D]">{conversation.aiSummary}</p>
          </div>
        )}
      </div>
    </div>
  );
}
