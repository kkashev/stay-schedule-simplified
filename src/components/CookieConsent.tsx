import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export function CookieConsent() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookieConsent");
    if (!consent) {
      setOpen(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cookieConsent", "accepted");
    setOpen(false);
  };

  const handleDecline = () => {
    localStorage.setItem("cookieConsent", "declined");
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Бисквитки и поверителност</DialogTitle>
          <DialogDescription>
            Този уебсайт използва бисквитки, за да подобри вашето потребителско изживяване. Бисквитките ни помагат да:
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>Запомним вашите предпочитания</li>
              <li>Измерваме ефективността на сайта</li>
              <li>Подобряваме функционалността</li>
            </ul>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="sm:justify-start gap-2">
          <Button variant="default" onClick={handleAccept}>
            Приемам всички
          </Button>
          <Button variant="outline" onClick={handleDecline}>
            Само необходимите
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}