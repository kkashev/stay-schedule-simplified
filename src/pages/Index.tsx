import { BookingForm } from "@/components/BookingForm";
import { supabase } from "@/integrations/supabase/client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ImageUpload } from "@/components/ImageUpload";
import { CookieConsent } from "@/components/CookieConsent";

const content = {
  title: "Pino Apartment Pamporovo",
  subtitle: "Зимната приказка, достъпна за цялото семейство",
  aboutTitle: "За апартамента",
  aboutDescription: "Нашият уютен апартамент в комплекс Манастира 3 е идеалното място за вашата зимна почивка. Разположен директно на туристическата писта – Ski in/Ski out, и само на 100 метра от лифт Студенец - Снежанка, той е перфектен за ски приключения и релакс сред природата.\n\nАпартаментът разполага с 3 стаи и 2 бани. Максимален капацитет -  6 души.",
  amenitiesTitle: "Удобства",
  amenities: [
    "📶 Бърз Wi-Fi",
    "🍳 Оборудвана кухня",
    "🧺 Пералня и сушилня",
    "❄️ Хладилник",
    "☕ Кафе машина",
    "🎮 PlayStation 4",
    "📺 Netflix",
    "🅿️ Паркинг"
  ]
};

const Index = () => {
  const [session, setSession] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session?.user) {
        checkIfAdmin(session.user.id);
      }
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (session?.user) {
        checkIfAdmin(session.user.id);
      } else {
        setIsAdmin(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const checkIfAdmin = async (userId: string) => {
    const { data } = await supabase
      .from('profiles')
      .select('is_admin')
      .eq('id', userId)
      .single();
    
    setIsAdmin(data?.is_admin || false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="relative h-[30vh] bg-gray-900">
        <div className="absolute top-4 right-4 z-10 flex gap-2">
          {session && isAdmin && (
            <Button 
              variant="outline" 
              onClick={() => window.location.href = '/admin'}
              className="bg-white hover:bg-gray-100"
            >
              Admin Panel
            </Button>
          )}
        </div>
        <img
          src="https://mcszeyokeqgoxsrmbzit.supabase.co/storage/v1/object/public/images/0.037049310533655566.jpg"
          alt={content.title}
          className="w-full h-full object-cover opacity-80"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-2">
            {content.title}
          </h1>
          <p className="text-xl opacity-90">
            {content.subtitle}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        {isAdmin && (
          <div className="mb-8 p-4 bg-white rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Административен панел</h2>
            <div className="flex gap-4 items-center">
              <ImageUpload />
              <Button
                variant="outline"
                onClick={() => window.location.href = '/admin'}
              >
                Управление на резервации
              </Button>
            </div>
          </div>
        )}
        
        <div className="grid md:grid-cols-2 gap-12">
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-semibold mb-4">{content.aboutTitle}</h2>
              <p className="text-gray-600 leading-relaxed">
                {content.aboutDescription}
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3">{content.amenitiesTitle}</h3>
              <ul className="grid grid-cols-2 gap-2 text-gray-600">
                {content.amenities.map((amenity, index) => (
                  <li key={index}>{amenity}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="md:sticky md:top-8 h-fit">
            <BookingForm />
          </div>
        </div>
      </div>
      <CookieConsent />
    </div>
  );
};

export default Index;