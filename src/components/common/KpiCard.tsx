import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export function KpiCard({
  label,
  value,
  hint,
  className,
}: {
  label: string;
  value: string;
  hint?: string;
  className?: string;
}) {
  return (
    <Card className={cn("p-0", className)}>
      <CardContent className="p-4">
        <div className="text-xs text-white/60">{label}</div>
        <div className="mt-1 text-lg font-semibold tracking-tight">{value}</div>
        {hint ? <div className="mt-1 text-xs text-white/45">{hint}</div> : null}
      </CardContent>
    </Card>
  );
}
