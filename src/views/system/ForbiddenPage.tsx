import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export function ForbiddenPage() {
  const nav = useNavigate();
  return (
    <div className="grid place-items-center py-14">
      <div className="max-w-md text-center">
        <div className="text-2xl font-semibold">403</div>
        <div className="mt-2 text-sm text-white/60">No tienes permisos para ver esta sección.</div>
        <div className="mt-6 flex justify-center gap-2">
          <Button variant="secondary" onClick={() => nav("/dashboard")}>
            Ir al Dashboard
          </Button>
          <Button onClick={() => nav("/login")}>Cambiar sesión</Button>
        </div>
      </div>
    </div>
  );
}
