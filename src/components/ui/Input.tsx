import { forwardRef } from "react";
import { cn } from "@/lib/cn";

type Props = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  error?: string;
  rightSlot?: React.ReactNode;
};

export const Input = forwardRef<HTMLInputElement, Props>(function Input(
  { className, label, error, rightSlot, ...rest },
  ref
) {
  return (
    <label className="block">
      {label ? <span className="mb-1 block text-xs font-medium text-ink">{label}</span> : null}
      <div className={cn("relative", className)}>
        <input
          ref={ref}
          className={cn(
                    "w-full rounded-lg border border-line bg-white px-3 py-2.5 text-sm text-ink placeholder:text-muted " +
                      "transition focus:border-[#5B35D5] focus:ring-2 focus:ring-[#5B35D5]/20",
            error ? "border-red-400 focus:border-red-400 focus:ring-red-100" : ""
          )}
          {...rest}
        />
        {rightSlot ? <div className="absolute inset-y-0 right-2 flex items-center">{rightSlot}</div> : null}
      </div>
      {error ? <p className="mt-1 text-xs text-red-600">{error}</p> : null}
    </label>
  );
});
