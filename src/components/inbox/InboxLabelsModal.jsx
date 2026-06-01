export default function InboxLabelsModal({ labels = [], onClose, onCreateLabel, onSelectLabel }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <button type="button" className="absolute inset-0 bg-black/40" onClick={onClose} aria-label="Close" />
      <div className="relative z-10 w-[400px] rounded-2xl bg-white shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between px-6 pt-6 pb-4">
          <h2 className="text-lg font-bold text-[#080707]">Labels</h2>
          <button type="button" onClick={onClose} className="text-[#8D8D8D] transition hover:text-[#080707]">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
          </button>
        </div>

        {/* Gradient divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-[#EDEDED] to-transparent" />

        {/* Label list */}
        <ul className="max-h-[420px] overflow-y-auto px-6 py-4 space-y-4">
          {labels.map((label) => (
            <li key={label.id}>
              <button
                type="button"
                onClick={() => onSelectLabel?.(label.id)}
                className="flex w-full items-center gap-3 rounded-lg px-1 py-1 text-left transition hover:bg-[#F4F7FF]"
              >
                <span className="h-2.5 w-2.5 flex-shrink-0 rounded-full" style={{ backgroundColor: label.color }} />
                <span
                  className="rounded-full px-3 py-1 text-xs font-semibold"
                  style={{ backgroundColor: label.bg, color: label.color }}
                >
                  {label.name}
                </span>
                <span className="ml-auto text-sm text-[#8D8D8D]">{label.description}</span>
              </button>
            </li>
          ))}
        </ul>

        {/* Footer */}
        <div className="border-t border-[#EDEDED] px-6 py-4">
          <button
            type="button"
            onClick={onCreateLabel}
            className="flex w-full items-center justify-center gap-2 rounded-xl border-2 border-[#0066FF] py-3 text-sm font-semibold text-[#0066FF] transition hover:bg-[#EEF3FF]"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M7 1v12M1 7h12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
            Create a new Label
          </button>
        </div>
      </div>
    </div>
  );
}
