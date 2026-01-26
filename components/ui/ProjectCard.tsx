"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { motion } from "motion/react";
import { forwardRef, type HTMLAttributes } from "react";
import { cn } from "@/lib/utils";
import { Badge } from "./Badge";
import { Button } from "./Button";
import { Card } from "./Card";

/**
 * ProjectCard - Composed component for project listings
 * Features: accent corner, tech badges, impact metric, thumbnail area
 */

export interface ProjectCardProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  title: string;
  description: string;
  technologies: string[];
  impact?: string; // Key metric/impact line
  href: string;
  thumbnail?: boolean; // Show thumbnail placeholder
  featured?: boolean; // Featured card with larger thumbnail
  index?: number; // For staggered animations
}

const ProjectCard = forwardRef<HTMLDivElement, ProjectCardProps>(
  ({ title, description, technologies, impact, href, thumbnail, featured = false, index = 0, className, ...props }, ref) => {
    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: index * 0.1 }}
        className="h-full"
        {...props}
      >
        <Link href={href} className="block h-full">
          <Card
            variant="interactive"
            className={cn(
              "relative h-full p-6 flex flex-col",
              // Accent corner decoration
              "before:absolute before:top-0 before:right-0",
              "before:w-12 before:h-12 before:bg-gradient-to-br",
              "before:from-[var(--accent)]/10 before:to-transparent",
              "before:rounded-bl-[var(--r-lg)] before:rounded-tr-[var(--r-lg)]",
              className
            )}
          >
            {/* Optional thumbnail area */}
            {thumbnail && (
              <div className={cn("mb-4 bg-card rounded-[var(--r-md)] border border-border overflow-hidden", featured ? "h-64" : "h-32")}>
                {/* Placeholder for future diagram preview */}
                <div className="w-full h-full flex items-center justify-center text-muted-foreground/60 text-xs">
                  Diagram Preview
                </div>
              </div>
            )}
            
            {/* Title */}
            <h3 className="text-xl font-semibold text-foreground mb-2 group-hover:text-blue-500 transition-colors">
              {title}
            </h3>
            
            {/* Description */}
            <p className="text-sm text-muted-foreground mb-4 flex-grow">
              {description}
            </p>
            
            {/* Tech badges */}
            {technologies.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {technologies.slice(0, 4).map((tech, i) => (
                  <Badge key={i} variant="muted" size="sm">
                    {tech}
                  </Badge>
                ))}
                {technologies.length > 4 && (
                  <Badge variant="muted" size="sm">
                    +{technologies.length - 4}
                  </Badge>
                )}
              </div>
            )}
            
            {/* Impact metric */}
            {impact && (
              <div className="mb-4 p-3 bg-blue-500/5 rounded-[var(--r-md)] border border-blue-500/10">
                <p className="text-sm font-medium text-blue-500">
                  {impact}
                </p>
              </div>
            )}
            
            {/* CTA */}
            <div className="flex items-center justify-between pt-4 border-t border-border">
              <Button variant="link" className="p-0 h-auto text-sm">
                View Project
                <ArrowRight className="h-4 w-4 ml-1 transition-transform group-hover:translate-x-1" />
              </Button>
            </div>
          </Card>
        </Link>
      </motion.div>
    );
  }
);

ProjectCard.displayName = "ProjectCard";

export { ProjectCard };
