"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { motion } from "motion/react";
import { forwardRef, type HTMLAttributes } from "react";
import { cn } from "@/lib/utils";
import { Button } from "./Button";

export interface FeaturedProjectCardV2Props extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  title: string;
  impactMetric: string; // Main metric
  impactStatement: string; // 1-line summary
  thumbnailImage?: string;
  thumbnailAlt?: string;
  categoryTags: string[];
  href: string;
  index?: number;
  categoryColor?: string;
}

const FeaturedProjectCardV2 = forwardRef<HTMLDivElement, FeaturedProjectCardV2Props>(
  (
    {
      title,
      impactMetric,
      impactStatement,
      thumbnailImage,
      thumbnailAlt,
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
        transition={{ duration: 0.4, delay: index * 0.15 }}
        className="h-full"
        {...props}
      >
        <Link href={href} className="block h-full group">
          <div
            className={cn(
              "relative h-full rounded-lg overflow-hidden transition-all duration-300",
              "bg-card border border-border hover:border-blue-500/50",
              "hover:shadow-2xl hover:shadow-blue-500/15",
              "hover:-translate-y-2",
              "grid grid-cols-2 gap-6",
              className
            )}
          >
            {/* Left: Large Thumbnail (50%) */}
            <div className="relative overflow-hidden rounded-l-lg">
              {thumbnailImage ? (
                <>
                  <img
                    src={thumbnailImage}
                    alt={thumbnailAlt || title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-r from-card via-transparent to-transparent" />
                </>
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-secondary text-muted-foreground/40">
                  Architecture Diagram
                </div>
              )}

              {/* Category Label */}
              {categoryTags.length > 0 && (
                <div className="absolute bottom-4 left-4">
                  <span className={cn(
                    "inline-block px-3 py-1.5 rounded-full text-xs font-semibold",
                    "bg-gradient-to-r text-white shadow-lg",
                    categoryColor
                  )}>
                    {categoryTags[0]}
                  </span>
                </div>
              )}
            </div>

            {/* Right: Content (50%) */}
            <div className="p-8 flex flex-col justify-between">
              {/* Title */}
              <div>
                <h3 className="text-lg font-semibold text-muted-foreground text-opacity-80 mb-2 text-xs uppercase tracking-wider">
                  {title}
                </h3>

                {/* Big Impact Metric */}
                <h2 className={cn(
                  "text-4xl lg:text-5xl font-bold text-foreground mb-4",
                  "leading-tight transition-colors duration-300",
                  "group-hover:text-blue-400"
                )}>
                  {impactMetric}
                </h2>

                {/* Impact Statement */}
                <p className="text-base text-muted-foreground mb-6 max-w-sm line-clamp-2">
                  {impactStatement}
                </p>
              </div>

              {/* Bottom: Tags + CTA */}
              <div>
                {categoryTags.length > 1 && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {categoryTags.slice(1, 3).map((tag, i) => (
                      <span
                        key={i}
                        className="px-2.5 py-1 rounded text-xs font-medium text-muted-foreground bg-secondary/70"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

                {/* CTA Button */}
                <Button
                  className="bg-blue-600 hover:bg-blue-700 text-white gap-2"
                >
                  View Case Study
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </div>
            </div>
          </div>
        </Link>
      </motion.div>
    );
  }
);

FeaturedProjectCardV2.displayName = "FeaturedProjectCardV2";

export { FeaturedProjectCardV2 };
