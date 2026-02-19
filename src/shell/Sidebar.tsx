import * as React from "react";
import { NavLink } from "react-router-dom";
import { NAV } from "@/shell/nav";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useAuth } from "@/state/auth";

const LS_KEY = "devioz.sidebar.collapsed";

export function Sidebar() {
  const [collapsed, setCollapsed] = React.useState(() => localStorage.getItem(LS_KEY) === "1");
  const auth = useAuth();

  const groups = React.useMemo(() => {
    const visible = NAV.filter((i) => (i.group === "Admin" ? auth.role === "Admin" : true));
    return Array.from(new Set(visible.map((v) => v.group))).map((g) => ({
      group: g,
      items: visible.filter((x) => x.group === g),
    }));
  }, [auth.role]);

  const toggle = () => {
    setCollapsed((c) => {
      const next = !c;
      localStorage.setItem(LS_KEY, next ? "1" : "0");
      return next;
    });
  };

  return (
    <TooltipProvider delayDuration={250}>
      <aside
        className={cn(
          "glass relative flex h-full flex-col rounded-3xl p-3",
          collapsed ? "w-[86px]" : "w-[280px]"
        )}
      >
        <div className="flex items-center justify-between gap-3 px-2 py-2">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-2xl bg-accent/20 ring-1 ring-accent/25 shadow-glow" />
            {!collapsed ? (
              <div className="leading-tight">
                <div className="text-sm font-semibold">Devioz</div>
                <div className="text-xs text-white/55">FICE • TACL</div>
              </div>
            ) : null}
          </div>

          <button
            onClick={toggle}
            className="rounded-xl p-2 text-white/55 hover:bg-white/10 hover:text-white"
            aria-label="Colapsar sidebar"
          >
            {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          </button>
        </div>

        <div className="mt-2 flex-1 space-y-4 overflow-auto pr-1 scrollbar-thin">
          {groups.map((g) => (
            <div key={g.group}>
              {!collapsed ? <div className="px-2 pb-2 text-[11px] font-medium text-white/40">{g.group}</div> : null}
              <div className="space-y-1">
                {g.items.map((it) => {
                  const Icon = it.icon;
                  const link = (
                    <NavLink
                      key={it.to}
                      to={it.to}
                      className={({ isActive }) =>
                        cn(
                          "flex items-center gap-3 rounded-2xl px-3 py-2 text-sm text-white/70 transition hover:bg-white/10 hover:text-white",
                          isActive ? "bg-white/10 text-white ring-1 ring-white/10" : ""
                        )
                      }
                    >
                      <Icon className="h-4 w-4" />
                      {!collapsed ? <span className="truncate">{it.label}</span> : null}
                    </NavLink>
                  );

                  return collapsed ? (
                    <Tooltip key={it.to}>
                      <TooltipTrigger asChild>{link}</TooltipTrigger>
                      <TooltipContent side="right">{it.label}</TooltipContent>
                    </Tooltip>
                  ) : (
                    link
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-3 rounded-2xl border border-white/10 bg-white/5 p-3">
          {!collapsed ? (
            <>
              <div className="text-xs text-white/60">Contexto</div>
              <div className="mt-1 text-sm font-semibold">{auth.role ?? "—"}</div>
              <div className="mt-1 text-xs text-white/45">{auth.status === "authenticated" ? auth.user_id : "Sin sesión"}</div>
            </>
          ) : (
            <div className="text-center text-xs text-white/55">CTX</div>
          )}
        </div>
      </aside>
    </TooltipProvider>
  );
}
