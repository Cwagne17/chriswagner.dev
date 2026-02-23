"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { forwardRef, type HTMLAttributes } from "react";
import { THEME_CLASSES } from "@/lib/theme";
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
              "relative h-full min-h-[360px] rounded-lg overflow-hidden transition-all duration-300",
              "bg-card border border-border",
              "hover:border-[color:var(--accent-border-soft)] hover:shadow-lg",
              "hover:-translate-y-1",
              "flex flex-col",
              className
            )}
          >
            {/* Top area: Image */}
            <div className="relative h-44 bg-secondary overflow-hidden">
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

            {/* Bottom area: Content */}
            <div className="relative flex-1 p-4 flex flex-col bg-card">
              {/* Title */}
              <h3 className="text-base font-semibold text-foreground line-clamp-2 mb-4">
                {title}
              </h3>

              {/* Metrics */}
              {metrics.length > 0 && (
                <div className="mb-4">
                  <div className="flex items-center gap-2 min-w-0">
                    <span className={`text-xl font-bold ${THEME_CLASSES.text.brandStrong} leading-none shrink-0`}>
                      {metrics[0]?.value}
                    </span>
                    <span className="text-sm text-muted-foreground truncate">
                      {metrics[0]?.label}
                    </span>
                  </div>
                </div>
              )}

              {/* Technology Pills */}
              {technologies.length > 0 && (
                <div className="mt-auto flex flex-wrap gap-1.5">
                  {technologies.slice(0, 3).map((tech, i) => (
                    <span
                      key={i}
                      className="px-2 py-1 rounded-full text-xs font-medium bg-secondary/60 text-muted-foreground border border-border/50"
                    >
                      {tech}
                    </span>
                  ))}
                  {technologies.length > 3 && (
                    <span className="px-2 py-1 rounded-full text-xs font-medium bg-secondary/60 text-muted-foreground border border-border/50">
                      +{technologies.length - 3}
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
