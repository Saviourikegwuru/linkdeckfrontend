import React from "react";

export default function SettingsOptionMenu({ onClose, onDelete }) {
  return (
    <div className="absolute right-0 top-10 z-10 w-44 rounded-2xl bg-gradient-to-br from-[#F4F7FF] to-[#EEF3FF] shadow-lg border border-[#EDEDED]">
      <button className="flex w-full items-center gap-3 px-4 py-3 text-[#8D8D8D] hover:bg-[#F8F9FA] text-sm font-semibold" onClick={onDelete || onClose}>
        <svg width="20" height="20" fill="none"><rect x="4" y="4" width="12" height="12" rx="2" stroke="#8D8D8D" strokeWidth="1.5"/><path d="M8 8h4M8 12h4" stroke="#8D8D8D" strokeWidth="1.5"/></svg>
        Delete
      </button>
      <button className="flex w-full items-center gap-3 px-4 py-3 text-[#8D8D8D] hover:bg-[#F8F9FA] text-sm font-semibold" onClick={onClose}>
        <svg width="20" height="20" fill="none"><circle cx="10" cy="10" r="8" stroke="#8D8D8D" strokeWidth="1.5"/><path d="M10 6v4l2 2" stroke="#8D8D8D" strokeWidth="1.5" strokeLinecap="round"/></svg>
        Delegate
      </button>
      <button className="absolute top-2 right-2 p-1 text-[#8D8D8D] hover:text-[#0066FF]" onClick={onClose}>
        <svg width="16" height="16" fill="none"><path d="M4 4l8 8M12 4l-8 8" stroke="#8D8D8D" strokeWidth="1.5"/></svg>
      </button>
    </div>
  );
}
