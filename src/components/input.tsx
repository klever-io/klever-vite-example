import { ComponentProps, forwardRef } from "react";
import { twMerge } from "tailwind-merge";

export const Input = forwardRef<HTMLInputElement, ComponentProps<"input">>(
  function Input({ className, ...rest }, ref) {
    return (
      <input
        className={twMerge(
          "px-2.5 h-8 border border-slate-300 rounded-md text-sm invalid:border-red-500",
          className
        )}
        ref={ref}
        {...rest}
      />
    );
  }
);
