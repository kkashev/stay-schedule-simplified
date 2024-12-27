import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { bookingApprovedTemplate, bookingRejectedTemplate } from "@/utils/emailTemplates";

interface BookingActionsProps {
  booking: {
    id: string;
    status: string;
    email: string;
    start_date: string;
    end_date: string;
    guest_count: number;
    total_price: number;
  };
  onStatusUpdate: () => void;
}

export function BookingActions({ booking, onStatusUpdate }: BookingActionsProps) {
  const { toast } = useToast();

  const handleStatusUpdate = async (newStatus: string) => {
    const { error } = await supabase
      .from('bookings')
      .update({ status: newStatus })
      .eq('id', booking.id);

    if (error) {
      toast({
        title: "Error",
        description: "Failed to update booking status",
        variant: "destructive",
      });
      return;
    }

    // Send email notification based on status
    try {
      const emailTemplate = newStatus === 'approved' 
        ? bookingApprovedTemplate({
            startDate: new Date(booking.start_date),
            endDate: new Date(booking.end_date),
            guests: booking.guest_count.toString(),
            totalPrice: Number(booking.total_price)
          })
        : bookingRejectedTemplate({
            startDate: new Date(booking.start_date),
            endDate: new Date(booking.end_date),
            guests: booking.guest_count.toString()
          });

      const emailResponse = await supabase.functions.invoke('send-email', {
        body: {
          to: [booking.email],
          ...emailTemplate
        }
      });

      if (emailResponse.error) {
        console.error('Error sending email:', emailResponse.error);
        toast({
          title: "Warning",
          description: "Booking updated but email notification failed",
          variant: "destructive",
        });
        return;
      }
    } catch (emailError) {
      console.error('Error sending confirmation email:', emailError);
    }

    toast({
      title: "Success",
      description: `Booking ${newStatus}`,
    });
    onStatusUpdate();
  };

  if (booking.status !== 'pending') {
    return null;
  }

  return (
    <div className="space-x-2">
      <Button
        onClick={() => handleStatusUpdate('approved')}
        className="bg-green-600 hover:bg-green-700"
      >
        Approve
      </Button>
      <Button
        onClick={() => handleStatusUpdate('rejected')}
        variant="destructive"
      >
        Reject
      </Button>
    </div>
  );
}