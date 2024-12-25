import { BookingForm } from "@/components/BookingForm";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "@/integrations/supabase/client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

const content = {
  title: "Pino Apartment Pamporovo",
  subtitle: "Зимната приказка, достъпна за цялото семейство",
  aboutTitle: "Накратко за апартамента",
  aboutDescription: "🏔 Добре дошли в сърцето на Пампорово! 🌲❄️Нашият уютен апартамент в комплекс Манастира 3 е идеалното място за вашата зимна почивка. Разположен директно на туристическата писта – Ski in/Ski out, и само на 100 метра от лифт Студенец - Снежанка, той е перфектен за ски приключения и релакс сред природата.",
  amenitiesTitle: "Amenities",
  amenities: [
    "📶 Бърз Wi-Fi",
    "🍳 Оборудвана кухня",
    "🧺 Пералня и сушилня",
    "❄️ Хладилник с фризер",
    "☕ Кафе машина",
    "🎮 PlayStation 4",
    "📺 Netflix"
  ]
};

const Index = () => {
  const [showAuth, setShowAuth] = useState(false);
  const [session, setSession] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="relative h-[50vh] bg-gray-900">
        <div className="absolute top-4 right-4 z-10">
          {session ? (
            <Button 
              variant="outline" 
              onClick={() => supabase.auth.signOut()}
              className="bg-white hover:bg-gray-100"
            >
              Sign Out
            </Button>
          ) : (
            <Button 
              variant="outline" 
              onClick={() => setShowAuth(true)}
              className="bg-white hover:bg-gray-100"
            >
              Sign In
            </Button>
          )}
        </div>
        <img
          src="https://images.unsplash.com/photo-1522708323590-d24dbb6b0267"
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

      {showAuth && !session && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-sm w-full mx-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Sign In / Sign Up</h2>
              <button 
                onClick={() => setShowAuth(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
            <Auth
              supabaseClient={supabase}
              appearance={{ theme: ThemeSupa }}
              providers={[]}
              redirectTo={window.location.origin}
            />
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 py-12">
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
    </div>
  );
};

export default Index;
