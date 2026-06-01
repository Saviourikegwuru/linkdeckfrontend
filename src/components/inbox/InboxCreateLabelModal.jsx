import { useState } from "react";

export default function InboxCreateLabelModal({ onClose, onSave, labels = [] }) {
  const [name, setName] = useState("");
  const [nextLabel, setNextLabel] = useState("");
  const [color, setColor] = useState("#F59E0B");

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <button type="button" className="absolute inset-0 bg-black/40" onClick={onClose} aria-label="Close" />
      <div className="relative z-10 w-[420px] rounded-2xl bg-white p-6 shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between pb-4">
          <h2 className="text-lg font-bold text-[#080707]">Create Label</h2>
          <button type="button" onClick={onClose} className="text-[#8D8D8D] transition hover:text-[#080707]">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
          </button>
        </div>
        <div className="h-px bg-[#EDEDED]" />

        {/* Label Name */}
        <div className="mt-5">
          <label className="text-sm font-semibold text-[#080707]">Label Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Add Label Name"
            className="mt-2 w-full rounded-xl border-2 border-[#0066FF] bg-white px-4 py-3 text-sm text-[#080707] outline-none placeholder:text-[#C4C4C4]"
          />
        </div>

        {/* Next Label */}
        <div className="mt-5">
          <label className="text-sm font-semibold text-[#080707]">Next Label</label>
          <select
            value={nextLabel}
            onChange={(e) => setNextLabel(e.target.value)}
            className="mt-2 w-full appearance-none rounded-xl bg-[#F3F4F6] px-4 py-3 text-sm text-[#8D8D8D] outline-none"
          >
            <option value="">Select</option>
            {labels.map((l) => (
              <option key={l.id} value={l.id}>{l.name}</option>
            ))}
          </select>
        </div>

        {/* Color picker */}
        <div className="mt-5">
          <div className="flex items-center gap-3">
            <input
              type="color"
              value={color}
              onChange={(e) => setColor(e.target.value)}
              className="h-9 w-9 cursor-pointer rounded-full border-0 bg-transparent p-0"
            />
            <span className="text-sm text-[#8D8D8D]">Pick color</span>
            <span className="ml-auto text-xs text-[#8D8D8D]">{color}</span>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-8 flex items-center justify-end gap-4">
          <button type="button" onClick={onClose} className="text-sm font-semibold text-[#080707]">
            Cancel
          </button>
          <button
            type="button"
            onClick={() => onSave?.({ name, nextLabel, color })}
            disabled={!name.trim()}
            className="rounded-xl bg-[#0066FF] px-8 py-3 text-sm font-semibold text-white transition hover:bg-[#005ae0] disabled:opacity-50"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
