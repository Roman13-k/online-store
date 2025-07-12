import React from "react";
import Container from "../ui/shared/containers/Container";

export default function FaqScreen() {
  return (
    <Container className='py-12 space-y-10'>
      <section className='text-center'>
        <h1 className='text-5xl font-extrabold text-orange-600 mb-4'>Часто задаваемые вопросы</h1>
        <p className='text-lg text-gray-700'>
          Здесь вы найдёте ответы на самые популярные вопросы, связанные с заказами, доставкой и
          другими аспектами работы магазина ПРОКниги.
        </p>
      </section>

      <section className='space-y-6'>
        <div>
          <h2 className='text-2xl font-semibold text-gray-900 mb-2'>Как оформить заказ?</h2>
          <p className='text-gray-700'>
            Просто добавьте понравившиеся книги в корзину и перейдите к оформлению. Укажите способ
            доставки и оплаты — всё просто!
          </p>
        </div>

        <div>
          <h2 className='text-2xl font-semibold text-gray-900 mb-2'>
            Какие способы оплаты доступны?
          </h2>
          <p className='text-gray-700'>
            Мы принимаем оплату картами Visa, MasterCard, Мир, а также через СБП и электронные
            кошельки.
          </p>
        </div>

        <div>
          <h2 className='text-2xl font-semibold text-gray-900 mb-2'>Как отследить заказ?</h2>
          <p className='text-gray-700'>
            После отправки вы получите трек-номер по email. Также вы можете отследить заказ в личном
            кабинете.
          </p>
        </div>

        <div>
          <h2 className='text-2xl font-semibold text-gray-900 mb-2'>
            Как вернуть или обменять книгу?
          </h2>
          <p className='text-gray-700'>
            Вы можете вернуть товар в течение 14 дней, если он не был в употреблении и сохранён
            товарный вид. Обратитесь в поддержку, чтобы оформить возврат.
          </p>
        </div>

        <div>
          <h2 className='text-2xl font-semibold text-gray-900 mb-2'>
            Вы доставляете по всей России?
          </h2>
          <p className='text-gray-700'>
            Да! Мы работаем с СДЭК, Boxberry и Почтой России — доставим в любой населённый пункт.
          </p>
        </div>

        <div>
          <h2 className='text-2xl font-semibold text-gray-900 mb-2'>Есть ли электронные книги?</h2>
          <p className='text-gray-700'>
            Некоторые книги доступны в цифровом формате. При наличии — ссылка для скачивания придёт
            вам на почту сразу после оплаты.
          </p>
        </div>
      </section>
    </Container>
  );
}
