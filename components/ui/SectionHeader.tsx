import { forwardRef, type HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

/**
 * SectionHeader - Signature component for consistent section headings
 * Features: eyebrow label, title, subtitle, decorative motif
 */

export interface SectionHeaderProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  index?: string; // Optional "01", "02" style index
}

const SectionHeader = forwardRef<HTMLDivElement, SectionHeaderProps>(
  ({ eyebrow, title, subtitle, align = "left", index, className, ...props }, ref) => {
    const alignClass = align === "center" ? "text-center items-center" : "text-left items-start";
    
    return (
      <div
        ref={ref}
        className={cn("flex flex-col gap-3", alignClass, className)}
        {...props}
      >
        {/* Eyebrow + decorative element */}
        {(eyebrow || index) && (
          <div className="flex items-center gap-3">
            {index && (
              <span className="font-mono text-xs text-muted-foreground/60 select-none">
                {index}
              </span>
            )}
            {eyebrow && (
              <>
                {index && (
                  <div className="h-px w-8 bg-gradient-to-r from-blue-500/40 to-transparent" />
                )}
                <span className="text-xs font-medium uppercase tracking-wider text-blue-500">
                  {eyebrow}
                </span>
              </>
            )}
          </div>
        )}
        
        {/* Title */}
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">
          {title}
        </h2>
        
        {/* Subtitle */}
        {subtitle && (
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl">
            {subtitle}
          </p>
        )}
      </div>
    );
  }
);

SectionHeader.displayName = "SectionHeader";

export { SectionHeader };
