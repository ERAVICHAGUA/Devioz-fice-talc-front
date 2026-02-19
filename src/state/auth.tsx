import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { Role } from "@/types/domain";
import * as db from "@/services/mockDb";

type AuthState =
  | { status: "anonymous"; token: null; user_id: null; role: null }
  | { status: "authenticated"; token: string; user_id: string; role: Role };

type AuthContextValue = AuthState & {
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  switchRole: (role: Role) => void; // demo helper
};

const AuthContext = createContext<AuthContextValue | null>(null);

const LS_KEY = "devioz.auth";

function readLS(): AuthState {
  try {
    const raw = localStorage.getItem(LS_KEY);
    if (!raw) return { status: "anonymous", token: null, user_id: null, role: null };
    const parsed = JSON.parse(raw) as { token: string; user_id: string; role: Role };
    return { status: "authenticated", token: parsed.token, user_id: parsed.user_id, role: parsed.role };
  } catch {
    return { status: "anonymous", token: null, user_id: null, role: null };
  }
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AuthState>(() => ({ status: "anonymous", token: null, user_id: null, role: null }));

  useEffect(() => {
    const s = readLS();
    setState(s);
  }, []);

  const value = useMemo<AuthContextValue>(() => {
    return {
      ...state,
      login: async (email, password) => {
        const token = await db.login(email, password);
        localStorage.setItem(LS_KEY, JSON.stringify({ token: token.token, user_id: token.user_id, role: token.role }));
        setState({ status: "authenticated", token: token.token, user_id: token.user_id, role: token.role });
      },
      logout: async () => {
        if (state.status === "authenticated") {
          await db.logout(state.user_id);
        }
        localStorage.removeItem(LS_KEY);
        setState({ status: "anonymous", token: null, user_id: null, role: null });
      },
      switchRole: (role) => {
        // purely UI demo switch (does not change user_id)
        if (state.status === "authenticated") {
          localStorage.setItem(LS_KEY, JSON.stringify({ token: state.token, user_id: state.user_id, role }));
          setState({ ...state, role });
        }
      },
    };
  }, [state]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
