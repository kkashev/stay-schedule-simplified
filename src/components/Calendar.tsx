import { useState } from "react";
import { Calendar as CalendarIcon } from "lucide-react";
import { DateRange } from "react-day-picker";
import { addDays, format } from "date-fns";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

// Mock data for unavailable dates
const unavailableDates = [
  new Date(2024, 3, 10),
  new Date(2024, 3, 11),
  new Date(2024, 3, 12),
  new Date(2024, 3, 20),
  new Date(2024, 3, 21),
];

export function DateRangePicker({
  className,
  onSelect,
  selected,
}: {
  className?: string;
  onSelect?: (range: DateRange | undefined) => void;
  selected?: DateRange;
}) {
  const handleSelect = (range: DateRange | undefined) => {
    if (onSelect) onSelect(range);
  };

  return (
    <div className={cn("grid gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "w-full justify-start text-left font-normal",
              !selected && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {selected?.from ? (
              selected.to ? (
                <>
                  {format(selected.from, "LLL dd, y")} -{" "}
                  {format(selected.to, "LLL dd, y")}
                </>
              ) : (
                format(selected.from, "LLL dd, y")
              )
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={selected?.from}
            selected={selected}
            onSelect={handleSelect}
            numberOfMonths={2}
            disabled={unavailableDates}
            className="rounded-md border"
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}