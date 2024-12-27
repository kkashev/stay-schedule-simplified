export const bookingRequestTemplate = (booking: {
  startDate: Date;
  endDate: Date;
  guests: string;
  totalPrice: number;
}) => ({
  subject: "Потвърждение за заявка за резервация - Pino Apartment",
  html: `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <img src="https://mcszeyokeqgoxsrmbzit.supabase.co/storage/v1/object/public/images/0.037049310533655566.jpg" 
           alt="Pino Apartment" 
           style="width: 100%; height: auto; margin-bottom: 20px;"
      />
      <h2 style="color: #333;">Благодарим за вашата заявка!</h2>
      <p>Получихме вашата заявка за резервация със следните детайли:</p>
      <ul style="list-style: none; padding: 0;">
        <li>📅 Настаняване: ${booking.startDate.toLocaleDateString('bg-BG')}</li>
        <li>📅 Напускане: ${booking.endDate.toLocaleDateString('bg-BG')}</li>
        <li>👥 Брой гости: ${booking.guests}</li>
        <li>💰 Обща цена: ${booking.totalPrice} лв</li>
      </ul>
      <p>Ще прегледаме вашата заявка и ще се свържем с вас скоро за потвърждение.</p>
      <p>Поздрави,<br>Екипът на Pino Apartment</p>
      <hr style="margin: 20px 0;" />
      <p style="font-size: 12px; color: #666;">
        Този имейл е изпратен автоматично. Моля, не отговаряйте на този адрес.
      </p>
    </div>
  `
});

export const bookingApprovedTemplate = (booking: {
  startDate: Date;
  endDate: Date;
  guests: string;
  totalPrice: number;
}) => ({
  subject: "Резервацията ви е потвърдена - Pino Apartment",
  html: `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <img src="https://mcszeyokeqgoxsrmbzit.supabase.co/storage/v1/object/public/images/0.037049310533655566.jpg" 
           alt="Pino Apartment" 
           style="width: 100%; height: auto; margin-bottom: 20px;"
      />
      <h2 style="color: #22c55e;">Резервацията ви е потвърдена!</h2>
      <p>С удоволствие ви уведомяваме, че вашата резервация е потвърдена.</p>
      <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <h3 style="margin-top: 0;">Детайли на резервацията:</h3>
        <ul style="list-style: none; padding: 0;">
          <li>📅 Настаняване: ${booking.startDate.toLocaleDateString('bg-BG')}</li>
          <li>📅 Напускане: ${booking.endDate.toLocaleDateString('bg-BG')}</li>
          <li>👥 Брой гости: ${booking.guests}</li>
          <li>💰 Обща цена: ${booking.totalPrice} лв</li>
        </ul>
      </div>
      <p>Очакваме ви!</p>
      <p>Поздрави,<br>Екипът на Pino Apartment</p>
      <hr style="margin: 20px 0;" />
      <p style="font-size: 12px; color: #666;">
        Този имейл е изпратен автоматично. Моля, не отговаряйте на този адрес.
      </p>
    </div>
  `
});

export const bookingRejectedTemplate = (booking: {
  startDate: Date;
  endDate: Date;
  guests: string;
}) => ({
  subject: "Относно вашата заявка за резервация - Pino Apartment",
  html: `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <img src="https://mcszeyokeqgoxsrmbzit.supabase.co/storage/v1/object/public/images/0.037049310533655566.jpg" 
           alt="Pino Apartment" 
           style="width: 100%; height: auto; margin-bottom: 20px;"
      />
      <h2 style="color: #333;">Относно вашата заявка за резервация</h2>
      <p>За съжаление, трябва да ви уведомим, че не можем да потвърдим вашата заявка за следните дати:</p>
      <ul style="list-style: none; padding: 0;">
        <li>📅 Настаняване: ${booking.startDate.toLocaleDateString('bg-BG')}</li>
        <li>📅 Напускане: ${booking.endDate.toLocaleDateString('bg-BG')}</li>
        <li>👥 Брой гости: ${booking.guests}</li>
      </ul>
      <p>Моля, опитайте с други дати или се свържете с нас за повече информация.</p>
      <p>Поздрави,<br>Екипът на Pino Apartment</p>
      <hr style="margin: 20px 0;" />
      <p style="font-size: 12px; color: #666;">
        Този имейл е изпратен автоматично. Моля, не отговаряйте на този адрес.
      </p>
    </div>
  `
});