import { useState, useEffect } from "react";
import { getOnboarding, updateOnboarding } from "../services/onboarding";
import tutorialIcon1 from "../assets/tutorial/tutorial-icon-1.svg";
import tutorialIcon2 from "../assets/tutorial/tutorial-icon-2.svg";
import tutorialIcon3 from "../assets/tutorial/tutorial-icon-3.svg";

const STEPS = [
  {
    label: "Step 1 of 3",
    title: "Master Your LinkedIn Feed",
    description:
      "Streams are focused workspace. Add columns to track keywords, prospects and competitors in real time",
    icon: tutorialIcon1
  },
  {
    label: "Step 2 of 3",
    title: "Customize Your Workspace",
    description:
      "Organize your dashboard with personalized widgets and views to match your workflow and stay focused",
    icon: tutorialIcon2
  },
  {
    label: "Step 3 of 3",
    title: "Track Your Performance",
    description:
      "Get high level insight into your profile performance and engagement trend. Data is updated on real-time",
    icon: tutorialIcon3
  }
];

function ArrowLeftIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M10 12L6 8L10 4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function Tutorial({ onDismiss }) {
  const [step, setStep] = useState(0);

  const isLast = step === STEPS.length - 1;
  const current = STEPS[step];

  useEffect(() => {
    getOnboarding()
      .then((data) => {
        if (data?.analyticsViewed) onDismiss?.();
      })
      .catch(() => {});
  }, []);

  const handleNext = () => {
    if (!isLast) setStep((s) => s + 1);
  };

  const handleBack = () => {
    if (step > 0) setStep((s) => s - 1);
  };

  const handleFinish = () => {
    if (isLast) {
      updateOnboarding({ analyticsViewed: true }).catch(() => {});
    }
    if (onDismiss) onDismiss();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/25 px-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label="Getting started tutorial"
    >
      <div className="w-full max-w-[660px]" style={{ animation: "tutorialIn 0.25s ease-out" }}>
        {/* Card */}
        <div className="flex overflow-hidden rounded-2xl bg-white shadow-[0_16px_48px_rgba(0,0,0,0.12)]">

          {/* Left — icon panel */}
          <div className="hidden w-[220px] flex-shrink-0 items-center justify-center bg-[#F4F7FF] p-8 sm:flex">
            <img
              key={step}
              src={current.icon}
              alt=""
              className="h-auto w-full max-w-[160px]"
              style={{ animation: "tutorialIn 0.2s ease-out" }}
            />
          </div>

          {/* Right — content panel */}
          <div className="flex flex-1 flex-col px-8 py-8">
            {/* Step label */}
            <p className="text-sm font-semibold text-[#0066FF]">{current.label}</p>

            {/* Title */}
            <h2 className="mt-2 text-[22px] font-bold leading-snug text-[#080707]">
              {current.title}
            </h2>

            {/* Description */}
            <p className="mt-3 text-base font-normal leading-relaxed text-[#8D8D8D]">
              {current.description}
            </p>

            {/* Progress dots */}
            <div className="mt-6 flex items-center gap-2" aria-label="Tutorial progress">
              {STEPS.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setStep(i)}
                  aria-label={`Go to step ${i + 1}`}
                  aria-current={i === step ? "step" : undefined}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    i === step
                      ? "w-6 bg-[#0066FF]"
                      : "w-2 bg-[#D9D9D9] hover:bg-[#0066FF]/40"
                  }`}
                />
              ))}
            </div>

            {/* Actions */}
            <div className="mt-8 flex items-center justify-between gap-3">
              {/* Skip / spacer */}
              {!isLast ? (
                <button
                  type="button"
                  onClick={handleFinish}
                  className="text-sm font-medium text-[#8D8D8D] transition hover:text-[#080707]"
                >
                  Skip tutorial
                </button>
              ) : (
                <span />
              )}

              <div className="flex items-center gap-3">
                {/* Back */}
                {step > 0 && (
                  <button
                    type="button"
                    onClick={handleBack}
                    className="flex items-center gap-1.5 rounded-xl border border-[#D9D9D9] bg-white px-5 py-2.5 text-sm font-semibold text-[#080707] transition hover:border-[#0066FF]/40 hover:bg-[#f7faff] hover:text-[#0066FF]"
                  >
                    <ArrowLeftIcon />
                    Back
                  </button>
                )}

                {/* Next / Finish */}
                <button
                  type="button"
                  onClick={isLast ? handleFinish : handleNext}
                  className="rounded-xl bg-[#0066FF] px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-[#005ae0]"
                >
                  {isLast ? "Finish" : "Next step"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes tutorialIn {
          from { opacity: 0; transform: scale(0.97) translateY(6px); }
          to   { opacity: 1; transform: scale(1)    translateY(0);   }
        }
      `}</style>
    </div>
  );
}
