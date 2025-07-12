import React from "react";
import Container from "../ui/shared/containers/Container";

export default function SupportScreen() {
  return (
    <Container>
      <section className='text-center mt-10'>
        <h1 className='text-5xl font-extrabold text-orange-600 mb-4'>Поддержка</h1>
        <p className='text-lg text-gray-700'>
          Мы всегда рядом, чтобы помочь вам — от выбора книги до оформления возврата. Обращайтесь в
          любое время, и мы постараемся решить ваш вопрос максимально быстро и удобно.
        </p>
      </section>

      <section>
        <h2 className='text-3xl font-bold mb-4'>Как связаться с нами</h2>
        <ul className='text-gray-700 space-y-2'>
          <li>
            <strong>📧 Email:</strong> support@proknigi.ru
          </li>
          <li>
            <strong>📞 Телефон:</strong> +7 (800) 123-45-67 (с 9:00 до 20:00 по МСК)
          </li>
          <li>
            <strong>💬 Онлайн-чат:</strong> доступен в правом нижнем углу сайта
          </li>
          <li>
            <strong>📱 Telegram-бот:</strong> @proknigi_support_bot
          </li>
        </ul>
      </section>

      <section>
        <h2 className='text-3xl font-bold mb-4'>Служба поддержки</h2>
        <p className='text-gray-700 mb-4'>
          Наша команда поддержки готова помочь 7 дней в неделю. Мы стараемся отвечать на обращения в
          течение <strong>30 минут</strong> в рабочее время и не позднее <strong>24 часов</strong> в
          выходные и праздничные дни.
        </p>
        <p className='text-gray-700'>
          Все обращения обрабатываются вручную — с вниманием и заботой. Нам важно ваше доверие!
        </p>
      </section>

      <section>
        <h2 className='text-3xl font-bold mb-4'>Доставка и возврат</h2>
        <p className='text-gray-700 mb-2'>
          📦 Мы сотрудничаем с проверенными службами доставки: СДЭК, Boxberry, Почта России.
          Отслеживайте заказ через личный кабинет.
        </p>
        <p className='text-gray-700 mb-2'>
          🔁 Возврат осуществляется по заявке через почту или личный кабинет. Мы не задаём лишних
          вопросов.
        </p>
        <p className='text-gray-700'>
          💰 Возврат средств — в течение 3–5 рабочих дней на ту же карту, с которой была произведена
          оплата.
        </p>
      </section>

      <section>
        <h2 className='text-3xl font-bold mb-4'>Не нашли ответ?</h2>
        <p className='text-gray-700'>
          Напишите нам напрямую — мы всегда открыты к общению. Заполните{" "}
          <strong>форму обратной связи</strong> или напишите в чат, и мы свяжемся с вами в ближайшее
          время.
        </p>
      </section>
    </Container>
  );
}
