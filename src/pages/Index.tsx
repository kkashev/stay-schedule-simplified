import { BookingForm } from "@/components/BookingForm";
import { supabase } from "@/integrations/supabase/client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ImageUpload } from "@/components/ImageUpload";
import { CookieConsent } from "@/components/CookieConsent";
import { Footer } from "@/components/Footer";
import { apartmentContent as content } from "@/content/apartmentContent";
import { Gallery } from "@/components/Gallery";

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
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative h-[48vh] bg-gray-900">
        <img
          src="https://mcszeyokeqgoxsrmbzit.supabase.co/storage/v1/object/public/images/0.037049310533655566.jpg"
          alt="Hero"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />
        
        {/* Navigation Bar */}
        <div className="absolute top-0 left-0 right-0 z-10">
          <div className="max-w-7xl mx-auto px-4 py-6">
            <div className="flex items-center justify-between">
              <div className="w-16 h-16 bg-white rounded-full shadow-lg flex items-center justify-center">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-500 to-purple-500" />
              </div>
              {session && isAdmin && (
                <Button 
                  variant="outline" 
                  onClick={() => window.location.href = '/admin'}
                  className="bg-white/90 hover:bg-white"
                >
                  Admin Panel
                </Button>
              )}
            </div>
          </div>
        </div>

        {/* Hero Content */}
        <div className="absolute bottom-0 left-0 right-0 p-12 text-white">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold mb-4 tracking-tight">
              {content.title}
            </h1>
            <p className="text-2xl font-light opacity-90 max-w-2xl">
              {content.subtitle}
            </p>
          </div>
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
              <h2 className="text-xl font-semibold mb-4">За апартамента</h2>
              <ul className="grid grid-cols-2 gap-3 text-gray-600">
                {content.apartmentInfo.map((info, index) => (
                  <li key={index} className="flex items-start text-base whitespace-nowrap">
                    {info}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-4">{content.amenitiesTitle}</h2>
              <ul className="grid grid-cols-2 gap-3 text-gray-600">
                {content.amenities.map((amenity, index) => (
                  <li key={index} className="flex items-start text-base whitespace-nowrap">
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

        {/* Gallery Section */}
        <Gallery photos={content.photos} />

        {/* Description Section */}
        <div className="mt-24 max-w-4xl mx-auto">
          <h2 className="text-3xl font-semibold mb-8 text-center">{content.description.title}</h2>
          <div className="space-y-6">
            {content.description.paragraphs.map((paragraph, index) => (
              <p key={index} className="text-gray-600 leading-relaxed text-lg">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </div>
      
      <Footer />
      <CookieConsent />
    </div>
  );
};

export default Index;