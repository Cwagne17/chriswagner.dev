import { cva, type VariantProps } from "class-variance-authority";
import type { LucideIcon } from "lucide-react";
import { forwardRef, type ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

/**
 * Custom Button Component
 * Replaces all 25+ scattered button definitions with a single, opinionated system
 * Features: border glow on hover, subtle lift, consistent focus states
 */

const buttonVariants = cva(
  // Base styles - shared across all variants
  [
    "inline-flex items-center justify-center gap-2",
    "font-medium transition-all duration-200",
    "disabled:opacity-50 disabled:pointer-events-none",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
    "focus-visible:ring-blue-500 focus-visible:ring-offset-background",
    "active:scale-[0.98]",
  ],
  {
    variants: {
      variant: {
        // Primary - accent gradient with glow border
        primary: [
          "bg-gradient-to-br from-blue-500 to-purple-500",
          "text-white shadow-lg",
          "border border-blue-500/20",
          "hover:from-blue-600 hover:to-purple-600",
          "hover:shadow-xl hover:-translate-y-0.5",
        ],
        // Secondary - subtle elevated surface
        secondary: [
          "bg-secondary text-foreground",
          "border border-border",
          "shadow-sm",
          "hover:bg-secondary/80 hover:border-border",
          "hover:-translate-y-0.5",
        ],
        // Ghost - transparent with nice hover
        ghost: [
          "text-foreground hover:bg-secondary/50",
          "hover:text-blue-500",
        ],
        // Outline - bordered
        outline: [
          "border border-border text-foreground",
          "hover:bg-secondary hover:border-blue-500",
          "hover:text-blue-500",
        ],
        // Link - text button
        link: [
          "text-blue-500 hover:text-blue-600",
          "hover:underline underline-offset-4",
        ],
        // Danger - for destructive actions
        danger: [
          "bg-red-500/10 text-red-600 dark:text-red-400",
          "border border-red-500/20",
          "hover:bg-red-500/20 hover:border-red-500/40",
          "hover:-translate-y-0.5",
        ],
      },
      size: {
        sm: "h-8 px-3 text-xs rounded-[var(--r-md)]",
        md: "h-10 px-4 text-sm rounded-[var(--r-lg)]",
        lg: "h-12 px-6 text-base rounded-[var(--r-lg)]",
        icon: "h-10 w-10 rounded-[var(--r-lg)]",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  leftIcon?: LucideIcon;
  rightIcon?: LucideIcon;
  isLoading?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      leftIcon: LeftIcon,
      rightIcon: RightIcon,
      isLoading,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        className={cn(buttonVariants({ variant, size, className }))}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading ? (
          <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
        ) : (
          <>
            {LeftIcon && <LeftIcon className="h-4 w-4" />}
            {children}
            {RightIcon && <RightIcon className="h-4 w-4" />}
          </>
        )}
      </button>
    );
  }
);

Button.displayName = "Button";

export { Button, buttonVariants };
