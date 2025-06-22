import React from "react";
import { getYear } from "../utils/getYear";
import Link from "next/link";

export function Footer() {
  //! Роутинг Почта

  return (
    <footer
      className='flex flex-col shadow-normal mt-[100px]'
      style={{
        background: "linear-gradient(to bottom,#e9e9e9 90%, #d9d9d9 10%)",
      }}>
      <div className='pt-10 pl-20 pr-20'>
        <ul className='flex gap-[111px]'>
          <li className='flex flex-col gap-3'>
            <h4>Покупателям и продавцам</h4>
            <ul className='flex flex-col gap-2 opacity-60'>
              <li>
                <Link href='#'>Заказ, оплата и доставка</Link>
              </li>
              <li>
                <Link href='#'>Возврат товара</Link>
              </li>
              <li>
                <Link href='#'>Стать продавцом</Link>
              </li>
              <li>
                <Link href='#'>Стать поставщиком</Link>
              </li>
              <li>
                <Link href='#'>Открыть пункт выдачи</Link>
              </li>
              <li>
                <Link href='#'>Оптовые закупки</Link>
              </li>
              <li>
                <Link href='#'>Вопросы и ответы</Link>
              </li>
            </ul>
          </li>
          <li className='flex flex-col gap-3'>
            <h4>О маркетплейсе</h4>
            <ul className='flex flex-col gap-2 opacity-60'>
              <li>
                <Link href='#'>О ПРОКниги</Link>
              </li>
              <li>
                <Link href='#'>Новости</Link>
              </li>
              <li>
                <Link href='#'>Вакансии</Link>
              </li>
              <li>
                <Link href='#'>Благотворительность</Link>
              </li>
              <li>
                <Link href='#'>Реклама на сайте</Link>
              </li>
              <li>
                <Link href='#'>Политика компании</Link>
              </li>
            </ul>
          </li>
          <li className='flex flex-col gap-3'>
            <h4>Информация</h4>
            <ul className='flex flex-col gap-2 opacity-60'>
              <li>
                <Link href='#'>Акции и скидки</Link>
              </li>
              <li>
                <Link href='#'>Подарочные карты</Link>
              </li>
              <li>
                <Link href='#'>Бонусная программа</Link>
              </li>
              <li>
                <Link href='#'>Адреса пунктов выдачи</Link>
              </li>
              <li>
                <Link href='#'>Контакты</Link>
              </li>
              <li>
                <Link href='#'>Обратная связь</Link>
              </li>
            </ul>
          </li>
          <li className='flex flex-col gap-3'>
            <h4>Будем на связи(ПОЧТА)</h4>
            {/* почта */}
          </li>
        </ul>
        <span className='border-2 border-grey-d9 w-full block mt-6 mb-6'></span>
        <div className='flex flex-col gap-3 mb-10'>
          <h4>Принимаем к оплате</h4>
          <div className='flex gap-3'>
            <img src='/img/mir.png' alt='' />
            <img src='/img/visa.png' alt='' />
            <img src='/img/mastercard.png' alt='' />
          </div>
        </div>
        <div className='flex gap-[44px] opacity-60 mb-3'>
          <p>© ПРОКниги, {getYear()}</p>
          <p>Публичная оферта</p>
        </div>
      </div>
    </footer>
  );
}
