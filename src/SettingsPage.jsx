import React from "react";
import { useParams } from "react-router-dom";
import DashboardSidebar from "./components/dashboard/DashboardSidebar";
import DashboardTopbar from "./components/dashboard/DashboardTopbar";
import AccountPage from "./components/settings/AccountPage";
import ProfileAndIdentityPage from "./components/settings/ProfileAndIdentityPage";
import LinkedInAccountsPage from "./components/settings/LinkedInAccountsPage";
import PreferencePage from "./components/settings/PreferencePage";
import NotificationPage from "./components/settings/NotificationPage";
import SecurityPage from "./components/settings/SecurityPage";
import PrivacyDataPage from "./components/settings/PrivacyDataPage";
import BillingPlansPage from "./components/settings/BillingPlansPage";
import LegalPage from "./components/settings/LegalPage";
import { useAuth } from "./context/AuthContext";

const PAGES = {
  account: AccountPage,
  profile: ProfileAndIdentityPage,
  linkedin: LinkedInAccountsPage,
  preference: PreferencePage,
  notification: NotificationPage,
  security: SecurityPage,
  privacy: PrivacyDataPage,
  billing: BillingPlansPage,
  legal: LegalPage,
};

const SECTION_TITLES = {
  account: "Account",
  profile: "Profile and Identity",
  linkedin: "LinkedIn Accounts",
  preference: "Preference",
  notification: "Notification Centre",
  security: "Security",
  privacy: "Privacy and Data",
  billing: "Billing and plans",
  legal: "Legal",
};

const MOCK_STREAMS = [
  { id: 1, name: "Content Monitoring", columns: ["my-feed"] },
  { id: 2, name: "Sales Prospect", columns: ["my-feed"] },
  { id: 3, name: "Another Stream", columns: ["my-feed"] },
];

export default function SettingsPage() {
  const { user } = useAuth();
  const { section } = useParams();
  const activeSection = PAGES[section] ? section : "profile";
  const Page = PAGES[activeSection] || (() => null);

  return (
    <div className="flex h-screen overflow-hidden bg-[#F8F9FA]">
      <DashboardSidebar user={user} streams={MOCK_STREAMS} activeStreamId={1} />
      <div className="flex flex-1 flex-col overflow-hidden">
        <DashboardTopbar user={user} streamName={SECTION_TITLES[activeSection] ?? "Settings"} />
        <main className="flex flex-1 flex-col overflow-auto p-5">
          <Page />
        </main>
      </div>
    </div>
  );
}
