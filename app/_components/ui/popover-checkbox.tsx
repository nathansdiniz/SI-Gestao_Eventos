"use client";
import * as React from "react";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import { Button } from "./button";
import { Checkbox } from "./checkbox";
import { Label } from "./label";
import { Check } from "lucide-react";
import { PopoverClose } from "@radix-ui/react-popover";

interface PopoverCheckboxProps {
  options: {
    value: string;
    label: string;
  }[];
  selectedOptions: string[];
  setSelectedOptions: React.Dispatch<React.SetStateAction<string[]>>;
}

export function PopoverCheckbox({
  options,
  selectedOptions,
  setSelectedOptions,
}: PopoverCheckboxProps) {
  const handleCheckboxChange = (optionValue: string, isChecked: boolean) => {
    setSelectedOptions((prevSelectedOptions) => {
      if (isChecked) {
        return [...prevSelectedOptions, optionValue];
      } else {
        return prevSelectedOptions.filter((value) => value !== optionValue);
      }
    });
  };

  const isAllChecked = selectedOptions.length === options.length;
  const isIndeterminate =
    selectedOptions.length > 0 && selectedOptions.length < options.length;

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2">
          <Check className="h-4 w-4" />
          Colunas
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[400px] space-y-4">
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between space-x-2">
            <div className="flex items-center gap-2">
              <Checkbox
                id="all"
                checked={isAllChecked || isIndeterminate}
                onCheckedChange={(checked) =>
                  setSelectedOptions(
                    checked ? options.map((option) => option.value) : [],
                  )
                }
              />
              <Label htmlFor="all">Selecionar Todos</Label>
            </div>
          </div>
          {options.map((option) => (
            <div key={option.value} className="flex items-center gap-2">
              <Checkbox
                id={option.value}
                checked={selectedOptions.includes(option.value)}
                onCheckedChange={(checked) =>
                  handleCheckboxChange(option.value, checked === true)
                }
              />

              <Label htmlFor={option.value}>{option.label}</Label>
            </div>
          ))}
          <div className="flex justify-end space-x-2">
            <PopoverClose asChild>
              <Button variant={"outline"}>Fechar</Button>
            </PopoverClose>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
