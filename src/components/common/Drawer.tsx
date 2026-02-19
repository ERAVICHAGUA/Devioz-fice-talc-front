import * as React from "react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

export function Drawer({
  open,
  title,
  subtitle,
  onClose,
  children,
  widthClassName = "w-[520px]",
}: {
  open: boolean;
  title: string;
  subtitle?: string;
  onClose: () => void;
  children: React.ReactNode;
  widthClassName?: string;
}) {
  return (
    <AnimatePresence>
      {open ? (
        <>
          <motion.button
            aria-label="Cerrar drawer"
            onClick={onClose}
            className="fixed inset-0 z-40 cursor-default bg-black/55 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
          <motion.aside
            className={cn(
              "fixed right-0 top-0 z-50 h-full max-w-[92vw] border-l border-white/10 bg-bg-900/75 shadow-soft backdrop-blur-glass",
              widthClassName
            )}
            initial={{ x: 40, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 40, opacity: 0 }}
            transition={{ duration: 0.18 }}
          >
            <div className="flex items-start justify-between gap-3 border-b border-white/10 p-5">
              <div>
                <div className="text-sm font-semibold">{title}</div>
                {subtitle ? <div className="mt-1 text-xs text-white/55">{subtitle}</div> : null}
              </div>
              <button
                onClick={onClose}
                className="rounded-xl p-2 text-white/60 hover:bg-white/10 hover:text-white"
                aria-label="Cerrar"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="h-[calc(100%-76px)] overflow-auto p-5 scrollbar-thin">{children}</div>
          </motion.aside>
        </>
      ) : null}
    </AnimatePresence>
  );
}
