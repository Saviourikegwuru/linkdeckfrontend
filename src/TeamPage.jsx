import { useState, useEffect } from "react";
import DashboardSidebar from "./components/dashboard/DashboardSidebar";
import DashboardTopbar from "./components/dashboard/DashboardTopbar";
import TeamEmpty from "./components/team/TeamEmpty";
import TeamMembersList from "./components/team/TeamMembersList";
import TeamOverview from "./components/team/TeamOverview";
import InviteMemberModal from "./components/team/InviteMemberModal";
import { useAuth } from "./context/AuthContext";
import { getMyTeam, createTeam, inviteMember, getTeamMembers } from "./services/teams";

// Mock streams to keep sidebar consistent
const MOCK_STREAMS = [
  { id: 1, name: "Content Monitoring", columns: ["my-feed"] },
  { id: 2, name: "Sales Prospect",     columns: [] },
  { id: 3, name: "Another Stream",     columns: [] },
];

export default function TeamPage() {
  const { user } = useAuth();
  const [tab, setTab] = useState("members"); // "members" | "overview"
  const [members, setMembers] = useState([]);
  const [teamId, setTeamId] = useState(null);
  const [showInviteModal, setShowInviteModal] = useState(false);

  useEffect(() => {
    getMyTeam()
      .then((data) => {
        if (data?.team) {
          setTeamId(data.team.id);
          return getTeamMembers(data.team.id);
        }
      })
      .then((data) => {
        if (data?.members) {
          setMembers(data.members.map((m) => ({
            id: m.id,
            name: m.user?.name || m.email?.split("@")[0] || "—",
            email: m.email || m.user?.email || "—",
            role: m.role,
            status: m.status === "active" ? "Active" : "Pending",
            access: "—",
          })));
        }
      })
      .catch(() => {});
  }, []);

  async function handleInvite({ email, role }) {
    try {
      let tid = teamId;
      if (!tid) {
        const created = await createTeam({ name: `${user?.name || "My"}'s Team` });
        tid = created.id;
        setTeamId(tid);
      }
      await inviteMember(tid, { email, role });
      setMembers((prev) => [
        ...prev,
        { id: Date.now(), name: email.split("@")[0], email, role, status: "Pending", access: "—" },
      ]);
    } catch (err) {
      console.error("Invite failed", err);
    }
  }

  const hasMembers = members.length > 0;

  return (
    <div className="flex h-screen w-full overflow-hidden bg-[#F8F9FA]">
      {/* Sidebar */}
      <DashboardSidebar
        user={user}
        streams={MOCK_STREAMS}
        activeStreamId={null}
        onSelectStream={() => {}}
        onCreateStream={() => {}}
      />

      {/* Main column */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Topbar with inline tab switcher when members exist */}
        <DashboardTopbar
          user={user}
          streamName="Team"
          tabs={hasMembers ? [
            { id: "members",  label: "Team Members" },
            { id: "overview", label: "Team Overview" },
          ] : []}
          activeTab={tab}
          onTabChange={setTab}
        />

        {/* Content */}
        <main className="flex flex-1 flex-col overflow-hidden bg-[#F0F1F3]">
          {!hasMembers ? (
            <TeamEmpty onAddMember={() => setShowInviteModal(true)} />
          ) : tab === "members" ? (
            <TeamMembersList
              members={members}
              onInvite={() => setShowInviteModal(true)}
            />
          ) : (
            <TeamOverview onInvite={() => setShowInviteModal(true)} />
          )}
        </main>
      </div>

      {/* Invite modal */}
      {showInviteModal && (
        <InviteMemberModal
          onClose={() => setShowInviteModal(false)}
          onInvite={handleInvite}
        />
      )}
    </div>
  );
}
