import * as Popover from "@radix-ui/react-popover";
import { Command } from "cmdk";
import { getCountries, getCountryCallingCode, type Country } from "react-phone-number-input";
import labels from "react-phone-number-input/locale/en.json";
import { useMemo, useState } from "react";

type Props = {
  value?: Country;
  onChange: (c: Country) => void;
};

function countryName(code: Country) {
  return (labels as Record<string, string>)[code] ?? code;
}

export function CountrySelect({ value = "JO", onChange }: Props) {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");

  const countries = useMemo(() => getCountries(), []);
  const filtered = useMemo(() => {
    const query = q.trim().toLowerCase();
    if (!query) return countries;
    return countries.filter((c) => {
      const name = countryName(c).toLowerCase();
      const dial = `+${getCountryCallingCode(c)}`;
      return name.includes(query) || dial.includes(query) || c.toLowerCase().includes(query);
    });
  }, [countries, q]);

  const callingCode = `+${getCountryCallingCode(value)}`;

  return (
    <Popover.Root open={open} onOpenChange={setOpen}>
      {/* This button is what shows inside the phone input box (matches screenshot) */}
      <Popover.Trigger asChild>
        <button type="button" className="tp-country-btn" aria-label="Select country">
          {/* Flag (swap to your real flags) */}
          <img
            src={`/assets/flags/${value.toLowerCase()}.svg`}
            alt=""
            className="h-[18px] w-[28px] rounded-[2px] object-cover"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).style.display = "none";
            }}
          />

          <span className="text-[14px] font-medium text-ink">{callingCode}</span>

          {/* your caret svg */}
          <img src="/assets/icons/caret.svg" alt="" className="h-3 w-3 opacity-70 text-ink dark:text-white/70" />

          
        </button>
      </Popover.Trigger>

      <Popover.Portal>
        <Popover.Content
          side="bottom"
          align="start"
          sideOffset={8}
          className="z-50 w-[320px] rounded-xl border border-line bg-white shadow-card p-2"
        >
          <Command className="w-full">
            <div className="px-2 pb-2">
              <Command.Input
                value={q}
                onValueChange={setQ}
                placeholder="Search country"
                className="h-10 w-full rounded-lg border border-line bg-white px-3 text-sm outline-none focus:border-[#5B35D5]"
              />
            </div>

            <Command.List className="max-h-[280px] overflow-auto">
              {filtered.length === 0 && (
                <div className="px-3 py-8 text-center text-sm text-muted">No results</div>
              )}

              {filtered.map((c) => {
                const name = countryName(c);
                const dial = `+${getCountryCallingCode(c)}`;
                const active = c === value;

                return (
                  <Command.Item
                    key={c}
                    value={`${name} ${dial} ${c}`}
                    onSelect={() => {
                      onChange(c);
                      setOpen(false);
                      setQ("");
                    }}
                    className={[
                      "flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer",
                      "data-[selected=true]:bg-brand-50",
                      active ? "bg-brand-50" : "",
                    ].join(" ")}
                  >
                    <img
                      src={`/assets/flags/${c.toLowerCase()}.svg`}
                      alt=""
                      className="h-[16px] w-[24px] rounded-[2px] object-cover"
                      onError={(e) => {
                        (e.currentTarget as HTMLImageElement).style.display = "none";
                      }}
                    />
                    <div className="flex-1">
                      <div className="text-sm font-medium text-ink">{name}</div>
                      <div className="text-xs text-muted">{c}</div>
                    </div>
                    <div className="text-sm text-ink">{dial}</div>
                  </Command.Item>
                );
              })}
            </Command.List>
          </Command>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}
