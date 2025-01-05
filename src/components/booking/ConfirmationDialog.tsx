import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface ConfirmationDialogProps {
  showConfirmation: boolean;
  setShowConfirmation: (show: boolean) => void;
}

export function ConfirmationDialog({
  showConfirmation,
  setShowConfirmation,
}: ConfirmationDialogProps) {
  return (
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
  );
}