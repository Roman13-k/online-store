import React from "react";
import styles from "../styles/header.module.css";
import { Link } from "react-router-dom";

export function Header() {
  //! Пункты выдачи Роутинг

  return (
    <header className='flex flex-col min-h-[110px] text-sm pt-2 shadow-normal pr-[80px] pl-[80px]'>
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
      <div className='flex'>
        <Link to='/'>
          <h1 className={styles.title}>
            <span className='font-second font-extrabold'>ПРО</span>
            <span className='font-third font-medium'>Книги</span>
          </h1>
        </Link>
      </div>
    </header>
  );
}
