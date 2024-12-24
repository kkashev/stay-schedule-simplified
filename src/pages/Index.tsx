import { BookingForm } from "@/components/BookingForm";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "@/integrations/supabase/client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

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
      {/* Hero Section */}
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
          src="https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80"
          alt="Apartment"
          className="w-full h-full object-cover opacity-80"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-2">
            Modern City Apartment
          </h1>
          <p className="text-xl opacity-90">
            Perfect location, stunning views
          </p>
        </div>
      </div>

      {/* Auth Dialog */}
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

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 gap-12">
          {/* Left Column - Description */}
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-semibold mb-4">About this space</h2>
              <p className="text-gray-600 leading-relaxed">
                Welcome to our stunning city apartment! This modern space offers the perfect blend of comfort and style, featuring contemporary furnishings, a fully equipped kitchen, and breathtaking city views. Located in the heart of downtown, you'll be steps away from restaurants, shops, and major attractions.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3">Amenities</h3>
              <ul className="grid grid-cols-2 gap-2 text-gray-600">
                <li>✨ Wifi</li>
                <li>🚗 Free parking</li>
                <li>❄️ Air conditioning</li>
                <li>🏊‍♂️ Pool access</li>
                <li>📺 Smart TV</li>
                <li>🧺 Washer/Dryer</li>
              </ul>
            </div>
          </div>

          {/* Right Column - Booking Form */}
          <div className="md:sticky md:top-8 h-fit">
            <BookingForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;