import { useState, useEffect } from "react";
import DashboardSidebar from "./components/dashboard/DashboardSidebar";
import DashboardTopbar from "./components/dashboard/DashboardTopbar";
import AnalyticsBasic from "./components/analytics/AnalyticsBasic";
import AnalyticsPro from "./components/analytics/AnalyticsPro";
import AnalyticsPremium from "./components/analytics/AnalyticsPremium";
import AnalyticsStreams from "./components/analytics/AnalyticsStreams";
import { useAuth } from "./context/AuthContext";
import { getAnalyticsSummary, getProfileAnalytics } from "./services/analytics";

const MOCK_STREAMS = [
  { id: 1, name: "Content Monitoring", columns: ["my-feed"] },
];

function normalizePlan(raw) {
  const p = (raw || "basic").toLowerCase();
  if (p === "premium" || p === "enterprise") return "premium";
  if (p === "pro") return "pro";
  return "basic";
}

export default function AnalyticsPage() {
  const { user } = useAuth();
  const plan = normalizePlan(user?.plan);
  const [premiumTab, setPremiumTab] = useState("workspace");
  const [dataState, setDataState] = useState("loading");
  const [summaryData, setSummaryData] = useState(null);
  const [profileData, setProfileData] = useState(null);

  useEffect(() => {
    setDataState("loading");

    Promise.all([
      getAnalyticsSummary(),
      getProfileAnalytics(),
    ])
      .then(([summary, profile]) => {
        setSummaryData(summary);
        setProfileData(profile);
        setDataState(summary?.posts_count === 0 ? "empty" : "live");
      })
      .catch(() => setDataState("error"));
  }, []);

  function handleUpgrade() {
    window.location.href = "/settings/billing";
  }

  const streamName =
    plan !== "premium"
      ? "Analytics"
      : premiumTab === "streams"
      ? "Stream Analytics Overview"
      : "Premium Analytics Dashboard";

  const sharedProps = {
    dataState,
    onRetry: () => {
      setDataState("loading");
      Promise.all([getAnalyticsSummary(), getProfileAnalytics()])
        .then(([summary, profile]) => {
          setSummaryData(summary);
          setProfileData(profile);
          setDataState(summary?.posts_count === 0 ? "empty" : "live");
        })
        .catch(() => setDataState("error"));
    },
    summaryData,
    profileData,
  };

  return (
    <div className="flex h-screen overflow-hidden bg-[#F8F9FA]">
      <DashboardSidebar user={user} streams={MOCK_STREAMS} />
      <div className="flex flex-1 flex-col overflow-hidden">
        <DashboardTopbar
          user={user}
          streamName={streamName}
          tabs={
            plan === "premium"
              ? [
                  { id: "workspace", label: "Workspace Overview" },
                  { id: "streams", label: "Streams Overview" },
                ]
              : []
          }
          activeTab={premiumTab}
          onTabChange={setPremiumTab}
        />
        <main className="flex flex-1 flex-col overflow-auto">
          {plan === "basic" && (
            <AnalyticsBasic
              {...sharedProps}
              onUpgrade={handleUpgrade}
            />
          )}
          {plan === "pro" && (
            <AnalyticsPro
              {...sharedProps}
              onUpgrade={handleUpgrade}
            />
          )}
          {plan === "premium" && premiumTab === "workspace" && (
            <AnalyticsPremium {...sharedProps} />
          )}
          {plan === "premium" && premiumTab === "streams" && (
            <AnalyticsStreams {...sharedProps} />
          )}
        </main>
      </div>
    </div>
  );
}
