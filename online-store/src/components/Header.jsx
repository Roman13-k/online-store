import React, { useState } from "react";
import styles from "../styles/header.module.css";
import { Link } from "react-router-dom";
import { Button } from "@heroui/react";
import { RegOrLog } from "./RegOrLog";
import { Registration } from "./Registration";

export function Header() {
  const [isOpenCatalog, setIsOpenCatalog] = useState(false);
  const [isOpenAuth, setIsOpenAuth] = useState(false);
  const [isOpenReg, setIsOpenReg] = useState(false);
  //! Пункты выдачи Роутинг

  return (
    <>
      {isOpenAuth && (
        <RegOrLog setIsOpenAuth={setIsOpenAuth} setIsOpenReg={setIsOpenReg} />
      )}
      {isOpenReg && <Registration setIsOpenReg={setIsOpenReg} />}
      <header className='flex flex-col max-w-full min-h-[110px] text-sm pt-2 shadow-normal pr-[80px] pl-[80px] relative'>
        <div className='flex justify-between mb-5'>
          <p className={styles.point}>Пункт выдачи — Центральная ул., 1</p>
          <nav className='flex opacity-40 gap-4'>
            <Link to='/registration'>Стать продавцом</Link>
            <Link to='/wholesale'>Оптовые закупки</Link>
            <Link to='/certificates'>Подарочные сертификаты</Link>
            <Link to='/support'>Помощь</Link>
            <Link to='/pickup-points'>Пункты выдачи</Link>
          </nav>
        </div>
        <div className='flex items-center'>
          <Link to='/'>
            <h1 className={styles.title}>
              <span className='font-second font-extrabold'>ПРО</span>
              <span className='font-third font-medium'>Книги</span>
            </h1>
          </Link>
          <Button
            onPress={() => setIsOpenCatalog(!isOpenCatalog)}
            className='bg-[#F35935] rounded-[5px] pl-3 pr-3 w-[124px] h-[46px] font-medium text-white text-lg shadow-normal ml-[56px] mr-5 active:translate-y-1'>
            Католог
            <img src='/icons/open-btn.svg' alt='Icon' className='ml-2' />
          </Button>
          <ul
            className={`absolute top-[123px] left-[388px] rounded-[5px] grid grid-rows-4 grid-cols-2 bg-grey ${
              isOpenCatalog
                ? "opacity-100 translate-y-0 z-50"
                : "opacity-0 -translate-y-full -z-40"
            } transition-all duration-300`}>
            <li className={styles.catalog}>
              <Link to='' className='text-center'>
                Художественная литература
              </Link>
            </li>
            <li className={styles.catalog}>
              <Link to='' className='text-center'>
                Нехудожественная литература
              </Link>
            </li>
            <li className={styles.catalog}>
              <Link to='' className='text-center'>
                Учебная литература и словари
              </Link>
            </li>
            <li className={styles.catalog}>
              <Link to='' className='text-center'>
                Молодёжная литература
              </Link>
            </li>
            <li className={styles.catalog}>
              <Link to='' className='text-center'>
                Комиксы, манга, артбуки
              </Link>
            </li>
            <li className={styles.catalog}>
              <Link to='' className='text-center'>
                Книги для детей
              </Link>
            </li>
            <li className={styles.catalog}>
              <Link to='' className='text-center'>
                Периодические издания
              </Link>
            </li>
            <li className={styles.catalog}>
              <Link to='' className='text-center'>
                Все книги
              </Link>
            </li>
          </ul>
          <input
            type='text'
            className='rounded-[5px] pl-5 pr-5 border border-black opacity-40 h-[46px] w-[420px] bg-[url("/icons/loupe.svg")] bg-no-repeat bg-[position:95%_50%]'
            placeholder='Найти интересную книгу'
          />
          <ul className='flex gap-3 ml-[56px]'>
            <li>
              <button
                onClick={() => setIsOpenAuth(!isOpenAuth)}
                className='flex flex-col items-center max-h-[53px] '>
                <img src='/icons/account.svg' className='w-[33px] h-[33px]' />
                <p className='font-normal text-sm'>Войти</p>
              </button>
            </li>
            <li>
              <Link to='' className='flex flex-col items-center max-h-[53px]'>
                <img src='/icons/favorite.svg' className='w-[33px] h-[33px]' />
                <p>Избранное</p>
              </Link>
            </li>
            <li>
              <Link to='' className='flex flex-col items-center max-h-[53px]'>
                <img src='/icons/order.svg' className='w-[33px] h-[33px]' />
                <p>Заказы</p>
              </Link>
            </li>
            <li>
              <Link to='' className='flex flex-col items-center max-h-[53px]'>
                <img src='/icons/cart.svg' className='w-[33px] h-[33px]' />
                <p>Корзина</p>
              </Link>
            </li>
          </ul>
        </div>
      </header>
    </>
  );
}
