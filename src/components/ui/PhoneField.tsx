import React, { forwardRef, useMemo } from "react";
import PhoneInput, { type Country, type Value } from "react-phone-number-input";
import { CountrySelect } from "./CountrySelect";

type PhoneFieldProps = {
  label?: string;
  value?: Value;
  onChange: (value?: Value) => void;
  defaultCountry?: Country;
  placeholder?: string;
};

const Input = forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  function Input(props, ref) {
    return (
      <input
        ref={ref}
        {...props}
        className={[
          "h-full w-full bg-transparent px-3 text-[14px] outline-none",
          "placeholder:text-[#B8BDC7] dark:placeholder:text-[#9CA3AF] text-ink",
          props.className ?? "",
        ].join(" ")}
      />
    );
  }
);



export function PhoneField({
  label = "Mobile number",
  value,
  onChange,
  defaultCountry = "JO",
  placeholder = "7X-XXXXXXX",
}: PhoneFieldProps) {
  const inputId = useMemo(() => `phone-${Math.random().toString(16).slice(2)}`, []);

  return (
    <div>
      {label && <div className="text-[13px] font-medium text-ink">{label}</div>}

      <div className="tp-phone-wrap mt-2">
        <PhoneInput
          id={inputId}
          defaultCountry={defaultCountry}
          value={value}
          onChange={onChange}
          countrySelectComponent={CountrySelect as any}
          inputComponent={Input as any}
          placeholder={placeholder}
          inputProps={{ placeholder }}
        />
      </div>
    </div>
  );
}