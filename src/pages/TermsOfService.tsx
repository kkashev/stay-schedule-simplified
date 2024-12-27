const TermsOfService = () => {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6">Общи условия</h1>
      
      <div className="prose prose-lg">
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">1. Общи положения</h2>
          <p>
            Тези общи условия уреждат отношенията между Pino Apartment и клиентите, 
            използващи нашата система за резервации.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">2. Резервации</h2>
          <ul className="list-disc pl-6">
            <li>Резервациите се считат за потвърдени само след получаване на писмено потвърждение от нас</li>
            <li>Цените включват всички посочени удобства</li>
            <li>Максималният брой гости не може да надвишава посочения капацитет</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">3. Плащане</h2>
          <p>
            Информация за плащането и политиката за анулиране ще бъде предоставена при потвърждение 
            на резервацията.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">4. Правила за престой</h2>
          <ul className="list-disc pl-6">
            <li>Настаняване: след 14:00 ч.</li>
            <li>Напускане: до 12:00 ч.</li>
            <li>Пушенето в апартамента е забранено</li>
            <li>Домашни любимци не се допускат</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">5. Отговорност</h2>
          <p>
            Гостите носят отговорност за всички щети, причинени по време на престоя им. 
            Препоръчваме да имате подходяща застраховка за пътуване.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">6. Контакт</h2>
          <p>За въпроси относно тези общи условия, моля свържете се с нас на:</p>
          <p>Имейл: info@pinoapt.com</p>
        </section>
      </div>
    </div>
  );
};

export default TermsOfService;