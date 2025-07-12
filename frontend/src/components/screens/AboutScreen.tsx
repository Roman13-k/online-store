import React from "react";
import Container from "../ui/shared/containers/Container";

export default function AboutScreen() {
  return (
    <Container>
      <section className='text-center mt-10'>
        <h1 className='text-5xl font-extrabold text-orange-main mb-4'>О нас</h1>
        <p className='text-lg text-gray-700'>
          Добро пожаловать в <strong>ПРОКниги</strong> — ваш уютный уголок в онлайн-мире, где каждая
          книга найдёт своего читателя. Мы объединили страсть к чтению с удобством покупки в
          интернете.
        </p>
      </section>

      <section>
        <h2 className='text-3xl font-bold mb-4'>Наша история</h2>
        <p className='text-gray-700 leading-relaxed mb-4'>
          Всё начиналось, когда мы, заядлые книголюбы, заметили: многие интересные издания доступны
          далеко не всем. Так родилась идея создать онлайн-магазин, где есть и классика, и новинки,
          научные публикации и детские истории — всё в одном месте.
        </p>
        <p className='text-gray-700 leading-relaxed'>
          С 2021 года мы сотрудничаем с авторами, издательствами и независимыми поставщиками, чтобы
          каждый най­шёл книгу по душе.
        </p>
      </section>

      <section>
        <h2 className='text-3xl font-bold mb-4'>Наша миссия</h2>
        <ul className='list-disc list-inside text-gray-700 space-y-2'>
          <li>Создавать доступную онлайн-платформу для читателей всех возрастов.</li>
          <li>Продвигать чтение как инструмент личного роста и развития.</li>
          <li>Поддерживать локальных авторов и маленькие издательства.</li>
        </ul>
      </section>

      <section>
        <h2 className='text-3xl font-bold mb-4'>Почему выбирают нас</h2>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          <div>
            <h3 className='font-semibold'>📦 Удобная доставка</h3>
            <p className='text-gray-700'>
              Доставка по всей России: курьером, почтой и пунктами самовывоза.
            </p>
          </div>
          <div>
            <h3 className='font-semibold'>💳 Простая оплата</h3>
            <p className='text-gray-700'>Принимаем карты, электронные кошельки и онлайн-банкинг.</p>
          </div>
          <div>
            <h3 className='font-semibold'>⭐ Проверенный ассортимент</h3>
            <p className='text-gray-700'>
              Тщательно отбираем книги — от актуальных бестселлеров до редких изданий.
            </p>
          </div>
          <div>
            <h3 className='font-semibold'>🤝 Поддержка читателей</h3>
            <p className='text-gray-700'>
              Консультируем по выбору, дарим рецензии и читаем вместе.
            </p>
          </div>
        </div>
      </section>

      <section>
        <h2 className='text-3xl font-bold mb-4'>Наша команда</h2>
        <p className='text-gray-700 mb-4'>
          Мы — команда энтузиастов, объединённых одной целью: сделать чтение доступным и приятным. У
          нас есть:
        </p>
        <ul className='list-disc list-inside text-gray-700 space-y-2'>
          <li>
            <strong>Каталогаторы</strong>, которые находят редкие и интересные книги.
          </li>
          <li>
            <strong>Литературные редакторы</strong>, проверяющие качество и актуальность контента.
          </li>
          <li>
            <strong>Логисты и упаковщики</strong>, заботящиеся о вашей посылке.
          </li>
          <li>
            <strong>Служба поддержки</strong>, всегда готовая помочь 24/7.
          </li>
        </ul>
      </section>

      <section>
        <h2 className='text-3xl font-bold mb-4'>Наш подход</h2>
        <p className='text-gray-700 leading-relaxed'>
          Мы ориентируемся на людей, а не на алгоритмы. Даже если у вас есть уникальный запрос — мы
          постараемся его выполнить. Четыре принципа нашей работы:
        </p>
        <ol className='list-decimal list-inside text-gray-700 space-y-2 mt-4'>
          <li>Индивидуальный подбор по вкусу читателя.</li>
          <li>Быстрое и аккуратное оформление заказа.</li>
          <li>Обратная связь: отзывы, предложения и помощь.</li>
          <li>Постоянное обновление ассортимента.</li>
        </ol>
      </section>
    </Container>
  );
}
