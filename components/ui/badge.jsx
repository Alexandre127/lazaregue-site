import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "font-mono-label inline-flex items-center rounded-badge px-2 py-1 text-[9px] font-normal uppercase tracking-[0.14em] focus:outline-none",
  {
    variants: {
      variant: {
        default: "border border-bd bg-off text-blue",
        outline: "border border-bd text-scheme-text",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

function Badge({ className = "", variant = "default", asChild = false, ...props }) {
  const Comp = asChild ? Slot : "span";
  return (
    <Comp
      data-slot="badge"
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  );
}

export { Badge, badgeVariants };
