import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useAuth } from "./AuthContext";
import { getAccounts, getAccountBadges, getActiveAccount, switchAccount as switchAccountRequest } from "../services/accounts";
import { connectProfile as connectProfileRequest, deleteProfile as deleteProfileRequest, getProfiles } from "../services/profiles";

const WorkspaceContext = createContext(null);

function normalizeProfile(profile) {
  if (!profile) return null;

  return {
    ...profile,
    id: profile.id || profile.profileId || profile.linkedinProfileId || profile.accountId || profile._id,
    name:
      profile.name ||
      profile.displayName ||
      [profile.firstName, profile.lastName].filter(Boolean).join(" ") ||
      profile.headline ||
      "LinkedIn Profile",
    company: profile.company || profile.organization || profile.accountName || profile.headline || "LinkedIn account",
    status: profile.status || (profile.connected === false ? "Disconnected" : "Active"),
    avatar: profile.avatar || profile.avatarUrl || profile.photoUrl || null,
  };
}

function normalizeAccountBadge(account) {
  if (!account) return null;

  return {
    ...account,
    id:
      account.id ||
      account.profileId ||
      account.accountId ||
      account.linkedAccountId ||
      account.activeAccountId ||
      account._id,
    profileId: account.profileId || account.id || account.accountId || account.linkedAccountId || account._id,
    name:
      account.name ||
      account.displayName ||
      account.accountName ||
      [account.firstName, account.lastName].filter(Boolean).join(" ") ||
      "Account",
    company: account.company || account.headline || account.accountType || account.badgeLabel || "LinkedIn account",
    badge: account.badge || "owned",
    badgeLabel: account.badgeLabel || (account.badge === "delegated" ? "Delegated" : "Owned"),
    isActive: Boolean(account.isActive),
    teamAccess: account.teamAccess || [],
    status: account.status || (account.needsReconnect ? "Re-authentication required" : "Active"),
    avatar: account.avatar || account.avatarUrl || account.photoUrl || null,
  };
}

export function WorkspaceProvider({ children }) {
  const { isAuthenticated, isBootstrapping } = useAuth();
  const [profiles, setProfiles] = useState([]);
  const [accounts, setAccounts] = useState([]);
  const [activeAccount, setActiveAccount] = useState(null);
  const [accountSummary, setAccountSummary] = useState({ owned: [], delegated: [], activeAccountId: null });
  const [isLoading, setIsLoading] = useState(false);

  async function refreshWorkspace() {
    if (!isAuthenticated) {
      setProfiles([]);
      setAccounts([]);
      setActiveAccount(null);
      setAccountSummary({ owned: [], delegated: [], activeAccountId: null });
      return;
    }

    setIsLoading(true);

    const [profilesResult, badgesResult, activeAccountResult, accountsResult] = await Promise.allSettled([
      getProfiles(),
      getAccountBadges(),
      getActiveAccount(),
      getAccounts(),
    ]);

    if (profilesResult.status === "fulfilled") {
      setProfiles((profilesResult.value?.profiles || []).map(normalizeProfile));
    }

    if (badgesResult.status === "fulfilled") {
      setAccounts((badgesResult.value?.accounts || []).map(normalizeAccountBadge));
    }

    if (activeAccountResult.status === "fulfilled") {
      setActiveAccount(normalizeAccountBadge(activeAccountResult.value?.activeAccount));
    }

    if (accountsResult.status === "fulfilled") {
      setAccountSummary({
        owned: accountsResult.value?.accounts?.owned || [],
        delegated: accountsResult.value?.accounts?.delegated || [],
        activeAccountId: accountsResult.value?.accounts?.activeAccountId || null,
      });
    }

    setIsLoading(false);
  }

  useEffect(() => {
    if (isBootstrapping) return;
    refreshWorkspace();
  }, [isAuthenticated, isBootstrapping]);

  const value = useMemo(
    () => ({
      profiles,
      accounts,
      activeAccount,
      accountSummary,
      isWorkspaceLoading: isLoading,
      async refreshWorkspace() {
        await refreshWorkspace();
      },
      async connectProfile(payload) {
        const data = await connectProfileRequest(payload);
        await refreshWorkspace();
        return data?.profile ? normalizeProfile(data.profile) : null;
      },
      async deleteProfile(profileId) {
        await deleteProfileRequest(profileId);
        await refreshWorkspace();
      },
      async switchAccount(profileId) {
        const data = await switchAccountRequest({ profileId });
        await refreshWorkspace();
        return normalizeAccountBadge(data?.activeAccount);
      },
    }),
    [accounts, activeAccount, accountSummary, isLoading, profiles]
  );

  return <WorkspaceContext.Provider value={value}>{children}</WorkspaceContext.Provider>;
}

export function useWorkspace() {
  const value = useContext(WorkspaceContext);

  if (!value) {
    throw new Error("useWorkspace must be used within a WorkspaceProvider.");
  }

  return value;
}
