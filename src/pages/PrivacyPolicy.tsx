const PrivacyPolicy = () => {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6">Политика за поверителност</h1>
      
      <div className="prose prose-lg">
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">1. Събиране на данни</h2>
          <p>Ние събираме следните лични данни когато правите резервация:</p>
          <ul className="list-disc pl-6">
            <li>Имейл адрес</li>
            <li>Телефонен номер (по избор)</li>
            <li>Информация за резервацията (дати, брой гости)</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">2. Използване на данните</h2>
          <p>Използваме вашите лични данни за:</p>
          <ul className="list-disc pl-6">
            <li>Обработка на вашата резервация</li>
            <li>Комуникация относно вашата резервация</li>
            <li>Подобряване на нашите услуги</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">3. Съхранение на данните</h2>
          <p>Вашите данни се съхраняват сигурно в нашата система и се пазят само толкова дълго, колкото е необходимо за целите, за които са събрани.</p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">4. Вашите права</h2>
          <p>Имате право да:</p>
          <ul className="list-disc pl-6">
            <li>Поискате достъп до вашите лични данни</li>
            <li>Коригирате неточни лични данни</li>
            <li>Поискате изтриване на вашите лични данни</li>
            <li>Оттеглите съгласието си за обработка на данни</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">5. Контакт</h2>
          <p>За въпроси относно тази политика за поверителност, моля свържете се с нас на:</p>
          <p>Имейл: privacy@pinoapt.com</p>
        </section>
      </div>
    </div>
  );
};

export default PrivacyPolicy;