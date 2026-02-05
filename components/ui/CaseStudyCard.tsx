"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { forwardRef, type HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export interface CaseStudyCardProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  title: string;
  metrics: Array<{ label: string; value: string }>;
  technologies: string[];
  thumbnailImage?: string;
  thumbnailAlt?: string;
  topicBadge: string;
  topicColor: string; // Tailwind gradient class
  href: string;
  index?: number;
}

const CaseStudyCard = forwardRef<HTMLDivElement, CaseStudyCardProps>(
  (
    {
      title,
      metrics,
      technologies,
      thumbnailImage,
      thumbnailAlt,
      topicBadge,
      topicColor,
      href,
      index = 0,
      className,
      ...props
    },
    ref
  ) => {
    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: index * 0.05 }}
        className="h-full"
        {...props}
      >
        <Link href={href} className="block h-full group">
          <div
            className={cn(
              "relative h-full rounded-lg overflow-hidden transition-all duration-300",
              "bg-card border border-border",
              "hover:border-border hover:shadow-lg hover:shadow-blue-500/5",
              "hover:-translate-y-1",
              "flex flex-col",
              className
            )}
          >
            {/* Top 50%: Image Area */}
            <div className="relative h-1/2 bg-secondary overflow-hidden">
              {thumbnailImage ? (
                <>
                  <img
                    src={thumbnailImage}
                    alt={thumbnailAlt || title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  {/* Gradient overlay for depth */}
                  <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
                </>
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-secondary">
                  <span className="text-xs text-muted-foreground text-center px-4">
                    {thumbnailAlt || "Architecture Diagram"}
                  </span>
                </div>
              )}

              {/* Topic Badge (top-left overlay) */}
              <div className="absolute top-3 left-3 z-10">
                <span className={cn(
                  "inline-block px-2.5 py-1 rounded text-xs font-semibold",
                  "bg-gradient-to-r text-white",
                  topicColor
                )}>
                  {topicBadge}
                </span>
              </div>
            </div>

            {/* Bottom 50%: Content Area */}
            <div className="relative h-1/2 p-4 flex flex-col justify-between bg-card">
              {/* Title */}
              <h3 className="text-base font-semibold text-foreground line-clamp-2 mb-2">
                {title}
              </h3>

              {/* Metrics Pills */}
              {metrics.length > 0 && (
                <div className="flex flex-col gap-1.5 mb-3">
                  {metrics.slice(0, 2).map((metric, i) => (
                    <div key={i} className="flex items-baseline gap-2">
                      <span className="text-sm font-bold text-blue-400">
                        {metric.value}
                      </span>
                      <span className="text-xs text-muted-foreground line-clamp-1">
                        {metric.label}
                      </span>
                    </div>
                  ))}
                </div>
              )}

              {/* Technology Pills */}
              {technologies.length > 0 && (
                <div className="flex flex-wrap gap-1.5">
                  {technologies.slice(0, 6).map((tech, i) => (
                    <span
                      key={i}
                      className="px-2 py-1 rounded-full text-xs font-medium bg-secondary/60 text-muted-foreground border border-border/50"
                    >
                      {tech}
                    </span>
                  ))}
                  {technologies.length > 6 && (
                    <span className="px-2 py-1 rounded-full text-xs font-medium bg-secondary/60 text-muted-foreground border border-border/50">
                      +{technologies.length - 6}
                    </span>
                  )}
                </div>
              )}
            </div>
          </div>
        </Link>
      </motion.div>
    );
  }
);

CaseStudyCard.displayName = "CaseStudyCard";

export { CaseStudyCard };
