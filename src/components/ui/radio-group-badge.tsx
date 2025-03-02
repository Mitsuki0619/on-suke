"use client";

import { useId, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { RadioGroup } from "@/components/ui/radio-group";

export default function RadioGroupBadge({
  options,
  defaultValue,
  name,
}: {
  options: { label: string; value: string; color: string }[];
  defaultValue?: string;
  name: string;
}) {
  const [selectedOption, setSelectedOption] = useState<string>(
    defaultValue ?? "",
  );
  const id = useId();

  const handleBadgeClick = (option: string) => {
    setSelectedOption(option);
  };

  return (
    <RadioGroup
      value={selectedOption}
      onValueChange={setSelectedOption}
      className="flex flex-wrap gap-2"
    >
      {options.map((option) => (
        <div key={option.value} className="flex items-center">
          <input
            type="radio"
            name={name}
            value={option.value}
            defaultChecked={defaultValue === option.value}
            id={`${id}-${option.value}`}
            aria-hidden
            className="hidden"
          />
          <Label
            htmlFor={`${id}-${option.value}`}
            className="cursor-pointer"
            onClick={() => handleBadgeClick(option.value)}
          >
            <Badge
              variant={selectedOption === option.value ? "default" : "outline"}
              className="text-sm whitespace-nowrap"
              color={selectedOption === option.value ? option.color : "#f8f8f8"}
            >
              {option.label}
            </Badge>
          </Label>
        </div>
      ))}
    </RadioGroup>
  );
}
