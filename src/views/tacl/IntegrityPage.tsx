import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import * as db from "@/services/mockDb";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { fmtDate } from "@/views/system/format";
import { Skeleton } from "@/components/common/Skeleton";
import { toast } from "sonner";

export function IntegrityPage() {
  const qc = useQueryClient();
  const q = useQuery({ queryKey: ["integrity"], queryFn: () => db.getIntegrityChecks() });

  const m = useMutation({
    mutationFn: () => db.runIntegrityCheck(),
    onSuccess: async () => {
      toast.success("Verificación ejecutada");
      await qc.invalidateQueries({ queryKey: ["integrity"] });
      await qc.invalidateQueries({ queryKey: ["audit"] });
    },
    onError: (e: any) => toast.error("No se pudo ejecutar", { description: e?.message }),
  });

  const status = q.data?.[0]?.status ?? "—";

  return (
    <div className="space-y-5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="text-lg font-semibold tracking-tight">TACL • Integridad</div>
          <div className="mt-1 text-sm text-white/60">Status card + historial de verificaciones (mock).</div>
        </div>
        <Button onClick={() => m.mutate()} disabled={m.isPending}>
          {m.isPending ? "Ejecutando…" : "Ejecutar verificación"}
        </Button>
      </div>

      <Card className="p-0">
        <CardHeader>
          <CardTitle>Integrity Status</CardTitle>
          <CardDescription>OK / Warn • checks recientes</CardDescription>
        </CardHeader>
        <CardContent className="pt-0">
          {q.isLoading ? (
            <Skeleton className="h-20" />
          ) : (
            <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 p-4">
              <div>
                <div className="text-xs text-white/60">Estado</div>
                <div className={cn("mt-1 text-2xl font-semibold", status === "WARN" ? "text-yellow-200" : "text-accent")}>
                  {status}
                </div>
              </div>
              <div className="text-right text-xs text-white/55">
                {q.data?.[0] ? (
                  <>
                    <div>Último check</div>
                    <div className="mt-1 text-white/70">{fmtDate(q.data[0].created_at)}</div>
                  </>
                ) : (
                  "—"
                )}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <Card className="p-0">
        <CardHeader>
          <CardTitle>Verificaciones</CardTitle>
          <CardDescription>Historial (mock)</CardDescription>
        </CardHeader>
        <CardContent className="pt-0">
          {q.isLoading ? (
            <div className="space-y-3">
              <Skeleton className="h-14" />
              <Skeleton className="h-14" />
              <Skeleton className="h-14" />
            </div>
          ) : (
            <div className="space-y-2">
              {(q.data ?? []).map((c) => (
                <div key={c.id} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <div className="flex items-center justify-between gap-3">
                    <div className="text-sm font-semibold">{c.name}</div>
                    <div className={cn("text-xs font-semibold", c.status === "WARN" ? "text-yellow-200" : "text-accent")}>{c.status}</div>
                  </div>
                  <div className="mt-1 text-xs text-white/55">{c.detail}</div>
                  <div className="mt-2 text-xs text-white/45">{fmtDate(c.created_at)}</div>
                </div>
              ))}
              {!(q.data ?? []).length ? (
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-center text-sm text-white/70">
                  Sin verificaciones todavía.
                </div>
              ) : null}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
