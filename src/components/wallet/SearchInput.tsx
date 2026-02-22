import { Search } from "lucide-react";

export function SearchInput({
  value,
  onChange,
  placeholder = "Search transactions..."
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  return (
    <label className="relative block">
      <span className="sr-only">Search</span>
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted" />
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-md border border-line bg-white py-2 pl-9 pr-3 text-sm placeholder:text-muted
                   focus:border-[#5B35D5] focus:ring-2 focus:ring-[#5B35D5]/20 transition"
      />
    </label>
  );
}
