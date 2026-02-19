import * as React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/state/auth";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner";

export function LoginPage() {
  const auth = useAuth();
  const nav = useNavigate();
  const loc = useLocation() as any;
  const from = loc.state?.from ?? "/dashboard";

  const [email, setEmail] = React.useState("user@devioz.pe");
  const [password, setPassword] = React.useState("demo");
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    if (auth.status === "authenticated") nav("/dashboard", { replace: true });
  }, [auth.status, nav]);

  const onSubmit = async (e: React.FormEvent) => {
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

  return (
    <div className="min-h-screen bg-bg-950 text-white">
      <div className="pointer-events-none fixed inset-0 bg-grid opacity-[0.35]" />
      <div className="pointer-events-none fixed -top-40 left-1/2 h-[520px] w-[820px] -translate-x-1/2 rounded-full bg-accent/10 blur-3xl" />

      <div className="relative mx-auto flex min-h-screen max-w-[1100px] items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.22 }}
          className="grid w-full grid-cols-1 gap-6 lg:grid-cols-2"
        >
          <div className="glass hidden rounded-3xl p-7 lg:block">
            <div className="h-12 w-12 rounded-2xl bg-accent/20 ring-1 ring-accent/25 shadow-glow" />
            <div className="mt-5 text-xl font-semibold tracking-tight">Sistema de Identidad Financiera</div>
            <div className="mt-2 text-sm text-white/60">
              Devioz S.A.C. • Módulos <span className="text-white">FICE</span> + <span className="text-white">TACL</span>
            </div>
            <div className="mt-8 space-y-3 text-sm text-white/65">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">• Dashboard premium con widgets flotantes</div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">• Snapshots y auditoría con trazabilidad</div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">• Integridad con verificaciones (mock)</div>
            </div>
          </div>

          <div className="glass rounded-3xl p-7">
            <div className="text-sm font-semibold">Login</div>
            <div className="mt-1 text-sm text-white/60">Accede con un usuario demo</div>

            <form onSubmit={onSubmit} className="mt-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} autoComplete="current-password" />
              </div>

              <Button type="submit" className="w-full" disabled={loading} aria-busy={loading}>
                {loading ? "Ingresando…" : "Ingresar"}
              </Button>

              <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-xs text-white/60">
                <div className="font-medium text-white/75">Credenciales demo:</div>
                <div className="mt-1">User: user@devioz.pe (rol User)</div>
                <div>Admin: admin@devioz.pe (rol Admin)</div>
                <div className="mt-2 text-white/40">Password: cualquier valor (mock).</div>
              </div>
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
