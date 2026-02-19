import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/state/auth";
import type { Role } from "@/types/domain";

export function ProtectedRoute({
  children,
  requireRole,
  fallback,
}: {
  children: React.ReactNode;
  requireRole?: Role;
  fallback?: React.ReactNode;
}) {
  const auth = useAuth();
  const loc = useLocation();

  if (auth.status !== "authenticated") {
    return <Navigate to="/login" replace state={{ from: loc.pathname }} />;
  }

  if (requireRole && auth.role !== requireRole) {
    return fallback ?? <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
}
