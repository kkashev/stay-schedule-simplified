import { useState } from "react";
import { DateRange } from "react-day-picker";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { bookingRequestTemplate } from "@/utils/emailTemplates";
import { BookingFormInputs } from "./booking/BookingFormInputs";
import { BookingPriceSummary } from "./booking/BookingPriceSummary";
import { ConfirmationDialog } from "./booking/ConfirmationDialog";

export function BookingForm() {
  const [selectedRange, setSelectedRange] = useState<DateRange>();
  const [guests, setGuests] = useState("1");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [showConfirmation, setShowConfirmation] = useState(false);
  const { toast } = useToast();
  const pricePerNight = 220;

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

    const startDate = new Date(Date.UTC(
      selectedRange.from.getFullYear(),
      selectedRange.from.getMonth(),
      selectedRange.from.getDate()
    ));

    const endDate = new Date(Date.UTC(
      selectedRange.to.getFullYear(),
      selectedRange.to.getMonth(),
      selectedRange.to.getDate()
    ));

    const numberOfNights = Math.ceil(
      (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)
    );
    const totalPrice = numberOfNights * pricePerNight;

    const { data, error } = await supabase
      .from('bookings')
      .insert([
        {
          start_date: startDate.toISOString().split('T')[0],
          end_date: endDate.toISOString().split('T')[0],
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

    try {
      const emailTemplate = bookingRequestTemplate({
        startDate: selectedRange.from,
        endDate: selectedRange.to,
        guests,
        totalPrice
      });

      const emailResponse = await supabase.functions.invoke('send-email', {
        body: {
          to: [email],
          ...emailTemplate
        }
      });

      if (emailResponse.error) {
        console.error('Error sending email:', emailResponse.error);
      }
    } catch (emailError) {
      console.error('Error sending confirmation email:', emailError);
    }

    setShowConfirmation(true);
    setSelectedRange(undefined);
    setGuests("1");
    setEmail("");
    setPhoneNumber("");
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-6 p-6 bg-white rounded-lg shadow-lg max-w-md mx-auto">
        <div className="mb-6">
          <img
            src="https://mcszeyokeqgoxsrmbzit.supabase.co/storage/v1/object/public/images/meme"
            alt="Booking Meme"
            className="w-full rounded-lg mb-4"
          />
        </div>

        <BookingFormInputs
          selectedRange={selectedRange}
          setSelectedRange={setSelectedRange}
          guests={guests}
          setGuests={setGuests}
          email={email}
          setEmail={setEmail}
          phoneNumber={phoneNumber}
          setPhoneNumber={setPhoneNumber}
        />

        <BookingPriceSummary
          selectedRange={selectedRange}
          pricePerNight={pricePerNight}
        />

        <Button type="submit" className="w-full bg-[#FF385C] hover:bg-[#E31C5F]">
          Заявка за резервация
        </Button>
      </form>

      <ConfirmationDialog
        showConfirmation={showConfirmation}
        setShowConfirmation={setShowConfirmation}
      />
    </>
  );
}