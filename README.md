# ПРОКниги — веб-приложение магазина книг

Курсовая работа по дисциплине «Системы управления базами данных» (БГУИР).

Клиент-серверное приложение из трёх звеньев:

- `frontend` — клиентская часть на Next.js 15, HeroUI и Redux Toolkit Query, языки ru, be, en;
- `backend` — сервер приложения на Node.js, Express и TypeScript; к базе обращается параметризованными SQL-запросами через драйвер `pg`, без ORM;
- PostgreSQL 15+ — таблицы, ограничения целостности, индексы, представление `v_book_cards`, триггер создания корзины и хранимые функции `place_order` и `cancel_order`.

## Возможности

- регистрация с подтверждением почты, отдельные входы покупателя и администратора;
- каталог: поиск по названию, автору и ISBN, фильтры, сортировка, постраничный вывод;
- корзина, оформление заказа одной транзакцией в СУБД, история заказов, отмена;
- скидки по периоду и минимальной сумме, пересчёт в BYN, USD, EUR, RUB с фиксацией курса в заказе, загрузка курсов НБРБ;
- отзывы и оценки;
- импорт и экспорт каталога и заказов в JSON, XML, CSV;
- отчёты Word, Excel, PDF: продажи за период, остатки, накладная заказа;
- аналитика: выручка по дням, самые продаваемые книги, продажи по жанрам, малые остатки;
- письма о регистрации и заказе (SMTP или папка `backend/mail-outbox`).

## Запуск

Требуются Node.js 20+ и PostgreSQL 15+.

```bash
cd backend
cp .env.example .env        # укажите DATABASE_URL и JWT_SECRET
npm install
npm run db:create           # создаёт базу из DATABASE_URL
npm run db:migrate          # применяет sql/001_schema.sql
npm run db:seed             # тестовые данные и строки интерфейса
npm run dev                 # http://localhost:4000/api
```

```bash
cd frontend
cp .env.example .env        # NEXT_PUBLIC_API_URL=http://localhost:4000
npm install
npm run dev                 # http://localhost:3000
```

Учётные записи из тестовых данных:

| Роль | Почта | Пароль |
| --- | --- | --- |
| Администратор | admin@proknigi.by | Admin12345 |
| Покупатель | buyer@proknigi.by | Buyer12345 |

Страница входа администратора: `/ru/admin/login`.

Резервная копия базы: `pg_dump -U postgres -F c -f proknigi.backup proknigi`.
