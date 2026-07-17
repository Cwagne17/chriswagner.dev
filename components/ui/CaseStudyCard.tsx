"use client";

import Link from "next/link";
import { motion, type HTMLMotionProps } from "motion/react";
import { forwardRef } from "react";
import { cn } from "@/lib/utils";

export interface CaseStudyCardProps extends Omit<HTMLMotionProps<"div">, "title"> {
  title: string;
  description: string;
  technologies: string[];
  thumbnailImage?: string;
  thumbnailAlt?: string;
  href: string;
  index?: number;
}

const CaseStudyCard = forwardRef<HTMLDivElement, CaseStudyCardProps>(
  (
    {
      title,
      description,
      technologies,
      thumbnailImage,
      thumbnailAlt,
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

            </div>

            {/* Bottom area: Content */}
            <div className="relative flex-1 p-4 flex flex-col bg-card">
              {/* Title */}
              <h3 className="text-base font-semibold text-foreground line-clamp-2 mb-2">
                {title}
              </h3>

              {/* Description */}
              <p className="text-sm leading-relaxed text-muted-foreground line-clamp-3 mb-4">
                {description}
              </p>

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
