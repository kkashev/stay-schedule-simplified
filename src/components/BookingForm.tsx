import { useState } from "react";
import { DateRange } from "react-day-picker";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DateRangePicker } from "./Calendar";
import { useToast } from "@/components/ui/use-toast";

export function BookingForm() {
  const [selectedRange, setSelectedRange] = useState<DateRange>();
  const [guests, setGuests] = useState("1");
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Booking request sent!",
      description: "We'll get back to you soon to confirm your stay.",
    });
  };

  const pricePerNight = 150; // Example price
  const numberOfNights = selectedRange?.from && selectedRange?.to
    ? Math.ceil((selectedRange.to.getTime() - selectedRange.from.getTime()) / (1000 * 60 * 60 * 24))
    : 0;
  const totalPrice = numberOfNights * pricePerNight;

  return (
    <form onSubmit={handleSubmit} className="space-y-6 p-6 bg-white rounded-lg shadow-lg max-w-md mx-auto">
      <div className="space-y-2">
        <Label htmlFor="dates">Select Dates</Label>
        <DateRangePicker onSelect={setSelectedRange} />
      </div>

      <div className="space-y-2">
        <Label htmlFor="guests">Number of Guests</Label>
        <Input
          id="guests"
          type="number"
          min="1"
          max="4"
          value={guests}
          onChange={(e) => setGuests(e.target.value)}
        />
      </div>

      {selectedRange?.from && selectedRange?.to && (
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>${pricePerNight} × {numberOfNights} nights</span>
            <span>${totalPrice}</span>
          </div>
          <div className="border-t pt-2">
            <div className="flex justify-between font-semibold">
              <span>Total</span>
              <span>${totalPrice}</span>
            </div>
          </div>
        </div>
      )}

      <Button type="submit" className="w-full bg-[#FF385C] hover:bg-[#E31C5F]">
        Request to Book
      </Button>
    </form>
  );
}