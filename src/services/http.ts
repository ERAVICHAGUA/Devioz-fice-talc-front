const talcBase = import.meta.env.VITE_TALC_BASE_URL as string;
const ficeBase = import.meta.env.VITE_FICE_BASE_URL as string;

export type Target = "talc" | "fice";

function base(target: Target) {
  const b = target === "talc" ? talcBase : ficeBase;
  if (!b) throw new Error(`Falta VITE_${target.toUpperCase()}_BASE_URL en tu .env`);
  return b.replace(/\/$/, "");
}

function tokenFromLS() {
  try {
    const raw = localStorage.getItem("devioz.auth");
    if (!raw) return null;
    return JSON.parse(raw)?.token ?? null;
  } catch {
    return null;
  }
}

async function parseError(res: Response) {
  try {
    const data = await res.json();
    return data?.message || data?.error || JSON.stringify(data);
  } catch {
    return await res.text();
  }
}

export async function api<T>(target: Target, path: string, init: RequestInit = {}) {
  const url = `${base(target)}${path.startsWith("/") ? path : `/${path}`}`;

  const headers = new Headers(init.headers);

  const token = tokenFromLS();
  if (token) headers.set("Authorization", `Bearer ${token}`);

  if (init.body && !headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }

  const res = await fetch(url, { ...init, headers });

  if (!res.ok) {
    const msg = await parseError(res);
    throw new Error(msg || `Error ${res.status}`);
  }

  const text = await res.text();
  return (text ? JSON.parse(text) : null) as T;
}