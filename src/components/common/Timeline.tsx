import { cn } from "@/lib/utils";

export function Timeline({
  items,
  onSelect,
}: {
  items: { id: string; title: string; subtitle?: string; metaRight?: string }[];
  onSelect?: (id: string) => void;
}) {
  return (
    <div className="space-y-3">
      {items.map((it, idx) => (
        <button
          key={it.id}
          onClick={() => onSelect?.(it.id)}
          className="group w-full rounded-3xl border border-white/10 bg-white/5 p-4 text-left transition hover:bg-white/8"
        >
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <div className="text-sm font-semibold">{it.title}</div>
              {it.subtitle ? <div className="mt-1 text-xs text-white/55">{it.subtitle}</div> : null}
            </div>
            {it.metaRight ? <div className="shrink-0 text-xs text-white/45">{it.metaRight}</div> : null}
          </div>
          <div className="mt-3 flex items-center gap-3">
            <div className="h-6 w-6 rounded-full bg-accent/20 ring-1 ring-accent/25" />
            <div className={cn("h-px flex-1 bg-white/10", idx === items.length - 1 ? "opacity-0" : "opacity-100")} />
          </div>
        </button>
      ))}
    </div>
  );
}
