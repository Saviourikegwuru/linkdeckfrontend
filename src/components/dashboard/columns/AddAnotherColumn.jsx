function PlusCircleIcon() {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" aria-hidden="true">
      <circle cx="20" cy="20" r="19" stroke="#D9D9D9" strokeWidth="1.5" />
      <path d="M20 12v16M12 20h16" stroke="#C0C0C0" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export default function AddAnotherColumn({ onAdd }) {
  return (
    <div className="flex h-full w-[403px] flex-shrink-0 flex-col items-center justify-center rounded-xl border-2 border-dashed border-[#D9D9D9] bg-[#F8F9FA] px-6 text-center">
      <button
        type="button"
        onClick={onAdd}
        className="flex flex-col items-center gap-4 transition hover:opacity-70"
        aria-label="Add another column"
      >
        <PlusCircleIcon />
        <div>
          <p className="text-sm font-semibold text-[#3D3D3D]">Add Another Column</p>
          <p className="mt-1.5 text-xs leading-relaxed text-[#8D8D8D]">
            Monitor mentions, specific keywords,
            <br />
            or industry trends side by side
          </p>
        </div>
      </button>
    </div>
  );
}
