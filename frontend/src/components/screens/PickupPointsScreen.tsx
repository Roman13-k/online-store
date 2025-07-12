import React from "react";
import Container from "../ui/shared/containers/Container";

export default function PickupPointsScreen() {
  return (
    <Container className='py-12 space-y-10'>
      <section className='text-center'>
        <h1 className='text-5xl font-extrabold text-orange-600 mb-4'>Пункты выдачи</h1>
        <p className='text-gray-700 text-lg'>
          Вы можете забрать заказ в удобном для вас пункте самовывоза. Мы сотрудничаем с крупнейшими
          службами доставки по всей России.
        </p>
      </section>

      <section className='space-y-6'>
        <h2 className='text-3xl font-bold'>Как выбрать пункт выдачи</h2>
        <ol className='list-decimal list-inside text-gray-700 space-y-2'>
          <li>Добавьте товары в корзину и перейдите к оформлению заказа.</li>
          <li>Выберите доставку в пункт выдачи и укажите город.</li>
          <li>Выберите ближайший адрес из предложенного списка.</li>
        </ol>
      </section>

      <section className='space-y-6'>
        <h2 className='text-3xl font-bold'>Примеры пунктов выдачи</h2>
        <ul className='text-gray-700 space-y-4'>
          <li>
            <strong>Москва:</strong> ул. Тверская, 12 — Ежедневно с 10:00 до 20:00
          </li>
          <li>
            <strong>Санкт-Петербург:</strong> Невский проспект, 56 — Пн–Сб с 9:00 до 19:00
          </li>
          <li>
            <strong>Новосибирск:</strong> ул. Ленина, 85 — Пн–Пт с 10:00 до 18:00
          </li>
        </ul>
      </section>

      <section>
        <h2 className='text-3xl font-bold mb-4'>Часто задаваемые вопросы</h2>
        <div className='space-y-4 text-gray-700'>
          <div>
            <h3 className='font-semibold'>Сколько хранится заказ в пункте?</h3>
            <p>Обычно 5–7 дней. Уточняйте при выборе службы доставки.</p>
          </div>
          <div>
            <h3 className='font-semibold'>Нужен ли паспорт при получении?</h3>
            <p>Да, для подтверждения личности.</p>
          </div>
          <div>
            <h3 className='font-semibold'>Можно ли оплатить на месте?</h3>
            <p>
              Некоторые пункты принимают оплату при получении. Информация будет указана при выборе.
            </p>
          </div>
        </div>
      </section>
    </Container>
  );
}
