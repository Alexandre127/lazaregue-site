import * as React from "react";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

const cardVariants = cva(
  "laz-card overflow-hidden rounded-card bg-scheme-foreground text-ink",
  {
    variants: {
      variant: {
        default: "border-bd",
        transparent: "border-bd bg-transparent text-wh",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

function Card({ className = "", variant = "default", children, ...props }) {
  return (
    <div
      data-slot="card"
      className={cn(cardVariants({ variant, className }))}
      {...props}
    >
      {children}
    </div>
  );
}

function BackgroundCard({ className, ...props }) {
  return (
    <div
      data-slot="bg-card"
      className={cn("overflow-hidden rounded-card", className)}
      {...props}
    />
  );
}

function CardHeader({ className, ...props }) {
  return (
    <div
      data-slot="card-header"
      className={cn("flex flex-col gap-1.5 p-8 pb-0", className)}
      {...props}
    />
  );
}

function CardTitle({ className, ...props }) {
  return (
    <div
      data-slot="card-title"
      className={cn("text-h5 font-medium leading-none", className)}
      {...props}
    />
  );
}

function CardDescription({ className, ...props }) {
  return (
    <div
      data-slot="card-description"
      className={cn("text-sm text-mu", className)}
      {...props}
    />
  );
}

function CardContent({ className, ...props }) {
  return (
    <div
      data-slot="card-content"
      className={cn("p-8 pb-0", className)}
      {...props}
    />
  );
}

function CardFooter({ className, ...props }) {
  return (
    <div
      data-slot="card-footer"
      className={cn("flex items-center p-8", className)}
      {...props}
    />
  );
}

export {
  Card,
  BackgroundCard,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
};
