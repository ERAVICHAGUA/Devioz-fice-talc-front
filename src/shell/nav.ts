import { LayoutDashboard, Fingerprint, ShieldCheck, Users, ActivitySquare, FileSearch, ClipboardCheck } from "lucide-react";

export type NavItem = { label: string; to: string; icon: any; group: "Core" | "FICE" | "TACL" | "Admin" };

export const NAV: NavItem[] = [
  { label: "Dashboard", to: "/dashboard", icon: LayoutDashboard, group: "Core" },

  { label: "Perfil Financiero", to: "/fice/profile", icon: Fingerprint, group: "FICE" },
  { label: "Inputs", to: "/fice/inputs", icon: FileSearch, group: "FICE" },
  { label: "Snapshots", to: "/fice/snapshots", icon: ClipboardCheck, group: "FICE" },

  { label: "Auditoría", to: "/tacl/audit", icon: ActivitySquare, group: "TACL" },
  { label: "Integridad", to: "/tacl/integrity", icon: ShieldCheck, group: "TACL" },

  { label: "Usuarios", to: "/admin/users", icon: Users, group: "Admin" },
];
