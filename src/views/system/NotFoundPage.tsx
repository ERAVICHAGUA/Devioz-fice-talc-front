import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export function NotFoundPage() {
  const nav = useNavigate();
  return (
    <div className="grid place-items-center py-14">
      <div className="max-w-md text-center">
        <div className="text-2xl font-semibold">404</div>
        <div className="mt-2 text-sm text-white/60">No encontramos esta ruta.</div>
        <div className="mt-6">
          <Button onClick={() => nav("/dashboard")}>Volver al Dashboard</Button>
        </div>
      </div>
    </div>
  );
}
