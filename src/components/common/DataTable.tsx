import * as React from "react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Search } from "lucide-react";

export type Column<T> = {
  key: string;
  header: string;
  render: (row: T) => React.ReactNode;
  className?: string;
};

export function DataTable<T>({
  rows,
  columns,
  pageSize = 8,
  filterPlaceholder = "Buscar…",
  getRowId,
  empty,
}: {
  rows: T[];
  columns: Column<T>[];
  pageSize?: number;
  filterPlaceholder?: string;
  getRowId: (row: T) => string;
  empty?: { title: string; description?: string };
}) {
  const [q, setQ] = React.useState("");
  const [page, setPage] = React.useState(1);

  const filtered = React.useMemo(() => {
    if (!q.trim()) return rows;
    const needle = q.toLowerCase();
    return rows.filter((r) => JSON.stringify(r).toLowerCase().includes(needle));
  }, [rows, q]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  React.useEffect(() => {
    if (page > totalPages) setPage(totalPages);
  }, [page, totalPages]);

  const slice = filtered.slice((page - 1) * pageSize, page * pageSize);

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <div className="relative w-full">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/35" />
          <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder={filterPlaceholder} className="pl-9" />
        </div>
      </div>

      <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/5">
        <div className="overflow-auto scrollbar-thin">
          <table className="min-w-full text-sm">
            <thead className="bg-white/5 text-white/60">
              <tr>
                {columns.map((c) => (
                  <th key={c.key} className={cn("px-4 py-3 text-left font-medium", c.className)}>
                    {c.header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {slice.length ? (
                slice.map((r) => (
                  <tr key={getRowId(r)} className="border-t border-white/10 hover:bg-white/5">
                    {columns.map((c) => (
                      <td key={c.key} className={cn("px-4 py-3 text-white/80", c.className)}>
                        {c.render(r)}
                      </td>
                    ))}
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={columns.length} className="px-4 py-10 text-center">
                    <div className="text-sm font-semibold">{empty?.title ?? "Sin resultados"}</div>
                    {empty?.description ? <div className="mt-1 text-xs text-white/55">{empty.description}</div> : null}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="flex items-center justify-between border-t border-white/10 px-4 py-3 text-xs text-white/55">
          <div>
            {filtered.length} registros • Página {page} / {totalPages}
          </div>
          <div className="flex items-center gap-2">
            <Button variant="secondary" size="sm" onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page <= 1}>
              <ChevronLeft className="h-4 w-4" /> Anterior
            </Button>
            <Button
              variant="secondary"
              size="sm"
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page >= totalPages}
            >
              Siguiente <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
