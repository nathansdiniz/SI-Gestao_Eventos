import React, { forwardRef } from "react";
import { PatternFormat, PatternFormatProps } from "react-number-format";
import { Input } from "@/app/_components/ui/input";

type CnpjInputProps = PatternFormatProps & {
  value?: string | null;
  onChange?: (value: string) => void;
};

export const CnpjInput = forwardRef<HTMLInputElement, CnpjInputProps>(
  ({ value, onChange, ...props }, ref) => {
    const handleInputChange = (input: {
      formattedValue: string;
      value: string;
    }) => {
      const cleanValue = input.value.replace(/\D/g, "");
      if (onChange) {
        onChange(cleanValue);
      }
    };

    return (
      <PatternFormat
        {...props}
        format="##.###.###/####-##"
        allowEmptyFormatting
        mask="_"
        customInput={Input}
        getInputRef={ref}
        value={value}
        onValueChange={handleInputChange}
        isAllowed={(values) => values.value.length <= 14}
        placeholder="__.___.___/____-__"
      />
    );
  },
);

CnpjInput.displayName = "CnpjInput";
