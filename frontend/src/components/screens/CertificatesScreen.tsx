import React from "react";
import Container from "../ui/shared/containers/Container";

export default function CertificatesScreen() {
  return (
    <Container className='py-12 space-y-10'>
      <section className='text-center'>
        <h1 className='text-5xl font-extrabold text-orange-600 mb-4'>Подарочные сертификаты</h1>
        <p className='text-lg text-gray-700'>
          Подарите возможность выбрать любимую книгу! Электронный сертификат — идеальный подарок для
          читателя на любой праздник.
        </p>
      </section>

      <section>
        <h2 className='text-3xl font-bold mb-4'>Доступные номиналы</h2>
        <ul className='list-disc list-inside text-gray-700 space-y-2'>
          <li>500 ₽ — для приятного книжного сюрприза</li>
          <li>1000 ₽ — хороший выбор для одной-двух книг</li>
          <li>2000 ₽ — чтобы не ограничивать фантазию</li>
          <li>Индивидуальная сумма — под любой бюджет</li>
        </ul>
      </section>

      <section>
        <h2 className='text-3xl font-bold mb-4'>Как работает сертификат</h2>
        <ol className='list-decimal list-inside text-gray-700 space-y-2'>
          <li>Выберите номинал и оплатите онлайн.</li>
          <li>Сертификат придёт вам (или получателю) по email в течение 5 минут.</li>
          <li>Получатель вводит код при оформлении заказа и получает скидку на указанную сумму.</li>
        </ol>
      </section>

      <section>
        <h2 className='text-3xl font-bold mb-4'>Условия использования</h2>
        <ul className='list-disc list-inside text-gray-700 space-y-2'>
          <li>Срок действия — 1 год с момента покупки.</li>
          <li>Можно использовать частично — остаток сохраняется.</li>
          <li>Подходит для всех товаров, включая акции.</li>
          <li>Нельзя обменять на деньги или вернуть.</li>
        </ul>
      </section>

      <section>
        <h2 className='text-3xl font-bold mb-4'>Подарите другу</h2>
        <p className='text-gray-700'>
          Укажите email получателя при оформлении — мы красиво оформим письмо и отправим за вас.
          Можно добавить личное сообщение!
        </p>
      </section>
    </Container>
  );
}
