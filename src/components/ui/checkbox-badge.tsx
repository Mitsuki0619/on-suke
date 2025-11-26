"use client";

import * as React from "react";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { X } from "lucide-react";
import clsx from "clsx";

export default function CheckboxBadge({
  label,
  ...props
}: { label: string } & React.ComponentProps<"input">) {
  const [isChecked, setIsChecked] = React.useState(props.defaultChecked);

  const toggleChecked = () => setIsChecked((prev) => !prev);

  return (
    <Label className="cursor-pointer">
      <input
        type="checkbox"
        {...props}
        onChange={toggleChecked}
        className={clsx("sr-only", props.className)}
        tabIndex={-1}
      />
      <Badge
        variant={isChecked ? "default" : "outline"}
        className="text-sm transition-all duration-200 ease-in-out hover:shadow-md"
        role="checkbox"
        aria-checked={isChecked}
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === " " || e.key === "Enter") {
            e.preventDefault();
            toggleChecked();
          }
        }}
      >
        {label}
        {isChecked && <X className="ml-1 h-3 w-3" />}
      </Badge>
    </Label>
  );
}
