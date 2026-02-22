import { cn } from "@/lib/cn";

type Props = {
  checked?: boolean;
  onChange?: (v: boolean) => void;
  label: string;
  id: string;
};

export function Checkbox({ checked, onChange, label, id }: Props) {
  return (
    <div className="flex items-center gap-2">
      <input
        id={id}
        type="checkbox"
        className={cn(
          "h-4 w-4 rounded border-line text-brand-500 focus:ring-brand-100"
        )}
        checked={checked}
        onChange={(e) => onChange?.(e.target.checked)}
      />
      <label htmlFor={id} className="text-xs text-muted select-none">{label}</label>
    </div>
  );
}
