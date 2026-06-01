import { useState, useRef, useEffect } from "react";
import DashboardSidebar from "./components/dashboard/DashboardSidebar";
import DashboardTopbar from "./components/dashboard/DashboardTopbar";
import Tutorial from "./components/Tutorial";
import CreateStreamModal from "./components/dashboard/CreateStreamModal";
import AddColumnPanel from "./components/dashboard/AddColumnPanel";
import MyFeedColumn from "./components/dashboard/columns/MyFeedColumn";
import ScheduledPostColumn from "./components/dashboard/columns/ScheduledPostColumn";
import AllActivitiesColumn from "./components/dashboard/columns/AllActivitiesColumn";
import AddAnotherColumn from "./components/dashboard/columns/AddAnotherColumn";
import { useAuth } from "./context/AuthContext";
import { useWorkspace } from "./context/WorkspaceContext";
import { getColumns, createColumn, reorderColumns } from "./services/columns";

/* ── Column type mappings ─────────────────────────────────────── */
const FRONTEND_TO_BACKEND = {
  "my-feed": "home_feed",
  "schedule-posts": "scheduled_posts",
  "schedule-post": "scheduled_posts",
  "all-activities": "my_posts",
  "published-posts": "my_posts",
};

const BACKEND_TO_FRONTEND = {
  home_feed: "my-feed",
  scheduled_posts: "schedule-posts",
  my_posts: "all-activities",
};

/* ── Icons ──────────────────────────────────────────────────── */
function StreamsEmptyIcon() {
  return (
    <svg width="72" height="48" viewBox="0 0 72 48" fill="none" aria-hidden="true">
      <rect x="0" y="0" width="72" height="14" rx="7" fill="#EDEDED" />
      <rect x="0" y="34" width="72" height="14" rx="7" fill="#EDEDED" />
    </svg>
  );
}

function PlusIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M8 3v10M3 8h10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function LightbulbIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path
        d="M8 1a4.5 4.5 0 0 0-2 8.5V11h4V9.5A4.5 4.5 0 0 0 8 1Z"
        stroke="#0066FF"
        strokeWidth="1.3"
        strokeLinejoin="round"
        fill="#EEF3FF"
      />
      <path d="M6 11h4M6.5 13h3" stroke="#0066FF" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  );
}

/* ── Column ID → component renderer ─────────────────────────── */
function renderColumn(id, opts = {}) {
  switch (id) {
    case "my-feed":
      return <MyFeedColumn key={id} />;
    case "schedule-posts":
    case "schedule-post":
      return <ScheduledPostColumn key={id} activeAccount={opts.activeAccount} />;
    case "all-activities":
      return <AllActivitiesColumn key={id} />;
    default:
      return null;
  }
}

/* ── Empty state ─────────────────────────────────────────────── */
function NoStreamEmpty({ onCreateStream }) {
  return (
    <div className="flex h-full items-center justify-center p-8">
      <div className="w-full max-w-[480px] rounded-2xl border-2 border-dashed border-[#D9D9D9] bg-[#F8F9FA] px-10 py-14 text-center">
        <div className="flex justify-center">
          <StreamsEmptyIcon />
        </div>
        <h2 className="mt-6 text-2xl font-bold text-[#080707]">No stream Yet</h2>
        <p className="mt-3 text-sm leading-relaxed text-[#8D8D8D]">
          Create your stream to start monitoring your feed,
          <br />
          scheduling post and tracking performance
        </p>
        <button
          type="button"
          onClick={onCreateStream}
          className="mt-8 inline-flex items-center gap-2 rounded-xl bg-[#0066FF] px-8 py-3 text-sm font-semibold text-white transition hover:bg-[#005ae0]"
        >
          <PlusIcon />
          Create Stream
        </button>
      </div>
    </div>
  );
}

/* ── Getting Started hint tooltip ────────────────────────────── */
function GettingStartedHint() {
  return (
    <div className="absolute bottom-6 right-6 w-[220px] rounded-2xl border border-[#D6E4FF] bg-[#EEF3FF] p-4 shadow-[0_4px_20px_rgba(0,102,255,0.10)]">
      <div className="flex items-center gap-2">
        <LightbulbIcon />
        <span className="text-sm font-semibold text-[#0066FF]">Getting Started</span>
      </div>
      <p className="mt-2 text-xs leading-relaxed text-[#0066FF]/80">
        Streams help you organize different views of your LinkedIn activities.
        Create your first one to get started.
      </p>
    </div>
  );
}

/* ── Page ────────────────────────────────────────────────────── */
export default function DashboardPage() {
  const { user } = useAuth();
  const { activeAccount } = useWorkspace();
  const [streams, setStreams] = useState([]);
  const [dbColumns, setDbColumns] = useState([]);
  const [activeStreamId, setActiveStreamId] = useState(null);
  const [showCreateStreamModal, setShowCreateStreamModal] = useState(false);
  const [showAddColumnPanel, setShowAddColumnPanel] = useState(false);
  const [showTutorial, setShowTutorial] = useState(true);

  // Drag-and-drop reorder state
  const draggedIdx = useRef(null);
  const [dragOverIdx, setDragOverIdx] = useState(null);

  const activeStream = streams.find((s) => s.id === activeStreamId) ?? null;

  // Load persisted columns on mount
  useEffect(() => {
    getColumns()
      .then((data) => {
        const cols = data?.columns ?? [];
        setDbColumns(cols);

        const streamMap = new Map();
        [...cols]
          .sort((a, b) => (a.positionIndex ?? 0) - (b.positionIndex ?? 0))
          .forEach((col) => {
            const name = col.label ?? "My Workspace";
            if (!streamMap.has(name)) {
              streamMap.set(name, { id: name, name, columns: [] });
            }
            const fid = BACKEND_TO_FRONTEND[col.type];
            if (fid) streamMap.get(name).columns.push(fid);
          });

        const derived = Array.from(streamMap.values());
        if (derived.length > 0) {
          setStreams(derived);
          setActiveStreamId((prev) => prev ?? derived[0].id);
        }
      })
      .catch((err) => console.error("Failed to load columns:", err));
  }, []);

  function handleDragStart(idx) {
    draggedIdx.current = idx;
  }

  function handleDragOver(e, idx) {
    e.preventDefault();
    if (draggedIdx.current !== idx) setDragOverIdx(idx);
  }

  function handleDrop(idx) {
    const from = draggedIdx.current;
    if (from === null || from === idx) return;

    setStreams((prev) =>
      prev.map((s) => {
        if (s.id !== activeStreamId) return s;
        const cols = [...s.columns];
        const [moved] = cols.splice(from, 1);
        cols.splice(idx, 0, moved);
        return { ...s, columns: cols };
      })
    );

    // Persist reorder
    const streamName = activeStream?.name;
    const streamCols = dbColumns
      .filter((c) => (c.label ?? "My Workspace") === streamName)
      .sort((a, b) => (a.positionIndex ?? 0) - (b.positionIndex ?? 0));

    if (streamCols.length > 1) {
      const reordered = [...streamCols];
      const [moved] = reordered.splice(from, 1);
      reordered.splice(idx, 0, moved);
      reorderColumns({ columnIds: reordered.map((c) => c.id) }).catch(() => {});
    }
  }

  function handleDragEnd() {
    draggedIdx.current = null;
    setDragOverIdx(null);
  }

  /** Create a brand-new stream and make it active */
  async function handleCreateStream({ name, columns }) {
    const newStream = { id: name, name, columns };
    setStreams((prev) => [...prev, newStream]);
    setActiveStreamId(newStream.id);
    setShowCreateStreamModal(false);

    for (let i = 0; i < columns.length; i++) {
      const backendType = FRONTEND_TO_BACKEND[columns[i]];
      if (!backendType) continue;
      try {
        const data = await createColumn({ type: backendType, label: name, positionIndex: i });
        setDbColumns((prev) => [...prev, data.column]);
      } catch (err) {
        console.error("Failed to save column:", err);
      }
    }
  }

  /** Add a column to the currently active stream */
  async function handleAddColumn(columnId) {
    setStreams((prev) =>
      prev.map((s) =>
        s.id === activeStreamId
          ? { ...s, columns: [...new Set([...s.columns, columnId])] }
          : s
      )
    );
    setShowAddColumnPanel(false);

    const backendType = FRONTEND_TO_BACKEND[columnId];
    const streamName = activeStream?.name;
    if (backendType && streamName) {
      const existingInStream = dbColumns.filter(
        (c) => (c.label ?? "My Workspace") === streamName
      );
      try {
        const data = await createColumn({
          type: backendType,
          label: streamName,
          positionIndex: existingInStream.length,
        });
        setDbColumns((prev) => [...prev, data.column]);
      } catch (err) {
        console.error("Failed to save column:", err);
      }
    }
  }

  return (
    <div className="flex h-screen w-full overflow-hidden bg-[#F8F9FA]">
      {/* Sidebar */}
      <DashboardSidebar
        user={user}
        streams={streams}
        activeStreamId={activeStreamId}
        onSelectStream={setActiveStreamId}
        onCreateStream={() => setShowCreateStreamModal(true)}
      />

      {/* Main column */}
      <div className="flex flex-1 flex-col overflow-hidden">
        <DashboardTopbar
          user={user}
          streamName={activeStream?.name ?? null}
        />

        {/* Content area */}
        <main className="relative flex-1 overflow-hidden bg-[#F0F1F3]">
          {streams.length === 0 ? (
            <>
              <NoStreamEmpty onCreateStream={() => setShowCreateStreamModal(true)} />
              <GettingStartedHint />
            </>
          ) : (
            <>
              <div className="flex h-full items-start gap-3 overflow-x-auto p-4">
                {activeStream?.columns.map((colId, idx) => (
                  <div
                    key={colId}
                    draggable
                    onDragStart={() => handleDragStart(idx)}
                    onDragOver={(e) => handleDragOver(e, idx)}
                    onDrop={() => handleDrop(idx)}
                    onDragEnd={handleDragEnd}
                    className={[
                      "flex-shrink-0 h-full transition-all duration-150 cursor-grab active:cursor-grabbing",
                      draggedIdx.current === idx ? "opacity-40 scale-[0.98]" : "opacity-100",
                      dragOverIdx === idx && draggedIdx.current !== idx
                        ? "ring-2 ring-[#0066FF] rounded-xl"
                        : "",
                    ].join(" ")}
                  >
                    {renderColumn(colId, { activeAccount })}
                  </div>
                ))}

                <AddAnotherColumn onAdd={() => setShowAddColumnPanel(true)} />
              </div>

              {showAddColumnPanel && (
                <AddColumnPanel
                  onClose={() => setShowAddColumnPanel(false)}
                  onAddColumn={handleAddColumn}
                  existingColumnIds={activeStream?.columns ?? []}
                />
              )}
            </>
          )}
        </main>
      </div>

      {/* Create Stream modal */}
      {showCreateStreamModal && (
        <CreateStreamModal
          onClose={() => setShowCreateStreamModal(false)}
          onCreateStream={handleCreateStream}
        />
      )}

      {/* Tutorial overlay */}
      {showTutorial && (
        <Tutorial onDismiss={() => setShowTutorial(false)} />
      )}
    </div>
  );
}
