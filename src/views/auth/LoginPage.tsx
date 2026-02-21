import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/state/auth";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner";

type Mode = "login" | "register";

export function LoginPage() {
  const auth = useAuth();
  const nav = useNavigate();
  const loc = useLocation() as any;
  const from = loc.state?.from ?? "/dashboard";

  const [mode, setMode] = React.useState<Mode>("login");

  // Login state
  const [email, setEmail] = React.useState("user@devioz.pe");
  const [password, setPassword] = React.useState("demo");
  const [loading, setLoading] = React.useState(false);

  // Register state (mock)
  const [fullName, setFullName] = React.useState("");
  const [regEmail, setRegEmail] = React.useState("");
  const [regPassword, setRegPassword] = React.useState("");

  React.useEffect(() => {
    if (auth.status === "authenticated") nav("/dashboard", { replace: true });
  }, [auth.status, nav]);

  const onLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await auth.login(email, password);
      toast.success("Bienvenido/a.");
      nav(from, { replace: true });
    } catch (err: any) {
      const code = err?.code ?? 500;
      toast.error(code === 403 ? "Acceso denegado" : "No se pudo iniciar sesión", {
        description: err?.message ?? "Verifica tus credenciales.",
      });
    } finally {
      setLoading(false);
    }
  };

  const onRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      // TODO: aquí conectarás tu endpoint real: auth.register(...)
      // Por ahora: simulación
      if (!fullName.trim() || !regEmail.trim() || !regPassword.trim()) {
        toast.error("Completa tus datos.");
        return;
      }

      toast.success("Cuenta creada. Ahora inicia sesión.");
      setMode("login");
      setEmail(regEmail);
      setPassword("");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-bg-950 text-white">
      <div className="pointer-events-none fixed inset-0 bg-grid opacity-[0.35]" />
      <div className="pointer-events-none fixed -top-40 left-1/2 h-[520px] w-[820px] -translate-x-1/2 rounded-full bg-accent/10 blur-3xl" />

      <div className="relative mx-auto flex min-h-screen max-w-[1100px] items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.22 }}
          className="w-full max-w-md"
        >
          <div className="glass rounded-3xl p-7">
            {/* Logo centrado */}
            <img
              src="/logo-devioz.webp"
              alt="Devioz"
              className="mx-auto mb-8 w-48 object-contain drop-shadow-[0_0_15px_rgba(0,255,180,0.25)]"
            />

            <div className="text-center">
              <div className="text-lg font-semibold tracking-tight">
                Sistema de Identidad Financiera
              </div>
              <div className="mt-1 text-sm text-white/60">
                Devioz S.A.C. • Módulos <span className="text-white">FICE</span> +{" "}
                <span className="text-white">TACL</span>
              </div>
            </div>

            {/* Tabs */}
            <div className="mt-6 grid grid-cols-2 rounded-2xl bg-white/5 p-1 ring-1 ring-white/10">
              <button
                type="button"
                onClick={() => setMode("login")}
                className={[
                  "rounded-xl py-2 text-sm transition",
                  mode === "login"
                    ? "bg-white/10 text-white"
                    : "text-white/60 hover:text-white",
                ].join(" ")}
              >
                Iniciar sesión
              </button>
              <button
                type="button"
                onClick={() => setMode("register")}
                className={[
                  "rounded-xl py-2 text-sm transition",
                  mode === "register"
                    ? "bg-white/10 text-white"
                    : "text-white/60 hover:text-white",
                ].join(" ")}
              >
                Registrarse
              </button>
            </div>

            <AnimatePresence mode="wait">
              {mode === "login" ? (
                <motion.div
                  key="login"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.18 }}
                >
                  <form onSubmit={onLogin} className="mt-6 space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        autoComplete="email"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="password">Password</Label>
                      <Input
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        autoComplete="current-password"
                      />
                    </div>

                    <Button
                      type="submit"
                      className="w-full"
                      disabled={loading}
                      aria-busy={loading}
                    >
                      {loading ? "Ingresando…" : "Ingresar"}
                    </Button>

                    {/* Usuario único: demo simple */}
                    <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-xs text-white/60">
                      <div className="font-medium text-white/75">
                        Credenciales demo:
                      </div>
                      <div className="mt-1">Email: user@devioz.pe</div>
                      <div className="mt-2 text-white/40">
                        Password: cualquier valor (mock).
                      </div>
                    </div>
                  </form>
                </motion.div>
              ) : (
                <motion.div
                  key="register"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.18 }}
                >
                  <form onSubmit={onRegister} className="mt-6 space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="fullName">Nombre</Label>
                      <Input
                        id="fullName"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        autoComplete="name"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="regEmail">Email</Label>
                      <Input
                        id="regEmail"
                        value={regEmail}
                        onChange={(e) => setRegEmail(e.target.value)}
                        autoComplete="email"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="regPassword">Password</Label>
                      <Input
                        id="regPassword"
                        type="password"
                        value={regPassword}
                        onChange={(e) => setRegPassword(e.target.value)}
                        autoComplete="new-password"
                      />
                    </div>

                    <Button
                      type="submit"
                      className="w-full"
                      disabled={loading}
                      aria-busy={loading}
                    >
                      {loading ? "Creando…" : "Crear cuenta"}
                    </Button>

                    <div className="text-xs text-white/45">
                      Al crear tu cuenta, aceptas las políticas de la plataforma.
                    </div>
                  </form>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </div>
  );

}
