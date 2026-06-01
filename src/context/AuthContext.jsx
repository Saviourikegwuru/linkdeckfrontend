import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { ApiError, refreshSession } from "../services/api";
import {
  forgotPassword as forgotPasswordRequest,
  getCurrentUser,
  logout as logoutRequest,
  signIn as signInRequest,
  signUp as signUpRequest,
  startGoogleAuth,
  startLinkedInAuth,
} from "../services/auth";

const AuthContext = createContext(null);

function isUnauthorizedError(error) {
  return (
    error instanceof ApiError &&
    error.status === 401 &&
    ["NO_TOKEN", "INVALID_TOKEN", "TOKEN_EXPIRED"].includes(error.code)
  );
}

function normalizeUser(user) {
  if (!user) return null;

  const name = user.name || [user.firstName, user.lastName].filter(Boolean).join(" ") || user.email || "User";

  return {
    ...user,
    name,
    plan: user.plan || user.subscriptionPlan || "basic",
    avatar: user.avatar || user.avatarUrl || user.photoUrl || null,
    jobTitle: user.jobTitle || null,
    company: user.company || null,
    bio: user.bio || null,
  };
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isBootstrapping, setIsBootstrapping] = useState(true);

  useEffect(() => {
    let isMounted = true;

    async function bootstrap() {
      try {
        const data = await getCurrentUser();
        if (isMounted) {
          setUser(normalizeUser(data?.user));
        }
      } catch (error) {
        if (error instanceof ApiError && error.status === 404) {
          try {
            const refreshData = await refreshSession();
            if (isMounted) {
              setUser(normalizeUser(refreshData?.user));
            }
            return;
          } catch (refreshError) {
            if (!isUnauthorizedError(refreshError)) {
              console.error("Failed to bootstrap auth session via refresh fallback", refreshError);
            }
          }
        } else if (!isUnauthorizedError(error)) {
          console.error("Failed to bootstrap auth session", error);
        }

        if (isMounted) {
          setUser(null);
        }
      } finally {
        if (isMounted) {
          setIsBootstrapping(false);
        }
      }
    }

    bootstrap();

    return () => {
      isMounted = false;
    };
  }, []);

  const value = useMemo(
    () => ({
      user,
      isAuthenticated: Boolean(user),
      isBootstrapping,
      async signIn(credentials) {
        const data = await signInRequest(credentials);
        const nextUser = normalizeUser(data?.user);
        setUser(nextUser);
        return nextUser;
      },
      async signUp(payload) {
        const data = await signUpRequest(payload);
        const nextUser = normalizeUser(data?.user);
        setUser(nextUser);
        return nextUser;
      },
      async logout() {
        try {
          await logoutRequest();
        } finally {
          setUser(null);
        }
      },
      async forgotPassword(payload) {
        return forgotPasswordRequest(payload);
      },
      async refreshUser() {
        const data = await getCurrentUser();
        const nextUser = normalizeUser(data?.user);
        setUser(nextUser);
        return nextUser;
      },
      startGoogleAuth,
      startLinkedInAuth,
    }),
    [isBootstrapping, user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const value = useContext(AuthContext);

  if (!value) {
    throw new Error("useAuth must be used within an AuthProvider.");
  }

  return value;
}
