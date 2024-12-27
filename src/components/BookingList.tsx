import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { BookingActions } from "./BookingActions";

interface Booking {
  id: string;
  email: string;
  phone_number: string;
  start_date: string;
  end_date: string;
  guest_count: number;
  total_price: number;
  created_at: string;
  status: string;
}

interface BookingListProps {
  bookings: Booking[];
  onStatusUpdate: () => void;
}

export function BookingList({ bookings, onStatusUpdate }: BookingListProps) {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Email</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead>Dates</TableHead>
            <TableHead>Guests</TableHead>
            <TableHead>Total Price</TableHead>
            <TableHead>Submitted</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {bookings?.map((booking) => (
            <TableRow key={booking.id}>
              <TableCell>{booking.email}</TableCell>
              <TableCell>{booking.phone_number || '-'}</TableCell>
              <TableCell>
                {new Date(booking.start_date).toLocaleDateString()} - {new Date(booking.end_date).toLocaleDateString()}
              </TableCell>
              <TableCell>{booking.guest_count}</TableCell>
              <TableCell>{booking.total_price} BGN</TableCell>
              <TableCell>
                {new Date(booking.created_at).toLocaleDateString('bg-BG', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </TableCell>
              <TableCell>
                <span className={`capitalize ${
                  booking.status === 'approved' ? 'text-green-600' :
                  booking.status === 'rejected' ? 'text-red-600' :
                  'text-yellow-600'
                }`}>
                  {booking.status}
                </span>
              </TableCell>
              <TableCell>
                <BookingActions 
                  booking={booking} 
                  onStatusUpdate={onStatusUpdate}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}