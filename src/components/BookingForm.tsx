import { useState } from "react";
import { DateRange } from "react-day-picker";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DateRangePicker } from "./Calendar";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

export function BookingForm() {
  const [selectedRange, setSelectedRange] = useState<DateRange>();
  const [guests, setGuests] = useState("1");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [showConfirmation, setShowConfirmation] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedRange?.from || !selectedRange?.to || !email) {
      toast({
        title: "Грешка",
        description: "Моля, попълнете всички задължителни полета",
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
          user_id: null,
          email: email,
          phone_number: phoneNumber
        }
      ]);

    if (error) {
      console.error('Error submitting booking:', error);
      toast({
        title: "Грешка",
        description: "Възникна грешка при изпращането на резервацията. Моля, опитайте отново.",
        variant: "destructive",
      });
      return;
    }

    setShowConfirmation(true);

    // Reset form
    setSelectedRange(undefined);
    setGuests("1");
    setEmail("");
    setPhoneNumber("");
  };

  const pricePerNight = 220;
  const numberOfNights = selectedRange?.from && selectedRange?.to
    ? Math.ceil((selectedRange.to.getTime() - selectedRange.from.getTime()) / (1000 * 60 * 60 * 24))
    : 0;
  const totalPrice = numberOfNights * pricePerNight;

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-6 p-6 bg-white rounded-lg shadow-lg max-w-md mx-auto">
        <div className="space-y-2">
          <Label htmlFor="dates">Изберете дати</Label>
          <DateRangePicker 
            onSelect={setSelectedRange}
            selected={selectedRange}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Имейл адрес</Label>
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
          <Label htmlFor="phone">Телефонен номер</Label>
          <Input
            id="phone"
            type="tel"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            placeholder="+359 888 123 456"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="guests">Брой гости</Label>
          <Input
            id="guests"
            type="number"
            min="1"
            max="6"
            value={guests}
            onChange={(e) => setGuests(e.target.value)}
          />
        </div>

        {selectedRange?.from && selectedRange?.to && (
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
        )}

        <Button type="submit" className="w-full bg-[#FF385C] hover:bg-[#E31C5F]">
          Заявка за резервация
        </Button>
      </form>

      <Dialog open={showConfirmation} onOpenChange={setShowConfirmation}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Заявката е изпратена успешно!</DialogTitle>
            <DialogDescription className="pt-4 space-y-3">
              <p>Благодарим ви за заявката. Получихме я успешно.</p>
              <p>Ще прегледаме вашата заявка и ще се свържем с вас по имейл или телефон за потвърждение на резервацията.</p>
              <p>Ако имате въпроси междувременно, не се колебайте да се свържете с нас.</p>
            </DialogDescription>
          </DialogHeader>
          <Button onClick={() => setShowConfirmation(false)} className="mt-4">
            Затвори
          </Button>
        </DialogContent>
      </Dialog>
    </>
  );
}