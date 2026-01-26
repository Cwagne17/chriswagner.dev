import type { LucideIcon } from "lucide-react";
import { forwardRef } from "react";
import { Button, type ButtonProps } from "./Button";

/**
 * IconButton - Wrapper around Button for icon-only buttons
 */

export interface IconButtonProps extends Omit<ButtonProps, "leftIcon" | "rightIcon" | "children"> {
  icon: LucideIcon;
  "aria-label": string; // Required for accessibility
}

const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ icon: Icon, ...props }, ref) => {
    return (
      <Button ref={ref} size="icon" {...props}>
        <Icon className="h-4 w-4" />
      </Button>
    );
  }
);

IconButton.displayName = "IconButton";

export { IconButton };
