import type { Role } from "@/types/domain";

export type WidgetKey =
  | "identity_summary"
  | "recent_inputs"
  | "recent_snapshots"
  | "recent_audit"
  | "integrity_status";

export type WidgetState = {
  key: WidgetKey;
  collapsed?: boolean;
};

export type DashboardLayout = {
  version: 1;
  widgets: WidgetState[];
};

export const DEFAULT_LAYOUT: DashboardLayout = {
  version: 1,
  widgets: [
    { key: "identity_summary" },
    { key: "integrity_status" },
    { key: "recent_inputs" },
    { key: "recent_snapshots" },
    { key: "recent_audit" },
  ],
};

export function layoutForRole(role: Role | null): DashboardLayout {
  if (role === "Admin") {
    return {
      version: 1,
      widgets: [
        { key: "integrity_status" },
        { key: "recent_audit" },
        { key: "recent_snapshots" },
        { key: "recent_inputs" },
        { key: "identity_summary" },
      ],
    };
  }
  return DEFAULT_LAYOUT;
}
