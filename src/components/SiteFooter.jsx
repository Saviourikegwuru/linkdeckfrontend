import logo from "../assets/logo.svg";
import socialIcon1 from "../assets/social-icon-1.svg";
import socialIcon2 from "../assets/social-icon-2.svg";
import socialIcon3 from "../assets/social-icon-3.svg";
import socialIcon4 from "../assets/social-icon-4.svg";

export default function SiteFooter({ compact = false }) {
  return (
    <footer
      id="pricing"
      className={`relative z-10 w-full border-t border-[#EDEDED] bg-[linear-gradient(90deg,_#F8F9FA_0%,_#f6f7f9_60%,_#f4f7fc_100%)] px-4 pt-16 sm:px-6 sm:pt-20 ${
        compact ? "pb-10 sm:pb-12" : "pb-14 sm:pb-16 lg:h-[728px]"
      }`}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 h-[700px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
        style={{
          opacity: 0.14,
          background:
            "radial-gradient(circle, rgba(255,149,0,0.78) 0%, rgba(255,149,0,0.5) 26%, rgba(0,102,255,0.84) 66%, rgba(0,102,255,0.98) 100%)"
        }}
      />
      <div className="mx-auto flex h-full max-w-7xl flex-col justify-between">
        <div className="mx-auto grid w-fit gap-12 border-b border-[#EDEDED] pb-14 sm:grid-cols-2 lg:grid-cols-[repeat(5,220px)] lg:justify-center lg:gap-10">
          <div>
            <img src={logo} alt="Linkdeck" className="h-8 w-auto sm:h-10" />
            <p className="mt-5 max-w-xs text-[28px] font-normal leading-none text-[#080707]">
              The LinkedIn command center for focused work.
            </p>
            <div className="mt-5 flex items-center gap-3">
              <img src={socialIcon1} alt="Social icon 1" className="h-5 w-5" />
              <img src={socialIcon2} alt="Social icon 2" className="h-5 w-5" />
              <img src={socialIcon3} alt="Social icon 3" className="h-5 w-5" />
              <img src={socialIcon4} alt="Social icon 4" className="h-5 w-5" />
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-[#080707] sm:text-xl">Product</h3>
            <ul className="mt-5 space-y-3 text-base text-[#8D8D8D] sm:text-lg">
              <li>
                <a href="/features" className="transition hover:text-[#0066FF]">
                  Features
                </a>
              </li>
              <li>
                <a href="/streams" className="transition hover:text-[#0066FF]">
                  Streams
                </a>
              </li>
              <li>
                <a href="/scheduling" className="transition hover:text-[#0066FF]">
                  Scheduling
                </a>
              </li>
              <li>
                <a href="/analytics" className="transition hover:text-[#0066FF]">
                  Analytics
                </a>
              </li>
              <li>
                <a href="/teams-roles" className="transition hover:text-[#0066FF]">
                  Teams &amp; Roles
                </a>
              </li>
              <li>
                <a href="/pricing" className="transition hover:text-[#0066FF]">
                  Pricing
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-[#080707] sm:text-xl">Resources</h3>
            <ul className="mt-5 space-y-3 text-base text-[#8D8D8D] sm:text-lg">
              <li>
                <a href="/help-center" className="transition hover:text-[#0066FF]">
                  Help Center
                </a>
              </li>
              <li>
                <a href="/getting-started" className="transition hover:text-[#0066FF]">
                  Getting Started
                </a>
              </li>
              <li>
                <a href="/faqs" className="transition hover:text-[#0066FF]">
                  FAQs
                </a>
              </li>
              <li>
                <a href="/status" className="transition hover:text-[#0066FF]">
                  Status
                </a>
              </li>
              <li>
                <a href="/release-notes" className="transition hover:text-[#0066FF]">
                  Release Notes
                </a>
              </li>
              <li>
                <a href="/contact-support" className="transition hover:text-[#0066FF]">
                  Contact Support
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-[#080707] sm:text-xl">Company</h3>
            <ul className="mt-5 space-y-3 text-base text-[#8D8D8D] sm:text-lg">
              <li>
                <a href="/about" className="transition hover:text-[#0066FF]">
                  About
                </a>
              </li>
              <li>
                <a href="/blog" className="transition hover:text-[#0066FF]">
                  Blog
                </a>
              </li>
              <li>
                <a href="/press" className="transition hover:text-[#0066FF]">
                  Press
                </a>
              </li>
              <li>
                <a href="/partners" className="transition hover:text-[#0066FF]">
                  Partners
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-[#080707] sm:text-xl">Plans</h3>
            <ul className="mt-5 space-y-3 text-base text-[#8D8D8D] sm:text-lg">
              <li>
                <a href="/plans/basic" className="transition hover:text-[#0066FF]">
                  Basic
                </a>
              </li>
              <li>
                <a href="/plans/pro" className="transition hover:text-[#0066FF]">
                  Pro
                </a>
              </li>
              <li>
                <a href="/plans/premium" className="transition hover:text-[#0066FF]">
                  Premium
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 rounded-2xl bg-[#080707] px-5 py-6 text-white sm:mt-14 sm:flex sm:items-center sm:justify-between sm:px-8 sm:py-7">
          <div>
            <p className="text-base font-semibold sm:text-xl">Ready to work LinkedIn like a system?</p>
            <p className="mt-2 text-sm text-[#EDEDED] sm:text-base">Connect LinkedIn to activate your workspace.</p>
          </div>
          <a
            href="/signup"
            className="mt-5 rounded-xl bg-[#0066FF] px-7 py-3 text-center text-base font-semibold transition hover:bg-[#005ae0] sm:mt-0"
          >
            Get Started
          </a>
        </div>
      </div>
    </footer>
  );
}
