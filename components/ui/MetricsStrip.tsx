"use client";

import { motion } from "motion/react";
import { forwardRef, type HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

/**
 * MetricsStrip - Signature proof/metrics section
 * Features: custom border glow, gradient top border, big numbers
 */

export interface Metric {
  number: string;
  label: string;
  descriptor?: string;
}

export interface MetricsStripProps extends HTMLAttributes<HTMLDivElement> {
  metrics: Metric[];
}

const MetricsStrip = forwardRef<HTMLDivElement, MetricsStripProps>(
  ({ metrics, className, ...props }, ref) => {
  return (
    <section
      ref={ref}
      className={cn("py-8 px-6 relative border-y border-border/50 bg-background", className)}
      {...props}
    >
      {/* Gradient top border */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />
      
      {/* Subtle glow effect */}
      <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-blue-500/30 to-transparent blur-sm" />
        
        <div className="max-w-[1600px] mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 place-items-center">
            {metrics.map((metric, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="text-2xl md:text-3xl font-bold bg-gradient-to-br from-blue-500 to-purple-500 bg-clip-text text-transparent mb-1">
                  {metric.number}
                </div>
                <div className="text-sm font-medium text-foreground mb-0.5">
                  {metric.label}
                </div>
                {metric.descriptor && (
                  <div className="text-xs text-muted-foreground">
                    {metric.descriptor}
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
        
        {/* Gradient bottom border */}
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent" />
      </section>
    );
  }
);

MetricsStrip.displayName = "MetricsStrip";

export { MetricsStrip };
