import { api } from "./http";
import type { Role } from "@/types/domain";

export type LoginRes = { token?: string; user_id?: string; role?: Role };

export const authApi = {
  login: (email: string, password: string) =>
    api<LoginRes>("talc", "/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    }),

  // Register real: { email, password }
  register: (email: string, password: string) =>
    api<any>("talc", "/auth/register", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    }),

  // Opcional: si no existe en tu backend, igual no rompe porque lo atrapamos
  logout: () =>
    api<any>("talc", "/auth/logout", {
      method: "POST",
    }),
};