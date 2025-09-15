"use client"
import * as React from "react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { X } from "lucide-react"

export interface SelectOption {
  text: string
  value: string | number
}

interface MultiSelectProps {
  data: SelectOption[]
  value: (string | number)[]
  onChange: (val: (string | number)[]) => void
  placeholder?: string
  className?: string
}

export function MultiSelect({
  data,
  value,
  onChange, 
  placeholder = "Select options...",
  className
}: MultiSelectProps) {
  const toggleValue = (val: string | number) => {
    if (value.includes(val)) {
      onChange(value.filter((v) => v !== val))
    } else {
      onChange([...value, val])
    }
  }

  const removeChip = (val: string | number) => {
    onChange(value.filter((v) => v !== val))
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="w-64 justify-between flex-wrap gap-2"
        >
          {value.length > 0 ? (
            <div className="flex flex-wrap gap-1">
              {value.map((val) => {
                const item = data.find((o: SelectOption) => o.value === val)
                return (
                  <span
                    key={val}
                    className="flex items-center rounded-full bg-muted px-2 py-1 text-xs"
                  >
                    {item?.text}
                    <X
                      className="ml-1 h-3 w-3 cursor-pointer"
                      onClick={(e) => {
                        e.stopPropagation()
                        removeChip(val)
                      }}
                    />
                  </span>
                )
              })}
            </div>
          ) : (
            <span className="text-muted-foreground">{placeholder}</span>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-64 max-h-60 overflow-y-auto">
        {data.map((opt: SelectOption) => (
          <DropdownMenuCheckboxItem
            key={opt.value}
            checked={value.includes(opt.value)}
            onCheckedChange={() => toggleValue(opt.value)}
          >
            {opt.text}
          </DropdownMenuCheckboxItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
