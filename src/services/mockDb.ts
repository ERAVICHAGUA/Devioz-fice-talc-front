import type {
  AuditEvent,
  FinancialIdentity,
  FinancialIdentitySnapshot,
  FinancialProfileInput,
  IntegrityCheck,
  Role,
  User,
  UserSession,
} from "@/types/domain";

function uid(prefix: string) {
  return `${prefix}_${Math.random().toString(16).slice(2)}_${Date.now().toString(16)}`;
}

function nowISO() {
  return new Date().toISOString();
}

const seedUsers: User[] = [
  {
    id: "u_admin",
    email: "admin@devioz.pe",
    full_name: "Admin Demo",
    role: "Admin",
    status: "active",
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 24 * 30).toISOString(),
  },
  {
    id: "u_user",
    email: "user@devioz.pe",
    full_name: "User Demo",
    role: "User",
    status: "active",
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 24 * 10).toISOString(),
  },
];

let users: User[] = [...seedUsers];

let sessions: UserSession[] = [
  {
    id: "s_admin_1",
    user_id: "u_admin",
    device: "Chrome on Windows",
    ip: "190.12.34.56",
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(),
    last_seen_at: new Date(Date.now() - 1000 * 60 * 2).toISOString(),
    status: "active",
  },
  {
    id: "s_user_1",
    user_id: "u_user",
    device: "Edge on Windows",
    ip: "181.65.12.9",
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 20).toISOString(),
    last_seen_at: new Date(Date.now() - 1000 * 60 * 7).toISOString(),
    status: "active",
  },
];

let inputs: FinancialProfileInput[] = [
  { id: "i_1", user_id: "u_user", input_type: "salary", input_value: "S/ 5500", created_at: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3).toISOString() },
  { id: "i_2", user_id: "u_user", input_type: "expenses", input_value: "S/ 2100", created_at: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString() },
  { id: "i_3", user_id: "u_user", input_type: "savings", input_value: "S/ 800", created_at: new Date(Date.now() - 1000 * 60 * 60 * 12).toISOString() },
];

let identity: FinancialIdentity = {
  id: "fi_1",
  user_id: "u_user",
  income_type: "fixed",
  income_stability_score: 78,
  risk_tolerance: "medium",
  decision_style: "balanced",
  created_at: new Date(Date.now() - 1000 * 60 * 60 * 24 * 12).toISOString(),
  last_updated: new Date(Date.now() - 1000 * 60 * 60 * 12).toISOString(),
};

let snapshots: FinancialIdentitySnapshot[] = [
  {
    id: "snp_1",
    financial_identity_id: "fi_1",
    snapshot_data: {
      income_type: "fixed",
      income_stability_score: 76,
      risk_tolerance: "low",
      decision_style: "conservative",
    },
    change_reason: "Initial onboarding",
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 24 * 9).toISOString(),
  },
  {
    id: "snp_2",
    financial_identity_id: "fi_1",
    snapshot_data: {
      income_type: "fixed",
      income_stability_score: 78,
      risk_tolerance: "medium",
      decision_style: "balanced",
    },
    change_reason: "Input update: savings",
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 12).toISOString(),
  },
];

let audit: AuditEvent[] = [
  {
    id: "ae_1",
    user_id: "u_user",
    actor: "system",
    action: "SNAPSHOT_CREATED",
    entity: "financial_identity_snapshot",
    entity_id: "snp_2",
    meta: { reason: "Input update: savings" },
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 12).toISOString(),
  },
  {
    id: "ae_2",
    user_id: "u_user",
    actor: "user@devioz.pe",
    action: "INPUT_ADDED",
    entity: "financial_profile_input",
    entity_id: "i_3",
    meta: { input_type: "savings", input_value: "S/ 800" },
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 12).toISOString(),
  },
];

let integrityChecks: IntegrityCheck[] = [
  {
    id: "ic_1",
    status: "OK",
    name: "Snapshot hash chain",
    detail: "Chain verified (2 snapshots).",
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 7).toISOString(),
  },
  {
    id: "ic_2",
    status: "OK",
    name: "Audit immutability",
    detail: "No anomalies detected.",
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 6).toISOString(),
  },
];

function delay(ms = 450) {
  return new Promise((r) => setTimeout(r, ms));
}

// -- Auth helpers
export type AuthToken = { token: string; user_id: string; role: Role; issued_at: string };

export async function login(email: string, _password: string): Promise<AuthToken> {
  await delay();
  const u = users.find((x) => x.email.toLowerCase() === email.toLowerCase());
  if (!u) throw Object.assign(new Error("Credenciales inválidas."), { code: 401 });
  if (u.status === "blocked") throw Object.assign(new Error("Usuario bloqueado."), { code: 403 });

  audit.unshift({
    id: uid("ae"),
    user_id: u.id,
    actor: u.email,
    action: "LOGIN",
    entity: "user_session",
    created_at: nowISO(),
    meta: { ip: "181.65.12.9", device: "Chrome on Windows" },
  });

  const token = { token: uid("tk"), user_id: u.id, role: u.role, issued_at: nowISO() };
  sessions.unshift({
    id: uid("sess"),
    user_id: u.id,
    device: "Chrome on Windows",
    ip: "181.65.12.9",
    created_at: nowISO(),
    last_seen_at: nowISO(),
    status: "active",
  });
  return token;
}

export async function logout(user_id: string) {
  await delay(200);
  const u = users.find((x) => x.id === user_id);
  if (u) {
    audit.unshift({
      id: uid("ae"),
      user_id: u.id,
      actor: u.email,
      action: "LOGOUT",
      entity: "user_session",
      created_at: nowISO(),
    });
  }
}

// -- Data getters
export async function getUsers(): Promise<User[]> {
  await delay();
  return [...users];
}
export async function setUserStatus(user_id: string, status: "active" | "blocked") {
  await delay();
  users = users.map((u) => (u.id === user_id ? { ...u, status } : u));
  const u = users.find((x) => x.id === user_id);
  audit.unshift({
    id: uid("ae"),
    user_id,
    actor: "admin@devioz.pe",
    action: status === "blocked" ? "USER_BLOCKED" : "USER_ACTIVATED",
    entity: "user",
    entity_id: user_id,
    created_at: nowISO(),
    meta: { email: u?.email },
  });
  return users.find((x) => x.id === user_id)!;
}

export async function getSessions(): Promise<UserSession[]> {
  await delay();
  return [...sessions];
}
export async function revokeSession(session_id: string) {
  await delay();
  sessions = sessions.map((s) => (s.id === session_id ? { ...s, status: "revoked" } : s));
  audit.unshift({
    id: uid("ae"),
    user_id: "u_admin",
    actor: "admin@devioz.pe",
    action: "SESSION_REVOKED",
    entity: "user_session",
    entity_id: session_id,
    created_at: nowISO(),
  });
  return sessions.find((s) => s.id === session_id)!;
}

export async function getFinancialIdentity(user_id: string): Promise<FinancialIdentity> {
  await delay();
  if (identity.user_id !== user_id) throw Object.assign(new Error("No hay identidad para este usuario."), { code: 404 });
  return { ...identity };
}
export async function getInputs(user_id: string): Promise<FinancialProfileInput[]> {
  await delay();
  return inputs.filter((x) => x.user_id === user_id).slice().sort((a, b) => b.created_at.localeCompare(a.created_at));
}
export async function addInput(user_id: string, input: Omit<FinancialProfileInput, "id" | "user_id" | "created_at"> & { reason?: string }) {
  await delay(700);

  const created = {
    id: uid("inp"),
    user_id,
    input_type: input.input_type,
    input_value: input.input_value,
    created_at: nowISO(),
  } satisfies FinancialProfileInput;

  inputs = [created, ...inputs];

  // Simulate recalculation + snapshot + audit
  const prev = identity;
  const next: FinancialIdentity = {
    ...prev,
    income_stability_score: Math.max(30, Math.min(95, prev.income_stability_score + (Math.random() > 0.5 ? 2 : -1))),
    risk_tolerance: (["low", "medium", "high"] as const)[Math.floor(Math.random() * 3)],
    decision_style: (["conservative", "balanced", "aggressive"] as const)[Math.floor(Math.random() * 3)],
    last_updated: nowISO(),
  };
  identity = next;

  const snapshot: FinancialIdentitySnapshot = {
    id: uid("snp"),
    financial_identity_id: identity.id,
    snapshot_data: {
      income_type: next.income_type,
      income_stability_score: next.income_stability_score,
      risk_tolerance: next.risk_tolerance,
      decision_style: next.decision_style,
    },
    change_reason: input.reason ?? `Input update: ${input.input_type}`,
    created_at: nowISO(),
  };
  snapshots = [snapshot, ...snapshots];

  audit.unshift({
    id: uid("ae"),
    user_id,
    actor: users.find((u) => u.id === user_id)?.email ?? "unknown",
    action: "INPUT_ADDED",
    entity: "financial_profile_input",
    entity_id: created.id,
    meta: { input_type: created.input_type, input_value: created.input_value },
    created_at: created.created_at,
  });

  audit.unshift({
    id: uid("ae"),
    user_id,
    actor: "system",
    action: "SNAPSHOT_CREATED",
    entity: "financial_identity_snapshot",
    entity_id: snapshot.id,
    meta: { reason: snapshot.change_reason },
    created_at: snapshot.created_at,
  });

  return { input: created, identity: next, snapshot };
}

export async function getSnapshots(user_id: string): Promise<FinancialIdentitySnapshot[]> {
  await delay();
  if (identity.user_id !== user_id) return [];
  return snapshots.slice().sort((a, b) => b.created_at.localeCompare(a.created_at));
}

export async function getAuditEvents(user_id?: string): Promise<AuditEvent[]> {
  await delay();
  const list = user_id ? audit.filter((x) => x.user_id === user_id) : audit;
  return list.slice().sort((a, b) => b.created_at.localeCompare(a.created_at));
}

export async function runIntegrityCheck(): Promise<IntegrityCheck[]> {
  await delay(950);
  const status = Math.random() > 0.82 ? "WARN" : "OK";
  const check: IntegrityCheck = {
    id: uid("ic"),
    status,
    name: status === "OK" ? "Ledger consistency" : "Ledger drift detected",
    detail:
      status === "OK"
        ? "All checks passed for latest snapshots and audit chain."
        : "Minor drift detected in hash chain (simulated). Review last snapshot and audit entries.",
    created_at: nowISO(),
  };
  integrityChecks = [check, ...integrityChecks].slice(0, 20);

  audit.unshift({
    id: uid("ae"),
    user_id: "u_admin",
    actor: "system",
    action: "INTEGRITY_CHECK",
    entity: "audit_event",
    created_at: nowISO(),
    meta: { status: check.status, check_id: check.id },
  });

  return integrityChecks.slice();
}

export async function getIntegrityChecks(): Promise<IntegrityCheck[]> {
  await delay();
  return integrityChecks.slice();
}
