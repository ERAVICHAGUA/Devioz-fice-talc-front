import React from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";
import { AppShell } from "@/shell/AppShell";
import { LoginPage } from "@/views/auth/LoginPage";
import { DashboardPage } from "@/views/dashboard/DashboardPage";
import { FinancialProfilePage } from "@/views/fice/FinancialProfilePage";
import { InputsPage } from "@/views/fice/InputsPage";
import { SnapshotsPage } from "@/views/fice/SnapshotsPage";
import { AuditPage } from "@/views/tacl/AuditPage";
import { IntegrityPage } from "@/views/tacl/IntegrityPage";
import { UsersAdminPage } from "@/views/admin/UsersAdminPage";
import { SessionsAdminPage } from "@/views/admin/SessionsAdminPage";
import { NotFoundPage } from "@/views/system/NotFoundPage";
import { ErrorBoundaryPage } from "@/views/system/ErrorBoundaryPage";
import { ForbiddenPage } from "@/views/system/ForbiddenPage";
import { ProtectedRoute } from "@/views/system/ProtectedRoute";

export const router = createBrowserRouter([
  {
    path: "/login",
    element: <LoginPage />,
    errorElement: <ErrorBoundaryPage />,
  },
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <AppShell />
      </ProtectedRoute>
    ),
    errorElement: <ErrorBoundaryPage />,
    children: [
      { index: true, element: <Navigate to="/dashboard" replace /> },
      { path: "dashboard", element: <DashboardPage /> },
      { path: "fice/profile", element: <FinancialProfilePage /> },
      { path: "fice/inputs", element: <InputsPage /> },
      { path: "fice/snapshots", element: <SnapshotsPage /> },
      { path: "tacl/audit", element: <AuditPage /> },
      { path: "tacl/integrity", element: <IntegrityPage /> },

      {
        path: "admin/users",
        element: (
          <ProtectedRoute requireRole="Admin" fallback={<ForbiddenPage />}>
            <UsersAdminPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "admin/sessions",
        element: (
          <ProtectedRoute requireRole="Admin" fallback={<ForbiddenPage />}>
            <SessionsAdminPage />
          </ProtectedRoute>
        ),
      },
      { path: "*", element: <NotFoundPage /> },
    ],
  },
]);
