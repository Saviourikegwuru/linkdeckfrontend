import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function FullScreenLoader() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#F1F2F4] px-6">
      <div className="rounded-2xl border border-[#EDEDED] bg-white px-6 py-5 text-sm font-medium text-[#8D8D8D] shadow-sm">
        Loading your workspace...
      </div>
    </div>
  );
}

export function ProtectedRoute() {
  const location = useLocation();
  const { isAuthenticated, isBootstrapping } = useAuth();

  if (isBootstrapping) {
    return <FullScreenLoader />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return <Outlet />;
}

export function PublicOnlyRoute({ children }) {
  const { isAuthenticated, isBootstrapping } = useAuth();

  if (isBootstrapping) {
    return <FullScreenLoader />;
  }

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
}
