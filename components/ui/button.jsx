import * as React from "react";
import { Slot, Slottable } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-button font-mono-label text-[10px] font-normal uppercase tracking-[0.1em] transition-colors duration-200 ease-in-out focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-blue disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "border border-blue bg-blue text-white hover:bg-blue3 hover:border-blue3",
        alternate:
          "border border-bd bg-transparent text-wh hover:border-blue hover:text-blue",
        secondary:
          "border border-bd bg-transparent text-wh hover:border-blue hover:text-blue",
        "secondary-alt":
          "border border-bd bg-transparent text-wh hover:border-blue hover:text-blue",
        link: "gap-2 normal-case tracking-normal text-blue hover:text-blue2",
        "link-alt":
          "gap-2 normal-case tracking-normal text-blue hover:text-blue2",
        ghost:
          "border border-transparent bg-transparent text-mu hover:border-blue hover:text-blue",
        none: "",
      },
      size: {
        default: "px-6 py-[13px]",
        sm: "px-5 py-[11px]",
        link: "p-0",
        icon: "size-10",
        none: "",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

function Button({
  className = "",
  variant,
  size = "default",
  asChild = false,
  iconLeft,
  iconRight,
  children,
  ...props
}) {
  const Comp = asChild ? Slot : "button";
  return (
    <Comp
      data-slot="button"
      data-variant={variant || "default"}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    >
      {iconLeft && iconLeft}
      <Slottable>{children}</Slottable>
      {iconRight && iconRight}
    </Comp>
  );
}

export { Button, buttonVariants };
