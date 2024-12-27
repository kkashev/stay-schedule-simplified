import { BookingForm } from "@/components/BookingForm";
import { supabase } from "@/integrations/supabase/client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ImageUpload } from "@/components/ImageUpload";
import { CookieConsent } from "@/components/CookieConsent";
import { Footer } from "@/components/Footer";

const content = {
  title: "Pino Apartment Pamporovo",
  subtitle: "Зимната приказка, достъпна за цялото семейство",
  apartmentInfo: [
    "📍 Директно на писта Студенец (Ski in/Ski out)",
    "🏔️ 100м от лифт Студенец-Снежанка",
    "🏘️ Комплекс Манастира 3",
    "👥 Максимален капацитет: 6 души",
    "🛏️ 3 стаи",
    "🚿 2 бани",
    "⏰ Минимален престой: 3 нощувки",
    "⭐ Напълно обзаведен",
  ],
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
      {/* Header Section */}
      <div className="relative bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="w-24 h-24 bg-gray-200 rounded-full">
              {/* Logo placeholder - replace with actual logo */}
              <div className="w-full h-full rounded-full bg-gradient-to-br from-blue-500 to-purple-500" />
            </div>
            <div className="flex gap-2">
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
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="relative h-[50vh] bg-gray-900">
        <img
          src="https://mcszeyokeqgoxsrmbzit.supabase.co/storage/v1/object/public/images/0.037049310533655566.jpg"
          alt={content.title}
          className="w-full h-full object-cover opacity-90"
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
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-semibold mb-6">За апартамента</h2>
              <ul className="grid grid-cols-1 gap-4 text-gray-600">
                {content.apartmentInfo.map((info, index) => (
                  <li key={index} className="flex items-center text-lg">
                    {info}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-4">{content.amenitiesTitle}</h3>
              <ul className="grid grid-cols-2 gap-3 text-gray-600">
                {content.amenities.map((amenity, index) => (
                  <li key={index} className="flex items-center">
                    {amenity}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="md:sticky md:top-8 h-fit">
            <BookingForm />
          </div>
        </div>
      </div>
      
      <Footer />
      <CookieConsent />
    </div>
  );
};

export default Index;