import { useState } from "react";
import TopNav from "./components/TopNav";
import SiteFooter from "./components/SiteFooter";

export default function ContactUsPage() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      return;
    }

    setIsLoading(true);
    try {
      // Simulate API call - replace with actual endpoint
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setSubmitted(true);
      setFormData({ name: "", email: "", message: "" });
      setTimeout(() => setSubmitted(false), 5000);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="relative mx-auto min-h-screen w-full max-w-[1728px] overflow-hidden bg-[#F8F9FA] text-[#080707]">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div
          className="absolute left-[-24%] top-[30%] h-[1160px] w-[1280px] -translate-y-1/2 rounded-full blur-2xl"
          style={{
            opacity: 0.14,
            background:
              "radial-gradient(circle, rgba(255,149,0,0.82) 0%, rgba(255,149,0,0.62) 24%, rgba(0,102,255,0.9) 62%, rgba(0,102,255,1) 100%)"
          }}
        />
      </div>

      <TopNav active="contact" />

      <section className="relative z-10 px-4 py-24 sm:px-6 lg:px-24">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            {/* Left Column */}
            <div className="flex flex-col justify-center">
              <h1 className="text-[42px] font-bold leading-[1.1] text-[#080707] sm:text-[54px]">
                Get in touch with us
              </h1>
              <p className="mt-6 text-base text-[#8D8D8D] sm:text-lg">
                We're here to help! Get in touch with our team for any questions or feedback.
              </p>
              <div className="mt-8">
                <p className="text-sm font-medium text-[#8D8D8D]">Support enquiries:</p>
                <a
                  href="mailto:support@linkdeck.com"
                  className="mt-2 inline-block text-lg font-semibold text-[#0066FF] transition hover:underline"
                >
                  support@linkdeck.com
                </a>
              </div>
            </div>

            {/* Right Column - Form */}
            <div className="flex flex-col justify-center">
              <div className="rounded-[16px] border border-[#EDEDED] bg-white p-8 shadow-[0_8px_24px_rgba(8,7,7,0.08)]">
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Name Field */}
                  <div>
                    <label className="block text-sm font-semibold text-[#080707]">Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="User's full name"
                      className="mt-2 w-full rounded-[8px] border border-[#EDEDED] bg-white px-4 py-3 text-sm text-[#080707] placeholder:text-[#C4C4C4] focus:border-[#0066FF] focus:outline-none focus:ring-1 focus:ring-[#0066FF]"
                      required
                    />
                  </div>

                  {/* Email Field */}
                  <div>
                    <label className="block text-sm font-semibold text-[#080707]">Email Address</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="User's email address"
                      className="mt-2 w-full rounded-[8px] border border-[#EDEDED] bg-white px-4 py-3 text-sm text-[#080707] placeholder:text-[#C4C4C4] focus:border-[#0066FF] focus:outline-none focus:ring-1 focus:ring-[#0066FF]"
                      required
                    />
                  </div>

                  {/* Message Field */}
                  <div>
                    <label className="block text-sm font-semibold text-[#080707]">Message</label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Enter Message"
                      rows="5"
                      className="mt-2 w-full rounded-[8px] border border-[#EDEDED] bg-white px-4 py-3 text-sm text-[#080707] placeholder:text-[#C4C4C4] focus:border-[#0066FF] focus:outline-none focus:ring-1 focus:ring-[#0066FF]"
                      required
                    />
                  </div>

                  {/* Attachment Icon */}
                  <div className="flex items-center gap-2">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="text-[#C4C4C4]">
                      <path
                        d="M10 2v16M2 10h16"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      />
                    </svg>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isLoading || !formData.name.trim() || !formData.email.trim() || !formData.message.trim()}
                    className="w-full rounded-[8px] bg-[#0066FF] py-3 text-sm font-semibold text-white transition hover:bg-[#005ae0] disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoading ? "Sending..." : "Send Message"}
                  </button>

                  {/* Success Message */}
                  {submitted && (
                    <div className="rounded-[8px] bg-[#D1FAE5] p-3 text-center text-sm font-medium text-[#10B981]">
                      ✓ Message sent successfully!
                    </div>
                  )}
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
