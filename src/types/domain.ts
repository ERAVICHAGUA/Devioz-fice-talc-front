export type Role = "Admin" | "User";

export type User = {
  id: string;
  email: string;
  full_name: string;
  role: Role;
  status: "active" | "blocked";
  created_at: string;
};

export type UserSession = {
  id: string;
  user_id: string;
  device: string;
  ip: string;
  created_at: string;
  last_seen_at: string;
  status: "active" | "revoked";
};

export type FinancialProfileInput = {
  id: string;
  user_id: string;
  input_type: "salary" | "freelance" | "expenses" | "loan" | "savings" | "card_usage";
  input_value: string;
  created_at: string;
};

export type FinancialIdentity = {
  id: string;
  user_id: string;
  income_type: "fixed" | "mixed" | "variable";
  income_stability_score: number; // 0-100
  risk_tolerance: "low" | "medium" | "high";
  decision_style: "conservative" | "balanced" | "aggressive";
  created_at: string;
  last_updated: string;
};

export type FinancialIdentitySnapshot = {
  id: string;
  financial_identity_id: string;
  snapshot_data: Record<string, unknown>;
  change_reason?: string;
  created_at: string;
};

export type AuditEvent = {
  id: string;
  user_id: string;
  actor: string; // email or system
  action: "LOGIN" | "LOGOUT" | "INPUT_ADDED" | "SNAPSHOT_CREATED" | "INTEGRITY_CHECK" | "USER_BLOCKED" | "USER_ACTIVATED" | "SESSION_REVOKED";
  entity: "user" | "user_session" | "financial_profile_input" | "financial_identity" | "financial_identity_snapshot" | "audit_event";
  entity_id?: string;
  meta?: Record<string, unknown>;
  created_at: string;
};

export type IntegrityCheck = {
  id: string;
  status: "OK" | "WARN";
  name: string;
  detail: string;
  created_at: string;
};
