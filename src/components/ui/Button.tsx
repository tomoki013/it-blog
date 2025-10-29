import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-all duration-300 ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "border border-cyan-500 bg-cyan-500/20 text-cyan-400 backdrop-blur-sm hover:bg-cyan-500/30 hover:shadow-[0_0_15px_rgba(0,255,255,0.7)]",
        destructive:
          "border border-red-500 bg-red-500/20 text-red-400 backdrop-blur-sm hover:bg-red-500/30 hover:shadow-[0_0_15px_rgba(255,0,0,0.7)]",
        outline:
          "border border-input bg-transparent text-cyan-400 hover:bg-cyan-500/10 hover:text-cyan-300 hover:shadow-[0_0_15px_rgba(0,255,255,0.7)]",
        secondary:
          "border border-magenta-500 bg-magenta-500/20 text-magenta-400 backdrop-blur-sm hover:bg-magenta-500/30 hover:shadow-[0_0_15px_rgba(255,0,255,0.7)]",
        ghost:
          "text-gray-400 hover:bg-transparent hover:text-cyan-400 hover:drop-shadow-[0_0_5px_rgba(0,255,255,0.7)]",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
