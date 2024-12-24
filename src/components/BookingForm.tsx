import { useState } from "react";
import { DateRange } from "react-day-picker";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DateRangePicker } from "./Calendar";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

export function BookingForm() {
  const [selectedRange, setSelectedRange] = useState<DateRange>();
  const [guests, setGuests] = useState("1");
  const [email, setEmail] = useState("");
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedRange?.from || !selectedRange?.to || !email) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    const pricePerNight = 220;
    const numberOfNights = Math.ceil(
      (selectedRange.to.getTime() - selectedRange.from.getTime()) / (1000 * 60 * 60 * 24)
    );
    const totalPrice = numberOfNights * pricePerNight;

    const { data, error } = await supabase
      .from('bookings')
      .insert([
        {
          start_date: selectedRange.from.toISOString().split('T')[0],
          end_date: selectedRange.to.toISOString().split('T')[0],
          guest_count: parseInt(guests),
          total_price: totalPrice,
          status: 'pending',
          user_id: null, // Since we're not using authentication
          email: email // We'll need to add this column to the bookings table
        }
      ]);

    if (error) {
      console.error('Error submitting booking:', error);
      toast({
        title: "Error",
        description: "There was an error submitting your booking. Please try again.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Booking request sent!",
      description: "We'll get back to you soon to confirm your stay.",
    });

    // Reset form
    setSelectedRange(undefined);
    setGuests("1");
    setEmail("");
  };

  const pricePerNight = 220;
  const numberOfNights = selectedRange?.from && selectedRange?.to
    ? Math.ceil((selectedRange.to.getTime() - selectedRange.from.getTime()) / (1000 * 60 * 60 * 24))
    : 0;
  const totalPrice = numberOfNights * pricePerNight;

  return (
    <form onSubmit={handleSubmit} className="space-y-6 p-6 bg-white rounded-lg shadow-lg max-w-md mx-auto">
      <div className="space-y-2">
        <Label htmlFor="dates">Select Dates</Label>
        <DateRangePicker 
          onSelect={setSelectedRange}
          selected={selectedRange}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">Email Address</Label>
        <Input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          placeholder="your@email.com"
        />
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
            <span>{pricePerNight} BGN × {numberOfNights} nights</span>
            <span>{totalPrice} BGN</span>
          </div>
          <div className="border-t pt-2">
            <div className="flex justify-between font-semibold">
              <span>Total</span>
              <span>{totalPrice} BGN</span>
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