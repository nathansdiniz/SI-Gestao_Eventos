import React, { forwardRef, useState, useEffect } from "react";
import { PatternFormat, PatternFormatProps } from "react-number-format";
import { Input } from "@/app/_components/ui/input";

type CpfCnpjInputProps = PatternFormatProps & {
  value?: string | null;
  onChange?: (value: string) => void;
  format?: string;
  tipoCadastro?: string | null;
};

export const CpfCnpjInput = forwardRef<HTMLInputElement, CpfCnpjInputProps>(
  ({ value, onChange, format, tipoCadastro, ...props }, ref) => {
    const [isCpf, setIsCpf] = useState<boolean>(true);

    useEffect(() => {
      if (value) {
        const cleanValue = value.replace(/\D/g, "");
        if (cleanValue.length <= 11) {
          setIsCpf(true);
        } else {
          setIsCpf(false);
        }
      }
    }, [value, tipoCadastro]);

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
        format={
          format ? format : isCpf ? "###.###.###-##" : "##.###.###/####-##"
        }
        allowEmptyFormatting
        mask="_"
        customInput={Input}
        getInputRef={ref}
        value={value}
        onValueChange={handleInputChange}
        isAllowed={(values) => values.value.length <= (isCpf ? 11 : 14)}
      />
    );
  },
);

CpfCnpjInput.displayName = "CpfCnpjInput";
