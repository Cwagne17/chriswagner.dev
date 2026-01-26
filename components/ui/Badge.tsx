import { cva, type VariantProps } from "class-variance-authority";
import { forwardRef, type HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

/**
 * Badge - Tag/label component for statuses, categories, and tech stacks
 */

const badgeVariants = cva(
  [
    "inline-flex items-center justify-center",
    "font-medium transition-colors",
    "border",
  ],
  {
    variants: {
      variant: {
        default: [
          "bg-secondary text-foreground",
          "border-border",
        ],
        accent: [
          "bg-blue-500/10 text-blue-500",
          "border-blue-500/20",
        ],
        muted: [
          "bg-secondary/50 text-muted-foreground",
          "border-transparent",
        ],
        outline: [
          "bg-transparent text-foreground",
          "border-border",
        ],
      },
      size: {
        sm: "px-2 py-0.5 text-xs rounded-[var(--r-sm)]",
        md: "px-2.5 py-1 text-sm rounded-[var(--r-md)]",
      },
      mono: {
        true: "font-mono",
        false: "",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "sm",
      mono: false,
    },
  }
);

export interface BadgeProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

const Badge = forwardRef<HTMLDivElement, BadgeProps>(
  ({ className, variant, size, mono, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(badgeVariants({ variant, size, mono, className }))}
        {...props}
      />
    );
  }
);

Badge.displayName = "Badge";

export { Badge, badgeVariants };
