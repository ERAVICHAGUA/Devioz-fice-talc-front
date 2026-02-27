import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CursorGlow } from "@/components/common/CursorGlow";
export function LandingPage() {
  const nav = useNavigate();

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#0B0F14] text-white">
        <CursorGlow />
      {/* Glow tipo Stripe */}
      <div
        className="pointer-events-none absolute -top-64 -right-64 h-[700px] w-[700px] rounded-full blur-[170px]"
        style={{ background: "rgba(46, 229, 157, 0.16)" }}
      />
      <div
        className="pointer-events-none absolute -bottom-72 -left-64 h-[650px] w-[650px] rounded-full blur-[170px]"
        style={{ background: "rgba(20, 184, 166, 0.10)" }}
      />

      {/* Grid sutil */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,.12) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,.12) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Overlay */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/10 via-black/20 to-black/60" />

      <div className="relative z-10 mx-auto max-w-6xl px-6">
        {/* Barra superior */}
        <header className="flex items-center justify-between py-6">
          <div className="flex items-center gap-3">
            <img
              src="/logo-dineroh.png"
              alt="Diner Oh!"
              className="h-9 w-auto drop-shadow-[0_0_18px_rgba(46,229,157,0.22)]"
            />
            <div className="leading-tight">
              <div className="text-sm font-semibold tracking-wide">Diner Oh!</div>
              <div className="text-xs text-white/60">Tu asistente financiero</div>
            </div>
          </div>

          <nav className="hidden items-center gap-6 text-sm text-white/70 md:flex">
            <a className="hover:text-white" href="#producto">
              Producto
            </a>
            <a className="hover:text-white" href="#confianza">
              Seguridad
            </a>
            <a className="hover:text-white" href="#como-funciona">
              Cómo funciona
            </a>
          </nav>

          <div className="flex items-center gap-2">
            <Button
              className="border border-white/15 bg-white/0 text-white/80 hover:bg-white/5 hover:text-white"
              onClick={() => nav("/login")}
            >
              Ingresar
            </Button>
            <Button
              className="bg-emerald-400 text-black hover:bg-emerald-300"
              onClick={() => nav("/login")}
            >
              Empezar
            </Button>
          </div>
        </header>

        {/* HERO */}
        <section className="pt-12 md:pt-16">
          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl font-semibold leading-tight md:text-6xl"
          >
            Anticípate a tu dinero.
            <span className="text-emerald-300"> No esperes a reaccionar.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="mt-5 max-w-2xl text-base text-white/70 md:text-lg"
          >
            Diner Oh! analiza tu situación financiera y te muestra lo que realmente importa.
            Menos confusión. Más claridad. Decisiones con criterio.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-7 flex flex-wrap gap-3"
          >
            <Button
              className="bg-emerald-400 text-black hover:bg-emerald-300"
              onClick={() => nav("/login")}
            >
              Entrar a mi panel
            </Button>

            <Button
              className="border border-white/20 bg-white/5 text-white hover:bg-white/10"
              onClick={() => {
                const seccion = document.getElementById("como-funciona");
                seccion?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              Ver cómo funciona
            </Button>
          </motion.div>

          {/* Mini bloques */}
          <div className="mt-10 grid gap-3 md:grid-cols-3">
            <MiniStat
              title="Claridad financiera"
              value="En tiempo real"
              desc="Visualiza tu estado actual sin pantallas técnicas."
            />
            <MiniStat
              title="Decisiones con contexto"
              value="Inteligente"
              desc="No solo números: análisis que te ayuda a decidir."
            />
            <MiniStat
              title="Confianza total"
              value="Verificable"
              desc="Tus acciones importantes quedan registradas."
            />
          </div>
        </section>

        {/* CÓMO FUNCIONA */}
        <section id="como-funciona" className="mt-16 md:mt-20">
          <h2 className="text-2xl font-semibold md:text-3xl">Cómo funciona</h2>
          <p className="mt-2 max-w-2xl text-white/70">
            En 3 pasos simples. Sin pantallas técnicas.
          </p>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            <StepCard
              n="1"
              title="Registra tu información"
              desc="Ingresos, gastos y compromisos. Lo básico para empezar."
            />
            <StepCard
              n="2"
              title="Te damos un resumen claro"
              desc="Ves tu situación y lo más importante en una sola vista."
            />
            <StepCard
              n="3"
              title="Tus acciones quedan protegidas"
              desc="Cambios importantes con historial e integridad."
            />
          </div>
        </section>

        {/* PRODUCTO */}
        <section id="producto" className="mt-16 md:mt-20">
          <h2 className="text-2xl font-semibold md:text-3xl">Producto</h2>
          <p className="mt-2 max-w-2xl text-white/70">
            Diseñado para ayudarte a tomar decisiones con información clara y confianza.
          </p>

          <div className="mt-8 grid gap-4 md:grid-cols-2">
            <FeatureCard
              title="Tu perfil financiero"
              points={[
                "Perfil dinámico (se actualiza con el tiempo)",
                "Resumen fácil para decisiones",
                "Capturas y registros de cambios",
              ]}
            />
            <FeatureCard
              title="Seguridad e integridad"
              points={[
                "Verificación de integridad",
                "Historial de acciones importantes",
                "Base para automatizaciones seguras",
              ]}
            />
          </div>
        </section>

        {/* SEGURIDAD */}
        <section id="confianza" className="mt-16 md:mt-20">
          <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-7 backdrop-blur md:p-10">
            <h2 className="text-2xl font-semibold md:text-3xl">Seguridad por diseño</h2>
            <p className="mt-2 max-w-2xl text-white/70">
              Claridad sin asustar: estado, verificación y registro.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Button
                className="bg-emerald-400 text-black hover:bg-emerald-300"
                onClick={() => nav("/login")}
              >
                Empezar ahora
              </Button>
              <Button
                className="border border-white/20 bg-white/5 text-white hover:bg-white/10"
                onClick={() => nav("/dashboard")}
              >
                Ir al panel
              </Button>
            </div>
          </div>
        </section>

        <footer className="py-12 text-sm text-white/50">
          © {new Date().getFullYear()} Diner Oh!
        </footer>
      </div>
    </div>
  );
}

function MiniStat({
  title,
  value,
  desc,
}: {
  title: string;
  value: string;
  desc: string;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur">
      <div className="text-xs text-white/60">{title}</div>
      <div className="mt-1 text-lg font-semibold">{value}</div>
      <div className="mt-1 text-sm text-white/60">{desc}</div>
    </div>
  );
}

function StepCard({
  n,
  title,
  desc,
}: {
  n: string;
  title: string;
  desc: string;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur">
      <div className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-emerald-400/20 text-emerald-200">
        {n}
      </div>
      <div className="mt-3 text-lg font-semibold">{title}</div>
      <div className="mt-2 text-sm text-white/60">{desc}</div>
    </div>
  );
}

function FeatureCard({ title, points }: { title: string; points: string[] }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-7 backdrop-blur">
      <div className="text-lg font-semibold">{title}</div>
      <ul className="mt-4 space-y-2 text-sm text-white/70">
        {points.map((p) => (
          <li key={p} className="flex gap-2">
            <span className="mt-[6px] h-2 w-2 rounded-full bg-emerald-300/80" />
            <span>{p}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}