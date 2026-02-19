import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import * as db from "@/services/mockDb";
import { DataTable } from "@/components/common/DataTable";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { fmtDate } from "@/views/system/format";

export function SessionsAdminPage() {
  const qc = useQueryClient();
  const q = useQuery({ queryKey: ["sessions"], queryFn: () => db.getSessions() });

  const m = useMutation({
    mutationFn: (id: string) => db.revokeSession(id),
    onSuccess: async () => {
      toast.success("Sesión cerrada");
      await qc.invalidateQueries({ queryKey: ["sessions"] });
      await qc.invalidateQueries({ queryKey: ["audit"] });
    },
    onError: (e: any) => toast.error("No se pudo cerrar", { description: e?.message }),
  });

  return (
    <div className="space-y-5">
      <div>
        <div className="text-lg font-semibold tracking-tight">Admin • Sesiones activas</div>
        <div className="mt-1 text-sm text-white/60">Listar y cerrar (mock).</div>
      </div>

      <DataTable
        rows={q.data ?? []}
        getRowId={(r) => (r as any).id}
        columns={[
          { key: "user", header: "User ID", render: (r) => (r as any).user_id },
          { key: "device", header: "Dispositivo", render: (r) => <span className="text-white/70">{(r as any).device}</span> },
          { key: "ip", header: "IP", render: (r) => (r as any).ip },
          { key: "created", header: "Creado", render: (r) => <span className="text-white/60">{fmtDate((r as any).created_at)}</span> },
          { key: "last", header: "Last seen", render: (r) => <span className="text-white/60">{fmtDate((r as any).last_seen_at)}</span> },
          { key: "status", header: "Estado", render: (r) => <span className={(r as any).status === "revoked" ? "text-red-200" : "text-accent"}>{(r as any).status}</span> },
          {
            key: "actions",
            header: "",
            render: (r) => (
              <Button
                variant="danger"
                size="sm"
                onClick={() => m.mutate((r as any).id)}
                disabled={(r as any).status === "revoked" || m.isPending}
              >
                Cerrar
              </Button>
            ),
            className: "w-[110px]",
          },
        ]}
        empty={{ title: "Sin sesiones", description: "No hay sesiones registradas." }}
      />
    </div>
  );
}
