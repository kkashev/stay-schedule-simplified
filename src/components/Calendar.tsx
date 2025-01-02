import { useState, useEffect } from "react";
import { Calendar as CalendarIcon } from "lucide-react";
import { DateRange } from "react-day-picker";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { supabase } from "@/integrations/supabase/client";
import { useIsMobile } from "@/hooks/use-mobile";

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
  const isMobile = useIsMobile();

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
        
        // Ensure we're working with UTC dates to avoid timezone issues
        const current = new Date(Date.UTC(
          start.getUTCFullYear(),
          start.getUTCMonth(),
          start.getUTCDate()
        ));
        
        const endDate = new Date(Date.UTC(
          end.getUTCFullYear(),
          end.getUTCMonth(),
          end.getUTCDate()
        ));

        while (current <= endDate) {
          bookedDates.push(new Date(current));
          current.setUTCDate(current.getUTCDate() + 1);
        }
      });

      setUnavailableDates(bookedDates);
    };

    fetchBookedDates();
  }, []);

  const handleSelect = (range: DateRange | undefined) => {
    if (range?.from && range?.to) {
      const current = new Date(Date.UTC(
        range.from.getUTCFullYear(),
        range.from.getUTCMonth(),
        range.from.getUTCDate()
      ));
      
      const endDate = new Date(Date.UTC(
        range.to.getUTCFullYear(),
        range.to.getUTCMonth(),
        range.to.getUTCDate()
      ));

      while (current <= endDate) {
        if (unavailableDates.some(date => 
          date.getUTCFullYear() === current.getUTCFullYear() &&
          date.getUTCMonth() === current.getUTCMonth() &&
          date.getUTCDate() === current.getUTCDate()
        )) {
          return;
        }
        current.setUTCDate(current.getUTCDate() + 1);
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
            numberOfMonths={isMobile ? 1 : 2}
            disabled={unavailableDates}
            className="rounded-md border"
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}