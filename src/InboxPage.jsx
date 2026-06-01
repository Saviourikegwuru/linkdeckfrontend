import { useState, useMemo, useRef, useEffect } from "react";
import DashboardSidebar from "./components/dashboard/DashboardSidebar";
import DashboardTopbar from "./components/dashboard/DashboardTopbar";
import InboxList from "./components/inbox/InboxList";
import InboxConversation from "./components/inbox/InboxConversation";
import InboxProfilePanel from "./components/inbox/InboxProfilePanel";
import InboxLabelsModal from "./components/inbox/InboxLabelsModal";
import InboxCreateLabelModal from "./components/inbox/InboxCreateLabelModal";
import InboxSnoozeModal from "./components/inbox/InboxSnoozeModal";
import InboxScheduleModal from "./components/inbox/InboxScheduleModal";
import { LABELS, CONVERSATIONS } from "./components/inbox/inboxData";
import { useAuth } from "./context/AuthContext";
import { getRecentConversations, sendMessage as apiSendMessage } from "./services/messages";
const MOCK_STREAMS = [
  { id: "s1", name: "Content Monitoring" },
  { id: "inbox", name: "Inbox" },
  { id: "s3", name: "Another Stream" },
];

export default function InboxPage() {
  const { user } = useAuth();
  /* ── State ──────────────────────────────────────────────────── */
  const [mailbox, setMailbox] = useState("inbox");
  const [filter, setFilter] = useState("All");
  const [openIds, setOpenIds] = useState([]);          /* ordered list of open conversation ids */
  const [checkedIds, setCheckedIds] = useState(new Set());
  const [searchQuery, setSearchQuery] = useState("");
  const [labels, setLabels] = useState(LABELS);
  const [conversations, setConversations] = useState(CONVERSATIONS);

  useEffect(() => {
    getRecentConversations()
      .then((data) => {
        const real = data?.conversations ?? [];
        if (real.length > 0) {
          setConversations(real.map((c) => ({
            id: c.id,
            name: c.from?.name || c.from?.email || "Unknown",
            title: c.text?.slice(0, 60) || "(no subject)",
            preview: c.text || "",
            unread: !c.readAt,
            mailbox: "inbox",
            labels: [],
            time: c.createdAt,
            _raw: c,
          })));
        }
      })
      .catch(() => {/* keep mock on error */});
  }, []);

  /* Modal visibility */
  const [showLabelsModal, setShowLabelsModal] = useState(false);
  const [showCreateLabel, setShowCreateLabel] = useState(false);
  const [showSnooze, setShowSnooze] = useState(false);
  const [showSchedule, setShowSchedule] = useState(false);

  /* Which conversation's labels are being assigned */
  const [labelTargetId, setLabelTargetId] = useState(null);

  /* Drag-and-drop reorder for columns */
  const draggedIdx = useRef(null);
  const [dragOverIdx, setDragOverIdx] = useState(null);

  /* ── Derived ────────────────────────────────────────────────── */
  const filtered = useMemo(() => {
    let list = conversations.filter((c) => c.mailbox === mailbox);
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (c) =>
          c.name.toLowerCase().includes(q) ||
          c.title.toLowerCase().includes(q) ||
          c.preview.toLowerCase().includes(q)
      );
    }
    if (filter === "Unread") list = list.filter((c) => c.unread);
    if (filter === "High Priority") list = list.filter((c) => c.labels.includes("hot-lead"));
    if (filter === "Follow Ups") list = list.filter((c) => c.labels.includes("follow-up"));
    return list;
  }, [conversations, mailbox, searchQuery, filter]);

  /* ── Handlers ───────────────────────────────────────────────── */
  const openConversation = (id) => {
    setOpenIds((prev) => (prev.includes(id) ? prev : [...prev, id]));
  };

  const closeConversation = (id) => {
    setOpenIds((prev) => prev.filter((x) => x !== id));
  };

  const toggleCheck = (id) => {
    setCheckedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const checkAll = () => {
    if (checkedIds.size === filtered.length) setCheckedIds(new Set());
    else setCheckedIds(new Set(filtered.map((c) => c.id)));
  };

  const moveToMailbox = (ids, target) => {
    setConversations((prev) =>
      prev.map((c) => (ids.has(c.id) ? { ...c, mailbox: target } : c))
    );
    setCheckedIds(new Set());
    setOpenIds((prev) => prev.filter((id) => !ids.has(id)));
  };

  const handleArchive = () => {
    const ids = checkedIds.size > 0 ? checkedIds : new Set();
    if (ids.size) moveToMailbox(ids, "archive");
  };

  const handleTrash = () => {
    const ids = checkedIds.size > 0 ? checkedIds : new Set();
    if (ids.size) moveToMailbox(ids, "trash");
  };

  const handleArchiveSingle = (id) => moveToMailbox(new Set([id]), "archive");
  const handleTrashSingle = (id) => moveToMailbox(new Set([id]), "trash");

  const handleSaveLabel = ({ name, color }) => {
    const id = name.toLowerCase().replace(/\s+/g, "-");
    setLabels((prev) => [
      ...prev,
      { id, name, color, bg: color + "22", description: "" },
    ]);
    setShowCreateLabel(false);
    setShowLabelsModal(true);
  };

  const handleAssignLabel = (labelId) => {
    if (!labelTargetId) return;
    setConversations((prev) =>
      prev.map((c) =>
        c.id === labelTargetId
          ? { ...c, labels: c.labels.includes(labelId) ? c.labels : [...c.labels, labelId] }
          : c
      )
    );
  };

  const openLabelForConv = (convId) => {
    setLabelTargetId(convId);
    setShowLabelsModal(true);
  };

  /* ── Drag-and-drop ──────────────────────────────────────────── */
  function handleDragStart(idx) { draggedIdx.current = idx; }
  function handleDragOver(e, idx) { e.preventDefault(); if (draggedIdx.current !== idx) setDragOverIdx(idx); }
  function handleDrop(idx) {
    const from = draggedIdx.current;
    if (from === null || from === idx) return;
    setOpenIds((prev) => {
      const next = [...prev];
      const [moved] = next.splice(from, 1);
      next.splice(idx, 0, moved);
      return next;
    });
  }
  function handleDragEnd() { draggedIdx.current = null; setDragOverIdx(null); }

  return (
    <div className="flex h-screen overflow-hidden bg-[#F8F9FA]">
      <DashboardSidebar
        user={user}
        streams={MOCK_STREAMS}
        activeStreamId="inbox"
        onSelectStream={(id) => {
          if (id === "inbox") return;
        }}
      />

      <div className="flex flex-1 flex-col overflow-hidden">
        <DashboardTopbar user={user} streamName="Inbox" />

        <main className="flex flex-1 overflow-hidden bg-[#F0F1F3]">
          {/* Horizontally scrolling columns container */}
          <div className="flex h-full items-start gap-3 overflow-x-auto p-4">
            {/* Inbox List — always first column */}
            <div className="flex-shrink-0 h-full">
              <InboxList
                conversations={filtered}
                mailbox={mailbox}
                filter={filter}
                selectedId={openIds.length > 0 ? openIds[openIds.length - 1] : null}
                checkedIds={checkedIds}
                searchQuery={searchQuery}
                labels={labels}
                onSelectMailbox={(m) => { setMailbox(m); setFilter("All"); setOpenIds([]); setCheckedIds(new Set()); }}
                onSelectFilter={setFilter}
                onSelectConversation={openConversation}
                onToggleCheck={toggleCheck}
                onCheckAll={checkAll}
                onSearchChange={setSearchQuery}
                onArchive={handleArchive}
                onTrash={handleTrash}
                onSnooze={() => setShowSnooze(true)}
                onSchedule={() => setShowSchedule(true)}
                onExport={() => {}}
              />
            </div>

            {/* Open conversation + profile columns */}
            {openIds.map((id, idx) => {
              const conv = conversations.find((c) => c.id === id);
              if (!conv) return null;
              return (
                <div
                  key={id}
                  draggable
                  onDragStart={() => handleDragStart(idx)}
                  onDragOver={(e) => handleDragOver(e, idx)}
                  onDrop={() => handleDrop(idx)}
                  onDragEnd={handleDragEnd}
                  className={[
                    "flex flex-shrink-0 h-full gap-3 transition-all duration-150 cursor-grab active:cursor-grabbing",
                    draggedIdx.current === idx ? "opacity-40 scale-[0.98]" : "opacity-100",
                    dragOverIdx === idx && draggedIdx.current !== idx ? "ring-2 ring-[#0066FF] rounded-xl" : "",
                  ].join(" ")}
                >
                  <InboxConversation
                    conversation={conv}
                    onClose={() => closeConversation(id)}
                    onSnooze={() => setShowSnooze(true)}
                    onSchedule={() => setShowSchedule(true)}
                    onArchive={() => handleArchiveSingle(id)}
                    onExport={() => {}}
                    onTrash={() => handleTrashSingle(id)}
                    onLabel={() => openLabelForConv(id)}
                    onSendMessage={(text) => {
                      const toId = conv._raw?.fromId;
                      if (toId) apiSendMessage({ toId, text }).catch(() => {});
                    }}
                  />
                  <InboxProfilePanel
                    conversation={conv}
                    onClose={() => closeConversation(id)}
                    onSnooze={() => setShowSnooze(true)}
                    onSchedule={() => setShowSchedule(true)}
                    onArchive={() => handleArchiveSingle(id)}
                    onExport={() => {}}
                    onTrash={() => handleTrashSingle(id)}
                    onLabel={() => openLabelForConv(id)}
                  />
                </div>
              );
            })}
          </div>
        </main>
      </div>

      {/* ── Modals ────────────────────────────────────────────── */}
      {showLabelsModal && (
        <InboxLabelsModal
          labels={labels}
          onClose={() => { setShowLabelsModal(false); setLabelTargetId(null); }}
          onCreateLabel={() => { setShowLabelsModal(false); setShowCreateLabel(true); }}
          onSelectLabel={handleAssignLabel}
        />
      )}
      {showCreateLabel && (
        <InboxCreateLabelModal
          labels={labels}
          onClose={() => { setShowCreateLabel(false); setShowLabelsModal(true); }}
          onSave={handleSaveLabel}
        />
      )}
      {showSnooze && (
        <InboxSnoozeModal
          onClose={() => setShowSnooze(false)}
          onSnooze={() => setShowSnooze(false)}
          onPickDateTime={() => { setShowSnooze(false); setShowSchedule(true); }}
        />
      )}
      {showSchedule && (
        <InboxScheduleModal
          onClose={() => setShowSchedule(false)}
          onSchedule={() => setShowSchedule(false)}
        />
      )}
    </div>
  );
}
