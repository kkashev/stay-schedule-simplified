import { useState, useEffect } from "react";
import { Calendar as CalendarIcon } from "lucide-react";
import { DateRange } from "react-day-picker";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { supabase } from "@/integrations/supabase/client";

export function DateRangePicker({
  className,
  onSelect,
  selected,
}: {
  className?: string;
  onSelect?: (range: DateRange | undefined) => void;
  selected?: DateRange;
}) {
  const [unavailableDates, setUnavailableDates] = useState<Date[]>([]);

  useEffect(() => {
    const fetchBookedDates = async () => {
      const { data, error } = await supabase
        .from('bookings')
        .select('start_date, end_date')
        .eq('status', 'approved');

      if (error) {
        console.error('Error fetching booked dates:', error);
        return;
      }

      const bookedDates: Date[] = [];
      data.forEach(booking => {
        const start = new Date(booking.start_date);
        const end = new Date(booking.end_date);
        
        // Add all dates between start and end to the bookedDates array
        const current = new Date(start);
        while (current <= end) {
          bookedDates.push(new Date(current));
          current.setDate(current.getDate() + 1);
        }
      });

      setUnavailableDates(bookedDates);
    };

    fetchBookedDates();
  }, []);

  const handleSelect = (range: DateRange | undefined) => {
    // Don't allow selection if any date in the range is unavailable
    if (range?.from && range?.to) {
      const current = new Date(range.from);
      while (current <= range.to) {
        if (unavailableDates.some(date => 
          date.getFullYear() === current.getFullYear() &&
          date.getMonth() === current.getMonth() &&
          date.getDate() === current.getDate()
        )) {
          return; // Don't update if any date is unavailable
        }
        current.setDate(current.getDate() + 1);
      }
    }
    
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
            disabledDays={unavailableDates}
            className="rounded-md border"
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}