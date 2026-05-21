import * as React from "react";
import { cn } from "@/lib/utils";

function Input({
  className = "",
  type,
  icon = null,
  iconPosition = "left",
  prefix = null,
  prefixPosition = "left",
  variant = "primary",
  ...props
}) {
  return (
    <div className="relative flex w-full items-center">
      {icon && iconPosition === "left" && (
        <div className="absolute left-3">{icon}</div>
      )}
      {prefix && prefixPosition === "left" && (
        <div className="min-h-11 shrink-0 border border-bd bg-off px-3 py-2">
          {prefix}
        </div>
      )}
      <input
        type={type}
        data-slot="input"
        className={cn(
          "font-mono-label flex size-full min-h-10 align-middle text-[10px] uppercase tracking-[0.1em] transition-colors duration-200 file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-blue disabled:cursor-not-allowed disabled:opacity-50",
          variant === "primary" &&
            "rounded-form border border-bd bg-off text-ink placeholder:text-mu",
          variant === "secondary" &&
            "border-b border-bd bg-transparent text-wh placeholder:text-mu",
          icon && (iconPosition === "left" ? "pr-3 pl-11" : "pr-11 pl-3"),
          prefix && "grow",
          className,
        )}
        {...props}
      />
      {icon && iconPosition === "right" && (
        <div className="absolute right-3">{icon}</div>
      )}
      {prefix && prefixPosition === "right" && (
        <div className="min-h-11 shrink-0 border border-bd bg-off px-3 py-2">
          {prefix}
        </div>
      )}
    </div>
  );
}

export { Input };
