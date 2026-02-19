import * as React from "react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { GripVertical, MoreHorizontal } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { motion } from "framer-motion";

export function WidgetCard({
  title,
  subtitle,
  children,
  className,
  dragHandleProps,
  onToggleCollapse,
  collapsed,
  onRemove,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  className?: string;
  dragHandleProps?: React.HTMLAttributes<HTMLButtonElement>;
  collapsed?: boolean;
  onToggleCollapse?: () => void;
  onRemove?: () => void;
}) {
  return (
    <motion.div layout>
      <Card className={cn("p-0", className)}>
        <div className="flex items-start justify-between gap-3 border-b border-white/10 p-4">
          <div className="min-w-0">
            <div className="truncate text-sm font-semibold">{title}</div>
            {subtitle ? <div className="mt-1 truncate text-xs text-white/55">{subtitle}</div> : null}
          </div>

          <div className="flex items-center gap-1">
            <button
              aria-label="Arrastrar"
              className="rounded-xl p-2 text-white/50 hover:bg-white/10 hover:text-white"
              {...dragHandleProps}
            >
              <GripVertical className="h-4 w-4" />
            </button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="rounded-xl p-2 text-white/50 hover:bg-white/10 hover:text-white" aria-label="Opciones">
                  <MoreHorizontal className="h-4 w-4" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onSelect={() => onToggleCollapse?.()}>
                  {collapsed ? "Expandir" : "Colapsar"}
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-red-200" onSelect={() => onRemove?.()}>
                  Quitar widget
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <div className={cn("p-4", collapsed ? "hidden" : "block")}>{children}</div>
      </Card>
    </motion.div>
  );
}
