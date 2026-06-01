export default function ToastAlert({ toast, onClose }) {
  if (!toast) return null;

  const tone =
    toast.type === "success"
      ? "bg-[#3AC15A] text-white shadow-[0_8px_20px_rgba(58,193,90,0.35)]"
      : "bg-[#FF3B3B] text-white shadow-[0_8px_20px_rgba(255,59,59,0.35)]";

  return (
    <div className="pointer-events-none fixed right-4 top-[112px] z-[100] w-[min(88vw,460px)] sm:right-[72px]">
      <div className={`pointer-events-auto rounded-2xl px-6 py-4 ${tone}`}>
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-base font-semibold leading-snug">{toast.title}</p>
            {toast.message ? <p className="mt-0.5 text-base leading-snug">{toast.message}</p> : null}
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-md px-2 py-0.5 text-sm text-white/90 transition hover:bg-white/15"
            aria-label="Close toast"
          >
            ×
          </button>
        </div>
      </div>
    </div>
  );
}
