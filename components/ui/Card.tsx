import { cva, type VariantProps } from "class-variance-authority";
import { forwardRef, type HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

/**
 * Card - Custom surface component with layered backgrounds
 * Features: distinct elevation levels, interactive hover states, custom borders
 */

const cardVariants = cva(
  // Base styles
  [
    "rounded-[var(--r-lg)] transition-all duration-200",
  ],
  {
    variants: {
      variant: {
        // Default - elevated surface with border
        default: [
          "bg-[var(--bg-elev-1)] border border-[var(--border)]",
          "shadow-[var(--shadow)]",
        ],
        // Interactive - hover lift + border glow
        interactive: [
          "bg-[var(--bg-elev-1)] border border-[var(--border)]",
          "shadow-[var(--shadow)]",
          "hover:shadow-[var(--shadow-lg)] hover:-translate-y-1",
          "hover:border-[var(--accent)]/40",
          "cursor-pointer",
        ],
        // Subtle - minimal styling
        subtle: [
          "bg-[var(--bg-elev-1)]",
        ],
        // Elevated - highest level surface
        elevated: [
          "bg-[var(--bg-elev-2)] border border-[var(--border)]",
          "shadow-[var(--shadow-lg)]",
        ],
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface CardProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {}

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(cardVariants({ variant, className }))}
        {...props}
      />
    );
  }
);

Card.displayName = "Card";

// Subcomponents for semantic structure
const CardHeader = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("flex flex-col space-y-1.5 p-6", className)}
      {...props}
    />
  )
);
CardHeader.displayName = "CardHeader";

const CardTitle = forwardRef<HTMLHeadingElement, HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h3
      ref={ref}
      className={cn("text-2xl font-semibold leading-none tracking-tight", className)}
      {...props}
    />
  )
);
CardTitle.displayName = "CardTitle";

const CardDescription = forwardRef<HTMLParagraphElement, HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <p
      ref={ref}
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    />
  )
);
CardDescription.displayName = "CardDescription";

const CardContent = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
  )
);
CardContent.displayName = "CardContent";

const CardFooter = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("flex items-center p-6 pt-0", className)}
      {...props}
    />
  )
);
CardFooter.displayName = "CardFooter";

export { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter, cardVariants };
