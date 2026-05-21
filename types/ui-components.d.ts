import type * as React from "react";

type UiBaseProps = {
  className?: string;
  children?: React.ReactNode;
};

declare module "@/components/ui/button" {
  export function Button(
    props: React.ComponentProps<"button"> &
      UiBaseProps & {
        variant?: string;
        size?: string;
        asChild?: boolean;
        iconLeft?: React.ReactNode;
        iconRight?: React.ReactNode;
        title?: string;
      },
  ): React.JSX.Element;
  export const buttonVariants: unknown;
}

declare module "@/components/ui/card" {
  export function Card(
    props: React.HTMLAttributes<HTMLDivElement> &
      UiBaseProps & {
        variant?: string;
      },
  ): React.JSX.Element;
  export function BackgroundCard(
    props: React.HTMLAttributes<HTMLDivElement> & { className?: string },
  ): React.JSX.Element;
  export function CardHeader(
    props: React.HTMLAttributes<HTMLDivElement> & { className?: string },
  ): React.JSX.Element;
  export function CardTitle(
    props: React.HTMLAttributes<HTMLDivElement> & { className?: string },
  ): React.JSX.Element;
  export function CardDescription(
    props: React.HTMLAttributes<HTMLDivElement> & { className?: string },
  ): React.JSX.Element;
  export function CardContent(
    props: React.HTMLAttributes<HTMLDivElement> & { className?: string },
  ): React.JSX.Element;
  export function CardFooter(
    props: React.HTMLAttributes<HTMLDivElement> & { className?: string },
  ): React.JSX.Element;
}

declare module "@/components/ui/badge" {
  export function Badge(
    props: React.HTMLAttributes<HTMLSpanElement> &
      UiBaseProps & {
        variant?: string;
        asChild?: boolean;
      },
  ): React.JSX.Element;
  export const badgeVariants: unknown;
}

declare module "@/components/ui/input" {
  export function Input(
    props: React.ComponentProps<"input"> & {
      className?: string;
      icon?: React.ReactNode;
      iconPosition?: "left" | "right";
      prefix?: React.ReactNode;
      prefixPosition?: "left" | "right";
      variant?: string;
    },
  ): React.JSX.Element;
}
