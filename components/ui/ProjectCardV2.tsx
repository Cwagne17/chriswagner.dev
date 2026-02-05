"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { motion } from "motion/react";
import { forwardRef, type HTMLAttributes } from "react";
import { cn } from "@/lib/utils";
import { Button } from "./Button";

export interface ProjectCardV2Props extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  title: string;
  impactMetric: string; // Main metric (largest text)
  impactStatement: string; // 1-line summary (~100 chars)
  thumbnailImage?: string; // Diagram thumbnail
  thumbnailAlt?: string;
  statPills: Array<{ label: string; value: string }>; // Max 2
  categoryTags: string[]; // Max 3, category tags only
  href: string;
  index?: number;
  categoryColor?: string; // Gradient color class
}

const ProjectCardV2 = forwardRef<HTMLDivElement, ProjectCardV2Props>(
  (
    {
      title,
      impactMetric,
      impactStatement,
      thumbnailImage,
      thumbnailAlt,
      statPills = [],
      categoryTags = [],
      href,
      index = 0,
      categoryColor = "from-blue-500 to-cyan-500",
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
        transition={{ duration: 0.4, delay: index * 0.1 }}
        className="h-full"
        {...props}
      >
        <Link href={href} className="block h-full group">
          <div
            className={cn(
              "relative h-full rounded-lg overflow-hidden transition-all duration-300",
              "bg-card border border-border hover:border-blue-500/50",
              "hover:shadow-xl hover:shadow-blue-500/10",
              "hover:-translate-y-1",
              className
            )}
          >
            {/* Top: Thumbnail Area (40-50% height) */}
            <div className="relative h-40 bg-secondary overflow-hidden">
              {thumbnailImage ? (
                <>
                  <img
                    src={thumbnailImage}
                    alt={thumbnailAlt || title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  {/* Subtle gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
                </>
              ) : (
                <div className="w-full h-full flex items-center justify-center text-muted-foreground/40 text-xs">
                  Architecture Diagram
                </div>
              )}

              {/* Category Label (top-left corner) */}
              {categoryTags.length > 0 && (
                <div className="absolute top-3 left-3">
                  <span className={cn(
                    "inline-block px-2.5 py-1 rounded text-xs font-semibold",
                    "bg-gradient-to-r text-white",
                    categoryColor
                  )}>
                    {categoryTags[0]}
                  </span>
                </div>
              )}
            </div>

            {/* Middle: Content Area */}
            <div className="p-5 flex flex-col flex-grow">
              {/* Big Impact Metric */}
              <h3 className={cn(
                "text-2xl lg:text-3xl font-bold text-foreground mb-3",
                "leading-tight transition-colors duration-300",
                "group-hover:text-blue-400"
              )}>
                {impactMetric}
              </h3>

              {/* 1-Line Impact Statement */}
              <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                {impactStatement}
              </p>

              {/* Stat Pills (max 2) */}
              {statPills.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {statPills.slice(0, 2).map((pill, i) => (
                    <div
                      key={i}
                      className="px-2.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-xs font-medium text-blue-400"
                    >
                      {pill.label}{pill.value && ` ${pill.value}`}
                    </div>
                  ))}
                </div>
              )}

              {/* Bottom: Category Tags + CTA */}
              <div className="mt-auto pt-4 border-t border-border">
                {categoryTags.length > 1 && (
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {categoryTags.slice(1, 4).map((tag, i) => (
                      <span
                        key={i}
                        className="px-2 py-0.5 rounded text-xs font-medium text-muted-foreground bg-secondary/50"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

                {/* CTA Button */}
                <Button
                  variant="link"
                  className="p-0 h-auto text-sm font-medium text-blue-400 hover:text-blue-300 transition-colors"
                >
                  View Case Study
                  <ArrowRight className="h-4 w-4 ml-1 transition-transform group-hover:translate-x-1" />
                </Button>
              </div>
            </div>
          </div>
        </Link>
      </motion.div>
    );
  }
);

ProjectCardV2.displayName = "ProjectCardV2";

export { ProjectCardV2 };
