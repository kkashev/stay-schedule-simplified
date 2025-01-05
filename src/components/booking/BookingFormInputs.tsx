import { DateRange } from "react-day-picker";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DateRangePicker } from "../Calendar";

interface BookingFormInputsProps {
  selectedRange: DateRange | undefined;
  setSelectedRange: (range: DateRange | undefined) => void;
  guests: string;
  setGuests: (guests: string) => void;
  email: string;
  setEmail: (email: string) => void;
  phoneNumber: string;
  setPhoneNumber: (phoneNumber: string) => void;
}

export function BookingFormInputs({
  selectedRange,
  setSelectedRange,
  guests,
  setGuests,
  email,
  setEmail,
  phoneNumber,
  setPhoneNumber,
}: BookingFormInputsProps) {
  return (
    <>
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
    </>
  );
}