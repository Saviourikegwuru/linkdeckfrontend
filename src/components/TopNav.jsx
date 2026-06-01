import logo from "../assets/logo.svg";

export default function TopNav({ active = null, showAuthButtons = true }) {
  const linkClass = (key) =>
    `transition hover:text-[#0066FF] ${active === key ? "text-[#0066FF]" : "text-[#080707]"}`;

  return (
    <header className="relative z-10 border-b border-[#EDEDED] bg-[#FFFFFF7A] backdrop-blur-[24px]">
      <nav className="mx-auto flex h-[82px] w-full items-center justify-between px-4 py-[18px] sm:px-8 lg:px-[72px]">
        <div className="flex items-center gap-8 lg:gap-12">
          <a href="/" className="inline-flex items-center">
            <img src={logo} alt="Linkdeck" className="h-8 w-auto sm:h-10" />
          </a>
          <ul className="hidden items-center gap-8 text-[18px] font-medium md:flex">
            <li>
              <a href="/#features" className={linkClass("features")}>
                Features
              </a>
            </li>
            <li>
              <a href="/pricing" className={linkClass("pricing")}>
                Pricing
              </a>
            </li>
            <li>
              <a href="/contact-us" className={linkClass("contact")}>
                Contact
              </a>
            </li>
          </ul>
        </div>
        {showAuthButtons ? (
          <div className="flex items-center gap-2 sm:gap-4">
            <a
              href="/signup"
              className="rounded-xl bg-[#0066FF] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#005ae0] sm:px-6 sm:py-3 sm:text-base"
            >
              Get Started
            </a>
            <a
              href="/login"
              className="rounded-xl border border-[#0066FF] px-4 py-2 text-sm font-semibold text-[#0066FF] transition hover:bg-[#e9f1ff] sm:px-6 sm:py-3 sm:text-base"
            >
              Log In
            </a>
          </div>
        ) : null}
      </nav>
    </header>
  );
}
