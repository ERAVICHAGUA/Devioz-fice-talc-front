import { isRouteErrorResponse, useRouteError } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export function ErrorBoundaryPage() {
  const err = useRouteError();
  const nav = useNavigate();

  const title = isRouteErrorResponse(err) ? `Error ${err.status}` : "Error inesperado";
  const desc = isRouteErrorResponse(err) ? err.statusText : (err as any)?.message ?? "Algo falló.";

  return (
    <div className="grid place-items-center py-14">
      <div className="max-w-lg text-center">
        <div className="text-2xl font-semibold">{title}</div>
        <div className="mt-2 text-sm text-white/60">{desc}</div>
        <div className="mt-6 flex justify-center gap-2">
          <Button variant="secondary" onClick={() => nav(-1)}>
            Volver
          </Button>
          <Button onClick={() => nav("/dashboard")}>Dashboard</Button>
        </div>
      </div>
    </div>
  );
}
