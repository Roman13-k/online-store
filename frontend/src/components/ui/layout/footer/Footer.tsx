import React from "react";
import Link from "next/link";
import { getYear } from "@/utils/getYear";
import Image from "next/image";
import Container from "../../shared/containers/Container";

export function Footer() {
  return (
    <footer
      className='shadow-normal mt-[100px]'
      style={{
        background: "linear-gradient(to bottom,#e9e9e9 90%, #d9d9d9 10%)",
      }}>
      <Container className='pt-10'>
        <ul className='flex gap-[111px]'>
          <li className='flex flex-col gap-3'>
            <h4>Покупателям и продавцам</h4>
            <ul className='flex flex-col gap-2 opacity-60'>
              {/* <li>
                <Link href='#'>Заказ, оплата и доставка</Link>
              </li>
              <li>
                <Link href='#'>Возврат товара</Link>
              </li> */}
              <li>
                <Link href='#'>Стать продавцом</Link>
              </li>
              <li>
                <Link href='#'>Открыть пункт выдачи</Link>
              </li>
              <li>
                <Link href='/FAQ'>Вопросы и ответы</Link>
              </li>
            </ul>
          </li>
          <li className='flex flex-col gap-3'>
            <h4>О маркетплейсе</h4>
            <ul className='flex flex-col gap-2 opacity-60'>
              <li>
                <Link href='/about'>О ПРОКниги</Link>
              </li>
              {/* <li>
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
              </li> */}
            </ul>
          </li>
          <li className='flex flex-col gap-3'>
            <h4>Информация</h4>
            <ul className='flex flex-col gap-2 opacity-60'>
              {/* <li>
                <Link href='#'>Акции и скидки</Link>
              </li> */}
              <li>
                <Link href='/certificates'>Подарочные карты</Link>
              </li>
              {/* <li>
                <Link href='#'>Бонусная программа</Link>
              </li> */}
              <li>
                <Link href='#'>Адреса пунктов выдачи</Link>
              </li>
              {/* <li>
                <Link href='#'>Контакты</Link>
              </li>
              <li>
                <Link href='#'>Обратная связь</Link>
              </li> */}
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
            <Image width={105} height={35} src='/img/cards/mir.png' alt='mir.png' />
            <Image width={105} height={35} src='/img/cards/visa.png' alt='visa.png' />
            <Image width={105} height={35} src='/img/cards/mastercard.png' alt='mastercard.png' />
          </div>
        </div>
        <div className='flex gap-[44px] opacity-60 mb-3'>
          <p>© ПРОКниги, {getYear()}</p>
          <p>Публичная оферта</p>
        </div>
      </Container>
    </footer>
  );
}
