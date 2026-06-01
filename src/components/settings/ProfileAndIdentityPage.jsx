import { useState, useEffect, useRef } from "react";
import { useAuth } from "../../context/AuthContext";
import { updateMe } from "../../services/profiles";
import { useToast } from "../toast";
import ToastAlert from "../ToastAlert";

function Avatar({ src, name, size = 80, onChangeSrc }) {
  const inputRef = useRef(null);
  const initial = (name || "U").charAt(0).toUpperCase();

  function handleFile(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    onChangeSrc(url, file);
  }

  return (
    <div className="flex items-center gap-6">
      <div
        style={{ width: size, height: size }}
        className="relative rounded-full bg-[#F4F7FF] flex items-center justify-center overflow-hidden shrink-0"
      >
        {src ? (
          <img src={src} alt={name} className="h-full w-full object-cover" />
        ) : (
          <span className="text-2xl font-semibold text-[#0066FF]">{initial}</span>
        )}
      </div>
      <div>
        <p className="text-sm font-medium text-[#080707]">Profile Picture</p>
        <p className="mt-0.5 text-[11px] text-[#8D8D8D]">JPG, PNG, JPEG. Max 10 MB. A professional photo helps you stand out.</p>
        <div className="mt-2 flex items-center gap-3">
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            className="rounded-lg bg-[#0066FF] text-white px-4 py-1.5 font-semibold text-sm hover:bg-[#005ae0] transition"
          >
            Change image
          </button>
          {src && (
            <button
              type="button"
              onClick={() => onChangeSrc(null, null)}
              className="text-[#EF4444] font-medium text-sm hover:underline"
            >
              Remove
            </button>
          )}
        </div>
        <input ref={inputRef} type="file" accept="image/*" className="hidden" onChange={handleFile} />
      </div>
    </div>
  );
}

function Field({ label, hint, children }) {
  return (
    <div>
      <label className="block text-xs font-semibold text-[#080707] mb-1">{label}</label>
      {children}
      {hint && <p className="mt-1 text-[11px] text-[#ABABAB]">{hint}</p>}
    </div>
  );
}

function InputField({ value, onChange, readOnly = false, placeholder = "", maxLength, type = "text" }) {
  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      readOnly={readOnly}
      placeholder={placeholder}
      maxLength={maxLength}
      className={`w-full rounded-lg border px-3 py-2 text-sm transition outline-none
        ${readOnly
          ? "border-[#EDEDED] bg-[#F8F9FA] text-[#8D8D8D] cursor-default"
          : "border-[#D9D9D9] bg-white text-[#080707] focus:border-[#0066FF] focus:ring-2 focus:ring-[#0066FF]/20"
        }`}
    />
  );
}

export default function ProfileAndIdentityPage() {
  const { user, refreshUser } = useAuth();
  const { toast, dismissToast, showError, showSuccess } = useToast();

  const [form, setForm] = useState({
    name: "",
    jobTitle: "",
    company: "",
    bio: "",
  });
  const [avatarSrc, setAvatarSrc] = useState(null);
  const [avatarFile, setAvatarFile] = useState(null);
  const [isDirty, setIsDirty] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (user) {
      setForm({
        name: user.name || "",
        jobTitle: user.jobTitle || "",
        company: user.company || "",
        bio: user.bio || "",
      });
      setAvatarSrc(user.avatar || null);
      setIsDirty(false);
    }
  }, [user]);

  function handleField(key) {
    return (e) => {
      setForm((prev) => ({ ...prev, [key]: e.target.value }));
      setIsDirty(true);
    };
  }

  function handleAvatarChange(src, file) {
    setAvatarSrc(src);
    setAvatarFile(file);
    setIsDirty(true);
  }

  function handleCancel() {
    setForm({
      name: user?.name || "",
      jobTitle: user?.jobTitle || "",
      company: user?.company || "",
      bio: user?.bio || "",
    });
    setAvatarSrc(user?.avatar || null);
    setAvatarFile(null);
    setIsDirty(false);
  }

  async function handleSave(e) {
    e.preventDefault();
    if (!isDirty || isSaving) return;

    setIsSaving(true);
    try {
      const payload = {
        name: form.name.trim() || undefined,
        jobTitle: form.jobTitle.trim() || undefined,
        company: form.company.trim() || undefined,
        bio: form.bio.trim() || undefined,
      };

      if (avatarFile) {
        // TODO: upload avatar to S3 via /api/v1/media/upload, then set payload.avatar = url
        // For now, if you have a data URL we skip sending it (server-side upload not yet wired)
      } else if (avatarSrc === null && user?.avatar) {
        payload.avatar = "";
      }

      await updateMe(payload);
      await refreshUser();
      setIsDirty(false);
      setAvatarFile(null);
      showSuccess("Profile updated", "Your changes have been saved.");
    } catch (err) {
      showError("Failed to save", err?.message || "Please try again.");
    } finally {
      setIsSaving(false);
    }
  }

  const bioLength = form.bio.length;

  return (
    <section className="w-full max-w-[980px]">
      <ToastAlert toast={toast} onClose={dismissToast} />

      <header>
        <h2 className="text-[32px] font-bold leading-tight text-[#080707]">Profile and Identity</h2>
        <p className="mt-1 text-sm text-[#8D8D8D]">Control how your identity appears across Linkdeck.</p>
      </header>

      <form onSubmit={handleSave} className="mt-6 space-y-6">
        {/* Avatar */}
        <div className="rounded-xl border border-[#EDEDED] bg-white p-5">
          <h3 className="mb-4 text-[14px] font-semibold text-[#080707]">Personal Information</h3>
          <Avatar
            src={avatarSrc}
            name={form.name}
            onChangeSrc={handleAvatarChange}
          />

          <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2">
            <Field label="Full Name" hint="Displayed across your workspace">
              <InputField
                value={form.name}
                onChange={handleField("name")}
                placeholder="Your full name"
                maxLength={100}
              />
            </Field>

            <Field label="Email Address" hint="">
              <div className="relative">
                <InputField value={user?.email || ""} readOnly />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 inline-flex items-center gap-1 text-xs text-[#10B981] font-semibold">
                  Verified
                  <svg width="14" height="14" fill="none"><circle cx="7" cy="7" r="6" stroke="#10B981" strokeWidth="1.5"/><path d="M5.5 7.5l1.5 1.5 2.5-2.5" stroke="#10B981" strokeWidth="1.5" strokeLinecap="round"/></svg>
                </span>
              </div>
            </Field>

            <Field label="Job Title" hint="Your current role or position">
              <InputField
                value={form.jobTitle}
                onChange={handleField("jobTitle")}
                placeholder="e.g. Head of Marketing"
                maxLength={100}
              />
            </Field>

            <Field label="Company Name" hint="The organisation you're currently with">
              <InputField
                value={form.company}
                onChange={handleField("company")}
                placeholder="e.g. Acme Corp"
                maxLength={100}
              />
            </Field>

            <div className="md:col-span-2">
              <label className="block text-xs font-semibold text-[#080707] mb-1">Tagline / Bio</label>
              <textarea
                value={form.bio}
                onChange={handleField("bio")}
                placeholder="Tell others about your work..."
                maxLength={300}
                rows={3}
                className="w-full rounded-lg border border-[#D9D9D9] bg-white px-3 py-2 text-sm text-[#080707] outline-none transition focus:border-[#0066FF] focus:ring-2 focus:ring-[#0066FF]/20 resize-none"
              />
              <div className="mt-1 flex items-center justify-between">
                <p className="text-[11px] text-[#ABABAB]">Add a tagline or bio to tell others about your work</p>
                <span className={`text-[11px] font-medium ${bioLength > 280 ? "text-[#EF4444]" : "text-[#8D8D8D]"}`}>
                  {bioLength}/300
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Save / Cancel bar */}
        {isDirty && (
          <div className="flex items-center justify-end gap-3 rounded-xl border border-[#EDEDED] bg-white px-5 py-3">
            <button
              type="button"
              onClick={handleCancel}
              className="rounded-lg border border-[#D9D9D9] bg-white px-4 py-2 text-sm font-semibold text-[#080707] hover:bg-[#F8F9FA] transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSaving}
              className="rounded-lg bg-[#0066FF] px-5 py-2 text-sm font-semibold text-white hover:bg-[#005ae0] disabled:opacity-60 transition"
            >
              {isSaving ? "Saving…" : "Save changes"}
            </button>
          </div>
        )}
      </form>
    </section>
  );
}
