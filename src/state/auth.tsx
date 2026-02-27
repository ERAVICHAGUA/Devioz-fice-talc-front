import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { Role } from "@/types/domain";
import { authApi } from "@/services/authApi";

type AuthState =
  | { status: "anonymous"; token: null; user_id: null; role: null }
  | { status: "authenticated"; token: string; user_id: string; role: Role | "User" };

type AuthContextValue = AuthState & {
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | null>(null);
const LS_KEY = "devioz.auth";

function readLS(): AuthState {
  try {
    const raw = localStorage.getItem(LS_KEY);
    if (!raw) return { status: "anonymous", token: null, user_id: null, role: null };

    const parsed = JSON.parse(raw) as { token: string; user_id?: string; role?: Role | "User" };
    if (!parsed?.token) return { status: "anonymous", token: null, user_id: null, role: null };

    return {
      status: "authenticated",
      token: parsed.token,
      user_id: parsed.user_id ?? "me",
      role: (parsed.role ?? "User") as Role | "User",
    };
  } catch {
    return { status: "anonymous", token: null, user_id: null, role: null };
  }
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AuthState>(() => ({
    status: "anonymous",
    token: null,
    user_id: null,
    role: null,
  }));

  useEffect(() => {
    setState(readLS());
  }, []);

  const value = useMemo<AuthContextValue>(() => {
    return {
      ...state,

      login: async (email, password) => {
        const data = await authApi.login(email, password);
        if (!data?.token) throw new Error("Respuesta inválida del servidor (sin token).");

        const next = {
          token: data.token,
          user_id: data.user_id ?? "me",
          role: ((data.role ?? "User") as Role | "User"),
        };

        localStorage.setItem(LS_KEY, JSON.stringify(next));
        setState({ status: "authenticated", ...next });
      },

      // Register NO loguea automático (tu Postman no devuelve token)
      register: async (email, password) => {
        await authApi.register(email, password);
      },

      logout: async () => {
        try {
          if (state.status === "authenticated") {
            await authApi.logout().catch(() => null);
          }
        } finally {
          localStorage.removeItem(LS_KEY);
          setState({ status: "anonymous", token: null, user_id: null, role: null });
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