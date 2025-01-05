import { DateRange } from "react-day-picker";

interface BookingPriceSummaryProps {
  selectedRange: DateRange | undefined;
  pricePerNight: number;
}

export function BookingPriceSummary({ selectedRange, pricePerNight }: BookingPriceSummaryProps) {
  if (!selectedRange?.from || !selectedRange?.to) return null;

  const numberOfNights = Math.ceil(
    (selectedRange.to.getTime() - selectedRange.from.getTime()) / (1000 * 60 * 60 * 24)
  );
  const totalPrice = numberOfNights * pricePerNight;

  return (
    <div className="space-y-2">
      <div className="flex justify-between text-sm">
        <span>{pricePerNight} лв × {numberOfNights} нощувки</span>
        <span>{totalPrice} лв</span>
      </div>
      <div className="border-t pt-2">
        <div className="flex justify-between font-semibold">
          <span>Общо</span>
          <span>{totalPrice} лв</span>
        </div>
      </div>
    </div>
  );
}