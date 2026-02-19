import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import * as db from "@/services/mockDb";
import { DataTable } from "@/components/common/DataTable";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { fmtDate } from "@/views/system/format";

export function UsersAdminPage() {
  const qc = useQueryClient();
  const q = useQuery({ queryKey: ["users"], queryFn: () => db.getUsers() });

  const m = useMutation({
    mutationFn: (p: { user_id: string; status: "active" | "blocked" }) => db.setUserStatus(p.user_id, p.status),
    onSuccess: async () => {
      toast.success("Usuario actualizado");
      await qc.invalidateQueries({ queryKey: ["users"] });
      await qc.invalidateQueries({ queryKey: ["audit"] });
    },
    onError: (e: any) => toast.error("No se pudo actualizar", { description: e?.message }),
  });

  return (
    <div className="space-y-5">
      <div>
        <div className="text-lg font-semibold tracking-tight">Admin • Usuarios</div>
        <div className="mt-1 text-sm text-white/60">Listar, activar/bloquear (mock).</div>
      </div>

      <DataTable
        rows={q.data ?? []}
        getRowId={(r) => (r as any).id}
        columns={[
          { key: "name", header: "Nombre", render: (r) => <span className="font-medium">{(r as any).full_name}</span> },
          { key: "email", header: "Email", render: (r) => <span className="text-white/70">{(r as any).email}</span> },
          { key: "role", header: "Rol", render: (r) => (r as any).role },
          { key: "status", header: "Estado", render: (r) => <span className={(r as any).status === "blocked" ? "text-red-200" : "text-accent"}>{(r as any).status}</span> },
          { key: "created", header: "Creado", render: (r) => <span className="text-white/60">{fmtDate((r as any).created_at)}</span> },
          {
            key: "actions",
            header: "",
            render: (r) => {
              const u = r as any;
              const next = u.status === "blocked" ? "active" : "blocked";
              return (
                <Button
                  variant={u.status === "blocked" ? "default" : "danger"}
                  size="sm"
                  onClick={() => m.mutate({ user_id: u.id, status: next })}
                >
                  {u.status === "blocked" ? "Activar" : "Bloquear"}
                </Button>
              );
            },
            className: "w-[120px]",
          },
        ]}
        empty={{ title: "Sin usuarios", description: "Mock vacío." }}
      />
    </div>
  );
}
