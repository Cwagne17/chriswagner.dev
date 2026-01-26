"use client";

import type { LucideIcon } from "lucide-react";
import { motion } from "motion/react";
import { forwardRef, type HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

/**
 * MetricBanner - Signature component for status/metric strips
 * Example: "<1 hour provisioning • 100% self-service • 80% reduction"
 * Features: custom border, optional shimmer, icon support
 */

export interface MetricItem {
  label: string;
  icon?: LucideIcon;
}

export interface MetricBannerProps extends Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
  items: MetricItem[];
  shimmer?: boolean;
}

const MetricBanner = forwardRef<HTMLDivElement, MetricBannerProps>(
  ({ items, shimmer = false, className, ...props }, ref) => {
    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className={cn(
          "relative inline-flex items-center gap-4 px-6 py-3",
          "bg-[var(--bg-elev-2)] rounded-[var(--r-lg)]",
          "border border-[var(--border)]",
          // Gradient accent line on top
          "before:absolute before:inset-x-0 before:top-0 before:h-px",
          "before:bg-gradient-to-r before:from-transparent before:via-[var(--accent)] before:to-transparent",
          shimmer && "group hover:border-[var(--accent)]/40",
          className
        )}
        {...props}
      >
        {items.map((item, index) => (
          <div key={index} className="flex items-center gap-2">
            {item.icon && (
              <item.icon className="h-4 w-4 text-[var(--accent)]" />
            )}
            <span className="text-sm font-medium text-[var(--fg)]">
              {item.label}
            </span>
            {index < items.length - 1 && (
              <span className="text-[var(--muted-2)] select-none">•</span>
            )}
          </div>
        ))}
        
        {/* Optional shimmer effect on hover */}
        {shimmer && (
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 overflow-hidden rounded-[var(--r-lg)]">
            <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/5 to-transparent" />
          </div>
        )}
      </motion.div>
    );
  }
);

MetricBanner.displayName = "MetricBanner";

export { MetricBanner };
